import subprocess
import json
import os
import sys

notebook_id = "93398acf-323e-4d28-b7b3-84ca6bce32ec"

ideas = [
    ("01_Eco_City_Base", "Write a professional homepage copy (both English and Korean) for 'Eco-City Base', targeting B2G overseas municipalities for flood prevention and smart city infrastructure using our permeable paving blocks. Include a catchy headline, introduction, 3 key benefits, and a call to action."),
    ("02_Climate_Resilient_Infra", "Write a professional homepage copy (both English and Korean) for 'Climate-Resilient Infrastructure', targeting southeast asia and coastal nations. Focus on strong drainage performance preventing typhoons and heavy rain floods using our permeable paving blocks. Include headline, intro, 3 features, and CTA."),
    ("03_Premium_Green_Landscaping", "Write a professional homepage copy (English and Korean) for 'Premium Green Landscaping', targeting luxury resorts and private estates. Focus on high-end eco-friendly landscaping material that blends with nature. Include headline, intro, 3 features, and CTA."),
    ("04_ESG_Corporate_Parking", "Write a professional homepage copy (English and Korean) for 'ESG Corporate Parking Solutions', targeting global corporations and malls. Focus on achieving corporate water resource protection and ESG metrics simply by replacing parking lot materials with our permeable blocks. Include headline, intro, 3 features, CTA."),
    ("05_Safe_Dry_School_Zones", "Write a professional homepage copy (English and Korean) for 'Safe & Dry School Zones', targeting overseas educational institutions and residential developers. Focus on slip-free, puddle-free safe walking environments even on rainy days. Include headline, intro, 3 features, CTA."),
    ("06_Industrial_Heavy_Duty", "Write a professional homepage copy (English and Korean) for 'Industrial Heavy-Duty Permeable', targeting logistics centers and ports. Focus on heavy load bearing capacity while preventing surface flooding. Include headline, intro, 3 features, CTA."),
    ("07_Rainwater_Harvesting_Driveways", "Write a professional homepage copy (English and Korean) for 'Rainwater Harvesting Driveways', targeting North American/European luxury home builders. Focus on returning rainwater to the ground to preserve aquifers. Include headline, intro, 3 features, CTA."),
    ("08_Winter_Safe_Paths", "Write a professional homepage copy (English and Korean) for 'Winter-Safe Anti-Freezing Paths', targeting cold regions like Northern Europe/Canada. Focus on immediate water drainage preventing black ice. Include headline, intro, 3 features, CTA."),
    ("09_Eco_Trails", "Write a professional homepage copy (English and Korean) for 'Park & Recreation Eco-Trails', targeting national parks. Focus on eco-friendly trails that do not harm the ecosystem and allow natural water infiltration. Include headline, intro, 3 features, CTA."),
    ("10_Sustainable_Urban_Renewal", "Write a professional homepage copy (English and Korean) for 'Sustainable Urban Renewal', targeting global construction companies doing old city renewal. Focus on revitalizing old drainage systems with eco-friendly paving. Include headline, intro, 3 features, CTA.")
]

process = subprocess.Popen(
    [r'C:\\Users\\User\\AppData\\Roaming\\Python\\Python314\\Scripts\\notebooklm-mcp.exe'],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True,
    bufsize=1
)

def send_request(method, params=None, req_id=1):
    req = {"jsonrpc": "2.0", "id": req_id, "method": method, "params": params or {}}
    process.stdin.write(json.dumps(req) + "\\n")
    process.stdin.flush()
    while True:
        line = process.stdout.readline()
        if not line: return None
        try:
            resp = json.loads(line.strip())
            if resp.get("id") == req_id:
                return resp
        except:
            pass

send_request("initialize", {"protocolVersion": "2024-11-05", "capabilities": {}, "clientInfo": {"name": "test", "version": "1.0.0"}}, req_id=1)
process.stdin.write(json.dumps({"jsonrpc": "2.0", "method": "notifications/initialized"}) + "\\n")
process.stdin.flush()

for i, (folder, prompt) in enumerate(ideas):
    print(f"Generating content for {folder}...")
    req_id = i + 10
    resp = send_request("tools/call", {
        "name": "notebook_query", 
        "arguments": {"notebook_id": notebook_id, "query": prompt}
    }, req_id=req_id)
    
    try:
        content = resp['result']['content'][0]['text']
        with open(os.path.join(folder, "content.md"), "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Saved {folder}/content.md")
    except Exception as e:
        print(f"Error fetching {folder}: {e}")

process.kill()
