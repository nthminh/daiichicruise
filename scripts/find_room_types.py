import sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\ADMIN\DaiichiTravel\src\types.ts', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
matches = re.findall(r"(?:interface|type)\s+(?:Room|Suite|Cabin|Property|TourItem|Cruise).*?\{.*?\n\}", text, re.DOTALL)
for m in matches:
    print(m[:800])
    print("="*40)
