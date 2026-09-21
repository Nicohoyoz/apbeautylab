import { motion, useReducedMotion } from "framer-motion"
import {
  CottonRoundIcon,
  DropperIcon,
  GuaShaIcon,
  RollerIcon,
  SparkleIcon,
  SpoolieIcon,
  TweezersIcon,
} from "@/components/ui/tools"

type Spot = {
  Icon: (p: React.SVGProps<SVGSVGElement>) => React.ReactElement
  /** Percent positions, kept clear of the upper centre so the portrait reads. */
  style: React.CSSProperties
  size: number
  drift: number
  tilt: number
  duration: number
  delay: number
}

const SPOTS: Spot[] = [
  { Icon: TweezersIcon,    style: { top: "9%",  left: "8%" },   size: 44, drift: 14, tilt: 7,  duration: 7.5, delay: 0 },
  { Icon: DropperIcon,     style: { top: "24%", right: "9%" },  size: 40, drift: 18, tilt: -9, duration: 9.0, delay: 0.8 },
  { Icon: SpoolieIcon,     style: { top: "45%", left: "5%" },   size: 42, drift: 16, tilt: 8,  duration: 8.2, delay: 1.6 },
  { Icon: GuaShaIcon,      style: { top: "58%", right: "7%" },  size: 46, drift: 13, tilt: -6, duration: 10.0, delay: 0.4 },
  { Icon: RollerIcon,      style: { top: "76%", left: "14%" },  size: 44, drift: 17, tilt: 9,  duration: 8.8, delay: 2.1 },
  { Icon: CottonRoundIcon, style: { top: "86%", right: "22%" }, size: 38, drift: 12, tilt: -7, duration: 7.8, delay: 1.2 },
  { Icon: SparkleIcon,     style: { top: "36%", right: "26%" }, size: 26, drift: 10, tilt: 12, duration: 6.4, delay: 2.6 },
]

/**
 * Tools drifting around the portrait. Purely decorative, so the layer is
 * aria-hidden and never takes the pointer. Each chip sits on a translucent
 * disc so the line art stays legible over whatever is behind it.
 */
export function AboutTools() {
  const reduceMotion = useReducedMotion()

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10">
      {SPOTS.map(({ Icon, style, size, drift, tilt, duration, delay }, i) => (
        <motion.div
          key={i}
          className="absolute grid place-items-center rounded-full border border-border/70 bg-card/80 text-primary shadow-[0_8px_20px_-10px_rgba(61,48,39,0.45)] backdrop-blur-[2px]"
          style={{ ...style, width: size, height: size }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
          animate={
            reduceMotion
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  scale: 1,
                  y: [0, -drift, 0, drift * 0.6, 0],
                  rotate: [0, tilt, 0, -tilt * 0.7, 0],
                }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  opacity: { duration: 0.6, delay: delay * 0.3 },
                  scale: { duration: 0.6, delay: delay * 0.3 },
                  y: { duration, delay, repeat: Infinity, ease: "easeInOut" },
                  rotate: {
                    duration: duration * 1.3,
                    delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
        >
          <Icon style={{ width: size * 0.5, height: size * 0.5 }} />
        </motion.div>
      ))}
    </div>
  )
}
