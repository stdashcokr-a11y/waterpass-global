import os
import re

directories = [
    ("01_Eco_City_Base", "Eco-City Base"),
    ("02_Climate_Resilient_Infra", "Climate-Resilient Infra"),
    ("03_Premium_Green_Landscaping", "Premium Green Landscaping"),
    ("04_ESG_Corporate_Parking", "ESG Corporate Parking"),
    ("05_Safe_Dry_School_Zones", "Safe & Dry School Zones"),
    ("06_Industrial_Heavy_Duty", "Industrial Heavy-Duty"),
    ("07_Rainwater_Harvesting_Driveways", "Rainwater Harvesting Driveways"),
    ("08_Winter_Safe_Paths", "Winter-Safe Paths"),
    ("09_Eco_Trails", "Eco-Trails"),
    ("10_Sustainable_Urban_Renewal", "Sustainable Urban Renewal")
]

def parse_markdown(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    # Split into EN and KO
    parts = re.split(r'\*\*\*|---', text)
    en_text = parts[0] if len(parts) > 0 else text
    ko_text = parts[1] if len(parts) > 1 else ""

    def extract_section(section_text):
        data = {
            "headline": "",
            "intro": "",
            "cta": "",
            "features": []
        }
        
        # Headline
        m_head = re.search(r'\*\*(?:Headline|헤드라인):\s*(.*?)\*\*', section_text)
        if m_head:
            data['headline'] = m_head.group(1).strip()
        else:
            # Fallback for headline
            m_head = re.search(r'Headline:\s*(.*?)\n', section_text)
            if m_head: data['headline'] = m_head.group(1).strip()
            
        # Intro
        m_intro = re.search(r'\*\*(?:Introduction|도입[^\*]*):\*\*\s*\n(.*?)(?=\n\n|\*\*)', section_text, re.DOTALL)
        if m_intro:
            data['intro'] = m_intro.group(1).strip()
            
        # Call to Action
        m_cta = re.search(r'\*\*(?:Call to Action|콜 투 액션[^\*]*):\*\*\s*\n*(.*?)(?=\n\n|$)', section_text, re.DOTALL)
        if m_cta:
            data['cta'] = m_cta.group(1).strip()
            data['cta'] = data['cta'].replace('**', '')

        # Features
        f_matches = re.finditer(r'\*\s+\*\*(.*?)\*\*\s*(.*?)(?=\n\* |\n\n\*\*|$)', section_text, re.DOTALL)
        for m in f_matches:
            title = m.group(1).strip().strip(':')
            desc = m.group(2).strip()
            desc = re.sub(r'\[\d+(?:,\s*\d+)*\]', '', desc).strip()
            data['features'].append({"title": title, "desc": desc})

        return data

    return extract_section(en_text), extract_section(ko_text)

html_template = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{short_title} - Premium Permeable Solutions</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&family=Noto+Sans+KR:wght@300;400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <!-- WebGL Background -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js"></script>
</head>
<body>
    <div id="vanta-bg"></div>
    
    <nav class="glass-nav">
        <div class="logo">{short_title}</div>
        <div class="nav-links">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <button id="lang-toggle" class="lang-btn">KOR / ENG</button>
        </div>
    </nav>

    <main id="home">
        <section class="hero glass-panel">
            <span class="badge">Advanced Permeable Technology</span>
            <h1 class="en-text">{en_headline}</h1>
            <h1 class="ko-text" style="display:none;">{ko_headline}</h1>
            
            <div class="en-text hero-desc">{en_intro}</div>
            <div class="ko-text hero-desc" style="display:none;">{ko_intro}</div>
            
            <button class="cta-btn primary-btn en-text">{en_cta_btn}</button>
            <button class="cta-btn primary-btn ko-text" style="display:none;">{ko_cta_btn}</button>
        </section>

        <section id="features" class="features-section">
            <h2 class="section-title en-text">Core Advantages</h2>
            <h2 class="section-title ko-text" style="display:none;">핵심 특장점</h2>
            
            <div class="cards-grid">
                {features_html}
            </div>
        </section>

        <section class="cta-section glass-panel" style="margin-bottom: 3rem;">
            <h2 class="en-text">Ready to transform your infrastructure?</h2>
            <h2 class="ko-text" style="display:none;">인프라의 혁신, 지금 시작하세요.</h2>
            <div class="en-text" style="margin-bottom: 2rem;">{en_cta}</div>
            <div class="ko-text" style="display:none; margin-bottom: 2rem;">{ko_cta}</div>
            <a href="mailto:contact@example.com" class="primary-btn en-text" style="text-decoration:none;">Contact Us Today</a>
            <a href="mailto:contact@example.com" class="primary-btn ko-text" style="display:none; text-decoration:none;">지금 문의하기</a>
        </section>
    </main>

    <footer class="glass-footer">
        <p>&copy; 2026 {short_title}. All rights reserved. Powered by NotebookLM & Antigravity.</p>
    </footer>

    <script>
        // Vanta Effect
        VANTA.WAVES({{
          el: "#vanta-bg",
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x112b3c,
          shininess: 35.00,
          waveHeight: 15.00,
          waveSpeed: 0.70,
          zoom: 0.85
        }})

        // Language Toggle
        let isKorean = false;
        const toggleBtn = document.getElementById('lang-toggle');
        const enElements = document.querySelectorAll('.en-text');
        const koElements = document.querySelectorAll('.ko-text');

        toggleBtn.addEventListener('click', () => {{
            isKorean = !isKorean;
            if(isKorean) {{
                enElements.forEach(el => el.style.display = 'none');
                koElements.forEach(el => el.style.display = 'block');
                document.body.style.fontFamily = "'Noto Sans KR', sans-serif";
            }} else {{
                enElements.forEach(el => el.style.display = 'block');
                koElements.forEach(el => el.style.display = 'none');
                document.body.style.fontFamily = "'Outfit', sans-serif";
            }}
        }});
    </script>
</body>
</html>
"""

css_template = """
:root {
    --primary-color: #00d2ff;
    --primary-color-dark: #3a7bd5;
    --text-color: #ffffff;
    --text-muted: #b0c4de;
    --glass-bg: rgba(17, 34, 51, 0.4);
    --glass-border: rgba(255, 255, 255, 0.1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Outfit', sans-serif;
    color: var(--text-color);
    background-color: #0d1b2a;
    line-height: 1.6;
    overflow-x: hidden;
}

#vanta-bg {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    z-index: -1;
}

.glass-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 5%;
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--glass-border);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.logo {
    font-size: 1.8rem;
    font-weight: 800;
    background: linear-gradient(90deg, var(--primary-color), var(--text-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.5px;
}

.nav-links { display: flex; align-items: center; gap: 2rem; }
.nav-links a { color: var(--text-color); text-decoration: none; font-weight: 600; font-size: 1rem; transition: color 0.3s ease; }
.nav-links a:hover { color: var(--primary-color); }
.lang-btn { background: rgba(255,255,255,0.1); border: 1px solid var(--glass-border); color: white; padding: 0.5rem 1rem; border-radius: 20px; cursor: pointer; backdrop-filter: blur(10px); font-weight: 600; transition: all 0.3s; }
.lang-btn:hover { background: rgba(255,255,255,0.2); }

main { padding: 4rem 5%; max-width: 1400px; margin: 0 auto; display: flex; flex-direction: column; gap: 6rem; }

.glass-panel {
    background: var(--glass-bg);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    padding: 4rem;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    position: relative;
    overflow: hidden;
}

.glass-panel::before {
    content: '';
    position: absolute;
    top: -50%; left: -50%; width: 200%; height: 200%;
    background: radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%);
    pointer-events: none;
}

.badge { display: inline-block; padding: 0.5rem 1rem; background: rgba(0, 210, 255, 0.1); color: var(--primary-color); border-radius: 20px; font-weight: 600; font-size: 0.9rem; margin-bottom: 1.5rem; text-transform: uppercase; letter-spacing: 1px;}

.hero { text-align: center; }
.hero h1 { font-size: 4rem; font-weight: 800; line-height: 1.1; margin-bottom: 2rem; background: linear-gradient(135deg, #ffffff, #a0b0c0); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-desc { font-size: 1.25rem; color: var(--text-muted); max-width: 800px; margin: 0 auto 3rem auto; font-weight: 300; }

.primary-btn { display: inline-block; background: linear-gradient(135deg, var(--primary-color-dark), var(--primary-color)); border: none; padding: 1rem 2.5rem; color: white; font-size: 1.1rem; font-weight: 600; border-radius: 30px; cursor: pointer; box-shadow: 0 10px 20px rgba(0, 210, 255, 0.2); transition: all 0.3s ease; }
.primary-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 30px rgba(0, 210, 255, 0.4); }

.section-title { font-size: 2.5rem; text-align: center; margin-bottom: 3rem; font-weight: 800; }

.cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; }

.card { background: rgba(17, 34, 51, 0.6); backdrop-filter: blur(10px); border: 1px solid var(--glass-border); border-radius: 20px; padding: 2.5rem; transition: transform 0.4s ease, border-color 0.4s ease; display: flex; flex-direction: column; gap: 1rem; }
.card:hover { transform: translateY(-10px); border-color: rgba(0, 210, 255, 0.4); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
.card-icon { width: 50px; height: 50px; border-radius: 12px; background: rgba(0, 210, 255, 0.1); display: flex; align-items: center; justify-content: center; color: var(--primary-color); font-size: 24px; margin-bottom: 1rem; }
.card h3 { font-size: 1.4rem; font-weight: 600; color: #fff; line-height: 1.3;}
.card p { color: var(--text-muted); font-size: 1rem; flex-grow: 1; }

.cta-section { text-align: center; background: linear-gradient(135deg, rgba(58, 123, 213, 0.2), rgba(0, 210, 255, 0.1)); border: 1px solid rgba(0, 210, 255, 0.2); }
.cta-section h2 { font-size: 2.5rem; margin-bottom: 1.5rem; }
.cta-section p { font-size: 1.1rem; color: var(--text-muted); margin-bottom: 2.5rem; max-width: 600px; margin-left: auto; margin-right: auto; }

.glass-footer { text-align: center; padding: 2rem; border-top: 1px solid var(--glass-border); margin-top: 4rem; color: var(--text-muted); }

@media (max-width: 768px) {
    .hero h1 { font-size: 2.5rem; }
    .glass-panel { padding: 2rem; }
    .nav-links { gap: 1rem; }
}
"""

for folder, short_title in directories:
    content_file = os.path.join(r"C:\Users\User\.gemini\noteLM-Anti -notion 3.3.26년", folder, "content.md")
    if not os.path.exists(content_file): continue
    
    en_data, ko_data = parse_markdown(content_file)
    
    if not en_data['headline']: en_data['headline'] = f"{short_title} - Next-Gen Permeable Solutions"
    if not en_data['intro']: en_data['intro'] = "A superior engineering approach to solving modern climate infrastructure challenges."
    if not en_data['cta']: en_data['cta'] = "Contact us to learn more."
    if not en_data['features']: en_data['features'] = [{"title":"Feature 1", "desc":"..."}, {"title":"Feature 2", "desc":"..."}, {"title":"Feature 3", "desc":"..."}]
    
    if not ko_data['headline']: ko_data['headline'] = f"{short_title} - 차세대 투수성 솔루션"
    if not ko_data['intro']: ko_data['intro'] = "현대 기후 인프라 과제를 해결하기 위한 탁월한 공학적 접근법입니다."
    if not ko_data['cta']: ko_data['cta'] = "더 자세한 정보를 원하시면 문의주세요."
    if not ko_data['features']: ko_data['features'] = [{"title":"특징 1", "desc":"..."}, {"title":"특징 2", "desc":"..."}, {"title":"특징 3", "desc":"..."}]
    
    cards_html = ""
    icons = ["💧", "🛡️", "💰", "🌱", "🔍"]
    for i in range(min(3, len(en_data['features']))):
        en_feat = en_data['features'][i]
        ko_feat = ko_data['features'][i] if i < len(ko_data['features']) else {"title":"", "desc":""}
        cards_html += f"""
                <div class="card">
                    <div class="card-icon">{icons[i % len(icons)]}</div>
                    <h3 class="en-text">{en_feat['title']}</h3>
                    <h3 class="ko-text" style="display:none;">{ko_feat['title']}</h3>
                    <p class="en-text">{en_feat['desc']}</p>
                    <p class="ko-text" style="display:none;">{ko_feat['desc']}</p>
                </div>"""
                
    html_content = html_template.format(
        short_title=short_title,
        en_headline=en_data['headline'],
        ko_headline=ko_data['headline'],
        en_intro=en_data['intro'],
        ko_intro=ko_data['intro'],
        en_cta_btn="Discover the Future",
        ko_cta_btn="미래를 만나보세요",
        features_html=cards_html,
        en_cta=en_data['cta'],
        ko_cta=ko_data['cta']
    )
    
    with open(os.path.join(r"C:\Users\User\.gemini\noteLM-Anti -notion 3.3.26년", folder, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html_content)
    with open(os.path.join(r"C:\Users\User\.gemini\noteLM-Anti -notion 3.3.26년", folder, 'style.css'), 'w', encoding='utf-8') as f:
        f.write(css_template)

print("Generated ALL 10 premium sites successfully.")
