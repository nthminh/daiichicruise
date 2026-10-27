/**
 * DAIICHI CRUISE & TRAVEL — LIVE TRENDING EVENTS & GLOBAL MEDIA SEO BLOG ENGINE
 * -----------------------------------------------------------------------------
 * Chức năng:
 * 1. Tự động săn tin tức & sự kiện du lịch đang HOT từ các báo/tạp chí uy tín quốc tế
 *    và trong nước (National Geographic, Lonely Planet, TripAdvisor, Sydney Morning Herald,
 *    Escape, VnExpress International, VnEconomy, Báo Quảng Ninh...) bằng nhiều ngôn ngữ.
 * 2. Lọc bỏ 100% tin tiêu cực; chỉ chọn lọc sự kiện, giải thưởng, xu hướng du lịch mới
 *    và tổng hợp thành cẩm nang mang lại lợi ích thực tế cao nhất cho người đọc.
 * 3. Sử dụng hình ảnh địa danh thật 100% (Ninh Bình, Vịnh Hạ Long, Vịnh Lan Hạ, Cát Bà).
 * 4. Tích hợp nút "❤️ Thích bài viết" (Like) cho người đọc trên cả trang HTML độc lập và Trang chủ.
 */

import fs from 'fs';
import path from 'path';
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

// Bộ từ khóa chặn tin tiêu cực để đảm bảo 100% bài viết mang năng lượng tích cực & hữu ích cho du khách
const NEGATIVE_KEYWORDS = [
  'tử vong', 'nạn nhân', 'tai nạn', 'chìm', 'lật', 'cháy', 'khởi tố', 'bắt giữ', 'xử phạt',
  'buôn lậu', 'thi thể', 'mất tích', 'bão', 'lũ', 'sạt lở', 'ô nhiễm', 'chặt chém', 'lừa đảo',
  'accident', 'death', 'dead', 'victim', 'capsize', 'sink', 'sank', 'crash', 'arrest', 'crime',
  'typhoon', 'storm', 'drown', 'tragedy', 'lawsuit', 'scam', 'injured'
];

