const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ01#@'

export function scrambleText(el: HTMLElement, finalText: string, duration = 680): void {
  let startTime: number | null = null

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp
    const progress = Math.min((timestamp - startTime) / duration, 1)
    const revealed = Math.floor(progress * finalText.length)

    el.textContent = finalText
      .split('')
      .map((ch, i) => {
        if (ch === ' ') return ' '
        if (i < revealed) return ch
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      })
      .join('')

    if (progress < 1) requestAnimationFrame(step)
    else el.textContent = finalText
  }

  requestAnimationFrame(step)
}
