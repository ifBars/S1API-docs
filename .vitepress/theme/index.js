// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import HomePage from './components/HomePage.vue'
import { useData, useRoute } from 'vitepress'

// Import fonts (via CDN for simplicity)
import './fonts.css'

// Import custom styles
import './style.css'

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
  }
}
