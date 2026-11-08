<script setup lang="ts">
import { ref, computed } from 'vue';

useHead({
  title: 'Box Shadow 擬真立體陰影產生器',
  meta: [
    {
      name: 'description',
      content: '現代高美感 CSS Box Shadow 產生器，支援多層陰影疊加、微光光暈 (Glow)、內嵌陰影 (Inset)、多目標預覽與一鍵匯出 CSS / SCSS / Tailwind 程式碼。'
    }
  ]
});

interface ShadowLayer {
  id: string;
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
  opacity: number;
  inset: boolean;
}

const layers = ref<ShadowLayer[]>([
  {
    id: '1',
    x: 0,
    y: 12,
    blur: 32,
    spread: -4,
    color: '#000000',
    opacity: 0.5,
    inset: false
  },
  {
    id: '2',
    x: 0,
    y: 0,
    blur: 0,
    spread: 1,
    color: '#ffffff',
    opacity: 0.08,
    inset: false
  }
]);

const activeLayerId = ref<string>('1');
const previewShape = ref<'card' | 'button' | 'circle' | 'window'>('card');
const stageBg = ref<'dark' | 'light' | 'grid'>('dark');
const boxColor = ref('#181b26');
const borderRadius = ref(16);

const activeLayer = computed(() => {
  return layers.value.find(l => l.id === activeLayerId.value) || layers.value[0];
});

