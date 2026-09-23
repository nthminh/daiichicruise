/* DAIICHI — 4 mobile app concepts in device frames */
const { useState } = React;

const C = { navy: '#122441', red: '#A8121E', redB: '#D81F2A', gold: '#B98A3C', goldB: '#D4A648', ivory: '#FAF8F4', line: '#E4DFD5', ink: '#1C2433', ink2: '#4A5468', ink3: '#8A91A3', ok: '#1F7A4D' };
const F = { fontFamily: "'Be Vietnam Pro', -apple-system, system-ui, sans-serif" };

function TabBar({ items, active }) {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: '1px solid ' + C.line, display: 'flex', padding: '8px 6px 26px', zIndex: 40 }}>
      {items.map(([ic, lb], i) => (
        <div key={i} style={{ flex: 1, textAlign: 'center', color: i === active ? C.red : C.ink3, ...F }}>
          <div style={{ fontSize: 19 }}>{ic}</div>
          <div style={{ fontSize: 9.5, fontWeight: 600, marginTop: 1 }}>{lb}</div>
        </div>
      ))}
    </div>
  );
}
function MiniQR({ size = 84, seed = 'DT' }) {
  const n = 13; const cells = [];
  let h = 0; for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const fin = (x < 4 && y < 4) || (x > n - 5 && y < 4) || (x < 4 && y > n - 5);
    h = (h * 1103515245 + 12345) >>> 0;
    if (fin ? ((x === 0 || y === 0 || x === 3 || y === 3 || x === n - 4 || y === n - 4 || x === n - 1 || y === n - 1) || (x > 0 && x < 3 && y > 0 && y < 3) || false) : (h & 7) < 3)
      cells.push(<i key={x + '-' + y} style={{ gridColumn: x + 1, gridRow: y + 1, background: C.navy }}></i>);
  }
  return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${n},1fr)`, gridTemplateRows: `repeat(${n},1fr)`, width: size, height: size, background: '#fff', padding: 6, borderRadius: 8, border: '1px solid ' + C.line }}>{cells}</div>;
}

/* ---------- 1 · customer app ---------- */
function AppCustomer() {
  /* LIÊN THÔNG THẬT: đọc vé mới nhất khách đặt trên website (chung kho dt_bookings) */
  const real = (() => {
    try {
      const all = Object.values(JSON.parse(localStorage.getItem('dt_bookings') || '{}')).filter((b) => !b.cancelled);
      return all.length ? all[all.length - 1] : null;
    } catch (e) { return null; }
  })();
  const bk = real || { code: 'DT26-8X4K2', fromLabel: 'Hà Nội', toLabel: 'Cát Bà', date: '2026-06-15', timeGo: '08:00', seats: ['A2', 'A3'], pickup: '24 Hàng Bè' };
  return (
    <div style={{ background: C.ivory, minHeight: '100%', paddingBottom: 90, ...F }}>
      <div style={{ background: C.navy, padding: '64px 18px 18px', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.6)' }}>Xin chào 👋</div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Nguyễn Văn Hùng</div>
          </div>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: C.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>H</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 12, marginTop: 14, padding: 12, display: 'flex', gap: 8 }}>
          {[['🚌', 'Xe & Limo'], ['🛳️', 'Day Cruise'], ['🌙', 'Ngủ đêm'], ['🗺️', 'Combo']].map(([ic, lb], i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', color: C.ink }}>
              <div style={{ width: 40, height: 40, margin: '0 auto', borderRadius: 11, background: i === 0 ? '#FBEAEA' : C.ivory, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{ic}</div>
              <div style={{ fontSize: 9.5, fontWeight: 600, marginTop: 4 }}>{lb}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '14px 18px' }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: C.ink, marginBottom: 8 }}>Chuyến sắp tới</div>
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid ' + C.line, overflow: 'hidden' }}>
          <div style={{ background: C.navy, color: '#fff', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
            <b style={{ color: C.goldB }}>{bk.code}</b><span>{real ? '● Đồng bộ từ web ✓' : 'Đã thanh toán ✓'}</span>
          </div>
          <div style={{ padding: 14, display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.ink }}>{bk.fromLabel} → {bk.toLabel}</div>
              <div style={{ fontSize: 11.5, color: C.ink2, marginTop: 3 }}>{bk.date} · {bk.timeGo || '—'}{real && bk.paxLabel ? ' · ' + bk.paxLabel : ' · Limousine 11 + tàu cao tốc'}</div>
              <div style={{ fontSize: 11.5, color: C.ink2 }}>{bk.seats ? 'Ghế ' + bk.seats.join(', ') : ''}{bk.pickup ? ' · Đón: ' + bk.pickup : ''}</div>
              <div style={{ display: 'inline-block', marginTop: 7, fontSize: 10.5, fontWeight: 700, color: C.ok, background: '#E3F2E9', padding: '3px 9px', borderRadius: 9 }}>Xe đến sau 35 phút · theo dõi GPS</div>
            </div>
            <MiniQR seed={bk.code} />
          </div>
        </div>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: C.ink, margin: '16px 0 8px' }}>Ưu đãi cho bạn</div>
        <div style={{ background: 'linear-gradient(120deg, #B98A3C, #D4A648)', borderRadius: 14, padding: '14px 16px', color: '#fff' }}>
          <div style={{ fontSize: 13.5, fontWeight: 800 }}>EARLYBIRD12 — giảm 12%</div>
          <div style={{ fontSize: 11, opacity: .9, marginTop: 2 }}>Du thuyền ngủ đêm 5★, đặt trước 30 ngày</div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          {[['Điểm DG', '1.240'], ['Hạng thẻ', 'Vàng'], ['Chuyến đi', '8']].map(([lb, v], i) => (
            <div key={i} style={{ flex: 1, background: '#fff', border: '1px solid ' + C.line, borderRadius: 12, padding: '10px 0', textAlign: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: C.navy }}>{v}</div>
              <div style={{ fontSize: 9.5, color: C.ink3 }}>{lb}</div>
            </div>
          ))}
        </div>
      </div>
      <TabBar items={[['⌂', 'Trang chủ'], ['🎫', 'Vé của tôi'], ['％', 'Ưu đãi'], ['👤', 'Tài khoản']]} active={0} />
    </div>
  );
}

/* ---------- 2 · driver app ---------- */
function AppDriver() {
  const [picked, setPicked] = useState({ 0: true, 1: true });
  const pax = [
    ['Nguyễn Văn Hùng', '24 Hàng Bè · 2 khách', '07:15'],
    ['Claire Dubois', 'Nhà hát Lớn · 1 khách', '07:22'],
    ['Trần Thị Mai', '36 Mã Mây · 3 khách', '07:30'],
    ['Kim Min-jun', 'Hilton Opera · 2 khách', '07:38'],
    ['Lê Quang Đạt', 'Ga Hà Nội · 1 khách', '07:50'],
  ];
  const done = Object.values(picked).filter(Boolean).length;
  return (
    <div style={{ background: '#0F1E38', minHeight: '100%', paddingBottom: 90, ...F, color: '#fff' }}>
      <div style={{ padding: '64px 18px 0' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)' }}>DAIICHI DRIVER · BKS 29B-123.45</div>
        <div style={{ fontSize: 18, fontWeight: 800, marginTop: 2 }}>HN → Cát Bà · 08:00</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          {[['Khách', done + '/9'], ['Điểm đón', '5'], ['Khởi hành', '08:00']].map(([lb, v], i) => (
            <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,.07)', borderRadius: 11, padding: '9px 0', textAlign: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: '#D4A648' }}>{v}</div>
              <div style={{ fontSize: 9.5, color: 'rgba(255,255,255,.55)' }}>{lb}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, margin: '16px 0 8px', color: 'rgba(255,255,255,.75)' }}>Lộ trình đón khách — phố cổ</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {pax.map(([nm, pt, tm], i) => (
            <div key={i} onClick={() => setPicked({ ...picked, [i]: !picked[i] })}
              style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 12, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 11, cursor: 'pointer' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', flex: 'none', border: '2px solid ' + (picked[i] ? '#2FA56F' : 'rgba(255,255,255,.3)'), background: picked[i] ? '#2FA56F' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>{picked[i] ? '✓' : ''}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{nm}</div>
                <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,.55)' }}>{pt}</div>
              </div>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: '#D4A648' }}>{tm}</div>
            </div>
          ))}
        </div>
        <button style={{ width: '100%', marginTop: 14, background: '#D81F2A', color: '#fff', border: 0, borderRadius: 12, padding: '13px 0', fontSize: 14, fontWeight: 800, ...F }}>
          ▶ Bắt đầu chuyến · mở chỉ đường
        </button>
      </div>
      <TabBar items={[['🚌', 'Chuyến'], ['🗓️', 'Lịch tuần'], ['💬', 'Điều hành'], ['👤', 'Tôi']]} active={0} />
    </div>
  );
}

/* ---------- 3 · agent app ---------- */
function AppAgent() {
  return (
    <div style={{ background: C.ivory, minHeight: '100%', paddingBottom: 90, ...F }}>
      <div style={{ background: 'linear-gradient(150deg, #B98A3C, #8F6A2A)', padding: '64px 18px 16px', color: '#fff' }}>
        <div style={{ fontSize: 11, opacity: .8 }}>DAIICHI AGENT · Hạng Vàng</div>
        <div style={{ fontSize: 17, fontWeight: 800 }}>An Phú Travel</div>
        <div style={{ background: 'rgba(255,255,255,.14)', borderRadius: 12, padding: '11px 13px', marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
            <span>Công nợ: <b>12,4M / 50M</b></span><span>Kỳ TT: 15/06</span>
          </div>
          <div style={{ height: 6, borderRadius: 4, background: 'rgba(255,255,255,.25)', marginTop: 7 }}>
            <div style={{ width: '25%', height: '100%', borderRadius: 4, background: '#fff' }}></div>
          </div>
        </div>
      </div>
      <div style={{ padding: '14px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: C.ink }}>Giá net của bạn (−8%)</div>
          <div style={{ fontSize: 10.5, color: C.ink3 }}>Hoa hồng T6: <b style={{ color: C.ok }}>+4,8M</b></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[['Bus HN → Cát Bà · Limo 11', '360K', '331K'], ['Day Cruise VIP 1', '720K', '662K'], ['Day Cruise VIP 4 · 5★', '850K', '782K'], ['Luxury Cruise Deluxe 2N1Đ', '2.860K', '2.631K']].map(([lb, ret, net], i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid ' + C.line, borderRadius: 12, padding: '11px 13px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: C.ink }}>{lb}</div>
                <div style={{ fontSize: 10.5, color: C.ink3 }}>Niêm yết <s>{ret}</s> → net <b style={{ color: C.navy }}>{net}</b></div>
              </div>
              <button style={{ background: C.gold, color: '#fff', border: 0, borderRadius: 9, padding: '8px 13px', fontSize: 11.5, fontWeight: 800, ...F }}>Đặt hộ</button>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', border: '1px solid ' + C.line, borderRadius: 12, padding: '11px 13px', marginTop: 12, fontSize: 11.5, color: C.ink2 }}>
          <b style={{ color: C.ink }}>Booking gần đây</b>
          <div style={{ marginTop: 6 }}>AG-K2M84 · VIP 1 × 4 · 12/06 · <b style={{ color: C.ok }}>+230K hh</b></div>
          <div>AG-P7Q21 · Limo 11 × 2 · 11/06 · <b style={{ color: C.ok }}>+58K hh</b></div>
        </div>
      </div>
      <TabBar items={[['⚡', 'Đặt nhanh'], ['📋', 'Đơn của tôi'], ['💰', 'Công nợ'], ['👤', 'Tài khoản']]} active={0} />
    </div>
  );
}

/* ---------- 4 · staff app ---------- */
function AppStaff() {
  return (
    <div style={{ background: C.ivory, minHeight: '100%', paddingBottom: 90, ...F }}>
      <div style={{ background: C.red, padding: '64px 18px 18px', color: '#fff', textAlign: 'center' }}>
        <div style={{ fontSize: 11, opacity: .85 }}>DAIICHI STAFF · Cảng Cát Bà</div>
        <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>Soát vé — VIP 4 · 11:45</div>
        <div style={{ width: 168, height: 168, margin: '0 auto', borderRadius: 20, border: '3px dashed rgba(255,255,255,.55)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
          <div style={{ fontSize: 36 }}>📷</div>
          <div style={{ fontSize: 11.5, fontWeight: 700 }}>Chạm để quét QR</div>
        </div>
        <div style={{ fontSize: 12, marginTop: 11 }}>Đã lên tàu: <b style={{ fontSize: 15 }}>62 / 84</b> khách</div>
      </div>
      <div style={{ padding: '13px 18px' }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: C.ink, marginBottom: 8 }}>Vừa check-in</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {[['DT26-8X4K2', 'Nguyễn Văn Hùng · 2 khách', 'ok'], ['DT26-M3P107', 'Yuki Tanaka · 4 khách', 'ok'], ['POS-Q7C12', 'Khách lẻ · 1 khách', 'ok'], ['DT26-Z6T2N', 'Wang Lei · 2 khách', 'warn']].map(([cd, nm, st], i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid ' + C.line, borderRadius: 11, padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 15 }}>{st === 'ok' ? '✅' : '⚠️'}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, fontFamily: 'ui-monospace, monospace' }}>{cd}</div>
                <div style={{ fontSize: 10.5, color: C.ink2 }}>{nm}{st === 'warn' ? ' · vé chiều khác — chuyển sang 16:30?' : ''}</div>
              </div>
              <span style={{ fontSize: 10, color: C.ink3 }}>11:0{8 - i * 2}</span>
            </div>
          ))}
        </div>
        <button style={{ width: '100%', marginTop: 12, background: C.navy, color: '#fff', border: 0, borderRadius: 11, padding: '12px 0', fontSize: 13, fontWeight: 800, ...F }}>
          Chốt danh sách → gửi thuyền trưởng
        </button>
      </div>
      <TabBar items={[['📷', 'Soát vé'], ['🛳️', 'Chuyến'], ['🧾', 'POS'], ['👤', 'Tôi']]} active={0} />
    </div>
  );
}

/* ---------- page ---------- */
function FeatureChecklist({ items, title }) {
  return (
    <div style={{ maxWidth: 1280, margin: '18px auto 0', background: '#fff', border: '1px solid var(--line)', borderRadius: 16, padding: '18px 24px' }}>
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>{title}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '8px 22px' }}>
        {items.map((x, i) => (
          <span key={i} style={{ display: 'flex', gap: 8, alignItems: 'baseline', fontSize: 13, color: 'var(--ink-2)', ...F }}>
            <span style={{ color: 'var(--ok, #1F7A4D)', fontWeight: 800, color: '#1F7A4D' }}>✓</span>
            <span><b style={{ color: C.ink }}>{x[0]}</b>{x[1] ? ' — ' + x[1] : ''}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function PhoneCol({ lb, d, children }) {
  return (
    <div style={{ textAlign: 'center' }} data-screen-label={lb}>
      <div style={{ marginBottom: 12 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, color: 'var(--navy)', margin: '0 0 3px' }}>{lb}</h3>
        <div style={{ fontSize: 12, color: 'var(--ink-2)', maxWidth: 330, margin: '0 auto', ...F }}>{d}</div>
      </div>
      <div className="phone-wrap"><IOSDevice width={392} height={820}>{children}</IOSDevice></div>
    </div>
  );
}

function SectionHead({ kicker, title, sub }) {
  return (
    <div style={{ textAlign: 'center', margin: '64px 0 26px' }}>
      <div className="dt-kicker">{kicker}</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--navy)', margin: '4px 0 6px' }}>{title}</h2>
      <p style={{ color: 'var(--ink-2)', fontSize: 13.5, maxWidth: 620, margin: '0 auto', ...F }}>{sub}</p>
    </div>
  );
}

function AppsPage() {
  return (
    <div style={{ maxWidth: 1860, margin: '0 auto', padding: '40px 30px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <div className="dt-kicker">DAIICHI ONE PLATFORM · MOBILE</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--navy)', margin: '4px 0 8px' }}>5 ứng dụng — một nền tảng dữ liệu</h1>
        <p style={{ color: 'var(--ink-2)', fontSize: 14.5, maxWidth: 680, margin: '0 auto', ...F }}>
          Cùng dùng chung API đặt chỗ, sơ đồ ghế, GPS và vé QR với website. Chuẩn tính năng ride-hailing hiện đại (Grab/GreenSM-class) — thiết kế riêng của Daiichi.
        </p>
      </div>

      {/* —— customer app —— */}
      <SectionHead kicker="ƯU TIÊN 1 · KHÁCH HÀNG" title="App Khách hàng"
        sub="Đặt vé, theo dõi xe GPS thời gian thực 2 chiều, báo quên đồ ngay trong app — không cần gọi hotline." />
      <div style={{ display: 'flex', gap: 30, justifyContent: 'center', flexWrap: 'wrap' }}>
        <PhoneCol lb="Trang chủ" d="Đặt vé 4 dòng sản phẩm · vé QR · tích điểm · ưu đãi"><AppCustomer /></PhoneCol>
        <PhoneCol lb="Theo dõi chuyến — GPS" d="Thấy xe trên bản đồ · chia sẻ vị trí của bạn cho tài xế · gọi/chat · SOS"><CustomerTracking /></PhoneCol>
        <PhoneCol lb="Quên đồ" d="Báo mất đồ theo chuyến · tài xế xác nhận · nhận tại quầy hoặc ship COD"><CustomerLost /></PhoneCol>
      </div>
      <FeatureChecklist title="Tính năng app khách hàng — chuẩn Grab/GreenSM-class" items={[
        ['GPS 2 chiều thời gian thực', 'khách thấy xe, tài xế thấy khách'],
        ['Quên đồ trong app', 'trạng thái xử lý từng bước, ship COD · gọi nhanh HDV qua di động'],
        ['Chat & gọi qua app HOẶC mạng di động', 'ẩn số · fallback gọi SIM khi sóng yếu'],
        ['Chia sẻ hành trình cho người thân', 'link theo dõi realtime'],
        ['Nút SOS khẩn cấp 24/7', 'gửi vị trí về điều hành'],
        ['Vé điện tử QR + đặt lại 1 chạm', ''],
        ['Đánh giá ★ & tip tài xế sau chuyến', ''],
        ['Ví điểm, hạng thẻ, voucher', ''],
        ['Đặt lịch trước & nhiều điểm đón', ''],
        ['Thông báo đẩy: xe sắp đến, trễ chuyến', ''],
        ['Đa ngôn ngữ 6 thứ tiếng', 'như website'],
        ['Thanh toán VNPay · MoMo · thẻ', ''],
      ]} />

      {/* —— customer experience extras —— */}
      <SectionHead kicker="MỚI · TRẢI NGHIỆM KHÁCH HÀNG" title="Chat · Đánh giá & tip · Đặt định kỳ"
        sub="Ba màn hình hoàn thiện vòng đời chuyến đi: nhắn tin ẩn số với HDV trước giờ đón, đánh giá ★ + tip sau chuyến, và đặt lịch định kỳ cho khách đi làm / doanh nghiệp." />
      <div style={{ display: 'flex', gap: 30, justifyContent: 'center', flexWrap: 'wrap' }}>
        <PhoneCol lb="Chat trong app" d="Khách ↔ HDV ẩn số · tin mẫu · gửi vị trí · tự đóng sau chuyến"><AppChat /></PhoneCol>
        <PhoneCol lb="Đánh giá ★ & tip" d="5 sao · lời khen gắn thẻ · tip 100% đến tài xế & HDV · tặng điểm"><AppRate /></PhoneCol>
        <PhoneCol lb="Đặt lịch định kỳ" d="Lặp hằng tuần · giữ ghế trước 48h · hoá đơn công ty · −8%"><AppSchedule /></PhoneCol>
      </div>

      {/* —— driver app —— */}
      <SectionHead kicker="ƯU TIÊN 2 · VẬN HÀNH" title="App Tài xế"
        sub="Tài xế KHÔNG thao tác điện thoại khi lái — app chỉ phát GPS, hiển thị chỉ đường và chấm công ca; mọi liên hệ khách do Hướng dẫn viên đảm nhiệm." />
      <div style={{ display: 'flex', gap: 30, justifyContent: 'center', flexWrap: 'wrap' }}>
        <PhoneCol lb="Chuyến hôm nay" d="Danh sách khách · điểm đón · điểm danh từng khách"><AppDriver /></PhoneCol>
        <PhoneCol lb="Điều hướng — GPS" d="Chỉ đường từng điểm đón · thấy vị trí khách live · báo đã đến"><DriverNav /></PhoneCol>
        <PhoneCol lb="Thu nhập & quên đồ" d="Online/offline · thu nhập ngày-tuần · xử lý báo quên đồ"><DriverEarn /></PhoneCol>
      </div>
      <FeatureChecklist title="Tính năng app tài xế — chuẩn Grab/GreenSM-class" items={[
        ['Phát GPS realtime 5 giây/lần', 'khách + điều hành cùng thấy'],
        ['Thấy vị trí khách đang chờ', 'khi khách bật chia sẻ'],
        ['Lộ trình đón tối ưu từng điểm', 'tích hợp Google Maps/VietMap'],
        ['Xử lý quên đồ ngay trong app', 'xác nhận tìm thấy/không thấy'],
        ['Thu nhập ngày/tuần + thưởng', 'đối soát & rút tiền'],
        ['Trạng thái Online/Offline & nhận ca', ''],
        ['Chat/gọi khách ẩn số', ''],
        ['Điểm danh khách lên xe', 'đồng bộ về Back Office'],
        ['Báo sự cố (hỏng xe, tắc đường, tai nạn)', ''],
        ['SOS + chia sẻ vị trí khẩn cấp', ''],
        ['Điểm chất lượng dịch vụ', 'đúng giờ, đánh giá ★ của khách'],
        ['Lịch ca tuần & đăng ký nghỉ', ''],
        ['Chấm công vào/ra ca bằng GPS + selfie', 'tự tính giờ lái, cảnh báo quá 4h liên tục'],
        ['Chế độ lái xe an toàn', 'khoá thao tác khi xe chạy — HDV liên hệ khách thay'],
      ]} />

      {/* —— guide / crew app —— */}
      <SectionHead kicker="MỚI · ƯU TIÊN 2 · PHỤC VỤ KHÁCH" title="App Hướng dẫn viên — trên xe & du thuyền"
        sub="Vì tài xế không được dùng điện thoại khi lái, HDV/phụ xe là đầu mối liên hệ khách khi đón; trên du thuyền, thuyền viên quản lý khách, hoạt động và an toàn." />
      <div style={{ display: 'flex', gap: 30, justifyContent: 'center', flexWrap: 'wrap' }}>
        <PhoneCol lb="Trên xe — đón khách" d="Gọi/nhắn từng khách · trạng thái đón · tin nhắn mẫu 1 chạm · chốt đủ khách cho tài xế"><GuideBus /></PhoneCol>
        <PhoneCol lb="Trên du thuyền — quản lý khách" d="Check-in 84 khách · ăn kiêng · hoạt động · an toàn · gọi khách chưa có mặt"><GuideCruise /></PhoneCol>
      </div>
      <FeatureChecklist title="Tính năng app Hướng dẫn viên / thuyền viên" items={[
        ['Danh sách khách theo chuyến realtime', 'đồng bộ Back Office & POS'],
        ['Gọi / nhắn khách thay tài xế', 'qua app (ẩn số) hoặc mạng di động — luôn liên lạc được'],
        ['Tin nhắn mẫu 1 chạm', 'xe đến sau 5 phút, xe đã tới…'],
        ['Trạng thái đón từng nhóm khách', 'đã đón / đang chờ / không nghe máy'],
        ['Chốt đủ khách → báo tài xế khởi hành', 'hiện lên màn điều hướng'],
        ['Quản lý khách trên du thuyền', 'cabin, ăn kiêng, trẻ em, quốc tịch'],
        ['Lịch hoạt động & điểm danh tham gia', 'kayak, ăn trưa, trà chiều'],
        ['Phổ biến an toàn bắt buộc', 'ghi nhận về hệ thống'],
        ['Xử lý quên đồ & sự cố y tế', ''],
        ['Chấm công theo ca ngay trong app', ''],
      ]} />

      {/* —— time clock + permissions —— */}
      <SectionHead kicker="MỚI · TOÀN CÔNG TY" title="Chấm công GPS & phân quyền"
        sub="Mọi nhân viên — tài xế, HDV, thuyền viên, quầy vé, văn phòng — vào/ra ca bằng GPS + selfie ngay trong app của mình. Dữ liệu công đổ về Back Office để kế toán tính lương." />
      <div style={{ display: 'flex', gap: 30, justifyContent: 'center', flexWrap: 'wrap' }}>
        <PhoneCol lb="Chấm công — mọi nhân viên" d="Vào/ra ca GPS + selfie · giờ lái an toàn · bảng công · xin nghỉ/đổi ca"><TimeClock /></PhoneCol>
        <PhoneCol lb="Tip của tôi — minh bạch 100%" d="Tip từ app khách hiện realtime theo chuyến · lịch sử KPI · cộng thẳng phiếu lương"><AppMyTips /></PhoneCol>
      </div>
      <PermMatrix />

      {/* —— agent & staff —— */}
      <SectionHead kicker="ƯU TIÊN 3 · KÊNH BÁN & VẬN HÀNH" title="App Đại lý · App Nhân viên"
        sub="Đại lý đặt hộ khách với giá net; nhân viên soát vé QR tại bến xe, cảng tàu và du thuyền." />
      <div style={{ display: 'flex', gap: 30, justifyContent: 'center', flexWrap: 'wrap' }}>
        <PhoneCol lb="App Đại lý" d="Giá net · đặt hộ · công nợ · hoa hồng"><AppAgent /></PhoneCol>
        <PhoneCol lb="App Nhân viên" d="Quét QR soát vé · check-in tàu/cruise · POS mini"><AppStaff /></PhoneCol>
      </div>
    </div>
  );
}
Object.assign(window, { TabBar, MiniQR, AppCustomer, AppDriver, AppAgent, AppStaff });
ReactDOM.createRoot(document.getElementById('root')).render(<AppsPage />);
