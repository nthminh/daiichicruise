/* ============================================================
   DAIICHI CRUISE — Luxury & Boutique Cruise Homepage
   Elevated UI for daiichicruise.vn (5★ Luxury Cruise & 4★ Boutique)
   ============================================================ */
const { useState, useEffect } = React;

/* Multi-language dictionary */
const HD = {
  nav_luxury: ['Du thuyền 5★ Luxury', '5★ Luxury Cruise', '5★ Luxury クルーズ', '5★ Luxury 크루즈', '5★ Luxury 游轮', 'Croisière 5★ Luxury'],
  nav_boutique: ['Du thuyền Boutique', 'Boutique Cruise', 'Boutique クルーズ', 'Boutique 크루즈', 'Boutique 游轮', 'Croisière Boutique'],
  nav_suites: ['Hạng phòng Suite', 'Suites Collection', 'Suite 客室', 'Suite 객실', 'Suite 套房系列', 'Suites'],
  nav_highlights: ['Điểm vượt trội', 'Highlights', '特徴と魅力', '특장점', '特色优势', 'Points forts'],
  nav_itinerary: ['Hải trình', 'Itinerary', '運航日程', '운항 일정', '航程安排', 'Itinéraire'],
  nav_day: ['Du thuyền ngày', 'Day Cruises', 'デイクルーズ', '데이 크루즈', '日间游轮', 'Croisières Journée'],
  nav_limo: ['Xe Limousine', 'Limousine Bus', 'Limousine バス', 'Limousine 버스', 'Limousine 专车', 'Limousine'],
  cta_book: ['Đặt du thuyền ngay', 'Book cruise now', '今すぐ予約', '지금 예약', '立即预订游轮', 'Réserver'],
  hero_k: ['TIÊU CHUẨN DU THUYỀN CAO CẤP VỊNH LAN HẠ · CÁT BÀ', 'PREMIUM LUXURY & BOUTIQUE CRUISES · LAN HA BAY - CAT BA', 'LAN HA BAY · CAT BA プレミアムクルーズ', 'LAN HA BAY · CAT BA 프리미엄 크루즈', 'LAN HA BAY · CAT BA 顶级奢华游轮体验', 'CROISIÈRES DE LUXE · BAIE DE LAN HA - CAT BA'],
  hero_t: ['Tuyệt Tác Du Thuyền Luxury & Boutique Giữa Vịnh Lan Hạ', 'Masterpiece Luxury & Boutique Cruises in Lan Ha Bay', 'Lan Ha 湾の極上 Luxury & Boutique クルーズ', 'Lan Ha 베이 최고급 Luxury & Boutique 크루즈', 'Lan Ha 湾殿堂级 Luxury & Boutique 奢华游轮', 'Le Chef-d\'œuvre des Croisières Luxury & Boutique en Baie de Lan Ha'],
  hero_p: ['Nghỉ dưỡng thượng lưu trên Daiichi Luxury Cruise 5★ và Daiichi Boutique Cruise 4★. 100% phòng có ban công riêng view vịnh, cầu kính Skywalk độc nhất, bể sục Jacuzzi bốn mùa, ẩm thực Fine-Dining và đưa đón Limousine trọn gói.',
    'Ultra-luxury voyages aboard Daiichi Luxury Cruise 5★ and Daiichi Boutique Cruise 4★. 100% private balcony suites, exclusive glass Skywalk, four-season Jacuzzi, Fine-Dining restaurant and door-to-door Limousine service.',
    'Daiichi Luxury Cruise 5★ ＆ Daiichi Boutique Cruise 4★ で過ごす極上のひととき。全室プライベートバルコニー、絶景ガラス Skywalk、温水 Jacuzzi、Fine-Dining レストラン、ドアツードア Limousine 送迎完備。',
    'Daiichi Luxury Cruise 5★ & Daiichi Boutique Cruise 4★에서 즐기는 특별한 휴식. 전 객실 전용 발코니 오션뷰, 글래스 Skywalk, 4계절 온수 Jacuzzi, Fine-Dining 레스토랑 및 Limousine 픽업/샌딩 서비스.',
    '在 Daiichi Luxury Cruise 5★ 与 Daiichi Boutique Cruise 4★ 上尊享非凡度假。100% 独立海景阳台套房、专属全景玻璃 Skywalk、四季恒温 Jacuzzi、Fine-Dining 精致餐饮及专车 Limousine 接送。',
    'Séjour d\'exception à bord de nos navires Daiichi Luxury Cruise 5★ et Daiichi Boutique Cruise 4★. Suites avec balcon privé, passerelle de verre Skywalk, Jacuzzi quatre saisons, gastronomie Fine-Dining et transfert Limousine.'],
};

const hidx = { vi: 0, en: 1, ja: 2, ko: 3, zh: 4, fr: 5 };
const T = (k) => {
  const curLang = (window.I18N && I18N.lang) || 'vi';
  if (HD[k]) {
    const list = HD[k];
    const val = list[hidx[curLang]];
    if (val) return val;
    return list[1] || list[0] || k;
  }
  if (window.I18N && I18N.t) {
    return I18N.t(k);
  }
  return k;
};

