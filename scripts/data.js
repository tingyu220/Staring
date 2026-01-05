// 模拟数据系统
// 包含作品数据、天象事件、教程攻略等

// ============================================
// 作品数据数组
// ============================================
const worksData = [
    {
        id: 1,
        title: "银河拱桥下的山峰",
        description: "在海拔4500米的西藏高原，捕捉到壮观的银河拱桥横跨雪山之巅。使用大光圈镜头和长时间曝光，展现了宇宙的壮丽与地球的雄伟。",
        image: "images/Picture1.jpg",
        photographer: {
            name: "星空摄影师",
            avatar: "images/主页分栏的黑白图/logo.png",
            bio: "专业星空摄影师，专注于银河和深空摄影，拥有10年拍摄经验。"
        },
        shooting: {
            location: "西藏",
            locationDetail: "西藏阿里地区，海拔4500米",
            time: "2024-08-15",
            date: "2024年8月",
            equipment: {
                camera: "Sony A7R IV",
                lens: "Sony FE 14mm F1.8 GM",
                settings: "f/1.8, ISO 3200, 30s",
                tripod: "Gitzo GT3543XLS"
            }
        },
        interaction: {
            likes: 1024,
            comments: 128,
            favorites: 356
        },
        tags: ["银河", "星空", "风光", "雪山", "高原"]
    },
    {
        id: 2,
        title: "星轨下的古建筑",
        description: "在北京的古建筑群中拍摄的星轨作品，展现了传统与现代的完美融合。通过多张堆栈技术，记录下星星运行的轨迹。",
        image: "images/Picture2.jpg",
        photographer: {
            name: "夜拍达人",
            avatar: "images/主页分栏的黑白图/logo.png",
            bio: "城市夜景和星轨摄影爱好者，擅长建筑与星空的结合拍摄。"
        },
        shooting: {
            location: "北京",
            locationDetail: "北京故宫周边",
            time: "2024-07-20",
            date: "2024年7月",
            equipment: {
                camera: "Canon EOS R5",
                lens: "Canon RF 24mm F1.4L",
                settings: "f/4.0, ISO 1600, 60s × 120",
                tripod: "Manfrotto 055CXPRO3"
            }
        },
        interaction: {
            likes: 892,
            comments: 96,
            favorites: 287
        },
        tags: ["星轨", "建筑", "城市", "夜景", "堆栈"]
    },
    {
        id: 3,
        title: "极光与星空共舞",
        description: "在内蒙古的极地附近，幸运地捕捉到了极光与星空的同框。绿色和紫色的极光在夜空中舞动，与银河交相辉映。",
        image: "images/Picture3.jpg",
        photographer: {
            name: "极光猎人",
            avatar: "images/主页分栏的黑白图/logo.png",
            bio: "极光摄影专家，追寻极光足迹走遍世界各地，作品多次获奖。"
        },
        shooting: {
            location: "内蒙古",
            locationDetail: "内蒙古根河市，北纬51度",
            time: "2024-03-10",
            date: "2024年3月",
            equipment: {
                camera: "Nikon D850",
                lens: "Nikon 14-24mm f/2.8G",
                settings: "f/2.8, ISO 2500, 20s",
                tripod: "Gitzo Systematic GT3543"
            }
        },
        interaction: {
            likes: 1523,
            comments: 187,
            favorites: 521
        },
        tags: ["极光", "星空", "风光", "极地", "自然"]
    },
    {
        id: 4,
        title: "银河倒影",
        description: "在新疆的盐湖上，银河的倒影与夜空中的银河形成完美的对称。水面如镜，将天空的壮丽完整地反射出来。",
        image: "images/Picture4.jpg",
        photographer: {
            name: "银河捕手",
            avatar: "images/主页分栏的黑白图/logo.png",
            bio: "专注银河摄影，擅长利用水面倒影创作独特的星空作品。"
        },
        shooting: {
            location: "新疆",
            locationDetail: "新疆巴里坤盐湖",
            time: "2024-06-25",
            date: "2024年6月",
            equipment: {
                camera: "Sony A7 III",
                lens: "Sony FE 16-35mm F2.8 GM",
                settings: "f/2.8, ISO 3200, 25s",
                tripod: "RRS TVC-34L"
            }
        },
        interaction: {
            likes: 756,
            comments: 84,
            favorites: 234
        },
        tags: ["银河", "倒影", "湖泊", "对称", "风光"]
    },
    {
        id: 5,
        title: "英仙座流星雨",
        description: "在内蒙古的草原上，记录下英仙座流星雨的盛况。多颗流星同时划过夜空，形成壮观的流星雨画面。",
        image: "images/Picture5.jpg",
        photographer: {
            name: "流星观测者",
            avatar: "images/主页分栏的黑白图/logo.png",
            bio: "天文爱好者，专注流星雨和彗星观测，多次记录下壮观的天文现象。"
        },
        shooting: {
            location: "内蒙古",
            locationDetail: "内蒙古呼伦贝尔草原",
            time: "2024-08-12",
            date: "2024年8月",
            equipment: {
                camera: "Canon EOS 6D Mark II",
                lens: "Canon EF 24mm f/1.4L II",
                settings: "f/2.8, ISO 4000, 15s × 200",
                tripod: "Manfrotto MT055CXPRO4"
            }
        },
        interaction: {
            likes: 1342,
            comments: 156,
            favorites: 445
        },
        tags: ["流星雨", "星空", "天文", "堆栈", "草原"]
    },
    {
        id: 6,
        title: "猎户座大星云",
        description: "使用天文望远镜拍摄的猎户座大星云，展现了深空天体的美丽细节。红色的氢气和蓝色的反射星云交织在一起。",
        image: "images/Picture6.jpg",
        photographer: {
            name: "深空摄影师",
            avatar: "images/主页分栏的黑白图/logo.png",
            bio: "深空天体摄影专家，拥有专业的天文观测设备，作品获得国际认可。"
        },
        shooting: {
            location: "云南",
            locationDetail: "云南高美古天文台",
            time: "2024-01-20",
            date: "2024年1月",
            equipment: {
                camera: "ZWO ASI294MC Pro",
                telescope: "Sky-Watcher 150/750",
                mount: "Sky-Watcher EQ6-R Pro",
                settings: "300s × 50帧，累计曝光4小时"
            }
        },
        interaction: {
            likes: 623,
            comments: 72,
            favorites: 198
        },
        tags: ["深空", "星云", "天文", "望远镜", "专业"]
    },
    {
        id: 7,
        title: "银河下的湖泊",
        description: "在青海的湖边，银河倒映在平静的湖面上。远处的山峰和近处的湖泊，构成了完美的星空风光画面。",
        image: "images/Picture7.jpg",
        photographer: {
            name: "星空摄影师",
            avatar: "images/主页分栏的黑白图/logo.png",
            bio: "专业星空摄影师，专注于银河和深空摄影，拥有10年拍摄经验。"
        },
        shooting: {
            location: "青海",
            locationDetail: "青海湖黑马河",
            time: "2024-07-08",
            date: "2024年7月",
            equipment: {
                camera: "Sony A7R IV",
                lens: "Sony FE 20mm F1.8 G",
                settings: "f/1.8, ISO 3200, 30s",
                tripod: "Gitzo GT3543XLS"
            }
        },
        interaction: {
            likes: 945,
            comments: 112,
            favorites: 312
        },
        tags: ["银河", "湖泊", "风光", "倒影", "自然"]
    },
    {
        id: 8,
        title: "城市星轨",
        description: "在城市中拍摄的星轨作品，展现了现代都市与自然星空的和谐共存。通过长时间曝光，记录了星星的运行轨迹。",
        image: "images/Picture8.jpg",
        photographer: {
            name: "夜拍达人",
            avatar: "images/主页分栏的黑白图/logo.png",
            bio: "城市夜景和星轨摄影爱好者，擅长建筑与星空的结合拍摄。"
        },
        shooting: {
            location: "北京",
            locationDetail: "北京CBD核心区",
            time: "2024-06-15",
            date: "2024年6月",
            equipment: {
                camera: "Canon EOS R5",
                lens: "Canon RF 16mm F2.8",
                settings: "f/5.6, ISO 800, 30s × 180",
                tripod: "Manfrotto 055CXPRO3"
            }
        },
        interaction: {
            likes: 587,
            comments: 68,
            favorites: 178
        },
        tags: ["星轨", "城市", "建筑", "夜景", "现代"]
    },
    {
        id: 9,
        title: "北极光",
        description: "在极地附近捕捉到的北极光，绿色和紫色的光带在夜空中舞动。这是最壮观的极光现象之一。",
        image: "images/Picture9.jpg",
        photographer: {
            name: "极光猎人",
            avatar: "images/主页分栏的黑白图/logo.png",
            bio: "极光摄影专家，追寻极光足迹走遍世界各地，作品多次获奖。"
        },
        shooting: {
            location: "内蒙古",
            locationDetail: "内蒙古漠河，北纬53度",
            time: "2024-02-18",
            date: "2024年2月",
            equipment: {
                camera: "Nikon D850",
                lens: "Nikon 14-24mm f/2.8G",
                settings: "f/2.8, ISO 3200, 15s",
                tripod: "Gitzo Systematic GT3543"
            }
        },
        interaction: {
            likes: 1876,
            comments: 234,
            favorites: 623
        },
        tags: ["极光", "北极", "自然", "壮观", "罕见"]
    },
    {
        id: 10,
        title: "银河下的帐篷",
        description: "在草原上搭建帐篷，银河作为背景，记录下户外星空露营的美好时光。温暖的帐篷灯光与冰冷的星空形成对比。",
        image: "images/Picture10.jpg",
        photographer: {
            name: "星空摄影师",
            avatar: "images/主页分栏的黑白图/logo.png",
            bio: "专业星空摄影师，专注于银河和深空摄影，拥有10年拍摄经验。"
        },
        shooting: {
            location: "青海",
            locationDetail: "青海门源草原",
            time: "2024-06-30",
            date: "2024年6月",
            equipment: {
                camera: "Sony A7 III",
                lens: "Sony FE 14mm F1.8 GM",
                settings: "f/1.8, ISO 2500, 25s",
                tripod: "RRS TVC-34L"
            }
        },
        interaction: {
            likes: 834,
            comments: 98,
            favorites: 267
        },
        tags: ["银河", "露营", "户外", "帐篷", "生活"]
    }
];

