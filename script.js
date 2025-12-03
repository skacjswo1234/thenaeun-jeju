// 모바일 메뉴 토글
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// 네비게이션 링크 클릭 시 메뉴 닫기
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// 부드러운 스크롤 함수
function smoothScrollTo(targetId) {
    const target = document.querySelector(targetId);
    if (target) {
        const headerOffset = 0; // 히어로 화면은 헤더까지 올라가야 하므로 0
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        if (href === '#home') {
            // 히어로 화면은 맨 위로
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// 로고 클릭 시 히어로 화면으로 이동
const logoBtn = document.getElementById('logoBtn');
if (logoBtn) {
    logoBtn.style.cursor = 'pointer';
    logoBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Top 버튼 표시/숨김
const topBtn = document.getElementById('topBtn');
let isTopBtnVisible = false;

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300 && !isTopBtnVisible) {
        topBtn.style.opacity = '1';
        topBtn.style.pointerEvents = 'auto';
        isTopBtnVisible = true;
    } else if (window.pageYOffset <= 300 && isTopBtnVisible) {
        topBtn.style.opacity = '0';
        topBtn.style.pointerEvents = 'none';
        isTopBtnVisible = false;
    }
});

// 초기 상태 설정
topBtn.style.opacity = '0';
topBtn.style.pointerEvents = 'none';
topBtn.style.transition = 'opacity 0.3s';

// 문의 폼 제출 처리
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            age: document.getElementById('age').value,
            message: document.getElementById('message').value
        };

        // 여기에 실제 폼 제출 로직을 추가하세요
        // 예: 서버로 데이터 전송, 이메일 발송 등
        
        alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
        
        // 폼 초기화
        contactForm.reset();
    });
}

// 스크롤 시 헤더 스타일 변경
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 페이지 로드 시 초기 체크
if (window.pageYOffset > 100) {
    header.classList.add('scrolled');
}

// 이미지 로드 에러 처리
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
    });
});

