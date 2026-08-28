<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from '../components/HeroSection.vue'
import { PROFILE, PROJECTS, STACK } from '../data/index'
import { scrambleText } from '../composables/useScramble'
import { applyMagnetic } from '../composables/useMagnetic'

const overviewRef = ref<HTMLElement | null>(null)
const yearsReel = ref<HTMLElement | null>(null)
const projectsReel = ref<HTMLElement | null>(null)
const previewRef = ref<HTMLElement | null>(null)

const previewProject = ref<(typeof PROJECTS)[0] | null>(null)
const previewGradient = ref('')

const PREVIEW_GRADIENTS = [
  'linear-gradient(145deg, rgba(255,107,53,0.18) 0%, var(--surface) 100%)',
  'linear-gradient(145deg, rgba(45,212,191,0.18) 0%, var(--surface) 100%)',
  'linear-gradient(145deg, rgba(255,107,53,0.10) 0%, rgba(45,212,191,0.14) 80%, var(--surface) 100%)',
  'linear-gradient(145deg, rgba(45,212,191,0.14) 0%, rgba(255,107,53,0.10) 80%, var(--surface) 100%)',
  'linear-gradient(145deg, rgba(255,107,53,0.14) 0%, rgba(45,212,191,0.10) 80%, var(--surface) 100%)',
]

const isMouse = !window.matchMedia('(pointer: coarse)').matches

const onWorkListMove = (e: MouseEvent) => {
  if (!isMouse || !previewRef.value) return
  gsap.to(previewRef.value, {
    x: e.clientX + 28,
    y: e.clientY - 90,
    duration: 0.42,
    ease: 'power2.out',
  })
}

const onRowEnter = (project: (typeof PROJECTS)[0], index: number) => {
  if (!isMouse) return
  previewProject.value = project
  previewGradient.value = PREVIEW_GRADIENTS[index] ?? PREVIEW_GRADIENTS[0]
  gsap.to(previewRef.value, { opacity: 1, scale: 1, duration: 0.28, ease: 'expo.out' })
}

const onRowLeave = () => {
  if (!isMouse) return
  gsap.to(previewRef.value, { opacity: 0, scale: 0.94, duration: 0.18, ease: 'power2.in' })
}

const magneticCleanups: Array<() => void> = []
let ctx: gsap.Context

onMounted(() => {
  gsap.set(previewRef.value, { opacity: 0, scale: 0.94, x: 0, y: 0 })

  const contactLink = overviewRef.value?.querySelector<HTMLElement>('.contact-ov-link')
  if (contactLink && isMouse) magneticCleanups.push(applyMagnetic(contactLink, 0.22))

  ctx = gsap.context(() => {
    // Scramble on every section label when it enters viewport
    gsap.utils.toArray<HTMLElement>('.label-text', overviewRef.value).forEach((el) => {
      const original = el.textContent ?? ''
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => scrambleText(el, original),
      })
    })

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

    // Rolling digit reels
    ScrollTrigger.create({
      trigger: '.stats',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        if (yearsReel.value)
          gsap.to(yearsReel.value, { yPercent: -20, duration: 1.45, ease: 'expo.out', delay: 0.05 })
        if (projectsReel.value)
          gsap.to(projectsReel.value, { yPercent: -50, duration: 1.45, ease: 'expo.out', delay: 0.18 })
      },
    })
  }, overviewRef.value!)
})

onUnmounted(() => {
  ctx?.revert()
  magneticCleanups.forEach((fn) => fn())
})
</script>

<template>
  <div>
    <HeroSection />

    <!-- Work preview card — fixed, follows cursor -->
    <div class="work-preview" ref="previewRef" aria-hidden="true">
      <div class="wp-inner" :style="{ background: previewGradient }">
        <span class="wp-num">{{ previewProject?.id }}</span>
        <h3 class="wp-title">{{ previewProject?.title }}</h3>
        <p class="wp-sub">{{ previewProject?.subtitle }}</p>
        <div class="wp-tags">
          <span
            v-for="t in previewProject?.tags?.slice(0, 3)"
            :key="t"
            class="wp-tag"
          >{{ t }}</span>
        </div>
      </div>
    </div>

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
                  <span class="stat-value">
                    <span class="digit-reel-wrap" aria-label="2">
                      <span class="digit-reel" ref="yearsReel">
                        <span class="digit-slot" v-for="n in 10" :key="n">{{ n - 1 }}</span>
                      </span>
                    </span>
                    <span class="stat-sup">+</span>
                  </span>
                  <span class="stat-label">Years experience</span>
                </div>
                <div class="stat">
                  <span class="stat-value">
                    <span class="digit-reel-wrap" aria-label="5">
                      <span class="digit-reel" ref="projectsReel">
                        <span class="digit-slot" v-for="n in 10" :key="n">{{ n - 1 }}</span>
                      </span>
                    </span>
                    <span class="stat-sup">+</span>
                  </span>
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

          <ul class="work-index" role="list" @mousemove="onWorkListMove">
            <li
              class="work-row"
              v-for="(p, i) in PROJECTS"
              :key="p.id"
              @mouseenter="onRowEnter(p, i)"
              @mouseleave="onRowLeave"
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
  min-width: 12ch;
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
  display: inline-flex;
  align-items: flex-start;
}

.stat-sup {
  font-size: 0.9rem;
  color: var(--accent);
  line-height: 1;
  margin-top: 0.08em;
}

/* Rolling digit reel */
.digit-reel-wrap {
  display: inline-block;
  overflow: hidden;
  height: 1em;
  vertical-align: top;
}

.digit-reel {
  display: flex;
  flex-direction: column;
  will-change: transform;
}

.digit-slot {
  height: 1em;
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  line-height: 1;
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

/* ── Work preview card ───────────────────────────────────────────── */
.work-preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 256px;
  pointer-events: none;
  z-index: 500;
  border: 1px solid var(--border);
  overflow: hidden;
  will-change: transform, opacity;
}

.wp-inner {
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  background: var(--surface);
}

.wp-num {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  color: var(--accent);
  margin-bottom: 0.3rem;
  display: block;
}

.wp-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.15rem;
  line-height: 1.2;
  color: var(--text);
}

.wp-sub {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-2);
  opacity: 0.8;
}

.wp-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.6rem;
}

.wp-tag {
  font-family: var(--font-mono);
  font-size: 0.56rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid rgba(45, 212, 191, 0.2);
  color: var(--accent-2);
  padding: 0.18rem 0.45rem;
  opacity: 0.8;
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
  transition: box-shadow 0.25s;
}

.contact-ov-link:hover {
  box-shadow: 0 10px 28px rgba(255, 107, 53, 0.28);
}

/* ── Responsive ──────────────────────────────────────────────────── */
@media (max-width: 860px) {
  .ov-section { padding: 5rem 1.75rem; }
  .ov-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .work-row { grid-template-columns: 2rem 1fr 1fr; }
  .wr-tags { display: none; }
  .ticker-wrap { margin: 0 -1.75rem; }
  .work-preview { display: none; }
}

@media (max-width: 580px) {
  .work-row { grid-template-columns: 2rem 1fr; }
  .wr-sub { display: none; }
}

@media (max-width: 480px) {
  .ov-section { padding: 4rem 1.25rem; }
  .ticker-wrap { margin: 0 -1.25rem; }
}
</style>
