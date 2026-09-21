import { ABOUT_STATS } from "@/data/site"
import { AboutTools } from "@/components/AboutTools"

export function About() {
  return (
    <div id="about" className="grid min-h-[80vh] grid-cols-1 lg:grid-cols-2">
      <div className="reveal-left relative min-h-[460px] overflow-hidden bg-secondary lg:min-h-[600px]">
        <img
          src="/images/about.jpg"
          alt="Alexandra Parrales"
          className="h-full w-full object-cover object-top"
        />
        <AboutTools />
      </div>

      <div className="reveal-right flex flex-col justify-center bg-muted px-6 py-20 lg:px-24 lg:py-32">
        <span className="eyebrow">My story</span>
        <h2 className="section-title">
          Alexandra
          <br />
          Parrales
        </h2>

        <div className="type-body mt-6 space-y-5 text-muted-foreground">
          <p>
            I immigrated from Per&uacute; to the United States when I was turning
            12, and found my passion for beauty at 15. Today, at 22, I am a
            licensed esthetician with three years of experience and every session
            I do is a reflection of that passion.
          </p>
          <p>
            My desire with Divine Daughters Studio is to help women feel more
            confident in their bodies and skin. As a bilingual professional, I
            connect with a diverse range of clients and create a comfortable,
            personalized experience for everyone.
          </p>
          <p>
            I am certified in Lymphatic Drainage massage and have been fully
            licensed since 2023.
          </p>
          <p>
            Divine Daughters Studio is run by the two of us &mdash; me, a
            licensed esthetician, and Steffany, a licensed massage therapist and
            our lash artist.
          </p>
        </div>

        <div className="mt-14 flex flex-wrap gap-12 border-t border-border pt-10">
          {ABOUT_STATS.map((s) => (
            <div key={s.label}>
              <span className="block font-serif text-[3.6rem] leading-none font-bold text-foreground">
                {s.num}
              </span>
              <span className="type-overline mt-1.5 block text-muted-foreground">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
