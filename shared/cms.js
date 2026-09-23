/* ============================================================
   DAIICHI — CMS content store (hero/banner, tours, news, reviews)
   Admin edits publish instantly to homepage + customer site
   via 'dt:cms' event (same tab) and storage event (other tabs).
   ============================================================ */
(function () {
  const KEY = 'dt_cms_v1';
  const PHOTOS = ['luxury-1.jpg', 'luxury-2.jpg', 'luxury-3.jpg', 'daycruise-1.jpg', 'daycruise-2.jpg', 'daycruise-deck.jpg', 'luxury-restaurant.jpg', 'luxury-jacuzzi.jpg', 'suite-royal.jpg', 'daycruise-act-1.jpg', 'limo10.jpg', 'boutique-1.jpg'];
  const DEFAULTS = {
    hero: {
      home: { img: 'luxury-1.jpg', title: null },
      customer: { img: 'luxury-1.jpg', title: null },
    },
    tours: {}, /* id -> { nameVi,nameEn,blurbVi,blurbEn,peak,low,hidden } */
    news: [
      { id: 'n1', date: '2026-06-10', active: true, banner: true,
        title: { vi: 'Mới: tour SUP hoàng hôn cùng đối tác Cát Bà Ocean Tour — từ 350.000đ', en: 'New: sunset SUP tour with partner Cat Ba Ocean Tour — from 350,000₫' },
        body: { vi: 'Nhóm nhỏ ≤12 khách, HDV riêng, khởi hành 16:00 hằng ngày từ bến Bèo.', en: 'Small groups of 12, private guide, daily 16:00 departures from Beo pier.' } },
      { id: 'n2', date: '2026-06-08', active: true, banner: false,
        title: { vi: 'Lễ Quốc khánh 2/9: tăng cường 4 chuyến Hà Nội – Cát Bà mỗi ngày', en: 'Sep 2 holiday: 4 extra Hanoi – Cat Ba departures daily' },
        body: { vi: 'Mở bán từ hôm nay. Phụ thu lễ 30.000đ/khách/lượt theo biểu giá.', en: 'On sale now. Holiday surcharge 30,000₫/pax/way applies.' } },
    ],
    reviews: [
      { id: 'rv1', group: 'day', n: 'Hoàng Mai', f: '🇻🇳', d: '06/2026', r: 5, status: 'pending',
        tx: { vi: 'Tour VIP 4 rất đáng tiền — tàu đẹp, ăn trưa ngon, nhân viên nhiệt tình.', en: 'VIP 4 was worth every dong — beautiful ship, great lunch, lovely crew.' } },
      { id: 'rv2', group: 'bus', n: 'Sato K.', f: '🇯🇵', d: '06/2026', r: 4, status: 'pending',
        tx: { vi: 'Xe sạch, chạy đúng giờ, wifi ổn.', en: 'Clean bus, on time, decent wifi.', ja: '清潔で時間通り、Wi-Fiも快適でした。' } },
      { id: 'rv3', group: 'luxury', n: 'Ẩn danh', f: '🇻🇳', d: '05/2026', r: 2, status: 'pending',
        tx: { vi: 'Dịch vụ tốt nhưng giá hơi cao so với kỳ vọng của tôi.', en: 'Good service but pricier than I hoped.' } },
    ],
  };

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s && s.v === 1 && s.data) return s.data;
    } catch (e) { /* ignore */ }
    return JSON.parse(JSON.stringify(DEFAULTS));
  }
  let cache = load();
  function get() { return cache; }
  function set(next) {
    cache = next;
    localStorage.setItem(KEY, JSON.stringify({ v: 1, data: next }));
    applyTours();
    window.dispatchEvent(new CustomEvent('dt:cms'));
  }
  function update(fn) { const n = JSON.parse(JSON.stringify(cache)); fn(n); set(n); }
  function reset() { localStorage.removeItem(KEY); cache = load(); applyTours(); window.dispatchEvent(new CustomEvent('dt:cms')); }

  function heroImg(surface) { return (cache.hero[surface] && cache.hero[surface].img) || 'luxury-1.jpg'; }
  function heroTitle(surface) {
    const h = cache.hero[surface];
    return h && h.title && (h.title.vi || h.title.en) ? h.title : null;
  }
  function bannerNews() { return cache.news.find((n) => n.active && n.banner) || null; }
  function newsActive() { return cache.news.filter((n) => n.active); }
  function reviewsApproved(group) { return cache.reviews.filter((r) => r.status === 'ok' && r.group === group); }

  /* overlay tour overrides onto live DT_DATA */
  function applyTours() {
    if (!window.DT_DATA) return;
    const o = cache.tours || {};
    window.DT_DATA.DAY_TOURS.forEach((tr) => {
      const ov = o[tr.id];
      tr.hidden = !!(ov && ov.hidden);
      if (!ov) return;
      if (ov.nameVi) tr.name.vi = ov.nameVi;
      if (ov.nameEn) tr.name.en = ov.nameEn;
      if (ov.blurbVi) tr.blurb.vi = ov.blurbVi;
      if (ov.blurbEn) tr.blurb.en = ov.blurbEn;
      if (ov.peak) tr.peak = +ov.peak;
      if (ov.low != null && ov.low !== '' && tr.low != null) tr.low = +ov.low;
    });
  }
  window.addEventListener('storage', (e) => {
    if (e.key === KEY) { cache = load(); applyTours(); window.dispatchEvent(new CustomEvent('dt:cms')); }
  });
  applyTours();

  window.DT_CMS = { KEY, PHOTOS, get, set, update, reset, heroImg, heroTitle, bannerNews, newsActive, reviewsApproved, applyTours };
})();
