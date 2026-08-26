import { ref, watch } from 'vue'

type Theme = 'dark' | 'light'

const stored = (typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null) as Theme | null
const theme = ref<Theme>(stored ?? 'dark')

document.documentElement.setAttribute('data-theme', theme.value)

watch(theme, (val) => {
  document.documentElement.setAttribute('data-theme', val)
  localStorage.setItem('theme', val)
})

export function useTheme() {
  function toggle() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  return { theme, toggle }
}
