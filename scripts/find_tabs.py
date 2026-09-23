import re

with open(r'C:\Users\ADMIN\DaiichiTravel\src\App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

tabs = set(re.findall(r"activeTab\s*===?\s*['\"]([^'\"]+)['\"]", text))
print("Available tabs in DaiichiTravel:")
for t in sorted(tabs):
    print(" -", t)
