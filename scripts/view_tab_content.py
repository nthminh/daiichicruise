with open(r'C:\Users\ADMIN\DaiichiTravel\src\App.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(4585, min(len(lines), 4720)):
    print(f"{i+1}: {lines[i]}", end='')
