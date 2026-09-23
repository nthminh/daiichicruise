/* DAIICHI BACK OFFICE — core: dataset, login, shell, shared widgets */
const { useState, useEffect, useMemo } = React;

/* ---------- icons (reuse-lite) ---------- */
const BIc = ({ d, size = 17, sw = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d}</svg>
);
const BI = {
  dash: (p) => <BIc {...p} d={<g><rect x="4" y="4" width="7" height="9" rx="1.5"/><rect x="13" y="4" width="7" height="5" rx="1.5"/><rect x="13" y="11" width="7" height="9" rx="1.5"/><rect x="4" y="15" width="7" height="5" rx="1.5"/></g>} />,
  ticket: (p) => <BIc {...p} d={<g><path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8z"/><path d="M14 6v12"/></g>} />,
  seat: (p) => <BIc {...p} d={<g><path d="M6 4h12v9H6z"/><path d="M4 13h16v5H4zM7 18v2M17 18v2"/></g>} />,
  tag: (p) => <BIc {...p} d={<g><path d="M4 4h7l9 9-7 7-9-9V4z"/><circle cx="8.5" cy="8.5" r="1.5"/></g>} />,
  chart: (p) => <BIc {...p} d={<g><path d="M4 20V10M10 20V4M16 20v-8M21 20H3"/></g>} />,
  users: (p) => <BIc {...p} d={<g><circle cx="9" cy="8" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0M16 5a3.5 3.5 0 0 1 0 7M21 20a6 6 0 0 0-5-5.9"/></g>} />,
  pos: (p) => <BIc {...p} d={<g><rect x="4" y="4" width="16" height="10" rx="2"/><path d="M8 18h8M12 14v4"/></g>} />,
  wallet: (p) => <BIc {...p} d={<g><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18M15 15h3"/></g>} />,
  out: (p) => <BIc {...p} d={<g><path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4M10 8l-4 4 4 4M6 12h10"/></g>} />,
  check: (p) => <BIc {...p} d={<path d="M4.5 12.5l5 5L19.5 7" />} />,
};

/* ---------- deterministic demo dataset ---------- */
const ADMIN_DB = (() => {
  const names = ['Nguyễn Văn Hùng','Trần Thị Mai','Lê Quang Đạt','Phạm Hồng Nhung','Hoàng Minh Tuấn','Vũ Thu Hà','Đỗ Tiến Dũng','Bùi Ngọc Anh','Phan Thanh Sơn','Đặng Kim Chi','Yuki Tanaka','Kim Min-jun','Wang Lei','Claire Dubois','James Carter','Đinh Văn Lâm','Ngô Thuý Hằng','Trịnh Công Minh'];
    const agents = [
    { id: 'ag1', name: 'An Phú Travel', contact: 'Ms. Lan · 0912 334 556', limit: 50000000, debt: 12400000, comm: 0.08, tier: 'Vàng' },
    { id: 'ag2', name: 'Hòa Bình Tourist', contact: 'Mr. Quân · 0988 102 334', limit: 30000000, debt: 21500000, comm: 0.10, tier: 'Bạc' },
    { id: 'ag3', name: 'SunViet Travel', contact: 'Ms. Hương · 0905 667 889', limit: 20000000, debt: 4200000, comm: 0.08, tier: 'Bạc' },
  ];
  const products = [
    { lb: 'Bus HN → Cát Bà · Limo 11 + tàu', unit: 360000, kind: 'bus' },
    { lb: 'Bus HN → Hải Phòng · Limo 10', unit: 210000, kind: 'bus' },
    { lb: 'Bus Cát Bà → Ninh Bình', unit: 300000, kind: 'bus' },
    { lb: 'Day Cruise VIP 1 · Lan Hạ – Việt Hải', unit: 720000, kind: 'day' },
    { lb: 'Day Cruise Sunset', unit: 430000, kind: 'day' },
    { lb: 'Day Cruise VIP 4 · 5★', unit: 850000, kind: 'day' },
    { lb: 'Combo VIP 4 + Bus Hà Nội', unit: 1350000, kind: 'tour' },
    { lb: 'Luxury Cruise · Senior Suite 2N1Đ', unit: 3250000, kind: 'lux' },
    { lb: 'Luxury Cruise · Royal Suite 3N2Đ', unit: 7280000, kind: 'lux' },
    { lb: 'Luxury Cruise · Deluxe Suite 2N1Đ', unit: 2860000, kind: 'lux' },
  ];
  const channels = ['web','web','web','agent','agent','pos','ota'];
  const pays = ['VNPay','MoMo','Visa','Tiền mặt','Công nợ ĐL'];
  const statuses = ['paid','paid','paid','paid','hold','checkedin','refund'];
  let h = 20260610;
  const rnd = () => { h = (h * 1103515245 + 12345) >>> 0; return h / 4294967295; };
  const bookings = [];
  for (let i = 0; i < 46; i++) {
    const p = products[Math.floor(rnd() * products.length)];
    const pax = p.kind === 'lux' ? 1 + Math.floor(rnd() * 2) : 1 + Math.floor(rnd() * 4);
    const ch = channels[Math.floor(rnd() * channels.length)];
    const ag = ch === 'agent' ? agents[Math.floor(rnd() * agents.length)] : null;
    const day = 1 + Math.floor(rnd() * 10);
    const st = statuses[Math.floor(rnd() * statuses.length)];
    bookings.push({
      code: 'DT26-' + ['8X4K2','M3PQ7','Z6T2N','K9WD4','A2VR8','P5HJ3','Q7CM6','B4XN9','E8SL2','G3FT7'][i % 10].slice(0, 3) + String(100 + i),
      name: names[Math.floor(rnd() * names.length)],
      product: p.lb, kind: p.kind, pax,
      total: p.unit * pax,
      date: '2026-06-' + String(day).padStart(2, '0'),
      time: ['05:00','07:00','08:00','09:00','11:45','12:30','15:30','16:30'][Math.floor(rnd() * 8)],
      channel: ch, agent: ag ? ag.name : null,
      pay: ch === 'agent' ? 'Công nợ ĐL' : pays[Math.floor(rnd() * 4)],
      status: st,
      phone: '09' + String(Math.floor(rnd() * 90000000) + 10000000),
      created: '2026-06-' + String(Math.max(1, day - 1 - Math.floor(rnd() * 3))).padStart(2, '0'),
    });
  }
  bookings.sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));

  // revenue last 14 days (bus/day vs lux split for stacked bars)
  const revDays = [];
  for (let d = 28; d <= 31; d++) revDays.push('05-' + d);
  for (let d = 1; d <= 10; d++) revDays.push('06-' + String(d).padStart(2, '0'));
  const revenue = revDays.map((d, i) => {
    const base = 18 + 14 * Math.abs(Math.sin(i * 1.7));
    const lux = 8 + 10 * Math.abs(Math.sin(i * 0.9 + 2));
    return { d, bus: Math.round(base), lux: Math.round(lux) };
  });

  const promos = [
    { id: 'pr1', name: 'EARLYBIRD12', desc: 'Giảm 12% du thuyền ngủ đêm, đặt trước 30 ngày', scope: 'Luxury Cruise', off: '−12%', active: true, used: 86 },
    { id: 'pr2', name: 'COMBOHN50', desc: 'Giảm 50K combo bus + day cruise từ Hà Nội', scope: 'Combo', off: '−50.000đ', active: true, used: 214 },
    { id: 'pr3', name: 'SUMMER26', desc: 'Giảm 8% tour VIP 3/4/5 các ngày trong tuần', scope: 'Day Cruise', off: '−8%', active: false, used: 452 },
  ];
  return { agents, bookings, revenue, promos };
})();

const fmtM = (n) => (n / 1000000).toFixed(1).replace('.', ',') + 'M';
const fmtVnd = (n) => n.toLocaleString('vi-VN') + 'đ';
const STATUS_BADGE = {
  paid: ['ok', 'Đã thanh toán'], hold: ['warn', 'Giữ chỗ'], refund: ['bad', 'Hoàn vé'], checkedin: ['info', 'Đã check-in'],
};
const CHANNEL_LB = { web: 'Website', agent: 'Đại lý', pos: 'Quầy vé', ota: 'OTA' };

function Badge({ kind, children }) { return <span className={'bo-badge ' + kind}>{children}</span>; }

/* ---------- role login ---------- */
function RoleLogin({ onPick }) {
  const roles = [
    { id: 'manager', lb: 'Quản lý', d: 'Dashboard · giá & khuyến mãi · báo cáo · đối tác', c: 'var(--navy)', Icon: BI.dash },
    { id: 'staff', lb: 'Nhân viên quầy (POS)', d: 'Bán vé tại quầy · check-in · soát vé', c: 'var(--red)', Icon: BI.pos },
    { id: 'agent', lb: 'Đại lý', d: 'Giá net · đặt hộ khách · công nợ & hoa hồng', c: 'var(--gold)', Icon: BI.users },
    { id: 'partner', lb: 'Đối tác vận hành', d: 'Xe / tàu / tour của đơn vị ngoài bán trên nền tảng', c: '#2563A8', Icon: BI.ship || BI.wallet },
  ];
  return (
    <div className="bo-login" data-screen-label="Đăng nhập Back Office">
      <div className="bo-login-card">
        <div className="lg"><img src="../assets/brand/logo-DaiichiTravel.webp" alt="Daiichi" /></div>
        <h1>Daiichi Back Office</h1>
        <div className="sub">Một hệ thống cho cả 4 thương hiệu — chọn vai trò để vào không gian làm việc (demo, không cần mật khẩu)</div>
        <div className="bo-roles">
          {roles.map((r) => (
            <button key={r.id} className="bo-role" onClick={() => onPick(r.id)}>
              <span className="ic" style={{ background: r.c }}><r.Icon size={20} /></span>
              <span><b>{r.lb}</b><span className="d">{r.d}</span></span>
              <span className="go">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- shell ---------- */
function Shell({ role, menu, view, setView, onLogout, children }) {
  const userInfo = { manager: ['QL', 'Trần Quản Lý', 'Giám đốc kinh doanh'], staff: ['NV', 'Lê Thu Trang', 'Quầy vé Cát Bà'], agent: ['AP', 'An Phú Travel', 'Đại lý hạng Vàng'], partner: ['HC', 'Hùng Cường Express', 'Đối tác vận hành'] }[role];
  return (
    <div className="bo">
      <aside className="bo-side">
        <div className="bo-side-logo">
          <img src="../assets/brand/logo-DaiichiTravel.webp" alt="" />
          <div><b>DAIICHI</b><span>BACK OFFICE</span></div>
        </div>
        <nav className="bo-nav">
          {menu.map((m) => m.sep
            ? <div key={m.sep} className="sep">{m.sep}</div>
            : <button key={m.id} className={view === m.id ? 'on' : ''} onClick={() => setView(m.id)}><m.Icon size={16} />{m.lb}</button>
          )}
        </nav>
        <div className="bo-side-user">
          <span className="av">{userInfo[0]}</span>
          <div><b>{userInfo[1]}</b><span>{userInfo[2]}</span></div>
          <button onClick={onLogout}>Thoát</button>
        </div>
      </aside>
      <main className="bo-main">{children}</main>
    </div>
  );
}

/* ---- LIÊN THÔNG THẬT: booking khách đặt trên website (DT_STORE/localStorage) đổ vào admin ---- */
try {
  const web = Object.values(JSON.parse(localStorage.getItem('dt_bookings') || '{}'));
  const PAY_LB = { vnpay: 'VNPay', momo: 'MoMo', card: 'Visa/Master', counter: 'Tại quầy' };
  const mapped = web.map((b) => ({
    code: b.code,
    name: b.name || 'Khách web',
    product: (b.fromLabel || '') + ' → ' + (b.toLabel || '') + (b.timeGo ? ' · ' + b.timeGo : ''),
    kind: b.kind === 'luxury' ? 'lux' : b.kind === 'daycruise' ? 'day' : b.kind === 'cart' ? 'tour' : (b.kind || 'bus'),
    pax: b.seats ? b.seats.length : 1,
    total: b.total || 0,
    date: b.date || '', time: b.timeGo || '',
    channel: 'web', agent: null,
    pay: PAY_LB[b.pay] || 'VNPay',
    status: b.cancelled ? 'refund' : 'paid',
    phone: b.phone || '',
    created: String(b.created || '').slice(0, 10),
    isWeb: true,
  }));
  mapped.sort((a, b) => (b.created || '').localeCompare(a.created || ''));
  ADMIN_DB.bookings = [...mapped, ...ADMIN_DB.bookings];
  ADMIN_DB.webCount = mapped.length;
} catch (e) {}

/* quantity stepper (admin copy) */
function Stepper({ v, set, min = 0, max = 20 }) {
  return (
    <span className="dt-stepper" style={{ background: '#fff' }}>
      <button onClick={() => set(Math.max(min, v - 1))}>−</button>
      <span>{v}</span>
      <button onClick={() => set(Math.min(max, v + 1))}>+</button>
    </span>
  );
}

Object.assign(window, { BI, BIc, ADMIN_DB, fmtM, fmtVnd, STATUS_BADGE, CHANNEL_LB, Badge, RoleLogin, Shell, Stepper });
