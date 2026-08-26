<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'

const barRef = ref<HTMLElement | null>(null)
const visible = ref(false)
let tween: gsap.core.Tween | null = null

function start() {
  visible.value = true
  tween?.kill()
  gsap.set(barRef.value, { scaleX: 0, opacity: 1 })
  tween = gsap.to(barRef.value, {
    scaleX: 0.82,
    duration: 10,
    ease: 'power1.out',
  })
}

function finish() {
  tween?.kill()
  gsap.to(barRef.value, {
    scaleX: 1,
    duration: 0.25,
    ease: 'power2.out',
    onComplete: () => {
      gsap.to(barRef.value, {
        opacity: 0,
        duration: 0.18,
        delay: 0.05,
        onComplete: () => { visible.value = false },
      })
    },
  })
}

defineExpose({ start, finish })
</script>

<template>
  <div v-show="visible" class="page-loader" aria-hidden="true">
    <div class="loader-bar" ref="barRef"></div>
  </div>
</template>

<style scoped>
.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9998;
  height: 2px;
  pointer-events: none;
}

.loader-bar {
  height: 100%;
  background: var(--accent);
  transform-origin: left;
  transform: scaleX(0);
  box-shadow: 0 0 8px rgba(255, 107, 53, 0.6);
}
</style>
