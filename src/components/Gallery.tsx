import { ThreeDPhotoCarousel } from "@/components/ui/3d-carousel"
import { GALLERY_IMAGES } from "@/data/gallery"

/**
 * Gallery section. The pre-migration horizontal scroll strip is replaced by a
 * draggable 3D carousel; the editorial header and disclaimer carry over intact.
 */
export function Gallery() {
  return (
    <section id="gallery" className="bg-background px-6 pb-16 pt-32 lg:px-24 lg:pt-36">
      <div className="reveal mb-12 grid grid-cols-1 items-end gap-3 sm:grid-cols-[1fr_auto]">
        <div>
          <span className="eyebrow">The experience</span>
          <h2 className="section-title">Gallery</h2>
        </div>
        <p className="type-small italic text-muted-foreground">
          Individual results may vary.
        </p>
      </div>

      <div className="reveal">
        <ThreeDPhotoCarousel images={GALLERY_IMAGES} />
        <p className="type-overline mt-6 text-center text-muted-foreground">
          Drag to explore &middot; select an image to enlarge
        </p>
      </div>
    </section>
  )
}
