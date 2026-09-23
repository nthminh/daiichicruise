/* DAIICHI — ride-hailing grade screens: GPS tracking, lost & found, driver nav & earnings */
const { useState: rUseState } = React;

const RC = { navy: '#122441', red: '#A8121E', redB: '#D81F2A', gold: '#B98A3C', goldB: '#D4A648', ivory: '#FAF8F4', line: '#E4DFD5', ink: '#1C2433', ink2: '#4A5468', ink3: '#8A91A3', ok: '#1F7A4D', blue: '#2563A8' };
const RF = { fontFamily: "'Be Vietnam Pro', -apple-system, system-ui, sans-serif" };

/* ---------- stylized map (placeholder, no real tiles) ---------- */
function MapCanvas({ dark, height = 300, children }) {
  const road = dark ? 'rgba(255,255,255,.10)' : '#FFFFFF';
  const bg = dark ? '#16263F' : '#E9ECEF';
  const water = dark ? '#10203A' : '#D8E4EA';
  return (
    <div style={{ position: 'relative', height, background: bg, overflow: 'hidden' }}>
      {/* water (bay) */}
      <div style={{ position: 'absolute', right: -60, top: -40, width: 200, height: 190, borderRadius: '45% 55% 60% 40%', background: water }}></div>
      {/* roads */}
      <div style={{ position: 'absolute', left: -20, top: 70, width: '120%', height: 14, background: road, transform: 'rotate(-7deg)' }}></div>
      <div style={{ position: 'absolute', left: -20, top: 170, width: '120%', height: 10, background: road, transform: 'rotate(4deg)' }}></div>
      <div style={{ position: 'absolute', left: 84, top: -20, width: 12, height: '130%', background: road, transform: 'rotate(8deg)' }}></div>
      <div style={{ position: 'absolute', left: 220, top: -20, width: 9, height: '130%', background: road, transform: 'rotate(-5deg)' }}></div>
      {/* route line */}
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        <polyline points="40,250 95,205 92,130 200,98 305,78" fill="none" stroke={RC.navy} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 9" opacity={dark ? .9 : .75} style={dark ? { stroke: '#D4A648' } : null} />
      </svg>
      {children}
      <div style={{ position: 'absolute', right: 10, bottom: 8, fontSize: 8.5, color: dark ? 'rgba(255,255,255,.35)' : RC.ink3, fontFamily: 'ui-monospace, monospace' }}>bản đồ minh hoạ — tích hợp Google Maps / VietMap</div>
    </div>
  );
}
const Pulse = ({ color = RC.blue }) => (
  <span style={{ position: 'relative', display: 'inline-flex', width: 16, height: 16 }}>
    <span style={{ position: 'absolute', inset: -7, borderRadius: '50%', background: color, opacity: .18 }}></span>
    <span style={{ position: 'absolute', inset: -2.5, borderRadius: '50%', background: color, opacity: .3 }}></span>
    <span style={{ position: 'relative', width: 16, height: 16, borderRadius: '50%', background: color, border: '2.5px solid #fff', boxSizing: 'border-box' }}></span>
  </span>
);
const Marker = ({ x, y, children }) => (
  <div style={{ position: 'absolute', left: x, top: y, transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 5 }}>{children}</div>
);

/* ---------- call sheet: in-app VoIP vs cellular ---------- */
function CallSheet({ title, sub, options, onClose }) {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 70, ...RF }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(12,20,38,.55)' }}></div>
      <div style={{ position: 'absolute', left: 10, right: 10, top: 90, background: '#fff', borderRadius: 18, padding: '16px 14px 12px', boxShadow: '0 12px 40px rgba(0,0,0,.35)' }}>
        <div style={{ fontSize: 13.5, fontWeight: 800, color: RC.ink, textAlign: 'center' }}>{title}</div>
        {sub && <div style={{ fontSize: 10.5, color: RC.ink3, textAlign: 'center', marginTop: 3 }}>{sub}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
          {options.map(([ic, lb, d, color], i) => (
            <button key={i} onClick={onClose} style={{ ...RF, display: 'flex', alignItems: 'center', gap: 11, background: '#fff', border: '1.5px solid ' + RC.line, borderRadius: 13, padding: '11px 13px', textAlign: 'left', cursor: 'pointer' }}>
              <span style={{ width: 38, height: 38, borderRadius: '50%', background: color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flex: 'none' }}>{ic}</span>
              <span>
                <span style={{ display: 'block', fontSize: 12.5, fontWeight: 800, color: RC.ink }}>{lb}</span>
                <span style={{ display: 'block', fontSize: 10, color: RC.ink3 }}>{d}</span>
              </span>
            </button>
          ))}
        </div>
        <button onClick={onClose} style={{ ...RF, width: '100%', marginTop: 9, background: RC.ivory, border: 0, borderRadius: 11, padding: '10px 0', fontSize: 12, fontWeight: 800, color: RC.ink2 }}>Đóng</button>
      </div>
    </div>
  );
}

