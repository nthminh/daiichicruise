/* DAIICHI — extra app screens: in-app chat, rate & tip, scheduled booking */
const { useState: xUseState } = React;

const XC = { navy: '#122441', red: '#A8121E', redB: '#D81F2A', gold: '#B98A3C', goldB: '#D4A648', ivory: '#FAF8F4', line: '#E4DFD5', ink: '#1C2433', ink2: '#4A5468', ink3: '#8A91A3', ok: '#1F7A4D', okS: '#E3F2E9' };
const XF = { fontFamily: "'Be Vietnam Pro', -apple-system, system-ui, sans-serif" };

/* ---------- in-app chat (customer ↔ guide, masked numbers) ---------- */
function AppChat() {
  const [msgs, setMsgs] = xUseState([
    { me: false, tx: 'Chào anh Hùng! Em là Trang — HDV chuyến 08:00 HN→Cát Bà hôm nay ạ 👋', t: '07:02' },
    { me: false, tx: 'Xe đang đến điểm đón 24 Hàng Bè, khoảng 07:15 ạ.', t: '07:03' },
    { me: true, tx: 'Cảm ơn em. Nhà anh có 2 vali to, để cốp được không?', t: '07:04' },
    { me: false, tx: 'Dạ được ạ, cốp còn rộng. Anh ra trước cửa giúp em nhé!', t: '07:05' },
  ]);
  const [input, setInput] = xUseState('');
  const send = () => {
    if (!input.trim()) return;
    setMsgs([...msgs, { me: true, tx: input, t: '07:06' }]);
    setInput('');
  };
  return (
    <div style={{ background: XC.ivory, minHeight: '100%', paddingBottom: 90, display: 'flex', flexDirection: 'column', ...XF }}>
      <div style={{ background: XC.navy, padding: '60px 16px 12px', color: '#fff', display: 'flex', alignItems: 'center', gap: 11 }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: XC.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13 }}>TT</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 800 }}>HDV Lê Thu Trang</div>
          <div style={{ fontSize: 10, color: '#7FC79F' }}>● Online · chuyến 08:00 HN → Cát Bà</div>
        </div>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: XC.ok, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>📞</div>
      </div>
      <div style={{ textAlign: 'center', fontSize: 9.5, color: XC.ink3, padding: '8px 20px' }}>
        🔒 Số điện thoại hai bên được ẩn — chat & gọi qua app, tự đóng sau chuyến 24h
      </div>
      <div style={{ flex: 1, padding: '4px 14px', display: 'flex', flexDirection: 'column', gap: 7 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ alignSelf: m.me ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
            <div style={{ background: m.me ? XC.navy : '#fff', color: m.me ? '#fff' : XC.ink, border: m.me ? 0 : '1px solid ' + XC.line, borderRadius: m.me ? '13px 13px 4px 13px' : '13px 13px 13px 4px', padding: '8px 12px', fontSize: 12, lineHeight: 1.5 }}>{m.tx}</div>
            <div style={{ fontSize: 8.5, color: XC.ink3, textAlign: m.me ? 'right' : 'left', marginTop: 2 }}>{m.t} ✓✓</div>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 4 }}>
          {['Tôi ra ngay đây', 'Chờ tôi 5 phút nhé', 'Gửi vị trí của tôi 📍'].map((q) => (
            <button key={q} onClick={() => setMsgs([...msgs, { me: true, tx: q, t: '07:06' }])} style={{ ...XF, background: '#fff', border: '1.5px solid ' + XC.line, borderRadius: 14, padding: '6px 11px', fontSize: 10.5, color: XC.ink2 }}>{q}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '10px 14px 14px' }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Nhắn cho HDV…"
          style={{ ...XF, flex: 1, border: '1.5px solid ' + XC.line, borderRadius: 11, padding: '10px 12px', fontSize: 12.5, outline: 'none', minWidth: 0, background: '#fff' }} />
        <button onClick={send} style={{ ...XF, background: XC.redB, color: '#fff', border: 0, borderRadius: 11, padding: '0 16px', fontSize: 15 }}>➤</button>
      </div>
      <TabBar items={[['⌂', 'Trang chủ'], ['🎫', 'Vé của tôi'], ['💬', 'Tin nhắn'], ['👤', 'Tài khoản']]} active={2} />
    </div>
  );
}