const hexToRgba = (hex: string, alpha: number) => {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  if (isNaN(num)) return `rgba(0,0,0,${alpha})`;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const cssBoxShadow = computed(() => {
  return layers.value
    .map(l => {
      const col = hexToRgba(l.color, l.opacity);
      const insetStr = l.inset ? 'inset ' : '';
      return `${insetStr}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${col}`;
    })
    .join(',\n    ');
});

const generatedCss = computed(() => {
  return `box-shadow: ${cssBoxShadow.value};\nborder-radius: ${borderRadius.value}px;`;
});

const generatedScss = computed(() => {
  return `$custom-elevation: (\n  ${cssBoxShadow.value}\n);\n\n.my-element {\n  box-shadow: $custom-elevation;\n  border-radius: ${borderRadius.value}px;\n}`;
});

const generatedTailwind = computed(() => {
  // Tailwind arbitrary shadow class format
  const formatted = layers.value
    .map(l => {
      const col = hexToRgba(l.color, l.opacity).replace(/\s+/g, '');
      const insetStr = l.inset ? 'inset_' : '';
      return `${insetStr}${l.x}px_${l.y}px_${l.blur}px_${l.spread}px_${col}`;
    })
    .join(',');
  return `shadow-[${formatted}] rounded-[${borderRadius.value}px]`;
});

// Layer Actions
const addLayer = () => {
  const newId = String(Date.now());
  layers.value.push({
    id: newId,
    x: 0,
    y: 8,
    blur: 24,
    spread: 0,
    color: '#6366f1',
    opacity: 0.35,
    inset: false
  });
  activeLayerId.value = newId;
};

const removeLayer = (id: string) => {
  if (layers.value.length <= 1) return;
  layers.value = layers.value.filter(l => l.id !== id);
  if (activeLayerId.value === id) {
    activeLayerId.value = layers.value[0].id;
  }
};

// Preset Styles
const applyPreset = (preset: 'elevation' | 'neonCyan' | 'softInset' | 'glowPurple') => {
  if (preset === 'elevation') {
    layers.value = [
      { id: '1', x: 0, y: 16, blur: 40, spread: -6, color: '#000000', opacity: 0.6, inset: false },
      { id: '2', x: 0, y: 0, blur: 0, spread: 1, color: '#ffffff', opacity: 0.1, inset: false }
    ];
  } else if (preset === 'neonCyan') {
    layers.value = [
      { id: '1', x: 0, y: 0, blur: 30, spread: 4, color: '#06b6d4', opacity: 0.5, inset: false },
      { id: '2', x: 0, y: 8, blur: 20, spread: -2, color: '#0891b2', opacity: 0.4, inset: false }
    ];
  } else if (preset === 'softInset') {
    layers.value = [
      { id: '1', x: 2, y: 3, blur: 8, spread: 0, color: '#000000', opacity: 0.6, inset: true },
      { id: '2', x: -2, y: -2, blur: 6, spread: 0, color: '#ffffff', opacity: 0.08, inset: true }
    ];
  } else if (preset === 'glowPurple') {
    layers.value = [
      { id: '1', x: 0, y: 0, blur: 45, spread: 8, color: '#8b5cf6', opacity: 0.45, inset: false },
      { id: '2', x: 0, y: 12, blur: 24, spread: -4, color: '#6366f1', opacity: 0.5, inset: false }
    ];
  }
  activeLayerId.value = layers.value[0].id;
};
</script>

<template>
  <div class="box-shadow-studio container-craft">
    <!-- Header -->
    <div class="studio-header">
      <div class="header-left">
        <NuxtLink to="/" class="back-link">← 返回儀表板</NuxtLink>
        <h1 class="studio-title">Box Shadow 陰影工坊</h1>
        <p class="studio-desc">多層次微調、立體景深與邊界微光即時預覽</p>
      </div>

      <!-- Quick Presets -->
      <div class="presets-bar">
        <span class="preset-label">推薦預設：</span>
        <button type="button" class="preset-btn" @click="applyPreset('elevation')">3D 懸浮階層</button>
        <button type="button" class="preset-btn" @click="applyPreset('neonCyan')">霓虹青光</button>
        <button type="button" class="preset-btn" @click="applyPreset('glowPurple')">極光紫暈</button>
        <button type="button" class="preset-btn" @click="applyPreset('softInset')">內凹微陰影</button>
      </div>
    </div>

    <!-- Main Playground Workspace -->
    <div class="playground-layout">
      <!-- Left Panel: Precision Sliders & Layer Manager -->
      <aside class="controls-panel craft-card">
        <!-- Layer Tabs -->
        <div class="layer-manager">
          <div class="manager-top">
            <span class="section-tag">陰影層級 ({{ layers.length }})</span>
            <button type="button" class="add-layer-btn" @click="addLayer">+ 新增層級</button>
          </div>

          <div class="layer-pills">
            <div
              v-for="(layer, idx) in layers"
              :key="layer.id"
              class="layer-pill"
              :class="{ active: layer.id === activeLayerId }"
              @click="activeLayerId = layer.id"
            >
              <span class="pill-name">層級 {{ idx + 1 }} {{ layer.inset ? '(內)' : '' }}</span>
              <button
                v-if="layers.length > 1"
                type="button"
                class="del-layer"
                title="刪除層級"
                @click.stop="removeLayer(layer.id)"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <div v-if="activeLayer" class="slider-group">
          <div class="inset-toggle-row">
            <span class="ctrl-title">陰影類型</span>
            <div class="toggle-pills">
              <button
                type="button"
                class="toggle-pill"
                :class="{ active: !activeLayer.inset }"
                @click="activeLayer.inset = false"
              >
                外陰影 (Outset)
              </button>
              <button
                type="button"
                class="toggle-pill"
                :class="{ active: activeLayer.inset }"
                @click="activeLayer.inset = true"
              >
                內陰影 (Inset)
              </button>
            </div>
          </div>

          <RangeSlider
            v-model="activeLayer.x"
            label="X 軸水平位移"
            :min="-80"
            :max="80"
          />

          <RangeSlider
            v-model="activeLayer.y"
            label="Y 軸垂直位移"
            :min="-80"
            :max="80"
          />

          <RangeSlider
            v-model="activeLayer.blur"
            label="模糊擴散半徑 (Blur)"
            :min="0"
            :max="100"
          />

          <RangeSlider
            v-model="activeLayer.spread"
            label="擴充半徑 (Spread)"
            :min="-40"
            :max="60"
          />

          <RangeSlider
            v-model="activeLayer.opacity"
            label="陰影不透明度 (Opacity)"
            :min="0"
            :max="1"
            :step="0.05"
            unit=""
          />

          <ColorPicker
            v-model="activeLayer.color"
            label="陰影色彩"
          />
        </div>

        <!-- Global Element Styles -->
        <div class="global-controls">
          <span class="section-tag">物體本體外觀</span>
          <RangeSlider
            v-model="borderRadius"
            label="本體圓角 (Radius)"
            :min="0"
            :max="64"
          />
          <ColorPicker
            v-model="boxColor"
            label="本體背景色"
          />
        </div>
      </aside>

      <!-- Right Area: Large Stage & Instant Preview -->
      <section class="preview-stage-wrap">
        <!-- Stage Controls Bar -->
        <div class="stage-bar">
          <div class="shape-selectors">
            <span class="bar-title">預覽形狀：</span>
            <button
              type="button"
              class="stage-btn"
              :class="{ active: previewShape === 'card' }"
              @click="previewShape = 'card'"
            >
              卡片
            </button>
            <button
              type="button"
              class="stage-btn"
              :class="{ active: previewShape === 'button' }"
              @click="previewShape = 'button'"
            >
              按鈕
            </button>
            <button
              type="button"
              class="stage-btn"
              :class="{ active: previewShape === 'circle' }"
              @click="previewShape = 'circle'"
            >
              圓形
            </button>
            <button
              type="button"
              class="stage-btn"
              :class="{ active: previewShape === 'window' }"
              @click="previewShape = 'window'"
            >
              視窗
            </button>
          </div>

          <div class="bg-selectors">
            <span class="bar-title">畫布：</span>
            <button
              type="button"
              class="stage-btn"
              :class="{ active: stageBg === 'dark' }"
              @click="stageBg = 'dark'"
            >
              深色
            </button>
            <button
              type="button"
              class="stage-btn"
              :class="{ active: stageBg === 'light' }"
              @click="stageBg = 'light'"
            >
              淺色
            </button>
          </div>
        </div>

        <!-- Canvas Stage -->
        <div class="stage-canvas" :class="[`canvas-${stageBg}`]">
          <div
            class="target-preview-box"
            :class="[`shape-${previewShape}`]"
            :style="{
              boxShadow: cssBoxShadow,
              backgroundColor: boxColor,
              borderRadius: previewShape === 'circle' ? '50%' : `${borderRadius}px`
            }"
          >
            <!-- Content within preview box -->
            <div v-if="previewShape === 'window'" class="mock-window-header">
              <span class="win-dot r" />
              <span class="win-dot y" />
              <span class="win-dot g" />
            </div>

            <div class="preview-inner-content">
              <span class="box-title">CascadeCraft Preview</span>
              <span class="box-sub">即時光影渲染</span>
            </div>
          </div>
        </div>

        <!-- Code Exporter -->
        <div class="export-container">
          <CodeExport
            :css-code="generatedCss"
            :scss-code="generatedScss"
            :tailwind-code="generatedTailwind"
          />
        </div>
      </section>
    </div>

    <!-- GEO / Schema.org Summary -->
    <GeoSummary
      title="CSS Box Shadow (盒陰影規範)"
      css-property="box-shadow"
      syntax="box-shadow: [inset?] <offset-x> <offset-y> <blur-radius>? <spread-radius>? <color>;"
      description="box-shadow 屬性可在元素框上產生一個或多個立體投影效果。透過多層疊加，可實現自然微光散射、卡片懸浮深淺階層 (Elevation) 與擬物化內凹雕刻效果。"
      :tips="[
        '多層陰影疊加是高階 UI 質感的秘密：一層用於微弱近距離接觸陰影，一層用於深色大半徑環境漫射。',
        '內陰影 (inset) 特別適合按鈕按下態、輸入框凹陷感以及金屬高光邊緣。',
        'Tailwind 中可使用任意值語法 shadow-[0_12px_32px_-4px_rgba(0,0,0,0.5)] 實現完全吻合的精確投影。'
      ]"
    />

    <!-- Monetization Ad Slot -->
    <AdSenseSlot slot-title="Box Shadow 底部廣告插槽" />
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.box-shadow-studio {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.studio-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;

  .back-link {
    font-size: 12px;
    font-weight: 600;
    color: $cyan;
    margin-bottom: 6px;
    display: inline-block;

    &:hover {
      text-decoration: underline;
    }
  }

  .studio-title {
    font-size: 28px;
    font-weight: 800;
    color: #ffffff;
  }

  .studio-desc {
    font-size: 13px;
    color: $text-secondary;
  }
}

