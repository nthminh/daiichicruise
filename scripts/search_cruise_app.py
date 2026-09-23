import sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\ADMIN\DaiichiTravel\src\App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r"cruise-tour", text)]
print(f"Found {len(matches)} occurrences of cruise-tour")
for idx in matches:
    print(text[max(0, idx-100):min(len(text), idx+150)])
    print("="*40)
