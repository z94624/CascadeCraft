<script setup lang="ts">
import { ref, computed } from 'vue';

useHead({
  title: 'Cubic Bezier 貝茲曲線過渡調整器',
  meta: [
    {
      name: 'description',
      content: '致敬 cubic-bezier.com 的現代 CSS 貝茲曲線調整器。具備雙控制錨點拖曳、超調回彈 (Spring)、多跑道動態競速預覽與 transition 一鍵匯出。'
    }
  ]
});

// Bezier Control points
const p1x = ref(0.16);
const p1y = ref(1.0);
const p2x = ref(0.3);
const p2y = ref(1.0);

const duration = ref(1.0);
const isLooping = ref(false);
const isRacing = ref(false);
const raceKey = ref(0);

const bezierString = computed(() => {
  return `cubic-bezier(${p1x.value}, ${p1y.value}, ${p2x.value}, ${p2y.value})`;
});

const generatedCss = computed(() => {
  return `transition-timing-function: ${bezierString.value};\ntransition-duration: ${duration.value}s;`;
});

const generatedScss = computed(() => {
  return `$ease-custom: ${bezierString.value};\n$transition-duration: ${duration.value}s;\n\n.animated-element {\n  transition: all $transition-duration $ease-custom;\n}`;
});

const generatedTailwind = computed(() => {
  return `transition-all duration-[${Math.round(duration.value * 1000)}ms] [transition-timing-function:${bezierString.value}]`;
});

// Presets
const presets = [
  { name: 'Apple Smooth', p: [0.16, 1.0, 0.3, 1.0] },
  { name: 'Spring Bounce', p: [0.68, -0.55, 0.27, 1.55] },
  { name: 'Snappy Out', p: [0.2, 0.0, 0.0, 1.0] },
  { name: 'Ease In Out', p: [0.42, 0.0, 0.58, 1.0] },
  { name: 'Ease In', p: [0.42, 0.0, 1.0, 1.0] },
  { name: 'Ease Out', p: [0.0, 0.0, 0.58, 1.0] },
  { name: 'Ease', p: [0.25, 0.1, 0.25, 1.0] },
  { name: 'Linear', p: [0.0, 0.0, 1.0, 1.0] }
];

const applyPreset = (coords: number[]) => {
  p1x.value = coords[0];
  p1y.value = coords[1];
  p2x.value = coords[2];
  p2y.value = coords[3];
  triggerRace();
};

const triggerRace = () => {
  isRacing.value = false;
  setTimeout(() => {
    raceKey.value++;
    isRacing.value = true;
  }, 50);
};

onMounted(() => {
  triggerRace();
});
</script>

