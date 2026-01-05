// 滚动动画模块
// 使用Intersection Observer API实现滚动动画效果

const ScrollAnimations = {
    // 配置选项
    options: {
        root: null, // 使用视口作为根
        rootMargin: '0px 0px -100px 0px', // 提前100px触发
        threshold: 0.1 // 10%可见时触发
    },

    // Intersection Observer实例
    observer: null,

    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 节流函数
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // 初始化
    init() {
        // 检查浏览器支持
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver not supported, falling back to scroll event');
            this.initScrollFallback();
            return;
        }

        // 创建Intersection Observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    // 动画完成后取消观察（可选，如果希望只动画一次）
                    // this.observer.unobserve(entry.target);
                }
            });
        }, this.options);

        // 观察所有需要动画的元素
        this.observeElements();
    },

    // 观察需要动画的元素
    observeElements() {
        const animatedElements = document.querySelectorAll([
            '.scroll-fade-in',
            '.scroll-slide-up',
            '.scroll-slide-down',
            '.scroll-slide-left',
            '.scroll-slide-right',
            '.scroll-scale-in',
            '.scroll-scale-rotate',
            '.scroll-fade-slide-up'
        ].join(', '));

        animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    },

    // 为元素添加动画类
    animateElement(element) {
        element.classList.add('animate');
    },

    // 降级方案：使用滚动事件（不支持IntersectionObserver的浏览器）
    initScrollFallback() {
        const animatedElements = document.querySelectorAll([
            '.scroll-fade-in',
            '.scroll-slide-up',
            '.scroll-slide-down',
            '.scroll-slide-left',
            '.scroll-slide-right',
            '.scroll-scale-in',
            '.scroll-scale-rotate',
            '.scroll-fade-slide-up'
        ].join(', '));

        const checkElements = () => {
            const windowHeight = window.innerHeight;
            const scrollY = window.pageYOffset;

            animatedElements.forEach(element => {
                if (element.classList.contains('animate')) return;

                const elementTop = element.getBoundingClientRect().top + scrollY;
                const elementHeight = element.offsetHeight;
                const triggerPoint = scrollY + windowHeight - 100;

                if (elementTop < triggerPoint && elementTop + elementHeight > scrollY) {
                    this.animateElement(element);
                }
            });
        };

        // 使用节流优化性能
        const throttledCheck = this.throttle(checkElements, 100);
        window.addEventListener('scroll', throttledCheck, { passive: true });
        checkElements(); // 初始检查
    },

    // 重新初始化（用于动态添加的元素）
    reinit() {
        if (this.observer) {
            this.observeElements();
        }
    }
};

// 导航栏滚动效果增强
const NavbarScroll = {
    navbar: null,
    lastScrollY: 0,
    scrollThreshold: 100,

    init() {
        this.navbar = document.getElementById('navbar');
        if (!this.navbar) return;

        this.lastScrollY = window.pageYOffset;
        
        // 使用节流优化性能
        const handleScroll = ScrollAnimations.throttle(() => {
            this.updateNavbar();
        }, 10);

        window.addEventListener('scroll', handleScroll, { passive: true });
        this.updateNavbar(); // 初始状态
    },

    updateNavbar() {
        const scrollY = window.pageYOffset;
        
        if (scrollY > this.scrollThreshold) {
            this.navbar.classList.add('scrolled');
            
            // 向下滚动时隐藏导航栏，向上滚动时显示（可选）
            // if (scrollY > this.lastScrollY && scrollY > 200) {
            //     this.navbar.style.transform = 'translateY(-100%)';
            // } else {
            //     this.navbar.style.transform = 'translateY(0)';
            // }
        } else {
            this.navbar.classList.remove('scrolled');
        }

        this.lastScrollY = scrollY;
    }
};

// 视差滚动效果
const ParallaxScroll = {
    parallaxElements: [],
    rafId: null,

    init() {
        this.parallaxElements = document.querySelectorAll('.parallax-element');
        if (this.parallaxElements.length === 0) return;

        // 使用requestAnimationFrame优化性能
        const handleScroll = () => {
            this.updateParallax();
            this.rafId = requestAnimationFrame(handleScroll);
        };

        // 使用节流优化
        const throttledScroll = ScrollAnimations.throttle(() => {
            if (!this.rafId) {
                this.rafId = requestAnimationFrame(handleScroll);
            }
        }, 16); // 约60fps

        window.addEventListener('scroll', throttledScroll, { passive: true });
        this.updateParallax(); // 初始更新
    },

    updateParallax() {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;

        this.parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const elementHeight = rect.height;
            const elementCenter = elementTop + elementHeight / 2;
            const viewportCenter = scrollY + windowHeight / 2;
            
            // 计算视差偏移
            const distance = elementCenter - viewportCenter;
            const parallaxSpeed = parseFloat(element.dataset.parallaxSpeed) || 0.5;
            const offset = distance * parallaxSpeed;

            // 应用变换（使用transform而不是top/left，性能更好）
            element.style.transform = `translateY(${offset}px)`;
        });

        // 重置requestAnimationFrame ID
        this.rafId = null;
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化滚动动画
    ScrollAnimations.init();
    
    // 初始化导航栏滚动效果
    NavbarScroll.init();
    
    // 初始化视差滚动
    ParallaxScroll.init();
});

// 导出供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ScrollAnimations, NavbarScroll, ParallaxScroll };
}




