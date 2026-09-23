/* DAIICHI BACK OFFICE — HR mở rộng: đào tạo & an toàn, tuyển thời vụ, xếp ca, KPI & tip, offboarding */
const { useState: h3UseState } = React;

/* ---------- 1 · đào tạo bắt buộc + sức khoẻ + trần OT ---------- */
const COURSES = ['An toàn đường thuỷ', 'Sơ cấp cứu', 'PCCC', 'Nghiệp vụ phục vụ'];
const TRAIN = [
  { nm: 'Phạm Văn Tài', dept: 'Đội xe', c: ['2026-11', '2026-07', '2027-01', null], health: '2026-08', otM: 12, otY: 86 },
  { nm: 'Lê Đức Bình', dept: 'Đội xe', c: ['2026-09', '2026-05', '2026-12', null], health: '2026-06', otM: 4, otY: 42 },
  { nm: 'Lê Thu Trang', dept: 'Quầy vé', c: [null, '2027-02', '2026-10', '2027-03'], health: '2027-01', otM: 18, otY: 122 },
  { nm: 'Ngô Thuý Hằng', dept: 'Hướng dẫn', c: ['2026-12', '2026-06', '2026-09', '2026-11'], health: '2026-10', otM: 8, otY: 64 },
  { nm: 'Đỗ Tiến Dũng', dept: 'Thuyền viên', c: ['2026-06', '2026-08', '2026-07', '2026-12'], health: '2026-05', otM: 34, otY: 178 },
  { nm: 'Trịnh Công Minh', dept: 'Điều hành', c: [null, '2026-09', '2026-08', null], health: '2026-12', otM: 6, otY: 51 },
];
const NOW = '2026-06';
function certState(d) {
  if (!d) return ['na', '—'];
  if (d < NOW) return ['exp', 'HẾT HẠN'];
  const months = (parseInt(d.slice(0, 4)) - 2026) * 12 + parseInt(d.slice(5)) - 6;
  if (months <= 2) return ['soon', d.slice(5) + '/' + d.slice(0, 4)];
  return ['ok', d.slice(5) + '/' + d.slice(0, 4)];
}
const CS_STYLE = { ok: ['var(--ok-soft)', 'var(--ok)'], soon: ['var(--warn-soft)', 'var(--warn)'], exp: ['var(--bad-soft)', 'var(--bad)'], na: ['var(--ivory)', 'var(--ink-3)'] };

