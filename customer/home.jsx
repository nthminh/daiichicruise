/* DAIICHI — Home page */
const { useState, useEffect } = React;
const HomeSearch = ({ nav, tab0 }) => {
  const t = (k) => I18N.t(k);
  const { STATIONS } = DT_DATA;
  const [tab, setTab] = useState(tab0 || 'bus');
  const [from, setFrom] = useState('HN');
  const [to, setTo] = useState('CB');
  const [date, setDate] = useState('2026-06-15');
  const [ret, setRet] = useState('');
  const [pax, setPax] = useState(2);
  const L = (o) => I18N.L(o);

  const go = () => {
    if (tab === 'bus') nav('bus', { from, to, date, ret: ret || null, pax });
    else if (tab === 'day') nav('day', { date, pax });
    else if (tab === 'night') nav('night', { date });
    else nav('tour', { date, pax });
  };
  const tabs = [
    ['bus', t('tab_bus'), I.bus], ['day', t('tab_day'), I.ship],
    ['night', t('tab_night'), I.moon], ['tour', t('tab_tour'), I.map],
  ];
  return (
    <div className="dt-search" data-comment-anchor="home-search">
      <div className="dt-tabs">
        {tabs.map(([id, lb, Icon]) => (
          <button key={id} className={tab === id ? 'on' : ''} onClick={() => setTab(id)}>
            <Icon size={17} />{lb}
          </button>
        ))}
      </div>
      <div className="dt-search-body">
        {tab === 'bus' && (
          <React.Fragment>
            <div className="dt-field">
              <label>{t('s_from')}</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)}>
                {Object.keys(STATIONS).map((k) => <option key={k} value={k}>{L(STATIONS[k])}</option>)}
              </select>
            </div>
            <button className="dt-swap" onClick={() => { setFrom(to); setTo(from); }} title="swap"><I.swap size={16} /></button>
            <div className="dt-field">
              <label>{t('s_to')}</label>
              <select value={to} onChange={(e) => setTo(e.target.value)}>
                {Object.keys(STATIONS).map((k) => <option key={k} value={k}>{L(STATIONS[k])}</option>)}
              </select>
            </div>
          </React.Fragment>
        )}
        {tab !== 'bus' && (
          <div className="dt-field">
            <label>{t('s_from')}</label>
            <select disabled value="lanha"><option value="lanha">Vịnh Lan Hạ · Cát Bà</option></select>
          </div>
        )}
        <div className="dt-field">
          <label>{tab === 'bus' ? t('s_date') : t('s_date_cruise')}</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        {tab === 'bus' && (
          <div className="dt-field">
            <label>{t('s_return')}</label>
            <input type="date" value={ret} min={date} onChange={(e) => setRet(e.target.value)} />
          </div>
        )}
        <div className="dt-field" style={{ maxWidth: 130 }}>
          <label>{t('s_pax')}</label>
          <select value={pax} onChange={(e) => setPax(+e.target.value)}>
            {[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <button className="dt-search-btn" onClick={go}><I.search size={17} />{t('s_search')}</button>
      </div>
    </div>
  );
};

const POPULAR = [
  { from: 'HN', to: 'CB', price: 270000 },
  { from: 'HN', to: 'HP', price: 140000 },
  { from: 'CB', to: 'NB', price: 250000 },
  { from: 'HL', to: 'NB', price: 250000 },
  { from: 'CB', to: 'HP', price: 200000 },
  { from: 'HN', to: 'CB', price: 390000, cable: true },
];

