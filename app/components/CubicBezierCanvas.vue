<script setup lang="ts">
import { ref, computed } from 'vue';

const props = withDefaults(
  defineProps<{
    p1x: number;
    p1y: number;
    p2x: number;
    p2y: number;
  }>(),
  {
    p1x: 0.16,
    p1y: 1.0,
    p2x: 0.3,
    p2y: 1.0
  }
);

const emit = defineEmits<{
  (e: 'update:p1x', val: number): void;
  (e: 'update:p1y', val: number): void;
  (e: 'update:p2x', val: number): void;
  (e: 'update:p2y', val: number): void;
  (e: 'change', p: { p1x: number; p1y: number; p2x: number; p2y: number }): void;
}>();

const svgRef = ref<SVGSVGElement | null>(null);
const dragging = ref<'p1' | 'p2' | null>(null);

// Coordinate bounds
// Canvas dimensions
const width = 280;
const height = 280;
const padding = 36;
const graphWidth = width - padding * 2;
const graphHeight = height - padding * 2;

// Graph range: X is 0 to 1, Y is -0.5 to 1.5 to allow spring overshoots!
const yMin = -0.4;
const yMax = 1.4;
const yRange = yMax - yMin;

// Conversion helpers: (math coords 0..1, yMin..yMax) -> (screen coords px)
const toScreenX = (x: number) => padding + x * graphWidth;
const toScreenY = (y: number) => padding + (1 - (y - yMin) / yRange) * graphHeight;

// Screen to Math
const toMathX = (px: number) => {
  const norm = (px - padding) / graphWidth;
  return Math.max(0, Math.min(1, Math.round(norm * 100) / 100));
};

const toMathY = (py: number) => {
  const norm = 1 - (py - padding) / graphHeight;
  const val = yMin + norm * yRange;
  return Math.round(val * 100) / 100;
};

// Points in screen coords
const originP = computed(() => ({ x: toScreenX(0), y: toScreenY(0) }));
const targetP = computed(() => ({ x: toScreenX(1), y: toScreenY(1) }));
const p1Screen = computed(() => ({ x: toScreenX(props.p1x), y: toScreenY(props.p1y) }));
const p2Screen = computed(() => ({ x: toScreenX(props.p2x), y: toScreenY(props.p2y) }));

// Path data
const curvePath = computed(() => {
  return `M ${originP.value.x} ${originP.value.y} C ${p1Screen.value.x} ${p1Screen.value.y}, ${p2Screen.value.x} ${p2Screen.value.y}, ${targetP.value.x} ${targetP.value.y}`;
});

const startDrag = (point: 'p1' | 'p2', e: MouseEvent | TouchEvent) => {
  dragging.value = point;
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('mouseup', endDrag);
  window.addEventListener('touchmove', onDragMove, { passive: false });
  window.addEventListener('touchend', endDrag);
  e.preventDefault();
};

const onDragMove = (e: MouseEvent | TouchEvent) => {
  if (!dragging.value || !svgRef.value) return;
  const rect = svgRef.value.getBoundingClientRect();
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

  const svgX = ((clientX - rect.left) / rect.width) * width;
  const svgY = ((clientY - rect.top) / rect.height) * height;

  const mx = toMathX(svgX);
  const my = toMathY(svgY);

  if (dragging.value === 'p1') {
    emit('update:p1x', mx);
    emit('update:p1y', my);
    emit('change', { p1x: mx, p1y: my, p2x: props.p2x, p2y: props.p2y });
  } else if (dragging.value === 'p2') {
    emit('update:p2x', mx);
    emit('update:p2y', my);
    emit('change', { p1x: props.p1x, p1y: props.p1y, p2x: mx, p2y: my });
  }
};

const endDrag = () => {
  dragging.value = null;
  window.removeEventListener('mousemove', onDragMove);
  window.removeEventListener('mouseup', endDrag);
  window.removeEventListener('touchmove', onDragMove);
  window.removeEventListener('touchend', endDrag);
};
</script>

