/* DAIICHI BACK OFFICE — pricing, promos, reports, agents */
const { useState: pUseState } = React;

/* ---------- live campaign manager ---------- */
function CampaignManager() {
  const [list, setList] = pUseState(DT_CAMPAIGNS.load());
  const [, tick] = pUseState(0);
  React.useEffect(() => { const i = setInterval(() => tick((x) => x + 1), 1000); return () => clearInterval(i); }, []);
  const update = (next) => { setList(next); DT_CAMPAIGNS.save(next); };
  const KIND_LB = { flash: ['⚡ FLASH SALE', 'bad'], promo: ['KHUYẾN MÃI', 'gold'], new: ['TOUR MỚI', 'ok'] };
  return (
    <div className="bo-card" style={{ marginBottom: 14 }} data-screen-label="Quản lý chiến dịch động">
      <h3>Chiến dịch động — flash sale, khuyến mãi, tour mới <span className="mut">mọi thay đổi phát hành NGAY lên trang chủ & web bán hàng</span></h3>
      <table className="bo-table">
        <thead><tr><th>Loại</th><th>Chiến dịch</th><th>Phạm vi</th><th className="r">Giảm</th><th>Còn lại</th><th>Trạng thái</th><th></th></tr></thead>
        <tbody>
          {list.map((c) => {
            const [lb, kind] = KIND_LB[c.kind];
            const expired = c.ends && c.ends < Date.now();
            return (
              <tr key={c.id}>
                <td><Badge kind={kind}>{lb}</Badge></td>
                <td><b style={{ fontFamily: 'ui-monospace, monospace' }}>{c.name}</b><br /><span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{c.desc.vi}</span></td>
                <td style={{ fontSize: 11.5 }}>{c.scope.join(', ')}</td>
                <td className="r">
                  {c.off != null ? (
                    <span style={{ whiteSpace: 'nowrap' }}>
                      <input type="number" min="5" max="50" value={c.off} className="bo-input" style={{ width: 58, padding: '5px 7px', textAlign: 'right' }}
                        onChange={(e) => update(list.map((x) => x.id === c.id ? { ...x, off: Math.max(0, Math.min(70, +e.target.value || 0)) } : x))} /> %
                    </span>
                  ) : c.offAmt ? <b>−{fmtVnd(c.offAmt)}</b> : '—'}
                </td>
                <td style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: expired ? 'var(--bad)' : 'var(--ink)' }}>
                  {c.ends ? (expired ? 'Hết hạn' : DT_CAMPAIGNS.fmtLeft(c.ends, 'vi')) : '— không giới hạn'}
                  {c.ends && <button className="bo-btn ghost" style={{ padding: '3px 8px', fontSize: 10.5, marginLeft: 8 }}
                    onClick={() => update(list.map((x) => x.id === c.id ? { ...x, ends: Math.max(x.ends || Date.now(), Date.now()) + 3600e3 } : x))}>+1h</button>}
                </td>
                <td>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 700, color: c.active ? 'var(--ok)' : 'var(--ink-3)', cursor: 'pointer' }}>
                    <input type="checkbox" checked={c.active} style={{ accentColor: 'var(--ok)' }}
                      onChange={() => update(list.map((x) => x.id === c.id ? { ...x, active: !x.active } : x))} />
                    {c.active ? 'Đang chạy' : 'Tạm dừng'}
                  </label>
                </td>
                <td className="r"><button className="bo-btn ghost" style={{ padding: '4px 10px', fontSize: 11 }}
                  onClick={() => window.open('../index.html', '_blank')}>Xem trên web</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="dt-notice" style={{ marginTop: 12 }}>
        Mở trang chủ ở tab khác rồi chỉnh % hoặc bật/tắt ở đây — giá và đếm ngược bên kia đổi theo ngay (không cần tải lại).
      </div>
    </div>
  );
}

