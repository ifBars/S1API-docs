<template>
  <section class="s1-home-hero">
    <div class="container">
      <div class="hero-content">
        <div class="badge">
          <span>Documentation</span>
        </div>
        <h1 class="hero-title">
          <span class="title-gradient">S1API</span>
        </h1>
        <p class="hero-description">
          A powerful Schedule One Mono / Il2Cpp Cross Compatibility Layer for seamless game development
        </p>
        <div class="hero-actions">
          <a class="hero-button primary" href="/guide/">
            <span>Get Started</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
          <a class="hero-button secondary" href="/api/">
            <span>API Reference</span>
          </a>
        </div>
        <div class="stats">
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
      <div class="hero-image">
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
    
    [<span class="token class-name">SaveableField</span>(<span class="token string">"Intro"</span>)]
    <span class="token keyword">private bool</span> _hasIntroduced = <span class="token keyword">false</span>;

    <span class="token keyword">protected override void</span> <span class="token function">OnInitialized</span>()
    {
        <span class="token class-name">TimeManager</span>.OnDayPass += <span class="token function">OnDayPass</span>;
    }

    <span class="token keyword">private void</span> <span class="token function">OnDayPass</span>()
    {
        <span class="token keyword">if</span> (!_hasIntroduced)
        {
            <span class="token function">SendTextMessage</span>(<span class="token string">"Hello, I'm John!"</span>);
            _hasIntroduced = <span class="token keyword">true</span>;
        }
    }
}</code></pre>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gradient"></div>
    <div class="scroll-indicator">
      <div class="mouse">
        <div class="wheel"></div>
      </div>
      <div class="arrow">
        <span></span>
        <span></span>
        <span></span>
      </div>
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
}

.hero-title {
  font-size: 5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.title-gradient {
  background: linear-gradient(120deg, var(--s1-c-primary) 30%, var(--s1-c-secondary) 70%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
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
  transition: var(--s1-transition-standard);
  font-size: 1rem;
  text-decoration: none;
  position: relative;
  z-index: 10;
  cursor: pointer;
}

.hero-button.primary {
  background: var(--s1-c-primary);
  color: white;
  box-shadow: 0 4px 12px rgba(58, 134, 255, 0.3);
}

.hero-button.primary:hover {
  background: var(--s1-c-primary-light);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(58, 134, 255, 0.4);
}

.hero-button.primary svg {
  transition: transform 0.2s ease;
}

.hero-button.primary:hover svg {
  transform: translateX(4px);
}

.hero-button.secondary {
  background: var(--s1-c-bg-alt);
  color: var(--s1-c-text-1);
  border: 1px solid var(--s1-c-divider);
}

.hero-button.secondary:hover {
  background: var(--s1-c-bg);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-color: var(--s1-c-primary);
  color: var(--s1-c-primary);
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
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--s1-c-text-1);
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
  transform: translateY(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  z-index: 10;
  margin-left: 60px;
}

.code-preview:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
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

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(10deg);
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