/* ============================================================
   DAIICHI TRAVEL — i18n (vi, en, ja, ko, zh, fr)
   Auto-detects device language; manual override persisted.
   ============================================================ */
(function () {
  const LANGS = [
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
  ];

  // key: [vi, en, ja, ko, zh, fr]
  const D = {
    brand_tagline: ['Một nền tảng — Xe · Tàu · Du thuyền · Tour', 'One platform — Bus · Boat · Cruise · Tours', 'ワンプラットフォーム — バス・船・クルーズ・ツアー', '하나의 플랫폼 — 버스 · 보트 · 크루즈 · 투어', '一个平台 — 巴士·船·游轮·旅游', 'Une plateforme — Bus · Bateau · Croisière · Circuits'],
    nav_bus: ['Xe & Limousine', 'Bus & Limousine', 'バス＆リムジン', '버스 & 리무진', '巴士与豪华车', 'Bus & Limousine'],
    nav_day: ['Du thuyền ngày', 'Day Cruises', 'デイクルーズ', '데이 크루즈', '日间游轮', 'Croisières du jour'],
    nav_night: ['Du thuyền ngủ đêm', 'Overnight Cruises', '宿泊クルーズ', '1박 크루즈', '过夜游轮', 'Croisières de nuit'],
    nav_tour: ['Tour trọn gói', 'Package Tours', 'パッケージツアー', '패키지 투어', '跟团游', 'Circuits tout compris'],
    nav_mybooking: ['Tra cứu vé', 'My Booking', '予約確認', '예약 조회', '查询订单', 'Ma réservation'],
    nav_agent: ['Đại lý & Quản trị', 'Agents & Admin', '代理店・管理', '대리점 & 관리자', '代理与管理', 'Agents & Admin'],
    hero_title: ['Vịnh Lan Hạ bắt đầu từ một cú chạm', 'Lan Ha Bay, one tap away', 'ランハ湾へ、ワンタップで', '란하베이, 한 번의 터치로', '兰哈湾，一触即达', 'La baie de Lan Ha, à portée de main'],
    hero_sub: ['Đặt xe limousine, tàu cao tốc, du thuyền ngày & du thuyền ngủ đêm 5★ — giá niêm yết, xác nhận tức thì.', 'Book limousine buses, speedboats, day cruises & 5★ overnight cruises — official rates, instant confirmation.', 'リムジンバス、高速船、デイクルーズ、5つ星宿泊クルーズを公式料金で即時予約。', '리무진 버스, 쾌속선, 데이 크루즈, 5성급 크루즈 — 공식 요금, 즉시 확정.', '预订豪华巴士、快艇、日间游轮和五星级过夜游轮 — 官方价格，即时确认。', 'Réservez bus limousine, bateaux rapides et croisières 5★ — tarifs officiels, confirmation immédiate.'],
    tab_bus: ['Xe & Limousine', 'Bus & Limo', 'バス', '버스', '巴士', 'Bus'],
    tab_day: ['Du thuyền ngày', 'Day Cruise', 'デイクルーズ', '데이 크루즈', '日间游轮', 'Croisière du jour'],
    tab_night: ['Du thuyền ngủ đêm', 'Overnight Cruise', '宿泊クルーズ', '1박 크루즈', '过夜游轮', 'Croisière de nuit'],
    tab_tour: ['Tour combo', 'Combo Tours', 'コンボツアー', '콤보 투어', '组合套餐', 'Combos'],
    s_from: ['Điểm đi', 'From', '出発地', '출발지', '出发地', 'Départ'],
    s_to: ['Điểm đến', 'To', '目的地', '도착지', '目的地', 'Arrivée'],
    s_date: ['Ngày đi', 'Departure date', '出発日', '출발일', '出发日期', 'Date de départ'],
    s_return: ['Ngày về (khứ hồi)', 'Return (optional)', '復路（任意）', '귀국일 (선택)', '返程（可选）', 'Retour (optionnel)'],
    s_pax: ['Hành khách', 'Passengers', '人数', '인원', '乘客', 'Passagers'],
    s_search: ['Tìm chuyến', 'Search', '検索', '검색', '搜索', 'Rechercher'],
    s_date_cruise: ['Ngày khởi hành', 'Cruise date', '乗船日', '출항일', '出航日期', 'Date de croisière'],
    s_nights: ['Hành trình', 'Itinerary', '行程', '일정', '行程', 'Itinéraire'],
    from_price: ['từ', 'from', '〜', '부터', '低至', 'dès'],
    per_person: ['/khách', '/person', '/人', '/인', '/人', '/pers.'],
    per_cabin: ['/phòng', '/cabin', '/室', '/객실', '/间', '/cabine'],
    book_now: ['Đặt ngay', 'Book now', '予約する', '예약하기', '立即预订', 'Réserver'],
    view_detail: ['Xem chi tiết', 'View details', '詳細を見る', '상세 보기', '查看详情', 'Voir détails'],
    low_season: ['Mùa thấp', 'Low season', 'ローシーズン', '비수기', '淡季', 'Basse saison'],
    high_season: ['Mùa cao', 'High season', 'ハイシーズン', '성수기', '旺季', 'Haute saison'],
    incl_vat: ['Giá đã gồm VAT', 'VAT included', '税込価格', 'VAT 포함', '含税价', 'TVA incluse'],
    free_pickup: ['Đón trả miễn phí trung tâm', 'Free central pickup', '中心部送迎無料', '시내 무료 픽업', '市中心免费接送', 'Transfert centre-ville offert'],
    duration: ['Hành trình', 'Duration', '所要時間', '소요 시간', '时长', 'Durée'],
    seats_left: ['chỗ trống', 'seats left', '残席', '잔여석', '剩余座位', 'places restantes'],
    select_seats: ['Chọn ghế', 'Select seats', '座席選択', '좌석 선택', '选择座位', 'Choisir les sièges'],
    select_cabin: ['Chọn phòng', 'Select cabin', '客室選択', '객실 선택', '选择客舱', 'Choisir la cabine'],
    continue_: ['Tiếp tục', 'Continue', '次へ', '계속', '继续', 'Continuer'],
    back: ['Quay lại', 'Back', '戻る', '뒤로', '返回', 'Retour'],
    total: ['Tổng cộng', 'Total', '合計', '합계', '总计', 'Total'],
    pay: ['Thanh toán', 'Pay', '支払う', '결제', '支付', 'Payer'],
    confirm: ['Xác nhận', 'Confirm', '確認', '확인', '确认', 'Confirmer'],
    passenger_info: ['Thông tin hành khách', 'Passenger details', '乗客情報', '승객 정보', '乘客信息', 'Détails passager'],
    full_name: ['Họ và tên', 'Full name', '氏名', '성명', '姓名', 'Nom complet'],
    phone: ['Số điện thoại', 'Phone', '電話番号', '전화번호', '电话', 'Téléphone'],
    email: ['Email', 'Email', 'メール', '이메일', '邮箱', 'E-mail'],
    pickup_point: ['Điểm đón', 'Pickup point', '乗車地点', '픽업 지점', '上车点', 'Point de départ'],
    dropoff_point: ['Điểm trả', 'Drop-off point', '降車地点', '하차 지점', '下车点', 'Point d\u2019arrivée'],
    note: ['Ghi chú', 'Note', '備考', '메모', '备注', 'Remarque'],
    payment_method: ['Phương thức thanh toán', 'Payment method', '支払方法', '결제 수단', '支付方式', 'Mode de paiement'],
    pay_vnpay: ['VNPay / QR ngân hàng', 'VNPay / Bank QR', 'VNPay / 銀行QR', 'VNPay / 은행 QR', 'VNPay / 银行二维码', 'VNPay / QR bancaire'],
    pay_momo: ['Ví MoMo / ZaloPay', 'MoMo / ZaloPay', 'MoMo / ZaloPay', 'MoMo / ZaloPay', 'MoMo / ZaloPay 钱包', 'MoMo / ZaloPay'],
    pay_card: ['Thẻ quốc tế Visa / Master', 'Visa / Mastercard', 'クレジットカード', '신용카드', '国际信用卡', 'Carte Visa / Mastercard'],
    pay_later: ['Thanh toán tại quầy / trả sau', 'Pay at counter / later', '窓口払い・後払い', '현장 결제 / 후불', '柜台支付/后付', 'Paiement au comptoir'],
    pay_success: ['Thanh toán thành công!', 'Payment successful!', '支払い完了！', '결제 완료!', '支付成功！', 'Paiement réussi !'],
    e_ticket: ['Vé điện tử', 'E-ticket', '電子チケット', 'E-티켓', '电子票', 'Billet électronique'],
    show_qr: ['Xuất trình mã QR khi lên xe / tàu', 'Show this QR when boarding', '乗車・乗船時にQRを提示', '탑승 시 QR 제시', '登车/登船时出示二维码', 'Présentez ce QR à l\u2019embarquement'],
    booking_code: ['Mã đặt chỗ', 'Booking code', '予約コード', '예약 코드', '预订编号', 'Code de réservation'],
    child_policy: ['Chính sách trẻ em', 'Child policy', '子供料金', '아동 정책', '儿童政策', 'Politique enfants'],
    itinerary: ['Lịch trình', 'Itinerary', '行程', '일정', '行程', 'Itinéraire'],
    amenities: ['Tiện ích', 'Amenities', '設備', '편의시설', '设施', 'Équipements'],
    gallery: ['Hình ảnh', 'Gallery', 'ギャラリー', '갤러리', '相册', 'Galerie'],
    cabins: ['Hạng phòng', 'Suite categories', '客室タイプ', '객실 등급', '客房类别', 'Catégories de suites'],
    capacity: ['Sức chứa', 'Capacity', '定員', '정원', '可住', 'Capacité'],
    popular_routes: ['Tuyến phổ biến', 'Popular routes', '人気路線', '인기 노선', '热门线路', 'Trajets populaires'],
    our_fleet: ['Đội xe & tàu', 'Our fleet', '車両・船舶', '차량 & 선박', '车队与船队', 'Notre flotte'],
    why_us: ['Vì sao chọn Daiichi', 'Why Daiichi', 'Daiichiが選ばれる理由', 'Daiichi를 선택하는 이유', '为何选择 Daiichi', 'Pourquoi Daiichi'],
    trip_go: ['Chiều đi', 'Outbound', '往路', '가는 편', '去程', 'Aller'],
    trip_sort: ['Sắp xếp', 'Sort', '並び替え', '정렬', '排序', 'Trier'],
    trip_early: ['Giờ sớm nhất', 'Earliest', '早い順', '이른 순', '最早', 'Plus tôt'],
    trip_cheap: ['Giá thấp nhất', 'Cheapest', '安い順', '저렴한 순', '最便宜', 'Moins cher'],
    veh_type: ['Loại xe', 'Vehicle type', '車種', '차량 유형', '车型', 'Type de véhicule'],
    all: ['Tất cả', 'All', 'すべて', '전체', '全部', 'Tous'],
    no_trips: ['Không có chuyến phù hợp. Thử đổi bộ lọc hoặc ngày đi.', 'No trips match. Try other filters or dates.', '該当する便がありません。条件を変更してください。', '일치하는 운행이 없습니다. 필터를 변경해 보세요.', '没有匹配的班次，请更改筛选条件。', 'Aucun trajet. Modifiez vos filtres.'],
    step_trip: ['Chuyến', 'Trip', '便', '운행', '班次', 'Trajet'],
    step_seats: ['Ghế', 'Seats', '座席', '좌석', '座位', 'Sièges'],
    step_info: ['Thông tin', 'Details', '情報', '정보', '信息', 'Détails'],
    step_pay: ['Thanh toán', 'Payment', '支払い', '결제', '支付', 'Paiement'],
    seat_avail: ['Trống', 'Available', '空席', '가능', '可选', 'Libre'],
    seat_sold: ['Đã bán', 'Sold', '販売済', '판매됨', '已售', 'Vendu'],
    seat_yours: ['Đang chọn', 'Selected', '選択中', '선택됨', '已选', 'Choisi'],
    holiday_fee: ['Phụ thu lễ – Tết: 30.000đ/khách/lượt', 'Holiday surcharge: 30,000đ/pax/way', '祝日追加料金: 30,000đ/人', '공휴일 추가 요금: 30,000đ/인', '节假日附加费: 30,000đ/人', 'Supplément fériés : 30 000đ/pers.'],
    free_cancel: ['Hoàn hủy miễn phí trước 12h khởi hành', 'Free cancellation up to 12h before departure', '出発12時間前まで無料キャンセル', '출발 12시간 전까지 무료 취소', '出发前12小时免费取消', 'Annulation gratuite jusqu\u2019à 12h avant'],
    confirm_instant: ['Xác nhận tức thì', 'Instant confirmation', '即時確定', '즉시 확정', '即时确认', 'Confirmation immédiate'],
    support_247: ['Hỗ trợ 24/7 · 096 100 4709', '24/7 support · +84 96 100 4709', '24時間サポート · +84 96 100 4709', '연중무휴 지원 · +84 96 100 4709', '24/7 客服 · +84 96 100 4709', 'Assistance 24h/24 · +84 96 100 4709'],
    official_site: ['Website chính thức — giá tốt nhất', 'Official site — best rate guaranteed', '公式サイト — ベストレート保証', '공식 사이트 — 최저가 보장', '官方网站 — 最优价格保证', 'Site officiel — meilleur tarif garanti'],
    download_ticket: ['Lưu vé', 'Save ticket', 'チケット保存', '티켓 저장', '保存车票', 'Enregistrer'],
    new_booking: ['Đặt vé mới', 'New booking', '新規予約', '새 예약', '新预订', 'Nouvelle réservation'],
    lookup_title: ['Tra cứu đặt chỗ', 'Find my booking', '予約検索', '예약 찾기', '查询预订', 'Retrouver ma réservation'],
    lookup_hint: ['Nhập mã đặt chỗ (VD: DT26-8X4K2)', 'Enter booking code (e.g. DT26-8X4K2)', '予約コードを入力', '예약 코드 입력', '输入预订编号', 'Saisissez le code'],
    lookup_notfound: ['Không tìm thấy. Kiểm tra lại mã đặt chỗ.', 'Not found. Check your code.', '見つかりません。', '찾을 수 없습니다.', '未找到。', 'Introuvable.'],
    footer_co: ['Công ty TNHH Du lịch Daiichi · Daiichi Travel Co., Ltd', 'Daiichi Travel Co., Ltd', 'Daiichi Travel Co., Ltd', 'Daiichi Travel Co., Ltd', 'Daiichi Travel 有限公司', 'Daiichi Travel Co., Ltd'],
    footer_merge: ['daiichitravel.vn · daiichitravel.com · lanhacruises.vn · daiichibus.vn — nay là một.', 'daiichitravel.vn · daiichitravel.com · lanhacruises.vn · daiichibus.vn — now one platform.', '4つのサイトが1つに統合されました。', '4개 웹사이트가 하나로 통합되었습니다.', '四个网站现已合并为一。', 'Quatre sites, désormais une seule plateforme.'],
    night1: ['2 ngày 1 đêm', '2 days 1 night', '1泊2日', '1박 2일', '两天一夜', '2 jours 1 nuit'],
    night2: ['3 ngày 2 đêm', '3 days 2 nights', '2泊3日', '2박 3일', '三天两夜', '3 jours 2 nuits'],
    adults: ['Người lớn', 'Adults', '大人', '성인', '成人', 'Adultes'],
    children: ['Trẻ em (2–11)', 'Children (2–11)', '子供 (2–11)', '아동 (2–11)', '儿童 (2–11)', 'Enfants (2–11)'],
    children_24: ['Trẻ 2–4 tuổi', 'Children 2–4', '子供 2–4歳', '아동 2–4세', '儿童 2–4岁', 'Enfants 2–4 ans'],
    children_511: ['Trẻ 5–11 tuổi', 'Children 5–11', '子供 5–11歳', '아동 5–11세', '儿童 5–11岁', 'Enfants 5–11 ans'],
    infant_free: ['Trẻ < 2 tuổi: miễn phí (không cần chọn)', 'Under 2: free (no ticket needed)', '2歳未満：無料（選択不要）', '2세 미만: 무료(선택 불필요)', '2岁以下：免费（无需选择）', 'Moins de 2 ans : gratuit (sans billet)'],
    email_invalid: ['Email chưa đúng định dạng', 'Invalid email format', 'メールアドレスの形式が正しくありません', '이메일 형식이 올바르지 않습니다', '邮箱格式不正确', 'Adresse e-mail invalide'],
    email_mean: ['Ý bạn là', 'Did you mean', 'もしかして', '혹시', '您是否想输入', 'Vouliez-vous dire'],
    departs: ['Khởi hành', 'Departs', '出発', '출발', '出发', 'Départ'],
    boarding: ['Giờ khởi hành', 'Departure', '出発時刻', '출발 시간', '出发时间', 'Heure de départ'],
    meals_incl: ['Gồm bữa ăn', 'Meals included', '食事付き', '식사 포함', '含餐', 'Repas inclus'],
    ends_in: ['kết thúc sau', 'ends in', '終了まで', '종료까지', '距结束', 'se termine dans'],
    trip_back: ['Chiều về', 'Return leg', '復路', '오는 편', '返程', 'Retour'],
    roundtrip_off: ['Giảm 5% khứ hồi', 'Round-trip −5%', '往復 −5%', '왕복 −5%', '往返 −5%', 'Aller-retour −5 %'],
    rt_select_back: ['Chọn chuyến chiều về', 'Choose your return trip', '復路の便を選択', '돌아오는 편 선택', '选择返程班次', 'Choisissez le retour'],
    promo_code: ['Mã khuyến mãi', 'Promo code', 'クーポンコード', '프로모션 코드', '优惠码', 'Code promo'],
    apply: ['Áp dụng', 'Apply', '適用', '적용', '应用', 'Appliquer'],
    promo_invalid: ['Mã không hợp lệ hoặc hết hạn', 'Invalid or expired code', '無効または期限切れのコード', '유효하지 않은 코드', '无效或已过期', 'Code invalide ou expiré'],
    promo_applied: ['Đã áp dụng', 'Applied', '適用済み', '적용됨', '已应用', 'Appliqué'],
    holiday_auto: ['Phụ thu lễ – Tết', 'Holiday surcharge', '祝日追加料金', '공휴일 추가 요금', '节假日附加费', 'Supplément férié'],
    hold_seats: ['Ghế đang được giữ', 'Seats held for', '座席確保中', '좌석 확보', '座位保留', 'Sièges réservés'],
    lookup_by_phone: ['Tra cứu bằng SĐT', 'Find by phone', '電話番号で検索', '전화번호로 조회', '按手机号查询', 'Par téléphone'],
    lookup_by_code: ['Tra cứu bằng mã', 'Find by code', 'コードで検索', '코드로 조회', '按编号查询', 'Par code'],
    send_otp: ['Gửi mã OTP', 'Send OTP', 'OTP送信', 'OTP 전송', '发送验证码', 'Envoyer OTP'],
    otp_hint: ['Nhập mã OTP đã gửi qua SMS/Zalo', 'Enter the OTP sent by SMS/Zalo', 'SMSで届いたOTPを入力', 'SMS로 받은 OTP 입력', '输入短信验证码', 'Saisissez le code OTP'],
    legal_link: ['Chính sách & Điều khoản', 'Policies & Terms', '規約・ポリシー', '약관 및 정책', '条款与政策', 'Conditions & politiques'],
    weather_policy: ['Hoàn 100% hoặc đổi ngày nếu cảng vụ cấm tàu (thời tiết xấu)', '100% refund or free date change if sailing is banned (bad weather)', '欠航時は全額返金または日程変更', '출항 금지 시 100% 환불 또는 날짜 변경', '如港务局禁航，全额退款或免费改期', 'Remboursement 100 % ou report si navigation interdite'],
    cart: ['Giỏ hàng', 'Cart', 'カート', '장바구니', '购物车', 'Panier'],
    add_cart: ['Thêm vào giỏ', 'Add to cart', 'カートに追加', '담기', '加入购物车', 'Ajouter au panier'],
    checkout_all: ['Thanh toán cả giỏ', 'Checkout all', 'まとめて支払う', '전체 결제', '全部结算', 'Tout payer'],
    empty_cart: ['Giỏ hàng đang trống', 'Your cart is empty', 'カートは空です', '장바구니가 비어 있습니다', '购物车为空', 'Votre panier est vide'],
    remove: ['Xoá', 'Remove', '削除', '삭제', '移除', 'Retirer'],
    upsell: ['Thường được đặt kèm', 'Frequently booked together', 'よく一緒に予約されます', '함께 자주 예약', '常一起预订', 'Souvent réservés ensemble'],
    my_account: ['Tài khoản', 'Account', 'アカウント', '계정', '账户', 'Compte'],
    my_trips: ['Vé của tôi', 'My trips', 'マイチケット', '내 티켓', '我的车票', 'Mes billets'],
    login: ['Đăng nhập', 'Sign in', 'ログイン', '로그인', '登录', 'Connexion'],
    logout: ['Đăng xuất', 'Sign out', 'ログアウト', '로그아웃', '退出', 'Déconnexion'],
    points: ['Điểm thưởng', 'Points', 'ポイント', '포인트', '积分', 'Points'],
    reviews: ['Đánh giá từ khách đã đi', 'Reviews from verified guests', '体験者レビュー', '실제 이용 후기', '真实旅客评价', 'Avis de clients vérifiés'],
    verified_bk: ['Đã xác thực vé', 'Verified booking', '予約確認済み', '예약 인증됨', '已验证预订', 'Réservation vérifiée'],
    pay_failed: ['Thanh toán không thành công', 'Payment failed', '決済に失敗しました', '결제에 실패했습니다', '支付失败', 'Échec du paiement'],
    pay_failed_hint: ['Thẻ bị từ chối hoặc kết nối gián đoạn. Đừng lo — ghế của bạn được giữ thêm 5 phút để thử lại.', 'Card declined or connection lost. Don\u2019t worry — your seats are held for 5 more minutes so you can retry.', 'カードが拒否されたか接続が中断されました。座席はあと5分間確保されますのでご安心ください。', '카드가 거절되었거나 연결이 끊겼습니다. 걱정 마세요 — 좌석이 5분 더 유지됩니다.', '银行卡被拒或连接中断。别担心——座位将再保留5分钟供您重试。', 'Carte refusée ou connexion interrompue. Vos sièges restent bloqués 5 minutes pour réessayer.'],
    retry_pay: ['Thử lại', 'Try again', '再試行', '다시 시도', '重试', 'Réessayer'],
    change_method: ['Đổi phương thức khác', 'Use another method', '別の支払方法を使う', '다른 결제수단 사용', '更换支付方式', 'Autre moyen de paiement'],
    pay_support: ['Vẫn lỗi? Gọi/Zalo 096 100 4709 — giữ chỗ qua điện thoại.', 'Still failing? Call/Zalo +84 96 100 4709 — we\u2019ll hold your seats by phone.', '解決しない場合は +84 96 100 4709 へ。お電話でお席を確保します。', '계속 실패하면 +84 96 100 4709로 연락주세요. 전화로 좌석을 확보해 드립니다.', '仍然失败？致电 +84 96 100 4709，我们为您电话保留座位。', 'Toujours bloqué ? Appelez le +84 96 100 4709.'],
    nl_title: ['Nhận ưu đãi trước mọi người', 'Get deals before everyone else', '最新セールをいち早くお届け', '특가 소식을 가장 먼저 받아보세요', '抢先获取专属优惠', 'Recevez nos offres en avant-première'],
    nl_sub: ['Flash sale & mã giảm mùa cao điểm — qua email hoặc Zalo, 1–2 lần/tháng, huỷ bất cứ lúc nào.', 'Flash sales & peak-season codes by email or Zalo — 1–2×/month, unsubscribe anytime.', 'フラッシュセールやクーポンをメールでお届け（月1〜2回、いつでも解除可）。', '플래시 세일·할인 코드를 이메일로 (월 1–2회, 언제든 해지).', '限时特卖与折扣码，每月1–2次，可随时退订。', 'Ventes flash et codes promo par e-mail — 1 à 2 fois par mois, désinscription libre.'],
    nl_ph: ['Email hoặc SĐT Zalo', 'Email or Zalo number', 'メールアドレス', '이메일 또는 전화번호', '邮箱或Zalo号码', 'E-mail ou numéro Zalo'],
    nl_btn: ['Đăng ký', 'Subscribe', '登録する', '구독', '订阅', 'S\u2019abonner'],
    nl_done: ['✓ Đã đăng ký! Ưu đãi sớm nhất sẽ đến hộp thư của bạn.', '✓ Subscribed! Early deals are on their way.', '✓ 登録ありがとうございます！', '✓ 구독 완료! 감사합니다.', '✓ 订阅成功，感谢您的关注！', '✓ Inscrit ! À très bientôt.'],
    inv_title: ['Xuất hoá đơn công ty (VAT)', 'Company VAT invoice', '会社用インボイス（VAT）', '세금계산서 발행', '开具公司发票', 'Facture TVA entreprise'],
    inv_company: ['Tên công ty', 'Company name', '会社名', '회사명', '公司名称', 'Raison sociale'],
    inv_tax: ['Mã số thuế', 'Tax code', '税番号', '사업자등록번호', '税号', 'N° fiscal'],
    inv_email: ['Email nhận hoá đơn', 'Invoice e-mail', '請求書送付先', '수신 이메일', '接收邮箱', 'E-mail de facturation'],
    cancel_ticket: ['Huỷ vé', 'Cancel booking', 'キャンセル', '예약 취소', '取消订单', 'Annuler'],
    change_trip: ['Đổi chuyến', 'Change trip', '便を変更', '편 변경', '改签', 'Modifier'],
    cancel_free: ['Còn hơn 12 giờ trước giờ đi — hoàn 100% về phương thức thanh toán gốc trong 5–7 ngày làm việc.', 'More than 12h before departure — 100% refund to your original payment method in 5–7 working days.', '出発12時間前まで — 全額を5〜7営業日で返金します。', '출발 12시간 전 — 5–7영업일 내 100% 환불됩니다.', '距出发超过12小时 — 5–7个工作日内全额原路退款。', 'Plus de 12 h avant le départ — remboursement intégral sous 5 à 7 jours ouvrés.'],
    cancel_late: ['Dưới 12 giờ trước giờ đi — không hoàn tiền; được đổi sang chuyến khác miễn phí 1 lần.', 'Within 12h of departure — non-refundable; one free change to another trip.', '出発12時間以内 — 返金不可。1回まで無料で便変更できます。', '출발 12시간 이내 — 환불 불가, 1회 무료 변경 가능합니다.', '距出发不足12小时 — 不可退款，可免费改签一次。', 'Moins de 12 h avant le départ — non remboursable ; un changement gratuit.'],
    cancel_cruise_full: ['Còn hơn 7 ngày trước ngày khởi hành — hoàn 100% về phương thức thanh toán gốc trong 5–7 ngày làm việc.', 'More than 7 days before departure — 100% refund to your original payment method in 5–7 working days.', '出発7日前まで — 全額を5〜7営業日で返金します。', '출발 7일 전 — 5–7영업일 내 100% 환불됩니다.', '距出发超过7天 — 5–7个工作日内全额原路退款。', 'Plus de 7 jours avant le départ — remboursement intégral sous 5 à 7 jours ouvrés.'],
    cancel_cruise_half: ['Còn 3–7 ngày trước ngày khởi hành — hoàn 50% giá trị booking.', '3–7 days before departure — 50% refund.', '出発3〜7日前 — 50%を返金します。', '출발 3–7일 전 — 50% 환불됩니다.', '距出发3–7天 — 退款50%。', '3 à 7 jours avant le départ — remboursement de 50 %.'],
    cancel_cruise_none: ['Dưới 3 ngày trước ngày khởi hành — không hoàn tiền; được đổi ngày miễn phí 1 lần. Trường hợp cấm biển: hoàn 100%.', 'Within 3 days of departure — non-refundable; one free date change. Weather ban: 100% refund.', '出発3日以内 — 返金不可。1回まで無料で日付変更できます。悪天候による欠航時は全額返金。', '출발 3일 이내 — 환불 불가, 1회 무료 날짜 변경 가능합니다. 기상 통제 시 100% 환불.', '距出发不足3天 — 不可退款，可免费改期一次。海上禁航：全额退款。', 'Moins de 3 jours avant le départ — non remboursable ; un changement de date gratuit. Interdiction maritime : remboursement intégral.'],
    refund_half_note: ['Hoàn 50%', '50% refund', '50%返金', '50% 환불', '退款50%', 'Remboursement 50 %'],
    confirm_cancel: ['Xác nhận huỷ vé', 'Confirm cancellation', 'キャンセル確定', '취소 확정', '确认取消', 'Confirmer l\u2019annulation'],
    keep_ticket: ['Giữ vé', 'Keep booking', '戻る', '예약 유지', '保留订单', 'Garder'],
    cancelled_done: ['Đã huỷ vé. Tiền hoàn về phương thức gốc trong 5–7 ngày làm việc — có SMS/Zalo xác nhận.', 'Booking cancelled. Refund in 5–7 working days — confirmation sent by SMS/Zalo.', 'キャンセルしました。5〜7営業日で返金されます。', '취소되었습니다. 5–7영업일 내 환불됩니다.', '已取消。退款将在5–7个工作日内到账。', 'Annulé. Remboursement sous 5 à 7 jours ouvrés.'],
    charter_title: ['Thuê nguyên chuyến', 'Private charter', '貸切チャーター', '전세 예약', '包车 · 包船', 'Affrètement privé'],
    charter_sub: ['Nguyên xe limousine, nguyên tàu hoặc nguyên du thuyền — cho đám cưới, team building, MICE. Báo giá trong 2 giờ làm việc.', 'A whole limousine, boat or cruise ship — for weddings, team building, MICE. Quote within 2 working hours.', 'リムジン・船・クルーズの貸切 — 結婚式や社員旅行に。2営業時間以内にお見積り。', '리무진·보트·크루즈 전세 — 웨딩, 워크숍, MICE. 2시간 내 견적.', '整车、整船或整艘游轮 — 婚礼、团建、会奖旅游。2个工作小时内报价。', 'Limousine, bateau ou navire entier — mariages, séminaires, MICE. Devis sous 2 h ouvrées.'],
    charter_veh: ['Phương tiện muốn thuê', 'Vehicle / vessel', '車両・船舶', '차량/선박', '租用类型', 'Véhicule / navire'],
    charter_send: ['Gửi yêu cầu báo giá', 'Request a quote', '見積を依頼', '견적 요청', '获取报价', 'Demander un devis'],
    charter_done: ['✓ Đã nhận yêu cầu! Đội kinh doanh sẽ gọi lại trong 2 giờ làm việc (8:00–18:00).', '✓ Request received! Our sales team will call back within 2 working hours (8:00–18:00).', '✓ 承りました！2営業時間以内にご連絡します。', '✓ 접수되었습니다! 2시간 내 연락드립니다.', '✓ 已收到！我们将在2个工作小时内回电。', '✓ Bien reçu ! Nous vous rappelons sous 2 h ouvrées.'],
    group_hint: ['Đoàn trên 6 khách? Thuê nguyên chuyến — giá tốt hơn, đón riêng →', 'Travelling with 7+? Charter the whole vehicle — better rate, private pickup →', '7名以上のグループは貸切がお得です →', '7인 이상 단체는 전세가 더 저렴합니다 →', '7人以上团体？包车更划算 →', 'Groupe de 7+ ? L\u2019affrètement est plus avantageux →'],
    addon_title: ['Dịch vụ thêm', 'Add-ons', '追加サービス', '부가 서비스', '附加服务', 'Options'],
    addon_ins: ['Bảo hiểm du lịch', 'Travel insurance', '旅行保険', '여행자 보험', '旅行保险', 'Assurance voyage'],
    addon_ins_d: ['Tai nạn & y tế tới 100 triệu đ/khách — đối tác bảo hiểm được cấp phép', 'Accident & medical cover up to 100M₫ per guest — licensed insurer', '傷害・医療補償 最大1億ドン/名', '상해·의료 보장 최대 1억 동/인', '意外及医疗保障最高1亿越南盾/人', 'Couverture accident & médicale jusqu\u2019à 100 M₫/pers.'],
    addon_bike: ['Xe đạp / ván SUP', 'Bicycle / SUP board', '自転車・SUPボード', '자전거/SUP 보드', '自行车/桨板', 'Vélo / planche SUP'],
    addon_pet: ['Thú cưng (lồng kín)', 'Pet in carrier', 'ペット（ケージ）', '반려동물(케이지)', '宠物（笼装）', 'Animal en cage'],
    addon_airport: ['Đón tại sân bay Nội Bài', 'Noi Bai Airport pickup', 'ノイバイ空港送迎', '노이바이 공항 픽업', '内排机场接机', 'Prise en charge aéroport Noi Bai'],
    per_guest: ['/khách', '/guest', '/名', '/인', '/人', '/pers.'],
    qr_dynamic: ['QR động — tự đổi sau', 'Dynamic QR — refreshes in', '動的QR — 更新まで', '동적 QR — 갱신까지', '动态二维码 — 刷新于', 'QR dynamique — actualisation dans'],
    qr_anti: ['chống chụp màn hình / bán lại vé', 'blocks screenshots & resale', 'スクリーンショット・転売防止', '캡처·재판매 방지', '防截图防转卖', 'anti-capture et revente'],
    careers: ['Tuyển dụng', 'Careers', '採用情報', '채용', '招聘', 'Recrutement'],
    careers_sub: ['Gia nhập đội ngũ Daiichi — tuyển HDV, thuyền viên, phụ xe, nhân viên quầy (chính thức & thời vụ mùa cao điểm). Hồ sơ đổ thẳng về bộ phận nhân sự, phản hồi trong 3 ngày.', 'Join the Daiichi crew — guides, boat crew, bus attendants, counter staff (permanent & peak-season). HR replies within 3 days.', 'Daiichiの仲間になりませんか — ガイド・乗組員・係員を募集中。3日以内にご連絡します。', 'Daiichi 팀에 합류하세요 — 가이드·승무원·카운터 직원 모집. 3일 내 회신.', '加入Daiichi团队 — 招聘导游、船员、售票员。3日内回复。', 'Rejoignez l\u2019équipe Daiichi — guides, équipage, agents. Réponse sous 3 jours.'],
    position: ['Vị trí ứng tuyển', 'Position', '応募職種', '지원 직무', '应聘职位', 'Poste'],
    apply_send: ['Nộp hồ sơ', 'Apply', '応募する', '지원하기', '提交申请', 'Postuler'],
    apply_done: ['✓ Đã nhận hồ sơ! Bộ phận nhân sự sẽ liên hệ trong 3 ngày làm việc.', '✓ Application received! HR will contact you within 3 working days.', '✓ 応募を受け付けました！3営業日以内にご連絡します。', '✓ 접수되었습니다! 3영업일 내 연락드립니다.', '✓ 已收到申请！3个工作日内联系您。', '✓ Candidature reçue ! Réponse sous 3 jours ouvrés.'],
  };

  function detect() {
    // 1. Check URL query param ?lang=vi|en|ja|ko|zh|fr
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang && LANGS.some(l => l.code === urlLang.toLowerCase())) {
        localStorage.setItem('dt_lang', urlLang.toLowerCase());
        localStorage.setItem('dt_lang_manual', '1');
        return urlLang.toLowerCase();
      }
    } catch (e) {}

    // 2. Check if user previously manually selected a language
    const isManual = localStorage.getItem('dt_lang_manual');
    const saved = localStorage.getItem('dt_lang');
    if (isManual && saved && LANGS.some(l => l.code === saved)) {
      return saved;
    }

    // 3. Auto-detect from visitor device/browser locale
    const navLangs = (navigator.languages && navigator.languages.length) 
      ? navigator.languages 
      : [navigator.language || navigator.userLanguage || ''];
    for (const nl of navLangs) {
      if (!nl) continue;
      const code = String(nl).toLowerCase().slice(0, 2);
      if (LANGS.some(l => l.code === code)) {
        return code;
      }
    }

    // 4. Default fallback:
    // If device locale is Vietnamese -> 'vi'; else international English -> 'en'
    const primaryNav = String(navigator.language || navigator.userLanguage || '').toLowerCase();
    if (primaryNav.startsWith('vi')) return 'vi';
    return 'en';
  }

  const idx = { vi: 0, en: 1, ja: 2, ko: 3, zh: 4, fr: 5 };

  const I18N = {
    langs: LANGS,
    lang: detect(),
    setLang(code) {
      this.lang = code;
      localStorage.setItem('dt_lang', code);
      localStorage.setItem('dt_lang_manual', '1');
      document.documentElement.lang = code;
      window.dispatchEvent(new CustomEvent('dt:lang', { detail: code }));
    },
    t(key) {
      const row = D[key];
      if (!row) return key;
      return row[idx[this.lang]] || row[1] || row[0];
    },
    /* Localize a {vi,en,...} object: falls back vi-then-en */
    L(obj) {
      if (!obj) return '';
      if (typeof obj === 'string') return obj;
      return obj[this.lang] || obj.en || obj.vi || '';
    },
    fmtPrice(n) {
      if (this.lang === 'vi') return n.toLocaleString('vi-VN') + 'đ';
      return n.toLocaleString('en-US') + ' ₫';
    },
    /* Localized date display for ISO 'YYYY-MM-DD' strings (one format per language) */
    fmtDate(iso) {
      if (!iso || !/^\d{4}-\d{2}-\d{2}/.test(iso)) return iso || '';
      const [y, m, d] = iso.slice(0, 10).split('-');
      switch (this.lang) {
        case 'ja': return y + '年' + Number(m) + '月' + Number(d) + '日';
        case 'zh': return y + '年' + Number(m) + '月' + Number(d) + '日';
        case 'ko': return y + '. ' + Number(m) + '. ' + Number(d) + '.';
        case 'en': return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][Number(m) - 1] + ' ' + Number(d) + ', ' + y;
        default: return d + '/' + m + '/' + y; // vi, fr
      }
    },
    /* approximate foreign-currency display for international guests */
    approx(n) {
      const map = { en: ['$', 25400, 0], ja: ['¥', 165, 0], ko: ['₩', 18.5, 0], zh: ['¥', 3500, 0], fr: ['€', 27500, 0] };
      const m = map[this.lang];
      if (!m) return '';
      const v = n / m[1];
      const s = v >= 100 ? Math.round(v).toLocaleString('en-US') : v.toFixed(v >= 10 ? 0 : 1);
      return '≈ ' + m[0] + s;
    },
  };
  document.documentElement.lang = I18N.lang;
  window.I18N = I18N;
})();
