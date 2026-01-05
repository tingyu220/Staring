// 作品展示页面JavaScript功能

// 引入状态管理模块（需要在HTML中先加载app-state.js）
if (typeof AppState === 'undefined') {
    console.warn('AppState未加载，点赞和收藏功能可能无法正常工作');
}

// 作品数据（从data.js导入，如果不存在则使用默认数据）
let artworksData = [];

// 如果data.js已加载，使用worksData，否则使用默认数据
// 注意：data.js需要先于gallery.js加载
if (typeof worksData !== 'undefined' && Array.isArray(worksData) && worksData.length > 0) {
    try {
        artworksData = worksData.map(work => ({
            id: work.id,
            title: work.title,
            author: work.photographer ? work.photographer.name : '未知',
            location: work.shooting ? work.shooting.location : '未知',
            category: (work.tags && work.tags[0]) ? work.tags[0] : '其他',
            likes: work.interaction ? work.interaction.likes : 0,
            comments: work.interaction ? work.interaction.comments : 0,
            date: work.shooting ? work.shooting.date : '未知',
            image: work.image || ''
        }));
    } catch (e) {
        console.warn('使用worksData时出错，将使用默认数据:', e);
        artworksData = getDefaultData();
    }
} else {
    // 默认数据（向后兼容）
    artworksData = getDefaultData();
}

// 获取默认数据函数
function getDefaultData() {
    const pictures = [
        'images/Picture1.jpg', 'images/Picture2.jpg', 'images/Picture3.jpg',
        'images/Picture4.jpg', 'images/Picture5.jpg', 'images/Picture6.jpg',
        'images/Picture7.jpg', 'images/Picture8.jpg', 'images/Picture9.jpg',
        'images/Picture10.jpg'
    ];
    
    return [
        { id: 1, title: "银河拱桥下的山峰", author: "星空摄影师", location: "西藏", category: "银河", likes: 1024, comments: 128, date: "2024-08", image: pictures[0] },
        { id: 2, title: "星轨下的古建筑", author: "夜拍达人", location: "北京", category: "星轨", likes: 892, comments: 96, date: "2024-07", image: pictures[1] },
        { id: 3, title: "极光与星空共舞", author: "极光猎人", location: "内蒙古", category: "极光", likes: 1523, comments: 187, date: "2024-03", image: pictures[2] },
        { id: 4, title: "银河倒影", author: "银河捕手", location: "新疆", category: "银河", likes: 756, comments: 84, date: "2024-06", image: pictures[3] },
        { id: 5, title: "英仙座流星雨", author: "流星观测者", location: "内蒙古", category: "银河", likes: 1342, comments: 156, date: "2024-08", image: pictures[4] },
        { id: 6, title: "猎户座大星云", author: "深空摄影师", location: "云南", category: "深空", likes: 623, comments: 72, date: "2024-01", image: pictures[5] },
        { id: 7, title: "银河下的湖泊", author: "星空摄影师", location: "青海", category: "银河", likes: 945, comments: 112, date: "2024-07", image: pictures[6] },
        { id: 8, title: "城市星轨", author: "夜拍达人", location: "北京", category: "星轨", likes: 587, comments: 68, date: "2024-06", image: pictures[7] },
        { id: 9, title: "北极光", author: "极光猎人", location: "内蒙古", category: "极光", likes: 1876, comments: 234, date: "2024-02", image: pictures[8] },
        { id: 10, title: "玫瑰星云", author: "深空摄影师", location: "四川", category: "深空", likes: 432, comments: 54, date: "2023-12", image: pictures[9] },
        { id: 11, title: "银河中心", author: "银河捕手", location: "西藏", category: "银河", likes: 1123, comments: 145, date: "2024-05", image: pictures[0] },
        { id: 12, title: "星轨环绕", author: "星空摄影师", location: "新疆", category: "星轨", likes: 678, comments: 89, date: "2024-04", image: pictures[1] },
        { id: 13, title: "南极光", author: "极光猎人", location: "内蒙古", category: "极光", likes: 987, comments: 123, date: "2024-01", image: pictures[2] },
        { id: 14, title: "仙女座星系", author: "深空摄影师", location: "云南", category: "深空", likes: 543, comments: 67, date: "2023-11", image: pictures[3] },
        { id: 15, title: "银河下的帐篷", author: "星空摄影师", location: "青海", category: "银河", likes: 834, comments: 98, date: "2024-06", image: pictures[4] },
        { id: 16, title: "长时间星轨", author: "夜拍达人", location: "北京", category: "星轨", likes: 456, comments: 56, date: "2024-03", image: pictures[5] },
        { id: 17, title: "绿色极光", author: "极光猎人", location: "内蒙古", category: "极光", likes: 1456, comments: 178, date: "2024-04", image: pictures[6] },
        { id: 18, title: "马头星云", author: "深空摄影师", location: "四川", category: "深空", likes: 389, comments: 48, date: "2023-10", image: pictures[7] },
        { id: 19, title: "银河下的雪山", author: "银河捕手", location: "西藏", category: "银河", likes: 1234, comments: 167, date: "2024-07", image: pictures[8] },
        { id: 20, title: "旋转星轨", author: "星空摄影师", location: "新疆", category: "星轨", likes: 567, comments: 71, date: "2024-02", image: pictures[9] },
        { id: 21, title: "紫色极光", author: "极光猎人", location: "内蒙古", category: "极光", likes: 1654, comments: 201, date: "2024-05", image: pictures[0] },
        { id: 22, title: "猫眼星云", author: "深空摄影师", location: "云南", category: "深空", likes: 412, comments: 52, date: "2023-09", image: pictures[1] },
        { id: 23, title: "银河下的草原", author: "星空摄影师", location: "青海", category: "银河", likes: 923, comments: 109, date: "2024-08", image: pictures[2] },
        { id: 24, title: "圆形星轨", author: "夜拍达人", location: "北京", category: "星轨", likes: 634, comments: 78, date: "2024-01", image: pictures[3] }
    ];
}

