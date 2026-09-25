/* DAIICHI — shared customer components (exported to window) */
const { useState, useEffect, useRef } = React;

/* tiny icon set — simple strokes only */
const Ic = ({ d, size = 18, sw = 1.8, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" style={style}>{d}</svg>
);
const I = {
  bus: (p) => <Ic {...p} d={<g><rect x="4" y="3" width="16" height="15" rx="2.5" /><path d="M4 11h16M8 18v2.5M16 18v2.5" /><circle cx="8.2" cy="14.6" r="0.6" fill="currentColor" /><circle cx="15.8" cy="14.6" r="0.6" fill="currentColor" /></g>} />,
  ship: (p) => <Ic {...p} d={<g><path d="M3 17l1.5-6h15L21 17" /><path d="M12 11V5M8 8h8" /><path d="M3 20c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 3-1.2 4.5 0" /></g>} />,
  moon: (p) => <Ic {...p} d={<g><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z" /></g>} />,
  map: (p) => <Ic {...p} d={<g><path d="M9 4L4 6v14l5-2 6 2 5-2V4l-5 2-6-2z" /><path d="M9 4v14M15 6v14" /></g>} />,
  search: (p) => <Ic {...p} d={<g><circle cx="11" cy="11" r="6.5" /><path d="M16 16l5 5" /></g>} />,
  swap: (p) => <Ic {...p} d={<g><path d="M7 8h12l-3.5-3.5M17 16H5l3.5 3.5" /></g>} />,
  check: (p) => <Ic {...p} d={<path d="M4.5 12.5l5 5L19.5 7" />} />,
  arrR: (p) => <Ic {...p} d={<path d="M4 12h15m0 0l-5.5-5.5M19 12l-5.5 5.5" />} />,
  pin: (p) => <Ic {...p} d={<g><path d="M12 21s-7-5.6-7-11a7 7 0 0 1 14 0c0 5.4-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></g>} />,
  user: (p) => <Ic {...p} d={<g><circle cx="12" cy="8" r="4" /><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" /></g>} />,
  cal: (p) => <Ic {...p} d={<g><rect x="4" y="5" width="16" height="15" rx="2.5" /><path d="M4 10h16M9 3v4M15 3v4" /></g>} />,
  shield: (p) => <Ic {...p} d={<g><path d="M12 3l7.5 3v6c0 4.5-3.2 7.7-7.5 9-4.3-1.3-7.5-4.5-7.5-9V6L12 3z" /><path d="M9 12l2.2 2.2L15.5 10" /></g>} />,
  clock: (p) => <Ic {...p} d={<g><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></g>} />,
  star: (p) => <Ic {...p} d={<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5z" />} />,
  phone: (p) => <Ic {...p} d={<path d="M5 4h4l1.5 4.5L8 10a12 12 0 0 0 6 6l1.5-2.5L20 15v4a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />} />,
  leaf: (p) => <Ic {...p} d={<g><path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15z" /><path d="M5 19c3-5 7-9 11-11" /></g>} />,
  bed: (p) => <Ic {...p} d={<g><path d="M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6" /><path d="M3 18h18M5 10V6h14v4" /></g>} />,
};

/* pseudo-QR placeholder (programmatic) */
function QRBox({ code, size = 132 }) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const n = 25, cell = Math.floor(size / n);
    cv.width = cv.height = n * cell;
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, cv.width, cv.height);
    let h = 0; for (let i = 0; i < code.length; i++) h = (h * 31 + code.charCodeAt(i)) >>> 0;
    ctx.fillStyle = '#122441';
    const finder = (x, y) => {
      ctx.fillRect(x * cell, y * cell, 7 * cell, 7 * cell);
      ctx.fillStyle = '#fff'; ctx.fillRect((x + 1) * cell, (y + 1) * cell, 5 * cell, 5 * cell);
      ctx.fillStyle = '#122441'; ctx.fillRect((x + 2) * cell, (y + 2) * cell, 3 * cell, 3 * cell);
    };
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
      const inFinder = (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
      if (inFinder) continue;
      h = (h * 1103515245 + 12345) >>> 0;
      if ((h & 7) < 3) ctx.fillRect(x * cell, y * cell, cell, cell);
    }
    finder(0, 0); finder(n - 7, 0); finder(0, n - 7);
  }, [code, size]);
  return <canvas ref={ref} style={{ width: size, height: size }} aria-label={code}></canvas>;
}

/* language switcher */
function LangSwitcher() {
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
            <button key={l.code} className={l.code === I18N.lang ? 'on' : ''}
              onClick={() => { I18N.setLang(l.code); setOpen(false); }}>
              <span>{l.flag}</span><span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Header({ nav, page }) {
  const t = (k) => I18N.t(k);
  const [menuOpen, setMenuOpen] = useState(false);
  const items = [
    ['bus', t('nav_bus')], ['day', t('nav_day')], ['night', t('nav_night')],
    ['tour', t('nav_tour')], ['lookup', t('nav_mybooking')],
  ];
  const go = (id) => { setMenuOpen(false); nav(id); };
  return (
    <header className="dt-header" style={{ position: 'sticky' }}>
      <div className="dt-header-in" style={{ position: 'relative' }}>
        <div className="dt-logo" onClick={() => go('home')}>
          <img src="../assets/brand/logo-DaiichiTravel.webp" alt="Daiichi Travel" />
          <div className="dt-logo-name">DAIICHI <em>TRAVEL</em></div>
        </div>
        <nav className="dt-nav">
          {items.map(([id, lb]) => (
            <button key={id} className={page === id ? 'on' : ''} onClick={() => go(id)}>{lb}</button>
          ))}
        </nav>
        <div className="dt-header-right">
          <LangSwitcher />
          {window.CartButton && <CartButton nav={nav} />}
          {window.UserButton && <UserButton nav={nav} />}
          <button className="dt-burger" aria-label="menu" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="dt-mobile-menu">
            {items.map(([id, lb]) => (
              <button key={id} className={page === id ? 'on' : ''} onClick={() => go(id)}>{lb}</button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function Footer() {
  const t = (k) => I18N.t(k);
  const [nl, setNl] = useState('');
  const [nlDone, setNlDone] = useState(false);
  const subscribe = () => {
    if (nl.trim().length < 5) return;
    try { localStorage.setItem('dt_newsletter', nl.trim()); } catch (e) {}
    setNlDone(true);
  };
  return (
    <footer className="dt-footer">
      <div className="dt-footer-in">
        <div className="dt-nl" data-comment-anchor="newsletter">
          <div>
            <h4 style={{ margin: 0 }}>{t('nl_title')}</h4>
            <p>{t('nl_sub')}</p>
          </div>
          {nlDone ? (
            <div className="dt-nl-done">{t('nl_done')}</div>
          ) : (
            <div className="dt-nl-row">
              <input value={nl} onChange={(e) => setNl(e.target.value)} placeholder={t('nl_ph')}
                onKeyDown={(e) => e.key === 'Enter' && subscribe()} aria-label={t('nl_ph')} />
              <button className="dt-btn gold" onClick={subscribe}>{t('nl_btn')}</button>
            </div>
          )}
        </div>
        <div className="dt-footer-grid">
          <div>
            <h4>DAIICHI TRAVEL</h4>
            <ul>
              <li>{t('footer_co')}</li>
              <li>{t('support_247')}</li>
              <li>info@daiichitravel.vn</li>
            </ul>
          </div>
          <div>
            <h4>{t('nav_bus')}</h4>
            <ul><li>Hà Nội ⇄ Cát Bà</li><li>Hà Nội ⇄ Hải Phòng</li><li>Hạ Long ⇄ Ninh Bình</li><li>Cát Bà ⇄ Ninh Bình</li></ul>
          </div>
          <div>
            <h4>Lan Ha Bay</h4>
            <ul><li>{t('nav_day')}</li><li>{t('nav_night')}</li><li>Daiichi Luxury Cruise 5★</li><li>Daiichi Boutique Cruise</li></ul>
          </div>
          <div>
            <h4>{t('nav_mybooking')}</h4>
            <ul>
              <li>{t('free_cancel')}</li>
              <li>{t('weather_policy')}</li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('dt:nav', { detail: 'charter' })); }} style={{ textDecoration: 'none' }}>{t('charter_title')}</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new CustomEvent('dt:nav', { detail: 'careers' })); }} style={{ textDecoration: 'none' }}>{t('careers')}</a></li>
              <li><a href="Chính sách & Điều khoản.html" style={{ textDecoration: 'none' }}>{t('legal_link')}</a></li>
            </ul>
          </div>
        </div>
        <div className="dt-footer-note">
          <span>© 2026 Công ty TNHH Du lịch Daiichi · MST 0201998877 · GPKD do Sở KHĐT Hải Phòng cấp · Tổ dân phố Thắng Lợi, TT Cát Bà, Hải Phòng · ✓ Đã thông báo Bộ Công Thương</span>
          <span>{t('footer_merge')}</span>
        </div>
      </div>
    </footer>
  );
}

/* progress steps */
function Steps({ idx, labels }) {
  return (
    <div className="dt-steps">
      {labels.map((lb, i) => (
        <React.Fragment key={i}>
          {i > 0 && <div className="dt-step-bar"></div>}
          <div className={'dt-step' + (i === idx ? ' on' : i < idx ? ' done' : '')}>
            <span className="n">{i < idx ? '✓' : i + 1}</span><span>{lb}</span>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

/* quantity stepper */
function Stepper({ v, set, min = 0, max = 20 }) {
  return (
    <span className="dt-stepper">
      <button onClick={() => set(Math.max(min, v - 1))}>−</button>
      <span>{v}</span>
      <button onClick={() => set(Math.min(max, v + 1))}>+</button>
    </span>
  );
}

/* payment method picker */
function PayPicker({ value, onChange }) {
  const t = (k) => I18N.t(k);
  const methods = [
    { id: 'vnpay', lb: t('pay_vnpay'), c: '#005BAA', tag: 'VNPAY' },
    { id: 'momo', lb: t('pay_momo'), c: '#A50064', tag: 'MOMO' },
    { id: 'card', lb: t('pay_card'), c: '#1A1F71', tag: 'VISA' },
    { id: 'later', lb: t('pay_later'), c: '#B98A3C', tag: 'CASH' },
  ];
  return (
    <div className="dt-paym">
      {methods.map((m) => (
        <label key={m.id} className={value === m.id ? 'on' : ''}>
          <input type="radio" name="pm" checked={value === m.id} onChange={() => onChange(m.id)} />
          <span className="pm-ic" style={{ background: m.c }}>{m.tag}</span>
          <span>{m.lb}{m.id === 'later' && <small>{t('holiday_fee')}</small>}</span>
        </label>
      ))}
    </div>
  );
}

/* live countdown */
function Countdown({ ends, style }) {
  const [, t] = useState(0);
  useEffect(() => { const i = setInterval(() => t((x) => x + 1), 1000); return () => clearInterval(i); }, []);
  return <span style={{ fontFamily: 'ui-monospace, monospace', ...style }}>{DT_CAMPAIGNS.fmtLeft(ends, I18N.lang)}</span>;
}

/* flash-sale banner under header */
function PromoBar({ nav }) {
  const flash = DT_CAMPAIGNS.active().find((c) => c.kind === 'flash');
  if (!flash) return null;
  return (
    <div onClick={() => nav('day')} style={{ background: 'linear-gradient(90deg, #A8121E, #D81F2A)', color: '#fff', padding: '9px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, cursor: 'pointer', fontSize: 13, fontWeight: 600, flexWrap: 'wrap' }} data-comment-anchor="promo-bar">
      <span>⚡ <b>{flash.name} −{flash.off}%</b> · {I18N.L(flash.desc)}</span>
      <span style={{ background: 'rgba(255,255,255,.18)', borderRadius: 7, padding: '3px 10px', fontWeight: 800 }}>
        {I18N.t('ends_in')} <Countdown ends={flash.ends} />
      </span>
      <span style={{ textDecoration: 'underline', fontWeight: 700 }}>{I18N.t('book_now')} →</span>
    </div>
  );
}

/* price with active campaign: returns {final, c} */
function promoPrice(id, base) {
  const c = DT_CAMPAIGNS.forProduct(id);
  return { final: DT_CAMPAIGNS.apply(base, c), c };
}

/* CMS announcement bar */
function NewsBar() {
  const [hide, setHide] = useState(false);
  const n = window.DT_CMS ? DT_CMS.bannerNews() : null;
  if (!n || hide) return null;
  return (
    <div style={{ background: 'var(--gold-soft)', borderBottom: '1px solid var(--line)', color: '#6B4F1B', padding: '8px 18px', display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center', fontSize: 12.5, fontWeight: 600, flexWrap: 'wrap' }} data-comment-anchor="news-bar">
      <span>📣 {I18N.L(n.title)}</span>
      <button onClick={() => setHide(true)} aria-label="close" style={{ background: 'none', border: 0, color: 'inherit', cursor: 'pointer', fontWeight: 800 }}>✕</button>
    </div>
  );
}

/* booking persistence */
const DT_STORE = {
  save(bk) {
    const all = JSON.parse(localStorage.getItem('dt_bookings') || '{}');
    all[bk.code] = bk;
    localStorage.setItem('dt_bookings', JSON.stringify(all));
  },
  get(code) {
    const all = JSON.parse(localStorage.getItem('dt_bookings') || '{}');
    return all[(code || '').toUpperCase().trim()] || null;
  },
  newCode() {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
    let s = '';
    for (let i = 0; i < 5; i++) s += chars[Math.floor(Math.random() * chars.length)];
    return 'DT26-' + s;
  },
};

/* dynamic anti-fraud QR: rotates every 30s, countdown shown */
function DynamicQR({ code, cancelled }) {
  const t = (k) => I18N.t(k);
  const [left, setLeft] = useState(30);
  const [slot, setSlot] = useState(0);
  useEffect(() => {
    if (cancelled) return;
    const i = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) { setSlot((x) => x + 1); return 30; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(i);
  }, [cancelled]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <QRBox code={code + '·' + slot} />
      {!cancelled && (
        <div style={{ fontSize: 10.5, color: 'var(--ink-3)', textAlign: 'center', lineHeight: 1.5 }}>
          <b style={{ color: 'var(--ok)' }}>● {t('qr_dynamic')} {left}s</b><br />{t('qr_anti')}
        </div>
      )}
    </div>
  );
}

/* e-ticket card */
function TicketCard({ bk }) {
  const t = (k) => I18N.t(k);
  return (
    <div style={{ position: 'relative' }}>
      {bk.cancelled && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 5, background: 'rgba(250,248,244,.62)', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
          <span style={{ border: '3px solid var(--bad)', color: 'var(--bad)', fontWeight: 800, fontSize: 22, letterSpacing: '.12em', padding: '8px 22px', borderRadius: 10, transform: 'rotate(-8deg)', background: '#fff' }}>{t('cancel_ticket').toUpperCase()}</span>
        </div>
      )}
    <div className="dt-ticket" data-comment-anchor="eticket-card">
      <div className="dt-ticket-top">
        <div>
          <div className="bk">{t('booking_code')}</div>
          <div className="cd">{bk.code}</div>
        </div>
        <img src="../assets/brand/logo-DaiichiTravel.webp" alt="Daiichi Travel" style={{ height: 32, objectFit: 'contain' }} />
      </div>
      <div className="dt-ticket-body">
        <div className="dt-ticket-route">
          <div className="pt"><b>{bk.fromLabel}</b><span>{bk.timeGo}</span></div>
          <span className="arr"><I.arrR size={22} /></span>
          <div className="pt" style={{ textAlign: 'right' }}><b>{bk.toLabel}</b><span>{I18N.fmtDate(bk.date)}</span></div>
        </div>
        <div className="dt-ticket-rows">
          <div><span>{t('full_name')}</span><b>{bk.name}</b></div>
          <div><span>{t('phone')}</span><b>{bk.phone}</b></div>
          <div><span>{bk.seats ? t('step_seats') : t('s_pax')}</span><b>{bk.seats ? bk.seats.join(', ') : bk.paxLabel}</b></div>
          <div><span>{t('total')}</span><b style={{ color: 'var(--red)' }}>{I18N.fmtPrice(bk.total)}</b></div>
          {bk.retLine && <div style={{ gridColumn: '1 / -1' }}><span>{t('trip_back')}</span><b>{bk.retLine}</b></div>}
          {bk.pickup && <div className="full" style={{ gridColumn: '1 / -1' }}><span>{t('pickup_point')}</span><b>{bk.pickup}</b></div>}
        </div>
      </div>
      <div className="dt-ticket-qr">
        <DynamicQR code={bk.code} cancelled={!!bk.cancelled} />
        <p>{t('show_qr')}</p>
      </div>
    </div>
    </div>
  );
}

Object.assign(window, { I, Ic, QRBox, DynamicQR, LangSwitcher, Header, Footer, Steps, Stepper, PayPicker, DT_STORE, TicketCard, Countdown, PromoBar, NewsBar, promoPrice });
