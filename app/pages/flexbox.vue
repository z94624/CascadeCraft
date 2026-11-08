<script setup lang="ts">
import { ref, computed } from 'vue';

useHead({
  title: 'Flexbox 彈性盒子佈局模擬器',
  meta: [
    {
      name: 'description',
      content: '全視覺化 CSS Flexbox 佈局模擬器。即時操縱主軸、副軸、對齊方式、間距與個別子項目伸縮權重，支援 CSS / SCSS / Tailwind 類別一鍵匯出。'
    }
  ]
});

interface FlexItem {
  id: number;
  label: string;
  grow: number;
  shrink: number;
  alignSelf: 'auto' | 'flex-start' | 'center' | 'flex-end' | 'stretch';
  order: number;
}

// Container props
const flexDirection = ref<'row' | 'row-reverse' | 'column' | 'column-reverse'>('row');
const flexWrap = ref<'nowrap' | 'wrap' | 'wrap-reverse'>('wrap');
const justifyContent = ref<'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'>('center');
const alignItems = ref<'stretch' | 'flex-start' | 'center' | 'flex-end' | 'baseline'>('center');
const gap = ref(16);

// Items list
const items = ref<FlexItem[]>([
  { id: 1, label: '項目 1', grow: 0, shrink: 1, alignSelf: 'auto', order: 0 },
  { id: 2, label: '項目 2', grow: 0, shrink: 1, alignSelf: 'auto', order: 0 },
  { id: 3, label: '項目 3', grow: 0, shrink: 1, alignSelf: 'auto', order: 0 },
  { id: 4, label: '項目 4', grow: 0, shrink: 1, alignSelf: 'auto', order: 0 }
]);

const selectedItemId = ref<number | null>(null);

const selectedItem = computed(() => {
  return items.value.find(i => i.id === selectedItemId.value) || null;
});

const addItem = () => {
  const nextId = items.value.length ? Math.max(...items.value.map(i => i.id)) + 1 : 1;
  items.value.push({
    id: nextId,
    label: `項目 ${nextId}`,
    grow: 0,
    shrink: 1,
    alignSelf: 'auto',
    order: 0
  });
};

const removeItem = (id: number) => {
  if (items.value.length <= 1) return;
  items.value = items.value.filter(i => i.id !== id);
  if (selectedItemId.value === id) selectedItemId.value = null;
};

// Generated CSS
const generatedCss = computed(() => {
  return `.flex-container {
  display: flex;
  flex-direction: ${flexDirection.value};
  flex-wrap: ${flexWrap.value};
  justify-content: ${justifyContent.value};
  align-items: ${alignItems.value};
  gap: ${gap.value}px;
}`;
});

const generatedScss = computed(() => {
  return `// CascadeCraft Flexbox Mixin
@mixin flex-layout {
  display: flex;
  flex-direction: ${flexDirection.value};
  flex-wrap: ${flexWrap.value};
  justify-content: ${justifyContent.value};
  align-items: ${alignItems.value};
  gap: ${gap.value}px;
}

.custom-container {
  @include flex-layout;
}`;
});

const generatedTailwind = computed(() => {
  const dirMap: Record<string, string> = {
    row: 'flex-row',
    'row-reverse': 'flex-row-reverse',
    column: 'flex-col',
    'column-reverse': 'flex-col-reverse'
  };

  const justifyMap: Record<string, string> = {
    'flex-start': 'justify-start',
    center: 'justify-center',
    'flex-end': 'justify-end',
    'space-between': 'justify-between',
    'space-around': 'justify-around',
    'space-evenly': 'justify-evenly'
  };

  const alignMap: Record<string, string> = {
    stretch: 'items-stretch',
    'flex-start': 'items-start',
    center: 'items-center',
    'flex-end': 'items-end',
    baseline: 'items-baseline'
  };

  const wrapMap: Record<string, string> = {
    nowrap: 'flex-nowrap',
    wrap: 'flex-wrap',
    'wrap-reverse': 'flex-wrap-reverse'
  };

  return `flex ${dirMap[flexDirection.value]} ${wrapMap[flexWrap.value]} ${justifyMap[justifyContent.value]} ${alignMap[alignItems.value]} gap-[${gap.value}px]`;
});
</script>

