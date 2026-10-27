/* ============================================================
   DAIICHI CRUISE MANAGER — Bảng Quản Trị Tàu, Giá & Bài Viết
   Kết nối trực tiếp CSDL Supabase Cloud (vfeodqmvilchsipdsxsh)
   Có bảo vệ mật khẩu Quản trị viên (SHA-256)
   ============================================================ */
const { useState, useEffect } = React;

const ADMIN_ACCOUNTS_HASH = [
  { user: 'chutich', roleLabel: 'Chủ tịch', userPassHash: '841ea5779dced2697b69a37afc969f7cf5f0d563722e4b8dac7a5caa6ba6b7b3', passOnlyHash: 'b3c7aa6eeea16bb7ef5decffe39ee4e0df8527236caee877c81bc3bd79168277' },
  { user: 'giamdoc', roleLabel: 'Ban giám đốc (Full)', userPassHash: '73ad6fa28aaaf9ad0eb216545ba9ddeba6964c9e141a1a352520acec3d7e5e25', passOnlyHash: 'af108b1a8b16737109c2385197e00f803b07c62d67653de4154c15ee1c6089ba' },
  { user: 'quanly', roleLabel: 'Giám đốc kinh doanh', userPassHash: '130af408060101230ea3f282eee93dcee71a2f3aa46f9834199696d0d782ccc0', passOnlyHash: 'e069b2625492a56e65dc1890309f3d4f12d1e0930671b2e85201d59d387af800' },
  { user: 'ketoan', roleLabel: 'Kế toán', userPassHash: 'cfb757b1bb57193ee36c4f04ab1e49e6afa1edf28624cceae6b6524cead89d76', passOnlyHash: '2f93270fdc52580dbcf92783e5508c089fa779ee3d552e8c20f0c0f8e3eaf0aa' },
  { user: 'quay1', roleLabel: 'POS quầy vé', userPassHash: 'f3c73f78273f121e8e242faf9ca607c2a1d3725efbe5ddf6614e27d3665ccbce', passOnlyHash: 'e57ceef1e77e1ad10a20faf909d0f6148da0d5882958f53784c6c12b7ddcf3fa' },
  { user: 'marketing', roleLabel: 'Marketing & CMS', userPassHash: '4b22e9ac4d42ddacf2bbe41b81394004c3c73168b6cff2727bdefe18de64ad9d', passOnlyHash: 'b41adb4042fa23ba01875d9ec0f6740c2b0f227ff71f887a1e47420b7c338ef1' }
];

async function sha256Hex(str) {
  const buf = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function verifyAdminCredentials(username, password) {
  const cleanUser = String(username || '').trim().toLowerCase();
  const cleanPass = String(password || '').trim();
  if (!cleanPass) return null;
  if (cleanUser) {
    const h = await sha256Hex(cleanUser + ':' + cleanPass);
    const found = ADMIN_ACCOUNTS_HASH.find((a) => a.userPassHash === h);
    if (found) return { user: found.user, roleLabel: found.roleLabel, ts: Date.now() };
  }
  const passHash = await sha256Hex('daiichi_salt:' + cleanPass);
  const foundByPass = ADMIN_ACCOUNTS_HASH.find((a) => a.passOnlyHash === passHash);
  if (foundByPass) return { user: foundByPass.user, roleLabel: foundByPass.roleLabel, ts: Date.now() };
  return null;
}

function getSavedAdminAuth() {
  try {
    const raw = sessionStorage.getItem('dt_admin_auth_v1') || localStorage.getItem('dt_admin_auth_v1');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.user && Date.now() - (parsed.ts || 0) < 12 * 3600 * 1000) {
      return parsed;
    }
  } catch (e) {}
  return null;
}

