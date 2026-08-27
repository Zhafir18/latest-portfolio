import { ref, watch } from 'vue'

type Theme = 'dark' | 'light'

const stored = (typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null) as Theme | null
const theme = ref<Theme>(stored ?? 'dark')

function applyFavicon(val: Theme) {
  const el = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (el) el.href = val === 'light' ? '/favicon-light.png' : '/favicon-dark.png'
}

document.documentElement.setAttribute('data-theme', theme.value)
applyFavicon(theme.value)

watch(theme, (val) => {
  document.documentElement.setAttribute('data-theme', val)
  localStorage.setItem('theme', val)
  applyFavicon(val)
})

export function useTheme() {
  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  return { theme, toggle }
}
