/* DAIICHI — overnight cruise page (Daiichi Luxury Cruise 5★ + Boutique) */
const { useState, useEffect } = React;

function LuxuryPage({ params, nav }) {
  const t = (k) => I18N.t(k);
  const L = (o) => I18N.L(o);
  const { SUITES, IMG } = DT_DATA;
  const [nights, setNights] = useState('n1'); // n1 = 2D1N, n2 = 3D2N
  const [date, setDate] = useState('2026-06-20');
  const [suiteId, setSuiteId] = useState(null);
  const [rooms, setRooms] = useState(1);
  const [phase, setPhase] = useState('detail');
  const [bk, setBk] = useState(null);
  const suite = SUITES.find((s) => s.id === suiteId);
  const luxCamp = DT_CAMPAIGNS.forProduct('luxury');
  const suitePrice = (s) => DT_CAMPAIGNS.apply(nights === 'n1' ? s.n1 : s.n2, luxCamp);

  const AMEN = [
    { vi: 'Nhà hàng fine-dining', en: 'Fine-dining restaurant', ja: 'ファインダイニング', ko: '파인다이닝 레스토랑', zh: '高级餐厅', fr: 'Restaurant gastronomique' },
    { vi: 'Spa & massage', en: 'Spa & massage', ja: 'スパ＆マッサージ', ko: '스파 & 마사지', zh: '水疗按摩', fr: 'Spa & massage' },
    { vi: 'Jacuzzi & cầu kính', en: 'Jacuzzi & glass skywalk', ja: 'ジャグジー＆ガラス橋', ko: '자쿠지 & 유리 다리', zh: '按摩浴缸与玻璃桥', fr: 'Jacuzzi & passerelle de verre' },
    { vi: 'Sundeck bar & golf mini', en: 'Sundeck bar & mini golf', ja: 'サンデッキバー＆ミニゴルフ', ko: '선덱 바 & 미니 골프', zh: '甲板酒吧与迷你高尔夫', fr: 'Bar sur pont & mini-golf' },
    { vi: 'Kayak & tender riêng', en: 'Kayaks & private tender', ja: 'カヤック＆専用テンダー', ko: '카약 & 전용 텔더', zh: '皮划艇与专属接驳艇', fr: 'Kayaks & annexe privée' },
    { vi: 'Trà chiều mỗi ngày', en: 'Daily afternoon tea', ja: '毎日のアフタヌーンティー', ko: '매일 애프터눠 티', zh: '每日下午茶', fr: 'Thé de l’après-midi quotidien' },
  ];
  const LUX_INTRO = {
    vi: '32 suite với ban công riêng nhìn thẳng ra vịnh, nhà hàng kính, spa và jacuzzi trên sundeck. Hành trình 2 ngày 1 đêm hoặc 3 ngày 2 đêm: kayak, hang Sáng – hang Tối, làng chài Việt Hải, lớp học nấu ăn và trà chiều mỗi ngày.',
    en: '32 balcony suites facing the bay, a glass-walled restaurant, spa, and a sundeck jacuzzi. Two- or three-day itineraries: kayaking, the Light & Dark caves, Viet Hai village, cooking class and daily afternoon tea.',
    ja: '全室バルコニー付き32スイート、ガラス張りレストラン、スパ、サンデッキジャグジー。1泊2日または2泊3日：カヤック、光と闇の洞窟、ベトハイ村、料理教室、アフタヌーンティー。',
    ko: '전 객실 발코니를 갖춘 32개 스위트, 글라스 레스토랑, 스파, 선덱 자쿠지. 1박2일 또는 2박3일 일정: 카약, 빛과 어둠 동굴, 비엣하이 마을, 쿠킹 클래스, 애프터눠 티.',
    zh: '32间全阳台套房、玻璃餐厅、水疗及甲板按摩浴缸。两天一夜或三天两夜行程：皮划艇、明暗洞、越海渔村、烹饪课与每日下午茶。',
    fr: '32 suites avec balcon face à la baie, restaurant vitré, spa et jacuzzi sur le pont. Itinéraires de 2 ou 3 jours : kayak, grottes Claire et Sombre, village Viet Hai, cours de cuisine et thé quotidien.',
  };

  if (phase === 'ticket' && bk) return <div className="dt-page"><SuccessTicket bk={bk} nav={nav} /></div>;

  if (phase === 'checkout' && suite) {
    const price = suitePrice(suite);
    const holidayFee = DT_DATA.isHoliday(date) ? rooms * 2 * DT_DATA.HOLIDAY_FEE : 0;
    return (
      <div className="dt-page">
        <CheckoutFlow
          ctx={{
            kind: 'luxury',
            title: 'Daiichi Luxury Cruise — ' + suite.name,
            fromLabel: 'Cát Bà Marina', toLabel: 'Lan Ha Bay',
            date, timeGo: '12:00',
            paxLabel: rooms + ' × ' + suite.name + ' · ' + t(nights === 'n1' ? 'night1' : 'night2'),
            paxCount: rooms * 2,
            pickupOptions: DT_DATA.PICKUPS.CB.map((p) => L(p)),
            rows: [
              [t('s_nights'), t(nights === 'n1' ? 'night1' : 'night2')],
              [t('departs'), '12:00 · ' + I18N.fmtDate(date)],
              [suite.name + ' × ' + rooms, I18N.fmtPrice(rooms * price)],
            ],
            total: rooms * price,
            holidayFee,
          }}
          onBack={() => setPhase('detail')}
          onDone={(b) => { setBk(b); setPhase('ticket'); }}
        />
      </div>
    );
  }

  return (
    <div className="dt-page" data-screen-label="Du thuyền ngủ đêm" style={{ maxWidth: 1120 }}>
      <div className="dt-sticky-cta" data-comment-anchor="sticky-cta-lux">
        <div className="pr-wrap">
          <div className="pr-lbl">{suite ? suite.name : t('from_price') + ' · ' + t('per_cabin')}</div>
          <div className="pr">{I18N.fmtPrice((suite || SUITES[0])[nights])}</div>
        </div>
        <button className="dt-btn" onClick={() => {
          if (suite) { setPhase('checkout'); window.scrollTo(0, 0); }
          else {
            const el = document.querySelector('.dt-suite-list');
            if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
          }
        }}>{suite ? t('book_now') : t('select_cabin')}</button>
      </div>
      <div className="dt-detail-hero" style={{ maxHeight: 420 }}>
        <img src={IMG + 'luxury-1.jpg'} alt="Daiichi Luxury Cruise" loading="lazy" />
        <div className="side">
          <img src={IMG + 'luxury-restaurant.jpg'} alt="Restaurant" loading="lazy" />
          <img src={IMG + 'luxury-jacuzzi.jpg'} alt="Jacuzzi" loading="lazy" />
        </div>
      </div>

      <div className="dt-detail-grid">
        <div>
          <div className="dt-kicker">DAIICHI LUXURY CRUISE ★★★★★ · LAN HA BAY</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--navy)', marginBottom: 10 }}>
            {I18N.lang === 'vi' ? 'Du thuyền ngủ đêm 5 sao' : '5-star overnight cruise'}
          </h2>
          <p style={{ color: 'var(--ink-2)', fontSize: 14.5, lineHeight: 1.65 }}>
            {L(LUX_INTRO)}
          </p>

          <div className="dt-panel" style={{ margin: '20px 0 16px' }}>
            <h3>{t('amenities')}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 18px' }}>
              {AMEN.map((a, i) => (
                <span key={i} style={{ display: 'flex', gap: 9, alignItems: 'center', fontSize: 13.5, color: 'var(--ink-2)' }}>
                  <I.check size={15} style={{ color: 'var(--gold)' }} /> {L(a)}
                </span>
              ))}
            </div>
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--navy)', margin: '26px 0 14px' }}>{t('cabins')}</h3>
          {luxCamp && (
            <div className="dt-notice" style={{ marginBottom: 12, background: 'var(--gold-soft)' }}>
              ✨ <b>{luxCamp.name} −{luxCamp.off}%</b> · {I18N.L(luxCamp.desc)}{luxCamp.ends ? <span> · {I18N.lang === 'vi' ? 'còn' : 'ends in'} <Countdown ends={luxCamp.ends} /></span> : null}
            </div>
          )}
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <button className={'dt-chip' + (nights === 'n1' ? ' on' : '')} onClick={() => setNights('n1')}>{t('night1')}</button>
            <button className={'dt-chip' + (nights === 'n2' ? ' on' : '')} onClick={() => setNights('n2')}>{t('night2')}</button>
          </div>
          <div className="dt-suite-list">
            {SUITES.map((s) => (
              <div key={s.id} className="dt-suite" style={suiteId === s.id ? { borderColor: 'var(--gold)', boxShadow: 'var(--shadow-1)' } : null}>
                <img src={s.img} alt={s.name} />
                <div className="info">
                  <h4>{s.name}</h4>
                  <div className="mt">
                    <span><I.pin size={12} style={{ verticalAlign: -2 }} /> {I18N.lang === 'vi' ? 'Tầng' : 'Floor'} {s.floor}</span>
                    <span><I.user size={12} style={{ verticalAlign: -2 }} /> {s.cap} {I18N.lang === 'vi' ? 'khách' : 'guests'}</span>
                    <span><I.bed size={12} style={{ verticalAlign: -2 }} /> {s.bath === 'bathtub' ? (I18N.lang === 'vi' ? 'Bồn tắm nằm' : 'Bathtub') : (I18N.lang === 'vi' ? 'Vòi sen đứng' : 'Rain shower')}</span>
                  </div>
                </div>
                <div className="buy">
                  <span className="un">{t(nights === 'n1' ? 'night1' : 'night2')} · {t('per_cabin')}</span>
                  {luxCamp && <s style={{ display: 'block', fontSize: 12, color: 'var(--ink-3)' }}>{I18N.fmtPrice(nights === 'n1' ? s.n1 : s.n2)}</s>}
                  <div className="pr">{I18N.fmtPrice(suitePrice(s))}</div>
                  <button className={'dt-btn' + (suiteId === s.id ? ' gold' : '')} style={{ marginTop: 8 }} onClick={() => setSuiteId(s.id)}>
                    {suiteId === s.id ? '✓ ' + t('seat_yours') : t('select_cabin')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="dt-notice" style={{ marginTop: 16 }}>
            {I18N.lang === 'vi'
              ? 'Giá phòng chưa bao gồm VAT và phụ thu Tết Nguyên Đán, Tết Dương lịch, Noel. Phụ thu phòng đơn áp dụng riêng.'
              : 'Suite rates exclude VAT and Lunar New Year / New Year / Christmas surcharges. Single-occupancy supplement applies.'}
          </div>
          <ReviewBlock group="luxury" score={4.8} count={426} />

          <div className="dt-panel" style={{ marginTop: 26, display: 'grid', gridTemplateColumns: '120px 1fr', gap: 18, alignItems: 'center' }}>
            <img src={IMG + 'boutique-1.jpg'} alt="Daiichi Boutique Cruise" style={{ borderRadius: 10, height: 84, width: '100%', objectFit: 'cover' }} />
            <div>
              <b style={{ color: 'var(--navy)', fontSize: 14.5 }}>Daiichi Boutique Cruise</b>
              <p style={{ fontSize: 12.5, color: 'var(--ink-2)', margin: '4px 0 0' }}>
                {I18N.lang === 'vi' ? 'Du thuyền boutique ấm cúng hơn cho nhóm nhỏ — liên hệ 096 100 4709 để nhận lịch & giá.' : 'Our cosier boutique ship for small groups — call +84 96 100 4709 for schedules & rates.'}
              </p>
            </div>
          </div>
        </div>

        <div className="dt-sum">
          <div className="dt-panel">
            <h3>{t('book_now')}</h3>
            <div className="dt-field" style={{ marginBottom: 12 }}>
              <label>{t('s_date_cruise')}</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="dt-sum-row"><span>{t('s_nights')}</span><b>{t(nights === 'n1' ? 'night1' : 'night2')}</b></div>
            <div className="dt-sum-row"><span>{t('cabins')}</span><b>{suite ? suite.name : '—'}</b></div>
            <div className="dt-sum-row"><span>{I18N.lang === 'vi' ? 'Số phòng' : 'Rooms'}</span><Stepper v={rooms} set={setRooms} min={1} max={6} /></div>
            <div className="dt-sum-total">
              <span>{t('total')}</span>
              <span className="v">{suite ? I18N.fmtPrice(rooms * suitePrice(suite)) : '—'}</span>
            </div>
            <button className="dt-btn" style={{ width: '100%', marginTop: 14, padding: '13px 0' }} disabled={!suite} onClick={() => setPhase('checkout')}>
              {suite ? t('book_now') : t('select_cabin')}
            </button>
            <button className="dt-btn ghost" style={{ width: '100%', marginTop: 8 }} disabled={!suite} onClick={() => {
              DT_CART.add({ kind: 'luxury', label: 'Daiichi Luxury Cruise · ' + suite.name, short: suite.name + ' · ' + t(nights === 'n1' ? 'night1' : 'night2'), date, total: rooms * suitePrice(suite), detail: rooms + ' ×', holiday: DT_DATA.isHoliday(date) ? rooms * 2 * DT_DATA.HOLIDAY_FEE : 0 });
              nav('cart');
            }}>+ {t('add_cart')}</button>
            <div className="dt-trust" style={{ marginTop: 12 }}>
              <span><I.check size={14} /> {t('confirm_instant')}</span>
              <span><I.check size={14} /> {t('weather_policy')}</span>
              <span><I.check size={14} /> {I18N.lang === 'vi' ? 'Đón miễn phí trung tâm Cát Bà' : 'Free central Cat Ba pickup'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LuxuryPage });