.presets-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  .preset-label {
    font-size: 11px;
    font-weight: 600;
    color: $text-muted;
  }

  .preset-btn {
    padding: 5px 11px;
    border-radius: $radius-full;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid $border-subtle;
    font-size: 11px;
    font-weight: 500;
    color: $text-secondary;
    transition: all $transition-fast;

    &:hover {
      background: rgba(99, 102, 241, 0.15);
      border-color: rgba(99, 102, 241, 0.4);
      color: #ffffff;
    }
  }
}

// Layout
.playground-layout {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

// Controls
.controls-panel {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-height: calc(100vh - 120px);
  overflow-y: auto;

  @media (max-width: 1024px) {
    max-height: none;
  }
}

.section-tag {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: $text-muted;
}

.layer-manager {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid $border-subtle;
}

.manager-top {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .add-layer-btn {
    font-size: 11px;
    font-weight: 600;
    color: $primary;
    padding: 3px 8px;
    border-radius: $radius-xs;
    background: rgba(99, 102, 241, 0.1);
    border: 1px solid rgba(99, 102, 241, 0.25);

    &:hover {
      background: rgba(99, 102, 241, 0.2);
    }
  }
}

.layer-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.layer-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  background: $bg-input;
  border: 1px solid $border-subtle;
  border-radius: $radius-sm;
  font-size: 11px;
  font-weight: 600;
  color: $text-secondary;
  cursor: pointer;
  transition: all $transition-fast;

  &:hover {
    border-color: $border-medium;
  }

  &.active {
    background: rgba(99, 102, 241, 0.15);
    border-color: $primary;
    color: #ffffff;
  }

  .del-layer {
    color: $text-muted;
    font-size: 10px;

    &:hover {
      color: $rose;
    }
  }
}

