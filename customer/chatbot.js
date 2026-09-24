/* DAIICHI — rule-based chatbot, answers in all 6 languages from live system data
   (DT_DATA prices/schedules, DT_CAMPAIGNS active promos, DT_STORE bookings) */
(function () {
  const idx = { vi: 0, en: 1, ja: 2, ko: 3, zh: 4, fr: 5 };
  const P = (arr) => arr[idx[I18N.lang]] || arr[1] || arr[0];
  const F = (n) => I18N.fmtPrice(n);
  const Lz = (o) => I18N.L(o);

  /* ---- intent keywords (all languages, lowercase substrings) ---- */
  const KW = {
    lost: ['quên', 'mất đồ', 'lost', 'forgot', 'left my', '忘れ', '紛失', '분실', '두고', '遗失', '丢了', 'oublié', 'perdu'],
    cancel: ['hủy', 'huỷ', 'hoàn vé', 'hoàn tiền', 'cancel', 'refund', 'キャンセル', '返金', '취소', '환불', '取消', '退款', 'annul', 'rembours'],
    weather: ['thời tiết', 'bão', 'cấm biển', 'weather', 'storm', 'typhoon', '天気', '台風', '欠航', '날씨', '태풍', '天气', '台风', '禁航', 'météo', 'tempête'],
    promo: ['khuyến mãi', 'giảm giá', 'flash', 'sale', 'voucher', 'promo', 'discount', 'coupon', 'deal', 'クーポン', 'セール', '割引', '할인', '쿠폰', '특가', '优惠', '折扣', '促销', 'réduction', 'remise'],
    lux: ['ngủ đêm', 'qua đêm', 'suite', 'luxury', 'overnight', '5 sao', '5★', '宿泊', 'スイート', '泊', '1박', '스위트', '숙박', '过夜', '套房', '住宿', 'nuit', 'cabine'],
    day: ['tour', 'du thuyền', 'cruise', 'kayak', 'việt hải', 'hoàng hôn', 'sunset', 'sunrise', 'デイクルーズ', 'ツアー', 'クルーズ', '투어', '크루즈', '데이', '一日游', '游船', '日落', 'croisière', 'excursion'],
    sched: ['mấy giờ', 'giờ nào', 'giờ chạy', 'lịch chạy', 'schedule', 'timetable', 'what time', 'departure time', '時刻', '時間', '何時', '몇 시', '시간표', '出发时间', '几点', '班次', 'horaire', 'quelle heure'],
    bus: ['xe', 'bus', 'limousine', 'cát bà', 'cat ba', 'hải phòng', 'hai phong', 'giá', 'vé', 'price', 'fare', 'how much', 'ticket', 'バス', 'カットバ', '料金', 'いくら', '버스', '깟바', '요금', '가격', '巴士', '吉婆', '票价', '多少钱', 'prix', 'tarif', 'billet'],
    human: ['nhân viên', 'người thật', 'tư vấn viên', 'hotline', 'gọi', 'agent', 'human', 'staff', 'operator', 'オペレーター', '担当者', '電話', '상담원', '직원', '人工', '客服', '电话', 'conseiller', 'humain'],
    rt: ['khứ hồi', 'hai chiều', 'round trip', 'round-trip', 'return ticket', '往復', '왕복', '往返', 'aller-retour'],
    cartq: ['giỏ hàng', 'giỏ', 'nhiều dịch vụ', 'cart', 'basket', 'カート', '장바구니', '购物车', 'panier'],
    points: ['điểm thưởng', 'tích điểm', 'hạng thẻ', 'thành viên', 'loyalty', 'points', 'rewards', 'tier', 'membership', 'ポイント', '会員', '포인트', '적립', '등급', '积分', '会员', 'fidélité'],
  };
  const CODE_RE = /(dt26|pos|ag)-[a-z0-9]{3,7}/i;

  /* ---- live data helpers ---- */
  const D = () => window.DT_DATA;
  function busInfo() {
    const b = D().BUS;
    const std = b.find((s) => s.id === 'b1'), limo = b.find((s) => s.id === 'b3'), hp = b.find((s) => s.id === 'b10');
    return { l1: F(std.low), h1: F(std.high), l2: F(limo.low), h2: F(limo.high), hp: F(hp.low), n: std.times.go.length, t1: std.times.go[0], t2: std.times.go[std.times.go.length - 1] };
  }
  function dayList() {
    return D().DAY_TOURS.filter((x) => !x.combo).slice(0, 3).map((tr) => {
      const c = DT_CAMPAIGNS.forProduct(tr.id);
      const base = tr.low || tr.peak;
      const pr = c ? DT_CAMPAIGNS.apply(base, c) : base;
      return '• ' + Lz(tr.name) + ' (' + tr.time + ') — ' + F(pr) + (c ? ' ⚡−' + c.off + '%' : '');
    }).join('\n');
  }
  function luxInfo() {
    const s = D().SUITES[0];
    const c = DT_CAMPAIGNS.forProduct('luxury');
    return { p: F(c ? DT_CAMPAIGNS.apply(s.n1, c) : s.n1), early: c ? c.name + ' −' + c.off + '%' : '' };
  }

  /* ---- localized answer templates ---- */
  const A = {
    greet: ['Xin chào! Tôi là Trợ lý ảo Daiichi Travel AI 🤖 Tôi có thể tra cứu giờ xe, số ghế trống thời gian thực, giá phòng du thuyền 5★, tour vịnh Lan Hạ, hoặc tra cứu mã vé trực tiếp. Quý khách đang quan tâm đến hành trình nào ạ?',
      'Hello! I am Daiichi Travel AI 🤖 I can check real-time bus schedules, available seats, 5★ cruise suites, Lan Ha Bay tours, or look up your booking code directly. How can I assist your journey today?',
      'こんにちは！Daiichi Travel AIです🤖 バスの運行状況・リアルタイム空席・5つ星クルーズ・ランハ湾ツアー・予約確認を即座にお調べします。ご案内いたしましょうか？',
      '안녕하세요! Daiichi Travel AI입니다 🤖 실시간 버스 시간표, 잔여 좌석, 5성급 크루즈 객실, 란하베이 투어, 예약 조회를 도와드립니다. 무엇을 도와드릴까요?',
      '您好！我是Daiichi Travel AI智能助手🤖 可为您实时查询班车时刻、余票座位、五星游轮套房、兰哈湾行程及订单状态。请问有什么可以帮您？',
      'Bonjour ! Je suis Daiichi Travel AI 🤖 Horaires de bus, sièges disponibles en temps réel, croisière 5★, circuits et suivi de réservation. Comment puis-je vous aider ?'],
    bus: (i) => P([
      `Xe Hà Nội ⇄ Cát Bà (đã gồm tàu cao tốc & VAT):\n• Bus 45 chỗ: ${i.l1} (thấp điểm) – ${i.h1} (cao điểm)\n• Limousine 11 ghế: ${i.l2} – ${i.h2}\n${i.n} chuyến/ngày, ${i.t1} → ${i.t2}. Hà Nội ⇄ Hải Phòng từ ${i.hp}. Đặt khứ hồi giảm thêm 5%!`,
      `Hanoi ⇄ Cat Ba (speedboat & VAT included):\n• 45-seat bus: ${i.l1} (low) – ${i.h1} (high season)\n• Limousine 11: ${i.l2} – ${i.h2}\n${i.n} departures/day, ${i.t1} → ${i.t2}. Hanoi ⇄ Hai Phong from ${i.hp}. Round trips save 5% extra!`,
      `ハノイ⇄カットバ（高速船・税込）:\n• 45席バス: ${i.l1}〜${i.h1}\n• リムジン11席: ${i.l2}〜${i.h2}\n毎日${i.n}便（${i.t1}〜${i.t2}）。往復予約で5%OFF！`,
      `하노이⇄깟바 (쾌속선·VAT 포함):\n• 45석 버스: ${i.l1}~${i.h1}\n• 리무진 11석: ${i.l2}~${i.h2}\n매일 ${i.n}회 (${i.t1}~${i.t2}). 왕복 예약 시 5% 추가 할인!`,
      `河内⇄吉婆（含快艇和增值税）:\n• 45座巴士: ${i.l1}–${i.h1}\n• 11座豪华车: ${i.l2}–${i.h2}\n每日${i.n}班（${i.t1}–${i.t2}）。往返再省5%！`,
      `Hanoï ⇄ Cat Ba (bateau & TVA inclus) :\n• Bus 45 pl. : ${i.l1}–${i.h1}\n• Limousine 11 : ${i.l2}–${i.h2}\n${i.n} départs/jour (${i.t1}–${i.t2}). −5 % en aller-retour !`]),
    sched: (i) => P([
      `Giờ khởi hành Hà Nội → Cát Bà hôm nay: ${D().BUS.find((s) => s.id === 'b1').times.go.join(' · ')}. Chiều về tương tự — chọn giờ trong trang đặt vé nhé!`,
      `Today\u2019s Hanoi → Cat Ba departures: ${D().BUS.find((s) => s.id === 'b1').times.go.join(' · ')}. Returns run similarly — pick your time on the booking page!`,
      `本日のハノイ→カットバ出発時刻: ${D().BUS.find((s) => s.id === 'b1').times.go.join(' · ')}。予約ページで選択できます。`,
      `오늘 하노이→깟바 출발: ${D().BUS.find((s) => s.id === 'b1').times.go.join(' · ')}. 예약 페이지에서 선택하세요!`,
      `今日河内→吉婆发车: ${D().BUS.find((s) => s.id === 'b1').times.go.join(' · ')}。请在预订页选择时间。`,
      `Départs Hanoï → Cat Ba aujourd\u2019hui : ${D().BUS.find((s) => s.id === 'b1').times.go.join(' · ')}.`]),
    day: () => P([
      `Tour du thuyền ngày vịnh Lan Hạ được yêu thích nhất:\n${dayList()}\nGồm đón trung tâm Cát Bà · hoàn huỷ trước 12h.`,
      `Most-loved Lan Ha Bay day cruises:\n${dayList()}\nFree central pickup · free cancellation to 12h.`,
      `人気のランハ湾デイクルーズ:\n${dayList()}\n中心部送迎無料・12時間前まで無料キャンセル。`,
      `인기 란하베이 데이 크루즈:\n${dayList()}\n시내 무료 픽업 · 12시간 전 무료 취소.`,
      `最受欢迎的兰哈湾一日游:\n${dayList()}\n市中心免费接送·12小时前免费取消。`,
      `Croisières du jour les plus appréciées :\n${dayList()}\nTransfert offert · annulation gratuite jusqu\u2019à 12 h.`]),
    lux: (i) => P([
      `Du thuyền ngủ đêm 5★ Daiichi Luxury: 32 suite ban công riêng, từ ${i.p}/phòng (2N1Đ, 2 khách).${i.early ? ' Đang có ' + i.early + ' khi đặt trước 30 ngày!' : ''} Check-in 12:00 bến Got, Hải Phòng.`,
      `Our 5★ overnight ship has 32 balcony suites from ${i.p}/cabin (2D1N, 2 guests).${i.early ? ' ' + i.early + ' is live for bookings 30 days ahead!' : ''} Check-in 12:00, Got Pier, Hai Phong.`,
      `5つ星宿泊クルーズ：バルコニー付き32スイート、1室${i.p}〜（1泊2日・2名）。${i.early ? i.early + '実施中（30日前予約）！' : ''}`,
      `5성급 1박 크루즈: 발코니 스위트 32실, 객실당 ${i.p}부터 (1박2일·2인).${i.early ? ' 30일 전 예약 시 ' + i.early + '!' : ''}`,
      `五星过夜游轮：32间阳台套房，每间${i.p}起（两天一夜·2人）。${i.early ? '提前30天预订享' + i.early + '！' : ''}`,
      `Croisière 5★ : 32 suites avec balcon dès ${i.p}/cabine (2J1N).${i.early ? ' ' + i.early + ' à J-30 !' : ''}`]),
    promo: () => {
      const list = DT_CAMPAIGNS.active().filter((c) => c.off || c.offAmt);
      if (!list.length) return P(['Hiện chưa có khuyến mãi nào — quay lại sau nhé!', 'No active deals right now — check back soon!', '現在セールはありません。', '현재 진행 중인 할인이 없습니다.', '当前暂无优惠。', 'Pas de promo en ce moment.']);
      const rows = list.map((c) => '• ' + c.name + (c.off ? ' −' + c.off + '%' : ' −' + F(c.offAmt)) + ' · ' + Lz(c.desc) + (c.ends ? ' (⏱ ' + DT_CAMPAIGNS.fmtLeft(c.ends, I18N.lang) + ')' : '')).join('\n');
      return P([`Khuyến mãi đang chạy:\n${rows}\nNhập mã ở bước thanh toán hoặc giá tự giảm trên web.`,
        `Live deals:\n${rows}\nEnter the code at checkout — or prices auto-apply on site.`,
        `実施中のセール:\n${rows}\n決済時にコード入力、または自動適用。`,
        `진행 중인 할인:\n${rows}\n결제 시 코드 입력 또는 자동 적용.`,
        `进行中的优惠:\n${rows}\n结算时输入代码或自动生效。`,
        `Promos en cours :\n${rows}\nCode au paiement ou prix auto-appliqué.`]);
    },
    cancel: () => P([
      'Chính sách hoàn huỷ: miễn phí trước 12 giờ khởi hành (xe, tàu, tour ngày). Du thuyền ngủ đêm: 100% trước 7 ngày, 50% trước 3 ngày. Tiền về trong 5–7 ngày làm việc. Anh/chị cho tôi mã vé để hỗ trợ nhé!',
      'Cancellation: free up to 12h before departure (bus, boat, day tours). Overnight cruise: 100% >7 days, 50% >3 days. Refunds in 5–7 working days. Paste your booking code and I\u2019ll help!',
      'キャンセル：出発12時間前まで無料（バス・船・デイツアー）。宿泊クルーズは7日前100%、3日前50%返金。コードを貼り付けてください。',
      '취소: 출발 12시간 전까지 무료. 1박 크루즈는 7일 전 100%, 3일 전 50% 환불. 예약 코드를 알려주세요!',
      '取消政策：出发前12小时免费（巴士、船、一日游）。过夜游轮：7天前100%，3天前50%。请提供订单编号。',
      'Annulation gratuite jusqu\u2019à 12 h avant le départ. Croisière de nuit : 100 % à J-7, 50 % à J-3. Collez votre code !']),
    weather: () => P([
      '🌤 ' + I18N.t('weather_policy') + ' Lệnh cấm biển sẽ được báo qua SMS/Zalo ngay khi cảng vụ công bố.',
      '🌤 ' + I18N.t('weather_policy') + ' We notify you by SMS/Zalo the moment the port authority announces a ban.',
      '🌤 ' + I18N.t('weather_policy') + ' 禁航が発表され次第、SMSでお知らせします。',
      '🌤 ' + I18N.t('weather_policy') + ' 출항 금지 발표 즉시 SMS로 알려드립니다.',
      '🌤 ' + I18N.t('weather_policy') + ' 禁航公布后将第一时间短信通知。',
      '🌤 ' + I18N.t('weather_policy')]),
    lost: () => P([
      'Quên đồ trên xe/tàu? Vào mục "Quên đồ" trong app (vé → Báo quên đồ) hoặc gọi 096 100 4709 — tài xế/HDV kiểm tra ngay, nhận tại quầy hoặc ship COD. Tỉ lệ tìm thấy 92%!',
      'Left something behind? Use "Lost & found" in the app (ticket → report) or call +84 96 100 4709 — the crew checks immediately; collect at our counter or COD shipping. 92% recovery rate!',
      'お忘れ物は、アプリの「忘れ物」から報告するか +84 96 100 4709 へ。乗務員がすぐ確認し、窓口受取または配送できます。',
      '분실물은 앱의 "분실물" 메뉴 또는 +84 96 100 4709로 연락주세요. 즉시 확인 후 카운터 수령/배송 가능합니다.',
      '遗失物品请在App"失物招领"报告或致电 +84 96 100 4709，乘务员立即查找，可柜台领取或快递。',
      'Objet oublié ? Rubrique « Objets trouvés » de l\u2019appli ou +84 96 100 4709 — l\u2019équipage vérifie immédiatement.']),
    human: () => P([
      'Đã chuyển cho nhân viên trực — phản hồi trong ~1 phút (demo). Gấp thì gọi/Zalo 24/7: 096 100 4709 nhé!',
      'Connecting you to a live agent — reply in ~1 minute (demo). Urgent? Call/Zalo 24/7: +84 96 100 4709.',
      'オペレーターにおつなぎします（約1分・デモ）。お急ぎの場合は +84 96 100 4709 へ。',
      '상담원 연결 중입니다 (~1분·데모). 급하시면 +84 96 100 4709로 전화주세요.',
      '正在转接人工客服（约1分钟·演示）。紧急请拨 +84 96 100 4709。',
      'Transfert vers un conseiller (~1 min, démo). Urgence : +84 96 100 4709.']),
    rt: () => P([
      'Vé khứ hồi được giảm thêm 5%! Chọn ô "Ngày về" trong form tìm kiếm → chọn chuyến đi + chuyến về + ghế từng chiều → hệ thống tự trừ 5% tổng hóa đơn. Vé QR ghi cả hai chiều.',
      'Round trips get an extra 5% off! Set the "Return" date in the search form → pick outbound + return trips and seats for each leg → 5% comes off the total automatically. One QR ticket covers both legs.',
      '往復予約は5%OFF！検索フォームで「復路日」を選び、往復それぞれの便と座席を選択すると自動で割引されます。',
      '왕복 예약 시 5% 추가 할인! 검색 폼에서 "귀국일"을 선택하고 양방향 좌석을 고르면 자동 적용됩니다.',
      '往返预订再位95折！在搜索表单选择"返程日期"，分别选择去返班次和座位，系统自动减5%。',
      'Aller-retour : −5 % supplémentaires ! Choisissez la date de retour dans le formulaire — la remise s’applique automatiquement.']),
    cartq: () => P([
      'Giỏ hàng cho phép gộp xe + du thuyền + tour vào MỘT lần thanh toán. Bấm "+ Thêm vào giỏ" ở mỗi dịch vụ — giỏ có xe sẽ được gợi ý cruise −10% (và ngược lại). Ghế xe trong giỏ được giữ 10 phút.',
      'The cart combines bus + cruise + tours into ONE checkout. Tap "+ Add to cart" on any service — carts with a bus get a −10% cruise upsell (and vice versa). Bus seats in the cart are held for 10 minutes.',
      'カートでバス＋クルーズ＋ツアーをまとめて一括決済できます。同時購入で−10%の提案もあり、座席は10分間確保されます。',
      '장바구니로 버스+크루즈+투어를 한 번에 결제! 함께 담으면 −10% 추천, 좌석은 10분간 확보됩니다.',
      '购物车可将巴士+游轮+行程合并一次支付！同购享−10%推荐，座位保留10分钟。',
      'Le panier combine bus + croisière + circuits en UN paiement. −10 % sur le service complémentaire, sièges bloqués 10 minutes.']),
    points: () => P([
      'Mỗi vé tích 150 điểm + 1 điểm/20.000đ chi tiêu. Hạng thẻ: Bạc → Vàng (600đ) → Bạch Kim (1.500đ) với ưu đãi riêng. Đăng nhập bằng SĐT + OTP (không cần mật khẩu) ở biểu tượng 👤 góc phải để xem điểm & vé của bạn.',
      'Every booking earns 150 points + 1 pt per 20,000₫ spent. Tiers: Silver → Gold (600) → Platinum (1,500) with exclusive perks. Sign in with phone + OTP (no password) via the 👤 icon to see your points & trips.',
      '予約ごとに150ポイント＋20,000₫ごとに1ポイント。シルバー→ゴールド→プラチナの3ランク。👤アイコンからOTPでログインできます。',
      '예약마다 150포인트 + 20,000₫당 1포인트 적립. 실버→골드→플래티넘 등급. 👤 아이콘에서 OTP 로그인하세요.',
      '每笔订单积150分+每消费20,000₫积1分。银→金→白金三级会员。点👤图标用OTP登录查看。',
      '150 points par réservation + 1 pt/20 000₫. Niveaux Argent → Or → Platine. Connectez-vous par OTP via l’icône 👤.']),
    fallback: () => P([
      'Tôi chưa chắc mình hiểu đúng 😅 Thử hỏi: "Giá xe Hà Nội Cát Bà?", "Tour ngày nào hay?", "Khuyến mãi hôm nay?" — hoặc gõ "nhân viên" để gặp người thật.',
      'Not sure I got that 😅 Try: "Hanoi to Cat Ba price?", "Best day tour?", "Today\u2019s deals?" — or type "agent" for a human.',
      'うまく理解できませんでした😅「カットバ行きの料金は？」「おすすめツアーは？」「セール情報」などを試すか、「担当者」と入力してください。',
      '잘 이해하지 못했어요 😅 "깟바 요금?", "추천 투어?", "오늘 할인?" 또는 "상담원"이라고 입력해 보세요.',
      '我没太明白😅 试试："吉婆票价？""推荐行程？""今日优惠？"或输入"客服"转人工。',
      'Je n\u2019ai pas compris 😅 Essayez : « Prix Hanoï–Cat Ba ? », « Meilleure excursion ? » — ou tapez « conseiller ».']),
  };

  function bookingReply(code) {
    const bk = typeof DT_STORE !== 'undefined' ? DT_STORE.get(code) : null;
    if (!bk) return P([
      `Không tìm thấy mã ${code.toUpperCase()} 😕 Kiểm tra lại hoặc tra cứu bằng SĐT + OTP ở mục "Tra cứu vé".`,
      `Couldn\u2019t find ${code.toUpperCase()} 😕 Double-check it, or use phone + OTP lookup under "My Booking".`,
      `${code.toUpperCase()} は見つかりませんでした。電話番号＋OTPでもお調べいただけます。`,
      `${code.toUpperCase()} 코드를 찾을 수 없습니다. 전화번호+OTP 조회도 가능합니다.`,
      `未找到 ${code.toUpperCase()}。可在"查询订单"用手机号+验证码查询。`,
      `Code ${code.toUpperCase()} introuvable. Essayez la recherche par téléphone + OTP.`]);
    const line = `${bk.fromLabel} → ${bk.toLabel} · ${bk.date}${bk.timeGo ? ' · ' + bk.timeGo : ''}${bk.seats ? ' · ' + bk.seats.join(', ') : ''} · ${F(bk.total)}`;
    return P([
      `✓ Tìm thấy! ${bk.code}: ${line}. Vé QR xem ở mục "Tra cứu vé". Cần đổi giờ/hoàn vé cứ nhắn tôi!`,
      `✓ Found it! ${bk.code}: ${line}. View your QR ticket under "My Booking". Need a change or refund? Just ask!`,
      `✓ 見つかりました！${bk.code}: ${line}。QRチケットは「予約確認」でご覧いただけます。`,
      `✓ 찾았습니다! ${bk.code}: ${line}. QR 티켓은 "예약 조회"에서 확인하세요.`,
      `✓ 已找到！${bk.code}: ${line}。二维码车票请在"查询订单"查看。`,
      `✓ Trouvé ! ${bk.code} : ${line}. Billet QR dans « Ma réservation ».`]);
  }

  function match(text, keys) { return keys.some((k) => text.includes(k)); }

  window.DT_BOT = {
    greet() { return P(A.greet); },
    quick() {
      return P([
        ['Giá vé xe HN – Cát Bà hôm nay?', 'Tour du thuyền ngày Lan Hạ 5★?', 'Du thuyền ngủ đêm 2N1Đ?', 'Ưu đãi học sinh, sinh viên 100k?', 'Chính sách đón trả trung chuyển'],
        ['Hanoi–Cat Ba bus fares today?', 'Lan Ha 5★ Day Cruise?', '2D1N Overnight Cruise?', 'Student discount 100k?', 'Pickup & transfer policy'],
        ['カットバ行きの料金は？', 'ランハ湾5つ星デイクルーズ？', '2日1泊宿泊クルーズ？', '学割制度？', '送迎ポリシー'],
        ['깟바 요금은?', '란하 5성 데이 크루즈?', '2박1일 숙박 크루즈?', '학생 할인 100k?', '픽업 및 환승 안내'],
        ['吉婆巴士票价？', '兰哈湾五星一日游？', '2天1晚豪华过夜游轮？', '学生优惠100k？', '接送政策'],
        ['Prix Hanoï–Cat Ba ?', 'Croisière 5★ Lan Ha ?', 'Croisière 2J1N ?', 'Réduction étudiants ?', 'Politique de ramassage']]);
    },
    bookingApi: {
      url: 'https://vfeodqmvilchsipdsxsh.supabase.co/functions/v1/chatbot-booking',
      apiKey: 'daiichi_ai_bot_secret_key_2026',
      async call(action, payload = {}) {
        try {
          const res = await fetch('https://vfeodqmvilchsipdsxsh.supabase.co/functions/v1/chatbot-booking', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-bot-api-key': 'daiichi_ai_bot_secret_key_2026'
            },
            body: JSON.stringify({ action, ...payload })
          });
          return await res.json();
        } catch (e) {
          console.warn('Booking API error:', e);
          return null;
        }
      }
    },
    // Async call to real Daiichi AI Chatbot
    async askAI(raw, customerType = 'retail') {
      const text = String(raw || '').trim();
      if (!text) return '';

      // If user pasted a booking code (DT26-... or DT-...), we can answer instantly or query live Supabase
      const code = text.match(CODE_RE);
      if (code) {
        try {
          const bkData = await this.bookingApi.call('get_booking', { ticketCode: code[0] });
          if (bkData && bkData.success && bkData.data) {
            const b = bkData.data;
            return `✓ Tìm thấy vé ${b.ticketCode || code[0]}!\n• Khách: ${b.customerName || 'Quý khách'} (${b.customerPhone || ''})\n• Chuyến: ${b.route || ''} lúc ${b.departureTime || ''} ngày ${b.travelDate || ''}\n• Ghế: ${(b.seats || []).join(', ')}\n• Trạng thái: ${b.status || 'Đã xác nhận'}\nCần hỗ trợ thay đổi vé, cứ nhắn tôi nhé!`;
          }
        } catch (e) {
          // fallback to local store lookup
        }
        return bookingReply(code[0]);
      }

      if (!window._dt_chat_session) {
        window._dt_chat_session = 'web_' + Math.random().toString(36).substring(2, 9);
      }

      // Candidate API endpoints for Daiichi AI Chatbot (local preview proxy, live Render cloud server, direct local port)
      const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      const endpoints = isLocal
        ? ['/api/chat', 'http://127.0.0.1:8000/api/chat', 'https://daiichi-ai-chatbot.onrender.com/api/chat']
        : ['https://daiichi-ai-chatbot.onrender.com/api/chat', '/api/chat', 'http://127.0.0.1:8000/api/chat'];

      for (const ep of endpoints) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 20000);
          const res = await fetch(ep, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              message: text,
              session_id: window._dt_chat_session,
              engine: 'hybrid',
              customer_type: customerType || 'retail'
            }),
            signal: controller.signal
          });
          clearTimeout(timeoutId);
          if (res.ok) {
            const data = await res.json();
            const reply = data.response || data.reply;
            if (reply && reply.trim()) {
              return reply.trim();
            }
          }
        } catch (err) {
          // Try next candidate
          continue;
        }
      }

      // Graceful local fallback only if ALL AI endpoints are completely unreachable
      return this.reply(text);
    },
    reply(raw) {
      const text = String(raw || '').toLowerCase();
      const code = text.match(CODE_RE);
      if (code) return bookingReply(code[0]);
      if (match(text, KW.lost)) return A.lost();
      if (match(text, KW.rt)) return A.rt();
      if (match(text, KW.cartq)) return A.cartq();
      if (match(text, KW.points)) return A.points();
      if (match(text, KW.cancel)) return A.cancel();
      if (match(text, KW.weather)) return A.weather();
      if (match(text, KW.promo)) return A.promo();
      if (match(text, KW.lux)) return A.lux(luxInfo());
      if (match(text, KW.day)) return A.day();
      if (match(text, KW.sched)) return A.sched(busInfo());
      if (match(text, KW.bus)) return A.bus(busInfo());
      if (match(text, KW.human)) return A.human();
      return A.fallback();
    },
  };
})();
