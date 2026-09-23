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
    stops: [],
    roomTypes: [],
    bookings: []
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

  // Calculate booked seats set for a trip
  function getBookedSeatCount(tripId, bookingsList) {
    if (!tripId || !bookingsList) return 0;
    const bks = bookingsList.filter(b => b.trip_id === tripId && b.status !== 'CANCELLED');
    const bookedSeatIds = new Set();
    bks.forEach(b => {
      const seats = b.seats || (b.seat_ids) || (b.seat_id ? [b.seat_id] : []);
      seats.forEach(s => { if (s) bookedSeatIds.add(String(s)); });
    });
    return bookedSeatIds.size;
  }

  // Map and enrich DT_DATA with Supabase records
  function applySupabaseDataToDT(data) {
    if (!window.DT_DATA) return;

    SupabaseSyncState.routes = data.routes || [];
    SupabaseSyncState.trips = data.trips || [];
    SupabaseSyncState.tours = data.tours || [];
    SupabaseSyncState.vehicles = data.vehicles || [];
    SupabaseSyncState.stops = data.stops || [];
    SupabaseSyncState.roomTypes = data.property_room_types || data.roomTypes || [];
    SupabaseSyncState.bookings = data.bookings || [];
    SupabaseSyncState.lastSynced = new Date();

    // 1. Expose raw Supabase dataset on DT_DATA
    window.DT_DATA.SUPABASE = {
      projectId: SupabaseSyncState.projectId,
      routes: SupabaseSyncState.routes,
      trips: SupabaseSyncState.trips,
      tours: SupabaseSyncState.tours,
      vehicles: SupabaseSyncState.vehicles,
      stops: SupabaseSyncState.stops,
      roomTypes: SupabaseSyncState.roomTypes,
      bookings: SupabaseSyncState.bookings,
      syncedAt: SupabaseSyncState.lastSynced
    };

    // 2. Synchronize Bus Routes & real pricing into DT_DATA.BUS
    const sbBusRoutes = SupabaseSyncState.routes.filter(r => {
      const name = (r.name || '').toLowerCase();
      return !name.includes('tour') && !name.includes('du thuyền') && !name.includes('cruise') && !name.includes('tiệc bbq');
    });

    if (sbBusRoutes.length > 0) {
      sbBusRoutes.forEach(sbr => {
        const price = sbr.price || 250000;
        const dep = sbr.departure_point || '';
        const arr = sbr.arrival_point || '';

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
        else if (nameLower.includes('morning') || (nameLower.includes('bình minh') && !nameLower.includes('vip 3'))) targetId = 'morning';
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

    // 4. Synchronize Overnight Luxury Suites from Supabase property_room_types table into DT_DATA.SUITES
    if (SupabaseSyncState.roomTypes.length > 0 && window.DT_DATA.SUITES) {
      SupabaseSyncState.roomTypes.forEach(rt => {
        const rtName = (rt.name || '').toLowerCase();
        let matched = null;
        if (rtName.includes('deluxe')) matched = window.DT_DATA.SUITES.find(s => s.id === 'deluxe');
        else if (rtName.includes('senior')) matched = window.DT_DATA.SUITES.find(s => s.id === 'senior');
        else if (rtName.includes('royal')) matched = window.DT_DATA.SUITES.find(s => s.id === 'royal');
        else if (rtName.includes('exec') || rtName.includes('family')) matched = window.DT_DATA.SUITES.find(s => s.id === 'executive');
        else if (rtName.includes('balcony') || rtName.includes('premium')) matched = window.DT_DATA.SUITES.find(s => s.id === 'premium');
        else if (rtName.includes('trip') || rtName.includes('junior')) matched = window.DT_DATA.SUITES.find(s => s.id === 'junior');

        if (matched) {
          matched.supabaseId = rt.id;
          matched.basePrice = rt.base_price;
          matched.n1 = rt.base_price;
          matched.n2 = Math.round(rt.base_price * 1.85);
          matched.totalUnits = rt.total_units || matched.count;
          matched.areaSqm = rt.area_sqm;
          matched.capacityAdults = rt.capacity_adults;
          if (rt.images && rt.images.length > 0) {
            matched.realImg = rt.images[0];
          }
        }
      });
    }

    // 5. Notify React components about the live synced data
    window.dispatchEvent(new CustomEvent('dt:supabase_synced', { detail: SupabaseSyncState }));
    console.log('✅ [Supabase Sync] Đã nạp thành công dữ liệu Supabase vào hệ thống Daiichi!');
  }

  // Load data: try live Supabase API first, fallback to cached JSON
  async function initSupabaseSync() {
    SupabaseSyncState.isSyncing = true;
    try {
      // First attempt: fetch cached data from local preview server for instant load
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
      const [routes, trips, tours, vehicles, stops, roomTypes, bookings] = await Promise.all([
        fetchSupabaseTable('routes', 200),
        fetchSupabaseTable('trips', 1000),
        fetchSupabaseTable('tours', 50),
        fetchSupabaseTable('vehicles', 100),
        fetchSupabaseTable('stops', 500),
        fetchSupabaseTable('property_room_types', 50),
        fetchSupabaseTable('bookings', 1000)
      ]);
      applySupabaseDataToDT({
        routes,
        trips,
        tours,
        vehicles,
        stops,
        property_room_types: roomTypes,
        bookings
      });
    } catch (err) {
      console.warn('⚠️ Kết nối Supabase trực tiếp gặp lỗi, dùng dữ liệu cache đã nạp:', err);
    } finally {
      SupabaseSyncState.isSyncing = false;
    }
  }

  // Helper: Query trips for route with calculated available seats
  function getTripsWithAvailability(fromName = 'Hà Nội', toName = 'Cát Bà', dateStr) {
    const allTrips = SupabaseSyncState.trips || [];
    const allVehicles = SupabaseSyncState.vehicles || [];
    const allBookings = SupabaseSyncState.bookings || [];

    // Filter matching trips by route name
    let matching = allTrips.filter(t => {
      const r = (t.route || '').toLowerCase();
      const matchFrom = r.includes(fromName.toLowerCase());
      const matchTo = r.includes(toName.toLowerCase());
      const isFromDir = r.indexOf(fromName.toLowerCase()) < r.indexOf(toName.toLowerCase());
      return matchFrom && matchTo && isFromDir;
    });

    if (matching.length === 0) {
      matching = allTrips.filter(t => (t.route || '').toLowerCase().includes('cát bà'));
    }

    // If dateStr provided, prioritize or filter matching date, else group by typical daily times
    const distinctTimesMap = new Map();

    matching.forEach(tr => {
      // Vehicle type deduction
      const rLower = (tr.route || '').toLowerCase();
      let vehType = 'bus45';
      let vehLabel = 'Bus thường 45 chỗ';
      let vehImg = 'assets/photos/limo10.jpg';
      let badge = 'kèm tàu cao tốc';
      let duration = '3h';
      let wifi = 'WiFi · USB';
      let totalCapacity = 45;

      if (rLower.includes('limogreen') || rLower.includes('xe điện') || rLower.includes('7 chỗ')) {
        vehType = 'limo7';
        vehLabel = 'Limo Green 7 chỗ (xe điện)';
        vehImg = 'assets/photos/limo10.jpg';
        duration = '3h';
        wifi = 'WiFi · EV';
        totalCapacity = 7;
      } else if (rLower.includes('34') || rLower.includes('34 ghế') || rLower.includes('34 chỗ')) {
        vehType = 'limo34';
        vehLabel = 'Limousine Luxury 34 ghế';
        vehImg = 'assets/photos/limo10.jpg';
        duration = '3h30';
        wifi = 'WiFi · USB';
        totalCapacity = 34;
      } else if (rLower.includes('11') || rLower.includes('11 ghế')) {
        vehType = 'limo11';
        vehLabel = 'Limousine Luxury 11 ghế';
        vehImg = 'assets/photos/limo10.jpg';
        duration = '3h';
        wifi = 'WiFi · USB';
        totalCapacity = 11;
      } else if (rLower.includes('limousine')) {
        vehType = 'limo34';
        vehLabel = 'Limousine Luxury 34 ghế';
        duration = '3h30';
        totalCapacity = 34;
      }

      // Check seats array in trip
      if (tr.seats && tr.seats.length > 0) {
        totalCapacity = tr.seats.length;
      }

      // Calculate booked seats
      const bookedCount = getBookedSeatCount(tr.id, allBookings);
      const availableSeats = Math.max(0, totalCapacity - bookedCount);

      // Key by time + vehType for clean schedule presentation
      const key = `${tr.time}_${vehType}`;
      if (!distinctTimesMap.has(key)) {
        distinctTimesMap.set(key, {
          id: tr.id,
          time: tr.time,
          arrTime: calculateArrivalTime(tr.time, duration),
          route: tr.route,
          date: tr.date || dateStr,
          price: tr.price || 250000,
          vehType,
          vehLabel,
          badge,
          duration,
          wifi,
          totalCapacity,
          availableSeats,
          tripRef: tr
        });
      }
    });

    const result = Array.from(distinctTimesMap.values());
    result.sort((a, b) => (a.time || '').localeCompare(b.time || ''));
    return result;
  }

  function calculateArrivalTime(timeStr, durStr) {
    if (!timeStr) return '08:00';
    const [h, m] = timeStr.split(':').map(Number);
    let durH = 3;
    let durM = 0;
    if (durStr && durStr.includes('3h30')) {
      durH = 3;
      durM = 30;
    }
    let totalM = (h * 60 + (m || 0)) + (durH * 60 + durM);
    let newH = Math.floor(totalM / 60) % 24;
    let newM = totalM % 60;
    return `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
  }

  // Deep link generator to core engine DaiichiTravel.com
  function buildBookingDeepLink({ from = 'Hà Nội', to = 'Cát Bà', date, tripId, vehType, price }) {
    const params = new URLSearchParams({
      tab: 'book-ticket',
      from: from,
      to: to
    });
    if (date) params.set('date', date);
    if (tripId) params.set('tripId', tripId);
    if (vehType) params.set('vehicle', vehType);
    if (price) params.set('price', price);
    params.set('source', 'daiichicruise_seo');
    return `https://daiichitravel.com/?${params.toString()}`;
  }

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSupabaseSync);
  } else {
    initSupabaseSync();
  }

  window.DT_SUPABASE_SYNC = {
    state: SupabaseSyncState,
    sync: initSupabaseSync,
    getTripsWithAvailability,
    buildBookingDeepLink,
    getBookedSeatCount
  };

})(window);
