<template>
  <div class="s1-home-page custom-home">
    <div class="home-content">
      <HomeHero />
      <HomeFeatures />
      <section class="cta-section">
        <div class="container">
          <h2 class="cta-title" v-scroll-reveal="{ delay: 100 }">Ready to build with S1API?</h2>
          <p class="cta-text" v-scroll-reveal="{ delay: 200 }">Get started with our comprehensive guide and documentation</p>
          <div class="cta-actions" v-scroll-reveal="{ delay: 300 }">
            <a class="cta-button" href="/S1API-docs/guide/">Get Started</a>
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
import { onMounted } from 'vue'
import HomeHero from './HomeHero.vue'
import HomeFeatures from './HomeFeatures.vue'

// Scroll reveal directive
const vScrollReveal = {
  mounted(el, binding) {
    const options = binding.value || {}
    const defaultOptions = {
      delay: 0,
      duration: 800,
      distance: '40px',
      easing: 'cubic-bezier(0.5, 0, 0, 1)',
      origin: 'bottom',
      opacity: 0,
      reset: false
    }
    
    const mergedOptions = { ...defaultOptions, ...options }
    const delay = mergedOptions.delay
    
    el.style.visibility = 'hidden'
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.visibility = 'visible'
            el.style.transition = `opacity ${mergedOptions.duration}ms ${mergedOptions.easing}, transform ${mergedOptions.duration}ms ${mergedOptions.easing}`
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
            
            if (!mergedOptions.reset) {
              observer.unobserve(el)
            }
          }, delay)
        } else if (mergedOptions.reset) {
          el.style.opacity = '0'
          el.style.transform = `translateY(${mergedOptions.distance})`
        }
      })
    }, { threshold: 0.1 })
    
    observer.observe(el)
    
    // Initial state
    el.style.opacity = '0'
    el.style.transform = `translateY(${mergedOptions.distance})`
  }
}

onMounted(() => {
  document.body.classList.add('animate-ready')
})
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
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: -50px;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, transparent, var(--s1-c-bg-alt));
  z-index: 0;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
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
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 12px rgba(58, 134, 255, 0.3);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0) 100%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.cta-button:hover {
  background: var(--s1-c-primary-light);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 10px 20px rgba(58, 134, 255, 0.4);
}

.cta-button:hover::before {
  transform: translateX(100%);
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  color: var(--s1-c-text-2);
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.cta-link::after {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 24px;
  right: 24px;
  height: 1px;
  background-color: var(--s1-c-primary);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s cubic-bezier(0.86, 0, 0.07, 1);
}

.cta-link:hover {
  color: var(--s1-c-primary);
  transform: translateY(-2px);
}

.cta-link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.cta-link .icon {
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.cta-link:hover .icon {
  transform: scale(1.2) rotate(5deg);
}

/* Animation classes for page load */
.animate-ready .s1-home-page {
  animation: pageLoad 0.6s ease-out forwards;
}

@keyframes pageLoad {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
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