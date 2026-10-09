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
     1. CAPTURE & PERSIST ATTRIBUTION (UTM + GCLID)
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
     2. DECORATE OUTGOING BOOKING URLS WITH UTM / GCLID
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
     3. TRACKING API
     ------------------------------------------------------------ */
  const DaiichiTracking = {
    getAttribution: getStoredAttribution,
    decorateUrl: decorateUrl,

    // Track hotline click
    trackHotline: function (phone, position) {
      const num = phone || '19009070';
      const pos = position || 'unknown';
      console.info('[DaiichiTracking] Track Hotline Click:', num, pos);
      
      window.gtag('event', 'contact_hotline', {
        event_category: 'Engagement',
        event_label: pos,
        phone_number: num,
        value: 1
      });

      // Google Ads specific conversion if configured
      if (window.DAIICHI_CONFIG && window.DAIICHI_CONFIG.GOOGLE_ADS_CONVERSION_HOTLINE) {
        window.gtag('event', 'conversion', {
          send_to: window.DAIICHI_CONFIG.GOOGLE_ADS_CONVERSION_HOTLINE
        });
      }
    },

    // Track Zalo click
    trackZalo: function (position) {
      const pos = position || 'unknown';
      console.info('[DaiichiTracking] Track Zalo Click:', pos);

      window.gtag('event', 'contact_zalo', {
        event_category: 'Engagement',
        event_label: pos,
        value: 1
      });

      // Google Ads specific conversion if configured
      if (window.DAIICHI_CONFIG && window.DAIICHI_CONFIG.GOOGLE_ADS_CONVERSION_ZALO) {
        window.gtag('event', 'conversion', {
          send_to: window.DAIICHI_CONFIG.GOOGLE_ADS_CONVERSION_ZALO
        });
      }
    },

    // Track Booking Intent (Begin Checkout / Click Book)
    trackBookingClick: function (tourName, tourId, price) {
      console.info('[DaiichiTracking] Track Booking Click:', tourName, tourId, price);

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
        window.gtag('event', 'conversion', {
          send_to: window.DAIICHI_CONFIG.GOOGLE_ADS_CONVERSION_BOOKING,
          value: price || 0,
          currency: 'VND'
        });
      }
    },

    // Track Successful Order Submission (Purchase)
    trackBookingSuccess: function (orderId, totalValue, items) {
      console.info('[DaiichiTracking] Track Booking Success:', orderId, totalValue);

      window.gtag('event', 'purchase', {
        transaction_id: orderId,
        value: totalValue || 0,
        currency: 'VND',
        items: items || []
      });

      if (window.DAIICHI_CONFIG && window.DAIICHI_CONFIG.GOOGLE_ADS_CONVERSION_PURCHASE) {
        window.gtag('event', 'conversion', {
          send_to: window.DAIICHI_CONFIG.GOOGLE_ADS_CONVERSION_PURCHASE,
          value: totalValue || 0,
          currency: 'VND',
          transaction_id: orderId
        });
      }
    },

    // Track Chatbot Interaction
    trackChatbot: function (action) {
      window.gtag('event', 'chatbot_interaction', {
        event_category: 'Chatbot',
        event_label: action || 'open'
      });
    }
  };

  /* ------------------------------------------------------------
     4. AUTO-ATTACH EVENT LISTENERS (Clicks on Tel / Zalo / Booking)
     ------------------------------------------------------------ */
  function initAutoTracking() {
    captureAttribution();

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
      if (!document.getElementById('google-tag-script')) {
        const s = document.createElement('script');
        s.id = 'google-tag-script';
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(tagId);
        document.head.appendChild(s);

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
