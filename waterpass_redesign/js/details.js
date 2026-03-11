const productDetails = [
    {
        id: 1,
        title: "혁신적인 투수 성능",
        category: "기술성능",
        image: "assets/images/홈페이지용 -11.png",
        badge: "ECO-INNOVATION",
        description: "석탄 바텀애쉬를 재활용한 혁신적인 골재 기술로 강력한 내구성과 탁월한 배수 성능을 동시에 실현합니다.",
        specs: [
            { label: "투수 계수", value: "0.1 mm/s 이상" },
            { label: "휨 강도", value: "5.0 MPa 이상" }
        ]
    },
    {
        id: 2,
        title: "바텀애쉬 투수블록 분석",
        category: "분석자료",
        image: "assets/images/홈페이지용 - bottomash 투수블록 분석.png",
        badge: "TECHNICAL ANALYSIS",
        description: "바텀애쉬 입자 사이의 상호 연결된 기공(Interconnected Pores)이 블록 전신을 통해 물을 즉각적으로 투과시킵니다.",
        specs: [
            { label: "공극률", value: "25% 이상" },
            { label: "소재", value: "Bottom Ash" }
        ]
    },
    {
        id: 3,
        title: "친환경 순환 자원",
        category: "ESG",
        image: "assets/images/홈페이지용 - 친환경 강조.png",
        badge: "SUSTAINABILITY",
        description: "화력발전소 부산물인 바텀애쉬를 재활용하여 탄소 배출을 줄이고 열섬 현상을 완화하는 친환경 공법입니다.",
        specs: [
            { label: "탄소 저감", value: "최대 30%" },
            { label: "인증", value: "친환경 자재" }
        ]
    },
    {
        id: 4,
        title: "시공 사례 및 지역",
        category: "시공실적",
        image: "assets/images/홈페이지용 - 시공지역.png",
        badge: "INSTALLATION",
        description: "다양한 지형과 기후 조건에서도 변함없는 성능을 발휘하며, 전국 주요 시공 현장에서 내구성이 입증되었습니다.",
        specs: [
            { label: "시공 범위", value: "전국구" },
            { label: "환경", value: "스마트시티" }
        ]
    },
    {
        id: 5,
        title: "기존 블록과의 비교",
        category: "비교자료",
        image: "assets/images/일반 투수보도블록과 bottomash 볼록 비교 이미지-1.png",
        badge: "COMPARISON",
        description: "틈새로만 물이 빠지는 기존 방식과 달리, 블록 전체가 숨을 쉬며 물을 투과시켜 막힘 현상을 획기적으로 해결했습니다.",
        specs: [
            { label: "투수 면적", value: "100% (전신)" },
            { label: "막힘 방지", value: "탁월" }
        ]
    },
    {
        id: 6,
        title: "투수 성능 인증 규격",
        category: "인증자료",
        image: "assets/images/홈페이지용 -1.png",
        badge: "CERTIFIED",
        description: "국가 공인 기관의 엄격한 테스트를 통과하여 300% 이상의 투수 성능 달성을 공식 인증받았습니다.",
        specs: [
            { label: "인증 수치", value: "300% 달성" },
            { label: "품질 관리", value: "A++ 등급" }
        ]
    },
    {
        id: 7,
        title: "특품 카탈로그 표지",
        category: "브로슈어",
        image: "assets/images/홈페이지용 -catalogue.png",
        badge: "CATALOGUE",
        description: "STANDARD ASH의 혁신 신기술이 집약된 제품 카탈로그입니다. 제품의 모든 사양을 확인하실 수 있습니다.",
        specs: [
            { label: "발행", value: "Standard Ash" },
            { label: "버전", value: "2026.03" }
        ]
    },
    {
        id: 8,
        title: "내부 기공 구조 분석",
        category: "기술자료",
        image: "assets/images/block_structure.png.png",
        badge: "MICRO-STRUCTURE",
        description: "바텀애쉬 특유의 불규칙한 형상이 상호 연결된 네트워크 기공을 형성하여 압도적인 배수 효율을 보장합니다.",
        specs: [
            { label: "공극 구조", value: "Interconnected" },
            { label: "투수 경로", value: "전방향" }
        ]
    },
    {
        id: 9,
        title: "보강토 블록 솔루션",
        category: "제품라인업",
        image: "assets/images/홈페이지용 -보강토블록.png",
        badge: "PRODUCT LINEUP",
        description: "투수 성능뿐만 아니라 고강도 내구성을 갖춘 보강토 블록으로 토목 시공의 안전성을 높여드립니다.",
        specs: [
            { label: "강도", value: "고강도" },
            { label: "용도", value: "옹벽/사면" }
        ]
    },
    {
        id: 10,
        title: "기술 특성 및 장점",
        category: "기술특성",
        image: "assets/images/홈페이지용 - 특성 및 장점.png",
        badge: "KEY FEATURES",
        description: "투수성 유지, 미끄럼 방지, 도시 열섬 완화 등 5대 핵심 기술이 적용된 프리미엄 블록입니다.",
        specs: [
            { label: "핵심 기술", value: "5-Tech" },
            { label: "내구성", value: "반영구적" }
        ]
    },
    {
        id: 11,
        title: "실시간 투수성 테스트",
        category: "현장검증",
        image: "assets/images/투수시험 동영상 캡쳐.png",
        badge: "VERIFIED",
        description: "현장에서 직접 실시한 투수 시험 결과, 기존 보도블록 대비 10배 이상의 빠른 배수 속도를 실현했습니다.",
        specs: [
            { label: "테스트", value: "현장 주수" },
            { label: "결과", value: "즉시 흡수" }
        ]
    },
    {
        id: 12,
        title: "시공 지역 사례 - 2",
        category: "시공실적",
        image: "assets/images/홈페이지용 - 시공지역-2.png",
        badge: "INSTALLATION CASE",
        description: "경사지 및 배수가 취약한 도심 지역에 최적화된 시공 솔루션을 제공하여 침수 피해를 예방합니다.",
        specs: [
            { label: "지형", value: "급경사 가능" },
            { label: "효과", value: "침수 예방" }
        ]
    },
    {
        id: 13,
        title: "특성 및 장점 - 상세",
        category: "기술특성",
        image: "assets/images/홈페이지용 - 특성 및 장점-2.png",
        badge: "ADVANCED TECH",
        description: "미끄럼 방지 등급 G1 확보로 보행 안전을 최우선으로 하며, 빛 반사 저감으로 눈의 피로도까지 생각했습니다.",
        specs: [
            { label: "미끄럼 방지", value: "G1 등급" },
            { label: "안전성", value: "최상" }
        ]
    },
    {
        id: 14,
        title: "전신 투수 메커니즘",
        category: "기술자료",
        image: "assets/images/block_structure_and_bottomsash_paver_block.png.png",
        badge: "MECHANISM",
        description: "블록의 상부부터 하부까지 일체형 기공 채널이 형성되어 있어, 시간이 지나도 투수 성능이 저하되지 않습니다.",
        specs: [
            { label: "상부층", value: "미세공극" },
            { label: "하부층", value: "통기채널" }
        ]
    },
    {
        id: 15,
        title: "카탈로그 상세 페이지",
        category: "브로슈어",
        image: "assets/images/홈페이지용 -catalogue-1.png",
        badge: "PRODUCT DETAIL",
        description: "제품 규격, 색상 라인업, 그리고 상세 시공 도면 정보를 포함한 전문 기술 카탈로그입니다.",
        specs: [
            { label: "색상", value: "5종 라인업" },
            { label: "도면", value: "CAD 제공" }
        ]
    },
    {
        id: 16,
        title: "Technology (핵심 기술)",
        category: "핵심섹션",
        image: "assets/images/홈페이지용 - 특성 및 장점.png",
        badge: "TECHNOLOGY",
        description: "바텀애쉬를 활용한 전신 투수 공법으로, 시간이 지나도 막히지 않는 혁신적인 기술력을 자랑합니다.",
        specs: [
            { label: "기술 방식", value: "Bottom Ash Matrix" },
            { label: "차별점", value: "투수성 유지" }
        ]
    },
    {
        id: 17,
        title: "Benefits (기대 효과)",
        category: "핵심섹션",
        image: "assets/images/홈페이지용 - 친환경 강조.png",
        badge: "BENEFITS",
        description: "도시 홍수 예방, 지하수 함양, 도심 열섬 현상 완화 등 인류와 자연이 공존하는 가치를 창출합니다.",
        specs: [
            { label: "환경 효과", value: "열섬 완화" },
            { label: "경제 효과", value: "지수 정화" }
        ]
    }
];

