/* ============================================================
   DAIICHI — dynamic campaign engine (flash sale, promos, new tours)
   Shared store in localStorage; admin edits propagate live to
   homepage + customer site via events ('dt:campaigns' / storage).
   ============================================================ */
(function () {
  const KEY = 'dt_campaigns_v3';
  const boot = Date.now();
  const DEFAULTS = [
    { id: 'flash', kind: 'flash', name: 'FLASH SALE', off: 20,
      desc: { vi: 'Du thuyền Hoàng hôn & Bình minh Lan Hạ', en: 'Lan Ha Sunset & Sunrise cruises', ja: 'ランハ湾サンセット＆サンライズクルーズ', ko: '란하 선셋 & 선라이즈 크루즈', zh: '兰哈日落与日出游船', fr: 'Croisières coucher & lever de soleil' },
      scope: ['sunset', 'morning'], endsIn: 5 * 3600e3 + 13 * 60e3 + 40e3, active: true, color: '#D81F2A' },
    { id: 'early', kind: 'promo', name: 'EARLYBIRD12', off: 12,
      desc: { vi: 'Du thuyền ngủ đêm 5★ — đặt trước 30 ngày', en: '5★ overnight cruise — book 30 days ahead', ja: '5つ星宿泊クルーズ — 30日前予約', ko: '5성급 1박 크루즈 — 30일 전 예약', zh: '五星过夜游轮 — 提前30天预订', fr: 'Croisière 5★ — réservez à J-30' },
      scope: ['luxury'], endsIn: 20 * 86400e3, active: true, color: '#B98A3C' },
    { id: 'combo50', kind: 'promo', name: 'COMBO −50K', offAmt: 50000,
      desc: { vi: 'Combo xe Hà Nội + du thuyền trong ngày', en: 'Hanoi bus + day cruise combos', ja: 'ハノイ送迎＋デイクルーズコンボ', ko: '하노이 버스 + 데이 크루즈 콤보', zh: '河内巴士+一日游船套餐', fr: 'Combos bus Hanoï + croisière' },
      scope: ['combo1', 'combo4'], endsIn: null, active: true, color: '#122441' },
    { id: 'newtour', kind: 'new', name: 'TOUR MỚI',
      desc: { vi: 'SUP & Bơi hoàng hôn — nhóm nhỏ ≤12 khách', en: 'Sunset SUP & Swim — small groups', ja: 'サンセットSUP — 少人数制', ko: '선셋 SUP — 소그룹', zh: '日落SUP — 小团', fr: 'SUP coucher de soleil — petit groupe' },
      scope: ['psup'], endsIn: null, active: true, color: '#1F7A4D' },
  ];

  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(KEY));
      if (s && Array.isArray(s.list)) return s.list;
    } catch (e) { /* ignore */ }
    const list = DEFAULTS.map((c) => ({ ...c, ends: c.endsIn ? boot + c.endsIn : null }));
    localStorage.setItem(KEY, JSON.stringify({ list }));
    return list;
  }
  function save(list) {
    localStorage.setItem(KEY, JSON.stringify({ list }));
    window.dispatchEvent(new CustomEvent('dt:campaigns'));
  }
  function active() {
    const t = Date.now();
    return load().filter((c) => c.active && (!c.ends || c.ends > t));
  }
  function forProduct(id) {
    return active().find((c) => c.scope.includes(id) && (c.off || c.offAmt)) || null;
  }
  function isNew(id) {
    return active().some((c) => c.kind === 'new' && c.scope.includes(id));
  }
  function apply(price, c) {
    if (!c) return price;
    if (c.off) return Math.round((price * (100 - c.off)) / 100 / 1000) * 1000;
    if (c.offAmt) return Math.max(0, price - c.offAmt);
    return price;
  }
  function fmtLeft(ends, lang) {
    if (!ends) return '';
    let s = Math.max(0, Math.floor((ends - Date.now()) / 1000));
    const d = Math.floor(s / 86400); s -= d * 86400;
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    if (d > 0) return d + ((lang || 'vi') === 'vi' ? ' ngày ' : 'd ') + h + 'h';
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0');
  }
  /* find an active campaign by typed code (name or id, case-insensitive) */
  function byCode(code) {
    if (!code) return null;
    const k = String(code).trim().toLowerCase().replace(/\s+/g, '');
    return active().find((c) => (c.name || '').toLowerCase().replace(/\s+/g, '') === k || c.id.toLowerCase() === k) || null;
  }
  window.DT_CAMPAIGNS = { load, save, active, forProduct, isNew, apply, fmtLeft, byCode, KEY };
})();
