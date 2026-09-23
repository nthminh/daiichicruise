/* DAIICHI — driver app: GPS navigation, earnings, lost & found */
const { useState: dUseState } = React;

const DC = { navy: '#122441', red: '#A8121E', redB: '#D81F2A', gold: '#B98A3C', goldB: '#D4A648', ivory: '#FAF8F4', line: '#E4DFD5', ink: '#1C2433', ink2: '#4A5468', ink3: '#8A91A3', ok: '#1F7A4D', blue: '#2563A8' };
const DF = { fontFamily: "'Be Vietnam Pro', -apple-system, system-ui, sans-serif" };

/* ---------- driver: GPS navigation ---------- */
function DriverNav() {
  const [arrived, setArrived] = dUseState(false);
  return (
    <div style={{ background: '#0F1E38', minHeight: '100%', paddingBottom: 90, color: '#fff', ...DF }}>
      <div style={{ position: 'relative' }}>
        <MapCanvas dark height={330}>
          {/* driver position */}
          <Marker x={95} y={205}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#D4A648', border: '3px solid #fff', boxShadow: '0 0 0 8px rgba(212,166,72,.2), 0 4px 12px rgba(0,0,0,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>🚐</div>
          </Marker>
          {/* customer live location */}
          <Marker x={200} y={98}>
            <Pulse color="#4D8FD6" />
            <div style={{ fontSize: 8.5, fontWeight: 800, color: '#fff', background: '#2563A8', borderRadius: 5, padding: '2px 6px', marginTop: 3 }}>Claire · GPS live</div>
          </Marker>
          {/* next turn banner */}
          <div style={{ position: 'absolute', bottom: 14, left: 12, right: 12, background: '#1F8A5B', borderRadius: 13, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 6px 18px rgba(0,0,0,.35)' }}>
            <div style={{ fontSize: 24, fontWeight: 900 }}>↰</div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800 }}>350 m — rẽ trái Tràng Tiền</div>
              <div style={{ fontSize: 10.5, opacity: .85 }}>Điểm đón 2/5 · Nhà hát Lớn · đến 07:22</div>
            </div>
          </div>
        </MapCanvas>
      </div>
      <div style={{ padding: '12px 16px' }}>
        {/* next passenger card */}
        <div style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 14, padding: '12px 14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#2563A8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flex: 'none' }}>CD</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 800 }}>Claire Dubois · 1 khách</div>
              <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,.6)' }}>Nhà hát Lớn · ghế B1 · nói tiếng Anh/Pháp</div>
              <div style={{ fontSize: 10.5, color: '#7FC79F', marginTop: 1 }}>📍 Khách đang chia sẻ vị trí — cách điểm hẹn 40 m</div>
            </div>
            <div style={{ display: 'flex', gap: 7 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1F8A5B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>📞</div>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>💬</div>
            </div>
          </div>
          <button onClick={() => setArrived(!arrived)} style={{ ...DF, width: '100%', marginTop: 11, background: arrived ? '#1F8A5B' : '#D4A648', color: arrived ? '#fff' : '#122441', border: 0, borderRadius: 11, padding: '11px 0', fontSize: 13, fontWeight: 800 }}>
            {arrived ? '✓ Đã đón Claire — tiếp tục điểm 3/5' : 'Đã đến điểm đón — báo khách'}
          </button>
        </div>
        {/* quick actions */}
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          {[['🧭', 'Đổi lộ trình'], ['⚠️', 'Báo sự cố'], ['🧳', 'Quên đồ'], ['🆘', 'SOS']].map(([ic, lb], i) => (
            <div key={i} style={{ flex: 1, background: i === 3 ? DC.redB : 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, padding: '9px 0', textAlign: 'center' }}>
              <div style={{ fontSize: 16 }}>{ic}</div>
              <div style={{ fontSize: 9, fontWeight: 700, marginTop: 2 }}>{lb}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: 10.5, color: 'rgba(255,255,255,.5)', textAlign: 'center' }}>
          Vị trí xe đang phát realtime → khách & điều hành cùng thấy · cập nhật 5 giây/lần
        </div>
      </div>
      <TabBar items={[['🚌', 'Chuyến'], ['🗓️', 'Lịch tuần'], ['💬', 'Điều hành'], ['👤', 'Tôi']]} active={0} />
    </div>
  );
}

/* ---------- driver: earnings + lost & found inbox ---------- */
function DriverEarn() {
  const [online, setOnline] = dUseState(true);
  const [found, setFound] = dUseState(null);
  const days = [['T2', 64], ['T3', 78], ['T4', 52], ['T5', 88], ['T6', 95], ['T7', 100], ['CN', 71]];
  return (
    <div style={{ background: DC.ivory, minHeight: '100%', paddingBottom: 90, ...DF }}>
      <div style={{ background: DC.navy, padding: '60px 16px 16px', color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)' }}>Phạm Văn Tài · ★ 4,9</div>
            <div style={{ fontSize: 17, fontWeight: 800 }}>Thu nhập hôm nay</div>
          </div>
          <div onClick={() => setOnline(!online)} style={{ display: 'flex', alignItems: 'center', gap: 7, background: online ? 'rgba(47,165,111,.2)' : 'rgba(255,255,255,.1)', border: '1px solid ' + (online ? '#2FA56F' : 'rgba(255,255,255,.2)'), borderRadius: 18, padding: '6px 12px', cursor: 'pointer' }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: online ? '#2FA56F' : DC.ink3 }}></span>
            <span style={{ fontSize: 11.5, fontWeight: 800 }}>{online ? 'ONLINE' : 'OFFLINE'}</span>
          </div>
        </div>
        <div style={{ fontSize: 32, fontWeight: 900, color: DC.goldB, margin: '8px 0 2px' }}>1.240.000đ</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.6)' }}>3/4 chuyến hoàn thành · 6h32' online · thưởng đúng giờ +50K</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          {[['Tuần này', '6,8M'], ['Thưởng', '320K'], ['Điểm chất lượng', '98/100']].map(([lb, v], i) => (
            <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,.07)', borderRadius: 11, padding: '8px 0', textAlign: 'center' }}>
              <div style={{ fontSize: 13.5, fontWeight: 800, color: '#fff' }}>{v}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,.55)' }}>{lb}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '13px 16px' }}>
        {/* lost & found inbox */}
        <div style={{ fontSize: 12, fontWeight: 800, color: DC.ink, marginBottom: 7 }}>🧳 Quên đồ — cần xử lý</div>
        <div style={{ background: '#fff', border: '1.5px solid ' + DC.gold, borderRadius: 13, padding: '12px 14px' }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: DC.ink }}>Báo cáo #LF-0612 · chuyến 08:00 HN→CB</div>
          <div style={{ fontSize: 11, color: DC.ink2, marginTop: 3 }}>Khách <b>Nguyễn Văn Hùng</b> (ghế A2): iPhone 15 xanh, ốp trong, túi lưng ghế. Kiểm tra sau khi trả khách.</div>
          {found === null ? (
            <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
              <button onClick={() => setFound(true)} style={{ ...DF, flex: 1, background: DC.ok, color: '#fff', border: 0, borderRadius: 10, padding: '9px 0', fontSize: 11.5, fontWeight: 800 }}>✓ Tìm thấy</button>
              <button onClick={() => setFound(false)} style={{ ...DF, flex: 1, background: '#fff', color: DC.ink2, border: '1.5px solid ' + DC.line, borderRadius: 10, padding: '9px 0', fontSize: 11.5, fontWeight: 800 }}>Không thấy</button>
            </div>
          ) : (
            <div style={{ marginTop: 10, background: found ? '#E3F2E9' : DC.ivory, borderRadius: 10, padding: '9px 12px', fontSize: 11, color: found ? DC.ok : DC.ink2, fontWeight: 700 }}>
              {found ? '✓ Đã báo khách & quầy Cát Bà — chụp ảnh đồ và gửi về quầy khi kết ca.' : 'Đã ghi nhận — điều hành sẽ kiểm tra camera trong xe.'}
            </div>
          )}
        </div>
        {/* weekly bars */}
        <div style={{ fontSize: 12, fontWeight: 800, color: DC.ink, margin: '14px 0 7px' }}>Thu nhập 7 ngày</div>
        <div style={{ background: '#fff', border: '1px solid ' + DC.line, borderRadius: 13, padding: '14px 14px 10px', display: 'flex', alignItems: 'flex-end', gap: 9, height: 110 }}>
          {days.map(([lb, h], i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%', gap: 4 }}>
              <div style={{ height: h + '%', borderRadius: 5, background: i === 5 ? DC.gold : '#24406F' }}></div>
              <div style={{ fontSize: 9, color: DC.ink3, textAlign: 'center' }}>{lb}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <button style={{ ...DF, flex: 1, background: DC.navy, color: '#fff', border: 0, borderRadius: 11, padding: '11px 0', fontSize: 12, fontWeight: 800 }}>Đối soát & rút tiền</button>
          <button style={{ ...DF, flex: 1, background: '#fff', color: DC.navy, border: '1.5px solid ' + DC.line, borderRadius: 11, padding: '11px 0', fontSize: 12, fontWeight: 800 }}>Lịch ca tuần sau</button>
        </div>
      </div>
      <TabBar items={[['🚌', 'Chuyến'], ['🗓️', 'Lịch tuần'], ['💬', 'Điều hành'], ['👤', 'Tôi']]} active={3} />
    </div>
  );
}

Object.assign(window, { DriverNav, DriverEarn });
