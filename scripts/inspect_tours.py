with open(r'C:\Users\ADMIN\DaiichiTravel\src\App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r"(activeTab === ['\"](?:tours|book-tour|book-ticket)['\"].*?)(?=activeTab ===|\Z)", text, re.DOTALL)
for m in matches:
    print("MATCH (first 400 chars):")
    print(m[:400])
    print("="*40)