// ============================================
// 天象事件数据
// ============================================
const astronomyEvents = [
    {
        id: 1,
        name: "英仙座流星雨",
        date: "2024-08-12",
        time: "22:00 - 次日04:00",
        description: "英仙座流星雨是每年最活跃的流星雨之一，峰值时期每小时可见60-100颗流星。最佳观测时间为午夜至凌晨。",
        visibility: "极佳",
        location: "全国各地均可观测",
        reminder: true
    },
    {
        id: 2,
        name: "满月",
        date: "2024-09-17",
        time: "全天",
        description: "中秋满月，是拍摄满月与星空的好时机。虽然满月会减弱星空亮度，但可以拍摄月景与地景的结合。",
        visibility: "良好",
        location: "全国各地均可观测",
        reminder: true
    },
    {
        id: 3,
        name: "火星冲日",
        date: "2024-12-08",
        time: "19:00 - 次日06:00",
        description: "火星冲日是一年中观测火星的最佳时机，火星将达到最亮和最接近地球的状态。可以使用天文望远镜观测火星表面的细节。",
        visibility: "良好",
        location: "全国各地均可观测",
        reminder: false
    }
];

// ============================================
// 教程和攻略数据
// ============================================
const guidesData = [
    {
        id: 1,
        type: "拍摄技巧",
        title: "星空摄影入门指南",
        description: "从零开始学习星空摄影，包括相机设置、镜头选择、拍摄技巧和后期处理。",
        content: "星空摄影是一门需要技术和耐心的艺术。首先需要选择合适的拍摄地点，远离城市光污染。相机设置方面，建议使用大光圈镜头（f/2.8或更大），ISO设置在1600-3200，曝光时间遵循500规则（500/焦距）。后期处理可以使用Adobe Lightroom或Photoshop进行降噪和调色。",
        icon: "📸",
        difficulty: "初级",
        duration: "30分钟",
        tags: ["入门", "基础", "相机设置", "拍摄技巧"]
    },
    {
        id: 2,
        type: "器材推荐",
        title: "星空摄影器材选择指南",
        description: "详细介绍星空摄影所需的相机、镜头、三脚架等器材的选择和推荐。",
        content: "星空摄影对器材有一定要求。相机方面，推荐使用全画幅相机以获得更好的高感表现，如Sony A7系列、Canon EOS R系列、Nikon D850等。镜头选择大光圈超广角镜头，如14mm f/1.8、20mm f/1.4等。三脚架选择稳定性好的碳纤维三脚架，如Gitzo、Manfrotto等品牌。此外还需要快门线、头灯、保暖装备等辅助器材。",
        icon: "📷",
        difficulty: "中级",
        duration: "45分钟",
        tags: ["器材", "相机", "镜头", "三脚架", "推荐"]
    },
    {
        id: 3,
        type: "后期处理",
        title: "星空照片后期处理技巧",
        description: "学习如何使用Lightroom和Photoshop处理星空照片，包括降噪、调色、堆栈等技巧。",
        content: "星空照片的后期处理是提升作品质量的关键。降噪方面，可以使用Lightroom的降噪功能，或使用专门的降噪软件如Topaz Denoise AI。调色方面，可以通过HSL调整来增强银河的色彩，使用渐变滤镜来平衡天空和地景的亮度。堆栈技术可以用于星轨制作和降噪，将多张照片对齐并叠加。",
        icon: "🎨",
        difficulty: "高级",
        duration: "60分钟",
        tags: ["后期", "Lightroom", "Photoshop", "降噪", "调色", "堆栈"]
    }
];

