<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import { PROJECTS } from '../data/index'
import FooterBar from '../components/FooterBar.vue'

const pageRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.page-title .char', {
      yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.04,
    })
    gsap.from('.project-card', {
      scrollTrigger: { trigger: '.projects-grid', start: 'top 78%', once: true },
      opacity: 0, y: 40, duration: 0.9, ease: 'expo.out', stagger: 0.12,
    })
  }, pageRef.value!)
})

onUnmounted(() => { ctx?.revert() })
</script>

<template>
  <main ref="pageRef">
    <header class="page-header">
      <div class="header-inner">
        <div class="page-eyebrow">
          <span class="eyebrow-line" aria-hidden="true"></span>
          <span class="eyebrow-text">Selected Work</span>
        </div>
        <h1 class="page-title" aria-label="Work">
          <span class="char-wrap" v-for="(ch, i) in 'PROJECTS.'" :key="i">
            <span class="char">{{ ch }}</span>
          </span>
        </h1>
        <p class="header-sub">
          Enterprise systems built for government institutions and state-owned enterprises.
        </p>
      </div>
    </header>

    <section class="page-section">
      <div class="section-inner">
        <div class="projects-grid">
          <RouterLink :to="`/work/${p.slug}`" class="project-card" v-for="p in PROJECTS" :key="p.id">
            <span class="card-bg-num" aria-hidden="true">{{ p.id }}</span>
            <div class="card-top">
              <span class="card-num">{{ p.id }}</span>
              <div class="card-top-right">
                <span v-if="p.isInternal" class="card-badge-internal" title="Government/enterprise system — not publicly accessible">Internal</span>
                <span class="card-org">{{ p.org }}</span>
              </div>
            </div>
            <div class="card-title-group">
              <h2 class="card-title">{{ p.title }}</h2>
              <span class="card-subtitle">{{ p.subtitle }}</span>
            </div>
            <p class="card-desc">{{ p.desc }}</p>
            <div class="card-tags">
              <span class="tag" v-for="t in p.tags" :key="t">{{ t }}</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <FooterBar />
  </main>
</template>

<style scoped>
main { min-height: 100svh; }

.page-header {
  padding: 8rem 3rem 5rem;
  border-bottom: 1px solid var(--border);
}

.header-inner {
  max-width: 1340px;
  margin: 0 auto;
  width: 100%;
}

.page-eyebrow {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.eyebrow-line {
  width: 36px;
  height: 1px;
  background: var(--accent);
  flex-shrink: 0;
}

.eyebrow-text {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
}

.page-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(52px, 8vw, 120px);
  line-height: 0.9;
  letter-spacing: -0.03em;
  color: var(--text);
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.char-wrap { overflow: hidden; display: inline-block; line-height: 0.95; }
.char { display: inline-block; }

.header-sub {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text);
  opacity: 0.45;
  max-width: 55ch;
}

.page-section {
  padding: 5rem 3rem;
}

.section-inner {
  max-width: 1340px;
  margin: 0 auto;
  width: 100%;
}

/* ── Grid ─────────────────────────────────────────────────────────── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}

/* ── Card ─────────────────────────────────────────────────────────── */
.project-card {
  background: var(--surface);
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  border-top: 2px solid transparent;
  transition: border-color 0.3s;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(to bottom, rgba(255, 107, 53, 0.07), transparent);
  opacity: 0;
  transition: opacity 0.35s;
  pointer-events: none;
}

.project-card:hover { border-top-color: var(--accent); }
.project-card:hover::before { opacity: 1; }

.card-bg-num {
  position: absolute;
  bottom: -0.1em;
  right: 0.75rem;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 8rem;
  line-height: 1;
  letter-spacing: -0.05em;
  color: var(--text);
  opacity: 0.04;
  pointer-events: none;
  user-select: none;
  transition: opacity 0.35s;
}

.project-card:hover .card-bg-num { opacity: 0.08; }

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.card-top-right {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.card-num {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  color: var(--text);
  opacity: 0.2;
}

.card-org {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text);
  opacity: 0.25;
}

.card-badge-internal {
  font-family: var(--font-mono);
  font-size: 0.55rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent-2);
  border: 1px solid rgba(45, 212, 191, 0.3);
  padding: 0.15rem 0.45rem;
  border-radius: 2px;
  opacity: 0.6;
}

.card-title-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 1rem;
}

.card-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.15;
  color: var(--text);
}

.card-subtitle {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-2);
  opacity: 0.7;
}

.card-desc {
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--text);
  opacity: 0.5;
  flex: 1;
  margin-bottom: 2rem;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-2);
  border: 1px solid rgba(45, 212, 191, 0.2);
  padding: 0.3rem 0.65rem;
}

/* ── Responsive ──────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .page-header { padding: 7rem 1.75rem 4rem; }
  .page-section { padding: 4rem 1.75rem; }
  .projects-grid { grid-template-columns: 1fr; }
}

@media (min-width: 901px) and (max-width: 1100px) {
  .projects-grid { grid-template-columns: repeat(2, 1fr); }
}
</style>
