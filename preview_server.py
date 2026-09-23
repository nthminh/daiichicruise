import os
import sys
import json
import time
import subprocess
import posixpath
import urllib.request
import urllib.error
from urllib.parse import unquote, urlparse
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

# Set UTF-8 encoding
os.environ["PYTHONIOENCODING"] = "utf-8"
try:
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='backslashreplace')
    if hasattr(sys.stderr, 'reconfigure'):
        sys.stderr.reconfigure(encoding='utf-8', errors='backslashreplace')
except Exception:
    pass

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

ROUTE_MAP = {
    '/': 'hub.html',
    '/hub': 'hub.html',
    '/home': 'index.html',
    '/booking': 'customer/Daiichi Travel.html',
    '/customer': 'customer/Daiichi Travel.html',
    '/admin': 'admin/Daiichi Back Office.html',
    '/backoffice': 'admin/Daiichi Back Office.html',
    '/apps': 'apps/Mobile Apps.html',
    '/mobile': 'apps/Mobile Apps.html',
    '/policy': 'customer/Chính sách & Điều khoản.html',
    '/terms': 'customer/Chính sách & Điều khoản.html',
    '/handoff': 'design_handoff_daiichi_gd1/Handoff - Đặc tả kỹ thuật.html',
    '/checklist': 'Go-live Checklist.html',
    '/audit': 'Audit v4 - Tự phục vụ & Doanh thu.html',
    '/tests': 'Báo cáo phủ kiểm thử.html'
}

class DaiichiPreviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Cache-Control', 'no-cache, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def guess_type(self, path):
        if path.endswith('.jsx'):
            return 'text/javascript'
        if path.endswith('.js'):
            return 'text/javascript'
        if path.endswith('.css'):
            return 'text/css'
        if path.endswith('.json'):
            return 'application/json'
        if path.endswith('.webp'):
            return 'image/webp'
        if path.endswith('.svg'):
            return 'image/svg+xml'
        return super().guess_type(path)

    def send_json(self, status_code, data):
        body = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.send_response(status_code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        parsed = urlparse(self.path)
        path = unquote(parsed.path)

        if path == '/api/supabase/status':
            cache_file = os.path.join(BASE_DIR, 'shared', 'supabase_data.json')
            if os.path.exists(cache_file):
                try:
                    with open(cache_file, 'r', encoding='utf-8') as f:
                        d = json.load(f)
                    return self.send_json(200, {
                        'success': True,
                        'projectId': 'vfeodqmvilchsipdsxsh',
                        'status': 'connected',
                        'counts': {
                            'routes': len(d.get('routes', [])),
                            'trips': len(d.get('trips', [])),
                            'tours': len(d.get('tours', [])),
                            'vehicles': len(d.get('vehicles', [])),
                            'stops': len(d.get('stops', []))
                        },
                        'lastUpdated': os.path.getmtime(cache_file)
                    })
                except Exception as e:
                    return self.send_json(500, {'success': False, 'error': str(e)})
            return self.send_json(200, {'success': False, 'status': 'not_synced'})

        if path == '/api/bot/status':
            try:
                req = urllib.request.Request('http://127.0.0.1:8000/api/bot/status')
                with urllib.request.urlopen(req, timeout=3) as resp:
                    data = json.loads(resp.read().decode('utf-8'))
                    return self.send_json(200, {'online': True, 'chatbot': data})
            except Exception:
                return self.send_json(200, {'online': False, 'message': 'Chatbot đang khởi động hoặc chưa chạy'})

        return super().do_GET()

    def do_POST(self):
        parsed = urlparse(self.path)
        path = unquote(parsed.path)

        if path == '/api/chat':
            content_length = int(self.headers.get('Content-Length', 0))
            body_bytes = self.rfile.read(content_length)

            def forward_chat():
                req = urllib.request.Request(
                    'http://127.0.0.1:8000/api/chat',
                    data=body_bytes,
                    headers={'Content-Type': 'application/json'}
                )
                with urllib.request.urlopen(req, timeout=35) as resp:
                    return json.loads(resp.read().decode('utf-8'))

            try:
                data = forward_chat()
                return self.send_json(200, data)
            except Exception as ex:
                # If server is not running on port 8000, attempt to auto-launch it
                chatbot_dir = r"C:\Users\ADMIN\Daiichi-AI-Chatbot"
                python_exe = os.path.join(chatbot_dir, ".venv", "Scripts", "python.exe")
                if os.path.exists(python_exe):
                    try:
                        subprocess.Popen(
                            [python_exe, "-m", "uvicorn", "app:app", "--host", "127.0.0.1", "--port", "8000"],
                            cwd=chatbot_dir,
                            creationflags=subprocess.CREATE_NEW_PROCESS_GROUP if hasattr(subprocess, 'CREATE_NEW_PROCESS_GROUP') else 0
                        )
                        time.sleep(3.5)
                        data = forward_chat()
                        return self.send_json(200, data)
                    except Exception as e2:
                        return self.send_json(500, {'success': False, 'error': f"Không thể kết nối chatbot: {e2}"})
                return self.send_json(500, {'success': False, 'error': f"Lỗi chatbot: {ex}"})

        if path == '/api/supabase/sync':
            try:
                import sync_supabase
                sync_supabase.sync()
                cache_file = os.path.join(BASE_DIR, 'shared', 'supabase_data.json')
                with open(cache_file, 'r', encoding='utf-8') as f:
                    d = json.load(f)
                return self.send_json(200, {
                    'success': True,
                    'message': 'Đồng bộ thành công từ Supabase!',
                    'counts': {
                        'routes': len(d.get('routes', [])),
                        'trips': len(d.get('trips', [])),
                        'tours': len(d.get('tours', [])),
                        'vehicles': len(d.get('vehicles', [])),
                        'stops': len(d.get('stops', []))
                    }
                })
            except Exception as e:
                return self.send_json(500, {'success': False, 'error': str(e)})

        self.send_error(404, "Endpoint not found")

    def translate_path(self, path):
        parsed = urlparse(path)
        clean_url = unquote(parsed.path)

        # Check exact route map
        stripped = clean_url.rstrip('/')
        rel_target = None
        if clean_url in ROUTE_MAP:
            rel_target = ROUTE_MAP[clean_url]
        elif stripped in ROUTE_MAP:
            rel_target = ROUTE_MAP[stripped]

        # SEO clean URL mapping: e.g. /vi/xe-ha-noi-di-cat-ba -> seo/vi/xe-ha-noi-di-cat-ba.html
        if not rel_target:
            parts = [p for p in clean_url.strip('/').split('/') if p]
            if len(parts) == 2 and parts[0] in ['vi', 'en', 'ja', 'ko', 'zh', 'fr']:
                candidate = os.path.join(BASE_DIR, 'seo', parts[0], parts[1] + '.html')
                if os.path.exists(candidate):
                    return candidate

        if rel_target:
            return os.path.join(BASE_DIR, os.path.normpath(rel_target))

        # Check subdirectories fallback (customer, admin, apps, shared)
        rel_clean = clean_url.lstrip('/')
        for sub in ['customer', 'admin', 'apps', 'shared']:
            sub_candidate = os.path.join(BASE_DIR, sub, rel_clean)
            if os.path.exists(sub_candidate):
                return sub_candidate

        # Default path resolution
        return super().translate_path(path)

def run_server():
    server_address = ('0.0.0.0', PORT)
    httpd = ThreadingHTTPServer(server_address, DaiichiPreviewHandler)
    print("=" * 65)
    print(f"🌟 Daiichi Cruise Preview Server đang chạy tại:")
    print(f"👉 Hub điều hướng tổng quan: http://localhost:{PORT}/")
    print(f"👉 Trang chủ Marketing:      http://localhost:{PORT}/home")
    print(f"👉 Web Khách hàng (Booking): http://localhost:{PORT}/booking")
    print(f"👉 Back Office Quản trị:     http://localhost:{PORT}/admin")
    print(f"👉 Bộ 4 Mobile Apps:         http://localhost:{PORT}/apps")
    print(f"👉 SEO Landing pages:        http://localhost:{PORT}/vi/xe-ha-noi-di-cat-ba")
    print("=" * 65)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Dừng preview server...")
        httpd.shutdown()

if __name__ == '__main__':
    run_server()
