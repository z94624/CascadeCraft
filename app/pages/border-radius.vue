<script setup lang="ts">
import { ref, computed } from 'vue';

useHead({
  title: '8點非對稱圓角產生器 (Fancy Radius)',
  meta: [
    {
      name: 'description',
      content: '有機流體形狀與非對稱八值圓角視覺拖拉產生器，支援 CSS / SCSS / Tailwind 程式碼一鍵匯出。'
    }
  ]
});

// Horizontal radii
const r1 = ref(30);
const r2 = ref(70);
const r3 = ref(70);
const r4 = ref(30);

// Vertical radii
const r5 = ref(30);
const r6 = ref(30);
const r7 = ref(70);
const r8 = ref(70);

const borderRadiusString = computed(() => {
  return `${r1.value}% ${r2.value}% ${r3.value}% ${r4.value}% / ${r5.value}% ${r6.value}% ${r7.value}% ${r8.value}%`;
});

const generatedCss = computed(() => {
  return `border-radius: ${borderRadiusString.value};`;
});

const generatedScss = computed(() => {
  return `$organic-radius: ${borderRadiusString.value};\n\n.organic-shape {\n  border-radius: $organic-radius;\n}`;
});

const generatedTailwind = computed(() => {
  return `rounded-[${borderRadiusString.value.replace(/\s+/g, '_')}]`;
});

// Presets
const presets = [
  { name: '有機流體水滴', v: [30, 70, 70, 30, 30, 30, 70, 70] },
  { name: '平滑彩石', v: [60, 40, 30, 70, 60, 30, 70, 40] },
  { name: '鵝卵石 (Pebble)', v: [50, 50, 33, 67, 39, 61, 39, 61] },
  { name: '科技護盾', v: [20, 80, 20, 80, 80, 20, 80, 20] }
];

const applyPreset = (vals: number[]) => {
  r1.value = vals[0];
  r2.value = vals[1];
  r3.value = vals[2];
  r4.value = vals[3];
  r5.value = vals[4];
  r6.value = vals[5];
  r7.value = vals[6];
  r8.value = vals[7];
};
</script>

<template>
  <div class="radius-studio container-craft">
    <div class="studio-header">
      <div class="header-left">
        <NuxtLink to="/" class="back-link">← 返回儀表板</NuxtLink>
        <h1 class="studio-title">Fancy Border Radius 圓角工坊</h1>
        <p class="studio-desc">非對稱八值圓角與有機幾何流體形態即時操縱</p>
      </div>

      <div class="presets-bar">
        <span class="preset-label">幾何預設：</span>
        <button
          v-for="p in presets"
          :key="p.name"
          type="button"
          class="preset-btn"
          @click="applyPreset(p.v)"
        >
          {{ p.name }}
        </button>
      </div>
    </div>

    <div class="playground-layout">
      <!-- Controls -->
      <aside class="controls-panel craft-card">
        <span class="section-tag">水平半徑 (Horizontal: 4 頂點)</span>
        <RangeSlider v-model="r1" label="左上水平 (Top Left H)" :min="0" :max="100" unit="%" />
        <RangeSlider v-model="r2" label="右上水平 (Top Right H)" :min="0" :max="100" unit="%" />
        <RangeSlider v-model="r3" label="右下水平 (Bottom Right H)" :min="0" :max="100" unit="%" />
        <RangeSlider v-model="r4" label="左下水平 (Bottom Left H)" :min="0" :max="100" unit="%" />

        <div class="divider" />

        <span class="section-tag">垂直半徑 (Vertical: 4 頂點)</span>
        <RangeSlider v-model="r5" label="左上垂直 (Top Left V)" :min="0" :max="100" unit="%" />
        <RangeSlider v-model="r6" label="右上垂直 (Top Right V)" :min="0" :max="100" unit="%" />
        <RangeSlider v-model="r7" label="右下垂直 (Bottom Right V)" :min="0" :max="100" unit="%" />
        <RangeSlider v-model="r8" label="左下垂直 (Bottom Left V)" :min="0" :max="100" unit="%" />
      </aside>

      <!-- Stage -->
      <section class="preview-stage-wrap">
        <div class="stage-canvas craft-card">
          <div
            class="blob-target"
            :style="{ borderRadius: borderRadiusString }"
          >
            <div class="blob-inner">
              <span class="blob-title">Organic Fluid</span>
              <span class="blob-sub">{{ borderRadiusString }}</span>
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
      title="CSS 8-Value Border Radius (八點非對稱圓角規範)"
      css-property="border-radius"
      syntax="border-radius: 1h 2h 3h 4h / 1v 2v 3v 4v;"
      description="border-radius 支援斜線語法 (/)，前四個值控制四個角的水平半徑，斜線後四個值控制垂直半徑。此技術可用於創造完全自然、非對稱且無生硬幾何感的有機流體形狀 (Blob)。"
      :tips="[
        '配合 CSS animation 旋轉或緩慢改變這八個數值，能營造極其生動的熔岩燈或有機水滴動畫。',
        'Tailwind 中以 rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] 類別注入。'
      ]"
    />

    <AdSenseSlot slot-title="Border Radius 底部廣告位" />
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.radius-studio {
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
  gap: 16px;
}

.divider {
  height: 1px;
  background: $border-subtle;
  margin: 8px 0;
}

.section-tag {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: $cyan;
}

.preview-stage-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stage-canvas {
  min-height: 480px;
  background: #090a0f;
  background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 24px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.blob-target {
  width: 280px;
  height: 280px;
  background: linear-gradient(135deg, $primary 0%, #8b5cf6 50%, $cyan 100%);
  box-shadow: 0 20px 50px rgba(99, 102, 241, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  transition: border-radius 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  .blob-inner {
    text-align: center;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 4px;

    .blob-title {
      font-size: 16px;
      font-weight: 800;
    }

    .blob-sub {
      font-size: 10px;
      font-family: $font-mono;
      opacity: 0.8;
      max-width: 180px;
      word-break: break-all;
    }
  }
}

.export-container {
  width: 100%;
}
</style>
