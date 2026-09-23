/* ============================================================
   DAIICHI TRAVEL — Product & operations data
   All prices from official 2026–2027 rate cards (VND).
   ============================================================ */
(function () {
  const P = '../assets/photos/';

  const STATIONS = {
    HN: { vi: 'Hà Nội', en: 'Hanoi', ja: 'ハノイ', ko: '하노이', zh: '河内', fr: 'Hanoï' },
    CB: { vi: 'Cát Bà', en: 'Cat Ba', ja: 'カットバ島', ko: '깟바', zh: '吉婆岛', fr: 'Cat Ba' },
    HP: { vi: 'Hải Phòng', en: 'Hai Phong', ja: 'ハイフォン', ko: '하이퐁', zh: '海防', fr: 'Hai Phong' },
    HL: { vi: 'Hạ Long', en: 'Ha Long', ja: 'ハロン', ko: '하롱', zh: '下龙', fr: 'Ha Long' },
    NB: { vi: 'Ninh Bình', en: 'Ninh Binh', ja: 'ニンビン', ko: '닌빈', zh: '宁平', fr: 'Ninh Binh' },
  };

  const VEHICLES = {
    bus45:  { name: { vi: 'Bus thường 45 chỗ', en: '45-seat Bus', ja: '45席バス', ko: '45석 버스', zh: '45座巴士', fr: 'Bus 45 places' }, seats: 45, img: P + 'bus45.jpg', tags: ['wifi', 'ac'] },
    limo11: { name: { vi: 'Limousine Luxury 11 ghế', en: 'Luxury Limousine 11', ja: 'リムジン11席', ko: '리무진 11석', zh: '11座豪华车', fr: 'Limousine 11' }, seats: 11, img: P + 'limo10.jpg', tags: ['wifi', 'ac', 'water', 'usb'] },
    limo10: { name: { vi: 'Bus Limousine Luxury 10 ghế', en: 'Luxury Limousine 10', ja: 'リムジン10席', ko: '리무진 10석', zh: '10座豪华车', fr: 'Limousine 10' }, seats: 10, img: P + 'limo10.jpg', tags: ['wifi', 'ac', 'water', 'usb'] },
    limo7:  { name: { vi: 'Limo Green 7 chỗ (xe điện)', en: 'Limo Green 7 (EV)', ja: 'EVリモ7席', ko: 'EV 리모 7석', zh: '7座电动车', fr: 'Limo Green 7 (élec.)' }, seats: 7, img: P + 'limo7.jpg', tags: ['ev', 'wifi', 'ac'] },
    limo34: { name: { vi: 'Limousine Luxury 34 ghế', en: 'Luxury Limousine 34', ja: 'リムジン34席', ko: '리무진 34석', zh: '34座豪华车', fr: 'Limousine 34' }, seats: 34, img: P + 'limo34.jpg', tags: ['wifi', 'ac', 'water'] },
  };

  const VIA = {
    boat:  { vi: 'kèm tàu cao tốc', en: 'incl. speedboat', ja: '高速船込み', ko: '쾌속선 포함', zh: '含快艇', fr: 'bateau rapide incl.' },
    cable: { vi: 'kèm cáp treo', en: 'incl. cable car', ja: 'ケーブルカー込み', ko: '케이블카 포함', zh: '含缆车', fr: 'téléphérique incl.' },
    ferry: { vi: 'gồm vé phà qua đảo', en: 'incl. island ferry', ja: 'フェリー込み', ko: '페리 포함', zh: '含轮渡', fr: 'ferry inclus' },
  };

  /* ---- Bus services: official rate card 03/09/2026–31/03/2027 ---- */
  const BUS = [
    // ① HN ⇄ CB · 3h–3h30
    { id: 'b1', from: 'HN', to: 'CB', veh: 'bus45', via: 'boat', low: 270000, high: 300000, dur: 210,
      times: { go: ['05:00','06:00','07:00','08:00','09:00','10:45','12:30','14:30','15:30'], back: ['05:00','06:00','07:00','09:00','11:30','12:00','14:00','16:00','17:00'] } },
    { id: 'b2', from: 'HN', to: 'CB', veh: 'bus45', via: 'cable', low: 330000, high: 360000, dur: 210,
      times: { go: ['08:00','09:00'], back: ['09:00','11:30','12:30','14:00'] } },
    { id: 'b3', from: 'HN', to: 'CB', veh: 'limo11', via: 'boat', low: 330000, high: 360000, dur: 195,
      times: { go: ['05:00','06:00','07:00','08:00','09:00','10:45','12:30','14:30','15:30'], back: ['04:30','06:00','07:00','09:00','11:30','12:30','14:00','16:00','17:00'] } },
    { id: 'b4', from: 'HN', to: 'CB', veh: 'limo11', via: 'cable', low: 390000, high: 420000, dur: 195,
      times: { go: ['08:00','09:00'], back: ['09:00','11:30','12:30','14:00'] } },
    { id: 'b5', from: 'HN', to: 'CB', veh: 'limo7', via: 'boat', low: 330000, high: 360000, dur: 195,
      times: { go: ['05:00','06:00','07:00','08:00','09:00','10:45','12:30','14:30','15:30'], back: ['04:30','06:00','07:00','09:00','11:30','12:30','14:00','16:00','17:00'] } },
    { id: 'b6', from: 'HN', to: 'CB', veh: 'limo7', via: 'cable', low: 390000, high: 420000, dur: 195,
      times: { go: ['08:00','09:00'], back: ['09:00','11:30','12:30','14:00'] } },
    { id: 'b7', from: 'HN', to: 'CB', veh: 'limo34', via: 'boat', low: 330000, high: 360000, dur: 210,
      times: { go: ['05:00','06:00','07:00','08:00','09:00','10:45','12:30','14:30','15:30'], back: ['04:30','06:00','07:00','09:00','11:30','12:30','14:00','16:00','17:00'] } },
    { id: 'b8', from: 'HN', to: 'CB', veh: 'limo34', via: 'cable', low: 390000, high: 420000, dur: 210,
      times: { go: ['08:00','09:00'], back: ['11:30','12:30'] } },
    // ② HN ⇄ HP · 2h
    { id: 'b9', from: 'HN', to: 'HP', veh: 'bus45', via: null, low: 140000, high: 140000, dur: 120,
      times: { go: ['05:00','06:00','07:00','08:00','09:00','10:45','12:30','14:30','15:30'], back: ['06:30','08:30','10:30','13:00','13:30','15:30','17:30','18:30'] } },
    { id: 'b10', from: 'HN', to: 'HP', veh: 'limo10', via: null, low: 210000, high: 210000, dur: 110,
      times: { go: ['05:00','06:30','08:00','09:30','11:00','12:30','14:00','15:30','17:00','18:30','20:00','21:00'], back: ['05:00','06:30','08:00','09:30','11:00','12:30','14:00','15:30','17:00','18:30','20:00','21:00'] } },
    { id: 'b11', from: 'HN', to: 'HP', veh: 'limo7', via: null, low: 210000, high: 210000, dur: 110,
      times: { go: ['05:00','06:30','08:00','09:30','11:00','12:30','14:00','15:30','17:00','18:30','20:00','21:00'], back: ['05:00','06:30','08:00','09:30','11:00','12:30','14:00','15:30','17:00','18:30','20:00','21:00'] } },
    { id: 'b12', from: 'HN', to: 'HP', veh: 'limo34', via: null, low: 210000, high: 210000, dur: 120,
      times: { go: ['08:00','09:00'], back: ['13:00','14:00'] } },
    // ③ HL ⇄ NB · 3h30–4h
    { id: 'b13', from: 'HL', to: 'NB', veh: 'bus45', via: null, low: 300000, high: 300000, dur: 225, times: { go: ['09:00','12:30','16:00'], back: [] } },
    { id: 'b14', from: 'NB', to: 'HL', veh: 'bus45', via: null, low: 250000, high: 250000, dur: 225, times: { go: ['07:00','09:00','13:30'], back: [] } },
    // ④ CB ⇄ NB · 3h30–4h (bus + speedboat)
    { id: 'b15', from: 'CB', to: 'NB', veh: 'bus45', via: 'boat', low: 300000, high: 300000, dur: 225, times: { go: ['08:30','12:30','16:00'], back: [] } },
    { id: 'b16', from: 'NB', to: 'CB', veh: 'bus45', via: 'boat', low: 250000, high: 250000, dur: 225, times: { go: ['07:00','09:00','13:30'], back: [] } },
    // ⑤ CB ⇄ HP · EV + ferry
    { id: 'b17', from: 'CB', to: 'HP', veh: 'limo7', via: 'ferry', low: 200000, high: 200000, dur: 225,
      times: { go: ['07:00','09:00','12:30','14:30','16:00'], back: ['06:00','08:00','11:30','13:30','15:00'] } },
    // ⑥ Đối tác vận hành (marketplace partners)
    { id: 'p1', from: 'HN', to: 'HP', veh: 'limo10', via: null, low: 190000, high: 190000, dur: 115,
      operator: 'Hùng Cường Express', partner: true,
      times: { go: ['06:00', '10:00', '13:30', '16:30', '19:00'], back: ['06:30', '10:30', '14:00', '17:00', '19:30'] } },
    { id: 'p2', from: 'HL', to: 'CB', veh: 'limo7', via: 'boat', low: 280000, high: 320000, dur: 150,
      operator: 'Hạ Long Pearl Transit', partner: true,
      times: { go: ['08:30', '13:00'], back: ['10:30', '15:30'] } },
  ];

  /* ---- Day cruises: Lan Ha Bay 2026–2027 rate card ---- */
  const DAY_TOURS = [
    { id: 'vip1', code: 'VIP 1', img: P + 'daycruise-1.jpg',
      name: { vi: 'Tour 1 ngày Lan Hạ – Việt Hải', en: 'Lan Ha – Viet Hai Full-day', ja: 'ランハ湾＆ベトハイ村 1日', ko: '란하–비엣하이 1일', zh: '兰哈–越海一日游', fr: 'Journée Lan Ha – Viet Hai' },
      boat: { vi: 'Tàu sắt 48 chỗ', en: 'Steel boat · 48 pax', ja: '鉄船48席', ko: '철선 48석', zh: '钢船48座', fr: 'Bateau 48 places' },
      time: '09:00 – 15:30', peak: 720000, low: 650000, lunch: true,
      blurb: { vi: 'Trọn ngày khám phá vịnh Lan Hạ, đạp xe làng chài Việt Hải, chèo kayak, ăn trưa hải sản trên tàu.', en: 'Full day on Lan Ha Bay: Viet Hai village cycling, kayaking, seafood lunch on board.', ja: 'ランハ湾終日ツアー：ベトハイ村サイクリング、カヤック、船上海鮮ランチ。', ko: '란하베이 종일 투어: 비엣하이 마을 자전거, 카약, 선상 해산물 점심.', zh: '兰哈湾全日游：越海村骑行、皮划艇、船上海鲜午餐。', fr: 'Journée complète : vélo au village Viet Hai, kayak, déjeuner de fruits de mer à bord.' } },
    { id: 'sunset', code: 'SUNSET', img: P + 'daycruise-2.jpg',
      name: { vi: 'Tour Hoàng hôn Lan Hạ', en: 'Lan Ha Sunset Cruise', ja: 'ランハ湾サンセット', ko: '란하 선셋 크루즈', zh: '兰哈日落游船', fr: 'Croisière coucher de soleil' },
      boat: { vi: 'Tàu sắt 48 chỗ', en: 'Steel boat · 48 pax', ja: '鉄船48席', ko: '철선 48석', zh: '钢船48座', fr: 'Bateau 48 places' },
      time: '15:30 – 18:30', peak: 430000, low: 400000, lunch: false,
      blurb: { vi: 'Đón hoàng hôn giữa vịnh với đồ uống nhẹ — khung giờ đẹp nhất trong ngày.', en: 'Golden-hour sail across the bay with light refreshments.', ja: '軽食付きで湾のゴールデンアワーを満喫。', ko: '가뱼운 다과와 함께 황금빛 노을 항해.', zh: '敞享黄金时刻泛舟湾上，附轻食饮品。', fr: 'Navigation à l’heure dorée avec rafraîchissements.' } },
    { id: 'morning', code: 'MORNING', img: P + 'daycruise-3.jpg',
      name: { vi: 'Tour Bình minh Lan Hạ', en: 'Lan Ha Sunrise Cruise', ja: 'ランハ湾サンライズ', ko: '란하 선라이즈', zh: '兰哈日出游船', fr: 'Croisière lever de soleil' },
      boat: { vi: 'Tàu sắt 48 chỗ · ăn sáng', en: 'Steel boat · breakfast', ja: '鉄船・朝食付', ko: '철선 · 조식', zh: '钢船·含早餐', fr: 'Bateau · petit-déj.' },
      time: '06:00 – 09:00', peak: 430000, low: null, lunch: false, peakOnly: true,
      blurb: { vi: 'Vịnh Lan Hạ tĩnh lặng lúc bình minh, kèm bữa sáng trên tàu. Chỉ chạy mùa cao điểm.', en: 'The bay at its calmest, breakfast on board. Peak season only.', ja: '最も静かな湾と船上朝食。ハイシーズン限定。', ko: '가장 고요한 베이와 선상 조식. 성수기 한정.', zh: '清晨最宁静的海湾，含船上早餐。仅旺季运营。', fr: 'La baie au plus calme, petit-déjeuner à bord. Haute saison uniquement.' } },
    { id: 'vip3', code: 'VIP 3', img: P + 'daycruise-4.jpg',
      name: { vi: 'Tour Chào Bình minh Lan Hạ', en: 'Grand Sunrise Cruise', ja: 'グランドサンライズ', ko: '그랜드 선라이즈', zh: '迎日出豪华游', fr: 'Grande croisière matinale' },
      boat: { vi: 'Tàu 99 chỗ · ăn sáng & trưa hải sản', en: '99-pax boat · breakfast & seafood lunch', ja: '99席・朝食＆海鮮昼食', ko: '99석 · 조식&해산물 중식', zh: '99座·早餐与海鲜午餐', fr: '99 places · 2 repas' },
      time: '06:00 – 11:30', peak: 800000, low: null, lunch: true, peakOnly: true,
      blurb: { vi: 'Bình minh + brunch hải sản trên tàu lớn 99 chỗ. Chỉ chạy mùa cao điểm.', en: 'Sunrise plus seafood brunch on our 99-pax vessel. Peak season only.', ja: '日の出と99席大型船での海鮮ブランチ。ハイシーズン限定。', ko: '일출과 99석 대형선 해산물 브런치. 성수기 한정.', zh: '日出+99座大船海鲜早午餐。仅旺季运营。', fr: 'Lever de soleil et brunch de fruits de mer sur navire de 99 places.' } },
    { id: 'vip4', code: 'VIP 4', img: P + 'daycruise-deck.jpg',
      name: { vi: 'Tour 1 ngày Lan Hạ – Việt Hải (5★)', en: 'Lan Ha – Viet Hai 5★ Day Cruise', ja: '5つ星デイクルーズ', ko: '5성급 데이 크루즈', zh: '五星一日游轮', fr: 'Journée 5★ Lan Ha' },
      boat: { vi: 'Du thuyền 5★ · 99 chỗ', en: '5★ cruise ship · 99 pax', ja: '5つ星船・99席', ko: '5성 선박 · 99석', zh: '五星游轮·99座', fr: 'Navire 5★ · 99 places' },
      time: '11:45 – 17:00', peak: 850000, low: 850000, lunch: true,
      blurb: { vi: 'Trải nghiệm du thuyền 5 sao ban ngày: ăn trưa fine-dining, kayak, sundeck panorama.', en: 'A 5★ ship by day: fine-dining lunch, kayaking, panoramic sundeck.', ja: '5つ星船のデイクルーズ：ファインダイニングランチ、カヤック、パノラマサンデッキ。', ko: '낮의 5성급 크루즈: 파인다이닝 점심, 카약, 파노라마 선덱.', zh: '五星游轮日间体验：精致午餐、皮划艇、全景甲板。', fr: 'Navire 5★ de jour : déjeuner gastronomique, kayak, pont panoramique.' } },
    { id: 'vip5', code: 'VIP 5', img: P + 'daycruise-act-3.jpg',
      name: { vi: 'Tour Ăn tối DJ & Pháo hoa', en: 'Dinner Cruise · DJ & Fireworks', ja: 'ディナークルーズ＆花火', ko: '디너 크루즈 & 불꽃', zh: '晚餐DJ烟花游轮', fr: 'Dîner-croisière DJ & feux' },
      boat: { vi: 'Du thuyền 5★ · 99 chỗ', en: '5★ cruise ship · 99 pax', ja: '5つ星船・99席', ko: '5성 선박 · 99석', zh: '五星游轮·99座', fr: 'Navire 5★ · 99 places' },
      time: '16:30 – 23:00', peak: 850000, low: 850000, lunch: true,
      blurb: { vi: 'Hoàng hôn, ăn tối trên vịnh, DJ và pháo hoa — đêm Lan Hạ trọn vẹn.', en: 'Sunset, dinner on the bay, DJ set and fireworks.', ja: 'サンセット、湾上ディナー、DJと花火。', ko: '선셋, 베이 위 디너, DJ와 불꽃놈이.', zh: '日落、湾上晚餐、DJ与烟花。', fr: 'Coucher de soleil, dîner en baie, DJ et feux d’artifice.' } },
    { id: 'combo1', code: 'COMBO VIP 1', img: P + 'daycruise-act-1.jpg', combo: true,
      name: { vi: 'Combo VIP 1 + Bus đón Hà Nội', en: 'VIP 1 + Hanoi Bus Combo', ja: 'VIP1＋ハノイ送迎', ko: 'VIP1 + 하노이 버스', zh: 'VIP1+河内巴士套餐', fr: 'VIP 1 + bus Hanoï' },
      boat: { vi: 'Tàu sắt 48 chỗ + Bus 45 chỗ', en: 'Steel boat 48 + Bus 45', ja: '鉄船48＋バス45', ko: '철선48 + 버스45', zh: '钢船48+巴士45', fr: 'Bateau 48 + bus 45' },
      time: '08:00 – 20:00', peak: 1250000, low: 1250000, lunch: true,
      blurb: { vi: 'Xe đón phố cổ Hà Nội, trọn ngày tour VIP 1 trên vịnh, về lại Hà Nội trong ngày.', en: 'Old Quarter pickup, full VIP 1 day on the bay, back to Hanoi by night.', ja: '旧市街送迎、VIP1終日クルーズ、当日ハノイ帰着。', ko: '구시가지 픽업, VIP1 종일 크루즈, 당일 하노이 복귀.', zh: '老城区接送，VIP1全日游船，当晚返回河内。', fr: 'Prise en charge au Vieux Quartier, journée VIP 1, retour à Hanoï le soir.' } },
    { id: 'combo4', code: 'COMBO VIP 4', img: P + 'daycruise-act-2.jpg', combo: true,
      name: { vi: 'Combo VIP 4 + Bus đón Hà Nội', en: 'VIP 4 + Hanoi Bus Combo', ja: 'VIP4＋ハノイ送迎', ko: 'VIP4 + 하노이 버스', zh: 'VIP4+河内巴士套餐', fr: 'VIP 4 + bus Hanoï' },
      boat: { vi: 'Du thuyền 5★ 99 chỗ + Bus 45 chỗ', en: '5★ ship 99 + Bus 45', ja: '5つ星船＋バス45', ko: '5성 선박 + 버스45', zh: '五星游轮+巴士45', fr: 'Navire 5★ + bus 45' },
      time: '08:00 – 20:00', peak: 1350000, low: 1350000, lunch: true,
      blurb: { vi: 'Combo cao cấp nhất trong ngày: xe đón Hà Nội + du thuyền 5 sao VIP 4.', en: 'Our top day combo: Hanoi transfer plus the 5★ VIP 4 cruise.', ja: '最上位コンボ：ハノイ送迎＋5つ星VIP4クルーズ。', ko: '최고급 콤보: 하노이 송영 + 5성급 VIP4 크루즈.', zh: '顶级套餐：河内接送+五星VIP4游轮。', fr: 'Notre meilleur combo : transfert Hanoï + croisière VIP 4 cinq étoiles.' } },
    { id: 'psup', code: 'PARTNER', img: P + 'daycruise-act-2.jpg', partner: true, operator: 'Cát Bà Ocean Tour',
      name: { vi: 'SUP & Bơi hoàng hôn (đối tác)', en: 'Sunset SUP & Swim (partner)', ja: 'サンセットSUP（パートナー）', ko: '선셋 SUP (파트너)', zh: '日落SUP（合作伙伴）', fr: 'SUP coucher de soleil (partenaire)' },
      boat: { vi: 'Cát Bà Ocean Tour · nhóm ≤12', en: 'Cat Ba Ocean Tour · max 12', ja: '少人数制', ko: '소그룹', zh: '小团', fr: 'Petit groupe' },
      time: '16:00 – 18:30', peak: 390000, low: 350000, lunch: false,
      blurb: { vi: 'Dịch vụ của đối tác xác minh trên nền tảng Daiichi: chèo SUP giữa vịnh lúc hoàng hôn, nhóm nhỏ ≤12 khách, HDV riêng. Đặt & thanh toán qua Daiichi — chính sách hoàn huỷ như tour Daiichi.', en: 'By a verified partner on the Daiichi platform: sunset SUP in the bay, max 12 guests, private guide. Booked & paid via Daiichi — same cancellation policy.', ja: '認定パートナー提供：サンセットSUP、最大12名、専属ガイド。予約・決済・キャンセル規定はDaiichi基準。', ko: '인증 파트너 제공: 선셋 SUP, 최대 12인, 전담 가이드. 예약·결제·취소 규정은 Daiichi 기준.', zh: '认证合作伙伴提供：日落SUP，最多12人，专属导游。通过Daiichi预订付款，退改政策一致。', fr: 'Par un partenaire vérifié : SUP au coucher du soleil, 12 pers. max, guide privé. Réservé via Daiichi — même politique d’annulation.' } },
  ];

  /* ---- Daiichi Luxury Cruise suites (prices exclude VAT) ---- */
  const SUITES = [
    { id: 'deluxe',  name: 'Deluxe Suite',  img: P + 'suite-deluxe.jpg',  floor: 1, bath: 'shower',  cap: '2–3', n1: 2860000, n2: 5720000, count: 8 },
    { id: 'premium', name: 'Premium Suite', img: P + 'suite-premium.jpg', floor: 1, bath: 'bathtub', cap: '2',   n1: 2990000, n2: 5980000, count: 6 },
    { id: 'junior',  name: 'Junior Suite',  img: P + 'suite-junior.jpg',  floor: 2, bath: 'shower',  cap: '2–3', n1: 3120000, n2: 6240000, count: 6 },
    { id: 'senior',  name: 'Senior Suite',  img: P + 'suite-senior.jpg',  floor: 2, bath: 'bathtub', cap: '2',   n1: 3250000, n2: 6500000, count: 6 },
    { id: 'executive', name: 'Executive Suite', img: P + 'suite-executive.jpg', floor: 2, bath: 'bathtub', cap: '2–4', n1: 3380000, n2: 6760000, count: 4 },
    { id: 'royal',   name: 'Royal Suite (VIP)', img: P + 'suite-royal.jpg', floor: 4, bath: 'bathtub', cap: '2', n1: 3640000, n2: 7280000, count: 2 },
  ];

  /* ---- Seat layouts: pattern rows, '' = aisle ---- */
  const LAYOUTS = {
    bus45:  { cols: 5, rows: [['A','B','','C','D']], repeat: 11, last: ['A','B','C','D','E'] },
    limo34: { cols: 4, rows: [['A','B','','C']], repeat: 11, last: ['A'] },
    limo11: { cols: 3, rows: [['A','','B']], repeat: 4, last: ['A','B','C'] },
    limo10: { cols: 3, rows: [['A','','B']], repeat: 4, last: ['A','B'] },
    limo7:  { cols: 3, rows: [['A','','B']], repeat: 2, last: ['A','B','C'] },
  };
  function buildSeats(vehId) {
    const L = LAYOUTS[vehId]; const out = [];
    let r = 1;
    for (; r <= L.repeat; r++) {
      L.rows[0].forEach((c) => { if (c) out.push({ id: c + r, row: r, col: c }); });
    }
    L.last.forEach((c) => out.push({ id: c + r, row: r, col: c }));
    return out;
  }
  // Deterministic pseudo-random sold seats per trip key
  function soldSeats(vehId, key) {
    const seats = buildSeats(vehId);
    let h = 0; for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
    const sold = new Set();
    const frac = 0.25 + ((h % 35) / 100); // 25–60% sold
    seats.forEach((s, i) => {
      h = (h * 1103515245 + 12345) >>> 0;
      if ((h / 4294967295) < frac) sold.add(s.id);
    });
    return { seats, sold };
  }

  /* ---- Season helpers ---- */
  function busSeason(dateStr) {
    return (dateStr >= '2026-05-09' && dateStr <= '2026-09-02') ? 'high' : 'low';
  }
  function cruiseSeason(dateStr) {
    return (dateStr >= '2026-05-27' && dateStr <= '2026-08-02') ? 'peak' : 'low';
  }

  /* ---- Pickup points (free zones from rate card), localized ---- */
  const PICKUPS = {
    HN: [
      { vi: 'Phố cổ — Quận Hoàn Kiếm (miễn phí)', en: 'Old Quarter — Hoan Kiem (free)', ja: '旧市街ホアンキエム（無料）', ko: '구시가지 호안뀘엠 (무료)', zh: '老城区还剑郡（免费）', fr: 'Vieux Quartier (gratuit)' },
      { vi: '24 Hàng Bè', en: '24 Hang Be St.', ja: 'ハンベ通り24', ko: '항베 24', zh: '行贝街24号', fr: '24 rue Hang Be' },
      { vi: 'Nhà hát Lớn', en: 'Opera House', ja: 'オペラハウス', ko: '오페라하우스', zh: '大剧院', fr: 'Opéra' },
      { vi: 'Ga Hà Nội', en: 'Hanoi Station', ja: 'ハノイ駅', ko: '하노이역', zh: '河内火车站', fr: 'Gare de Hanoï' },
    ],
    CB: [
      { vi: 'Khách sạn trung tâm Cát Bà (miễn phí)', en: 'Central Cat Ba hotels (free)', ja: 'カットバ中心部ホテル（無料）', ko: '깟바 시내 호텔 (무료)', zh: '吉婆中心酒店（免费）', fr: 'Hôtels du centre (gratuit)' },
      { vi: 'Bến Bèo', en: 'Beo Pier', ja: 'ベオ港', ko: '베오 부두', zh: 'Beo码头', fr: 'Quai Beo' },
      { vi: 'Cảng Cái Viềng', en: 'Cai Vieng Port', ja: 'カイヴィエン港', ko: '카이비엥 항', zh: 'Cai Vieng港', fr: 'Port Cai Vieng' },
    ],
    HP: [
      { vi: 'Nội thành Hải Phòng ≤15km (miễn phí)', en: 'Hai Phong city ≤15km (free)', ja: 'ハイフォン市内≤15km（無料）', ko: '하이팽 시내 ≤15km (무료)', zh: '海防市区≤15公里（免费）', fr: 'Centre Hai Phong ≤15 km (gratuit)' },
      { vi: 'Ga Hải Phòng', en: 'Hai Phong Station', ja: 'ハイフォン駅', ko: '하이팽역', zh: '海防火车站', fr: 'Gare de Hai Phong' },
      { vi: 'Sân bay Cát Bi', en: 'Cat Bi Airport', ja: 'カットビ空港', ko: '깟비 공항', zh: '吉臂机场', fr: 'Aéroport Cat Bi' },
    ],
    HL: [
      { vi: 'KS khu Bãi Cháy', en: 'Bai Chay hotels', ja: 'バイチャイ地区ホテル', ko: '바이차이 호텔', zh: '茂派区酒店', fr: 'Hôtels Bai Chay' },
      { vi: 'Cảng Sun', en: 'Sun Port', ja: 'サン港', ko: '썬 항', zh: 'Sun码头', fr: 'Port Sun' },
      { vi: 'Cảng Tuần Châu', en: 'Tuan Chau Marina', ja: 'トゥアンチャウ港', ko: '투안장 마리나', zh: '巬珠码头', fr: 'Marina Tuan Chau' },
    ],
    NB: [
      { vi: 'Tam Cốc', en: 'Tam Coc', ja: 'タムコック', ko: '떠꾱', zh: '三谷', fr: 'Tam Coc' },
      { vi: 'Tràng An', en: 'Trang An', ja: 'チャンアン', ko: '장안', zh: '长安', fr: 'Trang An' },
      { vi: 'Hang Múa', en: 'Mua Cave', ja: 'ムア洞窟', ko: '무아 동굴', zh: '舞洞', fr: 'Grotte Mua' },
      { vi: 'Bích Động', en: 'Bich Dong', ja: 'ビックドン', ko: '빅동', zh: '碧洞', fr: 'Bich Dong' },
    ],
  };

  /* ---- Public holidays (surcharge 30.000đ/pax/way) ---- */
  const HOLIDAYS = ['2026-06-28', '2026-09-01', '2026-09-02', '2027-01-01', '2027-02-15', '2027-02-16', '2027-02-17', '2027-02-18', '2027-04-30', '2027-05-01'];
  const isHoliday = (d) => HOLIDAYS.includes(d);
  const HOLIDAY_FEE = 30000;

  window.DT_DATA = { STATIONS, VEHICLES, VIA, BUS, DAY_TOURS, SUITES, PICKUPS, HOLIDAYS, isHoliday, HOLIDAY_FEE, buildSeats, soldSeats, busSeason, cruiseSeason, IMG: P };
})();
