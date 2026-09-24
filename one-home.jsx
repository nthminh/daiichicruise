/* DAIICHI ONE — unified homepage (all services + partner onboarding) */
const { useState, useEffect } = React;

/* 6-language strings for the homepage */
const HD = {
  nav_services: ['Dịch vụ', 'Services', 'サービス', '서비스', '服务', 'Services'],
  nav_partner: ['Đối tác', 'Partners', 'パートナー', '파트너', '合作伙伴', 'Partenaires'],
  nav_apps: ['Ứng dụng', 'Apps', 'アプリ', '앱', '应用', 'Applis'],
  nav_portal: ['Cổng làm việc', 'Portals', 'ポータル', '포털', '工作门户', 'Portails'],
  cta_book: ['Đặt vé ngay', 'Book now', '今すぐ予約', '지금 예약', '立即预订', 'Réserver'],
  hero_k: ['Xác nhận tức thì · Giá niêm yết · Hoàn huỷ miễn phí trước 12h', 'Instant confirmation · Official rates · Free cancellation to 12h', '即時確定 · 公式料金', '즉시 확정 · 공식 요금', '即时确认 · 官方价格', 'Confirmation immédiate · Tarifs officiels'],
  hero_t: ['Toàn bộ hành trình Hà Nội — Cát Bà — Lan Hạ, trong một nơi', 'Your whole Hanoi — Cat Ba — Lan Ha journey, in one place', 'ハノイ—カットバ—ランハの旅を、ひとつの場所で', '하노이—깟바—란하 여정을 한곳에서', '河内—吉婆—兰哈之旅，尽在一处', 'Tout votre voyage Hanoï — Cat Ba — Lan Ha, au même endroit'],
  hero_p: ['Đặt xe limousine, tàu cao tốc, du thuyền ngày, du thuyền ngủ đêm 5★ và tour trọn gói — chọn ghế trực tuyến, nhận vé QR ngay, hỗ trợ 24/7 bằng 6 ngôn ngữ.', 'Book limousine buses, speedboats, day cruises, 5★ overnight cruises and package tours — pick your seat online, get your QR ticket instantly, 24/7 support in six languages.', 'リムジンバス、高速船、デイクルーズ、5つ星宿泊クルーズ、ツアー — Daiichiと認定パートナーが提供。', '리무진 버스, 쾌속선, 크루즈, 투어 — Daiichi와 인증 파트너 제공.', '豪华巴士、快艇、游轮、跟团游 — 由Daiichi及认证合作伙伴提供。', 'Bus limousine, bateaux, croisières et circuits — par Daiichi et ses partenaires vérifiés.'],
  cta_partner: ['Trở thành đối tác', 'Become a partner', 'パートナーになる', '파트너 되기', '成为合作伙伴', 'Devenir partenaire'],
  svc_k: ['Dịch vụ', 'Services', 'サービス', '서비스', '服务', 'Services'],
  svc_t: ['Mọi dịch vụ của công ty — và hơn thế', 'Everything we run — and more', '当社の全サービス、そしてその先へ', '회사의 모든 서비스 — 그 이상', '公司全部服务 — 不止于此', 'Tous nos services — et plus'],
  svc_p: ['Từ chuyến xe 140K đến đêm suite 5 sao — đặt chung một giỏ, thanh toán một lần, vé QR dùng cho cả hành trình.', 'From a 140K bus seat to a night in a 5★ suite — one basket, one checkout, one QR ticket for the whole journey.', 'Daiichi直営の6サービス＋認定パートナーのサービス。', 'Daiichi 직영 6개 서비스 + 인증 파트너 서비스.', 'Daiichi直营6大服务+认证伙伴服务。', 'Six lignes de services Daiichi, plus celles de partenaires vérifiés.'],
  pt_k: ['Marketplace mở', 'Open marketplace', 'オープンマーケット', '오픈 마켓플레이스', '开放市场', 'Marketplace ouverte'],
  pt_t: ['Đưa dịch vụ của bạn lên nền tảng Daiichi', 'Put your service on the Daiichi platform', 'あなたのサービスをDaiichiに', '귀하의 서비스를 Daiichi에', '将您的服务上架Daiichi平台', 'Mettez votre service sur Daiichi'],
  portal_k: ['Cổng làm việc', 'Work portals', 'ポータル', '업무 포털', '工作门户', 'Portails'],
  portal_t: ['Một tài khoản — đúng việc của bạn', 'One account — your exact job', '1つのアカウントで、あなたの業務へ', '하나의 계정 — 정확한 업무', '一个账号 — 各司其职', 'Un compte — votre rôle exact'],
  apps_t: ['Một nền tảng dữ liệu —', 'One data platform —', 'ひとつのデータ基盤 —', '하나의 데이터 플랫폼 —', '一个数据平台 —', 'Une plateforme de données —'],
  apps_em: ['5 ứng dụng di động', 'five mobile apps', '5つのアプリ', '5개의 모바일 앱', '五款移动应用', 'cinq applis mobiles'],
};
const hidx = { vi: 0, en: 1, ja: 2, ko: 3, zh: 4, fr: 5 };
const T = (k) => (HD[k] ? (HD[k][hidx[I18N.lang]] || HD[k][1] || HD[k][0]) : I18N.t(k));
const LV = (vi, en) => (I18N.lang === 'vi' ? vi : en); /* body copy: vi/en fallback */

