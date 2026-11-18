<script setup lang="ts">
import { ref, computed } from 'vue';
import { CSS_MODULES } from '../../data/cssModules';

const { t } = useI18n();

useHead({
  title: 'CascadeCraft · Modern Interactive CSS Platform',
  meta: [
    {
      name: 'description',
      content: 'Zero-learning-curve modern CSS visual playground with real-time sliders, cubic bezier curves, and one-click CSS, SCSS, and Tailwind export.'
    },
    {
      property: 'og:title',
      content: 'CascadeCraft · Modern Interactive CSS Platform'
    },
    {
      property: 'og:description',
      content: 'Zero-learning-curve modern CSS visual playground with real-time sliders, cubic bezier curves, and one-click CSS, SCSS, and Tailwind export.'
    },
    {
      property: 'og:url',
      content: 'https://z94624.github.io/CascadeCraft/'
    }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebSite',
            name: 'CascadeCraft',
            url: 'https://z94624.github.io/CascadeCraft/',
            description: 'Modern high-aesthetic interactive CSS visual toolbox and property playground.',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://z94624.github.io/CascadeCraft/?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          },
          {
            '@type': 'SoftwareApplication',
            name: 'CascadeCraft CSS Playground',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD'
            }
          }
        ]
      })
    }
  ]
});

const searchQuery = ref('');
const selectedCategory = ref<string>('All');

const categories = ['All', 'Effects', 'Animation', 'Layout', 'Box Model'];

const filteredModules = computed(() => {
  return CSS_MODULES.filter(m => {
    const matchesCategory = selectedCategory.value === 'All' || m.category === selectedCategory.value;
    const q = searchQuery.value.toLowerCase().trim();
    const matchesSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.tags.some(t => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });
});
</script>

<template>
  <div class="home-page container-craft">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-pill">
        <span class="pill-dot" />
        <span>{{ t('home.heroPill') }}</span>
      </div>

      <h1 class="hero-title">
        {{ t('home.heroTitle1') }} <br />
        <span class="gradient-text">{{ t('home.heroTitle2') }}</span>
      </h1>

      <p class="hero-desc">
        {{ t('home.heroDesc') }}
      </p>

      <!-- Search & Filters -->
      <div class="search-filter-bar">
        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t('home.searchPlaceholder')"
            class="search-input"
          />
          <button v-if="searchQuery" class="clear-btn" @click="searchQuery = ''">✕</button>
        </div>

        <div class="category-pills">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            class="cat-pill"
            :class="{ active: selectedCategory === cat }"
            @click="selectedCategory = cat"
          >
            {{ t(`home.filters.${cat}`) }}
          </button>
        </div>
      </div>
    </section>

    <!-- Modules Grid -->
    <section class="modules-section">
      <div class="section-header">
        <h2 class="section-title">熱門 CSS 操作工坊</h2>
        <span class="count-badge">{{ filteredModules.length }} 個工具可選</span>
      </div>

      <div class="modules-grid">
        <NuxtLink
          v-for="tool in filteredModules"
          :key="tool.id"
          :to="tool.path"
          class="module-card craft-card"
        >
          <div class="card-glow" />
          <div class="card-top">
            <div class="card-icon-wrap">
              <!-- Visual Indicator -->
              <span class="dot-indicator" />
            </div>
            <span v-if="tool.badge" class="craft-badge craft-badge-cyan">{{ tool.badge }}</span>
          </div>

          <h3 class="card-title">{{ tool.name }}</h3>
          <p class="card-desc">{{ tool.description }}</p>

          <div class="card-tags">
            <span v-for="tag in tool.tags.slice(0, 3)" :key="tag" class="tag">#{{ tag }}</span>
          </div>

          <div class="card-footer">
            <span class="open-link">{{ t('home.openTool') }}</span>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Why CascadeCraft vs Legacy Tools -->
    <section class="comparison-section">
      <div class="comp-header">
        <h2 class="comp-title">為什麼選擇 CascadeCraft？</h2>
        <p class="comp-subtitle">對標傳統 CSS 工具網站（如 CSS Portal），在互動維度全面革新</p>
      </div>

      <div class="comp-grid">
        <div class="comp-card craft-card">
          <div class="icon-wrap indigo">⚡</div>
          <h3>零學習成本 (Zero Learning Curve)</h3>
          <p>揚棄教科書式冗長贅言，所有效果皆藉由滑動數值或拖曳座標即時在視窗上反饋，直覺即懂。</p>
        </div>

        <div class="comp-card craft-card">
          <div class="icon-wrap cyan">🎨</div>
          <h3>深色高對比沉浸設計 (Dark Mode First)</h3>
          <p>遵循現代設計語言，精緻的微光陰影與俐落字體，長時間調參眼睛不疲累，打造工作室級體驗。</p>
        </div>

        <div class="comp-card craft-card">
          <div class="icon-wrap emerald">📋</div>
          <h3>CSS + SCSS + Tailwind 三位一體</h3>
          <p>無論團隊使用原生 CSS、模組化 SCSS 變數，還是 Tailwind 實用類別，皆能一鍵切換精確複製。</p>
        </div>

        <div class="comp-card craft-card">
          <div class="icon-wrap rose">🤖</div>
          <h3>專為 AI 引擎 (GEO) 優化結構</h3>
          <p>內建標準 Schema.org JSON-LD 與 /llms.txt 端點，讓 ChatGPT、Perplexity 與搜尋引擎秒級檢索最佳程式碼。</p>
        </div>
      </div>
    </section>

    <!-- Monetization Ad Slot -->
    <AdSenseSlot slot-title="首頁熱門專欄展示位" />
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.home-page {
  display: flex;
  flex-direction: column;
  gap: 56px;
}

// Hero
.hero-section {
  text-align: center;
  max-width: 860px;
  margin: 20px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 14px;
  border-radius: $radius-full;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.25);
  font-size: 12px;
  font-weight: 600;
  color: #a5b4fc;

  .pill-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: $primary;
    box-shadow: 0 0 8px $primary;
  }
}

