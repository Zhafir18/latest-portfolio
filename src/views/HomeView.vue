<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import HeroSection from '../components/HeroSection.vue'
import { PROFILE, PROJECTS, STACK } from '../data/index'

const overviewRef = ref<HTMLElement | null>(null)
const yearsEl = ref<HTMLElement | null>(null)
const projectsEl = ref<HTMLElement | null>(null)
let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.ov-reveal', {
      scrollTrigger: { trigger: '.ov-reveal', start: 'top 82%', once: true },
      opacity: 0, y: 32, duration: 0.9, ease: 'expo.out', stagger: 0.1,
    })
    gsap.from('.work-row', {
      scrollTrigger: { trigger: '.work-index', start: 'top 80%', once: true },
      opacity: 0, x: -16, duration: 0.7, ease: 'expo.out', stagger: 0.07,
    })
    gsap.from('.contact-ov-inner', {
      scrollTrigger: { trigger: '.contact-ov-inner', start: 'top 85%', once: true },
      opacity: 0, y: 20, duration: 0.9, ease: 'expo.out',
    })

    const counters = { years: 0, projects: 0 }
    gsap.to(counters, {
      years: 2, projects: 5,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: '.stats', start: 'top 80%', once: true },
      onUpdate() {
        if (yearsEl.value) yearsEl.value.textContent = Math.round(counters.years).toString()
        if (projectsEl.value) projectsEl.value.textContent = Math.round(counters.projects).toString()
      },
    })
  }, overviewRef.value!)
})

onUnmounted(() => { ctx?.revert() })
</script>

<template>
  <div>
    <HeroSection />

    <div ref="overviewRef">
      <!-- ── About overview ─────────────────────────────────────────── -->
      <section class="ov-section" id="about-ov">
        <div class="ov-inner">
          <div class="section-label">
            <span class="label-text">About</span>
          </div>

          <div class="ov-grid ov-reveal">
            <blockquote class="ov-quote">
              "{{ PROFILE.headline }}"
            </blockquote>

            <div class="ov-body-col">
              <p class="ov-body">{{ PROFILE.bio }}</p>

              <div class="stats">
                <div class="stat">
                  <span class="stat-value"><span ref="yearsEl">0</span><span class="stat-sup">+</span></span>
                  <span class="stat-label">Years experience</span>
                </div>
                <div class="stat">
                  <span class="stat-value"><span ref="projectsEl">0</span><span class="stat-sup">+</span></span>
                  <span class="stat-label">Projects shipped</span>
                </div>
                <div class="stat">
                  <span class="stat-value">Gov</span>
                  <span class="stat-label">SOE sector focus</span>
                </div>
              </div>

              <RouterLink to="/about" class="more-link">Full bio &amp; experience →</RouterLink>
            </div>
          </div>
        </div>
      </section>

      <!-- ── Work overview ──────────────────────────────────────────── -->
      <section class="ov-section" id="work-ov">
        <div class="ov-inner">
          <div class="section-label">
            <span class="label-text">Selected Work</span>
          </div>

          <ul class="work-index" role="list">
            <li
              class="work-row"
              v-for="p in PROJECTS"
              :key="p.id"
            >
              <span class="wr-num">{{ p.id }}</span>
              <span class="wr-title">{{ p.title }}</span>
              <span class="wr-sub">{{ p.subtitle }}</span>
              <span class="wr-tags">{{ p.tags.join(' · ') }}</span>
            </li>
          </ul>

          <div class="section-cta">
            <RouterLink to="/work" class="more-link">Explore all 5 projects →</RouterLink>
          </div>
        </div>
      </section>

      <!-- ── Stack overview ─────────────────────────────────────────── -->
      <section class="ov-section" id="stack-ov">
        <div class="ov-inner">
          <div class="section-label">
            <span class="label-text">Stack</span>
          </div>
        </div>

        <div class="ticker-wrap" aria-label="Tech stack">
          <div class="ticker-track">
            <span v-for="(s, i) in [...STACK, ...STACK]" :key="i" class="ticker-item">
              {{ s.name }}<span class="ticker-sep" aria-hidden="true"> ·</span>
            </span>
          </div>
        </div>

        <div class="ov-inner">
          <div class="section-cta">
            <RouterLink to="/stack" class="more-link">Full stack breakdown →</RouterLink>
          </div>
        </div>
      </section>

      <!-- ── Contact overview ───────────────────────────────────────── -->
      <section class="ov-section contact-ov" id="contact-ov">
        <div class="ov-inner">
          <div class="contact-ov-inner">
            <p class="contact-ov-pre">Available for projects</p>
            <h2 class="contact-ov-heading">Got something to build?</h2>
            <RouterLink to="/contact" class="contact-ov-link">
              Get in touch <span aria-hidden="true">→</span>
            </RouterLink>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* ── Shared section layout ───────────────────────────────────────── */
