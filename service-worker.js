// Service Worker - 实现离线访问和缓存

const CACHE_NAME = 'stargazing-v1';
const RUNTIME_CACHE = 'stargazing-runtime';

// 需要缓存的资源列表
const STATIC_CACHE_URLS = [
    '/',
    '/index.html',
    '/gallery.html',
    '/styles/main.css',
    '/styles/responsive.css',
    '/styles/performance.css',
    '/styles/gallery.css',
    '/app-state.js',
    '/script.js',
    '/gallery.js',
    '/scroll-animations.js',
    '/performance.js',
    '/compatibility.js',
    '/scripts/data.js'
];

// 安装事件 - 缓存静态资源
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Caching static assets');
                return cache.addAll(STATIC_CACHE_URLS);
            })
            .then(() => {
                return self.skipWaiting(); // 强制激活新的Service Worker
            })
            .catch((error) => {
                console.error('[Service Worker] Cache install failed:', error);
            })
    );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim(); // 立即控制所有客户端
        })
    );
});

// 获取请求 - 网络优先，缓存降级
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // 只处理同源请求
    if (url.origin !== location.origin) {
        return;
    }

    // HTML页面 - 网络优先
    if (request.headers.get('accept').includes('text/html')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // 克隆响应并缓存
                    const responseClone = response.clone();
                    caches.open(RUNTIME_CACHE).then((cache) => {
                        cache.put(request, responseClone);
                    });
                    return response;
                })
                .catch(() => {
                    // 网络失败，使用缓存
                    return caches.match(request);
                })
        );
        return;
    }

    // CSS/JS/JSON - 缓存优先
    if (
        request.destination === 'style' ||
        request.destination === 'script' ||
        request.destination === 'manifest' ||
        url.pathname.endsWith('.json')
    ) {
        event.respondWith(
            caches.match(request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return fetch(request).then((response) => {
                        const responseClone = response.clone();
                        caches.open(RUNTIME_CACHE).then((cache) => {
                            cache.put(request, responseClone);
                        });
                        return response;
                    });
                })
        );
        return;
    }

    // 图片 - 缓存优先
    if (request.destination === 'image') {
        event.respondWith(
            caches.match(request)
                .then((cachedResponse) => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    return fetch(request).then((response) => {
                        // 只缓存成功的响应
                        if (response.status === 200) {
                            const responseClone = response.clone();
                            caches.open(RUNTIME_CACHE).then((cache) => {
                                cache.put(request, responseClone);
                            });
                        }
                        return response;
                    });
                })
                .catch(() => {
                    // 如果图片加载失败，返回占位图
                    return new Response(
                        '<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg"><rect width="800" height="600" fill="#1a1f3a"/><text x="50%" y="50%" text-anchor="middle" fill="#6366f1" font-size="24">图片加载失败</text></svg>',
                        { headers: { 'Content-Type': 'image/svg+xml' } }
                    );
                })
        );
        return;
    }

    // 其他请求 - 网络优先
    event.respondWith(
        fetch(request)
            .catch(() => caches.match(request))
    );
});

// 后台同步（可选）
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        console.log('[Service Worker] Background sync');
        event.waitUntil(doBackgroundSync());
    }
});

function doBackgroundSync() {
    // 在这里执行后台同步任务
    return Promise.resolve();
}