.hero-title {
  font-size: 44px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: #ffffff;

  @media (max-width: 640px) {
    font-size: 32px;
  }

  .gradient-text {
    background: linear-gradient(135deg, $cyan 0%, $primary 60%, #c084fc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.hero-desc {
  font-size: 16px;
  color: $text-secondary;
  line-height: 1.7;
  max-width: 720px;

  @media (max-width: 640px) {
    font-size: 14px;
  }
}

// Search & Filter
.search-filter-bar {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 12px;
}

.search-box {
  position: relative;
  width: 100%;
  max-width: 620px;
  display: flex;
  align-items: center;

  .search-icon {
    position: absolute;
    left: 16px;
    width: 18px;
    height: 18px;
    color: $text-muted;
    pointer-events: none;
  }

  .search-input {
    width: 100%;
    background: $bg-card;
    border: 1px solid $border-medium;
    border-radius: $radius-full;
    padding: 14px 44px 14px 46px;
    font-size: 14px;
    color: $text-primary;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    transition: all $transition-smooth;

    &::placeholder {
      color: $text-muted;
    }

    &:focus {
      border-color: $primary;
      box-shadow: 0 0 0 3px rgba($primary, 0.25), 0 8px 30px rgba(0, 0, 0, 0.5);
    }
  }

  .clear-btn {
    position: absolute;
    right: 14px;
    color: $text-muted;
    font-size: 12px;
    padding: 4px;

    &:hover {
      color: $text-primary;
    }
  }
}

.category-pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.cat-pill {
  padding: 6px 14px;
  border-radius: $radius-full;
  font-size: 12px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid $border-subtle;
  color: $text-muted;
  transition: all $transition-fast;

  &:hover {
    color: $text-primary;
    background: rgba(255, 255, 255, 0.08);
  }

  &.active {
    background: rgba(99, 102, 241, 0.2);
    border-color: rgba(99, 102, 241, 0.4);
    color: #ffffff;
  }
}

// Modules Grid
.modules-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .section-title {
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
  }

  .count-badge {
    font-size: 12px;
    color: $text-muted;
  }
}

.modules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 20px;
}

.module-card {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  .card-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 100% 0%, rgba(99, 102, 241, 0.12), transparent 50%);
    opacity: 0;
    transition: opacity $transition-smooth;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(99, 102, 241, 0.4);
    box-shadow: $shadow-card-hover;

    .card-glow {
      opacity: 1;
    }

    .open-link {
      color: $cyan;
      transform: translateX(4px);
    }
  }

  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card-icon-wrap {
    width: 32px;
    height: 32px;
    border-radius: $radius-sm;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid $border-subtle;
    display: flex;
    align-items: center;
    justify-content: center;

    .dot-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: $primary;
      box-shadow: 0 0 8px $primary;
    }
  }

  .card-title {
    font-size: 16px;
    font-weight: 700;
    color: #ffffff;
  }

  .card-desc {
    font-size: 13px;
    color: $text-secondary;
    line-height: 1.6;
    flex: 1;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;

    .tag {
      font-size: 11px;
      font-family: $font-mono;
      color: $text-muted;
    }
  }

  .card-footer {
    margin-top: 8px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);

    .open-link {
      font-size: 12px;
      font-weight: 600;
      color: #a5b4fc;
      transition: all $transition-fast;
      display: inline-block;
    }
  }
}

// Comparison
.comparison-section {
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-top: 20px;
}

.comp-header {
  text-align: center;

  .comp-title {
    font-size: 24px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 8px;
  }

  .comp-subtitle {
    font-size: 14px;
    color: $text-secondary;
  }
}

.comp-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
}

.comp-card {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .icon-wrap {
    width: 40px;
    height: 40px;
    border-radius: $radius-md;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;

    &.indigo {
      background: rgba($primary, 0.15);
      border: 1px solid rgba($primary, 0.3);
    }
    &.cyan {
      background: rgba($cyan, 0.15);
      border: 1px solid rgba($cyan, 0.3);
    }
    &.emerald {
      background: rgba($emerald, 0.15);
      border: 1px solid rgba($emerald, 0.3);
    }
    &.rose {
      background: rgba($rose, 0.15);
      border: 1px solid rgba($rose, 0.3);
    }
  }

  h3 {
    font-size: 15px;
    font-weight: 700;
    color: #ffffff;
  }

  p {
    font-size: 13px;
    color: $text-secondary;
    line-height: 1.6;
  }
}
</style>
