import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'en-US',
  title: 'Sui dApp Kit Vue Documentation',
  description: `Inspired by the official Sui dApp Kit, with quite similar API to the official's.`,

  base: '/Sui-dApp-Kit-Vue/',

  theme: defaultTheme({
    // logo: '/images/logo.png',
    navbar: [
      '/',
      '/get-started',
      {
        text: 'Github',
        link: 'https://github.com/SuiCraftTeam/Sui-dApp-Kit-Vue',
      },
    ],
    themePlugins: {
      backToTop: false
    }
  }),

  bundler: viteBundler(),
})
