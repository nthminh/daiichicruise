/* DAIICHI — generic checkout (promo code, holiday surcharge, hold timer, fx approx) + bus flow with round-trip */
const { useState, useEffect } = React;

/* ---------- shared checkout ---------- */
function CheckoutFlow({ ctx, onBack, onDone }) {
  const t = (k) => I18N.t(k);
  const [phase, setPhase] = useState('info'); // info | pay | processing | fail
  const [failNext, setFailNext] = useState(false); // demo: simulate declined card
  const [form, setForm] = useState({ name: '', phone: '', email: '', pickup: ctx.pickupOptions ? ctx.pickupOptions[0] : '', dropoff: ctx.dropoffOptions ? ctx.dropoffOptions[0] : '', note: '' });
  const [pm, setPm] = useState('vnpay');
  const [inv, setInv] = useState({ on: false, company: '', tax: '', email: '' });
  const [addons, setAddons] = useState({ ins: false, bike: false, pet: false, airport: false });
  const paxN = ctx.paxCount || 0;
  const ADDON_PRICES = { ins: 15000, bike: 50000, pet: 80000, airport: 250000 };
  const addonsTotal = (addons.ins ? ADDON_PRICES.ins * Math.max(1, paxN) : 0)
    + (ctx.kind === 'bus' ? (addons.bike ? ADDON_PRICES.bike : 0) + (addons.pet ? ADDON_PRICES.pet : 0) + (addons.airport ? ADDON_PRICES.airport : 0) : 0);
  const [promoIn, setPromoIn] = useState('');
  const [promo, setPromo] = useState(null);   // applied campaign
  const [promoErr, setPromoErr] = useState(false);
  const [holdLeft, setHoldLeft] = useState(600); // 10-minute seat hold
  useEffect(() => {
    const i = setInterval(() => setHoldLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(i);
  }, []);
  /* email không bắt buộc, nhưng nếu nhập thì phải đúng định dạng (vé gửi qua email) */
  const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const EMAIL_TYPOS = { 'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gamil.com': 'gmail.com', 'gmaill.com': 'gmail.com', 'hotmial.com': 'hotmail.com', 'hotmal.com': 'hotmail.com', 'yahooo.com': 'yahoo.com', 'yaho.com': 'yahoo.com', 'outlok.com': 'outlook.com' };
  const emailVal = form.email.trim();
  const emailOk = !emailVal || EMAIL_RX.test(emailVal);
  const emailDomain = (emailVal.split('@')[1] || '').toLowerCase();
  const emailSuggest = EMAIL_TYPOS[emailDomain] ? emailVal.split('@')[0] + '@' + EMAIL_TYPOS[emailDomain] : null;
  const ok = form.name.trim().length > 1 && form.phone.trim().length >= 9 && emailOk;
  const F = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const holidayFee = ctx.holidayFee || 0;
  const promoDisc = promo ? (promo.off ? Math.round((ctx.total * promo.off) / 100 / 1000) * 1000 : Math.min(promo.offAmt || 0, ctx.total)) : 0;
  const grand = Math.max(0, ctx.total + holidayFee + addonsTotal - promoDisc);
  const approx = I18N.approx(grand);

  const tryPromo = () => {
    const c = DT_CAMPAIGNS.byCode(promoIn);
    if (c && (c.off || c.offAmt)) { setPromo(c); setPromoErr(false); }
    else { setPromo(null); setPromoErr(true); }
  };
  const fmtHold = (s) => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');

  const finish = () => {
    setPhase('processing');
    if (failNext) {
      setTimeout(() => {
        setPhase('fail');
        setHoldLeft((s) => s + 300); // hold seats 5 more minutes for retry
        setFailNext(false);
      }, 900);
      return;
    }
    setTimeout(() => {
      const bk = {
        code: DT_STORE.newCode(), kind: ctx.kind, fromLabel: ctx.fromLabel, toLabel: ctx.toLabel,
        fromCode: ctx.fromCode || null, toCode: ctx.toCode || null,
        date: ctx.date, timeGo: ctx.timeGo, seats: ctx.seats || null, paxLabel: ctx.paxLabel || null,
        retLine: ctx.retLine || null,
        name: form.name, phone: form.phone, email: form.email, pickup: form.pickup || null,
        dropoff: form.dropoff || null, note: form.note, pay: pm, total: grand, promo: promo ? promo.name : null,
        addons: Object.keys(addons).filter((k) => addons[k]),
        invoice: inv.on && inv.tax ? { company: inv.company, tax: inv.tax, email: inv.email } : null,
        created: new Date().toISOString(),
      };
      DT_STORE.save(bk);
      onDone(bk);
    }, 900);
  };

  return (
    <div className="dt-book-grid">
      <div>
        {phase === 'info' && (
          <div className="dt-panel" data-screen-label="Checkout — thông tin">
            <h3>{t('passenger_info')}</h3>
            <div className="dt-form-grid">
              <div className="dt-field"><label>{t('full_name')} *</label><input value={form.name} onChange={F('name')} placeholder="Nguyễn Văn A" /></div>
              <div className="dt-field"><label>{t('phone')} *</label><input value={form.phone} onChange={F('phone')} placeholder="09xx xxx xxx" /></div>
              <div className="dt-field full"><label>{t('email')}</label><input value={form.email} onChange={F('email')} placeholder="email@example.com" style={!emailOk ? { borderColor: 'var(--bad)' } : null} />
                {!emailOk && <div style={{ fontSize: 11.5, color: 'var(--bad)', marginTop: 4 }}>{t('email_invalid')}</div>}
                {emailSuggest && (
                  <button type="button" onClick={() => setForm({ ...form, email: emailSuggest })} style={{ marginTop: 4, fontSize: 11.5, color: 'var(--navy)', background: 'var(--navy-soft)', border: '1px solid var(--line-2)', borderRadius: 7, padding: '3px 9px', cursor: 'pointer', fontFamily: 'var(--font-ui)' }}>
                    {t('email_mean')} <b>{emailSuggest}</b>?
                  </button>
                )}
              </div>
              {ctx.pickupOptions && (
                <div className="dt-field"><label>{t('pickup_point')}</label>
                  <select value={form.pickup} onChange={F('pickup')}>{ctx.pickupOptions.map((p) => <option key={p}>{p}</option>)}</select>
                </div>
              )}
              {ctx.dropoffOptions && (
                <div className="dt-field"><label>{t('dropoff_point')}</label>
                  <select value={form.dropoff} onChange={F('dropoff')}>{ctx.dropoffOptions.map((p) => <option key={p}>{p}</option>)}</select>
                </div>
              )}
              <div className="dt-field full"><label>{t('note')}</label><input value={form.note} onChange={F('note')} placeholder="—" /></div>
              <div className="dt-field full" style={{ borderTop: '1px dashed var(--line-2)', paddingTop: 14 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', textTransform: 'none', fontSize: 13, letterSpacing: 0 }}>
                  <input type="checkbox" checked={inv.on} onChange={() => setInv({ ...inv, on: !inv.on })} style={{ accentColor: 'var(--gold)', width: 16, height: 16 }} />
                  🧾 {t('inv_title')}
                </label>
              </div>
              {inv.on && (
                <React.Fragment>
                  <div className="dt-field"><label>{t('inv_company')} *</label><input value={inv.company} onChange={(e) => setInv({ ...inv, company: e.target.value })} placeholder="Công ty TNHH ABC" /></div>
                  <div className="dt-field"><label>{t('inv_tax')} *</label><input value={inv.tax} onChange={(e) => setInv({ ...inv, tax: e.target.value })} placeholder="0201xxxxxx" /></div>
                  <div className="dt-field full"><label>{t('inv_email')}</label><input value={inv.email} onChange={(e) => setInv({ ...inv, email: e.target.value })} placeholder="ketoan@congty.vn" /></div>
                </React.Fragment>
              )}
              {paxN > 0 && (
                <div className="dt-field full" style={{ borderTop: '1px dashed var(--line-2)', paddingTop: 14 }}>
                  <label>{t('addon_title')}</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 9, cursor: 'pointer', textTransform: 'none', letterSpacing: 0, fontSize: 13, border: '1.5px solid ' + (addons.ins ? 'var(--gold)' : 'var(--line-2)'), borderRadius: 9, padding: '10px 12px', background: addons.ins ? 'var(--gold-soft)' : '#fff' }}>
                      <input type="checkbox" checked={addons.ins} onChange={() => setAddons({ ...addons, ins: !addons.ins })} style={{ accentColor: 'var(--gold)', marginTop: 2 }} />
                      <span style={{ flex: 1 }}><b>🛡 {t('addon_ins')}</b> · {I18N.fmtPrice(ADDON_PRICES.ins)}{t('per_guest')}<br /><span style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{t('addon_ins_d')}</span></span>
                      <b style={{ whiteSpace: 'nowrap' }}>{addons.ins ? '+' + I18N.fmtPrice(ADDON_PRICES.ins * Math.max(1, paxN)) : ''}</b>
                    </label>
                    {ctx.kind === 'bus' && (
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {[['bike', t('addon_bike'), ADDON_PRICES.bike], ['pet', t('addon_pet'), ADDON_PRICES.pet], ['airport', t('addon_airport'), ADDON_PRICES.airport]].map(([k, lb, pr]) => (
                          <label key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, cursor: 'pointer', textTransform: 'none', letterSpacing: 0, fontSize: 12.5, border: '1.5px solid ' + (addons[k] ? 'var(--gold)' : 'var(--line-2)'), borderRadius: 18, padding: '8px 13px', background: addons[k] ? 'var(--gold-soft)' : '#fff' }}>
                            <input type="checkbox" checked={addons[k]} onChange={() => setAddons({ ...addons, [k]: !addons[k] })} style={{ accentColor: 'var(--gold)' }} />
                            {lb} · +{I18N.fmtPrice(pr)}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button className="dt-btn ghost" onClick={onBack}>{t('back')}</button>
              <button className="dt-btn" disabled={!ok} onClick={() => setPhase('pay')}>{t('continue_')} →</button>
            </div>
          </div>
        )}
        {(phase === 'pay' || phase === 'processing') && (
          <div className="dt-panel" data-screen-label="Checkout — thanh toán">
            <h3>{t('payment_method')}</h3>
            <PayPicker value={pm} onChange={setPm} />
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button className="dt-btn ghost" onClick={() => setPhase('info')} disabled={phase === 'processing'}>{t('back')}</button>
              <button className="dt-btn gold" style={{ flex: 1 }} disabled={phase === 'processing'} onClick={finish}>
                {phase === 'processing' ? '••• ' : ''}{t('pay')} {I18N.fmtPrice(grand)}
              </button>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 14, fontSize: 11, color: 'var(--ink-3)', cursor: 'pointer' }}>
              <input type="checkbox" checked={failNext} onChange={() => setFailNext(!failNext)} style={{ accentColor: 'var(--bad)' }} />
              ⚙ {I18N.lang === 'vi' ? 'Demo: mô phỏng thẻ bị từ chối (cho đội dev xem UX lỗi)' : 'Demo: simulate a declined card (failure-UX spec)'}
            </label>
          </div>
        )}
        {phase === 'fail' && (
          <div className="dt-panel" data-screen-label="Checkout — thanh toán thất bại" style={{ borderColor: 'var(--bad)' }}>
            <div style={{ textAlign: 'center', padding: '6px 0 2px' }}>
              <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'var(--bad-soft)', color: 'var(--bad)', fontSize: 26, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>✕</div>
              <h3 style={{ marginBottom: 6 }}>{t('pay_failed')}</h3>
              <p style={{ fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: 420, margin: '0 auto 16px' }}>{t('pay_failed_hint')}</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="dt-btn ghost" style={{ flex: 1 }} onClick={() => setPhase('pay')}>{t('change_method')}</button>
              <button className="dt-btn" style={{ flex: 1 }} onClick={finish}>{t('retry_pay')}</button>
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-3)', textAlign: 'center', marginTop: 12 }}>{t('pay_support')}</div>
          </div>
        )}
      </div>
      <div className="dt-sum">
        <div className="dt-panel">
          <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>{ctx.title}</span>
            {ctx.seats && (
              <span style={{ fontSize: 11, fontWeight: 700, color: holdLeft < 120 ? 'var(--bad)' : 'var(--ok)', background: holdLeft < 120 ? 'var(--bad-soft)' : 'var(--ok-soft)', borderRadius: 12, padding: '4px 10px', fontFamily: 'ui-monospace, monospace' }}>
                {t('hold_seats')} {fmtHold(holdLeft)}
              </span>
            )}
          </h3>
          {ctx.rows.map(([k, v], i) => <div key={i} className="dt-sum-row"><span>{k}</span><b>{v}</b></div>)}
          {holidayFee > 0 && <div className="dt-sum-row"><span>{t('holiday_auto')}</span><b style={{ color: 'var(--warn)' }}>+{I18N.fmtPrice(holidayFee)}</b></div>}
          {addons.ins && <div className="dt-sum-row"><span>🛡 {t('addon_ins')} × {Math.max(1, paxN)}</span><b>+{I18N.fmtPrice(ADDON_PRICES.ins * Math.max(1, paxN))}</b></div>}
          {ctx.kind === 'bus' && ['bike', 'pet', 'airport'].filter((k) => addons[k]).map((k) => (
            <div key={k} className="dt-sum-row"><span>{t('addon_' + k)}</span><b>+{I18N.fmtPrice(ADDON_PRICES[k])}</b></div>
          ))}
          {promo && <div className="dt-sum-row"><span>✓ {promo.name} · {t('promo_applied')}</span><b style={{ color: 'var(--ok)' }}>−{I18N.fmtPrice(promoDisc)}</b></div>}
          {/* promo code input */}
          <div style={{ display: 'flex', gap: 8, margin: '10px 0 2px' }}>
            <input value={promoIn} onChange={(e) => { setPromoIn(e.target.value); setPromoErr(false); }}
              placeholder={t('promo_code')} style={{ flex: 1, border: '1.5px solid var(--line-2)', borderRadius: 8, padding: '9px 11px', fontSize: 13, textTransform: 'uppercase', outline: 'none', minWidth: 0 }} />
            <button className="dt-btn ghost" style={{ padding: '8px 14px', fontSize: 12.5 }} onClick={tryPromo}>{t('apply')}</button>
          </div>
          {promoErr && <div style={{ fontSize: 11.5, color: 'var(--bad)' }}>{t('promo_invalid')}</div>}
          <div className="dt-sum-total">
            <span>{t('total')}</span>
            <span style={{ textAlign: 'right' }}>
              <span className="v">{I18N.fmtPrice(grand)}</span>
              {approx && <span style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--ink-3)' }}>{approx}</span>}
            </span>
          </div>
          <div className="dt-trust">
            <span><I.check size={14} /> {t('confirm_instant')}</span>
            <span><I.check size={14} /> {t('free_cancel')}</span>
            <span><I.check size={14} /> {t('incl_vat')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- success screen ---------- */
function SuccessTicket({ bk, nav }) {
  const t = (k) => I18N.t(k);
  return (
    <div className="dt-ticket-wrap" data-screen-label="Vé điện tử">
      <div className="dt-success">
        <div className="ck"><I.check size={28} sw={2.4} /></div>
        <h2>{t('pay_success')}</h2>
        <p>{t('e_ticket')} · {bk.email || bk.phone}</p>
      </div>
      <TicketCard bk={bk} />
      {window.NotifyTimeline && <NotifyTimeline />}
      <div className="dt-ticket-actions">
        <button className="dt-btn ghost" onClick={() => window.print()}>{t('download_ticket')}</button>
        <button className="dt-btn" onClick={() => nav('home')}>{t('new_booking')}</button>
      </div>
    </div>
  );
}

/* ---------- bus flow (one-way & round-trip) ---------- */
function BusFlow({ params, nav }) {
  const t = (k) => I18N.t(k);
  const L = (o) => I18N.L(o);
  const { STATIONS, VEHICLES, VIA, BUS, PICKUPS, soldSeats, busSeason, isHoliday, HOLIDAY_FEE } = DT_DATA;
  const q = { from: params.from || 'HN', to: params.to || 'CB', date: params.date || '2026-06-15', ret: params.ret || null, pax: params.pax || 2 };
  const isRT = !!q.ret;

  // legs: [{dir:'go'|'back', date, trip, sel:[]}]
  const [legs, setLegs] = useState(() => {
    const a = [{ dir: 'go', date: q.date, trip: null, sel: [] }];
    if (isRT) a.push({ dir: 'back', date: q.ret, trip: null, sel: [] });
    return a;
  });
  const [step, setStep] = useState(0);       // 0 trips, 1 seats, 2 checkout, 9 ticket
  const [legIdx, setLegIdx] = useState(0);   // current leg in step 0/1
  const [vehFilter, setVehFilter] = useState('all');
  const [sort, setSort] = useState('time');
  const [bk, setBk] = useState(null);

  const ends = (dir) => dir === 'go' ? [q.from, q.to] : [q.to, q.from];
  const priceOf = (s, date) => (busSeason(date) === 'high' ? s.high : s.low);

  const tripsFor = (dir) => {
    const [A, B] = ends(dir);
    let out = [];
    BUS.forEach((s) => {
      if (s.from === A && s.to === B) s.times.go.forEach((tm) => out.push({ s, tm }));
      else if (s.from === B && s.to === A) s.times.back.forEach((tm) => out.push({ s, tm }));
    });
    if (vehFilter !== 'all') out = out.filter((x) => x.s.veh === vehFilter);
    const d = legs.find((l) => l.dir === dir).date;
    out.sort((a, b) => sort === 'time' ? a.tm.localeCompare(b.tm) : priceOf(a.s, d) - priceOf(b.s, d));
    return out;
  };
  const seatKey = (leg) => leg.trip.s.id + leg.date + leg.trip.tm;
  const legLabel = (leg) => {
    const [A, B] = ends(leg.dir);
    return L(STATIONS[A]) + ' → ' + L(STATIONS[B]);
  };

  const arrTime = (tm, dur) => {
    const [h, m] = tm.split(':').map(Number);
    const tot = h * 60 + m + dur;
    return String(Math.floor(tot / 60) % 24).padStart(2, '0') + ':' + String(tot % 60).padStart(2, '0');
  };

  // totals
  const sub = legs.reduce((s, l) => s + (l.trip ? l.sel.length * priceOf(l.trip.s, l.date) : 0), 0);
  const rtDisc = isRT && legs.every((l) => l.trip && l.sel.length) ? Math.round(sub * 0.05 / 1000) * 1000 : 0;
  const holidayFee = legs.reduce((s, l) => s + (l.trip && isHoliday(l.date) ? l.sel.length * HOLIDAY_FEE : 0), 0);
  const total = sub - rtDisc;

  const stepsLabels = isRT
    ? [t('trip_go') + ' + ' + t('trip_back'), t('step_seats'), t('step_info'), t('step_pay')]
    : [t('step_trip'), t('step_seats'), t('step_info'), t('step_pay')];

  const chooseTrip = (x) => {
    const next = legs.map((l, i) => i === legIdx ? { ...l, trip: x, sel: [] } : l);
    setLegs(next);
    const missing = next.findIndex((l) => !l.trip);
    if (missing >= 0) { setLegIdx(missing); }
    else { setLegIdx(0); setStep(1); }
  };
  const toggleSeat = (li, id) => {
    setLegs(legs.map((l, i) => {
      if (i !== li) return l;
      if (l.sel.includes(id)) return { ...l, sel: l.sel.filter((x) => x !== id) };
      return l.sel.length < 6 ? { ...l, sel: [...l.sel, id] } : l;
    }));
  };

  if (step === 9 && bk) return <div className="dt-page"><SuccessTicket bk={bk} nav={nav} /></div>;

  const curLeg = legs[Math.min(legIdx, legs.length - 1)];

  return (
    <div className="dt-page" data-screen-label="Đặt vé xe">
      <div className="dt-crumb">
        Daiichi Bus · <b>{L(STATIONS[q.from])} {isRT ? '⇄' : '→'} {L(STATIONS[q.to])}</b> · {q.date}{isRT ? ' ⇄ ' + q.ret : ''}
        {isRT && <span className="via" style={{ marginLeft: 8, background: 'var(--ok-soft)', color: 'var(--ok)', borderRadius: 5, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>{t('roundtrip_off')}</span>}
      </div>
      <Steps idx={step > 2 ? 3 : step} labels={stepsLabels} />

      {step === 0 && (
        <React.Fragment>
          <div className="dt-result-head">
            <h2>
              {isRT && <span style={{ fontSize: 13, fontFamily: 'var(--font-ui)', fontWeight: 700, color: 'var(--gold)', display: 'block' }}>{curLeg.dir === 'go' ? t('trip_go') : t('rt_select_back')} · {curLeg.date}</span>}
              {legLabel(curLeg).split(' → ')[0]} <I.arrR size={19} style={{ color: 'var(--gold)' }} /> {legLabel(curLeg).split(' → ')[1]}
            </h2>
            <div className="dt-filters">
              <button className={'dt-chip' + (vehFilter === 'all' ? ' on' : '')} onClick={() => setVehFilter('all')}>{t('all')}</button>
              {[...new Set(tripsFor(curLeg.dir).map((x) => x.s.veh))].map((v) => (
                <button key={v} className={'dt-chip' + (vehFilter === v ? ' on' : '')} onClick={() => setVehFilter(v)}>{L(VEHICLES[v].name)}</button>
              ))}
              <button className={'dt-chip' + (sort === 'time' ? ' on' : '')} onClick={() => setSort('time')}>{t('trip_early')}</button>
              <button className={'dt-chip' + (sort === 'price' ? ' on' : '')} onClick={() => setSort('price')}>{t('trip_cheap')}</button>
            </div>
          </div>
          {isHoliday(curLeg.date) && <div className="dt-notice" style={{ marginBottom: 12 }}>{t('holiday_auto')}: +{I18N.fmtPrice(HOLIDAY_FEE)}{t('per_person')}</div>}
          <div className="dt-trips">
            {tripsFor(curLeg.dir).length === 0 && <div className="dt-empty">{t('no_trips')}</div>}
            {tripsFor(curLeg.dir).map((x, i) => {
              const sd = soldSeats(x.s.veh, x.s.id + curLeg.date + x.tm);
              const left = sd.seats.length - sd.sold.size;
              const pr = priceOf(x.s, curLeg.date);
              return (
                <div key={i} className="dt-trip">
                  <div className="dt-trip-time">
                    <b>{x.tm}</b>
                    <span>→ {arrTime(x.tm, x.s.dur)}</span>
                  </div>
                  <div className="dt-trip-mid">
                    <div className="nm">{L(VEHICLES[x.s.veh].name)}
                      {x.s.via && <span className="via">{L(VIA[x.s.via])}</span>}
                      {x.s.partner && <span className="via" style={{ background: 'var(--navy-soft)', color: 'var(--navy-700)' }}>✓ {I18N.lang === 'vi' ? 'Đối tác' : 'Partner'}: {x.s.operator}</span>}
                    </div>
                    <div className="meta">
                      <span style={{ color: 'var(--gold)', fontWeight: 700 }}>★ {(4.7 + (x.s.id.charCodeAt(1) % 3) / 10).toFixed(1).replace('.', I18N.lang === 'vi' ? ',' : '.')}</span>
                      <span><I.clock size={12} style={{ verticalAlign: -2 }} /> {Math.floor(x.s.dur / 60)}h{x.s.dur % 60 ? String(x.s.dur % 60).padStart(2, '0') : ''}</span>
                      <span><I.pin size={12} style={{ verticalAlign: -2 }} /> {t('free_pickup')}</span>
                      <span>{x.s.partner ? (I18N.lang === 'vi' ? 'Vé & hoàn huỷ qua Daiichi' : 'Ticket & refunds via Daiichi') : 'WiFi · ' + (x.s.veh === 'limo7' ? 'EV' : 'USB')}</span>
                    </div>
                  </div>
                  <div className="dt-trip-right">
                    <div><span className="pr">{I18N.fmtPrice(pr)}</span><span className="pr-unit">{t('per_person')}</span>
                      {I18N.approx(pr) && <span className="pr-unit" style={{ display: 'block' }}>{I18N.approx(pr)}</span>}</div>
                    <div className="seats">{left} {t('seats_left')}</div>
                    <button className="dt-btn" onClick={() => chooseTrip(x)}>{t('select_seats')}</button>
                  </div>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      )}

      {step === 1 && (
        <div className="dt-book-grid">
          <div className="dt-panel" data-screen-label="Chọn ghế">
            {isRT && (
              <div className="dt-filters" style={{ marginBottom: 14 }}>
                {legs.map((l, i) => (
                  <button key={i} className={'dt-chip' + (legIdx === i ? ' on' : '')} onClick={() => setLegIdx(i)}>
                    {(l.dir === 'go' ? t('trip_go') : t('trip_back'))} · {l.trip.tm} {l.sel.length ? '· ' + l.sel.length + '✓' : ''}
                  </button>
                ))}
              </div>
            )}
            <h3>{t('select_seats')} — {L(VEHICLES[curLeg.trip.s.veh].name)} · {curLeg.trip.tm} · {curLeg.date}</h3>
            <div style={{ overflowX: 'auto' }}>
              <div className="dt-seatmap">
                <div className="dt-driver">🛞 driver</div>
                {(() => {
                  const sd = soldSeats(curLeg.trip.s.veh, seatKey(curLeg));
                  const rows = {};
                  sd.seats.forEach((s) => { (rows[s.row] = rows[s.row] || []).push(s); });
                  const pattern = { bus45: ['A','B','','C','D'], limo34: ['A','B','','C'], limo11: ['A','','B'], limo10: ['A','','B'], limo7: ['A','','B'] }[curLeg.trip.s.veh];
                  return Object.keys(rows).map((r) => {
                    const isLast = +r === Math.max(...Object.keys(rows).map(Number));
                    const cols = isLast ? rows[r].map((s) => s.col) : pattern;
                    return (
                      <div key={r} className="dt-seat-row">
                        {cols.map((c, ci) => {
                          if (!c) return <button key={ci} className="dt-seat aisle"></button>;
                          const st = rows[r].find((s) => s.col === c);
                          if (!st) return <button key={ci} className="dt-seat aisle"></button>;
                          const sold = sd.sold.has(st.id);
                          const isSel = curLeg.sel.includes(st.id);
                          return (
                            <button key={ci} className={'dt-seat' + (sold ? ' sold' : '') + (isSel ? ' sel' : '')}
                              disabled={sold} onClick={() => toggleSeat(legIdx, st.id)}>{st.id}</button>
                          );
                        })}
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
            <div className="dt-legend">
              <span><span className="sw"></span>{t('seat_avail')}</span>
              <span><span className="sw sold"></span>{t('seat_sold')}</span>
              <span><span className="sw sel"></span>{t('seat_yours')}</span>
            </div>
            {curLeg.sel.length >= 4 && (
              <button onClick={() => nav('charter')} style={{ display: 'block', width: '100%', marginTop: 12, background: 'var(--gold-soft)', border: '1.5px dashed var(--gold)', borderRadius: 10, padding: '11px 14px', fontSize: 12.5, fontWeight: 700, color: '#7A5A1E', cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-ui)' }} data-comment-anchor="group-charter-hint">
                👥 {t('group_hint')}
              </button>
            )}
          </div>
          <div className="dt-sum">
            <div className="dt-panel">
              <h3>{L(STATIONS[q.from])} {isRT ? '⇄' : '→'} {L(STATIONS[q.to])}</h3>
              {legs.map((l, i) => (
                <div className="dt-sum-row" key={i}>
                  <span>{isRT ? (l.dir === 'go' ? t('trip_go') : t('trip_back')) : t('boarding')}</span>
                  <b>{l.trip.tm} · {l.date}{l.sel.length ? ' · ' + l.sel.join(', ') : ''}</b>
                </div>
              ))}
              {rtDisc > 0 && <div className="dt-sum-row"><span>{t('roundtrip_off')}</span><b style={{ color: 'var(--ok)' }}>−{I18N.fmtPrice(rtDisc)}</b></div>}
              {holidayFee > 0 && <div className="dt-sum-row"><span>{t('holiday_auto')}</span><b style={{ color: 'var(--warn)' }}>+{I18N.fmtPrice(holidayFee)}</b></div>}
              <div className="dt-sum-total"><span>{t('total')}</span><span className="v">{I18N.fmtPrice(total + holidayFee)}</span></div>
              <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
                <button className="dt-btn ghost" onClick={() => { setStep(0); setLegIdx(0); setLegs(legs.map((l) => ({ ...l, trip: null, sel: [] }))); }}>{t('back')}</button>
                <button className="dt-btn ghost" disabled={!legs.every((l) => l.sel.length > 0)} onClick={() => {
                  legs.forEach((l) => {
                    const hf = isHoliday(l.date) ? l.sel.length * HOLIDAY_FEE : 0;
                    DT_CART.add({ kind: 'bus', label: legLabel(l) + ' · ' + l.trip.tm, short: legLabel(l) + ' ' + l.trip.tm, date: l.date, total: l.sel.length * priceOf(l.trip.s, l.date), detail: l.sel.join(', '), holiday: hf, holdUntil: Date.now() + 600000, seats: l.sel });
                  });
                  nav('cart');
                }}>+ {t('add_cart')}</button>
                <button className="dt-btn" style={{ flex: 1 }} disabled={!legs.every((l) => l.sel.length > 0)} onClick={() => setStep(2)}>{t('continue_')} →</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <CheckoutFlow
          ctx={{
            kind: 'bus',
            title: L(STATIONS[q.from]) + (isRT ? ' ⇄ ' : ' → ') + L(STATIONS[q.to]),
            fromLabel: L(STATIONS[q.from]), toLabel: L(STATIONS[q.to]),
            fromCode: q.from, toCode: q.to,
            date: q.date, timeGo: legs[0].trip.tm, seats: legs[0].sel,
            retLine: isRT ? legs[1].trip.tm + ' · ' + q.ret + ' · ' + legs[1].sel.join(', ') : null,
            pickupOptions: PICKUPS[q.from].map((p) => L(p)),
            dropoffOptions: PICKUPS[q.to].map((p) => L(p)),
            holidayFee,
            paxCount: legs[0].sel.length,
            rows: [
              ...legs.map((l) => [
                (isRT ? (l.dir === 'go' ? t('trip_go') : t('trip_back')) + ' · ' : '') + l.trip.tm + ' · ' + l.date,
                l.sel.join(', ') + ' · ' + I18N.fmtPrice(l.sel.length * priceOf(l.trip.s, l.date)),
              ]),
              ...(rtDisc > 0 ? [[t('roundtrip_off'), '−' + I18N.fmtPrice(rtDisc)]] : []),
            ],
            total,
          }}
          onBack={() => setStep(1)}
          onDone={(b) => { setBk(b); setStep(9); }}
        />
      )}
    </div>
  );
}

Object.assign(window, { CheckoutFlow, SuccessTicket, BusFlow });
