<script setup lang="ts">
import { ref, computed } from 'vue';

useHead({
  title: 'CSS 漸變調色盤產生器 (Gradients)',
  meta: [
    {
      name: 'description',
      content: '線性 (Linear)、徑向 (Radial) 與圓錐 (Conic) 漸變調配與角度旋鈕，一鍵匯出 CSS / SCSS / Tailwind 漸變語法。'
    }
  ]
});

type GradientType = 'linear' | 'radial' | 'conic';

const gradientType = ref<GradientType>('linear');
const angle = ref(135);
const color1 = ref('#6366f1');
const stop1 = ref(0);
const color2 = ref('#06b6d4');
const stop2 = ref(100);

const gradientCssValue = computed(() => {
  if (gradientType.value === 'linear') {
    return `linear-gradient(${angle.value}deg, ${color1.value} ${stop1.value}%, ${color2.value} ${stop2.value}%)`;
  } else if (gradientType.value === 'radial') {
    return `radial-gradient(circle at center, ${color1.value} ${stop1.value}%, ${color2.value} ${stop2.value}%)`;
  } else {
    return `conic-gradient(from ${angle.value}deg at 50% 50%, ${color1.value} ${stop1.value}%, ${color2.value} ${stop2.value}%)`;
  }
});

const generatedCss = computed(() => {
  return `background: ${gradientCssValue.value};`;
});

const generatedScss = computed(() => {
  return `$brand-gradient: ${gradientCssValue.value};\n\n.gradient-bg {\n  background: $brand-gradient;\n}`;
});

const generatedTailwind = computed(() => {
  return `bg-[${gradientCssValue.value.replace(/\s+/g, '_')}]`;
});

// Presets
const presets = [
  { name: 'Cyber Neon', type: 'linear', angle: 135, c1: '#6366f1', c2: '#06b6d4' },
  { name: 'Sunset Aura', type: 'linear', angle: 90, c1: '#f43f5e', c2: '#f59e0b' },
  { name: 'Aurora Borealis', type: 'radial', angle: 0, c1: '#10b981', c2: '#06b6d4' },
  { name: 'Deep Space', type: 'conic', angle: 180, c1: '#1e1b4b', c2: '#8b5cf6' }
];

const applyPreset = (p: typeof presets[0]) => {
  gradientType.value = p.type as GradientType;
  angle.value = p.angle;
  color1.value = p.c1;
  color2.value = p.c2;
};
</script>

<template>
  <div class="gradient-studio container-craft">
    <div class="studio-header">
      <div class="header-left">
        <NuxtLink to="/" class="back-link">← 返回儀表板</NuxtLink>
        <h1 class="studio-title">CSS 漸變工坊</h1>
        <p class="studio-desc">線性、徑向、圓錐色彩混合與色標調校</p>
      </div>

      <div class="presets-bar">
        <span class="preset-label">漸變靈感庫：</span>
        <button
          v-for="p in presets"
          :key="p.name"
          type="button"
          class="preset-btn"
          @click="applyPreset(p)"
        >
          {{ p.name }}
        </button>
      </div>
    </div>

    <div class="playground-layout">
      <!-- Controls -->
      <aside class="controls-panel craft-card">
        <div class="ctrl-group">
          <span class="ctrl-title">漸變類型 (Type)</span>
          <div class="pill-options">
            <button
              v-for="t in ['linear', 'radial', 'conic'] as const"
              :key="t"
              type="button"
              class="pill-btn"
              :class="{ active: gradientType === t }"
              @click="gradientType = t"
            >
              {{ t }}
            </button>
          </div>
        </div>

        <RangeSlider
          v-if="gradientType !== 'radial'"
          v-model="angle"
          label="旋轉角度 (Angle)"
          :min="0"
          :max="360"
          unit="deg"
        />

        <ColorPicker
          v-model="color1"
          label="起點顏色 (Stop 1)"
        />

        <RangeSlider
          v-model="stop1"
          label="起點位置百分比"
          :min="0"
          :max="100"
          unit="%"
        />

        <ColorPicker
          v-model="color2"
          label="終點顏色 (Stop 2)"
        />

        <RangeSlider
          v-model="stop2"
          label="終點位置百分比"
          :min="0"
          :max="100"
          unit="%"
        />
      </aside>

      <!-- Stage -->
      <section class="preview-stage-wrap">
        <div
          class="gradient-stage craft-card"
          :style="{ background: gradientCssValue }"
        >
          <div class="gradient-overlay-card">
            <span class="overlay-title">High-Aesthetic Gradients</span>
            <span class="overlay-code">{{ gradientCssValue }}</span>
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
      title="CSS Gradients (CSS 漸變色彩函數)"
      css-property="gradient"
      syntax="linear-gradient(angle, color-stop1, color-stop2...)"
      description="CSS 漸變以流暢的過渡連接多種顏色。支援 linear-gradient（沿直線角度過渡）、radial-gradient（由中心向外輻射）以及 conic-gradient（圍繞中心點旋轉過渡）。"
      :tips="[
        '使用 conic-gradient 可輕鬆做出餅圖 (Pie Chart) 與色彩拾取色相環 (Color Wheel)。',
        '搭配 background-clip: text 與 -webkit-text-fill-color: transparent 可實現亮麗文字漸變。',
        'Tailwind 中可使用任意值 bg-[linear-gradient(135deg,#6366f1,#06b6d4)] 實現精確自訂漸變。'
      ]"
    />

    <AdSenseSlot slot-title="Gradients 廣告贊助位" />
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.gradient-studio {
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

    &:hover {
      background: rgba(99, 102, 241, 0.15);
      border-color: rgba(99, 102, 241, 0.4);
      color: #ffffff;
    }
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

.ctrl-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ctrl-title {
  font-size: 12px;
  font-weight: 600;
  color: $text-secondary;
}

.pill-options {
  display: flex;
  gap: 6px;
}

.pill-btn {
  padding: 4px 10px;
  border-radius: $radius-xs;
  font-size: 11px;
  font-weight: 500;
  background: $bg-input;
  border: 1px solid $border-subtle;
  color: $text-secondary;

  &.active {
    background: rgba(99, 102, 241, 0.2);
    border-color: $primary;
    color: #ffffff;
  }
}

.preview-stage-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.gradient-stage {
  min-height: 440px;
  border-radius: $radius-lg;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  box-shadow: $shadow-card;
  transition: background 0.15s ease-out;
}

.gradient-overlay-card {
  padding: 24px 32px;
  background: rgba(10, 11, 16, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: $radius-md;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  .overlay-title {
    font-size: 16px;
    font-weight: 700;
    color: #ffffff;
  }

  .overlay-code {
    font-family: $font-mono;
    font-size: 11px;
    color: $cyan;
  }
}

.export-container {
  width: 100%;
}
</style>
