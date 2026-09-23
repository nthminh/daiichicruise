/* DAIICHI BACK OFFICE — Vận hành đội xe/tàu: điều độ, bán ghế theo chặng, cấm biển hàng loạt, bảo dưỡng */
const { useState: oUseState, useMemo: oUseMemo } = React;

/* ---------- fleet & crew master data ---------- */
const OPS = {
  vehicles: [
    { id: 'v1', bks: '29B-123.45', lb: 'Limousine 11 ghế', type: 'limo11', reg: '2026-09-12', ins: '2027-01-05', km: 6200, status: 'ok' },
    { id: 'v2', bks: '29B-067.89', lb: 'Limousine 11 ghế', type: 'limo11', reg: '2026-06-18', ins: '2026-11-20', km: 4100, status: 'regsoon' },
    { id: 'v3', bks: '15B-244.10', lb: 'Limousine 10 ghế', type: 'limo10', reg: '2026-08-02', ins: '2026-12-15', km: 9800, status: 'ok' },
    { id: 'v4', bks: '29B-555.21', lb: 'Bus 45 chỗ', type: 'bus45', reg: '2026-06-05', ins: '2026-10-30', km: 12400, status: 'locked', why: 'Hết hạn đăng kiểm 05/06 — đã tự khoá khỏi điều độ' },
    { id: 'v5', bks: '15B-311.77', lb: 'Limousine 34 ghế', type: 'limo34', reg: '2026-12-01', ins: '2027-03-18', km: 15800, status: 'service', why: 'Quá 15.000km từ lần bảo dưỡng — cần vào xưởng' },
    { id: 'v6', bks: 'Tàu Lan Hạ 01', lb: 'Day cruise 84 khách', type: 'boat', reg: '2026-10-22', ins: '2027-02-10', km: 0, status: 'ok' },
    { id: 'v7', bks: 'Daiichi Luxury', lb: 'Du thuyền 5★ · 32 suite', type: 'ship', reg: '2027-01-15', ins: '2027-04-01', km: 0, status: 'ok' },
  ],
  drivers: [
    /* cert = hạn GPLX/chứng chỉ (khớp hồ sơ HR) · health = hạn khám sức khoẻ — hết hạn là bị loại khỏi điều độ */
    { id: 'd1', nm: 'Phạm Văn Tài', lic: 'D · 12 năm', phone: '0912 334 556', cert: '2026-07-14', health: '2026-11-30' },
    { id: 'd2', nm: 'Lê Đức Bình', lic: 'D · 8 năm', phone: '0905 221 870', cert: '2028-02-28', health: '2027-01-31' },
    { id: 'd3', nm: 'Ngô Văn Sơn', lic: 'E · 15 năm', phone: '0988 410 233', cert: '2027-05-20', health: '2026-09-30' },
    { id: 'd4', nm: 'Trần Hữu Phúc', lic: 'D · 5 năm', phone: '0961 558 902', cert: '2027-10-01', health: '2026-12-31' },
  ],
  guides: ['Lê Thu Trang', 'Ngô Thuý Hằng', 'Vũ Minh Châu', '—'],
  trips: [
    { id: 't1', tm: '05:00', route: 'HN → Cát Bà', dur: 3.5, veh: 'v1', drv: 'd1', gd: 'Lê Thu Trang', pax: 9 },
    { id: 't2', tm: '07:00', route: 'HN → Hải Phòng', dur: 2, veh: 'v3', drv: 'd2', gd: '—', pax: 8 },
    { id: 't3', tm: '08:00', route: 'HN → Cát Bà', dur: 3.5, veh: 'v2', drv: 'd3', gd: 'Ngô Thuý Hằng', pax: 11 },
    { id: 't4', tm: '09:30', route: 'Cát Bà → HN', dur: 3.5, veh: '', drv: 'd1', gd: 'Vũ Minh Châu', pax: 7 },
    { id: 't5', tm: '11:45', route: 'Cảng Cát Bà → Lan Hạ (VIP 4)', dur: 5.5, veh: 'v7', drv: 'd4', gd: 'Vũ Minh Châu', pax: 28 },
    { id: 't6', tm: '15:30', route: 'HN → Cát Bà', dur: 3.5, veh: '', drv: '', gd: '—', pax: 4 },
  ],
};

