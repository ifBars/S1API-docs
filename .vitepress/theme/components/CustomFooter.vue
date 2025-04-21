<template>
  <footer class="s1-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <p class="footer-tagline">A Schedule One Mono / Il2Cpp Cross Compatibility Layer</p>
        </div>
        <div class="footer-links">
          <div class="footer-section">
            <h3 class="footer-heading">Documentation</h3>
            <ul class="footer-list">
              <li><a href="/guide/">Guide</a></li>
              <li><a href="/api/">API Reference</a></li>
              <li><a href="/contributing/">Contributing</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3 class="footer-heading">Community</h3>
            <ul class="footer-list">
              <li><a href="https://github.com/KaBooMa/S1API" target="_blank" rel="noopener">GitHub</a></li>
              <li><a href="#" target="_blank" rel="noopener">Discord</a></li>
              <li><a href="#" target="_blank" rel="noopener">Twitter</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h3 class="footer-heading">Resources</h3>
            <ul class="footer-list">
              <li><a href="#">Releases</a></li>
              <li><a href="#">Roadmap</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>Released under the MIT License</p>
          <p>Copyright © {{ new Date().getFullYear() }} S1API Contributors</p>
        </div>
        <div class="footer-social">
          <a href="https://github.com/KaBooMa/S1API" target="_blank" rel="noopener" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.s1-footer {
  padding: 64px 24px 32px;
  background-color: var(--s1-c-bg-alt);
  border-top: 1px solid var(--s1-c-divider);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
  margin-bottom: 48px;
}

.footer-logo {
  flex: 1;
  min-width: 240px;
}

.footer-tagline {
  margin-top: 16px;
  color: var(--s1-c-text-2);
  font-size: 0.9rem;
  max-width: 300px;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 48px;
}

.footer-section {
  min-width: 160px;
}

.footer-heading {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--s1-c-text-1);
}

.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-list li {
  margin-bottom: 8px;
}

.footer-list a {
  color: var(--s1-c-text-2);
  text-decoration: none;
  transition: var(--s1-transition-standard);
  font-size: 0.9rem;
}

.footer-list a:hover {
  color: var(--s1-c-primary);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 32px;
  border-top: 1px solid var(--s1-c-divider);
}

.footer-copyright {
  color: var(--s1-c-text-3);
  font-size: 0.8rem;
}

.footer-copyright p {
  margin: 0;
  line-height: 1.5;
}

.footer-social {
  display: flex;
  gap: 16px;
}

.footer-social a {
  color: var(--s1-c-text-2);
  transition: var(--s1-transition-standard);
}

.footer-social a:hover {
  color: var(--s1-c-primary);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 32px;
  }
  
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
  }
  
  .footer-social {
    margin-top: 16px;
  }
}
</style> 