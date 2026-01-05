// 性能优化模块
// 处理图片懒加载、资源预加载、性能监控等

const PerformanceOptimizer = {
    // 图片懒加载（增强版，支持WebP检测）
    initImageLazyLoad() {
        // 如果浏览器支持Intersection Observer，使用它
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px' // 提前50px开始加载
            });

            // 观察所有需要懒加载的图片
            const lazyImages = document.querySelectorAll('img[data-src], img[data-srcset]');
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // 降级方案：使用滚动事件
            this.initScrollLazyLoad();
        }
    },

    // 滚动事件懒加载（降级方案）
    initScrollLazyLoad() {
        const lazyImages = document.querySelectorAll('img[data-src], img[data-srcset]');
        
        const loadImages = () => {
            lazyImages.forEach(img => {
                const rect = img.getBoundingClientRect();
                if (rect.top < window.innerHeight + 100) {
                    this.loadImage(img);
                }
            });
        };

        // 使用节流优化性能
        let ticking = false;
        const scrollHandler = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    loadImages();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', scrollHandler, { passive: true });
        loadImages(); // 初始加载可见图片
    },

    // 加载图片
    loadImage(img) {
        // 检查WebP支持
        this.supportsWebP().then(supportsWebP => {
            if (img.dataset.src) {
                // 如果有WebP版本且支持
                if (supportsWebP && img.dataset.srcWebp) {
                    img.src = img.dataset.srcWebp;
                } else {
                    img.src = img.dataset.src;
                }
            }

            if (img.dataset.srcset) {
                // 处理srcset
                let srcset = img.dataset.srcset;
                if (supportsWebP && img.dataset.srcsetWebp) {
                    srcset = img.dataset.srcsetWebp;
                }
                img.srcset = srcset;
            }

            // 移除data属性，避免重复加载
            img.removeAttribute('data-src');
            img.removeAttribute('data-src-webp');
            img.removeAttribute('data-srcset');
            img.removeAttribute('data-srcset-webp');

            // 添加加载完成类
            img.classList.add('loaded');
        });
    },

    // 检测WebP支持
    supportsWebP() {
        return new Promise(resolve => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    },

    // 预加载关键资源
    preloadResources() {
        const criticalImages = document.querySelectorAll('link[rel="preload"][as="image"]');
        criticalImages.forEach(link => {
            const img = new Image();
            img.src = link.href;
        });
    },

    // 延迟加载非关键脚本
    loadNonCriticalScripts() {
        // 使用requestIdleCallback在浏览器空闲时加载
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                this.loadDeferredScripts();
            }, { timeout: 2000 });
        } else {
            // 降级方案：延迟加载
            setTimeout(() => {
                this.loadDeferredScripts();
            }, 3000);
        }
    },

    // 加载延迟脚本
    loadDeferredScripts() {
        const deferredScripts = document.querySelectorAll('script[data-defer]');
        deferredScripts.forEach(script => {
            const newScript = document.createElement('script');
            if (script.src) {
                newScript.src = script.src;
            } else {
                newScript.textContent = script.textContent;
            }
            if (script.async) {
                newScript.async = true;
            }
            document.body.appendChild(newScript);
            script.remove();
        });
    }
};

// 页面加载优化
const PageLoader = {
    // 显示加载动画
    showLoader() {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            loader.classList.add('active');
        }
    },

    // 隐藏加载动画
    hideLoader() {
        const loader = document.getElementById('pageLoader');
        if (loader) {
            loader.classList.remove('active');
            // 延迟移除DOM元素
            setTimeout(() => {
                if (loader.parentNode) {
                    loader.remove();
                }
            }, 500);
        }
    },

    // 初始化
    init() {
        // 页面加载完成后隐藏加载动画
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.hideLoader();
            });
        } else {
            // 如果DOM已经加载完成，直接隐藏
            this.hideLoader();
        }

        // 如果所有资源都加载完成
        window.addEventListener('load', () => {
            this.hideLoader();
        });
    }
};

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化图片懒加载
    PerformanceOptimizer.initImageLazyLoad();
    
    // 预加载关键资源
    PerformanceOptimizer.preloadResources();
    
    // 初始化页面加载器
    PageLoader.init();
});

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PerformanceOptimizer, PageLoader };
}




