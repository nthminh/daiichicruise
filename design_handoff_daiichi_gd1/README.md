# Handoff: Daiichi One Platform — Giai đoạn 1 (Web khách hàng + Back Office)

> Gói bàn giao cho Claude Code · 11/06/2026 · Ngôn ngữ làm việc: tiếng Việt (sản phẩm 6 ngôn ngữ)

## Overview

Hợp nhất 4 website (daiichitravel.vn, daiichitravel.com, lanhacruises.vn, daiichibus.vn) thành MỘT nền tảng đặt vé vận tải + du thuyền tại Cát Bà / vịnh Lan Hạ:

- **Web khách hàng** 6 ngôn ngữ (vi/en/ja/ko/zh/fr, tự detect): đặt vé xe (1 chiều/khứ hồi), du thuyền ngày, du thuyền ngủ đêm 5★, tour combo, giỏ hàng, tự huỷ vé, hoá đơn VAT, add-on (bảo hiểm/hành lý/đón sân bay), charter, tuyển dụng, chatbot, CMS, flash sale realtime, 72 trang SEO.
- **Back Office** 27 màn hình, 4 vai trò (Quản lý / Nhân viên POS / Đại lý / Đối tác): bán hàng, giá & khuyến mãi, vận hành đội xe-tàu, đại lý & đối tác, nhân sự đầy đủ, phân quyền + audit.
- **5 app mobile** = mockup spec cho Giai đoạn 2 (KHÔNG thuộc phạm vi GĐ1).

## About the Design Files

Toàn bộ file trong gói này là **bản thiết kế tham chiếu viết bằng HTML/JSX (Babel in-browser)** — nguyên mẫu chạy được thể hiện đúng giao diện & hành vi mong muốn, **không phải production code để copy nguyên**. Nhiệm vụ: **tái dựng các thiết kế này trong stack đã chốt** (xem mục Stack), dùng pattern/thư viện chuẩn của codebase mới. Logic nghiệp vụ trong các file JSX (tính giá, chính sách huỷ, khoá an toàn…) là **đặc tả hành vi chính xác** — đọc kỹ và port lại, đừng đoán.

## Fidelity

**High-fidelity (hifi).** Màu, chữ, khoảng cách, copy, luồng tương tác là CHUNG CUỘC — tái tạo pixel-perfect. Dữ liệu (booking demo, nhân sự demo, số liệu dashboard) là demo; cấu trúc dữ liệu là chuẩn.

## Stack — ĐÃ CHỐT (quyết định chủ đầu tư 11/06/2026, không hỏi lại)

| Lớp | Công nghệ |
|---|---|
| Frontend | **Next.js** (SSR/SSG) — precompile lúc build, CẤM Babel runtime |
| Backend API | **Google Cloud Run** — một API duy nhất (API-first) cho web + Back Office + app GĐ2 |
| Database | **Cloud SQL (PostgreSQL)** — unique constraint (trip, chặng, ghế) chống trùng ghế |
| Auth khách | **Firebase Authentication** (OTP SĐT, không mật khẩu) |
| Back Office | SPA sau đăng nhập, phân quyền theo vai trò |
| Hosting tĩnh/ảnh | Firebase Hosting + Cloud Storage · region **asia-southeast1** |
| Realtime tối thiểu | Trạng thái ghế: WebSocket hoặc polling 5s |

## Phạm vi GĐ1 — XÁC NHẬN + Tiêu chí nghiệm thu

LÀM: web khách + Back Office + API. KHÔNG LÀM GĐ1: app native (mockup ở `apps/` chỉ là spec GĐ2), GPS realtime, channel manager OTA, Wallet pass, waitlist.

**Nghiệm thu GĐ1** (từ `Handoff - Đặc tả kỹ thuật.html` mục 8): đặt vé thật end-to-end 4 phương thức thanh toán kèm luồng thất bại–thử lại; POS bán + kết ca; đại lý đặt hộ trừ công nợ; đổi giá trên admin → web đổi ngay; 0 trùng ghế khi load test 200 phiên; PageSpeed mobile LCP < 2,5s; cookie consent theo Consent Mode v2.

