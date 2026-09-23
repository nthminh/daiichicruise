/* DAIICHI — Cookie consent banner (GDPR / Consent Mode v2 ready), 6 languages.
   Load AFTER shared/i18n.js. Analytics must only fire after DT_CONSENT.status === 'granted'.
   Spec for production: map grant/deny to gtag('consent','update',{analytics_storage,ad_storage}). */
(function () {
  var KEY = 'dt_consent';
  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}

  /* Google Consent Mode v2 — mặc định denied trước khi khách chọn; no-op khi trang chưa cài gtag (nguyên mẫu) */
  function gtagConsent(cmd, granted) {
    if (typeof window.gtag !== 'function') return;
    var g = granted ? 'granted' : 'denied';
    window.gtag('consent', cmd, { analytics_storage: g, ad_storage: g, ad_user_data: g, ad_personalization: g });
  }
  gtagConsent('default', saved === 'granted');

  window.DT_CONSENT = {
    get status() { try { return localStorage.getItem(KEY); } catch (e) { return null; } },
    grant: function () { set('granted'); },
    deny: function () { set('necessary'); },
  };

  function set(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
    var el = document.getElementById('dt-consent');
    if (el) el.remove();
    window.dispatchEvent(new CustomEvent('dt:consent', { detail: v }));
    gtagConsent('update', v === 'granted');
  }

  if (saved) return; // already chose

  var T = {
    vi: { msg: 'Chúng tôi dùng cookie để ghi nhớ ngôn ngữ, giỏ hàng và đo lường ẩn danh nhằm cải thiện dịch vụ. Bạn có thể chỉ cho phép cookie cần thiết.', accept: 'Đồng ý tất cả', necessary: 'Chỉ cookie cần thiết', more: 'Chính sách riêng tư' },
    en: { msg: 'We use cookies to remember your language and cart, and for anonymous analytics. You can allow essential cookies only.', accept: 'Accept all', necessary: 'Essential only', more: 'Privacy policy' },
    ja: { msg: '言語設定・カートの保存と匿名の利用分析のためにCookieを使用します。必須Cookieのみの許可も選べます。', accept: 'すべて同意', necessary: '必須のみ', more: 'プライバシーポリシー' },
    ko: { msg: '언어·장바구니 저장 및 익명 분석을 위해 쿠키를 사용합니다. 필수 쿠키만 허용할 수도 있습니다.', accept: '모두 동의', necessary: '필수만 허용', more: '개인정보 처리방침' },
    zh: { msg: '我们使用Cookie记住您的语言和购物车，并进行匿名统计以改进服务。您可以仅允许必要Cookie。', accept: '全部同意', necessary: '仅必要Cookie', more: '隐私政策' },
    fr: { msg: 'Nous utilisons des cookies pour mémoriser votre langue et votre panier, et pour des statistiques anonymes. Vous pouvez n\u2019autoriser que les cookies essentiels.', accept: 'Tout accepter', necessary: 'Essentiels uniquement', more: 'Politique de confidentialité' },
  };

  function texts() {
    var lang = (window.I18N && I18N.lang) || 'vi';
    return T[lang] || T.en;
  }

  function legalHref() {
    var p = (location.pathname || '').toLowerCase();
    var prefix = p.indexOf('/customer/') >= 0 ? '' : 'customer/';
    return prefix + 'Chính sách & Điều khoản.html#privacy';
  }

  function render() {
    if (document.getElementById('dt-consent')) return;
    var t = texts();
    var bar = document.createElement('div');
    bar.id = 'dt-consent';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Cookie consent');
    bar.style.cssText = 'position:fixed;left:0;right:0;bottom:0;z-index:96;background:#0D182E;color:#fff;padding:14px 18px;display:flex;gap:14px;align-items:center;justify-content:center;flex-wrap:wrap;font-family:\'Be Vietnam Pro\',system-ui,sans-serif;font-size:13px;line-height:1.55;box-shadow:0 -6px 24px rgba(0,0,0,.25)';
    bar.innerHTML =
      '<span style="max-width:560px;color:rgba(255,255,255,.88)">🍪 ' + t.msg +
      ' <a href="' + legalHref() + '" style="color:#D4A648;text-decoration:underline">' + t.more + '</a></span>' +
      '<span style="display:flex;gap:9px;flex-wrap:wrap">' +
      '<button id="dt-c-no" style="background:transparent;border:1.5px solid rgba(255,255,255,.4);color:#fff;border-radius:8px;padding:9px 16px;font-size:12.5px;font-weight:700;cursor:pointer;font-family:inherit">' + t.necessary + '</button>' +
      '<button id="dt-c-ok" style="background:#D4A648;border:0;color:#0D182E;border-radius:8px;padding:9px 20px;font-size:12.5px;font-weight:800;cursor:pointer;font-family:inherit">' + t.accept + '</button>' +
      '</span>';
    document.body.appendChild(bar);
    document.getElementById('dt-c-ok').onclick = window.DT_CONSENT.grant;
    document.getElementById('dt-c-no').onclick = window.DT_CONSENT.deny;
  }

  // re-render text if language changes before choice is made
  window.addEventListener('dt:lang', function () {
    var el = document.getElementById('dt-consent');
    if (el) { el.remove(); render(); }
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
