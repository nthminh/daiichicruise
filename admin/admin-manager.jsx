/* DAIICHI BACK OFFICE — manager views */
const { useState: mUseState, useMemo: mUseMemo } = React;

/* ---------- dashboard ---------- */
function DashView() {
  const { bookings, revenue, agents } = ADMIN_DB;
  const todays = bookings.filter((b) => b.date === '2026-06-10');
  const paidSum = bookings.filter((b) => b.status !== 'refund').reduce((s, b) => s + b.total, 0);
  const channels = [
    { lb: 'Website', c: 'var(--navy-700)', v: 46 }, { lb: 'Đại lý', c: 'var(--gold)', v: 27 },
    { lb: 'Quầy vé', c: 'var(--red-bright)', v: 17 }, { lb: 'OTA (Klook, Traveloka...)', c: '#7A8BA8', v: 10 },
  ];
  const maxRev = Math.max(...revenue.map((r) => r.bus + r.lux));
  return (
    <div data-screen-label="Admin Dashboard">
      <div className="bo-head">
        <div><h1>Tổng quan kinh doanh</h1><div className="sub">Thứ Tư, 10/06/2026 · Tất cả thương hiệu: Bus · Day Cruise · Luxury Cruise · Tour</div></div>
        <button className="bo-btn navy">Xuất báo cáo ngày</button>
      </div>
      <div className="bo-kpis">
        <div className="bo-kpi"><div className="lb">Doanh thu hôm nay</div><div className="v">38,6M</div><div className="d up">▲ 12% so với hôm qua</div></div>
        <div className="bo-kpi"><div className="lb">Booking hôm nay</div><div className="v">{todays.length + 21}</div><div className="d up">▲ 8 booking mới / giờ qua</div></div>
        <div className="bo-kpi"><div className="lb">Lấp đầy xe hôm nay</div><div className="v">81%</div><div className="d up">▲ HN–Cát Bà gần kín sáng</div></div>
        <div className="bo-kpi"><div className="lb">Công nợ đại lý</div><div className="v">{fmtM(agents.reduce((s, a) => s + a.debt, 0))}</div><div className="d dn">▼ 1 đại lý chạm 70% hạn mức</div></div>
      </div>
      <div className="bo-grid2">
        <div className="bo-card">
          <h3>Doanh thu 14 ngày <span className="mut">■ Bus & Day cruise · <span style={{ color: 'var(--gold)' }}>■</span> Luxury Cruise (triệu đồng)</span></h3>
          <div className="bo-chart">
            {revenue.map((r, i) => (
              <div key={i} className="bar" title={r.d + ': ' + (r.bus + r.lux) + 'M'}>
                <i className="gold" style={{ height: (r.lux / maxRev) * 100 + '%' }}></i>
                <i style={{ height: (r.bus / maxRev) * 100 + '%' }}></i>
                <span>{r.d.slice(3)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bo-card">
          <h3>Kênh bán <span className="mut">30 ngày</span></h3>
          <div className="bo-donut-row">
            {channels.map((c) => (
              <div key={c.lb} className="it">
                <span className="sw" style={{ background: c.c }}></span>
                <span>{c.lb}</span><b>{c.v}%</b>
                <span className="bo-track"><i style={{ width: c.v * 2 + '%', background: c.c }}></i></span>
              </div>
            ))}
          </div>
          <h3 style={{ marginTop: 18 }}>Cảnh báo vận hành</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12.5, color: 'var(--ink-2)' }}>
            {(() => { try { const n = JSON.parse(localStorage.getItem('dt_charter') || '[]').length; return n ? <span>💌 <b>{n} yêu cầu thuê nguyên chuyến</b> từ website chưa báo giá — SLA 2 giờ.</span> : null; } catch (e) { return null; } })()}
            {ADMIN_DB.webCount > 0 && <span>🟢 <b>{ADMIN_DB.webCount} booking đặt thật từ website</b> đã đổ vào danh sách (chấm ● xanh).</span>}
            <span>⚠️ Chuyến 08:00 HN→CB (Limo 11) <b>còn 1 ghế</b> — cân nhắc tăng cường.</span>
            <span>⚠️ Hòa Bình Tourist đạt <b>72% hạn mức công nợ</b>.</span>
            <span>✅ Du thuyền 12/06: 28/32 suite đã bán.</span>
          </div>
        </div>
      </div>
      <div className="bo-card">
        <h3>Booking mới nhất <span className="mut">tự động cập nhật</span></h3>
        <div style={{ overflowX: 'auto' }}>
          <BookingTable rows={ADMIN_DB.bookings.slice(0, 8)} compact />
        </div>
      </div>
    </div>
  );
}

/* ---------- bookings ---------- */
function BookingTable({ rows, compact, onPick }) {
  return (
    <table className="bo-table">
      <thead><tr>
        <th>Mã</th><th>Khách</th><th>Sản phẩm</th><th>Ngày đi</th>{!compact && <th>Kênh</th>}
        <th className="r">Pax</th><th className="r">Tổng tiền</th><th>Trạng thái</th>
      </tr></thead>
      <tbody>
        {rows.map((b) => (
          <tr key={b.code} style={onPick ? { cursor: 'pointer' } : null} onClick={onPick ? () => onPick(b) : undefined}>
            <td className="mono">{b.code}{b.isWeb && <span title="Đặt thật từ website — liên thông demo" style={{ color: 'var(--ok)', marginLeft: 4 }}>●</span>}</td>
            <td><b>{b.name}</b><br /><span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{b.phone}</span></td>
            <td>{b.product}</td>
            <td>{b.date.slice(8)}/{b.date.slice(5, 7)} · {b.time}</td>
            {!compact && <td>{b.agent || CHANNEL_LB[b.channel]}</td>}
            <td className="r">{b.pax}</td>
            <td className="r"><b>{fmtVnd(b.total)}</b></td>
            <td><Badge kind={STATUS_BADGE[b.status][0]}>{STATUS_BADGE[b.status][1]}</Badge></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function BookingsView() {
  const [fStatus, setFStatus] = mUseState('all');
  const [fKind, setFKind] = mUseState('all');
  const [q, setQ] = mUseState('');
  const [sel, setSel] = mUseState(null);
  const [refundMode, setRefundMode] = mUseState(false);
  const [refundReason, setRefundReason] = mUseState('Khách đổi lịch');
  let rows = ADMIN_DB.bookings;
  if (fStatus !== 'all') rows = rows.filter((b) => b.status === fStatus);
  if (fKind !== 'all') rows = rows.filter((b) => b.kind === fKind);
  if (q) rows = rows.filter((b) => (b.code + b.name + b.phone).toLowerCase().includes(q.toLowerCase()));
  return (
    <div data-screen-label="Admin — Quản lý booking">
      <div className="bo-head">
        <div><h1>Quản lý booking</h1><div className="sub">{rows.length} booking · click một dòng để xem chi tiết & thao tác</div></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <input className="bo-input" placeholder="Tìm mã / tên / SĐT…" value={q} onChange={(e) => setQ(e.target.value)} style={{ width: 220 }} />
          <button className="bo-btn">+ Tạo booking</button>
        </div>
      </div>
      <div className="bo-filters">
        {[['all', 'Tất cả'], ['paid', 'Đã thanh toán'], ['hold', 'Giữ chỗ'], ['checkedin', 'Đã check-in'], ['refund', 'Hoàn vé']].map(([id, lb]) => (
          <button key={id} className={'bo-chip' + (fStatus === id ? ' on' : '')} onClick={() => setFStatus(id)}>{lb}</button>
        ))}
        <span style={{ width: 12 }}></span>
        {[['all', 'Mọi sản phẩm'], ['bus', 'Bus'], ['day', 'Day Cruise'], ['lux', 'Luxury'], ['tour', 'Combo']].map(([id, lb]) => (
          <button key={id} className={'bo-chip' + (fKind === id ? ' on' : '')} onClick={() => setFKind(id)}>{lb}</button>
        ))}
      </div>
      <div className="bo-card" style={{ overflowX: 'auto' }}>
        <BookingTable rows={rows} onPick={setSel} />
      </div>
      {sel && (
        <React.Fragment>
          <div className="bo-drawer-bg" onClick={() => setSel(null)}></div>
          <div className="bo-drawer" data-screen-label="Chi tiết booking">
            <button className="x" onClick={() => setSel(null)}>✕</button>
            <h2>{sel.code}</h2>
            <Badge kind={STATUS_BADGE[sel.status][0]}>{STATUS_BADGE[sel.status][1]}</Badge>
            <div className="bo-kv">
              <div><span>Khách hàng</span><b>{sel.name}</b></div>
              <div><span>Điện thoại</span><b>{sel.phone}</b></div>
              <div style={{ gridColumn: '1/-1' }}><span>Sản phẩm</span><b>{sel.product}</b></div>
              <div><span>Ngày đi</span><b>{sel.date} · {sel.time}</b></div>
              <div><span>Số khách</span><b>{sel.pax}</b></div>
              <div><span>Kênh</span><b>{sel.agent || CHANNEL_LB[sel.channel]}</b></div>
              <div><span>Thanh toán</span><b>{sel.pay}</b></div>
              <div><span>Tổng tiền</span><b style={{ color: 'var(--red)' }}>{fmtVnd(sel.total)}</b></div>
              <div><span>Ngày đặt</span><b>{sel.created}</b></div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button className="bo-btn navy">Check-in</button>
              <button className="bo-btn ghost">Đổi chuyến</button>
              <button className="bo-btn ghost">Gửi lại vé</button>
              {sel.status !== 'refund' && <button className="bo-btn ghost" style={{ color: 'var(--bad)' }} onClick={() => setRefundMode(!refundMode)}>Hoàn vé</button>}
            </div>
            {refundMode && sel.status !== 'refund' && (() => {
              /* chính sách hoàn: bus/tour 12h · cruise đêm 100%/50%/0 theo mốc 7/3 ngày · cấm biển luôn 100% */
              const NOW = '2026-06-11';
              const daysLeft = Math.round((new Date(sel.date) - new Date(NOW)) / 864e5);
              const isLux = sel.kind === 'lux' || sel.kind === 'luxury';
              const weatherBan = refundReason === 'Cảng vụ cấm tàu (hoàn 100%)';
              let pct, policyLb;
              if (weatherBan) { pct = 100; policyLb = 'cấm biển → hoàn 100% mọi dịch vụ tàu'; }
              else if (isLux) {
                if (daysLeft > 7) { pct = 100; policyLb = 'cruise đêm · còn >7 ngày → hoàn 100%'; }
                else if (daysLeft > 3) { pct = 50; policyLb = 'cruise đêm · còn 3–7 ngày → hoàn 50%'; }
                else { pct = 0; policyLb = 'cruise đêm · dưới 3 ngày → không hoàn, đổi ngày miễn phí 1 lần'; }
              } else {
                const eligible = sel.date >= NOW; // demo: >12h before departure
                pct = eligible ? 100 : 0;
                policyLb = eligible ? 'huỷ trước 12h → hoàn 100%' : 'trong 12h → không hoàn, được đổi chuyến miễn phí 1 lần';
              }
              const amount = Math.round(sel.total * pct / 100);
              return (
                <div style={{ marginTop: 14, border: '1.5px solid var(--bad)', borderRadius: 10, padding: '13px 15px', background: 'var(--bad-soft)' }} data-screen-label="Quy trình hoàn vé">
                  <b style={{ fontSize: 13, color: 'var(--bad)' }}>Hoàn vé {sel.code}</b>
                  <div style={{ fontSize: 12, color: 'var(--ink-2)', margin: '6px 0' }}>
                    Chính sách: {policyLb} · Số tiền hoàn: <b style={{ color: 'var(--bad)' }}>{fmtVnd(amount)}</b> → {sel.pay}
                  </div>
                  <select className="bo-select" value={refundReason} onChange={(e) => setRefundReason(e.target.value)} style={{ width: '100%', marginBottom: 9 }}>
                    {['Khách đổi lịch', 'Cảng vụ cấm tàu (hoàn 100%)', 'Trùng booking', 'Lý do khác'].map((x) => <option key={x}>{x}</option>)}
                  </select>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="bo-btn" style={{ flex: 1 }} onClick={() => { sel.status = 'refund'; setSel({ ...sel }); setRefundMode(false); }}>Xác nhận hoàn {fmtVnd(amount)}</button>
                    <button className="bo-btn ghost" onClick={() => setRefundMode(false)}>Huỷ</button>
                  </div>
                  <div style={{ fontSize: 10.5, color: 'var(--ink-3)', marginTop: 7 }}>Ghi audit log · tiền về phương thức gốc trong 5–7 ngày · SMS/Zalo báo khách tự động</div>
                </div>
              );
            })()}
            <div style={{ marginTop: 18, fontSize: 11.5, color: 'var(--ink-3)' }}>
              Lịch sử: tạo {sel.created} qua {sel.agent || CHANNEL_LB[sel.channel]} · thanh toán {sel.pay} · vé điện tử đã gửi SMS/Zalo.
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

/* ---------- trips & seat occupancy ---------- */
function TripsView() {
  const routes = [
    { id: 'hn-cb', lb: 'Hà Nội → Cát Bà', services: ['b1', 'b3', 'b5', 'b7'] },
    { id: 'cb-hn', lb: 'Cát Bà → Hà Nội', services: ['b1', 'b3'] },
    { id: 'hn-hp', lb: 'Hà Nội → Hải Phòng', services: ['b9', 'b10'] },
  ];
  const [route, setRoute] = mUseState('hn-cb');
  const [date, setDate] = mUseState('2026-06-10');
  const [tripIdx, setTripIdx] = mUseState(2);
  const r = routes.find((x) => x.id === route);
  const trips = [];
  r.services.forEach((sid) => {
    const s = DT_DATA.BUS.find((x) => x.id === sid);
    const times = route === 'cb-hn' ? s.times.back : s.times.go;
    times.forEach((tm) => trips.push({ s, tm }));
  });
  trips.sort((a, b) => a.tm.localeCompare(b.tm));
  const trip = trips[Math.min(tripIdx, trips.length - 1)];
  const { seats, sold } = DT_DATA.soldSeats(trip.s.veh, trip.s.id + date + trip.tm);
  const pattern = { bus45: ['A','B','','C','D'], limo34: ['A','B','','C'], limo11: ['A','','B'], limo10: ['A','','B'], limo7: ['A','','B'] }[trip.s.veh];
  const rows = {};
  seats.forEach((s) => { (rows[s.row] = rows[s.row] || []).push(s); });
  const soldN = sold.size, total = seats.length;
  return (
    <div data-screen-label="Admin — Sơ đồ ghế theo chuyến">
      <div className="bo-head">
        <div><h1>Chuyến & sơ đồ ghế</h1><div className="sub">Theo dõi lấp đầy từng chuyến, giữ chỗ cho khách gọi điện</div></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <select className="bo-select" value={route} onChange={(e) => { setRoute(e.target.value); setTripIdx(0); }}>
            {routes.map((x) => <option key={x.id} value={x.id}>{x.lb}</option>)}
          </select>
          <input type="date" className="bo-input" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </div>
      <div className="bo-filters">
        {trips.slice(0, 12).map((x, i) => (
          <button key={i} className={'bo-chip' + (i === Math.min(tripIdx, trips.length - 1) ? ' on' : '')} onClick={() => setTripIdx(i)}>
            {x.tm} · {I18N ? '' : ''}{x.s.veh}
          </button>
        ))}
      </div>
      <div className="bo-grid2">
        <div className="bo-card">
          <h3>{trip.tm} — {trip.s.veh} <span className="mut">{soldN}/{total} ghế đã bán · {Math.round((soldN / total) * 100)}%</span></h3>
          <div style={{ overflowX: 'auto' }}>
            <div className="bo-seatmap">
              {Object.keys(rows).map((rk) => {
                const isLast = +rk === Math.max(...Object.keys(rows).map(Number));
                const cols = isLast ? rows[rk].map((s) => s.col) : pattern;
                return (
                  <div key={rk} className="bo-seat-row">
                    {cols.map((c, ci) => {
                      if (!c) return <span key={ci} className="bo-seat aisle"></span>;
                      const st = rows[rk].find((s) => s.col === c);
                      if (!st) return <span key={ci} className="bo-seat aisle"></span>;
                      const isSold = sold.has(st.id);
                      const isHold = !isSold && (st.row * 7 + st.col.charCodeAt(0)) % 11 === 3;
                      return <span key={ci} className={'bo-seat' + (isSold ? ' sold' : isHold ? ' held' : '')}>{st.id}</span>;
                    })}
                  </div>
                );
              })}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 11.5, color: 'var(--ink-2)' }}>
            <span><span className="bo-seat" style={{ display: 'inline-flex', width: 18, height: 16 }}></span> Trống</span>
            <span><span className="bo-seat sold" style={{ display: 'inline-flex', width: 18, height: 16 }}></span> Đã bán</span>
            <span><span className="bo-seat held" style={{ display: 'inline-flex', width: 18, height: 16 }}></span> Giữ chỗ</span>
          </div>
        </div>
        <div className="bo-card">
          <h3>Thao tác nhanh</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button className="bo-btn navy">Giữ chỗ qua điện thoại</button>
            <button className="bo-btn ghost">In danh sách khách (cho tài xế)</button>
            <button className="bo-btn ghost">Tăng cường xe</button>
            <button className="bo-btn ghost">Nhắn Zalo cả chuyến (báo trễ…)</button>
          </div>
          <h3 style={{ marginTop: 18 }}>Doanh thu chuyến</h3>
          <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--navy)' }}>{fmtVnd(soldN * (trip.s.low))}</div>
          <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 4 }}>Giá vé {fmtVnd(trip.s.low)} · mùa thấp (demo)</div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DashView, BookingsView, TripsView, BookingTable });
