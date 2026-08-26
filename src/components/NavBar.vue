<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import { useTheme } from '../composables/useTheme'

const navEl = ref<HTMLElement | null>(null)
const scrolled = ref(false)
const { theme, toggle } = useTheme()

const onScroll = () => { scrolled.value = window.scrollY > 60 }

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  gsap.from(navEl.value, { yPercent: -100, duration: 0.9, ease: 'expo.out', delay: 1.2 })
})
onUnmounted(() => { window.removeEventListener('scroll', onScroll) })
</script>

<template>
  <nav ref="navEl" :class="{ scrolled }">
    <RouterLink to="/" class="logo" aria-label="Home">GHF</RouterLink>

    <div class="links">
      <RouterLink to="/work">Work</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <RouterLink to="/stack">Stack</RouterLink>
      <button
        class="theme-toggle"
        :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        @click="toggle"
      >
        <svg v-if="theme === 'dark'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </button>
      <RouterLink to="/contact" class="cta">Let's talk</RouterLink>
    </div>
  </nav>
</template>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 3rem;
  transition: background 0.5s, backdrop-filter 0.5s;
}

nav.scrolled {
  background: var(--nav-glass);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.logo {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.1rem;
  letter-spacing: 0.12em;
  color: var(--accent);
}

.links {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.links a {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text);
  opacity: 0.5;
  transition: opacity 0.2s;
  text-decoration: none;
}

.links a:hover,
.links a.router-link-active:not(.cta) {
  opacity: 1;
}

.links .cta {
  border: 1px solid rgba(255, 107, 53, 0.6);
  color: var(--accent);
  padding: 0.5rem 1.3rem;
  opacity: 1;
  transition: background 0.25s, color 0.25s, border-color 0.25s;
}

.links .cta:hover {
  background: var(--accent);
  color: #ffffff;
  border-color: var(--accent);
}

/* ── Theme toggle ─────────────────────────────────────────────────── */
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text);
  opacity: 0.45;
  padding: 0.25rem;
  transition: opacity 0.2s, color 0.2s, transform 0.35s;
}

.theme-toggle:hover {
  opacity: 1;
  transform: rotate(20deg);
}

@media (max-width: 640px) {
  nav { padding: 1.25rem 1.5rem; }
  .links { gap: 1.25rem; }
  .links a:not(.cta) { display: none; }
  .theme-toggle { display: flex; }
}
</style>
