<script setup lang="ts">
import { PROFILE } from '../data/index'
</script>

<template>
  <footer class="page-footer">
    <div class="footer-inner">
      <span class="footer-copy">© {{ new Date().getFullYear() }} {{ PROFILE.fullName }}</span>
      <span class="footer-built">Built with Vue · Three.js · GSAP</span>
    </div>
  </footer>
</template>

<style scoped>
.page-footer {
  border-top: 1px solid var(--border);
  padding: 2rem 3rem;
}

.footer-inner {
  max-width: 1340px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-copy,
.footer-built {
  font-family: var(--font-mono);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  color: var(--text);
  opacity: 0.25;
}

@media (max-width: 780px) {
  .page-footer { padding: 2rem 1.75rem; }
  .footer-inner { flex-direction: column; gap: 0.5rem; text-align: center; }
}
</style>
