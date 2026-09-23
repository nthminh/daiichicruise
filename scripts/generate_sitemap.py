import os
import sys
from datetime import datetime

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"c:\Users\ADMIN\Daiichicruise"
SEO_DIR = os.path.join(BASE_DIR, "seo")
SITEMAP_PATH = os.path.join(BASE_DIR, "sitemap.xml")

today = datetime.now().strftime("%Y-%m-%d")

urls = [
    {
        "loc": "https://daiichicruise.vn/",
        "lastmod": today,
        "changefreq": "daily",
        "priority": "1.0"
    }
]

langs = ["vi", "en", "ja", "ko", "zh", "fr"]
for lang in langs:
    dirpath = os.path.join(SEO_DIR, lang)
    if not os.path.isdir(dirpath):
        continue
    for fname in sorted(os.listdir(dirpath)):
        if fname.endswith(".html"):
            slug = fname[:-5] # remove .html
            # URL clean or with .html
            loc = f"https://daiichicruise.vn/{lang}/{slug}"
            priority = "0.9" if lang in ["vi", "en"] else "0.8"
            urls.append({
                "loc": loc,
                "lastmod": today,
                "changefreq": "weekly",
                "priority": priority
            })

xml_lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"'
    ' xmlns:xhtml="http://www.w3.org/1999/xhtml">'
]

for u in urls:
    xml_lines.append("  <url>")
    xml_lines.append(f"    <loc>{u['loc']}</loc>")
    xml_lines.append(f"    <lastmod>{u['lastmod']}</lastmod>")
    xml_lines.append(f"    <changefreq>{u['changefreq']}</changefreq>")
    xml_lines.append(f"    <priority>{u['priority']}</priority>")
    xml_lines.append("  </url>")

xml_lines.append("</urlset>\n")

xml_content = "\n".join(xml_lines)

with open(SITEMAP_PATH, "w", encoding="utf-8") as f:
    f.write(xml_content)

print(f"✅ Generated sitemap.xml with {len(urls)} URLs at {SITEMAP_PATH}")