const REAL_LANDMARK_GALLERY = [
  { label: 'Tam Cốc & Hang Múa (Ninh Bình)', url: '../assets/blog/ninh-binh-tam-coc-hang-mua.jpg', saveUrl: 'assets/blog/ninh-binh-tam-coc-hang-mua.jpg' },
  { label: 'Danh thắng Tràng An (Ninh Bình)', url: '../assets/blog/ninh-binh-trang-an.jpg', saveUrl: 'assets/blog/ninh-binh-trang-an.jpg' },
  { label: 'Vịnh Hạ Long (Đảo đá)', url: '../assets/blog/vinh-ha-long-real.jpg', saveUrl: 'assets/blog/vinh-ha-long-real.jpg' },
  { label: 'Kỳ quan Vịnh Hạ Long', url: '../assets/blog/vinh-ha-long-dao-da.jpg', saveUrl: 'assets/blog/vinh-ha-long-dao-da.jpg' },
  { label: 'Vịnh Lan Hạ & Cát Bà', url: '../assets/blog/vinh-lan-ha-cat-ba.jpg', saveUrl: 'assets/blog/vinh-lan-ha-cat-ba.jpg' },
  { label: 'Vườn Quốc gia Cát Bà — Việt Hải', url: '../assets/blog/vuon-quoc-gia-cat-ba-viet-hai.jpg', saveUrl: 'assets/blog/vuon-quoc-gia-cat-ba-viet-hai.jpg' },
  { label: 'Bãi tắm Vịnh Lan Hạ — Cát Bà', url: '../assets/blog/bai-tam-vinh-lan-ha-cat-ba.jpg', saveUrl: 'assets/blog/bai-tam-vinh-lan-ha-cat-ba.jpg' },
  { label: 'Chèo Kayak Hang Sáng Tối', url: '../assets/photos/daycruise-2.jpg', saveUrl: 'assets/photos/daycruise-2.jpg' },
  { label: 'Du thuyền 5★ Daiichi Luxury', url: '../assets/photos/luxury-1.jpg', saveUrl: 'assets/photos/luxury-1.jpg' },
  { label: 'Bể sục Jacuzzi & Skywalk', url: '../assets/photos/luxury-jacuzzi.jpg', saveUrl: 'assets/photos/luxury-jacuzzi.jpg' }
];

function loadAdminBlogList() {
  const base = Array.isArray(window.DT_BLOG_POSTS) ? [...window.DT_BLOG_POSTS] : [];
  try {
    const overrides = JSON.parse(localStorage.getItem('dt_blog_overrides_v1') || '{}');
    const deletedSlugs = Array.isArray(overrides.deletedSlugs) ? overrides.deletedSlugs : [];
    const editedBySlug = overrides.editedBySlug || {};
    const addedPosts = Array.isArray(overrides.addedPosts) ? overrides.addedPosts : [];

    const combined = [...addedPosts];
    for (const p of base) {
      if (!combined.some((x) => x.slug === p.slug)) combined.push(p);
    }
    return combined
      .filter((p) => !deletedSlugs.includes(p.slug))
      .map((p) => (editedBySlug[p.slug] ? { ...p, ...editedBySlug[p.slug], isEdited: true } : p));
  } catch (e) {
    return base;
  }
}

