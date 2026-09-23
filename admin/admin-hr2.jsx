/* DAIICHI BACK OFFICE — HR đầy đủ: hồ sơ nhân sự, bảng công tháng, tính lương chi tiết */
const { useState: h2UseState, useMemo: h2UseMemo } = React;

/* ---------- nhân sự master ---------- */
const HR_STAFF = [
  { id: 1, nm: 'Phạm Văn Tài', dept: 'Đội xe', role: 'Tài xế', join: '2019-03-01', contract: 'Không xác định thời hạn', base: 9500000, allow: 1800000, lic: 'GPLX hạng D · hết hạn 14/07/2026', licWarn: true, leave: 6, bhxh: 'HP0312...88' },
  { id: 2, nm: 'Lê Đức Bình', dept: 'Đội xe', role: 'Tài xế', join: '2021-06-15', contract: '36 tháng (đến 06/2027)', base: 9000000, allow: 1800000, lic: 'GPLX hạng D · hết hạn 02/2028', licWarn: false, leave: 9, bhxh: 'HP0345...12' },
  { id: 3, nm: 'Lê Thu Trang', dept: 'Quầy vé', role: 'NV quầy + HDV', join: '2022-02-10', contract: '36 tháng (đến 02/2028)', base: 7200000, allow: 1200000, lic: '—', licWarn: false, leave: 11, bhxh: 'HP0401...55' },
  { id: 4, nm: 'Ngô Thuý Hằng', dept: 'Hướng dẫn', role: 'HDV tuyến HN–CB', join: '2020-11-20', contract: 'Không xác định thời hạn', base: 7800000, allow: 1500000, lic: 'Thẻ HDV nội địa · hết hạn 11/2027', licWarn: false, leave: 4, bhxh: 'HP0298...71' },
  { id: 5, nm: 'Đỗ Tiến Dũng', dept: 'Thuyền viên', role: 'Thuyền phó VIP 4', join: '2018-05-02', contract: 'Không xác định thời hạn', base: 11200000, allow: 2200000, lic: 'Chứng chỉ thuyền viên · hết hạn 09/08/2026', licWarn: true, leave: 2, bhxh: 'HP0255...30' },
  { id: 6, nm: 'Trịnh Công Minh', dept: 'Điều hành', role: 'Trưởng điều hành xe', join: '2017-09-01', contract: 'Không xác định thời hạn', base: 14500000, allow: 2500000, lic: '—', licWarn: false, leave: 12, bhxh: 'HP0231...09' },
  { id: 7, nm: 'Đặng Kim Chi', dept: 'Kế toán', role: 'Kế toán tổng hợp', join: '2019-12-01', contract: 'Không xác định thời hạn', base: 12800000, allow: 1600000, lic: '—', licWarn: false, leave: 8, bhxh: 'HP0327...44' },
  { id: 8, nm: 'Bùi Ngọc Anh', dept: 'Marketing', role: 'Nội dung & CMS', join: '2023-04-17', contract: '24 tháng (đến 04/2027)', base: 8800000, allow: 1000000, lic: '—', licWarn: false, leave: 10, bhxh: 'HP0466...02' },
];
const HR_DEPTS = ['Tất cả', 'Đội xe', 'Quầy vé', 'Hướng dẫn', 'Thuyền viên', 'Điều hành', 'Kế toán', 'Marketing'];

