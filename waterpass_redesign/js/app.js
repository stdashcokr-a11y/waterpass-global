document.addEventListener('DOMContentLoaded', () => {
    // === 1. 네비게이션 및 화면 전환 ===
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
        
        // 상세자료 탭 초기화 (details.js 연동)
        if (targetId === 'details' && window.initDetails) {
            window.initDetails();
        }
        
        window.scrollTo(0, 0);
        lucide.createIcons();
    }

    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => switchView(e.target.dataset.target));
    });

    qaCards.forEach(card => {
        card.addEventListener('click', (e) => switchView(e.currentTarget.dataset.target));
    });

    // === 2. 구글 시트 데이터 로딩 (비교표 & 그래프) ===
    const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/16VKEYNvPaqyfhOi5h6fwh-sqMESxCYAD4HSyBT0TRZM/export?format=csv";

    // 기본 한글 데이터 (보강된 샘플 데이터)
    let currentData = [
        { id: 1, name: "ASH CONCRETE (우수)", loc: "전주", date: "2024-04", m3: 15, m6: 17, y1: 20, y2: 35, y3: 74, y4: 115, y5: 170 },
        { id: 2, name: "타사 제품 A (일반)", loc: "전주", date: "2024-04", m3: 16, m6: 20, y1: 25, y2: 55, y3: 180, y4: 250, y5: 300 },
        { id: 3, name: "타사 제품 B (일반)", loc: "전주", date: "2024-04", m3: 17, m6: 23, y1: 58, y2: 180, y3: 300, y4: "-", y5: "-" },
        { id: 4, name: "타사 제품 C (일반)", loc: "익산", date: "2023-10", m3: 18, m6: 25, y1: 112, y2: 240, y3: "-", y4: "-", y5: "-" },
        { id: 5, name: "타사 제품 D (일반)", loc: "군산", date: "2023-11", m3: 20, m6: 35, y1: 180, y2: 300, y3: "-", y4: "-", y5: "-" },
        { id: 6, name: "타사 제품 E (일반)", loc: "김제", date: "2023-12", m3: 22, m6: 45, y1: 180, y2: 300, y3: "-", y4: "-", y5: "-" }
    ];

    function getJudgment(y2Value) {
        if (y2Value === "-" || y2Value >= 120) return { text: "미달", class: "score-bad" };
        if (y2Value < 60) return { text: "우수", class: "score-good" };
        return { text: "보통", class: "score-warn" };
    }

    const tbody = document.getElementById('compare-tbody');
    const topList = document.getElementById('top-performers-list');

    function renderTable(data) {
        if (!tbody) return;
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
        if (!topList) return;
        topList.innerHTML = '';
        const topData = [...data].filter(d => typeof d.y2 === 'number' && d.y2 < 120).sort((a, b) => a.y2 - b.y2).slice(0, 3);
        topData.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'performer-item';
            li.innerHTML = `
                <div class="per-info">
                    <strong>${index + 1}위. ${item.name}</strong>
                    <span>${item.loc} (${item.date})</span>
                </div>
                <div class="per-stat">2년 경과: ${item.y2}초 흡수</div>
            `;
            topList.appendChild(li);
        });
    }

    // === 3. 동영상 갤러리 렌더링 (12개 완벽 복구) ===
    const videoGallery = document.getElementById('video-gallery-list');
    const filterBtns = document.querySelectorAll('.vid-filter-btn');

    const allVideos = [
        { companyName: "ASH CONCRETE", period: "3개월", score: 15, url: "https://youtu.be/tyf31ofpv6Q" },
        { companyName: "ASH CONCRETE", period: "6개월", score: 17, url: "https://youtu.be/vLrEJIsgrjg" },
        { companyName: "ASH CONCRETE", period: "1년", score: 20, url: "https://youtu.be/wXv4XX9AI4Y" },
        { companyName: "ASH CONCRETE", period: "2년", score: 35, url: "https://youtu.be/X0-8XaSGe1M" },
        { companyName: "타사 제품 A", period: "3개월", score: 16, url: "https://youtu.be/VbHkUSu4sG4" },
        { companyName: "타사 제품 B", period: "6개월", score: 23, url: "https://youtu.be/367rTjtIwDo" },
        { companyName: "타사 제품 C", period: "1년", score: 112, url: "https://youtu.be/jmDzlB059yo" },
        { companyName: "타사 제품 D", period: "1년", score: 180, url: "https://www.youtube.com/watch?v=ibb1gx2HNZo" },
        { companyName: "타사 제품 E", period: "1년", score: 180, url: "https://www.youtube.com/watch?v=dqc1_BabhTI" },
        { companyName: "타사 제품 F", period: "1년", score: 180, url: "https://youtu.be/pUyMCCE2eVs" },
        { companyName: "타사 제품 G", period: "1년", score: 180, url: "https://www.youtube.com/watch?v=D0u2OgsNI7s" },
        { companyName: "타사 제품 H", period: "1년", score: 180, url: "https://youtube.com/watch?v=1LTAP3QSvoE" }
    ];

    function renderVideos(filterPeriod = 'all') {
        if (!videoGallery) return;
        videoGallery.innerHTML = '';
        
        let filteredVideos = allVideos;
        if (filterPeriod !== 'all') {
            filteredVideos = allVideos.filter(vid => vid.period === filterPeriod);
        }

        // 로컬 파일 실행 시 origin 매개변수 처리를 위한 현재 위치 확인
        const origin = window.location.origin === 'null' ? '*' : window.location.origin;

        filteredVideos.forEach(vid => {
            let videoId = null;
            if (vid.url) {
                let urlStr = String(vid.url).trim();
                // 정규식 개선: URL 뒤의 불필요한 파라미터나 공백 완벽 제거
                const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?\s]*).*/;
                const match = urlStr.match(regExp);
                if (match && match[2] && match[2].length >= 11) {
                    videoId = match[2].substring(0, 11);
                }
            }

            const title = `[${vid.companyName}] 현장 투수 테스트 (${vid.period})`;
            const meta = `투수 성능 결과: ${vid.score}초`;
            const card = document.createElement('div');
            card.className = 'video-card';

            if (videoId) {
                // origin 및 enablejsapi 추가로 보안 및 구성 오류 방지 강화
                card.innerHTML = `
                    <div class="video-wrapper">
                        <iframe 
                            src="https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1&origin=${encodeURIComponent(origin)}" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                        </iframe>
                    </div>
                    <div class="video-info">
                        <h4>${title}</h4>
                        <p class="video-meta">${meta}</p>
                        <a href="${vid.url}" target="_blank" style="color:var(--primary); font-size:0.8rem; text-decoration:none; margin-top:5px; display:block;">[YouTube에서 직접 보기]</a>
                    </div>
                `;
            } else {
                // 비디오 ID 추출 실패 시 대체 UI (에러 153 방지용 안전 장치)
                card.innerHTML = `
                    <div class="video-wrapper" style="display:flex; align-items:center; justify-content:center; background:#222; color:#666; flex-direction:column; padding:20px; text-align:center;">
                        <i data-lucide="video-off" style="margin-bottom:10px;"></i>
                        <p style="font-size:0.8rem;">동영상을 불러올 수 없습니다.<br>아래 링크를 확인해주세요.</p>
                    </div>
                    <div class="video-info">
                        <h4>${title}</h4>
                        <p class="video-meta">${meta}</p>
                        <a href="${vid.url}" target="_blank" style="color:var(--primary); font-size:0.8rem; text-decoration:none; margin-top:5px; display:block;">[YouTube에서 직접 보기]</a>
                    </div>
                `;
            }
            videoGallery.appendChild(card);
        });
        if (window.lucide) lucide.createIcons();
    }

    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterBtns.forEach(b => b.classList.remove('active'));
                const targetBtn = e.target;
                targetBtn.classList.add('active');
                renderVideos(targetBtn.getAttribute('data-period'));
            });
        });
    }

    // === 4. Chart.js 그래프 구현 ===
    let performanceChart = null; 
    function renderChart(data) {
        const ctx = document.getElementById('performanceChart');
        if (!ctx) return;
        if (performanceChart) performanceChart.destroy();

        const labels = ['3개월', '6개월', '1년', '2년', '3년', '4년', '5년'];
        const colors = ['#f2a900', '#EA4335', '#4285F4', '#34A853', '#8E24AA', '#00ACC1', '#FF7043'];

        const datasets = data.map((item, index) => {
            const mapValue = (val) => (val === "-" || isNaN(Number(val))) ? null : (Number(val) >= 300 ? 300 : Number(val));
            const dataPoints = [mapValue(item.m3), mapValue(item.m6), mapValue(item.y1), mapValue(item.y2), mapValue(item.y3), mapValue(item.y4), mapValue(item.y5)];
            const color = colors[index % colors.length];

            return {
                label: item.name,
                data: dataPoints,
                borderColor: color,
                backgroundColor: color,
                borderWidth: 2.5,
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
                    legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11 }, color:'#fff' } }
                },
                scales: {
                    x: { ticks: { color: '#ccc' } },
                    y: { beginAtZero: true, max: 320, ticks: { stepSize: 60, color: '#ccc' } }
                }
            }
        });
    }

    // === 5. 예산 계산기 및 상세 설정 토글 ===
    const toggleBtn = document.getElementById('toggle-settings-btn');
    const editNormal = document.getElementById('edit-normal');
    const editSuperior = document.getElementById('edit-superior');
    const viewNormal = document.getElementById('view-normal');
    const viewSuperior = document.getElementById('view-superior');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isHidden = editNormal.classList.contains('hidden');
            if (isHidden) {
                editNormal.classList.remove('hidden');
                editSuperior.classList.remove('hidden');
                viewNormal.classList.add('hidden');
                viewSuperior.classList.add('hidden');
                toggleBtn.innerHTML = '<i data-lucide="check-circle" width="16" height="16"></i> 설정 완료 (닫기) ▴';
            } else {
                editNormal.classList.add('hidden');
                editSuperior.classList.add('hidden');
                viewNormal.classList.remove('hidden');
                viewSuperior.classList.remove('hidden');
                toggleBtn.innerHTML = '<i data-lucide="settings" width="16" height="16"></i> 상세 설정 직접 입력 ▾';
                
                // 보기 화면 값 업데이트
                viewNormal.querySelector('span:first-child').innerText = document.getElementById('input-life-normal').value;
                viewNormal.querySelector('span:last-child').innerText = Number(document.getElementById('input-cost-normal').value).toLocaleString();
                viewSuperior.querySelector('span:first-child').innerText = document.getElementById('input-life-superior').value;
                viewSuperior.querySelector('span:last-child').innerText = Number(document.getElementById('input-cost-superior').value).toLocaleString();
            }
            lucide.createIcons();
        });
    }

    const calcBtn = document.getElementById('calc-submit-btn');
    if (calcBtn) {
        calcBtn.addEventListener('click', () => {
            // 1. 값 가져오기 (parseFloat를 사용하여 소수점 정밀도 확보)
            const area = parseFloat(document.getElementById('calc-area').value) || 0;
            const years = parseFloat(document.getElementById('calc-years').value) || 0;
            
            const lifeNormal = parseFloat(document.getElementById('input-life-normal').value) || 1;
            const costNormal = parseFloat(document.getElementById('input-cost-normal').value) || 0;
            const lifeSuperior = parseFloat(document.getElementById('input-life-superior').value) || 1;
            const costSuperior = parseFloat(document.getElementById('input-cost-superior').value) || 0;

            // 2. 시공 횟수 계산 (영문판과 동일하게 비례 계산)
            const countNormal = years / lifeNormal;
            const countSuperior = years / lifeSuperior;

            // 3. 총 비용 계산
            const totalNormal = Math.floor(area * costNormal * countNormal);
            const totalSuperior = Math.floor(area * costSuperior * countSuperior);
            const savings = totalNormal - totalSuperior;
            const ratio = totalNormal > 0 ? ((savings / totalNormal) * 100).toFixed(1) : 0;

            // 4. 결과 출력 및 바 그래픽 업데이트
            document.getElementById('val-normal').innerText = totalNormal.toLocaleString() + "원";
            document.getElementById('val-superior').innerText = totalSuperior.toLocaleString() + "원";
            
            document.getElementById('bar-normal').style.height = "100%";
            const superiorHeight = totalNormal > 0 ? (totalSuperior / totalNormal * 100) : 0;
            document.getElementById('bar-superior').style.height = superiorHeight + "%";
            
            document.getElementById('saving-amount').innerText = (savings > 0 ? "+" : "") + savings.toLocaleString() + "원";
            document.getElementById('saving-ratio').innerText = ratio + "%";
            
            document.getElementById('calc-result-area').classList.remove('hidden');
            
            // 시공 횟수 레이블 업데이트 (소수점 한 자리 맞춤)
            const labelNormal = countNormal.toFixed(1);
            const labelSuperior = countSuperior.toFixed(1);
            document.querySelector('.chart-bar-group:first-child .bar-label').innerHTML = `일반 제품<br>(${labelNormal}회 시공)`;
            document.querySelector('.chart-bar-group:last-child .bar-label').innerHTML = `우수 제품<br>(${labelSuperior}회 시공)`;
            
            document.getElementById('calc-result-area').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // === 6. 데이터 로드 및 앱 설치 버튼 ===
    const installBtn = document.getElementById('install-btn');
    if (installBtn) {
        installBtn.addEventListener('click', () => {
            alert("브라우저의 '홈 화면에 추가' 기능을 이용해 주세요!");
        });
    }

    const sortFilter = document.getElementById('sort-filter');
    if (sortFilter) {
        sortFilter.addEventListener('change', (e) => {
            let sorted = [...currentData];
            if (e.target.value === 'score') {
                sorted.sort((a, b) => {
                    const valA = (a.y2 === "-" || isNaN(a.y2)) ? 999 : a.y2;
                    const valB = (b.y2 === "-" || isNaN(b.y2)) ? 999 : b.y2;
                    return valA - valB;
                });
            }
            renderTable(sorted);
            renderChart(sorted);
        });
    }

    async function loadDataAndRender() {
        // 영상 갤러리는 데이터 로드 전에도 기본 데이터로 먼저 렌더링 (속도 개선)
        renderVideos();
        
        try {
            const response = await fetch(SHEET_CSV_URL + "?t=" + new Date().getTime());
            const csvText = await response.text();
            const lines = csvText.trim().split('\n');
            const parsedData = [];

            for (let i = 1; i < lines.length; i++) {
                const cols = lines[i].split(',');
                if (cols.length < 10 || !cols[0]) continue;
                parsedData.push({
                    id: i, name: cols[0], loc: cols[1], date: cols[2],
                    m3: cols[3] === "-" ? "-" : Number(cols[3]),
                    m6: cols[4] === "-" ? "-" : Number(cols[4]),
                    y1: cols[5] === "-" ? "-" : Number(cols[5]),
                    y2: cols[6] === "-" ? "-" : Number(cols[6]),
                    y3: cols[7] === "-" ? "-" : Number(cols[7]),
                    y4: cols[8] === "-" ? "-" : Number(cols[8]),
                    y5: cols[9] === "-" ? "-" : Number(cols[9])
                });
            }
            if (parsedData.length > 0) currentData = parsedData;
        } catch (e) {
            console.error("Data load failed, using fallback.");
        }
        renderTable(currentData);
        renderTopPerformers(currentData);
        renderChart(currentData);
        // 데이터 로드 성공 후에도 한 번 더 확실히 렌더링
        renderVideos();
    }

    loadDataAndRender();
});
