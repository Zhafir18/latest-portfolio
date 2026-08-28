<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import * as THREE from 'three'
import { PROFILE } from '../data/index'
import { applyMagnetic } from '../composables/useMagnetic'
import { scrambleText } from '../composables/useScramble'

const heroRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const nameRef = ref<HTMLElement | null>(null)
const NAME = PROFILE.displayName
const ROLE = `${PROFILE.role} · ${PROFILE.location}`

let cleanupThree: (() => void) | undefined
let gsapCtx: gsap.Context | undefined
const cleanupFns: Array<() => void> = []

// ── Three.js scene ────────────────────────────────────────────────────────────

function initThree(): () => void {
  const canvas = canvasRef.value!
  const container = canvas.parentElement!

  const getSize = () => ({
    w: container.clientWidth || 480,
    h: container.clientHeight || 480,
  })

  const { w, h } = getSize()

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
  camera.position.z = 5

  // Geodesic gem — octahedron subdivided twice
  const geometry = new THREE.OctahedronGeometry(1.5, 2)
  const edges = new THREE.EdgesGeometry(geometry)
  const lineMat = new THREE.LineBasicMaterial({ color: 0xff6b35 })
  const wireframe = new THREE.LineSegments(edges, lineMat)
  scene.add(wireframe)

  // Inner ghost — same shape, very faint teal fill
  const innerGeo = new THREE.OctahedronGeometry(1.25, 2)
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x2dd4bf,
    transparent: true,
    opacity: 0.045,
  })
  const innerMesh = new THREE.Mesh(innerGeo, innerMat)
  scene.add(innerMesh)

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setSize(w, h)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0, 0)

  // Resize
  const ro = new ResizeObserver(() => {
    const { w: nw, h: nh } = getSize()
    if (nw === 0 || nh === 0) return
    camera.aspect = nw / nh
    camera.updateProjectionMatrix()
    renderer.setSize(nw, nh)
  })
  ro.observe(container)

  // Mouse parallax — accumulate target, lerp in tick
  let targetX = 0
  let targetY = 0
  const onMove = (e: MouseEvent) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 0.6
    targetY = (e.clientY / window.innerHeight - 0.5) * 0.4
  }
  window.addEventListener('mousemove', onMove)

  let raf: number
  const tick = () => {
    wireframe.rotation.y += 0.003
    wireframe.rotation.x += 0.001
    // Lerp toward mouse target (0.05 = slow, smooth parallax)
    wireframe.rotation.y += (targetX - wireframe.rotation.y) * 0.01
    wireframe.rotation.x += (targetY - wireframe.rotation.x) * 0.01
    innerMesh.rotation.copy(wireframe.rotation)
    renderer.render(scene, camera)
    raf = requestAnimationFrame(tick)
  }
  tick()

  return () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    window.removeEventListener('mousemove', onMove)
    renderer.dispose()
    geometry.dispose()
    edges.dispose()
    lineMat.dispose()
    innerGeo.dispose()
    innerMat.dispose()
  }
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

onMounted(() => {
  cleanupThree = initThree()

  const btnPrimary = heroRef.value?.querySelector<HTMLElement>('.btn-primary')
  const btnGhost = heroRef.value?.querySelector<HTMLElement>('.btn-ghost')
  if (btnPrimary) cleanupFns.push(applyMagnetic(btnPrimary, 0.26))
  if (btnGhost) cleanupFns.push(applyMagnetic(btnGhost, 0.26))

  gsapCtx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

    tl.from(
      '.hero-role',
      { opacity: 0, y: 14, duration: 0.9 },
      0,
    )
    tl.from(
      '.hero-first-name',
      { opacity: 0, y: 10, duration: 0.8 },
      0.15,
    )
    tl.add(() => {
      if (nameRef.value) scrambleText(nameRef.value, NAME, 1050)
    }, 0.3)
    tl.from(
      '.hero-bio',
      { opacity: 0, y: 14, duration: 0.9 },
      0.72,
    )
    tl.from(
      '.hero-cta',
      { opacity: 0, y: 14, duration: 0.9 },
      0.88,
    )
    tl.from(
      '.canvas-wrap',
      { opacity: 0, scale: 0.94, duration: 1.4, ease: 'expo.out' },
      0.1,
    )
    tl.from(
      '.scroll-hint',
      { opacity: 0, duration: 1 },
      1.5,
    )
  }, heroRef.value!)
})

onUnmounted(() => {
  gsapCtx?.revert()
  cleanupThree?.()
  cleanupFns.forEach((fn) => fn())
})
</script>

<template>
  <section id="hero" ref="heroRef">
    <div class="hero-bg" aria-hidden="true">
      <div class="orb orb-coral"></div>
      <div class="orb orb-teal"></div>
    </div>
    <div class="hero-inner">
      <!-- Left: text content -->
      <div class="hero-text">
        <div class="hero-role">
          <span class="divider-line" aria-hidden="true"></span>
          <span class="mono-label">{{ ROLE }}</span>
        </div>

        <p class="hero-first-name">Muhammad Zhafir</p>

        <h1 class="hero-name" aria-label="Ghiffari">
          <span class="name-text" ref="nameRef">{{ NAME }}</span>
        </h1>

        <p class="hero-bio">
          Specializing in enterprise-scale frontend architecture
          and backend integration — delivering secure,
          robust systems for government and SOE sectors.
        </p>

        <div class="hero-cta">
          <RouterLink to="/work" class="btn-primary">View work</RouterLink>
          <RouterLink to="/contact" class="btn-ghost">Get in touch<span aria-hidden="true"> →</span></RouterLink>
        </div>
      </div>

      <!-- Right: Three.js canvas -->
      <div class="canvas-wrap" aria-hidden="true">
        <canvas ref="canvasRef"></canvas>
        <span class="canvas-tag">WEBGL · THREE.JS</span>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-hint" aria-hidden="true">
      <span class="scroll-label">scroll</span>
      <div class="scroll-bar"></div>
    </div>
  </section>
