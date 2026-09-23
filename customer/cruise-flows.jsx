/* DAIICHI — day cruise, luxury cruise, combo tours, booking lookup */
const { useState, useEffect } = React;

const ITIN = {
  vip1: [
    ['09:00', { vi: 'Đón tại cảng Cát Bà, lên tàu, khởi hành ra vịnh Lan Hạ', en: 'Board at Cat Ba harbour, set sail into Lan Ha Bay' }],
    ['10:00', { vi: 'Chèo kayak khu vực hang Sáng – hang Tối', en: 'Kayaking around Light & Dark caves' }],
    ['11:30', { vi: 'Ăn trưa hải sản trên tàu', en: 'Seafood lunch on board' }],
    ['13:00', { vi: 'Đạp xe xuyên làng chài Việt Hải', en: 'Cycle through Viet Hai fishing village' }],
    ['14:30', { vi: 'Tắm biển / nghỉ ngơi trên sundeck', en: 'Swimming or sundeck time' }],
    ['15:30', { vi: 'Về lại cảng Cát Bà', en: 'Return to Cat Ba harbour' }],
  ],
  sunset: [
    ['15:30', { vi: 'Lên tàu tại cảng Cát Bà', en: 'Board at Cat Ba harbour' }],
    ['16:15', { vi: 'Len lỏi qua các đảo đá vịnh Lan Hạ', en: 'Sail among Lan Ha\u2019s limestone islets' }],
    ['17:15', { vi: 'Đón hoàng hôn — đồ uống nhẹ phục vụ trên boong', en: 'Sunset with light refreshments on deck' }],
    ['18:30', { vi: 'Về cảng', en: 'Return to harbour' }],
  ],
  morning: [
    ['06:00', { vi: 'Khởi hành sớm — vịnh lúc tĩnh lặng nhất', en: 'Early departure — the bay at its calmest' }],
    ['06:45', { vi: 'Ăn sáng trên tàu giữa vịnh', en: 'Breakfast on board' }],
    ['08:00', { vi: 'Ngắm làng chài thức giấc, chụp ảnh bình minh', en: 'Watch the floating village wake up' }],
    ['09:00', { vi: 'Về cảng', en: 'Return to harbour' }],
  ],
  vip3: [
    ['06:00', { vi: 'Lên tàu 99 chỗ, đón bình minh trên vịnh', en: 'Board the 99-pax vessel for sunrise' }],
    ['07:00', { vi: 'Ăn sáng trên tàu', en: 'Breakfast on board' }],
    ['09:00', { vi: 'Kayak hoặc tắm biển bãi vắng', en: 'Kayaking or swimming at a quiet beach' }],
    ['10:30', { vi: 'Ăn trưa hải sản sớm', en: 'Early seafood lunch' }],
    ['11:30', { vi: 'Về cảng', en: 'Return to harbour' }],
  ],
  vip4: [
    ['11:45', { vi: 'Lên du thuyền 5★, nhận ghế sundeck', en: 'Board the 5★ ship, sundeck seating' }],
    ['12:30', { vi: 'Ăn trưa fine-dining trong nhà hàng kính', en: 'Fine-dining lunch in the glass restaurant' }],
    ['14:00', { vi: 'Kayak / tắm biển tại vụng kín', en: 'Kayaking / swimming in a sheltered cove' }],
    ['15:30', { vi: 'Trà chiều trên boong, qua làng chài Việt Hải', en: 'Afternoon tea past Viet Hai village' }],
    ['17:00', { vi: 'Về cảng', en: 'Return to harbour' }],
  ],
  vip5: [
    ['16:30', { vi: 'Lên du thuyền, khởi hành đón hoàng hôn', en: 'Board and sail for sunset' }],
    ['18:00', { vi: 'Ăn tối set menu hải sản', en: 'Seafood set-menu dinner' }],
    ['20:00', { vi: 'DJ set trên sundeck', en: 'DJ set on the sundeck' }],
    ['21:30', { vi: 'Pháo hoa trên vịnh', en: 'Fireworks over the bay' }],
    ['23:00', { vi: 'Về cảng', en: 'Return to harbour' }],
  ],
  combo1: [
    ['08:00', { vi: 'Xe đón tại phố cổ Hà Nội', en: 'Pickup in Hanoi Old Quarter' }],
    ['11:30', { vi: 'Tới Cát Bà, lên tàu tour VIP 1', en: 'Arrive Cat Ba, board VIP 1 tour' }],
    ['12:00', { vi: 'Ăn trưa + kayak + Việt Hải', en: 'Lunch, kayaking, Viet Hai village' }],
    ['16:00', { vi: 'Xe đón về Hà Nội', en: 'Bus back to Hanoi' }],
    ['20:00', { vi: 'Về tới phố cổ', en: 'Arrive Old Quarter' }],
  ],
  combo4: [
    ['08:00', { vi: 'Xe đón tại phố cổ Hà Nội', en: 'Pickup in Hanoi Old Quarter' }],
    ['11:45', { vi: 'Lên du thuyền 5★ — tour VIP 4', en: 'Board the 5★ ship — VIP 4 tour' }],
    ['12:30', { vi: 'Ăn trưa fine-dining + kayak', en: 'Fine-dining lunch, kayaking' }],
    ['17:00', { vi: 'Xe đón về Hà Nội', en: 'Bus back to Hanoi' }],
    ['20:00', { vi: 'Về tới phố cổ', en: 'Arrive Old Quarter' }],
  ],
  psup: [
    ['16:00', { vi: 'Tập trung bến Bèo — hướng dẫn kỹ thuật SUP', en: 'Meet at Beo pier — SUP briefing' }],
    ['16:30', { vi: 'Chèo SUP qua làng chài, vụng kín', en: 'Paddle past the floating village' }],
    ['17:30', { vi: 'Bơi & ngắm hoàng hôn giữa vịnh', en: 'Swim & sunset on the bay' }],
    ['18:30', { vi: 'Về bến', en: 'Return to pier' }],
  ],
};

