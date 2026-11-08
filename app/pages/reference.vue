<script setup lang="ts">
import { ref, computed } from 'vue';
import { CSS_PROPERTIES, type CssPropertyItem } from '../../data/cssProperties';

useHead({
  title: 'CSS 屬性大全 (對標 MDN 字典與互動範例)',
  meta: [
    {
      name: 'description',
      content: '完整收錄 MDN 現代 CSS 核心與進階屬性，每一項屬性皆配備專屬的即時微型互動控制元件與語意化結構說明。'
    }
  ]
});

const searchQuery = ref('');
const selectedCategory = ref('All');

const categories = ['All', 'Effects & Visuals', 'Layout & Box Model', 'Animations & Transitions', 'Transforms', 'Box Model'];

// State map for interactive property controls
const propertyValues = ref<Record<string, string | number>>({});

// Initialize defaults
CSS_PROPERTIES.forEach(p => {
  if (p.type === 'range') {
    propertyValues.value[p.name] = parseInt(p.defaultValue) || 16;
  } else {
    propertyValues.value[p.name] = p.defaultValue;
  }
});

const filteredProperties = computed(() => {
  return CSS_PROPERTIES.filter(p => {
    const matchesCat = selectedCategory.value === 'All' || p.category === selectedCategory.value;
    const q = searchQuery.value.toLowerCase().trim();
    const matchesQ =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.syntax.toLowerCase().includes(q);
    return matchesCat && matchesQ;
  });
});

const copiedMap = ref<Record<string, boolean>>({});

const copyPropertyCode = async (propName: string) => {
  const val = propertyValues.value[propName];
  const p = CSS_PROPERTIES.find(item => item.name === propName);
  const unit = p?.unit || '';
  const code = `${propName}: ${val}${unit};`;
  await navigator.clipboard.writeText(code);
  copiedMap.value[propName] = true;
  setTimeout(() => {
    copiedMap.value[propName] = false;
  }, 2000);
};

const getTargetStyle = (prop: CssPropertyItem) => {
  const val = propertyValues.value[prop.name];
  const unit = prop.unit || '';
  return {
    [prop.name]: `${val}${unit}`
  };
};
</script>