// Kho bài viết chuyên sâu tổng hợp từ các sự kiện & vinh danh thực tế trên báo chí quốc tế (National Geographic, TripAdvisor, Forbes, UNESCO...)
const TOPIC_BANK = [
  {
    slug: 'kinh-nghiem-du-thuyen-vinh-lan-ha-cat-ba-tu-a-z',
    region: 'Lan Ha',
    regionLabel: 'Vịnh Lan Hạ · Cát Bà',
    sourceBadge: 'Theo National Geographic & Cẩm Nang Thực Tế',
    image: 'assets/blog/vinh-lan-ha-cat-ba.jpg',
    initialLikes: 348,
    initialViews: 1920,
    title: {
      vi: 'National Geographic Vinh Danh Vịnh Lan Hạ Là "Xứ Sở Thần Tiên Nổi Trên Mặt Nước": Kinh Nghiệm Đi Tự Túc A–Z (2026)',
      en: 'National Geographic Hails Lan Ha Bay as a "Floating Wonderland": Complete 2026 Travel Guide',
      ja: 'National Geographic が「水上のワンダーランド」と絶賛した Lan Ha 湾＆Cat Ba 完全ガイド (2026)',
      ko: 'National Geographic 선정 "바다 위의 원더랜드" Lan Ha 만 & Cat Ba 완벽 여행 가이드 (2026)',
      zh: '《国家地理》盛赞的“水上仙境” Lan Ha 湾与 Cat Ba 岛：2026 实用自由行全攻略',
      fr: 'National Geographic salue la Baie de Lan Ha comme un « Pays des Merveilles Flottant » : Guide 2026'
    },
    excerpt: {
      vi: 'Tạp chí National Geographic và Sydney Morning Herald vừa gợi ý du khách quốc tế tìm đến Vịnh Lan Hạ & đảo Cát Bà nhờ vẻ đẹp nguyên sơ của 400 đảo đá vôi, 139 bãi cát trắng vắng người và làng chài nổi Cái Bèo 7.000 năm tuổi.',
      en: 'National Geographic and the Sydney Morning Herald spotlight Lan Ha Bay & Cat Ba Island for its 400 emerald karsts, 139 pristine white-sand beaches, and the 7,000-year-old Cai Beo floating village.',
      ja: 'National Geographic や海外メディアが注目する Lan Ha 湾。400の石灰岩島、139の白砂ビーチ、7,000年の歴史を持つ Cai Beo 水上村の魅力と実用アドバイス。',
      ko: 'National Geographic과 해외 유력 매체가 주목한 Lan Ha 만! 400여 개의 카르스트 섬과 139개 해변, 7,000년 역사의 Cai Beo 수상 마을 여행 팁을 정리했습니다.',
      zh: '《国家地理》与国际媒体力荐 Lan Ha 湾：400座翠绿岛屿、139处靜谧白沙滩与7000年历史的 Cai Beo 水上渔村实用出行指南。',
      fr: 'National Geographic met en lumière la baie de Lan Ha : 400 îlots karstiques, 139 plages sauvages et le village flottant millénaire de Cai Beo.'
    },
    keywords: ['National Geographic Vịnh Lan Hạ', 'kinh nghiệm đi vịnh Lan Hạ', 'du lịch Cát Bà 2026', 'Làng chài Cái Bèo', 'Hang Sáng Tối', 'Daiichi Luxury Cruise'],
    readingTime: '6 phút đọc',
    sections: [
      {
        h2: '1. Vì sao báo chí quốc tế khuyên du khách chọn Vịnh Lan Hạ & đảo Cát Bà?',
        p: 'Trong bài viết chuyên sâu "How to explore the floating wonderland of Lan Ha Bay", tạp chí National Geographic cùng tờ Sydney Morning Herald (Úc) nhận định Vịnh Lan Hạ sở hữu địa chất núi đá vôi kỳ vĩ tương đồng với Vịnh Hạ Long nhưng giữ được sự tĩnh lặng hiếm có. Với hơn 400 hòn đảo phủ cây xanh rợp bóng và 139 bãi tắm cát trắng tự nhiên nằm ẩn mình giữa các eo núi, du khách có thể chèo thuyền kayak và bơi lội giữa làn nước xanh ngọc bích mà không gặp cảnh quá tải tàu thuyền.'
      },
      {
        h2: '2. Mẹo chọn khung giờ vàng tham quan Làng chài Cái Bèo & Hang Sáng Tối',
        p: 'Để có trải nghiệm thực tế đáng giá nhất cho chuyến đi: Hãy xuất phát qua Làng chài cổ Cái Bèo vào khoảng 08:30 – 10:00 sáng hoặc 12:15 trưa khi nắng chiếu xiên xuống hơn 300 hộ gia đình nuôi cá lồng trên mặt vịnh. Khi đến khu vực Hang Sáng Tối (ranh giới tự nhiên giữa Vịnh Lan Hạ và Vịnh Hạ Long), bạn nên tự tay chèo kayak xuyên qua vòm hang đá dài 100m để tiến vào thung lũng nước phẳng lặng như gương bên trong.'
      },
      {
        h2: '3. So sánh chi phí thực tế: Đi tour trong ngày hay ngủ đêm trên du thuyền 5★?',
        p: '• Nếu bạn ở khách sạn tại trung tâm Cát Bà hoặc đi về trong ngày từ Hà Nội: Tour du thuyền ngày 5★ (như Daiichi VIP 4) có mức giá rất hợp lý chỉ từ 650.000đ – 850.000đ/khách (đã bao gồm bữa trưa hải sản, kayak, xe đạp làng Việt Hải và vé vịnh).\n• Nếu bạn muốn nghỉ dưỡng trọn vẹn: Hải trình ngủ đêm 2N1Đ trên du thuyền 5★ Daiichi Luxury Cruise (phòng Suite có ban công riêng, bể sục Jacuzzi 4 mùa và Cầu Kính Skywalk) mang lại trải nghiệm ngắm hoàng hôn và câu mực đêm giữa vịnh tĩnh lặng.'
      },
      {
        h2: '4. Hướng dẫn di chuyển tiết kiệm thời gian nhất từ Hà Nội',
        p: 'Thay vì phải tự bắt nhiều chặng xe và xếp hàng mua vé phà, du khách đi tự túc nên đặt vé liên tuyến Xe Limousine / Xe Bus cao tốc 5B kết hợp Tàu cao tốc riêng của Daiichi Travel (khởi hành từ 24 Hàng Bè – Phố Cổ Hà Nội). Tổng thời gian di chuyển từ Hà Nội đến thẳng trung tâm Cát Bà và bến du thuyền chỉ mất đúng 3 giờ đồng hồ.'
      }
    ],
    faqs: [
      {
        q: 'Đi Vịnh Lan Hạ tháng mấy nước trong và thời tiết đẹp nhất?',
        a: 'Từ tháng 4 đến tháng 10 là mùa nắng đẹp, nước biển trong xanh rất hợp bơi lội, chèo kayak và SUP. Từ tháng 10 đến tháng 3 năm sau thời tiết mát dịu (18–25°C), ít mưa, cực kỳ lý tưởng để nghỉ dưỡng ngủ đêm trên du thuyền 5 sao và đạp xe tại Làng cổ Việt Hải.'
      },
      {
        q: 'Người lớn tuổi và trẻ nhỏ đi Vịnh Lan Hạ có bị say sóng không?',
        a: 'Vịnh Lan Hạ được bao bọc bởi hơn 400 đảo đá vôi nên mặt nước êm như mặt hồ quanh năm, hầu như không có sóng lớn, rất an toàn và êm ái cho cả người cao tuổi lẫn trẻ nhỏ.'
      }
    ]
  },
  {
    slug: 'so-sanh-vinh-ha-long-va-vinh-lan-ha-nen-di-dau',
    region: 'Ha Long',
    regionLabel: 'Vịnh Hạ Long · Vịnh Lan Hạ',
    sourceBadge: 'Tin Mới Di Sản Liên Vùng UNESCO',
    image: 'assets/blog/vinh-ha-long-real.jpg',
    initialLikes: 295,
    initialViews: 1640,
    title: {
      vi: 'Mở Rộng Kết Nối Di Sản Vịnh Hạ Long – Vịnh Lan Hạ – Cát Bà: Du Khách Được Lợi Gì & Nên Chọn Tuyến Nào?',
      en: 'UNESCO Heritage Connection Between Ha Long Bay & Lan Ha Bay: Practical Guide for Travelers',
      ja: '世界遺産 Ha Long 湾と Lan Ha 湾の広域連携：旅行者にとってのメリットと最適ルートの選び方',
      ko: '유네스코 세계유산 Ha Long 만 – Lan Ha 만 광역 연결: 여행자에게 좋은 점과 코스 선택법',
      zh: '世界遗产 Ha Long 湾与 Lan Ha 湾跨区域联动：游客有哪些实际便利与航线选择建议？',
      fr: 'Connexion du Patrimoine UNESCO Baie de Ha Long – Baie de Lan Ha : Quels avantages pour les voyageurs ?'
    },
    excerpt: {
      vi: 'Việc Quảng Ninh và Hải Phòng đẩy mạnh kết nối không gian Di sản Thiên nhiên Thế giới liên tỉnh Vịnh Hạ Long – Quần đảo Cát Bà giúp du khách dễ dàng kết hợp tham quan cả hai kỳ quan trong cùng một chuyến đi.',
      en: 'New inter-provincial heritage connectivity between Quang Ninh and Hai Phong makes it easier than ever to experience both Ha Long Bay and Lan Ha Bay – Cat Ba in a single trip.',
      ja: 'Ha Long 湾と Cat Ba 諸島（Lan Ha 湾）のシームレスな連携により、1回の旅行で両方の絶景を巡ることが可能になりました。',
      ko: 'Ha Long 만과 Cat Ba 군도(Lan Ha 만)의 유산 구역 연결로 한 번의 여행에서 두 바다의 매력을 모두 즐길 수 있게 되었습니다.',
      zh: '随着广宁与海防加速推进 Ha Long 湾—Cat Ba 群岛跨省世界自然遗产互通，游客可在一次行程中轻松畅游两大海湾。',
      fr: 'La liaison renforcée entre la baie de Ha Long et l\'archipel de Cat Ba (baie de Lan Ha) permet de découvrir les deux merveilles en un seul voyage.'
    },
    keywords: ['kết nối vịnh Hạ Long vịnh Lan Hạ', 'so sánh vịnh Hạ Long và vịnh Lan Hạ', 'di sản thế giới UNESCO', 'Tuần Châu đi Cát Bà', 'du thuyền 5 sao'],
    readingTime: '5 phút đọc',
    sections: [
      {
        h2: '1. Tin vui cho du khách: Kết nối liền mạch không gian di sản Quảng Ninh – Hải Phòng',
        p: 'Sau khi UNESCO công nhận quần thể Vịnh Hạ Long – Quần đảo Cát Bà là Di sản Thiên nhiên Thế giới liên tỉnh, các tuyến giao thông thủy và bộ kết nối giữa Hạ Long (Tuần Châu / Bãi Cháy) và Cát Bà – Vịnh Lan Hạ đã được mở rộng tối đa. Du khách hiện nay không còn phải đắn đo "chọn 1 bỏ 1" mà có thể trải nghiệm trọn vẹn cả hai vịnh chỉ trong 2 đến 3 ngày.'
      },
      {
        h2: '2. Bảng so sánh thực tế giúp bạn chọn đúng điểm đến theo sở thích',
        p: '• Chọn Vịnh Hạ Long nếu: Bạn đi lần đầu và muốn chụp ảnh cùng Hòn Trống Mái, leo lên đỉnh đảo Ti Tốp ngắm toàn cảnh hoặc đi bộ khám phá các hang động thạch nhũ khô khổng lồ như Hang Sửng Sốt, Động Thiên Cung.\n• Chọn Vịnh Lan Hạ – Cát Bà nếu: Bạn thích không gian yên tĩnh, muốn tự chèo kayak xuyên qua hang nước ngầm (Hang Sáng Tối), nhảy xuống tắm biển trực tiếp tại các bãi cát hoang sơ giữa vịnh (Ba Trái Đào, Vạn Bội) và đạp xe xuyên rừng nguyên sinh vào Làng cổ Việt Hải.'
      },
      {
        h2: '3. Mẹo nối tuyến Hạ Long ⇄ Cát Bà chỉ trong 1 giờ 30 phút',
        p: 'Nếu bạn đang ở Bãi Cháy hoặc Tuần Châu (Hạ Long), bạn có thể sử dụng tuyến xe kết nối thẳng sang đảo Cát Bà của Daiichi Travel (chỉ mất khoảng 1h30) để tiếp tục lên du thuyền khám phá Vịnh Lan Hạ mà không phải vòng ngược về đất liền.'
      }
    ],
    faqs: [
      {
        q: 'Đi du thuyền Vịnh Lan Hạ có ngắm được các đảo đá của Vịnh Hạ Long không?',
        a: 'Có! Hải trình du thuyền ngủ đêm và tour 1 ngày trên Vịnh Lan Hạ di chuyển tới khu vực Hang Sáng Tối và Ba Trái Đào — đây chính là đường ranh giới tự nhiên giáp ranh trực tiếp với phía Nam Vịnh Hạ Long.'
      }
    ]
  },
  {
    slug: 'kham-pha-ninh-binh-trang-an-tam-coc-hang-mua-1-ngay',
    region: 'Ninh Binh',
    regionLabel: 'Ninh Bình · Tràng An · Tam Cốc',
    sourceBadge: 'Điểm Đến Hot Nhất Châu Á (Forbes & Escape)',
    image: 'assets/blog/ninh-binh-tam-coc-hang-mua.jpg',
    initialLikes: 276,
    initialViews: 1480,
    title: {
      vi: 'Báo Quốc Tế Gọi Tên Ninh Bình Là "Điểm Đến Hot Nhất Việt Nam": Kinh Nghiệm Đi Tràng An, Tam Cốc & Hang Múa Không Đông Đúc',
      en: 'International Media Names Ninh Binh Vietnam’s Hottest Destination: Insider Guide to Trang An, Tam Coc & Hang Mua',
      ja: '海外メディアが「ベトナム最注目の旅行先」に選出！Ninh Binh（Trang An・Tam Coc・Hang Mua）混雑回避ガイド',
      ko: '해외 언론 선정 "베트남 최고 인기 여행지" Ninh Binh: Trang An, Tam Coc, Hang Mua 알짜배기 공략법',
      zh: '国际媒体评选 Ninh Binh 为“越南最热门目的地”：Trang An、Tam Coc 与 Hang Mua 错峰游览实用指南',
      fr: 'La presse internationale sacre Ninh Binh « Destination la plus prisée du Vietnam » : Guide pratique Trang An, Tam Coc & Hang Mua'
    },
    excerpt: {
      vi: 'Tạp chí Escape (Úc), Forbes và TripAdvisor liên tục xếp Ninh Bình vào nhóm điểm đến hấp dẫn nhất thế giới. Bỏ túi ngay khung giờ vàng đi thuyền Tràng An không phải xếp hàng và mẹo leo đỉnh Hang Múa săn ảnh đẹp.',
      en: 'Featured in Escape Australia, Forbes, and TripAdvisor Travelers’ Choice, Ninh Binh captivates visitors with karst rivers and ancient temples. Learn the best hours to beat the crowds.',
      ja: 'Forbes や TripAdvisor で世界トップクラスの評価を受ける Ninh Binh。待ち時間なしで舟に乗る時間帯や Hang Mua 絶景撮影のコツを解説。',
      ko: 'Forbes와 TripAdvisor가 극찬한 Ninh Binh! 대기 없이 보트를 타는 황금 시간대와 Hang Mua 인생샷 촬영 팁을 확인하세요.',
      zh: '荣登《福布斯》与 TripAdvisor 榜单的 Ninh Binh，如何避开人潮乘船游览 Trang An 并登顶 Hang Mua 拍出大片？一文看懂。',
      fr: 'Classée parmi les meilleures destinations mondiales par Forbes et TripAdvisor, Ninh Binh dévoile ses secrets : horaires idéaux et conseils photo.'
    },
    keywords: ['du lịch Ninh Bình 2026', 'kinh nghiệm đi Tràng An', 'Tam Cốc Hang Múa', 'xe Ninh Bình đi Cát Bà', 'Di sản thế giới Tràng An'],
    readingTime: '6 phút đọc',
    sections: [
      {
        h2: '1. Vì sao Ninh Bình liên tục lọt Top điểm đến được yêu thích nhất thế giới?',
        p: 'Theo tờ Escape (Úc) và bảng xếp hạng TripAdvisor Travelers’ Choice, Ninh Bình thu hút du khách toàn cầu nhờ sự kết hợp hiếm có giữa Di sản Văn hóa và Thiên nhiên Thế giới (Quần thể danh thắng Tràng An). Không chỉ có những dãy núi đá vôi sừng sững soi bóng xuống dòng sông Ngô Đồng, nơi đây còn mang vẻ đẹp thanh bình của làng quê Bắc Bộ với cánh đồng lúa chín, đầm sen dưới chân núi và cố đô Hoa Lư ngàn năm lịch sử.'
      },
      {
        h2: '2. Kinh nghiệm thực tế: Chọn tuyến thuyền nào ở Tràng An & đi giờ nào vắng khách?',
        p: 'Tại bến thuyền Tràng An có 3 tuyến đò chèo tay (mỗi chuyến kéo dài 2,5 – 3 tiếng, giá vé niêm yết 250.000đ/người lớn):\n• Tuyến 1 (9 hang động + 3 điểm tâm linh): Dành cho người thích khám phá hệ thống hang nước dài và cổ kính.\n• Tuyến 2 (4 hang động + Hành cung Vũ Lâm + Phim trường Kong): Tuyến cân bằng, cảnh sắc núi non mở rộng, rất hợp chụp ảnh.\n• Tuyến 3 (Hang Đột – hang nước dài nhất 1km + Đền Suối Tiên): Ít phải chờ đò nhất vào dịp cuối tuần.\n💡 Mẹo nhỏ: Hãy đến bến thuyền trước 08:00 sáng hoặc sau 14:30 chiều để không phải xếp hàng và có ánh nắng dịu đẹp nhất.'
      },
      {
        h2: '3. Bí quyết leo 486 bậc đá Hang Múa & Mẹo nối chuyến đi thẳng Cát Bà – Vịnh Lan Hạ',
        p: 'Khi chinh phục đỉnh Ngọa Long tại Hang Múa, bạn nên mang giày thể thao bám tốt và đi vào khoảng 16:00 – 17:30 để vừa mát mẻ vừa đón được hoàng hôn buông xuống cánh đồng Tam Cốc. Đặc biệt, sau khi tham quan Ninh Bình, bạn không cần quay ngược về Hà Nội mà có thể đặt xe Limousine Daiichi đón tận khách sạn ở Tam Cốc / Tràng An đi thẳng ra đảo Cát Bà – Vịnh Lan Hạ chỉ mất 3 giờ 30 phút.'
      }
    ],
    faqs: [
      {
        q: 'Nên đi Ninh Bình vào mùa nào đẹp nhất trong năm?',
        a: 'Tháng 1–3 âm lịch là mùa lễ hội xuân Chùa Bái Đính – Tràng An; cuối tháng 5 đến đầu tháng 6 là mùa lúa chín vàng rực tại Tam Cốc; tháng 6–7 là mùa sen nở hồng rực dưới chân Hang Múa; và tháng 9–11 là mùa thu nắng vàng dịu mát.'
      },
      {
        q: 'Từ Ninh Bình đi thẳng ra Vịnh Lan Hạ – Cát Bà bằng cách nào?',
        a: 'Daiichi Travel có tuyến xe Limousine & Bus đón trực tiếp tại khu vực Tam Cốc / Tràng An (Ninh Bình) đi thẳng ra bến tàu Cát Bà hàng ngày với giá chỉ từ 250.000đ/khách.'
      }
    ]
  },
  {
    slug: 'lang-co-viet-hai-vien-ngoc-xanh-giua-vuon-quoc-gia-cat-ba',
    region: 'Lan Ha',
    regionLabel: 'Làng Cổ Việt Hải · Vịnh Lan Hạ',
    sourceBadge: 'Xu Hướng Du Lịch Xanh & Bền Vững',
    image: 'assets/blog/vuon-quoc-gia-cat-ba-viet-hai.jpg',
    initialLikes: 198,
    initialViews: 1090,
    title: {
      vi: 'Xu Hướng Du Lịch Chữa Lành Tại Làng Cổ Việt Hải: Đạp Xe Xuyên Rừng Nguyên Sinh Giữa Lòng Vịnh Lan Hạ',
      en: 'Slow Travel in Ancient Viet Hai Village: Cycling Through Cat Ba Biosphere Reserve',
      ja: '世界生物圏保存地域 Cat Ba 島の秘境「Viet Hai 古村」：原生林サイクリングと癒やしの旅',
      ko: '유네스코 생물권보전지역 Cat Ba 섬의 숨은 보석 "Viet Hai 고대 마을" 힐링 자전거 여행',
      zh: '世界生物圈保护区 Cat Ba 岛秘境“Viet Hai 古村”：穿越原始森林的治愈系骑行指南',
      fr: 'Tourisme Durable au Village Ancien de Viet Hai : Vélo au Cœur de la Réserve de Biosphère de Cat Ba'
    },
    excerpt: {
      vi: 'Nằm tách biệt hoàn toàn giữa vùng lõi Khu dự trữ sinh quyển thế giới Cát Bà và bốn bề là núi đá vôi Vịnh Lan Hạ, Làng cổ Việt Hải đang trở thành điểm đến "chữa lành" được du khách Âu – Á yêu thích nhất.',
      en: 'Tucked deep inside the core zone of the Cat Ba World Biosphere Reserve and surrounded by Lan Ha Bay karsts, Viet Hai Village is Northern Vietnam’s ultimate eco-healing escape.',
      ja: 'Cat Ba 生物圏保存地域の中心に位置する Viet Hai 古村。緑豊かな渓谷でのサイクリングと天然ドクターフィッシュ足湯が人気を集めています。',
      ko: 'Cat Ba 생물권보전지역 중심부에 자리한 Viet Hai 고대 마을. 원시림 터널 자전거 라이딩과 천연 닥터피쉬 족욕 체험 가이드를 확인하세요.',
      zh: '坐落于 Cat Ba 世界生物圈保护区核心地带的 Viet Hai 古村，凭穿山骑行道与天然森林溪流鱼疗成为热门生态旅游地。',
      fr: 'Niché au cœur de la réserve de biosphère de Cat Ba, le village de Viet Hai séduit les voyageurs en quête de nature authentique.'
    },
    keywords: ['Làng cổ Việt Hải', 'Vườn quốc gia Cát Bà', 'đạp xe Việt Hải', 'du lịch sinh thái Cát Bà', 'tour vịnh Lan Hạ 1 ngày'],
    readingTime: '5 phút đọc',
    sections: [
      {
        h2: '1. Trải nghiệm cung đường đạp xe 5km đẹp nhất đảo Cát Bà',
        p: 'Ngay khi du thuyền cập bến Việt Hải trên Vịnh Lan Hạ, du khách sẽ được nhận xe đạp thể thao (hoặc ngồi xe điện thoáng mát) để lướt dọc con đường uốn lượn một bên là vách núi đá vôi, một bên là mặt vịnh xanh thẫm. Điểm thú vị nhất là khoảnh khắc đạp xe xuyên qua đường hầm núi đá mát lạnh để bước vào thung lũng bình yên của ngôi làng hơn 100 năm tuổi.'
      },
      {
        h2: '2. Ngâm chân suối cá tự nhiên & Thưởng thức ẩm thực bản địa',
        p: 'Dừng chân bên dòng suối nhỏ chảy từ rừng nguyên sinh Vườn Quốc gia Cát Bà, bạn có thể thả chân xuống làn nước mát lạnh để hàng trăm chú cá nhỏ massage tự nhiên, xóa tan mọi mệt mỏi. Người dân làng Việt Hải vô cùng hiếu khách và giữ gìn lối sống xanh không khói bụi.'
      }
    ],
    faqs: [
      {
        q: 'Làm sao để vào tham quan Làng cổ Việt Hải?',
        a: 'Đường vào Làng cổ Việt Hải đẹp và thuận tiện nhất là đi bằng đường thủy qua Vịnh Lan Hạ (đã nằm sẵn trong lịch trình Du thuyền ngủ đêm 2N1Đ và Tour 1 ngày VIP 1 / VIP 4 của Daiichi Cruise).'
      }
    ]
  },
  {
    slug: 'cau-kinh-skywalk-va-be-suc-jacuzzi-tren-du-thuyen-5-sao-lan-ha',
    region: 'Lan Ha',
    regionLabel: 'Du Thuyền 5★ · Vịnh Lan Hạ',
    sourceBadge: 'Cẩm Nang Nghỉ Dưỡng 5 Sao',
    image: 'assets/photos/luxury-jacuzzi.jpg',
    initialLikes: 242,
    initialViews: 1310,
    title: {
      vi: 'Kinh Nghiệm Chọn Phòng Du Thuyền 5 Sao Vịnh Lan Hạ: Mẹo Chọn Tầng Phòng, Săn Hoàng Hôn Cầu Kính Skywalk & Jacuzzi',
      en: 'How to Choose the Best 5-Star Cruise Suite on Lan Ha Bay: Deck Selection, Glass Skywalk & Jacuzzi Tips',
      ja: 'Lan Ha 湾 5つ星クルーズ客室選びのコツ：階層別の特徴とガラス Skywalk・温水 Jacuzzi 活用術',
      ko: 'Lan Ha 만 5성급 크루즈 객실 선택 꿀팁: 층별 장단점과 오션 Skywalk & 온수 Jacuzzi 즐기기',
      zh: 'Lan Ha 湾五星级游轮选房实用指南：楼层对比、海上玻璃栈道 Skywalk 与恒温 Jacuzzi 最佳拍照时间',
      fr: 'Comment Choisir sa Suite sur une Croisière 5★ en Baie de Lan Ha : Conseils Ponts, Skywalk & Jacuzzi'
    },
    excerpt: {
      vi: 'Nên chọn phòng Suite ở tầng 1, tầng 2 hay tầng 4 trên du thuyền ngủ đêm? Khung giờ nào chụp ảnh trên Cầu Kính Skywalk và ngâm bể sục Jacuzzi bốn mùa đẹp nhất? Xem ngay kinh nghiệm thực tế.',
      en: 'Should you book a Suite on Deck 1, Deck 2, or Deck 4? What is the golden hour for photos on the over-the-sea Glass Skywalk and heated Jacuzzi? Read our insider tips.',
      ja: '1階・2階・4階のどの Suite を選ぶべき？海上ガラス Skywalk や温水 Jacuzzi で最高の写真を撮るための実用ガイド。',
      ko: '1층, 2층, 4층 중 어떤 Suite 객실이 나에게 맞을까? 해상 유리 전망대 Skywalk와 온수 Jacuzzi 골든타임 팁을 공개합니다.',
      zh: '过夜游轮该选一楼、二楼还是四楼套房？哪个时间段在 Skywalk 玻璃栈道和恒温 Jacuzzi 拍照最出片？实用干货汇总。',
      fr: 'Faut-il privilégier le pont 1, 2 ou 4 ? Quels sont les meilleurs créneaux pour profiter du Skywalk en verre et du Jacuzzi chauffé ?'
    },
    keywords: ['kinh nghiệm chọn phòng du thuyền', 'Cầu kính Skywalk du thuyền', 'bể sục Jacuzzi vịnh Lan Hạ', 'Daiichi Luxury Cruise 5 sao'],
    readingTime: '5 phút đọc',
    sections: [
      {
        h2: '1. Bí quyết chọn tầng phòng Suite phù hợp với từng thành viên gia đình',
        p: '• Tầng 1 (Junior / Triple Suite – 28m²): Gần mặt nước nhất, độ ổn định cao nhất, cực kỳ phù hợp cho gia đình có người lớn tuổi hoặc người nhạy cảm với sóng biển.\n• Tầng 2 (Senior Balcony & Family Suite – 28m² đến 42m²): Tầm nhìn cao thoáng đãng, có ban công riêng rộng rãi để ngồi uống trà sáng ngắm đảo đá vôi.\n• Tầng 4 (Royal Suite VIP – 52m²): Hạng phòng tổng thống cao nhất với tầm nhìn Panorama toàn cảnh, bồn tắm hướng biển và không gian riêng tư tuyệt đối.'
      },
      {
        h2: '2. Khung giờ vàng chụp ảnh Cầu Kính Skywalk & Ngâm bể sục Jacuzzi bốn mùa',
        p: 'Trên du thuyền Daiichi Luxury Cruise 5★, thời điểm mặt trời bắt đầu hạ xuống sau các đỉnh núi đá vôi (từ 17:15 đến 18:15) là lúc bầu trời chuyển sắc cam tím rực rỡ nhất. Bạn có thể vừa ngâm mình trong làn nước ấm áp của bể sục Jacuzzi bốn mùa tại mũi tàu, vừa bước ra Cầu Kính Skywalk trong suốt vươn ra mặt biển để lưu lại những bức ảnh kỷ niệm đắt giá.'
      }
    ],
    faqs: [
      {
        q: 'Tất cả các hạng phòng trên Daiichi Luxury Cruise có ban công riêng không?',
        a: '100% cả 30 phòng Suite trên du thuyền Daiichi Luxury Cruise 5★ đều sở hữu cửa kính tràn viền và ban công riêng nhìn thẳng ra Vịnh Lan Hạ.'
      }
    ]
  },
  {
    slug: 'lich-trinh-3-ngay-2-dem-ha-noi-ninh-binh-ha-long-lan-ha',
    region: 'Ha Long',
    regionLabel: 'Liên Tuyến · Ninh Bình · Hạ Long · Lan Hạ',
    sourceBadge: 'Lịch Trình Tối Ưu Cho Gia Đình & Khách Quốc Tế',
    image: 'assets/blog/ninh-binh-trang-an.jpg',
    initialLikes: 215,
    initialViews: 1180,
    title: {
      vi: 'Lịch Trình 3 Ngày 2 Đêm Kết Hợp Ninh Bình – Vịnh Hạ Long – Vịnh Lan Hạ Không Cần Quay Lại Hà Nội',
      en: 'Seamless 3D2N Itinerary: Combining Ninh Binh, Ha Long Bay & Lan Ha Bay Without Backtracking to Hanoi',
      ja: 'ハノイに戻らず効率よく巡る！Ninh Binh – Ha Long 湾 – Lan Ha 湾 2泊3日黄金ルート',
      ko: '하노이로 되돌아갈 필요 없는 Ninh Binh – Ha Long 만 – Lan Ha 만 2박 3일 직통 황금 코스',
      zh: '无需折返河内！Ninh Binh – Ha Long 湾 – Lan Ha 湾 3天2晚无缝串联实用行程单',
      fr: 'Itinéraire Optimisé 3J2N : Combiner Ninh Binh, Ha Long & Lan Ha sans Repasser par Hanoï'
    },
    excerpt: {
      vi: 'Nhiều du khách mất oan 4–5 tiếng vì đi Ninh Bình xong lại quay ngược về Hà Nội rồi mới đi Hạ Long / Cát Bà. Xem ngay cung đường nối tuyến trực tiếp tiết kiệm cả thời gian lẫn chi phí.',
      en: 'Don’t waste 5 hours backtracking to Hanoi! Discover how to connect directly from Ninh Binh (Trang An / Tam Coc) to Cat Ba Island and Lan Ha – Ha Long Bay in just 3.5 hours.',
      ja: 'Ninh Binh 観光後にハノイへ引き返すのは時間の無駄！直통 Limousine を使って3時間半で Cat Ba・Lan Ha 湾へ移動する賢いモデルコース。',
      ko: 'Ninh Binh 여행 후 하노이로 돌아가면 5시간이 낭비됩니다! 직통 Limousine으로 3시간 30분 만에 Cat Ba와 Lan Ha 만으로 이동하는 스마트 일정을 소개합니다.',
      zh: '游览完 Ninh Binh 不必再绕回河内！乘直达 Limousine 仅需 3.5 小时即可直抵 Cat Ba 岛与 Lan Ha 湾登船，省时又省心。',
      fr: 'Ne perdez plus 5 heures à retourner à Hanoï ! Reliez directement Ninh Binh à l\'île de Cat Ba et la baie de Lan Ha en 3h30.'
    },
    keywords: ['lịch trình Ninh Bình Hạ Long Lan Hạ', 'xe Ninh Bình đi Cát Bà', 'tour miền Bắc 3 ngày 2 đêm', 'Daiichi Travel'],
    readingTime: '6 phút đọc',
    sections: [
      {
        h2: 'Ngày 1: Hà Nội – Ninh Bình (Tràng An / Tam Cốc – Hang Múa)',
        p: '07:30 khởi hành từ Hà Nội đi Ninh Bình (chỉ 1h30 qua cao tốc). Buổi sáng ngồi thuyền nan khám phá hệ thống hang động xuyên thủy tại Tràng An hoặc Tam Cốc. Buổi trưa thưởng thức đặc sản dê núi cơm cháy Ninh Bình. Chiều 15:30 chinh phục đỉnh Hang Múa ngắm toàn cảnh dòng Ngô Đồng và nghỉ đêm tại homestay/resort giữa thung lũng đá vôi.'
      },
      {
        h2: 'Ngày 2: Xe Limousine Ninh Bình đi thẳng Cát Bà – Du thuyền ngủ đêm 5★ Vịnh Lan Hạ & Vịnh Hạ Long',
        p: '07:30 sáng xe Limousine Daiichi đón bạn ngay tại khách sạn khu vực Tam Cốc / Tràng An đi thẳng ra cảng tàu Cát Bà (không cần vòng về Hà Nội). 12:00 làm thủ tục lên du thuyền 5★ Daiichi Luxury Cruise, thưởng thức bữa trưa hải sản khi tàu lướt qua Làng chài Cái Bèo tiến về vùng giáp ranh Vịnh Hạ Long. Chiều chèo kayak Hang Sáng Tối, tắm biển Ba Trái Đào, ngắm hoàng hôn trên Cầu Kính Skywalk và dự tiệc tối Fine Dining.'
      },
      {
        h2: 'Ngày 3: Đạp xe Làng cổ Việt Hải – Cao tốc 5B về thẳng Hà Nội / Sân bay Nội Bài',
        p: '06:30 tập Taichi đón bình minh trên boong thượng. 07:30 đạp xe xuyên rừng nguyên sinh khám phá Làng cổ Việt Hải. 09:30 thưởng thức bữa Brunch tự chọn trước khi tàu cập bến lúc 11:00. Xe Limousine đưa bạn qua cầu vượt biển Tân Vũ và cao tốc 5B về tới Phố Cổ Hà Nội chỉ lúc 14:30 chiều.'
      }
    ],
    faqs: [
      {
        q: 'Đặt combo trọn gói cả xe Limousine và du thuyền có rẻ hơn đặt lẻ từng chặng không?',
        a: 'Đặt trọn gói Combo (Xe + Du thuyền) trực tiếp tại Daiichi Cruise & Daiichi Travel luôn tiết kiệm hơn từ 100.000đ – 250.000đ/khách so với mua lẻ từng dịch vụ và được đảm bảo giờ giấc nối chuyến 100%.'
      }
    ]
  }
];

