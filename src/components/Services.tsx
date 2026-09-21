import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { SERVICE_TABS, type Service, type ServiceTab } from "@/data/services"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

function ServiceRow({ item }: { item: Service }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-border py-4 transition-transform duration-300 ease-arrival last:border-b-0 hover:translate-x-[6px]">
      <div className="min-w-0">
        <span className="type-body font-medium text-foreground">{item.name}</span>
        {item.note && (
          <span className="type-small mt-0.5 block italic text-muted-foreground">
            {item.note}
          </span>
        )}
        <span className="type-overline mt-2 block w-fit rounded-[calc(var(--radius)-2px)] border border-border px-2 py-[0.16rem] text-muted-foreground">
          {item.by}
        </span>
      </div>
      <span aria-hidden="true" className="mb-1 flex-1 border-b border-dotted border-muted-foreground" />
      <span className="type-h3 whitespace-nowrap text-primary">{item.price}</span>
    </div>
  )
}

/** Plus that loses its upright while open. */
function Toggle({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative ml-auto block h-2.5 w-2.5 shrink-0">
      <span className="absolute left-0 top-1/2 h-px w-2.5 -translate-y-1/2 bg-current" />
      <span
        className={cn(
          "absolute left-1/2 top-0 h-2.5 w-px -translate-x-1/2 bg-current transition-transform duration-300",
          open ? "scale-y-0" : "scale-y-100"
        )}
      />
    </span>
  )
}

function Panel({ tab }: { tab: ServiceTab }) {
  const mid = Math.ceil(tab.items.length / 2)
  return (
    <div className="grid grid-cols-1 gap-0 px-5 py-5 lg:grid-cols-2 lg:px-8 lg:py-8">
      <div className="lg:pr-8">
        {tab.items.slice(0, mid).map((item) => (
          <ServiceRow key={item.name} item={item} />
        ))}
      </div>
      <div className="lg:border-l lg:border-border lg:pl-8">
        {tab.items.slice(mid).map((item) => (
          <ServiceRow key={item.name} item={item} />
        ))}
      </div>
    </div>
  )
}

/**
 * Services & pricing as disclosures: opening one closes the last, and clicking
 * an open header closes it, so "nothing open" is valid.
 *
 * The chrome changes with the viewport, the behaviour does not. Above lg the
 * categories sit in a row of folder tabs over a shared panel. Below it they
 * stack, each header opening its own panel in place -- eight tabs behind a
 * horizontal scroll hid most of the categories on a phone.
 */
export function Services() {
  const [openId, setOpenId] = useState<string | null>(SERVICE_TABS[0]?.id ?? null)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const reduceMotion = useReducedMotion()

  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id))
  const openTab = SERVICE_TABS.find((t) => t.id === openId) ?? null

  const collapse = reduceMotion
    ? { duration: 0 }
    : { duration: 0.42, ease: [0.16, 1, 0.3, 1] as const }

  return (
    <section id="services" className="bg-background px-6 py-24 lg:px-24 lg:py-32">
      <div className="reveal mb-12 grid grid-cols-1 items-end gap-6 lg:mb-16 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="eyebrow">What we offer</span>
          <h2 className="section-title">
            Services &amp;
            <br />
            Pricing
          </h2>
        </div>
        <p className="type-body self-end text-muted-foreground">
          Every service is tailored to your skin, your goals, and your comfort.
          Each treatment is marked with the provider who offers it &mdash;
          browse, then book with Alexandra or Steffany.
        </p>
      </div>

      <div className="reveal">
        {isDesktop ? (
          <>
            <div className="flex border-b border-border">
              {SERVICE_TABS.map((tab) => {
                const isOpen = tab.id === openId
                return (
                  <button
                    key={tab.id}
                    type="button"
                    id={`folder-${tab.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`panel-${tab.id}`}
                    onClick={() => toggle(tab.id)}
                    className={cn(
                      "type-overline relative -mb-px flex shrink-0 items-center gap-2 whitespace-nowrap border border-b-0 px-5 py-3.5",
                      "rounded-t-[var(--radius)] transition-colors duration-300",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
                      isOpen
                        ? "z-10 border-border bg-muted text-foreground"
                        : "border-transparent text-muted-foreground hover:text-primary"
                    )}
                  >
                    {tab.label}
                    <span className="type-small text-muted-foreground">
                      {tab.items.length}
                    </span>
                    <Toggle open={isOpen} />
                  </button>
                )
              })}
            </div>

            <AnimatePresence initial={false}>
              {openTab && (
                <motion.div
                  key={openTab.id}
                  id={`panel-${openTab.id}`}
                  role="region"
                  aria-labelledby={`folder-${openTab.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={collapse}
                  className="overflow-hidden rounded-b-[var(--radius)] border-x border-b border-border bg-muted"
                >
                  <Panel tab={openTab} />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          /* Stacked: every category is visible at once, nothing hidden off-screen. */
          <div className="overflow-hidden rounded-[var(--radius)] border border-border">
            {SERVICE_TABS.map((tab, i) => {
              const isOpen = tab.id === openId
              return (
                <div
                  key={tab.id}
                  className={cn(i > 0 && "border-t border-border")}
                >
                  <button
                    type="button"
                    id={`folder-${tab.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`panel-${tab.id}`}
                    onClick={() => toggle(tab.id)}
                    className={cn(
                      "type-overline flex w-full items-center gap-2.5 px-5 py-4 text-left transition-colors duration-300",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
                      isOpen ? "bg-muted text-foreground" : "text-muted-foreground"
                    )}
                  >
                    <span>{tab.label}</span>
                    <span className="type-small text-muted-foreground">
                      {tab.items.length}
                    </span>
                    <Toggle open={isOpen} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`panel-${tab.id}`}
                        role="region"
                        aria-labelledby={`folder-${tab.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={collapse}
                        className="overflow-hidden border-t border-border bg-muted"
                      >
                        <Panel tab={tab} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Button href="#booking" variant="primary" size="lg">
            Book a Session
          </Button>
        </div>
      </div>
    </section>
  )
}
