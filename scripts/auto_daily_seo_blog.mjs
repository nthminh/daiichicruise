/**
 * DAIICHI CRUISE & TRAVEL — AUTOMATIC DAILY SEO BLOG & IMAGE PUBLISHER
 * ---------------------------------------------------------------------
 * Chức năng:
 * 1. Mỗi ngày tự động chọn/tải 1 hình ảnh đẹp về Vịnh Lan Hạ, Vịnh Hạ Long, Cát Bà hoặc Ninh Bình.
 * 2. Tự động viết bài chuẩn SEO Google (kèm Schema.org Article + FAQPage + Google Ads Tag AW-18502887757).
 * 3. Xuất file HTML tĩnh tại seo/blog/<slug>.html để Google Bot index 100%.
 * 4. Cập nhật kho dữ liệu shared/blog_posts.js (hiển thị ngay trên trang chủ daiichicruise.vn).
 * 5. Tự động bổ sung URL bài viết mới vào sitemap.xml.
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');

const BLOG_DIR = path.join(ROOT, 'seo', 'blog');
const BLOG_IMG_DIR = path.join(ROOT, 'assets', 'blog');
const BLOG_JS_FILE = path.join(ROOT, 'shared', 'blog_posts.js');
const SITEMAP_FILE = path.join(ROOT, 'sitemap.xml');

if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });
if (!fs.existsSync(BLOG_IMG_DIR)) fs.mkdirSync(BLOG_IMG_DIR, { recursive: true });

// Kho chủ đề & hình ảnh thực tế về Vịnh Lan Hạ, Vịnh Hạ Long, Cát Bà và Ninh Bình
// Được thiết kế chuẩn SEO Google Search & tối ưu Điểm Chất Lượng (Quality Score) cho Google Ads
const TOPIC_BANK = [
  {
    slug: 'kinh-nghiem-du-thuyen-vinh-lan-ha-cat-ba-tu-a-z',
    region: 'Lan Ha',
    regionLabel: 'Vịnh Lan Hạ · Cát Bà',
    image: 'assets/photos/luxury-1.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85',
    title: {
      vi: 'Kinh Nghiệm Đi Du Thuyền Vịnh Lan Hạ & Cát Bà Tự Túc Từ A–Z (Cập Nhật 2026)',
      en: 'Ultimate Lan Ha Bay & Cat Ba Cruise Guide from A–Z (2026 Edition)',
      ja: 'Lan Ha 湾＆Cat Ba クルーズ完全ガイド A–Z（2026年最新版）',
      ko: 'Lan Ha 만 & Cat Ba 크루즈 여행 완벽 가이드 A–Z (2026 최신판)',
      zh: 'Lan Ha 湾与 Cat Ba 游轮自由行全攻略 A–Z（2026最新版）',
      fr: 'Guide Complet Croisière Baie de Lan Ha & Cat Ba de A à Z (Édition 2026)'
    },
    excerpt: {
      vi: 'Khám phá vẻ đẹp hoang sơ của hơn 400 hòn đảo đá vôi tại Vịnh Lan Hạ, lịch trình chèo kayak Hang Sáng Tối, tắm biển Ba Trái Đào và đạp xe xuyên Làng cổ Việt Hải.',
      en: 'Discover over 400 emerald limestone karsts in Lan Ha Bay, kayaking through Hang Sang Toi, swimming at Ba Trai Dao beach, and cycling in Viet Hai Village.',
      ja: '400以上の石灰岩島が広がる Lan Ha 湾の絶景、Hang Sang Toi カヤック、Ba Trai Dao ビーチ、Viet Hai 古村サイクリングを徹底解説。',
      ko: '400개 이상의 에메랄드빛 카르스트 섬이 펼쳐진 Lan Ha 만, Hang Sang Toi 카약, Ba Trai Dao 해변 수영, Viet Hai 고대 마을 자전거 투어 안내.',
      zh: '探索 Lan Ha 湾 400 多座翠绿喀斯特岛屿、Hang Sang Toi 皮划艇、Ba Trai Dao 海滩畅游与 Viet Hai 古村骑行之旅。',
      fr: 'Découvrez plus de 400 îlots karstiques dans la baie de Lan Ha, le kayak à Hang Sang Toi, la baignade à Ba Trai Dao et le vélo au village de Viet Hai.'
    },
    keywords: ['du thuyền vịnh Lan Hạ', 'kinh nghiệm đi vịnh Lan Hạ', 'du lịch Cát Bà', 'Daiichi Luxury Cruise', 'Hang Sáng Tối', 'Làng cổ Việt Hải'],
    readingTime: '6 phút đọc',
    sections: [
      {
        h2: '1. Vì sao Vịnh Lan Hạ được mệnh danh là "Thiên đường bị lãng quên"?',
        p: 'Nằm ở phía Đông đảo Cát Bà và liền kề phía Nam Vịnh Hạ Long, Vịnh Lan Hạ sở hữu diện tích hơn 7.000 ha với hơn 400 hòn đảo lớn nhỏ phủ đầy thảm thực vật xanh mướt. Khác với sự nhộn nhịp của tuyến truyền thống, Vịnh Lan Hạ giữ trọn nét tĩnh lặng, làn nước ngọc bích trong vắt và hơn 139 bãi cát trắng mịn hoang sơ nằm xen giữa các dãy núi đá vôi.'
      },
      {
        h2: '2. Nên chọn Du thuyền ngủ đêm 5★ hay Du thuyền trong ngày?',
        p: 'Nếu bạn muốn tận hưởng trọn vẹn khoảnh khắc hoàng hôn buông xuống mặt vịnh, ngâm mình trong bể sục Jacuzzi bốn mùa, dạo bước trên Cầu Kính Skywalk và thức giấc giữa biển khơi từ ban công riêng, hải trình 2 Ngày 1 Đêm (2N1Đ) hoặc 3 Ngày 2 Đêm (3N2Đ) trên Daiichi Luxury Cruise 5★ và Daiichi Boutique Cruise 4★ là lựa chọn hoàn hảo. Nếu quỹ thời gian hạn hẹp, tour Du thuyền ngày VIP 4 hoặc Sunset Cruise chiều là giải pháp tối ưu.'
      },
      {
        h2: '3. Các điểm check-in không thể bỏ lỡ trên Vịnh Lan Hạ',
        p: 'Hành trình chuẩn mực sẽ đưa du khách đi qua Làng chài cổ Cái Bèo (làng chài nổi cổ nhất Việt Nam với hơn 7.000 năm lịch sử), Hòn Rùa, chèo thuyền kayak xuyên qua vòm đá kỳ ảo tại Hang Sáng Tối, tắm biển tại bãi Ba Trái Đào và đi xe điện/đạp xe xuyên rừng nguyên sinh vào Làng cổ Việt Hải.'
      },
      {
        h2: '4. Cách di chuyển thuận tiện nhất từ Hà Nội đến bến du thuyền',
        p: 'Hệ sinh thái Daiichi Travel cung cấp tuyến xe Limousine và xe Bus cao tốc 5B đón tận nơi tại Phố Cổ Hà Nội (24 Hàng Bè) kết hợp tàu cao tốc sang thẳng Cát Bà và bến tàu du thuyền chỉ trong 3 giờ đồng hồ, giúp kỳ nghỉ của bạn liền mạch và an tâm tuyệt đối.'
      }
    ],
    faqs: [
      {
        q: 'Thời điểm nào đẹp nhất để đi du thuyền Vịnh Lan Hạ?',
        a: 'Vịnh Lan Hạ đẹp quanh năm: từ tháng 4 đến tháng 10 trời nắng vàng rực rỡ thích hợp tắm biển và chèo kayak; từ tháng 10 đến tháng 3 năm sau tiết trời thu đông mát mẻ, se lạnh rất lý tưởng để nghỉ dưỡng ngủ đêm và ngâm bể sục Jacuzzi nước ấm.'
      },
      {
        q: 'Giá phòng du thuyền ngủ đêm đã bao gồm những gì?',
        a: 'Giá trọn gói trên Daiichi Cruise đã bao gồm phòng Suite có ban công riêng, các bữa ăn hải sản cao cấp theo hải trình, vé thắng cảnh Vịnh Lan Hạ & Làng Việt Hải, thuyền kayak, bể sục Jacuzzi, cầu kính Skywalk, tiệc trà hoàng hôn và bảo hiểm du lịch.'
      }
    ]
  },
  {
    slug: 'so-sanh-vinh-ha-long-va-vinh-lan-ha-nen-di-dau',
    region: 'Ha Long',
    regionLabel: 'Vịnh Hạ Long · Vịnh Lan Hạ',
    image: 'assets/photos/luxury-2.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=85',
    title: {
      vi: 'So Sánh Vịnh Hạ Long Và Vịnh Lan Hạ: Nên Chọn Hải Trình Nào Cho Kỳ Nghỉ 5 Sao?',
      en: 'Ha Long Bay vs. Lan Ha Bay: Which Luxury Cruise Route Should You Choose?',
      ja: 'Ha Long 湾と Lan Ha 湾の徹底比較：5つ星クルーズにはどちらがおすすめ？',
      ko: 'Ha Long 만 vs Lan Ha 만 비교: 5성급 크루즈 여행에 어디가 더 좋을까?',
      zh: 'Ha Long 湾与 Lan Ha 湾深度对比：五星级游轮度假该选哪条航线？',
      fr: 'Baie de Ha Long vs Baie de Lan Ha : Quel itinéraire choisir pour une croisière 5★ ?'
    },
    excerpt: {
      vi: 'Cùng nằm trong quần thể Di sản Thiên nhiên Thế giới UNESCO, Vịnh Hạ Long và Vịnh Lan Hạ mang hai sắc thái riêng biệt. Xem ngay phân tích chi tiết để chọn đúng hải trình.',
      en: 'Both part of the UNESCO World Natural Heritage archipelago, Ha Long Bay and Lan Ha Bay offer distinct experiences. Compare scenery, activities, and cruise routes.',
      ja: 'ユネスコ世界自然遺産に属する Ha Long 湾と Lan Ha 湾の魅力・アクティビティ・静けさを比較します。',
      ko: '유네스코 세계자연유산에 속한 Ha Long 만과 Lan Ha 만의 풍경, 액티비티, 프라이빗함을 상세히 비교해 드립니다.',
      zh: '同属联合国教科文组织世界自然遗产群，Ha Long 湾与 Lan Ha 湾各具特色。一文对比景观、体验与航线。',
      fr: 'Toutes deux classées au patrimoine mondial de l\'UNESCO, la baie de Ha Long et la baie de Lan Ha offrent des ambiances complémentaires.'
    },
    keywords: ['vịnh Hạ Long', 'so sánh vịnh Hạ Long và vịnh Lan Hạ', 'du thuyền 5 sao Hạ Long Lan Hạ', 'di sản UNESCO', 'Tuần Châu Cát Bà'],
    readingTime: '5 phút đọc',
    sections: [
      {
        h2: '1. Quần thể Di sản Thiên nhiên Thế giới liên tỉnh Vịnh Hạ Long – Quần đảo Cát Bà',
        p: 'UNESCO đã chính thức công nhận quần thể Vịnh Hạ Long – Quần đảo Cát Bà (bao gồm Vịnh Lan Hạ) là Di sản Thiên nhiên Thế giới liên tỉnh đầu tiên tại Việt Nam. Cả hai vịnh đều sở hữu địa貌 karst đá vôi hàng백 triệu năm tuổi nhưng mang đến trải nghiệm du ngoạn khác nhau.'
      },
      {
        h2: '2. Vịnh Hạ Long: Kỳ vĩ, biểu tượng và các hang động khô đồ sộ',
        p: 'Vịnh Hạ Long nổi tiếng với các biểu tượng lâu đời như Hòn Trống Mái, Đảo Ti Tốp, Hang Sửng Sốt và Động Thiên Cung. Khu vực này phù hợp với du khách lần đầu muốn chiêm ngưỡng các hang động thạch nhũ khô quy mô lớn xuất phát từ cảng Tuần Châu hoặc Bãi Cháy.'
      },
      {
        h2: '3. Vịnh Lan Hạ: Riêng tư, nhiều bãi tắm tự nhiên và trải nghiệm sâu',
        p: 'Trong khi đó, Vịnh Lan Hạ quyến rũ du khách yêu thích sự yên bình và nghỉ dưỡng thượng lưu. Mật độ tàu thuyền thấp hơn hẳn giúp bạn thoải mái chèo kayak qua các hang nước ngầm như Hang Sáng Tối, tắm biển trực tiếp giữa vịnh tại Ba Trái Đào và kết hợp khám phá Vườn Quốc gia Cát Bà – Làng cổ Việt Hải.'
      },
      {
        h2: '4. Gợi ý kết nối liên tuyến Hạ Long – Lan Hạ – Cát Bà',
        p: 'Hiện nay du khách có thể dễ dàng kết hợp tham quan cả hai vịnh nhờ tuyến xe Limousine Hạ Long (Tuần Châu / Bãi Cháy) ⇄ Cát Bà chỉ 1 giờ 30 phút của Daiichi Travel, tận hưởng trọn vẹn kỳ quan thiên nhiên miền Bắc.'
      }
    ],
    faqs: [
      {
        q: 'Từ Hạ Long có sang thẳng Vịnh Lan Hạ và Cát Bà được không?',
        a: 'Có. Daiichi Travel vận hành tuyến kết nối Hạ Long (Tuần Châu / Bãi Cháy) đi Cát Bà hàng ngày chỉ mất khoảng 1h30, rất thuận tiện cho du khách nối chuyến.'
      },
      {
        q: 'Gia đình có người lớn tuổi và trẻ nhỏ nên đi vịnh nào?',
        a: 'Vịnh Lan Hạ có mặt nước rất êm, kín gió nhờ hàng trăm đảo đá che chắn xung quanh, đặc biệt phù hợp cho gia đình có trẻ nhỏ và người cao tuổi nghỉ dưỡng trên du thuyền.'
      }
    ]
  },
  {
    slug: 'kham-pha-ninh-binh-trang-an-tam-coc-hang-mua-1-ngay',
    region: 'Ninh Binh',
    regionLabel: 'Ninh Bình · Tràng An · Tam Cốc',
    image: 'assets/photos/daycruise-act-1.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=85',
    title: {
      vi: 'Cẩm Nang Du Lịch Ninh Bình: Tràng An, Tam Cốc, Hang Múa & Chùa Bái Đính Đẹp Nhất Mùa Nào?',
      en: 'Ninh Binh Travel Guide: Trang An, Tam Coc, Hang Mua & Bai Dinh Pagoda',
      ja: 'Ninh Binh 観光ガイド：Trang An・Tam Coc・Hang Mua・Bai Dinh 寺のベストシーズン',
      ko: 'Ninh Binh 여행 가이드: Trang An, Tam Coc, Hang Mua & Bai Dinh 사원 베스트 시즌',
      zh: 'Ninh Binh 旅游指南：Trang An、Tam Coc、Hang Mua 与 Bai Dinh 寺最佳游览季',
      fr: 'Guide Voyage Ninh Binh : Trang An, Tam Coc, Hang Mua & Pagode Bai Dinh'
    },
    excerpt: {
      vi: 'Được ví như "Vịnh Hạ Long trên cạn", Ninh Bình mê hoặc du khách với dòng Ngô Đồng mùa lúa chín vàng, quần thể danh thắng Tràng An và đỉnh Ngọa Long trên Hang Múa.',
      en: 'Known as "Ha Long Bay on land", Ninh Binh enchants travelers with golden rice fields in Tam Coc, UNESCO-listed Trang An grottoes, and the dragon peak of Hang Mua.',
      ja: '「陸の Ha Long 湾」と称される Ninh Binh。黄金色の稲穂が揺れる Tam Coc、世界遺産 Trang An の洞窟舟めぐり、Hang Mua の絶景スポットを紹介。',
      ko: '육지의 Ha Long 만이라 불리는 Ninh Binh! 황금빛 논이 펼쳐진 Tam Coc, 유네스코 유산 Trang An 보트 투어, Hang Mua 전망대 코스를 소개합니다.',
      zh: '被誉为“陆上 Ha Long 湾”的 Ninh Binh，拥有 Tam Coc 金色稻浪、世界遗产 Trang An 游船秘境与 Hang Mua 卧龙山巅美景。',
      fr: 'Surnommée la « Baie de Ha Long terrestre », Ninh Binh séduit par les rizières dorées de Tam Coc, les grottes de Trang An et le belvédère de Hang Mua.'
    },
    keywords: ['du lịch Ninh Bình', 'Tràng An', 'Tam Cốc Bích Động', 'Hang Múa', 'Chùa Bái Đính', 'Cố đô Hoa Lư', 'xe Ninh Bình đi Cát Bà'],
    readingTime: '6 phút đọc',
    sections: [
      {
        h2: '1. Ninh Bình — Di sản kép Thế giới "Vịnh Hạ Long trên cạn"',
        p: 'Chỉ cách Hà Nội khoảng 90km về phía Nam, Quần thể danh thắng Tràng An tại Ninh Bình là Di sản Thế giới hỗn hợp (cả văn hóa và thiên nhiên) đầu tiên của Đông Nam Á. Những dãy núi đá vôi dựng đứng soi bóng xuống dòng sông xanh biếc uốn lượn qua hệ thống hang động xuyên thủy tạo nên bức tranh sơn thủy hữu tình độc nhất vô nhị.'
      },
      {
        h2: '2. Lịch trình 3 tuyến điểm nổi bật nhất tại Ninh Bình',
        p: 'Tuyến 1: Cố đô Hoa Lư – Tam Cốc – Hang Múa (chinh phục gần 500 bậc đá lên đỉnh Ngọa Long ngắm trọn cánh đồng lúa Tam Cốc). Tuyến 2: Chùa Bái Đính – Danh thắng Tràng An – Hang Múa (kết hợp chiêm bái ngôi chùa sở hữu nhiều kỷ lục châu Á và ngồi thuyền nan xuyên 9 hang nước). Tuyến 3: Tam Cốc – Bích Động – Đền Thái Vi – Thung Nắng dành cho du khách yêu vẻ đẹp tĩnh lặng.'
      },
      {
        h2: '3. Kết nối hành trình vàng: Ninh Bình (Vịnh trên cạn) ⇄ Vịnh Lan Hạ (Vịnh trên biển)',
        p: 'Rất nhiều du khách quốc tế và gia đình Việt lựa chọn hành trình liên tuyến Ninh Bình – Cát Bà – Vịnh Lan Hạ. Sau khi khám phá Tràng An và Hang Múa, bạn có thể lên xe Limousine Daiichi đón trực tiếp tại khách sạn khu vực Tam Cốc / Tràng An đi thẳng ra đảo Cát Bà chỉ trong 3 giờ 30 phút để lên du thuyền ngủ đêm 5★.'
      }
    ],
    faqs: [
      {
        q: 'Mùa lúa chín Tam Cốc Ninh Bình vào tháng mấy?',
        a: 'Mùa lúa chín vàng đẹp nhất tại Tam Cốc thường rơi vào cuối tháng 5 đến đầu tháng 6 dương lịch. Ngoài ra, mùa sen nở dưới chân Hang Múa kéo dài từ tháng 5 đến tháng 7.'
      },
      {
        q: 'Có xe đi thẳng từ Ninh Bình ra đảo Cát Bà và Vịnh Lan Hạ không?',
        a: 'Có. Daiichi Travel cung cấp tuyến Limousine đón tận khách sạn tại Ninh Bình (Tràng An / Tam Cốc) đi thẳng ra bến tàu Cát Bà và Vịnh Lan Hạ với giá chỉ từ 250.000đ/khách.'
      }
    ]
  },
  {
    slug: 'lang-co-viet-hai-vien-ngoc-xanh-giua-vuon-quoc-gia-cat-ba',
    region: 'Lan Ha',
    regionLabel: 'Làng Cổ Việt Hải · Vịnh Lan Hạ',
    image: 'assets/photos/daycruise-act-2.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?auto=format&fit=crop&w=1200&q=85',
    title: {
      vi: 'Làng Cổ Việt Hải: Trải Nghiệm Đạp Xe Xuyên Thung Lũng Rừng Nguyên Sinh Cát Bà',
      en: 'Ancient Viet Hai Village: Cycling Through Cat Ba National Park Valley',
      ja: 'Viet Hai 古村：Cat Ba 国立公園の原生林バレーを巡るサイクリング体験',
      ko: 'Viet Hai 고대 마을: Cat Ba 국립공원 원시림 계곡 자전거 투어',
      zh: 'Viet Hai 古村：穿越 Cat Ba 国家公园原始森林山谷的骑行之旅',
      fr: 'Village Ancien de Viet Hai : Balade à Vélo dans la Vallée du Parc National de Cat Ba'
    },
    excerpt: {
      vi: 'Nằm biệt lập giữa lòng Vườn Quốc gia Cát Bà và được bao bọc bởi Vịnh Lan Hạ, Làng cổ Việt Hải mang vẻ đẹp bình yên như cổ tích với cung đường đạp xe xuyên núi tuyệt đẹp.',
      en: 'Nestled deep inside Cat Ba National Park and surrounded by Lan Ha Bay, ancient Viet Hai Village offers a serene cycling path through tunnels and lush valleys.',
      ja: 'Cat Ba 国立公園の奥深くに位置し、Lan Ha 湾に囲まれた Viet Hai 古村。緑豊かな渓谷でのサイクリングと足湯魚マッサージが人気です。',
      ko: 'Cat Ba 국립공원 깊은 곳에 자리 잡은 Viet Hai 고대 마을. 푸른 계곡을 달리는 자전거 길과 천연 닥터피쉬 족욕 체험을 만나보세요.',
      zh: '隐匿于 Cat Ba 国家公园腹地、四周环绕 Lan Ha 湾的 Viet Hai 古村，带您体验穿山隧道骑行与森林溪流鱼疗。',
      fr: 'Niché au cœur du parc national de Cat Ba et entouré par la baie de Lan Ha, le village de Viet Hai offre une parenthèse hors du temps.'
    },
    keywords: ['Làng cổ Việt Hải', 'Vườn quốc gia Cát Bà', 'đạp xe Việt Hải', 'tour vịnh Lan Hạ 1 ngày', 'Daiichi Cruise'],
    readingTime: '5 phút đọc',
    sections: [
      {
        h2: '1. Ngôi làng cổ hơn 100 năm tuổi giữa lòng đảo ngọc Cát Bà',
        p: 'Làng cổ Việt Hải nằm gọn trong một thung lũng xanh mướt thuộc Vườn Quốc gia Cát Bà, bốn bề là núi đá vôi cao vút và rừng nguyên sinh. Trước đây, cách duy nhất để vào làng là đi bộ băng rừng hoặc đi thuyền qua Vịnh Lan Hạ đến bến Việt Hải.'
      },
      {
        h2: '2. Đạp xe xuyên đường hầm núi đá và trải nghiệm massage cá suối tự nhiên',
        p: 'Từ bến tàu Việt Hải, du khách trên hải trình Daiichi Luxury Cruise hoặc Tour 1 Ngày VIP 1 / VIP 4 sẽ được lựa chọn tự tay đạp xe hoặc ngồi xe điện chạy dọc con đường bê tông phẳng lì uốn lượn bên bờ vịnh, xuyên qua hang tối mát lạnh để tiến vào thung lũng. Tại đây, bạn có thể ngâm chân bên dòng suối mát để đàn cá nhỏ massage tự nhiên và tìm hiểu nếp sống hiền hòa của người dân bản địa.'
      }
    ],
    faqs: [
      {
        q: 'Đi Làng cổ Việt Hải bằng cách nào thuận tiện nhất?',
        a: 'Thuận tiện nhất là đăng ký hải trình ngủ đêm 2N1Đ/3N2Đ hoặc Tour 1 Ngày Vịnh Lan Hạ (VIP 1, VIP 4) của Daiichi Cruise — tàu sẽ cập trực tiếp bến Việt Hải và đã bao gồm vé xe đạp/xe điện.'
      }
    ]
  },
  {
    slug: 'cau-kinh-skywalk-va-be-suc-jacuzzi-tren-du-thuyen-5-sao-lan-ha',
    region: 'Lan Ha',
    regionLabel: 'Du Thuyền 5★ · Vịnh Lan Hạ',
    image: 'assets/photos/luxury-jacuzzi.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
    title: {
      vi: 'Trải Nghiệm Cầu Kính Skywalk & Bể Sục Jacuzzi Bốn Mùa Trên Du Thuyền 5 Sao Vịnh Lan Hạ',
      en: 'Ocean Glass Skywalk & Four-Season Jacuzzi Aboard Our 5-Star Lan Ha Bay Cruise',
      ja: 'Lan Ha 湾 5つ星クルーズの海上ガラス Skywalk ＆四季温水 Jacuzzi 体験',
      ko: 'Lan Ha 만 5성급 크루즈의 오션 글래스 Skywalk & 사계절 온수 Jacuzzi 체험',
      zh: 'Lan Ha 湾五星级游轮体验：海上玻璃栈道 Skywalk 与四季恒温 Jacuzzi',
      fr: 'Passerelle de Verre Skywalk & Jacuzzi Quatre Saisons à Bord de Notre Croisière 5★'
    },
    excerpt: {
      vi: 'Chiêm ngưỡng toàn cảnh 360 độ kỳ quan Vịnh Lan Hạ từ cây Cầu Kính Skywalk vươn ra mặt biển và thư giãn trong làn nước ấm áp của bể sục Jacuzzi bốn mùa trên Daiichi Luxury Cruise.',
      en: 'Take in 360-degree views of Lan Ha Bay from our over-the-sea Glass Skywalk and unwind in the heated sundeck Jacuzzi aboard Daiichi Luxury Cruise 5★.',
      ja: 'Daiichi Luxury Cruise 5★ ならではの海上ガラス Skywalk とサンデッキ温水 Jacuzzi で、Lan Ha 湾の夕日を360度満喫。',
      ko: 'Daiichi Luxury Cruise 5★만의 해상 유리 전망대 Skywalk와 선데크 온수 Jacuzzi에서 Lan Ha 만의 360도 파노라마 절경을 감상하세요.',
      zh: '登上 Daiichi Luxury Cruise 5★，在延伸出海面的 Skywalk 玻璃栈道与甲板恒温 Jacuzzi 泡池中尽享 360 度海湾日落。',
      fr: 'Admirez un panorama à 360° sur la baie de Lan Ha depuis notre Skywalk en verre et détendez-vous dans le Jacuzzi chauffé du Daiichi Luxury Cruise 5★.'
    },
    keywords: ['Cầu kính Skywalk du thuyền', 'bể sục Jacuzzi vịnh Lan Hạ', 'Daiichi Luxury Cruise 5 sao', 'săn hoàng hôn vịnh Lan Hạ'],
    readingTime: '4 phút đọc',
    sections: [
      {
        h2: '1. Cầu Kính Skywalk vươn ra biển độc bản trên Vịnh Lan Hạ',
        p: 'Được thiết kế với kính cường lực đa lớp trong suốt vươn hẳn ra ngoài mạn tàu tầng thượng, Cầu Kính Skywalk trên Daiichi Luxury Cruise 5★ mang lại cảm giác bước đi giữa không trung phía trên làn nước ngọc bích. Đây là góc chụp ảnh check-in đắt giá nhất đặc biệt vào khung giờ bình minh và hoàng hôn (17:00 – 18:15).'
      },
      {
        h2: '2. Bể sục Jacuzzi bốn mùa ngắm trọn đảo đá vôi',
        p: 'Ngay tại mũi tàu là bể sục Jacuzzi ngoài trời tích hợp hệ thống gia nhiệt bốn mùa. Dù bạn đi du thuyền vào mùa hè rực nắng hay những ngày thu đông se lạnh, bạn vẫn có thể thoải mái ngâm mình trong làn nước ấm áp, nhâm nhi ly cocktail từ Sky Bar và ngắm nhìn hàng trăm đảo đá vôi lướt qua trước mắt.'
      }
    ],
    faqs: [
      {
        q: 'Sử dụng Cầu Kính Skywalk và Bể sục Jacuzzi có mất thêm phí không?',
        a: 'Hoàn toàn miễn phí 100% cho toàn bộ hành khách lưu trú trên du thuyền Daiichi Luxury Cruise.'
      }
    ]
  },
  {
    slug: 'lich-trinh-3-ngay-2-dem-ha-noi-ninh-binh-ha-long-lan-ha',
    region: 'Ha Long',
    regionLabel: 'Liên Tuyến · Ninh Bình · Hạ Long · Lan Hạ',
    image: 'assets/photos/luxury-3.jpg',
    fallbackUrl: 'https://images.unsplash.com/photo-1504457047772-27faf1c00561?auto=format&fit=crop&w=1200&q=85',
    title: {
      vi: 'Gợi Ý Lịch Trình 3 Ngày 2 Đêm Kết Hợp Ninh Bình – Vịnh Hạ Long – Vịnh Lan Hạ Đáng Giá Nhất',
      en: 'Best 3D2N Northern Vietnam Itinerary: Ninh Binh – Ha Long Bay – Lan Ha Bay',
      ja: '北部ベトナム黄金ルート2泊3日：Ninh Binh – Ha Long 湾 – Lan Ha 湾モデルコース',
      ko: '북부 베트남 골든 루트 2박 3일 일정: Ninh Binh – Ha Long 만 – Lan Ha 만 완벽 코스',
      zh: '越北黄金联线 3天2晚行程推荐：Ninh Binh – Ha Long 湾 – Lan Ha 湾',
      fr: 'Itinéraire Idéal 3J2N dans le Nord : Ninh Binh – Baie de Ha Long – Baie de Lan Ha'
    },
    excerpt: {
      vi: 'Làm sao để khám phá trọn vẹn cả "Vịnh Hạ Long trên cạn" Ninh Bình lẫn kỳ quan biển đảo Vịnh Hạ Long – Vịnh Lan Hạ chỉ trong 3 ngày 2 đêm mà không mệt mỏi?',
      en: 'How to experience both Ninh Binh ("Ha Long Bay on land") and the emerald waters of Ha Long – Lan Ha Bay in a seamless 3-day, 2-night luxury itinerary.',
      ja: '「陸の Ha Long 湾」Ninh Binh と海の絶景 Ha Long 湾・Lan Ha 湾を2泊3日で効率よく巡るラグジュアリーモデルコース。',
      ko: '육지의 Ha Long 만인 Ninh Binh과 바다의 보석 Ha Long · Lan Ha 만을 2박 3일 동안 가장 편안하게 여행하는 럭셔리 루트.',
      zh: '如何在 3天2晚内轻松串联“陆上 Ha Long 湾” Ninh Binh 与海上奇观 Ha Long 湾、Lan Ha 湾？查看高性价比豪华路线。',
      fr: 'Comment combiner Ninh Binh et les baies de Ha Long et Lan Ha en 3 jours et 2 nuits avec des transferts Limousine directs ?'
    },
    keywords: ['lịch trình Ninh Bình Hạ Long Lan Hạ', 'combo du thuyền Lan Hạ 3N2Đ', 'xe Limousine Ninh Bình Cát Bà', 'tour miền Bắc 3 ngày 2 đêm'],
    readingTime: '6 phút đọc',
    sections: [
      {
        h2: 'Ngày 1: Hà Nội – Ninh Bình (Tràng An / Tam Cốc – Hang Múa)',
        p: 'Buổi sáng khởi hành từ Hà Nội đi Ninh Bình. Ngồi thuyền nan khám phá hệ thống hang động xuyên thủy tại Tràng An hoặc Tam Cốc, thưởng thức đặc sản dê núi cơm cháy và chinh phục đỉnh Hang Múa ngắm hoàng hôn trên cánh đồng lúa.'
      },
      {
        h2: 'Ngày 2: Ninh Bình – Đảo Cát Bà – Du thuyền ngủ đêm 5★ Vịnh Lan Hạ & Vịnh Hạ Long',
        p: 'Sáng lên xe Limousine Daiichi đón từ Ninh Bình đi thẳng ra Cát Bà. 12:00 check-in du thuyền 5★ Daiichi Luxury Cruise, dùng bữa trưa hải sản Fine Dining khi tàu lướt qua ranh giới kỳ vĩ của Vịnh Lan Hạ và phía Nam Vịnh Hạ Long. Chiều chèo kayak Hang Sáng Tối, tắm biển Ba Trái Đào, dự tiệc Sunset Party và câu mực đêm.'
      },
      {
        h2: 'Ngày 3: Bình minh Taichi – Làng cổ Việt Hải – Cao tốc 5B về Hà Nội',
        p: 'Đón bình minh trên boong thượng với lớp Thái Cực Quyền, đạp xe khám phá Làng cổ Việt Hải, thưởng thức bữa Brunch tự chọn trước khi tàu cập cảng và xe Limousine đưa bạn về lại Phố Cổ Hà Nội hoặc sân bay Nội Bài.'
      }
    ],
    faqs: [
      {
        q: 'Tôi có thể đặt trọn gói cả xe Limousine, tour Ninh Bình và du thuyền Lan Hạ ở một nơi không?',
        a: 'Có. Bạn chỉ cần chọn mục "Tour Combo Từ Hà Nội" ngay trên trang chủ Daiichi Cruise để nhận báo giá trọn gói A–Z ưu đãi nhất từ đội ngũ điều hành Daiichi Travel.'
      }
    ]
  }
];

// Danh sách các góc cảnh & chủ đề mở rộng để tự động sinh bài mới mỗi ngày tiếp theo
const DAILY_DESTINATIONS = [
  {
    region: 'Lan Ha',
    regionLabel: 'Hang Sáng Tối · Vịnh Lan Hạ',
    place: 'Hang Sáng Tối (Vịnh Lan Hạ)',
    img: 'assets/photos/daycruise-2.jpg',
    remoteImg: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85',
    focusVi: 'Trải nghiệm chèo thuyền kayak xuyên hang nước ngầm kỳ ảo nối liền thung lũng biển khép kín giữa Vịnh Lan Hạ và Vịnh Hạ Long',
    focusEn: 'Kayaking through the mystical water cave connecting hidden emerald lagoons between Lan Ha Bay and Ha Long Bay'
  },
  {
    region: 'Lan Ha',
    regionLabel: 'Bãi Tắm Ba Trái Đào · Vịnh Lan Hạ',
    place: 'Bãi Tắm Ba Trái Đào (Vịnh Lan Hạ)',
    img: 'assets/photos/daycruise-3.jpg',
    remoteImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    focusVi: 'Bãi cát trắng hình cánh cung ôm trọn làn nước trong vắt nhìn thấu đáy tại ranh giới tự nhiên giữa Vịnh Lan Hạ và Vịnh Hạ Long',
    focusEn: 'Crescent white-sand beaches and crystal-clear turquoise waters at the scenic border of Lan Ha Bay and Ha Long Bay'
  },
  {
    region: 'Lan Ha',
    regionLabel: 'Làng Chài Cổ Cái Bèo · Cát Bà',
    place: 'Làng Chài Cổ Cái Bèo (Cát Bà)',
    img: 'assets/photos/daycruise-1.jpg',
    remoteImg: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=85',
    focusVi: 'Khám phá cái nôi văn hóa biển cổ xưa nhất Việt Nam với hàng trăm ngôi nhà nổi yên bình ngay cửa ngõ tiến vào Vịnh Lan Hạ',
    focusEn: 'Exploring Vietnam’s oldest floating fishing village with centuries of maritime heritage at the gateway to Lan Ha Bay'
  },
  {
    region: 'Ninh Binh',
    regionLabel: 'Cố Đô Hoa Lư & Tràng An · Ninh Bình',
    place: 'Quần Thể Danh Thắng Tràng An (Ninh Bình)',
    img: 'assets/photos/daycruise-act-3.jpg',
    remoteImg: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=85',
    focusVi: 'Hành trình ngồi đò chèo tay xuyên qua các hang động đá vôi ngập nước và đền đài cổ kính tại Di sản Thế giới Tràng An – Ninh Bình',
    focusEn: 'Hand-rowed sampan boat journey through flooded limestone caves and ancient temples at UNESCO-listed Trang An in Ninh Binh'
  },
  {
    region: 'Ha Long',
    regionLabel: 'Hoàng Hôn Vịnh Hạ Long – Lan Hạ',
    place: 'Hoàng Hôn Trên Vịnh Hạ Long & Vịnh Lan Hạ',
    img: 'assets/photos/daycruise-4.jpg',
    remoteImg: 'https://images.unsplash.com/photo-1504457047772-27faf1c00561?auto=format&fit=crop&w=1200&q=85',
    focusVi: 'Khoảnh khắc mặt trời đỏ rực buông xuống sau hàng trăm đỉnh núi đá vôi trên hải trình Sunset Cruise và du thuyền ngủ đêm 5★',
    focusEn: 'Golden hour spectacle as the sun dips behind hundreds of limestone peaks aboard our Sunset Cruise and 5★ overnight ship'
  }
];

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function downloadImageIfNeeded(url, destPath) {
  return new Promise((resolve) => {
    if (!url || fs.existsSync(destPath)) return resolve(false);
    const file = fs.createWriteStream(destPath);
    https
      .get(url, { timeout: 10000 }, (res) => {
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(destPath, () => {});
          return resolve(false);
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      })
      .on('error', () => {
        file.close();
        fs.unlink(destPath, () => {});
        resolve(false);
      });
  });
}

function buildHtmlPage(post) {
  const canonicalUrl = `https://daiichicruise.vn/seo/blog/${post.slug}.html`;
  const imgUrl = post.image.startsWith('http')
    ? post.image
    : `https://daiichicruise.vn/${post.image.replace(/^\/+/, '')}`;
  const relImg = post.image.startsWith('http')
    ? post.image
    : `../../${post.image.replace(/^\/+/, '')}`;

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Daiichi Cruise', item: 'https://daiichicruise.vn/' },
          { '@type': 'ListItem', position: 2, name: 'Cẩm Nang & Blog Du Lịch', item: 'https://daiichicruise.vn/#blog' },
          { '@type': 'ListItem', position: 3, name: post.title.vi, item: canonicalUrl }
        ]
      },
      {
        '@type': 'BlogPosting',
        headline: post.title.vi,
        description: post.excerpt.vi,
        image: [imgUrl],
        datePublished: post.date,
        dateModified: post.date,
        author: {
          '@type': 'Organization',
          name: 'Daiichi Cruise & Daiichi Travel',
          url: 'https://daiichicruise.vn'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Daiichi Travel',
          logo: {
            '@type': 'ImageObject',
            url: 'https://daiichicruise.vn/assets/brand/emblem-Daiichi.png'
          }
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
        keywords: (post.keywords || []).join(', ')
      },
      ...(post.faqs && post.faqs.length
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: post.faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a }
              }))
            }
          ]
        : [])
    ]
  };

  return `<!DOCTYPE html>
<html lang="vi">
<head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-18502887757"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-18502887757');
</script>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${post.title.vi} | Daiichi Cruise</title>
<meta name="description" content="${post.excerpt.vi.replace(/"/g, '&quot;')}" />
<meta name="keywords" content="${(post.keywords || []).join(', ')}" />
<link rel="canonical" href="${canonicalUrl}" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${post.title.vi.replace(/"/g, '&quot;')}" />
<meta property="og:description" content="${post.excerpt.vi.replace(/"/g, '&quot;')}" />
<meta property="og:image" content="${imgUrl}" />
<meta property="og:url" content="${canonicalUrl}" />
<meta property="og:site_name" content="Daiichi Cruise" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="theme-color" content="#0A192F" />
<script type="application/ld+json">${JSON.stringify(schemaJson)}</script>
<style>
  :root{--navy:#0A192F;--gold:#D4A648;--red:#A8121E;--ink:#1E293B;--ink2:#475569;--line:#E2E8F0;--ivory:#FAF8F4}
  *{box-sizing:border-box}
  body{margin:0;font-family:'Plus Jakarta Sans','Be Vietnam Pro',system-ui,sans-serif;color:var(--ink);background:var(--ivory);line-height:1.75}
  header{background:var(--navy);color:#fff;padding:16px 24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;border-bottom:1px solid rgba(212,166,72,.3)}
  header a.brand{color:var(--gold);text-decoration:none;font-weight:800;letter-spacing:.08em;font-size:16px}
  main{max-width:840px;margin:0 auto;padding:36px 20px 72px}
  .meta-bar{display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-size:13px;color:var(--ink2);margin-bottom:12px}
  .badge{background:rgba(212,166,72,.18);color:#92400E;font-weight:800;padding:4px 12px;border-radius:20px;font-size:12px;text-transform:uppercase;letter-spacing:.05em}
  h1{font-family:'Cormorant Garamond',Georgia,serif;color:var(--navy);font-size:clamp(28px,4.5vw,42px);margin:0 0 14px;line-height:1.22}
  .lead{font-size:17px;color:var(--ink2);font-weight:500;margin-bottom:22px}
  .hero-img{width:100%;max-height:460px;object-fit:cover;border-radius:18px;box-shadow:0 16px 40px rgba(10,25,47,.15);margin:10px 0 28px}
  .cta-box{background:linear-gradient(135deg,#0A192F 0%,#152C4E 100%);color:#fff;padding:24px 28px;border-radius:16px;margin:28px 0;border:1px solid rgba(212,166,72,.4);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
  .btn-gold{display:inline-block;background:linear-gradient(135deg,#F3C969 0%,#D4A648 100%);color:#0A192F;font-weight:800;text-decoration:none;padding:13px 24px;border-radius:10px;font-size:14.5px}
  .btn-outline{display:inline-block;background:#fff;color:var(--navy);border:1.5px solid var(--line);font-weight:700;text-decoration:none;padding:11px 20px;border-radius:10px;font-size:14px}
  article h2{font-family:'Cormorant Garamond',Georgia,serif;color:var(--navy);font-size:26px;margin:32px 0 12px}
  article p{font-size:16px;color:#334155;margin:0 0 18px}
  .faq-sec{margin-top:36px;padding-top:24px;border-top:1px solid var(--line)}
  details{background:#fff;border:1px solid var(--line);border-radius:12px;padding:14px 18px;margin-bottom:10px}
  summary{font-weight:700;cursor:pointer;color:var(--navy);font-size:15.5px}
  details p{margin:10px 0 0;color:var(--ink2);font-size:14.5px}
  .tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:28px}
  .tag{background:#fff;border:1px solid var(--line);padding:5px 12px;border-radius:20px;font-size:12.5px;color:var(--ink2)}
  footer{font-size:13px;color:var(--ink2);border-top:1px solid var(--line);margin-top:48px;padding-top:20px}
</style>
</head>
<body>
<header>
  <a class="brand notranslate" translate="no" href="../../index.html">⚓ DAIICHI CRUISE · LAN HA BAY</a>
  <div style="display:flex;gap:14px;align-items:center;font-size:13px">
    <a href="../../index.html#blog" style="color:#fff;text-decoration:none;font-weight:600">← Cẩm Nang Du Lịch</a>
    <a href="tel:19009070" style="color:var(--gold);text-decoration:none;font-weight:800">📞 1900 9070</a>
  </div>
</header>
<main>
  <div class="meta-bar">
    <span class="badge notranslate" translate="no">${post.regionLabel}</span>
    <span>📅 ${post.date}</span>
    <span>⏱ ${post.readingTime || '5 phút đọc'}</span>
  </div>
  <h1>${post.title.vi}</h1>
  <p class="lead">${post.excerpt.vi}</p>
  <img class="hero-img" src="${relImg}" alt="${post.title.vi.replace(/"/g, '&quot;')}" loading="eager" />

  <article>
    ${(post.sections || [])
      .map(
        (s) => `
    <h2>${s.h2}</h2>
    <p>${s.p}</p>`
      )
      .join('\n')}
  </article>

  <div class="cta-box">
    <div style="max-width:520px">
      <div style="color:var(--gold);font-size:11.5px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;margin-bottom:4px">ĐẶT TRỰC TIẾP · GIÁ TỐT NHẤT 2026</div>
      <div style="font-size:20px;font-weight:800;margin-bottom:4px">Trải Nghiệm Du Thuyền 5★ <span class="notranslate" translate="no">Daiichi Luxury</span> &amp; Xe Limousine Trọn Gói</div>
      <div style="font-size:13.5px;color:rgba(255,255,255,.78)">Nhập mã <b class="notranslate" translate="no">EARLYBIRD12</b> giảm ngay 12% khi đặt trước 30 ngày. Hỗ trợ 24/7 qua Hotline 1900 9070 &amp; Zalo 0961 004 709.</div>
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <a class="btn-gold" href="https://daiichitravel.com/?tab=cruise-tours" target="_blank" rel="noopener">Đặt Du Thuyền Ngay →</a>
      <a class="btn-outline" href="../../index.html">Về Trang Chủ</a>
    </div>
  </div>

  ${
    post.faqs && post.faqs.length
      ? `<div class="faq-sec">
    <h2 style="font-family:'Cormorant Garamond',Georgia,serif;color:var(--navy);font-size:24px;margin:0 0 14px">Câu Hỏi Thường Gặp (FAQ)</h2>
    ${post.faqs.map((f) => `<details open><summary>${f.q}</summary><p>${f.a}</p></details>`).join('\n    ')}
  </div>`
      : ''
  }

  <div class="tags">
    ${(post.keywords || []).map((k) => `<span class="tag">#${k}</span>`).join('')}
  </div>

  <footer>
    <p><b class="notranslate" translate="no">Daiichi Cruise &amp; Daiichi Travel</b> — Hệ sinh thái Du thuyền 5★ <span class="notranslate" translate="no">Vịnh Lan Hạ</span>, Du thuyền ngày &amp; Xe Limousine <span class="notranslate" translate="no">Hà Nội ⇄ Hải Phòng ⇄ Cát Bà ⇄ Ninh Bình</span>.</p>
    <p>Hotline 24/7: <a href="tel:19009070">1900 9070</a> · Zalo / WhatsApp: <a href="https://zalo.me/633406871869836720" target="_blank" rel="noopener">+84 961 004 709</a> · Website: <a href="https://daiichitravel.com" target="_blank" rel="noopener">daiichitravel.com</a></p>
  </footer>
</main>
</body>
</html>`;
}

async function run() {
  const today = new Date().toISOString().split('T')[0];

  // Load existing posts if shared/blog_posts.js exists
  let existingPosts = [];
  if (fs.existsSync(BLOG_JS_FILE)) {
    try {
      const raw = fs.readFileSync(BLOG_JS_FILE, 'utf8');
      const match = raw.match(/window\.DT_BLOG_POSTS\s*=\s*(\[[\s\S]*?\]);/);
      if (match) existingPosts = JSON.parse(match[1]);
    } catch (e) {
      console.warn('Could not parse existing blog_posts.js, rebuilding from TOPIC_BANK.');
    }
  }

  // Ensure all foundational TOPIC_BANK posts exist
  const baseDates = ['2026-10-22', '2026-10-23', '2026-10-24', '2026-10-25', '2026-10-26', '2026-10-27'];
  for (let i = 0; i < TOPIC_BANK.length; i++) {
    const t = TOPIC_BANK[i];
    if (!existingPosts.some((p) => p.slug === t.slug)) {
      existingPosts.push({
        id: 'blog-' + (i + 1),
        date: baseDates[i] || today,
        ...t
      });
    }
  }

  // If called with --daily flag (from GitHub Action daily cron), generate a new daily post if today doesn't have a daily post yet
  const isDailyCron = process.argv.includes('--daily');
  if (isDailyCron && !existingPosts.some((p) => p.date === today && p.isAutoDaily)) {
    const dayIdx = existingPosts.length % DAILY_DESTINATIONS.length;
    const dest = DAILY_DESTINATIONS[dayIdx];
    const slug = `${slugify(dest.place)}-${today}`;
    const localImgRel = `assets/blog/${slug}.jpg`;
    const localImgAbs = path.join(ROOT, localImgRel);

    const downloaded = await downloadImageIfNeeded(dest.remoteImg, localImgAbs);
    const finalImg = downloaded ? localImgRel : dest.img;

    const newPost = {
      id: 'blog-' + Date.now().toString().slice(-6),
      slug,
      date: today,
      isAutoDaily: true,
      region: dest.region,
      regionLabel: dest.regionLabel,
      image: finalImg,
      readingTime: '5 phút đọc',
      title: {
        vi: `Khám Phá ${dest.place}: Điểm Check-in & Kinh Nghiệm Du Lịch Mới Nhất (${today})`,
        en: `Discover ${dest.place}: Latest Cruise & Travel Guide (${today})`,
        ja: `${dest.place} 絶景ガイド：最新クルーズ＆観光情報 (${today})`,
        ko: `${dest.place} 여행 가이드: 최신 크루즈 & 포토존 안내 (${today})`,
        zh: `探索 ${dest.place}：最新游轮与打卡攻略 (${today})`,
        fr: `Découvrir ${dest.place} : Guide Croisière & Conseils (${today})`
      },
      excerpt: {
        vi: `${dest.focusVi}. Cập nhật lịch trình tham quan, góc chụp ảnh đẹp và kinh nghiệm đặt du thuyền 5 sao & xe Limousine trọn gói.`,
        en: `${dest.focusEn}. Complete itinerary, best photo spots, and 5-star cruise & Limousine booking tips.`,
        ja: `${dest.focusEn}。ベストな時間帯や 5つ星 Daiichi Cruise ＆ Limousine 予約のコツを紹介。`,
        ko: `${dest.focusEn}. 추천 일정과 포토 스팟, 5성급 Daiichi Cruise & Limousine 예약 팁을 확인하세요.`,
        zh: `${dest.focusEn}。汇总最佳游览时间、拍照机位与五星级 Daiichi Cruise 预订贴士。`,
        fr: `${dest.focusEn}. Horaires idéaux, spots photo et conseils de réservation Daiichi Cruise.`
      },
      keywords: [dest.place, 'Vịnh Lan Hạ', 'Vịnh Hạ Long', 'Ninh Bình', 'Cát Bà', 'Daiichi Cruise'],
      sections: [
        {
          h2: `1. Vẻ đẹp độc bản của ${dest.place}`,
          p: `${dest.focusVi}. Đây là một trong những tọa độ được du khách trong nước và quốc tế yêu thích nhất khi trải nghiệm hải trình nghỉ dưỡng cùng Daiichi Cruise & Daiichi Travel.`
        },
        {
          h2: '2. Thời gian lý tưởng trong ngày để tham quan & chụp ảnh',
          p: 'Khung giờ sáng sớm (07:30 – 09:30) khi nắng ban mai chiếu xuống làn nước ngọc bích và buổi chiều hoàng hôn (15:30 – 18:00) là hai thời điểm đẹp nhất để lưu lại những bức hình tuyệt mỹ cũng như tận hưởng bầu không khí trong lành.'
        },
        {
          h2: '3. Gợi ý đặt dịch vụ Du thuyền & Xe Limousine trọn gói',
          p: 'Để chuyến đi thuận tiện và tiết kiệm chi phí nhất, du khách nên đặt trước gói Combo Xe Limousine Hà Nội / Ninh Bình kết hợp Du thuyền 5★ Daiichi Luxury hoặc Du thuyền ngày VIP 4 trên hệ thống chính thức của Daiichi Travel.'
        }
      ],
      faqs: [
        {
          q: `Làm sao để kết hợp tham quan ${dest.place} thuận tiện nhất?`,
          a: 'Bạn có thể đặt trực tuyến trên daiichicruise.vn hoặc liên hệ Hotline 1900 9070 / Zalo 0961 004 709 để được tư vấn lịch trình 1 ngày, 2N1Đ hoặc 3N2Đ đón trả tận nơi.'
        }
      ]
    };

    existingPosts.unshift(newPost);
  }

  // Sort newest first
  existingPosts.sort((a, b) => String(b.date).localeCompare(String(a.date)));

  // Write static HTML pages for every post
  for (const post of existingPosts) {
    const htmlPath = path.join(BLOG_DIR, `${post.slug}.html`);
    fs.writeFileSync(htmlPath, buildHtmlPage(post), 'utf8');
  }

  // Write shared/blog_posts.js
  const jsContent = `/* ============================================================
   DAIICHI CRUISE — AUTO-GENERATED SEO BLOG POSTS STORE
   Updated automatically by scripts/auto_daily_seo_blog.mjs
   ============================================================ */
window.DT_BLOG_POSTS = ${JSON.stringify(existingPosts, null, 2)};
`;
  fs.writeFileSync(BLOG_JS_FILE, jsContent, 'utf8');

  // Update sitemap.xml with blog URLs
  if (fs.existsSync(SITEMAP_FILE)) {
    let sitemap = fs.readFileSync(SITEMAP_FILE, 'utf8');
    let added = 0;
    for (const post of existingPosts) {
      const loc = `https://daiichicruise.vn/seo/blog/${post.slug}.html`;
      if (!sitemap.includes(loc)) {
        const entry = `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${post.date}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n</urlset>`;
        sitemap = sitemap.replace('</urlset>', entry);
        added++;
      }
    }
    if (added > 0) {
      fs.writeFileSync(SITEMAP_FILE, sitemap, 'utf8');
    }
  }

  console.log(`Generated ${existingPosts.length} SEO blog posts in seo/blog/*.html and shared/blog_posts.js.`);
}

run();

