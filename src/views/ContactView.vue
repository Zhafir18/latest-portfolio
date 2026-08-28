<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { PROFILE } from '../data/index'
import FooterBar from '../components/FooterBar.vue'

const pageRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.page-title .char', {
      yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.04,
    })
    gsap.from('.contact-body', {
      opacity: 0, y: 28, duration: 1, ease: 'expo.out', delay: 0.4,
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
          <span class="eyebrow-text">Get in touch</span>
        </div>
        <h1 class="page-title" aria-label="Contact">
          <span class="char-wrap" v-for="(ch, i) in 'CONTACT.'" :key="i">
            <span class="char">{{ ch }}</span>
          </span>
        </h1>
      </div>
    </header>

    <section class="page-section">
      <div class="section-inner contact-body">
        <div class="contact-grid">
          <div class="contact-left">
            <p class="contact-intro">
              Available for project collaborations, freelance engagements,
              and full-time opportunities.
            </p>
            <p class="contact-intro contact-intro--dim">
              Drop an email — I typically reply within a business day.
            </p>
          </div>

          <div class="contact-right">
            <div class="contact-block">
              <span class="contact-label">Email</span>
              <a :href="`mailto:${PROFILE.email}`" class="contact-email">
                <span class="email-text">{{ PROFILE.email }}</span>
                <span class="email-arrow" aria-hidden="true">↗</span>
              </a>
            </div>

            <div class="contact-block">
              <span class="contact-label">LinkedIn</span>
              <a :href="PROFILE.linkedin" target="_blank" rel="noopener" class="social-link">
                Muhammad Zhafir Ghiffari
                <span aria-hidden="true"> ↗</span>
              </a>
            </div>

            <div class="contact-block">
              <span class="contact-label">GitHub</span>
              <a :href="PROFILE.github" target="_blank" rel="noopener" class="social-link">
                Zhafir18
                <span aria-hidden="true"> ↗</span>
              </a>
            </div>

            <div class="contact-block">
              <span class="contact-label">Resume</span>
              <a :href="PROFILE.cv" download class="cv-download">
                <span class="cv-download-text">Download CV</span>
                <span class="cv-download-arrow" aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <FooterBar />
  </main>
</template>

<style scoped>
main {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}

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

.eyebrow-line { width: 36px; height: 1px; background: var(--accent); flex-shrink: 0; }

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

.char-wrap { overflow: hidden; display: inline-block; line-height: 0.95; }
.char { display: inline-block; }

/* ── Content ─────────────────────────────────────────────────────── */
.page-section {
  padding: 5rem 3rem;
  flex: 1;
}

.section-inner {
  max-width: 1340px;
  margin: 0 auto;
  width: 100%;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: start;
}

.contact-intro {
  font-size: 1.05rem;
  line-height: 1.75;
  color: var(--text);
  opacity: 0.6;
  max-width: 38ch;
}

.contact-intro--dim {
  opacity: 0.4;
  margin-top: 1rem;
}

/* ── Contact blocks ──────────────────────────────────────────────── */
.contact-block {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1.75rem 0;
  border-bottom: 1px solid var(--border);
}

.contact-block:first-child { border-top: 1px solid var(--border); }

.contact-label {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text);
  opacity: 0.3;
}

.contact-email {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: var(--accent);
}

.email-text {
  position: relative;
}

.email-text::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.contact-email:hover .email-text::after { transform: scaleX(1); }

.email-arrow {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.contact-email:hover .email-arrow { transform: translate(4px, -4px); }

.social-link {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.15rem;
  color: var(--text);
  opacity: 0.65;
  transition: opacity 0.2s, color 0.2s;
}

.social-link:hover {
  opacity: 1;
  color: var(--accent-2);
}

.cv-download {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--text);
  opacity: 0.65;
  transition: opacity 0.2s, color 0.2s;
}
.cv-download:hover { opacity: 1; color: var(--accent); }

.cv-download-text { position: relative; }
.cv-download-text::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0; right: 0;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.cv-download:hover .cv-download-text::after { transform: scaleX(1); }

.cv-download-arrow {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.cv-download:hover .cv-download-arrow { transform: translateY(4px); }

/* ── Responsive ──────────────────────────────────────────────────── */
@media (max-width: 860px) {
  .page-header { padding: 7rem 1.75rem 4rem; }
  .page-section { padding: 4rem 1.75rem; }
  .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
}

@media (max-width: 480px) {
  .page-header { padding: 6rem 1.25rem 3rem; }
  .page-section { padding: 3rem 1.25rem; }
}
</style>