/* ---------- 1 · hồ sơ nhân sự ---------- */
function StaffView() {
  const [dept, setDept] = h2UseState('Tất cả');
  const rows = dept === 'Tất cả' ? HR_STAFF : HR_STAFF.filter((s) => s.dept === dept);
  const warns = HR_STAFF.filter((s) => s.licWarn).length;
  return (
    <div data-screen-label="Admin — Hồ sơ nhân sự">
      <div className="bo-head">
        <div><h1>Hồ sơ nhân sự</h1><div className="sub">Hợp đồng · bằng cấp/chứng chỉ (tự cảnh báo hết hạn — tài xế hết GPLX bị loại khỏi điều độ) · phép năm · BHXH</div></div>
        <button className="bo-btn">+ Thêm nhân viên</button>
      </div>
      <div className="bo-kpis">
        <div className="bo-kpi"><div className="lb">Tổng nhân sự</div><div className="v">42</div><div className="d up">8 hồ sơ mẫu hiển thị · 6 phòng ban</div></div>
        <div className="bo-kpi"><div className="lb">Hợp đồng sắp hết hạn 90 ngày</div><div className="v" style={{ color: 'var(--warn)' }}>3</div><div className="d dn">nhắc gia hạn tự động</div></div>
        <div className="bo-kpi"><div className="lb">Chứng chỉ sắp hết hạn</div><div className="v" style={{ color: 'var(--bad)' }}>{warns}</div><div className="d dn">GPLX V.Tài 14/07 · CC thuyền viên T.Dũng 09/08</div></div>
        <div className="bo-kpi"><div className="lb">Phép tồn toàn công ty</div><div className="v">318 ngày</div><div className="d up">nhắc nghỉ trước 31/12</div></div>
      </div>
      <div className="bo-filters">
        {HR_DEPTS.map((d) => <button key={d} className={'bo-chip' + (dept === d ? ' on' : '')} onClick={() => setDept(d)}>{d}</button>)}
      </div>
      <div className="bo-card" style={{ overflowX: 'auto' }}>
        <table className="bo-table">
          <thead><tr><th>Nhân viên</th><th>Bộ phận · vị trí</th><th>Vào làm</th><th>Hợp đồng</th><th>Bằng cấp / chứng chỉ</th><th className="r">Phép còn</th><th>BHXH</th></tr></thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id} style={s.licWarn ? { background: 'var(--warn-soft)' } : null}>
                <td><b>{s.nm}</b></td>
                <td>{s.dept} · {s.role}</td>
                <td>{s.join.slice(8)}/{s.join.slice(5, 7)}/{s.join.slice(0, 4)}</td>
                <td>{s.contract}</td>
                <td>{s.licWarn ? <b style={{ color: 'var(--bad)' }}>⚠ {s.lic}</b> : s.lic}</td>
                <td className="r"><b>{s.leave}</b> ngày</td>
                <td className="mono">{s.bhxh}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="dt-notice" style={{ marginTop: 12 }}>
        Liên thông vận hành: GPLX/chứng chỉ hết hạn → nhân viên <b>tự biến mất khỏi dropdown Bảng điều độ</b> (giống cơ chế khoá xe hết đăng kiểm). Nhắc gia hạn gửi Zalo trước 30 ngày.
      </div>
    </div>
  );
}

