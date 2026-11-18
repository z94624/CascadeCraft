<script setup lang="ts">
import { ref, computed } from 'vue';

const { t } = useI18n();

const props = defineProps<{
  cssCode: string;
  scssCode?: string;
  tailwindCode?: string;
}>();

const activeTab = ref<'css' | 'scss' | 'tailwind'>('css');
const copied = ref(false);

const currentCode = computed(() => {
  if (activeTab.value === 'scss') return props.scssCode || props.cssCode;
  if (activeTab.value === 'tailwind') return props.tailwindCode || `/* Arbitrary value */\nclass="${props.cssCode.replace(/[\n\r]/g, ' ')}"`;
  return props.cssCode;
});

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(currentCode.value);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('Copy failed:', err);
  }
};
</script>

<template>
  <div class="code-export-card">
    <div class="code-export-header">
      <div class="tabs">
        <button
          type="button"
          class="tab-btn"
          :class="{ active: activeTab === 'css' }"
          @click="activeTab = 'css'"
        >
          CSS
        </button>
        <button
          v-if="scssCode"
          type="button"
          class="tab-btn"
          :class="{ active: activeTab === 'scss' }"
          @click="activeTab = 'scss'"
        >
          SCSS
        </button>
        <button
          v-if="tailwindCode"
          type="button"
          class="tab-btn"
          :class="{ active: activeTab === 'tailwind' }"
          @click="activeTab = 'tailwind'"
        >
          Tailwind
        </button>
      </div>

      <button
        type="button"
        class="copy-btn"
        :class="{ copied }"
        @click="copyToClipboard"
      >
        <svg v-if="!copied" class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <svg v-else class="icon check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span>{{ copied ? t('export.copied') : t('export.copy') }}</span>
      </button>
    </div>

    <div class="code-body">
      <pre><code>{{ currentCode }}</code></pre>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.code-export-card {
  background: $bg-surface;
  border: 1px solid $border-subtle;
  border-radius: $radius-md;
  overflow: hidden;
  box-shadow: $shadow-card;
}

.code-export-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  background: rgba(0, 0, 0, 0.25);
  border-bottom: 1px solid $border-subtle;
}

.tabs {
  display: flex;
  align-items: center;
  gap: 4px;
  background: $bg-input;
  padding: 3px;
  border-radius: $radius-sm;
  border: 1px solid $border-subtle;
}

.tab-btn {
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 600;
  border-radius: $radius-xs;
  color: $text-muted;
  transition: all $transition-fast;

  &:hover {
    color: $text-primary;
  }

  &.active {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
}

.copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: $radius-sm;
  font-size: 12px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid $border-subtle;
  color: $text-secondary;
  transition: all $transition-smooth;

  .icon {
    width: 14px;
    height: 14px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: $text-primary;
    border-color: $border-medium;
  }

  &.copied {
    background: rgba(16, 185, 129, 0.15);
    border-color: rgba(16, 185, 129, 0.4);
    color: $emerald;

    .check-icon {
      stroke: $emerald;
      animation: pop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
  }
}

.code-body {
  padding: 14px 16px;
  font-family: $font-mono;
  font-size: 12px;
  line-height: 1.6;
  color: #a5b4fc;
  overflow-x: auto;
  background: #090b10;

  pre {
    margin: 0;
    white-space: pre-wrap;
    word-break: break-all;
  }
}

@keyframes pop {
  0% { transform: scale(0.6); }
  100% { transform: scale(1); }
}
</style>