<template>
  <div class="bezier-canvas-wrapper">
    <svg
      ref="svgRef"
      class="bezier-svg"
      :viewBox="`0 0 ${width} ${height}`"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#6366f1" />
          <stop offset="50%" stop-color="#a855f7" />
          <stop offset="100%" stop-color="#06b6d4" />
        </linearGradient>
      </defs>

      <!-- Background Grid -->
      <!-- Ideal 0..1 bounding box -->
      <rect
        :x="toScreenX(0)"
        :y="toScreenY(1)"
        :width="graphWidth"
        :height="toScreenY(0) - toScreenY(1)"
        fill="rgba(255, 255, 255, 0.02)"
        stroke="rgba(255, 255, 255, 0.08)"
        stroke-dasharray="3,3"
      />

      <!-- Diagonal linear reference -->
      <line
        :x1="originP.x"
        :y1="originP.y"
        :x2="targetP.x"
        :y2="targetP.y"
        stroke="rgba(255, 255, 255, 0.1)"
        stroke-dasharray="2,2"
      />

      <!-- P1 Handle Line -->
      <line
        :x1="originP.x"
        :y1="originP.y"
        :x2="p1Screen.x"
        :y2="p1Screen.y"
        stroke="#f43f5e"
        stroke-width="2"
        stroke-linecap="round"
      />

      <!-- P2 Handle Line -->
      <line
        :x1="targetP.x"
        :y1="targetP.y"
        :x2="p2Screen.x"
        :y2="p2Screen.y"
        stroke="#06b6d4"
        stroke-width="2"
        stroke-linecap="round"
      />

      <!-- The Bezier Curve -->
      <path
        :d="curvePath"
        fill="none"
        stroke="url(#curveGradient)"
        stroke-width="4"
        stroke-linecap="round"
      />

      <!-- Fixed Points (0,0) and (1,1) -->
      <circle :cx="originP.x" :cy="originP.y" r="5" fill="#94a3b8" />
      <circle :cx="targetP.x" :cy="targetP.y" r="5" fill="#94a3b8" />

      <!-- Interactive P1 Handle -->
      <g
        class="handle-group handle-p1"
        :transform="`translate(${p1Screen.x}, ${p1Screen.y})`"
        @mousedown="e => startDrag('p1', e)"
        @touchstart="e => startDrag('p1', e)"
      >
        <circle r="14" fill="transparent" />
        <circle r="8" fill="#f43f5e" filter="drop-shadow(0 0 6px rgba(244, 63, 94, 0.6))" />
        <circle r="3" fill="#ffffff" />
      </g>

      <!-- Interactive P2 Handle -->
      <g
        class="handle-group handle-p2"
        :transform="`translate(${p2Screen.x}, ${p2Screen.y})`"
        @mousedown="e => startDrag('p2', e)"
        @touchstart="e => startDrag('p2', e)"
      >
        <circle r="14" fill="transparent" />
        <circle r="8" fill="#06b6d4" filter="drop-shadow(0 0 6px rgba(6, 182, 212, 0.6))" />
        <circle r="3" fill="#ffffff" />
      </g>

      <!-- Axis Labels -->
      <text :x="toScreenX(0) - 10" :y="toScreenY(0) + 16" fill="#64748b" font-size="10" font-family="monospace">0,0</text>
      <text :x="toScreenX(1) - 6" :y="toScreenY(1) - 8" fill="#64748b" font-size="10" font-family="monospace">1,1</text>
      <text :x="p1Screen.x" :y="p1Screen.y - 12" text-anchor="middle" fill="#f43f5e" font-size="10" font-weight="600">P1 ({{ p1x }}, {{ p1y }})</text>
      <text :x="p2Screen.x" :y="p2Screen.y + 20" text-anchor="middle" fill="#06b6d4" font-size="10" font-weight="600">P2 ({{ p2x }}, {{ p2y }})</text>
    </svg>
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.bezier-canvas-wrapper {
  background: $bg-input;
  border: 1px solid $border-subtle;
  border-radius: $radius-lg;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.4);
}

.bezier-svg {
  width: 100%;
  max-width: 300px;
  height: auto;
  user-select: none;
  touch-action: none;
  cursor: crosshair;
}

.handle-group {
  cursor: grab;
  transition: transform 0.05s ease-out;

  &:hover circle:nth-child(2) {
    transform: scale(1.2);
  }

  &:active {
    cursor: grabbing;
  }
}
</style>