/* Curated dictionary for high-frequency Cruise UI phrases (proper nouns kept intact) */
const CRUISE_PHRASES = {
  // Language Switcher
  'Ngôn ngữ chính thức': { en: 'Official Languages', ja: '公式対応言語', ko: '공식 지원 언어', zh: '官方语言', fr: 'Langues officielles' },
  'Tự động dịch đa quốc gia': { en: 'Auto Translate (100+)', ja: '自動翻訳（多言語）', ko: '자동 번역 (다국어)', zh: '多国语言自动翻译', fr: 'Traduction auto (100+)' },

  // Hero Titles & Badges
  'Tuyệt Tác Du Thuyền Luxury & Boutique': { en: 'Masterpiece Luxury & Boutique Cruises', ja: '極上の Luxury & Boutique クルーズ', ko: '최고급 Luxury & Boutique 크루즈', zh: '殿堂级 Luxury & Boutique 奢华游轮', fr: 'Chef-d\'œuvre des Croisières Luxury & Boutique' },
  'Giữa Kỳ Quan Vịnh Lan Hạ': { en: 'In Lan Ha Bay', ja: '奇観 Lan Ha 湾にて', ko: '천혜의 절경 Lan Ha 베이', zh: '畅游奇观 Lan Ha 湾', fr: 'Au Cœur de la Baie de Lan Ha' },
  '100% Suite Ban Công Riêng': { en: '100% Balcony Suites', ja: '100% 専用バルコニー Suite', ko: '100% 전용 발코니 Suite', zh: '100% 独立阳台 Suite', fr: '100 % Suites avec Balcon Privé' },
  'Cầu Kính Skywalk Độc Nhất': { en: 'Ocean Glass Skywalk', ja: '海上ガラス Skywalk', ko: '오션 글래스 Skywalk', zh: '独家海空玻璃 Skywalk', fr: 'Passerelle de Verre Skywalk' },
  'Bể Sục Jacuzzi Bốn Mùa': { en: 'Heated Jacuzzi', ja: '通年温水 Jacuzzi', ko: '사계절 온수 Jacuzzi', zh: '四季恒温 Jacuzzi', fr: 'Jacuzzi Chauffé 4 Saisons' },
  'Ẩm Thực Fine Dining 5★': { en: 'Fine Dining Gastronomy', ja: '5★ Fine Dining 美食', ko: '5★ Fine Dining 미식', zh: '5★ Fine Dining 精致餐饮', fr: 'Gastronomie Fine Dining 5★' },
  'Limousine Đón Trả Tận Cửa': { en: 'Door-to-Door Limousine', ja: 'ドアツードア Limousine', ko: '도어 투 도어 Limousine', zh: '点对点 Limousine 专车接送', fr: 'Limousine Porte-à-Porte' },

  // Search box & tabs
  'Du thuyền ngủ đêm 5★ & Boutique': { en: '5★ & Boutique Overnight Cruise', ja: '5★ & Boutique 宿泊クルーズ', ko: '5★ & Boutique 1박 크루즈', zh: '5★ & Boutique 过夜游轮', fr: 'Croisière de nuit 5★ & Boutique' },
  'Du thuyền ngủ đêm': { en: 'Overnight Cruise', ja: '宿泊クルーズ', ko: '1박 크루즈', zh: '过夜游轮', fr: 'Croisière de nuit' },
  'Du thuyền ngày & Tour ngắn': { en: 'Day Cruise & Short Tours', ja: 'デイクルーズ＆ショートツアー', ko: '데이 크루즈 & 단기 투어', zh: '日间游轮与短途游', fr: 'Croisières de Jour & Excursions' },
  'Tour ngày': { en: 'Day Tours', ja: '日帰りツアー', ko: '당일 투어', zh: '一日游', fr: 'Excursions' },
  'Du thuyền ngày Lan Hạ': { en: 'Lan Ha Day Cruise', ja: 'Lan Ha デイクルーズ', ko: 'Lan Ha 데이 크루즈', zh: 'Lan Ha 日间游船', fr: 'Croisière journée Lan Ha' },
  'Du thuyền ngày': { en: 'Day Cruise', ja: 'デイクルーズ', ko: '데이 크루즈', zh: '日间游轮', fr: 'Croisière journée' },
  'Tour Combo trọn gói Hà Nội': { en: 'All-in Combo from Ha Noi', ja: 'Ha Noi 発オールインワンコンボ', ko: 'Ha Noi 출발 올인원 콤보 투어', zh: 'Ha Noi 出发全包组合套餐', fr: 'Circuit combiné depuis Ha Noi' },
  'Tour Combo': { en: 'Combo Tours', ja: 'コンボツアー', ko: '콤보 투어', zh: '组合套餐', fr: 'Circuits combinés' },
  'Xe Limousine đưa đón': { en: 'Limousine Transfer', ja: 'Limousine 専用送迎', ko: 'Limousine 픽업/샌딩', zh: 'Limousine 专车接送', fr: 'Transfert Limousine' },
  'Xe Limousine': { en: 'Limousine', ja: 'Limousine バス', ko: 'Limousine', zh: 'Limousine 专车', fr: 'Limousine' },
  'Du thuyền': { en: 'Cruise Ship', ja: 'クルーズ船', ko: '크루즈선', zh: '游轮', fr: 'Navire de croisière' },
  'Tất cả du thuyền (Luxury & Boutique)': { en: 'All Cruises (Luxury & Boutique)', ja: 'すべてのクルーズ（Luxury & Boutique）', ko: '모든 크루즈 (Luxury & Boutique)', zh: '全部游轮（Luxury & Boutique）', fr: 'Toutes les croisières (Luxury & Boutique)' },
  'Hải trình': { en: 'Itinerary', ja: '運航日程', ko: '운항 일정', zh: '航程安排', fr: 'Itinéraire' },
  '2 Ngày 1 Đêm (2D1N)': { en: '2 Days 1 Night (2D1N)', ja: '1泊2日（2D1N）', ko: '1박 2일 (2D1N)', zh: '两天一夜（2D1N）', fr: '2 jours 1 nuit (2D1N)' },
  '3 Ngày 2 Đêm (3D2N)': { en: '3 Days 2 Nights (3D2N)', ja: '2泊3日（3D2N）', ko: '2박 3일 (3D2N)', zh: '三天两夜（3D2N）', fr: '3 jours 2 nuits (3D2N)' },
  'Ngày khởi hành': { en: 'Departure Date', ja: '乗船日', ko: '출발일', zh: '出发日期', fr: 'Date de départ' },
  'Ngày đi': { en: 'Travel Date', ja: '出発日', ko: '출발일', zh: '出发日期', fr: 'Date de départ' },
  'Số khách': { en: 'Guests', ja: '人数', ko: '인원', zh: '人数', fr: 'Passagers' },
  'Số phòng': { en: 'Cabins', ja: '客室数', ko: '객실 수', zh: '房间数', fr: 'Cabines' },
  'Người lớn': { en: 'Adults', ja: '大人', ko: '성인', zh: '成人', fr: 'Adultes' },
  'Trẻ em': { en: 'Children', ja: '子供', ko: '어린이', zh: '儿童', fr: 'Enfants' },
  'Số cabin': { en: 'Cabins', ja: '客室数', ko: '객실 수', zh: '房间数', fr: 'Cabines' },
  'người': { en: 'adult(s)', ja: '名', ko: '명', zh: '人', fr: 'pers.' },
  'trẻ em': { en: 'child(ren)', ja: '名（子供）', ko: '명 (어린이)', zh: '儿童', fr: 'enf.' },
  'phòng': { en: 'cabin(s)', ja: '室', ko: '객실', zh: '间', fr: 'cabine(s)' },
  'Tuyến tour trong ngày': { en: 'Day Tours', ja: 'ショートツアー', ko: '단기 투어', zh: '短途游路线', fr: 'Excursions à la journée' },
  '⚓ Du thuyền ngày Vịnh Lan Hạ (Cát Bà)': { en: '⚓ Lan Ha Bay Day Cruises (Cat Ba)', ja: '⚓ Lan Ha 湾デイクルーズ（Cat Ba）', ko: '⚓ Lan Ha 베이 데이 크루즈 (Cat Ba)', zh: '⚓ Lan Ha 湾日间游船（Cat Ba）', fr: '⚓ Croisières de jour Baie de Lan Ha (Cat Ba)' },
  '🌾 Tour ngắn khám phá Ninh Bình': { en: '🌾 Ninh Binh Short Tours', ja: '🌾 Ninh Binh ショートツアー', ko: '🌾 Ninh Binh 단기 투어', zh: '🌾 Ninh Binh 短途探索游', fr: '🌾 Excursions découvertes à Ninh Binh' },
  'Gói Combo Tour gợi ý': { en: 'Featured Combo Packages', ja: 'おすすめコンボパッケージ', ko: '추천 콤보 패키지', zh: '精选组合套餐', fr: 'Formules combinées' },
  'Combo Xe đón Hà Nội + Du thuyền ngày 5★ VIP 4': { en: 'Ha Noi Bus + 5★ VIP 4 Day Cruise', ja: 'Ha Noi バス送迎 + 5★ VIP 4 デイクルーズ', ko: 'Ha Noi 버스 픽업 + 5★ VIP 4 데이 크루즈', zh: 'Ha Noi 巴士接送 + 5★ VIP 4 日间游轮', fr: 'Bus Ha Noi + Croisière de jour 5★ VIP 4' },
  'Combo Xe Limousine Hà Nội + Du thuyền ngủ đêm 2N1Đ': { en: 'Ha Noi Limousine + Overnight Cruise 2D1N', ja: 'Ha Noi Limousine + 宿泊クルーズ 2D1N', ko: 'Ha Noi Limousine + 1박 크루즈 2D1N', zh: 'Ha Noi Limousine + 2D1N 过夜游轮', fr: 'Limousine Ha Noi + Croisière de nuit 2J1N' },
  'Combo Cát Bà 3N2Đ: Xe Limousine + Khách sạn + Du thuyền': { en: 'Cat Ba 3D2N Combo: Limousine + Hotel + Cruise', ja: 'Cat Ba 3D2N コンボ：Limousine + ホテル + クルーズ', ko: 'Cat Ba 3D2N 콤보: Limousine + 호텔 + 크루즈', zh: 'Cat Ba 3D2N 套餐：Limousine + 酒店 + 游轮', fr: 'Combo Cat Ba 3J2N : Limousine + Hôtel + Croisière' },
  '✨ Tự thiết kế trọn gói theo yêu cầu riêng (Custom A-Z)': { en: '✨ Fully Custom Combo Package (All-in A-Z)', ja: '✨ オーダーメイドパッケージ（A-Z カスタム）', ko: '✨ 맞춤형 올인원 패키지 (A-Z 커스텀)', zh: '✨ 私人定制全包套餐（A-Z 自由组合）', fr: '✨ Formule sur-mesure tout compris (Custom A-Z)' },
  'Nhập Liệu & Gửi Báo Giá Combo →': { en: 'Custom Combo & Get Rates →', ja: 'コンボをカスタマイズして見積もり →', ko: '맞춤형 콤보 견적 요청 →', zh: '定制套餐并获取报价 →', fr: 'Personnaliser & devis combo →' },
  'Tìm Chuyến & Báo Giá →': { en: 'Find Cruise & Rates →', ja: '空室・料金を検索 →', ko: '일정 및 요금 검색 →', zh: '查询航程与报价 →', fr: 'Trouver croisière & tarifs →' },
  'Tìm Chuyến Ngay': { en: 'Search Cruises', ja: 'クルーズを検索', ko: '크루즈 검색', zh: '立即搜索', fr: 'Rechercher' },
  'Điểm đón': { en: 'Pickup', ja: '出発地', ko: '출발지', zh: '上车点', fr: 'Départ' },
  'Điểm trả': { en: 'Drop-off', ja: '目的地', ko: '도착지', zh: '下车点', fr: 'Arrivée' },
  'Điểm đến': { en: 'Drop-off', ja: '目的地', ko: '도착지', zh: '目的地', fr: 'Arrivée' },
  'Tìm Vé Xe': { en: 'Find Bus Tickets', ja: 'バスを検索', ko: '버스 검색', zh: '查询车票', fr: 'Trouver un bus' },

  // Short Tour Labels & Badges (Proper nouns kept intact)
  'Tour 1 ngày Lan Hạ – Làng Việt Hải (VIP 1)': { en: '1-Day Lan Ha – Viet Hai Village (VIP 1)', ja: '1日 Lan Ha – Viet Hai 村ツアー (VIP 1)', ko: '1일 Lan Ha – Viet Hai 마을 투어 (VIP 1)', zh: 'Lan Ha – Viet Hai 古村一日游 (VIP 1)', fr: 'Excursion 1 jour Lan Ha – Village Viet Hai (VIP 1)' },
  'Một ngày Vịnh Lan Hạ Cruise 5 Sao (VIP 4)': { en: 'Full-Day Lan Ha Bay 5★ Cruise (VIP 4)', ja: '1日 Lan Ha 湾 5★ クルーズ (VIP 4)', ko: '1일 Lan Ha 베이 5★ 크루즈 (VIP 4)', zh: 'Lan Ha 湾 5★ 游轮一日游 (VIP 4)', fr: 'Journée en Baie de Lan Ha Croisière 5★ (VIP 4)' },
  'Tiệc BBQ DJ & Pháo hoa Vịnh Lan Hạ (VIP 5)': { en: 'BBQ DJ & Fireworks Party Lan Ha Bay (VIP 5)', ja: 'Lan Ha 湾 BBQ DJ＆花火クルーズ (VIP 5)', ko: 'Lan Ha 베이 BBQ DJ & 불꽃놀이 (VIP 5)', zh: 'Lan Ha 湾 BBQ DJ 烟花晚宴游轮 (VIP 5)', fr: 'Soirée BBQ DJ & Feux d\'artifice Baie de Lan Ha (VIP 5)' },
  'Tour Hoàng hôn & Tiệc trà Sunset Cruise': { en: 'Sunset & Tea Party — Sunset Cruise', ja: 'サンセット＆ティーパーティー Sunset Cruise', ko: '선셋 & 티 파티 Sunset Cruise', zh: '日落下午茶之旅 Sunset Cruise', fr: 'Coucher de soleil & Tea Party — Sunset Cruise' },
  'Tour Bình minh Lan Hạ & Chèo Kayak': { en: 'Lan Ha Sunrise & Kayaking — Morning Cruise', ja: 'Lan Ha サンライズ＆カヤック Morning Cruise', ko: 'Lan Ha 일출 & 카약 투어 Morning Cruise', zh: 'Lan Ha 日出与皮划艇之旅 Morning Cruise', fr: 'Lever de soleil Lan Ha & Kayak — Morning Cruise' },
  'Bình minh Vịnh Lan Hạ Cruise 5 Sao (VIP 3)': { en: 'Lan Ha Bay 5★ Sunrise Cruise (VIP 3)', ja: 'Lan Ha 湾 5★ サンライズクルーズ (VIP 3)', ko: 'Lan Ha 베이 5★ 일출 크루즈 (VIP 3)', zh: 'Lan Ha 湾 5★ 日出游轮 (VIP 3)', fr: 'Croisière 5★ Lever de soleil Baie de Lan Ha (VIP 3)' },
  'Một ngày Lan Hạ Cruise 2 (VIP 1 Cruise 2)': { en: 'Full-Day Lan Ha Cruise 2 (VIP 1 Cruise 2)', ja: '1日 Lan Ha Cruise 2 (VIP 1 Cruise 2)', ko: '1일 Lan Ha Cruise 2 (VIP 1 Cruise 2)', zh: 'Lan Ha Cruise 2 一日游 (VIP 1 Cruise 2)', fr: 'Journée Lan Ha Cruise 2 (VIP 1 Cruise 2)' },
  'Hoàng hôn Lan Hạ Cruise 2': { en: 'Lan Ha Sunset — Sunset Cruise 2', ja: 'Lan Ha サンセット Cruise 2', ko: 'Lan Ha 선셋 Cruise 2', zh: 'Lan Ha 日落游船 Cruise 2', fr: 'Coucher de soleil Lan Ha Cruise 2' },
  'Ninh Bình 1 ngày: Bái Đính – Tràng An – Hang Múa (Xe điện)': { en: 'Ninh Binh 1-Day: Bai Dinh – Trang An – Hang Mua (Electric Car)', ja: 'Ninh Binh 1日：Bai Dinh – Trang An – Hang Mua（電動カート）', ko: 'Ninh Binh 1일: Bai Dinh – Trang An – Hang Mua (전동차)', zh: 'Ninh Binh 一日游：Bai Dinh – Trang An – Hang Mua（含电瓶车）', fr: 'Ninh Binh 1 jour : Bai Dinh – Trang An – Hang Mua (Voiture élec.)' },
  'Ninh Bình 1 ngày: Hoa Lư – Tam Cốc – Đạp xe': { en: 'Ninh Binh 1-Day: Hoa Lu – Tam Coc – Cycling', ja: 'Ninh Binh 1日：Hoa Lu – Tam Coc – サイクリング', ko: 'Ninh Binh 1일: Hoa Lu – Tam Coc – 자전거', zh: 'Ninh Binh 一日游：Hoa Lu – Tam Coc – 骑行', fr: 'Ninh Binh 1 jour : Hoa Lu – Tam Coc – Vélo' },
  'Ninh Bình Back Road Tour 1 ngày bằng Army Jeep độc đáo': { en: 'Ninh Binh 1-Day Back Road Tour by Vintage Army Jeep', ja: 'Ninh Binh 1日 Army Jeep バックロードツアー', ko: 'Ninh Binh 1일 Army Jeep 백로드 투어', zh: 'Ninh Binh 复古 Army Jeep 秘境一日游', fr: 'Ninh Binh 1 jour : Back Road Tour en Army Jeep' },
  'Ninh Bình Half Day Jeep Tour: Bích Động – Tràng An – Hang Múa': { en: 'Ninh Binh Half-Day Jeep Tour: Bich Dong – Trang An – Hang Mua', ja: 'Ninh Binh 半日 Jeep ツアー：Bich Dong – Trang An – Hang Mua', ko: 'Ninh Binh 반일 Jeep 투어: Bich Dong – Trang An – Hang Mua', zh: 'Ninh Binh 半日 Jeep 游：Bich Dong – Trang An – Hang Mua', fr: 'Ninh Binh 1/2 journée Jeep : Bich Dong – Trang An – Hang Mua' },
  'Ninh Bình Ebike Tour: Thung Sen – Thái Vi – Thung Nắng': { en: 'Ninh Binh E-bike Tour: Thung Sen – Thai Vi – Thung Nang', ja: 'Ninh Binh E-bike ツアー：Thung Sen – Thai Vi – Thung Nang', ko: 'Ninh Binh 전기자전거 투어: Thung Sen – Thai Vi – Thung Nang', zh: 'Ninh Binh 电动单车游：Thung Sen – Thai Vi – Thung Nang', fr: 'Ninh Binh E-bike Tour : Thung Sen – Thai Vi – Thung Nang' },
  'Sunset Motorbike Tour Hang Múa – Phố đi bộ Hoa Lư': { en: 'Sunset Motorbike Tour: Hang Mua – Hoa Lu Walking Street', ja: 'サンセットバイクツアー：Hang Mua – Hoa Lu 歩行者天国', ko: '선셋 오토바이 투어: Hang Mua – Hoa Lu 보행자 거리', zh: '日落摩托之旅：Hang Mua – Hoa Lu 步行街', fr: 'Tour moto au coucher du soleil : Hang Mua – Rue piétonne Hoa Lu' },
  'Ninh Bình 1 ngày: Khám phá VQG Cúc Phương': { en: 'Ninh Binh 1-Day: Cuc Phuong National Park Discovery', ja: 'Ninh Binh 1日：Cuc Phuong 国立公園探検', ko: 'Ninh Binh 1일: Cuc Phuong 국립공원 탐험', zh: 'Ninh Binh 一日游：探索 Cuc Phuong 国家公园', fr: 'Ninh Binh 1 jour : Parc National de Cuc Phuong' },
  'Ninh Bình 2N1Đ Bungalow: Hoa Lư – Tam Cốc – Hang Múa – Tràng An': { en: 'Ninh Binh 2D1N Bungalow: Hoa Lu – Tam Coc – Hang Mua – Trang An', ja: 'Ninh Binh 2D1N バンガロー：Hoa Lu – Tam Coc – Hang Mua – Trang An', ko: 'Ninh Binh 2D1N 방갈로: Hoa Lu – Tam Coc – Hang Mua – Trang An', zh: 'Ninh Binh 2D1N 度假屋：Hoa Lu – Tam Coc – Hang Mua – Trang An', fr: 'Ninh Binh 2J1N Bungalow : Hoa Lu – Tam Coc – Hang Mua – Trang An' },
  'Ninh Bình 2N1Đ Bungalow: Hoa Lư – Tam Cốc – Cúc Phương': { en: 'Ninh Binh 2D1N Bungalow: Hoa Lu – Tam Coc – Cuc Phuong', ja: 'Ninh Binh 2D1N バンガロー：Hoa Lu – Tam Coc – Cuc Phuong', ko: 'Ninh Binh 2D1N 방갈로: Hoa Lu – Tam Coc – Cuc Phuong', zh: 'Ninh Binh 2D1N 度假屋：Hoa Lu – Tam Coc – Cuc Phuong', fr: 'Ninh Binh 2J1N Bungalow : Hoa Lu – Tam Coc – Cuc Phuong' },
  'Ninh Bình 2N1Đ Bungalow: Tam Cốc – Thung Nham – Bích Động': { en: 'Ninh Binh 2D1N Bungalow: Tam Coc – Thung Nham – Bich Dong', ja: 'Ninh Binh 2D1N バンガロー：Tam Coc – Thung Nham – Bich Dong', ko: 'Ninh Binh 2D1N 방갈로: Tam Coc – Thung Nham – Bich Dong', zh: 'Ninh Binh 2D1N 度假屋：Tam Coc – Thung Nham – Bich Dong', fr: 'Ninh Binh 2J1N Bungalow : Tam Coc – Thung Nham – Bich Dong' },
  'Ninh Bình 3N2Đ Nghỉ Dưỡng: Hoa Lư – Tam Cốc – Thung Nham – Tràng An': { en: 'Ninh Binh 3D2N Retreat: Hoa Lu – Tam Coc – Thung Nham – Trang An', ja: 'Ninh Binh 3D2N リゾート：Hoa Lu – Tam Coc – Thung Nham – Trang An', ko: 'Ninh Binh 3D2N 휴양: Hoa Lu – Tam Coc – Thung Nham – Trang An', zh: 'Ninh Binh 3D2N 深度度假：Hoa Lu – Tam Coc – Thung Nham – Trang An', fr: 'Ninh Binh 3J2N Séjour : Hoa Lu – Tam Coc – Thung Nham – Trang An' },
  'Ninh Bình 3N2Đ Nghỉ Dưỡng: Hoa Lư – Tam Cốc – Cúc Phương – Tràng An': { en: 'Ninh Binh 3D2N Retreat: Hoa Lu – Tam Coc – Cuc Phuong – Trang An', ja: 'Ninh Binh 3D2N リゾート：Hoa Lu – Tam Coc – Cuc Phuong – Trang An', ko: 'Ninh Binh 3D2N 휴양: Hoa Lu – Tam Coc – Cuc Phuong – Trang An', zh: 'Ninh Binh 3D2N 深度度假：Hoa Lu – Tam Coc – Cuc Phuong – Trang An', fr: 'Ninh Binh 3J2N Séjour : Hoa Lu – Tam Coc – Cuc Phuong – Trang An' },
  'Hoàng hôn': { en: 'Sunset', ja: 'サンセット', ko: '선셋', zh: '日落', fr: 'Coucher de soleil' },
  'Bình minh': { en: 'Sunrise', ja: 'サンライズ', ko: '일출', zh: '日出', fr: 'Lever de soleil' },
  '5★ Sáng': { en: '5★ Morning', ja: '5★ 朝', ko: '5★ 오전', zh: '5★ 早班', fr: '5★ Matin' },
  'Gỗ mộc': { en: 'Classic Wood', ja: '木造船', ko: '클래식 목선', zh: '古典木船', fr: 'Bois classique' },
  'Chiều tà': { en: 'Golden Hour', ja: '夕暮れ', ko: '황혼', zh: '黄昏', fr: 'Crépuscule' },
  '1 Ngày': { en: '1 Day', ja: '1日', ko: '1일', zh: '1日', fr: '1 Jour' },
  'Xe đạp điện': { en: 'E-bike', ja: '電動自転車', ko: '전기자전거', zh: '电动单车', fr: 'Vélo élec.' },
  'VQG Cúc Phương': { en: 'Cuc Phuong Park', ja: 'Cuc Phuong 公園', ko: 'Cuc Phuong 공원', zh: 'Cuc Phuong 公园', fr: 'Parc Cuc Phuong' },
  '2N1Đ': { en: '2D1N', ja: '1泊2日', ko: '1박2일', zh: '2天1夜', fr: '2J1N' },
  '3N2Đ': { en: '3D2N', ja: '2泊3日', ko: '2박3일', zh: '3天2夜', fr: '3J2N' },

  // Section 1: Flagship Ships
  'HẠM ĐỘI DU THUYỀN BIỂU TƯỢNG VỊNH LAN HẠ': { en: 'OUR ICONIC LAN HA BAY FLEET', ja: 'LAN HA 湾を象徴するフラッグシップ船隊', ko: 'LAN HA 베이를 대표하는 플래그십 크루즈 선단', zh: 'LAN HA 湾标志性旗舰游轮船队', fr: 'NOTRE FLOTTE EMBLÉMATIQUE EN BAIE DE LAN HA' },
  'Hai Đẳng Cấp Nghỉ Dưỡng — Một Trải Nghiệm Hoàn Mỹ': { en: 'Two Distinct Styles — One Unforgettable Voyage', ja: '2つの極上スタイル — 忘れられない航海へ', ko: '두 가지 품격의 휴양 — 하나의 완벽한 항해', zh: '两种奢华格调 — 一次完美难忘的航程', fr: 'Deux Styles d\'Exception — Un Voyage Inoubliable' },
  'Lựa chọn trải nghiệm du thuyền 5 sao siêu hiện đại với Cầu Kính & Bể sục Jacuzzi bốn mùa, hoặc cảm nhận sự ấm cúng, riêng tư tuyệt đối trên du thuyền Boutique phong cách gỗ cổ điển Á Đông.': {
    en: 'Choose between our ultra-modern 5★ flagship with glass Skywalk and all-season Jacuzzi, or the intimate warmth of our classic Indochine-style wooden Boutique yacht.',
    ja: 'ガラス Skywalk と通年温水 Jacuzzi を備えた最新鋭 5★ フラッグシップ、または東洋の伝統美が息づく天然木造のプライベートな Boutique クルーズからお選びいただけます。',
    ko: '글래스 Skywalk와 사계절 Jacuzzi를 갖춘 초현대식 5★ 크루즈, 또는 고풍스러운 원목 인테리어로 프라이빗한 휴식을 선사하는 Boutique 크루즈 중 선택해 보세요.',
    zh: '您可选择配备海空玻璃 Skywalk 与四季恒温 Jacuzzi 的超现代 5★ 旗舰游轮，或体验东方古典全实木打造的私密 Boutique 精品游轮。',
    fr: 'Choisissez entre notre navire amiral 5★ ultra-moderne avec passerelle de verre Skywalk et Jacuzzi quatre saisons, ou l\'intimité chaleureuse de notre yacht Boutique en bois précieux.'
  },
  '/cabin 2 khách': { en: '/2-guest suite', ja: '/2名1室', ko: '/2인 객실', zh: '/双人套房', fr: '/suite 2 pers.' },
  'Du thuyền 5 sao thế hệ mới 2026 với 30 Suite ban công riêng 100% view vịnh Lan Hạ. Sở hữu Cầu Kính Skywalk vươn ra biển độc nhất vô nhị, Bể sục Jacuzzi bốn mùa, nhà hàng kính Fine Dining và Sky Bar 360 độ.': {
    en: 'The newest 2026 5-star flagship featuring 30 private balcony suites with full Lan Ha Bay panorama. Equipped with an over-the-sea glass Skywalk, all-season Jacuzzi, glass Fine Dining restaurant and 360° Sky Bar.',
    ja: '2026年最新鋭の5つ星フラッグシップ。全30室が Lan Ha 湾を望む専用バルコニー付 Suite。海上に張り出すガラス Skywalk、通年温水 Jacuzzi、ガラス張り Fine Dining レストラン、360° Sky Bar を完備。',
    ko: 'Lan Ha 베이 파노라마 뷰의 전용 발코니를 갖춘 30개 Suite의 2026년형 5성급 플래그십. 해상 글래스 Skywalk, 사계절 온수 Jacuzzi, 통유리 Fine Dining 레스토랑 및 360° Sky Bar 완비.',
    zh: '2026 全新世代五星旗舰游轮，拥有 30 间 100% 饱览 Lan Ha 湾全景的独立阳台 Suite。配备悬空海景玻璃 Skywalk、四季恒温 Jacuzzi、全景玻璃 Fine Dining 餐厅及 360° Sky Bar。',
    fr: 'Navire amiral 5 étoiles nouvelle génération 2026 offrant 30 Suites avec balcon privé et vue panoramique sur la baie de Lan Ha. Équipé d\'une passerelle de verre Skywalk sur la mer, Jacuzzi 4 saisons, restaurant Fine Dining et Sky Bar 360°.'
  },
  '100% ban công riêng': { en: 'All private balcony', ja: '全室専用バルコニー', ko: '전 객실 전용 발코니', zh: '100% 独立阳台', fr: '100 % balcon privé' },
  'Cầu Kính & Jacuzzi': { en: 'Skywalk & Jacuzzi', ja: 'Skywalk & Jacuzzi', ko: 'Skywalk & Jacuzzi', zh: 'Skywalk & Jacuzzi', fr: 'Skywalk & Jacuzzi' },
  'Check-in độc quyền': { en: 'Exclusive Skywalk', ja: '限定フォトスポット', ko: '독점 포토존', zh: '独家打卡地标', fr: 'Expérience exclusive' },
  '2N1Đ · 3N2Đ': { en: '2D1N · 3D2N', ja: '1泊2日 · 2泊3日', ko: '1박2일 · 2박3일', zh: '2天1夜 · 3天2夜', fr: '2J1N · 3J2N' },
  'Hải trình trọn vẹn': { en: 'Signature voyages', ja: '厳選クルーズ日程', ko: '시그니처 항해 일정', zh: '精选航程路线', fr: 'Croisières complètes' },
  '100% Ban công riêng': { en: '100% Balcony Suites', ja: '100% 専用バルコニー', ko: '100% 전용 발코니', zh: '100% 独立阳台', fr: '100 % Balcon privé' },
  'Cầu Kính Skywalk': { en: 'Glass Skywalk', ja: 'ガラス Skywalk', ko: '글래스 Skywalk', zh: '玻璃 Skywalk', fr: 'Passerelle Skywalk' },
  'Jacuzzi bốn mùa': { en: 'Heated Jacuzzi', ja: '温水 Jacuzzi', ko: '사계절 Jacuzzi', zh: '四季恒温 Jacuzzi', fr: 'Jacuzzi 4 saisons' },
  'Nhà hàng Fine Dining': { en: 'Fine Dining', ja: 'Fine Dining レストラン', ko: 'Fine Dining 레스토랑', zh: 'Fine Dining 餐厅', fr: 'Restaurant Fine Dining' },
  'Kayak & Hang Sáng Tối': { en: 'Kayak & Hang Sang Toi', ja: 'カヤック＆Hang Sang Toi', ko: '카약 & Hang Sang Toi', zh: '皮划艇与 Hang Sang Toi', fr: 'Kayak & Hang Sang Toi' },
  'Đặt Du Thuyền 5★ →': { en: 'Book 5★ Cruise →', ja: '5★ クルーズを予約 →', ko: '5★ 크루즈 예약 →', zh: '预订 5★ 游轮 →', fr: 'Réserver Croisière 5★ →' },
  'Xem 30 Phòng Suite': { en: 'View All 30 Suites', ja: '全30室の Suite を見る', ko: '30개 Suite 객실 보기', zh: '查看 30 间 Suite 套房', fr: 'Voir les 30 Suites' },
  'Phong cách Á Đông cổ điển, ấm cúng và riêng tư tuyệt đối với chỉ 7 cabin giới hạn (tối đa 22 khách). Thiết kế 100% nội thất gỗ tự nhiên cao cấp, sundeck rộng 150m², ẩm thực thuần Việt với hải sản tươi sống đánh bắt tại chỗ.': {
    en: 'Classic Indochine aesthetic offering unmatched privacy with only 7 exclusive cabins (max 22 guests). 100% premium natural wood craftsmanship, spacious 150m² sundeck and authentic Vietnamese seafood gastronomy.',
    ja: 'わずか7室限定（最大22名）の究極のプライベート空間。100% 高級天然木の内装、150m² の広々としたサンデッキ、獲れたての新鮮な魚介類を使った本格ベトナム美食をご堪能いただけます。',
    ko: '단 7개 객실(최대 22명)로 완벽한 프라이버시를 제공하는 클래식 인도차이나 스타일. 100% 최고급 천연 원목 인테리어, 150m² 파노라마 선덱 및 신선한 현지 해산물 정통 요리를 선사합니다.',
    zh: '经典东方古典美学，仅设 7 间限量私密客舱（最多接待 22 位宾客）。100% 名贵天然实木匠心打造，配备 150m² 宽敞阳光甲板与现捕海鲜地道越南美馔。',
    fr: 'Esthétique indochinoise classique offrant une intimité absolue avec seulement 7 cabines exclusives (22 passagers max.). Boiseries 100 % bois précieux naturel, pont soleil de 150 m² et gastronomie de fruits de mer frais.'
  },
  'Giới hạn riêng tư': { en: 'Intimate & private', ja: '少人数プライベート', ko: '프라이빗 한정 객실', zh: '私密限量客舱', fr: 'Intime & privé' },
  '100% Gỗ quý': { en: '100% Precious Wood', ja: '100% 天然銘木', ko: '100% 천연 고급 원목', zh: '100% 名贵实木', fr: '100 % Bois précieux' },
  'Nội thất cao cấp': { en: 'Solid natural wood', ja: '最高級木造インテリア', ko: '프리미엄 원목 인테리어', zh: '匠心实木内饰', fr: 'Ébénisterie d\'art' },
  'Toàn cảnh 360 độ': { en: '360° Panorama deck', ja: '360° パノラマデッキ', ko: '360° 파노라마 데크', zh: '360° 全景甲板', fr: 'Pont panoramique 360°' },
  '100% Gỗ tự nhiên': { en: '100% Natural Wood', ja: '100% 天然木', ko: '100% 천연 원목', zh: '100% 天然实木', fr: '100 % Bois naturel' },
  'Không gian riêng tư': { en: 'Max 22 Guests', ja: '最大22名の少人数', ko: '최대 22명 소규모', zh: '至多 22 位贵宾', fr: 'Max 22 passagers' },
  'Hải sản Cát Bà tươi sống': { en: 'Fresh Cat Ba Seafood', ja: '新鮮な Cat Ba 海鮮', ko: '신선한 Cat Ba 해산물', zh: '鲜活 Cat Ba 海鲜', fr: 'Fruits de mer frais de Cat Ba' },
  'Đạp xe Làng Việt Hải': { en: 'Viet Hai Cycling', ja: 'Viet Hai 村サイクリング', ko: 'Viet Hai 마을 라이딩', zh: '骑行 Viet Hai 古村', fr: 'Vélo au village Viet Hai' },
  'Tiệc trà Sunset Tea': { en: 'Sunset Tea Party', ja: 'サンセットティー', ko: '선셋 티 파티', zh: '日落下午茶', fr: 'Tea Party au coucher du soleil' },
  'Đặt Boutique Cruise →': { en: 'Book Boutique Cruise →', ja: 'Boutique Cruise を予約 →', ko: 'Boutique Cruise 예약 →', zh: '预订 Boutique Cruise →', fr: 'Réserver Boutique Cruise →' },
  'Xem 7 Cabin Gỗ Quý': { en: 'View 7 Wood Cabins', ja: '7室の木造キャビンを見る', ko: '7개 원목 객실 보기', zh: '查看 7 间实木客舱', fr: 'Voir les 7 Cabines en Bois' },

  // Section 2: Suite Collection
  'BỘ SƯU TẬP PHÒNG NGHỈ THƯỢNG LƯU': { en: 'THE SUITE COLLECTION', ja: 'ラグジュアリースイートコレクション', ko: '프리미엄 스위트 객실 컬렉션', zh: '尊尚套房系列甄选', fr: 'COLLECTION DE SUITES & CABINES' },
  'Không Gian Nghỉ Dưỡng Sang Trọng & Riêng Tư': { en: 'Private Balcony Suites & Handcrafted Wooden Cabins', ja: '専用バルコニー付 Suite ＆ 伝統木造キャビン', ko: '전용 발코니 Suite & 수제 원목 캐빈', zh: '私享海景阳台套房与匠心实木客舱', fr: 'Suites avec Balcon Privé & Cabines en Bois Précieux' },
  '100% phòng nghỉ trên du thuyền đều có ban công riêng view biển, bồn tắm ngắm vịnh, cửa sổ kính toàn cảnh và hệ thống điều hòa 2 chiều hiện đại. Lướt mũi tên để xem đa góc chụp thực tế.': {
    en: 'Every cabin boasts private ocean-view balconies, bay-facing bathtubs, floor-to-ceiling panoramic windows and bespoke amenities. Use the arrows on each card to preview multiple real photos.',
    ja: '全客室にオーシャンビュー専用バルコニー、湾を望むバスタブ、パノラマ窓、最新空調を完備。カードの矢印で実際の客室写真を複数ご覧いただけます。',
    ko: '모든 객실에 오션뷰 전용 발코니, 베이뷰 욕조, 파노라마 통유리창 및 최신 냉난방 시스템을 갖추고 있습니다. 화살표를 눌러 다양한 실제 객실 사진을 확인해 보세요.',
    zh: '游轮上 100% 客房均配备独立海景阳台、观景浴缸、全景落地窗及冷暖空调系统。点击卡片左右箭头即可预览多角度实拍图。',
    fr: 'Toutes nos cabines offrent un balcon privé vue mer, une baignoire face à la baie, des baies vitrées panoramiques et la climatisation réversible. Utilisez les flèches pour parcourir les photos réelles.'
  },
  'Tất Cả Hạng Phòng (6)': { en: 'All Suites & Cabins (6)', ja: 'すべての客室タイプ (6)', ko: '전체 객실 등급 (6)', zh: '全部房型 (6)', fr: 'Toutes les Catégories (6)' },
  'Du thuyền 5★ Daiichi Luxury (30 Suite)': { en: '5★ Daiichi Luxury Cruise (30 Suites)', ja: '5★ Daiichi Luxury Cruise (30 Suites)', ko: '5★ Daiichi Luxury Cruise (30 Suites)', zh: '5★ Daiichi Luxury Cruise (30 间套房)', fr: '5★ Daiichi Luxury Cruise (30 Suites)' },
  'Du thuyền 4★ Daiichi Boutique (7 Cabin Gỗ Quý)': { en: '4★ Daiichi Boutique Cruise (7 Cabins)', ja: '4★ Daiichi Boutique Cruise (7 キャビン)', ko: '4★ Daiichi Boutique Cruise (7 캐빈)', zh: '4★ Daiichi Boutique Cruise (7 间实木舱)', fr: '4★ Daiichi Boutique Cruise (7 Cabines)' },
  '/đêm': { en: '/night', ja: '/泊', ko: '/박', zh: '/晚', fr: '/nuit' },
  'Chi tiết & Tính giá': { en: 'Details & Calculator', ja: '詳細・料金計算', ko: '상세 및 요금 계산', zh: '详情与价格计算', fr: 'Détails & Devis' },
  'Đặt phòng →': { en: 'Book →', ja: '予約 →', ko: '예약 →', zh: '预订 →', fr: 'Réserver →' },

  // Suite Badges, Specs & Descriptions
  'VIP TỔNG THỐNG · TẦNG 4': { en: 'PRESIDENTIAL VIP · DECK 4', ja: 'プレジデンシャル VIP · 4階', ko: '프레지덴셜 VIP · 4층', zh: '总统 VIP 套房 · 4层', fr: 'SUITE PRÉSIDENTIELLE VIP · PONT 4' },
  'GIA ĐÌNH CAO CẤP · TẦNG 2': { en: 'FAMILY & EXECUTIVE · DECK 2', ja: 'ファミリー＆エグゼクティブ · 2階', ko: '패밀리 & 이그제큐티브 · 2층', zh: '豪华家庭套房 · 2层', fr: 'SUITE FAMILIALE EXÉCUTIVE · PONT 2' },
  'BỒN TẮM VIEW VỊNH · TẦNG 2': { en: 'BAY-VIEW BATHTUB · DECK 2', ja: '湾岸ビューバスタブ · 2階', ko: '베이뷰 욕조 · 2층', zh: '海景浴缸套房 · 2层', fr: 'BAIGNOIRE VUE BAIE · PONT 2' },
  'BAN CÔNG RIÊNG · TẦNG 2': { en: 'PRIVATE BALCONY · DECK 2', ja: '専用バルコニー · 2階', ko: '전용 발코니 · 2층', zh: '独立海景阳台 · 2层', fr: 'BALCON PRIVÉ · PONT 2' },
  '100% GỖ TỰ NHIÊN · TẦNG 2': { en: '100% NATURAL WOOD · DECK 2', ja: '100% 天然木 · 2階', ko: '100% 천연 원목 · 2층', zh: '100% 天然实木 · 2层', fr: '100 % BOIS NATUREL · PONT 2' },
  'CỔ ĐIỂN ẤM CÚNG · TẦNG 1': { en: 'CLASSIC HERITAGE · DECK 1', ja: 'クラシックヘリテージ · 1階', ko: '클래식 헤리티지 · 1층', zh: '古典温馨木舱 · 1层', fr: 'CHARME CLASSIQUE · PONT 1' },
  '2 người lớn': { en: '2 Adults', ja: '大人2名', ko: '성인 2명', zh: '2 位成人', fr: '2 Adultes' },
  '2 - 4 khách': { en: '2 – 4 Guests', ja: '2〜4名', ko: '2~4명', zh: '2 - 4 位宾客', fr: '2 à 4 Passagers' },
  '2 người lớn + 1 trẻ em': { en: '2 Adults + 1 Child', ja: '大人2名＋子供1名', ko: '성인 2명 + 어린이 1명', zh: '2 成人 + 1 儿童', fr: '2 Adultes + 1 Enfant' },
  '2 - 3 người lớn': { en: '2 – 3 Adults', ja: '大人2〜3名', ko: '성인 2~3명', zh: '2 - 3 位成人', fr: '2 à 3 Adultes' },
  'Tầng 4 (Boong cao nhất)': { en: 'Deck 4 (Top Deck)', ja: 'デッキ4（最上階）', ko: '4층 (최상층 데크)', zh: '4层（最高甲板）', fr: 'Pont 4 (Pont supérieur)' },
  'Tầng 2': { en: 'Deck 2', ja: 'デッキ2', ko: '2층 데크', zh: '2层甲板', fr: 'Pont 2' },
  'Tầng 2 Du thuyền Boutique': { en: 'Deck 2 · Boutique Cruise', ja: 'デッキ2 · Boutique Cruise', ko: '2층 · Boutique Cruise', zh: '2层 · Boutique Cruise', fr: 'Pont 2 · Boutique Cruise' },
  'Tầng 1 Du thuyền Boutique': { en: 'Deck 1 · Boutique Cruise', ja: 'デッキ1 · Boutique Cruise', ko: '1층 · Boutique Cruise', zh: '1层 · Boutique Cruise', fr: 'Pont 1 · Boutique Cruise' },
  'Ban công riêng cực đại 15m²': { en: 'Expansive 15m² private sun terrace', ja: '広大な 15m² 専用バルコニー', ko: '초대형 15m² 전용 발코니', zh: '15m² 超大私享阳光露台', fr: 'Immense terrasse privée de 15 m²' },
  'Bồn tắm nằm sát kính view 270°': { en: '270° panoramic glass-side bathtub', ja: '270° パノラマビューバスタブ', ko: '270° 파노라마 뷰 욕조', zh: '270° 全景落地窗浴缸', fr: 'Baignoire panoramique 270°' },
  'Khu vực tiếp khách salon cao cấp': { en: 'Executive lounge & living area', ja: '高級サロンリビングエリア', ko: '고급 살롱 응접실 공간', zh: '尊享会客沙龙区', fr: 'Salon privé de réception' },
  'Ban công riêng view biển': { en: 'Private ocean-view balcony', ja: 'オーシャンビュー専用バルコニー', ko: '오션뷰 전용 발코니', zh: '独立海景阳台', fr: 'Balcon privé vue mer' },
  'Bồn tắm nằm thư giãn': { en: 'Relaxing soaking bathtub', ja: 'くつろぎのバスタブ', ko: '릴렉싱 욕조', zh: '舒适浸浴浴缸', fr: 'Baignoire de détente' },
  'Không gian gia đình rộng rãi 45m²': { en: 'Spacious 45m² family layout', ja: '広々とした 45m² ファミリー空間', ko: '넓은 45m² 패밀리 공간', zh: '45m² 宽敞家庭空间', fr: 'Espace familial spacieux de 45 m²' },
  'Bồn tắm nằm sát cửa kính lớn': { en: 'Bathtub by full-height window', ja: '大窓に面したバスタブ', ko: '통유리창 옆 욕조', zh: '临窗观景大浴缸', fr: 'Baignoire face à la baie vitrée' },
  'Cửa sổ kính sát trần ngắm vịnh': { en: 'Floor-to-ceiling bay windows', ja: '湾を望む全面ガラス窓', ko: '베이뷰 통유리창', zh: '全海景落地玻璃窗', fr: 'Baies vitrées toute hauteur' },
  'Ban công riêng ngắm vịnh': { en: 'Private bay-view balcony', ja: '湾を望む専用バルコニー', ko: '베이뷰 전용 발코니', zh: '观景私家阳台', fr: 'Balcon privé sur la baie' },
  'View biển trực tiếp': { en: 'Direct ocean panorama', ja: 'ダイレクトオーシャンビュー', ko: '다이렉트 오션뷰', zh: '直面海景视野', fr: 'Vue mer directe' },
  'Điều hòa 2 chiều': { en: 'Two-way air conditioning', ja: '冷暖房エアコン', ko: '냉난방 에어컨', zh: '冷暖双制空调', fr: 'Climatisation réversible' },
  '100% Nội thất gỗ tự nhiên': { en: '100% natural wood interior', ja: '100% 天然木インテリア', ko: '100% 천연 원목 인테리어', zh: '100% 天然实木内饰', fr: 'Intérieur 100 % bois naturel' },
  'Ban công riêng view vịnh': { en: 'Private bay-view wooden balcony', ja: '湾を望む木製専用バルコニー', ko: '베이뷰 전용 원목 발코니', zh: '海景独立木质阳台', fr: 'Balcon privé en bois vue baie' },
  'Gỗ tự nhiên 100%': { en: '100% handcrafted wood', ja: '100% 天然木造り', ko: '100% 수제 천연 원목', zh: '100% 纯天然实木', fr: 'Bois naturel 100 %' },
  'Cửa sổ view biển': { en: 'Ocean-view picture window', ja: 'オーシャンビュー窓', ko: '오션뷰 대형 창문', zh: '海景大窗', fr: 'Fenêtre panoramique vue mer' },
  'Điều hòa': { en: 'Air conditioning', ja: 'エアコン完備', ko: '에어컨 완비', zh: '独立空调', fr: 'Climatisation' },

  // Section 3: Highlights
  'ĐẶC QUYỀN ĐỈNG CAO': { en: 'EXCLUSIVE PRIVILEGES', ja: '極上の限定特典', ko: '독보적인 프리미엄 특권', zh: '尊享独家礼遇', fr: 'PRIVILÈGES EXCLUSIFS' },
  'Vì Sao Chọn Daiichi Cruise?': { en: 'Why Cruise with Daiichi Cruise?', ja: 'Daiichi Cruise が選ばれる理由', ko: '왜 Daiichi Cruise를 선택해야 할까요?', zh: '为何选择 Daiichi Cruise？', fr: 'Pourquoi Choisir Daiichi Cruise ?' },
  'Hơn cả một chuyến tham quan, Daiichi Cruise kiến tạo hành trình nghỉ dưỡng đầy cảm xúc với những tiện ích độc quyền chưa từng có trên vịnh Lan Hạ.': {
    en: 'Beyond an ordinary cruise, Daiichi Cruise creates an emotional luxury voyage with exclusive amenities in Lan Ha Bay.',
    ja: '単なる観光を超え、Daiichi Cruise は Lan Ha 湾で唯一無二の設備と心温まるおもてなしで感動の船旅をお届けします。',
    ko: '단순한 유람을 넘어, Daiichi Cruise는 Lan Ha 베이만의 독보적인 시설과 진심 어린 서비스로 감동적인 휴양을 선사합니다.',
    zh: '不止于观光，Daiichi Cruise 以 Lan Ha 湾独一无二的奢华设施与贴心服务，为您缔造难忘的海上度假之旅。',
    fr: 'Bien plus qu\'une simple croisière, Daiichi Cruise crée un voyage d\'exception avec des équipements exclusifs dans la baie de Lan Ha.'
  },
  'Cầu Kính Skywalk Độc Nhất Vịnh Lan Hạ': { en: 'Exclusive Ocean Glass Skywalk in Lan Ha Bay', ja: 'Lan Ha 湾唯一の海上ガラス Skywalk', ko: 'Lan Ha 베이 유일의 오션 글래스 Skywalk', zh: 'Lan Ha 湾独家海空玻璃 Skywalk', fr: 'Passerelle de verre Skywalk exclusive en Baie de Lan Ha' },
  'Check-in giữa không trung trên cây cầu kính vươn dài ra mặt vịnh. Trải nghiệm bước chân trên làn nước biển trong vắt với khung cảnh núi đá vôi kỳ vĩ xung quanh.': {
    en: 'Walk on air above the turquoise sea with our panoramic glass Skywalk stretching over Lan Ha Bay — an extraordinary photo opportunity.',
    ja: 'エメラルドグリーンの海上に張り出すガラス Skywalk で空中散歩。奇岩群に囲まれた絶景フォトスポットです。',
    ko: '에메랄드빛 바다 위로 뻗은 투명 글래스 Skywalk 위를 걸으며 기암괴석 절경과 함께 인생샷을 남겨보세요.',
    zh: '漫步于延伸至翡翠海面之上的全景玻璃 Skywalk，脚下是澄澈碧海，四周是奇峰怪石，定格震撼大片。',
    fr: 'Marchez au-dessus des eaux émeraude sur notre passerelle de verre Skywalk suspendue face aux pitons karstiques.'
  },
  'Bể Sục Jacuzzi Nước Ấm Bốn Mùa': { en: 'Four-Season Bay-View Jacuzzi', ja: '絶景を望む通年温水 Jacuzzi', ko: '사계절 온수 오션뷰 Jacuzzi', zh: '四季恒温全景露天 Jacuzzi', fr: 'Jacuzzi chauffé quatre saisons face à la baie' },
  'Bể sục Jacuzzi ngoài trời trên boong thượng. Thư giãn ngâm mình trong làn nước ấm áp, nhâm nhi ly cocktail và ngắm hoàng hôn rực rỡ buông xuống vịnh.': {
    en: 'Outdoor heated Jacuzzi on the sundeck. Soak in warm bubbling waters with a signature cocktail while watching the sunset over Lan Ha Bay.',
    ja: 'サンデッキの屋外温水 Jacuzzi。カクテルを片手に温かいジャグジーでくつろぎながら、湾に沈む美しい夕日を眺められます。',
    ko: '선덱 야외 온수 Jacuzzi에서 칵테일 한 잔과 함께 따뜻한 스파를 즐기며 황홀한 일몰을 감상해 보세요.',
    zh: '位于顶层阳光甲板的露天恒温 Jacuzzi。浸泡在温暖水疗池中品尝特调鸡尾酒，静赏壮丽海上日落。',
    fr: 'Jacuzzi extérieur chauffé sur le pont supérieur. Détendez-vous dans une eau chaude bouillonnante un cocktail à la main devant le coucher du soleil.'
  },
  '100% Suite Có Ban Công Riêng Biệt': { en: '100% Private Balcony Suites', ja: '全室オーシャンビュー＆専用バルコニー付 Suite', ko: '100% 프라이빗 오션뷰 발코니 Suite', zh: '100% 全独立私享海景阳台 Suite', fr: '100 % des Suites avec balcon privé vue mer' },
  'Mỗi phòng nghỉ đều có ban công riêng hướng thẳng ra kỳ quan vịnh Lan Hạ. Thức giấc đón những tia nắng đầu tiên và làn gió biển tươi mát ngay từ giường ngủ.': {
    en: 'Every single suite opens up to a private balcony facing Lan Ha Bay. Wake up to fresh sea breezes and sunrise over the emerald karsts.',
    ja: 'すべての客室に Lan Ha 湾を望む専用バルコニーを完備。ベッドにいながらにして朝日の輝きと心地よい潮風を感じられます。',
    ko: '모든 객실에 Lan Ha 베이를 향한 전용 발코니가 마련되어 있습니다. 침대에서 바로 상쾌한 바닷바람과 일출을 맞이하세요.',
    zh: '每一间客房均拥有直面 Lan Ha 湾奇观的私人阳台。清晨在床上即可沐浴第一缕阳光与清新海风。',
    fr: 'Chaque suite s\'ouvre sur un balcon privé face à la baie de Lan Ha. Réveillez-vous avec la brise marine et le lever du soleil.'
  },
  'Nhà Hàng Kính Fine-Dining & Sky Bar': { en: 'Glass Fine-Dining & 360° Sky Bar', ja: 'ガラス張り Fine-Dining ＆ 360° Sky Bar', ko: '통유리 Fine-Dining 레스토랑 & 360° Sky Bar', zh: '全景玻璃 Fine-Dining 餐厅与 360° Sky Bar', fr: 'Restaurant Fine-Dining panoramique & Sky Bar 360°' },
  'Thưởng thức hải sản tươi sống Cát Bà (cua, tu hài, bề bề) cùng set menu Á - Âu sang trọng trong không gian nhà hàng kính tràn ngập view vịnh biển.': {
    en: 'Indulge in fresh Cat Ba seafood and Asian-European Fine-Dining menus surrounded by floor-to-ceiling glass windows and panoramic bay views.',
    ja: '全面ガラス張りのパノラマレストランで、新鮮な Cat Ba 産シーフードや和洋折衷の Fine-Dining コースをご堪能ください。',
    ko: '파노라마 통유리 레스토랑에서 신선한 Cat Ba 해산물과 품격 있는 유러피안·아시안 Fine-Dining 코스 요리를 즐겨보세요.',
    zh: '在 360° 全景落地玻璃餐厅内，尽享现捕 Cat Ba 鲜活海鲜与中西融合 Fine-Dining 饕餮盛宴。',
    fr: 'Savourez les fruits de mer frais de Cat Ba et une cuisine Fine-Dining entouré de baies vitrées panoramiques.'
  },
  'Chèo Kayak Hang Sáng Tối & Làng Việt Hải': { en: 'Kayak Hang Sang Toi & Viet Hai Village', ja: 'Hang Sang Toi カヤック＆ Viet Hai 村探訪', ko: 'Hang Sang Toi 카약 & Viet Hai 마을 투어', zh: '划皮划艇探秘 Hang Sang Toi 与 Viet Hai 古村', fr: 'Kayak à Hang Sang Toi et village Viet Hai' },
  'Tự tay chèo thuyền kayak len lỏi qua vòm hang thạch nhũ kỳ bí, tắm biển tại bãi Ba Trái Đào hoang sơ và đạp xe xuyên thung lũng cổ tích làng Việt Hải.': {
    en: 'Paddle kayaks through Hang Sang Toi caverns, swim at secluded Ba Trai Dao lagoon, and cycle through the untouched valley of Viet Hai village.',
    ja: '神秘的な Hang Sang Toi をカヤックで進み、秘境 Ba Trai Dao ビーチで泳ぎ、緑豊かな Viet Hai 村をサイクリングで巡ります。',
    ko: '신비로운 Hang Sang Toi 동굴 카약, 청정 Ba Trai Dao 해변 수영, 그리고 평화로운 Viet Hai 마을 자전거 하이킹을 즐겨보세요.',
    zh: '亲手划皮划艇穿过神秘钟乳石洞，在原生态 Ba Trai Dao 海滩畅游，并骑行穿越世外桃源般的 Viet Hai 古村。',
    fr: 'Pagayez en kayak sous les voûtes de Hang Sang Toi, baignez-vous à Ba Trai Dao et pédalez jusqu\'au village de Viet Hai.'
  },
  'Hệ Sinh Thái Đưa Đón Limousine Tận Nhà': { en: 'Seamless Door-to-Door Limousine Transfers', ja: 'ホテル発着シームレス Limousine 送迎', ko: '도어 투 도어 Limousine 전담 픽업 서비스', zh: '点对点专车 Limousine 尊享接送服务', fr: 'Transferts Limousine Porte-à-Porte' },
  'Xe Limousine đời mới đón tận nơi tại Phố Cổ Hà Nội, đưa thẳng đến bến tàu du thuyền. Hành trình trọn vẹn, thuận tiện và an tâm tuyệt đối từ cửa nhà bạn.': {
    en: 'Luxury Limousine pickup right from your Ha Noi Old Quarter hotel straight to the cruise pier — seamless, punctual, and worry-free.',
    ja: 'Ha Noi 旧市街のホテルからクルーズ港まで最新 Limousine で直行送迎。ご出発からご帰着まで安心・快適です。',
    ko: 'Ha Noi 구시가지 호텔 앞에서 크루즈 선착장까지 최신형 Limousine으로 편안하고 안전하게 모셔다 드립니다.',
    zh: '全新豪华 Limousine 从 Ha Noi 老城区酒店直达游轮码头，全程无缝衔接，省心舒适。',
    fr: 'Prise en charge en Limousine de luxe directement à votre hôtel du Vieux Quartier de Ha Noi jusqu\'à l\'embarcadère.'
  },

  // Section 4: Itinerary
  'LỊCH TRÌNH CHI TIẾT': { en: 'CURATED ITINERARIES', ja: '詳細クルーズスケジュール', ko: '상세 운항 일정표', zh: '精选航程时间表', fr: 'ITINÉRAIRES DÉTAILLÉS' },
  'Hải Trình Trọn Vẹn Cảm Xúc': { en: 'Your Voyage Through the Wonders', ja: '感動に満ちた Lan Ha 湾クルーズ日程', ko: '감동으로 가득한 Lan Ha 베이 항해', zh: '饱览奇观的完美海上假期', fr: 'Votre Croisière au Cœur des Merveilles' },
  'Được thiết kế tỉ mỉ cân bằng giữa nghỉ dưỡng thư thái và các hoạt động trải nghiệm thiên nhiên đặc sắc nhất vịnh Lan Hạ.': {
    en: 'Thoughtfully balanced between blissful relaxation on board and the most iconic natural excursions in Lan Ha Bay.',
    ja: '船上での優雅な休息と、Lan Ha 湾ならではの自然アクティビティを絶妙なバランスで組み合わせました。',
    ko: '선상에서의 여유로운 휴식과 Lan Ha 베이 최고의 자연 체험 액티비티가 조화롭게 구성된 일정입니다.',
    zh: '精心平衡船上悠闲度假与 Lan Ha 湾最具代表性的自然探索活动。',
    fr: 'Un équilibre parfait entre détente absolue à bord et excursions naturelles inoubliables dans la baie de Lan Ha.'
  },
  'Hải trình 2 Ngày 1 Đêm (2D1N) — Phổ biến nhất': { en: '2 Days 1 Night (2D1N) — Most Popular', ja: '1泊2日（2D1N）コース — 一番人気', ko: '1박 2일 (2D1N) 일정 — 최고 인기', zh: '2天1夜（2D1N）航程 — 最受欢迎', fr: 'Croisière 2 Jours 1 Nuit (2D1N) — Le plus populaire' },
  'Hải trình 3 Ngày 2 Đêm (3D2N) — Trải nghiệm sâu': { en: '3 Days 2 Nights (3D2N) — Deep Immersion', ja: '2泊3日（3D2N）コース — 満喫プラン', ko: '2박 3일 (3D2N) 일정 — 심층 탐험', zh: '3天2夜（3D2N）航程 — 深度漫游', fr: 'Croisière 3 Jours 2 Nuits (3D2N) — Immersion totale' },
  'Chào đón lên tàu & Check-in': { en: 'Welcome Aboard & Check-in', ja: '乗船歓迎＆チェックイン', ko: '승선 환영 & 체크인', zh: '登船欢迎礼遇与办理入住', fr: 'Embarquement & Check-in' },
  'Thưởng thức đồ uống chào mừng Welcome Drink, nghe giới thiệu hải trình và nhận phòng suite sang trọng có ban công riêng.': {
    en: 'Enjoy welcome drinks, cruise safety briefing and check into your private balcony suite.',
    ja: 'ウェルカムドリンクをお楽しみいただきながらクルーズ案内を受け、専用バルコニー付 Suite へチェックイン。',
    ko: '웰컴 드링크와 함께 운항 안내를 받은 후 전용 발코니 Suite 객실에 체크인합니다.',
    zh: '享用欢迎饮品，听取航程介绍，随后入住带私人阳台的豪华 Suite 套房。',
    fr: 'Verre de bienvenue, présentation de la croisière et installation dans votre suite avec balcon privé.'
  },
  'Ăn trưa Fine Dining ngắm vịnh': { en: 'Panoramic Bay Lunch', ja: '湾を望む Fine Dining ランチ', ko: '베이뷰 Fine Dining 런치', zh: '海景 Fine Dining 午餐', fr: 'Déjeuner Fine Dining face à la baie' },
  'Thưởng thức bữa trưa thịnh soạn với các món hải sản tươi sống trong khi du thuyền lướt êm đềm qua Hòn Rùa, Làng Chài Cái Bèo.': {
    en: 'Savor a fresh seafood lunch as the ship glides past Hon Rua and the ancient floating village of Cai Beo.',
    ja: '船が Hon Rua や歴史ある Cai Beo 水上村をゆったりと進む中、新鮮な海鮮ランチをご堪能ください。',
    ko: '크루즈가 Hon Rua와 고대 수상 마을 Cai Beo를 지나는 동안 풍성한 해산물 런치를 즐깁니다.',
    zh: '游轮平稳驶过 Hon Rua 与百年水上渔村 Cai Beo，同时享用丰盛现捕海鲜午餐。',
    fr: 'Dégustez un déjeuner de fruits de mer frais tandis que le navire glisse devant Hon Rua et le village flottant de Cai Beo.'
  },
  'Chèo Kayak & Tắm biển Ba Trái Đào': { en: 'Kayaking & Swimming at Ba Trai Dao', ja: 'Ba Trai Dao でカヤック＆海水浴', ko: 'Ba Trai Dao 카약 & 해수욕', zh: 'Ba Trai Dao 皮划艇与海滩畅游', fr: 'Kayak & Baignade à Ba Trai Dao' },
  'Khám phá làn nước ngọc bích, chèo kayak qua các hang hốc tự nhiên và đắm mình trong làn nước biển trong vắt.': {
    en: 'Paddle kayaks into emerald lagoons and swim off secluded white-sand beaches at Ba Trai Dao.',
    ja: 'エメラルド色の入り江でカヤックを漕ぎ、透明度の高いプライベートビーチで泳ぎます。',
    ko: '에메랄드빛 라군에서 카약을 타고 청정 해변에서 자유롭게 수영을 즐깁니다.',
    zh: '在翡翠般的海湾划皮划艇穿行奇石洞穴，并在澄澈洁白的海滩尽情畅游。',
    fr: 'Pagayez en kayak dans les lagons émeraude et baignez-vous dans des eaux cristallines.'
  },
  'Tiệc trà Sunset Party & Ngâm bồn Jacuzzi': { en: 'Sunset Party & Sundeck Jacuzzi', ja: 'サンセットパーティー＆温水 Jacuzzi', ko: '선셋 파티 & 선덱 Jacuzzi', zh: '日落下午茶派对与 Jacuzzi 水疗', fr: 'Sunset Party & Jacuzzi sur le pont' },
  'Ngắm hoàng hôn tráng lệ buông xuống trên sundeck với tiệc trà chiều, hoa quả tươi miễn phí và thư giãn trong bồn sục nước ấm.': {
    en: 'Complimentary tea, pastries and fresh fruits at the sunset party, combined with warm Jacuzzi relaxation.',
    ja: 'サンデッキでお茶や新鮮なフルーツを楽しみながら夕日を眺め、温水 Jacuzzi で癒やしのひとときを。',
    ko: '선덱에서 다과와 신선한 과일을 즐기며 일몰을 감상하고 따뜻한 Jacuzzi에서 피로를 풉니다.',
    zh: '在阳光甲板伴着壮丽日落享用免费下午茶与鲜果，并在恒温 Jacuzzi 中彻底放松身心。',
    fr: 'Thé, fruits frais offerts au coucher du soleil sur le pont supérieur et détente dans le Jacuzzi chauffé.'
  },
  'Bữa tối lãng mạn & Ẩm thực 5 sao': { en: 'Gourmet 5★ Dinner Experience', ja: 'ロマンチックな5つ星ディナー', ko: '로맨틱 5성급 디너 코스', zh: '浪漫五星级烛光晚宴', fr: 'Dîner Gastronomique 5 Étoiles' },
  'Thưởng thức set menu đẳng cấp trong ánh đèn ấm cúng của nhà hàng kính nhìn ra vịnh đêm tĩnh lặng.': {
    en: 'Dine on exquisite seasonal delicacies prepared by our master chefs in the glass-enclosed restaurant.',
    ja: '静かな夜の湾を望むガラス張りレストランで、シェフ特製のフルコースディナーをお楽しみください。',
    ko: '고요한 밤바다가 내려다보이는 통유리 레스토랑에서 셰프 특선 풀코스 디너를 만끽합니다.',
    zh: '在静谧夜色海湾环绕的全景玻璃餐厅内，品鉴星级主厨精心烹制的定制晚宴。',
    fr: 'Dégustez un menu gastronomique raffiné dans l\'ambiance feutrée du restaurant panoramique.'
  },
  'Câu mực đêm, Sky Bar & Nghỉ ngơi': { en: 'Squid Fishing & Starlit Sky Bar', ja: '夜イカ釣り＆星空 Sky Bar', ko: '밤 오징어 낚시 & 별빛 Sky Bar', zh: '夜钓鱿鱼、星空 Sky Bar 与休憩', fr: 'Pêche aux calamars, Sky Bar étoilé & Détente' },
  'Thử tài câu mực cùng thuyền viên, thưởng thức đồ uống tại Sky Bar hoặc thư giãn ngắm sao trời trên ban công riêng.': {
    en: 'Try night squid fishing with the crew, sip craft cocktails at the Sky Bar or unwind on your private balcony.',
    ja: 'クルーと一緒に夜イカ釣りに挑戦したり、Sky Bar でカクテルを楽しんだり、専用バルコニーで星空を眺めたり。',
    ko: '승무원과 함께 밤 오징어 낚시를 체험하거나 Sky Bar에서 칵테일을 즐기며 전용 발코니에서 휴식합니다.',
    zh: '与船员一同体验夜钓鱿鱼之乐，在 Sky Bar 小酌微醺，或在私人阳台仰望璀璨星空。',
    fr: 'Initiez-vous à la pêche nocturne aux calamars, savourez un verre au Sky Bar ou admirez les étoiles depuis votre balcon.'
  },
  'Thái Cực Quyền (Taichi) đón bình minh': { en: 'Sunrise Taichi Session', ja: '日の出 Taichi（太極拳）セッション', ko: '일출 Taichi (태극권) 클래스', zh: '海上日出太极（Taichi）晨练', fr: 'Séance de Taichi au lever du soleil' },
  'Khởi đầu ngày mới tràn đầy năng lượng với bài tập Taichi trên sundeck khi bình minh ló rạng trên mặt vịnh.': {
    en: 'Greet the morning sun with a rejuvenating Taichi class on the panoramic sundeck.',
    ja: '朝日が昇るパノラマサンデッキで、心身をリフレッシュする Taichi レッスンから一日をスタート。',
    ko: '아침 해가 떠오르는 파노라마 선덱에서 상쾌한 Taichi 수업으로 활기찬 하루를 시작합니다.',
    zh: '当晨曦洒满海湾，在全景阳光甲板上跟随教练习练太极（Taichi），焕发身心活力。',
    fr: 'Saluez le soleil levant avec une séance ressourçante de Taichi sur le pont panoramique.'
  },
  'Khám phá Làng cổ Việt Hải': { en: 'Explore Ancient Viet Hai Village', ja: '秘境 Viet Hai 古村の探索', ko: '고대 생태마을 Viet Hai 탐방', zh: '探访世外古村 Viet Hai', fr: 'Découverte de l\'ancien village de Viet Hai' },
  'Đi xe điện hoặc đạp xe qua đường hầm xuyên núi vào ngôi làng cổ nằm giữa thung lũng rừng quốc gia Cát Bà.': {
    en: 'Ride bicycles or electric cars through mountain tunnels into the heritage Viet Hai village tucked inside Cat Ba National Park.',
    ja: '自転車または電動カートで山トンネルを抜け、Cat Ba 国立公園の谷間に佇む歴史ある Viet Hai 村を巡ります。',
    ko: '자전거 또는 전동차를 타고 산악 터널을 지나 Cat Ba 국립공원 깊은 계곡 속 Viet Hai 마을을 여행합니다.',
    zh: '乘坐电瓶车或骑单车穿过山洞隧道，深入坐落于 Cat Ba 国家公园山谷腹地的百年 Viet Hai 古村。',
    fr: 'Parcourez à vélo ou en voiture électrique la vallée verdoyante du village de Viet Hai au cœur du parc national de Cat Ba.'
  },
  'Bữa Brunch sớm & Tàu cập bến': { en: 'Farewell Brunch & Disembarkation', ja: 'フェアウェルブランチ＆下船', ko: '페어웰 브런치 & 하선', zh: '丰盛早午餐与返航靠岸', fr: 'Brunch d\'au revoir & Débarquement' },
  'Thưởng thức bữa trưa sớm Buffet trong khi tàu quay về bến. Xe Limousine đón bạn về lại Hà Nội an toàn.': {
    en: 'Enjoy a buffet brunch as the ship returns to the harbor. Limousine transfers ready for your journey back to Ha Noi.',
    ja: '港へ戻る船内でビュッフェブランチを満喫。下船後は Limousine が Ha Noi まで快適にお送りします。',
    ko: '선박이 귀항하는 동안 뷔페 브런치를 즐긴 후, 대기 중인 Limousine으로 Ha Noi까지 편안하게 복귀합니다.',
    zh: '在游轮返航途中享用自助早午餐，抵达码头后豪华 Limousine 专车护送您安全返回 Ha Noi。',
    fr: 'Savourez un brunch buffet pendant le retour au port. Votre Limousine vous attend pour rentrer à Ha Noi.'
  },
  'Khởi hành – Check-in – Kayak & Hoàng hôn': { en: 'Embarkation – Kayak & Sunset Party', ja: '乗船・チェックイン・カヤック＆サンセット', ko: '승선 – 체크인 – 카약 & 선셋 파티', zh: '登船入住 – 皮划艇与日落派对', fr: 'Embarquement – Kayak & Sunset Party' },
  'Hành trình ngày đầu trọn vẹn với welcome drink, ăn trưa ngắm vịnh, chèo kayak, tiệc trà hoàng hôn và bữa tối lãng mạn.': {
    en: 'Complete first-day highlights: welcome drink, panoramic lunch, kayaking, sunset sundeck party and fine dining.',
    ja: '初日はウェルカムドリンク、絶景ランチ、カヤック、サンセットパーティー、フルコースディナーを満喫。',
    ko: '첫날은 웰컴 드링크, 베이뷰 런치, 카약, 선셋 파티 및 로맨틱 디너로 알차게 채워집니다.',
    zh: '首日尽享欢迎饮品、海景午餐、皮划艇、甲板日落茶会与浪漫星级晚宴。',
    fr: 'Première journée complète : verre de bienvenue, déjeuner panoramique, kayak, Sunset Party et dîner raffiné.'
  },
  'Khám phá sâu Vịnh Lan Hạ bằng tàu ngày cao cấp': { en: 'Full-Day Deep Lan Ha Bay Exploration by Day Boat', ja: '専用デイボートで巡る Lan Ha 湾奥地探検', ko: '전용 데이 보트로 떠나는 Lan Ha 베이 심층 탐험', zh: '乘专属日间游船深度探索 Lan Ha 湾秘境', fr: 'Exploration approfondie de la baie de Lan Ha en bateau de jour' },
  'Chuyển sang tàu chuyên dụng đưa bạn đến Hang Sáng Tối, bãi tắm hoang sơ bí ẩn, đạp xe làng Việt Hải và thưởng thức bữa trưa riêng biệt giữa vịnh.': {
    en: 'Transfer to our dedicated day boat to explore Hang Sang Toi, secluded beaches, Viet Hai village cycling and a private bay lunch.',
    ja: 'サポート船に乗り換え、Hang Sang Toi や秘境ビーチ、Viet Hai 村サイクリング、湾上での特別ランチを体験します。',
    ko: '전용 보트로 환승하여 Hang Sang Toi, 비밀 해변 수영, Viet Hai 마을 라이딩 및 해상 특선 런치를 즐깁니다.',
    zh: '换乘专属观光船深入 Hang Sang Toi、隐秘原生态海滩、骑行 Viet Hai 古村并享用海上私享午餐。',
    fr: 'Excursion vers Hang Sang Toi, plages sauvages, vélo au village de Viet Hai et déjeuner privé sur la baie.'
  },
  'Taichi bình minh – Check-out – Xe Limousine về Hà Nội': { en: 'Sunrise Taichi – Farewell Brunch – Return to Ha Noi', ja: '日の出 Taichi・ブランチ・Limousine で Ha Noi へ', ko: '일출 Taichi – 브런치 – Limousine으로 Ha Noi 복귀', zh: '日出太极 – 早午餐退房 – 乘 Limousine 返回 Ha Noi', fr: 'Taichi matinal – Brunch – Retour à Ha Noi en Limousine' },
  'Tập Taichi sáng sớm, thưởng thức buffet brunch thịnh soạn trước khi cập cảng và lên xe Limousine về Hà Nội.': {
    en: 'Morning Taichi, farewell buffet brunch, disembarkation and seamless Limousine ride back to Ha Noi.',
    ja: '朝の Taichi とビュッフェブランチを楽しんだ後、下船して Limousine で Ha Noi へ戻ります。',
    ko: '아침 Taichi와 풍성한 브런치를 즐긴 뒤 하선하여 Limousine을 타고 Ha Noi로 돌아옵니다.',
    zh: '清晨习练太极、享用丰盛自助早午餐后靠岸退房，乘豪华 Limousine 舒适返回 Ha Noi。',
    fr: 'Séance de Taichi matinale, brunch buffet, débarquement et transfert retour en Limousine vers Ha Noi.'
  },

  // Section 5: Day Cruises
  'TRẢI NGHIỆM TRONG NGÀY': { en: 'DAYTIME VOYAGES', ja: '日帰りクルーズ体験', ko: '당일 크루즈 투어', zh: '精选日间航程', fr: 'EXCURSIONS À LA JOURNÉE' },
  'Du Thuyền Ngày Lan Hạ & Tour Trọn Gói': { en: 'Lan Ha Day Cruises & Day Packages', ja: 'Lan Ha デイクルーズ＆日帰りパッケージ', ko: 'Lan Ha 데이 크루즈 & 당일 패키지', zh: 'Lan Ha 日间游轮与全包一日游', fr: 'Croisières de Jour Lan Ha & Formules' },
  'Dành cho du khách muốn khám phá trọn vẹn vẻ đẹp vịnh Lan Hạ với thời gian linh hoạt trong ngày. Khởi hành đều đặn mỗi sáng và chiều.': {
    en: 'Perfect for travelers seeking the finest Lan Ha Bay day cruise experiences, sunset tea parties and evening dinner spectacles.',
    ja: '限られた時間で Lan Ha 湾の絶景を満喫したい方に最適。毎日午前・午後に定期出航しています。',
    ko: '하루 만에 Lan Ha 베이의 핵심 절경과 선셋 티 파티, 디너 불꽃놀이를 경험하고 싶은 여행객에게 완벽한 선택입니다.',
    zh: '专为希望在一天内灵活领略 Lan Ha 湾精髓、日落茶会及海上烟花晚宴的宾客打造，每日上下午定期发船。',
    fr: 'Idéal pour découvrir toute la beauté de la baie de Lan Ha en une journée : départs quotidiens matin et après-midi.'
  },
  'Tour 1 Ngày Lan Hạ – Làng Việt Hải': { en: 'Lan Ha – Viet Hai Full-Day (VIP 1)', ja: 'Lan Ha – Viet Hai 1日ツアー (VIP 1)', ko: 'Lan Ha – Viet Hai 종일 투어 (VIP 1)', zh: 'Lan Ha – Viet Hai 一日游 (VIP 1)', fr: 'Journée complète Lan Ha – Viet Hai (VIP 1)' },
  'Tàu sắt 48 chỗ hiện đại': { en: '48-pax Modern Steel Boat', ja: '最新48席スチール船', ko: '현대식 48석 스틸 보트', zh: '48座现代观光钢船', fr: 'Bateau moderne 48 places' },
  'Ăn trưa hải sản · Đạp xe Việt Hải · Kayak': { en: 'Seafood Lunch · Viet Hai Cycling · Kayak', ja: '海鮮ランチ・Viet Hai 自転車・カヤック', ko: '해산물 런치 · Viet Hai 자전거 · 카약', zh: '海鲜午餐 · 骑行 Viet Hai · 皮划艇', fr: 'Déjeuner fruits de mer · Vélo Viet Hai · Kayak' },
  'Tour Hoàng Hôn Lan Hạ & Tiệc Trà Chiều': { en: 'Lan Ha Sunset Cruise & Tea Party', ja: 'Lan Ha サンセット＆アフタヌーンティー', ko: 'Lan Ha 선셋 크루즈 & 애프터눈 티', zh: 'Lan Ha 日落游船与下午茶派对', fr: 'Croisière Coucher de Soleil Lan Ha & Tea Party' },
  'Tàu 2 tầng ngắm vịnh': { en: '2-Deck Panoramic Boat', ja: '2階建てパノラマ船', ko: '2층 파노라마 유람선', zh: '双层全景游船', fr: 'Bateau panoramique 2 ponts' },
  'Tiệc trà bánh · Ngắm hoàng hôn vàng': { en: 'Sunset Tea & Fruits · Golden Hour', ja: 'ティー＆フルーツ・黄金の夕日', ko: '다과 & 과일 · 골든아워 일몰', zh: '精致茶点鲜果 · 绝美海上夕阳', fr: 'Thé, pâtisseries & fruits · Heure dorée' },
  'Dinner Cruise DJ & Pháo Hoa Lan Hạ': { en: 'Lan Ha Dinner Cruise DJ & Fireworks', ja: 'Lan Ha ディナークルーズ DJ＆花火', ko: 'Lan Ha 디너 크루즈 DJ & 불꽃놀이', zh: 'Lan Ha 晚宴游轮 DJ 与烟花秀', fr: 'Dîner-Croisière DJ & Feux d\'artifice Lan Ha' },
  'Du thuyền 5★ 99 chỗ': { en: '5★ 99-pax Cruise Ship', ja: '5★ 99席クルーズ船', ko: '5★ 99석 크루즈선', zh: '5★ 99座豪华游轮', fr: 'Navire 5★ 99 places' },
  'Ăn tối lãng mạn · Nhạc DJ · Pháo hoa': { en: 'Seafood Dinner · Live DJ · Fireworks', ja: '海鮮ディナー・ライブDJ・花火', ko: '해산물 디너 · 라이브 DJ · 불꽃쇼', zh: '浪漫海鲜晚宴 · 现场 DJ · 璀璨烟花', fr: 'Dîner romantique · Live DJ · Feux d\'artifice' },
  'Combo Xe Đón Hà Nội + Du Thuyền Ngày': { en: 'All-in Ha Noi Limousine + Day Cruise', ja: 'Ha Noi 送迎＋デイクルーズ一括コンボ', ko: 'Ha Noi 픽업 + 데이 크루즈 올인원 콤보', zh: 'Ha Noi 接送 + 日间游轮全包套餐', fr: 'Combo Transfert Ha Noi + Croisière de Jour' },
  'Xe Limousine + Du thuyền': { en: 'Limousine + Cruise Ship', ja: 'Limousine ＋ クルーズ船', ko: 'Limousine + 크루즈선', zh: 'Limousine 专车 + 游轮', fr: 'Limousine + Navire de croisière' },
  'Đón trả phố cổ Hà Nội · Trọn gói 1 ngày': { en: 'Ha Noi Old Quarter Pickup · All-in 1 Day', ja: 'Ha Noi 旧市街送迎・日帰りオールインワン', ko: 'Ha Noi 구시가지 왕복 픽업 · 당일 올인원', zh: 'Ha Noi 老城区往返接送 · 一日全包', fr: 'Prise en charge Vieux Quartier Ha Noi · 1 jour tout compris' },
  'Đặt ngay →': { en: 'Book →', ja: '予約 →', ko: '예약 →', zh: '立即预订 →', fr: 'Réserver →' },

  // Section 6: Limousine Concierge
  'Dịch Vụ Xe Limousine Đưa Đón Tận Nơi Đến Du Thuyền': { en: 'Luxury Limousine Transfers Straight to Your Cruise', ja: 'クルーズ港へ直行する高級 Limousine 送迎サービス', ko: '크루즈 선착장까지 직행하는 프리미엄 Limousine 서비스', zh: '直达游轮码头的豪华 Limousine 专车接送服务', fr: 'Transferts en Limousine de Luxe Directement jusqu\'au Navire' },
  'Đón trả tận nơi Phố Cổ Hà Nội · Giá đã gồm VAT': { en: 'Ha Noi Old Quarter Pickup · VAT Included', ja: 'Ha Noi 旧市街ホテル送迎・税込価格', ko: 'Ha Noi 구시가지 호텔 픽업 · 부가세 포함', zh: 'Ha Noi 老城区上门接送 · 含税官价', fr: 'Prise en charge Vieux Quartier Ha Noi · TVA incluse' },
  'Giá chỉ từ': { en: 'From', ja: '料金', ko: '요금', zh: '起价', fr: 'À partir de' },
  '/khách': { en: '/pax', ja: '/名', ko: '/인', zh: '/人', fr: '/pers.' },
  'Hà Nội (Phố Cổ / Nội Bài)': { en: 'Ha Noi (Old Quarter / Noi Bai)', ja: 'Ha Noi（旧市街 / Noi Bai）', ko: 'Ha Noi (구시가지 / Noi Bai)', zh: 'Ha Noi（老城区 / Noi Bai 机场）', fr: 'Ha Noi (Vieux Quartier / Noi Bai)' },
  'Cát Bà (Bến tàu Du thuyền)': { en: 'Cat Ba (Cruise Pier)', ja: 'Cat Ba（クルーズ港）', ko: 'Cat Ba (크루즈 선착장)', zh: 'Cat Ba（游轮码头）', fr: 'Cat Ba (Port de croisière)' },
  'Xe Limousine + Tàu cao tốc qua đảo': { en: 'Limousine + Speedboat to island', ja: 'Limousine ＋ 高速船で島へ直行', ko: 'Limousine + 쾌속선 섬 직행', zh: 'Limousine + 快艇直达上岛', fr: 'Limousine + Bateau rapide vers l\'île' },
  'Đón trả tận nơi nội thành': { en: 'Door-to-door city center transfer', ja: '市内ホテル送迎付き', ko: '시내 도어 투 도어 픽업', zh: '市区上门点对点接送', fr: 'Transfert porte-à-porte centre-ville' },
  'Xe Limousine đón tại khách sạn': { en: 'Hotel pickup by Luxury Limousine', ja: 'ホテル発着 Limousine 送迎', ko: '호텔 앞 Limousine 픽업', zh: '酒店门口 Limousine 接送', fr: 'Prise en charge à l\'hôtel en Limousine' },
  'Kết nối 2 vịnh di sản': { en: 'Connecting the 2 heritage bays', ja: '2つの世界遺産湾を直結', ko: '두 세계유산 베이를 연결', zh: '无缝连接两大世界遗产海湾', fr: 'Connexion directe entre les 2 baies' },

  // Live Deals & Trust Row & Footer
  'Xác nhận tức thì · Giữ chỗ ngay khi thanh toán online.': { en: 'Instant confirmation · Guaranteed booking online.', ja: 'オンライン決済で即時確定・空室保証。', ko: '온라인 결제 즉시 확정 및 객실 보장.', zh: '在线支付即时确认 · 100% 锁定舱位。', fr: 'Confirmation immédiate · Réservation garantie en ligne.' },
  'Chính sách hoàn huỷ minh bạch · Không phí ẩn · Đã gồm VAT.': { en: 'Transparent cancellation · No hidden fees · VAT included.', ja: '明確なキャンセル規定・隠れ費用なし・税込価格。', ko: '투명한 취소 정책 · 숨겨진 비용 없음 · 부가세 포함.', zh: '退改政策透明 · 绝无隐形消费 · 价格含税。', fr: 'Annulation transparente · Sans frais cachés · TVA incluse.' },
  'Ẩm thực trọn gói': { en: 'All-inclusive meals', ja: '全食事インクルーシブ', ko: '전 일정 식사 포함', zh: '全包星级餐饮', fr: 'Pension complète incluse' },
  'Trọn gói các bữa ăn hải sản cao cấp theo từng hải trình.': { en: 'Gourmet seafood meals included per itinerary.', ja: '各航程に応じた高級海鮮料理がすべて含まれます。', ko: '항해 일정에 따른 고급 해산물 식사가 모두 포함됩니다.', zh: '包含航程内全部高档海鲜正餐与自助早午餐。', fr: 'Tous les repas gastronomiques de fruits de mer sont inclus.' },
  'Hỗ trợ 24/7 bằng 6 thứ tiếng: Việt, Anh, Nhật, Hàn, Trung, Pháp.': { en: '24/7 Concierge support in 6 languages.', ja: '6ヶ国語対応の24時間コンシェルジュサポート。', ko: '6개 국어 지원 24/7 컨시어지 고객센터.', zh: '提供越、英、日、韩、中、法 6 国语言 24/7 全天候客服。', fr: 'Assistance conciergerie 24h/24 et 7j/7 en 6 langues.' },

  // Floating Fast Bus Portal
  'ĐẶT XE BUS': { en: 'BOOK BUS', ja: 'バス予約', ko: '버스 예약', zh: '预订巴士', fr: 'BUS EXPRESS' },
  'CHỈ TỪ 90K': { en: 'FROM 90K', ja: '90K〜', ko: '90K부터', zh: '低至 90K', fr: 'DÈS 90K' },
  'VÉ XE BUS DAIICHI TRAVEL': { en: 'DAIICHI TRAVEL BUS TICKETS', ja: 'DAIICHI TRAVEL バスチケット', ko: 'DAIICHI TRAVEL 버스 티켓', zh: 'DAIICHI TRAVEL 巴士车票', fr: 'BILLETS DE BUS DAIICHI TRAVEL' },
  'Hệ thống xe khách & Limousine cao tốc 5B chất lượng cao của Daiichi:': { en: 'High-speed 5B expressway buses & luxury Limousines by Daiichi:', ja: 'Daiichi の高速5B号線直行バス＆高級 Limousine：', ko: 'Daiichi의 5B 고속도로 직행 버스 & 프리미엄 Limousine:', zh: 'Daiichi 高速5B专线巴士与豪华 Limousine：', fr: 'Bus express autoroute 5B & Limousines de luxe par Daiichi :' },
  'Xe Bus 45 chỗ đời mới · Cao tốc 5B': { en: 'New 45-seat Bus · 5B Expressway', ja: '新型45席バス・5B高速道路', ko: '신형 45석 버스 · 5B 고속도로', zh: '全新45座大巴 · 5B高速直达', fr: 'Bus 45 places neuf · Autoroute 5B' },
  'Từ 90.000đ': { en: 'From 90,000₫', ja: '90,000₫〜', ko: '90,000₫부터', zh: '90,000₫ 起', fr: 'Dès 90 000₫' },
  'Ưu đãi Like Page HP': { en: 'Special Promo Rate', ja: '特別キャンペーン価格', ko: '특별 프로모션 특가', zh: '专享特惠票价', fr: 'Tarif promotionnel' },
  'Trọn gói Bus + Tàu cao tốc riêng': { en: 'All-in Bus + Private Speedboat', ja: 'バス＋専用高速船セット', ko: '버스 + 전용 쾌속선 올인원', zh: '巴士 + 专属快艇全包联票', fr: 'Formule Bus + Bateau rapide privé' },
  'Từ 150k - 250k': { en: '150k – 250k ₫', ja: '150k〜250k ₫', ko: '150k~250k ₫', zh: '150k - 250k ₫', fr: '150k – 250k ₫' },
  'Đón trả tận khách sạn': { en: 'Hotel pickup & drop-off', ja: 'ホテル送迎付き', ko: '호텔 픽업 & 샌딩', zh: '酒店上门接送', fr: 'Prise en charge à l\'hôtel' },
  'Xe đón tại VP 713 Phạm Văn Đồng': { en: 'Pickup at 713 Pham Van Dong Office', ja: '713 Pham Van Dong オフィス発', ko: '713 Pham Van Dong 사무실 출발', zh: '713 Pham Van Dong 办公室发车', fr: 'Départ agence 713 Pham Van Dong' },
  'Từ 170.000đ': { en: 'From 170,000₫', ja: '170,000₫〜', ko: '170,000₫부터', zh: '170,000₫ 起', fr: 'Dès 170 000₫' },
  'Chuyến chạy liên tục': { en: 'Frequent daily departures', ja: '毎日多数運行', ko: '매일 수시 운행', zh: '每日多班滚动发车', fr: 'Départs fréquents toute la journée' },
  'CHUYỂN ĐẾN ĐẶT VÉ BUS (1 CHẠM)': { en: 'BOOK BUS TICKETS NOW (1-TAP)', ja: 'バス予約ページへ移動（ワンタップ）', ko: '버스 티켓 바로 예약 (원탭)', zh: '一键前往预订巴士车票', fr: 'RÉSERVER UN BILLET DE BUS (1 CLIC)' },
  'Hoặc Chat Zalo Giữ Ghế: 0961 004 709': { en: 'Or Chat Zalo / WhatsApp: +84 961 004 709', ja: 'Zalo / WhatsApp で座席確保: +84 961 004 709', ko: 'Zalo / WhatsApp 좌석 예약: +84 961 004 709', zh: '或通过 Zalo / WhatsApp 留座：+84 961 004 709', fr: 'Ou réserver via Zalo / WhatsApp : +84 961 004 709' },

  // Footer Headings & Links
  'Văn phòng:': { en: 'Office:', ja: 'オフィス:', ko: '사무실:', zh: '办公地址:', fr: 'Bureau :' },
  'Đặt vé chính thức:': { en: 'Official Booking:', ja: '公式予約サイト:', ko: '공식 예약 사이트:', zh: '官方预订网站:', fr: 'Réservation officielle :' },
  'Zalo hỗ trợ:': { en: 'Zalo Support:', ja: 'Zalo サポート:', ko: 'Zalo 고객지원:', zh: 'Zalo 客服:', fr: 'Support Zalo :' },
  'HẠM ĐỘI DU THUYỀN': { en: 'CRUISE FLEET', ja: 'クルーズ船隊', ko: '크루즈 선단', zh: '游轮船队', fr: 'NOTRE FLOTTE' },
  '30 Hạng phòng Suite': { en: '30 Balcony Suites', ja: '全30室の Suite 客室', ko: '30개 Suite 객실', zh: '30 间海景 Suite 套房', fr: '30 Suites avec balcon' },
  'Hải trình 2N1Đ & 3N2Đ': { en: '2D1N & 3D2N Itineraries', ja: '2D1N ＆ 3D2N 運航日程', ko: '2D1N & 3D2N 운항 일정', zh: '2D1N 与 3D2N 航程', fr: 'Itinéraires 2J1N & 3J2N' },
  'ĐIỂM ĐẾN & CẨM NANG': { en: 'DESTINATIONS & GUIDES', ja: '目的地＆旅行ガイド', ko: '여행지 및 가이드', zh: '目的地与出行指南', fr: 'DESTINATIONS & GUIDES' },
  'Du thuyền ngủ đêm Lan Hạ': { en: 'Lan Ha Overnight Cruises', ja: 'Lan Ha 宿泊クルーズ', ko: 'Lan Ha 1박 크루즈', zh: 'Lan Ha 过夜游轮', fr: 'Croisières de nuit Lan Ha' },
  'Xe Hà Nội đi Cát Bà': { en: 'Ha Noi to Cat Ba Bus', ja: 'Ha Noi → Cat Ba バス', ko: 'Ha Noi → Cat Ba 버스', zh: 'Ha Noi 至 Cat Ba 巴士', fr: 'Bus Ha Noi vers Cat Ba' },
  'Xe Cát Bà về Hà Nội': { en: 'Cat Ba to Ha Noi Bus', ja: 'Cat Ba → Ha Noi バス', ko: 'Cat Ba → Ha Noi 버스', zh: 'Cat Ba 返回 Ha Noi 巴士', fr: 'Bus Cat Ba vers Ha Noi' },
  'DỊCH VỤ LIÊN KẾT': { en: 'CONNECTED SERVICES', ja: '関連サービス', ko: '연계 서비스', zh: '配套出行服务', fr: 'SERVICES ASSOCIÉS' },
  'Tour chèo SUP & Lặn biển': { en: 'SUP & Snorkeling Tours', ja: 'SUP＆シュノーケリングツアー', ko: 'SUP & 스노클링 투어', zh: 'SUP 桨板与浮潜之旅', fr: 'Excursions SUP & Plongée' },
  'Hợp tác đại lý & đối tác': { en: 'B2B Agent & Partner Portal', ja: '代理店・パートナー提携', ko: '대리점 및 파트너 제휴', zh: '代理商与合作伙伴加盟', fr: 'Partenariats & Agences B2B' },
  'CỔNG LÀM VIỆC': { en: 'PORTALS', ja: 'ポータル', ko: '업무 포털', zh: '服务门户', fr: 'PORTAILS' },
  '🔒 Quản trị viên (Admin)': { en: '🔒 Admin Login', ja: '🔒 管理者ログイン (Admin)', ko: '🔒 관리자 로그인 (Admin)', zh: '🔒 管理员登录 (Admin)', fr: '🔒 Espace Admin' },

  // General & Modal UI
  'Đóng lại': { en: 'Close', ja: '閉じる', ko: '닫기', zh: '关闭', fr: 'Fermer' },
  'Xem chi tiết': { en: 'Quick View', ja: '詳細を見る', ko: '상세 보기', zh: '查看详情', fr: 'Voir détails' },
  'Đặt Ngay': { en: 'Book Now', ja: '予約する', ko: '예약하기', zh: '立即预订', fr: 'Réserver' },
  'Giá từ': { en: 'From', ja: '料金', ko: '요금', zh: '起价', fr: 'Dès' },
  'Đã bao gồm VAT & các tiện ích cao cấp': { en: 'VAT & premium amenities included', ja: '税込・最高級アメニティ込み', ko: 'VAT 및 프리미엄 편의시설 포함', zh: '含税及全套高级礼遇', fr: 'TVA et équipements de luxe inclus' },
  'Chính sách trẻ em': { en: 'Child Policy', ja: '子供料金ポリシー', ko: '어린이 정책', zh: '儿童政策', fr: 'Politique enfants' },
  'Hoàn hủy miễn phí trước 7 ngày': { en: 'Free cancellation up to 7 days before', ja: '7日前まで無料キャンセル', ko: '출발 7일 전 무료 취소', zh: '出发前7天免费取消', fr: 'Annulation gratuite jusqu\'à 7 jours avant' },
  'Hotline hỗ trợ 24/7:': { en: '24/7 Support Hotline:', ja: '24時間対応ホットライン:', ko: '24시간 고객센터:', zh: '24小时客服热线:', fr: 'Assistance 24/7 :' },
  'Xe Bus Hải Phòng ⇄ Cát Bà (90.000đ)': { en: 'Bus Hai Phong ⇄ Cat Ba (90,000₫)', ja: 'Hai Phong ⇄ Cat Ba バス（90,000₫）', ko: 'Hai Phong ⇄ Cat Ba 버스 (90,000₫)', zh: 'Hai Phong ⇄ Cat Ba 直通巴士（90,000₫）', fr: 'Bus Hai Phong ⇄ Cat Ba (90 000₫)' },

  // Combo Inquiry Modal & Room Detail Calculator
  '🚐 Xe Limousine đón trả Hà Nội ⇄ Cát Bà (khứ hồi tận nơi)': { en: '🚐 Limousine Ha Noi ⇄ Cat Ba (door-to-door round-trip)', ja: '🚐 Limousine Ha Noi ⇄ Cat Ba（往復ホテル送迎）', ko: '🚐 Limousine Ha Noi ⇄ Cat Ba (왕복 도어투도어 픽업)', zh: '🚐 Limousine Ha Noi ⇄ Cat Ba（往返上门接送）', fr: '🚐 Limousine Ha Noi ⇄ Cat Ba (aller-retour porte-à-porte)' },
  '⭐ Du thuyền ngủ đêm 5★ Daiichi Luxury (Suite ban công, Skywalk)': { en: '⭐ 5★ Daiichi Luxury Overnight Cruise (Balcony Suite, Skywalk)', ja: '⭐ 5★ Daiichi Luxury 宿泊クルーズ（専用バルコニー Suite、Skywalk）', ko: '⭐ 5★ Daiichi Luxury 1박 크루즈 (발코니 Suite, Skywalk)', zh: '⭐ 5★ Daiichi Luxury 过夜游轮（海景阳台 Suite、Skywalk）', fr: '⭐ Croisière de nuit 5★ Daiichi Luxury (Suite avec balcon, Skywalk)' },
  '⛵ Du thuyền ngủ đêm 4★ Daiichi Boutique (Gỗ cổ điển, riêng tư)': { en: '⛵ 4★ Daiichi Boutique Overnight Cruise (Classic wood, private)', ja: '⛵ 4★ Daiichi Boutique 宿泊クルーズ（伝統木造、プライベート）', ko: '⛵ 4★ Daiichi Boutique 1박 크루즈 (클래식 원목, 프라이빗)', zh: '⛵ 4★ Daiichi Boutique 过夜游轮（古典原木、私密体验）', fr: '⛵ Croisière de nuit 4★ Daiichi Boutique (Bois classique, intimiste)' },
  '🚢 Du thuyền ngày 5★ VIP 4 Lan Hạ (Ăn trưa, chèo kayak, Việt Hải)': { en: '🚢 5★ VIP 4 Lan Ha Day Cruise (Lunch, Kayak, Viet Hai)', ja: '🚢 5★ VIP 4 Lan Ha 日帰りクルーズ（昼食、カヤック、Viet Hai）', ko: '🚢 5★ VIP 4 Lan Ha 당일 크루즈 (중식, 카약, Viet Hai)', zh: '🚢 5★ VIP 4 Lan Ha 一日游轮（午餐、皮划艇、Viet Hai）', fr: '🚢 Croisière de jour 5★ VIP 4 Lan Ha (Déjeuner, Kayak, Viet Hai)' },
  '🌅 Tour Hoàng Hôn & Tiệc Trà Sunset Cruise vịnh Lan Hạ': { en: '🌅 Sunset Cruise & Tea Party on Lan Ha Bay', ja: '🌅 Lan Ha 湾 Sunset Cruise ＆アフタヌーンティー', ko: '🌅 Lan Ha 만 Sunset Cruise & 티 파티', zh: '🌅 Lan Ha 湾 Sunset Cruise 日落下午茶之旅', fr: '🌅 Sunset Cruise & Tea Party en baie de Lan Ha' },
  '🎆 Tiệc BBQ DJ & Pháo Hoa Vịnh Lan Hạ (VIP 5)': { en: '🎆 BBQ Dinner Cruise, Live DJ & Fireworks on Lan Ha Bay (VIP 5)', ja: '🎆 Lan Ha 湾 BBQ ディナー・DJ＆花火クルーズ (VIP 5)', ko: '🎆 Lan Ha 만 BBQ 디너 & DJ 불꽃놀이 크루즈 (VIP 5)', zh: '🎆 Lan Ha 湾 BBQ 晚宴、DJ 与烟花游轮 (VIP 5)', fr: '🎆 Dîner BBQ, DJ Live & Feux d\'artifice en baie de Lan Ha (VIP 5)' },
  '🏨 Khách sạn / Flamingo Beach Resort 5★ Cát Bà': { en: '🏨 Hotel / 5★ Flamingo Beach Resort Cat Ba', ja: '🏨 ホテル / 5★ Flamingo Beach Resort Cat Ba', ko: '🏨 호텔 / 5★ Flamingo Beach Resort Cat Ba', zh: '🏨 酒店 / 5★ Flamingo Beach Resort Cat Ba', fr: '🏨 Hôtel / 5★ Flamingo Beach Resort Cat Ba' },
  '🦞 Bữa ăn hải sản / BBQ tối đặc sản': { en: '🦞 Fresh Seafood Meals / Specialty BBQ Dinner', ja: '🦞 新鮮シーフード食事 / 特製 BBQ ディナー', ko: '🦞 신선한 해산물 식사 / 특선 BBQ 디너', zh: '🦞 新鲜海鲜正餐 / 特色 BBQ 晚宴', fr: '🦞 Repas fruits de mer / Dîner BBQ spécialités' },
  '🚴‍♀️ Xe điện/xe đạp Làng cổ Việt Hải & Kayak Hang Sáng Tối': { en: '🚴‍♀️ Electric Car/Cycling at Viet Hai Village & Kayak at Hang Sang Toi', ja: '🚴‍♀️ Viet Hai 古村の電動カート・サイクリング＆ Hang Sang Toi カヤック', ko: '🚴‍♀️ Viet Hai 고대 마을 전동카트/자전거 & Hang Sang Toi 카약', zh: '🚴‍♀️ Viet Hai 古村电瓶车/骑行 & Hang Sang Toi 皮划艇', fr: '🚴‍♀️ Vélo/voiture électrique au village Viet Hai & Kayak à Hang Sang Toi' },
  '🎟️ Hướng dẫn viên song ngữ & Vé tham quan thắng cảnh': { en: '🎟️ Bilingual Tour Guide & All Entrance Tickets', ja: '🎟️ バイリンガルガイド＆全観光入場券', ko: '🎟️ 전문 가이드 & 전 일정 입장권 포함', zh: '🎟️ 双语导游服务及全部景点门票', fr: '🎟️ Guide bilingue & Billets d\'entrée inclus' },
  'Vui lòng nhập Họ tên và Số điện thoại/Zalo để chúng tôi gửi báo giá!': { en: 'Please enter your Full Name and Phone/WhatsApp/Zalo to receive the quote!', ja: 'お見積り送付のため、お名前と電話番号/WhatsApp/Zaloをご入力ください。', ko: '견적서 발송을 위해 성함과 전화번호/WhatsApp/Zalo를 입력해 주세요!', zh: '请输入您的姓名和电话/WhatsApp/Zalo以便我们发送报价！', fr: 'Veuillez saisir votre nom et téléphone/WhatsApp/Zalo pour recevoir le devis !' },
  'Đã Gửi Yêu Cầu Báo Giá Thành Công!': { en: 'Combo Quote Request Sent Successfully!', ja: 'コンボ見積もりリクエストを送信しました！', ko: '콤보 견적 요청이 성공적으로 전송되었습니다!', zh: '套餐报价请求已成功发送！', fr: 'Demande de devis envoyée avec succès !' },
  'Toàn bộ danh sách dịch vụ và thông tin combo của Quý khách đã được chuyển trực tiếp đến bộ phận kinh doanh:': { en: 'Your selected services and combo request have been sent directly to our sales team:', ja: 'ご選択いただいたサービスとコンボ内容は営業部門へ直接送信されました：', ko: '선택하신 서비스와 콤보 요청 내역이 영업팀으로 직접 전달되었습니다:', zh: '您选择的服务清单及套餐需求已直接发送至销售部门：', fr: 'Vos services sélectionnés et votre demande ont été transmis à notre équipe commerciale :' },
  'Khách hàng:': { en: 'Guest:', ja: 'お客様:', ko: '고객명:', zh: '客户姓名:', fr: 'Client :' },
  'Lịch trình:': { en: 'Schedule:', ja: '日程:', ko: '일정:', zh: '行程日期:', fr: 'Programme :' },
  'người lớn': { en: 'adults', ja: '大人', ko: '성인', zh: '成人', fr: 'adultes' },
  'Email nhận báo giá:': { en: 'Email:', ja: 'メールアドレス:', ko: '이메일:', zh: '接收报价邮箱:', fr: 'E-mail :' },
  '⚡ Chuyên viên Daiichi Travel sẽ liên hệ phản hồi & gửi báo giá chi tiết trong vòng 15 phút!': { en: '⚡ Our Daiichi Travel specialist will contact you and send a detailed quote within 15 minutes!', ja: '⚡ Daiichi Travel の担当者が15分以内にご連絡し、詳細なお見積りをお送りいたします！', ko: '⚡ Daiichi Travel 전담 상담원이 15분 이내에 연락드려 상세 견적을 보내드립니다!', zh: '⚡ Daiichi Travel 专属顾问将在 15 分钟内联系您并发送详细报价！', fr: '⚡ Un conseiller Daiichi Travel vous contactera avec un devis détaillé sous 15 minutes !' },
  'Đóng': { en: 'Close', ja: '閉じる', ko: '닫기', zh: '关闭', fr: 'Fermer' },
  '📋 TÙY CHỌN DỊCH VỤ A-Z · BÁO GIÁ TRỌN GÓI': { en: '📋 CUSTOM A-Z SERVICES · ALL-INCLUSIVE QUOTE', ja: '📋 フルカスタム手配 · オールインクルーシブ見積り', ko: '📋 A-Z 맞춤 서비스 · 올인원 패키지 견적', zh: '📋 A-Z 自由定制服务 · 全包套餐报价', fr: '📋 SERVICES SUR MESURE A-Z · DEVIS TOUT COMPRIS' },
  'Thiết Kế Tour Combo Trọn Gói Hà Nội — Vịnh Lan Hạ': { en: 'Custom All-in Combo Tour: Ha Noi — Lan Ha Bay', ja: 'Ha Noi — Lan Ha 湾 オーダーメイド一貫コンボツアー', ko: 'Ha Noi — Lan Ha 만 맞춤형 올인원 콤보 투어', zh: '定制 Ha Noi — Lan Ha 湾全包自由行套餐', fr: 'Circuit Combiné Sur Mesure : Ha Noi — Baie de Lan Ha' },
  'Tích chọn các dịch vụ bạn mong muốn dưới đây. Thông tin được tổng hợp và chuyển ngay về hòm thư': { en: 'Select your desired services below. Your inquiry will be sent directly to', ja: 'ご希望のサービスを以下から選択してください。内容は直接', ko: '원하시는 서비스를 아래에서 선택해 주세요. 요청 내역은', zh: '请在下方勾选您需要的服务，需求将直接发送至', fr: 'Sélectionnez les services souhaités ci-dessous. Votre demande sera envoyée directement à' },
  'để điều hành gửi báo giá ưu đãi tốt nhất.': { en: 'for our best custom package rate.', ja: 'へ送信され、最安値のお見積りをご案内いたします。', ko: '으로 전달되어 최적의 패키지 특가 견적을 안내해 드립니다.', zh: '由计调专员为您提供最优套餐报价。', fr: 'pour vous proposer notre meilleur tarif forfaitaire.' },
  '1. Tích chọn các dịch vụ muốn có trong Combo:': { en: '1. Select services to include in your Combo:', ja: '1. コンボに含めたいサービスを選択：', ko: '1. 콤보에 포함할 서비스 선택:', zh: '1. 请勾选套餐中包含的服务项目：', fr: '1. Sélectionnez les prestations à inclure dans votre forfait :' },
  '2. Thời gian khởi hành & Số lượng khách:': { en: '2. Travel Dates & Number of Guests:', ja: '2. 出発日・帰着日＆人数：', ko: '2. 출발 일정 및 인원수:', zh: '2. 出行日期与游客人数：', fr: '2. Dates de voyage et nombre de voyageurs :' },
  'NGÀY ĐI': { en: 'DEPARTURE', ja: '出発日', ko: '출발일', zh: '出发日期', fr: 'DÉPART' },
  'NGÀY VỀ': { en: 'RETURN DATE', ja: '帰着日', ko: '귀환일', zh: '返程日期', fr: 'RETOUR' },
  'NGƯỜI LỚN': { en: 'ADULTS', ja: '大人', ko: '성인', zh: '成人', fr: 'ADULTES' },
  'TRẺ EM': { en: 'CHILDREN', ja: '子供', ko: '어린이', zh: '儿童', fr: 'ENFANTS' },
  '3. Thông tin người nhận báo giá:': { en: '3. Contact Information for Quote:', ja: '3. お見積り受取先のご連絡先：', ko: '3. 견적서 수령 연락처 정보:', zh: '3. 报价接收人联系信息：', fr: '3. Coordonnées pour recevoir le devis :' },
  'Họ và tên Quý khách *': { en: 'Full Name *', ja: 'お名前（フルネーム）*', ko: '성함 *', zh: '您的姓名 *', fr: 'Nom complet *' },
  'Số điện thoại / Zalo *': { en: 'Phone / WhatsApp / Zalo *', ja: '電話番号 / WhatsApp / Zalo *', ko: '전화번호 / WhatsApp / Zalo *', zh: '电话号码 / WhatsApp / Zalo *', fr: 'Téléphone / WhatsApp / Zalo *' },
  'Email nhận báo giá file PDF': { en: 'Email for PDF Quote', ja: 'PDF見積書受取用メールアドレス', ko: 'PDF 견적서 수령 이메일', zh: '接收 PDF 报价单的电子邮箱', fr: 'E-mail pour recevoir le devis PDF' },
  'Ghi chú thêm: Điểm đón tại Hà Nội, hạng phòng yêu cầu, độ tuổi các bé, ăn chay/dị ứng...': { en: 'Additional notes: Pickup address in Ha Noi, preferred room type, children ages, dietary requirements...', ja: '備考：Ha Noi でのピックアップ場所、ご希望の客室タイプ、お子様の年齢、食事制限など...', ko: '추가 메모: Ha Noi 픽업 장소, 희망 객실 등급, 어린이 나이, 식단 요청 사항 등...', zh: '备注信息：Ha Noi 接车地点、意向房型、儿童年龄、素食或过敏忌口等...', fr: 'Notes : Adresse de prise en charge à Ha Noi, catégorie de suite souhaitée, âge des enfants, régime alimentaire...' },
  '🔒 Dữ liệu được bảo mật & gửi trực tiếp tới': { en: '🔒 Confidential & sent directly to', ja: '🔒 個人情報は厳重に保護され、直接送信されます：', ko: '🔒 모든 정보는 안전하게 보호되며 직접 전송됩니다:', zh: '🔒 信息严格保密并直接发送至', fr: '🔒 Données confidentielles transmises directement à' },
  'Hủy': { en: 'Cancel', ja: 'キャンセル', ko: '취소', zh: '取消', fr: 'Annuler' },
  'Đang gửi...': { en: 'Sending...', ja: '送信中...', ko: '전송 중...', zh: '正在发送...', fr: 'Envoi en cours...' },
  '🚀 Gửi Yêu Cầu Báo Giá Combo →': { en: '🚀 Send Combo Quote Request →', ja: '🚀 コンボ見積もりをリクエスト →', ko: '🚀 콤보 견적 요청 보내기 →', zh: '🚀 发送套餐报价请求 →', fr: '🚀 Envoyer la demande de devis →' },
  '/đêm tiêu chuẩn 2 khách': { en: '/night for 2 guests', ja: '/泊（2名様標準）', ko: '/박 (2인 기준)', zh: '/晚（2人标准入住）', fr: '/nuit base 2 personnes' },
  'Diện tích': { en: 'Area', ja: '客室面積', ko: '객실 면적', zh: '房间面积', fr: 'Superficie' },
  'Sức chứa': { en: 'Capacity', ja: '定員', ko: '수용 인원', zh: '入住人数', fr: 'Capacité' },
  'Vị trí': { en: 'Location', ja: 'フロア', ko: '위치', zh: '所在楼层', fr: 'Emplacement' },
  'Ban công': { en: 'Balcony', ja: 'バルコニー', ko: '발코니', zh: '阳台配置', fr: 'Balcon' },
  'Bảng Tính Giá Tự Động Theo Yêu Cầu': { en: 'Live Custom Rate Calculator', ja: 'リアルタイム自動料金シミュレーター', ko: '실시간 맞춤 요금 자동 계산기', zh: '实时智能房价计算器', fr: 'Calculateur de tarif en temps réel' },
  '⚡ Giá thời gian thực · Đã gồm VAT': { en: '⚡ Real-time rate · VAT included', ja: '⚡ リアルタイム料金・税込', ko: '⚡ 실시간 요금 · VAT 포함', zh: '⚡ 实时价格 · 含增值税', fr: '⚡ Tarif en temps réel · TVA incluse' },
  'Gói hải trình': { en: 'Itinerary', ja: 'クルーズ日程', ko: '운항 일정', zh: '航程套餐', fr: 'Itinéraire' },
  'Mùa du lịch': { en: 'Season', ja: 'シーズン', ko: '여행 시즌', zh: '出行季', fr: 'Saison' },
  'Mùa thường / Thấp điểm': { en: 'Standard / Low Season', ja: '通常期・ローシーズン', ko: '평수기 / 비수기', zh: '平季 / 淡季', fr: 'Basse / Moyenne saison' },
  'Mùa cao điểm hè (+15%)': { en: 'Summer High Season (+15%)', ja: '夏季ハイシーズン (+15%)', ko: '여름 성수기 (+15%)', zh: '夏季旺季 (+15%)', fr: 'Haute saison été (+15%)' },
  '1 người lớn (Phòng đơn)': { en: '1 Adult (Single Occupancy)', ja: '大人1名（シングル利用）', ko: '성인 1명 (싱글룸)', zh: '1位成人（单人入住）', fr: '1 Adulte (Occupation simple)' },
  '2 người lớn (Tiêu chuẩn)': { en: '2 Adults (Standard)', ja: '大人2名（標準2名1室）', ko: '성인 2명 (기본 2인실)', zh: '2位成人（标准双人）', fr: '2 Adultes (Standard)' },
  '3 người lớn (+Kê giường phụ)': { en: '3 Adults (+Extra Bed)', ja: '大人3名（＋エキストラベッド）', ko: '성인 3명 (+엑스트라 베드)', zh: '3位成人（+加床）', fr: '3 Adultes (+Lit supplémentaire)' },
  'Trẻ em đi kèm': { en: 'Children', ja: '同伴の子供', ko: '동반 어린이', zh: '随行儿童', fr: 'Enfants' },
  'Không có trẻ em': { en: 'No children', ja: '子供なし', ko: '어린이 없음', zh: '无随行儿童', fr: 'Aucun enfant' },
  'Độ tuổi trẻ em': { en: 'Child Age', ja: '子供の年齢', ko: '어린이 나이', zh: '儿童年龄段', fr: 'Âge des enfants' },
  'Dưới 2 tuổi (Miễn phí 100%)': { en: 'Under 2 years (100% Free)', ja: '2歳未満（100%無料）', ko: '2세 미만 (100% 무료)', zh: '2岁以下（100%免费）', fr: 'Moins de 2 ans (100% Gratuit)' },
  'Từ 2 – 4 tuổi (50% giá)': { en: '2 – 4 years (50% rate)', ja: '2〜4歳（50%料金）', ko: '2~4세 (50% 요금)', zh: '2–4岁（50%费用）', fr: 'De 2 à 4 ans (50% du tarif)' },
  'Từ 5 – 10 tuổi (75% giá)': { en: '5 – 10 years (75% rate)', ja: '5〜10歳（75%料金）', ko: '5~10세 (75% 요금)', zh: '5–10岁（75%费用）', fr: 'De 5 à 10 ans (75% du tarif)' },
  'Ngày khởi hành dự kiến': { en: 'Departure Date', ja: '出発予定日', ko: '출발 예정일', zh: '预计出发日期', fr: 'Date de départ prévue' },
  'Phương án đưa đón khách:': { en: 'Transfer Option:', ja: '送迎オプション：', ko: '차량 픽업 옵션:', zh: '接送交通方案：', fr: 'Option de transfert :' },
  'Phương án B: Kèm xe Limousine đưa đón 2 chiều (+550.000đ/khách)': { en: 'Option B: Round-trip Limousine transfer (+550,000₫/guest)', ja: 'プランB：往復 Limousine 送迎付き（+550,000₫/名）', ko: '옵션 B: 왕복 Limousine 픽업 포함 (+550,000₫/인)', zh: '方案 B：含往返 Limousine 专车接送（+550,000₫/人）', fr: 'Option B : Transfert Limousine aller-retour (+550 000₫/pers.)' },
  'Đón trả tận nơi tại Phố Cổ Hà Nội thẳng đến cảng du thuyền và chiều ngược lại.': { en: 'Door-to-door pickup in Ha Noi Old Quarter straight to the cruise harbor and back.', ja: 'Ha Noi 旧市街のホテルからクルーズ港まで直行の往復ドアツードア送迎。', ko: 'Ha Noi 구시가지 호텔에서 크루즈 선착장까지 왕복 도어투도어 직행 픽업.', zh: 'Ha Noi 古街区酒店上门接送直达游轮码头及返程。', fr: 'Prise en charge porte-à-porte dans le Vieux Quartier de Ha Noi jusqu\'au port d\'embarquement aller-retour.' },
  'Phương án A: Khách tự túc di chuyển đến cảng (+0đ)': { en: 'Option A: Self-arrival at the harbor (+0₫)', ja: 'プランA：港までご自身で移動 (+0₫)', ko: '옵션 A: 선착장 개별 이동 (+0₫)', zh: '方案 A：自行前往游轮码头 (+0₫)', fr: 'Option A : Arrivée par vos propres moyens au port (+0₫)' },
  'Check-in lúc 12:00 tại Cảng tàu Cát Bà / Tuần Châu.': { en: 'Check-in at 12:00 at Cat Ba / Tuan Chau harbor.', ja: '12:00に Cat Ba / Tuan Chau 港にてチェックイン。', ko: '12:00에 Cat Ba / Tuan Chau 선착장에서 체크인.', zh: '12:00 于 Cat Ba / Tuan Chau 码头办理登船入住。', fr: 'Enregistrement à 12h00 au port de Cat Ba / Tuan Chau.' },
  'Tổng Chi Phí Trọn Gói Dự Kiến': { en: 'Estimated Total Package Rate', ja: 'お見積り合計金額（オールインクルーシブ）', ko: '예상 총 패키지 요금', zh: '预计全包套餐总价', fr: 'Montant total estimé tout compris' },
  '(Đã gồm VAT)': { en: '(VAT included)', ja: '（税込）', ko: '(VAT 포함)', zh: '（含税）', fr: '(TVA incluse)' },
  'Chính Sách Trẻ Em & Giường Phụ': { en: 'Child & Extra Bed Policy', ja: '子供料金＆エキストラベッド規定', ko: '어린이 및 엑스트라 베드 규정', zh: '儿童与加床政策', fr: 'Politique enfants et lit supplémentaire' },
  'Trẻ em dưới 2 tuổi': { en: 'Under 2 years old', ja: '2歳未満のお子様', ko: '2세 미만 유아', zh: '2岁以下婴幼儿', fr: 'Enfants de moins de 2 ans' },
  'Miễn phí 100%': { en: '100% Free', ja: '100% 無料', ko: '100% 무료', zh: '100% 免费', fr: '100% Gratuit' },
  '(Tối đa 1 trẻ/phòng, ngủ chung bố mẹ)': { en: '(Max 1 child/suite, sharing bed)', ja: '（1室最大1名、添い寝）', ko: '(객실당 최대 1명, 부모와 동반 취침)', zh: '（每间限1名，与父母同住）', fr: '(Max 1 enfant/suite, partageant le lit)' },
  'Trẻ em từ 2 – 4 tuổi': { en: '2 – 4 years old', ja: '2〜4歳のお子様', ko: '2~4세 어린이', zh: '2–4岁儿童', fr: 'Enfants de 2 à 4 ans' },
  'Phụ thu 50%': { en: '50% Surcharge', ja: '50% 追加料金', ko: '50% 요금 적용', zh: '加收 50%', fr: 'Supplément de 50%' },
  '(Ăn suất riêng, ngủ chung với bố mẹ)': { en: '(Own meals, sharing bed)', ja: '（食事付き、添い寝）', ko: '(개별 식사 제공, 부모와 동반 취침)', zh: '（含独立餐食，与父母同住）', fr: '(Repas inclus, partageant le lit)' },
  'Trẻ em từ 5 – 10 tuổi': { en: '5 – 10 years old', ja: '5〜10歳のお子様', ko: '5~10세 어린이', zh: '5–10岁儿童', fr: 'Enfants de 5 à 10 ans' },
  'Phụ thu 75%': { en: '75% Surcharge', ja: '75% 追加料金', ko: '75% 요금 적용', zh: '加收 75%', fr: 'Supplément de 75%' },
  '(Kê giường phụ hoặc suất tiêu chuẩn)': { en: '(Extra bed or standard meal)', ja: '（エキストラベッドまたは標準食事付き）', ko: '(엑스트라 베드 또는 표준 식사 포함)', zh: '（含加床或标准套餐）', fr: '(Lit supplémentaire ou repas standard)' },
  'Trẻ em từ 11 tuổi trở lên': { en: '11 years & older', ja: '11歳以上', ko: '11세 이상', zh: '11岁及以上', fr: '11 ans et plus' },
  'Tính 100%': { en: '100% Adult Rate', ja: '大人料金 100%', ko: '성인 요금 100%', zh: '按成人 100% 计费', fr: 'Tarif adulte 100%' },
  '(Tính như người lớn)': { en: '(Charged as adult)', ja: '（大人と同額）', ko: '(성인과 동일 적용)', zh: '（与成人同价）', fr: '(Facturé comme un adulte)' },
  'Dịch vụ & Tiện nghi trọn gói trong giá phòng:': { en: 'All-Inclusive Services & Amenities:', ja: '宿泊料金に含まれるオールインクルーシブ特典：', ko: '객실 요금에 포함된 올인원 서비스 & 혜택:', zh: '房价包含的全包服务与设施：', fr: 'Prestations et équipements tout compris dans le tarif :' },
  'Đặt Ngay Với Cấu Hình Này': { en: 'Book This Configuration', ja: 'このプラン内容で予約する', ko: '이 구성으로 바로 예약하기', zh: '按此配置立即预订', fr: 'Réserver avec cette configuration' },
  'Hà Nội': { en: 'Ha Noi', ja: 'Ha Noi', ko: 'Ha Noi', zh: 'Ha Noi', fr: 'Ha Noi' },
  'Hải Phòng': { en: 'Hai Phong', ja: 'Hai Phong', ko: 'Hai Phong', zh: 'Hai Phong', fr: 'Hai Phong' },
  'Cát Bà': { en: 'Cat Ba', ja: 'Cat Ba', ko: 'Cat Ba', zh: 'Cat Ba', fr: 'Cat Ba' },
  'Nền tảng du thuyền thành viên thuộc Daiichi Travel': { en: 'Official Cruise Platform of Daiichi Travel', ja: 'Daiichi Travel 公式クルーズ予約プラットフォーム', ko: 'Daiichi Travel 공식 크루즈 예약 플랫폼', zh: 'Daiichi Travel 旗下官方游轮预订平台', fr: 'Plateforme officielle de croisières du groupe Daiichi Travel' },
  'Hệ thống đặt vé & phòng trực tuyến vận hành bởi': { en: 'Online booking system powered by', ja: 'オンライン予約システム運営：', ko: '온라인 예약 시스템 운영:', zh: '在线票务与客房预订系统由以下平台提供支持：', fr: 'Système de réservation en ligne opéré par' },

  // Section 7: Travel Journal & Guides (Lan Ha · Ha Long · Ninh Binh)
  'Cẩm Nang': { en: 'Travel Guide', ja: '旅行ガイド', ko: '여행 가이드', zh: '旅游指南', fr: 'Guide Voyage' },
  'CẨM NANG & KINH NGHIỆM DU LỊCH': { en: 'TRAVEL GUIDE & INSIGHTS', ja: 'トラベルガイド＆旅の知恵', ko: '트래블 가이드 & 여행 팁', zh: '旅行指南与实用攻略', fr: 'GUIDE DE VOYAGE & CONSEILS' },
  'Khám Phá Vịnh Lan Hạ, Vịnh Hạ Long & Ninh Bình': { en: 'Discover Lan Ha Bay, Ha Long Bay & Ninh Binh', ja: 'Lan Ha 湾・Ha Long 湾・Ninh Binh の魅力を発見', ko: 'Lan Ha 만, Ha Long 만 & Ninh Binh 완벽 가이드', zh: '探索 Lan Ha 湾、Ha Long 湾与 Ninh Binh 奇观', fr: 'Découvrez la Baie de Lan Ha, la Baie de Ha Long & Ninh Binh' },
  'Tổng hợp kinh nghiệm đi du thuyền, lịch trình tham quan và những góc chụp ảnh đẹp nhất tại Vịnh Lan Hạ, Vịnh Hạ Long, đảo Cát Bà và danh thắng Ninh Bình.': { en: 'Curated cruise tips, itineraries, and the best photo spots across Lan Ha Bay, Ha Long Bay, Cat Ba Island, and Ninh Binh.', ja: 'Lan Ha 湾・Ha Long 湾・Cat Ba 島・Ninh Binh のクルーズ体験談、モデルコース、絶景フォトスポットをご案内します。', ko: 'Lan Ha 만, Ha Long 만, Cat Ba 섬, Ninh Binh의 크루즈 여행 팁과 추천 코스, 베스트 포토존을 소개합니다.', zh: '汇集 Lan Ha 湾、Ha Long 湾、Cat Ba 岛及 Ninh Binh 的游轮出行经验、路线规划与绝佳拍照机位。', fr: 'Conseils de croisière, itinéraires et plus beaux spots photo dans la baie de Lan Ha, la baie de Ha Long, Cat Ba et Ninh Binh.' },
  'Tất Cả': { en: 'All', ja: 'すべて', ko: '전체', zh: '全部', fr: 'Tout' },
  'Vịnh Lan Hạ & Cát Bà': { en: 'Lan Ha Bay & Cat Ba', ja: 'Lan Ha 湾 & Cat Ba', ko: 'Lan Ha 만 & Cat Ba', zh: 'Lan Ha 湾 & Cat Ba', fr: 'Baie de Lan Ha & Cat Ba' },
  'Vịnh Hạ Long': { en: 'Ha Long Bay', ja: 'Ha Long 湾', ko: 'Ha Long 만', zh: 'Ha Long 湾', fr: 'Baie de Ha Long' },
  'Ninh Bình (Tràng An · Tam Cốc)': { en: 'Ninh Binh (Trang An · Tam Coc)', ja: 'Ninh Binh (Trang An · Tam Coc)', ko: 'Ninh Binh (Trang An · Tam Coc)', zh: 'Ninh Binh (Trang An · Tam Coc)', fr: 'Ninh Binh (Trang An · Tam Coc)' },
  '🔥 Tương tác cao nhất': { en: '🔥 Most Popular', ja: '🔥 人気順', ko: '🔥 인기순', zh: '🔥 最受关注', fr: '🔥 Les plus populaires' },
  '🆕 Mới nhất': { en: '🆕 Latest', ja: '🆕 新着順', ko: '🆕 최신순', zh: '🆕 最新发布', fr: '🆕 Plus récents' },
  'Tìm điểm đến, kinh nghiệm...': { en: 'Search destination, tips...', ja: 'スポット・キーワード検索...', ko: '여행지, 키워드 검색...', zh: '搜索景点或攻略...', fr: 'Rechercher une destination...' },
  'lượt xem': { en: 'views', ja: '閲覧', ko: '조회', zh: '次阅读', fr: 'vues' },
  'Hữu ích': { en: 'Helpful', ja: '参考になった', ko: '도움됨', zh: '有帮助', fr: 'Utile' },
  '🔥 Xem nhiều': { en: '🔥 Popular', ja: '🔥 人気', ko: '🔥 인기', zh: '🔥 热门', fr: '🔥 Populaire' },
  'Đọc chi tiết →': { en: 'Read More →', ja: '詳しく読む →', ko: '자세히 보기 →', zh: '阅读详情 →', fr: 'Lire la suite →' },
  'Mở bài viết đầy đủ ↗': { en: 'Open Full Article ↗', ja: '記事ページを開く ↗', ko: '전체 글 페이지 열기 ↗', zh: '打开完整文章页 ↗', fr: 'Ouvrir l\'article complet ↗' },
  'Câu Hỏi Thường Gặp': { en: 'Frequently Asked Questions', ja: 'よくある質問', ko: '자주 묻는 질문', zh: '常见问题解答', fr: 'Questions Fréquentes' },
  'Đặt Du Thuyền & Xe Limousine Ngay →': { en: 'Book Cruise & Limousine Now →', ja: 'クルーズ＆Limousineを今すぐ予約 →', ko: '크루즈 & Limousine 지금 예약 →', zh: '立即预订游轮与 Limousine →', fr: 'Réserver Croisière & Limousine →' },
  '← Trước': { en: '← Prev', ja: '← 前へ', ko: '← 이전', zh: '← 上一页', fr: '← Préc.' },
  'Tiếp →': { en: 'Next →', ja: '次へ →', ko: '다음 →', zh: '下一页 →', fr: 'Suiv. →' },
  'Trang': { en: 'Page', ja: 'ページ', ko: '페이지', zh: '第', fr: 'Page' },
};

