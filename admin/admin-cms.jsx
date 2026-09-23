/* DAIICHI BACK OFFICE — CMS: pages/banner, tours, news, review moderation */
const { useState: cUseState, useEffect: cUseEffect } = React;

function CMSView() {
  const [tab, setTab] = cUseState('pages');
  const [, force] = cUseState(0);
  cUseEffect(() => {
    const on = () => force((x) => x + 1);
    window.addEventListener('dt:cms', on);
    return () => window.removeEventListener('dt:cms', on);
  }, []);
  const cms = DT_CMS.get();
  const pub = (fn) => DT_CMS.update(fn);

  const TABS = [['pages', 'Trang & banner'], ['tours', 'Tour & mô tả'], ['news', 'Tin tức & thông báo'], ['reviews', 'Duyệt đánh giá']];

  return (
    <div data-screen-label="Admin — CMS nội dung">
      <div className="bo-head">
        <div><h1>Quản lý nội dung (CMS)</h1><div className="sub">Mọi thay đổi phát hành NGAY lên trang chủ, web bán hàng & chatbot — không cần deploy</div></div>
        <button className="bo-btn ghost" onClick={() => DT_CMS.reset()}>Khôi phục mặc định</button>
      </div>
      <div className="bo-filters">
        {TABS.map(([id, lb]) => (
          <button key={id} className={'bo-chip' + (tab === id ? ' on' : '')} onClick={() => setTab(id)}>{lb}</button>
        ))}
      </div>

      {tab === 'pages' && (
        <div className="bo-grid2" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {[['home', 'Trang chủ (daiichitravel.com)'], ['customer', 'Trang đặt vé (booking)']].map(([sf, lb]) => {
            const h = cms.hero[sf];
            return (
              <div key={sf} className="bo-card">
                <h3>{lb} <span className="mut">ảnh hero & tiêu đề</span></h3>
                <div style={{ borderRadius: 10, overflow: 'hidden', position: 'relative', marginBottom: 12 }}>
                  <img src={'../assets/photos/' + DT_CMS.heroImg(sf)} alt="" style={{ width: '100%', height: 130, objectFit: 'cover', display: 'block' }} />
                  <span style={{ position: 'absolute', bottom: 8, left: 10, background: 'rgba(13,24,46,.8)', color: '#fff', fontSize: 10.5, fontWeight: 700, borderRadius: 6, padding: '3px 9px' }}>Đang dùng: {DT_CMS.heroImg(sf)}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6, marginBottom: 14 }}>
                  {DT_CMS.PHOTOS.map((p) => (
                    <img key={p} src={'../assets/photos/' + p} alt={p} title={p}
                      onClick={() => pub((n) => { n.hero[sf].img = p; })}
                      style={{ width: '100%', height: 42, objectFit: 'cover', borderRadius: 6, cursor: 'pointer', border: DT_CMS.heroImg(sf) === p ? '2.5px solid var(--red)' : '2.5px solid transparent' }} />
                  ))}
                </div>
                <div className="dt-field" style={{ marginBottom: 8 }}>
                  <label>Tiêu đề hero — chỉ nhập tiếng Việt (bỏ trống = mặc định)</label>
                  <input className="bo-input" value={(h.title && h.title.vi) || ''} placeholder="VD: Hè 2026 — Lan Hạ vẫy gọi"
                    onChange={(e) => pub((n) => { n.hero[sf].title = e.target.value ? DT_XLATE.translate(e.target.value) : null; })} />
                </div>
                {DT_CMS.heroTitle(sf) && (
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', lineHeight: 1.7, background: 'var(--ivory)', borderRadius: 8, padding: '8px 11px' }}>
                    🌐 <b>Tự động dịch 5 ngôn ngữ:</b><br />
                    EN: {h.title.en}<br />JA: {h.title.ja} · KO: {h.title.ko}<br />ZH: {h.title.zh} · FR: {h.title.fr}
                  </div>
                )}
                {DT_CMS.heroTitle(sf) && (
                  <button className="bo-btn ghost" style={{ marginTop: 10, padding: '6px 12px', fontSize: 11.5 }}
                    onClick={() => pub((n) => { n.hero[sf].title = null; })}>Xoá tiêu đề tuỳ chỉnh</button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === 'tours' && <CMSTours cms={cms} pub={pub} />}

      {tab === 'news' && (
        <div className="bo-card">
          <h3>Tin tức & thông báo <span className="mut">tin gắn 📣 hiện thành dải thông báo trên web; tin bật hiện ở mục Tin tức trang chủ</span></h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {cms.news.map((nw, i) => (
              <div key={nw.id} style={{ border: '1px solid var(--line)', borderRadius: 10, padding: '13px 15px' }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', marginBottom: 9 }}>
                  <b style={{ fontFamily: 'ui-monospace, monospace', fontSize: 12, color: 'var(--ink-3)' }}>{nw.date}</b>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 700, color: nw.active ? 'var(--ok)' : 'var(--ink-3)', cursor: 'pointer' }}>
                    <input type="checkbox" checked={nw.active} style={{ accentColor: 'var(--ok)' }}
                      onChange={() => pub((n) => { n.news[i].active = !n.news[i].active; })} />
                    {nw.active ? 'Đang hiện' : 'Đã ẩn'}
                  </label>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, fontWeight: 700, color: nw.banner ? '#7A5A1E' : 'var(--ink-3)', cursor: 'pointer' }}>
                    <input type="radio" name="cms-banner" checked={nw.banner} style={{ accentColor: 'var(--gold)' }}
                      onChange={() => pub((n) => { n.news.forEach((x, j) => { x.banner = j === i; }); })} />
                    📣 Dải thông báo
                  </label>
                  <button className="bo-btn ghost" style={{ marginLeft: 'auto', padding: '4px 10px', fontSize: 11, color: 'var(--bad)' }}
                    onClick={() => pub((n) => { n.news.splice(i, 1); })}>Xoá</button>
                </div>
                <div className="dt-form-grid" style={{ gap: 8 }}>
                  <div className="dt-field"><label>Tiêu đề — chỉ nhập tiếng Việt</label>
                    <input className="bo-input" value={nw.title.vi || ''} onChange={(e) => pub((n) => { n.news[i].title = { ...DT_XLATE.translate(e.target.value) }; })} /></div>
                  <div className="dt-field"><label>Nội dung — chỉ nhập tiếng Việt</label>
                    <input className="bo-input" value={nw.body.vi || ''} onChange={(e) => pub((n) => { n.news[i].body = { ...DT_XLATE.translate(e.target.value) }; })} /></div>
                </div>
                <div style={{ fontSize: 10.5, color: 'var(--ink-3)', marginTop: 7, lineHeight: 1.6 }}>
                  🌐 EN: {nw.title.en || '—'} · JA: {nw.title.ja || '—'} · KO: {nw.title.ko || '—'} · ZH: {nw.title.zh || '—'} · FR: {nw.title.fr || '—'}
                </div>
              </div>
            ))}
            <button className="bo-btn gold" style={{ alignSelf: 'flex-start' }}
              onClick={() => pub((n) => { n.news.unshift({ id: 'n' + Date.now(), date: '2026-06-10', active: true, banner: false, title: { vi: 'Tin mới…', en: 'New post…' }, body: { vi: '', en: '' } }); })}>
              + Thêm tin
            </button>
          </div>
        </div>
      )}

      {tab === 'reviews' && (
        <div className="bo-card">
          <h3>Duyệt đánh giá <span className="mut">chỉ đánh giá "Đã duyệt" mới hiện lên web — gắn badge ✓ xác thực vé</span></h3>
          <table className="bo-table">
            <thead><tr><th>Khách</th><th>Sản phẩm</th><th>Sao</th><th>Nội dung</th><th>Trạng thái</th><th></th></tr></thead>
            <tbody>
              {cms.reviews.map((rv, i) => (
                <tr key={rv.id}>
                  <td><b>{rv.f} {rv.n}</b><br /><span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{rv.d}</span></td>
                  <td>{({ day: 'Day Cruise', luxury: 'Luxury Cruise', bus: 'Bus' })[rv.group]}</td>
                  <td style={{ color: 'var(--gold)', whiteSpace: 'nowrap' }}>{'★'.repeat(rv.r)}</td>
                  <td style={{ maxWidth: 320 }}>{rv.tx.vi}</td>
                  <td><Badge kind={rv.status === 'ok' ? 'ok' : rv.status === 'hidden' ? 'bad' : 'warn'}>
                    {rv.status === 'ok' ? '✓ Đã duyệt' : rv.status === 'hidden' ? 'Đã ẩn' : 'Chờ duyệt'}</Badge></td>
                  <td className="r" style={{ whiteSpace: 'nowrap' }}>
                    {rv.status !== 'ok' && <button className="bo-btn navy" style={{ padding: '5px 11px', fontSize: 11, marginRight: 6 }}
                      onClick={() => pub((n) => { n.reviews[i].status = 'ok'; })}>Duyệt</button>}
                    {rv.status !== 'hidden' && <button className="bo-btn ghost" style={{ padding: '5px 11px', fontSize: 11 }}
                      onClick={() => pub((n) => { n.reviews[i].status = 'hidden'; })}>Ẩn</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="dt-notice" style={{ marginTop: 14 }}>
        Mở trang chủ hoặc trang đặt vé ở tab khác rồi chỉnh ở đây — bên kia đổi theo ngay. 🌐 Tiêu đề & tin tức <b>tự động dịch ra 5 ngôn ngữ</b> khi bạn gõ tiếng Việt (engine demo theo từ điển du lịch — bản thật nối API Google/DeepL/Claude, giao diện giữ nguyên). Mọi thay đổi ghi vào audit log.
      </div>
    </div>
  );
}

/* ---- tour content editor ---- */
function CMSTours({ cms, pub }) {
  const tours = DT_DATA.DAY_TOURS;
  const [id, setId] = cUseState(tours[0].id);
  const tr = tours.find((x) => x.id === id);
  const ov = cms.tours[id] || {};
  const setOv = (k, v) => pub((n) => { n.tours[id] = { ...(n.tours[id] || {}), [k]: v }; });
  return (
    <div className="bo-grid2" style={{ gridTemplateColumns: '1fr 1.2fr' }}>
      <div className="bo-card">
        <h3>Chọn tour</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {tours.map((x) => (
            <button key={x.id} className={'bo-chip' + (id === x.id ? ' on' : '')} style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', gap: 8 }}
              onClick={() => setId(x.id)}>
              <span>{x.code} · {x.name.vi}</span>
              {cms.tours[x.id] && <span style={{ fontSize: 10 }}>{cms.tours[x.id].hidden ? '🚫 ẩn' : '✏️ đã sửa'}</span>}
            </button>
          ))}
        </div>
      </div>
      <div className="bo-card">
        <h3>{tr.code} <span className="mut">sửa & phát hành ngay · ja/ko/zh/fr giữ bản dịch gốc</span></h3>
        <img src={tr.img.replace('../', '../')} alt="" style={{ width: '100%', height: 110, objectFit: 'cover', borderRadius: 8, marginBottom: 12 }} />
        <div className="dt-form-grid" style={{ gap: 10 }}>
          <div className="dt-field"><label>Tên tour (VI)</label>
            <input className="bo-input" value={ov.nameVi != null ? ov.nameVi : tr.name.vi} onChange={(e) => setOv('nameVi', e.target.value)} /></div>
          <div className="dt-field"><label>Name (EN)</label>
            <input className="bo-input" value={ov.nameEn != null ? ov.nameEn : tr.name.en} onChange={(e) => setOv('nameEn', e.target.value)} /></div>
          <div className="dt-field full"><label>Mô tả (VI)</label>
            <textarea className="bo-input" rows="2" value={ov.blurbVi != null ? ov.blurbVi : tr.blurb.vi} onChange={(e) => setOv('blurbVi', e.target.value)}></textarea></div>
          <div className="dt-field full"><label>Description (EN)</label>
            <textarea className="bo-input" rows="2" value={ov.blurbEn != null ? ov.blurbEn : tr.blurb.en} onChange={(e) => setOv('blurbEn', e.target.value)}></textarea></div>
          <div className="dt-field"><label>Giá mùa cao (đ)</label>
            <input type="number" className="bo-input" value={ov.peak != null ? ov.peak : tr.peak} onChange={(e) => setOv('peak', e.target.value)} /></div>
          <div className="dt-field"><label>Giá mùa thấp (đ)</label>
            <input type="number" className="bo-input" value={ov.low != null ? ov.low : (tr.low || '')} disabled={tr.low == null} onChange={(e) => setOv('low', e.target.value)} /></div>
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12.5, fontWeight: 700, color: ov.hidden ? 'var(--bad)' : 'var(--ink-2)', cursor: 'pointer' }}>
            <input type="checkbox" checked={!!ov.hidden} style={{ accentColor: 'var(--bad)' }} onChange={(e) => setOv('hidden', e.target.checked)} />
            Tạm ẩn tour khỏi web
          </label>
          {cms.tours[id] && (
            <button className="bo-btn ghost" style={{ marginLeft: 'auto', padding: '6px 12px', fontSize: 11.5 }}
              onClick={() => pub((n) => { delete n.tours[id]; })}>Khôi phục bản gốc</button>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CMSView, CMSTours });
