import subprocess
import json
import os

SOURCE_NOTEBOOK_ID = "93398acf-323e-4d28-b7b3-84ca6bce32ec"
NLM_BIN = r"C:\Users\User\AppData\Roaming\Python\Python314\Scripts\nlm.exe"

projects = [
    ("01_Eco_City_Base", "01. Eco-City Base Project", "Write a professional homepage copy (both English and Korean) for 'Eco-City Base', targeting B2G overseas municipalities for flood prevention and smart city infrastructure. CRITICAL REQUIREMENT: You MUST emphasize our unique technology of using 'Coal Bottom Ash' (바텀애시) combined with special concrete mixing to achieve both ultra-high strength AND long-term 3-10 year permeability without clogging, which is essential for Asian concrete environments. Include a catchy headline, introduction, 3 key benefits (highlighting the bottom ash tech), and a call to action."),
    ("02_Climate_Resilient_Infra", "02. Climate-Resilient Infra", "Write a professional homepage copy (both English and Korean) for 'Climate-Resilient Infrastructure', targeting southeast asia and coastal nations experiencing heavy rains. CRITICAL REQUIREMENT: You MUST emphasize our unique technology of using 'Coal Bottom Ash' (바텀애시) to achieve both ultra-high strength AND long-term 3-10 year permeability without clogging, solving the chronic issue of Asian concrete pavements. Include headline, intro, 3 features (highlighting the bottom ash), and CTA."),
    ("03_Premium_Green_Landscaping", "03. Premium Green Landscaping", "Write a professional homepage copy (English and Korean) for 'Premium Green Landscaping', targeting luxury resorts and private estates. CRITICAL REQUIREMENT: You MUST emphasize our unique technology of using 'Coal Bottom Ash' (바텀애시) to achieve both ultra-high strength AND long-term 3-10 year permeability without clogging, ensuring beautiful and functional landscapes that don't flood over time. Include headline, intro, 3 features, and CTA."),
    ("04_ESG_Corporate_Parking", "04. ESG Corporate Parking", "Write a professional homepage copy (English and Korean) for 'ESG Corporate Parking Solutions', targeting global corporations and malls. CRITICAL REQUIREMENT: You MUST emphasize our unique technology of using 'Coal Bottom Ash' (바텀애시) to achieve both ultra-high strength (to handle vehicle weight) AND long-term 3-10 year permeability without clogging. Include headline, intro, 3 features, CTA."),
    ("05_Safe_Dry_School_Zones", "05. Safe & Dry School Zones", "Write a professional homepage copy (English and Korean) for 'Safe & Dry School Zones', targeting overseas educational institutions. CRITICAL REQUIREMENT: You MUST emphasize our unique technology of using 'Coal Bottom Ash' (바텀애시) to achieve both ultra-high strength AND long-term 3-10 year permeability without clogging, ensuring safe, puddle-free zones for years. Include headline, intro, 3 features, CTA."),
    ("06_Industrial_Heavy_Duty", "06. Industrial Heavy-Duty", "Write a professional homepage copy (English and Korean) for 'Industrial Heavy-Duty Permeable', targeting logistics centers and ports. CRITICAL REQUIREMENT: You MUST emphasize our unique technology of using 'Coal Bottom Ash' (바텀애시) to achieve ultra-high strength capable of bearing heavy machinery, AND long-term 3-10 year permeability without clogging. Include headline, intro, 3 features, CTA."),
    ("07_Rainwater_Harvesting_Driveways", "07. Rainwater Harvesting Driveways", "Write a professional homepage copy (English and Korean) for 'Rainwater Harvesting Driveways', targeting North American/European luxury home builders. CRITICAL REQUIREMENT: You MUST emphasize our unique technology of using 'Coal Bottom Ash' (바텀애시) to achieve both ultra-high strength AND long-term 3-10 year permeability without clogging for reliable rainwater harvesting. Include headline, intro, 3 features, CTA."),
    ("08_Winter_Safe_Paths", "08. Winter-Safe Paths", "Write a professional homepage copy (English and Korean) for 'Winter-Safe Anti-Freezing Paths', targeting cold regions like Northern Europe/Canada. CRITICAL REQUIREMENT: You MUST emphasize our unique technology of using 'Coal Bottom Ash' (바텀애시) to achieve both ultra-high strength AND long-term 3-10 year permeability without clogging, which is crucial for preventing water buildup and subsequent freezing (black ice). Include headline, intro, 3 features, CTA."),
    ("09_Eco_Trails", "09. Eco-Trails", "Write a professional homepage copy (English and Korean) for 'Park & Recreation Eco-Trails', targeting national parks. CRITICAL REQUIREMENT: You MUST emphasize our unique technology of using 'Coal Bottom Ash' (바텀애시) to achieve both ultra-high strength AND long-term 3-10 year permeability without clogging, providing sustainable paths that outlast standard options. Include headline, intro, 3 features, CTA."),
    ("10_Sustainable_Urban_Renewal", "10. Sustainable Urban Renewal", "Write a professional homepage copy (English and Korean) for 'Sustainable Urban Renewal', targeting global construction companies doing old city renewal. CRITICAL REQUIREMENT: You MUST emphasize our unique technology of using 'Coal Bottom Ash' (바텀애시) to achieve both ultra-high strength AND long-term 3-10 year permeability without clogging, solving urban drainage problems permanently. Include headline, intro, 3 features, CTA.")
]

for folder_name, title, prompt in projects:
    print(f"\n=====================================")
    print(f"Generating USP Content for: {title}")
    
    cmd_query = [NLM_BIN, "query", "notebook", SOURCE_NOTEBOOK_ID, prompt]
    res_query = subprocess.run(cmd_query, capture_output=True, text=True, encoding="utf-8")
    
    try:
        query_json = json.loads(res_query.stdout)
        copywriting_text = query_json.get("value", {}).get("answer", "")
    except Exception as e:
        print(f"Failed to parse query output. Error: {e}")
        copywriting_text = "Failed to generate content."
        
    if not copywriting_text:
        copywriting_text = "No content generated."
        
    try:
        content_path = os.path.join(r"C:\Users\User\.gemini\noteLM-Anti -notion 3.3.26년", folder_name, "content.md")
        with open(content_path, "w", encoding="utf-8") as f:
            f.write(copywriting_text)
        print(f"-> Saved USP content to {content_path}")
    except Exception as e:
        print(f"Could not write to {content_path}: {e}")

print("\nAll 10 NotebookLM queries completed with the USP injection.")
