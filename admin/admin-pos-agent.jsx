/* DAIICHI BACK OFFICE — POS quầy vé, check-in nhân viên, cổng đại lý */
const { useState: sUseState } = React;

/* ---------- POS ---------- */
function POSView() {
  const routes = [
    { id: 'b3', lb: 'HN → Cát Bà · Limo 11 + tàu', price: 360000 },
    { id: 'b1', lb: 'HN → Cát Bà · Bus + tàu', price: 300000 },
    { id: 'b10', lb: 'HN → Hải Phòng · Limo 10', price: 210000 },
    { id: 'b17', lb: 'Cát Bà → Hải Phòng · Xe điện + phà', price: 200000 },
    { id: 'vip1', lb: 'Day Cruise VIP 1 (09:00–15:30)', price: 720000 },
    { id: 'sunset', lb: 'Day Cruise Sunset (15:30–18:30)', price: 430000 },
  ];
  const [route, setRoute] = sUseState(routes[0]);
  const [time, setTime] = sUseState('08:00');
  const [pax, setPax] = sUseState(1);
  const [name, setName] = sUseState('');
  const [phone, setPhone] = sUseState('');
  const [pay, setPay] = sUseState('Tiền mặt');
  const [doneTicket, setDoneTicket] = sUseState(null);
  const busService = DT_DATA.BUS.find((b) => b.id === route.id);
  const times = busService ? busService.times.go : ['06:00', '09:00', '11:45', '15:30'];
  const total = pax * route.price;
  const sell = () => {
    setDoneTicket({ code: DT_STORE_POS(), route: route.lb, time, pax, total, name: name || 'Khách lẻ', phone, pay });
    setName(''); setPhone('');
  };
  return (
    <div data-screen-label="POS bán vé tại quầy">
      <div className="bo-head">
        <div><h1>POS — Bán vé tại quầy</h1><div className="sub">Quầy vé Cát Bà · ca sáng · Lê Thu Trang</div></div>
        <div style={{ display: 'flex', gap: 14, fontSize: 12.5, color: 'var(--ink-2)', alignItems: 'center' }}>
          <span>Đã bán hôm nay: <b>52 vé · 18,7M</b></span>
          <button className="bo-btn ghost">Kết ca / kiểm quỹ</button>
        </div>
      </div>
      <div className="pos-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="bo-card">
            <h3>1 · Chọn dịch vụ</h3>
            <div className="bo-filters" style={{ marginBottom: 0 }}>
              {routes.map((r) => (
                <button key={r.id} className={'bo-chip' + (route.id === r.id ? ' on' : '')} onClick={() => { setRoute(r); }}>{r.lb}</button>
              ))}
            </div>
          </div>
          <div className="bo-card">
            <h3>2 · Giờ khởi hành — hôm nay 10/06</h3>
            <div className="pos-times">
              {times.map((tm) => (
                <button key={tm} className={'pos-time' + (time === tm ? ' on' : '')} onClick={() => setTime(tm)}>
                  {tm}<span>còn chỗ</span>
                </button>
              ))}
            </div>
          </div>
          <div className="bo-card">
            <h3>3 · Khách & thanh toán</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 10, alignItems: 'end' }}>
              <div className="dt-field"><label>Tên khách (tuỳ chọn)</label><input className="bo-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Khách lẻ" /></div>
              <div className="dt-field"><label>SĐT (nhận vé Zalo)</label><input className="bo-input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="09xx…" /></div>
              <div className="dt-field"><label>Số vé</label><Stepper v={pax} set={setPax} min={1} max={20} /></div>
            </div>
            <div className="bo-filters" style={{ margin: '14px 0 0' }}>
              {['Tiền mặt', 'QR VNPay', 'Thẻ'].map((p) => (
                <button key={p} className={'bo-chip' + (pay === p ? ' on' : '')} onClick={() => setPay(p)}>{p}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="bo-card" style={{ background: 'var(--navy)', color: '#fff', border: 0 }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.6)' }}>{route.lb} · {time}</div>
            <div style={{ fontSize: 13, margin: '6px 0' }}>{pax} vé × {fmtVnd(route.price)}</div>
            <div style={{ fontSize: 30, fontWeight: 800, color: 'var(--gold-bright)' }}>{fmtVnd(total)}</div>
            <button className="bo-btn gold" style={{ width: '100%', marginTop: 12, padding: '12px 0', fontSize: 14 }} onClick={sell}>
              Thu tiền & in vé
            </button>
          </div>
          {doneTicket && (
            <div className="pos-ticket" data-screen-label="Vé POS vừa in">
              <div style={{ textAlign: 'center', borderBottom: '1px dashed var(--line-2)', paddingBottom: 10, marginBottom: 10 }}>
                <b style={{ fontSize: 14, color: 'var(--navy)' }}>DAIICHI TRAVEL</b>
                <div style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>Vé quầy · {doneTicket.code}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <span><b>{doneTicket.route}</b></span>
                <span>Giờ đi: <b>{doneTicket.time} · 10/06/2026</b></span>
                <span>Khách: <b>{doneTicket.name}</b> {doneTicket.phone && '· ' + doneTicket.phone}</span>
                <span>Số vé: <b>{doneTicket.pax}</b> · {doneTicket.pay}</span>
                <span>Tổng: <b style={{ color: 'var(--red)' }}>{fmtVnd(doneTicket.total)}</b></span>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button className="bo-btn ghost" style={{ flex: 1 }} onClick={() => window.print()}>In lại</button>
                <button className="bo-btn navy" style={{ flex: 1 }}>Gửi Zalo</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
function DT_STORE_POS() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let s = ''; for (let i = 0; i < 5; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return 'POS-' + s;
}

/* ---------- staff check-in ---------- */
function CheckinView() {
  const [done, setDone] = sUseState({});
  const todays = ADMIN_DB.bookings.filter((b) => b.date === '2026-06-10' && b.status !== 'refund').slice(0, 10);
  return (
    <div data-screen-label="Soát vé / check-in">
      <div className="bo-head">
        <div><h1>Soát vé & check-in</h1><div className="sub">Chuyến hôm nay · quét QR trên vé điện tử hoặc tìm theo mã</div></div>
        <button className="bo-btn navy">📷 Quét QR</button>
      </div>
      <div className="bo-card">
        <h3>Khách hôm nay <span className="mut">{todays.length} booking</span></h3>
        <table className="bo-table">
          <thead><tr><th>Mã</th><th>Khách</th><th>Sản phẩm</th><th>Giờ</th><th className="r">Pax</th><th></th></tr></thead>
          <tbody>
            {todays.map((b) => {
              const isDone = done[b.code] || b.status === 'checkedin';
              return (
                <tr key={b.code}>
                  <td className="mono">{b.code}</td>
                  <td><b>{b.name}</b></td>
                  <td>{b.product}</td>
                  <td>{b.time}</td>
                  <td className="r">{b.pax}</td>
                  <td className="r">
                    {isDone
                      ? <Badge kind="ok">✓ Đã lên xe/tàu</Badge>
                      : <button className="bo-btn" style={{ padding: '6px 14px' }} onClick={() => setDone({ ...done, [b.code]: true })}>Check-in</button>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- agent portal ---------- */
function AgentPortal() {
  const me = ADMIN_DB.agents[0]; // An Phú Travel
  const netOff = me.comm;
  const products = [
    { lb: 'Bus HN → Cát Bà · Limo 11 + tàu', retail: 360000 },
    { lb: 'Day Cruise VIP 1', retail: 720000 },
    { lb: 'Day Cruise VIP 4 · 5★', retail: 850000 },
    { lb: 'Combo VIP 4 + Bus Hà Nội', retail: 1350000 },
    { lb: 'Luxury Cruise · Deluxe 2N1Đ', retail: 2860000 },
    { lb: 'Luxury Cruise · Senior 2N1Đ', retail: 3250000 },
  ];
  const [prod, setProd] = sUseState(products[0]);
  const [pax, setPax] = sUseState(2);
  const [date, setDate] = sUseState('2026-06-15');
  const [cust, setCust] = sUseState('');
  const [orders, setOrders] = sUseState([
    { code: 'AG-K2M84', lb: 'Day Cruise VIP 1 × 4', date: '12/06', net: 2649600, comm: 230400 },
    { code: 'AG-P7Q21', lb: 'Bus HN→CB Limo 11 × 2', date: '11/06', net: 662400, comm: 57600 },
  ]);
  const net = Math.round(prod.retail * (1 - netOff));
  const pct = Math.round((me.debt / me.limit) * 100);
  const book = () => {
    if (!cust.trim()) return;
    const code = 'AG-' + Math.random().toString(36).slice(2, 7).toUpperCase();
    setOrders([{ code, lb: prod.lb + ' × ' + pax, date: date.slice(8) + '/' + date.slice(5, 7), net: net * pax, comm: (prod.retail - net) * pax }, ...orders]);
    setCust('');
  };
  return (
    <div data-screen-label="Cổng đại lý">
      <div className="bo-head">
        <div><h1>Cổng đại lý — {me.name}</h1><div className="sub">Hạng {me.tier} · chiết khấu {Math.round(netOff * 100)}% trên giá niêm yết · thanh toán công nợ kỳ 15 & 30 hằng tháng</div></div>
      </div>
      <div className="bo-kpis" style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
        <div className="bo-kpi" style={{ border: '1.5px solid var(--gold)', background: 'var(--gold-soft)' }}>
          <div className="lb">Hạng của bạn · tháng 6</div>
          <div className="v" style={{ color: 'var(--gold)' }}>🏅 Vàng · 10%</div>
          <div className="ag-credit" style={{ marginTop: 6 }}>
            <div className="bar"><i style={{ width: '72%', background: 'var(--gold)' }}></i></div>
            <div style={{ fontSize: 11, color: 'var(--ink-2)' }}>Doanh số 86,4M — còn <b>33,6M</b> để lên 💎 Bạch Kim (12% + công nợ 45 ngày) · bạn đang đứng <b>#2/5</b> toàn hệ thống</div>
          </div>
        </div>
        <div className="bo-kpi">
          <div className="lb">Công nợ hiện tại</div>
          <div className="v">{fmtM(me.debt)}</div>
          <div className="ag-credit" style={{ marginTop: 6 }}>
            <div className="bar"><i style={{ width: pct + '%' }}></i></div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{pct}% của hạn mức {fmtM(me.limit)}</div>
          </div>
        </div>
        <div className="bo-kpi"><div className="lb">Hoa hồng tháng 6 (tạm tính)</div><div className="v" style={{ color: 'var(--ok)' }}>4,8M</div><div className="d up">23 booking · ▲ 18% so với T5</div></div>
        <div className="bo-kpi"><div className="lb">Khách đã phục vụ T6</div><div className="v">112</div><div className="d up">Tỉ lệ huỷ 1,8%</div></div>
      </div>
      <div className="bo-grid2">
        <div className="bo-card">
          <h3>Đặt hộ khách — giá net của bạn</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="dt-field" style={{ gridColumn: '1/-1' }}>
              <label>Sản phẩm</label>
              <select className="bo-select" value={prod.lb} onChange={(e) => setProd(products.find((p) => p.lb === e.target.value))}>
                {products.map((p) => <option key={p.lb}>{p.lb}</option>)}
              </select>
            </div>
            <div className="dt-field"><label>Ngày đi</label><input type="date" className="bo-input" value={date} onChange={(e) => setDate(e.target.value)} /></div>
            <div className="dt-field"><label>Số khách</label><Stepper v={pax} set={setPax} min={1} max={20} /></div>
            <div className="dt-field" style={{ gridColumn: '1/-1' }}><label>Tên khách / SĐT</label><input className="bo-input" value={cust} onChange={(e) => setCust(e.target.value)} placeholder="Nguyễn Văn A · 09xx xxx xxx" /></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, padding: '12px 14px', background: 'var(--gold-soft)', borderRadius: 10 }}>
            <div style={{ fontSize: 12.5 }}>
              Giá niêm yết <s>{fmtVnd(prod.retail * pax)}</s> → <b style={{ color: 'var(--navy)', fontSize: 15 }}>Net: {fmtVnd(net * pax)}</b>
              <div style={{ fontSize: 11, color: '#7A5A1E' }}>Hoa hồng của bạn: {fmtVnd((prod.retail - net) * pax)} · trừ vào công nợ</div>
            </div>
            <button className="bo-btn gold" disabled={!cust.trim()} onClick={book}>Đặt chỗ</button>
          </div>
        </div>
        <div className="bo-card">
          <h3>Booking của tôi</h3>
          <table className="bo-table">
            <thead><tr><th>Mã</th><th>Dịch vụ</th><th>Ngày</th><th className="r">Net</th><th className="r">Hoa hồng</th></tr></thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.code}>
                  <td className="mono">{o.code}</td><td>{o.lb}</td><td>{o.date}</td>
                  <td className="r"><b>{fmtVnd(o.net)}</b></td>
                  <td className="r" style={{ color: 'var(--ok)', fontWeight: 700 }}>+{fmtVnd(o.comm)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------- agent tiers & leaderboard ---------- */
const TIER_DEFAULTS = [
  { id: 'plat', lb: 'Bạch Kim', min: 120000000, pct: 12, perk: 'Giữ chỗ ưu tiên + công nợ 45 ngày + hotline riêng' },
  { id: 'gold', lb: 'Vàng', min: 50000000, pct: 10, perk: 'Công nợ 30 ngày + ưu tiên mùa cao điểm' },
  { id: 'silver', lb: 'Bạc', min: 0, pct: 8, perk: 'Hạng khởi điểm — công nợ 15 ngày' },
];
const AGENT_SALES = [
  { nm: 'An Phú Travel', sales: 86400000, bookings: 41, cancel: 1.8, last: 71200000 },
  { nm: 'Hòa Bình Tourist', sales: 132500000, bookings: 58, cancel: 3.1, last: 98400000 },
  { nm: 'SunViet Travel', sales: 36800000, bookings: 19, cancel: 0.9, last: 41500000 },
  { nm: 'Cát Bà Discovery', sales: 58100000, bookings: 27, cancel: 2.2, last: 52300000 },
  { nm: 'Hạ Long Go', sales: 21400000, bookings: 11, cancel: 4.5, last: 18900000 },
];
function tierOf(sales, tiers) { return tiers.find((t) => sales >= t.min); }

function TiersView() {
  const [tiers, setTiers] = sUseState(TIER_DEFAULTS);
  const setPct = (id, v) => setTiers(tiers.map((t) => t.id === id ? { ...t, pct: Math.max(0, Math.min(30, +v || 0)) } : t));
  const ranked = AGENT_SALES.slice().sort((a, b) => b.sales - a.sales);
  const medals = ['🥇', '🥈', '🥉'];
  return (
    <div data-screen-label="Admin — Hạng & xếp hạng đại lý">
      <div className="bo-head">
        <div><h1>Hoa hồng bậc thang & bảng xếp hạng đại lý</h1><div className="sub">Doanh số tháng quyết định hạng tháng sau — đại lý thấy bảng xếp hạng realtime trong cổng của mình</div></div>
        <button className="bo-btn navy">Lưu & công bố cho đại lý</button>
      </div>
      <div className="bo-grid2" style={{ gridTemplateColumns: '1fr 1.5fr' }}>
        <div className="bo-card" style={{ alignSelf: 'start' }}>
          <h3>Cấu hình bậc <span className="mut">áp dụng từ kỳ tới</span></h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {tiers.map((t) => (
              <div key={t.id} style={{ border: '1.5px solid ' + (t.id === 'plat' ? 'var(--gold)' : 'var(--line)'), borderRadius: 11, padding: '12px 14px', background: t.id === 'plat' ? 'var(--gold-soft)' : '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <b style={{ fontSize: 13.5, color: 'var(--navy)' }}>{t.id === 'plat' ? '💎' : t.id === 'gold' ? '🏅' : '🥈'} {t.lb}</b>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12 }}>
                    <input type="number" className="bo-input" style={{ width: 64, padding: '5px 8px' }} value={t.pct} onChange={(e) => setPct(t.id, e.target.value)} />
                    <b>% chiết khấu</b>
                  </span>
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-2)', marginTop: 5 }}>
                  {t.min > 0 ? 'Doanh số ≥ ' + fmtM(t.min) + '/tháng' : 'Không yêu cầu doanh số'} · {t.perk}
                </div>
              </div>
            ))}
          </div>
          <div className="dt-notice" style={{ marginTop: 12 }}>
            Lên hạng áp dụng ngay tháng sau; xuống hạng chỉ khi 2 tháng liên tiếp dưới mốc — tránh trừng phạt đại lý vì 1 tháng thấp điểm. Tỉ lệ huỷ &gt;5% bị tạm khoá thưởng hạng.
          </div>
        </div>
        <div className="bo-card">
          <h3>Bảng xếp hạng tháng 6/2026 <span className="mut">cập nhật realtime · gửi Zalo đại lý mỗi sáng thứ Hai</span></h3>
          <table className="bo-table">
            <thead><tr><th>#</th><th>Đại lý</th><th className="r">Doanh số T6</th><th className="r">Booking</th><th className="r">Tỉ lệ huỷ</th><th>Hạng hiện tại</th><th>Tiến tới hạng kế</th><th className="r">Hoa hồng tạm tính</th></tr></thead>
            <tbody>
              {ranked.map((a, i) => {
                const t = tierOf(a.sales, tiers);
                /* huỷ >5% → tạm khoá thưởng hạng: hoa hồng rơi về bậc khởi điểm cho tới khi tỉ lệ huỷ về ngưỡng */
                const bonusLocked = a.cancel > 5;
                const eff = bonusLocked ? tiers[tiers.length - 1] : t;
                const next = tiers.slice().reverse().find((x) => x.min > a.sales);
                const prog = next ? Math.min(100, Math.round((a.sales / next.min) * 100)) : 100;
                return (
                  <tr key={a.nm}>
                    <td style={{ fontSize: 16 }}>{medals[i] || i + 1}</td>
                    <td><b>{a.nm}</b><br /><span style={{ fontSize: 10.5, color: a.sales >= a.last ? 'var(--ok)' : 'var(--bad)' }}>{a.sales >= a.last ? '▲' : '▼'} {Math.abs(Math.round(((a.sales - a.last) / a.last) * 100))}% so với T5</span></td>
                    <td className="r"><b>{fmtM(a.sales)}</b></td>
                    <td className="r">{a.bookings}</td>
                    <td className="r" style={a.cancel > 4 ? { color: 'var(--bad)', fontWeight: 700 } : null}>{String(a.cancel).replace('.', ',')}%</td>
                    <td><Badge kind={t.id === 'plat' ? 'gold' : t.id === 'gold' ? 'warn' : 'info'}>{t.lb} · {t.pct}%</Badge>{bonusLocked && <div style={{ fontSize: 10.5, color: 'var(--bad)', fontWeight: 700, marginTop: 3 }}>🔒 Huỷ &gt;5% — khoá thưởng, tạm tính {eff.pct}%</div>}</td>
                    <td style={{ minWidth: 140 }}>
                      {next ? (
                        <div>
                          <div className="bo-track" style={{ height: 6 }}><i style={{ width: prog + '%', background: 'var(--gold)' }}></i></div>
                          <span style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>còn {fmtM(next.min - a.sales)} → {next.lb} ({next.pct}%)</span>
                        </div>
                      ) : <span style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 700 }}>💎 Hạng cao nhất</span>}
                    </td>
                    <td className="r"><b style={{ color: bonusLocked ? 'var(--bad)' : 'var(--ok)' }}>{fmtM(Math.round(a.sales * eff.pct / 100))}</b></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { POSView, CheckinView, AgentPortal, TiersView });
