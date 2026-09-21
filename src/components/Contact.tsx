import { ADDRESS_LINES, GOLDIE_URL, HOURS, INSTAGRAM_URL, MAPS_URL } from "@/data/site"
import { Button } from "@/components/ui/Button"

export function Contact() {
  return (
    <section id="contact" className="bg-background px-6 py-24 lg:px-24 lg:py-32">
      <div className="reveal">
        <span className="eyebrow">Find us</span>
        <h2 className="section-title">Location &amp; Contact</h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-32">
        <div className="reveal-left">
          <h3 className="type-h3 mb-1 text-foreground">Divine Daughters Studio</h3>
          <span className="type-overline mb-3 block leading-[2.1] text-muted-foreground">
            {HOURS.map((h) => (
              <span key={h} className="block">
                {h}
              </span>
            ))}
          </span>
          <p className="type-body">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-b border-border pb-px text-primary no-underline transition-colors hover:border-foreground hover:text-foreground"
            >
              {ADDRESS_LINES.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </a>
          </p>
          <p className="type-small mt-4 italic text-muted-foreground">
            Free street parking. Please arrive 5 minutes before your appointment.
          </p>
        </div>

        <div className="reveal-right">
          <h3 className="type-h3 mb-6 text-foreground">Get in touch</h3>
          <span className="type-overline mb-4 block text-muted-foreground">
            Two ways to reach us
          </span>
          <p className="type-body mb-2 text-muted-foreground">
            Ready to book? Reserve your time on Goldie. Still deciding, or have a
            question about a treatment? Send us a DM and we will get back to you
            as soon as possible.
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Button
              href={GOLDIE_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="md"
            >
              Book on Goldie
            </Button>
            <Button
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="md"
            >
              DM on Instagram
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
