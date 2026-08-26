<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const sectionRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context

const stack = [
  { name: 'Vue.js',       role: 'Primary frontend framework' },
  { name: 'Angular',      role: 'Enterprise frontend' },
  { name: 'TypeScript',   role: 'Language of choice' },
  { name: 'JavaScript',   role: 'Core scripting' },
  { name: 'Laravel',      role: 'Full-stack backend' },
  { name: 'Spring Boot',  role: 'Enterprise backend' },
  { name: 'PostgreSQL',   role: 'Primary database' },
  { name: 'MySQL',        role: 'Relational storage' },
  { name: 'REST API',     role: 'System integration' },
  { name: 'OWASP',        role: 'Security standards' },
  { name: 'SSR',          role: 'Server-side rendering' },
  { name: 'Git',          role: 'Version control' },
]

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.stack-item', {
      scrollTrigger: {
        trigger: '.stack-list',
        start: 'top 82%',
        once: true,
      },
      opacity: 0,
      x: -16,
      duration: 0.7,
      ease: 'expo.out',
      stagger: 0.06,
    })
  }, sectionRef.value!)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section id="stack" ref="sectionRef">
    <div class="section-inner">
      <div class="section-label" aria-hidden="true">
        <span class="label-text">Stack</span>
      </div>

      <div class="stack-body">
        <p class="stack-intro">
          Tools earned through shipping production systems for government institutions and state-owned enterprises.
        </p>

        <ul class="stack-list" role="list">
          <li class="stack-item" v-for="item in stack" :key="item.name">
            <span class="stack-name">{{ item.name }}</span>
            <span class="stack-sep" aria-hidden="true">—</span>
            <span class="stack-role">{{ item.role }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 7rem 3rem;
  border-top: 1px solid var(--border);
}

.section-inner {
  max-width: 1340px;
  margin: 0 auto;
  width: 100%;
}

.section-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 4rem;
}

.section-label::before {
  content: '';
  width: 36px;
  height: 1px;
  background: var(--accent);
  flex-shrink: 0;
}

.label-text {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
}

/* ── Content ─────────────────────────────────────────────────────────── */
.stack-body {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 5rem;
  align-items: start;
}

.stack-intro {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--text);
  opacity: 0.5;
  max-width: 28ch;
  position: sticky;
  top: 8rem;
}

/* ── List ─────────────────────────────────────────────────────────────── */
.stack-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.stack-item {
  display: flex;
  align-items: baseline;
  gap: 1.25rem;
  padding: 1.1rem 0;
  border-bottom: 1px solid var(--border);
  transition: padding-left 0.25s var(--ease-expo);
}

.stack-item:first-child {
  border-top: 1px solid var(--border);
}

.stack-item:hover {
  padding-left: 0.75rem;
}

.stack-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text);
  min-width: 130px;
}

.stack-sep {
  color: var(--accent);
  font-family: var(--font-mono);
}

.stack-role {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--text);
  opacity: 0.4;
}

/* ── Responsive ──────────────────────────────────────────────────────── */
@media (max-width: 760px) {
  .stack-body {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .stack-intro {
    position: static;
  }
  section {
    padding: 5rem 1.75rem;
  }
}
</style>
