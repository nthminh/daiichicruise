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
  ZALO_URL: 'https://zalo.me/0961004709',
  EMAIL: 'sale@daiichitravel.com',
  OFFICE_CATBA: '217 đường 1/4, thị trấn Cát Bà, Hải Phòng',
  OFFICE_HANOI: '96 Nguyễn Hữu Huân, Hoàn Kiếm, Hà Nội',

  // Deep link generators to DaiichiTravel booking engine
  getBusBookingUrl(from, to, date) {
    let url = `${this.BOOKING_BASE_URL}/?tab=book-ticket`;
    if (from) url += `&from=${encodeURIComponent(from)}`;
    if (to) url += `&to=${encodeURIComponent(to)}`;
    if (date) url += `&date=${encodeURIComponent(date)}`;
    return url;
  },

  getTourBookingUrl(category, tourId) {
    let url = `${this.BOOKING_BASE_URL}/?tab=tours`;
    if (category) url += `&category=${encodeURIComponent(category)}`;
    if (tourId) url += `&tourId=${encodeURIComponent(tourId)}`;
    return url;
  },

  getCruiseBookingUrl(cruiseId) {
    let url = `${this.BOOKING_BASE_URL}/?tab=cruise-tour`;
    if (cruiseId) url += `&tourId=${encodeURIComponent(cruiseId)}`;
    return url;
  },

  getCharterUrl() {
    return `${this.BOOKING_BASE_URL}/?tab=charter-vehicle`;
  },

  getMyTicketsUrl() {
    return `${this.BOOKING_BASE_URL}/?tab=my-tickets`;
  },

  getGeneralBookingUrl() {
    return `${this.BOOKING_BASE_URL}/?tab=book-ticket`;
  }
};
