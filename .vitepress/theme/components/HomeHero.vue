<template>
  <section class="s1-home-hero">
    <div class="container">
      <div class="hero-content">
        <div class="badge animate-item" style="--delay: 0.1s">
          <span>Documentation</span>
        </div>
        <h1 class="hero-title animate-item" style="--delay: 0.2s">
          <span class="title-gradient">S1API</span>
        </h1>
        <p class="hero-description animate-item" style="--delay: 0.3s">
          A powerful Schedule One Mono / Il2Cpp Cross Compatibility Layer for seamless game development
        </p>
        <div class="hero-actions animate-item" style="--delay: 0.4s">
          <a class="hero-button primary" href="/S1API-docs/guide/">
            <span>Get Started</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
          <a class="hero-button secondary" href="/S1API-docs/api/">
            <span>API Reference</span>
          </a>
        </div>
        <div class="stats animate-item" style="--delay: 0.5s">
          <div class="stat">
            <span class="stat-value">Cross</span>
            <span class="stat-label">Compatibility</span>
          </div>
          <div class="stat">
            <span class="stat-value">Open</span>
            <span class="stat-label">Source</span>
          </div>
          <div class="stat">
            <span class="stat-value">Simple</span>
            <span class="stat-label">Integration</span>
          </div>
        </div>
      </div>
      <div class="hero-image animate-item" style="--delay: 0.3s">
        <div class="code-preview">
          <div class="code-header">
            <span class="code-title">JohnDoe.cs</span>
            <div class="code-buttons">
              <div class="code-button"></div>
              <div class="code-button"></div>
              <div class="code-button"></div>
            </div>
          </div>
          <div class="code-content">
            <pre class="shiki-code"><code class="language-csharp"><span class="token keyword">public class</span> <span class="token class-name">JohnDoe</span> : <span class="token class-name">NPC</span>
{
    <span class="token keyword">protected override string</span> FirstName => <span class="token string">"John"</span>;
    <span class="token keyword">protected override string</span> LastName => <span class="token string">"Doe"</span>;
    <span class="token keyword">private bool</span> _hasIntroduced = <span class="token keyword">false</span>;

    <span class="token keyword">public</span> <span class="token function">JohnDoe</span>() : <span class="token keyword">base</span>(<span class="token string">"johndoe"</span>, <span class="token string">"John"</span>, <span class="token string">"Doe"</span>)
    {
    }

    <span class="token keyword">protected override void</span> <span class="token function">OnInitialized</span>()
    {
        TimeManager.OnDayPass += <span class="token function">OnDayPass</span>;
    }

    <span class="token keyword">private void</span> <span class="token function">OnDayPass</span>()
    {
        <span class="token keyword">if</span> (!_hasIntroduced)
        {
            <span class="token function">SendTextMessage</span>(<span class="token string">"Hello, I'm John! Nice to meet you."</span>);
            _hasIntroduced = <span class="token keyword">true</span>;
        }
    }
}</code></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gradient"></div>
    <div class="scroll-indicator animate-item" style="--delay: 1s">
      <div class="mouse">
        <div class="wheel"></div>
      </div>
      <div class="arrow">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div class="particles-container">
      <div class="particle" v-for="n in 15" :key="n"></div>
    </div>
  </section>
</template>

<style scoped>
.s1-home-hero {
  position: relative;
  padding: 40px 24px 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  min-height: calc(80vh - 64px);
  z-index: 1;
}

.container {
  position: relative;
  z-index: 5;
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  width: 100%;
}

.hero-content {
  text-align: left;
  position: relative;
  z-index: 2;
}

/* Staggered Animation For Hero Elements */
.animate-item {
  opacity: 0;
  transform: translateY(30px);
  animation: fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--delay, 0s);
}

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

.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  background: rgba(58, 134, 255, 0.12);
  color: var(--s1-c-primary);
  border-radius: 20px;
  margin-bottom: 24px;
  font-size: 0.875rem;
  font-weight: 600;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(58, 134, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.badge::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(30deg);
  animation: shimmer 3s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) rotate(30deg);
  }
  100% {
    transform: translateX(100%) rotate(30deg);
  }
}

.hero-title {
  font-size: 5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
  position: relative;
}

.title-gradient {
  background: linear-gradient(120deg, var(--s1-c-primary) 30%, var(--s1-c-secondary) 70%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  background-size: 200% 100%;
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

.hero-description {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: var(--s1-c-text-2);
  max-width: 600px;
  line-height: 1.5;
}

.hero-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 2rem;
  position: relative;
  z-index: 20;
}

.hero-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.75rem 1.5rem;
  border-radius: var(--s1-border-radius);
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-size: 1rem;
  text-decoration: none;
  position: relative;
  z-index: 10;
  cursor: pointer;
  overflow: hidden;
}