<template>
  <div class="flexbox-studio container-craft">
    <!-- Header -->
    <div class="studio-header">
      <div class="header-left">
        <NuxtLink to="/" class="back-link">← 返回儀表板</NuxtLink>
        <h1 class="studio-title">Flexbox 佈局工坊</h1>
        <p class="studio-desc">容器對齊、排列方向與子項目彈性伸縮即時演算</p>
      </div>

      <div class="item-actions">
        <button type="button" class="craft-btn craft-btn-primary" @click="addItem">
          + 新增子項目
        </button>
      </div>
    </div>

    <!-- Playground Layout -->
    <div class="playground-layout">
      <!-- Left Panel: Container & Item Controls -->
      <aside class="controls-panel craft-card">
        <!-- Direction -->
        <div class="ctrl-group">
          <span class="ctrl-title">flex-direction (主軸方向)</span>
          <div class="pill-options">
            <button
              v-for="dir in ['row', 'column', 'row-reverse', 'column-reverse'] as const"
              :key="dir"
              type="button"
              class="pill-btn"
              :class="{ active: flexDirection === dir }"
              @click="flexDirection = dir"
            >
              {{ dir }}
            </button>
          </div>
        </div>

        <!-- Justify Content -->
        <div class="ctrl-group">
          <span class="ctrl-title">justify-content (主軸對齊)</span>
          <div class="pill-options">
            <button
              v-for="jc in ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'] as const"
              :key="jc"
              type="button"
              class="pill-btn"
              :class="{ active: justifyContent === jc }"
              @click="justifyContent = jc"
            >
              {{ jc }}
            </button>
          </div>
        </div>

        <!-- Align Items -->
        <div class="ctrl-group">
          <span class="ctrl-title">align-items (副軸對齊)</span>
          <div class="pill-options">
            <button
              v-for="ai in ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'] as const"
              :key="ai"
              type="button"
              class="pill-btn"
              :class="{ active: alignItems === ai }"
              @click="alignItems = ai"
            >
              {{ ai }}
            </button>
          </div>
        </div>

        <!-- Flex Wrap -->
        <div class="ctrl-group">
          <span class="ctrl-title">flex-wrap (換行規則)</span>
          <div class="pill-options">
            <button
              v-for="w in ['nowrap', 'wrap', 'wrap-reverse'] as const"
              :key="w"
              type="button"
              class="pill-btn"
              :class="{ active: flexWrap === w }"
              @click="flexWrap = w"
            >
              {{ w }}
            </button>
          </div>
        </div>

        <!-- Gap Slider -->
        <RangeSlider
          v-model="gap"
          label="項目間距 (gap)"
          :min="0"
          :max="48"
        />

        <!-- Selected Child Item Controls -->
        <div v-if="selectedItem" class="item-editor-box">
          <div class="editor-header">
            <span class="section-tag">個別項目：{{ selectedItem.label }}</span>
            <button type="button" class="del-btn" @click="removeItem(selectedItem.id)">
              刪除此項目
            </button>
          </div>

          <RangeSlider
            v-model="selectedItem.grow"
            label="flex-grow (放大權重)"
            :min="0"
            :max="5"
            unit=""
          />

          <RangeSlider
            v-model="selectedItem.shrink"
            label="flex-shrink (縮小權重)"
            :min="0"
            :max="5"
            unit=""
          />

          <div class="ctrl-group">
            <span class="ctrl-title">align-self (個別副軸對齊)</span>
            <div class="pill-options">
              <button
                v-for="as in ['auto', 'flex-start', 'center', 'flex-end', 'stretch'] as const"
                :key="as"
                type="button"
                class="pill-btn"
                :class="{ active: selectedItem.alignSelf === as }"
                @click="selectedItem.alignSelf = as"
              >
                {{ as }}
              </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- Right Area: Interactive Flex Stage & Code Export -->
      <section class="preview-stage-wrap">
        <div class="stage-header craft-card">
          <span class="info-text">點擊任意子方塊即可微調 flex-grow / align-self 等獨立權重</span>
          <span class="count-badge">容器共有 {{ items.length }} 個項目</span>
        </div>

        <!-- Visual Flex Stage -->
        <div
          class="flex-stage craft-card"
          :style="{
            flexDirection,
            flexWrap,
            justifyContent,
            alignItems,
            gap: `${gap}px`
          }"
        >
          <div
            v-for="item in items"
            :key="item.id"
            class="flex-box-item"
            :class="{ selected: selectedItemId === item.id }"
            :style="{
              flexGrow: item.grow,
              flexShrink: item.shrink,
              alignSelf: item.alignSelf,
              order: item.order
            }"
            @click="selectedItemId = item.id"
          >
            <div class="item-top">
              <span class="item-badge">#{{ item.id }}</span>
              <span v-if="item.grow > 0" class="tag-grow">grow: {{ item.grow }}</span>
            </div>
            <span class="item-name">{{ item.label }}</span>
          </div>
        </div>

        <!-- Exporter -->
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
      title="CSS Flexible Box Layout (Flexbox 一維彈性盒模型規範)"
      css-property="flexbox"
      syntax="display: flex; flex-direction: ...; justify-content: ...; align-items: ...;"
      description="Flexbox 是一維佈局模型，提供強大能力沿著主軸 (Main Axis) 與副軸 (Cross Axis) 分配空間並對齊項目。即使項目的尺寸未知或動態變化，也能自動適應不同的螢幕空間。"
      :tips="[
        '記住主軸與副軸的關係：當 flex-direction 為 row 時，justify-content 控制水平，align-items 控制垂直；若為 column 則正好相反。',
        'gap 屬性是現代 Flexbox 的最優解，已獲得所有主流瀏覽器支援，不再需要使用負 margin 或子項目 margin-right。',
        'Tailwind 中以 flex flex-row justify-center items-center gap-4 組裝，大幅提高佈局效率。'
      ]"
    />

    <!-- Monetization Ad Slot -->
    <AdSenseSlot slot-title="Flexbox 底部贊助欄位" />
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.flexbox-studio {
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
  flex-wrap: wrap;
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
  transition: all $transition-fast;

  &:hover {
    color: $text-primary;
    border-color: $border-medium;
  }

  &.active {
    background: rgba(99, 102, 241, 0.2);
    border-color: $primary;
    color: #ffffff;
  }
}

