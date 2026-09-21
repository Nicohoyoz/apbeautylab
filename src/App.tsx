import { Cursor } from "@/components/Cursor"
import { Nav } from "@/components/Nav"
import { Hero } from "@/components/Hero"
import { Services } from "@/components/Services"
import { Gallery } from "@/components/Gallery"
import { Ticker } from "@/components/Ticker"
import {
  useMagnetic,
  useMotionGate,
  useReveals,
  useSmoothScroll,
} from "@/hooks/useMotion"

/**
 * App shell. Hero, services and gallery are migrated; the remaining sections
 * (#booking, #about, #contact, #newsletter, footer) still live in
 * src/legacy-reference.html and are yet to be ported. Nav links to those
 * anchors are inert until they exist.
 */
export default function App() {
  useSmoothScroll()
  useMotionGate()
  useReveals()
  useMagnetic("[data-magnetic]")

  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <Gallery />
      </main>
    </>
  )
}
