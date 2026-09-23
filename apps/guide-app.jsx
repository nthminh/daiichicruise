/* DAIICHI — guide/crew app (bus attendant + cruise crew), company-wide time clock, permission matrix */
const { useState: gUseState } = React;

const GC = { navy: '#122441', red: '#A8121E', redB: '#D81F2A', gold: '#B98A3C', goldB: '#D4A648', ivory: '#FAF8F4', line: '#E4DFD5', ink: '#1C2433', ink2: '#4A5468', ink3: '#8A91A3', ok: '#1F7A4D', okS: '#E3F2E9', warn: '#B3661A', warnS: '#FBF0DE', blue: '#2563A8' };
const GF = { fontFamily: "'Be Vietnam Pro', -apple-system, system-ui, sans-serif" };

/* ---------- guide on bus: contact hub for pickups ---------- */
function GuideBus() {
  const [st, setSt] = gUseState({ 0: 'done', 1: 'done', 2: 'wait', 3: 'wait', 4: 'noreply' });
  const [callFor, setCallFor] = gUseState(null);
  const cyc = { done: 'wait', wait: 'noreply', noreply: 'done' };
  /* LIÊN THÔNG THẬT: khách đặt web (dt_bookings) tự xuất hiện trong danh sách đón */
  const webGuests = (() => {
    try {
      return Object.values(JSON.parse(localStorage.getItem('dt_bookings') || '{}'))
        .filter((b) => !b.cancelled && b.kind === 'bus').slice(-2)
        .map((b) => [b.name + ' 🌐', (b.pickup || 'Điểm đón web') + (b.seats ? ' · ' + b.seats.join(', ') : '') + ' · web', '07:05', b.phone || '']);
    } catch (e) { return []; }
  })();
  const guests = [
    ...webGuests,
    ['Nguyễn Văn Hùng', '24 Hàng Bè · A2, A3 · 2 khách', '07:15', '0912 345 678'],
    ['Claire Dubois', 'Nhà hát Lớn · B1 · 1 khách · EN/FR', '07:22', '+33 6 12 34 56 78'],
    ['Trần Thị Mai', '36 Mã Mây · A4–A6 · 3 khách', '07:30', '0988 102 334'],
    ['Kim Min-jun', 'Hilton Opera · B3, B4 · 2 khách · KO', '07:38', '+82 10 1234 5678'],
    ['Lê Quang Đạt', 'Ga Hà Nội · A7 · 1 khách', '07:50', '0905 667 889'],
  ];
  const chip = {
    done: ['✓ Đã đón', GC.okS, GC.ok], wait: ['Đang chờ', GC.warnS, GC.warn], noreply: ['Không nghe máy', '#FCEAE8', '#B3261E'],
  };
  const doneN = Object.values(st).filter((x) => x === 'done').length;
  return (
    <div style={{ background: GC.ivory, minHeight: '100%', paddingBottom: 90, position: 'relative', ...GF }}>
      {callFor !== null && (
        <CallSheet
          title={'Gọi ' + guests[callFor][0]}
          sub={guests[callFor][1]}
          options={[
            ['📞', 'Gọi qua app — miễn phí, ẩn số', 'khi khách online trên app Daiichi', GC.ok],
            ['📱', 'Gọi mạng di động — ' + guests[callFor][3], 'luôn gọi được · dùng khi khách không nghe app', GC.navy],
            ['💬', 'Nhắn SMS — ' + guests[callFor][3], 'tự điền tin mẫu "xe đến sau 5 phút…"', GC.gold],
          ]}
          onClose={() => setCallFor(null)}
        />
      )}
      <div style={{ background: GC.navy, padding: '60px 16px 14px', color: '#fff' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)' }}>DAIICHI CREW · Hướng dẫn viên xe</div>
        <div style={{ fontSize: 17, fontWeight: 800 }}>HN → Cát Bà · 08:00 · 29B-123.45</div>
        <div style={{ background: 'rgba(212,166,72,.15)', border: '1px solid rgba(212,166,72,.45)', borderRadius: 11, padding: '9px 12px', marginTop: 10, fontSize: 11, lineHeight: 1.5 }}>
          🛞 <b>TX Phạm Văn Tài đang lái — không gọi tài xế.</b> Bạn là đầu mối liên hệ khách; tin nhắn của bạn hiển thị lên màn hình điều hướng của tài xế.
        </div>
      </div>
      <div style={{ padding: '12px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: GC.ink }}>Đón khách — {doneN}/{guests.length} nhóm</div>
          <div style={{ fontSize: 10.5, color: GC.ink3 }}>chạm trạng thái để đổi</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {guests.map(([nm, info, tm], i) => {
            const cur = st[i] || 'wait';
            const [lb, bg, fg] = chip[cur];
            return (
              <div key={i} style={{ background: '#fff', border: '1px solid ' + GC.line, borderRadius: 13, padding: '10px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 800, color: GC.ink }}>{nm} <span style={{ fontWeight: 600, color: GC.gold }}>{tm}</span></div>
                    <div style={{ fontSize: 10.5, color: GC.ink2 }}>{info}</div>
                  </div>
                  <div onClick={() => setCallFor(i)} style={{ width: 33, height: 33, borderRadius: '50%', background: GC.ok, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, cursor: 'pointer' }}>📞</div>
                  <div style={{ width: 33, height: 33, borderRadius: '50%', background: GC.navy, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>💬</div>
                  <button onClick={() => setSt({ ...st, [i]: cyc[cur] })} style={{ ...GF, border: 0, background: bg, color: fg, borderRadius: 9, padding: '6px 9px', fontSize: 10, fontWeight: 800, minWidth: 86 }}>{lb}</button>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: 12, fontWeight: 800, color: GC.ink, margin: '13px 0 7px' }}>Tin nhắn mẫu — gửi 1 chạm</div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {['Xe đến sau 5 phút, anh/chị ra điểm hẹn giúp em', 'Xe đã tới điểm đón ạ', 'Xe kẹt nhẹ, trễ ~10 phút'].map((m, i) => (
            <button key={i} style={{ ...GF, background: '#fff', border: '1.5px solid ' + GC.line, borderRadius: 16, padding: '7px 12px', fontSize: 10.5, fontWeight: 600, color: GC.ink2, textAlign: 'left' }}>“{m}”</button>
          ))}
        </div>
        <button style={{ ...GF, width: '100%', marginTop: 12, background: GC.redB, color: '#fff', border: 0, borderRadius: 11, padding: '11px 0', fontSize: 12.5, fontWeight: 800 }}>
          ✓ Chốt đủ khách → tài xế khởi hành
        </button>
      </div>
      <TabBar items={[['🚌', 'Chuyến'], ['🧳', 'Quên đồ'], ['🕐', 'Chấm công'], ['👤', 'Tôi']]} active={0} />
    </div>
  );
}

/* ---------- guide on cruise: guest management ---------- */
function GuideCruise() {
  const [brief, setBrief] = gUseState(true);
  return (
    <div style={{ background: GC.ivory, minHeight: '100%', paddingBottom: 90, ...GF }}>
      <div style={{ background: 'linear-gradient(150deg, #122441, #24406F)', padding: '60px 16px 14px', color: '#fff' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)' }}>DAIICHI CREW · Du thuyền VIP 4</div>
        <div style={{ fontSize: 17, fontWeight: 800 }}>Quản lý khách · 11:45 – 17:00</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 11 }}>
          {[['Trên tàu', '78/84'], ['Trẻ em', '9'], ['Ăn kiêng', '3'], ['Quốc tịch', '7']].map(([lb, v], i) => (
            <div key={i} style={{ flex: 1, background: 'rgba(255,255,255,.08)', borderRadius: 10, padding: '7px 0', textAlign: 'center' }}>
              <div style={{ fontSize: 13.5, fontWeight: 800, color: GC.goldB }}>{v}</div>
              <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,.55)' }}>{lb}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: '12px 16px' }}>
        <div style={{ background: '#fff', border: '1.5px solid ' + GC.warn, borderRadius: 13, padding: '11px 13px' }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: GC.ink }}>⚠️ Chưa có mặt — 6 khách (nhóm Wang Lei)</div>
          <div style={{ fontSize: 10.5, color: GC.ink2, marginTop: 2 }}>Đặt qua đại lý An Phú · đang ở bến · tàu rời 11:45</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 9 }}>
            <button style={{ ...GF, flex: 1, background: GC.ok, color: '#fff', border: 0, borderRadius: 9, padding: '8px 0', fontSize: 11, fontWeight: 800 }}>📞 Gọi khách</button>
            <button style={{ ...GF, flex: 1, background: '#fff', color: GC.navy, border: '1.5px solid ' + GC.line, borderRadius: 9, padding: '8px 0', fontSize: 11, fontWeight: 800 }}>Báo thuyền trưởng giữ tàu</button>
          </div>
        </div>
        <div style={{ fontSize: 12, fontWeight: 800, color: GC.ink, margin: '13px 0 7px' }}>Chương trình hôm nay</div>
        <div style={{ background: '#fff', border: '1px solid ' + GC.line, borderRadius: 13, overflow: 'hidden' }}>
          {[
            ['12:30', 'Ăn trưa fine-dining', '84 khách · 2 chay · 1 dị ứng hải sản (bàn 7)', false],
            ['14:00', 'Kayak hang Sáng – Tối', '52 đăng ký · phát áo phao', true],
            ['15:30', 'Trà chiều sundeck', 'cả tàu', false],
          ].map(([tm, lb, sub, hot], i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 13px', borderTop: i ? '1px solid ' + GC.ivory : 0, background: hot ? GC.okS : '#fff' }}>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: GC.gold, minWidth: 38 }}>{tm}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: GC.ink }}>{lb}{hot ? ' · sắp diễn ra' : ''}</div>
                <div style={{ fontSize: 10, color: GC.ink3 }}>{sub}</div>
              </div>
              <div style={{ fontSize: 13, color: GC.ink3 }}>›</div>
            </div>
          ))}
        </div>
        <div onClick={() => setBrief(!brief)} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid ' + GC.line, borderRadius: 13, padding: '11px 13px', marginTop: 10, cursor: 'pointer' }}>
          <span style={{ fontSize: 16 }}>🦺</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: GC.ink }}>Phổ biến an toàn trước khởi hành</div>
            <div style={{ fontSize: 10, color: GC.ink3 }}>bắt buộc — ghi nhận về Back Office</div>
          </div>
          <span style={{ fontSize: 11, fontWeight: 800, color: brief ? GC.ok : GC.ink3 }}>{brief ? '✓ Đã hoàn thành 11:38' : 'Chưa làm'}</span>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          {[['🧳', 'Quên đồ'], ['🩹', 'Sự cố y tế'], ['📣', 'Thông báo cả tàu'], ['🆘', 'SOS']].map(([ic, lb], i) => (
            <div key={i} style={{ flex: 1, background: i === 3 ? GC.redB : '#fff', color: i === 3 ? '#fff' : GC.ink2, border: '1px solid ' + (i === 3 ? GC.redB : GC.line), borderRadius: 12, padding: '9px 0', textAlign: 'center' }}>
              <div style={{ fontSize: 15 }}>{ic}</div>
              <div style={{ fontSize: 8.5, fontWeight: 700, marginTop: 2 }}>{lb}</div>
            </div>
          ))}
        </div>
      </div>
      <TabBar items={[['🛳️', 'Chuyến'], ['🧳', 'Quên đồ'], ['🕐', 'Chấm công'], ['👤', 'Tôi']]} active={0} />
    </div>
  );
}

/* ---------- company-wide time clock ---------- */
function TimeClock() {
  const [inShift, setInShift] = gUseState(true);
  return (
    <div style={{ background: GC.ivory, minHeight: '100%', paddingBottom: 90, ...GF }}>
      <div style={{ background: GC.navy, padding: '60px 16px 16px', color: '#fff', textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)' }}>CHẤM CÔNG · Phạm Văn Tài · Đội xe</div>
        <div style={{ fontSize: 15, fontWeight: 800, marginTop: 2 }}>Ca sáng 06:30 – 14:30</div>
        <div onClick={() => setInShift(!inShift)} style={{ width: 158, height: 158, margin: '14px auto 0', borderRadius: '50%', background: inShift ? 'rgba(47,165,111,.15)' : 'rgba(255,255,255,.07)', border: '4px solid ' + (inShift ? '#2FA56F' : 'rgba(255,255,255,.25)'), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: inShift ? '#7FC79F' : '#fff' }}>{inShift ? '7:42:18' : 'VÀO CA'}</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,.6)', marginTop: 2 }}>{inShift ? 'đang trong ca · chạm để ra ca' : 'chạm để bắt đầu'}</div>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(47,165,111,.18)', borderRadius: 14, padding: '5px 12px', fontSize: 10.5, fontWeight: 700, marginTop: 12, color: '#7FC79F' }}>
          📍 GPS: Bến xe Cát Bà — đúng vị trí ca ✓ · ảnh selfie đã xác thực
        </div>
      </div>
      <div style={{ padding: '13px 16px' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {[['Công tháng 6', '21,5 / 26'], ['Giờ lái hôm nay', '5h12 / 8h'], ['Nghỉ phép còn', '6 ngày']].map(([lb, v], i) => (
            <div key={i} style={{ flex: 1, background: '#fff', border: '1px solid ' + GC.line, borderRadius: 12, padding: '10px 0', textAlign: 'center' }}>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: GC.navy }}>{v}</div>
              <div style={{ fontSize: 8.5, color: GC.ink3, marginTop: 1 }}>{lb}</div>
            </div>
          ))}
        </div>
        <div style={{ background: GC.warnS, border: '1px solid #E8D5B5', borderRadius: 12, padding: '9px 12px', marginTop: 10, fontSize: 10.5, color: '#7A5A1E', lineHeight: 1.5 }}>
          ⏱️ <b>An toàn giờ lái:</b> hệ thống tự cảnh báo điều hành khi tài xế lái quá 4h liên tục hoặc 10h/ngày (chuẩn vận tải).
        </div>
        <div style={{ fontSize: 12, fontWeight: 800, color: GC.ink, margin: '13px 0 7px' }}>Tuần này</div>
        <div style={{ background: '#fff', border: '1px solid ' + GC.line, borderRadius: 13, overflow: 'hidden' }}>
          {[['T2 08/06', '06:28 → 14:32', '8h04 ✓'], ['T3 09/06', '06:31 → 14:30', '7h59 ✓'], ['T4 10/06', '06:25 → đang ca', '—'], ['T5 11/06', 'Ca sáng (đã đăng ký)', ''], ['T6 12/06', 'Nghỉ phép (đã duyệt)', '']].map(([d, t, h], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 13px', borderTop: i ? '1px solid ' + GC.ivory : 0, fontSize: 11.5 }}>
              <span style={{ fontWeight: 700, color: GC.ink }}>{d}</span>
              <span style={{ color: GC.ink2 }}>{t}</span>
              <span style={{ fontWeight: 700, color: GC.ok, minWidth: 44, textAlign: 'right' }}>{h}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <button style={{ ...GF, flex: 1, background: '#fff', color: GC.navy, border: '1.5px solid ' + GC.line, borderRadius: 11, padding: '10px 0', fontSize: 11.5, fontWeight: 800 }}>Xin nghỉ / đổi ca</button>
          <button style={{ ...GF, flex: 1, background: '#fff', color: GC.navy, border: '1.5px solid ' + GC.line, borderRadius: 11, padding: '10px 0', fontSize: 11.5, fontWeight: 800 }}>Bảng công của tôi</button>
        </div>
        <div style={{ fontSize: 10, color: GC.ink3, marginTop: 10, textAlign: 'center' }}>
          Áp dụng cho toàn bộ nhân viên: tài xế, HDV, thuyền viên, quầy vé, văn phòng — dữ liệu đổ về Back Office cho kế toán tính lương.
        </div>
      </div>
      <TabBar items={[['🚌', 'Công việc'], ['🕐', 'Chấm công'], ['💬', 'Điều hành'], ['👤', 'Tôi']]} active={1} />
    </div>
  );
}

/* ---------- permission matrix (web card, not a phone) ---------- */
function PermMatrix() {
  const cols = ['Booking & vé', 'Sơ đồ ghế/suite', 'Giá & KM', 'Báo cáo tài chính', 'Công nợ ĐL', 'Chấm công', 'Quên đồ', 'GPS xe/tàu'];
  // F = full, V = view, A = approve-only, '' = no access
  const rows = [
    ['Ban giám đốc', 'F', 'V', 'A', 'F', 'F', 'A', 'V', 'V'],
    ['Điều hành xe & tàu', 'F', 'F', '', 'V', '', 'A', 'F', 'F'],
    ['Kế toán', 'V', '', 'V', 'F', 'F', 'F', '', ''],
    ['Quầy vé / POS', 'F', 'F', 'V', '', '', 'S', 'F', 'V'],
    ['Hướng dẫn viên / Thuyền viên', 'V*', 'V*', '', '', '', 'S', 'F', 'V*'],
    ['Tài xế', 'V*', 'V*', '', '', '', 'S', 'F', 'S'],
    ['Đại lý (ngoài)', 'S', 'V', 'V net', '', 'V mình', '', 'S', 'V*'],
    ['Đối tác vận hành (ngoài)', 'S', 'S', 'A', '', 'V mình', 'S', 'S', 'S'],
    ['Marketing', 'V', '', 'F', 'V', '', 'S', '', ''],
  ];
  const cell = (v) => {
    if (!v) return <span style={{ color: 'var(--line-2)' }}>—</span>;
    const map = { F: ['Toàn quyền', '#E3F2E9', '#1F7A4D'], V: ['Xem', '#E9EEF6', '#24406F'], A: ['Phê duyệt', '#F5EDDC', '#7A5A1E'], S: ['Của mình', '#FBF0DE', '#B3661A'] };
    const k = map[v.split(' ')[0]] || map[v.replace('*', '')] || null;
    const base = v.replace('*', '').split(' ')[0];
    const m = map[base];
    if (!m) return <span style={{ fontSize: 11, color: 'var(--ink-2)' }}>{v}</span>;
    return <span style={{ display: 'inline-block', fontSize: 10, fontWeight: 700, background: m[1], color: m[2], borderRadius: 8, padding: '3px 8px', whiteSpace: 'nowrap' }}>{m[0]}{v.includes('*') ? ' · chuyến của mình' : v.includes('net') ? ' · giá net' : v.includes('mình') ? ' · của mình' : ''}</span>;
  };
  return (
    <div style={{ maxWidth: 1280, margin: '18px auto 0', background: '#fff', border: '1px solid var(--line)', borderRadius: 16, padding: '20px 24px', overflowX: 'auto' }}>
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>Phân quyền theo phòng ban — một tài khoản, đúng việc của mình</div>
      <div style={{ fontSize: 12.5, color: 'var(--ink-2)', marginBottom: 14, ...GF }}>Mỗi nhân viên đăng nhập 1 tài khoản duy nhất; vai trò quyết định thấy gì, làm gì. Quản lý gán/thu hồi quyền trong Back Office, có nhật ký thao tác (audit log).</div>
      <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 980, ...GF }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.05em', color: 'var(--ink-3)', padding: '7px 10px', borderBottom: '1.5px solid var(--line)' }}>Phòng ban / vai trò</th>
            {cols.map((c) => <th key={c} style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.03em', color: 'var(--ink-3)', padding: '7px 8px', borderBottom: '1.5px solid var(--line)', whiteSpace: 'nowrap' }}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: i % 2 ? '#FCFBF8' : '#fff' }}>
              <td style={{ padding: '8px 10px', fontSize: 12.5, fontWeight: 700, color: 'var(--navy)', whiteSpace: 'nowrap' }}>{r[0]}</td>
              {r.slice(1).map((v, j) => <td key={j} style={{ padding: '8px 8px', textAlign: 'center' }}>{cell(v)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 11, color: 'var(--ink-2)', flexWrap: 'wrap', ...GF }}>
        <span><span style={{ background: '#E3F2E9', color: '#1F7A4D', borderRadius: 8, padding: '2px 8px', fontWeight: 700, fontSize: 10 }}>Toàn quyền</span> tạo / sửa / huỷ</span>
        <span><span style={{ background: '#E9EEF6', color: '#24406F', borderRadius: 8, padding: '2px 8px', fontWeight: 700, fontSize: 10 }}>Xem</span> chỉ đọc</span>
        <span><span style={{ background: '#F5EDDC', color: '#7A5A1E', borderRadius: 8, padding: '2px 8px', fontWeight: 700, fontSize: 10 }}>Phê duyệt</span> duyệt thay đổi / đơn từ</span>
        <span><span style={{ background: '#FBF0DE', color: '#B3661A', borderRadius: 8, padding: '2px 8px', fontWeight: 700, fontSize: 10 }}>Của mình</span> chỉ thao tác trên ca / chuyến / đơn của chính mình</span>
      </div>
    </div>
  );
}

Object.assign(window, { GuideBus, GuideCruise, TimeClock, PermMatrix });