/* ---------- pricing & promos ---------- */
function PricingView() {
  const [promos, setPromos] = pUseState(ADMIN_DB.promos);
  const groups = [
    { lb: '① Hà Nội ⇄ Cát Bà', note: 'Hành trình 3h–3h30 · áp dụng 2 chiều', rows: [
      ['Bus thường + tàu cao tốc', '270.000', '300.000'],
      ['Bus thường + cáp treo', '330.000', '360.000'],
      ['Limousine 11 ghế + tàu cao tốc', '330.000', '360.000'],
      ['Limousine 11 ghế + cáp treo', '390.000', '420.000'],
      ['Limo Green 7 + tàu cao tốc', '330.000', '360.000'],
      ['Limousine 34 ghế + tàu cao tốc', '330.000', '360.000'],
    ]},
    { lb: '② Hà Nội ⇄ Hải Phòng', note: 'Hành trình 2h · giá ổn định cả 2 mùa', rows: [
      ['Bus thường', '140.000', '140.000'],
      ['Bus Limousine Luxury 10 ghế', '210.000', '210.000'],
      ['Limo Green 7 chỗ (ghép)', '210.000', '210.000'],
    ]},
    { lb: '③–⑤ Liên vùng', note: 'Hạ Long / Cát Bà ⇄ Ninh Bình · Cát Bà ⇄ Hải Phòng', rows: [
      ['Hạ Long → Ninh Bình', '300.000', '300.000'],
      ['Ninh Bình → Hạ Long / Cát Bà', '250.000', '250.000'],
      ['Cát Bà → Ninh Bình', '300.000', '300.000'],
      ['Cát Bà ⇄ Hải Phòng (xe điện + phà)', '200.000', '200.000'],
    ]},
  ];
  return (
    <div data-screen-label="Admin — Giá & khuyến mãi">
      <div className="bo-head">
        <div><h1>Giá & khuyến mãi theo mùa</h1><div className="sub">Biểu giá khách lẻ 2026–2027 · cập nhật tự động lên website & app khi lưu</div></div>
        <button className="bo-btn">Lưu & phát hành giá</button>
      </div>
      <div className="bo-card" style={{ marginBottom: 14, display: 'flex', gap: 22, alignItems: 'center', flexWrap: 'wrap' }}>
        <div><Badge kind="info">MÙA THẤP</Badge> <b style={{ fontSize: 13 }}>03/09/2026 – 31/03/2027 · 01/04 – 02/05/2027</b></div>
        <div><Badge kind="bad">MÙA CAO</Badge> <b style={{ fontSize: 13 }}>09/05/2026 – 02/09/2026</b></div>
        <div><Badge kind="gold">PHỤ THU LỄ–TẾT</Badge> <b style={{ fontSize: 13 }}>30.000đ/khách/lượt</b></div>
      </div>
      <CampaignManager />
      <div className="bo-grid2" style={{ gridTemplateColumns: '1.5fr 1fr' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {groups.map((g) => (
            <div key={g.lb} className="bo-card">
              <h3>{g.lb} <span className="mut">{g.note}</span></h3>
              <table className="bo-table">
                <thead><tr><th>Dịch vụ</th><th className="r">Vé mùa thấp</th><th className="r">Vé mùa cao</th><th></th></tr></thead>
                <tbody>
                  {g.rows.map((r, i) => (
                    <tr key={i}>
                      <td><b>{r[0]}</b></td>
                      <td className="r">{r[1]}đ</td>
                      <td className="r" style={{ color: 'var(--red)', fontWeight: 700 }}>{r[2]}đ</td>
                      <td className="r"><button className="bo-btn ghost" style={{ padding: '4px 10px', fontSize: 11 }}>Sửa</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <div className="bo-card" style={{ alignSelf: 'start' }}>
          <h3>Mã khuyến mãi <span className="mut">{promos.filter((p) => p.active).length} đang chạy</span></h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {promos.map((p) => (
              <div key={p.id} style={{ border: '1px solid var(--line)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <b style={{ fontFamily: 'ui-monospace, monospace', fontSize: 13, color: 'var(--navy)' }}>{p.name}</b>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11, color: p.active ? 'var(--ok)' : 'var(--ink-3)', fontWeight: 700, cursor: 'pointer' }}>
                    <input type="checkbox" checked={p.active} onChange={() => setPromos(promos.map((x) => x.id === p.id ? { ...x, active: !x.active } : x))} style={{ accentColor: 'var(--ok)' }} />
                    {p.active ? 'Đang chạy' : 'Tạm dừng'}
                  </label>
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-2)' }}>{p.desc}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 5 }}>{p.scope} · <b style={{ color: 'var(--red)' }}>{p.off}</b> · đã dùng {p.used} lần</div>
              </div>
            ))}
            <button className="bo-btn gold">+ Tạo khuyến mãi</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- reports & reconciliation ---------- */
function ReportsView() {
  const recon = [
    ['VNPay / QR', '214 giao dịch', 96400000, 'Đã đối soát 09/06', 'ok'],
    ['MoMo / ZaloPay', '98 giao dịch', 41200000, 'Đã đối soát 09/06', 'ok'],
    ['Thẻ quốc tế (Visa/Master)', '37 giao dịch', 52800000, 'Chờ ngân hàng T+2', 'warn'],
    ['Tiền mặt quầy Cát Bà', '52 giao dịch', 18700000, 'Lệch 200.000đ — kiểm quỹ', 'bad'],
    ['Công nợ đại lý', '61 booking', 88300000, 'Kỳ thanh toán 15/06', 'info'],
  ];
  const byProduct = [
    ['Bus & Limousine', 412, 128500000], ['Day Cruise', 286, 196300000],
    ['Luxury Cruise', 64, 214800000], ['Combo & Tour', 71, 92400000],
  ];
  return (
    <div data-screen-label="Admin — Báo cáo & đối soát">
      <div className="bo-head">
        <div><h1>Báo cáo & đối soát</h1><div className="sub">Kỳ 01/06 – 10/06/2026 · số liệu demo</div></div>
        <div style={{ display: 'flex', gap: 8 }}>
          <select className="bo-select"><option>Kỳ này (01–10/06)</option><option>Tháng 5/2026</option></select>
          <button className="bo-btn navy">Xuất Excel</button>
        </div>
      </div>
      <div className="bo-grid2">
        <div className="bo-card">
          <h3>Đối soát theo phương thức thanh toán</h3>
          <table className="bo-table">
            <thead><tr><th>Kênh tiền về</th><th>Khối lượng</th><th className="r">Số tiền</th><th>Trạng thái</th></tr></thead>
            <tbody>
              {recon.map((r, i) => (
                <tr key={i}>
                  <td><b>{r[0]}</b></td><td>{r[1]}</td>
                  <td className="r"><b>{fmtVnd(r[2])}</b></td>
                  <td><Badge kind={r[4]}>{r[3]}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bo-card">
          <h3>Doanh thu theo dòng sản phẩm</h3>
          <table className="bo-table">
            <thead><tr><th>Sản phẩm</th><th className="r">Booking</th><th className="r">Doanh thu</th></tr></thead>
            <tbody>
              {byProduct.map((r, i) => (
                <tr key={i}><td><b>{r[0]}</b></td><td className="r">{r[1]}</td><td className="r"><b>{fmtVnd(r[2])}</b></td></tr>
              ))}
              <tr><td><b style={{ color: 'var(--navy)' }}>Tổng</b></td><td className="r"><b>833</b></td>
                <td className="r"><b style={{ color: 'var(--red)' }}>{fmtVnd(632000000)}</b></td></tr>
            </tbody>
          </table>
          <div className="dt-notice" style={{ marginTop: 14 }}>
            Luxury Cruise chiếm 34% doanh thu với chỉ 7,7% số booking — ưu tiên quảng bá suite 3N2Đ trên trang chủ.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- agents management ---------- */
function AgentsView() {
  const { agents } = ADMIN_DB;
  const agBookings = ADMIN_DB.bookings.filter((b) => b.channel === 'agent');
  return (
    <div data-screen-label="Admin — Quản lý đại lý">
      <div className="bo-head">
        <div><h1>Đại lý & công nợ</h1><div className="sub">Giá net riêng từng hạng · hoa hồng trả theo kỳ 2 lần/tháng</div></div>
        <button className="bo-btn">+ Mở đại lý mới</button>
      </div>
      <div className="bo-kpis" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {agents.map((a) => {
          const pct = Math.round((a.debt / a.limit) * 100);
          return (
            <div key={a.id} className="bo-card">
              <h3>{a.name} <Badge kind={a.tier === 'Vàng' ? 'gold' : 'info'}>Hạng {a.tier}</Badge></h3>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 10 }}>{a.contact} · chiết khấu {Math.round(a.comm * 100)}%</div>
              <div className="ag-credit">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span>Công nợ: <b style={{ color: pct > 70 ? 'var(--bad)' : 'var(--ink)' }}>{fmtVnd(a.debt)}</b></span>
                  <span style={{ color: 'var(--ink-3)' }}>hạn mức {fmtM(a.limit)}</span>
                </div>
                <div className="bar"><i style={{ width: pct + '%' }}></i></div>
                <div style={{ fontSize: 11, color: pct > 70 ? 'var(--bad)' : 'var(--ink-3)' }}>{pct}% hạn mức{pct > 70 ? ' — sắp chạm trần, nhắc thanh toán' : ''}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button className="bo-btn ghost" style={{ flex: 1 }}>Sao kê</button>
                <button className="bo-btn navy" style={{ flex: 1 }}>Thu công nợ</button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="bo-card">
        <h3>Booking qua đại lý gần đây</h3>
        <div style={{ overflowX: 'auto' }}><BookingTable rows={agBookings.slice(0, 8)} /></div>
      </div>
    </div>
  );
}

Object.assign(window, { PricingView, ReportsView, AgentsView, CampaignManager });
