<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { gsap } from 'gsap'
import NavBar from './components/NavBar.vue'
import PreLoader from './components/PreLoader.vue'
import PageLoader from './components/PageLoader.vue'
import { lenis } from './lib/lenis'

const loaded = ref(false)
const pageLoaderRef = ref<InstanceType<typeof PageLoader> | null>(null)

const router = useRouter()
let isFirst = true
router.beforeEach(() => {
  if (isFirst) { isFirst = false; return }
  pageLoaderRef.value?.start()
})
router.afterEach(() => {
  lenis.scrollTo(0, { immediate: true })
  pageLoaderRef.value?.finish()
})

const cursorRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const dot = cursorRef.value
  if (!dot || window.matchMedia('(pointer: coarse)').matches) return

  let visible = false
  document.addEventListener('mousemove', (e) => {
    if (!visible) {
      gsap.set(dot, { opacity: 1 })
      visible = true
    }
    gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' })
  })
  document.addEventListener('mouseleave', () => {
    gsap.to(dot, { opacity: 0, duration: 0.2 })
    visible = false
  })
  document.addEventListener('mouseover', (e) => {
    if ((e.target as Element).closest('a, button')) gsap.to(dot, { scale: 2.5, duration: 0.2 })
  })
  document.addEventListener('mouseout', (e) => {
    if ((e.target as Element).closest('a, button')) gsap.to(dot, { scale: 1, duration: 0.2 })
  })
})
</script>

<template>
  <PreLoader v-if="!loaded" @done="loaded = true" />
  <PageLoader ref="pageLoaderRef" />
  <div class="cursor-dot" ref="cursorRef" aria-hidden="true"></div>
  <!-- Grain texture overlay -->
  <svg class="grain-overlay" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <filter id="__grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#__grain)" />
  </svg>
  <NavBar />
  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" :key="$route.path" />
    </Transition>
  </RouterView>
</template>

<style scoped>
.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 7px;
  height: 7px;
  background: var(--accent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  opacity: 0;
  will-change: transform;
}

@media (pointer: coarse) {
  .cursor-dot { display: none; }
}

.grain-overlay {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9997;
  opacity: 0.038;
}
</style>

<style>
/* Page transition — global so it applies to RouterView content */
.page-enter-active {
  transition: opacity 0.4s, transform 0.4s;
  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
.page-leave-active {
  transition: opacity 0.22s, transform 0.22s ease-in;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(18px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
