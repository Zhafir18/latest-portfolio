<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import { PROJECTS } from '../data/index'
import FooterBar from '../components/FooterBar.vue'

const route = useRoute()
const pageRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context

const project = computed(() => PROJECTS.find(p => p.slug === route.params.slug))
const prevProject = computed(() => {
  if (!project.value) return null
  const idx = PROJECTS.findIndex(p => p.slug === route.params.slug)
  return idx > 0 ? PROJECTS[idx - 1] : null
})
const nextProject = computed(() => {
  if (!project.value) return null
  const idx = PROJECTS.findIndex(p => p.slug === route.params.slug)
  return idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null
})

onMounted(() => {
  if (!project.value || !pageRef.value) return
  ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
    tl.from('.detail-title .char', { yPercent: 110, duration: 1.1, stagger: 0.04 })
    tl.from('.detail-meta', { opacity: 0, y: 16, duration: 0.8 }, '-=0.7')
    tl.from('.detail-block', {
      scrollTrigger: { trigger: '.detail-grid', start: 'top 80%', once: true },
      opacity: 0, y: 28, duration: 0.8, stagger: 0.12,
    })
  }, pageRef.value)
})
onUnmounted(() => ctx?.revert())
</script>

<template>
  <!-- 404 fallback -->
  <main v-if="!project" class="not-found-inline">
    <p>Project not found. <RouterLink to="/work">Back to work →</RouterLink></p>
  </main>

  <main v-else ref="pageRef">
    <!-- Header -->
    <header class="page-header">
      <div class="header-inner">
        <div class="page-eyebrow">
          <RouterLink to="/work" class="back-link">← Work</RouterLink>
          <span class="eyebrow-sep" aria-hidden="true">/</span>
          <span class="eyebrow-text">{{ project.id }}</span>
        </div>

        <h1 class="detail-title" :aria-label="project.title">
          <span class="char-wrap" v-for="(ch, i) in project.title" :key="i">
            <span class="char">{{ ch }}</span>
          </span>
        </h1>

        <div class="detail-meta">
          <span class="meta-item">
            <span class="meta-label">Client</span>
            <span class="meta-value">{{ project.org }}</span>
          </span>
          <span class="meta-item">
            <span class="meta-label">Role</span>
            <span class="meta-value">{{ project.role }}</span>
          </span>
          <span class="meta-item">
            <span class="meta-label">Year</span>
            <span class="meta-value">{{ project.year }}</span>
          </span>
          <span v-if="project.isInternal" class="meta-item meta-item--internal">
            <span class="meta-label">Access</span>
            <span class="meta-value meta-value--internal">Internal System</span>
          </span>
        </div>
      </div>
    </header>

    <!-- Content -->
    <section class="page-section">
      <div class="section-inner detail-grid">

        <div class="detail-block detail-block--full">
          <h2 class="block-label">Overview</h2>
          <p class="block-text block-text--lg">{{ project.desc }}</p>
        </div>

        <div class="detail-block">
          <h2 class="block-label">Challenge</h2>
          <p class="block-text">{{ project.challenge }}</p>
        </div>

        <div class="detail-block">
          <h2 class="block-label">Impact</h2>
          <p class="block-text">{{ project.impact }}</p>
        </div>

        <div class="detail-block detail-block--full">
          <h2 class="block-label">Stack</h2>
          <div class="tag-list">
            <span class="tag" v-for="t in project.tags" :key="t">{{ t }}</span>
          </div>
        </div>

      </div>
    </section>

    <!-- Prev / Next nav -->
    <nav class="project-nav" aria-label="Project navigation">
      <RouterLink
        v-if="prevProject"
        :to="`/work/${prevProject.slug}`"
        class="pnav-item pnav-item--prev"
      >
        <span class="pnav-dir">← Previous</span>
        <span class="pnav-title">{{ prevProject.title }}</span>
      </RouterLink>
      <div v-else class="pnav-item pnav-item--empty"></div>

      <RouterLink
        v-if="nextProject"
        :to="`/work/${nextProject.slug}`"
        class="pnav-item pnav-item--next"
      >
        <span class="pnav-dir">Next →</span>
        <span class="pnav-title">{{ nextProject.title }}</span>
      </RouterLink>
      <div v-else class="pnav-item pnav-item--empty"></div>
    </nav>

    <FooterBar />
  </main>
</template>

<style scoped>
main { min-height: 100svh; }

.not-found-inline {
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-mono);
  color: var(--text);
  opacity: 0.5;
}

/* ── Header ──────────────────────────────────────────────────────── */
.page-header {
  padding: 8rem 3rem 4rem;
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
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.back-link {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent);
  opacity: 0.7;
  transition: opacity 0.2s;
}
.back-link:hover { opacity: 1; }

.eyebrow-sep {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--text);
  opacity: 0.2;
}

.eyebrow-text {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.18em;
  color: var(--text);
  opacity: 0.2;
}

.detail-title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(52px, 8vw, 120px);
  line-height: 0.9;
  letter-spacing: -0.03em;
  color: var(--text);
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 3rem;
}

.char-wrap { overflow: hidden; display: inline-block; line-height: 0.95; }
.char { display: inline-block; }

/* ── Meta ────────────────────────────────────────────────────────── */
.detail-meta {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.meta-label {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text);
  opacity: 0.3;
}

.meta-value {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1rem;
  color: var(--text);
}

.meta-value--internal {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-2);
  opacity: 0.7;
}

/* ── Content grid ────────────────────────────────────────────────── */
.page-section {
  padding: 5rem 3rem;
}

.section-inner {
  max-width: 1340px;
  margin: 0 auto;
  width: 100%;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px;
}

.detail-block {
  background: var(--surface);
  padding: 3rem;
  border-top: 2px solid transparent;
  transition: border-color 0.3s;
}

.detail-block:hover { border-top-color: var(--accent); }

.detail-block--full {
  grid-column: 1 / -1;
}

.block-label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.25rem;
}

.block-text {
  font-size: 0.95rem;
  line-height: 1.8;
  color: var(--text);
  opacity: 0.6;
  max-width: 70ch;
}

.block-text--lg {
  font-size: 1.1rem;
  line-height: 1.75;
  opacity: 0.7;
}

/* ── Tags ────────────────────────────────────────────────────────── */
.tag-list {
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

/* ── Prev / Next ─────────────────────────────────────────────────── */
.project-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--border);
}

.pnav-item {
  padding: 2.5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-decoration: none;
  border-bottom: 1px solid var(--border);
  transition: background 0.25s;
}

a.pnav-item:hover { background: var(--surface); }

.pnav-item--next {
  border-left: 1px solid var(--border);
  text-align: right;
  align-items: flex-end;
}

.pnav-item--empty {
  border-left: 1px solid var(--border);
}

.pnav-item--next.pnav-item--empty { border-left: none; }

.pnav-dir {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text);
  opacity: 0.3;
}

.pnav-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--text);
}

/* ── Responsive ──────────────────────────────────────────────────── */
@media (max-width: 860px) {
  .page-header { padding: 7rem 1.75rem 3.5rem; }
  .page-section { padding: 4rem 1.75rem; }
  .detail-grid { grid-template-columns: 1fr; }
  .detail-block--full { grid-column: 1; }
  .project-nav { grid-template-columns: 1fr; }
  .pnav-item--next { border-left: none; border-top: 1px solid var(--border); text-align: left; align-items: flex-start; }
  .pnav-item { padding: 2rem 1.75rem; }
}
</style>
