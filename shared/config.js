/* DAIICHI CRUISE - Centralized Configuration & Deep Linking Helper */
window.DAIICHI_CONFIG = {
  // Production domains
  SEO_SITE_URL: 'https://daiichicruise.vn',
  BOOKING_BASE_URL: 'https://daiichitravel.com',

  // Contact info
  HOTLINE_DISPLAY: '1900 9070',
  HOTLINE_TEL: '19009070',
  ZALO_DISPLAY: '0961 004 709',
  ZALO_TEL: '0961004709',
  ZALO_OA_ID: '633406871869836720',
  ZALO_URL: 'https://zalo.me/633406871869836720',
  WHATSAPP_DISPLAY: '+84 961 004 709',
  WHATSAPP_TEL: '+84961004709',
  WHATSAPP_URL: 'https://wa.me/84961004709',
  EMAIL: 'sale@daiichitravel.com',
  OFFICE_CATBA: '217 đường 1/4, thị trấn Cát Bà, Hải Phòng',
  OFFICE_HANOI: '96 Nguyễn Hữu Huân, Hoàn Kiếm, Hà Nội',

  // App download links
  APP_STORE_URL: 'https://apps.apple.com/app/id6790058777',
  PLAY_STORE_URL: 'https://play.google.com/store/apps/details?id=app.web.daiichitravel.twa',

  // Google Ads & Analytics Tracking Configuration
  // Mã Google Ads chính thức của Daiichi Cruise
  GOOGLE_ADS_ID: 'AW-18502887757', 
  GA4_MEASUREMENT_ID: '', // Mã GA4 (nếu có, ví dụ: 'G-XXXXXXXXXX')
  GOOGLE_ADS_CONVERSION_HOTLINE: 'AW-18502887757/O_i5CL_B-pgdEM3S7vZE', // Bấm gọi Hotline (1900 9070 / 0961 004 709)
  GOOGLE_ADS_CONVERSION_ZALO: 'AW-18502887757/O_i5CL_B-pgdEM3S7vZE', // Bấm chat Zalo
  GOOGLE_ADS_CONVERSION_CHATBOT: 'AW-18502887757/O_i5CL_B-pgdEM3S7vZE', // Bấm mở Chat AI / Tư vấn trực tiếp
  GOOGLE_ADS_CONVERSION_BOOKING: 'AW-18502887757/O_i5CL_B-pgdEM3S7vZE', // Bấm nút Đặt du thuyền / tìm kiếm
  GOOGLE_ADS_CONVERSION_PURCHASE: 'AW-18502887757/GrapCIj6t5YdEM3S7vZE', // Đặt thành công

  // Helper to append UTM / GCLID if tracking is loaded
  _wrapUrl(url) {
    if (window.DaiichiTracking && typeof window.DaiichiTracking.decorateUrl === 'function') {
      return window.DaiichiTracking.decorateUrl(url);
    }
    return url;
  },

  // Deep link generators to DaiichiTravel booking engine
  getBusBookingUrl(from, to, date) {
    let url = `${this.BOOKING_BASE_URL}/?tab=book-ticket`;
    if (from) url += `&from=${encodeURIComponent(from)}`;
    if (to) url += `&to=${encodeURIComponent(to)}`;
    if (date) url += `&date=${encodeURIComponent(date)}`;
    return this._wrapUrl(url);
  },

  getTourBookingUrl(category, tourId) {
    let url = `${this.BOOKING_BASE_URL}/?tab=tours`;
    if (category) url += `&category=${encodeURIComponent(category)}`;
    if (tourId) url += `&tourId=${encodeURIComponent(tourId)}`;
    return this._wrapUrl(url);
  },

  getCruiseBookingUrl(cruiseId) {
    let url = `${this.BOOKING_BASE_URL}/?tab=cruise-tours`;
    if (cruiseId) url += `&tourId=${encodeURIComponent(cruiseId)}`;
    return this._wrapUrl(url);
  },

  getCharterUrl() {
    return this._wrapUrl(`${this.BOOKING_BASE_URL}/?tab=charter-vehicle`);
  },

  getMyTicketsUrl() {
    return this._wrapUrl(`${this.BOOKING_BASE_URL}/?tab=my-tickets`);
  },

  getGeneralBookingUrl() {
    return this._wrapUrl(`${this.BOOKING_BASE_URL}/?tab=cruise-tours`);
  }
};

