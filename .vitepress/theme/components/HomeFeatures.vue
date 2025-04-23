<template>
  <section class="home-features">
    <div class="container">
      <div class="section-heading" v-scroll-reveal>
        <h2 class="section-title">Key Features</h2>
        <p class="section-description">
          S1API provides a robust cross-compatibility layer between Mono and Il2Cpp with powerful capabilities
        </p>
      </div>
      
      <div class="features-grid">
        <!-- Row 1, Column 1 -->
        <div class="feature-item" v-scroll-reveal="{ delay: 100 }">
          <a href="/S1API-docs/api/" class="feature-card-link">
            <FeatureCard 
              title="Simplified API" 
              description="Use a clean, consistent API that abstracts away the differences between backend implementations."
              iconBg="rgba(131, 56, 236, 0.1)"
            >
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              </template>
            </FeatureCard>
          </a>
        </div>
        
        <!-- Row 1, Column 2 -->
        <div class="feature-item" v-scroll-reveal="{ delay: 200 }">
          <a href="/S1API-docs/guide/cross-compatibility.html" class="feature-card-link">
            <FeatureCard 
              title="Cross-Platform Compatibility" 
              description="Seamlessly run your code on both Mono and Il2Cpp backends without any modifications."
              iconBg="rgba(58, 134, 255, 0.1)"
            >
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </template>
            </FeatureCard>
          </a>
        </div>
        
        <!-- Row 2, Column 1 -->
        <div class="feature-item" v-scroll-reveal="{ delay: 300 }">
          <a href="/S1API-docs/api/save-system/" class="feature-card-link">
            <FeatureCard 
              title="Data Persistence" 
              description="Easy-to-use abstraction for save/load of class data regardless of backend implementation."
              iconBg="rgba(255, 152, 0, 0.1)"
            >
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
              </template>
            </FeatureCard>
          </a>
        </div>
        
        <!-- Row 2, Column 2 -->
        <div class="feature-item" v-scroll-reveal="{ delay: 400 }">
          <a href="/S1API-docs/api/dead-drops/" class="feature-card-link">
            <FeatureCard 
              title="Game Element Access" 
              description="Easily access and manipulate game objects, components, and resources regardless of the backend."
              iconBg="rgba(72, 187, 120, 0.1)"
            >
              <template #icon>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </template>
            </FeatureCard>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import FeatureCard from './FeatureCard.vue'
import { onMounted } from 'vue'

// Scroll reveal directive
const vScrollReveal = {
  mounted(el, binding) {
    const options = binding.value || {}
    const delay = options.delay || 0
    
    el.style.opacity = '0'
    el.style.transform = 'translateY(40px)'
    el.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
          }, delay)
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.1 })
    
    observer.observe(el)
  }
}

onMounted(() => {
  // Initialize any additional JS behaviors if needed
})
</script>

<style scoped>
.home-features {
  padding: 120px 24px;
  background-color: var(--s1-c-bg);
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  z-index: 5;
}

.section-heading {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 80px;
  position: relative;
}

.section-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(90deg, var(--s1-c-primary) 0%, var(--s1-c-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  position: relative;
  display: inline-block;
  line-height: 1.2;
  background-size: 200% auto;
  animation: gradient-shift 8s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--s1-c-primary) 0%, var(--s1-c-secondary) 100%);
  border-radius: 2px;
  animation: line-expand 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  animation-delay: 0.5s;
}

@keyframes line-expand {
  0% {
    width: 0;
    opacity: 0;
  }
  100% {
    width: 80px;
    opacity: 1;
  }
}

.section-description {
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto;
  color: var(--s1-c-text-2);
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-rows: repeat(2, auto);
  gap: 80px;
  margin-bottom: 80px;
  max-width: 1080px;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  position: relative;
}

.feature-item {
  height: 100%;
  padding: 10px;
  transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  will-change: transform;
}

.feature-card-link {
  display: block;
  height: 100%;
  text-decoration: none;
  color: inherit;
  transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.feature-card-link:hover {
  transform: translateY(-5px);
}

svg.icon {
  color: var(--s1-c-primary);
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 40px;
  }
  
  .home-features {
    padding: 80px 24px;
  }
  
  .section-title {
    font-size: 2.5rem;
  }
  
  .section-heading {
    margin-bottom: 60px;
  }
  
  .section-description {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 2rem;
  }
  
  .home-features {
    padding: 60px 20px;
  }
  
  .section-heading {
    margin-bottom: 40px;
  }
}
</style> 