// 全局变量
let currentFilter = {
    category: 'all',
    location: 'all',
    sort: 'latest',
    search: ''
};
let displayedCount = 0;
const itemsPerPage = 12;

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化状态管理
    if (typeof AppState !== 'undefined') {
        AppState.init();
        setupStateListeners();
    }
    initializeGallery();
    setupFilters();
    setupSearch();
    setupLoadMore();
});

// 设置状态监听器，确保数据一致性
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

// 更新点赞UI
function updateLikeUI(artworkId, isLiked, count) {
    // 更新卡片中的点赞按钮
    const cards = document.querySelectorAll(`.gallery-card[data-id="${artworkId}"]`);
    cards.forEach(card => {
        const likeBtn = card.querySelector('.like-btn');
        const countSpan = likeBtn?.querySelector('.action-count');
        const icon = likeBtn?.querySelector('.action-icon');
        if (likeBtn) {
            likeBtn.setAttribute('data-liked', isLiked);
            if (isLiked) {
                likeBtn.classList.add('liked');
                if (icon) icon.textContent = '❤️'; // 实心
            } else {
                likeBtn.classList.remove('liked');
                if (icon) icon.textContent = '🤍'; // 空心
            }
        }
        if (countSpan && count !== undefined) {
            countSpan.textContent = count;
        }
    });

    // 更新模态框中的点赞按钮（如果当前显示的是这个作品）
    const imageModal = document.getElementById('imageModal');
    if (imageModal && imageModal.classList.contains('active')) {
        const modalLike = document.getElementById('modalLike');
        if (modalLike && modalLike.getAttribute('data-artwork-id') == artworkId) {
            const modalLikeIcon = modalLike.querySelector('.action-icon');
            const modalLikeCount = modalLike.querySelector('.action-count');
            if (isLiked) {
                modalLike.classList.add('liked');
                if (modalLikeIcon) modalLikeIcon.textContent = '❤️';
            } else {
                modalLike.classList.remove('liked');
                if (modalLikeIcon) modalLikeIcon.textContent = '🤍';
            }
            if (modalLikeCount && count !== undefined) {
                modalLikeCount.textContent = count;
            }
        }
    }
}