/* ---------- customer: live GPS tracking ---------- */
function CustomerTracking() {
  const [shareLoc, setShareLoc] = rUseState(true);
  const [shareTrip, setShareTrip] = rUseState(false);
  const [calling, setCalling] = rUseState(false);
  return (
    <div style={{ background: RC.ivory, minHeight: '100%', paddingBottom: 90, position: 'relative', ...RF }}>
      {calling && (
        <CallSheet
          title="Liên hệ chuyến 08:00 HN → Cát Bà"
          sub="Tài xế đang lái — cuộc gọi được chuyển đến Hướng dẫn viên đi cùng xe"
          options={[
            ['📞', 'Gọi qua app — miễn phí', 'ẩn số 2 bên · cần internet', RC.ok],
            ['📱', 'Gọi mạng di động — HDV Lê Thu Trang', '0961 004 712 · dùng khi sóng yếu / không có internet', RC.navy],
            ['🏛️', 'Tổng đài điều hành 24/7', '096 100 4709 · mạng di động', RC.gold],
          ]}
          onClose={() => setCalling(false)}
        />
      )}
      <div style={{ position: 'relative' }}>
        <MapCanvas height={306}>
          {/* driver vehicle */}
          <Marker x={95} y={205}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: RC.navy, border: '3px solid #fff', boxShadow: '0 3px 10px rgba(0,0,0,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>🚐</div>
          </Marker>
          {/* customer location (GPS) */}
          <Marker x={40} y={250}>
            <Pulse />
            <div style={{ fontSize: 8.5, fontWeight: 800, color: RC.blue, background: '#fff', borderRadius: 5, padding: '2px 5px', marginTop: 3, boxShadow: '0 1px 4px rgba(0,0,0,.15)' }}>Bạn</div>
          </Marker>
          {/* destination */}
          <Marker x={305} y={78}>
            <div style={{ width: 13, height: 13, background: RC.red, transform: 'rotate(45deg)', border: '2.5px solid #fff', boxShadow: '0 2px 6px rgba(0,0,0,.25)' }}></div>
            <div style={{ fontSize: 8.5, fontWeight: 800, color: RC.red, background: '#fff', borderRadius: 5, padding: '2px 5px', marginTop: 4, boxShadow: '0 1px 4px rgba(0,0,0,.15)' }}>Cát Bà</div>
          </Marker>
          {/* ETA chip */}
          <div style={{ position: 'absolute', bottom: 26, left: '50%', transform: 'translateX(-50%)', background: RC.navy, color: '#fff', borderRadius: 20, padding: '7px 14px', fontSize: 11.5, fontWeight: 700, boxShadow: '0 4px 14px rgba(0,0,0,.25)', whiteSpace: 'nowrap' }}>
          🚐 Xe đến điểm đón sau <span style={{ color: RC.goldB }}>12 phút</span> · 4,2 km
          </div>
        </MapCanvas>
      </div>
      <div style={{ padding: '12px 16px' }}>
        {/* driver card */}
        <div style={{ background: '#fff', border: '1px solid ' + RC.line, borderRadius: 14, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 11 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: RC.navy, color: RC.goldB, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15, flex: 'none' }}>PT</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 800, color: RC.ink }}>Phạm Văn Tài <span style={{ fontWeight: 600, color: RC.gold }}>★ 4,9</span></div>
            <div style={{ fontSize: 10.5, color: RC.ink2 }}>1.248 chuyến · 5 năm với Daiichi</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: RC.navy, marginTop: 2 }}>29B-123.45 · Limousine 11 ghế</div>
          </div>
          <div style={{ display: 'flex', gap: 7 }}>
            {[['📞', 'Gọi'], ['💬', 'Chat']].map(([ic, lb], i) => (
              <div key={i} onClick={() => !i && setCalling(true)} style={{ textAlign: 'center', cursor: 'pointer' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: i ? RC.navy : RC.ok, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>{ic}</div>
                <div style={{ fontSize: 8.5, color: RC.ink3, marginTop: 2 }}>{lb}</div>
              </div>
            ))}
          </div>
        </div>
        {/* GPS toggles */}
        <div style={{ background: '#fff', border: '1px solid ' + RC.line, borderRadius: 14, marginTop: 10, overflow: 'hidden' }}>
          {[
            ['📍', 'Chia sẻ vị trí của tôi cho tài xế', 'Tài xế đón đúng chỗ, không cần gọi điện', shareLoc, setShareLoc],
            ['🛡️', 'Chia sẻ hành trình cho người thân', 'Gửi link theo dõi chuyến qua Zalo/SMS', shareTrip, setShareTrip],
          ].map(([ic, lb, sub, val, set], i) => (
            <div key={i} onClick={() => set(!val)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', borderTop: i ? '1px solid ' + RC.ivory : 0, cursor: 'pointer' }}>
              <span style={{ fontSize: 17 }}>{ic}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: RC.ink }}>{lb}</div>
                <div style={{ fontSize: 10, color: RC.ink3 }}>{sub}</div>
              </div>
              <div style={{ width: 40, height: 24, borderRadius: 13, background: val ? RC.ok : RC.line, position: 'relative', transition: 'background .15s', flex: 'none' }}>
                <div style={{ position: 'absolute', top: 2.5, left: val ? 19 : 2.5, width: 19, height: 19, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.25)', transition: 'left .15s' }}></div>
              </div>
            </div>
          ))}
        </div>
        {/* trip summary + SOS */}
        <div style={{ display: 'flex', gap: 9, marginTop: 10 }}>
          <div style={{ flex: 1, background: '#fff', border: '1px solid ' + RC.line, borderRadius: 14, padding: '10px 13px' }}>
            <div style={{ fontSize: 10, color: RC.ink3 }}>08:00 · Ghế A2, A3</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: RC.ink }}>24 Hàng Bè → Cát Bà</div>
          </div>
          <div style={{ width: 86, background: RC.redB, borderRadius: 14, color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 900 }}>SOS</div>
            <div style={{ fontSize: 8.5, opacity: .9 }}>Khẩn cấp 24/7</div>
          </div>
        </div>
      </div>
      <TabBar items={[['⌂', 'Trang chủ'], ['🎫', 'Vé của tôi'], ['％', 'Ưu đãi'], ['👤', 'Tài khoản']]} active={1} />
    </div>
  );
}

