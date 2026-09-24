import os
import shutil
import subprocess
import sys

# Set UTF-8 encoding
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SEO_DIR = os.path.join(BASE_DIR, "seo")

langs = ["vi", "en", "ja", "ko", "zh", "fr"]

total_synced = 0

for lang in langs:
    src_dir = os.path.join(SEO_DIR, lang)
    dst_dir = os.path.join(BASE_DIR, lang)

    if not os.path.isdir(src_dir):
        continue

    os.makedirs(dst_dir, exist_ok=True)

    for fname in os.listdir(src_dir):
        if fname.endswith(".html"):
            src_file = os.path.join(src_dir, fname)
            dst_file = os.path.join(dst_dir, fname)
            shutil.copy2(src_file, dst_file)
            total_synced += 1

print(f"✅ Đã đồng bộ {total_synced} trang SEO tĩnh vào các thư mục gốc ({', '.join(langs)})")

# Run generate_sitemap.py
sitemap_script = os.path.join(BASE_DIR, "scripts", "generate_sitemap.py")
if os.path.exists(sitemap_script):
    subprocess.run([sys.executable, sitemap_script], check=True)
