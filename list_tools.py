import subprocess
import json
import os

process = subprocess.Popen(
    [r'C:\\Users\\User\\AppData\\Roaming\\Python\\Python314\\Scripts\\notebooklm-mcp.exe'],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True,
    bufsize=1
)

def send_request(method, params=None):
    req = {"jsonrpc": "2.0", "id": 1, "method": method, "params": params or {}}
    process.stdin.write(json.dumps(req) + "\\n")
    process.stdin.flush()
    while True:
        line = process.stdout.readline()
        if not line: return None
        try:
            resp = json.loads(line.strip())
            if resp.get("id") == 1: return resp
        except: pass

send_request("initialize", {"protocolVersion": "2024-11-05", "capabilities": {}, "clientInfo": {"name": "test", "version": "1.0.0"}})
process.stdin.write(json.dumps({"jsonrpc": "2.0", "method": "notifications/initialized"}) + "\\n")
process.stdin.flush()

tools = send_request("tools/list")
for tool in tools.get("result", {}).get("tools", []):
    print(f"TOOL: {tool.get('name')}")
    print(f"  {tool.get('description').splitlines()[0] if tool.get('description') else ''}")

process.kill()
