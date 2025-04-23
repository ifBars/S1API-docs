// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import HomePage from './components/HomePage.vue'
import { useData, useRoute } from 'vitepress'

// Import fonts (via CDN for simplicity)
import './fonts.css'

// Import custom styles
import './style.css'

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

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  
  // Use the default VitePress theme layout but override specific slots
  Layout() {
    // Get data about current page
    const { page, frontmatter } = useData()
    const route = useRoute()
    
    // Check if we're on the home page
    const isHomePage = page.value.relativePath === 'index.md' || 
                        route.path === '/' || 
                        route.path === '/index.html'
    
    // Return the default theme layout with overrides for the home page
    return h(DefaultTheme.Layout, null, {
      // Override the default home page with our custom home page
      'home-features-before': isHomePage ? () => h(HomePage) : null,
      // Hide the default home content when on the home page
      'home-hero': isHomePage ? () => null : undefined,
      'home-features': isHomePage ? () => null : undefined,
    })
  },
  
  // Replace the default theme's NotFound component
  NotFound: DefaultTheme.NotFound,
  
  enhanceApp({ app }) {
    // Register global components
    app.component('HomePage', HomePage)
    
    // Register global directives
    app.directive('scroll-reveal', vScrollReveal)
    
    // Add lifecycle hook for animations
    if (typeof window !== 'undefined') {
      window.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('animate-ready')
        
        // Add smooth scrolling to all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
            e.preventDefault()
            
            const targetId = this.getAttribute('href')
            const targetElement = document.querySelector(targetId)
            
            if (targetElement) {
              window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
              })
            }
          })
        })
      })
    }
  }
}
