/* DAIICHI BACK OFFICE — HR/payroll, user & permission management, audit log */
const { useState: hUseState } = React;

/* ---------- payroll & timesheets (for accounting) ---------- */
function PayrollView() {
  const [reqs, setReqs] = hUseState([
    { id: 'r1', who: 'Phạm Văn Tài · Đội xe', what: 'Nghỉ phép T6 12/06 (1 ngày)', note: 'Việc gia đình · còn 6 ngày phép', st: null },
    { id: 'r2', who: 'Lê Thu Trang · Quầy vé', what: 'Đổi ca: sáng 14/06 ↔ chiều 15/06', note: 'Đã thoả thuận với Ng. Thuý Hằng', st: null },
    { id: 'r3', who: 'Đỗ Tiến Dũng · Thuyền viên', what: 'Tăng ca chuyến VIP 5 đêm 11/06 (+3h)', note: 'Theo lệnh điều hành tàu', st: null },
  ]);
  const setR = (id, v) => setReqs(reqs.map((r) => r.id === id ? { ...r, st: v } : r));
  const emps = [
    ['Phạm Văn Tài', 'Đội xe · Tài xế', '21,5 / 26', '128h lái', '4h', '12.460.000đ', 'ok'],
    ['Lê Thu Trang', 'Quầy vé Cát Bà', '24 / 26', '192h', '6h', '9.840.000đ', 'ok'],
    ['Đỗ Tiến Dũng', 'Thuyền viên · VIP 4', '23 / 26', '184h', '12h', '11.230.000đ', 'warn'],
    ['Ngô Thuý Hằng', 'HDV xe · HN–CB', '22 / 26', '176h', '2h', '8.950.000đ', 'ok'],
    ['Trịnh Công Minh', 'Điều hành xe', '26 / 26', '208h', '8h', '14.380.000đ', 'ok'],
    ['Đặng Kim Chi', 'Kế toán', '25 / 26', '200h', '0h', '13.120.000đ', 'ok'],
  ];
  return (
    <div data-screen-label="Admin — Chấm công & lương">
      <div className="bo-head">
        <div><h1>Chấm công & bảng lương</h1><div className="sub">Kỳ 01–30/06/2026 · dữ liệu đổ về từ app chấm công GPS của toàn bộ nhân viên</div></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="bo-btn ghost">Xuất Excel</button>
          <button className="bo-btn navy">Chốt công kỳ 06/2026</button>
        </div>
      </div>
      <div className="bo-kpis">
        <div className="bo-kpi"><div className="lb">Nhân sự đang hoạt động</div><div className="v">42</div><div className="d up">6 phòng ban · 2 ca</div></div>
        <div className="bo-kpi"><div className="lb">Tổng công tháng 6</div><div className="v">941,5</div><div className="d up">▲ đạt 96% kế hoạch</div></div>
        <div className="bo-kpi"><div className="lb">Giờ tăng ca</div><div className="v">86h</div><div className="d dn">▲ 12h so với T5 — kiểm tra đội thuyền viên</div></div>
        <div className="bo-kpi"><div className="lb">Quỹ lương tạm tính</div><div className="v">486M</div><div className="d up">chờ duyệt 3 đơn từ</div></div>
      </div>
      <div className="bo-grid2">
        <div className="bo-card">
          <h3>Bảng công & lương tạm tính <span className="mut">click Chốt công để gửi sang kế toán lương</span></h3>
          <table className="bo-table">
            <thead><tr><th>Nhân viên</th><th>Bộ phận</th><th className="r">Công</th><th className="r">Giờ làm / lái</th><th className="r">OT</th><th className="r">Lương tạm tính</th><th></th></tr></thead>
            <tbody>
              {emps.map((e, i) => (
                <tr key={i}>
                  <td><b>{e[0]}</b></td><td>{e[1]}</td><td className="r">{e[2]}</td><td className="r">{e[3]}</td>
                  <td className="r">{e[4]}</td><td className="r"><b>{e[5]}</b></td>
                  <td><Badge kind={e[6]}>{e[6] === 'ok' ? 'Đủ điều kiện' : 'OT cao'}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="dt-notice" style={{ marginTop: 12 }}>
            Giờ lái của tài xế được đối chiếu tự động với GPS chuyến — lệch &gt;15 phút sẽ gắn cờ cho điều hành xác nhận.
          </div>
        </div>
        <div className="bo-card" style={{ alignSelf: 'start' }}>
          <h3>Đơn từ chờ duyệt <span className="mut">{reqs.filter((r) => r.st === null).length}</span></h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {reqs.map((r) => (
              <div key={r.id} style={{ border: '1px solid var(--line)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 700 }}>{r.who}</div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)', margin: '3px 0' }}>{r.what}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{r.note}</div>
                {r.st === null ? (
                  <div style={{ display: 'flex', gap: 8, marginTop: 9 }}>
                    <button className="bo-btn navy" style={{ flex: 1, padding: '7px 0' }} onClick={() => setR(r.id, 'ok')}>Duyệt</button>
                    <button className="bo-btn ghost" style={{ flex: 1, padding: '7px 0' }} onClick={() => setR(r.id, 'no')}>Từ chối</button>
                  </div>
                ) : (
                  <div style={{ marginTop: 9 }}><Badge kind={r.st === 'ok' ? 'ok' : 'bad'}>{r.st === 'ok' ? '✓ Đã duyệt — cập nhật bảng công & app' : '✕ Đã từ chối — thông báo qua app'}</Badge></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- users & permissions ---------- */
const BO_ROLES = ['Ban giám đốc', 'Điều hành xe & tàu', 'Kế toán', 'Quầy vé / POS', 'HDV / Thuyền viên', 'Tài xế', 'Marketing', 'Đại lý (ngoài)', 'Đối tác (ngoài)'];
function UsersView() {
  const [users, setUsers] = hUseState([
    { id: 1, name: 'Trần Quản Lý', ct: 'ql@daiichitravel.vn', role: 'Ban giám đốc', on: true },
    { id: 2, name: 'Trịnh Công Minh', ct: '0905 667 889', role: 'Điều hành xe & tàu', on: true },
    { id: 3, name: 'Đặng Kim Chi', ct: 'ketoan@daiichitravel.vn', role: 'Kế toán', on: true },
    { id: 4, name: 'Lê Thu Trang', ct: '0961 004 712', role: 'Quầy vé / POS', on: true },
    { id: 5, name: 'Ngô Thuý Hằng', ct: '0988 102 334', role: 'HDV / Thuyền viên', on: true },
    { id: 6, name: 'Phạm Văn Tài', ct: '0912 334 556', role: 'Tài xế', on: true },
    { id: 7, name: 'An Phú Travel', ct: 'Ms. Lan · 0912 334 556', role: 'Đại lý (ngoài)', on: true },
    { id: 8, name: 'Hùng Cường Express', ct: 'hcexpress@gmail.com', role: 'Đối tác (ngoài)', on: true },
    { id: 9, name: 'Bùi Ngọc Anh', ct: '0905 111 223', role: 'Marketing', on: false },
  ]);
  const [dept, setDept] = hUseState('all');
  const up = (id, patch) => setUsers(users.map((u) => u.id === id ? { ...u, ...patch } : u));
  const shown = dept === 'all' ? users : users.filter((u) => u.role === dept);
  return (
    <div data-screen-label="Admin — Người dùng & phân quyền">
      <div className="bo-head">
        <div><h1>Người dùng & phân quyền</h1><div className="sub">Một tài khoản / người · vai trò quyết định màn hình và thao tác (theo ma trận phân quyền) · mọi thay đổi ghi vào audit log</div></div>
        <button className="bo-btn">+ Thêm người dùng</button>
      </div>
      <div className="bo-filters">
        <button className={'bo-chip' + (dept === 'all' ? ' on' : '')} onClick={() => setDept('all')}>Tất cả · {users.length}</button>
        {BO_ROLES.map((r) => users.some((u) => u.role === r) && (
          <button key={r} className={'bo-chip' + (dept === r ? ' on' : '')} onClick={() => setDept(r)}>{r}</button>
        ))}
      </div>
      <div className="bo-card" style={{ overflowX: 'auto' }}>
        <table className="bo-table">
          <thead><tr><th>Người dùng</th><th>Liên hệ</th><th>Vai trò (đổi là áp dụng ngay)</th><th>Trạng thái</th><th></th></tr></thead>
          <tbody>
            {shown.map((u) => (
              <tr key={u.id}>
                <td><b>{u.name}</b></td>
                <td>{u.ct}</td>
                <td>
                  <select className="bo-select" value={u.role} style={{ padding: '6px 9px', fontSize: 12 }}
                    onChange={(e) => up(u.id, { role: e.target.value })}>
                    {BO_ROLES.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </td>
                <td>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 700, color: u.on ? 'var(--ok)' : 'var(--ink-3)', cursor: 'pointer' }}>
                    <input type="checkbox" checked={u.on} style={{ accentColor: 'var(--ok)' }} onChange={() => up(u.id, { on: !u.on })} />
                    {u.on ? 'Hoạt động' : 'Đã khoá'}
                  </label>
                </td>
                <td className="r"><button className="bo-btn ghost" style={{ padding: '5px 11px', fontSize: 11 }}>Gửi lại OTP</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- audit log ---------- */
function AuditView() {
  const [f, setF] = hUseState('all');
  const rows = [
    ['10/06 14:32', 'Trần Quản Lý', 'pricing', 'Đổi % FLASH SALE: 20% → 25%', 'Giá & KM', '113.161.x.x'],
    ['10/06 14:05', 'Trần Quản Lý', 'partner', 'Duyệt tour mới: SUP Bình minh (Cát Bà Ocean Tour)', 'Đối tác', '113.161.x.x'],
    ['10/06 11:47', 'Lê Thu Trang', 'booking', 'Check-in DT26-8X4K2 · 2 khách · chuyến 11:45', 'POS Cát Bà', '14.245.x.x'],
    ['10/06 10:18', 'Đặng Kim Chi', 'finance', 'Xác nhận thu công nợ An Phú Travel: 5.000.000đ', 'Công nợ', '113.161.x.x'],
    ['10/06 09:55', 'Trịnh Công Minh', 'trip', 'Giữ chỗ điện thoại: 2 ghế chuyến 08:00 HN→CB 11/06', 'Sơ đồ ghế', '113.161.x.x'],
    ['10/06 09:12', 'Trần Quản Lý', 'perm', 'Đổi vai trò Bùi Ngọc Anh: Quầy vé → Marketing', 'Phân quyền', '113.161.x.x'],
    ['10/06 08:40', 'Hùng Cường Express', 'partner', 'Khoá bán chuyến 19:00 HN→HP (xe bảo dưỡng)', 'Cổng đối tác', '27.72.x.x'],
    ['10/06 08:02', 'Lê Thu Trang', 'auth', 'Đăng nhập POS · ca sáng · GPS khớp quầy Cát Bà', 'Đăng nhập', '14.245.x.x'],
    ['09/06 22:14', 'system', 'finance', 'Đối soát VNPay tự động: 214 GD · khớp 100%', 'Đối soát', '—'],
    ['09/06 17:30', 'Trần Quản Lý', 'booking', 'Hoàn vé DT26-K9WD4 · 100% (huỷ trước 12h)', 'Booking', '113.161.x.x'],
  ];
  const FILTERS = [['all', 'Tất cả'], ['pricing', 'Giá & KM'], ['booking', 'Booking'], ['finance', 'Tài chính'], ['perm', 'Phân quyền'], ['partner', 'Đối tác'], ['auth', 'Đăng nhập'], ['trip', 'Chuyến']];
  const shown = f === 'all' ? rows : rows.filter((r) => r[2] === f);
  return (
    <div data-screen-label="Admin — Nhật ký thao tác">
      <div className="bo-head">
        <div><h1>Nhật ký thao tác (audit log)</h1><div className="sub">Ghi tự động, không thể sửa/xoá · lưu 24 tháng · phục vụ đối soát & truy vết</div></div>
        <button className="bo-btn ghost">Xuất nhật ký</button>
      </div>
      <div className="bo-filters">
        {FILTERS.map(([id, lb]) => (
          <button key={id} className={'bo-chip' + (f === id ? ' on' : '')} onClick={() => setF(id)}>{lb}</button>
        ))}
      </div>
      <div className="bo-card" style={{ overflowX: 'auto' }}>
        <table className="bo-table">
          <thead><tr><th>Thời gian</th><th>Người thao tác</th><th>Hành động</th><th>Khu vực</th><th>IP</th></tr></thead>
          <tbody>
            {shown.map((r, i) => (
              <tr key={i}>
                <td className="mono">{r[0]}</td>
                <td><b>{r[1]}</b></td>
                <td>{r[3]}</td>
                <td><Badge kind="info">{r[4]}</Badge></td>
                <td className="mono">{r[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Object.assign(window, { PayrollView, UsersView, AuditView });
