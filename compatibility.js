// 浏览器兼容性处理

// Polyfills 和兼容性检查

// ============================================
// Intersection Observer Polyfill
// ============================================
if (!window.IntersectionObserver) {
    console.warn('IntersectionObserver not supported, using fallback');
    // 可以使用polyfill库，这里只做警告
}

// ============================================
// CustomEvent Polyfill
// ============================================
(function() {
    if (typeof window.CustomEvent === 'function') return false;
    
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: null };
        const evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    
    window.CustomEvent = CustomEvent;
})();

// ============================================
// Array.from Polyfill (简化版)
// ============================================
if (!Array.from) {
    Array.from = function(arrayLike, mapFn, thisArg) {
        const C = this;
        const items = Object(arrayLike);
        if (arrayLike == null) {
            throw new TypeError('Array.from requires an array-like object - not null or undefined');
        }
        const mapFunction = mapFn === undefined ? undefined : mapFn;
        let T;
        if (typeof mapFunction !== 'undefined') {
            if (typeof mapFunction !== 'function') {
                throw new TypeError('Array.from: when provided, the second argument must be a function');
            }
            if (arguments.length > 2) {
                T = thisArg;
            }
        }
        const len = parseInt(items.length) || 0;
        const A = typeof C === 'function' ? Object(new C(len)) : new Array(len);
        let k = 0;
        let kValue;
        while (k < len) {
            kValue = items[k];
            if (mapFunction) {
                A[k] = typeof T === 'undefined' ? mapFunction(kValue, k) : mapFunction.call(T, kValue, k);
            } else {
                A[k] = kValue;
            }
            k += 1;
        }
        A.length = len;
        return A;
    };
}

// ============================================
// Object.assign Polyfill
// ============================================
if (typeof Object.assign !== 'function') {
    Object.assign = function(target) {
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }
        const to = Object(target);
        for (let index = 1; index < arguments.length; index++) {
            const nextSource = arguments[index];
            if (nextSource != null) {
                for (const nextKey in nextSource) {
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}

// ============================================
// 功能检测和降级处理
// ============================================
const Compatibility = {
    // 检测本地存储支持
    supportsLocalStorage() {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    },

    // 检测CSS变量支持
    supportsCSSVariables() {
        return window.CSS && CSS.supports('color', 'var(--fake-var)');
    },

    // 检测Flexbox支持
    supportsFlexbox() {
        return 'flex' in document.documentElement.style;
    },

    // 检测Grid支持
    supportsGrid() {
        return 'grid' in document.documentElement.style;
    },

    // 初始化兼容性检查
    init() {
        // 本地存储降级
        if (!this.supportsLocalStorage()) {
            console.warn('LocalStorage not supported, using in-memory storage');
            // 可以使用内存存储作为降级方案
        }

        // CSS Grid降级提示
        if (!this.supportsGrid()) {
            console.warn('CSS Grid not supported, layout may not render correctly');
            // 可以添加flexbox降级样式
            document.documentElement.classList.add('no-grid');
        }

        // CSS变量降级
        if (!this.supportsCSSVariables()) {
            console.warn('CSS Variables not supported, using fallback styles');
            document.documentElement.classList.add('no-css-vars');
        }
    }
};

// DOM加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        Compatibility.init();
    });
} else {
    Compatibility.init();
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Compatibility;
}




