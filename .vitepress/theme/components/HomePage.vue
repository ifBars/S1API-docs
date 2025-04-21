<template>
  <div class="s1-home-page custom-home">
    <div class="home-content">
      <HomeHero />
      <HomeFeatures />
      <section class="cta-section">
        <div class="container">
          <h2 class="cta-title">Ready to build with S1API?</h2>
          <p class="cta-text">Get started with our comprehensive guide and documentation</p>
          <div class="cta-actions">
            <a class="cta-button" href="/guide/">Get Started</a>
            <a class="cta-link" href="https://github.com/KaBooMa/S1API" target="_blank" rel="noopener">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import HomeHero from './HomeHero.vue'
import HomeFeatures from './HomeFeatures.vue'
</script>

<style>
.s1-home-page {
  width: 100%;
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
}

.home-content {
  width: 100%;
  padding-top: 80px; /* Increased padding to ensure content is below navbar */
  margin-top: 0;
  position: relative;
  z-index: 1;
}

.VPNavBar.has-sidebar .content-body {
  background: transparent !important;
}

.cta-section {
  padding: 80px 24px;
  background-color: var(--s1-c-bg-alt);
  text-align: center;
  width: 100%;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  background: linear-gradient(90deg, var(--s1-c-primary) 0%, var(--s1-c-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  line-height: 1.2;
}

.cta-text {
  font-size: 1.25rem;
  color: var(--s1-c-text-2);
  margin-bottom: 32px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  background: var(--s1-c-primary);
  color: white;
  border-radius: var(--s1-border-radius);
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: var(--s1-transition-standard);
  box-shadow: 0 4px 12px rgba(58, 134, 255, 0.3);
  cursor: pointer;
}

.cta-button:hover {
  background: var(--s1-c-primary-light);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(58, 134, 255, 0.4);
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  color: var(--s1-c-text-2);
  font-weight: 500;
  text-decoration: none;
  transition: var(--s1-transition-standard);
  cursor: pointer;
}

.cta-link:hover {
  color: var(--s1-c-primary);
  transform: translateY(-2px);
}

.cta-link .icon {
  transition: var(--s1-transition-standard);
}

.cta-link:hover .icon {
  transform: scale(1.1);
}

@media (max-width: 640px) {
  .cta-title {
    font-size: 2rem;
  }
  
  .cta-text {
    font-size: 1.1rem;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
  
  .cta-section {
    padding: 48px 24px;
  }
  
  .home-content {
    padding-top: 64px; /* Slightly less padding on mobile */
  }
}
</style> 