<template>
  <div class="reference-page container-craft">
    <!-- Header -->
    <div class="page-header">
      <div class="header-left">
        <NuxtLink to="/" class="back-link">← 返回儀表板</NuxtLink>
        <h1 class="page-title">CSS 屬性字典 (對標 MDN)</h1>
        <p class="page-desc">每個屬性皆內嵌即時微型測試台，動手即見反饋</p>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="filter-bar craft-card">
      <div class="search-input-wrap">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜尋屬性名稱、語法或關鍵字 (例如: backdrop-filter, flex, gap)..."
          class="prop-search-input"
        />
      </div>

      <div class="cat-pill-list">
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          class="cat-btn"
          :class="{ active: selectedCategory === cat }"
          @click="selectedCategory = cat"
        >
          {{ cat === 'All' ? '全部屬性' : cat }}
        </button>
      </div>
    </div>

    <!-- Properties Cards Grid -->
    <div class="properties-grid">
      <div
        v-for="prop in filteredProperties"
        :key="prop.name"
        class="prop-card craft-card"
      >
        <div class="prop-card-header">
          <div class="header-titles">
            <h2 class="prop-name">{{ prop.name }}</h2>
            <span class="prop-cat">{{ prop.category }}</span>
          </div>

          <button
            type="button"
            class="prop-copy-btn"
            :class="{ copied: copiedMap[prop.name] }"
            @click="copyPropertyCode(prop.name)"
          >
            {{ copiedMap[prop.name] ? '已複製！' : '複製屬性' }}
          </button>
        </div>

        <p class="prop-desc">{{ prop.description }}</p>

        <div class="syntax-box">
          <span class="syntax-label">語法規範：</span>
          <code>{{ prop.syntax }}</code>
        </div>

        <!-- Micro Interactive Playground inside the card -->
        <div class="micro-playground">
          <div class="micro-control">
            <!-- Select dropdown -->
            <div v-if="prop.type === 'select'" class="ctrl-row">
              <label class="ctrl-lbl">即時數值測試：</label>
              <select v-model="propertyValues[prop.name]" class="prop-select">
                <option v-for="opt in prop.options" :key="opt" :value="opt">
                  {{ opt }}
                </option>
              </select>
            </div>

            <!-- Range slider -->
            <div v-else-if="prop.type === 'range'" class="ctrl-row">
              <RangeSlider
                v-model="propertyValues[prop.name] as number"
                :label="`調整 ${prop.name}`"
                :min="prop.min"
                :max="prop.max"
                :unit="prop.unit"
              />
            </div>

            <!-- Text input -->
            <div v-else class="ctrl-row">
              <label class="ctrl-lbl">即時數值測試：</label>
              <input
                v-model="propertyValues[prop.name]"
                type="text"
                class="prop-text-input"
              />
            </div>
          </div>

          <!-- Micro Stage Box -->
          <div class="micro-stage">
            <div
              class="micro-target-box"
              :style="getTargetStyle(prop)"
            >
              <span>{{ propertyValues[prop.name] }}</span>
            </div>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="card-footer">
          <NuxtLink v-if="prop.moduleLink" :to="prop.moduleLink" class="full-tool-link">
            前往完整專屬工坊 →
          </NuxtLink>
          <span v-else class="ref-badge">MDN Standard</span>
        </div>
      </div>
    </div>

    <!-- GEO / Schema.org Summary -->
    <GeoSummary
      title="MDN CSS Specification & Properties Encyclopedia"
      css-property="css-properties"
      syntax="selector { property: value; }"
      description="CascadeCraft CSS 屬性大全提供最新 W3C / MDN 規範標準的語法查閱，具備零學習成本的即時微型測試台與相容性指南。"
      :tips="[
        '善用即時控制器在卡片內直觀預覽數值變化的差異，無須在本地反覆除錯。',
        '點擊「複製屬性」按鈕可直接獲取包含分號與單位的精確宣告。'
      ]"
    />

    <!-- Monetization Ad Slot -->
    <AdSenseSlot slot-title="CSS 字典廣告位" />
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.reference-page {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-header {
  .back-link {
    font-size: 12px;
    font-weight: 600;
    color: $cyan;
    margin-bottom: 6px;
    display: inline-block;
  }

  .page-title {
    font-size: 28px;
    font-weight: 800;
    color: #ffffff;
  }

  .page-desc {
    font-size: 13px;
    color: $text-secondary;
  }
}

.filter-bar {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.search-input-wrap {
  position: relative;
  display: flex;
  align-items: center;

  .search-icon {
    position: absolute;
    left: 14px;
    width: 16px;
    height: 16px;
    color: $text-muted;
  }

  .prop-search-input {
    width: 100%;
    background: $bg-input;
    border: 1px solid $border-subtle;
    border-radius: $radius-full;
    padding: 10px 16px 10px 40px;
    font-size: 13px;
    color: $text-primary;
    transition: border-color $transition-fast;

    &:focus {
      border-color: $primary;
    }
  }
}

.cat-pill-list {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.cat-btn {
  padding: 4px 12px;
  border-radius: $radius-full;
  font-size: 11px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid $border-subtle;
  color: $text-secondary;
  transition: all $transition-fast;

  &:hover {
    color: $text-primary;
  }

  &.active {
    background: rgba(99, 102, 241, 0.2);
    border-color: $primary;
    color: #ffffff;
  }
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 20px;
}

.prop-card {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.prop-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  .prop-name {
    font-size: 18px;
    font-weight: 800;
    font-family: $font-mono;
    color: #ffffff;
  }

  .prop-cat {
    font-size: 11px;
    color: $cyan;
    font-weight: 600;
  }
}

.prop-copy-btn {
  padding: 4px 10px;
  border-radius: $radius-xs;
  font-size: 11px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid $border-subtle;
  color: $text-secondary;
  transition: all $transition-fast;

  &:hover {
    color: $text-primary;
    border-color: $border-medium;
  }

  &.copied {
    background: rgba(16, 185, 129, 0.2);
    border-color: $emerald;
    color: $emerald;
  }
}

.prop-desc {
  font-size: 13px;
  color: $text-secondary;
  line-height: 1.6;
}

.syntax-box {
  background: rgba(0, 0, 0, 0.3);
  padding: 8px 12px;
  border-radius: $radius-sm;
  border: 1px solid $border-subtle;

  .syntax-label {
    font-size: 10px;
    color: $text-muted;
    font-weight: 600;
    display: block;
    margin-bottom: 2px;
  }

  code {
    font-size: 11px;
    color: #a5b4fc;
    word-break: break-all;
  }
}

// Micro Playground
.micro-playground {
  display: grid;
  grid-template-columns: 1fr 110px;
  gap: 14px;
  background: $bg-input;
  border: 1px solid $border-subtle;
  border-radius: $radius-md;
  padding: 12px;
  align-items: center;
}

.ctrl-row {
  display: flex;
  flex-direction: column;
  gap: 6px;

  .ctrl-lbl {
    font-size: 10px;
    font-weight: 600;
    color: $text-muted;
  }

  .prop-select, .prop-text-input {
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid $border-subtle;
    border-radius: $radius-xs;
    padding: 4px 8px;
    font-size: 11px;
    font-family: $font-mono;
    color: $text-primary;

    &:focus {
      border-color: $primary;
    }
  }

  .prop-select option {
    background: #11131a;
    color: #ffffff;
  }
}

.micro-stage {
  height: 90px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: $radius-sm;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 6px;
}

.micro-target-box {
  width: 70px;
  height: 50px;
  background: rgba(99, 102, 241, 0.3);
  border: 1px solid rgba(99, 102, 241, 0.6);
  border-radius: $radius-sm;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  font-family: $font-mono;
  color: #ffffff;
  text-align: center;
  transition: all 0.2s ease-out;
  padding: 2px;
  overflow: hidden;
  word-break: break-all;
}

.card-footer {
  margin-top: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .full-tool-link {
    font-size: 12px;
    font-weight: 600;
    color: $cyan;

    &:hover {
      text-decoration: underline;
    }
  }

  .ref-badge {
    font-size: 10px;
    color: $text-muted;
    font-weight: 600;
  }
}
</style>
