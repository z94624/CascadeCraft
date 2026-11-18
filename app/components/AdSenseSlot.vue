<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const props = withDefaults(
  defineProps<{
    adClient?: string;
    adSlot?: string;
    adFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
    isResponsive?: boolean;
    slotTitle?: string;
    showPlaceholder?: boolean;
  }>(),
  {
    adClient: '', // Provide 'ca-pub-xxxxxxxxxxxxxxxx' in production
    adSlot: '',
    adFormat: 'auto',
    isResponsive: true,
    slotTitle: 'CascadeCraft Sponsor Slot',
    showPlaceholder: false // Temporarily hidden until Google Ad monetization is activated
  }
);

// Only display when real ad credentials exist, or explicitly requested
const isVisible = computed(() => {
  return Boolean((props.adClient && props.adSlot) || props.showPlaceholder);
});

const adLoaded = ref(false);

onMounted(() => {
  if (props.adClient && typeof window !== 'undefined') {
    // Dynamic AdSense Loader
    const existingScript = document.querySelector('script[src*="adsbygoogle.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${props.adClient}`;
      document.head.appendChild(script);
    }

    try {
      // @ts-expect-error adsbygoogle is added by google
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      adLoaded.value = true;
    } catch (e) {
      console.warn('AdSense load bypass:', e);
    }
  }
});
</script>

<template>
  <div v-if="isVisible" class="adsense-container" :class="[`format-${adFormat}`]">
    <!-- When client ID is active and production ad script runs -->
    <ins
      v-if="adClient && adSlot"
      class="adsbygoogle"
      style="display:block"
      :data-ad-client="adClient"
      :data-ad-slot="adSlot"
      :data-ad-format="adFormat"
      :data-full-width-responsive="isResponsive ? 'true' : 'false'"
    />

    <!-- Minimalist Placeholder when explicitly enabled in development -->
    <div v-else-if="showPlaceholder" class="ad-placeholder">
      <div class="ad-tag">
        <span class="dot" />
        <span>ADVERTISEMENT · {{ slotTitle }}</span>
      </div>
      <p class="ad-desc">
        預留 Google AdSense 營利插槽 · 零干擾極簡版位
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.adsense-container {
  width: 100%;
  margin: 32px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &.format-auto {
    min-height: 90px;
  }

  &.format-rectangle {
    min-height: 250px;
  }

  &.format-horizontal {
    min-height: 90px;
  }
}

.ad-placeholder {
  width: 100%;
  max-width: 900px;
  padding: 24px;
  border-radius: $radius-md;
  border: 1px dashed rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.015);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all $transition-smooth;

  &:hover {
    border-color: rgba(99, 102, 241, 0.25);
    background: rgba(99, 102, 241, 0.02);
  }

  .ad-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: $text-muted;
    text-transform: uppercase;

    .dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
    }
  }

  .ad-desc {
    font-size: 12px;
    color: rgba($text-muted, 0.7);
  }
}
</style>
