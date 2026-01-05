// 应用状态管理模块
// 使用localStorage存储用户的点赞和收藏数据

const AppState = {
    // localStorage键名
    STORAGE_KEYS: {
        LIKES: 'stargazing_likes',
        FAVORITES: 'stargazing_favorites',
        LIKE_COUNTS: 'stargazing_like_counts'
    },

    // 初始化状态
    init() {
        // 确保localStorage数据存在
        if (!localStorage.getItem(this.STORAGE_KEYS.LIKES)) {
            localStorage.setItem(this.STORAGE_KEYS.LIKES, JSON.stringify({}));
        }
        if (!localStorage.getItem(this.STORAGE_KEYS.FAVORITES)) {
            localStorage.setItem(this.STORAGE_KEYS.FAVORITES, JSON.stringify([]));
        }
        if (!localStorage.getItem(this.STORAGE_KEYS.LIKE_COUNTS)) {
            localStorage.setItem(this.STORAGE_KEYS.LIKE_COUNTS, JSON.stringify({}));
        }
    },

    // 获取点赞状态
    getLikes() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.LIKES) || '{}');
        } catch (e) {
            return {};
        }
    },

    // 获取收藏列表
    getFavorites() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.FAVORITES) || '[]');
        } catch (e) {
            return [];
        }
    },

    // 获取点赞数（包括用户自己的点赞）
    getLikeCounts() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEYS.LIKE_COUNTS) || '{}');
        } catch (e) {
            return {};
        }
    },

    // 检查作品是否被点赞
    isLiked(artworkId) {
        const likes = this.getLikes();
        return likes[artworkId] === true;
    },

    // 切换点赞状态
    toggleLike(artworkId, baseCount = 0) {
        const likes = this.getLikes();
        const likeCounts = this.getLikeCounts();
        const isLiked = likes[artworkId] === true;
        
        // 更新点赞状态
        likes[artworkId] = !isLiked;
        localStorage.setItem(this.STORAGE_KEYS.LIKES, JSON.stringify(likes));
        
        // 更新点赞数
        if (!likeCounts[artworkId]) {
            likeCounts[artworkId] = baseCount;
        }
        likeCounts[artworkId] += isLiked ? -1 : 1;
        localStorage.setItem(this.STORAGE_KEYS.LIKE_COUNTS, JSON.stringify(likeCounts));
        
        // 触发自定义事件，通知其他组件更新
        window.dispatchEvent(new CustomEvent('likeChanged', {
            detail: { artworkId, isLiked: !isLiked, count: likeCounts[artworkId] }
        }));
        
        return { isLiked: !isLiked, count: likeCounts[artworkId] };
    },

    // 获取作品点赞数
    getLikeCount(artworkId, baseCount = 0) {
        const likeCounts = this.getLikeCounts();
        return likeCounts[artworkId] !== undefined ? likeCounts[artworkId] : baseCount;
    },

    // 检查作品是否被收藏
    isFavorited(artworkId) {
        const favorites = this.getFavorites();
        return favorites.includes(artworkId);
    },

    // 切换收藏状态
    toggleFavorite(artworkId) {
        const favorites = this.getFavorites();
        const index = favorites.indexOf(artworkId);
        const isFavorited = index !== -1;
        
        if (isFavorited) {
            favorites.splice(index, 1);
        } else {
            favorites.push(artworkId);
        }
        
        localStorage.setItem(this.STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
        
        // 触发自定义事件，通知其他组件更新
        window.dispatchEvent(new CustomEvent('favoriteChanged', {
            detail: { artworkId, isFavorited: !isFavorited }
        }));
        
        return !isFavorited;
    },

    // 获取收藏的作品ID列表
    getFavoriteIds() {
        return this.getFavorites();
    },

    // 更新作品的基础点赞数（从服务器获取或初始值）
    updateBaseLikeCount(artworkId, count) {
        const likeCounts = this.getLikeCounts();
        // 只在没有用户点赞的情况下更新基础值
        if (!likeCounts[artworkId]) {
            likeCounts[artworkId] = count;
            localStorage.setItem(this.STORAGE_KEYS.LIKE_COUNTS, JSON.stringify(likeCounts));
        }
    }
};

// 初始化状态
AppState.init();




