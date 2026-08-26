<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const sectionRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context

const projects = [
  {
    id: '01',
    title: 'SiPenarik',
    subtitle: 'Electronic Signature System',
    desc: 'Designed and developed an electronic signature system for secure document approval at the Secretariat General of DPR RI. Digitized manual processes, improving workflow efficiency.',
    tags: ['Laravel', 'MVC', 'e-Signature'],
    link: '#',
  },
  {
    id: '02',
    title: 'Gaspro',
    subtitle: 'PLN Asset Tracking',
    desc: 'Developed an application to document and manage PLN property assets. Enabled users to visualize and manage property assets directly on an interactive map interface.',
    tags: ['AngularJS', 'REST API', 'Interactive Maps'],
    link: '#',
  },
  {
    id: '03',
    title: 'PLN Properti',
    subtitle: 'Property Rental Portal',
    desc: 'Built a web application for managing property rentals. Upgraded mapping capabilities with OpenLayers and OSM. Implemented SSR for superior performance.',
    tags: ['AngularJS', 'OpenLayers', 'OWASP', 'SSR'],
    link: '#',
  },
  {
    id: '04',
    title: 'Portal Sekper',
    subtitle: 'Centralized Access Portal',
    desc: "Built a Single Sign-On (SSO) portal to centralize access to multiple internal applications within PLN's Communication Division.",
    tags: ['Vue.js', 'SSO', 'OWASP', 'Auth'],
    link: '#',
  },
  {
    id: '05',
    title: 'DAMS',
    subtitle: 'Digital Asset Management',
    desc: 'Developed a system enabling users to upload and manage files. Implemented chunked file upload for handling large media files reliably.',
    tags: ['Vue.js', 'Chunked Upload', 'Media Storage'],
    link: '#',
  },
]

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.project-card', {
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
        once: true,
      },
      opacity: 0,
      y: 48,
      duration: 0.9,
      ease: 'expo.out',
      stagger: 0.14,
    })
  }, sectionRef.value!)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section id="work" ref="sectionRef">
    <div class="section-inner">
      <div class="section-label" aria-hidden="true">
        <span class="label-text">Selected Work</span>
      </div>

      <div class="projects-grid">
        <article
          class="project-card"
          v-for="p in projects"
          :key="p.id"
        >
          <div class="card-top">
            <span class="card-num" aria-hidden="true">{{ p.id }}</span>
            <a :href="p.link" class="card-link" aria-label="View {{ p.title }}">
              <span class="link-arrow">↗</span>
            </a>
          </div>

          <div class="card-title-group">
            <h3 class="card-title">{{ p.title }}</h3>
            <span class="card-subtitle">{{ p.subtitle }}</span>
          </div>
          <p class="card-desc">{{ p.desc }}</p>

          <div class="card-tags">
            <span class="tag" v-for="t in p.tags" :key="t">{{ t }}</span>
          </div>
        </article>
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

/* ── Grid ─────────────────────────────────────────────────────────────── */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
}

/* Last item spans to center when 5 total (3+2) */
.project-card:nth-child(5):nth-last-child(1) {
  grid-column: 2 / 3;
}

/* ── Card ─────────────────────────────────────────────────────────────── */
.project-card {
  background: var(--surface);
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 2px solid transparent;
  transition: border-color 0.3s;
  cursor: default;
}

.project-card:hover {
  border-top-color: var(--accent);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}

.card-num {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  color: var(--text);
  opacity: 0.2;
}

.card-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--border);
  color: var(--text);
  opacity: 0.3;
  font-size: 1rem;
  transition: opacity 0.2s, border-color 0.2s, color 0.2s;
  border-radius: 50%;
}

.project-card:hover .card-link {
  opacity: 1;
  border-color: var(--accent);
  color: var(--accent);
}

.card-title-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.card-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.5rem;
  line-height: 1.2;
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

/* ── Tags ─────────────────────────────────────────────────────────────── */
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

/* ── Responsive ───────────────────────────────────────────────────────── */
@media (max-width: 900px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  section {
    padding: 5rem 1.75rem;
  }
}

@media (min-width: 901px) and (max-width: 1100px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