.item-editor-box {
  padding-top: 16px;
  border-top: 1px solid $border-subtle;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.editor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .section-tag {
    font-size: 11px;
    font-weight: 700;
    color: $cyan;
    text-transform: uppercase;
  }

  .del-btn {
    font-size: 11px;
    color: $rose;
    &:hover {
      text-decoration: underline;
    }
  }
}

// Preview Stage
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
    color: $cyan;
    font-weight: 600;
  }
}

.flex-stage {
  min-height: 440px;
  background-color: #0b0c12;
  background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 24px 24px;
  padding: 24px;
  display: flex;
  overflow: auto;
  border: 1px dashed rgba(255, 255, 255, 0.12);
}

.flex-box-item {
  min-width: 90px;
  min-height: 90px;
  background: rgba(99, 102, 241, 0.15);
  border: 1px solid rgba(99, 102, 241, 0.35);
  border-radius: $radius-md;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;

  &:hover {
    transform: translateY(-2px);
    border-color: $cyan;
    box-shadow: 0 4px 16px rgba(6, 182, 212, 0.25);
  }

  &.selected {
    border-color: $cyan;
    background: rgba(6, 182, 212, 0.2);
    box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.4);
  }

  .item-top {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .item-badge {
    font-size: 10px;
    font-weight: 700;
    color: $text-muted;
  }

  .tag-grow {
    font-size: 9px;
    background: rgba(16, 185, 129, 0.2);
    color: $emerald;
    padding: 1px 4px;
    border-radius: $radius-xs;
  }

  .item-name {
    font-size: 13px;
    font-weight: 600;
    color: #ffffff;
  }
}

.export-container {
  width: 100%;
}
</style>
