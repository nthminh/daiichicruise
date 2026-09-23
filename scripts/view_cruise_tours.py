import sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\ADMIN\DaiichiTravel\src\App.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find("case 'cruise-tours':")
if pos != -1:
    print(text[pos:pos+800])
