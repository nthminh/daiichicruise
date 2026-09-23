import sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\ADMIN\DaiichiTravel\src\pages\HomePage.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r"(?:du thuyền|cruise|tours|onCategoryFilter).*?", text, re.IGNORECASE)
print(f"Total mentions: {len(matches)}")
for m in re.finditer(r".{0,50}(?:du thuyền|cruise|tour|category).{0,50}", text, re.IGNORECASE):
    print(m.group(0).strip())
