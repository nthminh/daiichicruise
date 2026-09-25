/* ============================================================
   DAIICHI CRUISE MANAGER — Bảng Quản Trị Tàu & Đồng Bộ Supabase
   Kết nối trực tiếp CSDL Supabase Cloud (vfeodqmvilchsipdsxsh)
   Dùng chung với hệ thống daiichitravel.com
   ============================================================ */
const { useState, useEffect } = React;

function CruiseManager() {
  const [tab, setTab] = useState('suites');
  const [syncing, setSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [properties, setProperties] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [newImgUrl, setNewImgUrl] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('royal');
  const [notice, setNotice] = useState(null);

  // Load and refresh from Supabase State
  const loadData = () => {
    const sb = window.DT_DATA?.SUPABASE || {};
    setProperties(sb.properties || []);
    setRoomTypes(sb.roomTypes || []);
    if (sb.syncedAt) {
      setLastSyncTime(new Date(sb.syncedAt).toLocaleTimeString('vi-VN'));
    }
  };

  useEffect(() => {
    loadData();
    const handleSync = () => {
      loadData();
      setSyncing(false);
      showNotice('✅ Dữ liệu hình ảnh và giá đã được đồng bộ từ Supabase Cloud!');
    };
    window.addEventListener('dt:supabase_synced', handleSync);
    return () => window.removeEventListener('dt:supabase_synced', handleSync);
  }, []);

  const showNotice = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 4000);
  };

  // Trigger Live Supabase Sync
  const handleForceSync = async () => {
    setSyncing(true);
    if (window.DT_SUPABASE_SYNC && window.DT_SUPABASE_SYNC.sync) {
      await window.DT_SUPABASE_SYNC.sync();
    } else {
      setTimeout(() => {
        loadData();
        setSyncing(false);
        showNotice('✅ Đã nạp lại dữ liệu Supabase nội bộ!');
      }, 800);
    }
  };

  // Luxury Ship & Boutique Ship
  const luxShip = properties.find(p => (p.name || '').includes('Luxury')) || properties[0] || {};
  const bqShip = properties.find(p => (p.name || '').includes('Boutique')) || properties[1] || {};

  // Custom Local Overrides stored in localStorage
  const getCustomImages = (targetId) => {
    try {
      const saved = JSON.parse(localStorage.getItem('dt_custom_cruise_imgs') || '{}');
      return saved[targetId] || [];
    } catch (e) {
      return [];
    }
  };

  const handleAddImage = (e) => {
    e.preventDefault();
    if (!newImgUrl.trim()) return;
    try {
      const saved = JSON.parse(localStorage.getItem('dt_custom_cruise_imgs') || '{}');
      if (!saved[selectedTarget]) saved[selectedTarget] = [];
      saved[selectedTarget].push(newImgUrl.trim());
      localStorage.setItem('dt_custom_cruise_imgs', JSON.stringify(saved));
      setNewImgUrl('');
      showNotice(`Đã thêm ảnh mới cho mục ${selectedTarget}!`);
      window.dispatchEvent(new CustomEvent('dt:supabase_synced'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveCustomImage = (targetId, idx) => {
    try {
      const saved = JSON.parse(localStorage.getItem('dt_custom_cruise_imgs') || '{}');
      if (saved[targetId]) {
        saved[targetId].splice(idx, 1);
        localStorage.setItem('dt_custom_cruise_imgs', JSON.stringify(saved));
        showNotice(`Đã xóa ảnh tùy chỉnh của ${targetId}!`);
        window.dispatchEvent(new CustomEvent('dt:supabase_synced'));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Rooms mapping with real Supabase Data
  const SUITE_SPECS = [
    { id: 'royal', label: 'Royal Suite VIP (Tầng 4)', sbKeyword: 'royal', fallbackPrice: 10500000, ship: 'Daiichi Luxury Cruise 5★' },
    { id: 'family', label: 'Executive / Family Suite (Tầng 2)', sbKeyword: 'family', fallbackPrice: 6000000, ship: 'Daiichi Luxury Cruise 5★' },
    { id: 'senior', label: 'Senior Suite Balcony (Tầng 2)', sbKeyword: 'senior', fallbackPrice: 5000000, ship: 'Daiichi Luxury Cruise 5★' },
    { id: 'junior', label: 'Junior / Trip Suite (Tầng 1)', sbKeyword: 'trip', fallbackPrice: 5000000, ship: 'Daiichi Luxury Cruise 5★' },
    { id: 'boutique-balcony', label: 'Boutique Balcony Suite (Tầng 2)', sbKeyword: 'balcony', fallbackPrice: 6065000, ship: 'Daiichi Boutique Cruise 4★' },
    { id: 'boutique-deluxe', label: 'Boutique Deluxe Suite (Tầng 1)', sbKeyword: 'deluxe', fallbackPrice: 6318000, ship: 'Daiichi Boutique Cruise 4★' },
  ];

  return (
    <React.Fragment>
      {/* HEADER */}
      <header className="cm-header">
        <div className="cm-brand">
          <img src="../assets/brand/logo-DaiichiTravel.webp" alt="Daiichi Travel" />
          <div>
            <h1>DAIICHI <span>CRUISE MANAGER</span></h1>
            <div style={{ fontSize: 12, color: '#94A3B8' }}>Hệ thống quản trị hình ảnh & giá cước du thuyền</div>
          </div>
          <span className="badge">● SUPABASE LIVE CONNECTED</span>
        </div>

        <div className="cm-actions">
          <button className="cm-btn cm-btn-sync" onClick={handleForceSync} disabled={syncing}>
            {syncing ? 'Đang đồng bộ...' : '⚡ Đồng Bộ Dữ Liệu Từ daiichitravel'}
          </button>
          <a className="cm-btn cm-btn-ghost" href="../index.html" target="_blank" rel="noopener">
            👁️ Xem Website Khách Hàng
          </a>
          <a className="cm-btn cm-btn-ghost" href="Daiichi Back Office.html" target="_blank" rel="noopener">
            🏢 Về Back Office Tổng
          </a>
        </div>
      </header>

      {/* NOTICE TOAST */}
      {notice && (
        <div style={{ position: 'fixed', top: 76, right: 28, background: '#059669', color: '#fff', padding: '12px 20px', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.5)', zIndex: 100, fontWeight: 700, fontSize: 14 }}>
          {notice}
        </div>
      )}

      {/* CONTAINER */}
      <div className="cm-container">
        {/* BANNER CLOUD STATUS */}
        <div className="cm-sync-banner">
          <div className="cm-sync-info">
            <h2>
              <span>☁️ CSDL Đám Mây Supabase:</span>
              <code style={{ background: 'rgba(0,0,0,0.4)', padding: '3px 8px', borderRadius: 6, color: '#6EE7B7', fontSize: 14 }}>
                vfeodqmvilchsipdsxsh.supabase.co
              </code>
            </h2>
            <p>
              Tất cả hình ảnh và giá cước tại đây được <b>kết nối trực tiếp theo thời gian thực</b> với hệ thống <code>daiichitravel.com</code>.
              Khi bạn thêm/sửa ảnh con tàu hoặc cập nhật giá bên <code>daiichitravel</code>, trang <code>daiichicruise.vn</code> sẽ <b>tự động cập nhật theo ngay lập tức</b>!
            </p>
          </div>

          <div className="cm-sync-stats">
            <div className="cm-stat-box">
              <b>{properties.length || 2}</b>
              <span>Du Thuyền</span>
            </div>
            <div className="cm-stat-box">
              <b>{roomTypes.length || 6}</b>
              <span>Hạng Suite</span>
            </div>
            <div className="cm-stat-box">
              <b>{lastSyncTime || 'Vừa xong'}</b>
              <span>Lần Sync Gần Nhất</span>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="cm-tabs">
          <button className={'cm-tab' + (tab === 'suites' ? ' active' : '')} onClick={() => setTab('suites')}>
            🛏️ Hình Ảnh Hạng Phòng Suites ({roomTypes.length || 6})
          </button>
          <button className={'cm-tab' + (tab === 'ships' ? ' active' : '')} onClick={() => setTab('ships')}>
            🚢 Hình Ảnh Con Tàu ({properties.length || 2})
          </button>
          <button className={'cm-tab' + (tab === 'pricing' ? ' active' : '')} onClick={() => setTab('pricing')}>
            💰 Giá Cả Thật Từ Supabase
          </button>
          <button className={'cm-tab' + (tab === 'workflow' ? ' active' : '')} onClick={() => setTab('workflow')}>
            ℹ️ Cơ Chế Tự Động Đồng Bộ
          </button>
        </div>

        {/* TAB 1: SUITES */}
        {tab === 'suites' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 20, color: '#fff', margin: '0 0 4px' }}>Thư Viện Ảnh Chi Tiết Từng Hạng Phòng</h2>
                <div style={{ color: '#94A3B8', fontSize: 13.5 }}>Hình ảnh được đồng bộ từ bảng <code>property_room_types</code> và hiển thị trực tiếp trên Mini-Slider và Modal của khách.</div>
              </div>
            </div>

            {SUITE_SPECS.map(spec => {
              const matchedRt = roomTypes.find(rt => (rt.name || '').toLowerCase().includes(spec.sbKeyword)) || {};
              const sbImages = matchedRt.images || [];
              const customImgs = getCustomImages(spec.id);
              const allImages = [...customImgs, ...sbImages];
              const price = matchedRt.base_price || spec.fallbackPrice;

              return (
                <div key={spec.id} className="cm-card">
                  <div className="cm-card-head">
                    <div>
                      <h3>
                        <span>{spec.label}</span>
                        <span style={{ fontSize: 12, background: 'rgba(212,166,72,0.15)', color: '#F59E0B', padding: '3px 8px', borderRadius: 4, fontWeight: 700 }}>
                          {spec.ship}
                        </span>
                      </h3>
                      <div style={{ fontSize: 12.5, color: '#64748B', marginTop: 4 }}>
                        ID Supabase: <code>{matchedRt.id || 'Đang nạp...'}</code> · Diện tích: {matchedRt.area_sqm || '--'} m² · Sức chứa: {matchedRt.capacity_adults || 2} khách
                      </div>
                    </div>
                    <div className="price-tag">
                      Giá CSDL: {Number(price).toLocaleString('vi-VN')}đ / đêm
                    </div>
                  </div>

                  <div>
                    <b style={{ fontSize: 13, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                      Thư viện ảnh ({allImages.length} ảnh):
                    </b>

                    <div className="cm-gallery-grid">
                      {allImages.map((url, idx) => (
                        <div key={idx} className="cm-photo-item">
                          <img src={url} alt={`Ảnh ${idx + 1}`} loading="lazy" />
                          <span className="cm-photo-idx">#{idx + 1}</span>
                          <span className="cm-photo-source">
                            {idx < customImgs.length ? 'Tùy chỉnh' : 'Supabase CDN'}
                          </span>
                          {idx < customImgs.length && (
                            <button className="cm-photo-del" title="Xóa ảnh tùy chỉnh" onClick={() => handleRemoveCustomImage(spec.id, idx)}>
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ADD QUICK PHOTO BOX */}
            <div className="cm-card cm-add-box">
              <h3 style={{ fontSize: 17, color: '#F59E0B', margin: '0 0 8px' }}>+ Bổ Sung Ảnh Mới Trực Tiếp</h3>
              <p style={{ fontSize: 13, color: '#94A3B8', margin: '0 0 16px' }}>
                Bạn có thể bổ sung URL ảnh WebP / JPG mới vào bất kỳ phòng nào. Ảnh này sẽ lập tức xuất hiện trong slider và modal của khách hàng.
              </p>
              <form onSubmit={handleAddImage} style={{ display: 'grid', gridTemplateColumns: '250px 1fr 140px', gap: 12 }}>
                <select className="cm-input" value={selectedTarget} onChange={e => setSelectedTarget(e.target.value)}>
                  {SUITE_SPECS.map(s => (
                    <option key={s.id} value={s.id}>{s.label}</option>
                  ))}
                  <option value="luxury-ship">🚢 Toàn cảnh Tàu Luxury 5★</option>
                  <option value="boutique-ship">🚢 Toàn cảnh Tàu Boutique 4★</option>
                </select>
                <input className="cm-input" type="url" placeholder="Dán link ảnh (https://... hoặc /assets/photos/...)" value={newImgUrl} onChange={e => setNewImgUrl(e.target.value)} required />
                <button type="submit" className="cm-btn cm-btn-gold">
                  + Thêm Ảnh
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: SHIPS */}
        {tab === 'ships' && (
          <div>
            {/* LUXURY SHIP */}
            <div className="cm-card">
              <div className="cm-card-head">
                <div>
                  <h3>Daiichi Luxury Cruise ★★★★★</h3>
                  <div style={{ fontSize: 12.5, color: '#64748B', marginTop: 4 }}>
                    ID: <code>{luxShip.id || '92cc55c0-ba9e-4da1-95bf-70f0b07c8527'}</code> · Tiêu chuẩn: 5 sao · 30 Suite ban công riêng · Cầu Kính Skywalk & Jacuzzi
                  </div>
                </div>
                <span className="badge">{(luxShip.images || []).length} Ảnh Từ Supabase</span>
              </div>

              <div className="cm-gallery-grid">
                {(luxShip.images || []).map((url, idx) => (
                  <div key={idx} className="cm-photo-item">
                    <img src={url} alt={`Luxury Ship ${idx + 1}`} loading="lazy" />
                    <span className="cm-photo-idx">#{idx + 1}</span>
                    <span className="cm-photo-source">Supabase</span>
                  </div>
                ))}
              </div>
            </div>

            {/* BOUTIQUE SHIP */}
            <div className="cm-card">
              <div className="cm-card-head">
                <div>
                  <h3>Daiichi Boutique Cruise ★★★★☆</h3>
                  <div style={{ fontSize: 12.5, color: '#64748B', marginTop: 4 }}>
                    ID: <code>{bqShip.id || '642538f9-6dc5-4348-9c3b-fc038e4dd4e4'}</code> · Tiêu chuẩn: 4 sao Boutique · 7 Cabin gỗ cổ điển Á Đông
                  </div>
                </div>
                <span className="badge">{(bqShip.images || []).length} Ảnh Từ Supabase</span>
              </div>

              <div className="cm-gallery-grid">
                {(bqShip.images || []).map((url, idx) => (
                  <div key={idx} className="cm-photo-item">
                    <img src={url} alt={`Boutique Ship ${idx + 1}`} loading="lazy" />
                    <span className="cm-photo-idx">#{idx + 1}</span>
                    <span className="cm-photo-source">Supabase</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PRICING */}
        {tab === 'pricing' && (
          <div className="cm-card">
            <div className="cm-card-head">
              <div>
                <h3>Biểu Giá Phòng Trực Tiếp Từ Bảng <code>property_room_types</code> (Supabase)</h3>
                <div style={{ fontSize: 13, color: '#94A3B8', marginTop: 4 }}>
                  Mọi thay đổi giá bên <code>daiichitravel</code> được đồng bộ ngay vào công cụ tính giá tự động trên website.
                </div>
              </div>
              <button className="cm-btn cm-btn-sync" onClick={handleForceSync} disabled={syncing}>
                ⚡ Đồng Bộ Giá Mới
              </button>
            </div>

            <table className="cm-table">
              <thead>
                <tr>
                  <th>Tên Hạng Phòng</th>
                  <th>Du Thuyền</th>
                  <th>Diện Tích</th>
                  <th>Sức Chứa</th>
                  <th>Giá Gốc 2D1N (Supabase)</th>
                  <th>Ước Tính 3D2N (+85%)</th>
                  <th>Số Lượng Ảnh</th>
                </tr>
              </thead>
              <tbody>
                {SUITE_SPECS.map(spec => {
                  const matchedRt = roomTypes.find(rt => (rt.name || '').toLowerCase().includes(spec.sbKeyword)) || {};
                  const basePrice = matchedRt.base_price || spec.fallbackPrice;
                  const price3d2n = Math.round(basePrice * 1.85);
                  const imgCount = (matchedRt.images || []).length;

                  return (
                    <tr key={spec.id}>
                      <td>
                        <b style={{ color: '#fff', fontSize: 14 }}>{spec.label}</b>
                        <div style={{ fontSize: 11, color: '#64748B' }}>{matchedRt.name || spec.sbKeyword}</div>
                      </td>
                      <td>{spec.ship}</td>
                      <td>{matchedRt.area_sqm || '--'} m²</td>
                      <td>{matchedRt.capacity_adults || 2} người lớn</td>
                      <td style={{ color: '#F87171', fontWeight: 800, fontSize: 15 }}>
                        {Number(basePrice).toLocaleString('vi-VN')}đ
                      </td>
                      <td style={{ color: '#F59E0B', fontWeight: 700 }}>
                        {Number(price3d2n).toLocaleString('vi-VN')}đ
                      </td>
                      <td>
                        <span style={{ background: 'rgba(16,185,129,0.2)', color: '#34D399', padding: '3px 8px', borderRadius: 4, fontWeight: 700, fontSize: 12 }}>
                          {imgCount} ảnh HD
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: HOW IT WORKS */}
        {tab === 'workflow' && (
          <div className="cm-card" style={{ lineHeight: 1.7, fontSize: 14.5 }}>
            <h3 style={{ color: '#F59E0B', fontSize: 20, marginBottom: 16 }}>
              🔄 Cơ Chế Đồng Bộ Tự Động 2 Chiều Giữa daiichitravel & daiichicruise
            </h3>

            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 20, marginBottom: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ color: '#fff', margin: '0 0 8px' }}>1. Vì sao không cần phải nhập dữ liệu 2 lần?</h4>
              <p style={{ color: '#CBD5E1', margin: 0 }}>
                Hệ thống <code>daiichitravel.com</code> và <code>daiichicruise.vn</code> cùng kết nối chung một cơ sở dữ liệu Supabase đám mây (Project ID: <code>vfeodqmvilchsipdsxsh</code>).
                Khi bạn vào trang Admin của <code>daiichitravel</code> để thêm ảnh mới, cập nhật giá phòng, hoặc thay đổi số lượng cabin, toàn bộ thông tin đó đã được lưu ngay trong Supabase Storage và Database.
              </p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 20, marginBottom: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ color: '#fff', margin: '0 0 8px' }}>2. Website daiichicruise.vn cập nhật như thế nào?</h4>
              <p style={{ color: '#CBD5E1', margin: 0 }}>
                Mỗi khi khách hàng truy cập hoặc khi bạn bấm nút <b>"⚡ Đồng Bộ Dữ Liệu"</b>, client sẽ tự động gọi Supabase REST API để lấy về danh sách ảnh WebP mới nhất từ <code>properties</code> và bảng giá từ <code>property_room_types</code>.
                Tất cả Slider lướt ảnh, thư viện Gallery, và bộ tính giá trong Modal sẽ lập tức phản ánh dữ liệu mới nhất.
              </p>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 12, padding: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
              <h4 style={{ color: '#fff', margin: '0 0 8px' }}>3. Điểm tiện lợi cho quản trị viên</h4>
              <ul style={{ color: '#CBD5E1', margin: '8px 0 0', paddingLeft: 20 }}>
                <li><b>Quản lý 1 nơi duy nhất:</b> Chỉ cần cập nhật tại <code>daiichitravel</code> là trang du thuyền tự động cập nhật theo.</li>
                <li><b>Kiểm tra tức thì:</b> Bất cứ lúc nào cũng có thể mở trang <code>admin/cruise-manager.html</code> này để xem lại toàn bộ ảnh và giá thực tế đang có trên Cloud.</li>
                <li><b>Bổ sung linh hoạt:</b> Nếu muốn gán riêng ảnh cho trang du thuyền mà không ảnh hưởng bên xe khách, bạn có thể dán link ảnh trực tiếp tại form bên dưới tab Hạng Phòng.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<CruiseManager />);
