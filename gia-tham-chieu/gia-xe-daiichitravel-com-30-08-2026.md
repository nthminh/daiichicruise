# Giá xe lấy từ daiichitravel.com — tra ngày 30/08/2026

Nguồn: chính hệ thống bán vé của daiichitravel.com (Supabase REST mà web dùng),
đối chiếu bằng tìm kiếm thật với tư cách khách lẻ cho ngày 10/09/2026.

## Giá vé lẻ MỘT CHIỀU (đồng/khách, giá khách lẻ)

| Chặng | Bus 45 | Limousine | Limo 11 | Limo 34 | Limogreen 7 |
|---|--:|--:|--:|--:|--:|
| Hà Nội → Cát Bà | 250.000 | 310.000 | 330.000 | 310.000 | 330.000 |
| Cát Bà → Hà Nội | 250.000 | 310.000 | 330.000 | 330.000 | 330.000 |
| Hà Nội → Hải Phòng | — | — | 210.000 | — | 210.000 |
| Hải Phòng → Hà Nội | — | — | 210.000 | — | 210.000 |
| Hải Phòng → Cát Bà | — | — | — | — | 200.000 |
| Cát Bà → Hải Phòng | — | — | — | — | 200.000 |
| Hà Nội → Hạ Long | 230.000 | 330.000 | — | — | — |
| Hạ Long → Hà Nội | 230.000 | 330.000 | — | — | — |
| Hà Nội → Ninh Bình | — | — | 200.000 | — | — |
| Ninh Bình → Hà Nội | — | — | 200.000 | — | — |
| Ninh Bình → Cát Bà | 250.000 | — | — | — | — |
| Cát Bà → Ninh Bình | 300.000 | — | — | — | — |
| Hạ Long → Ninh Bình | 300.000 | — | — | — | — |
| Ninh Bình → Hạ Long | 300.000 | — | — | — | — |

Xe riêng (CHARTER): Hà Nội ⇄ Cát Bà Limogreen 7 chỗ 2.400.000/xe ·
Nội Bài ⇄ Hà Nội 7 chỗ 300.000/xe.

## Cáp treo
KHÔNG phải tuyến riêng — là **dịch vụ cộng thêm 60.000đ/khách**, gắn vào
một số giờ chạy nhất định (không phải mọi chuyến). Kiểu `TRANSPORT`.

## Cơ chế giá theo ngày mà site anh em đang dùng
- `price_periods`: danh sách khoảng ngày, mỗi khoảng một giá khách lẻ + giá đại lý.
  Ví dụ Limo 34 HN→CB: 01/04–08/05 = 380.000 · 09/05–07/06 = 360.000 ·
  08/06–05/08 = 360.000 · 06/08–02/09 = 340.000 · 03/09/26–31/03/27 = 310.000.
- `surcharges`: phụ thu có kiểu (`HOLIDAY`), tên, số tiền, khoảng ngày, bật/tắt.
  Đang có: Lễ 30/4–1/5 +30.000 · Lễ 2/9 (29–31/08) +30.000 · **Tết 2027: 05/02–08/02/2027 +30.000**.
- Mỗi tuyến còn có `agent_price` riêng cho đại lý (thấp hơn giá lẻ ~20%).

## Đối chiếu với bảng giá tàu ngủ
- Phiếu yêu cầu: bus thường +550.000/khách khứ hồi, limousine +650.000/khách khứ hồi.
- Cột "Giá Bus 2 chiều" trong Excel tàu ngủ: 550.000 × số khách → KHỚP với phiếu.
- Mục VIII Excel (350.000 / 450.000 khứ hồi): KHÔNG khớp giá lẻ đang bán
  (2×250.000 = 500.000 và 2×310.000 = 620.000) → nhiều khả năng đã cũ.
