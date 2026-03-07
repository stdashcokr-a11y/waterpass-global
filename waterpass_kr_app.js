document.addEventListener('DOMContentLoaded', () => {
    // === 0. 강력 캐시 초기화 함수 (URL에 ?reset=true 가 있을 때 동작) ===
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
        alert("캐시와 서비스워커가 완전 초기화되었습니다. 확인을 누르면 정상 페이지로 이동합니다.");
        window.location.href = window.location.pathname; // reset 파라미터 떼고 재접속
        return; // 아래 워커 등록 코드를 실행하지 않고 종료
    }

    // === 1. PWA Service Worker 등록 ===
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // 캐시 무효화를 위해 워커 파일 뒤에 난수를 붙여서 매번 새로 부름
            const swUrl = '/service-worker.js?v=' + new Date().getTime();
            navigator.serviceWorker.register(swUrl)
                .then(registration => {
                    console.log('SW registered');
                    registration.update();
                })
                .catch(error => console.log('SW registration failed: ', error));
        });
    }

    // === 2. PWA 설치 프롬프트 (A2HS) ===
    let deferredPrompt;
    const installContainer = document.getElementById('install-container');
    const installBtn = document.getElementById('install-btn');

    window.addEventListener('beforeinstallprompt', (e) => {
        // 기본 팝업 방지
        e.preventDefault();
        deferredPrompt = e;
        // 설치 버튼 표시
        installContainer.classList.remove('hidden');
    });

    installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) {
            // 설치 프롬프트가 없을 경우 안내 팝업 및 가이드 문구 표시 (아이폰 등 대응)
            const guide = document.getElementById('install-guide');
            if (guide) guide.style.display = 'block';
            alert('현재 브라우저에서는 자동 앱 설치 팝업을 지원하지 않거나 이미 설치되었습니다.\n\n[아이폰(Safari)]\n하단 공유 메뉴(↑)에서 "홈 화면에 추가"를 눌러주세요!\n\n[안드로이드]\n우측 상단 메뉴(⋮)에서 "앱 설치"를 눌러주세요.');
            return;
        }

        try {
            // PWA 설치 프롬프트 표시
            deferredPrompt.prompt();

            // 사용자의 응답 대기
            const { outcome } = await deferredPrompt.userChoice;

            if (outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
                // 설치가 수락되었을 때만 버튼 숨기기
                installContainer.style.display = 'none';
            } else {
                console.log('User dismissed the A2HS prompt');
            }
        } catch (error) {
            console.error('PWA prompt error:', error);
            alert('앱 설치 팝업을 띄우는 데 실패했습니다.');
        }

        // 프롬프트는 한 번만 호출 가능하므로 초기화
        deferredPrompt = null;
    });

    // === 3. SPA 네비게이션 제어 ===
    const navBtns = document.querySelectorAll('.nav-btn');
    const pageViews = document.querySelectorAll('.page-view');
    const qaCards = document.querySelectorAll('.qa-card');

    function switchView(targetId) {
        // Update Buttons
        navBtns.forEach(btn => {
            if (btn.dataset.target === targetId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        // Update Views
        pageViews.forEach(view => {
            if (view.id === targetId) {
                view.classList.add('active');
            } else {
                view.classList.remove('active');
            }
        });
        window.scrollTo(0, 0);
    }

    // 탭 클릭 이벤트
    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchView(e.target.dataset.target);
        });
    });

    // 퀵 액세스 카드 클릭 이벤트
    qaCards.forEach(card => {
        card.addEventListener('click', (e) => {
            switchView(e.currentTarget.dataset.target);
        });
    });

    // === 4. 구글 스프레드시트 연동 데이터 ===
    // 새로운 구글 시트 주소 (공유 권한을 '링크가 있는 모든 사용자'로 설정해야 합니다!)
    const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/16VKEYNvPaqyfhOi5h6fwh-sqMESxCYAD4HSyBT0TRZM/export?format=csv";

    let currentData = [
        { id: 1, name: "A사(WaterPass 우수)", loc: "전주시 완산구", date: "2019-04", m3: 8, m6: 9, y1: 10, y2: 12, y3: 15, y4: 18, y5: 22 },
        { id: 2, name: "B사(일반)", loc: "성남시 분당구", date: "2021-05", m3: 10, m6: 15, y1: 25, y2: 350, y3: "-", y4: "-", y5: "-" },
        { id: 3, name: "C사(우수)", loc: "익산시 중앙동", date: "2020-03", m3: 12, m6: 15, y1: 18, y2: 25, y3: 28, y4: 35, y5: 45 },
        { id: 4, name: "D사(일반)", loc: "서울시 강남구", date: "2022-08", m3: 15, m6: 40, y1: 120, y2: 400, y3: "-", y4: "-", y5: "-" },
        { id: 5, name: "E사(보통)", loc: "부산시 해운대구", date: "2018-09", m3: 9, m6: 12, y1: 15, y2: 40, y3: 150, y4: 200, y5: 280 }
    ];
    function getJudgment(y2Value) {
        if (y2Value === "-" || y2Value >= 120) return { text: "⚠미달", class: "score-bad" };
        if (y2Value < 60) return { text: "★우수", class: "score-good" };
        return { text: "보통", class: "score-warn" };
    }

    // === 5. 데이터 랜더링 (비교표 & 명예의 전당) ===
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
        // 2년 데이터가 우수한 순서대로 정렬 (숫자 데이터가 있는 것만)
        const topData = data.filter(d => typeof d.y2 === 'number' && d.y2 < 120).sort((a, b) => a.y2 - b.y2).slice(0, 3);

        topData.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'performer-item';
            li.innerHTML = `
                <div class="per-info">
                    <strong>${index + 1}위. ${item.name}</strong>
                    <span>${item.loc} (${item.date} 시공)</span>
                </div>
                <div class="per-stat">2년 경과: ${item.y2}초 흡수</div>
            `;
            topList.appendChild(li);
        });
    }

    // === 7. 실증 영상 갤러리 로딩 로직 ===
    const videoGallery = document.getElementById('video-gallery-list');
    const filterBtns = document.querySelectorAll('.vid-filter-btn');

    // 비디오들을 그리는 함수 (필터 문자열 받음, 예: 'all', '3개월', '1년' 등)
    function renderVideos(data, filterPeriod = 'all') {
        if (!videoGallery) return;
        videoGallery.innerHTML = '';

        let allVideos = [];

        // 1. 모든 업체의 영상 데이터를 하나의 배열로 평탄화(Flatten)
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

        // 구글 시트에 영상 데이터가 하나도 없을 경우의 Fallback Mock 데이터
        if (allVideos.length === 0) {
            allVideos = [
                { companyName: "A사", period: "3년", score: 15, url: "youtube_mock_id_1", mockTitle: "[A사] 시공 3년 경과 전주시 현장 실증", mockMeta: "300ml 투수 시간: 15초" },
                { companyName: "C사", period: "2년", score: 25, url: "youtube_mock_id_2", mockTitle: "[C사] 시공 2년 경과 익산시 폭우 시뮬레이션", mockMeta: "300ml 투수 시간: 25초" },
                { companyName: "타사 비교", period: "2년", score: 400, url: "youtube_mock_id_3", mockTitle: "[타사 비교] 미달 제품군 2년 경과 현장", mockMeta: "300ml 투수 시간: 400초 이상 (물 고임)" }
            ];
        }

        // 2. 선택된 기간으로 필터링
        let filteredVideos = allVideos;
        if (filterPeriod !== 'all') {
            filteredVideos = allVideos.filter(vid => vid.period === filterPeriod);
        }

        // 3. 필터링된 결과가 없을 때 안내문
        if (filteredVideos.length === 0) {
            videoGallery.innerHTML = `<div style="text-align:center; padding: 40px 20px; color: #666; width: 100%;">선택하신 시기의 영상 데이터가 없습니다.</div>`;
            return;
        }

        // 4. 비디오 카드 생성 (유튜브 iframe 삽입)
        filteredVideos.forEach(vid => {
            // 유튜브 URL에서 비디오 ID 추출 (간단한 파싱)
            let videoId = null;
            if (vid.url) {
                let urlStr = String(vid.url).trim().replace(/\?feature=share/g, '');
                const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
                const match = urlStr.match(regExp);
                if (match && match[2] && match[2].length >= 11) {
                    videoId = match[2].substring(0, 11);
                }
            }

            // Fallback mock 데이터 처리
            const title = vid.mockTitle ? vid.mockTitle : `[${vid.companyName}] 현장 실증 (${vid.period})`;
            const meta = vid.mockMeta ? vid.mockMeta : `${vid.period} 경과 투수시험: ${vid.score}sec.`;

            const card = document.createElement('div');
            card.className = 'video-card';

            if (videoId) {
                // 정상적인 유튜브 ID가 있는 경우 iframe 렌더링
                card.innerHTML = `
                    <div class="video-wrapper">
                        <iframe src="https://www.youtube-nocookie.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>
                    </div>
                    <div class="video-info">
                        <h4>${title}</h4>
                        <p class="video-meta">${meta}</p>
                    </div>
                `;
            } else {
                // 유튜브 링크가 올바르지 않거나 없는 경우 썸네일 표시
                card.innerHTML = `
                    <div class="video-placeholder" style="background:#eee; display:flex; align-items:center; justify-content:center; height:180px;">
                        <span style="color:#999;font-size:0.9rem;">영상 링크 오류 또는 준비 중</span>
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

    // 5. 버튼 클릭 이벤트 리스너 등록
    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // 1) 모든 버튼의 active 클래스 제거
                filterBtns.forEach(b => b.classList.remove('active'));

                // 2) 클릭된 버튼에 active 부여
                const targetBtn = e.target;
                targetBtn.classList.add('active');

                // 3) 해당 기간에 맞는 비디오만 다시 렌더링
                const period = targetBtn.getAttribute('data-period');
                renderVideos(currentData, period);
            });
        });
    }

    // 초기 랜더링을 위해 window 스코프에 함수를 열어둠 (loadDataFromSheet에서 호출 시 사용)
    window.renderVideos = renderVideos;

    // --- Chart.js 꺾은선 그래프 렌더링 로직 ---
    let performanceChart = null; // 인스턴스 저장용

    function renderChart(data) {
        const ctx = document.getElementById('performanceChart');
        if (!ctx) return;

        // 기존 차트가 있으면 지우고 다시 그림 (필터링 대응)
        if (performanceChart) {
            performanceChart.destroy();
        }

        // 전체 업체 중 비교표에 나오는 업체만 필터링 (최대 5~6개 정도가 안 복잡함. 일단 전체 표시 유지)
        const labels = ['3개월', '6개월', '1년', '2년', '3년', '4년', '5년'];

        // 색상 팔레트
        const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#8E24AA', '#00ACC1', '#FF7043', '#9E9D24', '#5C6BC0'];

        const datasets = data.map((item, index) => {
            // 데이터 배열 구성 (값이 "-" 이거나 300초 이상이면 300으로 고정하여 한계치 도달 표현, 빈 값이면 null)
            const mapValue = (val) => {
                if (val === "-") return null;
                if (typeof val !== 'number' || isNaN(val)) return null;
                return val >= 300 ? 300 : val;
            };

            const dataPoints = [
                mapValue(item.m3),
                mapValue(item.m6),
                mapValue(item.y1),
                mapValue(item.y2),
                mapValue(item.y3),
                mapValue(item.y4),
                mapValue(item.y5)
            ];

            const color = colors[index % colors.length];

            return {
                label: item.name,
                data: dataPoints,
                borderColor: item.y2 >= 120 ? '#ff4d4f' : color, // 2년차 기준 미달 제품은 빨간색 계열 선으로 강조
                backgroundColor: item.y2 >= 120 ? '#ff4d4f' : color,
                borderWidth: item.y2 >= 120 ? 1.5 : 2.5, // 미달은 얇게, 우수는 굵게
                tension: 0.1, // 약간 부드러운 꺾은선
                spanGaps: true // null 값 무시하고 선 연결
            }
        });

        performanceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            font: { size: 11 }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) label += ': ';
                                if (context.parsed.y !== null) {
                                    if (context.parsed.y >= 300) label += '300sec 이상 (물 고임)';
                                    else label += context.parsed.y + 'sec';
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: '물이 흡수되는 시간 (sec.) - 낮을수록 우수',
                            font: { size: 10, color: '#666' }
                        },
                        beginAtZero: true,
                        max: 320, // 300초 너머 여백 창출
                        ticks: {
                            stepSize: 60, // 60, 120, 180... 단위로 표시
                            callback: function (value) {
                                if (value === 320) return null; // 320은 눈금 텍스트 숨김 (여백용)
                                return value;
                            }
                        },
                        grid: {
                            color: function (context) {
                                if (context.tick.value === 120) return '#ffcccc'; // 120sec(미달 기준) 선을 빨갛게
                                return '#e9ecef';
                            },
                            borderDash: function (context) {
                                if (context.tick.value === 60) return [5, 5]; // 60sec 우수 기준점선
                                return [];
                            }
                        }
                    }
                }
            }
        });
    }

    async function loadDataFromSheet() {
        if (!SHEET_CSV_URL) {
            console.log("구글 시트 연결 전이므로 기본 데이터를 보여줍니다.");
            renderTable(currentData);
            renderTopPerformers(currentData);
            renderChart(currentData);
            return;
        }

        try {
            // 강제로 최신 데이터를 불러오기 위해 시간 파라미터 추가 (캐시 무시)
            const fetchUrl = SHEET_CSV_URL + (SHEET_CSV_URL.includes("?") ? "&" : "?") + "t=" + new Date().getTime();
            const response = await fetch(fetchUrl);
            const csvText = await response.text();

            const lines = csvText.split('\n');
            const parsedData = [];

            // 첫 줄(index 0)은 제목이므로 1번째 줄부터 읽기
            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;
                // 간단한 CSV 파싱 (쉼표로 구분)
                const cols = lines[i].split(',');

                // 데이터 길이가 부족하거나 업체명이 비어있으면(두 번째 헤더 줄 등) 건너뛰기
                if (cols.length < 10 || !cols[0].trim()) continue;

                const p3m = isNaN(cols[3]) ? cols[3] : Number(cols[3]);
                const p6m = isNaN(cols[4]) ? cols[4] : Number(cols[4]);
                const p1y = isNaN(cols[5]) ? cols[5] : Number(cols[5]);
                const p2y = isNaN(cols[6]) ? cols[6] : Number(cols[6]);
                const p3y = isNaN(cols[7]) ? cols[7] : Number(cols[7]);
                const p4y = isNaN(cols[8]) ? cols[8] : Number(cols[8]);
                const p5y = isNaN(cols[9]) ? cols[9] : Number(cols[9]);

                const periodVideos = [];
                const addVideo = (period, score, urlStr) => {
                    const url = urlStr ? urlStr.trim() : "";
                    if (url && url.length > 5) {
                        periodVideos.push({ period, score, url });
                    }
                };

                addVideo("3개월", p3m, cols[10]);
                addVideo("6개월", p6m, cols[11]);
                addVideo("1년", p1y, cols[12]);
                addVideo("2년", p2y, cols[13]);
                addVideo("3년", p3y, cols[14]);
                addVideo("4년", p4y, cols[15]);
                addVideo("5년", p5y, cols[16]);

                parsedData.push({
                    id: i,
                    name: cols[0],
                    loc: cols[1],
                    date: cols[2],
                    m3: p3m,
                    m6: p6m,
                    y1: p1y,
                    y2: p2y,
                    y3: p3y,
                    y4: p4y,
                    y5: p5y,
                    periodVideos: periodVideos
                });
            }

            if (parsedData.length > 0) {
                currentData = parsedData;
            }
            renderTable(currentData);
            renderTopPerformers(currentData);
            renderChart(currentData);
            if (typeof renderVideos === 'function') renderVideos(currentData);

        } catch (error) {
            console.error("구글 시트 데이터를 가져오는데 실패했습니다.", error);
            // 실패 시 기본 데이터 보여주기
            renderTable(currentData);
            renderTopPerformers(currentData);
            renderChart(currentData);
            if (typeof renderVideos === 'function') renderVideos(currentData);
        }
    }

    loadDataFromSheet();

    // 정렬 필터 기능
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
        renderChart(sorted); // 필터링(정렬) 시 차트도 함께 업데이트
    });

    // === 6. LCC 예산 절감 시뮬레이터 로직 ===
    const calcBtn = document.getElementById('calc-submit-btn');
    const resultArea = document.getElementById('calc-result-area');

    // 로컬 스토리지에 저장된 값이 있으면 기본값 덮어쓰기
    const savedCalcSettings = localStorage.getItem('waterpassCalcSettings');
    if (savedCalcSettings) {
        const data = JSON.parse(savedCalcSettings);
        document.getElementById('input-life-normal').value = data.normalLife || 2;
        document.getElementById('input-cost-normal').value = data.normalCost || 50000;
        document.getElementById('input-life-superior').value = data.superiorLife || 5;
        document.getElementById('input-cost-superior').value = data.superiorCost || 60000;

        document.getElementById('disp-life-normal').innerText = data.normalLife || 2;
        document.getElementById('disp-cost-normal').innerText = (data.normalCost || 50000).toLocaleString();
        document.getElementById('disp-life-superior').innerText = data.superiorLife || 5;
        document.getElementById('disp-cost-superior').innerText = (data.superiorCost || 60000).toLocaleString();
    }

    // 상세 설정 토글 로직
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
                toggleSettingsBtn.innerText = "⚙️ 상세 설정 완료 ▴";
            } else {
                document.getElementById('view-normal').classList.remove('hidden');
                document.getElementById('view-superior').classList.remove('hidden');
                document.getElementById('edit-normal').classList.add('hidden');
                document.getElementById('edit-superior').classList.add('hidden');
                toggleSettingsBtn.innerText = "⚙️ 상세 설정 직접 입력 ▾";

                // 설정값 뷰에 반영
                document.getElementById('disp-life-normal').innerText = document.getElementById('input-life-normal').value;
                document.getElementById('disp-cost-normal').innerText = parseInt(document.getElementById('input-cost-normal').value).toLocaleString();
                document.getElementById('disp-life-superior').innerText = document.getElementById('input-life-superior').value;
                document.getElementById('disp-cost-superior').innerText = parseInt(document.getElementById('input-cost-superior').value).toLocaleString();
            }
        });
    }

    calcBtn.addEventListener('click', () => {
        const area = parseFloat(document.getElementById('calc-area').value);
        const years = parseFloat(document.getElementById('calc-years').value);

        if (!area || !years) return alert("면적과 기간을 정확히 입력해주세요.");

        // 단위당 비용설정 (입력값 가져오기)
        const costNormalPerSqm = parseFloat(document.getElementById('input-cost-normal').value) || 50000;
        const lifeNormal = parseFloat(document.getElementById('input-life-normal').value) || 2;

        const costSuperiorPerSqm = parseFloat(document.getElementById('input-cost-superior').value) || 60000;
        const lifeSuperior = parseFloat(document.getElementById('input-life-superior').value) || 5;

        // 시공 횟수 산출 (안분 계산)
        const countNormal = years / lifeNormal;
        const countSuperior = years / lifeSuperior;

        // 총 비용 계산 (소수점 버림)
        const totalNormal = Math.floor(area * costNormalPerSqm * countNormal);
        const totalSuperior = Math.floor(area * costSuperiorPerSqm * countSuperior);

        // 절감액 계산
        const saving = totalNormal - totalSuperior;
        const savingRatio = Math.round((saving / totalNormal) * 100);

        // UI 반영
        resultArea.classList.remove('hidden');

        // 애니메이션 효과를 위해 시간차 반영
        setTimeout(() => {
            // 막대 라벨 업데이트 (소수점이 있는 경우 둘째 자리까지 표시)
            const labelNormal = Number.isInteger(countNormal) ? countNormal : countNormal.toFixed(2);
            const labelSuperior = Number.isInteger(countSuperior) ? countSuperior : countSuperior.toFixed(2);
            document.querySelector('.chart-bar-group:nth-child(1) .bar-label').innerHTML = `일반 제품<br>(${labelNormal}회 시공)`;
            document.querySelector('.chart-bar-group:nth-child(2) .bar-label').innerHTML = `우수 제품<br>(${labelSuperior}회 시공)`;

            document.getElementById('bar-normal').style.height = '100%';
            document.getElementById('val-normal').innerText = totalNormal.toLocaleString() + "원";

            const superiorHeight = (totalSuperior / totalNormal) * 100;
            document.getElementById('bar-superior').style.height = superiorHeight + '%';
            document.getElementById('val-superior').innerText = totalSuperior.toLocaleString() + "원";

            document.getElementById('saving-amount').innerText = saving.toLocaleString() + "원";
            document.getElementById('saving-ratio').innerText = savingRatio + "%";
        }, 50);

        // 해당 영역으로 스크롤
        resultArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });


});
