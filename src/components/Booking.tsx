import {
  BOOKING_DETAILS,
  BOOK_ALEXANDRA_URL,
  BOOK_STEFFANY_URL,
} from "@/data/site"
import { Button } from "@/components/ui/Button"

export function Booking() {
  return (
    <section id="booking" className="bg-background px-6 py-24 lg:px-24 lg:py-32">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-32">
        <div className="reveal-left">
          <span className="eyebrow">Reserve your session</span>
          <h2 className="section-title">
            Book an
            <br />
            Appointment
          </h2>
          <p className="type-body mt-6 text-muted-foreground">
            Booking powered by Goldie &mdash; choose your provider for live
            availability.
          </p>
          <ul className="mt-8 flex list-none flex-col gap-2.5">
            {BOOKING_DETAILS.map((d) => (
              <li
                key={d}
                className="type-small relative pl-5 text-muted-foreground before:absolute before:left-0 before:text-border before:content-['\00b7']"
              >
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal-right rounded-[var(--radius)] bg-card p-8 lg:p-12">
          <h3 className="type-h3 mb-8 text-foreground">Choose your provider</h3>
          <div className="text-center">
            <span className="type-overline mb-5 block text-muted-foreground">
              Live availability
            </span>
            <p className="type-body mx-auto mb-8 max-w-[340px] text-muted-foreground">
              Alexandra handles facials, brows, waxing and permanent makeup.
              Steffany handles lash extensions and body work. Pick yours to see
              open times and book instantly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                href={BOOK_ALEXANDRA_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
              >
                Book with Alexandra
              </Button>
              <Button
                href={BOOK_STEFFANY_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="md"
              >
                Book with Steffany
              </Button>
            </div>
            <p className="type-small mt-8 italic text-muted-foreground">
              Booking powered by Goldie. Opens in a new tab.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
