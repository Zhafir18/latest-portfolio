<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const sectionRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context

const EMAIL = 'm.zhafirghiffari@gmail.com'
const LINKEDIN = 'https://linkedin.com/in/muhammad-zhafir-ghiffari'
const GITHUB = 'https://github.com/Zhafir18'

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.contact-heading', {
      scrollTrigger: {
        trigger: '.contact-heading',
        start: 'top 82%',
        once: true,
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'expo.out',
    })

    gsap.from('.contact-email', {
      scrollTrigger: {
        trigger: '.contact-email',
        start: 'top 88%',
        once: true,
      },
      opacity: 0,
      y: 24,
      duration: 0.9,
      ease: 'expo.out',
      delay: 0.2,
    })

    gsap.from('.contact-footer', {
      scrollTrigger: {
        trigger: '.contact-footer',
        start: 'top 95%',
        once: true,
      },
      opacity: 0,
      duration: 0.8,
      delay: 0.4,
    })
  }, sectionRef.value!)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section id="contact" ref="sectionRef">
    <div class="section-inner">
      <div class="section-label" aria-hidden="true">
        <span class="label-text">Contact</span>
      </div>

      <div class="contact-content">
        <h2 class="contact-heading">
          Got a project?<br />
          <span class="heading-light">Let's build it.</span>
        </h2>

        <a :href="`mailto:${EMAIL}`" class="contact-email">
          <span class="email-text">{{ EMAIL }}</span>
          <span class="email-arrow" aria-hidden="true">↗</span>
        </a>

        <div class="social-links">
          <a :href="LINKEDIN" target="_blank" rel="noopener" class="social-link">LinkedIn</a>
          <span class="social-sep" aria-hidden="true">·</span>
          <a :href="GITHUB" target="_blank" rel="noopener" class="social-link">GitHub</a>
        </div>
      </div>
    </div>

    <footer class="contact-footer">
      <div class="footer-inner">
        <span class="footer-copy">© {{ new Date().getFullYear() }} Muhammad Zhafir Ghiffari</span>
        <span class="footer-built">Built with Vue · Three.js · GSAP</span>
      </div>
    </footer>
  </section>
</template>

<style scoped>
section {
  padding: 7rem 3rem 0;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}

.section-inner {
  max-width: 1340px;
  margin: 0 auto;
  width: 100%;
  padding-bottom: 7rem;
}

.section-label {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 5rem;
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
.contact-content {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

.contact-heading {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(2.5rem, 6vw, 5.5rem);
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--text);
}

.heading-light {
  color: var(--text);
  opacity: 0.35;
}

/* ── Email link ──────────────────────────────────────────────────────── */
.contact-email {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.2rem, 3vw, 2.2rem);
  color: var(--accent);
  position: relative;
  width: fit-content;
}

.email-text {
  position: relative;
}

.email-text::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--ease-expo);
}

.contact-email:hover .email-text::after {
  transform: scaleX(1);
}

.email-arrow {
  font-size: 1.5rem;
  transition: transform 0.3s var(--ease-expo);
}

.contact-email:hover .email-arrow {
  transform: translate(4px, -4px);
}

/* ── Social links ────────────────────────────────────────────────────── */
.social-links {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.social-link {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text);
  opacity: 0.4;
  transition: opacity 0.2s, color 0.2s;
}

.social-link:hover {
  opacity: 1;
  color: var(--accent);
}

.social-sep {
  color: var(--muted);
}

/* ── Footer ──────────────────────────────────────────────────────────── */
.contact-footer {
  border-top: 1px solid var(--border);
  padding: 2rem 0;
}

.footer-inner {
  max-width: 1340px;
  margin: 0 auto;
  padding: 0 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-copy,
.footer-built {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  color: var(--text);
  opacity: 0.25;
}

/* ── Responsive ──────────────────────────────────────────────────────── */
@media (max-width: 640px) {
  section {
    padding: 5rem 1.75rem 0;
  }
  .footer-inner {
    padding: 0 1.75rem;
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
}
</style>