function TrainingView() {
  const [zaloSent, setZaloSent] = h3UseState(false);
  const [hkSent, setHkSent] = h3UseState(false);
  const locked = TRAIN.filter((s) => s.c.some((d) => d && d < NOW) || s.health < NOW).length;
  const CLASS_LIST = [
    ['Lê Đức Bình', 'Sơ cấp cứu', 'HẾT HẠN', 'bad'],
    ['Phạm Văn Tài', 'Sơ cấp cứu', '07/2026', 'warn'],
    ['Ngô Thuý Hằng', 'Sơ cấp cứu', '06/2026', 'warn'],
    ['Đỗ Tiến Dũng', 'An toàn đường thuỷ', '06/2026', 'warn'],
    ['Đỗ Tiến Dũng', 'PCCC', '07/2026', 'warn'],
  ];
  return (
    <div data-screen-label="Admin — Đào tạo & an toàn">
      <div className="bo-head">
        <div><h1>Đào tạo bắt buộc · sức khoẻ · trần giờ làm thêm</h1><div className="sub">Chứng chỉ/khám sức khoẻ hết hạn → tự khoá khỏi điều độ & xếp ca · OT chặn theo luật: 40h/tháng · 200h/năm</div></div>
        <button className="bo-btn navy">Lên lớp đào tạo tháng 7</button>
      </div>
      <div className="bo-kpis" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        <div className="bo-kpi"><div className="lb">Nhân sự bị khoá vì hồ sơ an toàn</div><div className="v" style={{ color: 'var(--bad)' }}>{locked}</div><div className="d dn">Đ.T.Dũng: khám SK quá hạn 05/2026</div></div>
        <div className="bo-kpi"><div className="lb">Chứng chỉ đến hạn 60 ngày</div><div className="v" style={{ color: 'var(--warn)' }}>5</div><div className="d dn">gộp 1 lớp tái đào tạo tiết kiệm chi phí</div></div>
        <div className="bo-kpi"><div className="lb">Cảnh báo trần OT</div><div className="v" style={{ color: 'var(--warn)' }}>2</div><div className="d dn">T.Dũng 34h/40h tháng · 178h/200h năm</div></div>
      </div>
      <div className="bo-card" style={{ overflowX: 'auto' }}>
        <h3>Ma trận chứng chỉ & sức khoẻ <span className="mut">ô đỏ = hết hạn (tự khoá) · vàng = ≤60 ngày · xám = không yêu cầu</span></h3>
        <table className="bo-table">
          <thead><tr><th>Nhân viên</th>{COURSES.map((c) => <th key={c}>{c}</th>)}<th>Khám SK định kỳ</th><th>OT tháng / năm</th></tr></thead>
          <tbody>
            {TRAIN.map((s) => {
              const hs = certState(s.health);
              const otWarn = s.otM > 30 || s.otY > 160;
              return (
                <tr key={s.nm}>
                  <td><b>{s.nm}</b><br /><span style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>{s.dept}</span></td>
                  {s.c.map((d, i) => {
                    const [st, lb] = certState(d);
                    return <td key={i}><span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, background: CS_STYLE[st][0], color: CS_STYLE[st][1] }}>{lb}</span></td>;
                  })}
                  <td><span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 700, background: CS_STYLE[hs[0]][0], color: CS_STYLE[hs[0]][1] }}>{hs[1]}</span></td>
                  <td>
                    <div className="bo-track" style={{ height: 6, maxWidth: 120 }}><i style={{ width: Math.min(100, (s.otM / 40) * 100) + '%', background: otWarn ? 'var(--bad)' : 'var(--ok)' }}></i></div>
                    <span style={{ fontSize: 10.5, color: otWarn ? 'var(--bad)' : 'var(--ink-3)', fontWeight: otWarn ? 700 : 500 }}>{s.otM}h/40h · năm {s.otY}h/200h{otWarn ? ' ⚠ sắp chạm trần' : ''}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="bo-grid2" style={{ marginTop: 14 }}>
        <div className="bo-card">
          <h3>📚 Lớp tái đào tạo · 05/07/2026 <span className="mut">gộp 5 lượt sắp hết hạn — tiết kiệm 40% so với học lẻ</span></h3>
          <table className="bo-table">
            <thead><tr><th>Học viên</th><th>Khoá</th><th>Hạn hiện tại</th></tr></thead>
            <tbody>
              {CLASS_LIST.map((r, i) => (
                <tr key={i}><td><b>{r[0]}</b></td><td>{r[1]}</td><td><Badge kind={r[3]}>{r[2]}</Badge></td></tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: 12.5, color: 'var(--ink-2)' }}>Giảng viên: TT Huấn luyện ATLĐ Hải Phòng · thi cuối buổi · <b>850.000đ/người × 5 = 4.250.000đ</b></span>
            {zaloSent
              ? <Badge kind="ok">✓ Đã gửi Zalo triệu tập 5 người + chặn xếp ca ngày 05/07</Badge>
              : <button className="bo-btn navy" onClick={() => setZaloSent(true)}>Gửi Zalo triệu tập</button>}
          </div>
        </div>
        <div className="bo-card" style={{ alignSelf: 'start' }}>
          <h3>🩺 Đợt khám sức khoế · 08/07/2026</h3>
          <div style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.7 }}>
            <b>Đỗ Tiến Dũng</b> (quá hạn 05/2026 — đang khoá) và <b>Lê Đức Bình</b> (hạn 06/2026)<br />
            Phòng khám ĐK Giao thông vận tải HP · khám tiêu chuẩn lái xe/thuyền viên · 460.000đ/người
          </div>
          {hkSent
            ? <Badge kind="ok">✓ Đã đặt lịch + gửi Zalo 2 người</Badge>
            : <button className="bo-btn navy" style={{ marginTop: 10 }} onClick={() => setHkSent(true)}>Đặt lịch & gửi Zalo</button>}
          <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 10 }}>Khám xong cập nhật hạn mới → tự mở khoá điều độ & xếp ca.</div>
        </div>
      </div>
      <div className="dt-notice" style={{ marginTop: 12 }}>
        Hệ thống <b>từ chối chấm công OT</b> khi vượt 40h/tháng hoặc 200h/năm (Bộ luật Lao động) — điều độ phải đổi người thay vì "cố thêm chuyến". Nhắc tái đào tạo/khám SK gửi Zalo trước 30 ngày, đặt lịch gộp theo lớp.
      </div>
    </div>
  );
}

