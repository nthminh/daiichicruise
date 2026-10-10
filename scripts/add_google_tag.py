import os

TAG = """<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-18502887757"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-18502887757');
</script>"""

dirs_to_check = ["vi", "en", "ja", "ko", "zh", "fr", "seo"]
files_updated = []

for d in dirs_to_check:
    for root, _, files in os.walk(d):
        for f in files:
            if f.endswith(".html"):
                p = os.path.join(root, f)
                with open(p, "r", encoding="utf-8") as fp:
                    content = fp.read()
                if "AW-18502887757" not in content and "<head>" in content:
                    content = content.replace("<head>", "<head>\n" + TAG, 1)
                    with open(p, "w", encoding="utf-8") as fp:
                        fp.write(content)
                    files_updated.append(p)

for f in ["hub.html", "404.html"]:
    if os.path.exists(f):
        with open(f, "r", encoding="utf-8") as fp:
            content = fp.read()
        if "AW-18502887757" not in content and "<head>" in content:
            content = content.replace("<head>", "<head>\n" + TAG, 1)
            with open(f, "w", encoding="utf-8") as fp:
                fp.write(content)
            files_updated.append(f)

print(f"Successfully updated {len(files_updated)} files.")
