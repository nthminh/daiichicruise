/* ============================================================
   DAIICHI — auto-translation engine (vi → en/ja/ko/zh/fr)
   Glossary-based demo for CMS: operators type Vietnamese only.
   Production note: swap translate() body for Google/DeepL/Claude API
   keeping the same signature — UI stays unchanged.
   ============================================================ */
(function () {
  /* longest-match-first tourism glossary: vi → [en, ja, ko, zh, fr] */
  const GL = [
    ['du thuyền ngủ đêm 5 sao', ['5-star overnight cruise', '5つ星宿泊クルーズ', '5성급 1박 크루즈', '五星过夜游轮', 'croisière de nuit 5 étoiles']],
    ['du thuyền ngủ đêm', ['overnight cruise', '宿泊クルーズ', '1박 크루즈', '过夜游轮', 'croisière de nuit']],
    ['tour sup hoàng hôn', ['sunset SUP tour', 'サンセットSUPツアー', '선셋 SUP 투어', '日落SUP之旅', 'tour SUP au coucher du soleil']],
    ['vịnh lan hạ', ['Lan Ha Bay', 'ランハ湾', '란하베이', '兰哈湾', 'la baie de Lan Ha']],
    ['cùng đối tác', ['with our partner', 'パートナー', '파트너', '与合作伙伴', 'avec notre partenaire']],
    ['đối tác', ['partner', 'パートナー', '파트너', '合作伙伴', 'partenaire']],
    ['lễ quốc khánh 2/9', ['Sep 2 National Day', '建国記念日(9/2)', '국경일(9/2)', '9月2日国庆节', 'la fête nationale (2/9)']],
    ['tăng cường', ['extra', '増便', '증편', '加开', 'supplémentaires']],
    ['mở bán từ hôm nay', ['on sale today', '本日発売', '오늘부터 판매', '今日起开售', 'en vente dès aujourd\u2019hui']],
    ['phụ thu lễ', ['holiday surcharge', '祝日追加料金', '공휴일 추가 요금', '节假日附加费', 'supplément férié']],
    ['theo biểu giá', ['per the rate card', '料金表に基づく', '요금표 기준', '按价目表', 'selon le tarif']],
    ['khuyến mãi', ['promotion', 'セール', '프로모션', '优惠', 'promotion']],
    ['flash sale', ['flash sale', 'フラッシュセール', '플래시 세일', '限时抢购', 'vente flash']],
    ['giảm giá', ['discount', '割引', '할인', '折扣', 'réduction']],
    ['hoàng hôn', ['sunset', 'サンセット', '선셋', '日落', 'coucher de soleil']],
    ['bình minh', ['sunrise', 'サンライズ', '선라이즈', '日出', 'lever de soleil']],
    ['du thuyền ngày', ['day cruise', 'デイクルーズ', '데이 크루즈', '日间游轮', 'croisière du jour']],
    ['du thuyền', ['cruise', 'クルーズ', '크루즈', '游轮', 'croisière']],
    ['tàu cao tốc', ['speedboat', '高速船', '쾌속선', '快艇', 'bateau rapide']],
    ['xe limousine', ['limousine bus', 'リムジンバス', '리무진 버스', '豪华巴士', 'bus limousine']],
    ['limousine', ['limousine', 'リムジン', '리무진', '豪华车', 'limousine']],
    ['hà nội', ['Hanoi', 'ハノイ', '하노이', '河内', 'Hanoï']],
    ['hải phòng', ['Hai Phong', 'ハイフォン', '하이퐁', '海防', 'Hai Phong']],
    ['cát bà', ['Cat Ba', 'カットバ', '깟바', '吉婆岛', 'Cat Ba']],
    ['bến bèo', ['Beo pier', 'ベオ港', '베오 부두', 'Beo码头', 'le quai Beo']],
    ['nhóm nhỏ', ['small groups', '少人数制', '소그룹', '小团', 'petits groupes']],
    ['hdv riêng', ['private guide', '専属ガイド', '전담 가이드', '专属导游', 'guide privé']],
    ['khởi hành', ['departs', '出発', '출발', '出发', 'départ']],
    ['hằng ngày', ['daily', '毎日', '매일', '每日', 'chaque jour']],
    ['mỗi ngày', ['daily', '毎日', '매일', '每日', 'par jour']],
    ['chuyến', ['departures', '便', '편', '班次', 'départs']],
    ['mùa hè', ['summer', '夏', '여름', '夏季', 'l\u2019été']],
    ['tour mới', ['new tour', '新ツアー', '새 투어', '新行程', 'nouveau circuit']],
    ['mới:', ['New:', '新着:', '신규:', '新:', 'Nouveau :']],
    ['mới', ['new', '新', '신규', '新', 'nouveau']],
    ['khách lẻ', ['individual guests', '個人のお客様', '개인 고객', '散客', 'voyageurs individuels']],
    ['khách', ['guests', '名', '인', '人', 'pers.']],
    ['miễn phí', ['free', '無料', '무료', '免费', 'gratuit']],
    ['quà tặng', ['gift', 'ギフト', '선물', '礼品', 'cadeau']],
    ['suite', ['suite', 'スイート', '스위트', '套房', 'suite']],
    ['vé', ['tickets', 'チケット', '티켓', '车票', 'billets']],
    ['đặt ngay', ['book now', '今すぐ予約', '지금 예약', '立即预订', 'réservez maintenant']],
    ['đặt trước', ['book ahead', '事前予約', '사전 예약', '提前预订', 'réservez à l\u2019avance']],
    ['từ', ['from', '〜', '부터', '起', 'dès']],
    ['và', ['and', 'と', '및', '和', 'et']],
    ['đến', ['to', 'まで', '까지', '至', 'à']],
    ['lan hạ', ['Lan Ha', 'ランハ', '란하', '兰哈', 'Lan Ha']],
  ];
  GL.sort((a, b) => b[0].length - a[0].length);

  function translateTo(src, li) {
    const lower = src.toLowerCase();
    let out = '', i = 0;
    while (i < src.length) {
      let hit = null;
      for (const [vi, tr] of GL) {
        if (lower.startsWith(vi, i)) { hit = tr[li]; i += vi.length; break; }
      }
      if (hit !== null) out += hit;
      else { out += src[i]; i += 1; }
    }
    return out.replace(/\s{2,}/g, ' ').trim();
  }

  window.DT_XLATE = {
    /* returns {vi,en,ja,ko,zh,fr} from a Vietnamese source string */
    translate(vi) {
      const s = String(vi || '').trim();
      if (!s) return { vi: s, en: s, ja: s, ko: s, zh: s, fr: s };
      return { vi: s, en: translateTo(s, 0), ja: translateTo(s, 1), ko: translateTo(s, 2), zh: translateTo(s, 3), fr: translateTo(s, 4) };
    },
  };
})();