.hero-button.primary {
  background: var(--s1-c-primary);
  color: white;
  box-shadow: 0 4px 12px rgba(58, 134, 255, 0.3);
}

.hero-button.primary::before {
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

.hero-button.primary:hover {
  background: var(--s1-c-primary-light);
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 15px 25px rgba(58, 134, 255, 0.4);
}

.hero-button.primary:hover::before {
  transform: translateX(100%);
}

.hero-button.primary svg {
  transition: transform 0.3s ease;
}

.hero-button.primary:hover svg {
  transform: translateX(6px);
}

.hero-button.secondary {
  background: var(--s1-c-bg-alt);
  color: var(--s1-c-text-1);
  border: 1px solid var(--s1-c-divider);
  position: relative;
  overflow: hidden;
}

.hero-button.secondary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(58, 134, 255, 0.05);
  transform: translateX(-100%);
  transition: transform 0.4s ease;
}

.hero-button.secondary:hover {
  background: var(--s1-c-bg);
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  border-color: var(--s1-c-primary);
  color: var(--s1-c-primary);
}

.hero-button.secondary:hover::before {
  transform: translateX(0);
}

.stats {
  display: flex;
  gap: 32px;
  position: relative;
  z-index: 10;
}

.stat {
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.stat:hover {
  transform: translateY(-5px);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--s1-c-text-1);
  position: relative;
}

.stat-value::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--s1-c-primary), var(--s1-c-secondary));
  transition: width 0.3s ease;
}

.stat:hover .stat-value::after {
  width: 100%;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--s1-c-text-3);
}

.hero-image {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  height: 100%;
}

.code-preview {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--s1-c-bg-alt);
  border: 1px solid var(--s1-c-divider);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.07);
  transform: translateY(0) rotate(0deg);
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.5s ease;
  z-index: 10;
  margin-left: 60px;
  /* animation: float 6s ease-in-out infinite; */
}

/* Removed float animation */
/* @keyframes float {
  0% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(1deg);
  }
  100% {
    transform: translateY(0px) rotate(0deg);
  }
} */

.code-preview:hover {
  transform: translateY(-5px) scale(1.02) rotate(0deg);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 8px;
  background-color: rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid var(--s1-c-divider);
}

.code-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--s1-c-text-2);
}

.code-buttons {
  display: flex;
  gap: 8px;
}

.code-button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--s1-c-gray-400);
  transition: transform 0.2s ease;
}

.code-preview:hover .code-button {
  transform: scale(1.1);
}

.code-button:nth-child(1) {
  background-color: #ff5f56;
}

.code-button:nth-child(2) {
  background-color: #ffbd2e;
}

.code-button:nth-child(3) {
  background-color: #27c93f;
}

.code-content {
  padding: 12px;
  margin: 0;
  text-align: left;
  font-family: var(--s1-font-family-mono);
  font-size: 0.8rem;
  line-height: 1;
  color: var(--s1-c-text-1);
  background-color: transparent;
  overflow-x: auto;
}

.code-content code {
  font-family: inherit;
}

.bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, transparent 0%, var(--s1-c-bg) 70%);
  z-index: 0;
  animation: pulse-bg 8s ease-in-out infinite alternate;
}

@keyframes pulse-bg {
  0% {
    opacity: 0.8;
    background-position: 0% 50%;
  }
  100% {
    opacity: 1;
    background-position: 100% 50%;
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  opacity: 0.6;
  transition: opacity 0.3s ease;
  z-index: 2;
}

.scroll-indicator:hover {
  opacity: 1;
}

.mouse {
  width: 26px;
  height: 40px;
  border: 2px solid var(--s1-c-text-3);
  border-radius: 20px;
  position: relative;
}

.wheel {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--s1-c-text-3);
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll 2s ease infinite;
}

.arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.arrow span {
  display: block;
  width: 10px;
  height: 10px;
  border-bottom: 2px solid var(--s1-c-text-3);
  border-right: 2px solid var(--s1-c-text-3);
  transform: rotate(45deg);
  animation: arrow 2s infinite;
  opacity: 0;
}

.arrow span:nth-child(1) {
  animation-delay: 0s;
}

.arrow span:nth-child(2) {
  animation-delay: 0.15s;
}

.arrow span:nth-child(3) {
  animation-delay: 0.3s;
}

