with open(r'C:\Users\ADMIN\DaiichiTravel\src\App.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if "activeTab === 'tours'" in l or "activeTab === 'book-tour'" in l:
        print(f"Line {i+1}: {l.strip()}")
        for j in range(max(0, i-2), min(len(lines), i+25)):
            print(f"  {j+1}: {lines[j]}", end='')
        print("-" * 50)
