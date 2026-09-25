/* ============================================================
   DAIICHI CRUISE — Luxury & Boutique Cruise Homepage
   Elevated UI for daiichicruise.vn (5★ Luxury Cruise & 4★ Boutique)
   ============================================================ */
const { useState, useEffect } = React;

/* Multi-language dictionary */
const HD = {
  nav_luxury: ['Du thuyền 5★ Luxury', '5★ Luxury Cruise', '5つ星ラグジュアリー', '5성급 럭셔리 크루즈', '五星奢华游轮', 'Croisière 5★ Luxury'],
  nav_boutique: ['Du thuyền Boutique', 'Boutique Cruise', 'ブティッククルーズ', '부티크 크루즈', '精品游轮', 'Croisière Boutique'],
  nav_suites: ['Hạng phòng Suite', 'Suites Collection', 'スイート客室', '스위트 객실', '套房系列', 'Suites'],
  nav_highlights: ['Điểm vượt trội', 'Highlights', '特徴と魅力', '특장점', '特色优势', 'Points forts'],
  nav_itinerary: ['Hải trình', 'Itinerary', '運航日程', '운항 일정', '航程安排', 'Itinéraire'],
  nav_day: ['Du thuyền ngày', 'Day Cruises', 'デイクルーズ', '데이 크루즈', '日间游轮', 'Croisières Journée'],
  nav_limo: ['Xe Limousine', 'Limousine Bus', 'リムジンバス', '리무진 버스', '豪华专车', 'Limousine'],
  cta_book: ['Đặt du thuyền ngay', 'Book cruise now', '今すぐ予約', '지금 예약', '立即预订游轮', 'Réserver'],
  hero_k: ['TIÊU CHUẨN DU THUYỀN CAO CẤP VỊNH LAN HẠ · CÁT BÀ', 'PREMIUM LAN HA BAY LUXURY & BOUTIQUE CRUISES', 'ランハ湾プレミアムクルーズ', '란하베이 프리미엄 크루즈', '兰哈湾顶级游轮体验', 'CROISIÈRES DE LUXE EN BAIE DE LAN HA'],
  hero_t: ['Tuyệt Tác Du Thuyền Luxury & Boutique Giữa Vịnh Lan Hạ', 'Masterpiece Luxury & Boutique Cruises in Lan Ha Bay', 'ランハ湾の息を呑む絶景と極上クルーズ', '란하베이의 비경과 함께하는 최고급 크루즈', '兰哈湾绝美秘境 顶级奢华游轮假期', 'Le Chef-d\'œuvre des Croisières en Baie de Lan Ha'],
  hero_p: ['Nghỉ dưỡng thượng lưu trên Daiichi Luxury Cruise 5★ và Daiichi Boutique Cruise 4★. 100% phòng có ban công riêng view vịnh, cầu kính Skywalk độc nhất, bể sục Jacuzzi bốn mùa, ẩm thực Fine-Dining và đưa đón Limousine trọn gói.',
    'Ultra-luxury voyages aboard Daiichi Luxury Cruise 5★ and Daiichi Boutique Cruise 4★. 100% private balcony suites, exclusive glass skywalk, four-season jacuzzi, fine-dining restaurant and door-to-door limousine service.',
    '5つ星ラグジュアリー＆4つ星ブティッククルーズで過ごす極上のひととき。全室プライベートバルコニー、絶景ガラス橋、温水ジャグジー、極上海鮮料理。',
    '다이이찌 럭셔리 5성급 & 부티크 크루즈에서 즐기는 특별한 휴식. 전 객실 전용 발코니 오션뷰, 스카이워크 유리 다리, 4계절 자쿠지, 파인다이닝.',
    '在戴一五星奢华游轮与精品游轮上尊享非凡度假。全独立海景阳台套房、专属全景玻璃桥、四季按摩浴缸、精致饕餮盛宴及豪华专车接送。',
    'Séjour d\'exception à bord de nos navires 5★ Luxury et 4★ Boutique. Suites avec balcon privé, passerelle de verre, jacuzzi quatre saisons et gastronomie raffinée.'],
};

const hidx = { vi: 0, en: 1, ja: 2, ko: 3, zh: 4, fr: 5 };
const T = (k) => (HD[k] ? (HD[k][hidx[I18N.lang]] || HD[k][1] || HD[k][0]) : (I18N.t ? I18N.t(k) : k));
const LV = (vi, en) => (I18N.lang === 'vi' ? vi : en);