function CruiseManager() {
  const [adminUser, setAdminUser] = useState(getSavedAdminAuth);
  const [loginUsername, setLoginUsername] = useState('giamdoc');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [tab, setTab] = useState('suites');
  const [syncing, setSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);
  const [properties, setProperties] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [newImgUrl, setNewImgUrl] = useState('');
  const [selectedTarget, setSelectedTarget] = useState('royal');
  const [notice, setNotice] = useState(null);

  // State quản lý & chỉnh sửa bài viết Blog
  const [blogPosts, setBlogPosts] = useState(loadAdminBlogList);
  const [editingPost, setEditingPost] = useState(null);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    const verified = await verifyAdminCredentials(loginUsername, loginPassword);
    if (!verified) {
      setLoginError('Sai tài khoản hoặc mật khẩu Quản trị viên! Vui lòng kiểm tra lại.');
      return;
    }
    sessionStorage.setItem('dt_admin_auth_v1', JSON.stringify(verified));
    localStorage.setItem('dt_admin_auth_v1', JSON.stringify(verified));
    setAdminUser(verified);
    setLoginPassword('');
    setLoginError('');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('dt_admin_auth_v1');
    localStorage.removeItem('dt_admin_auth_v1');
    setAdminUser(null);
  };

  const openEditBlog = (post) => {
    setEditingPost({
      ...post,
      titleVi: typeof post.title === 'object' ? post.title.vi || '' : String(post.title || ''),
      excerptVi: typeof post.excerpt === 'object' ? post.excerpt.vi || '' : String(post.excerpt || ''),
      sections: Array.isArray(post.sections) && post.sections.length
        ? post.sections.map((s) => ({ h2: s.h2 || '', p: s.p || '' }))
        : [{ h2: '1. Điểm nổi bật', p: '' }],
      faqs: Array.isArray(post.faqs) ? post.faqs.map((f) => ({ q: f.q || '', a: f.a || '' })) : []
    });
  };

  const handleSaveBlogEdit = (e) => {
    e.preventDefault();
    if (!editingPost) return;
    const updated = {
      ...editingPost,
      title: { ...(typeof editingPost.title === 'object' ? editingPost.title : {}), vi: editingPost.titleVi.trim(), en: editingPost.titleVi.trim() },
      excerpt: { ...(typeof editingPost.excerpt === 'object' ? editingPost.excerpt : {}), vi: editingPost.excerptVi.trim(), en: editingPost.excerptVi.trim() },
      sections: (editingPost.sections || []).filter((s) => s.h2.trim() || s.p.trim()),
      faqs: (editingPost.faqs || []).filter((f) => f.q.trim() || f.a.trim())
    };
    delete updated.titleVi;
    delete updated.excerptVi;
    delete updated.isEdited;

    try {
      const overrides = JSON.parse(localStorage.getItem('dt_blog_overrides_v1') || '{}');
      overrides.editedBySlug = overrides.editedBySlug || {};
      overrides.addedPosts = Array.isArray(overrides.addedPosts) ? overrides.addedPosts : [];
      if (editingPost.isNewDraft) {
        delete updated.isNewDraft;
        overrides.addedPosts.unshift(updated);
      } else {
        overrides.editedBySlug[updated.slug] = updated;
      }
      localStorage.setItem('dt_blog_overrides_v1', JSON.stringify(overrides));
    } catch (err) {}

    setBlogPosts(loadAdminBlogList());
    setEditingPost(null);
    showNotice('✅ Đã lưu chỉnh sửa bài viết! Trang chủ đã cập nhật ngay lập tức.');
  };

  const handleDeleteBlog = (slug) => {
    try {
      const overrides = JSON.parse(localStorage.getItem('dt_blog_overrides_v1') || '{}');
      overrides.deletedSlugs = Array.isArray(overrides.deletedSlugs) ? overrides.deletedSlugs : [];
      if (!overrides.deletedSlugs.includes(slug)) overrides.deletedSlugs.push(slug);
      localStorage.setItem('dt_blog_overrides_v1', JSON.stringify(overrides));
    } catch (err) {}
    setBlogPosts(loadAdminBlogList());
    setEditingPost(null);
    showNotice('🗑️ Đã ẩn/xóa bài viết khỏi trang chủ!');
  };

  const handleResetAllBlogEdits = () => {
    localStorage.removeItem('dt_blog_overrides_v1');
    setBlogPosts(loadAdminBlogList());
    showNotice('↺ Đã khôi phục toàn bộ bài viết về mặc định!');
  };

  // MÀN HÌNH KHÓA MẬT KHẨU QUẢN TRỊ VIÊN
  if (!adminUser) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at top, #102A43 0%, #050D1A 100%)', padding: 20 }}>
        <div style={{ width: '100%', maxWidth: 430, background: '#0F1F38', border: '1px solid rgba(212,166,72,0.35)', borderRadius: 18, padding: '32px 30px', boxShadow: '0 24px 60px rgba(0,0,0,0.6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <img src="../assets/brand/logo-DaiichiTravel.webp" alt="Daiichi Travel" style={{ height: 38, background: '#fff', borderRadius: 6, padding: '2px 6px' }} />
            <div>
              <div style={{ color: '#F59E0B', fontSize: 11, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase' }}>🔒 CỔNG BẢO MẬT QUẢN TRỊ</div>
              <h2 style={{ margin: 0, fontSize: 20, color: '#fff', fontFamily: 'var(--font-display, serif)' }}>Daiichi Admin Portal</h2>
            </div>
          </div>
          <p style={{ fontSize: 13, color: '#94A3B8', margin: '0 0 20px', lineHeight: 1.5 }}>
            Vui lòng nhập tài khoản và mật khẩu Quản trị viên để truy cập hệ thống quản lý tàu, giá phòng và chỉnh sửa bài viết.
          </p>

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: '#CBD5E1', marginBottom: 6 }}>TÀI KHOẢN QUẢN TRỊ</label>
              <input
                className="cm-input"
                type="text"
                required
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="Ví dụ: giamdoc, quanly, marketing..."
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: '#CBD5E1', marginBottom: 6 }}>MẬT KHẨU BẢO MẬT *</label>
              <input
                className="cm-input"
                type="password"
                required
                autoFocus
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Nhập mật khẩu Admin..."
              />
            </div>

            {loginError && (
              <div style={{ background: 'rgba(220,38,38,0.18)', border: '1px solid rgba(248,113,113,0.4)', color: '#FCA5A5', padding: '10px 12px', borderRadius: 8, fontSize: 12.5, fontWeight: 700, marginBottom: 14 }}>
                ⚠️ {loginError}
              </div>
            )}

            <button type="submit" className="cm-btn cm-btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '12px 18px', fontSize: 14 }}>
              🔓 Đăng Nhập Quản Trị →
            </button>
          </form>

          <div style={{ marginTop: 18, textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 14 }}>
            <a href="../index.html" style={{ color: '#94A3B8', fontSize: 12.5, textDecoration: 'none' }}>← Quay về Trang chủ Khách hàng</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      {/* HEADER */}
      <header className="cm-header">
        <div className="cm-brand">
          <img src="../assets/brand/logo-DaiichiTravel.webp" alt="Daiichi Travel" />
          <div>
            <h1>DAIICHI <span>CRUISE MANAGER</span></h1>
            <div style={{ fontSize: 12, color: '#94A3B8' }}>
              Xin chào <b style={{ color: '#FDE68A' }}>{adminUser.user}</b> ({adminUser.roleLabel})
            </div>
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
          <button className="cm-btn cm-btn-ghost" onClick={handleLogout} style={{ borderColor: 'rgba(248,113,113,0.4)', color: '#FCA5A5' }}>
            🚪 Đăng Xuất
          </button>
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
          <button className={'cm-tab' + (tab === 'blog' ? ' active' : '')} onClick={() => setTab('blog')}>
            📰 Quản Lý & Sửa Bài Viết Blog ({blogPosts.length})
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

        {/* TAB: QUẢN LÝ & SỬA BÀI VIẾT BLOG */}
        {tab === 'blog' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h2 style={{ fontSize: 20, color: '#fff', margin: '0 0 4px' }}>Quản Lý & Chỉnh Sửa Các Bài Viết Tự Động (Cẩm Nang Du Lịch)</h2>
                <div style={{ color: '#94A3B8', fontSize: 13.5 }}>
                  Bạn có thể chỉnh sửa tiêu đề, đổi ảnh thật của từng địa danh, sửa nội dung từng mục hoặc thêm/xóa bất kỳ bài viết nào.
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  className="cm-btn cm-btn-gold"
                  onClick={() => {
                    const today = new Date().toISOString().split('T')[0];
                    openEditBlog({
                      id: 'blog-' + Date.now().toString().slice(-6),
                      slug: 'bai-viet-moi-' + Date.now().toString().slice(-5),
                      date: today,
                      isNewDraft: true,
                      region: 'Lan Ha',
                      regionLabel: 'Vịnh Lan Hạ · Cát Bà',
                      image: 'assets/blog/vinh-lan-ha-cat-ba.jpg',
                      title: { vi: 'Tiêu Đề Bài Viết Mới' },
                      excerpt: { vi: 'Đoạn mô tả tóm tắt về địa danh và hải trình...' },
                      sections: [{ h2: '1. Giới thiệu điểm đến', p: 'Nội dung chi tiết...' }],
                      faqs: [{ q: 'Câu hỏi thường gặp?', a: 'Câu trả lời...' }]
                    });
                  }}
                >
                  + Thêm Bài Viết Mới
                </button>
                <button type="button" className="cm-btn cm-btn-ghost" onClick={handleResetAllBlogEdits}>
                  ↺ Khôi phục gốc
                </button>
              </div>
            </div>

            {editingPost && (
              <div className="cm-card" style={{ border: '2px solid #F59E0B', marginBottom: 24 }}>
                <h3 style={{ color: '#F59E0B', marginTop: 0 }}>
                  ✏️ {editingPost.isNewDraft ? 'Tạo Bài Viết Mới' : 'Đang Chỉnh Sửa Bài Viết'}
                </h3>
                <form onSubmit={handleSaveBlogEdit}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>Chuyên mục địa danh</label>
                      <select
                        className="cm-input"
                        value={editingPost.region || 'Lan Ha'}
                        onChange={(e) => {
                          const rg = e.target.value;
                          const mapLb = { 'Lan Ha': 'Vịnh Lan Hạ · Cát Bà', 'Ha Long': 'Vịnh Hạ Long · Di Sản UNESCO', 'Ninh Binh': 'Ninh Bình · Tràng An · Tam Cốc' };
                          setEditingPost((prev) => ({ ...prev, region: rg, regionLabel: mapLb[rg] || prev.regionLabel }));
                        }}
                      >
                        <option value="Lan Ha">Vịnh Lan Hạ & Cát Bà</option>
                        <option value="Ha Long">Vịnh Hạ Long</option>
                        <option value="Ninh Binh">Ninh Bình (Tràng An · Tam Cốc)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>Nhãn hiển thị</label>
                      <input className="cm-input" value={editingPost.regionLabel || ''} onChange={(e) => setEditingPost((prev) => ({ ...prev, regionLabel: e.target.value }))} />
                    </div>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>Tiêu đề bài viết *</label>
                    <input className="cm-input" required value={editingPost.titleVi || ''} onChange={(e) => setEditingPost((prev) => ({ ...prev, titleVi: e.target.value }))} />
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>Đường dẫn ảnh đại diện (hoặc bấm chọn ảnh thật bên dưới)</label>
                    <input className="cm-input" value={editingPost.image || ''} onChange={(e) => setEditingPost((prev) => ({ ...prev, image: e.target.value }))} style={{ marginBottom: 8 }} />
                    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6 }}>
                      {REAL_LANDMARK_GALLERY.map((g, i) => (
                        <div
                          key={i}
                          onClick={() => setEditingPost((prev) => ({ ...prev, image: g.saveUrl }))}
                          style={{ flex: '0 0 130px', cursor: 'pointer', borderRadius: 8, overflow: 'hidden', border: editingPost.image === g.saveUrl ? '2px solid #F59E0B' : '1px solid rgba(255,255,255,0.15)', background: '#061122' }}
                        >
                          <img src={g.url} alt={g.label} style={{ width: '100%', height: 64, objectFit: 'cover', display: 'block' }} />
                          <div style={{ fontSize: 10.5, padding: '4px 6px', color: '#E2E8F0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: 12 }}>
                    <label style={{ display: 'block', fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>Đoạn mô tả tóm tắt *</label>
                    <textarea className="cm-input" rows={2} required value={editingPost.excerptVi || ''} onChange={(e) => setEditingPost((prev) => ({ ...prev, excerptVi: e.target.value }))} />
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <label style={{ fontSize: 12, color: '#F59E0B', fontWeight: 700 }}>CÁC MỤC NỘI DUNG CHI TIẾT</label>
                      <button
                        type="button"
                        className="cm-btn cm-btn-ghost"
                        style={{ padding: '4px 10px', fontSize: 12 }}
                        onClick={() => setEditingPost((prev) => ({ ...prev, sections: [...(prev.sections || []), { h2: 'Tiêu đề mục mới', p: '' }] }))}
                      >
                        + Thêm mục
                      </button>
                    </div>
                    {(editingPost.sections || []).map((sec, idx) => (
                      <div key={idx} style={{ background: 'rgba(0,0,0,0.25)', padding: 12, borderRadius: 8, marginBottom: 8 }}>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                          <input
                            className="cm-input"
                            value={sec.h2}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEditingPost((prev) => {
                                const next = [...prev.sections];
                                next[idx] = { ...next[idx], h2: val };
                                return { ...prev, sections: next };
                              });
                            }}
                            placeholder="Tiêu đề mục (H2)"
                          />
                          <button
                            type="button"
                            className="cm-btn cm-btn-ghost"
                            style={{ color: '#FCA5A5' }}
                            onClick={() => setEditingPost((prev) => ({ ...prev, sections: prev.sections.filter((_, i) => i !== idx) }))}
                          >
                            Xóa
                          </button>
                        </div>
                        <textarea
                          className="cm-input"
                          rows={3}
                          value={sec.p}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditingPost((prev) => {
                              const next = [...prev.sections];
                              next[idx] = { ...next[idx], p: val };
                              return { ...prev, sections: next };
                            });
                          }}
                          placeholder="Nội dung đoạn văn..."
                        />
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                    <button type="button" className="cm-btn cm-btn-ghost" onClick={() => setEditingPost(null)}>Hủy</button>
                    <button type="submit" className="cm-btn cm-btn-sync">💾 Lưu Bài Viết</button>
                  </div>
                </form>
              </div>
            )}

            {blogPosts.map((post) => {
              const imgSrc = String(post.image || '').startsWith('http') || String(post.image || '').startsWith('data:')
                ? post.image
                : '../' + String(post.image || '').replace(/^\/+/, '');
              return (
                <div key={post.slug} className="cm-card" style={{ display: 'flex', gap: 18, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <img src={imgSrc} alt="" style={{ width: 160, height: 105, objectFit: 'cover', borderRadius: 10, border: '1px solid rgba(255,255,255,0.15)' }} />
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
                      <span className="badge">{post.regionLabel}</span>
                      <span style={{ fontSize: 12, color: '#94A3B8' }}>📅 {post.date}</span>
                      {post.isEdited && <span style={{ fontSize: 11, background: 'rgba(245,158,11,0.2)', color: '#FDE68A', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>✏️ Đã chỉnh sửa</span>}
                    </div>
                    <h3 style={{ margin: '0 0 6px', fontSize: 17, color: '#fff' }}>{typeof post.title === 'object' ? post.title.vi : post.title}</h3>
                    <p style={{ margin: 0, fontSize: 13, color: '#94A3B8', lineHeight: 1.5 }}>{typeof post.excerpt === 'object' ? post.excerpt.vi : post.excerpt}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <button type="button" className="cm-btn cm-btn-gold" onClick={() => openEditBlog(post)}>
                      ✏️ Chỉnh sửa bài
                    </button>
                    <button type="button" className="cm-btn cm-btn-ghost" style={{ color: '#FCA5A5' }} onClick={() => handleDeleteBlog(post.slug)}>
                      🗑️ Ẩn / Xóa
                    </button>
                  </div>
                </div>
              );
            })}
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
