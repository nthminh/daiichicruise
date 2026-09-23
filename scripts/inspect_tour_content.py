import sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\ADMIN\DaiichiTravel\src\utils\tourContentUtils.ts', 'r', encoding='utf-8', errors='ignore') as f:
    print(f.read()[:2000])
