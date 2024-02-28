import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({
  lang: 'en-US',
  title: 'Sui dApp Kit Vue',
  description: 'Similar to official Sui dApp Kit, but for Vue 3 developers.',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',

    navbar: ['/', '/getting-started'],
  }),

  bundler: viteBundler(),
})