// 更新收藏UI
function updateFavoriteUI(artworkId, isFavorited) {
    // 更新卡片中的收藏按钮
    const cards = document.querySelectorAll(`.gallery-card[data-id="${artworkId}"]`);
    cards.forEach(card => {
        const favoriteBtn = card.querySelector('.favorite-btn');
        const icon = favoriteBtn?.querySelector('.action-icon');
        if (favoriteBtn) {
            favoriteBtn.setAttribute('data-favorited', isFavorited);
            if (isFavorited) {
                favoriteBtn.classList.add('favorited');
                if (icon) icon.textContent = '⭐'; // 实心
            } else {
                favoriteBtn.classList.remove('favorited');
                if (icon) icon.textContent = '☆'; // 空心
            }
        }
    });

    // 更新模态框中的收藏按钮（如果当前显示的是这个作品）
    const imageModal = document.getElementById('imageModal');
    if (imageModal && imageModal.classList.contains('active')) {
        const modalFavorite = document.getElementById('modalFavorite');
        if (modalFavorite && modalFavorite.getAttribute('data-artwork-id') == artworkId) {
            const modalFavoriteIcon = modalFavorite.querySelector('.action-icon');
            if (isFavorited) {
                modalFavorite.classList.add('favorited');
                if (modalFavoriteIcon) modalFavoriteIcon.textContent = '⭐';
            } else {
                modalFavorite.classList.remove('favorited');
                if (modalFavoriteIcon) modalFavoriteIcon.textContent = '☆';
            }
        }
    }
}

// 初始化画廊
function initializeGallery() {
    // 从gallery.js加载的数据已经准备好了
    displayArtworks();
    
    // 初始化滚动动画（如果已加载）
    if (typeof ScrollAnimations !== 'undefined' && ScrollAnimations.reinit) {
        ScrollAnimations.reinit();
    }
}

// 设置筛选器
function setupFilters() {
    // 类别筛选
    const categoryBtns = document.querySelectorAll('.filter-category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有active类
            categoryBtns.forEach(b => b.classList.remove('active'));
            // 添加active类到当前按钮
            this.classList.add('active');
            // 更新筛选条件
            currentFilter.category = this.getAttribute('data-category') || 'all';
            displayedCount = 0;
            displayArtworks();
        });
    });

    // 地点筛选
    const locationSelect = document.getElementById('locationSelect');
    if (locationSelect) {
        locationSelect.addEventListener('change', function() {
            currentFilter.location = this.value;
            displayedCount = 0;
            displayArtworks();
        });
    }

    // 排序筛选
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            currentFilter.sort = this.value;
            displayedCount = 0;
            displayArtworks();
        });
    }

    // 移动端筛选器折叠按钮
    const filtersToggle = document.getElementById('filtersToggle');
    const filtersPanel = document.getElementById('filtersPanel');
    if (filtersToggle && filtersPanel) {
        filtersToggle.addEventListener('click', function() {
            const isExpanded = filtersPanel.classList.contains('active');
            this.setAttribute('aria-expanded', !isExpanded);
            filtersPanel.classList.toggle('active');
        });
    }
}

// 设置搜索功能
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentFilter.search = this.value.trim().toLowerCase();
                displayedCount = 0;
                displayArtworks();
            }, 300); // 防抖，300ms后执行
        });
    }
}

// 过滤和排序作品
function getFilteredAndSortedArtworks() {
    let filtered = artworksData.filter(artwork => {
        // 类别筛选
        if (currentFilter.category !== 'all' && artwork.category !== currentFilter.category) {
            return false;
        }
        // 地点筛选
        if (currentFilter.location !== 'all' && artwork.location !== currentFilter.location) {
            return false;
        }
        // 搜索筛选
        if (currentFilter.search) {
            const searchText = currentFilter.search;
            const titleMatch = artwork.title.toLowerCase().includes(searchText);
            const authorMatch = artwork.author.toLowerCase().includes(searchText);
            if (!titleMatch && !authorMatch) {
                return false;
            }
        }
        return true;
    });

    // 排序
    filtered.sort((a, b) => {
        switch (currentFilter.sort) {
            case 'hot':
                return b.likes - a.likes;
            case 'comments':
                return b.comments - a.comments;
            case 'latest':
            default:
                // 按日期排序（简单处理，实际应该解析日期）
                return b.id - a.id;
        }
    });

    return filtered;
}

