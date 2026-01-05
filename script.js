// 星空仰望 - 主JavaScript文件

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('星空仰望网站加载完成');
    
    // 初始化状态管理
    if (typeof AppState !== 'undefined') {
        AppState.init();
        setupStateListeners();
    }
    
    // ============================================
    // 导航栏功能
    // ============================================
    const navbar = document.getElementById('navbar');
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbarOverlay = document.getElementById('navbarOverlay');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    // 滚动时改变导航栏样式（已由scroll-animations.js处理，这里只更新导航项）
    function handleScroll() {
        // 导航栏样式由NavbarScroll模块处理
        // 这里只更新当前活动导航项
        updateActiveNavLink();
    }

    // 更新当前活动导航项
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const scrollPosition = window.pageYOffset + 150; // 偏移量

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}` || (current === '' && href === '#home')) {
                link.classList.add('active');
            }
        });
    }

    // 切换移动端菜单
    function toggleMobileMenu() {
        const isExpanded = navbarToggle.getAttribute('aria-expanded') === 'true';
        
        navbarToggle.setAttribute('aria-expanded', !isExpanded);
        navbarMenu.classList.toggle('active');
        navbarOverlay.classList.toggle('active');
        body.classList.toggle('navbar-open');

        // 如果菜单打开，聚焦第一个链接
        if (!isExpanded) {
            setTimeout(() => {
                const firstLink = navbarMenu.querySelector('.nav-link');
                if (firstLink) {
                    firstLink.focus();
                }
            }, 100);
        }
    }

    // 关闭移动端菜单
    function closeMobileMenu() {
        navbarToggle.setAttribute('aria-expanded', 'false');
        navbarMenu.classList.remove('active');
        navbarOverlay.classList.remove('active');
        body.classList.remove('navbar-open');
    }

    // 汉堡菜单按钮事件
    if (navbarToggle) {
        navbarToggle.addEventListener('click', toggleMobileMenu);
        
        // 键盘支持（空格键或Enter键）
        navbarToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMobileMenu();
            }
        });
    }

    // 遮罩点击关闭菜单
    if (navbarOverlay) {
        navbarOverlay.addEventListener('click', closeMobileMenu);
    }

    // 导航链接点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // 如果是空锚点，阻止默认行为
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // 平滑滚动到目标
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // 移动端：点击后关闭菜单
                if (window.innerWidth <= 768) {
                    setTimeout(closeMobileMenu, 300);
                }
            }
        });

        // 键盘导航支持（Enter键）
        link.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                this.click();
            }
        });
    });

    // 窗口滚动事件
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 初始状态
    handleScroll();

    // 窗口大小改变时，如果菜单打开且窗口变大，关闭菜单
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navbarMenu.classList.contains('active')) {
            closeMobileMenu();
        }
        updateActiveNavLink();
    });

    // ESC键关闭菜单
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbarMenu.classList.contains('active')) {
            closeMobileMenu();
            navbarToggle.focus();
        }
    });

    // ============================================
    // 上传作品按钮（模拟）
    // ============================================
    const uploadBtn = document.querySelector('.btn-upload');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('上传功能即将推出！');
        });

        uploadBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }

    // ============================================
    // 用户菜单按钮（模拟）
    // ============================================
    const userMenuBtn = document.getElementById('userMenuBtn');
    if (userMenuBtn) {
        userMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('用户菜单功能即将推出！');
        });

        userMenuBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }

    // ============================================
    // 作品展示卡片功能
    // ============================================
    const imageModal = document.getElementById('imageModal');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const cardViewButtons = document.querySelectorAll('.card-view-btn');
    const cardImages = document.querySelectorAll('.card-image');
    const likeButtons = document.querySelectorAll('.like-btn');
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    const commentButtons = document.querySelectorAll('.comment-btn');

    // 打开大图查看模态框
    function openImageModal(imageSrc, imageAlt, cardTitle) {
        if (!imageModal || !modalImage || !modalTitle) return;

        modalImage.src = imageSrc;
        modalImage.alt = imageAlt;
        modalTitle.textContent = cardTitle || imageAlt;
        imageModal.setAttribute('aria-hidden', 'false');
        imageModal.classList.add('active');
        body.classList.add('modal-open');

        // 聚焦关闭按钮
        setTimeout(() => {
            if (modalClose) {
                modalClose.focus();
            }
        }, 100);
    }

    // 关闭大图查看模态框
    function closeImageModal() {
        if (!imageModal) return;

        imageModal.setAttribute('aria-hidden', 'true');
        imageModal.classList.remove('active');
        body.classList.remove('modal-open');
    }

    // 卡片查看按钮点击事件
    cardViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.gallery-card');
            const img = card.querySelector('.card-image');
            const title = card.querySelector('.card-title');
            
            if (img) {
                openImageModal(img.src, img.alt, title ? title.textContent : '');
            }
        });
    });

    // 卡片图片点击事件
    cardImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.gallery-card');
            const title = card.querySelector('.card-title');
            openImageModal(this.src, this.alt, title ? title.textContent : '');
        });

        // 键盘支持（Enter键）
        img.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.click();
            }
        });

        // 添加tabindex以便键盘导航
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', '点击查看大图');
    });

    // 关闭按钮事件
    if (modalClose) {
        modalClose.addEventListener('click', closeImageModal);
        modalClose.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                closeImageModal();
            }
        });
    }

    // 遮罩点击关闭
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeImageModal);
    }

    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal && imageModal.classList.contains('active')) {
            closeImageModal();
        }
    });

    // 点赞按钮功能
    likeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const isLiked = this.getAttribute('data-liked') === 'true';
            const countSpan = this.querySelector('.action-count');
            
            if (countSpan) {
                let count = parseInt(countSpan.textContent) || 0;
                
                if (isLiked) {
                    count--;
                    this.setAttribute('data-liked', 'false');
                    this.classList.remove('liked');
                } else {
                    count++;
                    this.setAttribute('data-liked', 'true');
                    this.classList.add('liked');
                }
                
                countSpan.textContent = count;
            }
        });

        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // 收藏按钮功能
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const isFavorited = this.getAttribute('data-favorited') === 'true';
            
            if (isFavorited) {
                this.setAttribute('data-favorited', 'false');
                this.classList.remove('favorited');
            } else {
                this.setAttribute('data-favorited', 'true');
                this.classList.add('favorited');
            }
        });

        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // 评论按钮功能（模拟）
    commentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.gallery-card');
            const title = card ? card.querySelector('.card-title') : null;
            const titleText = title ? title.textContent : '作品';
            alert(`查看 "${titleText}" 的评论功能即将推出！`);
        });

        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
});

// 设置状态监听器（用于index.html）
function setupStateListeners() {
    // 监听点赞状态变化
    window.addEventListener('likeChanged', function(e) {
        const { artworkId, isLiked, count } = e.detail;
        updateLikeUI(artworkId, isLiked, count);
    });

    // 监听收藏状态变化
    window.addEventListener('favoriteChanged', function(e) {
        const { artworkId, isFavorited } = e.detail;
        updateFavoriteUI(artworkId, isFavorited);
    });
}

// 更新点赞UI（index.html页面）
function updateLikeUI(artworkId, isLiked, count) {
    const cards = document.querySelectorAll(`.gallery-card[data-id="${artworkId}"]`);
    cards.forEach(card => {
        const likeBtn = card.querySelector('.like-btn');
        const countSpan = likeBtn?.querySelector('.action-count');
        const icon = likeBtn?.querySelector('.action-icon');
        if (likeBtn) {
            likeBtn.setAttribute('data-liked', isLiked);
            if (isLiked) {
                likeBtn.classList.add('liked');
                if (icon) icon.textContent = '❤️';
            } else {
                likeBtn.classList.remove('liked');
                if (icon) icon.textContent = '🤍';
            }
        }
        if (countSpan && count !== undefined) {
            countSpan.textContent = count;
        }
    });
}

// 更新收藏UI（index.html页面）
function updateFavoriteUI(artworkId, isFavorited) {
    const cards = document.querySelectorAll(`.gallery-card[data-id="${artworkId}"]`);
    cards.forEach(card => {
        const favoriteBtn = card.querySelector('.favorite-btn');
        if (favoriteBtn) {
            favoriteBtn.setAttribute('data-favorited', isFavorited);
            if (isFavorited) {
                favoriteBtn.classList.add('favorited');
            } else {
                favoriteBtn.classList.remove('favorited');
            }
        }
    });
}

// 创建点赞动画（星星爆炸效果）
function createLikeAnimation(button) {
    const icon = button.querySelector('.action-icon');
    if (!icon) return;

    // 切换图标（空心/实心）
    const isLiked = button.getAttribute('data-liked') === 'true';
    icon.textContent = isLiked ? '❤️' : '🤍';

    // 创建星星爆炸效果
    if (isLiked) {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // 创建多个星星粒子
        for (let i = 0; i < 8; i++) {
            createStarParticle(centerX, centerY, i);
        }
    }
}

// 创建星星粒子
function createStarParticle(x, y, index) {
    const particle = document.createElement('div');
    particle.className = 'like-star-particle';
    particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 12px;
        height: 12px;
        pointer-events: none;
        z-index: 10000;
        font-size: 16px;
        line-height: 1;
        opacity: 1;
    `;
    particle.textContent = '⭐';
    
    document.body.appendChild(particle);
    
    // 计算角度和距离
    const angle = (index / 8) * Math.PI * 2;
    const distance = 60 + Math.random() * 40;
    const endX = x + Math.cos(angle) * distance;
    const endY = y + Math.sin(angle) * distance;
    
    // 动画
    particle.animate([
        {
            transform: 'translate(0, 0) scale(1) rotate(0deg)',
            opacity: 1
        },
        {
            transform: `translate(${endX - x}px, ${endY - y}px) scale(0.5) rotate(360deg)`,
            opacity: 0
        }
    ], {
        duration: 600,
        easing: 'ease-out'
    }).onfinish = () => {
        if (particle.parentNode) {
            document.body.removeChild(particle);
        }
    };
}