const LV = (viOrObj, en, ja, ko, zh, fr) => {
  const curLang = (window.I18N && I18N.lang) || 'vi';
  if (typeof viOrObj === 'object' && viOrObj !== null) {
    return viOrObj[curLang] || viOrObj.en || viOrObj.vi || '';
  }
  if (curLang === 'vi') return viOrObj;

  // Check if explicit argument passed
  if (curLang === 'ja' && ja) return ja;
  if (curLang === 'ko' && ko) return ko;
  if (curLang === 'zh' && zh) return zh;
  if (curLang === 'fr' && fr) return fr;

  // Check CRUISE_PHRASES dictionary by Vietnamese key or English key
  const key = String(viOrObj || '').trim();
  if (CRUISE_PHRASES[key] && CRUISE_PHRASES[key][curLang]) {
    return CRUISE_PHRASES[key][curLang];
  }

  return en || viOrObj;
};

function OneLang() {
  const [open, setOpen] = useState(false);
  const cur = (window.I18N && I18N.getCurrentLangInfo) ? I18N.getCurrentLangInfo() : (I18N.langs.find((l) => l.code === I18N.lang) || I18N.langs[0]);
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
        <div className="dt-lang-menu" style={{ zIndex: 120, width: 230, maxHeight: 380, overflowY: 'auto' }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--ink-3)', padding: '6px 10px 2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {LV('Ngôn ngữ chính thức', 'Official Languages')}
          </div>
          {I18N.langs.map((l) => (
            <button key={l.code} className={(!I18N.activeExtLang && l.code === I18N.lang) ? 'on' : ''} onClick={() => { I18N.setLang(l.code); setOpen(false); }}>
              <span>{l.flag}</span><span>{l.label}</span>
            </button>
          ))}
          <div style={{ margin: '6px 0', borderTop: '1px solid var(--line)', paddingTop: 6, fontSize: 10.5, fontWeight: 700, color: 'var(--gold)', paddingLeft: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            🌐 {LV('Tự động dịch đa quốc gia', 'Auto Translate (100+)')}
          </div>
          {(I18N.extLangs || []).map((el) => (
            <button key={el.code} className={I18N.activeExtLang === el.code ? 'on' : ''} onClick={() => { I18N.setExtLang(el.code); setOpen(false); }}>
              <span>{el.flag}</span><span>{el.label}</span>
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
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [cabins, setCabins] = useState(1);
  const [from, setFrom] = useState('HN');
  const [to, setTo] = useState('CB');
  const [comboPackage, setComboPackage] = useState('combo-day');
  const [comboModalOpen, setComboModalOpen] = useState(false);

  // Danh sách đầy đủ các tour ngắn (Vịnh Lan Hạ & Ninh Bình) từ cơ sở dữ liệu Daiichi Travel
  const LAN_HA_DAY_TOURS = [
    { id: 'f936b00d-3757-4332-9616-249a48afb59d', key: 'vip1', label: 'Tour 1 ngày Lan Hạ – Làng Việt Hải (VIP 1)', keyword: 'Fullday Vip 1', badge: '4★ Hot' },
    { id: '2622c6b5-522f-4421-b2b0-5ba3a49ec326', key: 'vip4', label: 'Một ngày Vịnh Lan Hạ Cruise 5 Sao (VIP 4)', keyword: 'Vip 4', badge: '5★ Luxury' },
    { id: 'c03a4c99-e98c-42f1-b604-e8993a77bdec', key: 'dinner', label: 'Tiệc BBQ DJ & Pháo hoa Vịnh Lan Hạ (VIP 5)', keyword: 'Vip 5', badge: '5★ BBQ DJ' },
    { id: '90fc0060-71ca-4070-9c82-d3774f26169f', key: 'sunset', label: 'Tour Hoàng hôn & Tiệc trà Sunset Cruise', keyword: 'Sunset cruise', badge: 'Hoàng hôn' },
    { id: '5cbdcdfc-5984-4d21-b3bf-ea4c8cbaf0fb', key: 'morning', label: 'Tour Bình minh Lan Hạ & Chèo Kayak', keyword: 'Morning cruise', badge: 'Bình minh' },
    { id: 'd8e6498f-b729-4c1d-9b99-f055334b5020', key: 'morning-vip3', label: 'Bình minh Vịnh Lan Hạ Cruise 5 Sao (VIP 3)', keyword: 'Vip 3', badge: '5★ Sáng' },
    { id: '3ede116b-fdfa-4604-a938-3431fd70e235', key: 'vip1-c2', label: 'Một ngày Lan Hạ Cruise 2 (VIP 1 Cruise 2)', keyword: 'Vip 1 cruise 2', badge: 'Gỗ mộc' },
    { id: '262f5b81-bf22-4049-bb71-2ee0ddda3472', key: 'sunset2', label: 'Hoàng hôn Lan Hạ Cruise 2', keyword: 'Sunset cruise 2', badge: 'Chiều tà' },
  ];

  const NINH_BINH_DAY_TOURS = [
    { id: 'ff7f599e-92e7-4583-9922-149413e162df', key: 'nb-baidinh-trangan', label: 'Ninh Bình 1 ngày: Bái Đính – Tràng An – Hang Múa (Xe điện)', keyword: 'Trang An', badge: '1 Ngày' },
    { id: '4b1a1a89-3d35-45a7-a561-8319d83d085a', key: 'nb-hoalu-tamcoc', label: 'Ninh Bình 1 ngày: Hoa Lư – Tam Cốc – Đạp xe', keyword: 'Tam Coc', badge: '1 Ngày' },
    { id: '0066fdf7-8c1a-4bc3-8745-9bd0c3154e35', key: 'nb-jeep-1day', label: 'Ninh Bình Back Road Tour 1 ngày bằng Army Jeep độc đáo', keyword: 'Jeep', badge: 'Jeep Tour' },
    { id: '2e5781c5-672b-4f6d-9a4e-2bc07d312628', key: 'nb-jeep-half', label: 'Ninh Bình Half Day Jeep Tour: Bích Động – Tràng An – Hang Múa', keyword: 'Jeep', badge: 'Jeep 1/2' },
    { id: '51218861-eb3d-4fe6-b095-13a5f934123b', key: 'nb-ebike', label: 'Ninh Bình Ebike Tour: Thung Sen – Thái Vi – Thung Nắng', keyword: 'Ebike', badge: 'Xe đạp điện' },
    { id: '1b8482dd-8100-4b92-869d-54f348a6400c', key: 'nb-sunset-moto', label: 'Sunset Motorbike Tour Hang Múa – Phố đi bộ Hoa Lư', keyword: 'Sunset', badge: 'Hoàng hôn' },
    { id: '8e9223ab-22b0-43f7-85f2-0ee6500aa1e8', key: 'nb-cucphuong-1d', label: 'Ninh Bình 1 ngày: Khám phá VQG Cúc Phương', keyword: 'Cuc Phuong', badge: 'VQG Cúc Phương' },
    { id: '651bafc6-332e-4b37-9f6e-c092f9c126a1', key: 'nb-2d1n-tamcoc', label: 'Ninh Bình 2N1Đ Bungalow: Hoa Lư – Tam Cốc – Hang Múa – Tràng An', keyword: 'Ninh Binh 2 days', badge: '2N1Đ' },
    { id: 'b40643bc-7a64-4589-8f5c-31b642169cdf', key: 'nb-2d1n-cucphuong', label: 'Ninh Bình 2N1Đ Bungalow: Hoa Lư – Tam Cốc – Cúc Phương', keyword: 'Cuc Phuong', badge: '2N1Đ' },
    { id: '19904a2a-7eb9-4607-a6b4-528a01d72ecc', key: 'nb-2d1n-thungnham', label: 'Ninh Bình 2N1Đ Bungalow: Tam Cốc – Thung Nham – Bích Động', keyword: 'Thung Nham', badge: '2N1Đ' },
    { id: 'dfb5d727-2883-47b3-b11d-190c41f17019', key: 'nb-3d2n-trangan', label: 'Ninh Bình 3N2Đ Nghỉ Dưỡng: Hoa Lư – Tam Cốc – Thung Nham – Tràng An', keyword: 'Ninh Binh 3 days', badge: '3N2Đ' },
    { id: 'bf097bd1-7c6f-4af8-801f-7ee3ddcdd1a7', key: 'nb-3d2n-cucphuong', label: 'Ninh Bình 3N2Đ Nghỉ Dưỡng: Hoa Lư – Tam Cốc – Cúc Phương – Tràng An', keyword: 'Cuc Phuong', badge: '3N2Đ' },
  ];

  const ALL_SHORT_TOURS = [...LAN_HA_DAY_TOURS, ...NINH_BINH_DAY_TOURS];
  const [selectedDayTourKey, setSelectedDayTourKey] = useState('vip1');

  const STATIONS = (window.DT_DATA && DT_DATA.STATIONS) || {};

  const handleSearch = () => {
    const wrap = (u) => (window.DAIICHI_CONFIG && typeof DAIICHI_CONFIG._wrapUrl === 'function' ? DAIICHI_CONFIG._wrapUrl(u) : (window.DaiichiTracking && typeof DaiichiTracking.decorateUrl === 'function' ? DaiichiTracking.decorateUrl(u) : u));
    let targetUrl = '';
    let searchLabel = 'cruise_search_' + tab;
    const totalPax = adults + children;

    if (tab === 'night') {
      const cruiseQuery = cruiseType === 'luxury' ? 'Luxury' : cruiseType === 'boutique' ? 'Boutique' : '';
      targetUrl = `https://daiichitravel.com/?tab=cruise-tours&cruise=${cruiseType}&search=${encodeURIComponent(cruiseQuery)}&date=${date}&checkIn=${date}&adults=${adults}&children=${children}&pax=${totalPax}&cabins=${cabins}&rooms=${cabins}&itinerary=${itinerary}&source=daiichicruise`;
    } else if (tab === 'day') {
      const curTour = ALL_SHORT_TOURS.find((t) => t.key === selectedDayTourKey) || ALL_SHORT_TOURS[0];
      targetUrl = `https://daiichitravel.com/?tab=tours&category=TOUR_SHORT&routeId=${curTour.id}&search=${encodeURIComponent(curTour.keyword)}&date=${date}&adults=${adults}&children=${children}&pax=${totalPax}&source=daiichicruise`;
    } else if (tab === 'tour') {
      // Mở Form nhập liệu tùy chọn combo gửi marketing@daiichigroup.net
      setComboModalOpen(true);
      return;
    } else {
      const fromName = STATIONS[from] ? (STATIONS[from].vi || from) : 'Hà Nội';
      const toName = STATIONS[to] ? (STATIONS[to].vi || to) : 'Cát Bà';
      targetUrl = `https://daiichitravel.com/?tab=book-ticket&from=${encodeURIComponent(fromName)}&to=${encodeURIComponent(toName)}&date=${date}&adults=${adults}&children=${children}&pax=${totalPax}&source=daiichicruise`;
    }

    if (window.DaiichiTracking && typeof DaiichiTracking.trackBookingClick === 'function') {
      DaiichiTracking.trackBookingClick(searchLabel, tab, 0);
    }
    window.open(wrap(targetUrl), '_blank');
  };

  return (
    <React.Fragment>
      <div className="lux-search-box" data-comment-anchor="cruise-search">
        <div className="lux-search-tabs">
          <button className={'lux-tab-btn' + (tab === 'night' ? ' active' : '')} onClick={() => setTab('night')}>
            <span style={{ fontSize: 18 }}>🌙</span>
            <span className="tab-text-full">{LV('Du thuyền ngủ đêm 5★ & Boutique', '5★ & Boutique Overnight Cruise')}</span>
            <span className="tab-text-mobile">{LV('Du thuyền ngủ đêm', 'Overnight Cruise')}</span>
          </button>
          <button className={'lux-tab-btn' + (tab === 'day' ? ' active' : '')} onClick={() => setTab('day')}>
            <span style={{ fontSize: 18 }}>🚢</span>
            <span className="tab-text-full">{LV('Du thuyền ngày & Tour ngắn', 'Day Cruise & Short Tours')}</span>
            <span className="tab-text-mobile">{LV('Tour ngày', 'Day Tours')}</span>
          </button>
          <button className={'lux-tab-btn' + (tab === 'tour' ? ' active' : '')} onClick={() => setTab('tour')}>
            <span style={{ fontSize: 18 }}>🗺️</span>
            <span className="tab-text-full">{LV('Tour Combo trọn gói Hà Nội', 'All-in Combo from Hanoi')}</span>
            <span className="tab-text-mobile">{LV('Tour Combo', 'Combo Tours')}</span>
          </button>
          <button className={'lux-tab-btn' + (tab === 'bus' ? ' active' : '')} onClick={() => setTab('bus')}>
            <span style={{ fontSize: 18 }}>🚐</span>
            <span className="tab-text-full">{LV('Xe Limousine đưa đón', 'Limousine Transfer')}</span>
            <span className="tab-text-mobile">{LV('Xe Limousine', 'Limousine')}</span>
          </button>
        </div>

        <div className="lux-search-form">
          {tab === 'night' && (
            <React.Fragment>
              <div className="lux-field">
                <label>⚓ {LV('Du thuyền', 'Cruise Ship')}</label>
                <select value={cruiseType} onChange={(e) => setCruiseType(e.target.value)}>
                  <option value="all">{LV('Tất cả du thuyền (Luxury & Boutique)', 'All Cruises (Luxury & Boutique)')}</option>
                  <option value="luxury" className="notranslate" translate="no">Daiichi Luxury Cruise ★★★★★</option>
                  <option value="boutique" className="notranslate" translate="no">Daiichi Boutique Cruise ★★★★</option>
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
              <div className="lux-pax-row">
                <div className="lux-field">
                  <label>👤 {LV('Người lớn', 'Adults')}</label>
                  <select value={adults} onChange={(e) => setAdults(+e.target.value)}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 20].map((n) => (
                      <option key={n} value={n}>{n} {LV('người', 'guests')}</option>
                    ))}
                  </select>
                </div>
                <div className="lux-field">
                  <label>👶 {LV('Trẻ em', 'Children')}</label>
                  <select value={children} onChange={(e) => setChildren(+e.target.value)}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>{n} {LV('trẻ em', 'children')}</option>
                    ))}
                  </select>
                </div>
                <div className="lux-field">
                  <label>🚪 {LV('Số cabin', 'Cabins')}</label>
                  <select value={cabins} onChange={(e) => setCabins(+e.target.value)}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n} {LV('phòng', 'cabin(s)')}</option>
                    ))}
                  </select>
                </div>
              </div>
            </React.Fragment>
          )}

          {tab === 'day' && (
            <React.Fragment>
              <div className="lux-field" style={{ gridColumn: 'span 2' }}>
                <label>🚢 {LV('Tuyến tour trong ngày', 'Day Cruise Tour')}</label>
                <select value={selectedDayTourKey} onChange={(e) => setSelectedDayTourKey(e.target.value)}>
                  <optgroup label={LV('⚓ Du thuyền ngày Vịnh Lan Hạ (Cát Bà)', '⚓ Lan Ha Bay Day Cruises')}>
                    {LAN_HA_DAY_TOURS.map((t) => (
                      <option key={t.key} value={t.key}>
                        [{LV(t.badge)}] {LV(t.label)}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label={LV('🌾 Tour ngắn khám phá Ninh Bình', '🌾 Ninh Binh Short Tours')}>
                    {NINH_BINH_DAY_TOURS.map((t) => (
                      <option key={t.key} value={t.key}>
                        [{LV(t.badge)}] {LV(t.label)}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
              <div className="lux-field">
                <label>📅 {LV('Ngày khởi hành', 'Departure Date')}</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="lux-pax-row-2">
                <div className="lux-field">
                  <label>👤 {LV('Người lớn', 'Adults')}</label>
                  <select value={adults} onChange={(e) => setAdults(+e.target.value)}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 20].map((n) => (
                      <option key={n} value={n}>{n} {LV('người', 'guests')}</option>
                    ))}
                  </select>
                </div>
                <div className="lux-field">
                  <label>👶 {LV('Trẻ em', 'Children')}</label>
                  <select value={children} onChange={(e) => setChildren(+e.target.value)}>
                    {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>{n} {LV('trẻ em', 'children')}</option>
                    ))}
                  </select>
                </div>
              </div>
            </React.Fragment>
          )}

          {tab === 'tour' && (
            <React.Fragment>
              <div className="lux-field" style={{ gridColumn: 'span 2' }}>
                <label>🗺️ {LV('Gói Combo Tour gợi ý', 'Combo Package')}</label>
                <select value={comboPackage} onChange={(e) => setComboPackage(e.target.value)}>
                  <option value="combo-day">{LV('Combo Xe đón Hà Nội + Du thuyền ngày 5★ VIP 4', 'Hanoi Bus + 5★ VIP 4 Day Cruise')}</option>
                  <option value="combo-overnight">{LV('Combo Xe Limousine Hà Nội + Du thuyền ngủ đêm 2N1Đ', 'Hanoi Limousine + Overnight Cruise 2D1N')}</option>
                  <option value="combo-3d2n">{LV('Combo Cát Bà 3N2Đ: Xe Limousine + Khách sạn + Du thuyền', 'Cat Ba 3D2N Combo: Limousine + Hotel + Cruise')}</option>
                  <option value="combo-custom">{LV('✨ Tự thiết kế trọn gói theo yêu cầu riêng (Custom A-Z)', '✨ Fully Custom Combo Package (All-in A-Z)')}</option>
                </select>
              </div>
              <div className="lux-field">
                <label>📅 {LV('Ngày khởi hành', 'Departure Date')}</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="lux-pax-row-2">
                <div className="lux-field">
                  <label>👤 {LV('Người lớn', 'Adults')}</label>
                  <select value={adults} onChange={(e) => setAdults(+e.target.value)}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 20].map((n) => (
                      <option key={n} value={n}>{n} {LV('người', 'guests')}</option>
                    ))}
                  </select>
                </div>
                <div className="lux-field">
                  <label>👶 {LV('Trẻ em', 'Children')}</label>
                  <select value={children} onChange={(e) => setChildren(+e.target.value)}>
                    {[0, 1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n} {LV('trẻ em', 'children')}</option>
                    ))}
                  </select>
                </div>
              </div>
            </React.Fragment>
          )}

          {tab === 'bus' && (
            <React.Fragment>
              <div className="lux-field">
                <label>📍 {LV('Điểm đón', 'From')}</label>
                <select value={from} onChange={(e) => setFrom(e.target.value)}>
                  {Object.keys(STATIONS).map((k) => (
                    <option key={k} value={k} className="notranslate" translate="no">{I18N.L(STATIONS[k])}</option>
                  ))}
                </select>
              </div>
              <div className="lux-field">
                <label>📍 {LV('Điểm trả', 'To')}</label>
                <select value={to} onChange={(e) => setTo(e.target.value)}>
                  {Object.keys(STATIONS).map((k) => (
                    <option key={k} value={k} className="notranslate" translate="no">{I18N.L(STATIONS[k])}</option>
                  ))}
                </select>
              </div>
              <div className="lux-field">
                <label>📅 {LV('Ngày đi', 'Travel Date')}</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="lux-pax-row-2">
                <div className="lux-field">
                  <label>👤 {LV('Người lớn', 'Adults')}</label>
                  <select value={adults} onChange={(e) => setAdults(+e.target.value)}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((n) => (
                      <option key={n} value={n}>{n} {LV('người', 'guests')}</option>
                    ))}
                  </select>
                </div>
                <div className="lux-field">
                  <label>👶 {LV('Trẻ em', 'Children')}</label>
                  <select value={children} onChange={(e) => setChildren(+e.target.value)}>
                    {[0, 1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n} {LV('trẻ em', 'children')}</option>
                    ))}
                  </select>
                </div>
              </div>
            </React.Fragment>
          )}

          <button
            className="lux-submit-btn"
            onClick={handleSearch}
            style={tab === 'tour' ? { background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', color: '#fff' } : undefined}
          >
            {tab === 'tour' ? (
              <React.Fragment>
                <span>📋</span> {LV('Nhập Liệu & Gửi Báo Giá Combo →', 'Custom Combo & Get Rates →')}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <span>🔍</span> {LV('Tìm Chuyến & Báo Giá →', 'Find Cruise & Rates →')}
              </React.Fragment>
            )}
          </button>
        </div>
      </div>

      {comboModalOpen && (
        <ComboInquiryModal
          initialDate={date}
          initialAdults={adults}
          initialChildren={children}
          initialPackage={comboPackage}
          onClose={() => setComboModalOpen(false)}
        />
      )}
    </React.Fragment>
  );
}