function HomePage({ nav }) {
  const t = (k) => I18N.t(k);
  const L = (o) => I18N.L(o);
  const { STATIONS, DAY_TOURS, VEHICLES, IMG } = DT_DATA;
  const fleet = ['bus45', 'limo10', 'limo7', 'limo34'];
  const heroT = window.DT_CMS ? DT_CMS.heroTitle('customer') : null;
  const heroImg = window.DT_CMS ? DT_CMS.heroImg('customer') : 'luxury-1.jpg';
  const news = window.DT_CMS ? DT_CMS.newsActive() : [];

  return (
    <div>
      <div className="dt-hero" data-screen-label="Trang chủ">
        <div className="dt-hero-bg" style={{ backgroundImage: `url(${IMG}${heroImg})` }}></div>
        <h1>{heroT ? I18N.L(heroT) : t('hero_title')}</h1>
        <div className="dt-hero-rule"></div>
        <p>{t('hero_sub')}</p>
      </div>
      <div className="dt-search-wrap"><HomeSearch nav={nav} /></div>

      <section className="dt-section">
        <div className="dt-sec-head">
          <div><div className="dt-kicker">DAIICHI BUS</div><h2>{t('popular_routes')}</h2></div>
          <span className="sub">{t('incl_vat')} · {t('free_pickup')}</span>
        </div>
        <div className="dt-routes">
          {POPULAR.map((r, i) => (
            <button key={i} className="dt-route-chip" onClick={() => nav('bus', { from: r.from, to: r.to, date: '2026-06-15', pax: 2 })}>
              <span className="rt">{L(STATIONS[r.from])} <I.arrR size={14} style={{ color: 'var(--gold)' }} /> {L(STATIONS[r.to])}{r.cable ? ' 🚡' : ''}</span>
              <span className="pr"><span>{t('from_price')}</span><b>{I18N.fmtPrice(r.price)}</b></span>
            </button>
          ))}
        </div>
      </section>

      <section className="dt-section">
        <div className="dt-sec-head">
          <div><div className="dt-kicker">LAN HA BAY</div><h2>{t('nav_day')}</h2></div>
          <span className="sub">{t('incl_vat')}</span>
        </div>
        <div className="dt-cards">
          {DAY_TOURS.filter((x) => !x.hidden).slice(0, 4).map((tr) => (
            <div key={tr.id} className="dt-card" onClick={() => nav('day', { tour: tr.id })}>
              <div className="dt-card-img" style={{ backgroundImage: `url(${tr.img})` }}>
                <span className="dt-card-badge">{tr.code}</span>
              </div>
              <div className="dt-card-body">
                <h3>{L(tr.name)}</h3>
                <div className="dt-card-meta"><I.clock size={13} /> {tr.time} · {L(tr.boat)}</div>
                <div className="dt-card-price">
                  <span className="lbl">{t('from_price')}</span>
                  <b>{I18N.fmtPrice(tr.low || tr.peak)}</b>
                  <span className="unit">{t('per_person')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="dt-lux">
        <div className="dt-lux-in">
          <div>
            <div className="dt-kicker">DAIICHI LUXURY CRUISE ★★★★★</div>
            <h2>{I18N.lang === 'vi' ? <span>Ngủ đêm giữa vịnh, <span className="gold">chuẩn 5 sao</span></span> : <span>A night on the bay, <span className="gold">five-star standard</span></span>}</h2>
            <p style={{ marginTop: 14 }}>
              {I18N.lang === 'vi'
                ? 'Du thuyền ngủ đêm 32 suite với ban công riêng, nhà hàng fine-dining, spa, jacuzzi và cầu kính ngắm vịnh. Hành trình 2N1Đ hoặc 3N2Đ trên vịnh Lan Hạ.'
                : 'A 32-suite overnight cruise with private balconies, fine dining, spa, jacuzzi and a glass skywalk. 2-day or 3-day itineraries across Lan Ha Bay.'}
            </p>
            <div className="dt-lux-stats">
              <div className="st"><b>32</b><span>Suites</span></div>
              <div className="st"><b>5★</b><span>Service</span></div>
              <div className="st"><b>2N1Đ · 3N2Đ</b><span>{t('s_nights')}</span></div>
            </div>
            <button className="dt-lux-cta" onClick={() => nav('night')}>{t('view_detail')} <I.arrR size={16} /></button>
          </div>
          <div className="dt-lux-imgs">
            <img src={DT_DATA.IMG + 'luxury-1.jpg'} alt="Daiichi Luxury Cruise" />
            <img src={DT_DATA.IMG + 'suite-royal.jpg'} alt="Royal Suite" />
            <img src={DT_DATA.IMG + 'luxury-jacuzzi.jpg'} alt="Jacuzzi" />
          </div>
        </div>
      </div>

      <section className="dt-section">
        <div className="dt-sec-head">
          <div><div className="dt-kicker">FLEET</div><h2>{t('our_fleet')}</h2></div>
        </div>
        <div className="dt-fleet">
          {fleet.map((v) => (
            <div key={v} className="dt-fleet-card">
              <img src={VEHICLES[v].img} alt={I18N.L(VEHICLES[v].name)} />
              <div className="nm">{I18N.L(VEHICLES[v].name)}</div>
            </div>
          ))}
          <div className="dt-fleet-card">
            <img src={DT_DATA.IMG + 'speedboat.jpg'} alt="Speedboat" />
            <div className="nm">{I18N.lang === 'vi' ? 'Tàu cao tốc sang đảo' : 'Island speedboat'}</div>
          </div>
        </div>
      </section>

      <section className="dt-section" style={{ paddingBottom: 8 }}>
        <div className="dt-sec-head"><div><div className="dt-kicker">DAIICHI</div><h2>{t('why_us')}</h2></div></div>
        <div className="dt-why">
          {[
            [I.shield, t('official_site'), t('incl_vat')],
            [I.check, t('confirm_instant'), t('free_cancel')],
            [I.pin, t('free_pickup'), 'Hà Nội · Cát Bà · Hải Phòng · Ninh Bình · Hạ Long'],
            [I.phone, t('support_247'), 'Zalo · WhatsApp · Hotline'],
          ].map(([Icon, b, s], i) => (
            <div key={i} className="dt-why-it">
              <div className="ic"><Icon size={20} /></div>
              <b>{b}</b><span>{s}</span>
            </div>
          ))}
        </div>
      </section>

      {news.length > 0 && (
        <section className="dt-section" style={{ paddingBottom: 8 }} data-screen-label="Tin tức">
          <div className="dt-sec-head"><div><div className="dt-kicker">NEWS</div><h2>{I18N.lang === 'vi' ? 'Tin tức & thông báo' : 'News & announcements'}</h2></div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {news.map((nw) => (
              <div key={nw.id} className="dt-panel" style={{ display: 'flex', gap: 16, alignItems: 'baseline', flexWrap: 'wrap', padding: '14px 18px' }}>
                <b style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: 'var(--gold)', flex: 'none' }}>{nw.date}</b>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <b style={{ fontSize: 14, color: 'var(--navy)' }}>{I18N.L(nw.title)}</b>
                  {I18N.L(nw.body) && <div style={{ fontSize: 12.5, color: 'var(--ink-2)', marginTop: 3 }}>{I18N.L(nw.body)}</div>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

Object.assign(window, { HomePage, HomeSearch });