<template>
  <div class="bezier-studio container-craft">
    <!-- Header -->
    <div class="studio-header">
      <div class="header-left">
        <NuxtLink to="/" class="back-link">← 返回儀表板</NuxtLink>
        <h1 class="studio-title">Cubic Bezier 曲線工坊</h1>
        <p class="studio-desc">致敬經典，微調流暢物理過渡與回彈曲線</p>
      </div>

      <!-- Presets -->
      <div class="presets-bar">
        <span class="preset-label">曲線庫：</span>
        <button
          v-for="item in presets"
          :key="item.name"
          type="button"
          class="preset-btn"
          @click="applyPreset(item.p)"
        >
          {{ item.name }}
        </button>
      </div>
    </div>

    <!-- Playground Workspace -->
    <div class="playground-layout">
      <!-- Left Panel: The Canvas & Numeric Sliders -->
      <aside class="controls-panel craft-card">
        <span class="section-tag">2D 貝茲座標錨點</span>

        <!-- Draggable Bezier SVG -->
        <CubicBezierCanvas
          :p1x="p1x"
          :p1y="p1y"
          :p2x="p2x"
          :p2y="p2y"
          @update:p1x="val => p1x = val"
          @update:p1y="val => p1y = val"
          @update:p2x="val => p2x = val"
          @update:p2y="val => p2y = val"
          @change="triggerRace"
        />

        <!-- Precision Sliders -->
        <div class="sliders-list">
          <RangeSlider
            v-model="p1x"
            label="P1 X 軸 (0 ~ 1)"
            :min="0"
            :max="1"
            :step="0.01"
            unit=""
            @update:model-value="triggerRace"
          />
          <RangeSlider
            v-model="p1y"
            label="P1 Y 軸 (回彈支援)"
            :min="-0.5"
            :max="1.5"
            :step="0.01"
            unit=""
            @update:model-value="triggerRace"
          />
          <RangeSlider
            v-model="p2x"
            label="P2 X 軸 (0 ~ 1)"
            :min="0"
            :max="1"
            :step="0.01"
            unit=""
            @update:model-value="triggerRace"
          />
          <RangeSlider
            v-model="p2y"
            label="P2 Y 軸 (回彈支援)"
            :min="-0.5"
            :max="1.5"
            :step="0.01"
            unit=""
            @update:model-value="triggerRace"
          />
        </div>

        <div class="timing-settings">
          <span class="section-tag">過渡時間設定</span>
          <RangeSlider
            v-model="duration"
            label="動畫時長 (Duration)"
            :min="0.2"
            :max="4.0"
            :step="0.1"
            unit="s"
            @update:model-value="triggerRace"
          />
        </div>
      </aside>

      <!-- Right Area: Dual Racing Track Animation Comparison -->
      <section class="preview-stage-wrap">
        <!-- Racing Control Header -->
        <div class="race-bar craft-card">
          <div class="race-title-group">
            <span class="race-title">雙軌道動畫競速對照</span>
            <span class="race-sub">上方為預設標準 ease，下方為自訂曲線</span>
          </div>

          <div class="race-actions">
            <button
              type="button"
              class="craft-btn craft-btn-subtle"
              :class="{ active: isLooping }"
              @click="isLooping = !isLooping"
            >
              循環播放: {{ isLooping ? '開啟' : '關閉' }}
            </button>
            <button
              type="button"
              class="craft-btn craft-btn-primary"
              @click="triggerRace"
            >
              ▶ 重新競速
            </button>
          </div>
        </div>

        <!-- The Race Stage -->
        <div class="stage-canvas" :key="raceKey">
          <!-- Track 1: Standard Ease -->
          <div class="race-track">
            <div class="track-info">
              <span class="track-badge">標準基準</span>
              <code class="track-code">ease (0.25, 0.1, 0.25, 1.0)</code>
            </div>

            <div class="track-lane">
              <div
                class="racer racer-default"
                :class="{
                  'anim-run': isRacing,
                  'anim-loop': isLooping
                }"
                :style="{
                  animationDuration: `${duration}s`,
                  animationTimingFunction: 'ease'
                }"
              >
                <div class="racer-core" />
              </div>
            </div>
          </div>

          <!-- Track 2: Custom Bezier Curve -->
          <div class="race-track custom-track">
            <div class="track-info">
              <span class="track-badge custom-badge">自訂曲線</span>
              <code class="track-code custom-code">{{ bezierString }}</code>
            </div>

            <div class="track-lane">
              <div
                class="racer racer-custom"
                :class="{
                  'anim-run': isRacing,
                  'anim-loop': isLooping
                }"
                :style="{
                  animationDuration: `${duration}s`,
                  animationTimingFunction: bezierString
                }"
              >
                <div class="racer-core cyan" />
              </div>
            </div>
          </div>

          <!-- Interactive Morph / Scale Sandbox Target -->
          <div class="morph-sandbox">
            <span class="sandbox-title">懸浮互動卡片 (Hover Me)</span>
            <div
              class="hover-target-box"
              :style="{
                transitionDuration: `${duration}s`,
                transitionTimingFunction: bezierString
              }"
            >
              <span class="box-glow" />
              <span>懸浮檢視物理回彈</span>
            </div>
          </div>
        </div>

        <!-- Code Exporter -->
        <div class="export-container">
          <CodeExport
            :css-code="generatedCss"
            :scss-code="generatedScss"
            :tailwind-code="generatedTailwind"
          />
        </div>
      </section>
    </div>

    <!-- GEO / Schema.org Summary -->
    <GeoSummary
      title="Cubic Bezier (三次貝茲曲線與 CSS 過渡速度曲線)"
      css-property="transition-timing-function"
      syntax="cubic-bezier(x1, y1, x2, y2)"
      description="cubic-bezier 函數定義了一條三次貝茲曲線，用於 CSS 的 transition 與 animation。x1 和 x2 必須在 0 到 1 之間，而 y1 和 y2 數值可小於 0 或大於 1，藉此產生自然逼真的回彈 (Bounce / Spring) 效果。"
      :tips="[
        '微調過渡曲線是提升現代網頁 UI 精緻度最立竿見影的技巧，原生 ease 往往顯得平淡僵硬。',
        '設定 y2 > 1.0 (例如 1.2 ~ 1.5) 可製造出先衝出邊界再反彈回位的 Spring 物理回彈感。',
        'Apple iOS 與 macOS 經典流體感曲線近似 cubic-bezier(0.16, 1, 0.3, 1)。'
      ]"
    />

    <!-- Monetization Ad Slot -->
    <AdSenseSlot slot-title="Cubic Bezier 底部贊助欄位" />
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.bezier-studio {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.studio-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;

  .back-link {
    font-size: 12px;
    font-weight: 600;
    color: $cyan;
    margin-bottom: 6px;
    display: inline-block;

    &:hover {
      text-decoration: underline;
    }
  }

  .studio-title {
    font-size: 28px;
    font-weight: 800;
    color: #ffffff;
  }

  .studio-desc {
    font-size: 13px;
    color: $text-secondary;
  }
}

