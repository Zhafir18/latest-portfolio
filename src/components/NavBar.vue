<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { useTheme } from '../composables/useTheme'

const navEl = ref<HTMLElement | null>(null)
const scrolled = ref(false)
const menuOpen = ref(false)
const { theme, toggle } = useTheme()
const router = useRouter()

const onScroll = () => { scrolled.value = window.scrollY > 60 }

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}

const closeMenu = () => {
  if (!menuOpen.value) return
  menuOpen.value = false
  document.body.style.overflow = ''
}

router.afterEach(closeMenu)

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  gsap.from(navEl.value, { yPercent: -100, duration: 0.9, ease: 'expo.out', delay: 1.2 })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.style.overflow = ''
})
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

    <!-- Mobile: theme toggle + hamburger -->
    <div class="mobile-controls">
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
      <button
        class="hamburger"
        :class="{ open: menuOpen }"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="menuOpen"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </nav>

  <!-- Mobile menu overlay -->
  <Transition name="overlay">
    <div v-if="menuOpen" class="mobile-overlay" @click.self="closeMenu">
      <nav class="mobile-nav" aria-label="Mobile navigation">
        <RouterLink to="/" class="mobile-link" @click="closeMenu">Home</RouterLink>
        <RouterLink to="/work" class="mobile-link" @click="closeMenu">Work</RouterLink>
        <RouterLink to="/about" class="mobile-link" @click="closeMenu">About</RouterLink>
        <RouterLink to="/stack" class="mobile-link" @click="closeMenu">Stack</RouterLink>
        <RouterLink to="/contact" class="mobile-link mobile-cta" @click="closeMenu">Let's talk</RouterLink>
      </nav>
    </div>
  </Transition>
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

/* ── Mobile controls ──────────────────────────────────────────────── */
.mobile-controls {
  display: none;
  align-items: center;
  gap: 1rem;
}

/* ── Hamburger ────────────────────────────────────────────────────── */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  width: 28px;
  height: 28px;
}

.hamburger span {
  display: block;
  width: 20px;
  height: 1px;
  background: var(--text);
  transform-origin: center;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s;
}

.hamburger.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

/* ── Mobile overlay ───────────────────────────────────────────────── */
.mobile-overlay {
  position: fixed;
  inset: 0;
  z-index: 99;
  background: var(--ground);
  display: flex;
  flex-direction: column;
  padding: 6rem 2rem 3rem;
  overflow-y: auto;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  justify-content: center;
  flex: 1;
}

.mobile-link {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(2.2rem, 11vw, 3.5rem);
  letter-spacing: -0.02em;
  color: var(--text);
  opacity: 0.25;
  transition: opacity 0.2s;
  text-decoration: none;
  line-height: 1.2;
  padding: 0.3rem 0;
  border-bottom: 1px solid var(--border);
}

.mobile-link:last-child { border-bottom: none; }

.mobile-link:hover,
.mobile-link.router-link-active {
  opacity: 0.9;
}

.mobile-cta {
  color: var(--accent);
  opacity: 0.85;
  margin-top: 1.5rem;
  border-bottom: none;
  font-size: clamp(1.5rem, 8vw, 2.5rem);
}

.mobile-cta:hover { opacity: 1; }

/* ── Overlay transition ───────────────────────────────────────────── */
.overlay-enter-active { transition: opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.overlay-leave-active { transition: opacity 0.2s ease-in; }
.overlay-enter-from,
.overlay-leave-to { opacity: 0; }

/* ── Responsive ──────────────────────────────────────────────────── */
@media (max-width: 640px) {
  nav { padding: 1.25rem 1.5rem; }
  .links { display: none; }
  .mobile-controls { display: flex; }
}
</style>
