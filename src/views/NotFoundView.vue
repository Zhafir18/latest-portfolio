<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'

const pageRef = ref<HTMLElement | null>(null)

onMounted(() => {
  gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    tl.from('.nf-code', { yPercent: 110, duration: 1.1, stagger: 0.04 })
    tl.from('.nf-body', { opacity: 0, y: 20, duration: 0.9 }, '-=0.6')
  }, pageRef.value!)
})
</script>

<template>
  <main class="nf-page" ref="pageRef">
    <div class="nf-inner">
      <div class="nf-code-wrap">
        <span class="nf-code">404</span>
      </div>
      <div class="nf-body">
        <p class="nf-label">Page not found</p>
        <h1 class="nf-title">This page doesn't exist.</h1>
        <p class="nf-sub">It may have been moved, deleted, or the URL might be wrong.</p>
        <RouterLink to="/" class="nf-link">← Back to home</RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.nf-page {
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding: 8rem 3rem;
}

.nf-inner {
  max-width: 1340px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.nf-code-wrap {
  overflow: hidden;
}

.nf-code {
  display: block;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(100px, 18vw, 240px);
  line-height: 0.85;
  letter-spacing: -0.05em;
  color: var(--text);
  opacity: 0.06;
}

.nf-label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nf-label::before {
  content: '';
  width: 36px;
  height: 1px;
  background: var(--accent);
  flex-shrink: 0;
}

.nf-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(1.8rem, 3.5vw, 3rem);
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text);
  margin-bottom: 1rem;
}

.nf-sub {
  font-size: 1rem;
  line-height: 1.75;
  color: var(--text);
  opacity: 0.45;
  max-width: 40ch;
  margin-bottom: 2.5rem;
}

.nf-link {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--accent);
  opacity: 0.75;
  transition: opacity 0.2s;
}

.nf-link:hover { opacity: 1; }

@media (max-width: 760px) {
  .nf-page { padding: 7rem 1.75rem; }
  .nf-inner { grid-template-columns: 1fr; gap: 0; }
  .nf-code { font-size: clamp(80px, 22vw, 140px); margin-bottom: 1.5rem; }
}
</style>
