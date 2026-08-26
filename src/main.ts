import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { lenis } from './lib/lenis'

gsap.registerPlugin(ScrollTrigger)

lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => { lenis.raf(time * 1000) })
gsap.ticker.lagSmoothing(0)

console.log(
  '%c G H F ',
  'font-size:52px;font-weight:900;color:#FF6B35;font-family:monospace;background:#030F0F;padding:8px 20px;border-left:3px solid #FF6B35;',
)
console.log(
  '%cMuhammad Zhafir Ghiffari',
  'font-size:13px;font-weight:700;color:#E8F4F0;font-family:monospace;',
)
console.log(
  '%cSoftware Engineer · Jakarta, Indonesia\n\n→  m.zhafirghiffari@gmail.com\n→  linkedin.com/in/muhammad-zhafir-ghiffari\n→  github.com/Zhafir18',
  'font-size:11px;color:#2DD4BF;font-family:monospace;line-height:1.9;',
)

createApp(App).use(router).mount('#app')