/* ---------- customer: lost & found ---------- */
function CustomerLost() {
  const [type, setType] = rUseState('Điện thoại');
  const [calling, setCalling] = rUseState(false);
  return (
    <div style={{ background: RC.ivory, minHeight: '100%', paddingBottom: 90, position: 'relative', ...RF }}>
      {calling && (
        <CallSheet
          title="Gọi nhanh — quên đồ #LF-0612"
          sub="Kết nối thẳng người đang giữ đồ của bạn"
          options={[
            ['📱', 'HDV chuyến 08:00 — mạng di động', 'Lê Thu Trang · 0961 004 712 · đang giữ iPhone của bạn', RC.ok],
            ['🏛️', 'Quầy điều hành Cát Bà — mạng di động', '096 100 4709 · 24/7', RC.navy],
            ['📞', 'Gọi qua app — miễn phí', 'cần internet · ẩn số', RC.gold],
          ]}
          onClose={() => setCalling(false)}
        />
      )}
      <div style={{ background: RC.navy, padding: '60px 16px 14px', color: '#fff' }}>
        <div style={{ fontSize: 16, fontWeight: 800 }}>Báo quên đồ</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.65)', marginTop: 2 }}>Gửi trực tiếp đến tài xế & quầy điều hành — phản hồi trung bình 15 phút</div>
      </div>
      <div style={{ padding: '12px 16px' }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: RC.ink, marginBottom: 7 }}>Chuyến đi của bạn</div>
        <div style={{ background: '#fff', border: '1.5px solid ' + RC.navy, borderRadius: 13, padding: '10px 13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: RC.ink }}>Hà Nội → Cát Bà · 08:00</div>
            <div style={{ fontSize: 10.5, color: RC.ink2 }}>Hôm nay 15/06 · DT26-8X4K2 · ghế A2, A3 · TX Phạm Văn Tài</div>
          </div>
          <span style={{ fontSize: 11, color: RC.navy, fontWeight: 800 }}>✓</span>
        </div>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: RC.ink, margin: '13px 0 7px' }}>Bạn quên gì?</div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {['Điện thoại', 'Ví / giấy tờ', 'Balo / túi', 'Khác'].map((x) => (
            <button key={x} onClick={() => setType(x)} style={{ ...RF, border: '1.5px solid ' + (type === x ? RC.navy : RC.line), background: type === x ? RC.navy : '#fff', color: type === x ? '#fff' : RC.ink2, borderRadius: 17, padding: '7px 13px', fontSize: 11.5, fontWeight: 700 }}>{x}</button>
          ))}
        </div>
        <div style={{ background: '#fff', border: '1px solid ' + RC.line, borderRadius: 13, padding: '10px 13px', marginTop: 10, fontSize: 11.5, color: RC.ink3 }}>
          iPhone 15 màu xanh, ốp trong suốt, để túi lưng ghế A2…
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <div style={{ flex: 1, border: '1.5px dashed ' + RC.line, borderRadius: 13, padding: '12px 0', textAlign: 'center', fontSize: 11, color: RC.ink3 }}>📷 Thêm ảnh (tuỳ chọn)</div>
          <button style={{ ...RF, flex: 1, background: RC.redB, color: '#fff', border: 0, borderRadius: 13, fontSize: 12.5, fontWeight: 800 }}>Gửi báo cáo</button>
        </div>
        {/* status of an existing report */}
        <div style={{ fontSize: 11.5, fontWeight: 700, color: RC.ink, margin: '15px 0 7px' }}>Báo cáo #LF-0612 — đang xử lý</div>
        <div style={{ background: '#fff', border: '1px solid ' + RC.line, borderRadius: 13, padding: '12px 14px' }}>
          {[
            ['Đã gửi báo cáo', '11:02 · chuyển đến tài xế & quầy Cát Bà', true],
            ['Tài xế xác nhận TÌM THẤY ✓', '11:18 · iPhone xanh tại ghế A2', true],
            ['Nhận đồ', 'Chọn: nhận tại quầy Cát Bà (miễn phí) hoặc ship COD về Hà Nội', false],
          ].map(([lb, sub, done], i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '18px 1fr', gap: '0 10px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: 15, height: 15, borderRadius: '50%', background: done ? RC.ok : '#fff', border: '2.5px solid ' + (done ? RC.ok : RC.line), color: '#fff', fontSize: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{done ? '✓' : ''}</div>
                {i < 2 && <div style={{ width: 2, flex: 1, background: done ? RC.ok : RC.line, minHeight: 16 }}></div>}
              </div>
              <div style={{ paddingBottom: i < 2 ? 10 : 0 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: done ? RC.ink : RC.ink3 }}>{lb}</div>
                <div style={{ fontSize: 10, color: RC.ink3 }}>{sub}</div>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 11 }}>
            <button style={{ ...RF, flex: 1, background: RC.navy, color: '#fff', border: 0, borderRadius: 10, padding: '9px 0', fontSize: 11.5, fontWeight: 800 }}>Nhận tại quầy</button>
            <button style={{ ...RF, flex: 1, background: '#fff', color: RC.navy, border: '1.5px solid ' + RC.line, borderRadius: 10, padding: '9px 0', fontSize: 11.5, fontWeight: 800 }}>Ship COD 30K</button>
          </div>
        </div>
        {/* quick cellular call */}
        <button onClick={() => setCalling(true)} style={{ ...RF, width: '100%', marginTop: 10, background: RC.ok, color: '#fff', border: 0, borderRadius: 13, padding: '12px 0', fontSize: 12.5, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          📱 Gọi nhanh qua mạng di động — HDV / quầy điều hành
        </button>
        <div style={{ fontSize: 9.5, color: RC.ink3, textAlign: 'center', marginTop: 6 }}>Hoạt động cả khi không có internet — gọi trực tiếp số di động</div>
      </div>
      <TabBar items={[['⌂', 'Trang chủ'], ['🎫', 'Vé của tôi'], ['％', 'Ưu đãi'], ['👤', 'Tài khoản']]} active={1} />
    </div>
  );
}

Object.assign(window, { MapCanvas, Pulse, Marker, CallSheet, CustomerTracking, CustomerLost });