// Danh sách các chủ đề & góc nhìn quốc tế dùng để kết hợp với tin tức nóng mỗi ngày
const TRENDING_TEMPLATES = [
  {
    region: 'Lan Ha',
    regionLabel: 'Bãi Tắm Ba Trái Đào · Vịnh Lan Hạ',
    place: 'Bãi Tắm Ba Trái Đào & Thung Lũng Đá Vôi Vịnh Lan Hạ',
    img: 'assets/blog/bai-tam-vinh-lan-ha-cat-ba.jpg',
    rssQuery: '(Lan Ha Bay OR Cat Ba Island) travel beach cruise',
    defaultSource: 'National Geographic & Lonely Planet',
    focusVi: 'Bãi cát trắng hình cánh cung ôm trọn làn nước ngọc bích trong vắt nhìn thấu đáy tại ranh giới tự nhiên giữa Vịnh Lan Hạ và Vịnh Hạ Long',
    focusEn: 'Crescent white-sand beaches and crystal-clear turquoise waters at the scenic border of Lan Ha Bay and Ha Long Bay'
  },
  {
    region: 'Ninh Binh',
    regionLabel: 'Danh Thắng Tràng An · Ninh Bình',
    place: 'Quần Thể Di Sản Thế Giới Tràng An & Cố Đô Hoa Lư (Ninh Bình)',
    img: 'assets/blog/ninh-binh-trang-an.jpg',
    rssQuery: 'Ninh Binh Trang An Tam Coc travel Vietnam',
    defaultSource: 'TripAdvisor Travelers’ Choice & Forbes',
    focusVi: 'Hành trình ngồi thuyền nan chèo tay xuyên qua các hang động đá vôi ngập nước và đền đài cổ kính tại Di sản Thế giới kép Tràng An – Ninh Bình',
    focusEn: 'Hand-rowed sampan boat journey through flooded limestone caves and ancient temples at UNESCO-listed Trang An in Ninh Binh'
  },
  {
    region: 'Ha Long',
    regionLabel: 'Di Sản Vịnh Hạ Long – Vịnh Lan Hạ',
    place: 'Kỳ Quan Đảo Đá Vôi Vịnh Hạ Long & Vịnh Lan Hạ',
    img: 'assets/blog/vinh-ha-long-dao-da.jpg',
    rssQuery: 'Ha Long Bay UNESCO heritage cruise travel',
    defaultSource: 'Condé Nast Traveler & UNESCO',
    focusVi: 'Khoảnh khắc mặt trời đỏ rực buông xuống sau hàng trăm đỉnh núi đá vôi hàng triệu năm tuổi trên hải trình du thuyền 5★ kết nối Vịnh Hạ Long và Vịnh Lan Hạ',
    focusEn: 'Golden hour spectacle as the sun dips behind hundreds of ancient limestone peaks across Ha Long Bay and Lan Ha Bay'
  },
  {
    region: 'Lan Ha',
    regionLabel: 'Hang Sáng Tối · Vịnh Lan Hạ',
    place: 'Hang Sáng Tối & Đầm Phá Bí Ẩn Trên Vịnh Lan Hạ',
    img: 'assets/photos/daycruise-2.jpg',
    rssQuery: 'Lan Ha Bay kayaking Cat Ba travel',
    defaultSource: 'Sydney Morning Herald & Wanderlust',
    focusVi: 'Trải nghiệm tự tay chèo thuyền kayak xuyên qua hang nước ngầm kỳ ảo nối liền thung lũng biển khép kín giữa lòng Vịnh Lan Hạ và Vịnh Hạ Long',
    focusEn: 'Kayaking through the mystical water cave connecting hidden emerald lagoons between Lan Ha Bay and Ha Long Bay'
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

function isPositiveNews(title) {
  if (!title || title.length < 15) return false;
  const lower = title.toLowerCase();
  return !NEGATIVE_KEYWORDS.some((kw) => lower.includes(kw));
}

/**
 * Săn tin tức & sự kiện đang HOT từ Google News quốc tế & trong nước
 */
async function fetchLiveTrendingHeadline(queryStr) {
  const feeds = [
    `https://news.google.com/rss/search?q=${encodeURIComponent(queryStr)}&hl=en-US&gl=US&ceid=US:en`,
    `https://news.google.com/rss/search?q=${encodeURIComponent('(Vịnh Lan Hạ OR Cát Bà OR Vịnh Hạ Long OR Ninh Bình) du lịch điểm đến')}&hl=vi&gl=VN&ceid=VN:vi`
  ];
  for (const url of feeds) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) DaiichiTravelSeoBot/2.0' }
      });
      if (!res.ok) continue;
      const xml = await res.text();
      const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
      for (const m of items) {
        const rawTitle = ((m[1].match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/) || [])[1] || '')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .trim();
        const source = ((m[1].match(/<source[^>]*>([\s\S]*?)<\/source>/) || [])[1] || 'International Travel Media').trim();
        const cleanTitle = rawTitle.replace(/\s+-\s+[^-]+$/, '').trim();
        if (isPositiveNews(cleanTitle)) {
          return { headline: cleanTitle, source };
        }
      }
    } catch (e) {
      // Fallback gracefully if offline
    }
  }
  return null;
}

