import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "S1API",
  description: "A Schedule One Mono / Il2Cpp Cross Compatibility Layer",
  appearance: 'dark',
  lastUpdated: true,
  srcDir: '.vitepress/docs',
  base: '/S1API-docs/',
  
  head: [
    // Favicon settings
    ['link', { rel: 'shortcut icon', href: '/S1API-docs/logo.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/S1API-docs/logo.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/S1API-docs/logo.png' }],
    
    // Basic SEO
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'description', content: 'A Schedule One Mono / Il2Cpp Cross Compatibility Layer for game modding' }],
    ['meta', { name: 'keywords', content: 'S1API, Schedule One, game modding, Unity, Mono, Il2Cpp, compatibility layer' }],
    ['meta', { name: 'author', content: 'S1API Team' }],
    ['link', { rel: 'canonical', href: 'https://ifbars.github.io/S1API-docs/' }],
    
    // Theme and appearance
    ['meta', { name: 'theme-color', content: '#0f172a' }],
    
    // Open Graph / Facebook
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://ifbars.github.io/S1API-docs/' }],
    ['meta', { property: 'og:title', content: 'S1API - Mono/Il2Cpp Compatibility Layer' }],
    ['meta', { property: 'og:description', content: 'A powerful cross-compatibility layer for Unity game modding across Mono and Il2Cpp backends' }],
    ['meta', { property: 'og:image', content: 'https://ifbars.github.io/S1API-docs/logo.png' }],
    ['meta', { property: 'og:image:alt', content: 'S1API Logo' }],
    ['meta', { property: 'og:site_name', content: 'S1API Documentation' }],
    
    // Twitter
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:url', content: 'https://ifbars.github.io/S1API-docs/' }],
    ['meta', { name: 'twitter:title', content: 'S1API - Game Modding Compatibility Layer' }],
    ['meta', { name: 'twitter:description', content: 'A Schedule One Mono / Il2Cpp Cross Compatibility Layer for Unity game modding' }],
    ['meta', { name: 'twitter:image', content: 'https://ifbars.github.io/S1API-docs/logo.png' }],
    ['meta', { name: 'twitter:image:alt', content: 'S1API Logo' }],
    
    // Apple specific
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'S1API Docs' }]
  ],
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API Reference', link: '/api/' },
      { text: 'Code Generator', link: '/code-generator/' },
      { text: 'Contributing', link: '/contributing/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is S1API?', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Getting Started', link: '/guide/getting-started' }
          ]
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Mono vs Il2Cpp', link: '/guide/mono-il2cpp' },
            { text: 'Cross-Compatibility', link: '/guide/cross-compatibility' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/' }
          ]
        },
        {
          text: 'Game Systems',
          items: [
            { text: 'Console', link: '/api/console/' },
            { text: 'Dead Drops', link: '/api/dead-drops/' },
            { text: 'Game Time', link: '/api/game-time/' },
            { text: 'Items', link: '/api/items/' },
            { text: 'Leveling', link: '/api/leveling/' },
            { text: 'Logging', link: '/api/logging/' },
            { text: 'Map', link: '/api/map/' },
            { text: 'Money', link: '/api/money/' },
            { text: 'NPCs', link: '/api/npcs/' },
            { text: 'Phone App', link: '/api/phone-app/' },
            { text: 'Phone Calls', link: '/api/phone-calls/' },
            { text: 'Products', link: '/api/products/' },
            { text: 'Property', link: '/api/property/' },
            { text: 'Quests', link: '/api/quests/' },
            { text: 'Storages', link: '/api/storages/' },
            { text: 'UI', link: '/api/ui/' }
          ]
        },
        {
          text: 'Utilities',
          items: [
            { text: 'Save/Load System', link: '/api/save-system/' },
            { text: 'Internal Utilities', link: '/api/internal/' }
          ]
        }
      ],
      '/code-generator/': [
        {
          text: 'Code Generator',
          items: [
            { text: 'Overview', link: '/code-generator/' },
            { text: 'NPC Generator', link: '/code-generator/npc' },
            { text: 'Quest Generator', link: '/code-generator/quest' }
          ]
        }
      ],
      '/contributing/': [
        {
          text: 'Contributing',
          items: [
            { text: 'How to Contribute', link: '/contributing/' },
            { text: 'VitePress Documentation Guide', link: '/contributing/vitepress-guide' },
            { text: 'Coding Standards', link: '/contributing/coding-standards' },
            { text: 'Building the Project', link: '/contributing/building' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/KaBooMa/S1API' }
    ],

    footer: {
      message: 'Released under the MIT License.',
    },
    
    search: {
      provider: 'local'
    },
    
    // Custom theme settings
    outline: {
      level: 'deep',
      label: 'On this page'
    },

    editLink: {
      pattern: 'https://github.com/ifBars/S1API-docs/edit/dev/.vitepress/docs/:path',
      text: 'Help improve this page'
    },
    
    // i18n support (if needed in the future)
    i18n: {
      search: 'Search',
      menu: 'Menu',
      toc: 'On this page',
      returnToTop: 'Return to top',
      appearance: 'Appearance',
      previous: 'Previous',
      next: 'Next',
      pageNotFound: 'Page Not Found',
      deadLink: {
        description: 'This link is dead',
        linkText: 'Please report this'
      },
      lastUpdated: {
        text: 'Last updated'
      }
    },
    
    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    }
  }
})