</template>

<style scoped>
/* ── Layout ──────────────────────────────────────────────────────── */
#hero {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 7rem 3rem 5rem;
  position: relative;
  overflow: hidden;
}

/* ── Gradient mesh background ────────────────────────────────────── */
.hero-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.orb-coral {
  width: 560px;
  height: 560px;
  background: radial-gradient(circle at center, rgba(255, 107, 53, 0.13), transparent 70%);
  filter: blur(64px);
  top: -180px;
  right: -100px;
  animation: orb-a 15s ease-in-out infinite alternate;
}

.orb-teal {
  width: 440px;
  height: 440px;
  background: radial-gradient(circle at center, rgba(45, 212, 191, 0.09), transparent 70%);
  filter: blur(56px);
  bottom: -60px;
  left: 8%;
  animation: orb-b 19s ease-in-out infinite alternate;
}

@keyframes orb-a {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(-48px, 36px) scale(1.07); }
}

@keyframes orb-b {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(32px, -24px) scale(0.95); }
}

.hero-inner {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 3rem;
  align-items: center;
  max-width: 1340px;
  margin: 0 auto;
  width: 100%;
  position: relative;
  z-index: 1;
}

/* ── Role label ───────────────────────────────────────────────────── */
.hero-role {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.divider-line {
  width: 44px;
  height: 1px;
  background: var(--accent);
  flex-shrink: 0;
}

.mono-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text);
  opacity: 0.45;
}

/* ── First name label ────────────────────────────────────────────── */
.hero-first-name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(0.9rem, 1.4vw, 1.15rem);
  letter-spacing: 0.06em;
  color: var(--text);
  opacity: 0.35;
  margin-bottom: 0.4rem;
}

/* ── Name ────────────────────────────────────────────────────────── */
.hero-name {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: clamp(62px, 8.5vw, 126px);
  line-height: 0.86;
  letter-spacing: -0.03em;
  color: var(--text);
  display: block;
  margin-bottom: 2.25rem;
}

.name-text {
  display: block;
}

/* ── Bio ──────────────────────────────────────────────────────────── */
.hero-bio {
  font-size: clamp(0.95rem, 1.4vw, 1.1rem);
  line-height: 1.75;
  color: var(--text);
  opacity: 0.55;
  margin-bottom: 2.5rem;
  max-width: 38ch;
}

/* ── CTAs ─────────────────────────────────────────────────────────── */
.hero-cta {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  flex-wrap: wrap;
}

.btn-primary {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  background: var(--accent);
  color: var(--ground);
  padding: 0.8rem 1.9rem;
  display: inline-block;
  transition: transform 0.25s var(--ease-expo), box-shadow 0.25s;
}

.btn-primary:hover {
  box-shadow: 0 10px 28px rgba(255, 107, 53, 0.28);
}

.btn-ghost {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  color: var(--text);
  opacity: 0.45;
  transition: opacity 0.2s;
}

.btn-ghost:hover {
  opacity: 1;
}

/* ── Three.js canvas ─────────────────────────────────────────────── */
.canvas-wrap {
  position: relative;
  width: 100%;
  max-width: 520px;
  aspect-ratio: 1 / 1;
  justify-self: center;
}

.canvas-wrap canvas {
  position: absolute;
  top: 0;
  left: 0;
}

.canvas-tag {
  position: absolute;
  bottom: 1rem;
  right: 0.25rem;
  font-family: var(--font-mono);
  font-size: 0.58rem;
  letter-spacing: 0.2em;
  color: var(--text);
  opacity: 0.15;
}

/* ── Scroll hint ─────────────────────────────────────────────────── */
.scroll-hint {
  position: absolute;
  bottom: 2.5rem;
  left: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  z-index: 1;
}

.scroll-label {
  font-family: var(--font-mono);
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text);
  opacity: 0.25;
  writing-mode: vertical-rl;
}

.scroll-bar {
  width: 1px;
  height: 56px;
  background: linear-gradient(to bottom, var(--accent), transparent);
  animation: pulse-down 2.2s ease-in-out infinite;
}

@keyframes pulse-down {
  0%, 100% { opacity: 0.35; transform: scaleY(1) translateY(0); }
  50%       { opacity: 0.9;  transform: scaleY(0.75) translateY(6px); }
}

/* ── Responsive ──────────────────────────────────────────────────── */
@media (max-width: 900px) {
  #hero {
    padding: 6rem 1.75rem 4rem;
  }
  .hero-inner {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .canvas-wrap {
    max-width: 300px;
    order: -1;
    justify-self: start;
    margin-bottom: -1rem;
  }
  .scroll-hint {
    left: 1.75rem;
  }
}

@media (max-width: 480px) {
  #hero { padding: 5.5rem 1.25rem 3.5rem; }
  .hero-name { font-size: clamp(42px, 11.5vw, 68px); }
  .scroll-hint { left: 1.25rem; }
}
</style>
