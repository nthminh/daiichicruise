import sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\ADMIN\DaiichiTravel\src\App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

import re
cases = re.findall(r"case ['\"](?:tours|book-tour|book-ticket|home)['\"]:.*?(?=case ['\"]|\Z)", text, re.DOTALL)
for c in cases:
    print("CASE:")
    print(c[:500])
    print("="*40)