function OneLang() {
  const [open, setOpen] = useState(false);
  const cur = I18N.langs.find((l) => l.code === I18N.lang) || I18N.langs[0];
  useEffect(() => {
    const close = () => setOpen(false);
    if (open) { document.addEventListener('click', close); return () => document.removeEventListener('click', close); }
  }, [open]);
  return (
    <div className="dt-lang" onClick={(e) => e.stopPropagation()}>
      <button className="dt-lang-btn" onClick={() => setOpen(!open)} style={{ background: 'rgba(255,255,255,.12)', borderColor: 'rgba(212,166,72,.4)' }}>
        <span>{cur.flag}</span><span style={{ fontWeight: 700 }}>{cur.code.toUpperCase()}</span>
        <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
      </button>
      {open && (
        <div className="dt-lang-menu" style={{ zIndex: 120 }}>
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

/* ============================================================
   HERO SEARCH WIDGET — CRUISE FIRST
   ============================================================ */
function CruiseHomeSearch() {
  const [tab, setTab] = useState('night'); // 'night' | 'day' | 'tour' | 'bus'
  const [cruiseType, setCruiseType] = useState('all');
  const [itinerary, setItinerary] = useState('2d1n');
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });
  const [pax, setPax] = useState(2);
  const [cabins, setCabins] = useState(1);
  const [from, setFrom] = useState('HN');
  const [to, setTo] = useState('CB');
  const STATIONS = (window.DT_DATA && DT_DATA.STATIONS) || {};

  const handleSearch = () => {
    if (tab === 'night') {
      const url = `https://daiichitravel.com/?tab=cruise-tours&date=${date}&pax=${pax}&cabins=${cabins}&itinerary=${itinerary}&cruise=${cruiseType}&source=daiichicruise`;
      window.open(url, '_blank');
    } else if (tab === 'day') {
      window.open(`https://daiichitravel.com/?tab=tours&category=TOUR_SHORT&date=${date}&pax=${pax}&source=daiichicruise`, '_blank');
    } else if (tab === 'tour') {
      window.open(`https://daiichitravel.com/?tab=tours&category=TOUR_SHORT&type=combo&date=${date}&pax=${pax}&source=daiichicruise`, '_blank');
    } else {
      const fromName = STATIONS[from] ? (STATIONS[from].vi || from) : 'Hà Nội';
      const toName = STATIONS[to] ? (STATIONS[to].vi || to) : 'Cát Bà';
      window.open(`https://daiichitravel.com/?tab=book-ticket&from=${encodeURIComponent(fromName)}&to=${encodeURIComponent(toName)}&date=${date}&pax=${pax}&source=daiichicruise`, '_blank');
    }
  };

  return (
    <div className="lux-search-box" data-comment-anchor="cruise-search">
      <div className="lux-search-tabs">
        <button className={'lux-tab-btn' + (tab === 'night' ? ' active' : '')} onClick={() => setTab('night')}>
          <span style={{ fontSize: 18 }}>🌙</span> {LV('Du thuyền ngủ đêm 5★ & Boutique', '5★ & Boutique Overnight Cruise')}
        </button>
        <button className={'lux-tab-btn' + (tab === 'day' ? ' active' : '')} onClick={() => setTab('day')}>
          <span style={{ fontSize: 18 }}>🚢</span> {LV('Du thuyền ngày Lan Hạ', 'Lan Ha Day Cruise')}
        </button>
        <button className={'lux-tab-btn' + (tab === 'tour' ? ' active' : '')} onClick={() => setTab('tour')}>
          <span style={{ fontSize: 18 }}>🗺️</span> {LV('Tour Combo trọn gói Hà Nội', 'All-in Combo from Hanoi')}
        </button>
        <button className={'lux-tab-btn' + (tab === 'bus' ? ' active' : '')} onClick={() => setTab('bus')}>
          <span style={{ fontSize: 18 }}>🚐</span> {LV('Xe Limousine đưa đón', 'Limousine Transfer')}
        </button>
      </div>

      <div className="lux-search-form">
        {tab === 'night' && (
          <React.Fragment>
            <div className="lux-field">
              <label>⚓ {LV('Du thuyền', 'Cruise Ship')}</label>
              <select value={cruiseType} onChange={(e) => setCruiseType(e.target.value)}>
                <option value="all">{LV('Tất cả du thuyền (Luxury & Boutique)', 'All Cruises (Luxury & Boutique)')}</option>
                <option value="luxury">Daiichi Luxury Cruise ★★★★★</option>
                <option value="boutique">Daiichi Boutique Cruise ★★★★</option>
              </select>
            </div>
            <div className="lux-field">
              <label>⏱ {LV('Hải trình', 'Itinerary')}</label>
              <select value={itinerary} onChange={(e) => setItinerary(e.target.value)}>
                <option value="2d1n">{LV('2 Ngày 1 Đêm (2D1N)', '2 Days 1 Night (2D1N)')}</option>
                <option value="3d2n">{LV('3 Ngày 2 Đêm (3D2N)', '3 Days 2 Nights (3D2N)')}</option>
              </select>
            </div>
            <div className="lux-field">
              <label>📅 {LV('Ngày khởi hành', 'Departure Date')}</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="lux-field" style={{ maxWidth: 140 }}>
              <label>👥 {LV('Số khách', 'Guests')}</label>
              <select value={pax} onChange={(e) => setPax(+e.target.value)}>
                {[1,2,3,4,5,6,7,8,10,15,20].map((n) => <option key={n} value={n}>{n} {LV('khách', 'guests')}</option>)}
              </select>
            </div>
            <div className="lux-field" style={{ maxWidth: 130 }}>
              <label>🚪 {LV('Số cabin', 'Cabins')}</label>
              <select value={cabins} onChange={(e) => setCabins(+e.target.value)}>
                {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n} {LV('phòng', 'cabin(s)')}</option>)}
              </select>
            </div>
          </React.Fragment>
        )}

        {tab === 'day' && (
          <React.Fragment>
            <div className="lux-field">
              <label>🚢 {LV('Tuyến tham quan', 'Tour Itinerary')}</label>
              <select defaultValue="vip1">
                <option value="vip1">{LV('Tour 1 ngày Lan Hạ – Làng Việt Hải (VIP 1)', 'Full-day Lan Ha – Viet Hai (VIP 1)')}</option>
                <option value="sunset">{LV('Tour Hoàng hôn & Tiệc trà Sunset Cruise', 'Sunset Cruise & Tea Party')}</option>
                <option value="dinner">{LV('Dinner Cruise DJ & Pháo hoa vịnh Lan Hạ', 'Dinner Cruise DJ & Fireworks')}</option>
                <option value="morning">{LV('Tour Bình minh Lan Hạ & Chèo Kayak', 'Sunrise Cruise & Kayaking')}</option>
              </select>
            </div>
            <div className="lux-field">
              <label>📅 {LV('Ngày khởi hành', 'Departure Date')}</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="lux-field">
              <label>👥 {LV('Hành khách', 'Guests')}</label>
              <select value={pax} onChange={(e) => setPax(+e.target.value)}>
                {[1,2,3,4,5,6,7,8,10,15,20].map((n) => <option key={n} value={n}>{n} {LV('khách', 'guests')}</option>)}
              </select>
            </div>
          </React.Fragment>
        )}

        {tab === 'tour' && (
          <React.Fragment>
            <div className="lux-field">
              <label>🗺️ {LV('Gói Combo Tour', 'Combo Package')}</label>
              <select defaultValue="combo-day">
                <option value="combo-day">{LV('Combo Xe đón Hà Nội + Du thuyền ngày 5★ VIP 4', 'Hanoi Bus + 5★ VIP 4 Day Cruise')}</option>
                <option value="combo-overnight">{LV('Combo Xe Limousine Hà Nội + Du thuyền ngủ đêm 2N1Đ', 'Hanoi Limousine + Overnight Cruise 2D1N')}</option>
              </select>
            </div>
            <div className="lux-field">
              <label>📅 {LV('Ngày khởi hành', 'Departure Date')}</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="lux-field">
              <label>👥 {LV('Hành khách', 'Guests')}</label>
              <select value={pax} onChange={(e) => setPax(+e.target.value)}>
                {[1,2,3,4,5,6,7,8,10].map((n) => <option key={n} value={n}>{n} {LV('khách', 'guests')}</option>)}
              </select>
            </div>
          </React.Fragment>
        )}

        {tab === 'bus' && (
          <React.Fragment>
            <div className="lux-field">
              <label>📍 {LV('Điểm đi', 'From')}</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)}>
                {Object.keys(STATIONS).map((k) => <option key={k} value={k}>{I18N.L(STATIONS[k])}</option>)}
              </select>
            </div>
            <div className="lux-field">
              <label>📍 {LV('Điểm đến', 'To')}</label>
              <select value={to} onChange={(e) => setTo(e.target.value)}>
                {Object.keys(STATIONS).map((k) => <option key={k} value={k}>{I18N.L(STATIONS[k])}</option>)}
              </select>
            </div>
            <div className="lux-field">
              <label>📅 {LV('Ngày đi', 'Travel Date')}</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="lux-field" style={{ maxWidth: 130 }}>
              <label>👥 {LV('Hành khách', 'Guests')}</label>
              <select value={pax} onChange={(e) => setPax(+e.target.value)}>
                {[1,2,3,4,5,6,7,8,10].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </React.Fragment>
        )}

        <button className="lux-submit-btn" onClick={handleSearch}>
          <span>🔍</span> {LV('Tìm Chuyến & Báo Giá →', 'Find Cruise & Rates →')}
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION 1: THE TWO ICONIC SHIPS (LUXURY 5★ & BOUTIQUE 4★)
   ============================================================ */
function FlagshipShipsSection() {
  const sbProperties = window.DT_DATA?.SUPABASE?.properties || [];
  const luxProp = sbProperties.find(p => (p.name || '').toLowerCase().includes('luxury'));
  const bqProp = sbProperties.find(p => (p.name || '').toLowerCase().includes('boutique'));

  // Custom local overrides if any
  let customLux = [];
  let customBq = [];
  try {
    const saved = JSON.parse(localStorage.getItem('dt_custom_cruise_imgs') || '{}');
    customLux = saved['luxury-ship'] || [];
    customBq = saved['boutique-ship'] || [];
  } catch (e) {}

  const luxImg = customLux[0] || luxProp?.images?.[0] || 'assets/photos/luxury-1.jpg';
  const bqImg = customBq[0] || bqProp?.images?.[0] || 'assets/photos/boutique-1.jpg';

  return (
    <section className="lux-duo-sec" id="fleet" data-screen-label="Hạm đội Du thuyền Daiichi">
      <div className="lux-sec-header">
        <div className="lux-sec-kicker">{LV('HẠM ĐỘI DU THUYỀN BIỂU TƯỢNG VỊNH LAN HẠ', 'OUR ICONIC LAN HA BAY FLEET')}</div>
        <h2 className="lux-sec-title">{LV('Hai Đẳng Cấp Nghỉ Dưỡng — Một Trải Nghiệm Hoàn Mỹ', 'Two Distinct Styles — One Unforgettable Voyage')}</h2>
        <p className="lux-sec-sub">
          {LV(
            'Lựa chọn trải nghiệm du thuyền 5 sao siêu hiện đại với Cầu Kính & Bể sục Jacuzzi bốn mùa, hoặc cảm nhận sự ấm cúng, riêng tư tuyệt đối trên du thuyền Boutique phong cách gỗ cổ điển Á Đông.',
            'Choose between our ultra-modern 5★ flagship with skywalk and all-weather jacuzzi, or the intimate warmth of our classic Indochina-style boutique yacht.'
          )}
        </p>
      </div>

      <div className="lux-ships-grid">
        {/* Ship 1: Daiichi Luxury Cruise 5★ */}
        <div className="lux-ship-card" id="luxury-cruise">
          <div className="lux-ship-gallery">
            <img src={luxImg} alt="Daiichi Luxury Cruise 5★" loading="lazy" />
            <div className="lux-ship-badge">★★★★★ 5-STAR LUXURY</div>
            <div className="lux-ship-price-tag">
              <span>{LV('Giá từ', 'From')}</span>
              <b>5.000.000đ</b>
              <span>{LV('/cabin 2 khách', '/2-guest suite')}</span>
            </div>
          </div>
          <div className="lux-ship-content">
            <h3 className="lux-ship-name">Daiichi Luxury Cruise ★★★★★</h3>
            <p className="lux-ship-desc">
              {LV(
                'Du thuyền 5 sao thế hệ mới 2026 với 30 Suite ban công riêng 100% view vịnh Lan Hạ. Sở hữu Cầu Kính Skywalk vươn ra biển độc nhất vô nhị, Bể sục Jacuzzi bốn mùa, nhà hàng kính Fine Dining và Sky Bar 360 độ.',
                'The newest 2026 5-star flagship featuring 30 private balcony suites with full bay panorama. Equipped with Vietnam’s unique over-the-sea glass skywalk, all-season jacuzzi, glass fine-dining restaurant and 360° sky bar.'
              )}
            </p>
            <div className="lux-ship-specs">
              <div className="lux-spec-box">
                <b>30 Suite</b>
                <span>{LV('100% ban công riêng', 'All private balcony')}</span>
              </div>
              <div className="lux-spec-box">
                <b>Cầu Kính & Jacuzzi</b>
                <span>{LV('Check-in độc quyền', 'Exclusive skywalk')}</span>
              </div>
              <div className="lux-spec-box">
                <b>2N1Đ · 3N2Đ</b>
                <span>{LV('Hải trình trọn vẹn', 'Signature voyages')}</span>
              </div>
            </div>
            <div className="lux-ship-perks">
              <span className="lux-perk-tag">💎 {LV('100% Ban công riêng', '100% Balcony Suites')}</span>
              <span className="lux-perk-tag">🌉 {LV('Cầu Kính Skywalk', 'Glass Skywalk')}</span>
              <span className="lux-perk-tag">♨️ {LV('Jacuzzi bốn mùa', 'Heated Jacuzzi')}</span>
              <span className="lux-perk-tag">🍽️ {LV('Nhà hàng Fine Dining', 'Fine Dining')}</span>
              <span className="lux-perk-tag">🛶 {LV('Kayak & Hang Sáng Tối', 'Kayak & Caves')}</span>
            </div>
            <div className="lux-ship-actions">
              <a className="lux-btn-gold" href="https://daiichitravel.com/?tab=cruise-tours" target="_blank" rel="noopener">
                {LV('Đặt Du Thuyền 5★ →', 'Book 5★ Cruise →')}
              </a>
              <a className="lux-btn-outline" href="#suites">
                {LV('Xem 30 Phòng Suite', 'View All Suites')}
              </a>
            </div>
          </div>
        </div>

        {/* Ship 2: Daiichi Boutique Cruise 4★ */}
        <div className="lux-ship-card" id="boutique-cruise">
          <div className="lux-ship-gallery">
            <img src={bqImg} alt="Daiichi Boutique Cruise" loading="lazy" />
            <div className="lux-ship-badge" style={{ background: '#78350F', color: '#FDE68A' }}>★★★★ BOUTIQUE HERITAGE</div>
            <div className="lux-ship-price-tag">
              <span>{LV('Giá từ', 'From')}</span>
              <b>4.200.000đ</b>
              <span>{LV('/cabin 2 khách', '/2-guest cabin')}</span>
            </div>
          </div>
          <div className="lux-ship-content">
            <h3 className="lux-ship-name">Daiichi Boutique Cruise ★★★★</h3>
            <p className="lux-ship-desc">
              {LV(
                'Phong cách Á Đông cổ điển, ấm cúng và riêng tư tuyệt đối với chỉ 7 cabin giới hạn (tối đa 22 khách). Thiết kế 100% nội thất gỗ tự nhiên cao cấp, sundeck rộng 150m², ẩm thực thuần Việt với hải sản tươi sống đánh bắt tại chỗ.',
                'Classic Indochine aesthetic offering unmatched privacy with only 7 exclusive cabins (max 22 guests). 100% premium natural wood craftsmanship, spacious 150m² sundeck and authentic Vietnamese seafood gastronomy.'
              )}
            </p>
            <div className="lux-ship-specs">
              <div className="lux-spec-box">
                <b>7 Cabin</b>
                <span>{LV('Giới hạn riêng tư', 'Intimate & private')}</span>
              </div>
              <div className="lux-spec-box">
                <b>100% Gỗ quý</b>
                <span>{LV('Nội thất cao cấp', 'Solid natural wood')}</span>
              </div>
              <div className="lux-spec-box">
                <b>Sundeck 150m²</b>
                <span>{LV('Toàn cảnh 360 độ', '360° Panorama deck')}</span>
              </div>
            </div>
            <div className="lux-ship-perks">
              <span className="lux-perk-tag">🪵 {LV('100% Gỗ tự nhiên', '100% Natural Wood')}</span>
              <span className="lux-perk-tag">🌿 {LV('Không gian riêng tư', 'Max 22 Guests')}</span>
              <span className="lux-perk-tag">🦞 {LV('Hải sản Cát Bà tươi sống', 'Fresh Bay Seafood')}</span>
              <span className="lux-perk-tag">🚴 {LV('Đạp xe Làng Việt Hải', 'Viet Hai Cycling')}</span>
              <span className="lux-perk-tag">🌅 {LV('Tiệc trà Sunset Tea', 'Sunset Tea Party')}</span>
            </div>
            <div className="lux-ship-actions">
              <a className="lux-btn-gold" href="https://daiichitravel.com/?tab=cruise-tours" target="_blank" rel="noopener">
                {LV('Đặt Boutique Cruise →', 'Book Boutique Cruise →')}
              </a>
              <a className="lux-btn-outline" href="#suites">
                {LV('Xem 7 Cabin Gỗ Quý', 'View 7 Wood Cabins')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 2: SUITE COLLECTION & QUICK VIEW MODAL
   ============================================================ */
/* Single Suite Card with In-Card Mini Image Slider */
function SuiteCard({ st, onSelectRoom }) {
  const [imgIdx, setImgIdx] = useState(0);
  const images = (st.gallery && st.gallery.length > 0) ? st.gallery : [st.img];
  const curImg = images[imgIdx] || st.img;

  const nextImg = (e) => {
    e.stopPropagation();
    setImgIdx((prev) => (prev + 1) % images.length);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setImgIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="lux-room-card">
      <div className="lux-room-thumb" onClick={() => onSelectRoom(st)}>
        <img src={curImg} alt={st.name} loading="lazy" />
        <span className="lux-room-badge">{st.badge}</span>

        {images.length > 1 && (
          <React.Fragment>
            <button className="lux-card-slider-btn prev" onClick={prevImg} title="Ảnh trước">‹</button>
            <button className="lux-card-slider-btn next" onClick={nextImg} title="Ảnh sau">›</button>
            <div className="lux-card-dots">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={'lux-card-dot' + (imgIdx === i ? ' active' : '')}
                  onClick={(e) => { e.stopPropagation(); setImgIdx(i); }}
                />
              ))}
            </div>
          </React.Fragment>
        )}

        <button className="lux-room-quickview-btn">
          🔍 {LV('Xem chi tiết', 'Quick view')} ({imgIdx + 1}/{images.length})
        </button>
      </div>

      <div className="lux-room-body">
        <div className="lux-room-ship-label">{st.shipName}</div>
        <h3 className="lux-room-title">{st.name}</h3>
        <div className="lux-room-params">
          <span>📐 {st.area} m²</span>
          <span>👥 {st.capacity}</span>
          <span>🌅 {st.floor}</span>
        </div>
        <div className="lux-room-amenities">
          {st.amenities.slice(0, 3).map((a, i) => (
            <span key={i} className="lux-room-amenity">✓ {a}</span>
          ))}
        </div>
        <div className="lux-room-foot">
          <div className="lux-room-price">
            <span>{LV('Giá từ', 'From')}</span>
            <b>{st.price.toLocaleString('vi-VN')}đ</b>
            <em>{LV('/đêm', '/night')}</em>
          </div>
          <div className="lux-room-actions">
            <button className="lux-btn-outline" style={{ padding: '8px 12px', fontSize: 12.5 }} onClick={() => onSelectRoom(st)}>
              {LV('Chi tiết & Tính giá', 'Details & Rates')}
            </button>
            <a className="lux-room-book-btn" href="https://daiichitravel.com/?tab=cruise-tours" target="_blank" rel="noopener">
              {LV('Đặt phòng →', 'Book →')}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuiteCollectionSection({ onSelectRoom }) {
  const [filter, setFilter] = useState('all'); // 'all' | 'luxury' | 'boutique'

  // Comprehensive suites with HD gallery from Supabase WebP Storage & local assets
  const ALL_SUITES = [
    {
      id: 'royal',
      shipId: 'luxury',
      shipName: 'Daiichi Luxury Cruise 5★',
      name: 'Royal Suite VIP',
      badge: 'VIP TỔNG THỐNG · TẦNG 4',
      img: 'assets/photos/suite-royal.jpg',
      gallery: [
        'assets/photos/suite-royal.jpg',
        'assets/photos/luxury-restaurant.jpg',
        'assets/photos/luxury-jacuzzi.jpg',
        'assets/photos/luxury-2.jpg',
        'assets/photos/luxury-3.jpg'
      ],
      area: 55,
      capacity: '2 người lớn',
      bed: '1 Giường đôi cực lớn (King Bed)',
      view: 'Góc vịnh toàn cảnh 270° (Panorama View)',
      floor: 'Tầng 4 (Boong cao nhất)',
      balcony: 'Ban công riêng siêu rộng 15m²',
      bath: 'Bồn tắm nằm sát vách kính ngắm trọn vịnh Lan Hạ',
      price: 10500000,
      amenities: ['Ban công riêng cực đại 15m²', 'Bồn tắm nằm sát kính view 270°', 'Khu vực tiếp khách salon cao cấp', 'Điều hòa 2 chiều âm trần', 'Smart TV & Wifi miễn phí', 'Minibar & Rượu vang chào đón', 'Két an toàn điện tử', 'Máy sấy tóc & Mỹ phẩm cao cấp', 'Áo choàng nhung & dép đi trong phòng'],
      desc: 'Hạng phòng xa hoa và cao cấp nhất trên vịnh Lan Hạ. Tọa lạc tại vị trí mũi tàu tầng 4 mang lại tầm nhìn panorama 270 độ không giới hạn. Tận hưởng bồn tắm ngâm mình sát vách kính viền đồng, ban công tắm nắng rộng thênh thang và đặc quyền phục vụ thượng lưu.'
    },
    {
      id: 'family',
      shipId: 'luxury',
      shipName: 'Daiichi Luxury Cruise 5★',
      name: 'Executive / Family Suite',
      badge: 'GIA ĐÌNH CAO CẤP · TẦNG 2',
      img: 'assets/photos/suite-executive.jpg',
      gallery: [
        'assets/photos/suite-executive.jpg',
        'assets/photos/luxury-1.jpg',
        'assets/photos/luxury-jacuzzi.jpg',
        'assets/photos/daycruise-act-2.jpg'
      ],
      area: 45,
      capacity: '2 - 4 khách',
      bed: '1 Giường King + 1 Giường đơn (hoặc Sofa Bed)',
      view: 'View biển trực diện',
      floor: 'Tầng 2',
      balcony: 'Ban công riêng ngắm vịnh',
      bath: 'Bồn tắm nằm sang trọng & Phòng tắm đứng',
      price: 6000000,
      amenities: ['Ban công riêng view biển', 'Bồn tắm nằm thư giãn', 'Không gian gia đình rộng rãi 45m²', 'Điều hòa 2 chiều', 'Wifi tốc độ cao', 'Minibar & Trái cây tươi', 'Két an toàn', 'Đồ dùng vệ sinh chuẩn 5★'],
      desc: 'Thiết kế thông minh dành riêng cho gia đình hoặc nhóm bạn 3-4 người. Không gian ấm cúng, tràn ngập ánh sáng tự nhiên với ban công riêng rộng rãi để cả gia đình cùng chiêm ngưỡng kỳ quan thiên nhiên.'
    },
    {
      id: 'senior',
      shipId: 'luxury',
      shipName: 'Daiichi Luxury Cruise 5★',
      name: 'Senior Suite Balcony',
      badge: 'BỒN TẮM VIEW VỊNH · TẦNG 2',
      img: 'assets/photos/suite-senior.jpg',
      gallery: [
        'assets/photos/suite-senior.jpg',
        'assets/photos/luxury-3.jpg',
        'assets/photos/luxury-restaurant.jpg',
        'assets/photos/daycruise-act-2.jpg'
      ],
      area: 30,
      capacity: '2 người lớn',
      bed: '1 Giường đôi hoặc 2 Giường đơn (Twin/Double)',
      view: 'View vịnh Lan Hạ',
      floor: 'Tầng 2',
      balcony: 'Ban công riêng đón gió biển',
      bath: 'Bồn tắm nằm cạnh cửa sổ kính lớn',
      price: 5000000,
      amenities: ['Ban công riêng view biển', 'Bồn tắm nằm sát cửa kính lớn', 'Cửa sổ kính sát trần ngắm vịnh', 'Điều hòa 2 chiều', 'Wifi tốc độ cao', 'Két an toàn', 'Khăn tắm & Áo choàng cao cấp'],
      desc: 'Hạng phòng được yêu thích nhất bởi các cặp đôi. Điểm nhấn là bồn tắm ngâm mình sát cửa sổ kính nhìn thẳng ra các đảo đá vôi xanh ngọc bích, kết hợp ban công riêng tư lãng mạn đón hoàng hôn.'
    },
    {
      id: 'junior',
      shipId: 'luxury',
      shipName: 'Daiichi Luxury Cruise 5★',
      name: 'Junior / Trip Suite',
      badge: 'BAN CÔNG RIÊNG · TẦNG 2',
      img: 'assets/photos/suite-junior.jpg',
      gallery: [
        'https://vfeodqmvilchsipdsxsh.supabase.co/storage/v1/object/public/room-types/room-types/77295ed4814a45158709a68c3d23fffa.webp',
        'https://vfeodqmvilchsipdsxsh.supabase.co/storage/v1/object/public/room-types/room-types/c0f0655e5c2847fe8bce876b98f70838.webp',
        'https://vfeodqmvilchsipdsxsh.supabase.co/storage/v1/object/public/room-types/room-types/3e609aa9377a485b948ec0dfd91ae732.webp',
        'assets/photos/suite-junior.jpg'
      ],
      area: 28,
      capacity: '2 người lớn + 1 trẻ em',
      bed: '1 Giường đôi lớn hoặc 2 giường đơn',
      view: 'View biển',
      floor: 'Tầng 2',
      balcony: 'Ban công riêng view biển',
      bath: 'Phòng tắm đứng hiện đại vách kính',
      price: 5000000,
      amenities: ['Ban công riêng ngắm vịnh', 'View biển trực tiếp', 'Điều hòa 2 chiều', 'Wifi miễn phí', 'Dép đi trong phòng', 'Máy sấy tóc', 'Két an toàn'],
      desc: 'Phòng ngủ phong cách hiện đại, tinh gọn và thoáng đãng. Hệ thống cửa kính ban công đón trọn ánh nắng ban mai và không khí trong lành của biển khơi Cát Bà.'
    },
    {
      id: 'btq-balcony',
      shipId: 'boutique',
      shipName: 'Daiichi Boutique Cruise 4★',
      name: 'Boutique Balcony Cabin',
      badge: '100% GỖ TỰ NHIÊN · TẦNG 2',
      img: 'assets/photos/boutique-2.jpg',
      gallery: [
        'https://vfeodqmvilchsipdsxsh.supabase.co/storage/v1/object/public/room-types/room-types/25ba463c97174700877aeea6b18d4f6d.webp',
        'https://vfeodqmvilchsipdsxsh.supabase.co/storage/v1/object/public/room-types/room-types/b2d82f8996af45c6b5e78d5b277a80f9.webp',
        'https://vfeodqmvilchsipdsxsh.supabase.co/storage/v1/object/public/room-types/room-types/3a178122035247a795ae65ad0ac6f5c6.webp',
        'assets/photos/boutique-2.jpg'
      ],
      area: 25,
      capacity: '2 người lớn',
      bed: '1 Giường đôi Double gỗ quý',
      view: 'View vịnh Lan Hạ',
      floor: 'Tầng 2 Du thuyền Boutique',
      balcony: 'Ban công gỗ riêng biệt',
      bath: 'Phòng tắm đứng vách kính sang trọng',
      price: 6065000,
      amenities: ['100% Nội thất gỗ tự nhiên', 'Ban công riêng view vịnh', 'Điều hòa 2 chiều', 'Wifi', 'Bàn ghế salon gỗ', 'Đồ dùng vệ sinh cao cấp', 'Két sắt'],
      desc: 'Nằm trên tầng 2 của du thuyền Boutique, cabin sở hữu ban công gỗ riêng nhìn ra biển. Toàn bộ sàn, vách và trần được làm thủ công bằng gỗ tự nhiên, mang lại không gian ấm cúng, sang trọng và giấc ngủ sâu.'
    },
    {
      id: 'btq-deluxe',
      shipId: 'boutique',
      shipName: 'Daiichi Boutique Cruise 4★',
      name: 'Boutique Deluxe Oceanview',
      badge: 'CỔ ĐIỂN ẤM CÚNG · TẦNG 1',
      img: 'assets/photos/suite-deluxe.jpg',
      gallery: [
        'https://vfeodqmvilchsipdsxsh.supabase.co/storage/v1/object/public/room-types/room-types/150ae2005f284efa9cb715e4520cd59e.webp',
        'https://vfeodqmvilchsipdsxsh.supabase.co/storage/v1/object/public/room-types/room-types/5a1bb231216c44369c2288de36d7dd3d.webp',
        'https://vfeodqmvilchsipdsxsh.supabase.co/storage/v1/object/public/room-types/room-types/74cadd781683458da9527bea55580b8f.webp',
        'assets/photos/suite-deluxe.jpg'
      ],
      area: 25,
      capacity: '2 - 3 người lớn',
      bed: 'Giường đôi hoặc 2 giường đơn',
      view: 'Cửa sổ kính lớn ngắm sóng biển',
      floor: 'Tầng 1 Du thuyền Boutique',
      balcony: 'Cửa sổ kính view mặt biển',
      bath: 'Phòng tắm đứng vách kính riêng',
      price: 6318000,
      amenities: ['Gỗ tự nhiên 100%', 'Cửa sổ view biển', 'Điều hòa', 'Wifi', 'Bàn trang điểm', 'Két an toàn', 'Máy sấy tóc'],
      desc: 'Tọa lạc tại tầng 1 với không gian tĩnh lặng, sát mặt biển để bạn cảm nhận tiếng sóng vỗ êm đềm. Nội thất gỗ tinh xảo tạo cảm giác hoài niệm cổ điển đầy cuốn hút.'
    }
  ];

  // Tự động kết nối và đồng bộ theo thời gian thực từ Supabase Cloud (Dùng chung daiichitravel)
  const rawSbRooms = window.DT_DATA?.SUPABASE?.roomTypes || [];
  let customImgsMap = {};
  try {
    customImgsMap = JSON.parse(localStorage.getItem('dt_custom_cruise_imgs') || '{}');
  } catch (e) {}

  const enrichedSuites = ALL_SUITES.map(suite => {
    let matchedRt = null;
    const sid = suite.id;
    if (sid === 'royal') matchedRt = rawSbRooms.find(r => (r.name || '').toLowerCase().includes('royal'));
    else if (sid === 'family') matchedRt = rawSbRooms.find(r => (r.name || '').toLowerCase().includes('family') || (r.name || '').toLowerCase().includes('exec'));
    else if (sid === 'senior') matchedRt = rawSbRooms.find(r => (r.name || '').toLowerCase().includes('senior'));
    else if (sid === 'junior') matchedRt = rawSbRooms.find(r => (r.name || '').toLowerCase().includes('trip') || (r.name || '').toLowerCase().includes('junior'));
    else if (sid === 'btq-balcony') matchedRt = rawSbRooms.find(r => (r.name || '').toLowerCase().includes('balcony'));
    else if (sid === 'btq-deluxe') matchedRt = rawSbRooms.find(r => (r.name || '').toLowerCase().includes('deluxe'));

    const customImgs = customImgsMap[sid] || [];
    let livePrice = suite.price;
    let liveGallery = [...customImgs];

    if (matchedRt) {
      if (matchedRt.base_price) livePrice = matchedRt.base_price;
      if (matchedRt.images && matchedRt.images.length > 0) {
        liveGallery = [...liveGallery, ...matchedRt.images];
      }
    }

    if (liveGallery.length === 0) {
      liveGallery = suite.gallery;
    } else {
      liveGallery = Array.from(new Set(liveGallery));
    }

    return {
      ...suite,
      price: livePrice,
      img: liveGallery[0] || suite.img,
      gallery: liveGallery,
      area: (matchedRt && matchedRt.area_sqm) || suite.area,
      capacity: (matchedRt && matchedRt.capacity_adults) ? `${matchedRt.capacity_adults} người lớn` : suite.capacity,
    };
  });

  let filteredSuites = enrichedSuites;
  if (filter === 'luxury') filteredSuites = enrichedSuites.filter(s => s.shipId === 'luxury');
  if (filter === 'boutique') filteredSuites = enrichedSuites.filter(s => s.shipId === 'boutique');

  return (
    <section className="lux-suites-sec" id="suites" data-screen-label="Bộ Sưu Tập Phòng Suite">
      <div className="lux-suites-inner">
        <div className="lux-sec-header" style={{ marginBottom: 28 }}>
          <div className="lux-sec-kicker" style={{ color: '#FDE68A' }}>{LV('BỘ SƯU TẬP PHÒNG NGHỈ THƯỢNG LƯU', 'THE SUITE COLLECTION')}</div>
          <h2 className="lux-sec-title" style={{ color: '#FFFFFF' }}>{LV('Không Gian Nghỉ Dưỡng Sang Trọng & Riêng Tư', 'Private Balcony Suites & Handcrafted Wooden Cabins')}</h2>
          <p className="lux-sec-sub" style={{ color: 'rgba(255,255,255,0.78)' }}>
            {LV(
              '100% phòng nghỉ trên du thuyền đều có ban công riêng view biển, bồn tắm ngắm vịnh, cửa sổ kính toàn cảnh và hệ thống điều hòa 2 chiều hiện đại. Lướt mũi tên để xem đa góc chụp thực tế.',
              'Every cabin boasts private balconies, panoramic ocean views, bay-facing bathtubs and bespoke amenities. Use the mini-slider to preview multiple angles.'
            )}
          </p>
        </div>

        <div className="lux-suites-nav">
          <button className={'lux-suite-filter-btn' + (filter === 'all' ? ' active' : '')} onClick={() => setFilter('all')}>
            {LV('Tất Cả Hạng Phòng (6)', 'All Suites (6)')}
          </button>
          <button className={'lux-suite-filter-btn' + (filter === 'luxury' ? ' active' : '')} onClick={() => setFilter('luxury')}>
            {LV('Du thuyền 5★ Daiichi Luxury (30 Suite)', '5★ Daiichi Luxury Cruise (30 Suites)')}
          </button>
          <button className={'lux-suite-filter-btn' + (filter === 'boutique' ? ' active' : '')} onClick={() => setFilter('boutique')}>
            {LV('Du thuyền 4★ Daiichi Boutique (7 Cabin Gỗ Quý)', '4★ Daiichi Boutique Cruise (7 Cabins)')}
          </button>
        </div>

        <div className="lux-suites-grid">
          {filteredSuites.map((st) => (
            <SuiteCard key={st.id} st={st} onSelectRoom={onSelectRoom} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ADVANCED ROOM DETAIL MODAL WITH INTERACTIVE PRICE CALCULATOR
   ============================================================ */
function RoomDetailModal({ room, onClose }) {
  if (!room) return null;
  const [activeImg, setActiveImg] = useState(room.img);

  // Live calculator state
  const [nights, setNights] = useState('2d1n'); // '2d1n' | '3d2n'
  const [season, setSeason] = useState('low'); // 'low' | 'high'
  const [adults, setAdults] = useState(2); // 1 | 2 | 3
  const [children, setChildren] = useState(0); // 0 | 1 | 2
  const [childAge, setChildAge] = useState('under2'); // 'under2' | '2to4' | '5to10'
  const [transfer, setTransfer] = useState('limo'); // 'limo' | 'none'
  const [travelDate, setTravelDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });

  // Calculate pricing based on Supabase business logic
  const basePrice = room.price || 5000000;
  
  // Season multiplier (High season +15%)
  const seasonMult = season === 'high' ? 1.15 : 1.0;
  
  // Nights multiplier (3D2N is 1.85x)
  const nightsMult = nights === '3d2n' ? 1.85 : 1.0;

  // Occupancy base: 2 adults is standard (1.0x), 1 adult is 0.8x, 3 adults is 1.35x (extra bed)
  let occMult = 1.0;
  if (adults === 1) occMult = 0.8;
  if (adults === 3) occMult = 1.35;

  const roomTotal = Math.round(basePrice * seasonMult * nightsMult * occMult);

  // Child fee based on age rules from Supabase
  let childFee = 0;
  if (children > 0) {
    if (childAge === 'under2') childFee = 0; // free under 2
    else if (childAge === '2to4') childFee = Math.round(roomTotal * 0.25 * children);
    else if (childAge === '5to10') childFee = Math.round(roomTotal * 0.38 * children);
  }

  // Transfer fee: Limousine round-trip Hanoi ⇄ Boat (550.000đ/pax)
  const transferRate = 550000;
  const transferTotal = transfer === 'limo' ? ((adults + (children > 0 && childAge !== 'under2' ? children : 0)) * transferRate) : 0;

  const grandTotal = roomTotal + childFee + transferTotal;

  // Build deep link with all calculated parameters
  const bookingLink = `https://daiichitravel.com/?tab=cruise-tours&suite=${encodeURIComponent(room.id)}&nights=${nights}&season=${season}&adults=${adults}&children=${children}&transfer=${transfer}&date=${travelDate}&source=daiichicruise_calc`;

  return (
    <div className="lux-modal-backdrop" onClick={onClose}>
      <div className="lux-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="lux-modal-close" onClick={onClose} title="Đóng">✕</button>

        {/* Gallery with Thumbs */}
        <div className="lux-modal-gallery">
          <img src={activeImg} alt={room.name} />
          {room.gallery && room.gallery.length > 1 && (
            <div className="lux-modal-thumbs">
              {room.gallery.map((im, idx) => (
                <button
                  key={idx}
                  className={'lux-modal-thumb-btn' + (activeImg === im ? ' active' : '')}
                  onClick={() => setActiveImg(im)}
                >
                  <img src={im} alt="thumb" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lux-modal-content">
          <div className="lux-modal-header">
            <div>
              <span className="lux-room-ship-label">{room.shipName}</span>
              <h2 className="lux-modal-title">{room.name}</h2>
            </div>
            <div className="lux-modal-price">
              {room.price.toLocaleString('vi-VN')}đ<em>/đêm tiêu chuẩn 2 khách</em>
            </div>
          </div>

          <div className="lux-modal-specs">
            <div>
              <span style={{ fontSize: 11, color: '#64748B' }}>Diện tích</span>
              <b style={{ display: 'block', fontSize: 16, color: 'var(--navy)' }}>{room.area} m²</b>
            </div>
            <div>
              <span style={{ fontSize: 11, color: '#64748B' }}>Sức chứa</span>
              <b style={{ display: 'block', fontSize: 16, color: 'var(--navy)' }}>{room.capacity}</b>
            </div>
            <div>
              <span style={{ fontSize: 11, color: '#64748B' }}>Vị trí</span>
              <b style={{ display: 'block', fontSize: 16, color: 'var(--navy)' }}>{room.floor}</b>
            </div>
            <div>
              <span style={{ fontSize: 11, color: '#64748B' }}>Ban công</span>
              <b style={{ display: 'block', fontSize: 16, color: 'var(--navy)' }}>Ban công riêng view biển</b>
            </div>
          </div>

          <p style={{ fontSize: 14.5, color: '#475569', lineHeight: 1.7, marginBottom: 22 }}>
            {room.desc}
          </p>

          {/* ========================================================
              INTERACTIVE LIVE PRICE CALCULATOR
              ======================================================== */}
          <div className="lux-calc-section">
            <div className="lux-calc-head">
              <h3>
                <span>🧮</span> Bảng Tính Giá Tự Động Theo Yêu Cầu
              </h3>
              <span className="lux-calc-badge">⚡ Giá thời gian thực · Đã gồm VAT</span>
            </div>

            <div className="lux-calc-controls">
              <div className="lux-calc-field">
                <label>⏱ Gói hải trình</label>
                <select value={nights} onChange={(e) => setNights(e.target.value)}>
                  <option value="2d1n">2 Ngày 1 Đêm (2D1N)</option>
                  <option value="3d2n">3 Ngày 2 Đêm (3D2N)</option>
                </select>
              </div>

              <div className="lux-calc-field">
                <label>📅 Mùa du lịch</label>
                <select value={season} onChange={(e) => setSeason(e.target.value)}>
                  <option value="low">Mùa thường / Thấp điểm</option>
                  <option value="high">Mùa cao điểm hè (+15%)</option>
                </select>
              </div>

              <div className="lux-calc-field">
                <label>👥 Người lớn</label>
                <select value={adults} onChange={(e) => setAdults(+e.target.value)}>
                  <option value={1}>1 người lớn (Phòng đơn)</option>
                  <option value={2}>2 người lớn (Tiêu chuẩn)</option>
                  <option value={3}>3 người lớn (+Kê giường phụ)</option>
                </select>
              </div>

              <div className="lux-calc-field">
                <label>👶 Trẻ em đi kèm</label>
                <select value={children} onChange={(e) => setChildren(+e.target.value)}>
                  <option value={0}>Không có trẻ em</option>
                  <option value={1}>1 trẻ em</option>
                  <option value={2}>2 trẻ em</option>
                </select>
              </div>

              {children > 0 && (
                <div className="lux-calc-field">
                  <label>🎂 Độ tuổi trẻ em</label>
                  <select value={childAge} onChange={(e) => setChildAge(e.target.value)}>
                    <option value="under2">Dưới 2 tuổi (Miễn phí 100%)</option>
                    <option value="2to4">Từ 2 – 4 tuổi (50% giá)</option>
                    <option value="5to10">Từ 5 – 10 tuổi (75% giá)</option>
                  </select>
                </div>
              )}

              <div className="lux-calc-field">
                <label>📆 Ngày khởi hành dự kiến</label>
                <input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} />
              </div>
            </div>

            {/* Transfer Option */}
            <div style={{ marginBottom: 8 }}>
              <label style={{ fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: '#64748B', display: 'block', marginBottom: 8 }}>
                🚐 Phương án đưa đón khách:
              </label>
              <div className="lux-transfer-radios">
                <div
                  className={'lux-transfer-option' + (transfer === 'limo' ? ' selected' : '')}
                  onClick={() => setTransfer('limo')}
                >
                  <input type="radio" checked={transfer === 'limo'} onChange={() => setTransfer('limo')} />
                  <div>
                    <b>Phương án B: Kèm xe Limousine đưa đón 2 chiều (+550.000đ/khách)</b>
                    <span>Đón trả tận nơi tại Phố Cổ Hà Nội thẳng đến cảng du thuyền và chiều ngược lại.</span>
                  </div>
                </div>

                <div
                  className={'lux-transfer-option' + (transfer === 'none' ? ' selected' : '')}
                  onClick={() => setTransfer('none')}
                >
                  <input type="radio" checked={transfer === 'none'} onChange={() => setTransfer('none')} />
                  <div>
                    <b>Phương án A: Khách tự túc di chuyển đến cảng (+0đ)</b>
                    <span>Check-in lúc 12:00 tại Cảng tàu Cát Bà / Tuần Châu.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculation Result */}
            <div className="lux-calc-result-box">
              <div className="lux-calc-breakdown">
                <span>• Phòng {room.name} ({nights === '2d1n' ? '2N1Đ' : '3N2Đ'} · {adults} người lớn): <b>{roomTotal.toLocaleString('vi-VN')}đ</b></span>
                {children > 0 && (
                  <span>• Phụ thu {children} trẻ em ({childAge === 'under2' ? 'dưới 2 tuổi miễn phí' : childAge === '2to4' ? '2-4 tuổi' : '5-10 tuổi'}): <b>{childFee.toLocaleString('vi-VN')}đ</b></span>
                )}
                {transfer === 'limo' && (
                  <span>• Xe Limousine 2 chiều Hà Nội ({adults + (children > 0 && childAge !== 'under2' ? children : 0)} vé): <b>{transferTotal.toLocaleString('vi-VN')}đ</b></span>
                )}
              </div>

              <div className="lux-calc-total-wrap">
                <span className="lux-calc-total-label">Tổng Chi Phí Trọn Gói Dự Kiến</span>
                <div className="lux-calc-total-amount">
                  {grandTotal.toLocaleString('vi-VN')}đ<em>(Đã gồm VAT)</em>
                </div>
              </div>
            </div>
          </div>

          {/* Children Policy */}
          <div className="lux-child-policy-sec">
            <h4 className="lux-child-policy-title">
              <span>👶</span> Chính Sách Trẻ Em & Giường Phụ (Theo chuẩn Supabase)
            </h4>
            <div className="lux-child-policy-grid">
              <div className="lux-child-policy-chip">
                <b>Trẻ em dưới 2 tuổi</b>
                <span>Miễn phí 100%</span> (Tối đa 1 trẻ/phòng, ngủ chung bố mẹ)
              </div>
              <div className="lux-child-policy-chip">
                <b>Trẻ em từ 2 – 4 tuổi</b>
                <span>Phụ thu 50%</span> (Ăn suất riêng, ngủ chung với bố mẹ)
              </div>
              <div className="lux-child-policy-chip">
                <b>Trẻ em từ 5 – 10 tuổi</b>
                <span>Phụ thu 75%</span> (Kê giường phụ hoặc suất tiêu chuẩn)
              </div>
              <div className="lux-child-policy-chip">
                <b>Trẻ em từ 11 tuổi trở lên</b>
                <span>Tính 100%</span> (Tính như người lớn)
              </div>
            </div>
          </div>

          {/* Amenities & Inclusions */}
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>
              Dịch vụ & Tiện nghi trọn gói trong giá phòng:
            </h4>
            <div className="lux-modal-amenities-grid">
              {[
                'Trọn gói các bữa ăn hải sản cao cấp theo hải trình',
                'Thuyền kayak hoặc thuyền nan chèo hang Sáng Tối',
                'Vé tham quan thắng cảnh Vịnh Lan Hạ & Làng Việt Hải',
                'Bể sục Jacuzzi nước ấm bốn mùa trên sundeck',
                'Cầu kính Skywalk ngắm toàn cảnh vịnh biển',
                'Tiệc trà Sunset Party chiều & đồ uống chào mừng',
                'Lớp học Thái Cực Quyền (Taichi) đón bình minh',
                'Trải nghiệm câu mực đêm cùng thuyền viên',
                'Bảo hiểm du lịch trọn gói trên vịnh'
              ].map((item, idx) => (
                <div key={idx} className="lux-modal-amenity-item">
                  <span style={{ color: 'var(--lux-gold-pure)', fontWeight: 800 }}>✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="lux-modal-actions">
            <button className="lux-btn-outline" onClick={onClose}>
              Đóng lại
            </button>
            <a className="lux-submit-btn" style={{ textDecoration: 'none', padding: '12px 26px' }} href={bookingLink} target="_blank" rel="noopener">
              Đặt Ngay Với Cấu Hình Này ({grandTotal.toLocaleString('vi-VN')}đ) →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function CruiseHighlightsSection() {
  const HIGHLIGHTS = [
    {
      icon: '🌉',
      title: LV('Cầu Kính Skywalk Độc Nhất Vịnh Lan Hạ', 'Exclusive Ocean Glass Skywalk'),
      desc: LV(
        'Check-in giữa không trung trên cây cầu kính vươn dài ra mặt vịnh. Trải nghiệm bước chân trên làn nước biển trong vắt với khung cảnh núi đá vôi kỳ vĩ xung quanh.',
        'Walk on air above the turquoise sea with our panoramic glass skywalk stretching over the bay — an extraordinary photo opportunity.'
      )
    },
    {
      icon: '♨️',
      title: LV('Bể Sục Jacuzzi Nước Ấm Bốn Mùa', 'Four-Season Bay-View Jacuzzi'),
      desc: LV(
        'Bể sục Jacuzzi ngoài trời trên boong thượng. Thư giãn ngâm mình trong làn nước ấm áp, nhâm nhi ly cocktail và ngắm hoàng hôn rực rỡ buông xuống vịnh.',
        'Outdoor heated jacuzzi on the sundeck. Soak into warm bubbling waters with a signature cocktail while watching the mesmerizing sunset.'
      )
    },
    {
      icon: '🌅',
      title: LV('100% Suite Có Ban Công Riêng Biệt', '100% Private Balcony Suites'),
      desc: LV(
        'Mỗi phòng nghỉ đều có ban công riêng hướng thẳng ra kỳ quan vịnh Lan Hạ. Thức giấc đón những tia nắng đầu tiên và làn gió biển tươi mát ngay từ giường ngủ.',
        'Every single suite opens up to a private balcony facing the bay. Wake up to fresh sea breezes and sunrise over the emerald karsts.'
      )
    },
    {
      icon: '🍽️',
      title: LV('Nhà Hàng Kính Fine-Dining & Sky Bar', 'Glass Fine-Dining & 360° Sky Bar'),
      desc: LV(
        'Thưởng thức hải sản tươi sống Cát Bà (cua, tu hài, bề bề) cùng set menu Á - Âu sang trọng trong không gian nhà hàng kính tràn ngập view vịnh biển.',
        'Indulge in fresh Cat Ba seafood and fine-dining cuisine surrounded by floor-to-ceiling glass windows and panoramic bay views.'
      )
    },
    {
      icon: '🛶',
      title: LV('Chèo Kayak Hang Sáng Tối & Làng Việt Hải', 'Kayak Sea Caves & Viet Hai Village'),
      desc: LV(
        'Tự tay chèo thuyền kayak len lỏi qua vòm hang thạch nhũ kỳ bí, tắm biển tại bãi Ba Trái Đào hoang sơ và đạp xe xuyên thung lũng cổ tích làng Việt Hải.',
        'Glide through mystical sea caverns, swim in secluded white-sand lagoons, and cycle through the untouched valley of Viet Hai village.'
      )
    },
    {
      icon: '🚐',
      title: LV('Hệ Sinh Thái Đưa Đón Limousine Tận Nhà', 'Seamless Limousine Transfers'),
      desc: LV(
        'Xe Limousine đời mới đón tận nơi tại Phố Cổ Hà Nội, đưa thẳng đến bến tàu du thuyền. Hành trình trọn vẹn, thuận tiện và an tâm tuyệt đối từ cửa nhà bạn.',
        'Luxury limousine pickup right from your Hanoi hotel doorstep straight to the embarkation lounge — seamless, punctual, worry-free.'
      )
    }
  ];

  return (
    <section className="lux-highlights-sec" id="highlights" data-screen-label="Điểm Vượt Trội">
      <div className="lux-sec-header">
        <div className="lux-sec-kicker">{LV('ĐẶC QUYỀN ĐỈNG CAO', 'EXCLUSIVE PRIVILEGES')}</div>
        <h2 className="lux-sec-title">{LV('Vì Sao Chọn Daiichi Cruise?', 'Why Cruise with Daiichi?')}</h2>
        <p className="lux-sec-sub">
          {LV(
            'Hơn cả một chuyến tham quan, Daiichi Cruise kiến tạo hành trình nghỉ dưỡng đầy cảm xúc với những tiện ích độc quyền chưa từng có trên vịnh Lan Hạ.',
            'Beyond an ordinary cruise, Daiichi creates a high-end emotional voyage backed by unique amenities and genuine Vietnamese hospitality.'
          )}
        </p>
      </div>

      <div className="lux-hl-grid">
        {HIGHLIGHTS.map((hl, i) => (
          <div key={i} className="lux-hl-card">
            <div className="lux-hl-icon">{hl.icon}</div>
            <div className="lux-hl-text">
              <h4>{hl.title}</h4>
              <p>{hl.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 4: ITINERARY INTERACTIVE TIMELINE (2D1N & 3D2N)
   ============================================================ */
function CruiseItinerarySection() {
  const [itin, setItin] = useState('2d1n');

  const ITIN_2D1N = [
    { time: '12:00 – 12:30', title: LV('Chào đón lên tàu & Check-in', 'Welcome Aboard & Check-in'), desc: LV('Thưởng thức đồ uống chào mừng Welcome Drink, nghe giới thiệu hải trình và nhận phòng suite sang trọng có ban công riêng.', 'Enjoy welcome drinks, cruise orientation and check into your private balcony suite.') },
    { time: '13:00 – 14:15', title: LV('Ăn trưa Fine Dining ngắm vịnh', 'Panoramic Bay Lunch'), desc: LV('Thưởng thức bữa trưa thịnh soạn với các món hải sản tươi sống trong khi du thuyền lướt êm đềm qua Hòn Rùa, Làng Chài Cái Bèo.', 'Savor a fine seafood lunch as the ship glides past Turtle Islet and the ancient floating village of Cai Beo.') },
    { time: '14:45 – 16:30', title: LV('Chèo Kayak & Tắm biển Ba Trái Đào', 'Kayaking & Swimming at Ba Trai Dao'), desc: LV('Khám phá làn nước ngọc bích, chèo kayak qua các hang hốc tự nhiên và đắm mình trong làn nước biển trong vắt.', 'Paddle kayaks into untouched lagoons and swim off secluded white-sand beaches.') },
    { time: '17:00 – 18:30', title: LV('Tiệc trà Sunset Party & Ngâm bồn Jacuzzi', 'Sunset Party & Sundeck Jacuzzi'), desc: LV('Ngắm hoàng hôn tráng lệ buông xuống trên sundeck với tiệc trà chiều, hoa quả tươi miễn phí và thư giãn trong bồn sục nước ấm.', 'Complimentary tea, wine and fresh fruits at the sunset party, combined with warm jacuzzi relaxation.') },
    { time: '19:15 – 21:00', title: LV('Bữa tối lãng mạn & Ẩm thực 5 sao', 'Gourmet Dinner Experience'), desc: LV('Thưởng thức set menu đẳng cấp trong ánh đèn ấm cúng của nhà hàng kính nhìn ra vịnh đêm tĩnh lặng.', 'Dine on exquisite seasonal delicacies prepared by our master chefs.') },
    { time: '21:00 – 23:00', title: LV('Câu mực đêm, Sky Bar & Nghỉ ngơi', 'Squid Fishing & Starlit Sky Bar'), desc: LV('Thử tài câu mực cùng thuyền viên, thưởng thức đồ uống tại Sky Bar hoặc thư giãn ngắm sao trời trên ban công riêng.', 'Try squid fishing from the tender, sip craft cocktails under starry skies or unwind on your private balcony.') },
    { time: '06:15 – 07:00', title: LV('Thái Cực Quyền (Taichi) đón bình minh', 'Sunrise Taichi Session'), desc: LV('Khởi đầu ngày mới tràn đầy năng lượng với bài tập Taichi trên sundeck khi bình minh ló rạng trên mặt vịnh.', 'Greet the morning sun with a rejuvenating Taichi class on the panoramic sundeck.') },
    { time: '07:45 – 09:30', title: LV('Khám phá Làng cổ Việt Hải', 'Explore Ancient Viet Hai Village'), desc: LV('Đi xe điện hoặc đạp xe qua đường hầm xuyên núi vào ngôi làng cổ nằm giữa thung lũng rừng quốc gia Cát Bà.', 'Ride bicycles or electric cars into the secluded heritage village tucked inside Cat Ba National Park.') },
    { time: '10:00 – 11:30', title: LV('Bữa Brunch sớm & Tàu cập bến', 'Farewell Brunch & Disembarkation'), desc: LV('Thưởng thức bữa trưa sớm Buffet trong khi tàu quay về bến. Xe Limousine đón bạn về lại Hà Nội an toàn.', 'Enjoy a buffet brunch as the ship returns to the harbor. Limousine transfers ready for your journey back.') }
  ];

  const ITIN_3D2N = [
    { time: 'Ngày 1 (Day 1)', title: LV('Khởi hành – Check-in – Kayak & Hoàng hôn', 'Embarkation – Kayak & Sunset Party'), desc: LV('Hành trình ngày đầu trọn vẹn với welcome drink, ăn trưa ngắm vịnh, chèo kayak, tiệc trà hoàng hôn và bữa tối lãng mạn.', 'Complete first-day highlights: lunch, kayaking, sunset sundeck party and fine dining.') },
    { time: 'Ngày 2 (Day 2)', title: LV('Khám phá sâu Vịnh Lan Hạ bằng tàu ngày cao cấp', 'Full-Day Exploration by Day Tender'), desc: LV('Chuyển sang tàu chuyên dụng đưa bạn đến Hang Sáng Tối, bãi tắm hoang sơ bí ẩn, đạp xe làng Việt Hải và thưởng thức bữa trưa riêng biệt giữa vịnh.', 'Transfer to our day boat to explore the mystical Light & Dark caves, secret lagoons, cycling and a private bay lunch.') },
    { time: 'Ngày 3 (Day 3)', title: LV('Taichi bình minh – Check-out – Xe Limousine về Hà Nội', 'Sunrise Taichi – Farewell Brunch – Return'), desc: LV('Tập Taichi sáng sớm, thưởng thức buffet brunch thịnh soạn trước khi cập cảng và lên xe Limousine về Hà Nội.', 'Morning Taichi, farewell buffet brunch, disembarkation and seamless limousine ride home.') }
  ];

  const currentTimeline = itin === '2d1n' ? ITIN_2D1N : ITIN_3D2N;

  return (
    <section className="lux-itin-sec" id="itinerary" data-screen-label="Hải Trình Nghỉ Dưỡng">
      <div className="lux-itin-inner">
        <div className="lux-sec-header">
          <div className="lux-sec-kicker">{LV('LỊCH TRÌNH CHI TIẾT', 'CURATED ITINERARIES')}</div>
          <h2 className="lux-sec-title">{LV('Hải Trình Trọn Vẹn Cảm Xúc', 'Your Voyage Through the Wonders')}</h2>
          <p className="lux-sec-sub">
            {LV(
              'Được thiết kế tỉ mỉ cân bằng giữa nghỉ dưỡng thư thái và các hoạt động trải nghiệm thiên nhiên đặc sắc nhất vịnh Lan Hạ.',
              'Thoughtfully balanced between blissful leisure and thrilling natural excursions.'
            )}
          </p>
        </div>

        <div className="lux-itin-tabs">
          <button className={'lux-itin-tab' + (itin === '2d1n' ? ' active' : '')} onClick={() => setItin('2d1n')}>
            ⚓ {LV('Hải trình 2 Ngày 1 Đêm (2D1N) — Phổ biến nhất', '2 Days 1 Night (2D1N) — Most Popular')}
          </button>
          <button className={'lux-itin-tab' + (itin === '3d2n' ? ' active' : '')} onClick={() => setItin('3d2n')}>
            🌟 {LV('Hải trình 3 Ngày 2 Đêm (3D2N) — Trải nghiệm sâu', '3 Days 2 Nights (3D2N) — Deep Immersion')}
          </button>
        </div>

        <div className="lux-timeline">
          {currentTimeline.map((step, idx) => (
            <div key={idx} className="lux-timeline-node">
              <span className="lux-time-badge">⏱ {step.time}</span>
              <h4 className="lux-timeline-title">{step.title}</h4>
              <p className="lux-timeline-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 5: DAY CRUISES & COMBO TOURS
   ============================================================ */
function DayCruisesHighlightSection() {
  const DAY_TOURS = [
    {
      id: 'vip1',
      code: 'VIP 1',
      name: LV('Tour 1 Ngày Lan Hạ – Làng Việt Hải', 'Lan Ha – Viet Hai Full-Day (VIP 1)'),
      time: '08:00 – 16:30',
      boat: LV('Tàu sắt 48 chỗ hiện đại', '48-pax Steel Boat'),
      price: 720000,
      img: 'assets/photos/daycruise-1.jpg',
      perks: LV('Ăn trưa hải sản · Đạp xe Việt Hải · Kayak', 'Seafood Lunch · Cycling · Kayak')
    },
    {
      id: 'sunset',
      code: 'SUNSET TEA',
      name: LV('Tour Hoàng Hôn Lan Hạ & Tiệc Trà Chiều', 'Lan Ha Sunset Cruise & Tea Party'),
      time: '15:30 – 18:45',
      boat: LV('Tàu 2 tầng ngắm vịnh', '2-Deck Panoramic Boat'),
      price: 430000,
      img: 'assets/photos/daycruise-2.jpg',
      perks: LV('Tiệc trà bánh · Ngắm hoàng hôn vàng', 'Sunset Tea & Fruits · Golden Hour')
    },
    {
      id: 'dinner',
      code: 'DINNER DJ',
      name: LV('Dinner Cruise DJ & Pháo Hoa Lan Hạ', 'Dinner Cruise DJ & Fireworks Show'),
      time: '17:30 – 21:30',
      boat: LV('Du thuyền 5★ 99 chỗ', '5★ 99-pax Ship'),
      price: 850000,
      img: 'assets/photos/daycruise-4.jpg',
      perks: LV('Ăn tối lãng mạn · Nhạc DJ · Pháo hoa', 'Seafood Dinner · Live DJ · Fireworks')
    },
    {
      id: 'combo1',
      code: 'COMBO ALL-IN',
      name: LV('Combo Xe Đón Hà Nội + Du Thuyền Ngày', 'All-in Hanoi Limousine + Day Cruise'),
      time: '06:00 – 20:30',
      boat: LV('Xe Limousine + Du thuyền', 'Limousine + Cruise'),
      price: 1250000,
      img: 'assets/photos/daycruise-act-1.jpg',
      perks: LV('Đón trả phố cổ Hà Nội · Trọn gói 1 ngày', 'Hanoi Pickup & Return · Full Day')
    }
  ];

  return (
    <section className="lux-duo-sec" id="day-cruises" data-screen-label="Du Thuyền Ngày">
      <div className="lux-sec-header">
        <div className="lux-sec-kicker">{LV('TRẢI NGHIỆM TRONG NGÀY', 'DAYTIME VOYAGES')}</div>
        <h2 className="lux-sec-title">{LV('Du Thuyền Ngày Lan Hạ & Tour Trọn Gói', 'Lan Ha Day Cruises & Day Packages')}</h2>
        <p className="lux-sec-sub">
          {LV(
            'Dành cho du khách muốn khám phá trọn vẹn vẻ đẹp vịnh Lan Hạ với thời gian linh hoạt trong ngày. Khởi hành đều đặn mỗi sáng và chiều.',
            'Perfect for travelers with limited time seeking the finest day cruise experiences, sunset tea parties and dinner spectacles.'
          )}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
        {DAY_TOURS.map((t) => (
          <a key={t.id} className="lux-ship-card" href="https://daiichitravel.com/?tab=tours&category=TOUR_SHORT" target="_blank" rel="noopener" style={{ textDecoration: 'none' }}>
            <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
              <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
              <span style={{ position: 'absolute', top: 12, left: 12, background: 'var(--navy)', color: '#FDE68A', fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 6 }}>
                {t.code}
              </span>
            </div>
            <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--navy)', margin: '0 0 6px', lineHeight: 1.35 }}>{t.name}</h3>
              <div style={{ fontSize: 12.5, color: '#64748B', marginBottom: 10 }}>⏱ {t.time} · {t.boat}</div>
              <div style={{ fontSize: 12, color: '#047857', fontWeight: 600, marginBottom: 14 }}>{t.perks}</div>
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: 12 }}>
                <div>
                  <span style={{ fontSize: 11, color: '#64748B' }}>{LV('Giá từ', 'From')}</span>
                  <b style={{ color: 'var(--lux-red)', fontSize: 18, display: 'block' }}>{t.price.toLocaleString('vi-VN')}đ</b>
                </div>
                <span style={{ background: 'var(--lux-gold-grad)', color: '#111E2E', padding: '7px 14px', borderRadius: 8, fontSize: 12.5, fontWeight: 800 }}>
                  {LV('Đặt ngay →', 'Book →')}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   SECTION 6: LIMOUSINE TRANSFERS (CONCIERGE ADD-ON)
   ============================================================ */
function LimousineConciergeSection() {
  const ROUTES = [
    { from: 'Hà Nội (Phố Cổ / Nội Bài)', to: 'Cát Bà (Bến tàu Du thuyền)', time: '3h00', price: 250000, desc: 'Xe Limousine + Tàu cao tốc qua đảo' },
    { from: 'Hà Nội', to: 'Hải Phòng', time: '1h45', price: 140000, desc: 'Đón trả tận nơi nội thành' },
    { from: 'Ninh Bình (Tràng An / Tam Cốc)', to: 'Cát Bà', time: '3h30', price: 250000, desc: 'Xe Limousine đón tại khách sạn' },
    { from: 'Hạ Long (Tuần Châu / Bãi Cháy)', to: 'Cát Bà', time: '1h30', price: 280000, desc: 'Kết nối 2 vịnh di sản' },
  ];

  return (
    <section className="lux-duo-sec" id="limousine" data-screen-label="Xe Limousine Đưa Đón">
      <div style={{ background: '#FFFFFF', borderRadius: 20, padding: '36px 32px', border: '1px solid #E2E8F0', boxShadow: '0 8px 30px rgba(0,0,0,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 14 }}>
          <div>
            <div className="lux-sec-kicker" style={{ textAlign: 'left' }}>DAIICHI LIMOUSINE CONCIERGE</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--navy)', margin: '4px 0 0' }}>
              {LV('Dịch Vụ Xe Limousine Đưa Đón Tận Nơi Đến Du Thuyền', 'Luxury Limousine Transfers Straight to Your Cruise')}
            </h3>
          </div>
          <span style={{ fontSize: 13, color: '#16A34A', fontWeight: 700, background: '#DCFCE7', padding: '6px 14px', borderRadius: 20 }}>
            ✓ {LV('Đón trả tận nơi Phố Cổ Hà Nội · Giá đã gồm VAT', 'Old Quarter Hotel Pickup · Official Rates')}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {ROUTES.map((r, i) => (
            <a key={i} href={`https://daiichitravel.com/?tab=book-ticket&from=${encodeURIComponent(r.from)}&to=${encodeURIComponent(r.to)}`} target="_blank" rel="noopener" style={{ background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 14, padding: '16px 18px', textDecoration: 'none', transition: 'all .2s' }}>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>
                {r.from} → {r.to}
              </div>
              <div style={{ fontSize: 12, color: '#64748B', marginBottom: 10 }}>⏱ {r.time} · {r.desc}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 11, color: '#64748B' }}>{LV('Giá chỉ từ', 'From')}</span>
                <b style={{ color: 'var(--lux-red)', fontSize: 16 }}>{r.price.toLocaleString('vi-VN')}đ<em style={{ fontSize: 11, fontStyle: 'normal', color: '#64748B', marginLeft: 3 }}>/khách</em></b>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ROOM DETAIL POPUP MODAL COMPONENT
   ============================================================ */


/* ============================================================
   MAIN UNIFIED CRUISE HOMEPAGE
   ============================================================ */
function OneHome() {
  const [, force] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const onLang = () => force((x) => x + 1);
    const onSync = () => force((x) => x + 1);
    window.addEventListener('dt:lang', onLang);
    window.addEventListener('dt:supabase_synced', onSync);
    window.addEventListener('storage', onLang);
    return () => {
      window.removeEventListener('dt:lang', onLang);
      window.removeEventListener('dt:supabase_synced', onSync);
      window.removeEventListener('storage', onLang);
    };
  }, []);

  return (
    <React.Fragment>
      {/* HEADER */}
      <header className="on-header">
        <div className="on-header-in" style={{ position: 'relative' }}>
          <a className="on-logo" href="#" style={{ textDecoration: 'none', color: '#fff' }}>
            <img src="assets/brand/logo-DaiichiTravel.webp" alt="Daiichi Cruise" />
            <b>DAIICHI <em>CRUISE</em></b>
          </a>
          <nav className="on-nav">
            <a href="#fleet">{T('nav_luxury')}</a>
            <a href="#boutique-cruise">{T('nav_boutique')}</a>
            <a href="#suites">{T('nav_suites')}</a>
            <a href="#highlights">{T('nav_highlights')}</a>
            <a href="#itinerary">{T('nav_itinerary')}</a>
            <a href="#day-cruises">{T('nav_day')}</a>
            <a href="#limousine">{T('nav_limo')}</a>
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
            <a className="on-cta" href="https://daiichitravel.com/?tab=cruise-tours" target="_blank" rel="noopener" style={{ background: 'var(--lux-gold-grad)', color: '#111E2E', fontWeight: 800 }}>
              {T('cta_book')}
            </a>
            <button className="on-burger" aria-label="menu" onClick={() => setMenuOpen(!menuOpen)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {menuOpen ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
          {menuOpen && (
            <div className="on-mobile-menu" onClick={() => setMenuOpen(false)}>
              <a href="#fleet">{T('nav_luxury')}</a>
              <a href="#boutique-cruise">{T('nav_boutique')}</a>
              <a href="#suites">{T('nav_suites')}</a>
              <a href="#highlights">{T('nav_highlights')}</a>
              <a href="#itinerary">{T('nav_itinerary')}</a>
              <a href="#day-cruises">{T('nav_day')}</a>
              <a href="#limousine">{T('nav_limo')}</a>
              <a href="https://daiichitravel.com/?tab=my-tickets" target="_blank" rel="noopener">{I18N.t('nav_mybooking')}</a>
            </div>
          )}
        </div>
      </header>

      {/* LUXURY HERO BANNER */}
      <div className="lux-hero" data-screen-label="Hero Du Thuyền Luxury">
        <div className="lux-hero-bg" style={{ backgroundImage: `url(assets/photos/luxury-1.jpg)` }}></div>
        <div className="lux-hero-overlay"></div>
        <div className="lux-hero-content">
          <div className="lux-badge-gold">
            ★ {T('hero_k')} ★
          </div>
          <h1 className="lux-hero-title">
            {LV('Tuyệt Tác Du Thuyền Luxury & Boutique', 'Masterpiece Luxury & Boutique Cruises')} <br />
            <em>{LV('Giữa Kỳ Quan Vịnh Lan Hạ', 'In Lan Ha Bay')}</em>
          </h1>
          <p className="lux-hero-desc">
            {T('hero_p')}
          </p>

          <div className="lux-hero-highlights">
            <span className="lux-hl-item"><span className="icon">💎</span> {LV('100% Suite Ban Công Riêng', '100% Balcony Suites')}</span>
            <span className="lux-hl-item"><span className="icon">🌉</span> {LV('Cầu Kính Skywalk Độc Nhất', 'Ocean Glass Skywalk')}</span>
            <span className="lux-hl-item"><span className="icon">♨️</span> {LV('Bể Sục Jacuzzi Bốn Mùa', 'Heated Jacuzzi')}</span>
            <span className="lux-hl-item"><span className="icon">🍽️</span> {LV('Ẩm Thực Fine Dining 5★', 'Fine Dining Gastronomy')}</span>
            <span className="lux-hl-item"><span className="icon">🚐</span> {LV('Limousine Đón Trả Tận Cửa', 'Door-to-Door Limousine')}</span>
          </div>
        </div>
      </div>

      {/* SEARCH BOX (CRUISE FIRST) */}
      <div style={{ maxWidth: 1120, margin: '-90px auto 0', padding: '0 24px', position: 'relative', zIndex: 30 }}>
        <CruiseHomeSearch />
      </div>

      {/* SECTION 1: THE TWO ICONIC SHIPS */}
      <FlagshipShipsSection />

      {/* SECTION 2: SUITE COLLECTION SHOWCASE */}
      <SuiteCollectionSection onSelectRoom={(room) => setSelectedRoom(room)} />

      {/* SECTION 3: 6 EXCLUSIVE SIGNATURE HIGHLIGHTS */}
      <CruiseHighlightsSection />

      {/* SECTION 4: ITINERARY INTERACTIVE TIMELINE */}
      <CruiseItinerarySection />

      {/* SECTION 5: DAY CRUISES & COMBO TOURS */}
      <DayCruisesHighlightSection />

      {/* SECTION 6: LIMOUSINE CONCIERGE */}
      <LimousineConciergeSection />

      {/* LIVE DEALS & CAMPAIGNS */}
      <div style={{ maxWidth: 1240, margin: '60px auto 0', padding: '0 24px' }}>
        <div style={{ background: 'linear-gradient(135deg, #102A43 0%, #06182C 100%)', borderRadius: 20, padding: '30px 36px', color: '#fff', border: '1px solid rgba(212,166,72,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <div style={{ color: 'var(--lux-gold-pure)', fontSize: 12, fontWeight: 800, letterSpacing: '.16em', textTransform: 'uppercase', marginBottom: 4 }}>
              ƯU ĐÃI ĐỘC QUYỀN TRỰC TUYẾN 2026
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, margin: '0 0 6px' }}>
              Đặt Trước 30 Ngày — Giảm Ngay 12% Cho Tất Cả Hạng Suite
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: 0 }}>
              Áp dụng mã <b>EARLYBIRD12</b> khi thanh toán trực tuyến. Tặng kèm voucher đồ uống và set chèo thuyền kayak miễn phí.
            </p>
          </div>
          <a className="lux-submit-btn" style={{ textDecoration: 'none' }} href="https://daiichitravel.com/?tab=cruise-tours" target="_blank" rel="noopener">
            Săn Ưu Đãi Ngay →
          </a>
        </div>
      </div>

      {/* TRUST ROW */}
      <div style={{ maxWidth: 1240, margin: '48px auto 0', padding: '0 24px' }}>
        <div className="on-trust">
          {[
            ['⚡', I18N.t('confirm_instant'), LV('Xác nhận tức thì · Giữ chỗ ngay khi thanh toán online.', 'Instant confirmation · Guaranteed booking online.')],
            ['🛡️', I18N.t('free_cancel'), LV('Chính sách hoàn huỷ minh bạch · Không phí ẩn · Đã gồm VAT.', 'Transparent cancellation · No hidden fees · VAT included.')],
            ['🍽️', LV('Ẩm thực trọn gói', 'All-inclusive meals'), LV('Trọn gói các bữa ăn hải sản cao cấp theo từng hải trình.', 'Gourmet seafood meals included per itinerary.')],
            ['💬', I18N.t('support_247'), LV('Hỗ trợ 24/7 bằng 6 thứ tiếng: Việt, Anh, Nhật, Hàn, Trung, Pháp.', '24/7 Concierge support in 6 languages.')],
          ].map(([ic, b, s], i) => (
            <div key={i} className="on-trust-it" style={{ border: '1px solid rgba(212,166,72,0.25)', borderRadius: 14 }}>
              <span className="ic" style={{ background: 'rgba(212,166,72,0.15)', color: 'var(--lux-gold-dark)' }}>{ic}</span>
              <span><b style={{ color: 'var(--navy)' }}>{b}</b><span style={{ display: 'block' }}>{s}</span></span>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="on-footer" style={{ marginTop: 72 }}>
        <div className="on-footer-in">
          <div className="on-footer-grid">
            <div>
              <h4>DAIICHI CRUISE — DAIICHI TRAVEL</h4>
              <ul>
                <li>{I18N.t('footer_co')}</li>
                <li><b>Hotline 24/7:</b> <a href="tel:19009070" style={{ color: 'var(--gold-bright)' }}>1900 9070</a></li>
                <li><b>Zalo hỗ trợ:</b> <a href="https://zalo.me/0961004709" target="_blank" rel="noopener" style={{ color: '#60A5FA' }}>0961 004 709</a></li>
                <li><b>Email:</b> <a href="mailto:sale@daiichitravel.com">sale@daiichitravel.com</a></li>
                <li><b>Văn phòng:</b> 217 đường 1/4, Cát Bà, Hải Phòng</li>
                <li><b>Đặt vé chính thức:</b> <a href="https://daiichitravel.com" target="_blank" rel="noopener" style={{ color: 'var(--gold-bright)' }}>daiichitravel.com</a></li>
              </ul>
            </div>
            <div>
              <h4>HẠM ĐỘI DU THUYỀN</h4>
              <ul>
                <li><a href="#fleet">Daiichi Luxury Cruise 5★</a></li>
                <li><a href="#boutique-cruise">Daiichi Boutique Cruise 4★</a></li>
                <li><a href="#suites">30 Hạng phòng Suite</a></li>
                <li><a href="#day-cruises">Du thuyền ngày Lan Hạ</a></li>
                <li><a href="#itinerary">Hải trình 2N1Đ & 3N2Đ</a></li>
              </ul>
            </div>
            <div>
              <h4>ĐIỂM ĐẾN & CẨM NANG</h4>
              <ul>
                <li><a href="seo/vi/du-thuyen-ngu-dem-lan-ha.html">Du thuyền ngủ đêm Lan Hạ</a></li>
                <li><a href="/vi/du-thuyen-ngay-vinh-lan-ha">Du thuyền ngày Lan Hạ</a></li>
                <li><a href="/vi/xe-ha-noi-di-cat-ba">Xe Hà Nội đi Cát Bà</a></li>
                <li><a href="/vi/xe-cat-ba-ve-ha-noi">Xe Cát Bà về Hà Nội</a></li>
              </ul>
            </div>
            <div>
              <h4>DỊCH VỤ LIÊN KẾT</h4>
              <ul>
                <li><a href="#limousine">Xe Limousine đưa đón</a></li>
                <li><a href="https://daiichitravel.com/?tab=tours">Tour chèo SUP & Lặn biển</a></li>
                <li><a href="mailto:partner@daiichitravel.vn">Hợp tác đại lý & đối tác</a></li>
              </ul>
            </div>
            <div>
              <h4>CỔNG LÀM VIỆC</h4>
              <ul>
                <li><a href="https://daiichitravel.com/?tab=my-tickets" target="_blank" rel="noopener">{I18N.t('nav_mybooking')}</a></li>
                <li><a href="https://daiichitravel.com" target="_blank" rel="noopener">Daiichi Travel Portal</a></li>
                <li><a href="admin/cruise-manager.html" target="_blank" rel="noopener" style={{ color: 'var(--gold-bright)', fontWeight: 700 }}>⚙️ Quản lý Tàu & Giá (Admin Sync)</a></li>
              </ul>
            </div>
          </div>
          <div className="on-footer-note">
            <span>© 2026 Daiichi Cruise · Nền tảng du thuyền thành viên thuộc Daiichi Travel · Hotline: 1900 9070 · Zalo: 0961 004 709 · Cát Bà, Hải Phòng</span>
            <span>Hệ thống đặt vé & phòng trực tuyến vận hành bởi <a href="https://daiichitravel.com" target="_blank" rel="noopener" style={{ color: 'var(--gold-bright)' }}>DaiichiTravel.com</a></span>
          </div>
        </div>
      </footer>

      {/* POPUP MODAL CHI TIẾT PHÒNG */}
      <RoomDetailModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />

      {/* LIVE CHAT BOT WIDGET */}
      {typeof ChatWidget !== 'undefined' ? <ChatWidget /> : (window.ChatWidget && <window.ChatWidget />)}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<OneHome />);
