<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const sectionRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.about-quote', {
      scrollTrigger: {
        trigger: '.about-quote',
        start: 'top 80%',
        once: true,
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'expo.out',
    })

    gsap.from('.about-body', {
      scrollTrigger: {
        trigger: '.about-body',
        start: 'top 82%',
        once: true,
      },
      opacity: 0,
      y: 30,
      duration: 0.9,
      ease: 'expo.out',
      delay: 0.15,
    })

    gsap.from('.stat', {
      scrollTrigger: {
        trigger: '.stats',
        start: 'top 85%',
        once: true,
      },
      opacity: 0,
      y: 24,
      duration: 0.8,
      ease: 'expo.out',
      stagger: 0.12,
    })
  }, sectionRef.value!)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section id="about" ref="sectionRef">
    <div class="section-inner">
      <div class="section-label" aria-hidden="true">
        <span class="label-text">About</span>
      </div>

      <div class="about-grid">
        <div class="about-left">
          <blockquote class="about-quote">
            "Crafting scalable &amp; secure modern web systems for the sectors that matter most."
          </blockquote>
        </div>

        <div class="about-right">
          <p class="about-body">
            I'm Muhammad Zhafir Ghiffari, a Software Engineer at Indocyber Global Teknologi
            based in Jakarta. Over 2+ years I've built enterprise web applications for
            government institutions and state-owned enterprises — from electronic signature
            systems at DPR RI to asset management platforms for PLN.
          </p>
          <p class="about-body" style="margin-top: 1.25rem; opacity: 0.5;">
            My stack spans Vue.js, Angular, and Laravel on the frontend and backend —
            with a consistent emphasis on security (OWASP), performance, and integration
            with real-world government data systems.
          </p>

          <div class="stats">
            <div class="stat">
              <span class="stat-value">2<span class="stat-sup">+</span></span>
              <span class="stat-label">Years experience</span>
            </div>
            <div class="stat">
              <span class="stat-value">5<span class="stat-sup">+</span></span>
              <span class="stat-label">Projects shipped</span>
            </div>
            <div class="stat">
              <span class="stat-value">Gov<span class="stat-sup">&amp;</span></span>
              <span class="stat-label">SOE sector focus</span>
            </div>
          </div>
        </div>
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

/* ── Grid ──────────────────────────────────────────────────────────── */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: start;
}

/* ── Quote ─────────────────────────────────────────────────────────── */
.about-quote {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.5rem, 2.8vw, 2.4rem);
  line-height: 1.25;
  color: var(--text);
  border: none;
  padding: 0;
  position: sticky;
  top: 8rem;
}

/* ── Body ───────────────────────────────────────────────────────────── */
.about-body {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text);
  opacity: 0.65;
  max-width: 52ch;
}

/* ── Stats ──────────────────────────────────────────────────────────── */
.stats {
  display: flex;
  gap: 3rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border);
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 2.4rem;
  line-height: 1;
  color: var(--text);
}

.stat-sup {
  font-size: 1rem;
  color: var(--accent);
}

.stat-label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text);
  opacity: 0.4;
}

/* ── Responsive ─────────────────────────────────────────────────────── */
@media (max-width: 860px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .about-quote {
    position: static;
  }
  section {
    padding: 5rem 1.75rem;
  }
}
</style>
