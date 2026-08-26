import { gsap } from 'gsap'

export function applyMagnetic(el: HTMLElement, strength = 0.32): () => void {
  if (window.matchMedia('(pointer: coarse)').matches) return () => {}

  const onMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength
    gsap.to(el, { x: dx, y: dy, duration: 0.35, ease: 'power2.out' })
  }

  const onLeave = () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
  }

  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)

  return () => {
    el.removeEventListener('mousemove', onMove)
    el.removeEventListener('mouseleave', onLeave)
    gsap.set(el, { x: 0, y: 0 })
  }
}
