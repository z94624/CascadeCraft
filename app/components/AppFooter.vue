<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="app-footer">
    <div class="container-craft footer-inner">
      <div class="footer-left">
        <div class="brand">CascadeCraft</div>
        <p class="tagline">
          Zero-learning-curve CSS Visual Engine & Interactive Reference.
        </p>
        <span class="copyright">
          © {{ currentYear }} CascadeCraft. All open-source CSS generation models & tools.
        </span>
      </div>

      <div class="footer-links">
        <div class="link-group">
          <span class="group-title">工具矩陣</span>
          <NuxtLink to="/box-shadow">Box Shadow</NuxtLink>
          <NuxtLink to="/cubic-bezier">Cubic Bezier</NuxtLink>
          <NuxtLink to="/flexbox">Flexbox 模擬器</NuxtLink>
          <NuxtLink to="/grid">Grid 產生器</NuxtLink>
          <NuxtLink to="/glassmorphism">Glassmorphism</NuxtLink>
        </div>

        <div class="link-group">
          <span class="group-title">規範與 GEO</span>
          <NuxtLink to="/reference">MDN CSS 屬性字典</NuxtLink>
          <NuxtLink to="/llms.txt" target="_blank">llms.txt (LLM 結構)</NuxtLink>
          <NuxtLink to="/llms-full.txt" target="_blank">llms-full.txt (完整索引)</NuxtLink>
          <NuxtLink to="/sitemap.xml" target="_blank">sitemap.xml</NuxtLink>
          <NuxtLink to="/robots.txt" target="_blank">robots.txt</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.app-footer {
  margin-top: 80px;
  border-top: 1px solid $border-subtle;
  background: rgba(10, 11, 16, 0.9);
  padding: 48px 0 32px;
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.footer-left {
  max-width: 380px;

  .brand {
    font-size: 16px;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 8px;
  }

  .tagline {
    font-size: 13px;
    color: $text-secondary;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .copyright {
    display: block;
    font-size: 11px;
    color: $text-muted;
  }
}

.footer-links {
  display: flex;
  gap: 60px;

  @media (max-width: 640px) {
    gap: 32px;
  }
}

.link-group {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .group-title {
    font-size: 12px;
    font-weight: 700;
    color: $text-primary;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 4px;
  }

  a {
    font-size: 13px;
    color: $text-muted;
    transition: color $transition-fast;

    &:hover {
      color: $cyan;
    }
  }
}
</style>
