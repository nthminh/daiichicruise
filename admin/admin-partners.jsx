/* DAIICHI BACK OFFICE — partner marketplace: manager view + partner portal */
const { useState: ptUseState } = React;

const PARTNERS = [
  { id: 'pt1', name: 'Hùng Cường Express', kind: 'Xe khách HN ⇄ Hải Phòng', services: 2, bookings: 184, gmv: 34960000, comm: 0.12, rating: 4.7, status: 'active', payout: 30764800 },
  { id: 'pt2', name: 'Hạ Long Pearl Transit', kind: 'Limo + tàu Hạ Long ⇄ Cát Bà', services: 1, bookings: 67, gmv: 19840000, comm: 0.12, rating: 4.8, status: 'active', payout: 17459200 },
  { id: 'pt3', name: 'Cát Bà Ocean Tour', kind: 'SUP · tour nhóm nhỏ Lan Hạ', services: 1, bookings: 41, gmv: 15990000, comm: 0.15, rating: 4.9, status: 'active', payout: 13591500 },
  { id: 'pt4', name: 'Tùng Dương Boats', kind: 'Tàu gỗ tham quan (đăng ký mới)', services: 0, bookings: 0, gmv: 0, comm: 0.15, rating: null, status: 'pending', payout: 0 },
];