/* ---------- 2 · tuyển dụng & onboarding thời vụ ---------- */
const PIPE_STAGES = ['Ứng tuyển', 'Phỏng vấn', 'Ký HĐ thời vụ', 'Onboarding', 'Sẵn sàng nhận ca'];
function SeasonalView() {
  const [cands, setCands] = h3UseState(() => {
    const base = [
    { id: 1, nm: 'Vũ Thị Hoa', pos: 'HDV thời vụ', stage: 3, ob: { hd: true, attt: true, app: false, ca: false } },
    { id: 2, nm: 'Đào Văn Khang', pos: 'Phụ xe', stage: 1, ob: {} },
    { id: 3, nm: 'Mai Xuân Trường', pos: 'Thuyền viên thời vụ', stage: 2, ob: {} },
    { id: 4, nm: 'Lý Thu Hà', pos: 'NV quầy thời vụ', stage: 4, ob: { hd: true, attt: true, app: true, ca: true } },
    { id: 5, nm: 'Hoàng Gia Bảo', pos: 'HDV thời vụ', stage: 0, ob: {} },
    ];
    /* LIÊN THÔNG THẬT: hồ sơ nộp qua form "Tuyển dụng" trên website đổ vào pipeline */
    try {
      const apps = JSON.parse(localStorage.getItem('dt_applicants') || '[]');
      apps.slice(-5).forEach((a, i) => base.unshift({ id: 'web' + i, nm: a.name + ' 🌐', pos: a.pos, stage: 0, ob: {}, web: true }));
    } catch (e) {}
    return base;
  });
  const [alumni, setAlumni] = h3UseState([
    { id: 'a1', nm: 'Trần Thị Thu', pos: 'HDV thời vụ · mùa 2025', grade: 'A', note: '4,9★ khách khen · muốn quay lại', called: false },
    { id: 'a2', nm: 'Nguyễn Văn Lợi', pos: 'Phụ xe · mùa 2025', grade: 'B', note: 'Chăm chỉ · cần kèm thêm ngoại ngữ', called: false },
    { id: 'a3', nm: 'Phạm Thu Trang', pos: 'NV quầy · mùa 2024+2025', grade: 'A', note: '2 mùa liên tiếp · thuộc quy trình POS', called: false },
  ]);
  const recall = (a) => {
    setAlumni(alumni.map((x) => x.id === a.id ? { ...x, called: true } : x));
    setCands([...cands, { id: Date.now(), nm: a.nm, pos: a.pos.split(' · ')[0], stage: 2, ob: {} }]);
  };
  const OB_STEPS = [['hd', 'Ký HĐ + hồ sơ'], ['attt', 'Đào tạo an toàn bắt buộc'], ['app', 'Cấp tài khoản app + phân quyền'], ['ca', 'Gán ca thử việc có kèm cặp']];
  const advance = (id) => setCands(cands.map((c) => c.id === id ? { ...c, stage: Math.min(4, c.stage + 1) } : c));
  const toggleOb = (id, k) => setCands(cands.map((c) => c.id === id ? { ...c, ob: { ...c.ob, [k]: !c.ob[k] } } : c));
  return (
    <div data-screen-label="Admin — Tuyển dụng thời vụ">
      <div className="bo-head">
        <div><h1>Tuyển dụng & onboarding thời vụ</h1><div className="sub">Mùa cao điểm 27/5–02/8 cần +8 thời vụ · ứng viên chỉ "Sẵn sàng nhận ca" khi xong đủ 4 bước onboarding</div></div>
        <button className="bo-btn">+ Thêm ứng viên</button>
      </div>
      <div className="bo-kpis" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        <div className="bo-kpi"><div className="lb">Cần tuyển mùa cao điểm</div><div className="v">8</div><div className="d up">3 HDV · 2 thuyền viên · 2 quầy · 1 phụ xe</div></div>
        <div className="bo-kpi"><div className="lb">Đang trong pipeline</div><div className="v">{cands.length}</div><div className="d up">{cands.filter((c) => c.stage === 4).length} sẵn sàng nhận ca</div></div>
        <div className="bo-kpi"><div className="lb">Thời gian tuyển TB</div><div className="v">9 ngày</div><div className="d up">mục tiêu &lt;14 ngày trước 27/5</div></div>
      </div>
      <div className="bo-card" style={{ overflowX: 'auto' }}>
        <table className="bo-table">
          <thead><tr><th>Ứng viên</th><th>Vị trí</th><th>Pipeline</th><th>Checklist onboarding</th><th></th></tr></thead>
          <tbody>
            {cands.map((c) => (
              <tr key={c.id}>
                <td><b>{c.nm}</b></td>
                <td>{c.pos}</td>
                <td style={{ minWidth: 210 }}>
                  <div style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                    {PIPE_STAGES.map((st, i) => (
                      <span key={i} title={st} style={{ flex: 1, height: 7, borderRadius: 4, background: i <= c.stage ? (c.stage === 4 ? 'var(--ok)' : 'var(--gold)') : 'var(--ivory)' }}></span>
                    ))}
                  </div>
                  <span style={{ fontSize: 10.5, color: c.stage === 4 ? 'var(--ok)' : 'var(--ink-3)', fontWeight: 700 }}>{PIPE_STAGES[c.stage]}</span>
                </td>
                <td>
                  {c.stage >= 3 ? (
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {OB_STEPS.map(([k, lb]) => (
                        <label key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10.5, fontWeight: 600, border: '1px solid ' + (c.ob[k] ? 'var(--ok)' : 'var(--line-2)'), color: c.ob[k] ? 'var(--ok)' : 'var(--ink-2)', borderRadius: 12, padding: '4px 9px', cursor: 'pointer', background: c.ob[k] ? 'var(--ok-soft)' : '#fff' }}>
                          <input type="checkbox" checked={!!c.ob[k]} onChange={() => toggleOb(c.id, k)} style={{ accentColor: 'var(--ok)', margin: 0 }} />{lb}
                        </label>
                      ))}
                    </div>
                  ) : <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>— mở khi ký HĐ —</span>}
                </td>
                <td className="r">
                  {c.stage < 4
                    ? <button className="bo-btn navy" style={{ padding: '6px 12px', fontSize: 11.5 }} disabled={c.stage === 3 && !OB_STEPS.every(([k]) => c.ob[k])} onClick={() => advance(c.id)}>
                        {c.stage === 3 ? (OB_STEPS.every(([k]) => c.ob[k]) ? 'Kích hoạt nhận ca' : 'Chưa đủ onboarding') : 'Chuyển bước →'}
                      </button>
                    : <Badge kind="ok">✓ Đã vào xếp ca</Badge>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bo-card" style={{ marginTop: 14 }}>
        <h3>📞 Hồ sơ thời vụ mùa trước — gọi lại 1 chạm <span className="mut">đã qua đào tạo & quen việc, tuyển lại nhanh gấp 3 lần tuyển mới</span></h3>
        <table className="bo-table">
          <thead><tr><th>Cựu nhân sự</th><th>Vị trí · mùa</th><th>Xếp loại cũ</th><th>Ghi chú</th><th></th></tr></thead>
          <tbody>
            {alumni.map((a) => (
              <tr key={a.id}>
                <td><b>{a.nm}</b></td><td>{a.pos}</td>
                <td><Badge kind={a.grade === 'A' ? 'ok' : 'warn'}>{a.grade}</Badge></td>
                <td style={{ fontSize: 11.5 }}>{a.note}</td>
                <td className="r">{a.called
                  ? <Badge kind="info">✓ Đã vào pipeline (bước Ký HĐ)</Badge>
                  : <button className="bo-btn gold" style={{ padding: '6px 12px', fontSize: 11.5 }} onClick={() => recall(a)}>Gọi lại 1 chạm</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 10 }}>Nguồn ứng viên mới: form “Tuyển dụng” công khai ở footer website đổ thẳng vào pipeline này.</div>
      </div>
    </div>
  );
}

/* ---------- 3 · xếp ca tuần ---------- */
const SHIFT_STAFF = ['L.T.Trang', 'N.T.Hằng', 'Đ.T.Dũng', 'L.T.Hà (thời vụ)', '—'];
function ShiftView() {
  const DAYS = ['T2 15/6', 'T3 16/6', 'T4 17/6', 'T5 18/6', 'T6 19/6', 'T7 20/6', 'CN 21/6'];
  const SHIFTS = [['Quầy Cát Bà · Sáng', '06:00–14:00'], ['Quầy Cát Bà · Chiều', '14:00–22:00'], ['Tàu VIP 4 · Ca ngày', '10:00–18:00']];
  const LOCKED = ['Đ.T.Dũng']; // khoá hồ sơ an toàn (khám SK quá hạn)
  const makeGrid = () => SHIFTS.map((_, r) => DAYS.map((_, d) => SHIFT_STAFF[(r + d) % 4]));
  const [grid, setGrid] = h3UseState(makeGrid);
  const setCell = (r, d, v) => {
    if (LOCKED.includes(v)) return; // không cho gán NV bị khoá hồ sơ an toàn
    setGrid(grid.map((row, ri) => ri === r ? row.map((x, di) => di === d ? v : x) : row));
  };
  const counts = {};
  grid.flat().forEach((n) => { if (n !== '—') counts[n] = (counts[n] || 0) + 1; });
  const over = Object.keys(counts).filter((n) => counts[n] > 6);
  const lockedCells = grid.flat().filter((n) => LOCKED.includes(n)).length;
  const blocked = over.length > 0 || lockedCells > 0;
  return (
    <div data-screen-label="Admin — Xếp ca tuần">
      <div className="bo-head">
        <div><h1>Xếp ca tuần 15–21/06</h1><div className="sub">Quầy vé & thuyền viên (khác điều độ theo chuyến) · NV xem & đăng ký đổi ca trên app · tối đa 6 ca/người/tuần</div></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Badge kind="warn">2 yêu cầu đổi ca chờ duyệt</Badge>
          <button className="bo-btn ghost" onClick={() => setGrid(makeGrid())}>↺ Copy mẫu tuần trước</button>
          <button className="bo-btn navy" disabled={blocked}>{lockedCells ? '⛔ ' + lockedCells + ' ca gán cho NV bị khoá hồ sơ an toàn' : over.length ? '⚠ ' + over.join(', ') + ' quá 6 ca/tuần' : 'Công bố lịch ca → app'}</button>
        </div>
      </div>
      <div className="bo-card" style={{ overflowX: 'auto' }}>
        <table className="bo-table">
          <thead><tr><th>Ca trực</th>{DAYS.map((d) => <th key={d} style={d.startsWith('T7') || d.startsWith('CN') ? { color: 'var(--gold-bright)' } : null}>{d}</th>)}</tr></thead>
          <tbody>
            {SHIFTS.map(([lb, hrs], r) => (
              <tr key={lb}>
                <td><b>{lb}</b><br /><span style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>{hrs}</span></td>
                {DAYS.map((_, d) => (
                  <td key={d}>
                    <select className="bo-select" style={{ padding: '5px 7px', fontSize: 11.5, background: LOCKED.includes(grid[r][d]) ? 'var(--bad-soft)' : grid[r][d] === '—' ? 'var(--bad-soft)' : '#fff', borderColor: LOCKED.includes(grid[r][d]) ? 'var(--bad)' : undefined, color: LOCKED.includes(grid[r][d]) ? 'var(--bad)' : undefined }} value={grid[r][d]} onChange={(e) => setCell(r, d, e.target.value)}>
                      {SHIFT_STAFF.map((s) => <option key={s} value={s}>{LOCKED.includes(s) ? '⛔ ' + s + ' (khoá an toàn)' : s}</option>)}
                    </select>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', gap: 14, marginTop: 12, fontSize: 11.5, color: 'var(--ink-2)', flexWrap: 'wrap' }}>
          {Object.keys(counts).map((n) => (
            <span key={n}><b style={counts[n] > 6 ? { color: 'var(--bad)' } : null}>{n}</b>: {counts[n]} ca</span>
          ))}
          <span style={{ color: 'var(--ink-3)' }}>· Ô đỏ = ca trống hoặc NV bị khoá hồ sơ an toàn (liên thông màn Đào tạo) — đổi người trước khi công bố</span>
        </div>
      </div>
      <div className="dt-notice" style={{ marginTop: 12 }}>
        Yêu cầu đổi ca từ app: <b>L.T.Trang ↔ N.T.Hằng (Sáng↔Chiều 17/6, hai bên đã đồng ý)</b> — duyệt 1 chạm, lịch tự cập nhật & thông báo cả hai. Nhân sự thời vụ chỉ xuất hiện sau khi xong onboarding.
      </div>
    </div>
  );
}

/* ---------- 4 · KPI tự động + chia tip + turnover ---------- */
function KpiView() {
  const [split, setSplit] = h3UseState(70);
  const [histNm, setHistNm] = h3UseState('Phạm Văn Tài');
  const HIST = {
    'Phạm Văn Tài': [82, 88, 79, 91, 94, 96],
    'Lê Đức Bình': [75, 71, 80, 77, 84, 81],
    'Lê Thu Trang': [90, 93, 95, 92, 97, 98],
    'Ngô Thuý Hằng': [88, 85, 90, 93, 91, 94],
    'Đỗ Tiến Dũng': [84, 86, 80, 78, 82, 85],
  };
  const MONTHS = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'];
  const TIP_TOTAL = 12400000;
  const KPIS = [
    { nm: 'Phạm Văn Tài', role: 'Tài xế', m1: ['Đúng giờ GPS', '98%'], m2: ['Sao khách', '4,9★'], m3: ['Sự cố', '0'], grade: 'A', bonus: 1200000, tipShare: 2840000 },
    { nm: 'Lê Đức Bình', role: 'Tài xế', m1: ['Đúng giờ GPS', '91%'], m2: ['Sao khách', '4,6★'], m3: ['Sự cố', '1 nhẹ'], grade: 'B', bonus: 600000, tipShare: 1980000 },
    { nm: 'Lê Thu Trang', role: 'Quầy + HDV', m1: ['Doanh số POS', '118% chỉ tiêu'], m2: ['Sao khách', '5,0★'], m3: ['Đón đủ khách', '100%'], grade: 'A', bonus: 1500000, tipShare: 2310000 },
    { nm: 'Ngô Thuý Hằng', role: 'HDV', m1: ['Review tích cực', '96%'], m2: ['Sao khách', '4,8★'], m3: ['Đón đủ khách', '99%'], grade: 'A', bonus: 1200000, tipShare: 1550000 },
    { nm: 'Đỗ Tiến Dũng', role: 'Thuyền viên', m1: ['An toàn brief', '100%'], m2: ['Sao khách', '4,7★'], m3: ['Sự cố', '0'], grade: 'B', bonus: 600000, tipShare: 0 },
  ];
  const TURN = [['Đội xe', 8], ['Quầy vé', 22], ['Hướng dẫn', 35], ['Thuyền viên', 18], ['Văn phòng', 6]];
  return (
    <div data-screen-label="Admin — KPI & chia tip">
      <div className="bo-head">
        <div><h1>KPI tự động · chia tip · giữ người</h1><div className="sub">Số liệu lấy thẳng từ vận hành (GPS, review, POS) — không chấm cảm tính · xếp loại đổ vào màn hình Tính lương</div></div>
        <button className="bo-btn navy">Chốt KPI tháng 6 → tính lương</button>
      </div>
      <div className="bo-grid2" style={{ gridTemplateColumns: '1.6fr 1fr' }}>
        <div className="bo-card">
          <h3>Xếp loại tháng 6 <span className="mut">A = +thưởng 1,2–1,5M · B = +600K · C = kèm cặp lại</span></h3>
          <table className="bo-table">
            <thead><tr><th>Nhân viên</th><th>Chỉ số 1</th><th>Chỉ số 2</th><th>Chỉ số 3</th><th>Loại</th><th className="r">Thưởng KPI</th><th className="r">Tip được chia</th></tr></thead>
            <tbody>
              {KPIS.map((k) => (
                <tr key={k.nm}>
                  <td><b>{k.nm}</b><br /><span style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>{k.role}</span></td>
                  <td style={{ fontSize: 11.5 }}>{k.m1[0]}<br /><b>{k.m1[1]}</b></td>
                  <td style={{ fontSize: 11.5 }}>{k.m2[0]}<br /><b>{k.m2[1]}</b></td>
                  <td style={{ fontSize: 11.5 }}>{k.m3[0]}<br /><b>{k.m3[1]}</b></td>
                  <td><Badge kind={k.grade === 'A' ? 'ok' : 'warn'}>{k.grade}</Badge></td>
                  <td className="r"><b>{fmtVnd(k.bonus)}</b></td>
                  <td className="r" style={{ color: 'var(--gold)', fontWeight: 700 }}>{k.tipShare ? fmtVnd(Math.round(k.tipShare * split / 70)) : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="bo-card">
            <h3>Quỹ tip tháng 6 <span className="mut">từ app khách</span></h3>
            <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--gold)' }}>{fmtVnd(TIP_TOTAL)}</div>
            <div style={{ margin: '12px 0 6px', fontSize: 12.5, color: 'var(--ink-2)' }}>Tổ phục vụ trực tiếp nhận <b>{split}%</b> · quỹ chung {100 - split}%</div>
            <input type="range" min="50" max="90" step="5" value={split} onChange={(e) => setSplit(+e.target.value)} style={{ width: '100%', accentColor: 'var(--gold)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: 'var(--ink-3)', marginTop: 4 }}>
              <span>Trực tiếp: <b style={{ color: 'var(--ink)' }}>{fmtVnd(Math.round(TIP_TOTAL * split / 100))}</b></span>
              <span>Quỹ chung: <b style={{ color: 'var(--ink)' }}>{fmtVnd(Math.round(TIP_TOTAL * (100 - split) / 100))}</b></span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 8 }}>Chia theo chuyến có tip — công khai cho nhân viên xem trong app (minh bạch = hết mâu thuẫn).</div>
          </div>
          <div className="bo-card">
            <h3>Lịch sử KPI 6 tháng <span className="mut">điểm tổng hợp /100</span></h3>
            <select className="bo-select" style={{ width: '100%', marginBottom: 12 }} value={histNm} onChange={(e) => setHistNm(e.target.value)}>
              {Object.keys(HIST).map((n) => <option key={n}>{n}</option>)}
            </select>
            <div className="bo-chart" style={{ height: 110 }}>
              {HIST[histNm].map((v, i) => (
                <div key={i} className="bar" title={MONTHS[i] + ': ' + v}>
                  <i className={v >= 90 ? 'gold' : ''} style={{ height: v + '%' }}></i>
                  <span>{MONTHS[i]}<br /><b style={{ color: v >= 90 ? 'var(--gold)' : 'var(--ink-2)' }}>{v}</b></span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 14 }}>≥ 90 điểm (cột vàng) = loại A · xu hướng 3 tháng giảm liên tiếp → gắn cờ kèm cặp</div>
          </div>
          <div className="bo-card">
            <h3>Tỉ lệ nghỉ việc 12 tháng <span className="mut">ngành du lịch TB 30–40%</span></h3>
            <div className="bo-donut-row">
              {TURN.map(([d, v]) => (
                <div key={d} className="it">
                  <span className="sw" style={{ background: v > 30 ? 'var(--bad)' : v > 15 ? 'var(--warn)' : 'var(--ok)' }}></span>
                  <span>{d}</span><b>{v}%</b>
                  <span className="bo-track"><i style={{ width: v * 2 + '%', background: v > 30 ? 'var(--bad)' : v > 15 ? 'var(--warn)' : 'var(--ok)' }}></i></span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-2)', marginTop: 10 }}>⚠ HDV nghỉ 35%/năm — lý do thoát phổ biến: "thu nhập mùa thấp". Đề xuất: lương cứng mùa thấp + KPI thưởng mùa cao.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 5 · offboarding ---------- */
function OffboardView() {
  const STEPS = [
    ['acc', 'Khoá tài khoản hệ thống & app (liên thông Người dùng & quyền)'],
    ['asset', 'Thu hồi thẻ NV, đồng phục, thiết bị'],
    ['leave', 'Quyết toán phép tồn: 7 ngày × 346.000đ = 2.422.000đ'],
    ['handover', 'Bàn giao tuyến/ca + khách quen cho người thay'],
    ['exit', 'Phỏng vấn nghỉ việc (ghi lý do vào phân tích turnover)'],
    ['salary', 'Lương kỳ cuối + xác nhận BHXH chốt sổ'],
  ];
  const [done, setDone] = h3UseState({ acc: true });
  const n = STEPS.filter(([k]) => done[k]).length;
  return (
    <div data-screen-label="Admin — Offboarding">
      <div className="bo-head">
        <div><h1>Nghỉ việc & bàn giao (offboarding)</h1><div className="sub">Đang xử lý: Bùi Ngọc Anh · Marketing · nghỉ từ 30/06 (báo trước 30 ngày đúng luật)</div></div>
        <Badge kind={n === STEPS.length ? 'ok' : 'warn'}>{n}/{STEPS.length} bước</Badge>
      </div>
      <div className="bo-grid2" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        <div className="bo-card">
          <h3>Checklist bắt buộc <span className="mut">chưa đủ 6/6 thì chưa chốt sổ lương cuối</span></h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {STEPS.map(([k, lb]) => (
              <label key={k} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, border: '1.5px solid ' + (done[k] ? 'var(--ok)' : 'var(--line-2)'), background: done[k] ? 'var(--ok-soft)' : '#fff', borderRadius: 10, padding: '11px 13px', cursor: 'pointer', fontSize: 12.5 }}>
                <input type="checkbox" checked={!!done[k]} onChange={() => setDone({ ...done, [k]: !done[k] })} style={{ accentColor: 'var(--ok)', marginTop: 2 }} />
                <span style={{ color: done[k] ? 'var(--ok)' : 'var(--ink-2)', fontWeight: done[k] ? 700 : 500 }}>{lb}</span>
              </label>
            ))}
          </div>
          <button className="bo-btn navy" style={{ width: '100%', marginTop: 14 }} disabled={n < STEPS.length}>
            {n < STEPS.length ? 'Hoàn thành ' + n + '/6 — chưa thể chốt' : 'Chốt hồ sơ nghỉ việc & lưu trữ'}
          </button>
        </div>
        <div className="bo-card" style={{ alignSelf: 'start' }}>
          <h3>Vì sao quan trọng</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9, fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.6 }}>
            <span>🔐 <b>Khoá tài khoản là bước #1</b> — lỗ hổng bảo mật phổ biến nhất của doanh nghiệp là nhân viên cũ còn quyền truy cập booking/giá.</span>
            <span>📋 Lý do nghỉ đổ vào phân tích turnover — biết vì sao HDV nghỉ 35%/năm mới giữ được người.</span>
            <span>⚖️ Quyết toán phép & chốt sổ BHXH đúng hạn tránh tranh chấp lao động.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TrainingView, SeasonalView, ShiftView, KpiView, OffboardView });