function tripEnd(t) { const [h, m] = t.tm.split(':').map(Number); return h + m / 60 + t.dur; }
function tripStart(t) { const [h, m] = t.tm.split(':').map(Number); return h + m / 60; }

/* ---------- 1 · dispatch board ---------- */
function DispatchView() {
  const [trips, setTrips] = oUseState(OPS.trips);
  const [date, setDate] = oUseState('2026-06-12');
  /* khoá an toàn enforce ngay trong onChange (không chỉ ẩn khỏi dropdown): xe khoá/bảo dưỡng & tài xế hết hạn chứng chỉ/khám SK bị từ chối gán */
  const vehBlocked = (id) => { const v = OPS.vehicles.find((x) => x.id === id); return v && (v.status === 'locked' || v.status === 'service'); };
  const drvBlocked = (id) => { const d = OPS.drivers.find((x) => x.id === id); return d && (d.cert < date || d.health < date); };
  const set = (id, k, v) => {
    if (k === 'veh' && v && vehBlocked(v)) return;
    if (k === 'drv' && v && drvBlocked(v)) return;
    setTrips(trips.map((t) => t.id === id ? { ...t, [k]: v } : t));
  };

  // conflicts
  const warns = oUseMemo(() => {
    const out = {};
    trips.forEach((t) => {
      const w = [];
      if (!t.veh) w.push('Chưa gán xe');
      if (!t.drv) w.push('Chưa gán tài xế');
      const v = OPS.vehicles.find((x) => x.id === t.veh);
      if (v && (v.status === 'locked' || v.status === 'service')) w.push('Xe ' + v.bks + ' đang bị khoá: ' + v.why);
      const dx = OPS.drivers.find((x) => x.id === t.drv);
      if (dx && (dx.cert < date || dx.health < date)) w.push('Tài xế ' + dx.nm + ' hết hạn ' + (dx.cert < date ? 'GPLX/chứng chỉ' : 'khám sức khoẻ') + ' — bị loại khỏi điều độ');
      if (t.drv) {
        // overlap with other trips of same driver
        trips.forEach((o) => {
          if (o.id !== t.id && o.drv === t.drv && tripStart(o) < tripEnd(t) && tripStart(t) < tripEnd(o)) {
            w.push('Tài xế trùng giờ với chuyến ' + o.tm + ' ' + o.route);
          }
        });
        // continuous driving > 4h
        if (t.dur > 4) w.push('Chặng dài ' + t.dur + 'h — vượt 4h lái liên tục, cần điểm nghỉ/đổi lái');
        // total day hours
        const tot = trips.filter((o) => o.drv === t.drv).reduce((s, o) => s + o.dur, 0);
        if (tot > 10) w.push('Tổng giờ lái trong ngày ' + tot.toFixed(1) + 'h — vượt trần 10h');
      }
      out[t.id] = w;
    });
    return out;
  }, [trips, date]);

  const totalWarn = Object.values(warns).reduce((s, w) => s + w.length, 0);
  const usable = OPS.vehicles.filter((v) => v.status === 'ok' || v.status === 'regsoon');
  const usableDrivers = OPS.drivers.filter((d) => !drvBlocked(d.id));

  return (
    <div data-screen-label="Admin — Bảng điều độ">
      <div className="bo-head">
        <div><h1>Bảng điều độ ngày mai</h1><div className="sub">Gán xe · tài xế · HDV cho từng chuyến — hệ thống tự soát trùng ca, quá giờ lái, xe hết đăng kiểm</div></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="date" className="bo-input" value={date} onChange={(e) => setDate(e.target.value)} />
          <button className="bo-btn navy" disabled={totalWarn > 0}>{totalWarn > 0 ? totalWarn + ' cảnh báo — xử lý trước khi chốt' : 'Chốt điều độ → gửi app tài xế/HDV'}</button>
        </div>
      </div>
      <div className="bo-card" style={{ overflowX: 'auto' }}>
        <table className="bo-table">
          <thead><tr><th>Giờ</th><th>Chuyến</th><th className="r">Khách</th><th>Xe / tàu</th><th>Tài xế</th><th>HDV / thuyền viên</th><th>Kiểm soát</th></tr></thead>
          <tbody>
            {trips.map((t) => (
              <tr key={t.id} style={warns[t.id].length ? { background: 'var(--warn-soft)' } : null}>
                <td><b>{t.tm}</b><br /><span style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>{t.dur}h</span></td>
                <td><b>{t.route}</b></td>
                <td className="r">{t.pax}</td>
                <td>
                  <select className="bo-select" style={{ padding: '6px 8px', fontSize: 12, maxWidth: 170 }} value={t.veh} onChange={(e) => set(t.id, 'veh', e.target.value)}>
                    <option value="">— chọn xe —</option>
                    {(t.id === 't5' ? usable.filter((v) => v.type === 'ship' || v.type === 'boat') : usable.filter((v) => v.type !== 'ship' && v.type !== 'boat')).map((v) => (
                      <option key={v.id} value={v.id}>{v.bks} · {v.lb}</option>
                    ))}
                  </select>
                </td>
                <td>
                  <select className="bo-select" style={{ padding: '6px 8px', fontSize: 12 }} value={t.drv} onChange={(e) => set(t.id, 'drv', e.target.value)}>
                    <option value="">— chọn tài —</option>
                    {usableDrivers.map((d) => <option key={d.id} value={d.id}>{d.nm}</option>)}
                  </select>
                </td>
                <td>
                  <select className="bo-select" style={{ padding: '6px 8px', fontSize: 12 }} value={t.gd} onChange={(e) => set(t.id, 'gd', e.target.value)}>
                    {OPS.guides.map((g) => <option key={g}>{g}</option>)}
                  </select>
                </td>
                <td style={{ maxWidth: 260 }}>
                  {warns[t.id].length === 0
                    ? <Badge kind="ok">✓ Sẵn sàng</Badge>
                    : warns[t.id].map((w, i) => <div key={i} style={{ fontSize: 11, color: 'var(--bad)', fontWeight: 600, lineHeight: 1.45 }}>⚠ {w}</div>)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="dt-notice" style={{ marginTop: 12 }}>
        Chốt điều độ sẽ đẩy lịch xuống <b>app tài xế</b> (lộ trình + danh sách khách) và <b>app HDV</b> (liên hệ đón khách) — tài xế xác nhận nhận ca bằng 1 chạm trước 21:00 hôm trước.
      </div>
    </div>
  );
}

/* ---------- 2 · segment inventory ---------- */
function SegmentsView() {
  // 11 seats, 2 segments: HN→HP, HP→CB
  const init = [
    { s: 'A1', seg1: 'DT26-8X4', seg2: 'DT26-8X4' }, { s: 'A2', seg1: 'DT26-M3P', seg2: null },
    { s: 'A3', seg1: 'DT26-M3P', seg2: null }, { s: 'A4', seg1: null, seg2: 'DT26-Z6T' },
    { s: 'A5', seg1: 'DT26-K9W', seg2: 'DT26-K9W' }, { s: 'B1', seg1: 'POS-Q7C', seg2: null },
    { s: 'B2', seg1: null, seg2: null }, { s: 'B3', seg1: 'DT26-A2V', seg2: 'DT26-A2V' },
    { s: 'B4', seg1: 'AG-K2M', seg2: null }, { s: 'B5', seg1: null, seg2: 'DT26-E8S' },
    { s: 'B6', seg1: null, seg2: null },
  ];
  const [seats, setSeats] = oUseState(init);
  const [opened, setOpened] = oUseState(false);
  const PRICE_SEG2 = 200000; // HP→CB resale price
  const resale = seats.filter((x) => x.seg1 && !x.seg2).length;
  const free2 = seats.filter((x) => !x.seg2).length;
  const sellSeg2 = () => {
    setOpened(true);
    setSeats(seats.map((x) => x.s === 'A2' ? { ...x, seg2: 'WEB-MỚI' } : x));
  };
  return (
    <div data-screen-label="Admin — Bán ghế theo chặng">
      <div className="bo-head">
        <div><h1>Bán ghế theo chặng (segment inventory)</h1><div className="sub">Chuyến 08:00 · Hà Nội → Hải Phòng → Cát Bà · Limousine 11 ghế · 12/06/2026</div></div>
        <button className="bo-btn gold" onClick={sellSeg2} disabled={opened}>{opened ? '✓ Đã mở bán chặng 2 trên web/app/POS' : 'Mở bán chặng Hải Phòng → Cát Bà'}</button>
      </div>
      <div className="bo-kpis" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        <div className="bo-kpi"><div className="lb">Ghế trống chặng HP → Cát Bà</div><div className="v">{free2}/11</div><div className="d up">trong đó {resale} ghế đã có khách chặng 1</div></div>
        <div className="bo-kpi"><div className="lb">Doanh thu thêm tiềm năng</div><div className="v" style={{ color: 'var(--ok)' }}>{fmtVnd(free2 * PRICE_SEG2)}</div><div className="d up">{fmtVnd(PRICE_SEG2)}/ghế chặng 2 — cùng 1 chuyến xe</div></div>
        <div className="bo-kpi"><div className="lb">Lấp đầy nếu bán hết 2 chặng</div><div className="v">{Math.round(((seats.filter((x) => x.seg1).length + seats.filter((x) => x.seg2).length) / 22) * 100)}% → 100%</div><div className="d up">1 ghế = 2 lần thu tiền</div></div>
      </div>
      <div className="bo-card">
        <h3>Bản đồ chiếm chỗ theo chặng <span className="mut">■ chặng 1: HN→HP (05:00–07:00) · ■ chặng 2: HP→CB (07:15–08:30)</span></h3>
        <table className="bo-table">
          <thead><tr><th>Ghế</th><th>Chặng 1 · HN → Hải Phòng</th><th>Chặng 2 · Hải Phòng → Cát Bà</th><th>Cơ hội</th></tr></thead>
          <tbody>
            {seats.map((x) => (
              <tr key={x.s}>
                <td className="mono"><b>{x.s}</b></td>
                <td>{x.seg1 ? <Badge kind="info">{x.seg1}…</Badge> : <Badge kind="ok">TRỐNG</Badge>}</td>
                <td>{x.seg2 ? <Badge kind={x.seg2 === 'WEB-MỚI' ? 'gold' : 'info'}>{x.seg2}…</Badge> : <Badge kind="ok">TRỐNG</Badge>}</td>
                <td style={{ fontSize: 11.5 }}>
                  {x.seg1 && !x.seg2 && <span style={{ color: 'var(--ok)', fontWeight: 700 }}>↻ Bán lại được từ HP — +{fmtVnd(PRICE_SEG2)}</span>}
                  {!x.seg1 && !x.seg2 && <span style={{ color: 'var(--ink-3)' }}>Trống cả tuyến</span>}
                  {x.seg1 && x.seg2 && <span style={{ color: 'var(--ink-3)' }}>Kín cả tuyến</span>}
                  {!x.seg1 && x.seg2 && <span style={{ color: 'var(--ink-3)' }}>Khách lên từ HP</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="dt-notice" style={{ marginTop: 12 }}>
        Khi mở bán chặng 2, website/app/POS hiện thêm tuyến "Hải Phòng → Cát Bà · 07:15" dùng đúng ghế trống chặng 2 — engine chống trùng ghế xử lý theo (chuyến, chặng, ghế) thay vì chỉ (chuyến, ghế).
      </div>
    </div>
  );
}

/* ---------- 3 · bulk weather cancellation ---------- */
function WeatherOpsView() {
  const affected = [
    { code: 'DT26-8X4K2', nm: 'Nguyễn Văn Hùng', svc: 'VIP 4 · 11:45', pax: 2, total: 1700000 },
    { code: 'DT26-M3P10', nm: 'Yuki Tanaka', svc: 'VIP 1 · 09:00', pax: 4, total: 2880000 },
    { code: 'DT26-Z6T2N', nm: 'Wang Lei', svc: 'Sunset · 15:30', pax: 2, total: 860000 },
    { code: 'AG-K2M84', nm: 'An Phú Travel (đặt hộ)', svc: 'VIP 1 · 09:00', pax: 4, total: 2649600 },
    { code: 'DT26-E8SL2', nm: 'Claire Dubois', svc: 'Luxury 2N1Đ', pax: 2, total: 6500000 },
    { code: 'POS-Q7C12', nm: 'Khách lẻ (quầy)', svc: 'VIP 4 · 11:45', pax: 1, total: 850000 },
  ];
  const [step, setStep] = oUseState(0); // 0 pick, 1 confirm, 2 done
  const [mode, setMode] = oUseState('move');
  const total = affected.reduce((s, b) => s + b.total, 0);
  return (
    <div data-screen-label="Admin — Xử lý cấm biển">
      <div className="bo-head">
        <div><h1>Cấm biển — xử lý hàng loạt</h1><div className="sub">Khi Cảng vụ phát lệnh: chọn ngày + dịch vụ bị ảnh hưởng → 1 nút thông báo & hoàn/đổi toàn bộ khách</div></div>
        <Badge kind="bad">DEMO: Lệnh cấm tàu 13/06 — áp thấp nhiệt đới</Badge>
      </div>
      <div className="bo-grid2" style={{ gridTemplateColumns: '1.4fr 1fr' }}>
        <div className="bo-card">
          <h3>Booking bị ảnh hưởng ngày 13/06 <span className="mut">{affected.length} booking · {affected.reduce((s, b) => s + b.pax, 0)} khách · {fmtVnd(total)}</span></h3>
          <table className="bo-table">
            <thead><tr><th>Mã</th><th>Khách</th><th>Dịch vụ</th><th className="r">Pax</th><th className="r">Giá trị</th><th>Trạng thái</th></tr></thead>
            <tbody>
              {affected.map((b) => (
                <tr key={b.code}>
                  <td className="mono">{b.code}</td><td><b>{b.nm}</b></td><td>{b.svc}</td>
                  <td className="r">{b.pax}</td><td className="r">{fmtVnd(b.total)}</td>
                  <td>{step === 2 ? <Badge kind="ok">{mode === 'refund' ? '✓ Đã hoàn 100%' : '✓ Đã gửi link đổi ngày'}</Badge> : <Badge kind="warn">Chờ xử lý</Badge>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bo-card" style={{ alignSelf: 'start' }}>
          {step < 2 ? (
            <React.Fragment>
              <h3>Phương án xử lý</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                <label style={{ display: 'flex', gap: 9, alignItems: 'flex-start', border: '1.5px solid ' + (mode === 'move' ? 'var(--gold)' : 'var(--line-2)'), borderRadius: 10, padding: '11px 13px', cursor: 'pointer', background: mode === 'move' ? 'var(--gold-soft)' : '#fff' }}>
                  <input type="radio" checked={mode === 'move'} onChange={() => setMode('move')} style={{ marginTop: 2, accentColor: 'var(--gold)' }} />
                  <span style={{ fontSize: 12.5 }}><b>Ưu tiên đổi ngày miễn phí</b><br /><span style={{ color: 'var(--ink-3)', fontSize: 11.5 }}>Zalo gửi link tự chọn ngày mới (giữ giá cũ); khách không chọn trong 48h → tự hoàn 100%. Giữ được ~60% doanh thu.</span></span>
                </label>
                <label style={{ display: 'flex', gap: 9, alignItems: 'flex-start', border: '1.5px solid ' + (mode === 'refund' ? 'var(--gold)' : 'var(--line-2)'), borderRadius: 10, padding: '11px 13px', cursor: 'pointer', background: mode === 'refund' ? 'var(--gold-soft)' : '#fff' }}>
                  <input type="radio" checked={mode === 'refund'} onChange={() => setMode('refund')} style={{ marginTop: 2, accentColor: 'var(--gold)' }} />
                  <span style={{ fontSize: 12.5 }}><b>Hoàn 100% toàn bộ ngay</b><br /><span style={{ color: 'var(--ink-3)', fontSize: 11.5 }}>Tiền về phương thức gốc 5–7 ngày; đặt qua đại lý → hoàn vào công nợ.</span></span>
                </label>
              </div>
              {step === 0 ? (
                <button className="bo-btn" style={{ width: '100%', marginTop: 14 }} onClick={() => setStep(1)}>Tiếp tục →</button>
              ) : (
                <div style={{ marginTop: 14 }}>
                  <div className="dt-notice" style={{ marginBottom: 10 }}>Xác nhận xử lý <b>{affected.length} booking · {fmtVnd(total)}</b>? Hành động ghi audit log, không hoàn tác được.</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="bo-btn" style={{ flex: 1, background: 'var(--bad)' }} onClick={() => setStep(2)}>Xác nhận thực hiện</button>
                    <button className="bo-btn ghost" onClick={() => setStep(0)}>Quay lại</button>
                  </div>
                </div>
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h3 style={{ color: 'var(--ok)' }}>✓ Đã xử lý xong trong 4 giây</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 12.5, color: 'var(--ink-2)' }}>
                <span>✓ 6 Zalo + 6 SMS + 2 email tiếng Nhật/Pháp đã gửi (đúng ngôn ngữ khách đặt)</span>
                <span>✓ {mode === 'refund' ? '5 lệnh hoàn tiền vào hàng đợi cổng thanh toán' : '6 link đổi ngày đã tạo (hạn 48h)'}</span>
                <span>✓ Hoàn công nợ đại lý An Phú: 2.649.600đ</span>
                <span>✓ Chuyến 13/06 đóng bán trên web/app/POS/OTA</span>
                <span>✓ Ghi audit log · báo cáo gửi BGĐ</span>
              </div>
              <button className="bo-btn ghost" style={{ width: '100%', marginTop: 14 }} onClick={() => setStep(0)}>Làm lại demo</button>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- 4 · maintenance ---------- */
function FleetView() {
  const today = new Date('2026-06-11');
  const days = (d) => Math.round((new Date(d) - today) / 864e5);
  const [booked, setBooked] = oUseState({});
  const rows = OPS.vehicles.map((v) => {
    const regD = days(v.reg), insD = days(v.ins);
    let st = 'ok', why = '';
    if (v.status === 'locked') { st = 'locked'; why = v.why; }
    else if (v.status === 'service') { st = 'service'; why = v.why; }
    else if (regD <= 14) { st = 'warn'; why = 'Đăng kiểm còn ' + regD + ' ngày'; }
    else if (insD <= 14) { st = 'warn'; why = 'Bảo hiểm còn ' + insD + ' ngày'; }
    return { ...v, regD, insD, st, why };
  });
  return (
    <div data-screen-label="Admin — Bảo dưỡng đội xe/tàu">
      <div className="bo-head">
        <div><h1>Hồ sơ đăng kiểm & bảo dưỡng</h1><div className="sub">Xe/tàu đến hạn tự khoá khỏi bảng điều độ — không thể gán chuyến cho tới khi cập nhật hồ sơ</div></div>
        <button className="bo-btn">+ Thêm phương tiện</button>
      </div>
      <div className="bo-kpis" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
        <div className="bo-kpi"><div className="lb">Đội phương tiện</div><div className="v">7</div><div className="d up">5 xe · 2 tàu</div></div>
        <div className="bo-kpi"><div className="lb">Sẵn sàng chạy</div><div className="v" style={{ color: 'var(--ok)' }}>5</div><div className="d up">đủ cho lịch 12/06</div></div>
        <div className="bo-kpi"><div className="lb">Bị khoá</div><div className="v" style={{ color: 'var(--bad)' }}>2</div><div className="d dn">1 hết đăng kiểm · 1 quá km bảo dưỡng</div></div>
        <div className="bo-kpi"><div className="lb">Đến hạn trong 14 ngày</div><div className="v" style={{ color: 'var(--warn)' }}>1</div><div className="d dn">29B-067.89 đăng kiểm 18/06</div></div>
      </div>
      <div className="bo-card" style={{ overflowX: 'auto' }}>
        <table className="bo-table">
          <thead><tr><th>Phương tiện</th><th>Loại</th><th>Đăng kiểm</th><th>Bảo hiểm</th><th className="r">Km từ bảo dưỡng</th><th>Trạng thái</th><th></th></tr></thead>
          <tbody>
            {rows.map((v) => (
              <tr key={v.id} style={v.st === 'locked' || v.st === 'service' ? { background: 'var(--bad-soft)' } : v.st === 'warn' ? { background: 'var(--warn-soft)' } : null}>
                <td><b>{v.bks}</b></td>
                <td>{v.lb}</td>
                <td>{v.reg.slice(8)}/{v.reg.slice(5, 7)}/{v.reg.slice(0, 4)}{v.regD <= 14 && <b style={{ color: v.regD < 0 ? 'var(--bad)' : 'var(--warn)' }}> ({v.regD < 0 ? 'quá hạn' : 'còn ' + v.regD + ' ngày'})</b>}</td>
                <td>{v.ins.slice(8)}/{v.ins.slice(5, 7)}/{v.ins.slice(0, 4)}</td>
                <td className="r">{v.km ? v.km.toLocaleString('vi-VN') + ' km' : '—'}</td>
                <td style={{ maxWidth: 230 }}>
                  {v.st === 'ok' && <Badge kind="ok">✓ Sẵn sàng</Badge>}
                  {v.st === 'warn' && <Badge kind="warn">⚠ {v.why}</Badge>}
                  {(v.st === 'locked' || v.st === 'service') && <Badge kind="bad">⛔ {v.st === 'locked' ? 'KHOÁ — hết đăng kiểm' : 'KHOÁ — cần bảo dưỡng'}</Badge>}
                  {(v.st === 'locked' || v.st === 'service') && <div style={{ fontSize: 10.5, color: 'var(--bad)', marginTop: 3 }}>{v.why}</div>}
                </td>
                <td className="r">
                  {v.st !== 'ok'
                    ? (booked[v.id]
                      ? <Badge kind="info">✓ Đã đặt lịch xưởng/đăng kiểm</Badge>
                      : <button className="bo-btn navy" style={{ padding: '6px 12px', fontSize: 11.5 }} onClick={() => setBooked({ ...booked, [v.id]: true })}>Đặt lịch xử lý</button>)
                    : <button className="bo-btn ghost" style={{ padding: '6px 12px', fontSize: 11.5 }}>Hồ sơ</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="dt-notice" style={{ marginTop: 12 }}>
        Quy tắc khoá tự động: quá hạn đăng kiểm/bảo hiểm <b>hoặc</b> &gt;15.000km từ lần bảo dưỡng gần nhất. Xe bị khoá biến mất khỏi dropdown của Bảng điều độ — đúng lỗi "xe bị giữ giữa mùa cao điểm" mà nhiều nhà xe gặp.
      </div>
    </div>
  );
}

/* ---------- 5 · route P&L (chống thất thoát) ---------- */
function PnLView() {
  const [fuel, setFuel] = oUseState(21000); // đ/lít dầu
  const ROWS = [
    // route, time, trips/tuần, pax TB, giá vé TB, km, lít/chuyến, phà+cầu, lương/chuyến, khấu hao
    ['HN → Cát Bà', '05:00', 7, 9.1, 330000, 140, 22, 280000, 450000, 320000],
    ['HN → Cát Bà', '08:00', 7, 10.6, 345000, 140, 22, 280000, 450000, 320000],
    ['HN → Cát Bà', '15:30', 7, 4.2, 330000, 140, 22, 280000, 450000, 320000],
    ['Cát Bà → HN', '09:30', 7, 8.4, 330000, 140, 22, 280000, 450000, 320000],
    ['HN → Hải Phòng', '07:00', 14, 7.8, 210000, 105, 16, 90000, 350000, 240000],
    ['Hải Phòng → HN (chặng 2 bán lại)', '07:15', 7, 2.1, 200000, 0, 0, 0, 0, 0],
    ['Cát Bà → Ninh Bình', '12:00', 3, 5.5, 300000, 180, 28, 310000, 520000, 380000],
  ];
  const calc = (r) => {
    const [route, tm, freq, pax, fare, km, lit, toll, wage, dep] = r;
    const rev = pax * fare;
    const cost = lit * fuel + toll + wage + dep;
    return { route, tm, freq, pax, rev, cost, profit: rev - cost, margin: cost ? Math.round(((rev - cost) / rev) * 100) : 100 };
  };
  const rows = ROWS.map(calc);
  const weekly = rows.reduce((s, r) => s + r.profit * r.freq, 0);
  return (
    <div data-screen-label="Admin — Lãi lỗ theo chuyến">
      <div className="bo-head">
        <div><h1>Lãi – lỗ theo từng chuyến</h1><div className="sub">Doanh thu khách TB trừ chi phí chuẩn (dầu, phà/cầu đường, lương tổ lái, khấu hao) — quyết định tăng/giảm tần suất bằng số liệu</div></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12.5 }}>
          <span>Giá dầu:</span>
          <input type="number" className="bo-input" style={{ width: 110 }} value={fuel} step={500} onChange={(e) => setFuel(+e.target.value || 0)} />
          <span>đ/lít</span>
        </div>
      </div>
      <div className="bo-kpis" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        <div className="bo-kpi"><div className="lb">Lợi nhuận gộp tuần (đội xe)</div><div className="v" style={{ color: 'var(--ok)' }}>{fmtM(weekly)}</div><div className="d up">theo giá dầu hiện nhập</div></div>
        <div className="bo-kpi"><div className="lb">Chuyến lỗ</div><div className="v" style={{ color: 'var(--bad)' }}>{rows.filter((r) => r.profit < 0).length}</div><div className="d dn">khung 15:30 HN→CB lỗ kéo dài</div></div>
        <div className="bo-kpi"><div className="lb">Doanh thu chặng bán lại</div><div className="v" style={{ color: 'var(--gold)' }}>{fmtVnd(rows[5].rev)}</div><div className="d up">chi phí ≈ 0 — lãi ròng 100%</div></div>
      </div>
      <div className="bo-card" style={{ overflowX: 'auto' }}>
        <table className="bo-table">
          <thead><tr><th>Tuyến · giờ</th><th className="r">Chuyến/tuần</th><th className="r">Khách TB</th><th className="r">Doanh thu/chuyến</th><th className="r">Chi phí/chuyến</th><th className="r">Lãi/lỗ</th><th className="r">Margin</th><th></th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={r.profit < 0 ? { background: 'var(--bad-soft)' } : null}>
                <td><b>{r.route}</b> · {r.tm}</td>
                <td className="r">{r.freq}</td>
                <td className="r">{r.pax}</td>
                <td className="r">{fmtVnd(Math.round(r.rev))}</td>
                <td className="r">{r.cost ? fmtVnd(Math.round(r.cost)) : '≈ 0'}</td>
                <td className="r"><b style={{ color: r.profit < 0 ? 'var(--bad)' : 'var(--ok)' }}>{r.profit < 0 ? '−' : '+'}{fmtVnd(Math.abs(Math.round(r.profit)))}</b></td>
                <td className="r"><Badge kind={r.profit < 0 ? 'bad' : r.margin > 40 ? 'ok' : 'warn'}>{r.margin}%</Badge></td>
                <td className="r">{r.profit < 0 && <button className="bo-btn ghost" style={{ padding: '5px 10px', fontSize: 11 }}>Đề xuất: gộp/đổi giờ</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="dt-notice" style={{ marginTop: 12 }}>
        Chuyến <b>15:30 HN → Cát Bà lỗ {fmtVnd(Math.abs(Math.round(rows[2].profit)))}/chuyến</b> (4,2 khách TB). Phương án theo số liệu: gộp với chuyến 12:30, đổi sang xe nhỏ hơn (Limo Green 7), hoặc chỉ chạy thứ 6–CN mùa thấp. Doanh thu phụ trợ (bảo hiểm, hành lý, đón sân bay) ghi nhận riêng trong Báo cáo &amp; đối soát.
      </div>
    </div>
  );
}

Object.assign(window, { DispatchView, SegmentsView, WeatherOpsView, FleetView, PnLView });
