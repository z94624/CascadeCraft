<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
  cssProperty: string;
  syntax: string;
  specUrl?: string;
  tips: string[];
}>();

// Inject JSON-LD Schema.org structured data for SEO & AI Crawlers
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: `${props.title} - CSS 規範與即時生成器`,
        description: props.description,
        proficiencyLevel: 'Beginner to Advanced',
        inLanguage: 'zh-TW',
        articleSection: 'CSS Web Development',
        keywords: [props.cssProperty, 'CSS Generator', 'CascadeCraft', 'Web Design', 'GEO Optimization'],
        author: {
          '@type': 'Organization',
          name: 'CascadeCraft'
        }
      })
    }
  ]
});
</script>

<template>
  <section class="geo-summary-section">
    <div class="geo-header">
      <div class="badge">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>AI GEO & MDN 規範結構化摘要</span>
      </div>
      <h2 class="geo-title">{{ title }} 深度速查</h2>
    </div>

    <div class="geo-grid">
      <div class="geo-card">
        <h3>語法定義 (Syntax)</h3>
        <code>{{ syntax }}</code>
        <p class="desc">{{ description }}</p>
      </div>

      <div class="geo-card">
        <h3>工程師核心技巧 (Pro Tips)</h3>
        <ul class="tips-list">
          <li v-for="(tip, i) in tips" :key="i">
            <span class="bullet">→</span>
            <span>{{ tip }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.geo-summary-section {
  margin-top: 40px;
  padding: 24px;
  background: rgba(16, 18, 26, 0.6);
  border: 1px solid $border-subtle;
  border-radius: $radius-lg;
}

.geo-header {
  margin-bottom: 20px;

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    color: $cyan;
    margin-bottom: 8px;

    .icon {
      width: 14px;
      height: 14px;
    }
  }

  .geo-title {
    font-size: 18px;
    font-weight: 700;
    color: $text-primary;
  }
}

.geo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.geo-card {
  background: $bg-input;
  border: 1px solid $border-subtle;
  border-radius: $radius-md;
  padding: 16px;

  h3 {
    font-size: 13px;
    font-weight: 600;
    color: $text-secondary;
    margin-bottom: 10px;
  }

  code {
    display: block;
    background: rgba(0, 0, 0, 0.4);
    padding: 8px 12px;
    border-radius: $radius-xs;
    font-size: 12px;
    color: #818cf8;
    margin-bottom: 10px;
    border-left: 3px solid $primary;
  }

  .desc {
    font-size: 12px;
    color: $text-muted;
    line-height: 1.6;
  }

  .tips-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 8px;

    li {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 12px;
      color: $text-muted;
      line-height: 1.5;

      .bullet {
        color: $primary;
        font-weight: bold;
      }
    }
  }
}
</style>