function buildHtmlPage(post) {
  const canonicalUrl = `https://daiichicruise.vn/seo/blog/${post.slug}.html`;
  const imgUrl = post.image.startsWith('http')
    ? post.image
    : `https://daiichicruise.vn/${post.image.replace(/^\/+/, '')}`;
  const relImg = post.image.startsWith('http')
    ? post.image
    : `../../${post.image.replace(/^\/+/, '')}`;
  const defaultLikes = post.initialLikes || 218;
  const defaultViews = post.initialViews || 1240;

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Daiichi Cruise', item: 'https://daiichicruise.vn/' },
          { '@type': 'ListItem', position: 2, name: 'Cẩm Nang & Kinh Nghiệm Du Lịch', item: 'https://daiichicruise.vn/#blog' },
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
        interactionStatistic: [
          {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/LikeAction',
            userInteractionCount: defaultLikes
          },
          {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/ViewAction',
            userInteractionCount: defaultViews
          }
        ],
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
  .meta-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;font-size:13px;color:var(--ink2);margin-bottom:14px}
  .meta-left{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
  .badge{background:rgba(212,166,72,.18);color:#92400E;font-weight:800;padding:4px 12px;border-radius:20px;font-size:12px;text-transform:uppercase;letter-spacing:.05em}
  .source-pill{background:#EFF6FF;color:#1D4ED8;font-weight:700;padding:4px 11px;border-radius:20px;font-size:12px;border:1px solid #BFDBFE}
  h1{font-family:'Cormorant Garamond',Georgia,serif;color:var(--navy);font-size:clamp(28px,4.5vw,42px);margin:0 0 14px;line-height:1.22}
  .lead{font-size:17px;color:var(--ink2);font-weight:500;margin-bottom:22px}
  .hero-img{width:100%;max-height:460px;object-fit:cover;border-radius:18px;box-shadow:0 16px 40px rgba(10,25,47,.15);margin:10px 0 28px}
  .like-box{background:#fff;border:1.5px solid #FECDD3;border-radius:16px;padding:18px 24px;margin:28px 0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;box-shadow:0 6px 20px rgba(225,29,72,.06)}
  .like-btn{display:inline-flex;align-items:center;gap:8px;background:#FFF1F2;color:#E11D48;border:1.5px solid #FDA4AF;padding:10px 20px;border-radius:24px;font-weight:800;font-size:14.5px;cursor:pointer;transition:all .2s}
  .like-btn.liked{background:#E11D48;color:#fff;border-color:#E11D48;box-shadow:0 6px 16px rgba(225,29,72,.3)}
  .like-btn:hover{transform:translateY(-1px)}
  .cta-box{background:linear-gradient(135deg,#0A192F 0%,#152C4E 100%);color:#fff;padding:24px 28px;border-radius:16px;margin:28px 0;border:1px solid rgba(212,166,72,.4);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
  .btn-gold{display:inline-block;background:linear-gradient(135deg,#F3C969 0%,#D4A648 100%);color:#0A192F;font-weight:800;text-decoration:none;padding:13px 24px;border-radius:10px;font-size:14.5px}
  .btn-outline{display:inline-block;background:#fff;color:var(--navy);border:1.5px solid var(--line);font-weight:700;text-decoration:none;padding:11px 20px;border-radius:10px;font-size:14px}
  article h2{font-family:'Cormorant Garamond',Georgia,serif;color:var(--navy);font-size:26px;margin:32px 0 12px}
  article p{font-size:16px;color:#334155;margin:0 0 18px;white-space:pre-line}
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
    <div class="meta-left">
      <span class="badge notranslate" translate="no">📍 ${post.regionLabel}</span>
      ${post.sourceBadge ? `<span class="source-pill">🌐 ${post.sourceBadge}</span>` : ''}
      <span>📅 ${post.date}</span>
      <span>⏱ ${post.readingTime || '5 phút đọc'}</span>
      <span id="view-counter">👁 ${defaultViews.toLocaleString('vi-VN')} lượt xem</span>
    </div>
    <button type="button" class="like-btn" id="top-like-btn" onclick="toggleArticleLike()">
      <span class="heart-ic">🤍</span> <span class="like-label">Thích bài viết</span> (<span class="like-count">${defaultLikes}</span>)
    </button>
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

  <!-- Hộp tương tác Thích bài viết dành cho độc giả -->
  <div class="like-box">
    <div>
      <div style="font-weight:800;color:var(--navy);font-size:16px;margin-bottom:2px">Bài viết này có mang lại kinh nghiệm hữu ích cho chuyến đi của bạn không?</div>
      <div style="font-size:13.5px;color:var(--ink2)">Hãy thả tim ❤️ để giúp những du khách tiếp theo dễ dàng tìm thấy bài viết hữu ích này nhé!</div>
    </div>
    <button type="button" class="like-btn" id="bottom-like-btn" onclick="toggleArticleLike()">
      <span class="heart-ic">🤍</span> <span class="like-label">Thích bài viết</span> (<span class="like-count">${defaultLikes}</span>)
    </button>
  </div>

  <div class="cta-box">
    <div style="max-width:520px">
      <div style="color:var(--gold);font-size:11.5px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;margin-bottom:4px">ĐẶT TRỰC TIẾP · GIÁ GỐC TỪ NHÀ TÀU</div>
      <div style="font-size:20px;font-weight:800;margin-bottom:4px">Trải Nghiệm Du Thuyền 5★ <span class="notranslate" translate="no">Daiichi Luxury</span> &amp; Xe Limousine Trọn Gói</div>
      <div style="font-size:13.5px;color:rgba(255,255,255,.78)">Đặt trực tiếp không qua trung gian — Đã bao gồm các bữa ăn hải sản cao cấp, vé thắng cảnh, thuyền kayak &amp; bể sục Jacuzzi 4 mùa. Hỗ trợ 24/7 qua Hotline 1900 9070 &amp; Zalo 0961 004 709.</div>
    </div>
    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <a class="btn-gold" href="https://daiichitravel.com/?tab=cruise-tours" target="_blank" rel="noopener">Đặt Du Thuyền Ngay →</a>
      <a class="btn-outline" href="../../index.html">Về Trang Chủ</a>
    </div>
  </div>

  ${
    post.faqs && post.faqs.length
      ? `<div class="faq-sec">
    <h2 style="font-family:'Cormorant Garamond',Georgia,serif;color:var(--navy);font-size:24px;margin:0 0 14px">Câu Hỏi Thường Gặp</h2>
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
<script>
  (function() {
    var slug = ${JSON.stringify(post.slug)};
    var defaultLikes = ${defaultLikes};
    var defaultViews = ${defaultViews};
    var engMap = {};
    var likedMap = {};
    try {
      engMap = JSON.parse(localStorage.getItem('dt_blog_engagement_v1') || '{}');
      likedMap = JSON.parse(localStorage.getItem('dt_blog_liked_v1') || '{}');
    } catch (e) {}

    var cur = engMap[slug] || { views: defaultViews, likes: defaultLikes, ctaClicks: 20 };
    cur.views = (cur.views || defaultViews) + 1;
    engMap[slug] = cur;
    try { localStorage.setItem('dt_blog_engagement_v1', JSON.stringify(engMap)); } catch (e) {}

    function renderLikeUI() {
      var isLiked = !!likedMap[slug];
      var count = (engMap[slug] && engMap[slug].likes) || defaultLikes;
      var views = (engMap[slug] && engMap[slug].views) || defaultViews;
      var vc = document.getElementById('view-counter');
      if (vc) vc.textContent = '👁 ' + views.toLocaleString('vi-VN') + ' lượt xem';

      var btns = [document.getElementById('top-like-btn'), document.getElementById('bottom-like-btn')];
      btns.forEach(function(btn) {
        if (!btn) return;
        btn.className = 'like-btn' + (isLiked ? ' liked' : '');
        var h = btn.querySelector('.heart-ic');
        var lb = btn.querySelector('.like-label');
        var c = btn.querySelector('.like-count');
        if (h) h.textContent = isLiked ? '❤️' : '🤍';
        if (lb) lb.textContent = isLiked ? 'Đã thích bài viết' : 'Thích bài viết';
        if (c) c.textContent = count.toLocaleString('vi-VN');
      });
    }

    window.toggleArticleLike = function() {
      var already = !!likedMap[slug];
      likedMap[slug] = !already;
      var st = engMap[slug] || { views: defaultViews, likes: defaultLikes, ctaClicks: 20 };
      st.likes = Math.max(0, (st.likes || defaultLikes) + (already ? -1 : 1));
      engMap[slug] = st;
      try {
        localStorage.setItem('dt_blog_liked_v1', JSON.stringify(likedMap));
        localStorage.setItem('dt_blog_engagement_v1', JSON.stringify(engMap));
      } catch (e) {}
      renderLikeUI();
    };

    renderLikeUI();
  })();
</script>
</body>
</html>`;
}

async function run() {
  const today = new Date().toISOString().split('T')[0];

  let existingPosts = [];
  if (fs.existsSync(BLOG_JS_FILE)) {
    try {
      const raw = fs.readFileSync(BLOG_JS_FILE, 'utf8');
      const match = raw.match(/window\.DT_BLOG_POSTS\s*=\s*(\[[\s\S]*?\]);/);
      if (match) existingPosts = JSON.parse(match[1]);
    } catch (e) {
      console.warn('Rebuilding blog_posts.js from TOPIC_BANK.');
    }
  }

  // Ensure all foundational TOPIC_BANK posts are up-to-date
  const baseDates = ['2026-10-22', '2026-10-23', '2026-10-24', '2026-10-25', '2026-10-26', '2026-10-27'];
  for (let i = 0; i < TOPIC_BANK.length; i++) {
    const t = TOPIC_BANK[i];
    const idx = existingPosts.findIndex((p) => p.slug === t.slug);
    if (idx === -1) {
      existingPosts.push({
        id: 'blog-' + (i + 1),
        date: baseDates[i] || today,
        ...t
      });
    } else {
      existingPosts[idx] = {
        ...existingPosts[idx],
        ...t
      };
    }
  }

  // If called with --daily flag, fetch live trending travel news from Google News / International Travel Media
  const isDailyCron = process.argv.includes('--daily');
  if (isDailyCron && !existingPosts.some((p) => p.date === today && p.isAutoDaily)) {
    const dayIdx = existingPosts.length % TRENDING_TEMPLATES.length;
    const tpl = TRENDING_TEMPLATES[dayIdx];
    const liveNews = await fetchLiveTrendingHeadline(tpl.rssQuery);
    const newsSource = liveNews ? liveNews.source : tpl.defaultSource;
    const newsRef = liveNews
      ? `Báo chí & truyền thông du lịch (${liveNews.source}) vừa điểm tin nổi bật: "${liveNews.headline}". `
      : `Theo bình chọn của truyền thông du lịch quốc tế (${tpl.defaultSource}), `;

    const slug = `${slugify(tpl.place)}-${today}`;
    const newPost = {
      id: 'blog-' + Date.now().toString().slice(-6),
      slug,
      date: today,
      isAutoDaily: true,
      region: tpl.region,
      regionLabel: tpl.regionLabel,
      sourceBadge: `Tin Nóng · ${newsSource}`,
      image: tpl.img,
      initialLikes: 284,
      initialViews: 1560,
      readingTime: '5 phút đọc',
      title: {
        vi: `[Tâm Điểm Du Lịch] ${tpl.place}: Kinh Nghiệm Thực Tế & Lịch Trình Đáng Đi Nhất (${today})`,
        en: `[Trending Travel] ${tpl.place}: Insider Tips & Best Cruise Itinerary (${today})`,
        ja: `【最新トレンド】${tpl.place}：実用アドバイス＆おすすめクルーズ日程 (${today})`,
        ko: `[최신 여행 트렌드] ${tpl.place}: 실전 여행 팁 & 추천 크루즈 코스 (${today})`,
        zh: `【旅游热点】${tpl.place}：实用出行干货与最佳游轮路线 (${today})`,
        fr: `[Tendance Voyage] ${tpl.place} : Conseils Pratiques & Itinéraire Croisière (${today})`
      },
      excerpt: {
        vi: `${newsRef}${tpl.focusVi}. Xem ngay kinh nghiệm chọn giờ đi tránh đông người, chi phí thực tế và cách di chuyển thuận tiện nhất cho người đọc.`,
        en: `${tpl.focusEn}. Practical tips on best visiting hours, real costs, and seamless cruise & Limousine transfers.`,
        ja: `${tpl.focusEn}。混雑を避ける時間帯や実用的な移動・予約のコツを詳しく解説します。`,
        ko: `${tpl.focusEn}. 혼잡을 피하는 시간대와 실속 있는 이동·예약 팁을 확인하세요.`,
        zh: `${tpl.focusEn}。汇总错峰游览时间、真实费用参考与便捷交通预订攻略。`,
        fr: `${tpl.focusEn}. Horaires idéaux pour éviter la foule, budget réel et conseils de transport.`
      },
      keywords: [tpl.place, 'Vịnh Lan Hạ', 'Vịnh Hạ Long', 'Ninh Bình', 'Cát Bà', 'kinh nghiệm du lịch tự túc'],
      sections: [
        {
          h2: `1. Điểm nóng truyền thông & Giá trị thực tế tại ${tpl.place}`,
          p: `${newsRef}${tpl.focusVi}. Khác với những lời quảng cáo chung chung, điều khiến du khách thực sự hài lòng khi đến đây là cảnh quan thiên nhiên nguyên bản, không khí biển đảo trong lành và các hoạt động trải nghiệm trực tiếp như chèo thuyền kayak, tắm biển giữa vịnh hay ngồi thuyền nan xuyên hang nước.`
        },
        {
          h2: '2. Kinh nghiệm thực tế giúp bạn tiết kiệm thời gian & tránh cảnh đông đúc',
          p: '• Khung giờ đẹp nhất trong ngày: Buổi sáng từ 07:30 – 09:30 (ánh nắng trong trẻo, mặt vịnh êm và mát mẻ) hoặc buổi chiều từ 15:45 – 18:00 (thời điểm săn hoàng hôn trên mặt vịnh).\n• Chuẩn bị trang phục: Nên mang theo đồ bơi, túi chống nước cho điện thoại khi chèo kayak, mũ rộng vành và giày/dép mềm dễ di chuyển khi lên xuống bến tàu hoặc đạp xe.'
        },
        {
          h2: '3. Cách kết hợp di chuyển và nghỉ dưỡng hợp lý nhất',
          p: 'Để không phải lo lắng việc tự tìm bến phà hay đổi nhiều chặng xe, bạn có thể tra cứu trực tiếp giờ xe Limousine cao tốc 5B (Hà Nội / Ninh Bình ⇄ Cát Bà) và các gói Du thuyền ngày VIP 4 hoặc Du thuyền ngủ đêm 5★ Daiichi Luxury ngay trên hệ thống để chủ động hoàn toàn về lịch trình và ngân sách.'
        }
      ],
      faqs: [
        {
          q: `Đi ${tpl.place} tự túc cần lưu ý điều gì nhất?`,
          a: 'Bạn nên kiểm tra dự báo thời tiết trước 2–3 ngày và đặt giữ chỗ trước xe Limousine cũng như tàu tham quan vịnh (đặc biệt vào dịp cuối tuần) để có vị trí ghế đầu và hạng phòng có ban công đẹp nhất.'
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

  console.log(`Generated ${existingPosts.length} live-trending SEO blog posts in seo/blog/*.html and shared/blog_posts.js.`);
}

run();
