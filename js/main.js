document.addEventListener('DOMContentLoaded', () => {
    // ページロード時のフェードイン
    document.body.classList.add('loaded');

    // GSAPの登録
    gsap.registerPlugin(ScrollTrigger);

    // ヒーローセクションのアニメーション
    gsap.from('.hero-title span', {
        duration: 1.5,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
    });

    gsap.from('.hero-subtitle', {
        duration: 1.5,
        opacity: 0,
        x: -20,
        ease: 'power3.out',
        delay: 1.2
    });

    // 各セクションのスクロールアニメーション
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        gsap.from(section.children, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // ナビゲーションのスクロール変化
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // モバイルメニュー（簡易実装）
    // TODO: 完全なオーバーレイメニューの実装
    const menuTrigger = document.querySelector('.menu-trigger');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuTrigger) {
        menuTrigger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuTrigger.classList.toggle('active');
        });
    }

    // グリッチエフェクトのランダムトリガー（オプション）
    const glitchTexts = document.querySelectorAll('.glitch-text');
    setInterval(() => {
        const randomText = glitchTexts[Math.floor(Math.random() * glitchTexts.length)];
        // クラスを付け外ししてアニメーションを誘発させるなどの処理が可能
        // 現在はCSSのhoverで対応しているため、ここでは何もしないが、
        // 将来的にJSで制御する場合の拡張ポイント
    }, 3000);
});