.ov-section {
  padding: 6rem 3rem;
  border-top: 1px solid var(--border);
}

.ov-inner {
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

.section-cta {
  margin-top: 2.5rem;
}

.more-link {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  transition: opacity 0.2s;
  opacity: 0.75;
}

.more-link:hover { opacity: 1; }

/* ── About overview ──────────────────────────────────────────────── */
.ov-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;
}

.ov-quote {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.3rem, 2.2vw, 2rem);
  line-height: 1.3;
  color: var(--text);
  border: none;
  padding: 0;
}

.ov-body {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text);
  opacity: 0.6;
  max-width: 52ch;
  margin-bottom: 2.5rem;
}

.stats {
  display: flex;
  gap: 2.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.stat-value {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 2.2rem;
  line-height: 1;
  color: var(--text);
}

.stat-sup {
  font-size: 0.9rem;
  color: var(--accent);
}

.stat-label {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text);
  opacity: 0.35;
}

/* ── Work index ──────────────────────────────────────────────────── */
.work-index {
  list-style: none;
}

.work-row {
  display: grid;
  grid-template-columns: 2.5rem 1fr 1fr 1fr;
  gap: 1rem;
  align-items: center;
  padding: 1.1rem 0;
  border-bottom: 1px solid var(--border);
  transition: padding-left 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: default;
}

.work-row:first-child { border-top: 1px solid var(--border); }
.work-row:hover { padding-left: 0.5rem; }

.wr-num {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.12em;
  color: var(--text);
  opacity: 0.2;
}

.wr-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text);
}

.wr-sub {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: var(--accent-2);
  opacity: 0.7;
}

.wr-tags {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  color: var(--text);
  opacity: 0.3;
  text-align: right;
}

/* ── Stack ticker ────────────────────────────────────────────────── */
.ticker-wrap {
  overflow: hidden;
  margin: 0 -3rem;
  padding: 1.5rem 0;
  mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
}

.ticker-track {
  display: flex;
  width: max-content;
  animation: marquee 32s linear infinite;
}

.ticker-wrap:hover .ticker-track {
  animation-play-state: paused;
}

.ticker-item {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.5rem;
  letter-spacing: -0.01em;
  color: var(--text);
  opacity: 0.25;
  white-space: nowrap;
  padding: 0 0.25rem;
}

.ticker-sep {
  color: var(--accent);
  opacity: 1;
  padding-left: 0.5rem;
  margin-right: 0.75rem;
}

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* ── Contact overview ────────────────────────────────────────────── */
.contact-ov {
  background: var(--surface);
}

.contact-ov-pre {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--accent);
  opacity: 0.7;
  margin-bottom: 1rem;
}

.contact-ov-heading {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.05;
  color: var(--text);
  margin-bottom: 2rem;
}

.contact-ov-link {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  background: var(--accent);
  color: var(--ground);
  padding: 0.85rem 2rem;
  display: inline-block;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s;
}

.contact-ov-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(255, 107, 53, 0.28);
}

/* ── Responsive ──────────────────────────────────────────────────── */
@media (max-width: 860px) {
  .ov-section { padding: 5rem 1.75rem; }
  .ov-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .work-row { grid-template-columns: 2rem 1fr 1fr; }
  .wr-tags { display: none; }
  .ticker-wrap { margin: 0 -1.75rem; }
}

@media (max-width: 580px) {
  .work-row { grid-template-columns: 2rem 1fr; }
  .wr-sub { display: none; }
}
</style>
