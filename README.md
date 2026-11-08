# ⚡ CascadeCraft

> **現代高美感互動式 CSS 樣式操作與匯出平台**  
> 對標傳統 CSS 工具（如 CSS Portal），在「互動體驗」、「暗黑美學」與「AI 搜尋引擎優化 (GEO)」維度全面升級。

![CascadeCraft License](https://img.shields.io/badge/License-MIT-blue.svg)
![Framework](https://img.shields.io/badge/Nuxt-4.x-00DC82?logo=nuxt.js)
![Styles](https://img.shields.io/badge/Styles-SCSS%20%2B%20Tailwind-38B2AC?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![AI-SEO](https://img.shields.io/badge/GEO-Optimized-indigo)

---

## 一、 專案核心特色

1. **零學習成本 (Zero Learning Curve)**：揚棄教科書式冗長贅言，所有效果皆藉由滑動數值或拖曳座標即時在視窗上反饋，動手玩即懂。
2. **極致暗黑美學 (Dark Mode First)**：深色基底搭配細膩微光陰影、高對比俐落排版與平滑的物理過渡轉場。
3. **致敬 cubic-bezier.com 微互動**：具備高精準度自製滑桿、雙節點貝茲曲線拖曳畫布與雙軌道即時競速比對跑道。
4. **CSS + SCSS + Tailwind 三重一鍵匯出**：即時產生原生 W3C CSS 代碼、模組化 SCSS 變數，以及 Tailwind CSS 任意值或實用類別對照，點擊一秒複製。
5. **Generative Engine Optimization (GEO)**：
   - 內建標準 Schema.org JSON-LD 結構化資料。
   - 提供專為 AI 爬蟲（ChatGPT Search、Perplexity、Claude、Gemini）設計的 `/llms.txt` 與 `/llms-full.txt` 高信號索引端點。
   - 動態生成 `sitemap.xml` 與語意化 `robots.txt`。
6. **廣告與營利插槽 (Monetization Ready)**：預留極簡不干擾的 Google AdSense 響應式插槽組件，隨時填入 Client ID 即可啟用。

---

## 二、 技術棧 (Tech Stack)

- **核心框架**：Nuxt 4 + Vue 3 (Vite 7 高速編譯)
- **程式語言**：TypeScript 5 (完整型別提示)
- **樣式架構**：SCSS (巢狀模組變數與 Mixin) + Tailwind CSS (實用類別與任意值)
- **互動原語**：自研 `RangeSlider`、`CubicBezierCanvas`、`ColorPicker`、`CodeExport`、`AdSenseSlot`、`GeoSummary`
- **版本控制與部署**：Git 自動 Commit 腳本、GitHub Actions、Cloudflare Pages / Vercel

---

## 三、 功能模組清單

| 模組名稱 | 路徑 | 核心亮點 |
| :--- | :--- | :--- |
| **Box Shadow 產生器** | `/box-shadow` | 多層次陰影堆疊、內陰影 (Inset)、霓虹微光 (Glow)、多幾何物體切換 |
| **Cubic Bezier 調整器** | `/cubic-bezier` | 雙錨點座標拖曳、Spring 超調回彈、雙跑道競速預覽、時長調整 |
| **Flexbox 佈局模擬器** | `/flexbox` | 彈性方向、對齊、換行、gap、個別子項目 grow/shrink 權重即時調整 |
| **CSS Grid 產生器** | `/grid` | 二維網格矩陣生成、fr/px 混合比、行與列間隔、響應式格子預覽 |
| **Glassmorphism 毛玻璃** | `/glassmorphism` | backdrop-filter 模糊與飽和度、反射微光邊框、逼真幾何折射背景 |
| **CSS 漸變調色盤** | `/gradient` | 線性 (Linear)、徑向 (Radial)、圓錐 (Conic)、多色標位置與角度旋鈕 |
| **8點非對稱圓角** | `/border-radius` | 8 頂點獨立半徑拖拉，創造有機水滴與流體形態 (Blob Shapes) |
| **CSS 屬性字典 (MDN)** | `/reference` | 涵蓋 MDN 核心與進階屬性，每一項屬性皆內嵌獨立微型即時測試台 |

---

## 四、 本地開發與啟動指南

### 1. 安裝依賴
```bash
npm install
```

### 2. 本地開發伺服器
```bash
npm run dev
```
瀏覽器訪問 `http://localhost:3000`

### 3. 編譯生產版本
```bash
npm run build
```

### 4. 靜態站點生成 (SSG)
```bash
npm run generate
```

---

## 五、 自動化 Git 腳本與 CI/CD 部署

### 1. 本地一鍵 Commit & Push 腳本
專案內建專用 Windows 批次檔與 PowerShell 腳本：
- **雙擊執行**：直接雙擊 `scripts/git-sync.bat`
- **命令列執行**：
  ```powershell
  .\scripts\git-sync.ps1 -Message "feat: add new feature"
  ```
腳本會自動檢測 Git 變更、打包提交並推播至遠端分支。

### 2. GitHub Actions 自動化部署 (`.github/workflows/deploy.yml`)
每次推送至 `main` 或 `master` 分支時：
1. 自動檢出代碼並安裝依賴。
2. 自動執行靜態預渲染與構建 (`npm run build`)。
3. 產生靜態檔案並自動對接 Cloudflare Pages 或 Vercel。

---

## 六、 廣告營利接入 (Google AdSense)

在任意頁面引入 `AdSenseSlot.vue`，並提供 Google AdSense 發佈商 ID 與廣告單元 ID：

```vue
<AdSenseSlot
  ad-client="ca-pub-XXXXXXXXXXXXXXXX"
  ad-slot="1234567890"
  ad-format="auto"
/>
```
在尚未配置 Client ID 前，組件會自動展示極簡高質感的無干擾預留外框。

---

## 七、 授權條款 (License)
MIT License © CascadeCraft Team
