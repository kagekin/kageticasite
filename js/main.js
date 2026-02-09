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
        if (glitchTexts.length > 0) {
            const randomText = glitchTexts[Math.floor(Math.random() * glitchTexts.length)];
            // クラスを付け外ししてアニメーションを誘発させるなどの処理が可能
        }
    }, 3000);

    /* ==========================================================================
       Developed Items Filtering
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const worksGrid = document.getElementById('dev-grid');

    if (filterBtns.length > 0 && worksGrid) {
        const cards = worksGrid.querySelectorAll('.work-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                cards.forEach(card => {
                    const categories = card.getAttribute('data-category');
                    if (filterValue === 'all' || categories.includes(filterValue)) {
                        gsap.to(card, {
                            scale: 1,
                            opacity: 1,
                            duration: 0.3,
                            display: 'block',
                            ease: 'power2.out'
                        });
                    } else {
                        gsap.to(card, {
                            scale: 0.8,
                            opacity: 0,
                            duration: 0.3,
                            display: 'none',
                            ease: 'power2.in'
                        });
                    }
                });
            });
        });
    }

    /* ==========================================================================
       SF Mode / Matrix Effect
       ========================================================================== */
    const sfToggle = document.getElementById('sf-toggle');
    const body = document.body;
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    let matrixInterval;
    const characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 16;
    let columns;
    let drops = [];

    // Resize canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = canvas.width / fontSize;
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
    }

    function drawMatrix() {
        // Black BG for the trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0'; // Green text
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    if (sfToggle) {
        sfToggle.addEventListener('click', () => {
            body.classList.toggle('sf-mode');

            if (body.classList.contains('sf-mode')) {
                // Start Matrix
                resizeCanvas();
                window.addEventListener('resize', resizeCanvas);
                matrixInterval = setInterval(drawMatrix, 33);

                // Change toggle text
                const icon = sfToggle.querySelector('.sf-toggle-icon');
                if (icon) icon.textContent = 'R'; // Return to Reality
            } else {
                // Stop Matrix
                clearInterval(matrixInterval);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                window.removeEventListener('resize', resizeCanvas);

                // Change toggle text back
                const icon = sfToggle.querySelector('.sf-toggle-icon');
                if (icon) icon.textContent = 'SF';
            }
        });
    }
});