.slider-group {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.inset-toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .ctrl-title {
    font-size: 12px;
    font-weight: 500;
    color: $text-secondary;
  }

  .toggle-pills {
    display: flex;
    background: $bg-input;
    border: 1px solid $border-subtle;
    border-radius: $radius-xs;
    padding: 2px;

    .toggle-pill {
      padding: 3px 8px;
      font-size: 10px;
      font-weight: 600;
      color: $text-muted;
      border-radius: $radius-xs;

      &.active {
        background: rgba(255, 255, 255, 0.1);
        color: #ffffff;
      }
    }
  }
}

.global-controls {
  padding-top: 16px;
  border-top: 1px solid $border-subtle;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

// Preview Stage
.preview-stage-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stage-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: $bg-surface;
  border: 1px solid $border-subtle;
  border-radius: $radius-md;
  flex-wrap: wrap;
  gap: 12px;

  .bar-title {
    font-size: 11px;
    font-weight: 600;
    color: $text-muted;
  }

  .shape-selectors, .bg-selectors {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .stage-btn {
    padding: 4px 10px;
    border-radius: $radius-xs;
    font-size: 11px;
    font-weight: 500;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid $border-subtle;
    color: $text-secondary;

    &:hover {
      color: $text-primary;
    }

    &.active {
      background: rgba(99, 102, 241, 0.15);
      border-color: rgba(99, 102, 241, 0.3);
      color: #ffffff;
    }
  }
}

.stage-canvas {
  min-height: 440px;
  border-radius: $radius-lg;
  border: 1px solid $border-subtle;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  position: relative;
  overflow: hidden;
  transition: background-color $transition-smooth;

  &.canvas-dark {
    background-color: #0b0c12;
    background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 24px 24px;
  }

  &.canvas-light {
    background-color: #f1f5f9;
    background-image: radial-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px);
    background-size: 24px 24px;

    .box-title {
      color: #0f172a;
    }
  }
}

.target-preview-box {
  transition: box-shadow 0.1s ease-out, border-radius 0.15s ease-out, background-color 0.2s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  user-select: none;

  &.shape-card {
    width: 260px;
    height: 240px;
  }

  &.shape-button {
    width: 200px;
    height: 56px;
  }

  &.shape-circle {
    width: 200px;
    height: 200px;
  }

  &.shape-window {
    width: 320px;
    height: 220px;
    justify-content: flex-start;

    .mock-window-header {
      width: 100%;
      height: 28px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 0 12px;

      .win-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        &.r { background: #f43f5e; }
        &.y { background: #f59e0b; }
        &.g { background: #10b981; }
      }
    }

    .preview-inner-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}

.preview-inner-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  .box-title {
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
  }

  .box-sub {
    font-size: 11px;
    color: $text-muted;
  }
}

.export-container {
  width: 100%;
}
</style>