// ============================================
// 数据操作函数
// ============================================

/**
 * 获取作品列表（支持过滤）
 * @param {Object} filter - 过滤条件
 * @param {string} filter.category - 类别筛选（'all' | '银河' | '星轨' | '极光' | '深空'）
 * @param {string} filter.location - 地点筛选
 * @param {string} filter.sort - 排序方式（'latest' | 'hot' | 'comments'）
 * @param {string} filter.search - 搜索关键词
 * @param {number} filter.limit - 返回数量限制
 * @returns {Array} 过滤后的作品数组
 */
function getWorks(filter = {}) {
    let result = [...worksData];
    
    // 类别筛选
    if (filter.category && filter.category !== 'all') {
        result = result.filter(work => 
            work.tags.includes(filter.category) || work.shooting.location === filter.category
        );
    }
    
    // 地点筛选
    if (filter.location && filter.location !== 'all') {
        result = result.filter(work => work.shooting.location === filter.location);
    }
    
    // 搜索筛选
    if (filter.search) {
        const searchText = filter.search.toLowerCase();
        result = result.filter(work => 
            work.title.toLowerCase().includes(searchText) ||
            work.description.toLowerCase().includes(searchText) ||
            work.photographer.name.toLowerCase().includes(searchText) ||
            work.tags.some(tag => tag.toLowerCase().includes(searchText))
        );
    }
    
    // 排序
    if (filter.sort) {
        switch (filter.sort) {
            case 'hot':
                result.sort((a, b) => b.interaction.likes - a.interaction.likes);
                break;
            case 'comments':
                result.sort((a, b) => b.interaction.comments - a.interaction.comments);
                break;
            case 'favorites':
                result.sort((a, b) => b.interaction.favorites - a.interaction.favorites);
                break;
            case 'latest':
            default:
                result.sort((a, b) => new Date(b.shooting.time) - new Date(a.shooting.time));
                break;
        }
    }
    
    // 数量限制
    if (filter.limit && filter.limit > 0) {
        result = result.slice(0, filter.limit);
    }
    
    return result;
}

