import { useLayoutEffect, useRef } from "react"
import { gsap, prefersReducedMotion } from "@/hooks/useMotion"
import { Button } from "@/components/ui/Button"

/**
 * The focal moment: the mark is pressed into the page, the title slides up
 * line by line, and on a desktop pointer the medallion tilts toward the
 * cursor while its shading moves the other way, as if the light were fixed.
 */
export function Hero() {
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const sealRef = useRef<HTMLDivElement>(null)
  const shadeRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const stage = stageRef.current
    const seal = sealRef.current
    const shade = shadeRef.current
    if (!stage || !seal || !shade) return

    const mm = gsap.matchMedia()

    const ctx = gsap.context(() => {
      // Start state is set here, not in CSS: if this never runs, the hero is
      // simply visible rather than stuck invisible behind a motion gate.
      gsap.set(".hero-title .word", { yPercent: 115 })
      gsap.set(".hero-anim", { opacity: 0 })

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } })
      intro
        .fromTo(
          seal,
          { opacity: 0, rotateX: -58, y: -46, scale: 0.9 },
          { opacity: 1, rotateX: 0, y: 0, scale: 1, duration: 1.15, ease: "expo.out" }
        )
        .fromTo(
          ".seal-glow",
          { opacity: 0, scale: 0.82 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
          "<"
        )
        .to(
          ".hero-title .word",
          { yPercent: 0, duration: 1, stagger: 0.075, ease: "expo.out" },
          "-=0.85"
        )
        .to(".hero-eyebrow.hero-anim", { opacity: 1, duration: 0.7 }, "-=0.9")
        .to(".hero-sub.hero-anim", { opacity: 1, duration: 0.7 }, "-=0.6")
        .to(".hero-cta.hero-anim", { opacity: 1, duration: 0.7 }, "-=0.55")

      mm.add(
        "(min-width:1025px) and (hover:hover) and (pointer:fine)",
        () => {
          const rY = gsap.quickTo(seal, "rotateY", { duration: 0.75, ease: "power3" })
          const rX = gsap.quickTo(seal, "rotateX", { duration: 0.75, ease: "power3" })
          const sX = gsap.quickTo(shade, "xPercent", { duration: 0.9, ease: "power3" })
          const sY = gsap.quickTo(shade, "yPercent", { duration: 0.9, ease: "power3" })
          const clamp = gsap.utils.clamp(-1, 1)

          const onMove = (e: MouseEvent) => {
            const r = stage.getBoundingClientRect()
            const dx = clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2))
            const dy = clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2))
            rY(dx * 9)
            rX(dy * -9)
            // Light stays put, so the shading drifts against the tilt.
            sX(dx * -7)
            sY(dy * -7)
          }

          const attach = () =>
            window.addEventListener("mousemove", onMove, { passive: true })
          // Don't fight the intro; start tracking once it has landed.
          if (intro.progress() < 1) intro.eventCallback("onComplete", attach)
          else attach()

          return () => window.removeEventListener("mousemove", onMove)
        }
      )
    }, rootRef)

    return () => {
      mm.revert()
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="home"
      ref={rootRef}
      className="grid min-h-0 grid-cols-1 overflow-hidden pt-[8.5rem] lg:min-h-screen lg:grid-cols-2 lg:pt-36"
    >
      <div className="flex flex-col justify-center px-6 pt-12 pb-8 lg:py-14 lg:pr-20 lg:pl-24">
        <span className="hero-eyebrow hero-anim">
          Beauty Studio &nbsp;&middot;&nbsp; Belleville, NJ
        </span>

        <h1 className="hero-title mb-8 font-serif text-[2.8rem] leading-[1.06] font-medium tracking-[-0.015em] text-ink lg:text-[clamp(2.9rem,4.7vw,5.9rem)]">
          <span className="line">
            <span className="word">Skin</span> <span className="word">&amp;</span>{" "}
            <span className="word">body</span>
          </span>
          <span className="line">
            <span className="word">care,</span>{" "}
            <span className="word">
              <em>refined</em>
            </span>
          </span>
        </h1>

        <p className="hero-sub hero-anim mb-14 max-w-full text-[0.84rem] leading-[1.9] tracking-[0.02em] text-taupe lg:max-w-[360px] lg:text-[0.88rem]">
          Divine Daughters Studio is Alexandra and Steffany &mdash; a licensed
          esthetician and a licensed massage therapist, dedicated to helping you
          look and feel your absolute best.
        </p>

        <div className="hero-cta hero-anim flex items-center gap-8">
          <Button href="#booking" variant="primary" size="lg">
            Book a Session
          </Button>
          <Button href="#services" variant="ghost" size="md">
            View Services
          </Button>
        </div>
      </div>

      <div className="relative min-h-[78vw] overflow-hidden bg-warm lg:min-h-0">
        <div
          ref={stageRef}
          className="absolute inset-0 grid place-items-center"
          style={{ perspective: "1000px" }}
        >
          <div
            aria-hidden="true"
            className="seal-glow pointer-events-none absolute aspect-square w-[86%] rounded-full"
          />
          <div
            ref={sealRef}
            className="seal-tilt relative aspect-square w-[min(64%,430px)]"
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
          >
            <img
              src="/images/logo.png"
              alt="Divine Daughters Studio"
              className="seal-img block h-full w-full rounded-full"
            />
            <div
              ref={shadeRef}
              aria-hidden="true"
              className="seal-shade pointer-events-none absolute inset-0 rounded-full"
              style={{ willChange: "transform" }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
