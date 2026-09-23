# HƯỚNG DẪN DEPLOY LÊN FIREBASE HOSTING (Google)

Dành cho đội IT — toàn bộ cấu hình đã chuẩn bị sẵn trong `firebase.json` và `.firebaserc`.

## Chuẩn bị (làm 1 lần)

1. Vào https://console.firebase.google.com (đăng nhập Gmail công ty)
   → **Add project** → đặt tên, ví dụ: `daiichi-travel`
2. Nếu đặt tên project KHÁC `daiichi-travel`: mở file `.firebaserc`
   và sửa dòng `"default": "daiichi-travel"` thành đúng Project ID vừa tạo.
3. Trên máy tính (cần Node.js ≥ 18):

   npm install -g firebase-tools
   firebase login

## Deploy

Đứng trong thư mục gốc dự án (nơi có file `firebase.json`):

   firebase deploy

Xong — Firebase in ra địa chỉ dạng `https://daiichi-travel.web.app`.
Mỗi lần cập nhật nội dung, chỉ cần chạy lại đúng 1 lệnh `firebase deploy`.

## Gắn tên miền daiichitravel.com

1. Firebase Console → **Hosting** → **Add custom domain** → nhập `daiichitravel.com`
2. Firebase hiện 2 bản ghi DNS (loại A hoặc TXT để xác minh)
   → dán vào trang quản trị DNS của nhà đăng ký domain
3. Chờ DNS lan truyền (vài phút → vài giờ). SSL (https) được Google cấp tự động.
4. Lặp lại bước 1 với `www.daiichitravel.com` (Firebase tự redirect www → gốc).

## Cấu hình đã cài sẵn trong firebase.json

- `cleanUrls: true` — URL sạch, không đuôi .html
- Cache: ảnh `assets/` 30 ngày · CSS/JS 1 ngày · HTML 10 phút
  (đổi nội dung CMS/giá là khách thấy bản mới trong tối đa 10 phút)
- Đường tắt: `/booking` → trang đặt vé
- Khu vực quản trị (`admin/`) KHÔNG có link công khai và bị chặn index
  (robots.txt + noindex). Nhân viên/đại lý truy cập bằng URL nội bộ:
  `/admin/Daiichi Back Office.html` — khi xây bản thật phải đặt sau đăng nhập.
- Bỏ qua không upload: thư mục `research/`, file cấu hình

## Sau khi domain chạy

1. Google Search Console → thêm property `daiichitravel.com`
   → Sitemaps → submit `https://daiichitravel.com/sitemap.xml`
2. Trỏ 301 các domain cũ (daiichitravel.vn, lanhacruises.vn, daiichibus.vn)
   về domain chính — xem chi tiết trong `Go-live Checklist.html`.

## Lưu ý

- Đây là NGUYÊN MẪU: booking là demo (lưu trên trình duyệt khách).
  Phù hợp để duyệt nội bộ, demo đại lý/đối tác. Bán vé thật cần backend
  (Cloud Run + Cloud SQL) — xem `Handoff - Đặc tả kỹ thuật.html`.
- Gói Spark miễn phí đủ dùng cho demo. Khi lưu lượng tăng, nâng lên
  gói Blaze (trả theo dùng) trong Firebase Console → không cần deploy lại.
