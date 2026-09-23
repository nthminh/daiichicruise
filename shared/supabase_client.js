/* ============================================================
   DAIICHI TRAVEL — Supabase Live Data Sync Client
   Project ID: vfeodqmvilchsipdsxsh (Daiichi Travel Cloud DB)
   ============================================================ */
(function (window) {
  'use strict';

  const SUPABASE_URL = 'https://vfeodqmvilchsipdsxsh.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmZW9kcW12aWxjaHNpcGRzeHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyNzk0MzksImV4cCI6MjA5MDg1NTQzOX0.FAorniExT887KO4SQhmFO7BX_e99FfvEBZzCM_2Sits';

  const SupabaseSyncState = {
    projectId: 'vfeodqmvilchsipdsxsh',
    isSyncing: false,
    lastSynced: null,
    routes: [],
    trips: [],
    tours: [],
    vehicles: [],
    stops: []
  };

  // Helper fetch with Supabase credentials
  async function fetchSupabaseTable(table, limit = 1000) {
    const url = `${SUPABASE_URL}/rest/v1/${table}?select=*&limit=${limit}`;
    const res = await fetch(url, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return await res.json();
  }

  // Map and enrich DT_DATA with Supabase records
  function applySupabaseDataToDT(data) {
    if (!window.DT_DATA) return;

    SupabaseSyncState.routes = data.routes || [];
    SupabaseSyncState.trips = data.trips || [];
    SupabaseSyncState.tours = data.tours || [];
    SupabaseSyncState.vehicles = data.vehicles || [];
    SupabaseSyncState.stops = data.stops || [];
    SupabaseSyncState.lastSynced = new Date();

    // 1. Expose raw Supabase dataset on DT_DATA
    window.DT_DATA.SUPABASE = {
      projectId: SupabaseSyncState.projectId,
      routes: SupabaseSyncState.routes,
      trips: SupabaseSyncState.trips,
      tours: SupabaseSyncState.tours,
      vehicles: SupabaseSyncState.vehicles,
      stops: SupabaseSyncState.stops,
      syncedAt: SupabaseSyncState.lastSynced
    };

    // 2. Synchronize Bus Routes & real pricing into DT_DATA.BUS
    const sbBusRoutes = SupabaseSyncState.routes.filter(r => {
      const name = (r.name || '').toLowerCase();
      return !name.includes('tour') && !name.includes('du thuyền') && !name.includes('cruise') && !name.includes('tiệc bbq');
    });

    if (sbBusRoutes.length > 0) {
      // Build lookup for departure times from trips table
      const tripTimesByRoute = {};
      SupabaseSyncState.trips.forEach(tr => {
        const rName = tr.route;
        const time = tr.time;
        if (rName && time) {
          if (!tripTimesByRoute[rName]) tripTimesByRoute[rName] = new Set();
          tripTimesByRoute[rName].add(time);
        }
      });

      // Update matching routes in DT_DATA.BUS or append new ones
      sbBusRoutes.forEach(sbr => {
        const price = sbr.price || 250000;
        const dep = sbr.departure_point || '';
        const arr = sbr.arrival_point || '';

        // Match station codes
        let fromCode = 'HN';
        let toCode = 'CB';
        if (dep.includes('Cát Bà')) fromCode = 'CB';
        else if (dep.includes('Hải Phòng')) fromCode = 'HP';
        else if (dep.includes('Hạ Long')) fromCode = 'HL';
        else if (dep.includes('Ninh Bình')) fromCode = 'NB';

        if (arr.includes('Hà Nội')) toCode = 'HN';
        else if (arr.includes('Hải Phòng')) toCode = 'HP';
        else if (arr.includes('Hạ Long')) toCode = 'HL';
        else if (arr.includes('Ninh Bình')) toCode = 'NB';
        else if (arr.includes('Cát Bà')) toCode = 'CB';

        const matched = window.DT_DATA.BUS.find(b => b.from === fromCode && b.to === toCode);
        if (matched) {
          matched.supabaseId = sbr.id;
          matched.low = price;
          matched.high = sbr.price_periods?.high || Math.round(price * 1.15);
          matched.supabaseName = sbr.name;
        }
      });
    }

    // 3. Synchronize Day Cruises from Supabase routes into DT_DATA.DAY_TOURS
    const sbCruiseRoutes = SupabaseSyncState.routes.filter(r => {
      const name = (r.name || '').toLowerCase();
      return name.includes('tour') || name.includes('du thuyền') || name.includes('cruise') || name.includes('tiệc bbq');
    });

    if (sbCruiseRoutes.length > 0) {
      sbCruiseRoutes.forEach(scr => {
        const nameLower = (scr.name || '').toLowerCase();
        let targetId = null;
        if (nameLower.includes('vip 1') || nameLower.includes('fullday vip 1')) targetId = 'vip1';
        else if (nameLower.includes('sunset') || nameLower.includes('hoàng hôn')) targetId = 'sunset';
        else if (nameLower.includes('morning') || nameLower.includes('bình minh') && !nameLower.includes('vip 3')) targetId = 'morning';
        else if (nameLower.includes('vip 3')) targetId = 'vip3';
        else if (nameLower.includes('vip 4')) targetId = 'vip4';
        else if (nameLower.includes('vip 5') || nameLower.includes('bbq')) targetId = 'vip5';

        if (targetId) {
          const dtTour = window.DT_DATA.DAY_TOURS.find(t => t.id === targetId);
          if (dtTour) {
            dtTour.supabaseId = scr.id;
            dtTour.peak = scr.price || dtTour.peak;
            dtTour.low = Math.round((scr.price || dtTour.peak) * 0.9);
            dtTour.supabaseTitle = scr.name;
          }
        }
      });
    }

    // 4. Synchronize Overnight Luxury Cruises from Supabase tours table into DT_DATA.SUITES
    if (SupabaseSyncState.tours.length > 0) {
      const luxTour = SupabaseSyncState.tours.find(t => (t.title || '').includes('LUXURY CRUISE') || (t.title || '').includes('2 NGÀY 1 ĐÊM'));
      if (luxTour && window.DT_DATA.SUITES) {
        const baseRate = luxTour.price || 5000000;
        window.DT_DATA.SUITES.forEach((s, idx) => {
          s.supabaseTourId = luxTour.id;
          s.pr2N = Math.round(baseRate * (1 + idx * 0.15));
          s.pr3N = Math.round(s.pr2N * 1.85);
        });
      }
    }

    // 5. Notify React components about the live synced data
    window.dispatchEvent(new CustomEvent('dt:supabase_synced', { detail: SupabaseSyncState }));
    console.log('✅ [Supabase Sync] Đã nạp thành công dữ liệu Supabase vào hệ thống Daiichi!');
  }

  // Load data: try live Supabase API first, fallback to cached JSON
  async function initSupabaseSync() {
    SupabaseSyncState.isSyncing = true;
    try {
      // First attempt: fetch cached data from local preview server for instant 2ms load
      const cachedRes = await fetch('/shared/supabase_data.json');
      if (cachedRes.ok) {
        const cachedData = await cachedRes.json();
        applySupabaseDataToDT(cachedData);
      }
    } catch (e) {
      console.warn('Không thể đọc file cache nội bộ, thử kết nối Supabase trực tiếp:', e);
    }

    // Background refresh directly from live Supabase Cloud
    try {
      const [routes, trips, tours, vehicles, stops] = await Promise.all([
        fetchSupabaseTable('routes', 200),
        fetchSupabaseTable('trips', 500),
        fetchSupabaseTable('tours', 50),
        fetchSupabaseTable('vehicles', 100),
        fetchSupabaseTable('stops', 500)
      ]);
      applySupabaseDataToDT({ routes, trips, tours, vehicles, stops });
    } catch (err) {
      console.warn('⚠️ Kết nối Supabase trực tiếp gặp lỗi, dùng dữ liệu cache đã nạp:', err);
    } finally {
      SupabaseSyncState.isSyncing = false;
    }
  }

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSupabaseSync);
  } else {
    initSupabaseSync();
  }

  window.DT_SUPABASE_SYNC = {
    state: SupabaseSyncState,
    sync: initSupabaseSync
  };

})(window);
