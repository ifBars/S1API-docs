<template>
  <div class="feature-card" :class="{ 'is-highlighted': highlight }">
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
  </div>
</template>

<script setup>
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
})
</script>

<style scoped>
.feature-card {
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-radius: 12px;
  background-color: var(--s1-c-bg);
  border: 1px solid var(--s1-c-divider);
  transition: var(--s1-transition-standard);
  height: 100%;
  position: relative;
  isolation: isolate;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
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
  transform: translateY(-6px);
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.05);
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
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.feature-card:hover .icon-glow {
  transform: scale(1.2);
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
  transition: transform 0.3s ease;
}

.feature-card:hover .title {
  transform: translateX(4px);
}

.description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--s1-c-text-2);
  margin: 0 0 24px 0;
  flex-grow: 1;
}

.action {
  margin-top: auto;
  opacity: 0.85;
  transform: translateY(8px);
  transition: opacity 0.3s ease, transform 0.3s ease;
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
  box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);
}

.dark .feature-card::before {
  opacity: 0;
}

.dark .feature-card:hover::before {
  opacity: 0.06;
}

.dark .feature-card.is-highlighted {
  background-color: rgba(58, 134, 255, 0.06);
}

.dark .feature-card.is-highlighted::before {
  opacity: 0.08;
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