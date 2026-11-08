<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = withDefaults(
  defineProps<{
    adClient?: string;
    adSlot?: string;
    adFormat?: 'auto' | 'fluid' | 'rectangle' | 'horizontal';
    isResponsive?: boolean;
    slotTitle?: string;
  }>(),
  {
    adClient: '', // Provide 'ca-pub-xxxxxxxxxxxxxxxx' in production
    adSlot: '',
    adFormat: 'auto',
    isResponsive: true,
    slotTitle: 'CascadeCraft Sponsor Slot'
  }
);

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
  <div class="adsense-container" :class="[`format-${adFormat}`]">
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

    <!-- Minimalist Placeholder when not configured / in development -->
    <div v-else class="ad-placeholder">
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
  margin: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ad-placeholder {
  width: 100%;
  min-height: 80px;
  border: 1px dashed rgba(255, 255, 255, 0.1);
  background: rgba(16, 18, 26, 0.4);
  border-radius: $radius-md;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 16px;
  color: $text-muted;
  transition: border-color $transition-smooth;

  &:hover {
    border-color: rgba(99, 102, 241, 0.3);
  }

  .ad-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    letter-spacing: 0.08em;
    font-weight: 600;
    color: $text-secondary;
    text-transform: uppercase;

    .dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: $cyan;
      box-shadow: 0 0 6px $cyan;
    }
  }

  .ad-desc {
    font-size: 11px;
    color: $text-muted;
  }
}

.format-horizontal .ad-placeholder {
  min-height: 90px;
}

.format-rectangle .ad-placeholder {
  min-height: 250px;
  max-width: 300px;
}
</style>