/* ---------- manager: partner management ---------- */
function PartnersView() {
  const [approvals, setApprovals] = ptUseState([
    { id: 'ap1', partner: 'Cát Bà Ocean Tour', item: 'Tour mới: SUP Bình minh 05:30–08:00 · 420.000đ', note: 'Đã nộp giấy phép + bảo hiểm', state: null },
    { id: 'ap2', partner: 'Hùng Cường Express', item: 'Đổi giá HN→HP: 190.000đ → 205.000đ từ 01/07', note: 'Lý do: giá nhiên liệu', state: null },
    { id: 'ap3', partner: 'Tùng Dương Boats', item: 'Hồ sơ đối tác mới: 2 tàu gỗ 30 chỗ, bến Bèo', note: 'Chờ thẩm định an toàn', state: null },
  ]);
  const setSt = (id, v) => setApprovals(approvals.map((a) => a.id === id ? { ...a, state: v } : a));
  const act = PARTNERS.filter((p) => p.status === 'active');
  return (
    <div data-screen-label="Admin — Đối tác vận hành">
      <div className="bo-head">
        <div><h1>Đối tác vận hành (marketplace)</h1><div className="sub">Đơn vị ngoài bán dịch vụ trên nền tảng — đồng bộ chỗ trống realtime với web, POS, app</div></div>
        <button className="bo-btn">+ Mời đối tác</button>
      </div>
      <div className="bo-kpis">
        <div className="bo-kpi"><div className="lb">Đối tác đang bán</div><div className="v">{act.length}</div><div className="d up">+1 hồ sơ chờ duyệt</div></div>
        <div className="bo-kpi"><div className="lb">GMV đối tác T6</div><div className="v">{fmtM(act.reduce((s, p) => s + p.gmv, 0))}</div><div className="d up">▲ 22% so với T5</div></div>
        <div className="bo-kpi"><div className="lb">Hoa hồng nền tảng thu</div><div className="v">{fmtM(act.reduce((s, p) => s + p.gmv * p.comm, 0))}</div><div className="d up">12–15% / booking</div></div>
        <div className="bo-kpi"><div className="lb">Điểm chất lượng TB</div><div className="v">4,8 ★</div><div className="d up">Tự gỡ bán nếu &lt; 4,0</div></div>
      </div>
      <div className="bo-grid2">
        <div className="bo-card">
          <h3>Danh sách đối tác <span className="mut">đối soát & chi trả kỳ 15 / 30 hằng tháng</span></h3>
          <div style={{ overflowX: 'auto' }}>
            <table className="bo-table">
              <thead><tr><th>Đối tác</th><th>Dịch vụ</th><th className="r">Booking T6</th><th className="r">GMV</th><th className="r">HH nền tảng</th><th className="r">Chi trả kỳ tới</th><th>Trạng thái</th></tr></thead>
              <tbody>
                {PARTNERS.map((p) => (
                  <tr key={p.id}>
                    <td><b>{p.name}</b><br /><span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{p.kind}</span></td>
                    <td>{p.services} dịch vụ{p.rating ? ' · ★ ' + p.rating : ''}</td>
                    <td className="r">{p.bookings || '—'}</td>
                    <td className="r"><b>{p.gmv ? fmtVnd(p.gmv) : '—'}</b></td>
                    <td className="r">{Math.round(p.comm * 100)}%</td>
                    <td className="r"><b>{p.payout ? fmtVnd(p.payout) : '—'}</b></td>
                    <td>{p.status === 'active' ? <Badge kind="ok">Đang bán</Badge> : <Badge kind="warn">Chờ duyệt</Badge>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bo-card" style={{ alignSelf: 'start' }}>
          <h3>Chờ phê duyệt <span className="mut">{approvals.filter((a) => a.state === null).length} mục</span></h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {approvals.map((a) => (
              <div key={a.id} style={{ border: '1px solid var(--line)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 700 }}>{a.partner}</div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--ink)', margin: '3px 0' }}>{a.item}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{a.note}</div>
                {a.state === null ? (
                  <div style={{ display: 'flex', gap: 8, marginTop: 9 }}>
                    <button className="bo-btn navy" style={{ flex: 1, padding: '7px 0' }} onClick={() => setSt(a.id, 'ok')}>Duyệt</button>
                    <button className="bo-btn ghost" style={{ flex: 1, padding: '7px 0' }} onClick={() => setSt(a.id, 'no')}>Từ chối</button>
                  </div>
                ) : (
                  <div style={{ marginTop: 9 }}><Badge kind={a.state === 'ok' ? 'ok' : 'bad'}>{a.state === 'ok' ? '✓ Đã duyệt — phát hành lên web & app' : '✕ Đã từ chối — gửi phản hồi cho đối tác'}</Badge></div>
                )}
              </div>
            ))}
          </div>
          <div className="dt-notice" style={{ marginTop: 12 }}>
            Tiêu chuẩn đối tác: giấy phép vận tải/du lịch, bảo hiểm khách, cam kết SLA hoàn huỷ như Daiichi, gắn GPS với xe/tàu.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- partner portal ---------- */
function PartnerPortal() {
  const [svc, setSvc] = ptUseState([
    { id: 's1', lb: 'HN → Hải Phòng · Limo 10 ghế', price: 190000, trips: '5 chuyến/ngày', open: true },
    { id: 's2', lb: 'Hải Phòng → HN · Limo 10 ghế', price: 190000, trips: '5 chuyến/ngày', open: true },
  ]);
  const orders = [
    ['DT26-PK201', 'Trần Văn Nam · 2 khách', 'HN→HP 10:00 · 12/06', 380000, 'paid'],
    ['DT26-PK196', 'Yuki Tanaka · 1 khách', 'HN→HP 13:30 · 12/06', 190000, 'paid'],
    ['DT26-PK188', 'Lê Hồng Phúc · 3 khách', 'HP→HN 17:00 · 11/06', 570000, 'checkedin'],
    ['DT26-PK172', 'Khách lẻ POS Cát Bà', 'HN→HP 06:00 · 11/06', 190000, 'checkedin'],
  ];
  return (
    <div data-screen-label="Cổng đối tác vận hành">
      <div className="bo-head">
        <div><h1>Cổng đối tác — Hùng Cường Express</h1><div className="sub">Hoa hồng nền tảng 12% · đối soát kỳ 15 & 30 · chỗ trống đồng bộ realtime lên web, POS, app Daiichi</div></div>
      </div>
      <div className="bo-kpis" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
        <div className="bo-kpi"><div className="lb">Booking hôm nay</div><div className="v">23</div><div className="d up">▲ qua web Daiichi: 17 · POS: 6</div></div>
        <div className="bo-kpi"><div className="lb">GMV tháng 6</div><div className="v">35,0M</div><div className="d up">▲ 22% so với T5</div></div>
        <div className="bo-kpi"><div className="lb">Nhận về kỳ 15/06 (sau HH 12%)</div><div className="v" style={{ color: 'var(--ok)' }}>15,4M</div><div className="d up">chuyển khoản tự động</div></div>
        <div className="bo-kpi"><div className="lb">Điểm chất lượng</div><div className="v">★ 4,7</div><div className="d dn">2 khiếu nại trễ giờ T6 — giữ trên 4,0</div></div>
      </div>
      <div className="bo-grid2">
        <div className="bo-card">
          <h3>Dịch vụ của tôi <span className="mut">đổi giá cần Daiichi phê duyệt</span></h3>
          <table className="bo-table">
            <thead><tr><th>Dịch vụ</th><th>Tần suất</th><th className="r">Giá bán</th><th>Mở bán</th></tr></thead>
            <tbody>
              {svc.map((s) => (
                <tr key={s.id}>
                  <td><b>{s.lb}</b></td>
                  <td>{s.trips}</td>
                  <td className="r"><b>{fmtVnd(s.price)}</b></td>
                  <td>
                    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 700, color: s.open ? 'var(--ok)' : 'var(--ink-3)', cursor: 'pointer' }}>
                      <input type="checkbox" checked={s.open} style={{ accentColor: 'var(--ok)' }}
                        onChange={() => setSvc(svc.map((x) => x.id === s.id ? { ...x, open: !x.open } : x))} />
                      {s.open ? 'Đang bán' : 'Tạm khoá'}
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <button className="bo-btn gold">+ Đăng dịch vụ mới (chờ duyệt)</button>
            <button className="bo-btn ghost">Đề nghị đổi giá</button>
          </div>
          <div className="dt-notice" style={{ marginTop: 14 }}>
            Khi bạn khoá bán hoặc hết chỗ, website / POS / app Daiichi ngừng nhận khách <b>ngay lập tức</b> — không lo overbooking.
          </div>
        </div>
        <div className="bo-card">
          <h3>Booking gần đây của tôi</h3>
          <table className="bo-table">
            <thead><tr><th>Mã</th><th>Khách</th><th>Chuyến</th><th className="r">Tiền</th><th>TT</th></tr></thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={i}>
                  <td className="mono">{o[0]}</td><td>{o[1]}</td><td>{o[2]}</td>
                  <td className="r"><b>{fmtVnd(o[3])}</b></td>
                  <td><Badge kind={STATUS_BADGE[o[4]][0]}>{STATUS_BADGE[o[4]][1]}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 10 }}>
            Bạn chỉ thấy booking của dịch vụ mình vận hành. Thông tin khách được ẩn một phần theo chính sách dữ liệu.
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PartnersView, PartnerPortal, PARTNERS });
