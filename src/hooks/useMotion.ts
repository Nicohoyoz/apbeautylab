import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

/**
 * Smooth scroll, driven off GSAP's ticker so scrubbed timelines stay in sync.
 * Also routes in-page anchors through Lenis.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    const onScroll = () => ScrollTrigger.update()
    lenis.on("scroll", onScroll)
    const raf = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const onAnchorClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute("href")
      if (!id || id.length < 2) return
      const target = document.querySelector(id)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target as HTMLElement, { offset: -96 })
    }
    document.addEventListener("click", onAnchorClick)

    return () => {
      document.removeEventListener("click", onAnchorClick)
      gsap.ticker.remove(raf)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
    }
  }, [])
}

/**
 * The motion gate: elements are hidden only while motion can run.
 * If anything throws, the gate lifts and every section is shown.
 */
export function useMotionGate() {
  useEffect(() => {
    const root = document.documentElement
    if (prefersReducedMotion()) {
      root.classList.remove("motion")
      return
    }
    root.classList.add("motion")
    return () => root.classList.remove("motion")
  }, [])
}

/** Reveal-on-scroll for elements carrying .reveal / .reveal-left / .reveal-right */
export function useReveals(deps: unknown[] = []) {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const els = gsap.utils.toArray<HTMLElement>(
      ".reveal, .reveal-left, .reveal-right"
    )
    const triggers = els.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => el.classList.add("visible"),
      })
    )
    // Anything already on screen at mount should not wait for a scroll.
    els.forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add("visible")
    })
    ScrollTrigger.refresh()
    return () => triggers.forEach((t) => t.kill())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/** Magnetic pull toward the cursor. Desktop pointers only. */
export function useMagnetic(selector: string) {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const mm = gsap.matchMedia()
    mm.add("(min-width:1025px) and (hover:hover) and (pointer:fine)", () => {
      const els = gsap.utils.toArray<HTMLElement>(selector)
      const teardown: Array<() => void> = []
      els.forEach((el) => {
        let box: DOMRect | null = null
        const qx = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" })
        const qy = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" })
        const enter = () => (box = el.getBoundingClientRect())
        const move = (e: MouseEvent) => {
          if (!box) return
          qx((e.clientX - (box.left + box.width / 2)) * 0.28)
          qy((e.clientY - (box.top + box.height / 2)) * 0.38)
        }
        const leave = () => {
          box = null
          qx(0)
          qy(0)
        }
        el.addEventListener("mouseenter", enter)
        el.addEventListener("mousemove", move)
        el.addEventListener("mouseleave", leave)
        teardown.push(() => {
          el.removeEventListener("mouseenter", enter)
          el.removeEventListener("mousemove", move)
          el.removeEventListener("mouseleave", leave)
          gsap.set(el, { x: 0, y: 0 })
        })
      })
      return () => teardown.forEach((f) => f())
    })
    return () => mm.revert()
  }, [selector])
}

export { gsap, ScrollTrigger }