/* Particles animation */
.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: linear-gradient(90deg, var(--s1-c-primary), var(--s1-c-secondary));
  border-radius: 50%;
  opacity: 0.3;
  animation-name: particle-animation;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: calc(30s + (var(--n, 0) * 10s));
  animation-delay: calc(var(--n, 0) * -5s);
  top: calc(var(--y, 50) * 1%);
  left: calc(var(--x, 50) * 1%);
}

.particle:nth-child(1) { --x: 20; --y: 30; --n: 0.1; }
.particle:nth-child(2) { --x: 80; --y: 10; --n: 0.2; }
.particle:nth-child(3) { --x: 40; --y: 70; --n: 0.3; }
.particle:nth-child(4) { --x: 60; --y: 50; --n: 0.4; }
.particle:nth-child(5) { --x: 10; --y: 90; --n: 0.5; }
.particle:nth-child(6) { --x: 90; --y: 20; --n: 0.6; }
.particle:nth-child(7) { --x: 30; --y: 40; --n: 0.7; }
.particle:nth-child(8) { --x: 70; --y: 60; --n: 0.8; }
.particle:nth-child(9) { --x: 50; --y: 80; --n: 0.9; }
.particle:nth-child(10) { --x: 15; --y: 60; --n: 1; }
.particle:nth-child(11) { --x: 85; --y: 40; --n: 1.1; }
.particle:nth-child(12) { --x: 25; --y: 20; --n: 1.2; }
.particle:nth-child(13) { --x: 75; --y: 80; --n: 1.3; }
.particle:nth-child(14) { --x: 35; --y: 10; --n: 1.4; }
.particle:nth-child(15) { --x: 65; --y: 90; --n: 1.5; }

@keyframes particle-animation {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  25% {
    opacity: 0.6;
    transform: translate(calc(var(--n, 0) * 100px), calc(var(--n, 0) * -50px)) scale(1.2);
  }
  50% {
    transform: translate(calc(var(--n, 0) * 150px), calc(var(--n, 0) * 50px)) scale(1);
    opacity: 0.3;
  }
  75% {
    opacity: 0.6;
    transform: translate(calc(var(--n, 0) * 50px), calc(var(--n, 0) * 100px)) scale(1.2);
  }
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
}

@keyframes pulse {
  0% {
    opacity: 0.5;
    transform: translate(-50%, -50%) scale(0.95);
  }
  100% {
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1.05);
  }
}

@keyframes scroll {
  0% {
    opacity: 1;
    top: 8px;
  }
  100% {
    opacity: 0;
    top: 24px;
  }
}

@keyframes arrow {
  0% {
    opacity: 0;
    transform: rotate(45deg) translate(-5px, -5px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(5px, 5px);
  }
}

@media (max-width: 960px) {
  .container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-content {
    text-align: center;
    order: 1;
  }
  
  .hero-image {
    order: 0;
    margin-bottom: 24px;
  }
  
  .hero-actions {
    justify-content: center;
  }
  
  .stats {
    justify-content: center;
  }
  
  .hero-title {
    font-size: 3.5rem;
  }
  
  .hero-description {
    font-size: 1.25rem;
    margin-left: auto;
    margin-right: auto;
  }
  
  .code-preview {
    margin-left: 0;
  }
}

@media (max-width: 640px) {
  .s1-home-hero {
    padding: 30px 16px 60px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .stats {
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
}

.dark .code-preview {
  background-color: rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.1);
}

.dark .code-header {
  background-color: rgba(0, 0, 0, 0.3);
  border-color: rgba(255, 255, 255, 0.1);
  }

/* Code syntax highlighting */
.shiki-code {
  background-color: transparent !important;
  margin: 0;
  padding: 0;
  font-family: var(--s1-font-family-mono);
  font-size: 0.875rem;
  line-height: 1.5;
}

.token.keyword {
  color: #569cd6;
}

.token.namespace {
  color: #4ec9b0;
}

.token.class-name {
  color: #4ec9b0;
}

.token.function {
  color: #dcdcaa;
}

.token.number {
  color: #b5cea8;
}

.token.string {
  color: #ce9178;
}

.token.comment {
  color: #6a9955;
}

.language-csharp {
  color: #d4d4d4;
}

.dark .language-csharp {
  color: #d4d4d4;
}

.dark .token.keyword {
  color: #569cd6;
}

.dark .token.namespace,
.dark .token.class-name {
  color: #4ec9b0;
}

.dark .token.function {
  color: #dcdcaa;
}

.dark .token.number {
  color: #b5cea8;
}

.dark .token.string {
  color: #ce9178;
}

.dark .token.comment {
  color: #6a9955;
}
</style> 