/**
 * 根据ID获取单个作品
 * @param {number} id - 作品ID
 * @returns {Object|null} 作品对象，如果不存在返回null
 */
function getWorkById(id) {
    return worksData.find(work => work.id === id) || null;
}

/**
 * 更新作品点赞数
 * @param {number} id - 作品ID
 * @param {number} delta - 点赞数变化（+1或-1）
 * @returns {Object|null} 更新后的作品对象，如果不存在返回null
 */
function updateLike(id, delta = 1) {
    const work = worksData.find(w => w.id === id);
    if (work) {
        work.interaction.likes = Math.max(0, work.interaction.likes + delta);
        return work;
    }
    return null;
}

/**
 * 更新作品收藏数
 * @param {number} id - 作品ID
 * @param {number} delta - 收藏数变化（+1或-1）
 * @returns {Object|null} 更新后的作品对象，如果不存在返回null
 */
function updateFavorite(id, delta = 1) {
    const work = worksData.find(w => w.id === id);
    if (work) {
        work.interaction.favorites = Math.max(0, work.interaction.favorites + delta);
        return work;
    }
    return null;
}

/**
 * 获取天象事件列表
 * @param {Object} filter - 过滤条件
 * @param {boolean} filter.upcoming - 是否只返回即将到来的事件
 * @returns {Array} 天象事件数组
 */
function getAstronomyEvents(filter = {}) {
    let result = [...astronomyEvents];
    
    if (filter.upcoming) {
        const now = new Date();
        result = result.filter(event => new Date(event.date) >= now);
    }
    
    // 按日期排序
    result.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return result;
}

/**
 * 获取教程和攻略列表
 * @param {Object} filter - 过滤条件
 * @param {string} filter.type - 教程类型筛选
 * @param {string} filter.difficulty - 难度筛选
 * @returns {Array} 教程数组
 */
function getGuides(filter = {}) {
    let result = [...guidesData];
    
    if (filter.type) {
        result = result.filter(guide => guide.type === filter.type);
    }
    
    if (filter.difficulty) {
        result = result.filter(guide => guide.difficulty === filter.difficulty);
    }
    
    return result;
}

/**
 * 根据ID获取单个教程
 * @param {number} id - 教程ID
 * @returns {Object|null} 教程对象，如果不存在返回null
 */
function getGuideById(id) {
    return guidesData.find(guide => guide.id === id) || null;
}

// 导出数据（供其他模块使用）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        worksData,
        astronomyEvents,
        guidesData,
        getWorks,
        getWorkById,
        updateLike,
        updateFavorite,
        getAstronomyEvents,
        getGuides,
        getGuideById
    };
}