/* translations overlay for itinerary items (ja/ko/zh/fr) — merged into ITIN below */
const ITIN_X = {
  vip1: [
    { ja: 'カットバ港から出航', ko: '깟바 항 출항', zh: '吉婆港登船启航', fr: 'Embarquement au port de Cat Ba' },
    { ja: '光と闇の洞窟でカヤック', ko: '빛과 어둠 동굴 카약', zh: '明暗洞皮划艇', fr: 'Kayak aux grottes Claire et Sombre' },
    { ja: '船上海鮮ランチ', ko: '선상 해산물 점심', zh: '船上海鲜午餐', fr: 'Déjeuner de fruits de mer à bord' },
    { ja: 'ベトハイ村サイクリング', ko: '비엣하이 마을 자전거', zh: '越海村骑行', fr: 'Vélo au village Viet Hai' },
    { ja: '海水浴またはサンデッキ', ko: '수영 또는 선덱 휴식', zh: '游泳或甲板休闲', fr: 'Baignade ou pont soleil' },
    { ja: 'カットバ港へ帰港', ko: '깟바 항 복귀', zh: '返回吉婆港', fr: 'Retour au port' },
  ],
  sunset: [
    { ja: 'カットバ港乗船', ko: '깟바 항 승선', zh: '吉婆港登船', fr: 'Embarquement à Cat Ba' },
    { ja: '石灰岩の島々を巡航', ko: '석회암 섬 사이 항해', zh: '穿行石灰岩岛屿', fr: 'Navigation entre les îlots' },
    { ja: 'デッキで夕日と軽食', ko: '갑판에서 선셋과 다과', zh: '甲板赏日落配茶点', fr: 'Coucher de soleil et rafraîchissements' },
    { ja: '帰港', ko: '항구 복귀', zh: '返回码头', fr: 'Retour au port' },
  ],
  morning: [
    { ja: '静かな湾へ早朝出航', ko: '고요한 베이로 이른 출항', zh: '清晨出航宁静海湾', fr: 'Départ matinal, baie paisible' },
    { ja: '船上朝食', ko: '선상 조식', zh: '船上早餐', fr: 'Petit-déjeuner à bord' },
    { ja: '目覚める水上村を見学', ko: '잠에서 깨는 수상마을 감상', zh: '观赏苏醒的渔村', fr: 'Le village flottant s’éveille' },
    { ja: '帰港', ko: '항구 복귀', zh: '返回码头', fr: 'Retour au port' },
  ],
  vip3: [
    { ja: '99席船で日の出クルーズ', ko: '99석 선박 일출 크루즈', zh: '99座船迎日出', fr: 'Lever de soleil sur navire 99 pl.' },
    { ja: '船上朝食', ko: '선상 조식', zh: '船上早餐', fr: 'Petit-déjeuner à bord' },
    { ja: 'カヤックまたは海水浴', ko: '카약 또는 수영', zh: '皮划艇或游泳', fr: 'Kayak ou baignade' },
    { ja: '早めの海鮮ランチ', ko: '이른 해산물 점심', zh: '海鲜午餐', fr: 'Déjeuner de fruits de mer' },
    { ja: '帰港', ko: '항구 복귀', zh: '返回码头', fr: 'Retour au port' },
  ],
  vip4: [
    { ja: '5つ星船に乗船', ko: '5성급 선박 승선', zh: '登五星游轮', fr: 'Embarquement navire 5★' },
    { ja: 'ガラス張りレストランでランチ', ko: '글라스 레스토랑 점심', zh: '玻璃餐厅午餐', fr: 'Déjeuner gastronomique' },
    { ja: 'カヤックまたは海水浴', ko: '카약 또는 수영', zh: '皮划艇或游泳', fr: 'Kayak ou baignade' },
    { ja: 'アフタヌーンティーとベトハイ村', ko: '애프터눠 티 & 비엣하이', zh: '下午茶经越海村', fr: 'Thé de l’après-midi, village Viet Hai' },
    { ja: '帰港', ko: '항구 복귀', zh: '返回码头', fr: 'Retour au port' },
  ],
  vip5: [
    { ja: '夕日に向け出航', ko: '선셋 항해 출발', zh: '启航迎日落', fr: 'Départ pour le coucher de soleil' },
    { ja: '海鮮セットディナー', ko: '해산물 세트 디너', zh: '海鲜套餐晚宴', fr: 'Dîner fruits de mer' },
    { ja: 'サンデッキDJセット', ko: '선덱 DJ 공연', zh: '甲板DJ表演', fr: 'DJ sur le pont' },
    { ja: '湾上の花火', ko: '베이 불꽃놈이', zh: '湾上烟花', fr: 'Feux d’artifice' },
    { ja: '帰港', ko: '항구 복귀', zh: '返回码头', fr: 'Retour au port' },
  ],
  combo1: [
    { ja: 'ハノイ旧市街お迎え', ko: '하노이 구시가지 픽업', zh: '河内老城区接客', fr: 'Prise en charge au Vieux Quartier' },
    { ja: 'カットバ着、VIP1乗船', ko: '깟바 도착, VIP1 승선', zh: '抵达吉婆登VIP1', fr: 'Arrivée et embarquement VIP 1' },
    { ja: 'ランチ・カヤック・ベトハイ村', ko: '점심·카약·비엣하이', zh: '午餐·皮划艇·越海村', fr: 'Déjeuner, kayak, Viet Hai' },
    { ja: 'ハノイへ帰路', ko: '하노이행 버스', zh: '乘车返河内', fr: 'Bus retour Hanoï' },
    { ja: '旧市街着', ko: '구시가지 도착', zh: '抵达老城区', fr: 'Arrivée au Vieux Quartier' },
  ],
  combo4: [
    { ja: 'ハノイ旧市街お迎え', ko: '하노이 구시가지 픽업', zh: '河内老城区接客', fr: 'Prise en charge au Vieux Quartier' },
    { ja: '5つ星船VIP4乗船', ko: '5성급 VIP4 승선', zh: '登五星VIP4', fr: 'Embarquement VIP 4 cinq étoiles' },
    { ja: 'ファインダイニングとカヤック', ko: '파인다이닝 점심, 카약', zh: '精致午餐与皮划艇', fr: 'Déjeuner gastronomique, kayak' },
    { ja: 'ハノイへ帰路', ko: '하노이행 버스', zh: '乘车返河内', fr: 'Bus retour Hanoï' },
    { ja: '旧市街着', ko: '구시가지 도착', zh: '抵达老城区', fr: 'Arrivée au Vieux Quartier' },
  ],
  psup: [
    { ja: 'ベオ港集合・SUP講習', ko: '베오 부두 집합·SUP 교육', zh: 'Beo码头集合·SUP讲解', fr: 'RDV quai Beo — initiation SUP' },
    { ja: '水上村を漕いで巡る', ko: '수상마을 패들링', zh: '划过水上渔村', fr: 'Pagayez le long du village flottant' },
    { ja: '夕日の中で海水浴', ko: '노을 속 수영', zh: '夕阳下游泳', fr: 'Baignade au coucher du soleil' },
    { ja: '帰港', ko: '복귀', zh: '返回', fr: 'Retour' },
  ],
};
Object.keys(ITIN_X).forEach((k) => {
  (ITIN[k] || []).forEach((item, i) => { if (ITIN_X[k][i]) Object.assign(item[1], ITIN_X[k][i]); });
});

