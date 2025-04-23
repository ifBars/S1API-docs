<template>
  <div class="feature-card" :class="{ 'is-highlighted': highlight }" v-scroll-reveal>
    <div class="icon-wrapper">
      <div class="icon" :style="{ backgroundColor: iconBg }">
        <slot name="icon"></slot>
      </div>
      <div class="icon-glow" :style="{ backgroundColor: iconBg }"></div>
    </div>
    <div class="content">
      <h3 class="title">{{ title }}</h3>
      <p class="description">{{ description }}</p>
      <div class="action" v-if="$slots.action">
        <slot name="action"></slot>
      </div>
    </div>
    <div class="card-bg"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  iconBg: {
    type: String,
    default: 'rgba(58, 134, 255, 0.1)'
  },
  highlight: {
    type: Boolean,
    default: false
  }
});

const vScrollReveal = {
  mounted(el) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(el);
  }
};

onMounted(() => {
  if (typeof document !== 'undefined') {
    // Add mouse movement effect to cards
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        const glowEl = card.querySelector('.icon-glow');
        if (glowEl) {
          const percentX = (x / rect.width) * 100;
          const percentY = (y / rect.height) * 100;
          glowEl.style.transform = `translate(${(percentX - 50) * 0.5}px, ${(percentY - 50) * 0.5}px) scale(1.2)`;
        }
        
        const bgEl = card.querySelector('.card-bg');
        if (bgEl) {
          bgEl.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(58, 134, 255, 0.1) 0%, transparent 50%)`;
        }
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        
        const glowEl = card.querySelector('.icon-glow');
        if (glowEl) {
          glowEl.style.transform = '';
        }
        
        const bgEl = card.querySelector('.card-bg');
        if (bgEl) {
          bgEl.style.background = '';
        }
      });
    });
  }
});
</script>

<style scoped>
.feature-card {
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-radius: 12px;
  background-color: var(--s1-c-bg);
  border: 1px solid var(--s1-c-divider);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  height: 100%;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
  opacity: 0;
  transform: translateY(30px);
  will-change: transform, opacity, box-shadow;
}

.feature-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.card-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover .card-bg {
  opacity: 1;
}

.feature-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    var(--s1-c-primary) 0%,
    var(--s1-c-secondary) 100%
  );
  opacity: 0;
  z-index: -1;
  transition: opacity 0.5s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.1);
  border-color: transparent;
}

.feature-card:hover::before {
  opacity: 0.03;
}

.feature-card.is-highlighted {
  border-color: transparent;
  background-color: rgba(58, 134, 255, 0.03);
  box-shadow: 0 12px 24px rgba(58, 134, 255, 0.08);
}

.feature-card.is-highlighted::before {
  opacity: 0.04;
}

.icon-wrapper {
  position: relative;
  margin-bottom: 24px;
  width: fit-content;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.icon-glow {
  position: absolute;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  top: 0;
  left: 0;
  filter: blur(12px);
  opacity: 0.4;
  z-index: 1;
  transform: scale(0.8);
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.6s ease;
}

.feature-card:hover .icon {
  transform: scale(1.1);
}

.feature-card:hover .icon-glow {
  transform: scale(1.4);
  opacity: 0.6;
}

.content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.title {
  font-size: 1.375rem;
  font-weight: 600;
  margin: 0 0 16px 0;
  color: var(--s1-c-text-1);
  position: relative;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.title::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--s1-c-primary), var(--s1-c-secondary));
  transition: width 0.4s ease-out;
  opacity: 0;
}

.feature-card:hover .title {
  transform: translateX(4px);
}

.feature-card:hover .title::after {
  width: 40px;
  opacity: 1;
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--s1-c-text-2);
  margin: 0 0 24px 0;
  flex-grow: 1;
  transition: transform 0.3s ease, color 0.3s ease;
}

.feature-card:hover .description {
  color: var(--s1-c-text-1);
}

.action {
  margin-top: auto;
  opacity: 0.85;
  transform: translateY(8px);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.feature-card:hover .action {
  opacity: 1;
  transform: translateY(0);
}

.dark .feature-card {
  background-color: rgba(255, 255, 255, 0.02);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
}

.dark .feature-card:hover {
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
}

.dark .feature-card::before {
  opacity: 0;
}

.dark .feature-card:hover::before {
  opacity: 0.08;
}

.dark .feature-card.is-highlighted {
  background-color: rgba(58, 134, 255, 0.06);
}

.dark .feature-card.is-highlighted::before {
  opacity: 0.08;
}

/* Animation for the cards appearing */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 640px) {
  .feature-card {
    padding: 24px;
  }
  
  .title {
    font-size: 1.25rem;
  }
  
  .icon {
    width: 48px;
    height: 48px;
  }
  
  .icon-glow {
    width: 48px;
    height: 48px;
  }
}
</style> 