document.addEventListener('DOMContentLoaded', () => {
    // === 0. Hard Cache Reset (URL ?reset=true) ===
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('reset') === 'true') {
        caches.keys().then((names) => {
            for (let name of names) caches.delete(name);
        });
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(function (registrations) {
                for (let registration of registrations) {
                    registration.unregister();
                }
            });
        }
        alert("캐시가 완전히 삭제되었습니다.");
        window.location.href = window.location.pathname; 
        return; 
    }

    // === 1. SPA Navigation ===
    const navBtns = document.querySelectorAll('.nav-btn');
    const pageViews = document.querySelectorAll('.page-view');
    const qaCards = document.querySelectorAll('.qa-card');

    function switchView(targetId) {
        navBtns.forEach(btn => {
            if (btn.dataset.target === targetId) btn.classList.add('active');
            else btn.classList.remove('active');
        });
        pageViews.forEach(view => {
            if (view.id === targetId) view.classList.add('active');
            else view.classList.remove('active');
        });
        window.scrollTo(0, 0);
    }

    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => switchView(e.target.dataset.target));
    });

    qaCards.forEach(card => {
        card.addEventListener('click', (e) => switchView(e.currentTarget.dataset.target));
    });

    // Hash-based Deep Linking Support
    function handleInitialHash() {
        const hash = window.location.hash.replace('#', '');
        if (hash && (hash === 'compare' || hash === 'calculator' || hash === 'videos')) {
            switchView(hash);
        }
    }
    handleInitialHash();
    window.addEventListener('hashchange', handleInitialHash);

    // === 2. Google Sheets Data Fetching (English Localization) ===
    const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/16VKEYNvPaqyfhOi5h6fwh-sqMESxCYAD4HSyBT0TRZM/export?format=csv";

    // 국문 데이터 (fallback)
    let currentData = [
        { id: 1, name: "ASH CONCRETE (프리미엄)", loc: "전주", date: "2024-04", m3: 15, m6: 17, y1: 20, y2: 35, y3: 74, y4: 115, y5: 170 },
        { id: 2, name: "타사 A (일반)", loc: "전주", date: "2024-04", m3: 16, m6: 20, y1: 25, y2: 55, y3: 180, y4: 250, y5: 300 },
        { id: 3, name: "타사 B (일반)", loc: "전주", date: "2024-04", m3: 17, m6: 23, y1: 58, y2: 180, y3: 300, y4: "-", y5: "-" },
        { id: 4, name: "타사 C (일반)", loc: "익산", date: "2023-10", m3: 18, m6: 25, y1: 112, y2: 240, y3: "-", y4: "-", y5: "-" },
        { id: 5, name: "타사 D (일반)", loc: "군산", date: "2023-11", m3: 20, m6: 35, y1: 180, y2: 300, y3: "-", y4: "-", y5: "-" },
        { id: 6, name: "타사 E (일반)", loc: "김제", date: "2023-12", m3: 22, m6: 45, y1: 180, y2: 300, y3: "-", y4: "-", y5: "-" }
    ];

    function getJudgment(y2Value) {
        if (y2Value === "-" || y2Value >= 120) return { text: "불합격", class: "score-bad" };
        if (y2Value < 60) return { text: "우수", class: "score-good" };
        return { text: "보통", class: "score-warn" };
    }

    // === 3. Render Table & Top Performers ===
    const tbody = document.getElementById('compare-tbody');
    const topList = document.getElementById('top-performers-list');

    function renderTable(data) {
        tbody.innerHTML = '';
        data.forEach(item => {
            const tr = document.createElement('tr');
            const judge = getJudgment(item.y2);
            tr.innerHTML = `
                <td><strong>${item.name}</strong></td>
                <td>${item.loc}<br><span style="font-size:0.8rem;color:#666">${item.date}</span></td>
                <td>${item.m3}</td>
                <td>${item.m6}</td>
                <td>${item.y1}</td>
                <td><strong>${item.y2}</strong></td>
                <td>${item.y3}</td>
                <td>${item.y4}</td>
                <td>${item.y5}</td>
                <td><span class="score-badge ${judge.class}">${judge.text}</span></td>
            `;
            tbody.appendChild(tr);
        });
    }

    function renderTopPerformers(data) {
        topList.innerHTML = '';
        const topData = data.filter(d => typeof d.y2 === 'number' && d.y2 < 120).sort((a, b) => a.y2 - b.y2).slice(0, 3);
        topData.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'performer-item';
            li.innerHTML = `
                <div class="per-info">
                    <strong>#${index + 1}. ${item.name}</strong>
                    <span>${item.loc} (${item.date})</span>
                </div>
                <div class="per-stat">2년 경과: ${item.y2}초 흡수</div>
            `;
            topList.appendChild(li);
        });
    }

    // === 4. Render Video Gallery ===
    const videoGallery = document.getElementById('video-gallery-list');
    const filterBtns = document.querySelectorAll('.vid-filter-btn');

    function renderVideos(data, filterPeriod = 'all') {
        if (!videoGallery) return;
        videoGallery.innerHTML = '';
        let allVideos = [];

        // 1. Flatten all videos from the parsed data
        if (data && data.length > 0) {
            data.forEach(item => {
                if (item.periodVideos && item.periodVideos.length > 0) {
                    item.periodVideos.forEach(vid => {
                        allVideos.push({
                            companyName: item.name,
                            period: vid.period,
                            score: vid.score,
                            url: vid.url
                        });
                    });
                }
            });
        }

        // --- MOCK DATA INJECTION FIX ---
        // If the Google Sheet fetch utterly fails or returns no videos (e.g. CORS block, or parsing failure)
        // AND the user hasn't seen the actual 12 videos, we inject the 12 working mock videos here so the UI doesn't look broken.
        if (allVideos.length === 0 || allVideos[0].url === "") {
             allVideos = [
                { companyName: "애쉬콘크리트", period: "3개월", score: 15, url: "https://youtu.be/tyf31ofpv6Q" },
                { companyName: "애쉬콘크리트", period: "6개월", score: 17, url: "https://youtu.be/vLrEJIsgrjg" },
                { companyName: "애쉬콘크리트", period: "1년", score: 20, url: "https://youtu.be/wXv4XX9AI4Y" },
                { companyName: "애쉬콘크리트", period: "2년", score: 35, url: "https://youtu.be/X0-8XaSGe1M" },
                { companyName: "타사 A", period: "3개월", score: 16, url: "https://youtu.be/VbHkUSu4sG4" },
                { companyName: "타사 B", period: "6개월", score: 23, url: "https://youtu.be/367rTjtIwDo" },
                { companyName: "타사 C", period: "1년", score: 112, url: "https://youtu.be/jmDzlB059yo" },
                { companyName: "타사 D", period: "1년", score: 180, url: "https://www.youtube.com/watch?v=ibb1gx2HNZo?feature=share" },
                { companyName: "타사 E", period: "1년", score: 180, url: "https://www.youtube.com/watch?v=dqc1_BabhTI?feature=share" },
                { companyName: "타사 F", period: "1년", score: 180, url: "https://youtu.be/pUyMCCE2eVs" },
                { companyName: "타사 G", period: "1년", score: 180, url: "https://www.youtube.com/watch?v=D0u2OgsNI7s?feature=share" },
                { companyName: "타사 H", period: "1년", score: 180, url: "https://youtube.com/watch?v=1LTAP3QSvoE?feature=share" }
            ];
        }

        let filteredVideos = allVideos;
        if (filterPeriod !== 'all') {
            filteredVideos = allVideos.filter(vid => vid.period === filterPeriod);
        }

        if (filteredVideos.length === 0) {
            videoGallery.innerHTML = `<div style="text-align:center; padding: 40px 20px; color: #666; width: 100%;">해당 기간의 테스트 영상이 없습니다.</div>`;
            return;
        }

        filteredVideos.forEach(vid => {
            let videoId = null;
            if (vid.url) {
                let urlStr = String(vid.url).trim();
                const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
                const match = urlStr.match(regExp);
                if (match && match[2] && match[2].length >= 11) {
                    videoId = match[2].substring(0, 11);
                }
            }

            const title = `[${vid.companyName}] 현장 실증 테스트 (${vid.period})`;
            const meta = `투수 성능 테스트 결과: ${vid.score}초`;
            const card = document.createElement('div');
            card.className = 'video-card';

            if (videoId) {
                card.innerHTML = `
                    <div class="video-wrapper">
                        <iframe src="https://www.youtube.com/embed/${videoId}?rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
                    </div>
                    <div class="video-info">
                        <h4>${title}</h4>
                        <p class="video-meta">${meta}</p>
                    </div>
                `;
            } else {
                card.innerHTML = `
                    <div class="video-placeholder" style="background:#111; display:flex; align-items:center; justify-content:center; height:200px; border-bottom:1px solid #333;">
                          <span style="color:#666;font-size:0.9rem;">비디오 링크 오류</span>
                    </div>
                    <div class="video-info">
                        <h4>${title}</h4>
                        <p class="video-meta">${meta}</p>
                    </div>
                `;
            }
            videoGallery.appendChild(card);
        });
    }

    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                const targetBtn = e.target;
                targetBtn.classList.add('active');
                renderVideos(currentData, targetBtn.getAttribute('data-period'));
            });
        });
    }
    window.renderVideos = renderVideos;

    // --- Chart.js ---
    let performanceChart = null; 
    function renderChart(data) {
        const ctx = document.getElementById('performanceChart');
        if (!ctx) return;
        if (performanceChart) performanceChart.destroy();

        const labels = ['3개월', '6개월', '1년', '2년', '3년', '4년', '5년'];
        const colors = ['#f2a900', '#EA4335', '#4285F4', '#34A853', '#8E24AA', '#00ACC1', '#FF7043'];

        const datasets = data.map((item, index) => {
            const mapValue = (val) => {
                if (val === "-" || typeof val !== 'number' || isNaN(val)) return null;
                return val >= 300 ? 300 : val;
            };

            const dataPoints = [mapValue(item.m3), mapValue(item.m6), mapValue(item.y1), mapValue(item.y2), mapValue(item.y3), mapValue(item.y4), mapValue(item.y5)];
            const color = colors[index % colors.length];

            return {
                label: item.name,
                data: dataPoints,
                borderColor: item.y2 >= 120 ? '#ff4d4f' : color, 
                backgroundColor: item.y2 >= 120 ? '#ff4d4f' : color,
                borderWidth: item.y2 >= 120 ? 1.5 : 2.5,
                tension: 0.1, 
                spanGaps: true 
            }
        });

        performanceChart = new Chart(ctx, {
            type: 'line',
            data: { labels: labels, datasets: datasets },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11, color:'#fff' } } },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) label += ': ';
                                if (context.parsed.y !== null) {
                                    if (context.parsed.y >= 300) label += '300초 이상 (물고임)';
                                    else label += context.parsed.y + '초';
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    x: { ticks: { color: '#ccc' } },
                    y: {
                        title: { display: true, text: '완전 흡수 시간 (초) - 낮을수록 우수', font: { size: 10, color: '#aaa' } },
                        beginAtZero: true, max: 320,
                        ticks: { stepSize: 60, color: '#ccc', callback: function (value) { return value === 320 ? null : value; } },
                        grid: { color: function (context) { return context.tick.value === 120 ? 'rgba(255,77,79,0.3)' : 'rgba(255,255,255,0.05)'; }, borderDash: function (context) { return context.tick.value === 60 ? [5, 5] : []; } }
                    }
                }
            }
        });
    }

    // Google Sheets API
    async function loadDataFromSheet() {
        if (!SHEET_CSV_URL) return fallbackRender();
        try {
            const fetchUrl = SHEET_CSV_URL + "&t=" + new Date().getTime();
            const response = await fetch(fetchUrl);
            const csvText = await response.text();
            const lines = csvText.split('\n');
            const parsedData = [];

            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;
                const cols = lines[i].split(',');
                if (cols.length < 10 || !cols[0].trim()) continue;

                // English translation logic 
                const engName = cols[0]; // Kept as original name from sheet, usually understandable
                const p3m = isNaN(cols[3]) ? cols[3] : Number(cols[3]);
                const p6m = isNaN(cols[4]) ? cols[4] : Number(cols[4]);
                const p1y = isNaN(cols[5]) ? cols[5] : Number(cols[5]);
                const p2y = isNaN(cols[6]) ? cols[6] : Number(cols[6]);
                const p3y = isNaN(cols[7]) ? cols[7] : Number(cols[7]);
                const p4y = isNaN(cols[8]) ? cols[8] : Number(cols[8]);
                const p5y = isNaN(cols[9]) ? cols[9] : Number(cols[9]);

                const periodVideos = [];
                const addVideo = (period, score, urlStr) => {
                    if (!urlStr) return;
                    // Clean up URL: remove trailing spaces, carriage returns, and "?feature=share" logic
                    let url = urlStr.trim().replace(/\?feature=share/g, '');
                    if (url && url.length > 5) periodVideos.push({ period, score, url });
                };

                addVideo("3개월", p3m, cols[10]);
                addVideo("6개월", p6m, cols[11]);
                addVideo("1년", p1y, cols[12]);
                addVideo("2년", p2y, cols[13]);
                addVideo("3년", p3y, cols[14]);
                addVideo("4년", p4y, cols[15]);
                addVideo("5년", p5y, cols[16]);

                parsedData.push({
                    id: i, name: engName, loc: cols[1], date: cols[2],
                    m3: p3m, m6: p6m, y1: p1y, y2: p2y, y3: p3y, y4: p4y, y5: p5y,
                    periodVideos: periodVideos
                });
            }

            if (parsedData.length > 0) currentData = parsedData;
            fallbackRender();
        } catch (error) {
            console.error("Sheet Fetch Error:", error);
            fallbackRender();
        }
    }

    function fallbackRender() {
        renderTable(currentData);
        renderTopPerformers(currentData);
        renderChart(currentData);
        if (typeof renderVideos === 'function') renderVideos(currentData);
    }

    loadDataFromSheet();

    document.getElementById('sort-filter').addEventListener('change', (e) => {
        let sorted = [...currentData];
        if (e.target.value === 'score') {
            sorted.sort((a, b) => {
                const valA = a.y2 === "-" ? 999 : a.y2;
                const valB = b.y2 === "-" ? 999 : b.y2;
                return valA - valB;
            });
        }
        renderTable(sorted);
        renderChart(sorted);
    });

    // === 5. Budget Calculator Logic (English / USD) ===
    const calcBtn = document.getElementById('calc-submit-btn');
    const resultArea = document.getElementById('calc-result-area');

    const toggleSettingsBtn = document.getElementById('toggle-settings-btn');
    let isEditMode = false;
    if (toggleSettingsBtn) {
        toggleSettingsBtn.addEventListener('click', () => {
            isEditMode = !isEditMode;
            if (isEditMode) {
                document.getElementById('view-normal').classList.add('hidden');
                document.getElementById('view-superior').classList.add('hidden');
                document.getElementById('edit-normal').classList.remove('hidden');
                document.getElementById('edit-superior').classList.remove('hidden');
                toggleSettingsBtn.innerHTML = '<i data-lucide="settings" width="16" height="16"></i> 설정 닫기 ▴';
                lucide.createIcons();
            } else {
                document.getElementById('view-normal').classList.remove('hidden');
                document.getElementById('view-superior').classList.remove('hidden');
                document.getElementById('edit-normal').classList.add('hidden');
                document.getElementById('edit-superior').classList.add('hidden');
                toggleSettingsBtn.innerHTML = '<i data-lucide="settings" width="16" height="16"></i> 상세 설정 직접 입력 ▾';
                lucide.createIcons();

                document.querySelector('#view-normal span:nth-child(1)').innerText = document.getElementById('input-life-normal').value;
                document.querySelector('#view-normal .input-info:nth-child(2) span').innerText = document.getElementById('input-cost-normal').value;
                document.querySelector('#view-superior span:nth-child(1)').innerText = document.getElementById('input-life-superior').value;
                document.querySelector('#view-superior .input-info:nth-child(2) span').innerText = document.getElementById('input-cost-superior').value;
            }
        });
    }

    calcBtn.addEventListener('click', () => {
        const area = parseFloat(document.getElementById('calc-area').value);
        const years = parseFloat(document.getElementById('calc-years').value);

        if (!area || !years) return alert("유효한 면적과 분석 기간을 입력해주세요.");

        const costNormalPerSqm = parseFloat(document.getElementById('input-cost-normal').value) || 50;
        const lifeNormal = parseFloat(document.getElementById('input-life-normal').value) || 2;
        const costSuperiorPerSqm = parseFloat(document.getElementById('input-cost-superior').value) || 60;
        const lifeSuperior = parseFloat(document.getElementById('input-life-superior').value) || 10;

        const countNormal = years / lifeNormal;
        const countSuperior = years / lifeSuperior;

        const totalNormal = Math.floor(area * costNormalPerSqm * countNormal);
        const totalSuperior = Math.floor(area * costSuperiorPerSqm * countSuperior);

        const saving = totalNormal - totalSuperior;
        const savingRatio = Math.round((saving / totalNormal) * 100);

        resultArea.classList.remove('hidden');

        setTimeout(() => {
            const labelNormal = Number.isInteger(countNormal) ? countNormal : countNormal.toFixed(1);
            const labelSuperior = Number.isInteger(countSuperior) ? countSuperior : countSuperior.toFixed(1);
            document.querySelector('.chart-bar-group:nth-child(1) .bar-label').innerHTML = `일반 제품<br>(${labelNormal}회 시공)`;
            document.querySelector('.chart-bar-group:nth-child(2) .bar-label').innerHTML = `워터패스 프리미엄<br>(${labelSuperior}회 시공)`;

            document.getElementById('bar-normal').style.height = '100%';
            document.getElementById('val-normal').innerText = totalNormal.toLocaleString() + "원";

            const superiorHeight = (totalSuperior / totalNormal) * 100;
            document.getElementById('bar-superior').style.height = superiorHeight + '%';
            document.getElementById('val-superior').innerText = totalSuperior.toLocaleString() + "원";

            document.getElementById('saving-amount').innerText = saving.toLocaleString() + "원";
            document.getElementById('saving-ratio').innerText = savingRatio + "%";
        }, 50);

        resultArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
