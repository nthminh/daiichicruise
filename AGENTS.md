# AGENTS.md — workspace Daiichi Travel

> **Code SỐNG (production) + toàn bộ tài liệu kiểm soát code nằm trong `gd1/`.**
> Thư mục này (cha) còn chứa nguyên mẫu HTML cũ (`*.html`, `admin/`, `customer/`, `shared/`, `research/`)
> — chỉ để tham chiếu thiết kế, KHÔNG deploy.

## 👉 Đọc trước khi làm bất cứ việc gì với code:

1. **`gd1/AGENTS.md`** — điểm vào: hệ thống là gì, kiến trúc, **luật bất biến**, cách chạy/deploy/backup.
2. **`gd1/ARCHITECTURE.md`** — kiến trúc chi tiết (engine giá, ghế, phân quyền, i18n).
3. **`gd1/CODEMAP.md`** — bản đồ liên kết tự sinh (endpoint/import/web→API/bảng). Cập nhật: `node gd1/scripts/gen-codemap.mjs`.

Tài liệu khác ở thư mục cha: `CHIEN-LUOC-TIEP-CAN-KHACH-HANG.md` (marketing) · `MAT-KHAU-BO-MOI-*.md` (**mật khẩu BO prod — bí mật, KHÔNG commit/đẩy lên git**).