.presets-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  .preset-label {
    font-size: 11px;
    font-weight: 600;
    color: $text-muted;
  }

  .preset-btn {
    padding: 5px 11px;
    border-radius: $radius-full;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid $border-subtle;
    font-size: 11px;
    font-weight: 500;
    color: $text-secondary;
    transition: all $transition-fast;

    &:hover {
      background: rgba(99, 102, 241, 0.15);
      border-color: rgba(99, 102, 241, 0.4);
      color: #ffffff;
    }
  }
}

.playground-layout {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.controls-panel {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-tag {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: $text-muted;
}

.sliders-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.timing-settings {
  padding-top: 16px;
  border-top: 1px solid $border-subtle;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

// Preview Stage
.preview-stage-wrap {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.race-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  flex-wrap: wrap;
  gap: 12px;

  .race-title {
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
    display: block;
  }

  .race-sub {
    font-size: 11px;
    color: $text-muted;
  }

  .race-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.stage-canvas {
  background: #090a0f;
  border: 1px solid $border-subtle;
  border-radius: $radius-lg;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  overflow: hidden;
}

// Track
.race-track {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .track-info {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .track-badge {
    font-size: 10px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: $radius-full;
    background: rgba(255, 255, 255, 0.08);
    color: $text-secondary;

    &.custom-badge {
      background: rgba(6, 182, 212, 0.15);
      color: $cyan;
      border: 1px solid rgba(6, 182, 212, 0.3);
    }
  }

  .track-code {
    font-family: $font-mono;
    font-size: 11px;
    color: $text-muted;

    &.custom-code {
      color: #a5b4fc;
    }
  }

  .track-lane {
    position: relative;
    width: 100%;
    height: 48px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid $border-subtle;
    border-radius: $radius-md;
    display: flex;
    align-items: center;
    padding: 0 8px;

    &::after {
      content: '';
      position: absolute;
      right: 16px;
      top: 6px;
      bottom: 6px;
      width: 2px;
      background: repeating-linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.2) 4px,
        transparent 4px,
        transparent 8px
      );
    }
  }
}

.racer {
  width: 40px;
  height: 32px;
  border-radius: $radius-sm;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid $border-subtle;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(0);

  &.anim-run {
    animation-name: raceRun;
    animation-fill-mode: forwards;
  }

  &.anim-loop {
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  .racer-core {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: $primary;
    box-shadow: 0 0 10px $primary;

    &.cyan {
      background: $cyan;
      box-shadow: 0 0 12px $cyan;
    }
  }
}

@keyframes raceRun {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(100cqi - 56px));
  }
}

// Fallback for cqi in older CSS
@keyframes raceRun {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(min(580px, calc(100% - 44px)));
  }
}

.morph-sandbox {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  .sandbox-title {
    font-size: 11px;
    font-weight: 600;
    color: $text-muted;
  }

  .hover-target-box {
    width: 240px;
    height: 60px;
    border-radius: $radius-md;
    background: $bg-card;
    border: 1px solid rgba(99, 102, 241, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 600;
    color: #ffffff;
    cursor: pointer;
    user-select: none;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
    transition-property: transform, box-shadow, background-color;

    &:hover {
      transform: translateY(-8px) scale(1.05);
      box-shadow: 0 16px 32px rgba(99, 102, 241, 0.35);
      background-color: rgba(99, 102, 241, 0.15);
      border-color: $cyan;
    }
  }
}

.export-container {
  width: 100%;
}
</style>
