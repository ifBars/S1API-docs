<template>
  <div class="custom-layout" :class="{ 'is-home': isHomePage }">
    <div class="theme" :class="isDark ? 'dark' : 'light'">
      <slot name="layout-top" />
      <div class="nav-container">
        <div v-if="!isHomePage" class="nav-bg"></div>
        <slot name="nav" />
      </div>
      <main class="main">
        <HomePage v-if="isHomePage" class="custom-home" />
        <template v-else>
          <div class="container">
            <slot name="doc-top" />
            <div class="doc-wrap">
              <div class="sidebar-container">
                <slot name="sidebar" />
              </div>
              <div class="content-container">
                <div class="content">
                  <slot name="doc-before" />
                  <slot name="doc" />
                  <slot name="doc-after" />
                  <slot name="doc-footer" />
                </div>
                <div class="aside-container">
                  <slot name="aside" />
                </div>
              </div>
            </div>
            <slot name="doc-bottom" />
          </div>
          <CustomFooter />
        </template>
      </main>
      <slot name="layout-bottom" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useData, useRoute } from 'vitepress'
import HomePage from './HomePage.vue'
import CustomFooter from './CustomFooter.vue'

const { isDark, page } = useData()
const route = useRoute()

// Check if we're on the home page
// This checks both the relative path (for local dev) and route path (for production)
const isHomePage = computed(() => {
  return page.value.relativePath === 'index.md' || route.path === '/' || route.path === '/index.html'
})

// In case there's any remaining default VitePress home content, hide it
onMounted(() => {
  if (isHomePage.value && typeof document !== 'undefined') {
    // Hide any default VitePress home elements
    const defaultHomeElements = document.querySelectorAll('.VPHome, .VPHero, .VPFeatures');
    defaultHomeElements.forEach(el => {
      if (el.parentNode && !el.classList.contains('custom-home')) {
        el.style.display = 'none';
        el.style.opacity = '0';
        el.style.visibility = 'hidden';
      }
    });
  }
})
</script>

<style scoped>
.custom-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.theme {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.nav-container {
  position: sticky;
  top: 0;
  z-index: 20;
  width: 100%;
}

.nav-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.05);
  z-index: -1;
}

.dark .nav-bg {
  background-color: rgba(15, 23, 42, 0.8);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.05);
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 10;
  width: 100%;
}

.is-home .main {
  padding-top: 0;
}

/* Ensure our custom home page gets full width */
.custom-home {
  width: 100%;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}

.doc-wrap {
  display: flex;
  padding-top: 48px;
  padding-bottom: 64px;
  width: 100%;
}

.sidebar-container {
  width: 260px;
  flex-shrink: 0;
  position: sticky;
  top: 64px;
  height: calc(100vh - 64px);
  overflow-y: auto;
  padding-right: 24px;
  padding-top: 16px;
}

.content-container {
  flex: 1;
  display: flex;
  min-width: 0;
}

.content {
  flex: 1;
  min-width: 0;
  max-width: 100%;
}

.aside-container {
  width: 240px;
  flex-shrink: 0;
  position: sticky;
  top: 64px;
  height: calc(100vh - 64px);
  overflow-y: auto;
  padding-left: 12px;
  padding-bottom: 24px;
}

@media (max-width: 960px) {
  .sidebar-container {
    display: none;
  }
  
  .aside-container {
    display: none;
  }
  
  .doc-wrap {
    padding-top: 16px;
    padding-bottom: 24px;
  }
}

@media (min-width: 961px) and (max-width: 1280px) {
  .aside-container {
    display: none;
  }
}
</style> 