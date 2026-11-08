<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string;
    label?: string;
    showAlpha?: boolean;
  }>(),
  {
    label: '顏色',
    showAlpha: true
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const presetColors = [
  '#000000',
  '#6366f1',
  '#8b5cf6',
  '#06b6d4',
  '#10b981',
  '#f43f5e',
  '#f59e0b',
  '#ffffff'
];

const updateColor = (val: string) => {
  emit('update:modelValue', val);
};
</script>

<template>
  <div class="color-picker-box">
    <div v-if="label" class="color-header">
      <span class="color-label">{{ label }}</span>
      <span class="color-hex">{{ modelValue }}</span>
    </div>

    <div class="color-controls">
      <div class="color-preview-wrap">
        <input
          type="color"
          :value="modelValue.startsWith('#') && modelValue.length === 7 ? modelValue : '#6366f1'"
          class="native-picker"
          @input="e => updateColor((e.target as HTMLInputElement).value)"
        />
        <div class="color-thumb" :style="{ backgroundColor: modelValue }" />
      </div>

      <input
        type="text"
        :value="modelValue"
        class="color-text-input"
        spellcheck="false"
        @input="e => updateColor((e.target as HTMLInputElement).value)"
      />
    </div>

    <!-- Swatches -->
    <div class="color-swatches">
      <button
        v-for="swatch in presetColors"
        :key="swatch"
        type="button"
        class="swatch-btn"
        :class="{ active: modelValue.toLowerCase() === swatch.toLowerCase() }"
        :style="{ backgroundColor: swatch }"
        :title="swatch"
        @click="updateColor(swatch)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.color-picker-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.color-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.color-label {
  font-size: 12px;
  font-weight: 500;
  color: $text-secondary;
}

.color-hex {
  font-family: $font-mono;
  font-size: 11px;
  color: $text-muted;
}

.color-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.color-preview-wrap {
  position: relative;
  width: 32px;
  height: 32px;
  border-radius: $radius-sm;
  overflow: hidden;
  border: 1px solid $border-medium;
  flex-shrink: 0;
  cursor: pointer;

  .native-picker {
    position: absolute;
    inset: -10px;
    width: 200%;
    height: 200%;
    opacity: 0;
    cursor: pointer;
  }

  .color-thumb {
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
}

.color-text-input {
  flex: 1;
  background: $bg-input;
  border: 1px solid $border-subtle;
  border-radius: $radius-sm;
  padding: 6px 10px;
  font-family: $font-mono;
  font-size: 12px;
  color: $text-primary;
  transition: border-color $transition-fast;

  &:focus {
    border-color: $primary;
    box-shadow: 0 0 0 2px rgba($primary, 0.2);
  }
}

.color-swatches {
  display: flex;
  align-items: center;
  gap: 6px;
}

.swatch-btn {
  width: 18px;
  height: 18px;
  border-radius: $radius-xs;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: transform $transition-fast, box-shadow $transition-fast;

  &:hover {
    transform: scale(1.2);
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
  }

  &.active {
    outline: 2px solid $primary;
    outline-offset: 1px;
  }
}
</style>