// 显示作品
function displayArtworks() {
    const galleryGrid = document.getElementById('galleryGrid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!galleryGrid) return;

    const filtered = getFilteredAndSortedArtworks();
    const toShow = filtered.slice(displayedCount, displayedCount + itemsPerPage);

    // 创建并添加卡片
    toShow.forEach(artwork => {
        const card = createArtworkCard(artwork);
        galleryGrid.appendChild(card);
    });

    displayedCount += toShow.length;

    // 更新"加载更多"按钮
    if (loadMoreBtn) {
        if (displayedCount < filtered.length) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
}

// 创建作品卡片
function createArtworkCard(artwork) {
    const article = document.createElement('article');
    article.className = 'gallery-card';
    article.setAttribute('data-id', artwork.id);

    article.innerHTML = `
        <div class="card-image-wrapper">
            <img 
                src="${artwork.image}" 
                alt="${artwork.title}" 
                class="card-image"
                loading="lazy"
            >
            <div class="card-overlay">
                <button class="card-view-btn" aria-label="查看大图">
                    <span>🔍</span> 查看大图
                </button>
            </div>
        </div>
        <div class="card-content">
            <h3 class="card-title">${artwork.title}</h3>
            <div class="card-author">
                <div class="author-avatar">📸</div>
                <div class="author-info">
                    <span class="author-name">${artwork.author}</span>
                    <span class="card-location">📍 ${artwork.location} · ${artwork.date}</span>
                </div>
            </div>
            <div class="card-tags">
                <span class="tag">${artwork.category}</span>
            </div>
                    <div class="card-actions">
                        <button class="action-btn like-btn" aria-label="点赞" data-liked="false" data-artwork-id="${artwork.id}">
                            <span class="action-icon">🤍</span>
                            <span class="action-count">${typeof AppState !== 'undefined' ? AppState.getLikeCount(artwork.id, artwork.likes) : artwork.likes}</span>
                        </button>
                        <button class="action-btn comment-btn" aria-label="评论">
                            <span class="action-icon">💬</span>
                            <span class="action-count">${artwork.comments}</span>
                        </button>
                        <button class="action-btn favorite-btn" aria-label="收藏" data-favorited="false" data-artwork-id="${artwork.id}">
                            <span class="action-icon">⭐</span>
                            <span>收藏</span>
                        </button>
                    </div>
        </div>
    `;

    // 设置事件监听器
    setupCardEvents(article, artwork);

    return article;
}

function setupCardEvents(card, artwork) {
    // 查看大图按钮
    const viewBtn = card.querySelector('.card-view-btn');
    if (viewBtn) {
        viewBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const img = card.querySelector('.card-image');
            if (img) {
                openImageModal(img.src, img.alt, artwork);
            }
        });
    }

    // 图片点击
    const img = card.querySelector('.card-image');
    if (img) {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            openImageModal(this.src, this.alt, artwork);
        });
    }

    // 点赞按钮
    const likeBtn = card.querySelector('.like-btn');
    if (likeBtn && typeof AppState !== 'undefined') {
        const isLiked = AppState.isLiked(artwork.id);
        likeBtn.setAttribute('data-liked', isLiked);
        if (isLiked) {
            likeBtn.classList.add('liked');
            const icon = likeBtn.querySelector('.action-icon');
            if (icon) icon.textContent = '❤️';
        }
        
        likeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const result = AppState.toggleLike(artwork.id, artwork.likes);
            // UI更新由事件监听器处理
        });
    }

    // 收藏按钮
    const favoriteBtn = card.querySelector('.favorite-btn');
    if (favoriteBtn && typeof AppState !== 'undefined') {
        const isFavorited = AppState.isFavorited(artwork.id);
        favoriteBtn.setAttribute('data-favorited', isFavorited);
        if (isFavorited) {
            favoriteBtn.classList.add('favorited');
            const icon = favoriteBtn.querySelector('.action-icon');
            if (icon) icon.textContent = '⭐';
        }
        
        favoriteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            AppState.toggleFavorite(artwork.id);
            // UI更新由事件监听器处理
        });
    }

    // 评论按钮（模拟）
    const commentBtn = card.querySelector('.comment-btn');
    if (commentBtn) {
        commentBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            // 模拟评论功能
            console.log('评论:', artwork.title);
        });
    }
}

// 模态框全局变量
let currentModalIndex = -1;
let currentModalArtworks = [];
let modalKeyboardHandler = null;
let modalTouchStartX = 0;
let modalTouchEndX = 0;