/* ---------- rate & tip after trip ---------- */
function AppRate() {
  const [stars, setStars] = xUseState(5);
  const [tags, setTags] = xUseState({ 0: true, 2: true });
  const [tip, setTip] = xUseState(20000);
  const [sent, setSent] = xUseState(false);
  const TAGS = ['Đúng giờ', 'Lái xe êm', 'Thân thiện', 'Xe sạch sẽ', 'Hỗ trợ hành lý', 'Nói ngoại ngữ tốt'];
  if (sent) return (
    <div style={{ background: XC.ivory, minHeight: '100%', paddingBottom: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 30px', textAlign: 'center', ...XF }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: XC.ok, color: '#fff', fontSize: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>✓</div>
      <div style={{ fontSize: 17, fontWeight: 800, color: XC.ink }}>Cảm ơn anh Hùng!</div>
      <div style={{ fontSize: 12.5, color: XC.ink2, marginTop: 6, lineHeight: 1.6 }}>Đánh giá 5★ + tip 20.000đ đã gửi đến tài xế Tài.<br />Anh nhận được <b style={{ color: XC.gold }}>+150 điểm thưởng</b> 🎉</div>
      <TabBar items={[['⌂', 'Trang chủ'], ['🎫', 'Vé của tôi'], ['％', 'Ưu đãi'], ['👤', 'Tài khoản']]} active={0} />
    </div>
  );
  return (
    <div style={{ background: XC.ivory, minHeight: '100%', paddingBottom: 90, ...XF }}>
      <div style={{ background: XC.navy, padding: '60px 18px 16px', color: '#fff', textAlign: 'center' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.6)' }}>Chuyến hoàn thành · HN → Cát Bà · 08:00</div>
        <div style={{ fontSize: 16, fontWeight: 800, marginTop: 3 }}>Chuyến đi của bạn thế nào?</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 12 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setStars(n)} style={{ background: 'none', border: 0, fontSize: 33, cursor: 'pointer', color: n <= stars ? '#D4A648' : 'rgba(255,255,255,.25)', padding: 0 }}>★</button>
          ))}
        </div>
        <div style={{ fontSize: 11, color: '#D4A648', fontWeight: 700, marginTop: 4 }}>{['', 'Rất tệ', 'Tệ', 'Bình thường', 'Tốt', 'Tuyệt vời!'][stars]}</div>
      </div>
      <div style={{ padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid ' + XC.line, borderRadius: 13, padding: '10px 13px' }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: XC.navy, color: XC.goldB, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13 }}>PT</div>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: XC.ink }}>TX Phạm Văn Tài · HDV Lê Thu Trang</div>
            <div style={{ fontSize: 10.5, color: XC.ink3 }}>Limousine 11 ghế · 29B-123.45</div>
          </div>
        </div>
        <div style={{ fontSize: 12, fontWeight: 800, color: XC.ink, margin: '13px 0 7px' }}>Điều gì khiến bạn hài lòng?</div>
        <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
          {TAGS.map((tg, i) => (
            <button key={tg} onClick={() => setTags({ ...tags, [i]: !tags[i] })}
              style={{ ...XF, border: '1.5px solid ' + (tags[i] ? XC.navy : XC.line), background: tags[i] ? XC.navy : '#fff', color: tags[i] ? '#fff' : XC.ink2, borderRadius: 16, padding: '7px 12px', fontSize: 11, fontWeight: 700 }}>{tg}</button>
          ))}
        </div>
        <div style={{ fontSize: 12, fontWeight: 800, color: XC.ink, margin: '14px 0 7px' }}>Tip cho tổ phục vụ 💛 <span style={{ fontWeight: 600, color: XC.ink3 }}>(100% đến tay tài xế & HDV)</span></div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[0, 20000, 50000, 100000].map((v) => (
            <button key={v} onClick={() => setTip(v)}
              style={{ ...XF, flex: 1, border: '1.5px solid ' + (tip === v ? XC.gold : XC.line), background: tip === v ? '#F5EDDC' : '#fff', color: XC.ink, borderRadius: 11, padding: '11px 0', fontSize: 12, fontWeight: 800 }}>
              {v === 0 ? 'Không' : (v / 1000) + 'K'}
            </button>
          ))}
        </div>
        <button onClick={() => setSent(true)} style={{ ...XF, width: '100%', marginTop: 16, background: XC.redB, color: '#fff', border: 0, borderRadius: 12, padding: '13px 0', fontSize: 13.5, fontWeight: 800 }}>
          Gửi đánh giá{tip ? ' + tip ' + (tip / 1000) + 'K' : ''} · nhận 150 điểm
        </button>
      </div>
      <TabBar items={[['⌂', 'Trang chủ'], ['🎫', 'Vé của tôi'], ['％', 'Ưu đãi'], ['👤', 'Tài khoản']]} active={1} />
    </div>
  );
}

