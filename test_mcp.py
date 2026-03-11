import subprocess
import json
import threading
import sys

process = subprocess.Popen(
    [r'C:\\Users\\User\\AppData\\Roaming\\Python\\Python314\\Scripts\\notebooklm-mcp.exe'],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True,
    bufsize=1
)

def print_stderr():
    for line in process.stderr:
        print("ERR:", line.strip(), file=sys.stderr)

threading.Thread(target=print_stderr, daemon=True).start()

def send_request(method, params=None, is_noti=False):
    req = {
        "jsonrpc": "2.0",
        "method": method,
        "params": params or {}
    }
    if not is_noti:
        req["id"] = 1
    
    msg = json.dumps(req)
    print("SEND:", msg)
    process.stdin.write(msg + "\n")
    process.stdin.flush()
    
    if is_noti: return
    
    while True:
        line = process.stdout.readline()
        if not line:
            print("EOF")
            return None
        print("RECV:", line.strip())
        try:
            resp = json.loads(line.strip())
            if resp.get("id") == 1:
                return resp
        except Exception as e:
            print("JSON ERROR:", e)

print("Init Result:", send_request("initialize", {"protocolVersion": "2024-11-05", "capabilities": {}, "clientInfo": {"name": "test", "version": "1.0.0"}}))
send_request("notifications/initialized", is_noti=True)
print("Tools Result:", send_request("tools/list"))

process.kill()
