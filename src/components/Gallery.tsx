import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel"
import { GALLERY_IMAGES } from "@/data/gallery"

/**
 * Gallery section. The pre-migration horizontal scroll strip is replaced by a
 * draggable 3D carousel; the editorial header and disclaimer carry over intact.
 */
export function Gallery() {
  return (
    <section id="gallery" className="bg-paper px-6 pb-16 pt-32 lg:px-24 lg:pt-36">
      <div className="reveal mb-12 grid grid-cols-1 items-end gap-3 sm:grid-cols-[1fr_auto]">
        <div>
          <span className="eyebrow">The experience</span>
          <h2 className="section-title">Gallery</h2>
        </div>
        <p className="text-[0.75rem] italic tracking-[0.02em] text-stone">
          Individual results may vary.
        </p>
      </div>

      <div className="reveal">
        <ThreeDPhotoCarousel images={GALLERY_IMAGES} />
        <p className="mt-6 text-center text-[0.58rem] uppercase tracking-[0.3em] text-stone">
          Drag to explore &middot; select an image to enlarge
        </p>
      </div>
    </section>
  )
}
