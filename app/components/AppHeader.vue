<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <header class="app-header">
    <div class="container-craft header-inner">
      <!-- Logo -->
      <NuxtLink to="/" class="brand-link">
        <div class="brand-icon">
          <svg viewBox="0 0 64 64" fill="none" class="icon-svg">
            <defs>
              <linearGradient id="logo-g" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#6366f1" />
                <stop offset="50%" stop-color="#8b5cf6" />
                <stop offset="100%" stop-color="#06b6d4" />
              </linearGradient>
            </defs>
            <path d="M18 22C18 19.8 19.8 18 22 18H36C38.2 18 40 19.8 40 22C40 24.2 38.2 26 36 26H22C19.8 26 18 24.2 18 22Z" fill="url(#logo-g)" opacity="0.4"/>
            <path d="M22 32C22 29.8 23.8 28 26 28H44C46.2 28 48 29.8 48 32C48 34.2 46.2 36 44 36H26C23.8 36 22 34.2 22 32Z" fill="url(#logo-g)" opacity="0.75"/>
            <path d="M26 42C26 39.8 27.8 38 30 38H48C50.2 38 52 39.8 52 42C52 44.2 50.2 46 48 46H30C27.8 46 26 44.2 26 42Z" fill="url(#logo-g)"/>
          </svg>
        </div>
        <div class="brand-text">
          <span class="brand-title">CascadeCraft</span>
          <span class="brand-subtitle">CSS Playground</span>
        </div>
      </NuxtLink>

      <!-- Nav Links -->
      <nav class="nav-menu">
        <NuxtLink to="/" class="nav-item">{{ t('nav.dashboard') }}</NuxtLink>
        <NuxtLink to="/box-shadow" class="nav-item">{{ t('nav.boxShadow') }}</NuxtLink>
        <NuxtLink to="/cubic-bezier" class="nav-item">{{ t('nav.cubicBezier') }}</NuxtLink>
        <NuxtLink to="/flexbox" class="nav-item">{{ t('nav.flexbox') }}</NuxtLink>
        <NuxtLink to="/grid" class="nav-item">{{ t('nav.grid') }}</NuxtLink>
        <NuxtLink to="/glassmorphism" class="nav-item">{{ t('nav.glass') }}</NuxtLink>
        <NuxtLink to="/reference" class="nav-item">{{ t('nav.reference') }}</NuxtLink>
      </nav>

      <!-- Right Actions -->
      <div class="header-actions">
        <NuxtLink to="/llms.txt" target="_blank" class="geo-badge-link" :title="t('nav.geo')">
          <span class="geo-indicator" />
          <span>{{ t('nav.geo') }}</span>
        </NuxtLink>

        <LanguageSwitcher />

        <a
          href="https://github.com/z94624/CascadeCraft"
          target="_blank"
          rel="noopener noreferrer"
          class="craft-btn craft-btn-subtle"
          :title="t('nav.github')"
        >
          <svg class="w-4 h-4" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span class="gh-text">{{ t('nav.github') }}</span>
        </a>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba($bg-base, 0.82);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid $border-subtle;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.brand-link {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid $border-subtle;
  border-radius: $radius-md;
  box-shadow: 0 0 16px rgba($primary, 0.25);

  .icon-svg {
    width: 24px;
    height: 24px;
  }
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-title {
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #ffffff 40%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.brand-subtitle {
  font-size: 10px;
  font-weight: 600;
  color: $cyan;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 900px) {
    display: none;
  }
}

.nav-item {
  padding: 6px 12px;
  border-radius: $radius-sm;
  font-size: 13px;
  font-weight: 500;
  color: $text-secondary;
  transition: all $transition-fast;

  &:hover {
    color: $text-primary;
    background: rgba(255, 255, 255, 0.05);
  }

  &.router-link-exact-active {
    color: #ffffff;
    background: rgba(99, 102, 241, 0.15);
    border: 1px solid rgba(99, 102, 241, 0.3);
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.geo-badge-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: $radius-full;
  font-size: 11px;
  font-weight: 600;
  background: rgba(6, 182, 212, 0.12);
  border: 1px solid rgba(6, 182, 212, 0.3);
  color: $cyan;
  transition: all $transition-fast;

  .geo-indicator {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: $cyan;
    box-shadow: 0 0 8px $cyan;
    animation: pulse 2s infinite;
  }

  &:hover {
    background: rgba(6, 182, 212, 0.2);
    box-shadow: 0 0 12px rgba(6, 182, 212, 0.3);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

@media (max-width: 640px) {
  .gh-text {
    display: none;
  }
}
</style>
