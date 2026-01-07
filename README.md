# 星空仰望 - 星空摄影社区网站

一个专业的星空摄影社区平台，展示精美的星空摄影作品，分享摄影技巧，提供天象预告和教程攻略。

## 📋 项目介绍

**星空仰望** 是一个专注于星空摄影的社区网站，旨在为星空摄影爱好者提供作品展示、经验交流和学习资源的平台。（其实是课程设计要求，随手做的。）

### 主要特性

- 🌟 精美的作品展示系统
- 📸 完整的图片查看和导航功能
- ❤️ 点赞和收藏功能（使用localStorage持久化）
- 🔍 强大的搜索和筛选功能
- 📱 完全响应式设计，支持移动端、平板和桌面端
- ⚡ 性能优化，快速加载
- 🎨 流畅的动画效果
- 🔄 离线访问支持（Service Worker）
- 📱 PWA支持（可添加到主屏幕）

## ✨ 功能列表

### 核心功能

1. **作品展示**
   - 瀑布流布局展示作品
   - 支持类别筛选（银河、星轨、极光、深空）
   - 支持地点筛选
   - 支持搜索功能
   - 多种排序方式（最新、最热、最多评论）
   - 分页加载（每页12个作品）

2. **图片查看**
   - 全屏模态框查看大图
   - 图片信息面板（摄影师、地点、设备信息等）
   - 导航功能（上一张/下一张）
   - 键盘导航（ESC关闭、左右键切换）
   - 移动端触控支持（滑动切换）

3. **互动功能**
   - 点赞功能（带动画效果）
   - 收藏功能
   - 评论功能（模拟）
   - 数据持久化（localStorage）

4. **天象预告**
   - 本周天象事件列表
   - 事件详情和提醒功能

5. **教程攻略**
   - 拍摄技巧指南
   - 器材推荐
   - 后期处理教程

6. **响应式设计**
   - 手机端优化（< 640px）
   - 平板端适配（640px - 1024px）
   - 桌面端完整功能（> 1024px）

7. **性能优化**
   - 图片懒加载
   - 资源预加载
   - 代码分割和延迟加载
   - Service Worker缓存

## 🚀 如何运行

### 方式一：直接打开（最简单）

1. 克隆或下载项目到本地
2. 使用浏览器直接打开 `index.html` 文件

**注意**：由于使用了Service Worker和localStorage，建议使用本地服务器运行。

### 方式二：使用Python HTTP服务器

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

然后在浏览器访问：`http://localhost:8000`

### 方式三：使用Node.js HTTP服务器

```bash
# 安装http-server
npm install -g http-server

# 运行服务器
http-server -p 8000
```

然后在浏览器访问：`http://localhost:8000`

### 方式四：使用VS Code Live Server

1. 安装 VS Code Live Server 扩展
2. 右键点击 `index.html`
3. 选择 "Open with Live Server"

## 📦 项目结构

```
Stargazing/
├── index.html              # 首页
├── gallery.html            # 作品展示页面
├── app-state.js            # 状态管理模块
├── script.js               # 主脚本文件
├── gallery.js              # 作品展示页面脚本
├── scroll-animations.js    # 滚动动画模块
├── performance.js          # 性能优化模块
├── compatibility.js        # 浏览器兼容性处理
├── service-worker.js       # Service Worker（PWA）
├── manifest.json           # PWA Manifest配置
├── scripts/
│   └── data.js            # 模拟数据系统
├── styles/
│   ├── main.css           # 主样式文件
│   ├── responsive.css     # 响应式样式
│   ├── performance.css    # 性能优化样式
│   └── gallery.css        # 作品展示页面样式
└── README.md              # 项目文档
```

## 🌐 部署到GitHub Pages

### 步骤一：创建GitHub仓库

1. 在GitHub上创建一个新仓库（例如：`stargazing`）
2. 将项目代码推送到仓库

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/stargazing.git
git push -u origin main
```

### 步骤二：启用GitHub Pages

1. 进入仓库的 Settings 页面
2. 滚动到 "Pages" 部分
3. 在 "Source" 下拉菜单中选择 "Deploy from a branch"
4. 选择分支（通常是 `main`）和文件夹（选择 `/ (root)`）
5. 点击 "Save"

### 步骤三：访问网站

等待几分钟后，你的网站将在以下地址可用：
```
https://your-username.github.io/stargazing/
```

### 注意事项

1. **Service Worker路径**：如果网站不在根目录，需要修改Service Worker中的路径
2. **HTTPS**：GitHub Pages默认使用HTTPS，Service Worker需要HTTPS才能工作
3. **缓存**：部署后可能需要清除浏览器缓存才能看到最新版本

## 🛠️ 技术栈

- **HTML5** - 语义化标签
- **CSS3** - 现代CSS特性（Grid、Flexbox、CSS变量）
- **JavaScript (ES6+)** - 原生JavaScript，无框架依赖
- **Service Worker** - PWA和离线支持
- **localStorage** - 本地数据存储

## 📱 浏览器兼容性

### 支持的浏览器

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ 移动端浏览器（iOS Safari、Chrome Mobile）

### 兼容性处理

项目包含了以下兼容性处理：

- Intersection Observer降级方案
- CustomEvent Polyfill
- Object.assign Polyfill
- CSS Grid降级（添加`.no-grid`类）
- CSS变量降级（添加`.no-css-vars`类）

## ⚙️ 配置说明

### 修改数据

编辑 `scripts/data.js` 文件可以修改：
- 作品数据
- 天象事件数据
- 教程攻略数据

### 自定义样式

主要样式文件：
- `styles/main.css` - 主样式和组件样式
- `styles/responsive.css` - 响应式样式
- `styles/performance.css` - 性能优化样式

CSS变量在 `styles/main.css` 的 `:root` 中定义，可以修改颜色、字体、间距等。

### Service Worker缓存

编辑 `service-worker.js` 可以：
- 修改缓存策略
- 添加需要缓存的资源
- 自定义离线页面

## 🐛 已知问题

1. 图片使用占位图服务（picsum.photos），实际部署时需要替换为真实图片
2. 某些功能需要真实后端API支持（如评论、上传等）
3. Service Worker在生产环境需要HTTPS

## 📝 开发建议

### 生产环境优化

1. **压缩资源**
   - 使用工具压缩CSS和JavaScript文件
   - 优化图片（WebP格式、压缩）
   - 启用Gzip/Brotli压缩

2. **合并文件**
   - 合并CSS文件减少HTTP请求
   - 使用代码分割优化JavaScript加载

3. **CDN加速**
   - 使用CDN加速静态资源
   - 图片使用CDN服务

4. **监控和优化**
   - 使用Lighthouse测试性能
   - 监控Core Web Vitals指标
   - 定期优化和更新

**星空仰望** - 以镜头定格璀璨，用热爱连接同好 ✨






