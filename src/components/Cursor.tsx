import { useEffect, useRef } from "react"
import { prefersReducedMotion } from "@/hooks/useMotion"

/** The two-part custom cursor carried over from the original site. */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0, frame = 0
    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      dot.style.left = `${mx}px`
      dot.style.top = `${my}px`
      dot.style.opacity = "1"
      ring.style.opacity = "1"
    }
    const loop = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = `${rx}px`
      ring.style.top = `${ry}px`
      frame = requestAnimationFrame(loop)
    }
    const grow = () => {
      dot.style.transform = "translate(-50%,-50%) scale(2)"
      ring.style.transform = "translate(-50%,-50%) scale(1.5)"
      ring.style.borderColor = "rgba(166,124,82,.55)"
    }
    const shrink = () => {
      dot.style.transform = "translate(-50%,-50%)"
      ring.style.transform = "translate(-50%,-50%)"
      ring.style.borderColor = "rgba(61,48,39,.35)"
    }
    document.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseover", (e) => {
      if ((e.target as HTMLElement)?.closest?.("a,button,[data-cursor-grow]")) grow()
    })
    document.addEventListener("mouseout", (e) => {
      if ((e.target as HTMLElement)?.closest?.("a,button,[data-cursor-grow]")) shrink()
    })
    frame = requestAnimationFrame(loop)
    return () => {
      document.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground opacity-0 transition-transform duration-100 max-[1024px]:hidden"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-foreground/35 opacity-0 transition-[transform,border-color] duration-200 max-[1024px]:hidden"
      />
    </>
  )
}
