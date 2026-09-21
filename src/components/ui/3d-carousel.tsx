"use client"

import { memo, useCallback, useEffect, useRef, useState } from "react"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import {
  AnimatePresence,
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion"

export interface CarouselImage {
  src: string
  alt: string
}

const duration = 0.15
const transition = { duration, ease: [0.32, 0.72, 0, 1] as const }
const transitionOverlay = { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }

/** Degrees per second of unattended drift. One card passes every ~3s. */
const DRIFT_SPEED = 7

const Carousel = memo(
  ({
    handleClick,
    rotation,
    cards,
    isCarouselActive,
    onDragStateChange,
    onHoverChange,
  }: {
    handleClick: (image: CarouselImage) => void
    rotation: MotionValue<number>
    cards: CarouselImage[]
    isCarouselActive: boolean
    onDragStateChange: (dragging: boolean) => void
    onHoverChange: (hovering: boolean) => void
  }) => {
    const isScreenSizeSm = useMediaQuery("(max-width: 640px)")
    // Sized so the front card reads at a usable width once perspective scales
    // it: ~170px on a phone rather than the ~98px the original geometry gave.
    const cylinderWidth = isScreenSizeSm ? 2000 : 2600
    const faceCount = cards.length
    const faceWidth = cylinderWidth / faceCount
    const radius = cylinderWidth / (2 * Math.PI)
    const transform = useTransform(
      rotation,
      (value) => `rotate3d(0, 1, 0, ${value}deg)`
    )

    return (
      <div
        className="flex h-full items-center justify-center"
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <motion.div
          drag={isCarouselActive ? "x" : false}
          dragMomentum={false}
          className="relative flex h-full origin-center justify-center"
          style={{
            transform,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
            cursor: isCarouselActive ? "grab" : "default",
          }}
          onHoverStart={() => onHoverChange(true)}
          onHoverEnd={() => onHoverChange(false)}
          onDragStart={() => onDragStateChange(true)}
          onDrag={(_, info) =>
            isCarouselActive && rotation.set(rotation.get() + info.offset.x * 0.05)
          }
          onDragEnd={(_, info) => {
            // Let the throw carry, then hand control back to the drift.
            animate(rotation, rotation.get() + info.velocity.x * 0.05, {
              type: "spring",
              stiffness: 100,
              damping: 30,
              mass: 0.1,
              onComplete: () => onDragStateChange(false),
            })
          }}
        >
          {cards.map((card, i) => (
            <motion.div
              key={`key-${card.src}-${i}`}
              className="absolute flex h-full origin-center items-center justify-center p-2"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${
                  i * (360 / faceCount)
                }deg) translateZ(${radius}px)`,
              }}
              onClick={() => handleClick(card)}
            >
              <motion.img
                src={card.src}
                alt={card.alt}
                layoutId={`img-${card.src}`}
                /* 3:4 keeps faces and before/after pairs intact */
                className="pointer-events-none w-full aspect-[3/4] rounded-[var(--radius)] object-cover object-top shadow-[0_18px_40px_-18px_rgba(61,48,39,0.55)]"
                initial={{ filter: "blur(4px)" }}
                layout="position"
                animate={{ filter: "blur(0px)" }}
                transition={transition}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    )
  }
)
Carousel.displayName = "Carousel"

function ThreeDPhotoCarousel({ images }: { images: CarouselImage[] }) {
  const [activeImg, setActiveImg] = useState<CarouselImage | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const rotation = useMotionValue(0)
  const reduceMotion = useReducedMotion()

  // Refs, not state: the drift loop reads these every frame.
  const isDragging = useRef(false)
  const isHovering = useRef(false)

  /**
   * Unattended drift. Runs off the frame clock rather than a keyframe
   * animation, so dragging can take the wheel mid-rotation and give it back
   * without the two ever fighting over the same motion value.
   */
  useAnimationFrame((_, delta) => {
    if (reduceMotion) return
    if (!isCarouselActive || isDragging.current || isHovering.current) return
    // Guard against the big delta a backgrounded tab hands back on return.
    const step = Math.min(delta, 64) / 1000
    rotation.set(rotation.get() - step * DRIFT_SPEED)
  })

  const handleClick = useCallback((image: CarouselImage) => {
    setActiveImg(image)
    setIsCarouselActive(false)
  }, [])

  const handleClose = useCallback(() => {
    setActiveImg(null)
    setIsCarouselActive(true)
  }, [])

  // Escape closes the expanded view.
  useEffect(() => {
    if (!activeImg) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && handleClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [activeImg, handleClose])

  return (
    <motion.div layout className="relative">
      <AnimatePresence mode="sync">
        {activeImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            layoutId={`img-container-${activeImg.src}`}
            layout="position"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-label={activeImg.alt}
            data-cursor-invert
            className="fixed inset-0 z-[120] flex items-center justify-center bg-foreground/70 p-6 backdrop-blur-sm md:p-16"
            style={{ willChange: "opacity" }}
            transition={transitionOverlay}
          >
            <motion.img
              layoutId={`img-${activeImg.src}`}
              src={activeImg.src}
              alt={activeImg.alt}
              className="max-h-full max-w-full rounded-[var(--radius)] object-contain shadow-2xl"
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "transform" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-[340px] w-full overflow-hidden sm:h-[460px] lg:h-[560px]">
        <Carousel
          handleClick={handleClick}
          rotation={rotation}
          cards={images}
          isCarouselActive={isCarouselActive}
          onDragStateChange={(d) => (isDragging.current = d)}
          onHoverChange={(h) => (isHovering.current = h)}
        />
      </div>
    </motion.div>
  )
}

export { ThreeDPhotoCarousel }
