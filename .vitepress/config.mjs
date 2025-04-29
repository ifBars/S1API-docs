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
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#3a86ff' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:title', content: 'S1API' }],
    ['meta', { name: 'og:description', content: 'A Schedule One Mono / Il2Cpp Cross Compatibility Layer' }],
    ['meta', { name: 'og:image', content: '/logo.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'S1API' }],
    ['meta', { name: 'twitter:description', content: 'A Schedule One Mono / Il2Cpp Cross Compatibility Layer' }]
  ],
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API Reference', link: '/api/' },
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
            { text: 'Dead Drops', link: '/api/dead-drops/' },
            { text: 'Game Time', link: '/api/game-time/' },
            { text: 'Items', link: '/api/items/' },
            { text: 'Leveling', link: '/api/leveling/' },
            { text: 'Money', link: '/api/money/' },
            { text: 'NPCs', link: '/api/npcs/' },
            { text: 'Phone App', link: '/api/phone-app/' },
            { text: 'Products', link: '/api/products/' },
            { text: 'Quests', link: '/api/quests/' },
            { text: 'Storages', link: '/api/storages/' }
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
      '/contributing/': [
        {
          text: 'Contributing',
          items: [
            { text: 'How to Contribute', link: '/contributing/' },
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
