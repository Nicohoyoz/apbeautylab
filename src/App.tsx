import { Cursor } from "@/components/Cursor"
import { Nav } from "@/components/Nav"
import { Hero } from "@/components/Hero"
import { Services } from "@/components/Services"
import { Booking } from "@/components/Booking"
import { About } from "@/components/About"
import { Gallery } from "@/components/Gallery"
import { Newsletter } from "@/components/Newsletter"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"
import { Ticker } from "@/components/Ticker"
import {
  useMagnetic,
  useMotionGate,
  useReveals,
  useSmoothScroll,
} from "@/hooks/useMotion"

/**
 * App shell. Every section from the pre-migration page is now ported, in the
 * order it appeared there. src/legacy-reference.html is kept only as a
 * reference for anything still worth cross-checking.
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
        <Booking />
        <About />
        <Gallery />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
