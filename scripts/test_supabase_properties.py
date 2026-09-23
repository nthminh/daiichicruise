import urllib.request, json

SUPABASE_URL = "https://vfeodqmvilchsipdsxsh.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmZW9kcW12aWxjaHNpcGRzeHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyNzk0MzksImV4cCI6MjA5MDg1NTQzOX0.FAorniExT887KO4SQhmFO7BX_e99FfvEBZzCM_2Sits"

tables = ['properties', 'property_room_types', 'property_rooms', 'bookings']
for tbl in tables:
    try:
        url = f"{SUPABASE_URL}/rest/v1/{tbl}?select=*&limit=10"
        req = urllib.request.Request(url, headers={
            "apikey": SUPABASE_KEY,
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "application/json"
        })
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            print(f"Table [{tbl}]: {len(data)} rows returned")
            if data:
                print("  Sample row keys:", list(data[0].keys()))
                if tbl == 'properties':
                    for p in data:
                        print("  - Property:", p.get('name'), p.get('type'))
                elif tbl == 'property_room_types':
                    for rt in data:
                        print("  - Room Type:", rt.get('name'), "basePrice:", rt.get('base_price') or rt.get('basePrice'), "capacity:", rt.get('capacity_adults') or rt.get('capacityAdults'))
    except Exception as e:
        print(f"Table [{tbl}] failed: {e}")
