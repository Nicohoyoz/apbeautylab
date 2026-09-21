import { INSTAGRAM_URL } from "@/data/site"

export function Newsletter() {
  return (
    <div
      id="newsletter"
      className="reveal grid grid-cols-1 items-center gap-12 bg-foreground px-6 py-20 lg:grid-cols-2 lg:gap-24 lg:px-24 lg:py-24"
    >
      <div>
        <h2 className="type-h2 mb-3 text-primary-foreground">
          Stay in
          <br />
          the loop
        </h2>
        <p className="type-body text-primary-foreground/50">
          Special offers, skincare tips, and new service announcements delivered
          to your inbox. No spam, ever.
        </p>
      </div>

      <div className="border-border/25 lg:border-l lg:pl-12">
        <span className="type-overline mb-3 block text-primary-foreground/35">
          Coming soon
        </span>
        <p className="type-h3 mb-4 text-primary-foreground">
          Newsletter launching
          <br />
          <em className="not-italic text-primary">very soon.</em>
        </p>
        <p className="type-small max-w-[320px] text-primary-foreground/40">
          We are putting the finishing touches on our mailing list. Check back
          soon to subscribe for exclusive offers and skincare tips.
        </p>
        <p className="type-small mt-5 text-primary-foreground/25">
          In the meantime, follow us &mdash;{" "}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-foreground/50 no-underline transition-colors hover:text-primary-foreground"
          >
            @divinedaugthers.studio
          </a>
        </p>
      </div>
    </div>
  )
}