// ============================================
// 热门作品轮播图功能
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselPrev = document.getElementById('carouselPrev');
    const carouselNext = document.getElementById('carouselNext');
    const carouselIndicators = document.getElementById('carouselIndicators');
    
    if (carouselTrack && carouselPrev && carouselNext) {
        let currentSlide = 0;
        const slides = carouselTrack.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;

        // 创建指示器
        if (carouselIndicators && totalSlides > 0) {
            for (let i = 0; i < totalSlides; i++) {
                const indicator = document.createElement('button');
                indicator.className = 'carousel-indicator';
                indicator.setAttribute('aria-label', `跳转到第${i + 1}张`);
                indicator.setAttribute('data-slide', i);
                if (i === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => goToSlide(i));
                carouselIndicators.appendChild(indicator);
            }
        }

        // 更新轮播图位置
        function updateCarousel() {
            carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // 更新指示器
            if (carouselIndicators) {
                const indicators = carouselIndicators.querySelectorAll('.carousel-indicator');
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentSlide);
                });
            }
        }

        // 跳转到指定幻灯片
        function goToSlide(index) {
            if (index < 0) {
                currentSlide = totalSlides - 1;
            } else if (index >= totalSlides) {
                currentSlide = 0;
            } else {
                currentSlide = index;
            }
            updateCarousel();
        }

        // 上一张
        carouselPrev.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
        });

        // 下一张
        carouselNext.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
        });

        // 自动播放（可选）
        let autoPlayInterval;
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, 5000); // 每5秒切换
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
        }

        // 鼠标悬停时暂停自动播放
        const carouselContainer = carouselTrack.closest('.featured-carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoPlay);
            carouselContainer.addEventListener('mouseleave', startAutoPlay);
        }

        // 初始化自动播放
        startAutoPlay();

        // 触摸滑动支持（移动端）
        let touchStartX = 0;
        let touchEndX = 0;

        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // 向左滑动，下一张
                    goToSlide(currentSlide + 1);
                } else {
                    // 向右滑动，上一张
                    goToSlide(currentSlide - 1);
                }
            }
        }
    }
});
