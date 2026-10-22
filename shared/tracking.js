/* ============================================================
   DAIICHI CRUISE — GOOGLE ADS & MARKETING TRACKING ENGINE
   1. UTM & GCLID Attribution capture & cross-domain link decoration
   2. Google Ads / GA4 Conversion event helpers
   3. Auto-listener for Hotline calls, Zalo chats & Booking CTAs
   ============================================================ */

(function () {
  'use strict';

  // Fallback dataLayer & gtag
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }

  const STORAGE_KEY = 'daiichi_ads_attribution';
  const USER_DATA_STORAGE_KEY = 'daiichi_ads_user_data';
  const PARAMS_TO_TRACK = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'gclid',
    'gbraid',
    'wbraid',
    'fbclid'
  ];

  /* ------------------------------------------------------------
     1. ENHANCED CONVERSIONS (LƯỢT CHUYỂN ĐỔI NÂNG CAO) HELPERS
     Chuẩn hoá dữ liệu định danh theo yêu cầu Google Ads:
     - Phone: Chuẩn E.164 (+84...)
     - Email: Chữ thường, bỏ khoảng trắng
     ------------------------------------------------------------ */
  function formatPhoneE164(phone) {
    if (!phone || typeof phone !== 'string') return '';
    let cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
    if (cleaned.startsWith('0084')) {
      cleaned = '+84' + cleaned.slice(4);
    } else if (cleaned.startsWith('84') && !cleaned.startsWith('+')) {
      cleaned = '+' + cleaned;
    } else if (cleaned.startsWith('0')) {
      cleaned = '+84' + cleaned.slice(1);
    } else if (!cleaned.startsWith('+') && cleaned.length >= 9) {
      cleaned = '+84' + cleaned;
    }
    return cleaned;
  }

  function formatEmail(email) {
    if (!email || typeof email !== 'string') return '';
    return email.trim().toLowerCase();
  }

  function sanitizeUserData(data) {
    if (!data || typeof data !== 'object') return null;
    const clean = {};

    if (data.email) {
      const em = formatEmail(data.email);
      if (em.includes('@')) clean.email = em;
    }

    const rawPhone = data.phone_number || data.phone || data.tel;
    if (rawPhone) {
      const ph = formatPhoneE164(String(rawPhone));
      if (ph.length >= 10) clean.phone_number = ph;
    }

    if (data.first_name || data.name) {
      clean.address = clean.address || {};
      clean.address.first_name = (data.first_name || data.name).trim();
      clean.address.country = data.country || 'VN';
    }

    return Object.keys(clean).length ? clean : null;
  }

  function getStoredUserData() {
    try {
      const s = sessionStorage.getItem(USER_DATA_STORAGE_KEY);
      if (s) return JSON.parse(s);
    } catch (e) { /* ignore */ }
    return null;
  }

  function saveStoredUserData(data) {
    const sanitized = sanitizeUserData(data);
    if (!sanitized) return null;
    try {
      const existing = getStoredUserData() || {};
      const merged = { ...existing, ...sanitized };
      if (sanitized.address) {
        merged.address = { ...(existing.address || {}), ...sanitized.address };
      }
      sessionStorage.setItem(USER_DATA_STORAGE_KEY, JSON.stringify(merged));
      // Khai báo trực tiếp với Google Ads tag
      window.gtag('set', 'user_data', merged);
      return merged;
    } catch (e) {
      return sanitized;
    }
  }

  /* ------------------------------------------------------------
     2. CAPTURE & PERSIST ATTRIBUTION (UTM + GCLID)
     ------------------------------------------------------------ */
  function captureAttribution() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      let foundAny = false;
      const current = {};

      PARAMS_TO_TRACK.forEach((key) => {
        const val = urlParams.get(key);
        if (val) {
          current[key] = val;
          foundAny = true;
        }
      });

      if (foundAny) {
        current.first_visit = Date.now();
        current.landing_page = window.location.pathname + window.location.search;
        current.referrer = document.referrer || '';
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      }
    } catch (err) {
      console.warn('[DaiichiTracking] Error capturing attribution:', err);
    }
  }

  function getStoredAttribution() {
    try {
      const session = sessionStorage.getItem(STORAGE_KEY);
      if (session) return JSON.parse(session);
      const local = localStorage.getItem(STORAGE_KEY);
      if (local) return JSON.parse(local);
    } catch (e) { /* ignore */ }
    return {};
  }

  /* ------------------------------------------------------------
     3. DECORATE OUTGOING BOOKING URLS WITH UTM / GCLID
     Preserves Google Ads tracking across daiichicruise.vn -> daiichitravel.com
     ------------------------------------------------------------ */
  function decorateUrl(url) {
    if (!url || typeof url !== 'string') return url;
    const attr = getStoredAttribution();
    if (!Object.keys(attr).length) return url;

    try {
      const parsed = new URL(url, window.location.origin);
      // Only decorate booking links or external Daiichi domains
      if (parsed.hostname.includes('daiichitravel.com') || parsed.hostname === window.location.hostname) {
        PARAMS_TO_TRACK.forEach((param) => {
          if (attr[param] && !parsed.searchParams.has(param)) {
            parsed.searchParams.set(param, attr[param]);
          }
        });
        return parsed.toString();
      }
    } catch (e) { /* invalid URL */ }
    return url;
  }

  /* ------------------------------------------------------------
     4. TRACKING API (CÓ HỖ TRỢ ENHANCED CONVERSIONS)
     ------------------------------------------------------------ */
  const DaiichiTracking = {
    getAttribution: getStoredAttribution,
    decorateUrl: decorateUrl,

    // Quản lý User Data cho Enhanced Conversions
    setUserData: function (data) {
      return saveStoredUserData(data);
    },
    getUserData: function () {
      return getStoredUserData();
    },

    // Track hotline click kèm Enhanced Conversions
    trackHotline: function (phone, position, customUserData) {
      const num = phone || '19009070';
      const pos = position || 'unknown';
      console.info('[DaiichiTracking] Track Hotline Click:', num, pos);

      const effectiveUser = (customUserData && saveStoredUserData(customUserData)) || getStoredUserData();
      
      window.gtag('event', 'contact_hotline', {
        event_category: 'Engagement',
        event_label: pos,
        phone_number: num,
        value: 1
      });

      // Google Ads specific conversion if configured
      if (window.DAIICHI_CONFIG && window.DAIICHI_CONFIG.GOOGLE_ADS_CONVERSION_HOTLINE) {
        const payload = {
          send_to: window.DAIICHI_CONFIG.GOOGLE_ADS_CONVERSION_HOTLINE
        };
        if (effectiveUser) payload.user_data = effectiveUser;
        window.gtag('event', 'conversion', payload);
      }
    },

    // Track Zalo click kèm Enhanced Conversions
    trackZalo: function (position, customUserData) {
      const pos = position || 'unknown';
      console.info('[DaiichiTracking] Track Zalo Click:', pos);

      const effectiveUser = (customUserData && saveStoredUserData(customUserData)) || getStoredUserData();

      window.gtag('event', 'contact_zalo', {
        event_category: 'Engagement',
        event_label: pos,
        value: 1
      });

      // Google Ads specific conversion if configured
      if (window.DAIICHI_CONFIG && window.DAIICHI_CONFIG.GOOGLE_ADS_CONVERSION_ZALO) {
        const payload = {
          send_to: window.DAIICHI_CONFIG.GOOGLE_ADS_CONVERSION_ZALO
        };
        if (effectiveUser) payload.user_data = effectiveUser;
        window.gtag('event', 'conversion', payload);
      }
    },

    // Track WhatsApp click kèm Enhanced Conversions
    trackWhatsApp: function (position, customUserData) {
      const pos = position || 'unknown';
      console.info('[DaiichiTracking] Track WhatsApp Click:', pos);

      const effectiveUser = (customUserData && saveStoredUserData(customUserData)) || getStoredUserData();

      window.gtag('event', 'contact_whatsapp', {
        event_category: 'Engagement',
        event_label: pos,
        value: 1
      });

      // Google Ads specific conversion (use Zalo/Contact conversion tag)
      const convTag = (window.DAIICHI_CONFIG && (window.DAIICHI_CONFIG.GOOGLE_ADS_CONVERSION_WHATSAPP || window.DAIICHI_CONFIG.GOOGLE_ADS_CONVERSION_ZALO));
      if (convTag) {
        const payload = { send_to: convTag };
        if (effectiveUser) payload.user_data = effectiveUser;
        window.gtag('event', 'conversion', payload);
      }
    },

    // Track biểu mẫu liên hệ / tư vấn / thuê xe kèm Enhanced Conversions
    trackContact: function (userData, contactType, details) {
      console.info('[DaiichiTracking] Track Contact Form:', contactType, details);
      const effectiveUser = (userData && saveStoredUserData(userData)) || getStoredUserData();

      window.gtag('event', 'generate_lead', {
        event_category: 'Lead',
        event_label: contactType || 'contact_form',
        details: details || ''
      });

      // Kích hoạt hành động chuyển đổi "Người liên hệ" trên Google Ads
      const conversionId = (window.DAIICHI_CONFIG && (window.DAIICHI_CONFIG.GOOGLE_ADS_CONVERSION_HOTLINE || window.DAIICHI_CONFIG.GOOGLE_ADS_CONVERSION_ZALO));
      if (conversionId) {
        const payload = {
          send_to: conversionId,
          value: 1.0,
          currency: 'VND'
        };
        if (effectiveUser) payload.user_data = effectiveUser;
        window.gtag('event', 'conversion', payload);
      }
    },

    // Track Booking Intent (Begin Checkout / Click Book)
    trackBookingClick: function (tourName, tourId, price, customUserData) {
      console.info('[DaiichiTracking] Track Booking Click:', tourName, tourId, price);

      const effectiveUser = (customUserData && saveStoredUserData(customUserData)) || getStoredUserData();

      window.gtag('event', 'begin_checkout', {
        event_category: 'Ecommerce',
        event_label: tourName || 'Tour',
        items: [{
          item_id: tourId || 'cruise_tour',
          item_name: tourName || 'Du thuyền Lan Hạ',
          price: price || 0
        }],
        value: price || 0,
        currency: 'VND'
      });

      if (window.DAIICHI_CONFIG && window.DAIICHI_CONFIG.GOOGLE_ADS_CONVERSION_BOOKING) {
        const payload = {
          send_to: window.DAIICHI_CONFIG.GOOGLE_ADS_CONVERSION_BOOKING,
          value: price || 0,
          currency: 'VND'
        };
        if (effectiveUser) payload.user_data = effectiveUser;
        window.gtag('event', 'conversion', payload);
      }
    },

    // Track Successful Order Submission (Purchase) kèm Enhanced Conversions
    trackBookingSuccess: function (orderId, totalValue, items, currency, customUserData) {
      console.info('[DaiichiTracking] Track Booking Success:', orderId, totalValue);
      const curr = currency || (window.DAIICHI_CONFIG && window.DAIICHI_CONFIG.CURRENCY) || 'VND';
      const numVal = parseFloat(totalValue) || 1.0;

      const effectiveUser = (customUserData && saveStoredUserData(customUserData)) || getStoredUserData();

      window.gtag('event', 'purchase', {
        transaction_id: orderId,
        value: numVal,
        currency: curr,
        items: items || []
      });

      if (window.DAIICHI_CONFIG && window.DAIICHI_CONFIG.GOOGLE_ADS_CONVERSION_PURCHASE) {
        const payload = {
          send_to: window.DAIICHI_CONFIG.GOOGLE_ADS_CONVERSION_PURCHASE,
          value: numVal,
          currency: curr,
          transaction_id: orderId
        };
        if (effectiveUser) payload.user_data = effectiveUser;
        window.gtag('event', 'conversion', payload);
      }
    },

    // Track Chatbot Interaction
    trackChatbot: function (action, customUserData) {
      console.info('[DaiichiTracking] Track Chatbot Interaction:', action);
      const effectiveUser = (customUserData && saveStoredUserData(customUserData)) || getStoredUserData();

      window.gtag('event', 'chatbot_interaction', {
        event_category: 'Chatbot',
        event_label: action || 'open'
      });

      if (window.DAIICHI_CONFIG && window.DAIICHI_CONFIG.GOOGLE_ADS_CONVERSION_CHATBOT) {
        const payload = {
          send_to: window.DAIICHI_CONFIG.GOOGLE_ADS_CONVERSION_CHATBOT
        };
        if (effectiveUser) payload.user_data = effectiveUser;
        window.gtag('event', 'conversion', payload);
      }
    }
  };

  /* ------------------------------------------------------------
     5. AUTO-ATTACH EVENT LISTENERS (Clicks & Smart Form Harvesting)
     ------------------------------------------------------------ */
  function checkUrlConversion() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const orderId = urlParams.get('order_id') || urlParams.get('booking_code') || urlParams.get('code') || urlParams.get('vnp_TxnRef');
      const isSuccess = urlParams.get('status') === 'success' || urlParams.get('payment') === 'success' || urlParams.get('vnp_ResponseCode') === '00' || urlParams.get('paid') === '1';

      if (orderId && isSuccess) {
        const trackedKey = 'daiichi_tracked_' + orderId;
        if (!sessionStorage.getItem(trackedKey)) {
          sessionStorage.setItem(trackedKey, '1');
          const rawAmount = parseFloat(urlParams.get('amount') || urlParams.get('total') || urlParams.get('vnp_Amount') || '0');
          const total = urlParams.get('vnp_Amount') ? rawAmount / 100 : rawAmount;
          const curr = urlParams.get('currency') || 'VND';
          DaiichiTracking.trackBookingSuccess(orderId, total || 1.0, [], curr);
        }
      }
    } catch (e) { /* ignore */ }
  }

  function initAutoHarvest() {
    // 1. Tự động lắng nghe khi người dùng nhập số điện thoại hoặc email trên bất kỳ form nào
    document.addEventListener('change', function (e) {
      const el = e.target;
      if (!el || !el.tagName || (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA')) return;
      const val = (el.value || '').trim();
      if (!val) return;

      const type = (el.type || '').toLowerCase();
      const name = (el.name || el.id || el.getAttribute('placeholder') || '').toLowerCase();

      if (type === 'email' || name.includes('email') || val.includes('@')) {
        saveStoredUserData({ email: val });
      } else if (type === 'tel' || name.includes('phone') || name.includes('tel') || name.includes('sdt') || /^0[0-9]{8,10}$/.test(val.replace(/\s+/g, ''))) {
        saveStoredUserData({ phone_number: val });
      }
    }, { capture: true, passive: true });

    // 2. Lắng nghe sự kiện submit của toàn bộ <form> trên trang
    document.addEventListener('submit', function (e) {
      const form = e.target;
      if (!form || !form.elements) return;

      const collected = {};
      for (let i = 0; i < form.elements.length; i++) {
        const field = form.elements[i];
        if (!field.name && !field.id) continue;
        const key = (field.name || field.id || '').toLowerCase();
        const fVal = (field.value || '').trim();
        if (!fVal) continue;

        if (key.includes('email') || field.type === 'email' || fVal.includes('@')) {
          collected.email = fVal;
        } else if (key.includes('phone') || key.includes('tel') || key.includes('sdt') || field.type === 'tel') {
          collected.phone_number = fVal;
        } else if (key.includes('name') || key.includes('ten')) {
          collected.name = fVal;
        }
      }

      if (Object.keys(collected).length > 0) {
        saveStoredUserData(collected);
        // Tự động kích hoạt chuyển đổi Lead nếu là form liên hệ/tư vấn
        const formId = (form.id || form.className || '').toLowerCase();
        if (formId.includes('contact') || formId.includes('tuvan') || formId.includes('booking') || formId.includes('lead')) {
          DaiichiTracking.trackContact(collected, 'form_submit_' + (form.id || 'general'));
        }
      }
    }, { capture: true, passive: true });
  }

  function initAutoTracking() {
    captureAttribution();
    checkUrlConversion();
    initAutoHarvest();

    document.addEventListener('click', function (e) {
      const target = e.target.closest('a, button');
      if (!target) return;

      const href = target.getAttribute('href') || '';

      // Hotline click
      if (href.startsWith('tel:')) {
        const phone = href.replace('tel:', '').replace(/\s+/g, '');
        const position = target.getAttribute('data-track-pos') || target.className || 'tel_link';
        DaiichiTracking.trackHotline(phone, position);
        return;
      }

      // Zalo click
      if (href.includes('zalo.me')) {
        const position = target.getAttribute('data-track-pos') || target.className || 'zalo_link';
        DaiichiTracking.trackZalo(position);
        return;
      }

      // WhatsApp click
      if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        const position = target.getAttribute('data-track-pos') || target.className || 'whatsapp_link';
        DaiichiTracking.trackWhatsApp(position);
        return;
      }

      // Outgoing booking link -> decorate with attribution parameters
      if (href.includes('daiichitravel.com') || target.classList.contains('dt-sched-btn') || target.classList.contains('on-cta')) {
        const decorated = decorateUrl(href);
        if (decorated !== href) {
          target.setAttribute('href', decorated);
        }
        const label = target.innerText.trim().slice(0, 50) || 'booking_button';
        DaiichiTracking.trackBookingClick(label, target.dataset.tourId || '', 0);
      }
    }, { passive: true });
  }

  /* ------------------------------------------------------------
     5. DYNAMIC GOOGLE TAG LOADER (If Google Ads / GA4 ID is set)
     ------------------------------------------------------------ */
  function initGoogleTag() {
    const config = window.DAIICHI_CONFIG || {};
    const tagId = config.GOOGLE_ADS_ID || config.GA4_MEASUREMENT_ID;

    if (tagId && tagId.indexOf('XXXX') === -1) {
      const existingScript = document.getElementById('google-tag-script') || document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
      if (!existingScript) {
        const s = document.createElement('script');
        s.id = 'google-tag-script';
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(tagId);
        document.head.appendChild(s);
      }

      window.gtag('js', new Date());
      window.gtag('config', tagId, {
        send_page_view: true,
        cookie_flags: 'SameSite=None;Secure'
      });

      // Also config second tag if both Ads and GA4 exist
      if (config.GOOGLE_ADS_ID && config.GA4_MEASUREMENT_ID && config.GOOGLE_ADS_ID !== config.GA4_MEASUREMENT_ID) {
        const secondTag = tagId === config.GOOGLE_ADS_ID ? config.GA4_MEASUREMENT_ID : config.GOOGLE_ADS_ID;
        if (secondTag.indexOf('XXXX') === -1) {
          window.gtag('config', secondTag);
        }
      }
    }
  }

  // Expose globally
  window.DaiichiTracking = DaiichiTracking;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initAutoTracking();
      initGoogleTag();
    });
  } else {
    initAutoTracking();
    initGoogleTag();
  }
})();