/* ---------- scheduled / recurring booking ---------- */
function AppSchedule() {
  const [days, setDays] = xUseState({ 1: true, 5: true });
  const [invoice, setInvoice] = xUseState(true);
  const DN = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const picked = Object.keys(days).filter((k) => days[k]).map((k) => DN[k]).join(' & ');
  return (
    <div style={{ background: XC.ivory, minHeight: '100%', paddingBottom: 90, ...XF }}>
      <div style={{ background: XC.navy, padding: '60px 16px 14px', color: '#fff' }}>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.55)' }}>DÀNH CHO KHÁCH ĐI THƯỜNG XUYÊN · DOANH NGHIỆP</div>
        <div style={{ fontSize: 17, fontWeight: 800 }}>Đặt lịch định kỳ</div>
      </div>
      <div style={{ padding: '13px 16px' }}>
        <div style={{ background: '#fff', border: '1px solid ' + XC.line, borderRadius: 13, padding: '12px 14px' }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: XC.ink3, textTransform: 'uppercase', letterSpacing: '.05em' }}>Tuyến & giờ</div>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: XC.ink, margin: '4px 0' }}>Hà Nội → Hải Phòng · 07:00</div>
          <div style={{ fontSize: 11, color: XC.ink2 }}>Limousine 10 ghế · đón Nhà hát Lớn · 210.000đ/lượt</div>
        </div>
        <div style={{ fontSize: 12, fontWeight: 800, color: XC.ink, margin: '13px 0 7px' }}>Lặp lại hằng tuần</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {DN.map((d, i) => (
            <button key={i} onClick={() => setDays({ ...days, [i]: !days[i] })}
              style={{ ...XF, flex: 1, aspectRatio: '1', border: '1.5px solid ' + (days[i] ? XC.navy : XC.line), background: days[i] ? XC.navy : '#fff', color: days[i] ? '#fff' : XC.ink2, borderRadius: 11, fontSize: 11.5, fontWeight: 800 }}>{d}</button>
          ))}
        </div>
        <div onClick={() => setInvoice(!invoice)} style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: '1px solid ' + XC.line, borderRadius: 13, padding: '11px 13px', marginTop: 12, cursor: 'pointer' }}>
          <span style={{ fontSize: 16 }}>🧾</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: XC.ink }}>Xuất hoá đơn công ty hằng tháng</div>
            <div style={{ fontSize: 10, color: XC.ink3 }}>Công ty TNHH ABC · MST 0201xxxxx · công nợ 30 ngày</div>
          </div>
          <div style={{ width: 40, height: 24, borderRadius: 13, background: invoice ? XC.ok : XC.line, position: 'relative', flex: 'none' }}>
            <div style={{ position: 'absolute', top: 2.5, left: invoice ? 19 : 2.5, width: 19, height: 19, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,.25)', transition: 'left .15s' }}></div>
          </div>
        </div>
        <div style={{ background: XC.okS, borderRadius: 13, padding: '12px 14px', marginTop: 12, fontSize: 11.5, color: XC.ok, lineHeight: 1.6 }}>
          ✓ Mỗi <b>{picked || '—'}</b> lúc 07:00 · ghế tự giữ trước 48h, nhắc qua Zalo<br />
          ✓ Giảm 8% khách định kỳ · huỷ từng chuyến miễn phí trước 12h
        </div>
        <button style={{ ...XF, width: '100%', marginTop: 13, background: XC.redB, color: '#fff', border: 0, borderRadius: 12, padding: '13px 0', fontSize: 13.5, fontWeight: 800 }}>
          Kích hoạt lịch định kỳ
        </button>
      </div>
      <TabBar items={[['⌂', 'Trang chủ'], ['🎫', 'Vé của tôi'], ['％', 'Ưu đãi'], ['👤', 'Tài khoản']]} active={0} />
    </div>
  );
}

