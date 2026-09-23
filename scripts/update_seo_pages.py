import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"c:\Users\ADMIN\Daiichicruise"
SEO_DIR = os.path.join(BASE_DIR, "seo")

CTA_TEXTS = {
    "vi": {"bus": "Đặt vé xe ngay →", "cruise": "Đặt cabin du thuyền 5★ →", "tour": "Đặt tour ngay →", "home": "Trang chủ Daiichi Cruise"},
    "en": {"bus": "Book bus tickets →", "cruise": "Book 5★ cabin now →", "tour": "Book tour now →", "home": "Daiichi Cruise Homepage"},
    "ja": {"bus": "バスチケットを予約 →", "cruise": "5つ星クルーズを予約 →", "tour": "ツアーを予約 →", "home": "Daiichi Cruise ホーム"},
    "ko": {"bus": "버스 티켓 예약 →", "cruise": "5성급 크루즈 예약 →", "tour": "투어 예약 →", "home": "Daiichi Cruise 홈"},
    "zh": {"bus": "立即预订车票 →", "cruise": "预订五星豪华游轮 →", "tour": "立即预订行程 →", "home": "Daiichi Cruise 首页"},
    "fr": {"bus": "Réserver le bus →", "cruise": "Réserver croisière 5★ →", "tour": "Réserver le circuit →", "home": "Accueil Daiichi Cruise"},
}

def update_file(filepath, lang):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    filename = os.path.basename(filepath).lower()

    # 1. Determine service kind
    if "bus" in filename or "xe-" in filename:
        kind = "bus"
        booking_url = "https://daiichitravel.com/?tab=book-ticket&from=Hà%20Nội&to=Cát%20Bà"
    elif "overnight" in filename or "ngu-dem" in filename or "nuit" in filename:
        kind = "cruise"
        booking_url = "https://daiichitravel.com/?tab=cruise-tour"
    else:
        kind = "tour"
        booking_url = "https://daiichitravel.com/?tab=tours&category=TOUR_SHORT"

    cta_label = CTA_TEXTS.get(lang, CTA_TEXTS["en"])[kind]
    home_label = CTA_TEXTS.get(lang, CTA_TEXTS["en"])["home"]

    # 2. Canonical & Hreflang domain replacement
    content = content.replace("https://daiichitravel.com/vi/", "https://daiichicruise.vn/vi/")
    content = content.replace("https://daiichitravel.com/en/", "https://daiichicruise.vn/en/")
    content = content.replace("https://daiichitravel.com/fr/", "https://daiichicruise.vn/fr/")
    content = content.replace("https://daiichitravel.com/ja/", "https://daiichicruise.vn/ja/")
    content = content.replace("https://daiichitravel.com/ko/", "https://daiichicruise.vn/ko/")
    content = content.replace("https://daiichitravel.com/zh/", "https://daiichicruise.vn/zh/")
    content = content.replace('href="https://daiichitravel.com/"', 'href="https://daiichicruise.vn/"')

    # 3. Replace CTA links
    # Pattern: <a class="cta" href="../../customer/Daiichi Travel.html">...</a>
    content = re.sub(
        r'<a class="cta" href="[^"]*customer/[^"]*">([^<]*)</a>',
        f'<a class="cta" href="{booking_url}" target="_blank" rel="noopener">{cta_label}</a>',
        content
    )

    # Secondary ghost link: point to home
    content = re.sub(
        r'<a class="cta ghost" href="[^"]*index\.html">([^<]*)</a>',
        f'<a class="cta ghost" href="../../index.html">{home_label}</a>',
        content
    )

    # 4. Header replacement: add Hotline and Zalo
    header_old = "<header>\n  <a href=\"../../index.html\">DAIICHI TRAVEL</a>"
    header_new = (
        "<header>\n"
        "  <div style=\"display:flex;align-items:center;gap:16px;flex-wrap:wrap;\">\n"
        "    <a href=\"../../index.html\" style=\"font-weight:700;\">DAIICHI CRUISE</a>\n"
        "    <span style=\"font-size:12px;color:rgba(255,255,255,.8);display:inline-flex;gap:12px;\">\n"
        "      <span>📞 Hotline: <a href=\"tel:19009070\" style=\"color:var(--gold);text-decoration:none;font-weight:700;\">1900 9070</a></span>\n"
        "      <span>💬 Zalo: <a href=\"https://zalo.me/0961004709\" target=\"_blank\" rel=\"noopener\" style=\"color:#60A5FA;text-decoration:none;font-weight:700;\">0961 004 709</a></span>\n"
        "    </span>\n"
        "  </div>"
    )
    content = content.replace(header_old, header_new)

    # 5. Footer replacement
    footer_pattern = r'<footer>.*?</footer>'
    footer_new = (
        "<footer>\n"
        "  <p><b>Daiichi Cruise</b> — Chuyên du thuyền Lan Hạ & Vận tải du lịch Cát Bà. Hệ thống đặt vé & giữ chỗ trực tuyến bởi <a href=\"https://daiichitravel.com\" target=\"_blank\" rel=\"noopener\" style=\"color:var(--navy);font-weight:700;\">DaiichiTravel.com</a>.</p>\n"
        "  <p>Hotline 24/7: <a href=\"tel:19009070\">1900 9070</a> · Zalo: <a href=\"https://zalo.me/0961004709\" target=\"_blank\" rel=\"noopener\">0961 004 709</a> · Email: <a href=\"mailto:sale@daiichitravel.com\">sale@daiichitravel.com</a></p>\n"
        "</footer>"
    )
    content = re.sub(footer_pattern, footer_new, content, flags=re.DOTALL)

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)

def main():
    langs = ["vi", "en", "fr", "ja", "ko", "zh"]
    count = 0
    for lang in langs:
        dirpath = os.path.join(SEO_DIR, lang)
        if not os.path.isdir(dirpath):
            continue
        for fname in os.listdir(dirpath):
            if fname.endswith(".html"):
                fpath = os.path.join(dirpath, fname)
                update_file(fpath, lang)
                count += 1
    print(f"✅ Successfully updated {count} SEO landing pages!")

if __name__ == "__main__":
    main()
