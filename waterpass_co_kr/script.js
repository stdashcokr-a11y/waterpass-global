document.addEventListener('DOMContentLoaded', () => {
    const btnKr = document.getElementById('btn-kr');
    const btnEn = document.getElementById('btn-en');
    const translatableElements = document.querySelectorAll('[data-lang-ko]');

    const setLanguage = (lang) => {
        translatableElements.forEach(el => {
            if (lang === 'ko') {
                el.textContent = el.getAttribute('data-lang-ko');
            } else {
                el.textContent = el.getAttribute('data-lang-en');
            }
        });

        // Toggle button states
        if (lang === 'ko') {
            btnKr.classList.add('active');
            btnEn.classList.remove('active');
            document.documentElement.lang = 'ko';
        } else {
            btnEn.classList.add('active');
            btnKr.classList.remove('active');
            document.documentElement.lang = 'en';
        }

        // Save preference
        localStorage.setItem('waterpass-lang', lang);
        
        // Re-render dynamic elements
        renderTable();
        renderVideos();
    };

    btnKr.addEventListener('click', () => setLanguage('ko'));
    btnEn.addEventListener('click', () => setLanguage('en'));

    // Initialization
    const savedLang = localStorage.getItem('waterpass-lang') || 'ko';
    setLanguage(savedLang);

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Comparison Data & Logic ---
    const comparisonData = [
        { name: { en: "ASH CONCRETE", ko: "애쉬콘크리트 (우수)" }, loc: { en: "Jeonju", ko: "전주" }, data: [15, 17, 20, 35, 74, 115, 170], grade: { en: "Excellent", ko: "우수" }, class: "score-good" },
        { name: { en: "Standard Brand A", ko: "타사 제품 A (일반)" }, loc: { en: "Jeonju", ko: "전주" }, data: [16, 20, 25, 55, 180, 250, 300], grade: { en: "Average", ko: "보통" }, class: "score-warn" },
        { name: { en: "Clogged Brand B", ko: "타사 제품 B (일반)" }, loc: { en: "Iksan", ko: "익산" }, data: [18, 25, 112, 240, null, null, null], grade: { en: "Fail", ko: "미달" }, class: "score-bad" }
    ];

    function renderTable() {
        const tbody = document.getElementById('comparison-tbody');
        if (!tbody) return;
        const lang = localStorage.getItem('waterpass-lang') || 'ko';

        tbody.innerHTML = comparisonData.map(item => `
            <tr>
                <td><strong>${item.name[lang]}</strong></td>
                <td>${item.loc[lang]}</td>
                <td>${item.data[0]}</td>
                <td>${item.data[1]}</td>
                <td>${item.data[2]}</td>
                <td><strong>${item.data[3]}</strong></td>
                <td>${item.data[4] || '-'}</td>
                <td>${item.data[5] || '-'}</td>
                <td>${item.data[6] || '-'}</td>
                <td><span class="score-badge ${item.class}">${item.grade[lang]}</span></td>
            </tr>
        `).join('');
    };

    // --- Calculator Logic ---
    const setupCalculator = () => {
        const calcBtn = document.getElementById('calc-submit-btn');
        if (!calcBtn) return;

        calcBtn.addEventListener('click', () => {
            const area = parseFloat(document.getElementById('calc-area').value) || 1000;
            const period = parseFloat(document.getElementById('calc-years').value) || 10;
            const lang = localStorage.getItem('waterpass-lang') || 'ko';

            // Constants from legacy logic
            const lifeNormal = 2; const costNormal = 50;
            const lifeSuperior = 10; const costSuperior = 60;

            const countNormal = Math.ceil(period / lifeNormal);
            const totalNormal = area * costNormal * countNormal;

            const countSuperior = Math.ceil(period / lifeSuperior);
            const totalSuperior = area * costSuperior * countSuperior;

            const savings = totalNormal - totalSuperior;
            const ratio = ((savings / totalNormal) * 100).toFixed(0);

            // Display results
            const resultArea = document.getElementById('calc-result-area');
            resultArea.classList.remove('hidden');

            const maxVal = Math.max(totalNormal, totalSuperior);
            document.getElementById('bar-normal').style.width = (totalNormal / maxVal * 100) + "%";
            document.getElementById('bar-superior').style.width = (totalSuperior / maxVal * 100) + "%";

            const formatter = new Intl.NumberFormat(lang === 'ko' ? 'ko-KR' : 'en-US');
            const currency = lang === 'ko' ? "" : "$";
            document.getElementById('val-normal').innerText = currency + formatter.format(lang === 'ko' ? totalNormal * 1000 : totalNormal);
            document.getElementById('val-superior').innerText = currency + formatter.format(lang === 'ko' ? totalSuperior * 1000 : totalSuperior);
            document.getElementById('saving-amount').innerText = currency + formatter.format(lang === 'ko' ? savings * 1000 : savings) + (lang === 'ko' ? " 원" : "");
            document.getElementById('saving-ratio').innerText = ratio;
        });
    };

    // --- Video Logic ---
    const videoEvidence = [
        { id: "tyf31ofpv6Q", company: "ASH CONCRETE", period: "3M", title: {en: "3-Month Durability Test", ko: "3개월 투수 유지성능"}},
        { id: "vLrEJIsgrjg", company: "ASH CONCRETE", period: "6M", title: {en: "6-Month Heavy Rain Sim", ko: "6개월 폭우 시뮬레이션"}},
        { id: "wXv4XX9AI4Y", company: "ASH CONCRETE", period: "1Y", title: {en: "1-Year Real Field Test", ko: "1년 경과 실제 투수력"}},
        { id: "X0-8XaSGe1M", company: "ASH CONCRETE", period: "2Y", title: {en: "2-Year Unclogged Proof", ko: "2년 연속 무막힘 검증"}}
    ];

    function renderVideos() {
        const grid = document.getElementById('video-grid');
        if (!grid) return;
        const lang = localStorage.getItem('waterpass-lang') || 'ko';

        grid.innerHTML = videoEvidence.map(vid => `
            <div class="video-card">
                <div class="video-container">
                    <iframe src="https://www.youtube.com/embed/${vid.id}" frameborder="0" allowfullscreen loading="lazy"></iframe>
                </div>
                <div class="video-info">
                    <h4>${vid.title[lang]}</h4>
                    <p>${vid.company} | ${vid.period}</p>
                </div>
            </div>
        `).join('');
    };

    // --- Final Init ---
    renderTable();
    setupCalculator();
    renderVideos();
});
