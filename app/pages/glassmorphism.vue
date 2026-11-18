<script setup lang="ts">
import { ref, computed } from 'vue';

useHead({
  title: 'Glassmorphism 毛玻璃特效產生器',
  meta: [
    {
      name: 'description',
      content: '高質感磨砂毛玻璃擬真預覽。調節 backdrop-filter blur 模糊、飽和度、反射光暈邊框，一鍵匯出 CSS / SCSS / Tailwind 程式碼。'
    }
  ]
});

const blur = ref(16);
const opacity = ref(0.65);
const saturation = ref(180);
const borderOpacity = ref(0.18);
const borderRadius = ref(20);
const tintColor = ref('#10121a');

const hexToRgba = (hex: string, alpha: number) => {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  if (isNaN(num)) return `rgba(16, 18, 26, ${alpha})`;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const bgRgba = computed(() => hexToRgba(tintColor.value, opacity.value));
const borderRgba = computed(() => `rgba(255, 255, 255, ${borderOpacity.value})`);
const backdropValue = computed(() => `blur(${blur.value}px) saturate(${saturation.value}%)`);

const generatedCss = computed(() => {
  return `background: ${bgRgba.value};
backdrop-filter: ${backdropValue.value};
-webkit-backdrop-filter: ${backdropValue.value};
border: 1px solid ${borderRgba.value};
border-radius: ${borderRadius.value}px;
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);`;
});

const generatedScss = computed(() => {
  return `@mixin glassmorphism {
  background: ${bgRgba.value};
  backdrop-filter: ${backdropValue.value};
  -webkit-backdrop-filter: ${backdropValue.value};
  border: 1px solid ${borderRgba.value};
  border-radius: ${borderRadius.value}px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

.frosted-glass-card {
  @include glassmorphism;
}`;
});

const generatedTailwind = computed(() => {
  return `backdrop-blur-[${blur.value}px] bg-[${bgRgba.value.replace(/\s+/g, '')}] border border-[${borderRgba.value.replace(/\s+/g, '')}] rounded-[${borderRadius.value}px] shadow-2xl`;
});
</script>

<template>
  <div class="glass-studio container-craft">
    <div class="studio-header">
      <div class="header-left">
        <NuxtLink to="/" class="back-link">{{ $t('common.back') }}</NuxtLink>
        <h1 class="studio-title">Glassmorphism 毛玻璃工坊</h1>
        <p class="studio-desc">Apple 旗艦級毛玻璃磨砂質感、背景濾鏡與邊界反射即時演算</p>
      </div>
    </div>

    <div class="playground-layout">
      <!-- Controls -->
      <aside class="controls-panel craft-card">
        <span class="section-tag">濾鏡與光學折射</span>

        <RangeSlider
          v-model="blur"
          label="模糊半徑 (Backdrop Blur)"
          :min="0"
          :max="40"
        />

        <RangeSlider
          v-model="opacity"
          label="表面透明度 (Opacity)"
          :min="0"
          :max="1"
          :step="0.05"
          unit=""
        />

        <RangeSlider
          v-model="saturation"
          label="色彩飽和度 (Saturation)"
          :min="100"
          :max="250"
          unit="%"
        />

        <RangeSlider
          v-model="borderOpacity"
          label="邊界高光反射 (Border Opacity)"
          :min="0"
          :max="1"
          :step="0.02"
          unit=""
        />

        <RangeSlider
          v-model="borderRadius"
          label="邊角半徑 (Radius)"
          :min="0"
          :max="48"
        />

        <ColorPicker
          v-model="tintColor"
          label="底色基底 (Tint Color)"
        />
      </aside>

      <!-- Stage -->
      <section class="preview-stage-wrap">
        <div class="stage-header craft-card">
          <span class="info-text">背景置入高飽和幾何光球，以呈現真實的 backdrop-filter 磨砂折射</span>
        </div>

        <div class="glass-stage">
          <!-- Vivid Ambient Objects behind the Glass -->
          <div class="ambient-shape sphere-1" />
          <div class="ambient-shape sphere-2" />
          <div class="ambient-shape sphere-3" />

          <!-- The Glass Card Target -->
          <div
            class="glass-card-target"
            :style="{
              background: bgRgba,
              backdropFilter: backdropValue,
              WebkitBackdropFilter: backdropValue,
              border: `1px solid ${borderRgba}`,
              borderRadius: `${borderRadius}px`
            }"
          >
            <div class="card-chip">
              <span class="chip-line" />
              <span class="chip-text">PREMIUM GLASS UI</span>
            </div>

            <h3 class="glass-title">CascadeCraft Ultra</h3>
            <p class="glass-desc">
              自然折射背景色彩，保留立體維度而不干擾前景可讀性。
            </p>

            <div class="card-action-row">
              <button type="button" class="glass-demo-btn">點擊反饋</button>
              <span class="status-tag">Active State</span>
            </div>
          </div>
        </div>

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
      title="CSS Backdrop Filter (背景濾鏡與毛玻璃規範)"
      css-property="backdrop-filter"
      syntax="backdrop-filter: blur(16px) saturate(180%);"
      description="backdrop-filter 屬性對元素背後的區域應用一個或多個圖像過濾效果。與 filter（對元素本身及其內容生效）不同，backdrop-filter 僅影響元素下方的背景，打造如 macOS 與 iOS 的磨砂玻璃質感。"
      :tips="[
        '為了讓 backdrop-filter 生效，元素本身的 background-color 必須具備半透明度 (例如 rgba(255, 255, 255, 0.2) 或 rgba(16, 18, 26, 0.7))。',
        'Safari 需要加上 -webkit-backdrop-filter 前綴以確保最佳相容性。',
        '配合細微半透明白色邊框 (例如 border: 1px solid rgba(255, 255, 255, 0.15))，可大幅強化實體玻璃的折射邊界感。'
      ]"
    />

    <!-- Monetization Ad Slot -->
    <AdSenseSlot slot-title="Glassmorphism 贊助欄位" />
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.glass-studio {
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

.playground-layout {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.controls-panel {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-tag {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: $text-muted;
}

.preview-stage-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stage-header {
  padding: 10px 16px;
  font-size: 12px;
  color: $text-muted;
}

.glass-stage {
  min-height: 440px;
  background: #06070a;
  border: 1px solid $border-subtle;
  border-radius: $radius-lg;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

// Behind shapes
.ambient-shape {
  position: absolute;
  border-radius: 50%;
  filter: blur(20px);
  pointer-events: none;

  &.sphere-1 {
    width: 220px;
    height: 220px;
    background: linear-gradient(135deg, #6366f1, #a855f7);
    top: 40px;
    left: 20%;
  }

  &.sphere-2 {
    width: 180px;
    height: 180px;
    background: linear-gradient(135deg, #06b6d4, #10b981);
    bottom: 50px;
    right: 25%;
  }

  &.sphere-3 {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #f43f5e, #f59e0b);
    top: 45%;
    right: 15%;
  }
}

.glass-card-target {
  width: 100%;
  max-width: 380px;
  padding: 32px;
  position: relative;
  z-index: 2;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.2s ease-out;

  .card-chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;

    .chip-line {
      width: 18px;
      height: 3px;
      background: $cyan;
      border-radius: $radius-full;
      box-shadow: 0 0 8px $cyan;
    }

    .chip-text {
      font-size: 10px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 0.1em;
    }
  }

  .glass-title {
    font-size: 20px;
    font-weight: 800;
    color: #ffffff;
  }

  .glass-desc {
    font-size: 13px;
    color: $text-secondary;
    line-height: 1.6;
  }

  .card-action-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;

    .glass-demo-btn {
      padding: 8px 16px;
      border-radius: $radius-sm;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      font-size: 12px;
      font-weight: 600;
      color: #ffffff;
      transition: background $transition-fast;

      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }

    .status-tag {
      font-size: 11px;
      color: $emerald;
      font-weight: 600;
    }
  }
}

.export-container {
  width: 100%;
}
</style>
