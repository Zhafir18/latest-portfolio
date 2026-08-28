<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { gsap } from 'gsap'
import { STACK } from '../data/index'
import FooterBar from '../components/FooterBar.vue'

const pageRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context

const categories = computed(() => {
  const map = new Map<string, typeof STACK>()
  STACK.forEach((s) => {
    if (!map.has(s.category)) map.set(s.category, [])
    map.get(s.category)!.push(s)
  })
  return map
})

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from('.page-title .char', {
      yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.04,
    })
    gsap.from('.category-block', {
      scrollTrigger: { trigger: '.stack-categories', start: 'top 80%', once: true },
      opacity: 0, y: 30, duration: 0.8, ease: 'expo.out', stagger: 0.15,
    })
    gsap.from('.stack-row', {
      scrollTrigger: { trigger: '.stack-categories', start: 'top 78%', once: true },
      opacity: 0, x: -16, duration: 0.7, ease: 'expo.out', stagger: 0.06,
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
          <span class="eyebrow-text">Technology</span>
        </div>
        <h1 class="page-title" aria-label="Stack">
          <span class="char-wrap" v-for="(ch, i) in 'STACK.'" :key="i">
            <span class="char">{{ ch }}</span>
          </span>
        </h1>
        <p class="header-sub">
          Tools earned through shipping production systems for government institutions and SOEs.
        </p>
      </div>
    </header>

    <section class="page-section">
      <div class="section-inner">
        <div class="stack-categories">
          <div
            class="category-block"
            v-for="[category, items] in categories"
            :key="category"
          >
            <h2 class="category-name">{{ category }}</h2>
            <ul class="stack-list" role="list">
              <li
                class="stack-row"
                v-for="item in items"
                :key="item.name"
              >
                <span class="row-name">{{ item.name }}</span>
                <span class="row-sep" aria-hidden="true">—</span>
                <span class="row-role">{{ item.role }}</span>
                <span class="row-proficiency" :data-level="item.proficiency">{{ item.proficiency }}</span>
              </li>
            </ul>
          </div>
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

.page-section { padding: 5rem 3rem; }

.section-inner {
  max-width: 1340px;
  margin: 0 auto;
  width: 100%;
}

/* ── Categories ──────────────────────────────────────────────────── */
.stack-categories {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem 6rem;
}

.category-name {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.5rem;
}

/* ── Stack rows ──────────────────────────────────────────────────── */
.stack-list { list-style: none; }

.stack-row {
  display: flex;
  align-items: baseline;
  gap: 1.25rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border);
  transition: padding-left 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.stack-row:first-child { border-top: 1px solid var(--border); }
.stack-row:hover { padding-left: 0.6rem; }

.row-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--text);
  min-width: 110px;
}

.row-sep {
  font-family: var(--font-mono);
  color: var(--accent);
  font-size: 0.8rem;
}

.row-role {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: var(--text);
  opacity: 0.4;
  flex: 1;
}

.row-proficiency {
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0.2rem 0.55rem;
  border: 1px solid currentColor;
  border-radius: 2px;
  flex-shrink: 0;
}

.row-proficiency[data-level='Expert']     { color: var(--accent);   opacity: 0.85; }
.row-proficiency[data-level='Proficient'] { color: var(--accent-2); opacity: 0.75; }
.row-proficiency[data-level='Familiar']   { color: var(--text);     opacity: 0.3;  }

/* ── Responsive ──────────────────────────────────────────────────── */
@media (max-width: 860px) {
  .page-header { padding: 7rem 1.75rem 4rem; }
  .page-section { padding: 4rem 1.75rem; }
  .stack-categories { grid-template-columns: 1fr; gap: 3rem; }
}

@media (max-width: 480px) {
  .page-header { padding: 6rem 1.25rem 3rem; }
  .page-section { padding: 3rem 1.25rem; }
  .stack-row { flex-wrap: wrap; gap: 0.5rem 1rem; }
  .row-role { width: 100%; order: 3; }
}
</style>
