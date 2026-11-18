<script setup lang="ts">
import { ref, computed } from 'vue';

useHead({
  title: 'CSS Grid 網格矩陣產生器',
  meta: [
    {
      name: 'description',
      content: '現代 CSS Grid 視覺化網格佈局生成器。直覺增減行與列、調配 fr 與 px 比例、設定 gap 間隙，一鍵匯出 CSS / SCSS / Tailwind 程式碼。'
    }
  ]
});

const cols = ref(3);
const rows = ref(2);
const colGap = ref(16);
const rowGap = ref(16);
const colUnit = ref<'1fr' | 'auto' | '150px' | 'custom'>('1fr');

const gridTemplateColumns = computed(() => {
  if (colUnit.value === 'custom') {
    return '1fr 2fr 1fr';
  }
  return `repeat(${cols.value}, ${colUnit.value})`;
});

const gridTemplateRows = computed(() => {
  return `repeat(${rows.value}, 1fr)`;
});

const totalCells = computed(() => cols.value * rows.value);

const generatedCss = computed(() => {
  return `.grid-container {
  display: grid;
  grid-template-columns: ${gridTemplateColumns.value};
  grid-template-rows: ${gridTemplateRows.value};
  column-gap: ${colGap.value}px;
  row-gap: ${rowGap.value}px;
}`;
});

const generatedScss = computed(() => {
  return `@mixin modern-grid {
  display: grid;
  grid-template-columns: ${gridTemplateColumns.value};
  grid-template-rows: ${gridTemplateRows.value};
  gap: ${rowGap.value}px ${colGap.value}px;
}

.custom-grid-layout {
  @include modern-grid;
}`;
});

const generatedTailwind = computed(() => {
  const colClass = `grid-cols-${cols.value}`;
  const rowClass = `grid-rows-${rows.value}`;
  return `grid ${colClass} ${rowClass} gap-x-[${colGap.value}px] gap-y-[${rowGap.value}px]`;
});
</script>

<template>
  <div class="grid-studio container-craft">
    <div class="studio-header">
      <div class="header-left">
        <NuxtLink to="/" class="back-link">{{ $t('common.back') }}</NuxtLink>
        <h1 class="studio-title">CSS Grid 網格工坊</h1>
        <p class="studio-desc">二維動態網格矩陣生成、多軌道比例配置與即時視窗佈局</p>
      </div>
    </div>

    <div class="playground-layout">
      <!-- Left Panel: Controls -->
      <aside class="controls-panel craft-card">
        <span class="section-tag">網格維度設定</span>

        <RangeSlider
          v-model="cols"
          label="列數 (Columns)"
          :min="1"
          :max="8"
          unit="欄"
        />

        <RangeSlider
          v-model="rows"
          label="行數 (Rows)"
          :min="1"
          :max="6"
          unit="列"
        />

        <div class="ctrl-group">
          <span class="ctrl-title">欄位比例尺寸 (Column Units)</span>
          <div class="pill-options">
            <button
              v-for="unit in ['1fr', 'auto', '150px', 'custom'] as const"
              :key="unit"
              type="button"
              class="pill-btn"
              :class="{ active: colUnit === unit }"
              @click="colUnit = unit"
            >
              {{ unit }}
            </button>
          </div>
        </div>

        <RangeSlider
          v-model="colGap"
          label="水平欄間距 (Column Gap)"
          :min="0"
          :max="48"
        />

        <RangeSlider
          v-model="rowGap"
          label="垂直行間距 (Row Gap)"
          :min="0"
          :max="48"
        />
      </aside>

      <!-- Right Area: Visual Grid Stage -->
      <section class="preview-stage-wrap">
        <div class="stage-header craft-card">
          <span class="info-text">矩陣尺寸：{{ cols }} 欄 × {{ rows }} 行 (共 {{ totalCells }} 個網格單元)</span>
          <span class="count-badge">{{ gridTemplateColumns }}</span>
        </div>

        <div
          class="grid-stage craft-card"
          :style="{
            display: 'grid',
            gridTemplateColumns,
            gridTemplateRows,
            columnGap: `${colGap}px`,
            rowGap: `${rowGap}px`
          }"
        >
          <div
            v-for="idx in totalCells"
            :key="idx"
            class="grid-cell"
          >
            <span class="cell-num">0{{ idx }}</span>
            <span class="cell-label">Grid Area {{ idx }}</span>
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
      title="CSS Grid Layout (網格二維佈局系統)"
      css-property="grid"
      syntax="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;"
      description="CSS Grid 是 CSS 最強大的二維佈局引擎，能同時操縱水平與垂直維度。透過 1fr 彈性分數單位與 repeat() 函式，可輕易架構從儀表板到響應式雜誌畫冊的多樣版面。"
      :tips="[
        'fr (fractional unit) 代表可用空間的彈性份額，1fr 2fr 1fr 能完美分配等比與加權寬度。',
        '搭配 repeat(auto-fit, minmax(280px, 1fr)) 可免寫 Media Query 即實現全自動響應式卡片自適應。',
        'Tailwind 中使用 grid grid-cols-3 gap-4 簡化現代前端網格開發。'
      ]"
    />

    <!-- Monetization Ad Slot -->
    <AdSenseSlot slot-title="CSS Grid 底部廣告位" />
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.grid-studio {
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
  flex-wrap: wrap;
}

.pill-btn {
  padding: 4px 10px;
  border-radius: $radius-xs;
  font-size: 11px;
  font-weight: 500;
  background: $bg-input;
  border: 1px solid $border-subtle;
  color: $text-secondary;

  &:hover {
    color: $text-primary;
  }

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

.stage-header {
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  color: $text-muted;

  .count-badge {
    color: #a5b4fc;
    font-family: $font-mono;
    font-size: 11px;
  }
}

.grid-stage {
  min-height: 440px;
  background-color: #0b0c12;
  background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 24px 24px;
  padding: 24px;
  overflow: auto;
  border: 1px dashed rgba(255, 255, 255, 0.12);
}

.grid-cell {
  background: rgba(6, 182, 212, 0.08);
  border: 1px solid rgba(6, 182, 212, 0.25);
  border-radius: $radius-md;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: all $transition-smooth;

  &:hover {
    background: rgba(6, 182, 212, 0.16);
    border-color: $cyan;
    transform: scale(1.02);
    box-shadow: 0 4px 20px rgba(6, 182, 212, 0.3);
  }

  .cell-num {
    font-family: $font-mono;
    font-size: 14px;
    font-weight: 700;
    color: $cyan;
  }

  .cell-label {
    font-size: 11px;
    color: $text-muted;
  }
}

.export-container {
  width: 100%;
}
</style>