/* ============================================================
   MODAL: FORM NHẬP LIỆU TOUR COMBO TRỌN GÓI (GỬI marketing@daiichigroup.net)
   ============================================================ */
function ComboInquiryModal({ initialDate, initialAdults, initialChildren, initialPackage, onClose }) {
  const [startDate, setStartDate] = useState(initialDate || '');
  const [endDate, setEndDate] = useState(() => {
    if (initialDate) {
      const d = new Date(initialDate);
      d.setDate(d.getDate() + 1);
      return d.toISOString().split('T')[0];
    }
    return '';
  });
  const [adults, setAdults] = useState(initialAdults || 2);
  const [children, setChildren] = useState(initialChildren || 0);

  // Danh mục dịch vụ chọn lựa
  const [services, setServices] = useState({
    bus_limo: true,
    cruise_luxury: initialPackage === 'combo-overnight',
    cruise_day: initialPackage === 'combo-day',
    cruise_boutique: false,
    cruise_sunset: false,
    cruise_dinner: false,
    hotel: initialPackage === 'combo-3d2n',
    meals: true,
    viethai_kayak: true,
    tour_guide: false,
  });

  const toggleService = (k) => {
    setServices((prev) => ({ ...prev, [k]: !prev[k] }));
  };

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [inquiryId, setInquiryId] = useState('');

  const SERVICE_LABELS = {
    bus_limo: LV('🚐 Xe Limousine đón trả Hà Nội ⇄ Cát Bà (khứ hồi tận nơi)', '🚐 Limousine Hanoi ⇄ Cat Ba (door-to-door round-trip)'),
    cruise_luxury: LV('⭐ Du thuyền ngủ đêm 5★ Daiichi Luxury (Suite ban công, Skywalk)', '⭐ 5★ Daiichi Luxury Overnight Cruise (Balcony Suite, Skywalk)'),
    cruise_boutique: LV('⛵ Du thuyền ngủ đêm 4★ Daiichi Boutique (Gỗ cổ điển, riêng tư)', '⛵ 4★ Daiichi Boutique Overnight Cruise (Classic wood, private)'),
    cruise_day: LV('🚢 Du thuyền ngày 5★ VIP 4 Lan Hạ (Ăn trưa, chèo kayak, Việt Hải)', '🚢 5★ VIP 4 Lan Ha Day Cruise (Lunch, Kayak, Viet Hai)'),
    cruise_sunset: LV('🌅 Tour Hoàng Hôn & Tiệc Trà Sunset Cruise vịnh Lan Hạ', '🌅 Sunset Cruise & Tea Party on Lan Ha Bay'),
    cruise_dinner: LV('🎆 Tiệc BBQ DJ & Pháo Hoa Vịnh Lan Hạ (VIP 5)', '🎆 BBQ Dinner Cruise, Live DJ & Fireworks on Lan Ha Bay (VIP 5)'),
    hotel: LV('🏨 Khách sạn / Flamingo Beach Resort 5★ Cát Bà', '🏨 Hotel / 5★ Flamingo Beach Resort Cat Ba'),
    meals: LV('🦞 Bữa ăn hải sản / BBQ tối đặc sản', '🦞 Fresh Seafood Meals / Specialty BBQ Dinner'),
    viethai_kayak: LV('🚴‍♀️ Xe điện/xe đạp Làng cổ Việt Hải & Kayak Hang Sáng Tối', '🚴‍♀️ Electric Car/Cycling at Viet Hai Village & Kayak at Hang Sang Toi'),
    tour_guide: LV('🎟️ Hướng dẫn viên song ngữ & Vé tham quan thắng cảnh', '🎟️ Bilingual Tour Guide & All Entrance Tickets'),
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      alert(LV('Vui lòng nhập Họ tên và Số điện thoại/Zalo để chúng tôi gửi báo giá!', 'Please enter your Full Name and Phone/WhatsApp/Zalo to receive the quote!'));
      return;
    }

    setSubmitting(true);
    const chosenList = Object.keys(services)
      .filter((k) => services[k])
      .map((k) => SERVICE_LABELS[k] || k);

    const generatedId = 'COMBO-' + Date.now().toString().slice(-6);
    setInquiryId(generatedId);

    const fullNotes = `[YÊU CẦU BÁO GIÁ COMBO TRỌN GÓI - MÃ ${generatedId}]
- Ngày khởi hành: ${startDate || 'Chưa định'}
- Ngày về: ${endDate || 'Chưa định'}
- Số khách: ${adults} người lớn, ${children} trẻ em
- Dịch vụ tích chọn:
${chosenList.map((s) => '  • ' + s).join('\n')}
- Ghi chú khách: ${notes.trim() || 'Không có'}
- Gửi tới: marketing@daiichigroup.net`;

    // Gửi thông báo trực tiếp tới marketing@daiichigroup.net và lưu yêu cầu vào hệ thống
    try {
      const SUPABASE_URL = 'https://vfeodqmvilchsipdsxsh.supabase.co';
      const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmZW9kcW12aWxjaHNpcGRzeHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyNzk0MzksImV4cCI6MjA5MDg1NTQzOX0.FAorniExT887KO4SQhmFO7BX_e99FfvEBZzCM_2Sits';
      await fetch(`${SUPABASE_URL}/functions/v1/notify-inquiry`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inquiryId: generatedId,
          name: customerName.trim(),
          phone: customerPhone.trim(),
          email: customerEmail.trim() || 'Chưa cung cấp',
          from: 'Hà Nội',
          to: 'Cát Bà & Vịnh Lan Hạ / Ninh Bình',
          date: startDate || new Date().toISOString().split('T')[0],
          returnDate: endDate || '',
          adults: parseInt(adults, 10) || 2,
          children: parseInt(children, 10) || 0,
          notes: fullNotes,
        }),
      });
    } catch (err) {
      console.warn('Gửi inquiry combo notify warning:', err);
    }

    // 2. Mở sẵn mailto dự phòng hoặc báo thành công
    setSubmitting(false);
    setSuccess(true);
  };

  const zaloMsg = encodeURIComponent(
    `Chào Daiichi Travel, tôi muốn nhận báo giá Combo Trọn Gói (Mã: ${inquiryId || 'COMBO-NEW'}):\n` +
      `- Khách: ${customerName} (${customerPhone})\n` +
      `- Ngày: ${startDate} -> ${endDate}\n` +
      `- Số lượng: ${adults} người lớn, ${children} trẻ em\n` +
      `- Dịch vụ: ${Object.keys(services).filter((k) => services[k]).map((k) => SERVICE_LABELS[k]?.split(' ')[1] || k).join(', ')}\n` +
      `- Ghi chú: ${notes || 'Báo giá nhanh giúp tôi'}`
  );

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(11, 23, 44, 0.78)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: 20,
          maxWidth: 720,
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
          border: '1.5px solid #D4A648',
          position: 'relative',
          padding: '28px 24px',
          fontFamily: 'var(--font-ui), sans-serif',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: '#F1F5F9',
            border: 'none',
            borderRadius: '50%',
            width: 36,
            height: 36,
            fontSize: 20,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748B',
            fontWeight: 700,
          }}
        >
          ×
        </button>

        {success ? (
          <div style={{ textAlign: 'center', padding: '24px 8px' }}>
            <div style={{ fontSize: 56, marginBottom: 12 }}>🎉</div>
            <h3 style={{ color: '#0F172A', fontSize: 24, fontWeight: 800, margin: '0 0 10px' }}>
              {LV('Đã Gửi Yêu Cầu Báo Giá Thành Công!', 'Combo Quote Request Sent Successfully!')}
            </h3>
            <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.6, maxWidth: 520, margin: '0 auto 16px' }}>
              {LV('Toàn bộ danh sách dịch vụ và thông tin combo của Quý khách đã được chuyển trực tiếp đến bộ phận kinh doanh:', 'Your selected services and combo request have been sent directly to our sales team:')}
              <br />
              <b style={{ color: '#0369A1' }} className="notranslate" translate="no">marketing@daiichigroup.net</b> (ID: <b className="notranslate" translate="no">{inquiryId}</b>).
            </p>
            <div style={{ background: '#F8FAFC', border: '1px dashed #CBD5E1', borderRadius: 12, padding: 14, maxWidth: 480, margin: '0 auto 24px', textAlign: 'left', fontSize: 13.5, color: '#334155' }}>
              <div>👤 <b>{LV('Khách hàng:', 'Guest:')}</b> <span className="notranslate" translate="no">{customerName} — {customerPhone}</span></div>
              <div>📅 <b>{LV('Lịch trình:', 'Schedule:')}</b> {startDate} → {endDate} ({adults} {LV('người lớn', 'adults')}, {children} {LV('trẻ em', 'children')})</div>
              <div>✉️ <b>{LV('Email nhận báo giá:', 'Email:')}</b> <span className="notranslate" translate="no">{customerEmail || '-'}</span></div>
            </div>
            <p style={{ color: '#16A34A', fontWeight: 700, fontSize: 14, marginBottom: 20 }}>
              {LV('⚡ Chuyên viên Daiichi Travel sẽ liên hệ phản hồi & gửi báo giá chi tiết trong vòng 15 phút!', '⚡ Our Daiichi Travel specialist will contact you and send a detailed quote within 15 minutes!')}
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={`https://zalo.me/0961004709?text=${zaloMsg}`}
                target="_blank"
                rel="noopener"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 22px',
                  background: '#0068FF',
                  color: '#fff',
                  borderRadius: 10,
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                <span>💬</span> <span className="notranslate" translate="no">Chat Zalo (0961 004 709)</span>
              </a>
              <a
                href={`https://wa.me/84961004709?text=${encodeURIComponent(`Hi Daiichi Travel, I requested Combo Inquiry (${inquiryId || 'COMBO'}):\n- Guest: ${customerName} (${customerPhone})\n- Travel: ${startDate} -> ${endDate}\n- Pax: ${adults} adults, ${children} children`)}`}
                target="_blank"
                rel="noopener"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 22px',
                  background: '#25D366',
                  color: '#fff',
                  borderRadius: 10,
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                <span>💬</span> <span className="notranslate" translate="no">WhatsApp (+84 961 004 709)</span>
              </a>
              <a
                href="tel:19009070"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  background: '#A8121E',
                  color: '#fff',
                  borderRadius: 10,
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: 14.5,
                }}
              >
                <span>📞</span> <span className="notranslate" translate="no">Hotline 1900 9070</span>
              </a>
              <button
                onClick={onClose}
                style={{
                  padding: '12px 20px',
                  background: '#F1F5F9',
                  color: '#475569',
                  border: 'none',
                  borderRadius: 10,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {LV('Đóng', 'Close')}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: 16, marginBottom: 20 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(212, 166, 72, 0.15)', color: '#B45309', padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                {LV('📋 TÙY CHỌN DỊCH VỤ A-Z · BÁO GIÁ TRỌN GÓI', '📋 CUSTOM A-Z SERVICES · ALL-INCLUSIVE QUOTE')}
              </div>
              <h2 style={{ fontSize: 21, fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>
                {LV('Thiết Kế Tour Combo Trọn Gói Hà Nội — Vịnh Lan Hạ', 'Custom All-in Combo Tour: Ha Noi — Lan Ha Bay')}
              </h2>
              <p style={{ margin: 0, fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>
                {LV('Tích chọn các dịch vụ bạn mong muốn dưới đây. Thông tin được tổng hợp và chuyển ngay về hòm thư', 'Select your desired services below. Your inquiry will be sent directly to')} <b style={{ color: '#0369A1' }} className="notranslate" translate="no">marketing@daiichigroup.net</b> {LV('để điều hành gửi báo giá ưu đãi tốt nhất.', 'for our best custom package rate.')}
              </p>
            </div>

            {/* DỊCH VỤ TÍCH CHỌN */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
                {LV('1. Tích chọn các dịch vụ muốn có trong Combo:', '1. Select services to include in your Combo:')}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10 }}>
                {Object.keys(SERVICE_LABELS).map((k) => {
                  const checked = !!services[k];
                  return (
                    <div
                      key={k}
                      onClick={() => toggleService(k)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 12px',
                        borderRadius: 10,
                        border: checked ? '1.5px solid #D4A648' : '1px solid #E2E8F0',
                        background: checked ? '#FFFDF7' : '#F8FAFC',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        userSelect: 'none',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {}}
                        style={{ width: 18, height: 18, accentColor: '#D4A648', cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: 13, fontWeight: checked ? 700 : 500, color: checked ? '#0F172A' : '#475569', lineHeight: 1.4 }}>
                        {SERVICE_LABELS[k]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* THỜI GIAN & KHÁCH */}
            <div style={{ marginBottom: 20, background: '#F8FAFC', padding: 14, borderRadius: 12, border: '1px solid #E2E8F0' }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
                {LV('2. Thời gian khởi hành & Số lượng khách:', '2. Travel Dates & Number of Guests:')}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
                <div>
                  <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 4 }}>{LV('NGÀY ĐI', 'DEPARTURE')}</span>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={{ width: '100%', height: 40, borderRadius: 8, border: '1px solid #CBD5E1', padding: '0 10px', fontSize: 13.5, fontWeight: 600, background: '#fff' }}
                  />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 4 }}>{LV('NGÀY VỀ', 'RETURN DATE')}</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    style={{ width: '100%', height: 40, borderRadius: 8, border: '1px solid #CBD5E1', padding: '0 10px', fontSize: 13.5, fontWeight: 600, background: '#fff' }}
                  />
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 4 }}>{LV('NGƯỜI LỚN', 'ADULTS')}</span>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(+e.target.value)}
                    style={{ width: '100%', height: 40, borderRadius: 8, border: '1px solid #CBD5E1', padding: '0 10px', fontSize: 13.5, fontWeight: 600, background: '#fff' }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 15, 20, 30].map((n) => (
                      <option key={n} value={n}>{n} {LV('người', 'guests')}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 4 }}>{LV('TRẺ EM', 'CHILDREN')}</span>
                  <select
                    value={children}
                    onChange={(e) => setChildren(+e.target.value)}
                    style={{ width: '100%', height: 40, borderRadius: 8, border: '1px solid #CBD5E1', padding: '0 10px', fontSize: 13.5, fontWeight: 600, background: '#fff' }}
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                      <option key={n} value={n}>{n} {LV('trẻ em', 'children')}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* THÔNG TIN KHÁCH */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>
                {LV('3. Thông tin người nhận báo giá:', '3. Contact Information for Quote:')}
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 12 }}>
                <div>
                  <input
                    type="text"
                    placeholder={LV('Họ và tên Quý khách *', 'Full Name *')}
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    style={{ width: '100%', height: 42, borderRadius: 8, border: '1px solid #CBD5E1', padding: '0 12px', fontSize: 13.5 }}
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder={LV('Số điện thoại / Zalo *', 'Phone / WhatsApp / Zalo *')}
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                    style={{ width: '100%', height: 42, borderRadius: 8, border: '1px solid #CBD5E1', padding: '0 12px', fontSize: 13.5 }}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder={LV('Email nhận báo giá file PDF', 'Email for PDF Quote')}
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    style={{ width: '100%', height: 42, borderRadius: 8, border: '1px solid #CBD5E1', padding: '0 12px', fontSize: 13.5 }}
                  />
                </div>
              </div>
              <textarea
                placeholder={LV('Ghi chú thêm: Điểm đón tại Hà Nội, hạng phòng yêu cầu, độ tuổi các bé, ăn chay/dị ứng...', 'Additional notes: Pickup address in Ha Noi, preferred room type, children ages, dietary requirements...')}
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{ width: '100%', borderRadius: 8, border: '1px solid #CBD5E1', padding: '10px 12px', fontSize: 13, resize: 'vertical' }}
              />
            </div>

            {/* FOOTER ACTIONS */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, paddingTop: 12, borderTop: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: 12, color: '#64748B' }}>
                {LV('🔒 Dữ liệu được bảo mật & gửi trực tiếp tới', '🔒 Confidential & sent directly to')} <b style={{ color: '#0369A1' }} className="notranslate" translate="no">marketing@daiichigroup.net</b>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  onClick={onClose}
                  style={{
                    padding: '10px 18px',
                    background: '#F1F5F9',
                    color: '#475569',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {LV('Hủy', 'Cancel')}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: submitting ? 'wait' : 'pointer',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)',
                  }}
                >
                  {submitting ? LV('Đang gửi...', 'Sending...') : LV('🚀 Gửi Yêu Cầu Báo Giá Combo →', '🚀 Send Combo Quote Request →')}
                </button>
              </div>
            </div>
          </form>
        )}
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
            <h3 className="lux-ship-name notranslate" translate="no">Daiichi Luxury Cruise ★★★★★</h3>
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
                <b>{LV('Cầu Kính & Jacuzzi', 'Skywalk & Jacuzzi')}</b>
                <span>{LV('Check-in độc quyền', 'Exclusive skywalk')}</span>
              </div>
              <div className="lux-spec-box">
                <b>{LV('2N1Đ · 3N2Đ', '2D1N · 3D2N')}</b>
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
            <h3 className="lux-ship-name notranslate" translate="no">Daiichi Boutique Cruise ★★★★</h3>
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
                <b>{LV('100% Gỗ quý', '100% Natural Wood')}</b>
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
        <span className="lux-room-badge">{LV(st.badge)}</span>

        {images.length > 1 && (
          <React.Fragment>
            <button className="lux-card-slider-btn prev" onClick={prevImg} title="Prev">‹</button>
            <button className="lux-card-slider-btn next" onClick={nextImg} title="Next">›</button>
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
        <div className="lux-room-ship-label notranslate" translate="no">{st.shipName}</div>
        <h3 className="lux-room-title notranslate" translate="no">{st.name}</h3>
        <div className="lux-room-params">
          <span>📐 {st.area} m²</span>
          <span>👥 {LV(st.capacity)}</span>
          <span>🌅 {LV(st.floor)}</span>
        </div>
        <div className="lux-room-amenities">
          {st.amenities.slice(0, 3).map((a, i) => (
            <span key={i} className="lux-room-amenity">✓ {LV(a)}</span>
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
              <span className="lux-room-ship-label notranslate" translate="no">{room.shipName}</span>
              <h2 className="lux-modal-title notranslate" translate="no">{room.name}</h2>
            </div>
            <div className="lux-modal-price">
              {room.price.toLocaleString('vi-VN')}đ<em>{LV('/đêm tiêu chuẩn 2 khách', '/night for 2 guests')}</em>
            </div>
          </div>

          <div className="lux-modal-specs">
            <div>
              <span style={{ fontSize: 11, color: '#64748B' }}>{LV('Diện tích', 'Area')}</span>
              <b style={{ display: 'block', fontSize: 16, color: 'var(--navy)' }}>{room.area} m²</b>
            </div>
            <div>
              <span style={{ fontSize: 11, color: '#64748B' }}>{LV('Sức chứa', 'Capacity')}</span>
              <b style={{ display: 'block', fontSize: 16, color: 'var(--navy)' }}>{LV(room.capacity)}</b>
            </div>
            <div>
              <span style={{ fontSize: 11, color: '#64748B' }}>{LV('Vị trí', 'Location')}</span>
              <b style={{ display: 'block', fontSize: 16, color: 'var(--navy)' }}>{LV(room.floor)}</b>
            </div>
            <div>
              <span style={{ fontSize: 11, color: '#64748B' }}>{LV('Ban công', 'Balcony')}</span>
              <b style={{ display: 'block', fontSize: 16, color: 'var(--navy)' }}>{LV('Ban công riêng view biển', 'Private ocean-view balcony')}</b>
            </div>
          </div>

          <p style={{ fontSize: 14.5, color: '#475569', lineHeight: 1.7, marginBottom: 22 }}>
            {LV(room.desc)}
          </p>

          {/* ========================================================
              INTERACTIVE LIVE PRICE CALCULATOR
              ======================================================== */}
          <div className="lux-calc-section">
            <div className="lux-calc-head">
              <h3>
                <span>🧮</span> {LV('Bảng Tính Giá Tự Động Theo Yêu Cầu', 'Live Custom Rate Calculator')}
              </h3>
              <span className="lux-calc-badge">{LV('⚡ Giá thời gian thực · Đã gồm VAT', '⚡ Real-time rate · VAT included')}</span>
            </div>

            <div className="lux-calc-controls">
              <div className="lux-calc-field">
                <label>⏱ {LV('Gói hải trình', 'Itinerary')}</label>
                <select value={nights} onChange={(e) => setNights(e.target.value)}>
                  <option value="2d1n">{LV('2 Ngày 1 Đêm (2D1N)', '2 Days 1 Night (2D1N)')}</option>
                  <option value="3d2n">{LV('3 Ngày 2 Đêm (3D2N)', '3 Days 2 Nights (3D2N)')}</option>
                </select>
              </div>

              <div className="lux-calc-field">
                <label>📅 {LV('Mùa du lịch', 'Season')}</label>
                <select value={season} onChange={(e) => setSeason(e.target.value)}>
                  <option value="low">{LV('Mùa thường / Thấp điểm', 'Standard / Low Season')}</option>
                  <option value="high">{LV('Mùa cao điểm hè (+15%)', 'Summer High Season (+15%)')}</option>
                </select>
              </div>

              <div className="lux-calc-field">
                <label>👥 {LV('Người lớn', 'Adults')}</label>
                <select value={adults} onChange={(e) => setAdults(+e.target.value)}>
                  <option value={1}>{LV('1 người lớn (Phòng đơn)', '1 Adult (Single)')}</option>
                  <option value={2}>{LV('2 người lớn (Tiêu chuẩn)', '2 Adults (Standard)')}</option>
                  <option value={3}>{LV('3 người lớn (+Kê giường phụ)', '3 Adults (+Extra Bed)')}</option>
                </select>
              </div>

              <div className="lux-calc-field">
                <label>👶 {LV('Trẻ em đi kèm', 'Children')}</label>
                <select value={children} onChange={(e) => setChildren(+e.target.value)}>
                  <option value={0}>{LV('Không có trẻ em', 'No children')}</option>
                  <option value={1}>1 {LV('trẻ em', 'child')}</option>
                  <option value={2}>2 {LV('trẻ em', 'children')}</option>
                </select>
              </div>

              {children > 0 && (
                <div className="lux-calc-field">
                  <label>🎂 {LV('Độ tuổi trẻ em', 'Child Age')}</label>
                  <select value={childAge} onChange={(e) => setChildAge(e.target.value)}>
                    <option value="under2">{LV('Dưới 2 tuổi (Miễn phí 100%)', 'Under 2 years (100% Free)')}</option>
                    <option value="2to4">{LV('Từ 2 – 4 tuổi (50% giá)', '2 – 4 years (50% rate)')}</option>
                    <option value="5to10">{LV('Từ 5 – 10 tuổi (75% giá)', '5 – 10 years (75% rate)')}</option>
                  </select>
                </div>
              )}

              <div className="lux-calc-field">
                <label>📆 {LV('Ngày khởi hành dự kiến', 'Departure Date')}</label>
                <input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} />
              </div>
            </div>

            {/* Transfer Option */}
            <div style={{ marginBottom: 8 }}>
              <label style={{ fontSize: 11.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: '#64748B', display: 'block', marginBottom: 8 }}>
                🚐 {LV('Phương án đưa đón khách:', 'Transfer Option:')}
              </label>
              <div className="lux-transfer-radios">
                <div
                  className={'lux-transfer-option' + (transfer === 'limo' ? ' selected' : '')}
                  onClick={() => setTransfer('limo')}
                >
                  <input type="radio" checked={transfer === 'limo'} onChange={() => setTransfer('limo')} />
                  <div>
                    <b>{LV('Phương án B: Kèm xe Limousine đưa đón 2 chiều (+550.000đ/khách)', 'Option B: Round-trip Limousine transfer (+550,000đ/guest)')}</b>
                    <span>{LV('Đón trả tận nơi tại Phố Cổ Hà Nội thẳng đến cảng du thuyền và chiều ngược lại.', 'Door-to-door pickup in Ha Noi Old Quarter straight to the cruise harbor and back.')}</span>
                  </div>
                </div>

                <div
                  className={'lux-transfer-option' + (transfer === 'none' ? ' selected' : '')}
                  onClick={() => setTransfer('none')}
                >
                  <input type="radio" checked={transfer === 'none'} onChange={() => setTransfer('none')} />
                  <div>
                    <b>{LV('Phương án A: Khách tự túc di chuyển đến cảng (+0đ)', 'Option A: Self-arrival at the harbor (+0đ)')}</b>
                    <span>{LV('Check-in lúc 12:00 tại Cảng tàu Cát Bà / Tuần Châu.', 'Check-in at 12:00 at Cat Ba / Tuan Chau harbor.')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculation Result */}
            <div className="lux-calc-result-box">
              <div className="lux-calc-breakdown">
                <span>• <span className="notranslate" translate="no">{room.name}</span> ({nights === '2d1n' ? LV('2N1Đ · 3N2Đ', '2D1N').split(' · ')[0] : '3D2N'} · {adults} {LV('người lớn', 'adults')}): <b>{roomTotal.toLocaleString('vi-VN')}đ</b></span>
                {children > 0 && (
                  <span>• {LV('Trẻ em', 'Children')} ({children}): <b>{childFee.toLocaleString('vi-VN')}đ</b></span>
                )}
                {transfer === 'limo' && (
                  <span>• Limousine Ha Noi ({adults + (children > 0 && childAge !== 'under2' ? children : 0)}): <b>{transferTotal.toLocaleString('vi-VN')}đ</b></span>
                )}
              </div>

              <div className="lux-calc-total-wrap">
                <span className="lux-calc-total-label">{LV('Tổng Chi Phí Trọn Gói Dự Kiến', 'Estimated Total Package Rate')}</span>
                <div className="lux-calc-total-amount">
                  {grandTotal.toLocaleString('vi-VN')}đ<em>{LV('(Đã gồm VAT)', '(VAT included)')}</em>
                </div>
              </div>
            </div>
          </div>

          {/* Children Policy */}
          <div className="lux-child-policy-sec">
            <h4 className="lux-child-policy-title">
              <span>👶</span> {LV('Chính Sách Trẻ Em & Giường Phụ', 'Child & Extra Bed Policy')}
            </h4>
            <div className="lux-child-policy-grid">
              <div className="lux-child-policy-chip">
                <b>{LV('Trẻ em dưới 2 tuổi', 'Under 2 years old')}</b>
                <span>{LV('Miễn phí 100%', '100% Free')}</span> {LV('(Tối đa 1 trẻ/phòng, ngủ chung bố mẹ)', '(Max 1 child/suite, sharing bed)')}
              </div>
              <div className="lux-child-policy-chip">
                <b>{LV('Trẻ em từ 2 – 4 tuổi', '2 – 4 years old')}</b>
                <span>{LV('Phụ thu 50%', '50% Surcharge')}</span> {LV('(Ăn suất riêng, ngủ chung với bố mẹ)', '(Own meals, sharing bed)')}
              </div>
              <div className="lux-child-policy-chip">
                <b>{LV('Trẻ em từ 5 – 10 tuổi', '5 – 10 years old')}</b>
                <span>{LV('Phụ thu 75%', '75% Surcharge')}</span> {LV('(Kê giường phụ hoặc suất tiêu chuẩn)', '(Extra bed or standard meal)')}
              </div>
              <div className="lux-child-policy-chip">
                <b>{LV('Trẻ em từ 11 tuổi trở lên', '11 years & older')}</b>
                <span>{LV('Tính 100%', '100% Adult Rate')}</span> {LV('(Tính như người lớn)', '(Charged as adult)')}
              </div>
            </div>
          </div>

          {/* Amenities & Inclusions */}
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>
              {LV('Dịch vụ & Tiện nghi trọn gói trong giá phòng:', 'All-Inclusive Services & Amenities:')}
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
                  <span>{LV(item)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="lux-modal-actions">
            <button className="lux-btn-outline" onClick={onClose}>
              {LV('Đóng lại', 'Close')}
            </button>
            <a className="lux-submit-btn" style={{ textDecoration: 'none', padding: '12px 26px' }} href={bookingLink} target="_blank" rel="noopener">
              {LV('Đặt Ngay Với Cấu Hình Này', 'Book This Configuration')} ({grandTotal.toLocaleString('vi-VN')}đ) →
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
                {LV(r.from)} → {LV(r.to)}
              </div>
              <div style={{ fontSize: 12, color: '#64748B', marginBottom: 10 }}>⏱ {r.time} · {LV(r.desc)}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 11, color: '#64748B' }}>{LV('Giá chỉ từ', 'From')}</span>
                <b style={{ color: 'var(--lux-red)', fontSize: 16 }}>{r.price.toLocaleString('vi-VN')}đ<em style={{ fontSize: 11, fontStyle: 'normal', color: '#64748B', marginLeft: 3 }}>{LV('/khách', '/pax')}</em></b>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
/* ============================================================
   SECTION 7: AUTO DAILY SEO BLOG & PHOTO JOURNAL
   (VỊNH LAN HẠ · VỊNH HẠ LONG · CÁT BÀ · NINH BÌNH)
   ============================================================ */
const ADMIN_AUTH_HASHES = [
  { user: 'chutich', roleLabel: 'Chủ tịch', userPassHash: '841ea5779dced2697b69a37afc969f7cf5f0d563722e4b8dac7a5caa6ba6b7b3', passOnlyHash: 'b3c7aa6eeea16bb7ef5decffe39ee4e0df8527236caee877c81bc3bd79168277' },
  { user: 'giamdoc', roleLabel: 'Ban giám đốc', userPassHash: '73ad6fa28aaaf9ad0eb216545ba9ddeba6964c9e141a1a352520acec3d7e5e25', passOnlyHash: 'af108b1a8b16737109c2385197e00f803b07c62d67653de4154c15ee1c6089ba' },
  { user: 'quanly', roleLabel: 'Giám đốc kinh doanh', userPassHash: '130af408060101230ea3f282eee93dcee71a2f3aa46f9834199696d0d782ccc0', passOnlyHash: 'e069b2625492a56e65dc1890309f3d4f12d1e0930671b2e85201d59d387af800' },
  { user: 'ketoan', roleLabel: 'Kế toán', userPassHash: 'cfb757b1bb57193ee36c4f04ab1e49e6afa1edf28624cceae6b6524cead89d76', passOnlyHash: '2f93270fdc52580dbcf92783e5508c089fa779ee3d552e8c20f0c0f8e3eaf0aa' },
  { user: 'quay1', roleLabel: 'POS quầy vé', userPassHash: 'f3c73f78273f121e8e242faf9ca607c2a1d3725efbe5ddf6614e27d3665ccbce', passOnlyHash: 'e57ceef1e77e1ad10a20faf909d0f6148da0d5882958f53784c6c12b7ddcf3fa' },
  { user: 'marketing', roleLabel: 'Marketing & CMS', userPassHash: '4b22e9ac4d42ddacf2bbe41b81394004c3c73168b6cff2727bdefe18de64ad9d', passOnlyHash: 'b41adb4042fa23ba01875d9ec0f6740c2b0f227ff71f887a1e47420b7c338ef1' }
];

async function sha256Hex(str) {
  const buf = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function verifyDaiichiAdmin(username, password) {
  const cleanUser = String(username || '').trim().toLowerCase();
  const cleanPass = String(password || '').trim();
  if (!cleanPass) return null;
  if (cleanUser) {
    const h = await sha256Hex(cleanUser + ':' + cleanPass);
    const found = ADMIN_AUTH_HASHES.find((a) => a.userPassHash === h);
    if (found) return { user: found.user, roleLabel: found.roleLabel, ts: Date.now() };
  }
  const passHash = await sha256Hex('daiichi_salt:' + cleanPass);
  const foundByPass = ADMIN_AUTH_HASHES.find((a) => a.passOnlyHash === passHash);
  if (foundByPass) return { user: foundByPass.user, roleLabel: foundByPass.roleLabel, ts: Date.now() };
  return null;
}

function getSavedAdminSession() {
  try {
    const raw = sessionStorage.getItem('dt_admin_auth_v1') || localStorage.getItem('dt_admin_auth_v1');
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.user && Date.now() - (parsed.ts || 0) < 12 * 3600 * 1000) {
      return parsed;
    }
  } catch (e) {}
  return null;
}

const REAL_DESTINATION_PHOTOS = [
  { label: 'Tam Cốc & Hang Múa (Ninh Bình)', url: 'assets/blog/ninh-binh-tam-coc-hang-mua.jpg', region: 'Ninh Binh' },
  { label: 'Danh thắng Tràng An (Ninh Bình)', url: 'assets/blog/ninh-binh-trang-an.jpg', region: 'Ninh Binh' },
  { label: 'Vịnh Hạ Long (Đảo đá vôi)', url: 'assets/blog/vinh-ha-long-real.jpg', region: 'Ha Long' },
  { label: 'Kỳ quan Vịnh Hạ Long', url: 'assets/blog/vinh-ha-long-dao-da.jpg', region: 'Ha Long' },
  { label: 'Vịnh Lan Hạ & Cát Bà', url: 'assets/blog/vinh-lan-ha-cat-ba.jpg', region: 'Lan Ha' },
  { label: 'Vườn Quốc gia Cát Bà — Việt Hải', url: 'assets/blog/vuon-quoc-gia-cat-ba-viet-hai.jpg', region: 'Lan Ha' },
  { label: 'Bãi tắm Vịnh Lan Hạ — Cát Bà', url: 'assets/blog/bai-tam-vinh-lan-ha-cat-ba.jpg', region: 'Lan Ha' },
  { label: 'Chèo Kayak Hang Sáng Tối (Lan Hạ)', url: 'assets/photos/daycruise-2.jpg', region: 'Lan Ha' },
  { label: 'Du thuyền 5★ Daiichi Luxury', url: 'assets/photos/luxury-1.jpg', region: 'Lan Ha' },
  { label: 'Bể sục Jacuzzi & Cầu kính Skywalk', url: 'assets/photos/luxury-jacuzzi.jpg', region: 'Lan Ha' }
];

function buildAutoSeoPost({ region, place, image, highlight, dateStr }) {
  const regionMap = {
    'Lan Ha': 'Vịnh Lan Hạ · Cát Bà',
    'Ha Long': 'Vịnh Hạ Long · Di Sản UNESCO',
    'Ninh Binh': 'Ninh Bình · Tràng An · Tam Cốc'
  };
  const regionLabel = regionMap[region] || 'Vịnh Lan Hạ · Cát Bà';
  const cleanPlace = (place || 'Vịnh Lan Hạ').trim();
  const slug = cleanPlace
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') + '-' + dateStr;

  const customFocusVi = highlight && highlight.trim()
    ? highlight.trim()
    : `Khám phá vẻ đẹp kỳ vĩ của ${cleanPlace} với làn nước ngọc bích, núi đá vôi nguyên sơ và trải nghiệm dịch vụ du thuyền 5 sao cùng xe Limousine đưa đón tận nơi.`;
  const customFocusEn = highlight && highlight.trim()
    ? highlight.trim()
    : `Experience the breathtaking beauty of ${cleanPlace} with emerald waters, limestone karsts, and 5-star Daiichi Cruise & door-to-door Limousine service.`;

  return {
    id: 'blog-' + Date.now().toString().slice(-6),
    slug,
    date: dateStr,
    isCustomOrDaily: true,
    region: region || 'Lan Ha',
    regionLabel,
    image: image || 'assets/blog/vinh-lan-ha-cat-ba.jpg',
    readingTime: '5 phút đọc',
    title: {
      vi: `Khám Phá ${cleanPlace}: Cẩm Nang Du Lịch & Góc Check-in Đẹp Nhất (${dateStr})`,
      en: `Discover ${cleanPlace}: Best Travel & Cruise Guide (${dateStr})`,
      ja: `${cleanPlace} 徹底ガイド：絶景スポット＆クルーズ情報 (${dateStr})`,
      ko: `${cleanPlace} 여행 가이드: 베스트 포토존 & 크루즈 안내 (${dateStr})`,
      zh: `探索 ${cleanPlace}：最佳游览与游轮攻略 (${dateStr})`,
      fr: `Découvrir ${cleanPlace} : Guide Voyage & Croisière (${dateStr})`
    },
    excerpt: {
      vi: customFocusVi,
      en: customFocusEn,
      ja: `${cleanPlace} の最新風景と 5つ星 Daiichi Cruise・Limousine 予約ガイド。`,
      ko: `${cleanPlace}의 아름다운 풍경과 5성급 Daiichi Cruise & Limousine 여행 팁.`,
      zh: `${cleanPlace} 实拍美景与五星级 Daiichi Cruise 游轮及 Limousine 预订指南。`,
      fr: `Paysages d'exception à ${cleanPlace} et conseils de réservation Daiichi Cruise 5★.`
    },
    keywords: [cleanPlace, 'Vịnh Lan Hạ', 'Vịnh Hạ Long', 'Ninh Bình', 'Cát Bà', 'Daiichi Cruise'],
    sections: [
      {
        h2: `1. Điểm nhấn ấn tượng tại ${cleanPlace}`,
        p: `${customFocusVi} Đây là một trong những điểm đến nổi bật nhất trong hành trình khám phá di sản thiên nhiên miền Bắc cùng Daiichi Cruise & Daiichi Travel.`
      },
      {
        h2: '2. Thời điểm lý tưởng & Kinh nghiệm chụp ảnh đẹp',
        p: `Để bắt trọn khoảnh khắc đẹp nhất tại ${cleanPlace}, du khách nên lựa chọn khung giờ nắng sớm (07:30 – 09:30) hoặc hoàng hôn (16:00 – 18:00). Từ boong thượng sundeck, Cầu Kính Skywalk hoặc ban công riêng trên du thuyền, bạn có thể phóng tầm mắt ngắm nhìn toàn cảnh non nước hữu tình.`
      },
      {
        h2: '3. Đặt trọn gói Du thuyền & Xe Limousine đưa đón tận nơi',
        p: 'Hệ sinh thái Daiichi Travel cung cấp giải pháp di chuyển và nghỉ dưỡng trọn gói từ Hà Nội, Hải Phòng, Ninh Bình đi Cát Bà – Vịnh Lan Hạ – Vịnh Hạ Long với mức giá gốc trực tiếp từ nhà tàu.'
      }
    ],
    faqs: [
      {
        q: `Đi ${cleanPlace} nên chọn tour 1 ngày hay ngủ đêm trên du thuyền?`,
        a: 'Nếu có thời gian, hải trình ngủ đêm 2N1Đ hoặc 3N2Đ trên Daiichi Luxury Cruise 5★ sẽ mang lại trải nghiệm trọn vẹn nhất. Nếu đi trong ngày, bạn có thể chọn Du thuyền ngày VIP 4 hoặc Tour Ninh Bình khởi hành hàng ngày.'
      }
    ]
  };
}

const DEFAULT_ENGAGEMENT = {
  'kinh-nghiem-du-thuyen-vinh-lan-ha-cat-ba-tu-a-z': { views: 1840, likes: 312, ctaClicks: 94 },
  'so-sanh-vinh-ha-long-va-vinh-lan-ha-nen-di-dau': { views: 1520, likes: 268, ctaClicks: 81 },
  'kham-pha-ninh-binh-trang-an-tam-coc-hang-mua-1-ngay': { views: 1390, likes: 245, ctaClicks: 73 },
  'cau-kinh-skywalk-va-be-suc-jacuzzi-tren-du-thuyen-5-sao-lan-ha': { views: 1210, likes: 219, ctaClicks: 68 },
  'lich-trinh-3-ngay-2-dem-ha-noi-ninh-binh-ha-long-lan-ha': { views: 980, likes: 174, ctaClicks: 52 },
  'lang-co-viet-hai-vien-ngoc-xanh-giua-vuon-quoc-gia-cat-ba': { views: 890, likes: 156, ctaClicks: 45 },
};

function getEngagementScore(stat) {
  if (!stat) return 100;
  return (stat.views || 0) + (stat.likes || 0) * 5 + (stat.ctaClicks || 0) * 10;
}

function loadMergedBlogPosts() {
  const base = Array.isArray(window.DT_BLOG_POSTS) ? [...window.DT_BLOG_POSTS] : [];
  const today = new Date().toISOString().split('T')[0];
  const allMerged = [...base];
  const hasToday = allMerged.some((p) => p.date === today);
  if (!hasToday) {
    const dailyRotate = [
      { region: 'Lan Ha', place: 'Hang Sáng Tối — Vịnh Lan Hạ', image: 'assets/photos/daycruise-2.jpg', highlight: 'Chèo thuyền kayak xuyên hang nước ngầm kỳ bí giữa lòng Vịnh Lan Hạ và chiêm ngưỡng thung lũng đá vôi xanh ngọc bích.' },
      { region: 'Ha Long', place: 'Kỳ Quan Vịnh Hạ Long & Vịnh Lan Hạ', image: 'assets/blog/vinh-ha-long-real.jpg', highlight: 'Hải trình du thuyền 5 sao kết nối ranh giới thiên nhiên kỳ vĩ giữa Vịnh Hạ Long và Vịnh Lan Hạ với 100% phòng Suite ban công riêng.' },
      { region: 'Ninh Binh', place: 'Tràng An & Hang Múa — Ninh Bình', image: 'assets/blog/ninh-binh-tam-coc-hang-mua.jpg', highlight: 'Ngồi thuyền nan xuôi dòng nước biếc Tràng An – Tam Cốc và chinh phục đỉnh Ngọa Long trên Hang Múa ngắm trọn non nước Ninh Bình.' },
      { region: 'Lan Ha', place: 'Bãi Tắm Ba Trái Đào — Vịnh Lan Hạ', image: 'assets/blog/bai-tam-vinh-lan-ha-cat-ba.jpg', highlight: 'Đắm mình trong làn nước biển trong vắt tại bãi tắm hoang sơ Ba Trái Đào trên hải trình du thuyền Daiichi Cruise.' }
    ];
    const dayNumber = Math.floor(Date.now() / 86400000);
    const pick = dailyRotate[dayNumber % dailyRotate.length];
    const autoTodayPost = buildAutoSeoPost({ ...pick, dateStr: today });
    allMerged.unshift(autoTodayPost);
  }

  // Áp dụng các chỉnh sửa / bài thêm mới / bài đã xóa của Admin từ localStorage
  try {
    const overrides = JSON.parse(localStorage.getItem('dt_blog_overrides_v1') || '{}');
    const deletedSlugs = Array.isArray(overrides.deletedSlugs) ? overrides.deletedSlugs : [];
    const editedBySlug = overrides.editedBySlug || {};
    const addedPosts = Array.isArray(overrides.addedPosts) ? overrides.addedPosts : [];

    const combined = [...addedPosts];
    for (const p of allMerged) {
      if (!combined.some((x) => x.slug === p.slug)) {
        combined.push(p);
      }
    }
    return combined
      .filter((p) => !deletedSlugs.includes(p.slug))
      .map((p) => (editedBySlug[p.slug] ? { ...p, ...editedBySlug[p.slug] } : p));
  } catch (e) {
    return allMerged;
  }
}

function SeoBlogSection() {
  const [regionFilter, setRegionFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'latest'
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [activePost, setActivePost] = useState(null);
  const [posts, setPosts] = useState(loadMergedBlogPosts);
  const PAGE_SIZE = 3; // Chỉ hiển thị gọn 1 hàng 3 bài nổi bật nhất trên trang chủ

  // Admin state để chỉnh sửa các bài viết tự động
  const [adminSession, setAdminSession] = useState(getSavedAdminSession);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authUser, setAuthUser] = useState('giamdoc');
  const [authPass, setAuthPass] = useState('');
  const [authError, setAuthError] = useState('');
  const [pendingEditPost, setPendingEditPost] = useState(null);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const syncPosts = () => {
      setPosts(loadMergedBlogPosts());
      setAdminSession(getSavedAdminSession());
    };
    window.addEventListener('storage', syncPosts);
    window.addEventListener('dt:blog_updated', syncPosts);
    return () => {
      window.removeEventListener('storage', syncPosts);
      window.removeEventListener('dt:blog_updated', syncPosts);
    };
  }, []);

  // Lưu trữ & cập nhật điểm tương tác thực tế của khách hàng (lượt đọc, yêu thích, bấm đặt tàu)
  const [engMap, setEngMap] = useState(() => {
    let saved = {};
    try {
      saved = JSON.parse(localStorage.getItem('dt_blog_engagement_v1') || '{}');
    } catch (e) {}
    return { ...DEFAULT_ENGAGEMENT, ...saved };
  });

  const [likedMap, setLikedMap] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dt_blog_liked_v1') || '{}');
    } catch (e) {
      return {};
    }
  });

  const recordInteraction = (slug, field, delta = 1) => {
    if (!slug) return;
    setEngMap((prev) => {
      const cur = prev[slug] || { views: 240, likes: 38, ctaClicks: 12 };
      const next = {
        ...prev,
        [slug]: {
          ...cur,
          [field]: Math.max(0, (cur[field] || 0) + delta)
        }
      };
      try {
        localStorage.setItem('dt_blog_engagement_v1', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const toggleLike = (e, slug) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const already = !!likedMap[slug];
    setLikedMap((prev) => {
      const next = { ...prev, [slug]: !already };
      try {
        localStorage.setItem('dt_blog_liked_v1', JSON.stringify(next));
      } catch (err) {}
      return next;
    });
    recordInteraction(slug, 'likes', already ? -1 : 1);
  };

  const startEditPost = (post, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const draft = {
      ...post,
      titleVi: typeof post.title === 'object' ? post.title.vi || '' : String(post.title || ''),
      titleEn: typeof post.title === 'object' ? post.title.en || '' : String(post.title || ''),
      excerptVi: typeof post.excerpt === 'object' ? post.excerpt.vi || '' : String(post.excerpt || ''),
      excerptEn: typeof post.excerpt === 'object' ? post.excerpt.en || '' : String(post.excerpt || ''),
      sections: Array.isArray(post.sections) && post.sections.length
        ? post.sections.map((s) => ({ h2: s.h2 || '', p: s.p || '' }))
        : [{ h2: '1. Điểm nổi bật', p: '' }],
      faqs: Array.isArray(post.faqs)
        ? post.faqs.map((f) => ({ q: f.q || '', a: f.a || '' }))
        : []
    };

    if (adminSession) {
      setEditingPost(draft);
    } else {
      setPendingEditPost(draft);
      setAuthError('');
      setAuthPass('');
      setAuthModalOpen(true);
    }
  };

  const handleAdminLoginSubmit = async (e) => {
    e.preventDefault();
    const verified = await verifyDaiichiAdmin(authUser, authPass);
    if (!verified) {
      setAuthError('Sai tài khoản hoặc mật khẩu Quản trị viên!');
      return;
    }
    sessionStorage.setItem('dt_admin_auth_v1', JSON.stringify(verified));
    localStorage.setItem('dt_admin_auth_v1', JSON.stringify(verified));
    setAdminSession(verified);
    setAuthModalOpen(false);
    setAuthPass('');
    if (pendingEditPost) {
      setEditingPost(pendingEditPost);
      setPendingEditPost(null);
    }
  };

  const handleSaveEditedPost = (e) => {
    e.preventDefault();
    if (!editingPost) return;
    const regionMap = {
      'Lan Ha': 'Vịnh Lan Hạ · Cát Bà',
      'Ha Long': 'Vịnh Hạ Long · Di Sản UNESCO',
      'Ninh Binh': 'Ninh Bình · Tràng An · Tam Cốc'
    };
    const updatedPost = {
      ...editingPost,
      regionLabel: editingPost.regionLabel || regionMap[editingPost.region] || 'Vịnh Lan Hạ · Cát Bà',
      title: {
        ...(typeof editingPost.title === 'object' ? editingPost.title : {}),
        vi: editingPost.titleVi.trim(),
        en: (editingPost.titleEn || editingPost.titleVi).trim()
      },
      excerpt: {
        ...(typeof editingPost.excerpt === 'object' ? editingPost.excerpt : {}),
        vi: editingPost.excerptVi.trim(),
        en: (editingPost.excerptEn || editingPost.excerptVi).trim()
      },
      sections: (editingPost.sections || []).filter((s) => s.h2.trim() || s.p.trim()),
      faqs: (editingPost.faqs || []).filter((f) => f.q.trim() || f.a.trim())
    };
    delete updatedPost.titleVi;
    delete updatedPost.titleEn;
    delete updatedPost.excerptVi;
    delete updatedPost.excerptEn;

    try {
      const overrides = JSON.parse(localStorage.getItem('dt_blog_overrides_v1') || '{}');
      overrides.editedBySlug = overrides.editedBySlug || {};
      overrides.addedPosts = Array.isArray(overrides.addedPosts) ? overrides.addedPosts : [];
      overrides.deletedSlugs = Array.isArray(overrides.deletedSlugs) ? overrides.deletedSlugs : [];

      if (editingPost.isNewDraft) {
        delete updatedPost.isNewDraft;
        overrides.addedPosts.unshift(updatedPost);
      } else {
        overrides.editedBySlug[updatedPost.slug] = updatedPost;
      }
      localStorage.setItem('dt_blog_overrides_v1', JSON.stringify(overrides));
      window.dispatchEvent(new CustomEvent('dt:blog_updated'));
    } catch (err) {
      console.error(err);
    }

    setPosts(loadMergedBlogPosts());
    if (activePost && activePost.slug === updatedPost.slug) {
      setActivePost(updatedPost);
    }
    setEditingPost(null);
  };

  const handleDeletePost = (slug) => {
    if (!slug) return;
    try {
      const overrides = JSON.parse(localStorage.getItem('dt_blog_overrides_v1') || '{}');
      overrides.deletedSlugs = Array.isArray(overrides.deletedSlugs) ? overrides.deletedSlugs : [];
      if (!overrides.deletedSlugs.includes(slug)) {
        overrides.deletedSlugs.push(slug);
      }
      localStorage.setItem('dt_blog_overrides_v1', JSON.stringify(overrides));
      window.dispatchEvent(new CustomEvent('dt:blog_updated'));
    } catch (err) {}
    setPosts(loadMergedBlogPosts());
    setEditingPost(null);
    if (activePost && activePost.slug === slug) setActivePost(null);
  };

  const handleUploadBlogPhoto = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target && ev.target.result) {
        setEditingPost((prev) => ({ ...prev, image: ev.target.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  // Bơm dữ liệu cấu trúc ngầm trong <head> cho công cụ tìm kiếm
  useEffect(() => {
    const scriptId = 'dt-dynamic-blog-schema';
    let el = document.getElementById(scriptId);
    if (!el) {
      el = document.createElement('script');
      el.id = scriptId;
      el.type = 'application/ld+json';
      document.head.appendChild(el);
    }
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Cẩm Nang Du Lịch Vịnh Lan Hạ, Vịnh Hạ Long & Ninh Bình — Daiichi Cruise',
      url: 'https://daiichicruise.vn/#blog',
      blogPost: posts.slice(0, 6).map((p) => ({
        '@type': 'BlogPosting',
        headline: (p.title && p.title.vi) || '',
        description: (p.excerpt && p.excerpt.vi) || '',
        datePublished: p.date,
        image: p.image && p.image.startsWith('http') ? p.image : `https://daiichicruise.vn/${String(p.image || '').replace(/^\/+/, '')}`,
        url: `https://daiichicruise.vn/seo/blog/${p.slug}.html`
      }))
    };
    el.textContent = JSON.stringify(schemaData);
  }, [posts]);

  // Lọc theo vùng + từ khóa tìm kiếm, sau đó sắp xếp ưu tiên bài có tương tác cao nhất lên đầu
  const processedPosts = posts
    .filter((p) => (regionFilter === 'all' ? true : p.region === regionFilter))
    .filter((p) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const t = String(LV(p.title) || '').toLowerCase();
      const ex = String(LV(p.excerpt) || '').toLowerCase();
      const rg = String(p.regionLabel || '').toLowerCase();
      return t.includes(q) || ex.includes(q) || rg.includes(q);
    })
    .slice()
    .sort((a, b) => {
      if (sortBy === 'latest') {
        return String(b.date || '').localeCompare(String(a.date || ''));
      }
      const scoreA = getEngagementScore(engMap[a.slug]);
      const scoreB = getEngagementScore(engMap[b.slug]);
      return scoreB - scoreA;
    });

  const totalPages = Math.max(1, Math.ceil(processedPosts.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const visiblePosts = processedPosts.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const openArticle = (post) => {
    recordInteraction(post.slug, 'views', 1);
    setActivePost(post);
  };

  return (
    <section className="lux-duo-sec" id="blog" data-screen-label="Cẩm Nang Du Lịch">
      <div className="lux-sec-header" style={{ marginBottom: 24 }}>
        <div className="lux-sec-kicker">{LV('CẨM NANG & KINH NGHIỆM DU LỊCH', 'TRAVEL GUIDE & INSIGHTS')}</div>
        <h2 className="lux-sec-title">{LV('Khám Phá Vịnh Lan Hạ, Vịnh Hạ Long & Ninh Bình', 'Discover Lan Ha Bay, Ha Long Bay & Ninh Binh')}</h2>
        <p className="lux-sec-sub">
          {LV(
            'Tổng hợp kinh nghiệm đi du thuyền, lịch trình tham quan và những góc chụp ảnh đẹp nhất tại Vịnh Lan Hạ, Vịnh Hạ Long, đảo Cát Bà và danh thắng Ninh Bình.',
            'Curated cruise tips, itineraries, and the best photo spots across Lan Ha Bay, Ha Long Bay, Cat Ba Island, and Ninh Binh.'
          )}
        </p>
      </div>

      {/* Thanh Quản trị viên (Chỉ hiện khi Admin đã đăng nhập mật khẩu) */}
      {adminSession && (
        <div style={{ background: '#0F172A', color: '#F8FAFC', padding: '12px 18px', borderRadius: 14, marginBottom: 18, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, border: '1px solid #D4A648' }}>
          <div style={{ fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#34D399' }}>🔓 Chế độ Quản trị viên ({adminSession.user}):</span>
            <span style={{ color: '#CBD5E1', fontWeight: 500 }}>Bấm nút <b>"✏️ Sửa bài"</b> trên bất kỳ bài viết nào để chỉnh sửa ảnh, tiêu đề hoặc nội dung.</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={(e) => {
                const today = new Date().toISOString().split('T')[0];
                const newDraft = buildAutoSeoPost({ region: 'Lan Ha', place: 'Điểm Đến Mới Vịnh Lan Hạ', image: 'assets/blog/vinh-lan-ha-cat-ba.jpg', highlight: '', dateStr: today });
                newDraft.isNewDraft = true;
                startEditPost(newDraft, e);
              }}
              style={{ background: 'var(--lux-gold-grad)', color: '#0A192F', border: 'none', padding: '7px 14px', borderRadius: 8, fontWeight: 800, fontSize: 12.5, cursor: 'pointer' }}
            >
              + Viết Bài Mới
            </button>
            <button
              type="button"
              onClick={() => {
                sessionStorage.removeItem('dt_admin_auth_v1');
                localStorage.removeItem('dt_admin_auth_v1');
                setAdminSession(null);
              }}
              style={{ background: 'rgba(255,255,255,0.1)', color: '#F8FAFC', border: '1px solid rgba(255,255,255,0.2)', padding: '7px 12px', borderRadius: 8, fontWeight: 600, fontSize: 12, cursor: 'pointer' }}
            >
              Đóng chế độ sửa
            </button>
          </div>
        </div>
      )}

      {/* Thanh phân loại địa danh + Sắp xếp theo độ tương tác + Tìm kiếm nhanh */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: LV('Tất Cả', 'All') },
            { id: 'Lan Ha', label: LV('Vịnh Lan Hạ & Cát Bà', 'Lan Ha Bay & Cat Ba') },
            { id: 'Ha Long', label: LV('Vịnh Hạ Long', 'Ha Long Bay') },
            { id: 'Ninh Binh', label: LV('Ninh Bình (Tràng An · Tam Cốc)', 'Ninh Binh (Trang An · Tam Coc)') }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => { setRegionFilter(tab.id); setPage(1); }}
              style={{
                padding: '9px 16px',
                borderRadius: 24,
                border: regionFilter === tab.id ? '1.5px solid #D4A648' : '1px solid #CBD5E1',
                background: regionFilter === tab.id ? 'var(--navy)' : '#FFFFFF',
                color: regionFilter === tab.id ? '#FDE68A' : '#334155',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                transition: 'all .15s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              placeholder={'🔍 ' + LV('Tìm điểm đến, kinh nghiệm...', 'Search destination, tips...')}
              style={{
                height: 38,
                padding: '0 14px',
                borderRadius: 20,
                border: '1px solid #CBD5E1',
                fontSize: 13,
                minWidth: 210,
                background: '#FFFFFF',
                color: '#1E293B'
              }}
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
            style={{
              height: 38,
              padding: '0 14px',
              borderRadius: 20,
              border: '1.5px solid #D4A648',
              background: '#FFFDF7',
              color: 'var(--navy)',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer'
            }}
          >
            <option value="popular">{LV('🔥 Tương tác cao nhất', '🔥 Most Popular')}</option>
            <option value="latest">{LV('🆕 Mới nhất', '🆕 Latest')}</option>
          </select>
        </div>
      </div>

      {/* Chỉ hiển thị gọn 3 bài viết nổi bật nhất trên mỗi trang */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 22 }}>
        {visiblePosts.map((post, idx) => {
          const stat = engMap[post.slug] || { views: 260, likes: 42, ctaClicks: 14 };
          const isLiked = !!likedMap[post.slug];
          const isTop = sortBy === 'popular' && safePage === 1 && idx < 2;

          return (
            <article
              key={post.id || post.slug}
              className="lux-ship-card"
              style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', overflow: 'hidden' }}
              onClick={() => openArticle(post)}
            >
              <div style={{ position: 'relative', height: 210, overflow: 'hidden' }}>
                <img
                  src={post.image}
                  alt={LV(post.title)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s' }}
                  loading="lazy"
                />
                <span
                  className="notranslate"
                  translate="no"
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    background: 'rgba(10, 25, 47, 0.88)',
                    color: '#FDE68A',
                    fontSize: 11,
                    fontWeight: 800,
                    padding: '5px 11px',
                    borderRadius: 20,
                    border: '1px solid rgba(212,166,72,0.4)'
                  }}
                >
                  📍 {post.regionLabel}
                </span>

                {isTop && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
                      color: '#fff',
                      fontSize: 11,
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: 20,
                      boxShadow: '0 4px 10px rgba(220,38,38,0.35)'
                    }}
                  >
                    {LV('🔥 Xem nhiều', '🔥 Popular')}
                  </span>
                )}

                {adminSession && (
                  <button
                    type="button"
                    onClick={(e) => startEditPost(post, e)}
                    style={{
                      position: 'absolute',
                      top: 44,
                      right: 12,
                      background: '#F59E0B',
                      color: '#0A192F',
                      border: 'none',
                      fontSize: 11.5,
                      fontWeight: 800,
                      padding: '5px 11px',
                      borderRadius: 20,
                      cursor: 'pointer',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.35)'
                    }}
                  >
                    ✏️ Sửa bài
                  </button>
                )}

                <div
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    left: 12,
                    right: 12,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span
                    style={{
                      background: 'rgba(0,0,0,0.65)',
                      color: '#fff',
                      fontSize: 11,
                      fontWeight: 600,
                      padding: '3px 9px',
                      borderRadius: 12
                    }}
                  >
                    👁 {(stat.views || 0).toLocaleString('vi-VN')} {LV('lượt xem', 'views')}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => toggleLike(e, post.slug)}
                    style={{
                      background: isLiked ? '#FEE2E2' : 'rgba(0,0,0,0.65)',
                      color: isLiked ? '#DC2626' : '#fff',
                      border: isLiked ? '1px solid #FCA5A5' : 'none',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '3px 10px',
                      borderRadius: 12,
                      cursor: 'pointer'
                    }}
                  >
                    {isLiked ? '❤️' : '🤍'} {stat.likes || 0} {LV('Hữu ích', 'Helpful')}
                  </button>
                </div>
              </div>

              <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--navy)', margin: '0 0 10px', lineHeight: 1.38, fontFamily: 'var(--font-display)' }}>
                  {LV(post.title)}
                </h3>
                <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.6, margin: '0 0 16px', flex: 1 }}>
                  {LV(post.excerpt)}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid #F1F5F9' }}>
                  <span style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--lux-red)' }}>
                    {LV('Đọc chi tiết →', 'Read More →')}
                  </span>
                  <span style={{ fontSize: 11.5, color: '#64748B', fontWeight: 600 }}>
                    📅 {post.date}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Phân trang gọn gàng để trang chủ không bao giờ bị kéo dài khi số bài viết tăng lên hàng trăm bài */}
      {totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 24 }}>
          <button
            type="button"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              border: '1px solid #CBD5E1',
              background: safePage <= 1 ? '#F1F5F9' : '#FFFFFF',
              color: safePage <= 1 ? '#94A3B8' : 'var(--navy)',
              fontWeight: 700,
              fontSize: 12.5,
              cursor: safePage <= 1 ? 'default' : 'pointer'
            }}
          >
            {LV('← Trước', '← Prev')}
          </button>

          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--navy)', padding: '0 8px' }}>
            {LV('Trang', 'Page')} {safePage} / {totalPages}
          </span>

          <button
            type="button"
            disabled={safePage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              border: '1px solid #CBD5E1',
              background: safePage >= totalPages ? '#F1F5F9' : '#FFFFFF',
              color: safePage >= totalPages ? '#94A3B8' : 'var(--navy)',
              fontWeight: 700,
              fontSize: 12.5,
              cursor: safePage >= totalPages ? 'default' : 'pointer'
            }}
          >
            {LV('Tiếp →', 'Next →')}
          </button>
        </div>
      )}

      {/* Article Reader Modal */}
      {activePost && (
        <div className="lux-modal-backdrop" onClick={() => setActivePost(null)}>
          <div className="lux-modal-box" style={{ maxWidth: 820 }} onClick={(e) => e.stopPropagation()}>
            <button className="lux-modal-close" onClick={() => setActivePost(null)}>✕</button>
            <div style={{ height: 320, overflow: 'hidden', position: 'relative' }}>
              <img src={activePost.image} alt={LV(activePost.title)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <span className="notranslate" translate="no" style={{ background: 'var(--navy)', color: '#FDE68A', padding: '5px 12px', borderRadius: 20, fontSize: 11.5, fontWeight: 800 }}>
                  📍 {activePost.regionLabel}
                </span>
                <span style={{ background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '5px 12px', borderRadius: 20, fontSize: 11.5, fontWeight: 600 }}>
                  📅 {activePost.date}
                </span>
              </div>
            </div>

            <div className="lux-modal-content" style={{ padding: '28px 32px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--navy)', margin: '0 0 12px', lineHeight: 1.28 }}>
                {LV(activePost.title)}
              </h2>
              <p style={{ fontSize: 15.5, color: '#334155', fontWeight: 600, lineHeight: 1.65, marginBottom: 22 }}>
                {LV(activePost.excerpt)}
              </p>

              {(activePost.sections || []).map((sec, idx) => (
                <div key={idx} style={{ marginBottom: 20 }}>
                  <h3 style={{ fontSize: 19, color: 'var(--navy)', fontWeight: 800, margin: '0 0 8px' }}>{sec.h2}</h3>
                  <p style={{ fontSize: 14.5, color: '#475569', lineHeight: 1.75, margin: 0 }}>{sec.p}</p>
                </div>
              ))}

              {activePost.faqs && activePost.faqs.length > 0 && (
                <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 14, padding: '18px 20px', marginTop: 24, marginBottom: 24 }}>
                  <h4 style={{ margin: '0 0 12px', color: 'var(--navy)', fontSize: 16 }}>
                    💡 {LV('Câu Hỏi Thường Gặp', 'Frequently Asked Questions')}
                  </h4>
                  {activePost.faqs.map((f, i) => (
                    <div key={i} style={{ marginBottom: i < activePost.faqs.length - 1 ? 12 : 0 }}>
                      <div style={{ fontWeight: 700, color: '#0F172A', fontSize: 14 }}>• {f.q}</div>
                      <div style={{ color: '#475569', fontSize: 13.5, marginTop: 4 }}>{f.a}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="lux-modal-actions" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="lux-btn-outline"
                    onClick={(e) => toggleLike(e, activePost.slug)}
                  >
                    {likedMap[activePost.slug] ? '❤️' : '🤍'} {LV('Hữu ích', 'Helpful')} ({(engMap[activePost.slug]?.likes || 0)})
                  </button>
                  {!activePost.isCustomOrDaily && (
                    <a
                      className="lux-btn-outline"
                      href={`seo/blog/${activePost.slug}.html`}
                      target="_blank"
                      rel="noopener"
                      style={{ textDecoration: 'none' }}
                    >
                      {LV('Mở bài viết đầy đủ ↗', 'Open Full Article ↗')}
                    </a>
                  )}
                  <button
                    type="button"
                    className="lux-btn-outline"
                    onClick={(e) => startEditPost(activePost, e)}
                    title="Dành cho Quản trị viên chỉnh sửa nội dung & hình ảnh bài viết"
                    style={{ borderColor: '#D4A648', color: '#92400E', background: '#FFFBEB' }}
                  >
                    ✏️ {LV('Chỉnh sửa bài', 'Edit Post')}
                  </button>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="lux-btn-outline" onClick={() => setActivePost(null)}>
                    {LV('Đóng lại', 'Close')}
                  </button>
                  <a
                    className="lux-submit-btn"
                    style={{ textDecoration: 'none', padding: '11px 22px' }}
                    href="https://daiichitravel.com/?tab=cruise-tours"
                    target="_blank"
                    rel="noopener"
                    onClick={() => recordInteraction(activePost.slug, 'ctaClicks', 1)}
                  >
                    {LV('Đặt Du Thuyền & Xe Limousine Ngay →', 'Book Cruise & Limousine Now →')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal xác thực mật khẩu Admin khi bấm Chỉnh sửa bài viết */}
      {authModalOpen && (
        <div className="lux-modal-backdrop" onClick={() => setAuthModalOpen(false)}>
          <div className="lux-modal-box" style={{ maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
            <button className="lux-modal-close" onClick={() => setAuthModalOpen(false)}>✕</button>
            <div className="lux-modal-content" style={{ padding: '28px 28px' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#B45309', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>
                🔒 BẢO MẬT QUẢN TRỊ VIÊN
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--navy)', margin: '0 0 8px' }}>
                Đăng Nhập Để Chỉnh Sửa Bài Viết
              </h3>
              <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 18px' }}>
                Chỉ Quản trị viên có mật khẩu mới được phép chỉnh sửa nội dung và hình ảnh các bài viết.
              </p>

              <form onSubmit={handleAdminLoginSubmit}>
                <div style={{ marginBottom: 12 }}>
                  <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: '#334155', marginBottom: 5 }}>TÀI KHOẢN QUẢN TRỊ</label>
                  <input
                    type="text"
                    value={authUser}
                    onChange={(e) => setAuthUser(e.target.value)}
                    placeholder="Ví dụ: giamdoc, quanly, marketing..."
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #CBD5E1', fontSize: 14 }}
                  />
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: '#334155', marginBottom: 5 }}>MẬT KHẨU BẢO MẬT *</label>
                  <input
                    type="password"
                    required
                    autoFocus
                    value={authPass}
                    onChange={(e) => setAuthPass(e.target.value)}
                    placeholder="Nhập mật khẩu Admin..."
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #CBD5E1', fontSize: 14 }}
                  />
                </div>
                {authError && (
                  <div style={{ color: '#DC2626', background: '#FEF2F2', padding: '8px 12px', borderRadius: 8, fontSize: 12.5, fontWeight: 700, marginBottom: 12 }}>
                    ⚠️ {authError}
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                  <button type="button" className="lux-btn-outline" onClick={() => setAuthModalOpen(false)}>Hủy</button>
                  <button type="submit" className="lux-submit-btn" style={{ padding: '10px 20px' }}>Xác nhận & Mở trình sửa →</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal Chỉnh Sửa Bài Viết (Cho phép sửa Tiêu đề, Ảnh thật, Đoạn trích, Nội dung các mục & Câu hỏi thường gặp) */}
      {editingPost && (
        <div className="lux-modal-backdrop" onClick={() => setEditingPost(null)}>
          <div className="lux-modal-box" style={{ maxWidth: 820, maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <button className="lux-modal-close" onClick={() => setEditingPost(null)}>✕</button>
            <div className="lux-modal-content" style={{ padding: '26px 30px' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>
                ✏️ TRÌNH CHỈNH SỬA BÀI VIẾT QUẢN TRỊ VIÊN
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 25, color: 'var(--navy)', margin: '0 0 18px' }}>
                {editingPost.isNewDraft ? 'Thêm Bài Viết Mới' : 'Chỉnh Sửa Nội Dung & Hình Ảnh Bài Viết'}
              </h3>

              <form onSubmit={handleSaveEditedPost}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: '#334155', marginBottom: 5 }}>CHUYÊN MỤC ĐỊA DANH</label>
                    <select
                      value={editingPost.region || 'Lan Ha'}
                      onChange={(e) => {
                        const rg = e.target.value;
                        const mapLb = { 'Lan Ha': 'Vịnh Lan Hạ · Cát Bà', 'Ha Long': 'Vịnh Hạ Long · Di Sản UNESCO', 'Ninh Binh': 'Ninh Bình · Tràng An · Tam Cốc' };
                        setEditingPost((prev) => ({ ...prev, region: rg, regionLabel: mapLb[rg] || prev.regionLabel }));
                      }}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #CBD5E1', fontSize: 13.5, fontWeight: 600 }}
                    >
                      <option value="Lan Ha">Vịnh Lan Hạ & Cát Bà</option>
                      <option value="Ha Long">Vịnh Hạ Long</option>
                      <option value="Ninh Binh">Ninh Bình (Tràng An · Tam Cốc · Hang Múa)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: '#334155', marginBottom: 5 }}>NHÃN ĐỊA DANH HIỂN THỊ</label>
                    <input
                      type="text"
                      value={editingPost.regionLabel || ''}
                      onChange={(e) => setEditingPost((prev) => ({ ...prev, regionLabel: e.target.value }))}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #CBD5E1', fontSize: 13.5 }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: '#334155', marginBottom: 5 }}>TIÊU ĐỀ BÀI VIẾT (TIẾNG VIỆT) *</label>
                  <input
                    type="text"
                    required
                    value={editingPost.titleVi || ''}
                    onChange={(e) => setEditingPost((prev) => ({ ...prev, titleVi: e.target.value }))}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #CBD5E1', fontSize: 14, fontWeight: 700 }}
                  />
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: '#334155', marginBottom: 5 }}>HÌNH ẢNH ĐẠI DIỆN (CHỌN ẢNH ĐỊA DANH THẬT HOẶC TẢI ẢNH LÊN)</label>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
                    <input
                      type="text"
                      value={editingPost.image || ''}
                      onChange={(e) => setEditingPost((prev) => ({ ...prev, image: e.target.value }))}
                      placeholder="Đường dẫn ảnh (URL hoặc assets/blog/...)"
                      style={{ flex: 1, minWidth: 220, padding: '9px 12px', borderRadius: 8, border: '1.5px solid #CBD5E1', fontSize: 13 }}
                    />
                    <label style={{ background: '#0F172A', color: '#FDE68A', padding: '9px 14px', borderRadius: 8, fontSize: 12.5, fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      📁 Tải ảnh từ máy
                      <input type="file" accept="image/*" onChange={handleUploadBlogPhoto} style={{ display: 'none' }} />
                    </label>
                  </div>

                  {/* Bộ chọn nhanh ảnh thật các địa danh */}
                  <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6 }}>
                    {REAL_DESTINATION_PHOTOS.map((ph, i) => (
                      <div
                        key={i}
                        onClick={() => setEditingPost((prev) => ({ ...prev, image: ph.url }))}
                        style={{
                          flex: '0 0 125px',
                          borderRadius: 8,
                          overflow: 'hidden',
                          border: editingPost.image === ph.url ? '2.5px solid #D4A648' : '1px solid #CBD5E1',
                          cursor: 'pointer',
                          background: '#fff'
                        }}
                      >
                        <img src={ph.url} alt={ph.label} style={{ width: '100%', height: 64, objectFit: 'cover', display: 'block' }} />
                        <div style={{ fontSize: 10.5, fontWeight: 700, padding: '4px 6px', color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {ph.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 11.5, fontWeight: 700, color: '#334155', marginBottom: 5 }}>ĐOẠN TÓM TẮT MỞ ĐẦU *</label>
                  <textarea
                    rows={2}
                    required
                    value={editingPost.excerptVi || ''}
                    onChange={(e) => setEditingPost((prev) => ({ ...prev, excerptVi: e.target.value }))}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #CBD5E1', fontSize: 13.5, fontFamily: 'inherit' }}
                  />
                </div>

                {/* Các mục nội dung chi tiết */}
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 800, color: 'var(--navy)' }}>NỘI DUNG CHI TIẾT CÁC MỤC</label>
                    <button
                      type="button"
                      onClick={() => setEditingPost((prev) => ({ ...prev, sections: [...(prev.sections || []), { h2: `${(prev.sections || []).length + 1}. Tiêu đề mục mới`, p: '' }] }))}
                      style={{ background: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                    >
                      + Thêm mục nội dung
                    </button>
                  </div>
                  {(editingPost.sections || []).map((sec, idx) => (
                    <div key={idx} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: 12, marginBottom: 10 }}>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                        <input
                          type="text"
                          value={sec.h2}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditingPost((prev) => {
                              const next = [...prev.sections];
                              next[idx] = { ...next[idx], h2: val };
                              return { ...prev, sections: next };
                            });
                          }}
                          placeholder="Tiêu đề mục (H2)"
                          style={{ flex: 1, padding: '8px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13.5, fontWeight: 700 }}
                        />
                        {editingPost.sections.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setEditingPost((prev) => ({ ...prev, sections: prev.sections.filter((_, i) => i !== idx) }))}
                            style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: 6, padding: '0 10px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                          >
                            Xóa mục
                          </button>
                        )}
                      </div>
                      <textarea
                        rows={3}
                        value={sec.p}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingPost((prev) => {
                            const next = [...prev.sections];
                            next[idx] = { ...next[idx], p: val };
                            return { ...prev, sections: next };
                          });
                        }}
                        placeholder="Nội dung đoạn văn..."
                        style={{ width: '100%', padding: '8px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13, fontFamily: 'inherit' }}
                      />
                    </div>
                  ))}
                </div>

                {/* Câu hỏi thường gặp */}
                <div style={{ marginBottom: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ fontSize: 12, fontWeight: 800, color: 'var(--navy)' }}>CÂU HỎI THƯỜNG GẶP TRONG BÀI</label>
                    <button
                      type="button"
                      onClick={() => setEditingPost((prev) => ({ ...prev, faqs: [...(prev.faqs || []), { q: '', a: '' }] }))}
                      style={{ background: '#EFF6FF', color: '#1D4ED8', border: '1px solid #BFDBFE', padding: '5px 12px', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                    >
                      + Thêm câu hỏi
                    </button>
                  </div>
                  {(editingPost.faqs || []).map((fq, idx) => (
                    <div key={idx} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10, padding: 12, marginBottom: 8 }}>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                        <input
                          type="text"
                          value={fq.q}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditingPost((prev) => {
                              const next = [...prev.faqs];
                              next[idx] = { ...next[idx], q: val };
                              return { ...prev, faqs: next };
                            });
                          }}
                          placeholder="Câu hỏi..."
                          style={{ flex: 1, padding: '7px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13, fontWeight: 700 }}
                        />
                        <button
                          type="button"
                          onClick={() => setEditingPost((prev) => ({ ...prev, faqs: prev.faqs.filter((_, i) => i !== idx) }))}
                          style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: 6, padding: '0 10px', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                        >
                          Xóa
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={fq.a}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingPost((prev) => {
                            const next = [...prev.faqs];
                            next[idx] = { ...next[idx], a: val };
                            return { ...prev, faqs: next };
                          });
                        }}
                        placeholder="Câu trả lời..."
                        style={{ width: '100%', padding: '7px 10px', borderRadius: 6, border: '1px solid #CBD5E1', fontSize: 13, fontFamily: 'inherit' }}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, borderTop: '1px solid #E2E8F0', paddingTop: 16 }}>
                  {!editingPost.isNewDraft ? (
                    <button
                      type="button"
                      onClick={() => handleDeletePost(editingPost.slug)}
                      style={{ background: '#FEE2E2', color: '#B91C1C', border: '1px solid #FCA5A5', padding: '10px 16px', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
                    >
                      🗑️ Ẩn / Xóa bài viết này
                    </button>
                  ) : <span />}
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button type="button" className="lux-btn-outline" onClick={() => setEditingPost(null)}>Hủy</button>
                    <button type="submit" className="lux-submit-btn" style={{ padding: '10px 24px' }}>💾 Lưu Thay Đổi Bài Viết</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ============================================================
   ROOM DETAIL POPUP MODAL COMPONENT
   ============================================================ */


/* ============================================================
   MAIN UNIFIED CRUISE HOMEPAGE
   ============================================================ */

/* ============================================================
   ULTRA-HD VECTOR BRAND LOGO
   Crisp, radiant 5★ metallic yacht insignia & serif display wordmark
   ============================================================ */
function DaiichiUltraLogo() {
  return (
    <a className="lux-brand-logo notranslate" translate="no" href="#" title="Daiichi Cruise — Luxury & Boutique Cruises">
      <div className="lux-logo-emblem-wrap">
        <img
          src="assets/brand/emblem-Daiichi.png"
          alt="Daiichi 5★ Emblem"
          style={{ width: 34, height: 34, objectFit: 'contain' }}
        />
      </div>
      <div className="lux-brand-text">
        <span className="lux-brand-title">
          DAIICHI <em>CRUISE</em>
        </span>
        <span className="lux-brand-subtitle">
          <span className="lux-brand-stars">★★★★★</span>
          <span className="lux-brand-subtag">5★ LUXURY FLEET · LAN HA BAY</span>
        </span>
      </div>
    </a>
  );
}

/* ============================================================


/* ============================================================
   GIANT MAJESTIC BACKGROUND CRUISE SHIP (TO, ẨN HIỆN GIỮA VỊNH)
   ============================================================ */
/* ============================================================
   GIANT ATMOSPHERIC BACKGROUND CRUISE STAGE (TO, NẰM Ở BACKGROUND ẨN HIỆN)
   ============================================================ */
function GiantAtmosphericCruiseStage({ ambiance, mousePos }) {
  // Smooth parallax translation from cursor movement
  const calcX = (mousePos.x - 0.5) * 55;
  const calcY = (mousePos.y - 0.5) * 18;
  const calcTilt = (mousePos.x - 0.5) * 2.2;

  // Dedicated 3D model render of Daiichi Luxury Cruise with golden sails
  const shipImage = ambiance === 'night' 
    ? 'assets/photos/luxury-3.jpg' 
    : (ambiance === 'day' ? 'assets/photos/luxury-1.jpg' : 'assets/photos/luxury-2.jpg');

  return (
    <div
      className={`lux-giant-ship-backdrop ambiance-${ambiance}`}
      style={{
        transform: `translate3d(calc(-50% + ${calcX}px), ${calcY}px, 0) rotate(${calcTilt}deg)`
      }}
      aria-hidden="true"
    >
      {/* Mystical Ocean Aura & Golden Sunlight Behind Sails */}
      <div className="lux-ship-celestial-aura"></div>

      {/* Floating Ethereal Vessel Wrap with breathing animation */}
      <div className="lux-ship-vessel-wrap">
        <img
          src={shipImage}
          alt="Du thuyền 5★ Daiichi Luxury Cruise ẩn hiện trên Vịnh Lan Hạ"
          className="lux-giant-ship-image"
          loading="eager"
        />

        {/* Sea Mist & Waves drifting at the hull */}
        <div className="lux-ship-ocean-wake-glow"></div>
        <div className="lux-ship-drifting-mist mist-1"></div>
        <div className="lux-ship-drifting-mist mist-2"></div>

        {/* Floating Nautical Coordinate Ribbon */}
        <div className="lux-ship-watermark-tag">
          <span className="lux-ship-beacon"></span>
          <span>DAIICHI LUXURY CRUISE 5★ · VỊNH LAN HẠ</span>
        </div>
      </div>
    </div>
  );
}

function NauticalCompassBadge() {
  return (
    <div className="lux-nautical-compass" title="Tọa độ Vịnh Lan Hạ · Quần đảo Cát Bà">
      <span className="lux-compass-spin">🧭</span>
      <span>VỊNH LAN HẠ · 20°47'N 107°03'E</span>
    </div>
  );
}

/* ============================================================
   FLOATING FAST-TRANSIT BUS PORTAL
   ============================================================ */
function FloatingFastBusPortal({ isOpen, setIsOpen }) {
  return (
    <div className="lux-floating-bus-widget">
      {!isOpen && (
        <div className="lux-bus-badge-label" onClick={() => setIsOpen(true)} style={{ cursor: 'pointer', pointerEvents: 'auto' }}>
          <span>🚌</span>
          <span>{LV('ĐẶT XE BUS', 'BOOK BUS')} <strong>{LV('CHỈ TỪ 90K', 'FROM 90K')}</strong></span>
          <span className="bus-pulse-dot"></span>
        </div>
      )}

      <button
        type="button"
        className="lux-bus-radar-trigger"
        onClick={() => setIsOpen(!isOpen)}
        title={LV('VÉ XE BUS DAIICHI TRAVEL', 'DAIICHI TRAVEL BUS TICKETS')}
        aria-label={LV('ĐẶT XE BUS', 'BOOK BUS')}
      >
        <div className="lux-radar-wave"></div>
        <div className="lux-radar-wave w2"></div>
        <svg className="lux-bus-animated-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="13" rx="3" />
          <path d="M3 11h18" />
          <circle cx="7.5" cy="18.5" r="2" fill="#fff" />
          <circle cx="16.5" cy="18.5" r="2" fill="#fff" />
          <path d="M9.5 18.5h5" />
        </svg>
      </button>

      {isOpen && (
        <div className="lux-bus-popup-card">
          <div className="lux-bus-popup-head">
            <h4>
              <span>⚡</span> <span>{LV('VÉ XE BUS DAIICHI TRAVEL', 'DAIICHI TRAVEL BUS TICKETS')}</span>
            </h4>
            <button type="button" className="lux-bus-close-btn" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 12 }}>
            {LV('Hệ thống xe khách & Limousine cao tốc 5B chất lượng cao của Daiichi:', 'Daiichi high-quality 5B highway Bus & Limousine network:')}
          </div>

          {/* Route 1: Hà Nội - Hải Phòng */}
          <a
            href="https://daiichitravel.com/?tab=book-ticket&from=H%C3%A0%20N%E1%BB%99i&to=H%E1%BA%A3i%20Ph%C3%B2ng&source=daiichicruise"
            target="_blank"
            rel="noopener noreferrer"
            className="lux-bus-route-item"
            style={{ textDecoration: 'none' }}
          >
            <div>
              <div className="lux-bus-route-title notranslate" translate="no">{LV('Hà Nội', 'Ha Noi')} ⇄ {LV('Hải Phòng', 'Hai Phong')}</div>
              <div className="lux-bus-route-desc">{LV('Xe Bus 45 chỗ đời mới · Cao tốc 5B', 'New 45-seat Bus · 5B Highway')}</div>
            </div>
            <div className="lux-bus-route-price promo">
              {LV('Từ 90.000đ', 'From 90,000đ')}
              <span>{LV('Ưu đãi Like Page HP', 'HP Page Promo')}</span>
            </div>
          </a>

          {/* Route 2: Hà Nội - Cát Bà */}
          <a
            href="https://daiichitravel.com/?tab=book-ticket&from=H%C3%A0%20N%E1%BB%99i&to=C%C3%A1t%20B%C3%A0&source=daiichicruise"
            target="_blank"
            rel="noopener noreferrer"
            className="lux-bus-route-item"
            style={{ textDecoration: 'none' }}
          >
            <div>
              <div className="lux-bus-route-title notranslate" translate="no">{LV('Hà Nội', 'Ha Noi')} ⇄ {LV('Cát Bà', 'Cat Ba')}</div>
              <div className="lux-bus-route-desc">{LV('Trọn gói Bus + Tàu cao tốc riêng', 'All-in Bus + Private Speedboat')}</div>
            </div>
            <div className="lux-bus-route-price">
              {LV('Từ 150k - 250k', 'From 150k - 250k')}
              <span>{LV('Đón trả tận khách sạn', 'Hotel pickup & drop-off')}</span>
            </div>
          </a>

          {/* Route 3: Hải Phòng - Cát Bà */}
          <a
            href="https://daiichitravel.com/?tab=book-ticket&from=H%E1%BA%A3i%20Ph%C3%B2ng&to=C%C3%A1t%20B%C3%A0&source=daiichicruise"
            target="_blank"
            rel="noopener noreferrer"
            className="lux-bus-route-item"
            style={{ textDecoration: 'none' }}
          >
            <div>
              <div className="lux-bus-route-title notranslate" translate="no">{LV('Hải Phòng', 'Hai Phong')} ⇄ {LV('Cát Bà', 'Cat Ba')}</div>
              <div className="lux-bus-route-desc">{LV('Xe đón tại VP 713 Phạm Văn Đồng', 'Pickup at 713 Pham Van Dong Office')}</div>
            </div>
            <div className="lux-bus-route-price">
              {LV('Từ 170.000đ', 'From 170,000đ')}
              <span>{LV('Chuyến chạy liên tục', 'Frequent daily departures')}</span>
            </div>
          </a>

          {/* Quick CTA Buttons */}
          <a
            href="https://daiichitravel.com/?tab=book-ticket&from=H%C3%A0%20N%E1%BB%99i&to=C%C3%A1t%20B%C3%A0&source=daiichicruise"
            target="_blank"
            rel="noopener noreferrer"
            className="lux-bus-action-btn"
          >
            <span>🚀</span> <span>{LV('CHUYỂN ĐẾN ĐẶT VÉ BUS (1 CHẠM)', 'GO TO BUS BOOKING (1-CLICK)')}</span>
          </a>

          <a
            href="https://zalo.me/633406871869836720"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              color: '#4EFA8F',
              fontSize: 12,
              fontWeight: 700,
              textDecoration: 'none',
              marginTop: 10,
              textAlign: 'center'
            }}
          >
            <span>💬</span> <span>{LV('Hoặc Chat Zalo Giữ Ghế: 0961 004 709', 'Or Chat Zalo to Reserve: 0961 004 709')}</span>
          </a>
        </div>
      )}
    </div>
  );
}



/* ============================================================
   REALISTIC OCEAN RIPPLING WAVES (MẶT NƯỚC RỢN SÓNG TỰ NHIÊN)
   ============================================================ */
function OceanRipplingWaves() {
  return (
    <div className="lux-ocean-ripples-wrap" aria-hidden="true">
      <svg className="lux-wave-svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="oceanWaveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(8, 28, 48, 0.85)" />
            <stop offset="50%" stopColor="rgba(14, 56, 84, 0.7)" />
            <stop offset="100%" stopColor="rgba(8, 28, 48, 0.85)" />
          </linearGradient>
          <linearGradient id="oceanWaveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(212, 166, 72, 0.28)" />
            <stop offset="50%" stopColor="rgba(78, 250, 143, 0.22)" />
            <stop offset="100%" stopColor="rgba(212, 166, 72, 0.28)" />
          </linearGradient>
        </defs>
        <path
          className="lux-wave-path wave-slow"
          d="M0,45 C320,85 460,10 720,50 C980,90 1140,15 1440,55 L1440,120 L0,120 Z"
          fill="url(#oceanWaveGrad1)"
        />
        <path
          className="lux-wave-path wave-fast"
          d="M0,60 C240,25 480,75 720,35 C960,75 1200,30 1440,65 L1440,120 L0,120 Z"
          fill="url(#oceanWaveGrad2)"
        />
        <path
          className="lux-wave-crest"
          d="M0,62 Q360,35 720,48 T1440,62"
          fill="none"
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

function OneHome() {
  const [, force] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [ambiance, setAmbiance] = useState('sunset');
  const [busPortalOpen, setBusPortalOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseMove = (e) => {
    const normX = e.clientX / (window.innerWidth || 1);
    const normY = e.clientY / (window.innerHeight || 1);
    setMousePos({ x: normX, y: normY });
  };

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
        <div className="on-header-in">
          <DaiichiUltraLogo />
          
          <nav className="on-nav" aria-label="Main Navigation">
            <a href="#fleet">{T('nav_luxury')}</a>
            <a href="#boutique-cruise">{T('nav_boutique')}</a>
            <a href="#suites">{T('nav_suites')}</a>
            <a href="#itinerary">{T('nav_itinerary')}</a>
            <a href="#limousine">{T('nav_limo')}</a>
            <a href="#blog">{LV('Cẩm Nang', 'Travel Blog')}</a>
            <a href="https://daiichitravel.com/?tab=my-tickets" target="_blank" rel="noopener">{I18N.t('nav_mybooking')}</a>
          </nav>

          <div className="on-header-actions">
            <a className="on-quick-bus-btn" href="https://daiichitravel.com/?tab=bus" target="_blank" rel="noopener noreferrer" title="Chuyển nhanh sang đặt xe bus Daiichi Travel Tuyến Hà Nội ⇄ Hải Phòng ⇄ Cát Bà">
              <span>🚌</span> <b>Bus 90K</b> <span className="bus-pulse-dot"></span>
            </a>
            <a className="on-phone-btn" href="tel:19009070" title="Hotline 24/7: 1900 9070">
              <span className="on-phone-icon">📞</span>
              <b className="on-phone-text">1900 9070</b>
            </a>
            <OneLang />
            <a className="on-cta" href="https://daiichitravel.com/?tab=cruise-tours" target="_blank" rel="noopener">
              {T('cta_book')}
            </a>
            <button className="on-burger" aria-label="Menu" onClick={() => setMenuOpen(!menuOpen)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                {menuOpen ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>

        </div>
      </header>

      {menuOpen && (
        <div className="on-mobile-drawer-wrap" onClick={() => setMenuOpen(false)}>
          <div className="on-mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="on-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src="assets/brand/emblem-Daiichi.png" alt="Emblem" style={{ width: 30, height: 30, objectFit: 'contain' }} />
                <div>
                  <div className="on-drawer-brand">DAIICHI CRUISE</div>
                  <div className="on-drawer-stars">★★★★★ 5★ LUXURY FLEET</div>
                </div>
              </div>
              <button className="on-drawer-close-btn" onClick={() => setMenuOpen(false)} aria-label="Đóng menu">✕</button>
            </div>
            <div className="on-drawer-nav">
              <a href="#fleet" onClick={() => setMenuOpen(false)}><span>⚓</span> {T('nav_luxury')}</a>
              <a href="#boutique-cruise" onClick={() => setMenuOpen(false)}><span>🚢</span> {T('nav_boutique')}</a>
              <a href="#suites" onClick={() => setMenuOpen(false)}><span>💎</span> {T('nav_suites')}</a>
              <a href="#highlights" onClick={() => setMenuOpen(false)}><span>✨</span> {T('nav_highlights')}</a>
              <a href="#itinerary" onClick={() => setMenuOpen(false)}><span>⏱</span> {T('nav_itinerary')}</a>
              <a href="#day-cruises" onClick={() => setMenuOpen(false)}><span>⛵</span> {T('nav_day')}</a>
              <a href="#limousine" onClick={() => setMenuOpen(false)}><span>🚐</span> {T('nav_limo')}</a>
              <a href="#blog" onClick={() => setMenuOpen(false)}><span>📰</span> {LV('Cẩm Nang', 'Travel Blog')}</a>
              <a href="https://daiichitravel.com/?tab=my-tickets" target="_blank" rel="noopener"><span>🎫</span> {I18N.t('nav_mybooking')}</a>
            </div>
            <div className="on-drawer-actions">
              <a className="on-drawer-cta-btn" href="https://daiichitravel.com/?tab=cruise-tours" target="_blank" rel="noopener">
                {T('cta_book')} →
              </a>
              <a className="on-drawer-bus-btn" href="https://daiichitravel.com/?tab=bus" target="_blank" rel="noopener">
                🚌 {LV('Xe Bus Hải Phòng ⇄ Cát Bà (90.000đ)', 'Bus Hai Phong ⇄ Cat Ba (90K)')}
              </a>
              <div className="on-drawer-hotline">
                <span>{LV('Hotline hỗ trợ 24/7:', '24/7 Support Hotline:')}</span>
                <a href="tel:19009070">📞 1900 9070</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LUXURY HERO BANNER (WITH FLYCAM VIDEO BACKGROUND) */}
      <div className="lux-hero" onMouseMove={handleMouseMove} data-screen-label="Hero Du Thuyền Luxury">
        {/* Dynamic Flycam Aerial Video Background */}
        <div className="lux-hero-video-wrap">
          <video
            className="lux-hero-video"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="assets/photos/luxury-1.jpg"
          >
            <source src="assets/videos/halong-flycam.mp4" type="video/mp4" />
            <source src="assets/videos/halong-flycam.webm" type="video/webm" />
          </video>
        </div>
        <div className="lux-hero-overlay"></div>

        {/* GIANT MAJESTIC BACKGROUND CRUISE SHIP ẨN HIỆN */}
        <OceanRipplingWaves />
        <div className="lux-hero-content">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', width: '100%' }}>
            <div className="lux-badge-gold" style={{ margin: '0 auto' }}>
              ★ {T('hero_k')} ★
            </div>
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

      {/* SECTION 7: TRAVEL GUIDE & HERITAGE JOURNAL */}
      <SeoBlogSection />

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
              <h4 className="notranslate" translate="no">DAIICHI CRUISE — DAIICHI TRAVEL</h4>
              <ul>
                <li>{I18N.t('footer_co')}</li>
                <li><b>Hotline 24/7:</b> <a href="tel:19009070" style={{ color: 'var(--gold-bright)' }} className="notranslate" translate="no">1900 9070</a></li>
                <li><b>{LV('Zalo hỗ trợ:', 'Zalo Support:')}</b> <a href="https://zalo.me/633406871869836720" target="_blank" rel="noopener" style={{ color: '#60A5FA' }} className="notranslate" translate="no">0961 004 709</a></li>
                <li><b className="notranslate" translate="no">WhatsApp:</b> <a href="https://wa.me/84961004709" target="_blank" rel="noopener" style={{ color: '#25D366', fontWeight: 700 }} className="notranslate" translate="no">+84 961 004 709</a></li>
                <li><b>Email:</b> <a href="mailto:sale@daiichitravel.com" className="notranslate" translate="no">sale@daiichitravel.com</a></li>
                <li><b>{LV('Văn phòng:', 'Office:')}</b> <span className="notranslate" translate="no">217 đường 1/4, Cát Bà, Hải Phòng</span></li>
                <li><b>{LV('Đặt vé chính thức:', 'Official Booking:')}</b> <a href="https://daiichitravel.com" target="_blank" rel="noopener" style={{ color: 'var(--gold-bright)' }} className="notranslate" translate="no">daiichitravel.com</a></li>
              </ul>
            </div>
            <div>
              <h4>{LV('HẠM ĐỘI DU THUYỀN', 'CRUISE FLEET')}</h4>
              <ul>
                <li><a href="#fleet" className="notranslate" translate="no">Daiichi Luxury Cruise 5★</a></li>
                <li><a href="#boutique-cruise" className="notranslate" translate="no">Daiichi Boutique Cruise 4★</a></li>
                <li><a href="#suites">{LV('30 Hạng phòng Suite', '30 Balcony Suites')}</a></li>
                <li><a href="#day-cruises">{LV('Du thuyền ngày Lan Hạ', 'Lan Ha Day Cruises')}</a></li>
                <li><a href="#itinerary">{LV('Hải trình 2N1Đ & 3N2Đ', '2D1N & 3D2N Itineraries')}</a></li>
              </ul>
            </div>
            <div>
              <h4>{LV('ĐIỂM ĐẾN & CẨM NANG', 'DESTINATIONS & GUIDES')}</h4>
              <ul>
                <li><a href="seo/vi/du-thuyen-ngu-dem-lan-ha.html">{LV('Du thuyền ngủ đêm Lan Hạ', 'Lan Ha Overnight Cruises')}</a></li>
                <li><a href="/vi/du-thuyen-ngay-vinh-lan-ha">{LV('Du thuyền ngày Lan Hạ', 'Lan Ha Day Cruises')}</a></li>
                <li><a href="/vi/xe-ha-noi-di-cat-ba">{LV('Xe Hà Nội đi Cát Bà', 'Bus Ha Noi to Cat Ba')}</a></li>
                <li><a href="/vi/xe-cat-ba-ve-ha-noi">{LV('Xe Cát Bà về Hà Nội', 'Bus Cat Ba to Ha Noi')}</a></li>
              </ul>
            </div>
            <div>
              <h4>{LV('DỊCH VỤ LIÊN KẾT', 'CONCIERGE SERVICES')}</h4>
              <ul>
                <li><a href="#limousine">{LV('Xe Limousine đưa đón', 'Limousine Transfers')}</a></li>
                <li><a href="https://daiichitravel.com/?tab=tours">{LV('Tour chèo SUP & Lặn biển', 'SUP & Snorkeling Tours')}</a></li>
                <li><a href="mailto:partner@daiichitravel.vn">{LV('Hợp tác đại lý & đối tác', 'B2B & Partner Inquiries')}</a></li>
              </ul>
            </div>
            <div>
              <h4>{LV('CỔNG LÀM VIỆC', 'PORTALS')}</h4>
              <ul>
                <li><a href="https://daiichitravel.com/?tab=my-tickets" target="_blank" rel="noopener">{I18N.t('nav_mybooking')}</a></li>
                <li><a href="https://daiichitravel.com" target="_blank" rel="noopener" className="notranslate" translate="no">Daiichi Travel Portal</a></li>
                <li><a href="admin/cruise-manager.html" target="_blank" rel="noopener" style={{ color: 'var(--gold-bright)', fontWeight: 700 }}>{LV('🔒 Quản trị viên (Admin)', '🔒 Admin Login')}</a></li>
              </ul>
            </div>
          </div>
          <div className="on-footer-note">
            <span>© 2026 <span className="notranslate" translate="no">Daiichi Cruise</span> · {LV('Nền tảng du thuyền thành viên thuộc Daiichi Travel', 'Official Cruise Platform of Daiichi Travel')} · Hotline: <span className="notranslate" translate="no">1900 9070</span> · Zalo / WhatsApp: <span className="notranslate" translate="no">+84 961 004 709</span> · <span className="notranslate" translate="no">Cát Bà, Hải Phòng</span></span>
            <span>{LV('Hệ thống đặt vé & phòng trực tuyến vận hành bởi', 'Online booking system powered by')} <a href="https://daiichitravel.com" target="_blank" rel="noopener" style={{ color: 'var(--gold-bright)' }} className="notranslate" translate="no">DaiichiTravel.com</a></span>
          </div>
        </div>
      </footer>

      {/* POPUP MODAL CHI TIẾT PHÒNG */}
      <RoomDetailModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />

      {/* FLOATING FAST-TRANSIT BUS PORTAL */}
      <FloatingFastBusPortal isOpen={busPortalOpen} setIsOpen={setBusPortalOpen} />

      {/* LIVE CHAT BOT WIDGET */}
      {typeof ChatWidget !== 'undefined' ? <ChatWidget /> : (window.ChatWidget && <window.ChatWidget />)}
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<OneHome />);