/* ---------- 2 · bảng công lưới tháng ---------- */
const TS_STATES = ['X', 'P', 'O', '–'];
const TS_COLOR = { X: ['var(--ok-soft)', 'var(--ok)'], P: ['var(--gold-soft)', '#7A5A1E'], O: ['var(--navy-soft)', 'var(--navy-700)'], '–': ['var(--bad-soft)', 'var(--bad)'] };
function initSheet() {
  const sheet = {};
  HR_STAFF.forEach((s) => {
    sheet[s.id] = Array.from({ length: 30 }, (_, d) => {
      const dow = (d + 1) % 7; // 0 = CN demo
      if (dow === 0) return s.dept === 'Đội xe' || s.dept === 'Thuyền viên' || s.dept === 'Quầy vé' ? 'X' : '–';
      if (s.id === 1 && d === 11) return 'P';
      if (s.id === 5 && (d === 10 || d === 17)) return 'O';
      if (s.id === 8 && d < 3) return 'P';
      return 'X';
    });
  });
  return sheet;
}
function TimesheetView() {
  const [sheet, setSheet] = h2UseState(initSheet);
  const cycle = (sid, d) => {
    const cur = sheet[sid][d];
    const next = TS_STATES[(TS_STATES.indexOf(cur) + 1) % TS_STATES.length];
    setSheet({ ...sheet, [sid]: sheet[sid].map((x, i) => (i === d ? next : x)) });
  };
  const count = (sid, st) => sheet[sid].filter((x) => x === st).length;
  return (
    <div data-screen-label="Admin — Bảng công tháng">
      <div className="bo-head">
        <div><h1>Bảng công tháng 6/2026</h1><div className="sub">Tự đổ từ app chấm công GPS · click ô để sửa tay (ghi audit) · X công · P phép · O tăng ca · – nghỉ</div></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <select className="bo-select"><option>Tháng 6/2026</option><option>Tháng 5/2026</option></select>
          <button className="bo-btn navy">Chốt công → chuyển tính lương</button>
        </div>
      </div>
      <div className="bo-card" style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', fontSize: 11, minWidth: 980 }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '6px 10px', fontSize: 10.5, color: 'var(--ink-3)', textTransform: 'uppercase' }}>Nhân viên</th>
              {Array.from({ length: 30 }, (_, d) => (
                <th key={d} style={{ padding: 3, fontSize: 9.5, color: (d + 1) % 7 === 0 ? 'var(--red)' : 'var(--ink-3)', fontWeight: 700 }}>{d + 1}</th>
              ))}
              <th style={{ padding: '6px 8px', fontSize: 10 }}>Công</th>
              <th style={{ padding: '6px 8px', fontSize: 10 }}>OT</th>
              <th style={{ padding: '6px 8px', fontSize: 10 }}>Phép</th>
            </tr>
          </thead>
          <tbody>
            {HR_STAFF.map((s) => (
              <tr key={s.id} style={{ borderTop: '1px solid var(--ivory)' }}>
                <td style={{ padding: '5px 10px', whiteSpace: 'nowrap' }}><b style={{ fontSize: 11.5 }}>{s.nm}</b><br /><span style={{ fontSize: 9.5, color: 'var(--ink-3)' }}>{s.dept}</span></td>
                {sheet[s.id].map((st, d) => (
                  <td key={d} style={{ padding: 1.5 }}>
                    <button onClick={() => cycle(s.id, d)} title={'Ngày ' + (d + 1) + ': ' + st}
                      style={{ width: 22, height: 21, border: 0, borderRadius: 4, fontSize: 9.5, fontWeight: 800, cursor: 'pointer', background: TS_COLOR[st][0], color: TS_COLOR[st][1], fontFamily: 'inherit' }}>{st}</button>
                  </td>
                ))}
                <td style={{ textAlign: 'center', fontWeight: 800, color: 'var(--navy)' }}>{count(s.id, 'X') + count(s.id, 'O')}</td>
                <td style={{ textAlign: 'center', fontWeight: 700, color: 'var(--navy-700)' }}>{count(s.id, 'O') * 3}h</td>
                <td style={{ textAlign: 'center', color: '#7A5A1E', fontWeight: 700 }}>{count(s.id, 'P')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 11.5, color: 'var(--ink-2)', flexWrap: 'wrap' }}>
          {TS_STATES.map((st) => (
            <span key={st} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 18, height: 16, borderRadius: 4, background: TS_COLOR[st][0], color: TS_COLOR[st][1], fontSize: 9.5, fontWeight: 800, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{st}</span>
              {st === 'X' ? 'Đi làm' : st === 'P' ? 'Phép có lương' : st === 'O' ? 'Có tăng ca (+3h)' : 'Nghỉ không lương'}
            </span>
          ))}
          <span style={{ color: 'var(--ink-3)' }}>· Sửa tay được ghi audit log kèm lý do</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- 3 · tính lương chi tiết ---------- */
function SalaryView() {
  const [sel, setSel] = h2UseState(null);
  const calc = (s) => {
    const workDays = 25 + (s.id % 2); // demo từ bảng công
    const otHours = s.id === 5 ? 6 : s.id === 1 ? 3 : 0;
    const daily = s.base / 26;
    const salWork = daily * workDays;
    const salOT = (s.base / 26 / 8) * otHours * 1.5;
    const posBonus = s.dept === 'Quầy vé' ? 850000 : 0; // thưởng doanh số POS
    const gross = salWork + salOT + s.allow + posBonus;
    const bhxh = Math.round(s.base * 0.105);
    const taxable = Math.max(0, gross - bhxh - 11000000);
    const tax = Math.round(taxable * 0.05);
    const net = Math.round(gross - bhxh - tax);
    return { workDays, otHours, salWork: Math.round(salWork), salOT: Math.round(salOT), posBonus, gross: Math.round(gross), bhxh, tax, net };
  };
  const all = HR_STAFF.map((s) => ({ s, c: calc(s) }));
  const fund = all.reduce((t, x) => t + x.c.net, 0);
  return (
    <div data-screen-label="Admin — Tính lương">
      <div className="bo-head">
        <div><h1>Tính lương kỳ 06/2026</h1><div className="sub">Công thức: lương cơ bản/26 × công + OT ×1,5 + phụ cấp + thưởng POS − BHXH 10,5% − thuế TNCN tạm tính · click dòng để xem phiếu lương</div></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="bo-btn ghost">Xuất bảng lương (Excel)</button>
          <button className="bo-btn navy">Duyệt & lập uỷ nhiệm chi</button>
        </div>
      </div>
      <div className="bo-kpis" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        <div className="bo-kpi"><div className="lb">Tổng thực lĩnh (8 NV mẫu)</div><div className="v">{fmtM(fund)}</div><div className="d up">toàn công ty ~486M</div></div>
        <div className="bo-kpi"><div className="lb">BHXH công ty đóng (17,5%)</div><div className="v">{fmtM(Math.round(HR_STAFF.reduce((t, s) => t + s.base, 0) * 0.175))}</div><div className="d up">nộp trước 30/06</div></div>
        <div className="bo-kpi"><div className="lb">Thưởng doanh số POS</div><div className="v" style={{ color: 'var(--gold)' }}>850K</div><div className="d up">0,5% doanh thu quầy vượt chỉ tiêu</div></div>
      </div>
      <div className="bo-card" style={{ overflowX: 'auto' }}>
        <table className="bo-table">
          <thead><tr><th>Nhân viên</th><th className="r">Công</th><th className="r">Lương công</th><th className="r">OT ×1,5</th><th className="r">Phụ cấp</th><th className="r">Thưởng</th><th className="r">BHXH NV</th><th className="r">Thuế TNCN</th><th className="r">Thực lĩnh</th></tr></thead>
          <tbody>
            {all.map(({ s, c }) => (
              <tr key={s.id} style={{ cursor: 'pointer' }} onClick={() => setSel({ s, c })}>
                <td><b>{s.nm}</b><br /><span style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>{s.dept}</span></td>
                <td className="r">{c.workDays}</td>
                <td className="r">{fmtVnd(c.salWork)}</td>
                <td className="r">{c.otHours ? fmtVnd(c.salOT) : '—'}</td>
                <td className="r">{fmtVnd(s.allow)}</td>
                <td className="r">{c.posBonus ? fmtVnd(c.posBonus) : '—'}</td>
                <td className="r" style={{ color: 'var(--bad)' }}>−{fmtVnd(c.bhxh)}</td>
                <td className="r" style={{ color: 'var(--bad)' }}>−{fmtVnd(c.tax)}</td>
                <td className="r"><b style={{ color: 'var(--ok)', fontSize: 13.5 }}>{fmtVnd(c.net)}</b></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sel && (
        <React.Fragment>
          <div className="bo-drawer-bg" onClick={() => setSel(null)}></div>
          <div className="bo-drawer" data-screen-label="Phiếu lương">
            <button className="x" onClick={() => setSel(null)}>✕</button>
            <h2>Phiếu lương 06/2026</h2>
            <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginBottom: 12 }}>{sel.s.nm} · {sel.s.dept} · {sel.s.role}</div>
            <div className="bo-kv" style={{ gridTemplateColumns: '1fr auto' }}>
              <div><span>Lương cơ bản</span><b>{fmtVnd(sel.s.base)}</b></div><div></div>
              <div><span>Ngày công ({sel.c.workDays}/26)</span><b>{fmtVnd(sel.c.salWork)}</b></div><div></div>
              <div><span>Tăng ca {sel.c.otHours}h × 1,5</span><b>{sel.c.otHours ? fmtVnd(sel.c.salOT) : '—'}</b></div><div></div>
              <div><span>Phụ cấp (ăn trưa, xăng xe, điện thoại)</span><b>{fmtVnd(sel.s.allow)}</b></div><div></div>
              {sel.c.posBonus > 0 && <React.Fragment><div><span>Thưởng doanh số POS</span><b style={{ color: 'var(--gold)' }}>{fmtVnd(sel.c.posBonus)}</b></div><div></div></React.Fragment>}
              <div><span>BHXH + BHYT + BHTN (10,5%)</span><b style={{ color: 'var(--bad)' }}>−{fmtVnd(sel.c.bhxh)}</b></div><div></div>
              <div><span>Thuế TNCN tạm tính</span><b style={{ color: 'var(--bad)' }}>−{fmtVnd(sel.c.tax)}</b></div><div></div>
            </div>
            <div style={{ borderTop: '2px solid var(--navy)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 16 }}>
              <b>THỰC LĨNH</b><b style={{ color: 'var(--ok)' }}>{fmtVnd(sel.c.net)}</b>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button className="bo-btn ghost" style={{ flex: 1 }} onClick={() => window.print()}>In phiếu lương</button>
              <button className="bo-btn navy" style={{ flex: 1 }}>Gửi Zalo cho NV</button>
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--ink-3)', marginTop: 12 }}>Số liệu công lấy từ Bảng công tháng (đã chốt) · thuế TNCN là tạm tính, quyết toán cuối năm theo biểu luỹ tiến.</div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

Object.assign(window, { StaffView, TimesheetView, SalaryView });