## Files — bản đồ mã nguồn (mọi đường dẫn tính từ gốc zip)

| Đường dẫn | Vai trò |
|---|---|
| `index.html` + `one-home.jsx` | Trang chủ marketing (hero Luxury Cruise, tabs tìm kiếm, flash sale, khối đối tác nhỏ) |
| `customer/Daiichi Travel.html` | Shell web đặt vé (SPA route nội bộ qua state `nav(page, params)`) |
| `customer/home.jsx` | Trang chủ đặt vé: tabs Xe/Day/Đêm/Combo, form tìm (from/to/ngày/ngày về/pax) |
| `customer/bus-flow.jsx` | **QUAN TRỌNG NHẤT**: `CheckoutFlow` (dùng chung mọi luồng — promo, phụ thu lễ, hold 10', add-on, VAT invoice, fail–retry) + `BusFlow` (1 chiều & khứ hồi −5%, sơ đồ ghế 5 layout) + `SuccessTicket` |
| `customer/cruise-flows.jsx` | Tour ngày + combo (`TourDetail`, lịch trình 6 ngôn ngữ, chính sách trẻ em), tra cứu vé (mã / SĐT+OTP) |
| `customer/luxury.jsx` | Du thuyền ngủ đêm: 6 hạng suite × 2N1Đ/3N2Đ, sticky CTA mobile |
| `customer/extras.jsx` | Giỏ hàng (`DT_CART`) + upsell bundle −10%, tài khoản OTP + điểm thưởng, review xác thực, chatbot widget, `TicketActions` (tự huỷ theo chính sách 12h), `CharterPage`, `CareerPage`, `NotifyTimeline` |
| `customer/components.jsx` | Header/Footer (newsletter, MST), `TicketCard` + `DynamicQR` (QR đổi 30s chống bán lại), Steps, PayPicker, `DT_STORE` (kho vé localStorage), PromoBar/NewsBar |
| `customer/chatbot.js` | Bot rule-based 13 intent × 6 ngôn ngữ, đọc trực tiếp DT_DATA + DT_CAMPAIGNS + DT_STORE |
| `customer/site.css` | Toàn bộ style web khách (sticky CTA, seat map, ticket, focus-visible) |
| `customer/Chính sách & Điều khoản.html` | 4 trang pháp lý (hoàn huỷ, thời tiết 6 ngôn ngữ, điều khoản, GDPR) |
| `shared/tokens.css` | **Design tokens chuẩn** (xem mục Design Tokens) |
| `shared/i18n.js` | i18n engine: `I18N.t(key)` (mảng [vi,en,ja,ko,zh,fr]), `I18N.L(obj)`, detect ngôn ngữ thiết bị, `fmtPrice`, `approx` (quy đổi ngoại tệ tham khảo) |
| `shared/data.js` | **NGUỒN CHÂN LÝ sản phẩm**: tuyến + giờ chạy 2 chiều + giá mùa thấp/cao 2026–27 (biểu giá thật), 5 layout ghế (`buildSeats`), tour/suite/combo, mùa vụ (`busSeason`, `cruiseSeason`, cao điểm 09/05–02/09), lễ–Tết (`isHoliday`, phụ thu 30.000đ/khách/lượt), điểm đón/trả đa ngôn ngữ → **seed data cho PostgreSQL** |
| `shared/campaigns.js` | Engine khuyến mãi (flash/seasonal/code): active(), byCode(), apply(), forProduct(), countdown — DÙNG CHUNG 3 cổng, mọi giá hiển thị phải đi qua engine này |
| `shared/themes.js` | 6 theme văn hoá theo ngôn ngữ (đổi biến CSS qua `html[data-theme]`); vùng giao dịch dùng `--fn-dark`, KHÔNG theme |
| `shared/consent.js` | Cookie consent 6 ngôn ngữ — map sang Google Consent Mode v2 |
| `shared/cms.js` + `shared/translate.js` | CMS store (banner/tour/tin/review) + engine tự dịch VI→5 ngôn ngữ (production: Cloud Translation/DeepL, giữ cờ "cần hiệu đính") |
| `admin/Daiichi Back Office.html` | Shell Back Office (login 4 vai trò → menu theo vai trò trong `admin/app.jsx`) |
| `admin/admin-core.jsx` | Dataset demo + **merge booking thật từ web** (mục Liên thông), Shell/sidebar, Badge, RoleLogin |
| `admin/admin-manager.jsx` | Dashboard, Quản lý booking (+hoàn vé theo chính sách), Sơ đồ ghế chuyến |
| `admin/admin-pricing.jsx` | Giá & KM theo mùa, Báo cáo đối soát, Đại lý & công nợ |
| `admin/admin-pos-agent.jsx` | POS quầy, Soát vé, Cổng đại lý, Hạng & leaderboard đại lý (bậc 8/10/12%) |
| `admin/admin-partners.jsx` | Marketplace đối tác (duyệt dịch vụ/giá, revenue share 12–15%, cổng đối tác) |
| `admin/admin-cms.jsx` | CMS 4 module + duyệt review |
| `admin/admin-ops.jsx` | Điều độ (5 loại xung đột), Segment inventory, Cấm biển hàng loạt, Đăng kiểm & bảo dưỡng (tự khoá), P&L theo chuyến |
| `admin/admin-hr.jsx` + `admin-hr2.jsx` + `admin-hr3.jsx` | HR trọn vòng đời: hồ sơ (cảnh báo GPLX/chứng chỉ), bảng công lưới, tính lương + phiếu lương, đào tạo & an toàn + trần OT 40h/200h, tuyển thời vụ + cổng cứng onboarding, xếp ca (liên thông khoá an toàn), KPI & chia tip, offboarding |
| `apps/` | 13 màn hình app (spec GĐ2) — KHÔNG code lại trong GĐ1 |
| `seo/` (72 file) + `sitemap.xml`, `robots.txt`, `llms.txt`, `ai/prices.json` | Landing SEO 6 ngôn ngữ + hạ tầng AI-agent. **GIỮ NGUYÊN URL `/{lang}/{slug}`**. RÀNG BUỘC: landing không hard-code giá — đổi giá phải regenerate hoặc đọc API lúc build |
| `404.html`, `firebase.json`, `.firebaserc`, `HƯỚNG DẪN DEPLOY.md` | 404 đa ngôn ngữ + cấu hình hosting |
| Tài liệu: `Handoff - Đặc tả kỹ thuật.html` (data model 12 entity + API + ma trận quyền + NFR), `Go-live Checklist.html`, `Audit v3/v4`, `Báo cáo phủ kiểm thử.html` | Đọc Handoff TRƯỚC KHI code |

## Business Rules — các quy tắc PHẢI đúng tuyệt đối

1. **Giá theo mùa**: bus HN⇄Cát Bà mùa cao 09/05–02/09 (giá `high`), còn lại `low`; HN⇄Hải Phòng đồng giá quanh năm; tour `peakOnly` chỉ bán 27/5–02/8.
2. **Phụ thu lễ–Tết 30.000đ/khách/lượt** — cộng ở MỌI đường vào checkout (đặt thẳng, giỏ, khứ hồi từng chặng, POS).
3. **Khứ hồi = MỘT booking 2 chặng** (ghế riêng từng chặng) − 5% tổng.
4. **Hold ghế 10 phút** khi vào checkout, đếm ngược hiển thị; thanh toán thất bại → +5 phút, nút Thử lại/Đổi phương thức.
5. **Hoàn huỷ**: miễn phí >12h trước giờ đi (hoàn 100%); <12h không hoàn, đổi chuyến miễn phí 1 lần. Cruise đêm: 100% >7 ngày, 50% >3 ngày. **Cấm biển: hoàn 100% hoặc đổi ngày, mọi dịch vụ tàu.** Khách TỰ huỷ được trong chính sách (nút trong Tra cứu vé).
6. **Trẻ em**: <2 miễn phí; 2–4: 150K (Sunset/Morning) / 300K (VIP1) / 400K (VIP3/4/5); 5–11: −60K so người lớn.
7. **Mọi giá hiển thị đi qua engine campaign** (web, chatbot, POS, giá net đại lý) — một nguồn tính giá.
8. **Đại lý**: bậc Bạc 8% / Vàng 10% (≥50M/tháng) / Bạch Kim 12% (≥120M); lên hạng ngay tháng sau, xuống hạng cần 2 tháng liên tiếp dưới mốc; huỷ >5% khoá thưởng; công nợ trừ khi đặt hộ, cảnh báo 70% hạn mức.
9. **Khoá an toàn liên thông**: xe quá hạn đăng kiểm/bảo hiểm hoặc >15.000km → loại khỏi điều độ; nhân viên hết hạn chứng chỉ/khám SK → loại khỏi điều độ + xếp ca (chặn cả trong onChange, không chỉ disable UI); OT chặn cứng 40h/tháng · 200h/năm.
10. **Segment inventory**: chống trùng ghế theo (chuyến, CHẶNG, ghế) — ghế khách xuống giữa đường bán lại được chặng sau.
11. **Add-on**: bảo hiểm 15K/khách (mọi sản phẩm); riêng bus: xe đạp/SUP 50K, thú cưng 80K, đón Nội Bài 250K.
12. **QR vé động**: đổi mã mỗi 30s (vé huỷ ngừng quay); admin check-in xác thực theo time-slot.
13. **Audit log append-only** cho: đổi giá, hoàn vé, phân quyền, duyệt đối tác, sửa bảng công, đăng nhập.

## Interactions & State (tóm tắt — chi tiết nằm trong chính các file JSX)

- **i18n**: lần đầu detect `navigator.language` → 1 trong 6; lưu `dt_lang`; mọi chuỗi UI qua `I18N.t`, nội dung sản phẩm là object `{vi,en,ja,ko,zh,fr}` qua `I18N.L`. Đổi ngôn ngữ phát event `dt:lang` → toàn UI re-render + theme đổi.
- **Theme văn hoá**: `html[data-theme=lang]` đổi biến CSS (mỗi ngôn ngữ 1 bảng màu/font/bo góc — xem `themes.js`); thành phần giao dịch (vé, sơ đồ ghế) dùng `--fn-dark` cố định.
- **Luồng đặt xe**: search → kết quả (lọc loại xe, sort, ★, số ghế trống) → [khứ hồi: chọn chuyến về] → sơ đồ ghế (tab 2 chặng nếu RT; gợi ý charter khi ≥4 ghế; cap 6 ghế) → thông tin (đón/trả, VAT invoice, add-on) → thanh toán (promo, 4 phương thức, demo fail) → vé QR động + timeline thông báo.
- **Giỏ**: nhiều dịch vụ, mỗi item giữ hold riêng, phụ thu lễ theo item, upsell bundle −10%, thanh toán 1 lần.
- **Chatbot**: keyword intent 6 ngôn ngữ; tra mã vé regex `DT26-…`; trả giá/lịch/promo từ data sống.
- **Loading/empty/error states** đã thiết kế: processing thanh toán, thất bại, empty cart, lookup not-found, no-trips.

## Liên thông (đã chứng minh chạy được trong nguyên mẫu — demo qua localStorage, production = API + DB)

Web đặt vé → booking hiện trong admin (chấm ●, dashboard alert) → app khách hiển thị vé thật + QR → app HDV nhận khách cần đón (🌐). Charter request → alert dashboard (SLA 2h). Hồ sơ ứng tuyển web → pipeline tuyển dụng. CMS/campaign admin → web realtime. **Production: thay `localStorage`/`DT_STORE`/`DT_CART`/`cms.js` bằng API Cloud Run + Postgres, giữ nguyên hành vi.**

## Design Tokens (từ `shared/tokens.css` — dùng nguyên xi)

- **Brand**: `--red #A8121E` · `--red-bright #D81F2A` (CTA) · `--gold #B98A3C` · `--gold-bright #D4A648` · `--navy #122441` · `--navy-800 #1B3157` · `--navy-700 #24406F`; soft: `--red-soft #FBEAEA`, `--gold-soft #F5EDDC`, `--navy-soft #E9EEF6`; `--fn-dark #122441` (không theme).
- **Neutrals ấm**: `--ivory #FAF8F4` (nền) · `--paper #FFF` · `--sand #F1ECE3` · `--ink #1C2433` · `--ink-2 #4A5468` · `--ink-3 #8A91A3` · `--line #E4DFD5` · `--line-2 #D4CEC0`.
- **Status**: ok `#1F7A4D`/`#E3F2E9` · warn `#B3661A`/`#FBF0DE` · bad `#B3261E`/`#FCEAE8`.
- **Type**: display `'Playfair Display', serif` (tiêu đề, giá lớn); UI `'Be Vietnam Pro', system-ui` (+ Noto Sans JP/KR/SC fallback). Web 1440: h1 hero ~clamp 28–44px; body 13–14.5px; admin table 12.5px.
- **Shape**: radius 8/12/18px; shadow 3 cấp (xem tokens.css); hit target mobile ≥44px; CTA dính đáy mobile ≤760px.
- **Theme văn hoá** override các biến trên theo `data-theme` — xem `shared/themes.js` cho 6 bảng đầy đủ.

## Assets

- `assets/brand/logo-DaiichiTravel.webp` — logo chính thức.
- `assets/photos/*.jpg` — ảnh THẬT từ kho marketing công ty (bus, limousine, day cruise, suite, nhà hàng, jacuzzi…) — dùng được cho production; xuất 3 cỡ + WebP lúc build (srcset).
- QR trong nguyên mẫu vẽ canvas demo — production dùng thư viện QR chuẩn + payload ký số.

## Placeholders PHẢI thay trước khi go-live (chủ đầu tư xác nhận giữ tạm)

- MST `0201998877`, địa chỉ ĐKKD, người đại diện (footer 3 nơi + trang pháp lý).
- OTP demo đang hiển thị mã trên màn hình → SMS/Zalo thật, rate-limit 3/SĐT/giờ + captcha từ lần 2.
- Thanh toán mô phỏng → VNPay/MoMo/cổng thẻ + webhook; checkbox "demo thẻ từ chối" chỉ giữ ở môi trường staging.
- Nút "Xuất Excel/Gửi Zalo/In danh sách" trong admin = stub → nối backend.
- Email `info@`, `partner@daiichitravel.vn`, hotline cần xác nhận lại.

## Thứ tự triển khai gợi ý (GĐ1)

1. Setup Next.js + Postgres schema (Handoff mục 3) + seed từ `shared/data.js`.
2. API public: routes/trips/seats/holds/tours/campaigns/bookings/payments/OTP (Handoff mục 4).
3. Web khách: port `customer/` theo từng flow, ưu tiên BusFlow + CheckoutFlow (file đặc tả hành vi chuẩn).
4. Back Office: login thật + phân quyền (ma trận Handoff mục 6) → bán hàng → vận hành → HR.
5. Tích hợp: VNPay/MoMo, Zalo OA, Cloud Translation, GA4 + Consent Mode v2, Sentry/UptimeRobot.
6. Migrate SEO: giữ 72 URL, 301 từ 4 domain cũ, regenerate landing theo giá DB.
7. Load test trùng ghế + nghiệm thu theo checklist.