/* ---------- "Tip của tôi" — minh bạch tip cho nhân viên ---------- */
function AppMyTips() {
  const TIPS = [
    ['10/06', 'HN → Cát Bà · 08:00', 'Khách N.V.H ✓', 20000],
    ['10/06', 'VIP 4 · 11:45', 'Khách Yuki T. ✓', 50000],
    ['09/06', 'HN → Cát Bà · 05:00', 'Khách ẩn danh', 20000],
    ['08/06', 'Cát Bà → HN · 09:30', 'Khách Claire D. ✓', 100000],
    ['07/06', 'VIP 1 · 09:00', 'Khách W.Lei ✓', 30000],
  ];
  const mine = 2840000;
  return (
    <div style={{ background: XC.ivory, minHeight: '100%', paddingBottom: 90, ...XF }}>
      <div style={{ background: 'linear-gradient(150deg, #B98A3C, #8F6A2A)', padding: '64px 18px 16px', color: '#fff' }}>
        <div style={{ fontSize: 11, opacity: .8 }}>TIP CỦA TÔI · THÁNG 6 · Phạm Văn Tài</div>
        <div style={{ fontSize: 28, fontWeight: 800 }}>2.840.000đ</div>
        <div style={{ fontSize: 11.5, opacity: .9, marginTop: 3 }}>Quỹ tip toàn cty 12,4M · bạn nhận 70% phần tổ trực tiếp · KPI loại <b>A</b> 🏆</div>
        <div style={{ background: 'rgba(255,255,255,.14)', borderRadius: 10, padding: '8px 12px', marginTop: 10, fontSize: 10.5 }}>
          Công khai 100% — mọi khoản tip từ app khách hiện ở đây ngay khi khách bấm gửi
        </div>
      </div>
      <div style={{ padding: '13px 16px' }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: XC.ink, marginBottom: 8 }}>Tip theo chuyến</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {TIPS.map((tp, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid ' + XC.line, borderRadius: 11, padding: '10px 13px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 16 }}>💛</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: XC.ink }}>{tp[1]}</div>
                <div style={{ fontSize: 10, color: XC.ink3 }}>{tp[0]} · {tp[2]}</div>
              </div>
              <b style={{ color: XC.gold, fontSize: 13.5 }}>+{(tp[3] / 1000)}K</b>
            </div>
          ))}
        </div>
        <div style={{ background: '#fff', border: '1px solid ' + XC.line, borderRadius: 11, padding: '11px 13px', marginTop: 12, fontSize: 11, color: XC.ink2, lineHeight: 1.6 }}>
          <b style={{ color: XC.ink }}>Lịch sử KPI:</b> T1 82 · T2 88 · T3 79 · T4 91 · T5 94 · <b style={{ color: XC.gold }}>T6 96 (A)</b><br />
          Tip + thưởng KPI cộng thẳng vào phiếu lương — xem trong mục Lương.
        </div>
      </div>
      <TabBar items={[['🚌', 'Chuyến'], ['💛', 'Tip của tôi'], ['💰', 'Lương'], ['👤', 'Tôi']]} active={1} />
    </div>
  );
}

Object.assign(window, { AppChat, AppRate, AppSchedule, AppMyTips });