const CHILD_POLICY = {
  vi: 'Trẻ < 2 tuổi: miễn phí · 2–4 tuổi: phụ thu 150K (Sunset/Morning), 300K (VIP 1), 400K (VIP 3/4/5) · 5–11 tuổi: giảm 60K so với người lớn.',
  en: 'Under 2: free · Ages 2–4: 150K (Sunset/Morning), 300K (VIP 1), 400K (VIP 3/4/5) · Ages 5–11: 60K off adult rate.',
  ja: '2歳未満：無料 · 2ー4歳：150K（Sunset/Morning）、300K（VIP1）、400K（VIP3/4/5） · 5ー11歳：大人料金から60K引き。',
  ko: '2세 미만: 무료 · 2–4세: 150K(Sunset/Morning), 300K(VIP1), 400K(VIP3/4/5) · 5–11세: 성인 요금에서 60K 할인.',
  zh: '2岁以下：免费 · 2–4岁：加收150K（Sunset/Morning）、300K（VIP1）、400K（VIP3/4/5） · 5–11岁：比成人价减60K。',
  fr: 'Moins de 2 ans : gratuit · 2–4 ans : supplément 150K (Sunset/Morning), 300K (VIP 1), 400K (VIP 3/4/5) · 5–11 ans : −60K.',
};