// 打开大图模态框
function openImageModal(imageSrc, imageTitle, artwork = null) {
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalLoading = document.getElementById('modalLoading');
    const body = document.body;

    if (!imageModal || !modalImage || !modalTitle) return;

    // 获取当前过滤后的作品列表
    currentModalArtworks = getFilteredAndSortedArtworks();
    
    // 查找当前作品的索引
    if (artwork) {
        currentModalIndex = currentModalArtworks.findIndex(a => a.id === artwork.id);
    } else {
        currentModalIndex = currentModalArtworks.findIndex(a => a.image === imageSrc);
    }
    
    if (currentModalIndex === -1) {
        currentModalIndex = 0;
    }

    // 显示加载状态
    if (modalLoading) {
        modalLoading.classList.remove('hidden');
    }
    modalImage.classList.remove('loaded');
    
    // 更新图片和信息
    updateModalContent(currentModalArtworks[currentModalIndex]);

    // 显示模态框
    imageModal.setAttribute('aria-hidden', 'false');
    imageModal.classList.add('active');
    body.classList.add('modal-open');

    // 图片加载完成
    modalImage.onload = function() {
        if (modalLoading) {
            modalLoading.classList.add('hidden');
        }
        modalImage.classList.add('loaded');
    };

    modalImage.onerror = function() {
        if (modalLoading) {
            modalLoading.textContent = '加载失败';
        }
    };

    // 设置事件监听器
    setupModalEvents();
}

// 更新模态框内容
function updateModalContent(artwork) {
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalAuthor = document.getElementById('modalAuthor');
    const modalLocation = document.getElementById('modalLocation');
    const modalDate = document.getElementById('modalDate');
    const modalCamera = document.getElementById('modalCamera');
    const modalLens = document.getElementById('modalLens');
    const modalSettings = document.getElementById('modalSettings');
    const modalLike = document.getElementById('modalLike');
    const modalFavorite = document.getElementById('modalFavorite');
    const modalCommentCount = document.getElementById('modalCommentCount');
    const modalLikeCount = document.getElementById('modalLikeCount');

    if (!modalImage || !modalTitle) return;

    // 更新图片
    modalImage.src = artwork.image;
    modalImage.alt = artwork.title;

    // 更新标题
    modalTitle.textContent = artwork.title;

    // 更新其他信息（如果存在）
    if (modalAuthor) modalAuthor.textContent = artwork.author || '';
    if (modalLocation) modalLocation.textContent = artwork.location || '';
    if (modalDate) modalDate.textContent = artwork.date || '';
    
    // 如果有完整的数据（从data.js）
    if (typeof getWorkById !== 'undefined') {
        const fullWork = getWorkById(artwork.id);
        if (fullWork) {
            if (modalCamera && fullWork.shooting && fullWork.shooting.equipment) {
                modalCamera.textContent = fullWork.shooting.equipment.camera || '';
            }
            if (modalLens && fullWork.shooting && fullWork.shooting.equipment) {
                modalLens.textContent = fullWork.shooting.equipment.lens || fullWork.shooting.equipment.telescope || '';
            }
            if (modalSettings && fullWork.shooting && fullWork.shooting.equipment) {
                modalSettings.textContent = fullWork.shooting.equipment.settings || '';
            }
        }
    }

    // 更新互动数据
    if (modalLikeCount && typeof AppState !== 'undefined') {
        modalLikeCount.textContent = AppState.getLikeCount(artwork.id, artwork.likes);
    } else if (modalLikeCount) {
        modalLikeCount.textContent = artwork.likes || 0;
    }
    
    if (modalCommentCount) {
        modalCommentCount.textContent = artwork.comments || 0;
    }

    // 更新点赞和收藏状态
    if (typeof AppState !== 'undefined') {
        const isLiked = AppState.isLiked(artwork.id);
        const isFavorited = AppState.isFavorited(artwork.id);
        
        if (modalLike) {
            modalLike.setAttribute('data-artwork-id', artwork.id);
            modalLike.setAttribute('data-liked', isLiked);
            if (isLiked) {
                modalLike.classList.add('liked');
                const icon = modalLike.querySelector('.action-icon');
                if (icon) icon.textContent = '❤️';
            } else {
                modalLike.classList.remove('liked');
                const icon = modalLike.querySelector('.action-icon');
                if (icon) icon.textContent = '🤍';
            }
        }
        
        if (modalFavorite) {
            modalFavorite.setAttribute('data-artwork-id', artwork.id);
            modalFavorite.setAttribute('data-favorited', isFavorited);
            if (isFavorited) {
                modalFavorite.classList.add('favorited');
                const icon = modalFavorite.querySelector('.action-icon');
                if (icon) icon.textContent = '⭐';
            } else {
                modalFavorite.classList.remove('favorited');
                const icon = modalFavorite.querySelector('.action-icon');
                if (icon) icon.textContent = '☆';
            }
        }
    }
}

