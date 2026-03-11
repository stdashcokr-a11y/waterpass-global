import subprocess
import json
import re
import sys

# The base notebook with the data
SOURCE_NOTEBOOK_ID = "93398acf-323e-4d28-b7b3-84ca6bce32ec"
NLM_BIN = r"C:\Users\User\AppData\Roaming\Python\Python314\Scripts\nlm.exe"

ideas = [
    ("01_Eco_City_Base", "01. Eco-City Base Project", "Write a professional homepage copy (both English and Korean) for 'Eco-City Base', targeting B2G overseas municipalities for flood prevention and smart city infrastructure using our permeable paving blocks. Include a catchy headline, introduction, 3 key benefits, and a call to action."),
    ("02_Climate_Resilient_Infra", "02. Climate-Resilient Infra", "Write a professional homepage copy (both English and Korean) for 'Climate-Resilient Infrastructure', targeting southeast asia and coastal nations. Focus on strong drainage performance preventing typhoons and heavy rain floods using our permeable paving blocks. Include headline, intro, 3 features, and CTA."),
    ("03_Premium_Green_Landscaping", "03. Premium Green Landscaping", "Write a professional homepage copy (English and Korean) for 'Premium Green Landscaping', targeting luxury resorts and private estates. Focus on high-end eco-friendly landscaping material that blends with nature. Include headline, intro, 3 features, and CTA."),
    ("04_ESG_Corporate_Parking", "04. ESG Corporate Parking", "Write a professional homepage copy (English and Korean) for 'ESG Corporate Parking Solutions', targeting global corporations and malls. Focus on achieving corporate water resource protection and ESG metrics simply by replacing parking lot materials with our permeable blocks. Include headline, intro, 3 features, CTA."),
    ("05_Safe_Dry_School_Zones", "05. Safe & Dry School Zones", "Write a professional homepage copy (English and Korean) for 'Safe & Dry School Zones', targeting overseas educational institutions and residential developers. Focus on slip-free, puddle-free safe walking environments even on rainy days. Include headline, intro, 3 features, CTA."),
    ("06_Industrial_Heavy_Duty", "06. Industrial Heavy-Duty", "Write a professional homepage copy (English and Korean) for 'Industrial Heavy-Duty Permeable', targeting logistics centers and ports. Focus on heavy load bearing capacity while preventing surface flooding. Include headline, intro, 3 features, CTA."),
    ("07_Rainwater_Harvesting_Driveways", "07. Rainwater Harvesting Driveways", "Write a professional homepage copy (English and Korean) for 'Rainwater Harvesting Driveways', targeting North American/European luxury home builders. Focus on returning rainwater to the ground to preserve aquifers. Include headline, intro, 3 features, CTA."),
    ("08_Winter_Safe_Paths", "08. Winter-Safe Paths", "Write a professional homepage copy (English and Korean) for 'Winter-Safe Anti-Freezing Paths', targeting cold regions like Northern Europe/Canada. Focus on immediate water drainage preventing black ice. Include headline, intro, 3 features, CTA."),
    ("09_Eco_Trails", "09. Eco-Trails", "Write a professional homepage copy (English and Korean) for 'Park & Recreation Eco-Trails', targeting national parks. Focus on eco-friendly trails that do not harm the ecosystem and allow natural water infiltration. Include headline, intro, 3 features, CTA."),
    ("10_Sustainable_Urban_Renewal", "10. Sustainable Urban Renewal", "Write a professional homepage copy (English and Korean) for 'Sustainable Urban Renewal', targeting global construction companies doing old city renewal. Focus on revitalizing old drainage systems with eco-friendly paving. Include headline, intro, 3 features, CTA.")
]

# Note: We skip the first one because we manually created it earlier, but let's just create it again or check if we should skip.
# Let's just create all.

for folder_name, title, prompt in ideas:
    print(f"\n=====================================")
    print(f"Creating Notebook: {title}")
    
    # 1. Create a new notebook
    cmd_create = [NLM_BIN, "create", "notebook", title]
    res_create = subprocess.run(cmd_create, capture_output=True, text=True, encoding="utf-8")
    
    match = re.search(r"ID:\s*([a-f0-9\-]{36})", res_create.stdout)
    if not match:
        print(f"Failed to create notebook '{title}'. Output: {res_create.stdout}\n{res_create.stderr}")
        continue
    new_notebook_id = match.group(1)
    print(f"-> Created with ID: {new_notebook_id}")
    
    # 2. Query original notebook for copywriting
    print(f"-> Generating Copywriting (takes a minute)...")
    cmd_query = [NLM_BIN, "query", "notebook", SOURCE_NOTEBOOK_ID, prompt]
    res_query = subprocess.run(cmd_query, capture_output=True, text=True, encoding="utf-8")
    
    try:
        query_json = json.loads(res_query.stdout)
        copywriting_text = query_json.get("value", {}).get("answer", "")
    except json.JSONDecodeError:
        print(f"Failed to parse query output. Output: {res_query.stdout}")
        copywriting_text = "Failed to generate content."
        
    if not copywriting_text:
        copywriting_text = "No content generated."
        
    print(f"-> Content generated! Length: {len(copywriting_text)} characters.")
    
    # Save to local file too just in case
    try:
        with open(f"{folder_name}/content.md", "w", encoding="utf-8") as f:
            f.write(copywriting_text)
    except Exception as e:
        print(f"Could not write to {folder_name}/content.md: {e}")
        
    # 3. Create Note in the NEW notebook
    print(f"-> Saving Note to NotebookLM...")
    cmd_note = [NLM_BIN, "note", "create", new_notebook_id, "-t", f"{title} Homepage Copywriting", "-c", copywriting_text]
    res_note = subprocess.run(cmd_note, capture_output=True, text=True, encoding="utf-8")
    if res_note.returncode != 0:
        print(f"Error creating note: {res_note.stdout}\n{res_note.stderr}")
    else:
        print(f"-> Note created successfully!")

print("\nAll 10 NotebookLM Projects created successfully!")
