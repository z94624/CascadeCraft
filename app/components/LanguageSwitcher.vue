<script setup lang="ts">
const { locale, setLocale } = useI18n()

const locales = [
  { code: 'en', label: '🇺🇸 EN' },
  { code: 'zh-TW', label: '🇹🇼 中文' }
]
</script>

<template>
  <div class="lang-switcher">
    <button
      v-for="loc in locales"
      :key="loc.code"
      class="lang-btn"
      :class="{ active: locale === loc.code }"
      @click="setLocale(loc.code as 'en' | 'zh-TW')"
    >
      {{ loc.label }}
    </button>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.lang-switcher {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid $border-subtle;
  border-radius: $radius-sm;
  padding: 2px;
  gap: 2px;
}

.lang-btn {
  padding: 4px 10px;
  border-radius: calc($radius-sm - 2px);
  font-size: 12px;
  font-weight: 600;
  color: $text-muted;
  cursor: pointer;
  transition: all $transition-fast;
  background: transparent;
  border: none;
  font-family: inherit;

  &:hover {
    color: $text-primary;
    background: rgba(255, 255, 255, 0.06);
  }

  &.active {
    background: rgba(99, 102, 241, 0.2);
    color: #fff;
    border: 1px solid rgba(99, 102, 241, 0.35);
  }
}
</style>
