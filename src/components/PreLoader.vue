<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const loaderRef = ref<HTMLElement | null>(null)
const emit = defineEmits<{ done: [] }>()

onMounted(() => {
  const tl = gsap.timeline({ onComplete: () => emit('done') })
  tl.to('.loader-bar-fill', { scaleX: 1, duration: 0.75, ease: 'expo.inOut', delay: 0.1 })
  tl.to(loaderRef.value, { yPercent: -100, duration: 0.65, ease: 'expo.in', delay: 0.12 })
})
</script>

<template>
  <div class="loader" ref="loaderRef" aria-hidden="true">
    <span class="loader-logo">GHF</span>
    <div class="loader-bar">
      <div class="loader-bar-fill"></div>
    </div>
  </div>
</template>

<style scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 9000;
  background: var(--ground);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.loader-logo {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 3rem;
  letter-spacing: 0.14em;
  color: var(--accent);
}

.loader-bar {
  width: 120px;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.loader-bar-fill {
  height: 100%;
  background: var(--accent);
  transform-origin: left;
  transform: scaleX(0);
}
</style>