/* band '24' = 2–4 tuổi (phụ thu cố định theo tour) · band '511' = 5–11 tuổi (giá người lớn − 60K) · <2 tuổi miễn phí */
function childPrice(tour, adultPrice, band) {
  if (band === '511') return Math.max(0, adultPrice - 60000);
  if (['sunset', 'morning'].includes(tour.id)) return 150000;
  if (tour.id === 'vip1') return 300000;
  if (['vip3', 'vip4', 'vip5'].includes(tour.id)) return 400000;
  return Math.max(0, adultPrice - 400000 > 0 ? 400000 : adultPrice); // combos: 400K/child supplement baseline
}

/* ---------- shared cruise booking detail ---------- */
function TourDetail({ tour, nav, isCombo }) {
  const t = (k) => I18N.t(k);
  const L = (o) => I18N.L(o);
  const [date, setDate] = useState('2026-06-20');
  const [ad, setAd] = useState(2);
  const [ch24, setCh24] = useState(0);
  const [ch511, setCh511] = useState(0);
  const ch = ch24 + ch511;
  const [phase, setPhase] = useState('detail'); // detail | checkout | ticket
  const [bk, setBk] = useState(null);
  const season = DT_DATA.cruiseSeason(date);
  const baseAdult = season === 'peak' ? tour.peak : (tour.low ?? tour.peak);
  const { final: adultP, c: camp } = promoPrice(tour.id, baseAdult);
  const available = !(tour.peakOnly && season !== 'peak');
  const childP24 = childPrice(tour, adultP, '24');
  const childP511 = childPrice(tour, adultP, '511');
  const holidayFee = DT_DATA.isHoliday(date) ? (ad + ch) * DT_DATA.HOLIDAY_FEE : 0;
  const total = ad * adultP + ch24 * childP24 + ch511 * childP511;
  const gallery = [tour.img, DT_DATA.IMG + 'daycruise-act-1.jpg', DT_DATA.IMG + 'daycruise-deck.jpg'];

  if (phase === 'ticket' && bk) return <SuccessTicket bk={bk} nav={nav} />;

  const StickyCta = () => (
    <div className="dt-sticky-cta" data-comment-anchor="sticky-cta-tour">
      <div className="pr-wrap">
        <div className="pr-lbl">{t('from_price')} · {t('per_person').replace('/', '')}</div>
        <div className="pr">{I18N.fmtPrice(adultP)}</div>
      </div>
      <button className="dt-btn" disabled={!available} onClick={() => { setPhase('checkout'); window.scrollTo(0, 0); }}>{t('book_now')}</button>
    </div>
  );

  if (phase === 'checkout') {
    return (
      <CheckoutFlow
        ctx={{
          kind: isCombo ? 'tour' : 'daycruise',
          title: L(tour.name),
          fromLabel: isCombo ? 'Hà Nội' : 'Cát Bà', toLabel: 'Lan Ha Bay',
          date, timeGo: tour.time.split(' – ')[0],
          paxLabel: ad + ' ' + t('adults') + (ch ? ' + ' + ch + ' ' + t('children') : ''),
          paxCount: ad + ch,
          pickupOptions: (isCombo ? DT_DATA.PICKUPS.HN : DT_DATA.PICKUPS.CB).map((p) => I18N.L(p)),
          rows: [
            [t('departs'), tour.time + ' · ' + I18N.fmtDate(date)],
            [t('adults') + ' × ' + ad, I18N.fmtPrice(ad * adultP)],
            ...(ch24 ? [[t('children_24') + ' × ' + ch24, I18N.fmtPrice(ch24 * childP24)]] : []),
            ...(ch511 ? [[t('children_511') + ' × ' + ch511, I18N.fmtPrice(ch511 * childP511)]] : []),
          ],
          total,
          holidayFee,
        }}
        onBack={() => setPhase('detail')}
        onDone={(b) => { setBk(b); setPhase('ticket'); }}
      />
    );
  }

  return (
    <div data-screen-label={'Tour: ' + L(tour.name)}>
      <StickyCta />
      <div className="dt-detail-hero">
        <img src={gallery[0]} alt={L(tour.name)} loading="lazy" />
        <div className="side">
          <img src={gallery[1]} alt={L(tour.name) + ' — Lan Ha Bay'} loading="lazy" />
          <img src={gallery[2]} alt={L(tour.name) + ' — ' + L(tour.boat)} loading="lazy" />
        </div>
      </div>
      <div className="dt-detail-grid">
        <div>
          <div className="dt-kicker">{tour.code} · {L(tour.boat)}</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--navy)', marginBottom: 10 }}>{L(tour.name)}</h2>
          <p style={{ color: 'var(--ink-2)', fontSize: 14.5, lineHeight: 1.65, marginBottom: 24 }}>{L(tour.blurb)}</p>
          <div className="dt-panel" style={{ marginBottom: 16 }}>
            <h3>{t('itinerary')}</h3>
            <div className="dt-itin">
              {(ITIN[tour.id] || []).map(([tm, tx], i) => (
                <div key={i} className="dt-itin-it">
                  <div className="tm">{tm}</div>
                  <div className="dot"><i></i></div>
                  <div className="tx">{L(tx)}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="dt-notice" style={{ marginTop: 0 }}><b>{t('child_policy')}:</b> {I18N.L(CHILD_POLICY)}</div>
          <ReviewBlock group="day" score={4.9} count={1240} />
        </div>
        <div className="dt-sum">
          <div className="dt-panel">
            <h3>{t('book_now')}</h3>
            <div className="dt-field" style={{ marginBottom: 12 }}>
              <label>{t('s_date_cruise')}</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="dt-sum-row"><span>{t('adults')}</span><Stepper v={ad} set={setAd} min={1} max={20} /></div>
            <div className="dt-sum-row"><span>{t('children_24')}</span><Stepper v={ch24} set={setCh24} min={0} max={10} /></div>
            <div className="dt-sum-row"><span>{t('children_511')}</span><Stepper v={ch511} set={setCh511} min={0} max={10} /></div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-3)', margin: '2px 0 6px' }}>{t('infant_free')}</div>
            {holidayFee > 0 && <div className="dt-notice" style={{ margin: '8px 0' }}>{t('holiday_auto')}: +{I18N.fmtPrice(DT_DATA.HOLIDAY_FEE)}{t('per_person')}</div>}
            <div className="dt-sum-row"><span>{season === 'peak' ? t('high_season') : t('low_season')}</span><b>{camp ? <span><s style={{ color: 'var(--ink-3)', fontWeight: 400 }}>{I18N.fmtPrice(baseAdult)}</s> {I18N.fmtPrice(adultP)}</span> : I18N.fmtPrice(adultP)}{t('per_person')}</b></div>
            {camp && (
              <div className="dt-notice" style={{ margin: '10px 0', background: 'var(--red-soft)', borderColor: '#EFC5C5', color: 'var(--red)' }}>
                ⚡ <b>{camp.name} −{camp.off}%</b>{camp.ends ? <span> · {I18N.lang === 'vi' ? 'kết thúc sau' : 'ends in'} <Countdown ends={camp.ends} /></span> : null}
              </div>
            )}
            {!available && <div className="dt-notice" style={{ margin: '10px 0' }}>{I18N.lang === 'vi' ? 'Tour này chỉ chạy mùa cao điểm (27/5 – 02/8). Hãy chọn ngày khác.' : 'This tour runs in peak season only (27 May – 02 Aug). Pick another date.'}</div>}
            <div className="dt-sum-total"><span>{t('total')}</span><span className="v">{I18N.fmtPrice(total)}</span></div>
            <button className="dt-btn" style={{ width: '100%', marginTop: 14, padding: '13px 0' }} disabled={!available} onClick={() => setPhase('checkout')}>{t('book_now')}</button>
            <button className="dt-btn ghost" style={{ width: '100%', marginTop: 8 }} disabled={!available} onClick={() => {
              DT_CART.add({ kind: isCombo ? 'tour' : 'day', label: L(tour.name), short: L(tour.name), date, total, detail: ad + '+' + ch, holiday: holidayFee });
              nav('cart');
            }}>+ {t('add_cart')}</button>
            <div className="dt-trust" style={{ marginTop: 12 }}>
              <span><I.check size={14} /> {t('meals_incl')}</span>
              <span><I.check size={14} /> {t('free_cancel')}</span>
              <span><I.check size={14} /> {t('weather_policy')}</span>
              <span><I.check size={14} /> {t('incl_vat')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- day cruise listing ---------- */
function DayCruisePage({ params, nav }) {
  const t = (k) => I18N.t(k);
  const L = (o) => I18N.L(o);
  const tours = DT_DATA.DAY_TOURS.filter((x) => !x.combo && !x.hidden);
  const [selId, setSelId] = useState(params.tour || null);
  const sel = tours.find((x) => x.id === selId);

  return (
    <div className="dt-page" data-screen-label="Du thuyền ngày">
      {sel ? (
        <React.Fragment>
          <div className="dt-crumb"><span style={{ cursor: 'pointer' }} onClick={() => setSelId(null)}>{t('nav_day')}</span> › <b>{L(sel.name)}</b></div>
          <TourDetail key={sel.id} tour={sel} nav={nav} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="dt-kicker">LAN HA BAY · DAIICHI CRUISE</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--navy)', marginBottom: 20 }}>{t('nav_day')}</h2>
          <div className="dt-cards">
            {tours.map((tr) => {
              const base = tr.low || tr.peak;
              const { final, c } = promoPrice(tr.id, base);
              const isNew = DT_CAMPAIGNS.isNew(tr.id);
              return (
              <div key={tr.id} className="dt-card" onClick={() => setSelId(tr.id)}>
                <div className="dt-card-img" style={{ backgroundImage: `url(${tr.img})` }}>
                  <span className="dt-card-badge">{tr.code}</span>
                  {c && <span className="dt-card-badge" style={{ left: 'auto', right: 12, background: c.color }}>⚡ −{c.off}%</span>}
                  {isNew && <span className="dt-card-badge" style={{ left: 'auto', right: 12, background: '#1F7A4D' }}>{I18N.lang === 'vi' ? 'MỚI' : 'NEW'}</span>}
                </div>
                <div className="dt-card-body">
                  <h3>{L(tr.name)}</h3>
                  <div className="dt-card-meta"><I.clock size={13} /> {tr.time} · {L(tr.boat)}</div>
                  {tr.partner && <div className="dt-card-meta" style={{ color: 'var(--navy-700)', fontWeight: 600 }}>✓ {I18N.lang === 'vi' ? 'Đối tác xác minh' : 'Verified partner'} · {tr.operator}</div>}
                  <div className="dt-card-price">
                    <span className="lbl">{t('from_price')}</span>
                    {c ? <React.Fragment><s style={{ color: 'var(--ink-3)', fontSize: 13 }}>{I18N.fmtPrice(base)}</s><b>{I18N.fmtPrice(final)}</b></React.Fragment> : <b>{I18N.fmtPrice(base)}</b>}
                    <span className="unit">{t('per_person')}</span>
                  </div>
                </div>
              </div>
            );})}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

/* ---------- combo tours ---------- */
function ToursPage({ params, nav }) {
  const t = (k) => I18N.t(k);
  const L = (o) => I18N.L(o);
  const combos = DT_DATA.DAY_TOURS.filter((x) => x.combo && !x.hidden);
  const [selId, setSelId] = useState(null);
  const sel = combos.find((x) => x.id === selId);

  return (
    <div className="dt-page" data-screen-label="Tour combo">
      {sel ? (
        <React.Fragment>
          <div className="dt-crumb"><span style={{ cursor: 'pointer' }} onClick={() => setSelId(null)}>{t('nav_tour')}</span> › <b>{L(sel.name)}</b></div>
          <TourDetail key={sel.id} tour={sel} nav={nav} isCombo />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="dt-kicker">HANOI ⇄ LAN HA BAY · ALL-IN-ONE</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 30, color: 'var(--navy)', marginBottom: 6 }}>{t('nav_tour')}</h2>
          <p style={{ color: 'var(--ink-2)', fontSize: 14, marginBottom: 20 }}>
            {I18N.lang === 'vi' ? 'Một vé duy nhất: xe limousine đón phố cổ + du thuyền vịnh Lan Hạ + về lại Hà Nội trong ngày.' : 'One ticket: Old Quarter limousine pickup, a Lan Ha Bay cruise, and the ride home — all in a day.'}
          </p>
          <div className="dt-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))' }}>
            {combos.map((tr) => (
              <div key={tr.id} className="dt-card" onClick={() => setSelId(tr.id)}>
                <div className="dt-card-img" style={{ backgroundImage: `url(${tr.img})`, height: 200 }}>
                  <span className="dt-card-badge">{tr.code}</span>
                </div>
                <div className="dt-card-body">
                  <h3>{L(tr.name)}</h3>
                  <div className="dt-card-meta"><I.clock size={13} /> {tr.time} · {L(tr.boat)}</div>
                  <div className="dt-card-price">
                    <b>{I18N.fmtPrice(tr.peak)}</b>
                    <span className="unit">{t('per_person')} · {t('meals_incl')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

/* ---------- booking lookup: by code or by phone + OTP ---------- */
function LookupPage({ nav }) {
  const t = (k) => I18N.t(k);
  const [mode, setMode] = useState('code'); // code | phone
  const [code, setCode] = useState('');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [demoOtp] = useState(() => String(Math.floor(100000 + Math.random() * 900000)));
  const [results, setResults] = useState(null); // array of bookings
  const [err, setErr] = useState(false);

  const findByCode = () => {
    const b = DT_STORE.get(code);
    setResults(b ? [b] : []); setErr(!b);
  };
  const findByPhone = () => {
    const all = JSON.parse(localStorage.getItem('dt_bookings') || '{}');
    const norm = (s) => String(s || '').replace(/\D/g, '');
    const list = Object.values(all).filter((b) => norm(b.phone) === norm(phone));
    setResults(list); setErr(list.length === 0);
  };
  return (
    <div className="dt-page" data-screen-label="Tra cứu vé">
      <div className="dt-lookup">
        <h2>{t('lookup_title')}</h2>
        <div className="dt-filters" style={{ justifyContent: 'center', marginBottom: 16 }}>
          <button className={'dt-chip' + (mode === 'code' ? ' on' : '')} onClick={() => { setMode('code'); setResults(null); setErr(false); }}>{t('lookup_by_code')}</button>
          <button className={'dt-chip' + (mode === 'phone' ? ' on' : '')} onClick={() => { setMode('phone'); setResults(null); setErr(false); }}>{t('lookup_by_phone')}</button>
        </div>
        {mode === 'code' && (
          <React.Fragment>
            <p>{t('lookup_hint')}</p>
            <div className="dt-lookup-row">
              <input value={code} onChange={(e) => { setCode(e.target.value); setErr(false); }} placeholder="DT26-XXXXX"
                onKeyDown={(e) => e.key === 'Enter' && findByCode()} />
              <button className="dt-btn" onClick={findByCode}>{t('s_search')}</button>
            </div>
          </React.Fragment>
        )}
        {mode === 'phone' && (
          <React.Fragment>
            <div className="dt-lookup-row">
              <input value={phone} style={{ textTransform: 'none' }} onChange={(e) => { setPhone(e.target.value); setErr(false); }} placeholder="09xx xxx xxx" />
              <button className="dt-btn ghost" onClick={() => setOtpSent(phone.replace(/\D/g, '').length >= 9)}>{t('send_otp')}</button>
            </div>
            {otpSent && (
              <div style={{ marginTop: 12 }}>
                <p>{t('otp_hint')} <b style={{ color: 'var(--gold)' }}>(demo: {demoOtp})</b></p>
                <div className="dt-lookup-row">
                  <input value={otp} style={{ textTransform: 'none', letterSpacing: '.3em' }} maxLength={6}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))} placeholder="••••••" />
                  <button className="dt-btn" disabled={otp !== demoOtp} onClick={findByPhone}>{t('confirm')}</button>
                </div>
              </div>
            )}
          </React.Fragment>
        )}
        {err && <p style={{ color: 'var(--bad)', marginTop: 12 }}>{t('lookup_notfound')}</p>}
      </div>
      {results && results.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {results.slice(0, 4).map((bk) => (
            <div key={bk.code} className="dt-ticket-wrap" style={{ marginTop: 8 }}>
              <TicketCard bk={bk} />
              {window.TicketActions && <TicketActions bk={bk} nav={nav} onUpdate={() => setResults([...results])} />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { DayCruisePage, ToursPage, LookupPage, TourDetail });
