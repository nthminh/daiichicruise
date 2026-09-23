import os, re

travel_src = r"C:\Users\ADMIN\DaiichiTravel\src"
found = []
for root, dirs, files in os.walk(travel_src):
    for f in files:
        if f.endswith(('.ts', '.tsx')):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                txt = fp.read()
                if any(k in txt for k in ['Royal', 'Junior', 'Deluxe', 'Executive', 'Senior', 'Premium']) and 'suite' in txt.lower():
                    found.append((p, f))

print("Files in DaiichiTravel mentioning suites:")
for p, f in found:
    print(f, p)
