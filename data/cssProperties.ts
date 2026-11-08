export interface CssPropertyItem {
  name: string;
  category: string;
  syntax: string;
  defaultValue: string;
  description: string;
  exampleValues: string[];
  moduleLink?: string;
  type: 'select' | 'range' | 'text';
  options?: string[];
  min?: number;
  max?: number;
  unit?: string;
}

export const CSS_PROPERTIES: CssPropertyItem[] = [
  {
    name: 'box-shadow',
    category: 'Effects & Visuals',
    syntax: 'offset-x | offset-y | blur-radius | spread-radius | color | inset',
    defaultValue: '0 10px 25px -5px rgba(0, 0, 0, 0.4)',
    description: '在元素的框架周圍添加陰影效果。可設定多重陰影與內嵌光暈。',
    exampleValues: [
      '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      '0 20px 25px -5px rgba(99, 102, 241, 0.4)',
      'inset 0 2px 4px 0 rgba(0, 0, 0, 0.6)'
    ],
    moduleLink: '/box-shadow',
    type: 'text'
  },
  {
    name: 'transition-timing-function',
    category: 'Animations & Transitions',
    syntax: 'ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier(p1, p2, p3, p4)',
    defaultValue: 'cubic-bezier(0.16, 1, 0.3, 1)',
    description: '定義過渡動畫的速度曲線，精細控制數值如何隨時間推進。',
    exampleValues: [
      'cubic-bezier(0.16, 1, 0.3, 1)',
      'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      'ease-in-out'
    ],
    moduleLink: '/cubic-bezier',
    type: 'select',
    options: ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier(0.16, 1, 0.3, 1)', 'cubic-bezier(0.34, 1.56, 0.64, 1)']
  },
  {
    name: 'backdrop-filter',
    category: 'Effects & Visuals',
    syntax: 'none | blur() | brightness() | contrast() | saturate()',
    defaultValue: 'blur(16px) saturate(180%)',
    description: '對元素背後所有內容應用圖形效果（如模糊或色彩偏移），常用於毛玻璃 UI。',
    exampleValues: [
      'blur(12px)',
      'blur(20px) saturate(190%)',
      'blur(8px) brightness(1.2)'
    ],
    moduleLink: '/glassmorphism',
    type: 'select',
    options: ['none', 'blur(8px)', 'blur(16px)', 'blur(24px) saturate(180%)', 'blur(12px) contrast(120%)']
  },
  {
    name: 'display',
    category: 'Layout & Box Model',
    syntax: 'block | inline | inline-block | flex | inline-flex | grid | inline-grid | none',
    defaultValue: 'flex',
    description: '指定元素在文件佈局中如何呈現內部與外部格式化上下文。',
    exampleValues: ['flex', 'grid', 'block', 'inline-flex'],
    moduleLink: '/flexbox',
    type: 'select',
    options: ['block', 'flex', 'grid', 'inline-flex', 'none']
  },
  {
    name: 'flex-direction',
    category: 'Layout & Box Model',
    syntax: 'row | row-reverse | column | column-reverse',
    defaultValue: 'row',
    description: '定義 Flex 容器內子項目的主軸排列方向。',
    exampleValues: ['row', 'column', 'row-reverse', 'column-reverse'],
    moduleLink: '/flexbox',
    type: 'select',
    options: ['row', 'column', 'row-reverse', 'column-reverse']
  },
  {
    name: 'justify-content',
    category: 'Layout & Box Model',
    syntax: 'flex-start | flex-end | center | space-between | space-around | space-evenly',
    defaultValue: 'center',
    description: '定義瀏覽器如何沿著主軸方向分配元素之間與周圍的空間。',
    exampleValues: ['center', 'space-between', 'space-around', 'flex-start', 'flex-end'],
    moduleLink: '/flexbox',
    type: 'select',
    options: ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly']
  },
  {
    name: 'align-items',
    category: 'Layout & Box Model',
    syntax: 'stretch | flex-start | flex-end | center | baseline',
    defaultValue: 'center',
    description: '控制 Flex 或 Grid 子項目在副軸上的對齊行為。',
    exampleValues: ['center', 'stretch', 'flex-start', 'flex-end'],
    moduleLink: '/flexbox',
    type: 'select',
    options: ['stretch', 'flex-start', 'center', 'flex-end', 'baseline']
  },
  {
    name: 'grid-template-columns',
    category: 'Layout & Box Model',
    syntax: 'none | <track-list> | repeat()',
    defaultValue: 'repeat(3, 1fr)',
    description: '以空格分隔的列表定義網格中欄的軌道名稱與尺寸大小。',
    exampleValues: ['repeat(3, 1fr)', '1fr 2fr 1fr', 'repeat(auto-fit, minmax(200px, 1fr))'],
    moduleLink: '/grid',
    type: 'text'
  },
  {
    name: 'gap',
    category: 'Layout & Box Model',
    syntax: '<row-gap> <column-gap>?',
    defaultValue: '16px',
    description: '設定網格 (Grid) 或彈性盒子 (Flexbox) 項目之間的間隔空間。',
    exampleValues: ['8px', '16px', '24px 32px'],
    moduleLink: '/flexbox',
    type: 'range',
    min: 0,
    max: 64,
    unit: 'px'
  },
  {
    name: 'border-radius',
    category: 'Box Model',
    syntax: '<length-percentage>{1,4} [ / <length-percentage>{1,4} ]?',
    defaultValue: '16px',
    description: '定義元素的外邊界圓角半徑，支援斜線分隔設定八角獨立半徑。',
    exampleValues: ['12px', '50%', '30% 70% 70% 30% / 30% 30% 70% 70%'],
    moduleLink: '/border-radius',
    type: 'range',
    min: 0,
    max: 100,
    unit: 'px'
  },
  {
    name: 'transform',
    category: 'Transforms',
    syntax: 'none | <transform-function>+',
    defaultValue: 'scale(1)',
    description: '允許對元素進行旋轉、縮放、傾斜或平移變換，支援 2D 與 3D 空間操縱。',
    exampleValues: ['scale(1.05) translateY(-4px)', 'rotate(45deg)', 'perspective(600px) rotateY(20deg)'],
    type: 'select',
    options: ['none', 'scale(1.08)', 'rotate(12deg)', 'translateY(-8px)', 'skewX(10deg)']
  },
  {
    name: 'opacity',
    category: 'Effects & Visuals',
    syntax: '<number> | <percentage>',
    defaultValue: '1',
    description: '設定元素的透明度等級（0 為完全透明，1 為完全不透明）。',
    exampleValues: ['1', '0.75', '0.5', '0'],
    type: 'range',
    min: 0,
    max: 1,
    unit: ''
  },
  {
    name: 'filter',
    category: 'Effects & Visuals',
    syntax: 'none | <filter-function>+',
    defaultValue: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
    description: '將模糊或顏色變換等圖形效果應用到元素本身。',
    exampleValues: ['grayscale(100%)', 'blur(4px)', 'drop-shadow(0 10px 20px rgba(99,102,241,0.5))'],
    type: 'select',
    options: ['none', 'grayscale(1)', 'blur(4px)', 'sepia(0.8)', 'hue-rotate(90deg)', 'drop-shadow(0 8px 16px rgba(99,102,241,0.5))']
  }
];
