/* DAIICHI — extras: cart, reviews, account (OTP), chat widget, notify timeline */
const { useState, useEffect, useRef } = React;

/* ---------- cart store ---------- */
const DT_CART = {
  get() { try { return JSON.parse(localStorage.getItem('dt_cart') || '[]'); } catch (e) { return []; } },
  set(items) { localStorage.setItem('dt_cart', JSON.stringify(items)); window.dispatchEvent(new CustomEvent('dt:cart')); },
  add(item) { const c = this.get(); c.push({ ...item, id: Date.now() + Math.random().toString(36).slice(2, 6) }); this.set(c); },
  remove(id) { this.set(this.get().filter((x) => x.id !== id)); },
  clear() { this.set([]); },
  count() { return this.get().length; },
  total() { return this.get().reduce((s, x) => s + x.total, 0); },
};

function CartButton({ nav }) {
  const [n, setN] = useState(DT_CART.count());
  useEffect(() => {
    const on = () => setN(DT_CART.count());
    window.addEventListener('dt:cart', on); window.addEventListener('storage', on);
    return () => { window.removeEventListener('dt:cart', on); window.removeEventListener('storage', on); };
  }, []);
  return (
    <button onClick={() => nav('cart')} aria-label="cart" style={{ position: 'relative', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.16)', color: '#fff', width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h2l2.2 11h10.2l2-8H7.5" /><circle cx="10" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /></svg>
      {n > 0 && <span style={{ position: 'absolute', top: -4, right: -4, background: 'var(--gold-bright)', color: 'var(--navy)', fontSize: 10, fontWeight: 800, minWidth: 17, height: 17, borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>{n}</span>}
    </button>
  );
}
function UserButton({ nav }) {
  return (
    <button onClick={() => nav('account')} aria-label="account" style={{ background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.16)', color: '#fff', width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
      <I.user size={16} />
    </button>
  );
}

/* ---------- upsell suggestions ---------- */
const UPSELLS = {
  needDay: { id: 'up-day', kind: 'day', off: 10, base: 720000, img: 'daycruise-1.jpg',
    label: { vi: 'Day Cruise VIP 1 · Lan Hạ – Việt Hải (−10% khi đặt kèm)', en: 'VIP 1 Day Cruise · Lan Ha – Viet Hai (−10% bundled)', ja: 'VIP1デイクルーズ（同時予約で−10%）', ko: 'VIP1 데이 크루즈 (번들 −10%)', zh: 'VIP1一日游船（同购−10%）', fr: 'Croisière VIP 1 (−10 % en combo)' } },
  needBus: { id: 'up-bus', kind: 'bus', off: 10, base: 330000, img: 'limo10.jpg',
    label: { vi: 'Limousine Hà Nội → Cát Bà + tàu cao tốc (−10% khi đặt kèm)', en: 'Hanoi → Cat Ba limousine + speedboat (−10% bundled)', ja: 'ハノイ→カットバ リムジン（−10%）', ko: '하노이→깟바 리무진 (−10%)', zh: '河内→吉婆豪华车（−10%）', fr: 'Limousine Hanoï → Cat Ba (−10 %)' } },
};
function pickUpsell(items) {
  const kinds = items.map((x) => x.kind);
  if (kinds.includes('bus') && !kinds.some((k) => ['day', 'luxury', 'tour'].includes(k))) return UPSELLS.needDay;
  if (!kinds.includes('bus') && kinds.length) return UPSELLS.needBus;
  return null;
}

/* ---------- cart page ---------- */
function CartPage({ nav }) {
  const t = (k) => I18N.t(k);
  const [items, setItems] = useState(DT_CART.get());
  const [phase, setPhase] = useState('cart'); // cart | checkout | ticket
  const [bk, setBk] = useState(null);
  const refresh = () => setItems(DT_CART.get());
  const [, tick] = useState(0);
  useEffect(() => {
    if (!items.some((x) => x.holdUntil)) return;
    const i = setInterval(() => tick((x) => x + 1), 1000);
    return () => clearInterval(i);
  }, [items]);
  const holidayFee = items.reduce((s, x) => s + (x.holiday || 0), 0);
  const up = pickUpsell(items);
  const KIND_IC = { bus: '🚌', day: '🛳️', luxury: '🌙', tour: '🗺️' };

  if (phase === 'ticket' && bk) return <div className="dt-page"><SuccessTicket bk={bk} nav={nav} /></div>;
  if (phase === 'checkout') {
    return (
      <div className="dt-page" data-screen-label="Thanh toán giỏ hàng">
        <div className="dt-crumb" style={{ cursor: 'pointer' }} onClick={() => setPhase('cart')}>← {t('cart')}</div>
        <CheckoutFlow
          ctx={{
            kind: 'cart', title: t('cart') + ' · ' + items.length,
            fromLabel: 'Daiichi', toLabel: items.length + ' ' + (I18N.lang === 'vi' ? 'dịch vụ' : 'services'),
            date: items[0] ? items[0].date : '', timeGo: '',
            paxLabel: items.map((x) => x.short).join(' + '),
            rows: [
              ...items.map((x) => [x.short, x.date + ' · ' + I18N.fmtPrice(x.total)]),
            ],
            holidayFee,
            total: DT_CART.total(),
          }}
          onBack={() => setPhase('cart')}
          onDone={(b) => { DT_CART.clear(); setBk(b); setPhase('ticket'); }}
        />
      </div>
    );
  }
  return (
    <div className="dt-page" data-screen-label="Giỏ hàng" style={{ maxWidth: 860 }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--navy)', marginBottom: 18 }}>{t('cart')}</h2>
      {items.length === 0 ? (
        <div className="dt-empty">
          {t('empty_cart')}
          <div style={{ marginTop: 14 }}><button className="dt-btn" onClick={() => nav('home')}>{t('new_booking')}</button></div>
        </div>
      ) : (
        <React.Fragment>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {items.map((x) => (
              <div key={x.id} className="dt-panel" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px' }}>
                <span style={{ fontSize: 22 }}>{KIND_IC[x.kind] || '🎫'}</span>
                <div style={{ flex: 1 }}>
                  <b style={{ fontSize: 14, color: 'var(--navy)' }}>{x.label}</b>
                  <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{x.date}{x.detail ? ' · ' + x.detail : ''}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap' }}>
                    {x.holdUntil && (x.holdUntil > Date.now()
                      ? <span style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--ok)', background: 'var(--ok-soft)', borderRadius: 9, padding: '2px 9px', fontFamily: 'ui-monospace, monospace' }}>🔒 {t('hold_seats')} {Math.floor((x.holdUntil - Date.now()) / 60000)}:{String(Math.floor(((x.holdUntil - Date.now()) % 60000) / 1000)).padStart(2, '0')}</span>
                      : <span style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--bad)', background: 'var(--bad-soft)', borderRadius: 9, padding: '2px 9px' }}>⏱ {I18N.lang === 'vi' ? 'Hết giữ ghế — xác nhận lại khi thanh toán' : 'Hold expired — re-confirmed at checkout'}</span>)}
                    {x.holiday > 0 && <span style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--warn)', background: 'var(--warn-soft)', borderRadius: 9, padding: '2px 9px' }}>{t('holiday_auto')} +{I18N.fmtPrice(x.holiday)}</span>}
                  </div>
                </div>
                <b style={{ color: 'var(--red)', fontSize: 15, whiteSpace: 'nowrap' }}>{I18N.fmtPrice(x.total)}</b>
                <button className="dt-btn ghost" style={{ padding: '7px 12px', fontSize: 12 }} onClick={() => { DT_CART.remove(x.id); refresh(); }}>{t('remove')}</button>
              </div>
            ))}
          </div>
          {up && (
            <div className="dt-panel" style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 14, border: '1.5px dashed var(--gold)', background: 'var(--gold-soft)' }} data-comment-anchor="upsell-card">
              <img src={'../assets/photos/' + up.img} alt={I18N.L(up.label)} loading="lazy" style={{ width: 88, height: 60, objectFit: 'cover', borderRadius: 8 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '.08em', color: 'var(--gold)', textTransform: 'uppercase' }}>{t('upsell')}</div>
                <b style={{ fontSize: 13.5, color: 'var(--navy)' }}>{I18N.L(up.label)}</b>
                <div style={{ fontSize: 12.5 }}><s style={{ color: 'var(--ink-3)' }}>{I18N.fmtPrice(up.base)}</s> <b style={{ color: 'var(--red)' }}>{I18N.fmtPrice(Math.round(up.base * (100 - up.off) / 100 / 1000) * 1000)}</b>{t('per_person')}</div>
              </div>
              <button className="dt-btn gold" onClick={() => {
                DT_CART.add({ kind: up.kind, label: I18N.L(up.label), short: I18N.L(up.label).split(' (')[0], date: items[0].date, total: Math.round(up.base * (100 - up.off) / 100 / 1000) * 1000, detail: '−' + up.off + '%' });
                refresh();
              }}>+ {t('add_cart')}</button>
            </div>
          )}
          <div className="dt-panel" style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{t('total')} · {items.length}{holidayFee > 0 ? ' · ' + t('holiday_auto') + ' +' + I18N.fmtPrice(holidayFee) : ''}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--red)' }}>{I18N.fmtPrice(DT_CART.total() + holidayFee)} <span style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 600 }}>{I18N.approx(DT_CART.total() + holidayFee)}</span></div>
            </div>
            <button className="dt-btn" style={{ padding: '13px 30px', fontSize: 15 }} onClick={() => setPhase('checkout')}>{t('checkout_all')} →</button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

/* ---------- verified reviews ---------- */
const REVIEWS = {
  day: [
    { n: 'Yuki T.', f: '🇯🇵', d: '06/2026', r: 5, tx: { vi: 'Vịnh đẹp ngoài sức tưởng tượng, HDV nói tiếng Nhật rất tốt. Bữa trưa hải sản tươi.', en: 'The bay is beyond beautiful, our guide spoke great Japanese. Fresh seafood lunch.', ja: '想像以上に美しい湾。ガイドの日本語も上手で、海鮮ランチも新鮮でした。' } },
    { n: 'Trần Minh H.', f: '🇻🇳', d: '05/2026', r: 5, tx: { vi: 'Đặt online 5 phút, xe đón đúng giờ, tàu sạch. Kayak ở hang Sáng Tối là điểm nhấn.', en: 'Booked online in 5 minutes, pickup on time, clean boat. Kayaking the caves was the highlight.' } },
    { n: 'Claire D.', f: '🇫🇷', d: '05/2026', r: 4, tx: { vi: 'Hoàng hôn tuyệt đẹp. Sẽ quay lại với tour ngủ đêm.', en: 'Stunning sunset. Coming back for the overnight cruise.', fr: 'Coucher de soleil magnifique. Nous reviendrons pour la croisière de nuit.' } },
  ],
  luxury: [
    { n: 'Kim M.', f: '🇰🇷', d: '06/2026', r: 5, tx: { vi: 'Suite có ban công nhìn thẳng vịnh, đồ ăn chuẩn fine-dining. Đáng từng đồng.', en: 'Balcony suite facing the bay, true fine dining. Worth every dong.', ko: '베이가 보이는 발코니 스위트, 진짜 파인다이닝. 돈이 아깝지 않아요.' } },
    { n: 'Nguyễn Thu P.', f: '🇻🇳', d: '05/2026', r: 5, tx: { vi: 'Kỷ niệm 10 năm cưới hoàn hảo: jacuzzi hoàng hôn, lớp nấu ăn vui, nhân viên chu đáo.', en: 'Perfect 10th anniversary: sunset jacuzzi, fun cooking class, attentive crew.' } },
    { n: 'James C.', f: '🇬🇧', d: '04/2026', r: 5, tx: { vi: 'Tàu mới, yên tĩnh, ít khách hơn Hạ Long. Bình minh trên sundeck không thể quên.', en: 'New ship, quiet bay, fewer crowds than Ha Long. Sunrise on the sundeck is unforgettable.' } },
  ],
  bus: [
    { n: 'Lê Quang D.', f: '🇻🇳', d: '06/2026', r: 5, tx: { vi: 'Limousine sạch, wifi mạnh, tàu cao tốc nối chuyến mượt — 3 tiếng tới nơi.', en: 'Clean limousine, fast wifi, smooth speedboat connection — 3 hours door to door.' } },
    { n: 'Wang L.', f: '🇨🇳', d: '05/2026', r: 4, tx: { vi: 'Đặt vé bằng tiếng Trung dễ dàng, lái xe an toàn.', en: 'Easy booking in Chinese, safe driving.', zh: '中文订票很方便，司机开车很稳。' } },
  ],
};
function Stars({ n }) {
  return <span style={{ color: 'var(--gold-bright)', letterSpacing: 1 }}>{'★'.repeat(n)}<span style={{ color: 'var(--line-2)' }}>{'★'.repeat(5 - n)}</span></span>;
}
function ReviewBlock({ group, score = 4.9, count = 1240 }) {
  const t = (k) => I18N.t(k);
  const extra = window.DT_CMS ? DT_CMS.reviewsApproved(group) : [];
  const list = [...extra, ...(REVIEWS[group] || REVIEWS.day)];
  return (
    <div className="dt-panel" style={{ marginTop: 16 }} data-comment-anchor={'reviews-' + group}>
      <h3 style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
        {t('reviews')}
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gold)' }}>★ {score.toLocaleString(I18N.lang === 'vi' ? 'vi-VN' : 'en-US')}</span>
        <span style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 500 }}>{count.toLocaleString('vi-VN')} {t('reviews').toLowerCase().split(' ')[0]} · ✓ {t('verified_bk')}</span>
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {list.map((r, i) => (
          <div key={i} style={{ borderTop: i ? '1px solid var(--ivory)' : 0, paddingTop: i ? 12 : 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
              <b style={{ fontSize: 13, color: 'var(--ink)' }}>{r.f} {r.n}</b>
              <Stars n={r.r} />
              <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{r.d}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--ok)', background: 'var(--ok-soft)', borderRadius: 8, padding: '2px 8px' }}>✓ {t('verified_bk')}</span>
            </div>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6 }}>{I18N.L(r.tx)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- account (OTP login + my trips + points) ---------- */
function AccountPage({ nav }) {
  const t = (k) => I18N.t(k);
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem('dt_user')); } catch (e) { return null; } });
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [demoOtp] = useState(() => String(Math.floor(100000 + Math.random() * 900000)));
  const all = Object.values(JSON.parse(localStorage.getItem('dt_bookings') || '{}'));
  const norm = (s) => String(s || '').replace(/\D/g, '');
  const mine = user ? all.filter((b) => norm(b.phone) === norm(user.phone)) : [];
  const points = mine.length * 150 + Math.floor(mine.reduce((s, b) => s + (b.total || 0), 0) / 20000);
  const tier = points >= 1500 ? 'Bạch Kim' : points >= 600 ? 'Vàng' : 'Bạc';

  if (!user) return (
    <div className="dt-page" data-screen-label="Đăng nhập OTP">
      <div className="dt-lookup">
        <h2>{t('login')}</h2>
        <p>{t('otp_hint')}</p>
        <div className="dt-lookup-row">
          <input value={phone} style={{ textTransform: 'none' }} onChange={(e) => setPhone(e.target.value)} placeholder="09xx xxx xxx" />
          <button className="dt-btn ghost" onClick={() => setOtpSent(phone.replace(/\D/g, '').length >= 9)}>{t('send_otp')}</button>
        </div>
        {otpSent && (
          <div style={{ marginTop: 12 }}>
            <p><b style={{ color: 'var(--gold)' }}>(demo: {demoOtp})</b></p>
            <div className="dt-lookup-row">
              <input value={otp} style={{ textTransform: 'none', letterSpacing: '.3em' }} maxLength={6} onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} placeholder="••••••" />
              <button className="dt-btn" disabled={otp !== demoOtp} onClick={() => {
                const u = { phone, created: Date.now() };
                localStorage.setItem('dt_user', JSON.stringify(u)); setUser(u);
              }}>{t('confirm')}</button>
            </div>
          </div>
        )}
        <p style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 16 }}>
          {I18N.lang === 'vi' ? 'Không cần mật khẩu — đăng nhập bằng OTP qua SMS/Zalo. Tự động tích điểm cho mọi vé đặt bằng số này.' : 'No password needed — sign in with an SMS/Zalo OTP. Points accrue automatically for every booking on this number.'}
        </p>
      </div>
    </div>
  );

  return (
    <div className="dt-page" data-screen-label="Tài khoản của tôi" style={{ maxWidth: 860 }}>
      <div className="dt-panel" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', background: 'var(--navy)', border: 0, color: '#fff' }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 19 }}>{user.phone.slice(-2)}</div>
        <div style={{ flex: 1 }}>
          <b style={{ fontSize: 16 }}>{user.phone}</b>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.65)' }}>{t('points')}: <b style={{ color: 'var(--gold-bright)' }}>{points.toLocaleString('vi-VN')}</b> · {I18N.lang === 'vi' ? 'Hạng' : 'Tier'} <b style={{ color: 'var(--gold-bright)' }}>{tier}</b></div>
        </div>
        <button className="dt-btn ghost" style={{ background: 'rgba(255,255,255,.1)', color: '#fff', borderColor: 'rgba(255,255,255,.3)' }}
          onClick={() => { localStorage.removeItem('dt_user'); setUser(null); }}>{t('logout')}</button>
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 21, color: 'var(--navy)', margin: '22px 0 12px' }}>{t('my_trips')} · {mine.length}</h3>
      {mine.length === 0 ? (
        <div className="dt-empty">{t('lookup_notfound')}<div style={{ marginTop: 12 }}><button className="dt-btn" onClick={() => nav('home')}>{t('new_booking')}</button></div></div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {mine.slice().reverse().map((b) => (
            <div key={b.code} className="dt-panel" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 18px', flexWrap: 'wrap' }}>
              <b style={{ fontFamily: 'ui-monospace, monospace', color: 'var(--navy)', fontSize: 13 }}>{b.code}</b>
              <div style={{ flex: 1, minWidth: 160 }}>
                <b style={{ fontSize: 13.5, color: 'var(--ink)' }}>{b.fromLabel} → {b.toLabel}</b>
                <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{b.date} {b.timeGo && '· ' + b.timeGo}{b.seats ? ' · ' + b.seats.join(', ') : ''}</div>
              </div>
              <b style={{ color: 'var(--red)' }}>{I18N.fmtPrice(b.total)}</b>
              <button className="dt-btn ghost" style={{ padding: '7px 14px', fontSize: 12 }} onClick={() => nav('lookup')}>{t('e_ticket')}</button>
              <button className="dt-btn" style={{ padding: '7px 14px', fontSize: 12 }} onClick={() => {
                if (b.kind === 'bus' && b.fromCode) nav('bus', { from: b.fromCode, to: b.toCode, date: b.date, pax: b.seats ? b.seats.length : 2 });
                else if (b.kind === 'luxury') nav('night');
                else if (b.kind === 'tour') nav('tour');
                else if (b.kind === 'daycruise' || b.kind === 'day') nav('day');
                else nav('bus');
              }}>{I18N.lang === 'vi' ? 'Đặt lại' : 'Rebook'}</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- automated notifications timeline (shown on e-ticket) ---------- */
function NotifyTimeline() {
  const v = I18N.lang === 'vi';
  const steps = [
    ['✉️', v ? 'Ngay bây giờ' : 'Right now', v ? 'Vé QR + hoá đơn gửi qua email & Zalo' : 'QR ticket + receipt by email & Zalo'],
    ['🔔', v ? 'Trước 24 giờ' : '24h before', v ? 'Nhắc lịch kèm điểm đón & dự báo thời tiết' : 'Reminder with pickup point & weather'],
    ['📍', v ? 'Trước 1 giờ' : '1h before', v ? 'Vị trí xe GPS realtime + SĐT Hướng dẫn viên' : 'Live bus GPS + your guide\u2019s number'],
    ['⭐', v ? 'Sau chuyến' : 'After the trip', v ? 'Lời cảm ơn + mời đánh giá (tích 150 điểm)' : 'Thank-you + review invite (150 pts)'],
  ];
  return (
    <div className="dt-panel" style={{ marginTop: 18 }} data-comment-anchor="notify-timeline">
      <h3 style={{ fontSize: 14 }}>{v ? 'Daiichi sẽ tự động đồng hành' : 'Daiichi keeps you posted automatically'}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {steps.map(([ic, tm, tx], i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '30px 110px 1fr', gap: '0 10px', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: 15 }}>{ic}</span>
              {i < steps.length - 1 && <span style={{ width: 2, flex: 1, background: 'var(--line)', minHeight: 14, margin: '3px 0' }}></span>}
            </div>
            <b style={{ fontSize: 11.5, color: 'var(--gold)', paddingTop: 2 }}>{tm}</b>
            <span style={{ fontSize: 12.5, color: 'var(--ink-2)', paddingBottom: 10 }}>{tx}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- live chat / Zalo widget — AI bot connected to Daiichi-AI-Chatbot ---------- */
function ChatWidget() {
  const v = I18N.lang === 'vi';
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState(() => [{ me: false, tx: DT_BOT.greet() }]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [custType, setCustType] = useState('retail'); // 'retail' (B2C) | 'agent' (B2B)
  const [showQuick, setShowQuick] = useState(true);
  const boxRef = useRef(null);

  useEffect(() => { if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight; }, [msgs, open, typing, showQuick]);
  useEffect(() => {
    const onLang = () => setMsgs([{ me: false, tx: DT_BOT.greet() }]);
    window.addEventListener('dt:lang', onLang);
    return () => window.removeEventListener('dt:lang', onLang);
  }, []);

  const send = async (tx) => {
    if (!tx || !tx.trim()) return;
    const userText = tx.trim();
    setShowQuick(false); // Tự động ẩn gợi ý ngay khi bắt đầu trò chuyện
    setMsgs((m) => [...m, { me: true, tx: userText }]);
    setInput('');
    setTyping(true);

    try {
      const reply = await DT_BOT.askAI(userText, custType);
      setMsgs((m) => [...m, { me: false, tx: reply }]);
    } catch (e) {
      console.warn('Lỗi gọi AI Chatbot:', e);
      setMsgs((m) => [...m, { me: false, tx: DT_BOT.reply(userText) }]);
    } finally {
      setTyping(false);
    }
  };

  const quick = DT_BOT.quick();

  // Helper to render formatted text (bold, bullets)
  const renderMessageContent = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, lIdx) => {
      // Parse **bold** parts
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={lIdx} style={{ display: 'block', minHeight: line.trim() ? 'auto' : '8px' }}>
          {parts.map((p, pIdx) => {
            if (p.startsWith('**') && p.endsWith('**')) {
              return <strong key={pIdx} style={{ color: 'var(--navy)', fontWeight: 700 }}>{p.slice(2, -2)}</strong>;
            }
            return p;
          })}
        </span>
      );
    });
  };

  return (
    <div className="dt-chat-root" style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 999, fontFamily: 'var(--font-ui)' }}>
      {open && (
        <div style={{ width: 380, maxWidth: 'calc(100vw - 32px)', height: 530, maxHeight: 'calc(100vh - 100px)', background: '#fff', borderRadius: 18, boxShadow: '0 16px 40px -8px rgba(18, 36, 65, 0.28), 0 0 0 1px rgba(18, 36, 65, 0.08)', display: 'flex', flexDirection: 'column', overflow: 'hidden', marginBottom: 12, border: '1px solid var(--line)' }} data-screen-label="Daiichi AI Chatbot">
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #122441 0%, #1E3A6B 100%)', color: '#fff', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ position: 'relative' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🤖</div>
              <span style={{ position: 'absolute', right: -1, bottom: -1, width: 10, height: 10, borderRadius: '50%', background: '#22C55E', border: '2px solid #122441' }}></span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <b style={{ fontSize: 13.5, color: '#fff' }}>Daiichi Travel AI</b>
                <span style={{ fontSize: 9.5, background: 'rgba(216, 31, 42, 0.9)', color: '#fff', padding: '1px 6px', borderRadius: 4, fontWeight: 700 }}>LIVE AI</span>
              </div>
              <div style={{ fontSize: 11, color: '#CBD5E1', display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                <span>Trí tuệ nhân tạo &amp; Dữ liệu Supabase</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 0, color: 'rgba(255,255,255,.8)', fontSize: 18, cursor: 'pointer', padding: '2px 6px' }}>✕</button>
          </div>

          {/* Messages List */}
          <div ref={boxRef} style={{ flex: 1, overflowY: 'auto', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 10, background: 'var(--ivory)' }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ alignSelf: m.me ? 'flex-end' : 'flex-start', maxWidth: '88%', background: m.me ? 'var(--navy)' : '#fff', color: m.me ? '#fff' : 'var(--ink)', border: m.me ? 0 : '1px solid var(--line)', borderRadius: m.me ? '16px 16px 4px 16px' : '16px 16px 16px 4px', padding: '10px 14px', fontSize: 13, lineHeight: 1.6, boxShadow: m.me ? 'none' : '0 2px 5px rgba(0,0,0,0.04)' }}>
                {renderMessageContent(m.tx)}
              </div>
            ))}
            {typing && (
              <div style={{ alignSelf: 'flex-start', background: '#fff', border: '1px solid var(--line)', borderRadius: '14px 14px 14px 4px', padding: '8px 14px', fontSize: 12, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
                <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--red-bright)', animation: 'spin 1s linear infinite' }}></span>
                <span>Daiichi AI đang tra cứu &amp; soạn câu trả lời…</span>
              </div>
            )}

            {/* Quick Suggestions Chips — Chỉ hiện khi mới vào (msgs <= 1) để không choán chỗ */}
            {showQuick && msgs.length <= 1 && (
              <div style={{ marginTop: 4, background: 'rgba(255,255,255,0.7)', padding: '10px 12px', borderRadius: 12, border: '1px dashed var(--line)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)' }}>💡 Câu hỏi phổ biến:</span>
                  <button onClick={() => setShowQuick(false)} style={{ background: 'none', border: 0, fontSize: 10.5, color: 'var(--text-muted)', cursor: 'pointer', padding: '0 4px' }}>Ẩn ✕</button>
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {quick.map((q) => (
                    <button key={q} onClick={() => send(q)} style={{ background: '#fff', border: '1px solid #CBD5E1', borderRadius: 12, padding: '5px 9px', fontSize: 11.5, color: 'var(--navy)', cursor: 'pointer', fontFamily: 'var(--font-ui)', transition: 'all .15s', textAlign: 'left' }} onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--red-bright)'; e.currentTarget.style.color = 'var(--red-bright)'; }} onMouseOut={(e) => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.color = 'var(--navy)'; }}>
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dải gợi ý thu gọn 1 dòng cuộn ngang khi user bấm bóng đèn lúc đang trò chuyện */}
          {showQuick && msgs.length > 1 && (
            <div style={{ background: '#F8FAFC', borderTop: '1px solid var(--line)', padding: '6px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>💡</span>
              <div style={{ display: 'flex', gap: 6, overflowX: 'auto', flex: 1, scrollbarWidth: 'none' }}>
                {quick.map((q) => (
                  <button key={q} onClick={() => send(q)} style={{ whiteSpace: 'nowrap', flexShrink: 0, background: '#fff', border: '1px solid #CBD5E1', borderRadius: 10, padding: '3px 8px', fontSize: 11, color: 'var(--navy)', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--red-bright)'} onMouseOut={(e) => e.currentTarget.style.borderColor = '#CBD5E1'}>
                    {q}
                  </button>
                ))}
              </div>
              <button onClick={() => setShowQuick(false)} style={{ background: 'none', border: 0, color: 'var(--text-muted)', cursor: 'pointer', fontSize: 11, padding: '0 4px' }}>✕</button>
            </div>
          )}

          {/* Chat Input */}
          <div style={{ display: 'flex', gap: 6, padding: '10px 12px', borderTop: '1px solid var(--line)', background: '#fff', alignItems: 'center' }}>
            {msgs.length > 1 && (
              <button onClick={() => setShowQuick(!showQuick)} title={showQuick ? "Ẩn gợi ý" : "Hiện gợi ý nhanh"} style={{ background: showQuick ? '#FEE2E2' : '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: 8, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 14, flexShrink: 0, transition: 'all .15s' }}>
                💡
              </button>
            )}
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send(input)}
              placeholder={v ? 'Hỏi giá vé, giờ xe chạy, du thuyền…' : 'Ask a question…'} style={{ flex: 1, border: '1.5px solid var(--line-2)', borderRadius: 10, padding: '9px 12px', fontSize: 13, outline: 'none', minWidth: 0, fontFamily: 'var(--font-ui)' }} />
            <button className="dt-btn" style={{ padding: '8px 16px', borderRadius: 10, background: 'var(--red-bright)', color: '#fff', border: 0, cursor: 'pointer', fontWeight: 600, fontSize: 13, flexShrink: 0 }} onClick={() => send(input)}>
              Gửi
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Buttons: Hotline + Zalo + AI Chat */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
        {/* Hotline 1900 9070 */}
        <a href="tel:19009070" title="Gọi Hotline 1900 9070" style={{ width: 48, height: 48, borderRadius: '50%', background: '#10B981', color: '#fff', boxShadow: '0 6px 18px rgba(16, 185, 129, 0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: 22, border: '2px solid rgba(255,255,255,0.4)', transition: 'transform .15s' }}>
          📞
        </a>

        {/* Zalo 0961 004 709 */}
        <a href="https://zalo.me/0961004709" target="_blank" rel="noopener noreferrer" title="Chat Zalo 0961 004 709" style={{ width: 48, height: 48, borderRadius: '50%', background: '#0068FF', color: '#fff', boxShadow: '0 6px 18px rgba(0, 104, 255, 0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontWeight: 800, fontSize: 13, border: '2px solid rgba(255,255,255,0.4)', transition: 'transform .15s' }}>
          Zalo
        </a>

        {/* Floating Chat Bubble */}
        <button onClick={() => setOpen(!open)} aria-label="chat" title="Hỏi trợ lý ảo AI Daiichi" style={{ width: 54, height: 54, borderRadius: '50%', background: 'linear-gradient(135deg, var(--red) 0%, #B7121D 100%)', color: '#fff', border: '2px solid rgba(255,255,255,0.3)', boxShadow: '0 8px 24px -4px rgba(216, 31, 42, 0.45)', fontSize: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform .15s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.94)'} onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          {open ? '✕' : '💬'}
        </button>
      </div>
    </div>
  );
}

/* ---------- self-service cancel / change (policy-aware) ---------- */
function TicketActions({ bk, nav, onUpdate }) {
  const t = (k) => I18N.t(k);
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState(false);
  if (bk.cancelled) return null;
  const dep = new Date(bk.date + 'T' + (bk.timeGo || '23:59'));
  const hoursLeft = (dep - Date.now()) / 36e5;
  /* cruise ngủ đêm: 100% nếu >7 ngày, 50% nếu >3 ngày, dưới 3 ngày chỉ đổi ngày · còn lại: chính sách 12h */
  let refundPct, policyMsg;
  if (bk.kind === 'luxury') {
    const daysLeft = hoursLeft / 24;
    if (daysLeft > 7) { refundPct = 100; policyMsg = '🟢 ' + t('cancel_cruise_full'); }
    else if (daysLeft > 3) { refundPct = 50; policyMsg = '🟡 ' + t('cancel_cruise_half'); }
    else { refundPct = 0; policyMsg = '🟡 ' + t('cancel_cruise_none'); }
  } else {
    refundPct = hoursLeft > 12 ? 100 : 0;
    policyMsg = refundPct ? '🟢 ' + t('cancel_free') : '🟡 ' + t('cancel_late');
  }
  const refundable = refundPct > 0;
  const refundAmt = Math.round(bk.total * refundPct / 100);
  const doCancel = () => {
    bk.cancelled = true;
    bk.cancelledAt = new Date().toISOString();
    bk.refundPct = refundPct;
    DT_STORE.save(bk);
    setDone(true);
    if (onUpdate) onUpdate();
  };
  if (done) return (
    <div className="dt-panel" style={{ marginTop: 14, borderColor: 'var(--ok)', background: 'var(--ok-soft)' }} data-screen-label="Đã huỷ vé">
      <b style={{ color: 'var(--ok)', fontSize: 14 }}>✓ {t('cancelled_done')}</b>
    </div>
  );
  return (
    <div className="dt-panel" style={{ marginTop: 14 }} data-comment-anchor="ticket-actions">
      <div style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.6, marginBottom: 12 }}>
        {policyMsg}
      </div>
      {!confirming ? (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="dt-btn ghost" onClick={() => nav('bus')}>{t('change_trip')}</button>
          {refundable && <button className="dt-btn ghost" style={{ color: 'var(--bad)', borderColor: 'var(--bad)' }} onClick={() => setConfirming(true)}>{t('cancel_ticket')}</button>}
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--bad)' }}>{t('cancel_ticket')} {bk.code} — {refundPct === 100 ? I18N.fmtPrice(refundAmt) : I18N.fmtPrice(refundAmt) + ' (' + t('refund_half_note') + ')'}?</span>
          <button className="dt-btn" style={{ background: 'var(--bad)' }} onClick={doCancel}>{t('confirm_cancel')}</button>
          <button className="dt-btn ghost" onClick={() => setConfirming(false)}>{t('keep_ticket')}</button>
        </div>
      )}
    </div>
  );
}

/* ---------- private charter request ---------- */
function CharterPage({ nav }) {
  const t = (k) => I18N.t(k);
  const VEHS = ['Limousine 11 chỗ', 'Limousine 34 chỗ', 'Bus 45 chỗ', 'Tàu cao tốc', 'Tàu day cruise (84 khách)', 'Daiichi Luxury Cruise 5★ (32 suite)'];
  const [f, setF] = useState({ veh: VEHS[0], date: '2026-06-25', pax: 15, name: '', phone: '', note: '' });
  const [sent, setSent] = useState(false);
  const ok = f.name.trim().length > 1 && f.phone.trim().length >= 9;
  const S = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const send = () => {
    try {
      const reqs = JSON.parse(localStorage.getItem('dt_charter') || '[]');
      reqs.push({ ...f, at: new Date().toISOString() });
      localStorage.setItem('dt_charter', JSON.stringify(reqs));
    } catch (e) {}
    setSent(true);
  };
  return (
    <div className="dt-page" data-screen-label="Thuê nguyên chuyến" style={{ maxWidth: 760 }}>
      <div className="dt-kicker">DAIICHI CHARTER · B2B & GROUPS</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--navy)', marginBottom: 8 }}>{t('charter_title')}</h2>
      <p style={{ color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>{t('charter_sub')}</p>
      {sent ? (
        <div className="dt-panel" style={{ borderColor: 'var(--ok)', background: 'var(--ok-soft)' }}>
          <b style={{ color: 'var(--ok)', fontSize: 15 }}>{t('charter_done')}</b>
        </div>
      ) : (
        <div className="dt-panel">
          <div className="dt-form-grid">
            <div className="dt-field"><label>{t('charter_veh')}</label>
              <select value={f.veh} onChange={S('veh')}>{VEHS.map((v) => <option key={v}>{v}</option>)}</select>
            </div>
            <div className="dt-field"><label>{t('s_date')}</label><input type="date" value={f.date} onChange={S('date')} /></div>
            <div className="dt-field"><label>{t('s_pax')}</label><input type="number" min="7" max="200" value={f.pax} onChange={S('pax')} /></div>
            <div className="dt-field"><label>{t('phone')} *</label><input value={f.phone} onChange={S('phone')} placeholder="09xx xxx xxx" /></div>
            <div className="dt-field"><label>{t('full_name')} *</label><input value={f.name} onChange={S('name')} placeholder="Nguyễn Văn A / Công ty ABC" /></div>
            <div className="dt-field full"><label>{t('note')}</label><input value={f.note} onChange={S('note')} placeholder={I18N.lang === 'vi' ? 'VD: đám cưới 40 khách, đón phố cổ, có trẻ em…' : 'e.g. wedding for 40, Old Quarter pickup…'} /></div>
          </div>
          <button className="dt-btn gold" style={{ marginTop: 16, padding: '13px 28px' }} disabled={!ok} onClick={send}>{t('charter_send')}</button>
        </div>
      )}
    </div>
  );
}

/* ---------- public careers / recruitment page ---------- */
function CareerPage({ nav }) {
  const t = (k) => I18N.t(k);
  const POS = ['HDV thời vụ (27/5–02/8)', 'Thuyền viên thời vụ', 'NV quầy vé thời vụ', 'Phụ xe thời vụ', 'Tài xế hạng D (chính thức)', 'HDV chính thức', 'Khác'];
  const [f, setF] = useState({ pos: POS[0], name: '', phone: '', exp: '' });
  const [sent, setSent] = useState(false);
  const ok = f.name.trim().length > 1 && f.phone.trim().length >= 9;
  const S = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const send = () => {
    try {
      const a = JSON.parse(localStorage.getItem('dt_applicants') || '[]');
      a.push({ ...f, at: new Date().toISOString() });
      localStorage.setItem('dt_applicants', JSON.stringify(a));
    } catch (e) {}
    setSent(true);
  };
  return (
    <div className="dt-page" data-screen-label="Tuyển dụng" style={{ maxWidth: 720 }}>
      <div className="dt-kicker">DAIICHI TRAVEL · HR</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--navy)', marginBottom: 8 }}>{t('careers')}</h2>
      <p style={{ color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.65, marginBottom: 20 }}>{t('careers_sub')}</p>
      {sent ? (
        <div className="dt-panel" style={{ borderColor: 'var(--ok)', background: 'var(--ok-soft)' }}>
          <b style={{ color: 'var(--ok)', fontSize: 15 }}>{t('apply_done')}</b>
        </div>
      ) : (
        <div className="dt-panel">
          <div className="dt-form-grid">
            <div className="dt-field"><label>{t('position')}</label>
              <select value={f.pos} onChange={S('pos')}>{POS.map((p) => <option key={p}>{p}</option>)}</select>
            </div>
            <div className="dt-field"><label>{t('phone')} *</label><input value={f.phone} onChange={S('phone')} placeholder="09xx xxx xxx" /></div>
            <div className="dt-field"><label>{t('full_name')} *</label><input value={f.name} onChange={S('name')} placeholder="Nguyễn Văn A" /></div>
            <div className="dt-field"><label>{t('note')}</label><input value={f.exp} onChange={S('exp')} placeholder={I18N.lang === 'vi' ? 'Kinh nghiệm, ngoại ngữ…' : 'Experience, languages…'} /></div>
          </div>
          <button className="dt-btn gold" style={{ marginTop: 16, padding: '13px 28px' }} disabled={!ok} onClick={send}>{t('apply_send')}</button>
          <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 10 }}>
            {I18N.lang === 'vi' ? 'Hồ sơ đổ thẳng vào pipeline tuyển dụng của bộ phận nhân sự (Back Office).' : 'Applications flow straight into the HR recruitment pipeline.'}
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { DT_CART, CartButton, UserButton, CartPage, ReviewBlock, AccountPage, NotifyTimeline, ChatWidget, pickUpsell, TicketActions, CharterPage, CareerPage });
