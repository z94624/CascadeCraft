<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: number;
    label: string;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
  }>(),
  {
    min: 0,
    max: 100,
    step: 1,
    unit: 'px'
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void;
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', parseFloat(target.value));
};

const percentage = computed(() => {
  const range = props.max - props.min;
  if (range <= 0) return 0;
  const pct = ((props.modelValue - props.min) / range) * 100;
  return Math.max(0, Math.min(100, pct));
});
</script>

<template>
  <div class="range-slider">
    <div class="slider-header">
      <span class="slider-label">{{ label }}</span>
      <div class="slider-value-badge">
        <input
          type="number"
          :value="modelValue"
          :min="min"
          :max="max"
          :step="step"
          class="num-input"
          @input="onInput"
        />
        <span class="unit">{{ unit }}</span>
      </div>
    </div>

    <div class="slider-track-wrap">
      <input
        type="range"
        :value="modelValue"
        :min="min"
        :max="max"
        :step="step"
        class="custom-range"
        :style="{ '--fill-pct': `${percentage}%` }"
        @input="onInput"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.range-slider {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.slider-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.slider-label {
  font-size: 12px;
  font-weight: 500;
  color: $text-secondary;
  letter-spacing: 0.01em;
}

.slider-value-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 2px 7px;
  background: $bg-input;
  border: 1px solid $border-subtle;
  border-radius: $radius-xs;
  font-family: $font-mono;
  font-size: 11px;
  color: $text-primary;
  transition: border-color $transition-fast;

  &:focus-within {
    border-color: $primary;
    box-shadow: 0 0 0 2px rgba($primary, 0.2);
  }

  .num-input {
    width: 42px;
    background: transparent;
    border: none;
    text-align: right;
    font-family: inherit;
    font-size: 11px;
    color: inherit;
    -moz-appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  .unit {
    color: $text-muted;
    font-size: 10px;
  }
}

.slider-track-wrap {
  position: relative;
  display: flex;
  align-items: center;
  height: 20px;
}

.custom-range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  background: linear-gradient(
    to right,
    $primary 0%,
    $primary var(--fill-pct),
    rgba(255, 255, 255, 0.08) var(--fill-pct),
    rgba(255, 255, 255, 0.08) 100%
  );
  border-radius: $radius-full;
  outline: none;
  cursor: pointer;
  transition: background $transition-fast;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #ffffff;
    border: 2px solid $primary;
    box-shadow: 0 0 10px rgba($primary, 0.6);
    cursor: grab;
    transition: transform $transition-fast, box-shadow $transition-fast;

    &:hover {
      transform: scale(1.15);
      box-shadow: 0 0 14px rgba($primary, 0.8);
    }

    &:active {
      cursor: grabbing;
      transform: scale(1.25);
    }
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #ffffff;
    border: 2px solid $primary;
    box-shadow: 0 0 10px rgba($primary, 0.6);
    cursor: grab;
  }
}
</style>
