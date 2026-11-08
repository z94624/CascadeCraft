<template>
  <div class="craft-layout">
    <div class="ambient-bg" />
    <AppHeader />
    <main class="main-content">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped lang="scss">
@use '~/assets/scss/variables' as *;

.craft-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: $bg-base;
}

.main-content {
  flex: 1;
  position: relative;
  z-index: 1;
  padding: 32px 0 60px;
}
</style>