// 关闭模态框
function closeImageModal() {
    const imageModal = document.getElementById('imageModal');
    const body = document.body;
    
    if (!imageModal) return;
    
    imageModal.setAttribute('aria-hidden', 'true');
    imageModal.classList.remove('active');
    body.classList.remove('modal-open');
    
    // 移除键盘事件监听器
    if (modalKeyboardHandler) {
        document.removeEventListener('keydown', modalKeyboardHandler);
        modalKeyboardHandler = null;
    }
}

// 设置模态框事件
function setupModalEvents() {
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    const modalLike = document.getElementById('modalLike');
    const modalFavorite = document.getElementById('modalFavorite');
    const modalDownload = document.getElementById('modalDownload');

    // 关闭按钮
    if (modalClose) {
        modalClose.onclick = closeImageModal;
    }

    // 遮罩层点击关闭
    if (modalOverlay) {
        modalOverlay.onclick = closeImageModal;
    }

    // 上一张
    if (modalPrev) {
        modalPrev.onclick = function() {
            if (currentModalIndex > 0) {
                currentModalIndex--;
                updateModalContent(currentModalArtworks[currentModalIndex]);
            }
        };
    }

    // 下一张
    if (modalNext) {
        modalNext.onclick = function() {
            if (currentModalIndex < currentModalArtworks.length - 1) {
                currentModalIndex++;
                updateModalContent(currentModalArtworks[currentModalIndex]);
            }
        };
    }

    // 点赞
    if (modalLike && typeof AppState !== 'undefined') {
        modalLike.onclick = function() {
            const artworkId = parseInt(this.getAttribute('data-artwork-id'));
            const artwork = currentModalArtworks[currentModalIndex];
            if (artwork) {
                AppState.toggleLike(artworkId, artwork.likes);
            }
        };
    }

    // 收藏
    if (modalFavorite && typeof AppState !== 'undefined') {
        modalFavorite.onclick = function() {
            const artworkId = parseInt(this.getAttribute('data-artwork-id'));
            AppState.toggleFavorite(artworkId);
        };
    }

    // 下载（模拟）
    if (modalDownload) {
        modalDownload.onclick = function() {
            const modalImage = document.getElementById('modalImage');
            if (modalImage && modalImage.src) {
                downloadImage(modalImage.src, document.getElementById('modalTitle')?.textContent || 'image');
            }
        };
    }

    // 键盘导航
    modalKeyboardHandler = function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        } else if (e.key === 'ArrowLeft' && modalPrev) {
            modalPrev.click();
        } else if (e.key === 'ArrowRight' && modalNext) {
            modalNext.click();
        }
    };
    document.addEventListener('keydown', modalKeyboardHandler);

    // 触摸滑动
    const modalImageContainer = document.querySelector('.modal-image-container');
    if (modalImageContainer) {
        modalImageContainer.addEventListener('touchstart', function(e) {
            modalTouchStartX = e.touches[0].clientX;
        });

        modalImageContainer.addEventListener('touchend', function(e) {
            modalTouchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        });
    }
}

// 处理滑动
function handleSwipe() {
    const swipeThreshold = 50;
    const diff = modalTouchStartX - modalTouchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // 向左滑动，下一张
            const modalNext = document.getElementById('modalNext');
            if (modalNext) modalNext.click();
        } else {
            // 向右滑动，上一张
            const modalPrev = document.getElementById('modalPrev');
            if (modalPrev) modalPrev.click();
        }
    }
}

// 下载图片（模拟）
function downloadImage(imageSrc, imageTitle) {
    // 创建一个临时的a标签来触发下载
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `${imageTitle}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 设置加载更多按钮
function setupLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            displayArtworks();
        });
    }
}
