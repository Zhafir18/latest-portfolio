<script setup lang="ts">
defineProps<{ slug: string }>()
</script>

<template>
  <div class="pv" aria-hidden="true">

    <!-- SiPenarik — E-Signature flow -->
    <svg v-if="slug === 'sipenarik'" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Dot grid bg -->
      <g class="v-bg" fill="#E8F4F0">
        <circle cx="40"  cy="32"  r="1"/><circle cx="100" cy="32"  r="1"/><circle cx="160" cy="32"  r="1"/>
        <circle cx="220" cy="32"  r="1"/><circle cx="280" cy="32"  r="1"/><circle cx="340" cy="32"  r="1"/>
        <circle cx="40"  cy="80"  r="1"/><circle cx="100" cy="80"  r="1"/><circle cx="160" cy="80"  r="1"/>
        <circle cx="220" cy="80"  r="1"/><circle cx="280" cy="80"  r="1"/><circle cx="340" cy="80"  r="1"/>
        <circle cx="40"  cy="128" r="1"/><circle cx="100" cy="128" r="1"/><circle cx="160" cy="128" r="1"/>
        <circle cx="220" cy="128" r="1"/><circle cx="280" cy="128" r="1"/><circle cx="340" cy="128" r="1"/>
      </g>
      <!-- Baseline -->
      <line x1="32" y1="126" x2="368" y2="126"
            class="v-line" stroke="#2DD4BF" stroke-width="0.75"/>
      <!-- Signature curve -->
      <path d="M 34,106 C 58,68 76,122 104,86 C 132,50 150,102 176,72 C 202,42 224,86 250,64 C 276,42 312,82 366,54"
            class="v-line" stroke="#FF6B35" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"
            style="transition-delay:0.1s"/>
      <!-- Anchor dots -->
      <circle cx="34"  cy="106" r="3.5" class="v-dot" fill="#FF6B35"  style="transition-delay:0.55s"/>
      <circle cx="176" cy="72"  r="3"   class="v-dot" fill="#2DD4BF"  style="transition-delay:0.65s"/>
      <circle cx="366" cy="54"  r="3.5" class="v-dot" fill="#FF6B35"  style="transition-delay:0.75s"/>
      <!-- Pen tip -->
      <line x1="356" y1="43" x2="366" y2="54" class="v-line" stroke="#FF6B35" stroke-width="1.25"
            style="transition-delay:0.85s"/>
    </svg>

    <!-- Gaspro — Asset tracking / map -->
    <svg v-else-if="slug === 'gaspro'" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Grid bg -->
      <g class="v-bg" stroke="#E8F4F0" stroke-width="0.5">
        <line x1="0" y1="53"  x2="400" y2="53"/>
        <line x1="0" y1="106" x2="400" y2="106"/>
        <line x1="133" y1="0" x2="133" y2="160"/>
        <line x1="266" y1="0" x2="266" y2="160"/>
      </g>
      <!-- Connection lines -->
      <line x1="86"  y1="118" x2="206" y2="52"  class="v-line" stroke="#FF6B35" stroke-width="1"/>
      <line x1="206" y1="52"  x2="318" y2="98"  class="v-line" stroke="#FF6B35" stroke-width="1"    style="transition-delay:0.08s"/>
      <line x1="206" y1="52"  x2="272" y2="132" class="v-line" stroke="#2DD4BF" stroke-width="0.75" style="transition-delay:0.14s"/>
      <!-- Crosshair on main pin -->
      <line x1="184" y1="52" x2="228" y2="52" class="v-fade" stroke="#FF6B35" stroke-width="0.75" stroke-dasharray="3 3" style="transition-delay:0.38s"/>
      <line x1="206" y1="30" x2="206" y2="74" class="v-fade" stroke="#FF6B35" stroke-width="0.75" stroke-dasharray="3 3" style="transition-delay:0.38s"/>
      <!-- Pin rings -->
      <circle cx="86"  cy="118" r="6"   class="v-fade" stroke="#FF6B35" stroke-width="1.5" style="transition-delay:0.48s"/>
      <circle cx="206" cy="52"  r="8.5" class="v-fade" stroke="#FF6B35" stroke-width="1.5" style="transition-delay:0.48s"/>
      <circle cx="318" cy="98"  r="5.5" class="v-fade" stroke="#2DD4BF" stroke-width="1.5" style="transition-delay:0.52s"/>
      <circle cx="272" cy="132" r="4"   class="v-fade" stroke="#2DD4BF" stroke-width="1"   style="transition-delay:0.52s"/>
      <!-- Pin dots -->
      <circle cx="86"  cy="118" r="2.5" class="v-dot" fill="#FF6B35" style="transition-delay:0.6s"/>
      <circle cx="206" cy="52"  r="3"   class="v-dot" fill="#FF6B35" style="transition-delay:0.6s"/>
      <circle cx="318" cy="98"  r="2"   class="v-dot" fill="#2DD4BF" style="transition-delay:0.64s"/>
      <circle cx="272" cy="132" r="1.75" class="v-dot" fill="#2DD4BF" style="transition-delay:0.64s"/>
    </svg>

    <!-- PLN Properti — Property / architectural plan -->
    <svg v-else-if="slug === 'pln-properti'" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Main building -->
      <rect x="28"  y="28" width="134" height="108" class="v-fade" stroke="#FF6B35" stroke-width="1.5"/>
      <!-- Interior partitions -->
      <line x1="28"  y1="82" x2="162" y2="82" class="v-line" stroke="#FF6B35" stroke-width="0.75" style="transition-delay:0.1s"/>
      <line x1="95"  y1="28" x2="95"  y2="136" class="v-line" stroke="#FF6B35" stroke-width="0.75" style="transition-delay:0.16s"/>
      <!-- Door -->
      <line x1="72" y1="136" x2="118" y2="136" class="v-line" stroke="#FF6B35" stroke-width="2.5" style="transition-delay:0.26s"/>
      <!-- Building 2 -->
      <rect x="192" y="48" width="90" height="72" class="v-fade" stroke="#2DD4BF" stroke-width="1.5" style="transition-delay:0.18s"/>
      <line x1="192" y1="84" x2="282" y2="84" class="v-line" stroke="#2DD4BF" stroke-width="0.75" style="transition-delay:0.32s"/>
      <!-- Building 3 -->
      <rect x="312" y="68" width="60" height="52" class="v-fade" stroke="#2DD4BF" stroke-width="1" style="transition-delay:0.32s"/>
      <!-- Street dashes -->
      <line x1="162" y1="100" x2="192" y2="96" class="v-fade" stroke="#E8F4F0" stroke-width="0.5" stroke-dasharray="3 3" style="transition-delay:0.48s"/>
      <line x1="282" y1="92"  x2="312" y2="92" class="v-fade" stroke="#E8F4F0" stroke-width="0.5" stroke-dasharray="3 3" style="transition-delay:0.48s"/>
      <!-- Location pin -->
      <circle cx="95" cy="20" r="7.5" class="v-fade" stroke="#FF6B35" stroke-width="1.5" style="transition-delay:0.58s"/>
      <circle cx="95" cy="20" r="2.5" class="v-dot"  fill="#FF6B35" style="transition-delay:0.64s"/>
    </svg>

    <!-- Portal Sekper — SSO / security network -->
    <svg v-else-if="slug === 'portal-sekper'" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Connection lines (draw first, so shapes appear on top) -->
      <line x1="164" y1="64" x2="104" y2="54"  class="v-line" stroke="#2DD4BF" stroke-width="0.75" style="transition-delay:0.18s"/>
      <line x1="236" y1="64" x2="296" y2="54"  class="v-line" stroke="#2DD4BF" stroke-width="0.75" style="transition-delay:0.18s"/>
      <line x1="180" y1="100" x2="104" y2="110" class="v-line" stroke="#2DD4BF" stroke-width="0.75" style="transition-delay:0.22s"/>
      <line x1="220" y1="100" x2="296" y2="110" class="v-line" stroke="#2DD4BF" stroke-width="0.75" style="transition-delay:0.22s"/>
      <!-- Satellite hexagons -->
      <polygon points="70,38 92,51 92,75 70,88 48,75 48,51"   class="v-fade" stroke="#2DD4BF" stroke-width="1"    style="transition-delay:0.38s"/>
      <polygon points="330,38 352,51 352,75 330,88 308,75 308,51" class="v-fade" stroke="#2DD4BF" stroke-width="1" style="transition-delay:0.38s"/>
      <polygon points="70,100 92,113 92,137 70,150 48,137 48,113"  class="v-fade" stroke="#2DD4BF" stroke-width="0.75" style="transition-delay:0.42s"/>
      <polygon points="330,100 352,113 352,137 330,150 308,137 308,113" class="v-fade" stroke="#2DD4BF" stroke-width="0.75" style="transition-delay:0.42s"/>
      <!-- Central hexagon outer -->
      <polygon points="200,22 237,43 237,85 200,106 163,85 163,43" class="v-fade" stroke="#FF6B35" stroke-width="1.5"/>
      <!-- Central hexagon inner -->
      <polygon points="200,40 220,51 220,73 200,84 180,73 180,51" class="v-fade" stroke="#FF6B35" stroke-width="0.75" style="transition-delay:0.14s"/>
      <!-- Lock body -->
      <rect x="192" y="55" width="16" height="13" rx="2" class="v-fade" stroke="#FF6B35" stroke-width="1" style="transition-delay:0.28s"/>
      <!-- Lock shackle -->
      <path d="M195,55 C195,49 205,49 205,55" class="v-line" stroke="#FF6B35" stroke-width="1" style="transition-delay:0.32s"/>
      <!-- Center dot -->
      <circle cx="200" cy="62" r="2" class="v-dot" fill="#FF6B35" style="transition-delay:0.5s"/>
      <!-- Satellite dots -->
      <circle cx="70"  cy="63" r="2" class="v-dot" fill="#2DD4BF" style="transition-delay:0.56s"/>
      <circle cx="330" cy="63" r="2" class="v-dot" fill="#2DD4BF" style="transition-delay:0.56s"/>
    </svg>

    <!-- DAMS — Digital asset / file management -->
    <svg v-else-if="slug === 'dams'" viewBox="0 0 400 160" fill="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Layer 3 (bottom) -->
      <rect x="72"  y="108" width="230" height="28" rx="2" class="v-fade" stroke="#2DD4BF" stroke-width="1"    style="transition-delay:0.28s"/>
      <!-- Layer 2 -->
      <rect x="60"  y="82"  width="230" height="28" rx="2" class="v-fade" stroke="#2DD4BF" stroke-width="1.25" style="transition-delay:0.14s"/>
      <!-- Layer 1 (active) -->
      <rect x="48"  y="56"  width="230" height="28" rx="2" class="v-fade" stroke="#FF6B35" stroke-width="1.5"/>
      <!-- File icon -->
      <rect x="56"  y="60" width="14" height="18" rx="1" class="v-fade" stroke="#FF6B35" stroke-width="1" style="transition-delay:0.08s"/>
      <polyline points="63,60 63,67 70,67" class="v-line" stroke="#FF6B35" stroke-width="0.75" style="transition-delay:0.12s"/>
      <!-- Progress fill -->
      <line x1="78" y1="68" x2="190" y2="68" class="v-line" stroke="#FF6B35" stroke-width="2.5" style="transition-delay:0.22s"/>
      <!-- Progress trail dots -->
      <circle cx="200" cy="68" r="2.5" class="v-dot" fill="#FF6B35" style="transition-delay:0.65s"/>
      <circle cx="211" cy="68" r="1.75" class="v-dot" fill="#FF6B35" style="transition-delay:0.7s"/>
      <circle cx="220" cy="68" r="1.25" class="v-dot" fill="#FF6B35" style="transition-delay:0.75s"/>
      <!-- Upload arrow shaft -->
      <line x1="342" y1="136" x2="342" y2="42" class="v-line" stroke="#2DD4BF" stroke-width="1.5" style="transition-delay:0.38s"/>
      <!-- Upload arrow head -->
      <polyline points="331,58 342,42 353,58" class="v-fade" stroke="#2DD4BF" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round" style="transition-delay:0.54s"/>
    </svg>

  </div>
</template>

<style scoped>
.pv {
  width: 100%;
  height: 160px;
  overflow: hidden;
  border-bottom: 1px solid var(--border);
  position: relative;
  flex-shrink: 0;
}

.pv svg {
  width: 100%;
  height: 100%;
}

/* ── Always-visible background elements ──────────────────────────── */
.v-bg { opacity: 0.07; }

/* ── Draw animation (stroke-dashoffset) ──────────────────────────── */
.v-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  opacity: 0;
  transition:
    stroke-dashoffset 0.85s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.3s ease;
}

/* ── Fade animation (opacity only) ───────────────────────────────── */
.v-fade {
  opacity: 0;
  transition: opacity 0.55s ease;
}

/* ── Dot animation ───────────────────────────────────────────────── */
.v-dot {
  opacity: 0;
  transition: opacity 0.4s ease;
}
</style>
