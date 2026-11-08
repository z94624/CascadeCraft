export interface CssModule {
  id: string;
  name: string;
  category: 'Box Model' | 'Layout' | 'Animation' | 'Effects' | 'Typography' | 'Transforms';
  description: string;
  icon: string;
  path: string;
  badge?: string;
  tags: string[];
}

export const CSS_MODULES: CssModule[] = [
  {
    id: 'box-shadow',
    name: 'Box Shadow 產生器',
    category: 'Effects',
    description: '多層次擬真立體陰影、微光光暈 (Glow)、內陰影 (Inset) 即時微調與多目標預覽。',
    icon: 'Layers',
    path: '/box-shadow',
    badge: '熱門',
    tags: ['shadow', 'glow', 'elevation', 'box-shadow', 'depth']
  },
  {
    id: 'cubic-bezier',
    name: 'Cubic Bezier 曲線調整器',
    category: 'Animation',
    description: '致敬 cubic-bezier.com，具備雙控制節點拖曳、多跑道競速預覽與 transition 一鍵複製。',
    icon: 'Activity',
    path: '/cubic-bezier',
    badge: '強推',
    tags: ['cubic-bezier', 'easing', 'transition', 'timing-function', 'animation']
  },
  {
    id: 'flexbox',
    name: 'Flexbox 佈局模擬器',
    category: 'Layout',
    description: '全視覺化彈性盒模型操縱器，即時調整方向、排列、對齊、間距與項目伸縮屬性。',
    icon: 'LayoutGrid',
    path: '/flexbox',
    badge: '必備',
    tags: ['flex', 'flexbox', 'align-items', 'justify-content', 'gap', 'layout']
  },
  {
    id: 'grid',
    name: 'CSS Grid 網格產生器',
    category: 'Layout',
    description: '二維動態網格矩陣生成器，自定義行列 fr/px 分配、區域劃分與彈性間距。',
    icon: 'Grid3X3',
    path: '/grid',
    badge: '現代',
    tags: ['grid', 'template-columns', 'template-rows', 'grid-area', 'gap']
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism 毛玻璃生成器',
    category: 'Effects',
    description: '高質感磨砂毛玻璃擬真預覽，精準調節 backdrop-filter 模糊、飽和度與高光邊緣。',
    icon: 'Sparkles',
    path: '/glassmorphism',
    badge: '趨勢',
    tags: ['glass', 'backdrop-filter', 'blur', 'saturation', 'frosted']
  },
  {
    id: 'gradient',
    name: 'CSS 漸變調色盤 (Gradients)',
    category: 'Effects',
    description: '線性 (Linear)、徑向 (Radial) 與圓錐 (Conic) 漸變多色標調配與角度旋鈕。',
    icon: 'Palette',
    path: '/gradient',
    tags: ['gradient', 'linear-gradient', 'radial-gradient', 'conic-gradient', 'color']
  },
  {
    id: 'border-radius',
    name: '8點非對稱圓角 (Fancy Radius)',
    category: 'Box Model',
    description: '有機流體形狀與非對稱八值圓角視覺拖拉產生器，賦予組件自然生命力。',
    icon: 'Maximize2',
    path: '/border-radius',
    tags: ['border-radius', 'organic', 'shape', 'blob', 'box-model']
  },
  {
    id: 'reference',
    name: 'CSS 屬性字典 (對標 MDN)',
    category: 'Typography',
    description: '查閱現代 CSS 核心與進階屬性清單，每個屬性皆內嵌互動操控範例與語意化解說。',
    icon: 'BookOpen',
    path: '/reference',
    badge: 'MDN',
    tags: ['reference', 'mdn', 'cheatsheet', 'properties', 'documentation']
  }
];
