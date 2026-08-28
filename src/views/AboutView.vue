<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { PROFILE, EXPERIENCE, EDUCATION } from '../data/index'
import FooterBar from '../components/FooterBar.vue'

const pageRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.page-title .char', {
      yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.04,
    })
    gsap.from('.bio-block', {
      opacity: 0, y: 30, duration: 0.9, ease: 'expo.out', delay: 0.3,
    })
    gsap.from('.exp-item', {
      scrollTrigger: { trigger: '.exp-list', start: 'top 80%', once: true },
      opacity: 0, x: -20, duration: 0.8, ease: 'expo.out', stagger: 0.15,
    })
    gsap.from('.edu-item', {
      scrollTrigger: { trigger: '.edu-list', start: 'top 82%', once: true },
      opacity: 0, x: -20, duration: 0.7, ease: 'expo.out', stagger: 0.12,
    })
  }, pageRef.value!)
})

onUnmounted(() => { ctx?.revert() })
</script>

<template>
  <main ref="pageRef">
    <!-- Page header -->
    <header class="page-header">
      <div class="header-inner">
        <div class="page-eyebrow">
          <span class="eyebrow-line" aria-hidden="true"></span>
          <span class="eyebrow-text">About</span>
        </div>
        <h1 class="page-title" aria-label="About me">
          <span class="char-wrap" v-for="(ch, i) in 'ABOUT ME.'" :key="i">
            <span class="char">{{ ch === ' ' ? ' ' : ch }}</span>
          </span>
        </h1>
        <a :href="PROFILE.cv" download class="cv-btn">
          <span>Download CV</span><span aria-hidden="true"> ↓</span>
        </a>
      </div>
    </header>

    <!-- Bio -->
    <section class="page-section">
      <div class="section-inner">
        <div class="bio-grid bio-block">
          <blockquote class="bio-quote">
            "{{ PROFILE.headline }}"
          </blockquote>
          <div>
            <p class="bio-text">{{ PROFILE.bio }}</p>
            <p class="bio-text bio-text--dim">{{ PROFILE.bioDetail }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience -->
    <section class="page-section">
      <div class="section-inner">
        <div class="section-label">
          <span class="label-text">Experience</span>
        </div>

        <ul class="exp-list" role="list">
          <li class="exp-item" v-for="(e, i) in EXPERIENCE" :key="i">
            <div class="exp-header">
              <div>
                <h3 class="exp-company">{{ e.company }}</h3>
                <span class="exp-role">{{ e.role }}</span>
              </div>
              <span class="exp-period">{{ e.period }}</span>
            </div>
            <ul class="exp-items" role="list">
              <li v-for="(item, j) in e.items" :key="j" class="exp-bullet">
                <span class="bullet-dot" aria-hidden="true">—</span>
                {{ item }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </section>

    <!-- Education -->
    <section class="page-section">
      <div class="section-inner">
        <div class="section-label">
          <span class="label-text">Education</span>
        </div>

        <ul class="edu-list" role="list">
          <li class="edu-item" v-for="(e, i) in EDUCATION" :key="i">
            <div class="edu-header">
              <div>
                <h3 class="edu-inst">{{ e.institution }}</h3>
                <span class="edu-degree">{{ e.degree }}</span>
              </div>
              <span class="edu-period">{{ e.period }}</span>
            </div>
            <p class="edu-detail">{{ e.detail }}</p>
          </li>
        </ul>
      </div>
    </section>

    <FooterBar />
  </main>
</template>

<style scoped>
main { min-height: 100svh; }

/* ── Page header ─────────────────────────────────────────────────── */
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
}

.char-wrap {
  overflow: hidden;
  display: inline-block;
  line-height: 0.95;
}

.char { display: inline-block; }

/* ── Page sections ───────────────────────────────────────────────── */
.page-section {
  padding: 5rem 3rem;
  border-bottom: 1px solid var(--border);
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
  margin-bottom: 3rem;
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

/* ── CV button ───────────────────────────────────────────────────── */
.cv-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 2rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  border: 1px solid rgba(255, 107, 53, 0.5);
  color: var(--accent);
  padding: 0.75rem 1.6rem;
  transition: background 0.25s, color 0.25s, border-color 0.25s;
}
.cv-btn:hover {
  background: var(--accent);
  color: var(--ground);
  border-color: var(--accent);
}

/* ── Bio ─────────────────────────────────────────────────────────── */
.bio-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;
}

.bio-quote {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.3rem, 2.2vw, 2rem);
  line-height: 1.3;
  color: var(--text);
  border: none;
  padding: 0;
}

.bio-text {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text);
  opacity: 0.65;
  max-width: 52ch;
}

.bio-text--dim {
  opacity: 0.45;
  margin-top: 1.25rem;
}

/* ── Experience ──────────────────────────────────────────────────── */
.exp-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.exp-item {
  padding: 2rem 0;
  border-bottom: 1px solid var(--border);
}

.exp-item:first-child { border-top: 1px solid var(--border); }

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
  gap: 2rem;
}

.exp-company {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.25rem;
  color: var(--text);
  margin-bottom: 0.25rem;
}

.exp-role {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-2);
  opacity: 0.8;
}

.exp-period {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: var(--text);
  opacity: 0.3;
  white-space: nowrap;
  flex-shrink: 0;
}

.exp-items { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }

.exp-bullet {
  display: flex;
  gap: 1rem;
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--text);
  opacity: 0.55;
}

.bullet-dot {
  color: var(--accent);
  flex-shrink: 0;
  font-family: var(--font-mono);
}

/* ── Education ───────────────────────────────────────────────────── */
.edu-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.edu-item {
  padding: 2rem 0;
  border-bottom: 1px solid var(--border);
}

.edu-item:first-child { border-top: 1px solid var(--border); }

.edu-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 2rem;
}

.edu-inst {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.2rem;
  color: var(--text);
  margin-bottom: 0.25rem;
}

.edu-degree {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent-2);
  opacity: 0.8;
}

.edu-period {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: var(--text);
  opacity: 0.3;
  white-space: nowrap;
  flex-shrink: 0;
}

.edu-detail {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text);
  opacity: 0.5;
  max-width: 60ch;
}

/* ── Responsive ──────────────────────────────────────────────────── */
@media (max-width: 860px) {
  .page-header { padding: 7rem 1.75rem 4rem; }
  .page-section { padding: 4rem 1.75rem; }
  .bio-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .exp-header, .edu-header { flex-direction: column; gap: 0.5rem; }
}

@media (max-width: 480px) {
  .page-header { padding: 6rem 1.25rem 3rem; }
  .page-section { padding: 3rem 1.25rem; }
}
</style>
