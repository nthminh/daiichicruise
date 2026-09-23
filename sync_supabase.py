import os
import sys
import json
import urllib.request

# Force UTF-8 output
sys.stdout.reconfigure(encoding='utf-8', errors='backslashreplace')

SUPABASE_URL = "https://vfeodqmvilchsipdsxsh.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmZW9kcW12aWxjaHNpcGRzeHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyNzk0MzksImV4cCI6MjA5MDg1NTQzOX0.FAorniExT887KO4SQhmFO7BX_e99FfvEBZzCM_2Sits"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def fetch_table(table_name):
    url = f"{SUPABASE_URL}/rest/v1/{table_name}?select=*"
    req = urllib.request.Request(
        url,
        headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json"
        }
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))

def sync():
    print("=" * 60)
    print("🚀 Bắt đầu đồng bộ dữ liệu từ Supabase (Project ID: vfeodqmvilchsipdsxsh)...")
    print("=" * 60)

    tables = [
        "routes", "trips", "tours", "vehicles", "stops",
        "properties", "property_room_types", "property_rooms", "bookings"
    ]
    synced_data = {}

    for tbl in tables:
        try:
            items = fetch_table(tbl)
            synced_data[tbl] = items
            print(f"✅ Đã tải bảng [{tbl}]: {len(items)} bản ghi")
        except Exception as e:
            print(f"❌ Lỗi tải bảng [{tbl}]: {e}")
            synced_data[tbl] = []

    # Print summary of routes
    print("\n--- DANH SÁCH TUYẾN BUS TRÊN SUPABASE ---")
    for r in synced_data["routes"]:
        name = r.get("name") or "Tuyến không tên"
        price = r.get("price") or 0
        dep = r.get("departure_point") or ""
        arr = r.get("arrival_point") or ""
        print(f"• [{r.get('id')}] {name} | Giá: {price:,.0f}đ | {dep} => {arr}")

    # Print summary of tours
    print("\n--- DANH SÁCH TOURS / DU THUYỀN TRÊN SUPABASE ---")
    for t in synced_data["tours"]:
        title = t.get("title") or "Tour không tên"
        price = t.get("price") or t.get("price_adult") or 0
        dur = t.get("duration") or ""
        print(f"• [{t.get('id')}] {title} | Giá: {price:,.0f}đ | Thời lượng: {dur}")

    # Print summary of property room types (cabin suites)
    print("\n--- DANH SÁCH HẠNG PHÒNG DU THUYỀN (CABIN SUITES) TRÊN SUPABASE ---")
    for rt in synced_data["property_room_types"]:
        name = rt.get("name") or "Hạng phòng"
        base_p = rt.get("base_price") or rt.get("basePrice") or 0
        cap_a = rt.get("capacity_adults") or rt.get("capacityAdults") or 2
        area = rt.get("area_sqm") or rt.get("areaSqm") or 0
        units = rt.get("total_units") or rt.get("totalUnits") or 0
        print(f"• [{rt.get('id')}] {name} | Giá gốc: {base_p:,.0f}đ | Sức chứa: {cap_a} người | Diện tích: {area}m² | Số phòng: {units}")

    # Save to shared/supabase_data.json
    out_file = os.path.join(BASE_DIR, "shared", "supabase_data.json")
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(synced_data, f, ensure_ascii=False, indent=2)
    print(f"\n💾 Đã lưu dữ liệu đồng bộ vào: {out_file}")

if __name__ == "__main__":
    sync()