function OneLang() {
  const [open, setOpen] = useState(false);
  const cur = I18N.langs.find((l) => l.code === I18N.lang);
  useEffect(() => {
    const close = () => setOpen(false);
    if (open) { document.addEventListener('click', close); return () => document.removeEventListener('click', close); }
  }, [open]);
  return (
    <div className="dt-lang" onClick={(e) => e.stopPropagation()}>
      <button className="dt-lang-btn" onClick={() => setOpen(!open)}>
        <span>{cur.flag}</span><span>{cur.code.toUpperCase()}</span>
        <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
      </button>
      {open && (
        <div className="dt-lang-menu">
          {I18N.langs.map((l) => (
            <button key={l.code} className={l.code === I18N.lang ? 'on' : ''} onClick={() => { I18N.setLang(l.code); setOpen(false); }}>
              <span>{l.flag}</span><span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const CFG = () => (window.DAIICHI_CONFIG || {
  BOOKING_BASE_URL: 'https://daiichitravel.com',
  HOTLINE_DISPLAY: '1900 9070',
  HOTLINE_TEL: '19009070',
  ZALO_DISPLAY: '0961 004 709',
  ZALO_URL: 'https://zalo.me/0961004709',
  getBusBookingUrl: (f, t) => `https://daiichitravel.com/?tab=book-ticket&from=${encodeURIComponent(f || '')}&to=${encodeURIComponent(t || '')}`,
  getTourBookingUrl: (cat) => `https://daiichitravel.com/?tab=tours&category=${encodeURIComponent(cat || 'TOUR_SHORT')}`,
  getCruiseBookingUrl: () => 'https://daiichitravel.com/?tab=cruise-tour',
  getMyTicketsUrl: () => 'https://daiichitravel.com/?tab=my-tickets',
  getGeneralBookingUrl: () => 'https://daiichitravel.com/?tab=book-ticket'
});

const SERVICES = [
  { img: 'assets/photos/limo10.jpg', tag: 'DAIICHI BUS', wide: false, href: 'https://daiichitravel.com/?tab=book-ticket&from=Hà%20Nội&to=Cát%20Bà',
    t: ['Xe khách & Limousine', 'Bus & Limousine'], d: ['Hà Nội ⇄ Cát Bà · Hải Phòng · Hạ Long ⇄ Ninh Bình. Bus 45, limousine 7–34 chỗ, xe điện nội đảo.', 'Hanoi ⇄ Cat Ba · Hai Phong · Ha Long ⇄ Ninh Binh. 45-seat buses, 7–34-seat limousines, island EVs.'], pr: '140.000đ' },
  { img: 'assets/photos/speedboat.jpg', tag: 'DAIICHI BOAT', wide: false, href: 'https://daiichitravel.com/?tab=book-ticket',
    t: ['Tàu cao tốc sang đảo', 'Island speedboats'], d: ['Tuyến nhanh nhất vào Cát Bà — kết nối liền mạch với xe limousine trong cùng một vé.', 'The fastest way into Cat Ba — seamlessly connected to your bus on a single ticket.'], pr: null },
  { img: 'assets/photos/daycruise-1.jpg', tag: 'DAY CRUISE', wide: false, href: 'https://daiichitravel.com/?tab=tours&category=TOUR_SHORT',
    t: ['Du thuyền ngày vịnh Lan Hạ', 'Lan Ha Bay day cruises'], d: ['6 tour: trọn ngày Việt Hải, bình minh, hoàng hôn, dinner DJ & pháo hoa — tàu 48 đến 99 chỗ.', 'Six tours: full-day Viet Hai, sunrise, sunset, dinner-DJ & fireworks — 48 to 99-pax boats.'], pr: '350.000đ' },
  { img: 'assets/photos/luxury-1.jpg', tag: 'LUXURY CRUISE ★★★★★', wide: true, href: 'https://daiichitravel.com/?tab=cruise-tours',
    t: ['Du thuyền ngủ đêm 5 sao', '5★ overnight cruise'], d: ['32 suite ban công riêng, nhà hàng kính, spa, jacuzzi & cầu kính. Hành trình 2N1Đ – 3N2Đ trên vịnh Lan Hạ.', '32 balcony suites, glass restaurant, spa, jacuzzi & skywalk. 2-day and 3-day Lan Ha itineraries.'], pr: '2.860.000đ' },
  { img: 'assets/photos/daycruise-act-1.jpg', tag: 'COMBO TOUR', wide: false, href: 'https://daiichitravel.com/?tab=tours&category=TOUR_SHORT',
    t: ['Tour trọn gói từ Hà Nội', 'All-in tours from Hanoi'], d: ['Một vé: xe đón phố cổ + du thuyền + về trong ngày. Khởi hành mỗi sáng.', 'One ticket: Old Quarter pickup, cruise, home by night. Departs every morning.'], pr: '1.250.000đ' },
  { img: 'assets/photos/daycruise-act-2.jpg', tag: ['DỊCH VỤ ĐỐI TÁC', 'PARTNER SERVICES'], pt: true, wide: false, href: 'https://daiichitravel.com/?tab=tours',
    t: ['SUP, tour nhóm nhỏ & hơn nữa', 'SUP, small groups & more'], d: ['Dịch vụ của các đơn vị đối tác xác minh: SUP hoàng hôn, xe tuyến mới… Đặt & hoàn huỷ chuẩn Daiichi.', 'From verified partner operators: sunset SUP, new routes… booked under Daiichi\u2019s standards.'], pr: '350.000đ' },
];

function PartnerForm() {
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({ name: '', kind: 'Vận tải (xe khách / limousine)', contact: '', desc: '' });
  const ok = f.name.trim().length > 1 && f.contact.trim().length > 7;
  if (sent) return (
    <div className="on-form" data-comment-anchor="partner-form">
      <div className="on-form-ok">
        <div className="ck">✓</div>
        <h3>{LV('Đã nhận hồ sơ!', 'Application received!')}</h3>
        <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6 }}>
          {LV('Đội phát triển đối tác sẽ liên hệ trong 48h làm việc để thẩm định giấy phép, bảo hiểm và SLA dịch vụ.', 'Our partnerships team will contact you within 48 working hours to verify licences, insurance and service SLA.')}
        </p>
        <button className="on-btn ghost" style={{ marginTop: 12 }} onClick={() => setSent(false)}>{LV('Gửi hồ sơ khác', 'Submit another')}</button>
      </div>
    </div>
  );
  return (
    <div className="on-form" data-comment-anchor="partner-form">
      <h3>{T('cta_partner')}</h3>
      <div className="sub">{LV('Điền thông tin — duyệt hồ sơ trong 48h', 'Tell us about your service — reviewed within 48h')}</div>
      <div className="on-field">
        <label>{LV('Tên đơn vị', 'Company name')} *</label>
        <input value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder={LV('VD: Hùng Cường Express', 'e.g. Hung Cuong Express')} />
      </div>
      <div className="on-field">
        <label>{LV('Loại dịch vụ', 'Service type')}</label>
        <select value={f.kind} onChange={(e) => setF({ ...f, kind: e.target.value })}>
          {[LV('Vận tải (xe khách / limousine)', 'Transport (bus / limousine)'), LV('Tàu / du thuyền', 'Boats / cruises'), LV('Tour & hoạt động (SUP, kayak, trekking…)', 'Tours & activities'), LV('Lưu trú (khách sạn, homestay)', 'Accommodation'), LV('Khác', 'Other')].map((x) => <option key={x}>{x}</option>)}
        </select>
      </div>
      <div className="on-field">
        <label>{LV('Người liên hệ · SĐT / Zalo', 'Contact person · phone')} *</label>
        <input value={f.contact} onChange={(e) => setF({ ...f, contact: e.target.value })} placeholder="Nguyễn Văn A · 09xx xxx xxx" />
      </div>
      <div className="on-field">
        <label>{LV('Mô tả ngắn dịch vụ', 'Short description')}</label>
        <textarea rows="3" value={f.desc} onChange={(e) => setF({ ...f, desc: e.target.value })} placeholder={LV('Tuyến / tour, số phương tiện, giấy phép hiện có…', 'Routes/tours, fleet size, current licences…')}></textarea>
      </div>
      <button className="on-btn gold" style={{ width: '100%', justifyContent: 'center', opacity: ok ? 1 : .45, pointerEvents: ok ? 'auto' : 'none' }} onClick={() => setSent(true)}>
        {LV('Gửi hồ sơ đăng ký', 'Submit application')}
      </button>
      <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 10, textAlign: 'center' }}>
        {LV('Hoa hồng nền tảng 12–15% · đối soát kỳ 15 & 30 · không phí tham gia', 'Platform fee 12–15% · settlements on the 15th & 30th · no joining fee')}
      </div>
    </div>
  );
}

function OneTick() {
  const [, t] = useState(0);
  useEffect(() => { const i = setInterval(() => t((x) => x + 1), 1000); return () => clearInterval(i); }, []);
  return null;
}

const CAMP_IMG = { flash: 'assets/photos/daycruise-2.jpg', early: 'assets/photos/luxury-1.jpg', combo50: 'assets/photos/daycruise-act-1.jpg', newtour: 'assets/photos/daycruise-act-2.jpg' };
const CAMP_BASE = { flash: 430000, early: 2860000, combo50: 1250000, newtour: 350000 };

function LiveDeals() {
  const [, force] = useState(0);
  useEffect(() => {
    const i = setInterval(() => force((x) => x + 1), 1000);
    const on = () => force((x) => x + 1);
    window.addEventListener('dt:campaigns', on);
    window.addEventListener('storage', on);
    return () => { clearInterval(i); window.removeEventListener('dt:campaigns', on); window.removeEventListener('storage', on); };
  }, []);
  const list = DT_CAMPAIGNS.active();
  if (!list.length) return null;
  const flash = list.find((c) => c.kind === 'flash');
  return (
    <section className="on-sec" id="deals" data-screen-label="Ưu đãi đang diễn ra" style={{ paddingTop: 56 }}>
      <div className="on-sec-head" style={{ marginBottom: 20 }}>
        <div className="k">{LV('Cập nhật liên tục', 'Updated live')}</div>
        <h2>{LV('Ưu đãi đang diễn ra', 'Deals happening now')}</h2>
        {flash && (
          <p style={{ fontWeight: 700, color: 'var(--red)' }}>
            ⚡ {flash.name} −{flash.off}% · {LV('kết thúc sau', 'ends in')} <span style={{ fontFamily: 'ui-monospace, monospace', background: 'var(--red-soft)', borderRadius: 6, padding: '2px 8px' }}>{DT_CAMPAIGNS.fmtLeft(flash.ends, I18N.lang)}</span>
          </p>
        )}
      </div>
      <div className="on-deals">
        {list.map((c) => {
          const base = CAMP_BASE[c.id];
          const final = base ? DT_CAMPAIGNS.apply(base, c) : null;
          const dealHref = c.id === 'early'
            ? 'https://daiichitravel.com/?tab=cruise-tours'
            : 'https://daiichitravel.com/?tab=tours&category=TOUR_SHORT';
          return (
            <a key={c.id} className="on-deal" href={dealHref} target="_blank" rel="noopener">
              <span className="im" style={{ backgroundImage: `url(${CAMP_IMG[c.id] || CAMP_IMG.flash})` }}>
                <span className="bdg" style={{ background: c.color }}>{c.kind === 'flash' ? '⚡ ' : ''}{c.name}{c.off ? ' −' + c.off + '%' : ''}</span>
                {c.ends && <span className="cd">⏱ {DT_CAMPAIGNS.fmtLeft(c.ends, I18N.lang)}</span>}
              </span>
              <span className="bd">
                <b>{I18N.L(c.desc)}</b>
                {base && c.kind !== 'new' && (
                  <span className="pr"><s>{base.toLocaleString('vi-VN')}đ</s> <em>{final.toLocaleString('vi-VN')}đ</em>{LV('/khách', '/pp')}</span>
                )}
                {c.kind === 'new' && <span className="pr"><em>{LV('từ', 'from')} {base.toLocaleString('vi-VN')}đ</em>{LV('/khách', '/pp')}</span>}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function PartnerMini() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="on-partner-mini-card">
        <div className="tx">
          <b>{LV('Bạn có xe, tàu hoặc tour quanh Cát Bà?', 'Run buses, boats or tours around Cat Ba?')}</b>
          <span>
            {LV('Trở thành đối tác vận hành trên nền tảng Daiichi — hoa hồng 12–15%, không phí tham gia, đối soát 2 kỳ/tháng.', 'Become a partner operator on the Daiichi platform — 12–15% fee, no joining cost, payouts twice a month.')}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="on-btn ghost" style={{ padding: '10px 18px', fontSize: 13 }} onClick={() => setOpen(!open)}>
            {open ? LV('Thu gọn', 'Collapse') : T('cta_partner')}
          </button>
          <a className="on-btn ghost" style={{ padding: '10px 18px', fontSize: 13 }} href="mailto:partner@daiichitravel.vn">{LV('Liên hệ hợp tác', 'Partnership contact')} →</a>
        </div>
      </div>
      {open && <div className="on-partner-mini-form"><PartnerForm /></div>}
    </div>
  );
}

function HomeSearch() {
  const t = (k) => I18N.t(k);
  const STATIONS = (window.DT_DATA && DT_DATA.STATIONS) || {};
  const [tab, setTab] = useState('bus');
  const [from, setFrom] = useState('HN');
  const [to, setTo] = useState('CB');
  const [date, setDate] = useState(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });
  const [ret, setRet] = useState('');
  const [pax, setPax] = useState(2);
  const L = (o) => I18N.L(o);

  const go = () => {
    if (tab === 'night') {
      window.open(`https://daiichitravel.com/?tab=cruise-tours&date=${date}&pax=${pax}&source=daiichicruise`, '_blank');
    } else if (tab === 'day' || tab === 'tour') {
      window.open(`https://daiichitravel.com/?tab=tours&category=TOUR_SHORT&date=${date}&pax=${pax}&source=daiichicruise`, '_blank');
    } else {
      const fromName = STATIONS[from] ? (STATIONS[from].vi || from) : 'Hà Nội';
      const toName = STATIONS[to] ? (STATIONS[to].vi || to) : 'Cát Bà';
      const params = new URLSearchParams({
        tab: 'book-ticket',
        from: fromName,
        to: toName,
        searchFrom: fromName,
        searchTo: toName,
        pickup: fromName,
        dropoff: toName,
        date: date,
        travelDate: date,
        pax: String(pax),
        source: 'daiichicruise'
      });
      if (ret) {
        params.set('returnDate', ret);
        params.set('tripType', 'ROUND_TRIP');
      }
      window.open(`https://daiichitravel.com/?${params.toString()}`, '_blank');
    }
  };

  const tabs = [
    ['bus', t('tab_bus') || 'Xe & Limousine', window.I && I.bus ? I.bus : () => <span>🚌</span>],
    ['day', t('tab_day') || 'Du thuyền ngày', window.I && I.ship ? I.ship : () => <span>🚢</span>],
    ['night', t('tab_night') || 'Du thuyền ngủ đêm', window.I && I.moon ? I.moon : () => <span>🌙</span>],
    ['tour', t('tab_tour') || 'Tour combo', window.I && I.map ? I.map : () => <span>🗺️</span>],
  ];

  return (
    <div className="dt-search" data-comment-anchor="home-search" style={{ background: '#fff', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-2)', overflow: 'hidden' }}>
      <div className="dt-tabs" style={{ display: 'flex', borderBottom: '1px solid var(--line)' }}>
        {tabs.map(([id, lb, Icon]) => (
          <button key={id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, background: 'none', border: 0, padding: '16px 10px', fontSize: 14, fontWeight: 600, color: tab === id ? 'var(--red)' : 'var(--ink-2)', borderBottom: tab === id ? '3px solid var(--red)' : '3px solid transparent', cursor: 'pointer', fontFamily: 'var(--font-ui)' }}>
            <Icon size={17} />{lb}
          </button>
        ))}
      </div>
      <div className="dt-search-body" style={{ display: 'flex', gap: 12, padding: 20, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        {tab === 'bus' && (
          <React.Fragment>
            <div className="dt-field" style={{ flex: 1, minWidth: 150 }}>
              <label style={{ fontSize: 11.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--ink-3)' }}>{t('s_from') || 'Điểm đi'}</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)} style={{ border: '1.5px solid var(--line-2)', borderRadius: 'var(--r-sm)', padding: '11px 12px', fontSize: 14.5, fontWeight: 500, width: '100%' }}>
                {Object.keys(STATIONS).map((k) => <option key={k} value={k}>{L(STATIONS[k])}</option>)}
              </select>
            </div>
            <button className="dt-swap" onClick={() => { setFrom(to); setTo(from); }} title="swap" type="button" style={{ background: 'var(--ivory)', border: '1.5px solid var(--line-2)', borderRadius: '50%', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-2)', marginBottom: 3, cursor: 'pointer' }}>
              {window.I && I.swap ? <I.swap size={16} /> : '⇄'}
            </button>
            <div className="dt-field" style={{ flex: 1, minWidth: 150 }}>
              <label style={{ fontSize: 11.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--ink-3)' }}>{t('s_to') || 'Điểm đến'}</label>
              <select value={to} onChange={(e) => setTo(e.target.value)} style={{ border: '1.5px solid var(--line-2)', borderRadius: 'var(--r-sm)', padding: '11px 12px', fontSize: 14.5, fontWeight: 500, width: '100%' }}>
                {Object.keys(STATIONS).map((k) => <option key={k} value={k}>{L(STATIONS[k])}</option>)}
              </select>
            </div>
          </React.Fragment>
        )}
        {tab !== 'bus' && (
          <div className="dt-field" style={{ flex: 1, minWidth: 150 }}>
            <label style={{ fontSize: 11.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--ink-3)' }}>{t('s_from') || 'Địa điểm'}</label>
            <select disabled value="lanha" style={{ border: '1.5px solid var(--line-2)', borderRadius: 'var(--r-sm)', padding: '11px 12px', fontSize: 14.5, fontWeight: 500, width: '100%', background: '#F8FAFC' }}>
              <option value="lanha">Vịnh Lan Hạ · Cát Bà</option>
            </select>
          </div>
        )}
        <div className="dt-field" style={{ flex: 1, minWidth: 140 }}>
          <label style={{ fontSize: 11.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--ink-3)' }}>{tab === 'bus' ? (t('s_date') || 'Ngày đi') : (t('s_date_cruise') || 'Ngày khởi hành')}</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ border: '1.5px solid var(--line-2)', borderRadius: 'var(--r-sm)', padding: '11px 12px', fontSize: 14.5, fontWeight: 500, width: '100%' }} />
        </div>
        {tab === 'bus' && (
          <div className="dt-field" style={{ flex: 1, minWidth: 140 }}>
            <label style={{ fontSize: 11.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--ink-3)' }}>{t('s_return') || 'Ngày về (khứ hồi)'}</label>
            <input type="date" value={ret} min={date} onChange={(e) => setRet(e.target.value)} style={{ border: '1.5px solid var(--line-2)', borderRadius: 'var(--r-sm)', padding: '11px 12px', fontSize: 14.5, fontWeight: 500, width: '100%' }} />
          </div>
        )}
        <div className="dt-field" style={{ maxWidth: 120 }}>
          <label style={{ fontSize: 11.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--ink-3)' }}>{t('s_pax') || 'Hành khách'}</label>
          <select value={pax} onChange={(e) => setPax(+e.target.value)} style={{ border: '1.5px solid var(--line-2)', borderRadius: 'var(--r-sm)', padding: '11px 12px', fontSize: 14.5, fontWeight: 500, width: '100%' }}>
            {[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <button className="dt-search-btn" onClick={go} style={{ background: 'var(--red)', color: '#fff', border: 0, borderRadius: 'var(--r-sm)', padding: '12px 28px', fontSize: 15, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer', fontFamily: 'var(--font-ui)' }}>
          {window.I && I.search ? <I.search size={17} /> : '🔍'} {t('s_search') || 'Tìm chuyến'}
        </button>
      </div>
    </div>
  );
}

const POPULAR_ROUTES = [
  { fromName: 'Hà Nội', toName: 'Cát Bà', price: 250000 },
  { fromName: 'Hà Nội', toName: 'Hải Phòng', price: 140000 },
  { fromName: 'Cát Bà', toName: 'Ninh Bình', price: 250000 },
  { fromName: 'Hà Nội', toName: 'Ninh Bình', price: 190000 },
  { fromName: 'Cát Bà', toName: 'Hải Phòng', price: 200000 },
  { fromName: 'Hà Nội', toName: 'Cát Bà', price: 360000, cable: true },
];

function PopularRoutesSection() {
  const t = (k) => I18N.t(k);
  return (
    <section className="dt-section" style={{ maxWidth: 1240, margin: '0 auto', padding: '48px 24px 0' }}>
      <div className="dt-sec-head" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div className="dt-kicker" style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>DAIICHI BUS</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'var(--navy)' }}>{t('popular_routes') || 'Tuyến phổ biến'}</h2>
        </div>
        <span className="sub" style={{ fontSize: 13, color: 'var(--ink-3)' }}>Giá đã gồm VAT · Đón trả miễn phí trung tâm</span>
      </div>
      <div className="dt-routes" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
        {POPULAR_ROUTES.map((r, i) => (
          <a key={i} className="dt-route-chip" href={`https://daiichitravel.com/?tab=book-ticket&from=${encodeURIComponent(r.fromName)}&to=${encodeURIComponent(r.toName)}&searchFrom=${encodeURIComponent(r.fromName)}&searchTo=${encodeURIComponent(r.toName)}&pickup=${encodeURIComponent(r.fromName)}&dropoff=${encodeURIComponent(r.toName)}&source=daiichicruise`} target="_blank" rel="noopener" style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r-md)', padding: '14px 18px', textDecoration: 'none', transition: 'all .15s' }}>
            <span className="rt" style={{ fontWeight: 600, fontSize: 14.5, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--navy)' }}>
              {r.fromName} {window.I && I.arrR ? <I.arrR size={14} style={{ color: 'var(--gold)' }} /> : '→'} {r.toName}{r.cable ? ' 🚡' : ''}
            </span>
            <span className="pr" style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <span style={{ display: 'block', fontSize: 11, color: 'var(--ink-3)' }}>từ</span>
              <b style={{ color: 'var(--red)', fontSize: 15 }}>{r.price.toLocaleString('vi-VN')}đ</b>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

const DAY_CRUISES = [
  { id: 'dc1', code: 'VIP 1', name: 'Du thuyền VIP 1 · Lan Hạ – Việt Hải', time: '8h00 – 17h00', boat: 'Tàu 48 chỗ', price: 720000, img: 'assets/photos/daycruise-1.jpg' },
  { id: 'dc2', code: 'SUNSET', name: 'Tour Hoàng hôn & Tiệc Trà vịnh Lan Hạ', time: '15h30 – 19h00', boat: 'Tàu 99 chỗ', price: 430000, img: 'assets/photos/daycruise-2.jpg' },
  { id: 'dc3', code: 'MORNING', name: 'Tour Bình minh Lan Hạ & Chèo Kayak', time: '5h30 – 9h30', boat: 'Tàu 48 chỗ', price: 430000, img: 'assets/photos/daycruise-3.jpg' },
  { id: 'dc4', code: 'VIP 3', name: 'Dinner Cruise & Pháo hoa DJ', time: '17h30 – 21h30', boat: 'Tàu 2 tầng', price: 590000, img: 'assets/photos/daycruise-4.jpg' },
];

function DayCruisesSection() {
  const t = (k) => I18N.t(k);
  return (
    <section className="dt-section" style={{ maxWidth: 1240, margin: '0 auto', padding: '48px 24px 0' }}>
      <div className="dt-sec-head" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div className="dt-kicker" style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>LAN HA BAY</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'var(--navy)' }}>{t('nav_day') || 'Du thuyền ngày'}</h2>
        </div>
        <span className="sub" style={{ fontSize: 13, color: 'var(--ink-3)' }}>Giá đã gồm VAT</span>
      </div>
      <div className="dt-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 18 }}>
        {DAY_CRUISES.map((tr) => (
          <a key={tr.id} className="dt-card" href="https://daiichitravel.com/?tab=tours&category=TOUR_SHORT" target="_blank" rel="noopener" style={{ background: '#fff', borderRadius: 'var(--r-md)', overflow: 'hidden', border: '1px solid var(--line)', textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
            <div className="dt-card-img" style={{ backgroundImage: `url(${tr.img})`, height: 165, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
              <span className="dt-card-badge" style={{ position: 'absolute', top: 12, left: 12, background: 'var(--navy)', color: 'var(--gold-bright)', fontSize: 10.5, fontWeight: 700, padding: '5px 10px', borderRadius: 6 }}>{tr.code}</span>
            </div>
            <div className="dt-card-body" style={{ padding: '15px 16px', display: 'flex', flexDirection: 'column', gap: 7, flex: 1 }}>
              <h3 style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--navy)', lineHeight: 1.35, margin: 0 }}>{tr.name}</h3>
              <div style={{ fontSize: 12, color: 'var(--ink-2)' }}>⏱ {tr.time} · {tr.boat}</div>
              <div style={{ marginTop: 'auto', paddingTop: 6, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>từ</span>
                <b style={{ color: 'var(--red)', fontSize: 16 }}>{tr.price.toLocaleString('vi-VN')}đ</b>
                <span style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>/khách</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function LiveBusScheduleSection() {
  const [vehFilter, setVehFilter] = useState('all');
  const [sort, setSort] = useState('early');

  // Standard departures matching Image 2 with real prices and seat availability
  const initialDepartures = [
    {
      id: 'hn-cb-0500-bus45',
      time: '05:00',
      arrTime: '08:00',
      vehType: 'bus45',
      vehLabel: 'Bus thường 45 chỗ',
      badge: 'kèm tàu cao tốc',
      duration: '3h',
      wifi: 'WiFi · USB',
      price: 250000,
      availableSeats: 49
    },
    {
      id: 'hn-cb-0500-limo7',
      time: '05:00',
      arrTime: '08:00',
      vehType: 'limo7',
      vehLabel: 'Limo Green 7 chỗ (xe điện)',
      badge: 'kèm tàu cao tốc',
      duration: '3h',
      wifi: 'WiFi · EV',
      price: 330000,
      availableSeats: 7
    },
    {
      id: 'hn-cb-0500-limo34',
      time: '05:00',
      arrTime: '08:30',
      vehType: 'limo34',
      vehLabel: 'Limousine Luxury 34 ghế',
      badge: 'kèm tàu cao tốc',
      duration: '3h30',
      wifi: 'WiFi · USB',
      price: 310000,
      availableSeats: 34
    },
    {
      id: 'hn-cb-0500-limo11',
      time: '05:00',
      arrTime: '08:00',
      vehType: 'limo11',
      vehLabel: 'Limousine Luxury 11 ghế',
      badge: 'kèm tàu cao tốc',
      duration: '3h',
      wifi: 'WiFi · USB',
      price: 330000,
      availableSeats: 11
    },
    {
      id: 'hn-cb-0600-bus45',
      time: '06:00',
      arrTime: '09:00',
      vehType: 'bus45',
      vehLabel: 'Bus thường 45 chỗ',
      badge: 'kèm tàu cao tốc',
      duration: '3h',
      wifi: 'WiFi · USB',
      price: 250000,
      availableSeats: 49
    },
    {
      id: 'hn-cb-0700-limo34',
      time: '07:00',
      arrTime: '10:30',
      vehType: 'limo34',
      vehLabel: 'Limousine Luxury 34 ghế',
      badge: 'kèm tàu cao tốc',
      duration: '3h30',
      wifi: 'WiFi · USB',
      price: 310000,
      availableSeats: 34
    },
    {
      id: 'hn-cb-0800-limo11',
      time: '08:00',
      arrTime: '11:00',
      vehType: 'limo11',
      vehLabel: 'Limousine Luxury 11 ghế',
      badge: 'kèm tàu cao tốc',
      duration: '3h',
      wifi: 'WiFi · USB',
      price: 330000,
      availableSeats: 11
    },
    {
      id: 'hn-cb-0900-bus45',
      time: '09:00',
      arrTime: '12:00',
      vehType: 'bus45',
      vehLabel: 'Bus thường 45 chỗ',
      badge: 'kèm tàu cao tốc',
      duration: '3h',
      wifi: 'WiFi · USB',
      price: 250000,
      availableSeats: 45
    }
  ];

  const [trips, setTrips] = useState(initialDepartures);

  // Sync real-time Supabase departures and seat availability
  useEffect(() => {
    const syncFromSupabase = () => {
      if (window.DT_SUPABASE_SYNC && typeof DT_SUPABASE_SYNC.getTripsWithAvailability === 'function') {
        const sbTrips = DT_SUPABASE_SYNC.getTripsWithAvailability('Hà Nội', 'Cát Bà');
        if (sbTrips && sbTrips.length > 0) {
          setTrips(sbTrips);
        }
      }
    };

    syncFromSupabase();
    const interval = setInterval(syncFromSupabase, 800);
    window.addEventListener('dt:supabase_synced', syncFromSupabase);
    return () => {
      clearInterval(interval);
      window.removeEventListener('dt:supabase_synced', syncFromSupabase);
    };
  }, []);

  // Filter by vehicle type
  let filtered = trips;
  if (vehFilter !== 'all') {
    filtered = filtered.filter(t => t.vehType === vehFilter);
  }

  // Sort by time or price
  if (sort === 'cheap') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else {
    filtered = [...filtered].sort((a, b) => (a.time || '').localeCompare(b.time || ''));
  }

  // Vehicle image lookup matching Image 2
  const vehImages = {
    bus45: 'assets/photos/bus45-interior.jpg',
    limo7: 'assets/photos/limo7.jpg',
    limo34: 'assets/photos/limo34.jpg',
    limo11: 'assets/photos/limo10.jpg'
  };

  return (
    <section className="dt-bus-sched-sec" id="schedule" data-screen-label="Lịch chạy xe Hà Nội - Cát Bà">
      <div className="dt-sched-head">
        <h2>
          Hà Nội <span style={{ color: 'var(--gold)' }}>→</span> Cát Bà
        </h2>
        <div className="dt-sched-filters">
          <button className={'dt-sched-filter-btn' + (vehFilter === 'all' ? ' active' : '')} onClick={() => setVehFilter('all')}>
            {LV('Tất cả', 'All')}
          </button>
          <button className={'dt-sched-filter-btn' + (vehFilter === 'bus45' ? ' active' : '')} onClick={() => setVehFilter('bus45')}>
            Bus thường 45 chỗ
          </button>
          <button className={'dt-sched-filter-btn' + (vehFilter === 'limo7' ? ' active' : '')} onClick={() => setVehFilter('limo7')}>
            Limo Green 7 chỗ (xe điện)
          </button>
          <button className={'dt-sched-filter-btn' + (vehFilter === 'limo34' ? ' active' : '')} onClick={() => setVehFilter('limo34')}>
            Limousine Luxury 34 ghế
          </button>
          <button className={'dt-sched-filter-btn' + (vehFilter === 'limo11' ? ' active' : '')} onClick={() => setVehFilter('limo11')}>
            Limousine Luxury 11 ghế
          </button>
          <button className={'dt-sched-filter-btn' + (sort === 'early' ? ' active' : '')} onClick={() => setSort('early')}>
            {LV('Giờ sớm nhất', 'Earliest')}
          </button>
          <button className={'dt-sched-filter-btn' + (sort === 'cheap' ? ' active' : '')} onClick={() => setSort('cheap')}>
            {LV('Giá thấp nhất', 'Lowest price')}
          </button>
        </div>
      </div>

      <div className="dt-sched-cards">
        {filtered.slice(0, 10).map((tr, idx) => {
          const deepLink = (window.DT_SUPABASE_SYNC && typeof DT_SUPABASE_SYNC.buildBookingDeepLink === 'function')
            ? DT_SUPABASE_SYNC.buildBookingDeepLink({
                from: 'Hà Nội',
                to: 'Cát Bà',
                date: tr.date || '2026-06-25',
                tripId: tr.id,
                vehType: tr.vehType,
                price: tr.price
              })
            : `https://daiichitravel.com/?tab=book-ticket&from=Hà%20Nội&to=Cát%20Bà`;

          return (
            <div key={idx} className="dt-sched-card">
              <div className="dt-sched-time">
                <div className="dep">{tr.time}</div>
                <div className="arr">→ {tr.arrTime}</div>
              </div>
              <div className="dt-sched-thumb">
                <img src={vehImages[tr.vehType] || 'assets/photos/limo10.jpg'} alt={tr.vehLabel} loading="lazy" />
                <span className="dt-sched-thumb-badge">★ 5</span>
              </div>
              <div className="dt-sched-info">
                <div className="dt-sched-title-row">
                  <span className="dt-sched-name">{tr.vehLabel}</span>
                  <span className="dt-sched-badge">{tr.badge}</span>
                </div>
                <div className="dt-sched-meta">
                  <span>⏱ {tr.duration}</span>
                  <span>📍 {LV('Đón trả miễn phí trung tâm', 'Free center pickup')}</span>
                  <span>{tr.wifi}</span>
                </div>
              </div>
              <div className="dt-sched-right">
                <div className="dt-sched-price">
                  {tr.price.toLocaleString('vi-VN')}đ<em>/khách</em>
                </div>
                <div className="dt-sched-seats">
                  {tr.availableSeats} {LV('chỗ trống', 'seats left')}
                </div>
                <a className="dt-sched-btn" href={deepLink} target="_blank" rel="noopener">
                  {LV('Chọn ghế', 'Select seats')}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LuxurySuitesGallery() {
  const [, force] = useState(0);
  useEffect(() => {
    const onSync = () => force(x => x + 1);
    window.addEventListener('dt:supabase_synced', onSync);
    return () => window.removeEventListener('dt:supabase_synced', onSync);
  }, []);

  // Sync suites from Supabase property_room_types or fallback
  const sbRoomTypes = (window.DT_DATA && DT_DATA.SUPABASE && DT_DATA.SUPABASE.roomTypes) || [];

  // The 6 standard suite classes matching Image 1
  const defaultSuites = [
    { id: 'deluxe', name: 'Deluxe', localImg: 'assets/photos/suite-deluxe.jpg', price: 6318000 },
    { id: 'premium', name: 'Premium', localImg: 'assets/photos/suite-premium.jpg', price: 6065000 },
    { id: 'junior', name: 'Junior', localImg: 'assets/photos/suite-junior.jpg', price: 5000000 },
    { id: 'senior', name: 'Senior', localImg: 'assets/photos/suite-senior.jpg', price: 5000000 },
    { id: 'executive', name: 'Executive', localImg: 'assets/photos/suite-executive.jpg', price: 6000000 },
    { id: 'royal', name: 'Royal', localImg: 'assets/photos/suite-royal.jpg', price: 10500000 },
  ];

  // Map each suite to real Supabase room type if available
  const suites = defaultSuites.map((ds) => {
    const found = sbRoomTypes.find(rt => (rt.name || '').toLowerCase().includes(ds.id));
    return {
      ...ds,
      img: (found && found.images && found.images[0]) || ds.localImg,
      price: found ? found.base_price : ds.price,
      area: found ? found.area_sqm : (ds.id === 'royal' ? 53 : 28),
      units: found ? found.total_units : (ds.id === 'royal' ? 2 : 4)
    };
  });

  return (
    <section className="dt-suites-sec" id="suites" data-screen-label="6 Hạng Suite Du Thuyền 5★">
      <div className="dt-suites-inner">
        <div className="dt-suites-title">
          {LV('6 HẠNG SUITE — ĐỀU CÓ BAN CÔNG RIÊNG', '6 SUITE CATEGORIES — ALL WITH PRIVATE BALCONY')}
        </div>
        <div className="dt-suites-grid">
          {suites.map((st) => (
            <a key={st.id} className="dt-suite-card" href="https://daiichitravel.com/?tab=cruise-tours" target="_blank" rel="noopener">
              <img src={st.img} alt={st.name} loading="lazy" />
              <span className="name">{st.name}</span>
            </a>
          ))}
        </div>
        <div className="dt-suites-stats">
          <div className="dt-suites-stat">
            <b>30</b>
            <span>{LV('suite ban công', 'balcony suites')}</span>
          </div>
          <div className="dt-suites-stat">
            <b>6</b>
            <span>{LV('hạng suite', 'suite categories')}</span>
          </div>
          <div className="dt-suites-stat">
            <b>2N1Đ · 3N2Đ</b>
            <span>{LV('hành trình', 'itinerary')}</span>
          </div>
          <div className="dt-suites-stat">
            <b>từ 6.05tr</b>
            <span>{LV('mỗi đêm / cabin 2 khách', 'per night / 2-guest cabin')}</span>
          </div>
        </div>
        <div className="dt-suites-actions">
          <a className="dt-suites-btn-primary" href="https://daiichitravel.com/?tab=cruise-tours" target="_blank" rel="noopener">
            {LV('Đặt du thuyền 5★ →', 'Book 5★ Cruise →')}
          </a>
          <a className="dt-suites-btn-ghost" href="https://daiichitravel.com/?tab=cruise-tours" target="_blank" rel="noopener">
            {LV('Tham quan con tàu', 'Ship Tour')}
          </a>
          <a className="dt-suites-btn-ghost" href="seo/vi/du-thuyen-ngu-dem-lan-ha.html">
            {LV('Tìm hiểu du thuyền', 'Cruise Details')}
          </a>
          <a className="dt-suites-btn-ghost" href="https://daiichitravel.com/?tab=cruise-tours" target="_blank" rel="noopener">
            {LV('Tàu 4★ Daiichi Boutique', '4★ Daiichi Boutique')}
          </a>
        </div>
      </div>
    </section>
  );
}

function OneHome() {
  const [, force] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onLang = () => force((x) => x + 1);
    window.addEventListener('dt:lang', onLang);
    window.addEventListener('dt:cms', onLang);
    window.addEventListener('storage', onLang);
    return () => { window.removeEventListener('dt:lang', onLang); window.removeEventListener('dt:cms', onLang); window.removeEventListener('storage', onLang); };
  }, []);
  const L2 = (pair) => (Array.isArray(pair) ? LV(pair[0], pair[1]) : pair);
  const heroT = window.DT_CMS ? DT_CMS.heroTitle('home') : null;
  const heroImg = window.DT_CMS ? DT_CMS.heroImg('home') : 'luxury-1.jpg';
  const bnews = window.DT_CMS ? DT_CMS.bannerNews() : null;

  return (
    <React.Fragment>
      <header className="on-header">
        <div className="on-header-in" style={{ position: 'relative' }}>
          <a className="on-logo" href="#" style={{ textDecoration: 'none', color: '#fff' }}>
            <img src="assets/brand/logo-DaiichiTravel.webp" alt="Daiichi Cruise" />
            <b>DAIICHI <em>CRUISE</em></b>
          </a>
          <nav className="on-nav">
            <a href="#services">{T('nav_services')}</a>
            <a href="https://daiichitravel.com/?tab=my-tickets" target="_blank" rel="noopener">{I18N.t('nav_mybooking')}</a>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <a href="tel:19009070" style={{ color: '#fff', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,.12)', padding: '7px 12px', borderRadius: 20, whiteSpace: 'nowrap' }} title="Hotline 24/7">
              <span>📞</span><b>1900 9070</b>
            </a>
            <a href="https://zalo.me/0961004709" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', fontSize: 13, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(0,104,255,.3)', border: '1px solid rgba(0,104,255,.6)', padding: '7px 12px', borderRadius: 20, whiteSpace: 'nowrap' }} title="Chat Zalo hỗ trợ">
              <span>💬</span><b>Zalo</b>
            </a>
            <OneLang />
            <a className="on-cta" href="https://daiichitravel.com/?tab=cruise-tours" target="_blank" rel="noopener">{T('cta_book')}</a>
            <button className="on-burger" aria-label="menu" onClick={() => setMenuOpen(!menuOpen)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {menuOpen ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
          {menuOpen && (
            <div className="on-mobile-menu" onClick={() => setMenuOpen(false)}>
              <div style={{ padding: '8px 10px', display: 'flex', gap: 8, borderBottom: '1px solid rgba(255,255,255,.1)', marginBottom: 6 }}>
                <a href="tel:19009070" style={{ color: 'var(--gold-bright)', fontSize: 13, fontWeight: 700, padding: 0 }}>📞 1900 9070</a>
                <span style={{ color: 'rgba(255,255,255,.4)' }}>·</span>
                <a href="https://zalo.me/0961004709" target="_blank" rel="noopener" style={{ color: '#60A5FA', fontSize: 13, fontWeight: 700, padding: 0 }}>💬 Zalo: 0961 004 709</a>
              </div>
              <a href="#deals">{LV('Ưu đãi đang diễn ra', 'Deals')}</a>
              <a href="#services">{T('nav_services')}</a>
              <a href="https://daiichitravel.com/?tab=my-tickets" target="_blank" rel="noopener">{I18N.t('nav_mybooking')}</a>
              <a href="#partner">{T('cta_partner')}</a>
            </div>
          )}
        </div>
      </header>

      {bnews && (
        <div style={{ background: 'var(--gold-soft)', borderBottom: '1px solid var(--line)', color: '#6B4F1B', padding: '8px 18px', textAlign: 'center', fontSize: 12.5, fontWeight: 600 }} data-comment-anchor="home-news-bar">
          📣 {I18N.L(bnews.title)}
        </div>
      )}

      <div className="on-hero" data-screen-label="Hero trang chủ">
        <div className="on-hero-bg" style={{ backgroundImage: `url(assets/photos/${heroImg})` }}></div>
        <div className="on-kicker">{T('hero_k')}</div>
        <h1>{heroT ? I18N.L(heroT) : T('hero_t')}</h1>
        <p>{T('hero_p')}</p>
        <div className="on-hero-actions">
          <a className="on-btn red" href="https://daiichitravel.com/?tab=cruise-tours" target="_blank" rel="noopener">{T('cta_book')} →</a>
          <a className="on-btn glass" href="https://daiichitravel.com/?tab=my-tickets" target="_blank" rel="noopener">{I18N.t('nav_mybooking')}</a>
        </div>
      </div>

      <div className="dt-search-wrap" style={{ maxWidth: 1040, margin: '-78px auto 0', padding: '0 24px', position: 'relative', zIndex: 10 }}>
        <HomeSearch />
      </div>

      <PopularRoutesSection />

      <LiveBusScheduleSection />

      <DayCruisesSection />

      <LuxurySuitesGallery />

      <LiveDeals />

      <section className="on-sec" id="services" data-screen-label="Dịch vụ">
        <div className="on-sec-head">
          <div className="k">{T('svc_k')}</div>
          <h2>{T('svc_t')}</h2>
          <p>{T('svc_p')}</p>
        </div>
        <div className="on-svc">
          {SERVICES.map((s, i) => (
            <a key={i} className={'on-svc-card' + (s.wide ? ' wide' : '')} href={s.href}>
              <span className="bg" style={{ backgroundImage: `url(${s.img})` }}></span>
              <span className="tx">
                <span className={'tag' + (s.pt ? ' pt' : '')}>{s.pt ? '✓ ' : ''}{L2(s.tag)}</span>
                <h3>{LV(s.t[0], s.t[1])}</h3>
                <span className="d">{LV(s.d[0], s.d[1])}</span>
                {s.pr && <span className="pr">{LV('từ', 'from')} {s.pr}{LV('/khách', '/person')}</span>}
              </span>
            </a>
          ))}
        </div>
        {/* customer trust row */}
        <div className="on-trust">
          {[
            ['⚡', I18N.t('confirm_instant'), LV('Vé QR gửi ngay qua email / Zalo sau khi thanh toán.', 'QR ticket delivered instantly by email or Zalo.')],
            ['🛡️', I18N.t('free_cancel'), LV('Không phí ẩn — giá đã gồm VAT và đón trả trung tâm.', 'No hidden fees — VAT and central pickup included.')],
            ['📍', LV('Theo dõi xe GPS', 'Live GPS tracking'), LV('Biết xe đang ở đâu, đến điểm đón lúc mấy giờ.', 'See where your bus is and when it arrives.')],
            ['💬', I18N.t('support_247'), LV('Tiếng Việt, Anh, Nhật, Hàn, Trung, Pháp.', 'Vietnamese, English, Japanese, Korean, Chinese, French.')],
          ].map(([ic, b, s], i) => (
            <div key={i} className="on-trust-it">
              <span className="ic">{ic}</span>
              <span><b>{b}</b><span style={{ display: 'block' }}>{s}</span></span>
            </div>
          ))}
        </div>
      </section>

      <div className="on-nums">
        <div className="on-nums-in">
          {[
            ['18+', LV('chuyến xe & tàu mỗi ngày', 'bus & boat departures daily')],
            ['6', LV('tour du thuyền ngày', 'day cruise tours')],
            ['32', LV('suite du thuyền 5★', '5★ cruise suites')],
            ['24/7', LV('hỗ trợ khách hàng', 'customer support')],
            ['6', LV('ngôn ngữ phục vụ', 'service languages')],
          ].map(([b, s], i) => (
            <div key={i} className="on-num"><b>{b}</b><span>{s}</span></div>
          ))}
        </div>
      </div>

      <div className="on-partner-mini" id="partner" data-screen-label="Đối tác (góc nhỏ)">
        <PartnerMini />
      </div>

      <div className="on-apps">
        <div className="on-apps-in">
          <div>
            <h2>{T('apps_t')} <em>{T('apps_em')}</em></h2>
            <p style={{ marginTop: 10 }}>
              {LV('Khách hàng, Tài xế, Hướng dẫn viên, Đại lý và Nhân viên — cùng đọc một kho chuyến, ghế và vé QR với website. GPS 2 chiều, quên đồ, gọi qua app/di động, chấm công GPS toàn công ty.', 'Customer, Driver, Guide, Agent and Staff — all reading the same trips, seats and QR tickets as the website. Two-way GPS, lost & found, in-app or cellular calls, company-wide GPS time clock.')}
            </p>
            <span className="on-btn gold" style={{ marginTop: 16, cursor: 'default' }}>{LV('Sắp ra mắt trên iOS & Android', 'Coming soon on iOS & Android')}</span>
          </div>
          <div className="on-applist">
            {[
              ['📱', LV('Khách hàng — đặt vé, GPS, quên đồ', 'Customer — booking, GPS, lost & found')],
              ['🛞', LV('Tài xế — điều hướng, chấm công', 'Driver — navigation, time clock')],
              ['🎤', LV('Hướng dẫn viên — liên hệ & đón khách', 'Guide — guest contact & pickup')],
              ['🤝', LV('Đại lý — giá net, đặt hộ', 'Agent — net rates, book for clients')],
              ['🪪', LV('Nhân viên — soát vé QR, POS', 'Staff — QR check-in, POS')],
              ['🕐', LV('Chấm công GPS toàn công ty', 'Company-wide GPS time clock')],
            ].map(([ic, lb], i) => (
              <span key={i}><span style={{ fontSize: 16 }}>{ic}</span>{lb}</span>
            ))}
          </div>
        </div>
      </div>

      <footer className="on-footer">
        <div className="on-footer-in">
          <div className="on-footer-grid">
            <div>
              <h4>DAIICHI CRUISE — DAIICHI TRAVEL</h4>
              <ul>
                <li>{I18N.t('footer_co')}</li>
                <li><b>Hotline 24/7:</b> <a href="tel:19009070" style={{ color: 'var(--gold-bright)' }}>1900 9070</a></li>
                <li><b>Zalo hỗ trợ:</b> <a href="https://zalo.me/0961004709" target="_blank" rel="noopener" style={{ color: '#60A5FA' }}>0961 004 709</a></li>
                <li><b>Email:</b> <a href="mailto:sale@daiichitravel.com">sale@daiichitravel.com</a></li>
                <li><b>Đặt vé chính thức:</b> <a href="https://daiichitravel.com" target="_blank" rel="noopener" style={{ color: 'var(--gold-bright)' }}>daiichitravel.com</a></li>
              </ul>
            </div>
            <div>
              <h4>{T('nav_services')}</h4>
              <ul>
                <li><a href="https://daiichitravel.com/?tab=book-ticket&from=Hà%20Nội&to=Cát%20Bà" target="_blank" rel="noopener">Daiichi Bus & Limousine</a></li>
                <li><a href="https://daiichitravel.com/?tab=tours&category=TOUR_SHORT" target="_blank" rel="noopener">Lan Ha Day Cruises</a></li>
                <li><a href="https://daiichitravel.com/?tab=cruise-tour" target="_blank" rel="noopener">Daiichi Luxury Cruise 5★</a></li>
                <li><a href="https://daiichitravel.com/?tab=tours&category=TOUR_SHORT" target="_blank" rel="noopener">Combo Tours</a></li>
              </ul>
            </div>
            <div>
              <h4>{LV('Điểm đến & cẩm nang', 'Destinations & guides')}</h4>
              <ul>
                {(() => {
                  const lg = ['vi','en','ja','ko','zh','fr'].includes(I18N.lang) ? I18N.lang : 'en';
                  const SL = {
                    bus: { vi:'xe-ha-noi-di-cat-ba', en:'hanoi-to-cat-ba-bus', ja:'hanoi-catba-bus', ko:'hanoi-catba-bus', zh:'hanoi-catba-bus', fr:'bus-hanoi-cat-ba' },
                    day: { vi:'du-thuyen-ngay-vinh-lan-ha', en:'lan-ha-bay-day-cruise', ja:'lan-ha-day-cruise', ko:'lan-ha-day-cruise', zh:'lan-ha-day-cruise', fr:'croisiere-journee-lan-ha' },
                    lux: { vi:'du-thuyen-ngu-dem-lan-ha', en:'lan-ha-overnight-cruise', ja:'lan-ha-overnight-cruise', ko:'lan-ha-overnight-cruise', zh:'lan-ha-overnight-cruise', fr:'croisiere-nuit-lan-ha' },
                  };
                  return [
                    [LV('Xe Hà Nội đi Cát Bà', 'Hanoi to Cat Ba bus'), 'seo/' + lg + '/' + SL.bus[lg] + '.html'],
                    [LV('Du thuyền ngày Lan Hạ', 'Lan Ha day cruises'), 'seo/' + lg + '/' + SL.day[lg] + '.html'],
                    [LV('Du thuyền ngủ đêm 5★', '5★ overnight cruise'), 'seo/' + lg + '/' + SL.lux[lg] + '.html'],
                  ].map(([lb, href]) => <li key={href}><a href={href}>{lb}</a></li>);
                })()}
              </ul>
            </div>
            <div>
              <h4>{T('nav_partner')}</h4>
              <ul>
                <li><a href="#partner">{T('cta_partner')}</a></li>
                <li><a href="mailto:partner@daiichitravel.vn">partner@daiichitravel.vn</a></li>
              </ul>
            </div>
            <div>
              <h4>{T('nav_portal')}</h4>
              <ul>
                <li><a href="https://daiichitravel.com/?tab=my-tickets" target="_blank" rel="noopener">{I18N.t('nav_mybooking')}</a></li>
                <li><a href="https://daiichitravel.com" target="_blank" rel="noopener">Daiichi Travel Portal</a></li>
              </ul>
            </div>
          </div>
          <div className="on-footer-note">
            <span>© 2026 Daiichi Cruise · Nền tảng thành viên thuộc Daiichi Travel · Hotline: 1900 9070 · Zalo: 0961 004 709 · TT Cát Bà, Hải Phòng · <a href="customer/Chính sách & Điều khoản.html" style={{ color: 'inherit' }}>{LV('Chính sách & Điều khoản', 'Policies & Terms')}</a></span>
            <span>Hệ thống đặt vé trực tuyến vận hành bởi <a href="https://daiichitravel.com" target="_blank" rel="noopener" style={{ color: 'var(--gold-bright)' }}>DaiichiTravel.com</a></span>
          </div>
        </div>
      </footer>
      {typeof ChatWidget !== 'undefined' ? <ChatWidget /> : (window.ChatWidget && <window.ChatWidget />)}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<OneHome />);
