import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

FILE_PATH = r"C:\Users\ADMIN\DaiichiTravel\src\App.tsx"

if not os.path.exists(FILE_PATH):
    print(f"❌ File not found: {FILE_PATH}")
    sys.exit(1)

with open(FILE_PATH, "r", encoding="utf-8") as f:
    content = f.read()

target1 = "  const [activeTab, setActiveTab] = useState('home');"
replacement1 = """  const [activeTab, setActiveTab] = useState<string>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab) return tab;
    } catch {}
    return 'home';
  });"""

target2 = "  const [routeCategoryFilter, setRouteCategoryFilter] = useState<string>('');"
replacement2 = """  const [routeCategoryFilter, setRouteCategoryFilter] = useState<string>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('category') || '';
    } catch {
      return '';
    }
  });"""

target3 = """  const [pickupPoint, setPickupPoint] = useState('');
  const [dropoffPoint, setDropoffPoint] = useState('');"""
replacement3 = """  const [pickupPoint, setPickupPoint] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('from') || '';
    } catch { return ''; }
  });
  const [dropoffPoint, setDropoffPoint] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('to') || '';
    } catch { return ''; }
  });"""

if target1 not in content:
    print("⚠️ Target 1 already patched or not found")
else:
    content = content.replace(target1, replacement1, 1)
    print("✅ Target 1 (activeTab URL param) patched")

if target2 not in content:
    print("⚠️ Target 2 already patched or not found")
else:
    content = content.replace(target2, replacement2, 1)
    print("✅ Target 2 (routeCategoryFilter URL param) patched")

if target3 not in content:
    print("⚠️ Target 3 already patched or not found")
else:
    content = content.replace(target3, replacement3, 1)
    print("✅ Target 3 (pickupPoint/dropoffPoint URL param) patched")

with open(FILE_PATH, "w", encoding="utf-8") as f:
    f.write(content)

print(f"🎉 Updated {FILE_PATH} successfully!")