// 섹션 이름을 통한 모달 오픈 매핑 함수 추가
function openDetailBySection(sectionName) {
    const mapping = {
        'Technology': 16,
        'Benefits': 17,
        'Permeable Blocks': 2,
        'Designs': 15
    };
    const id = mapping[sectionName];
    if (id) openDetailModal(id);
}

function initDetails() {
    const grid = document.getElementById('details-grid');
    if (!grid) return;

    grid.innerHTML = productDetails.map(detail => `
        <div class="detail-thumb-card" onclick="openDetailModal(${detail.id})">
            <img src="${detail.image}" alt="${detail.title}">
            <div class="detail-thumb-info">
                <span>${detail.title}</span>
            </div>
        </div>
    `).join('');
}

function openDetailModal(id) {
    const detail = productDetails.find(d => d.id === id);
    if (!detail) return;

    const modal = document.getElementById('detail-modal');
    const body = modal.querySelector('.modal-body');

    body.innerHTML = `
        <div class="modal-image-wrap">
            <img src="${detail.image}" alt="${detail.title}">
        </div>
        <div class="modal-text-content">
            <div class="modal-badge">${detail.badge}</div>
            <h2 class="modal-title">${detail.title}</h2>
            <p class="modal-desc">${detail.description}</p>
            <div class="spec-grid">
                ${detail.specs.map(spec => `
                    <div class="spec-item">
                        <div class="spec-label">${spec.label}</div>
                        <div class="spec-value">${spec.value}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
    const modal = document.getElementById('detail-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Global initialization hook
window.initDetails = initDetails;
window.closeDetailModal = closeDetailModal;
window.openDetailModal = openDetailModal;
window.openDetailBySection = openDetailBySection;
