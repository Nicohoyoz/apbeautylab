import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { SERVICE_TABS, type Service } from "@/data/services"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

function ServiceRow({ item }: { item: Service }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-border py-4 transition-transform duration-300 ease-arrival last:border-b-0 hover:translate-x-[6px]">
      <div className="min-w-0">
        <span className="type-body font-medium text-foreground">
          {item.name}
        </span>
        {item.note && (
          <span className="type-small mt-0.5 block italic text-muted-foreground">
            {item.note}
          </span>
        )}
        <span className="type-overline mt-2 block w-fit rounded-[calc(var(--radius)-2px)] border border-border px-2 py-[0.16rem] text-muted-foreground">
          {item.by}
        </span>
      </div>
      <span aria-hidden="true" className="mb-1 flex-1 border-b border-dotted border-border" />
      <span className="type-h3 whitespace-nowrap text-primary">
        {item.price}
      </span>
    </div>
  )
}

/**
 * Services & pricing as horizontal folders. Each folder is a disclosure:
 * clicking a closed one opens it, clicking the open one's header closes it
 * again, so "nothing open" is a valid state (unlike the pre-migration tabs,
 * where one panel was always showing).
 */
export function Services() {
  const [openId, setOpenId] = useState<string | null>(SERVICE_TABS[0]?.id ?? null)
  const reduceMotion = useReducedMotion()

  const openTab = SERVICE_TABS.find((t) => t.id === openId) ?? null
  const mid = openTab ? Math.ceil(openTab.items.length / 2) : 0

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
        {/* Folder tabs. Horizontally scrollable on narrow screens. */}
        <div className="flex overflow-x-auto border-b border-border [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SERVICE_TABS.map((tab) => {
            const isOpen = tab.id === openId
            return (
              <button
                key={tab.id}
                type="button"
                id={`folder-${tab.id}`}
                aria-expanded={isOpen}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setOpenId(isOpen ? null : tab.id)}
                className={cn(
                  "relative -mb-px flex shrink-0 items-center gap-2 whitespace-nowrap border border-b-0 px-5 py-3.5",
                  "type-overline transition-colors duration-300",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
                  isOpen
                    ? "z-10 border-border bg-muted text-foreground"
                    : "border-transparent text-muted-foreground hover:text-primary"
                )}
              >
                {tab.label}
                <span className="type-small text-muted-foreground">{tab.items.length}</span>
                {/* Plus that becomes a minus while open. */}
                <span aria-hidden="true" className="relative ml-0.5 block h-2 w-2">
                  <span className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-current" />
                  <span
                    className={cn(
                      "absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-current transition-transform duration-300",
                      isOpen ? "scale-y-0" : "scale-y-100"
                    )}
                  />
                </span>
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
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.42, ease: [0.16, 1, 0.3, 1] }
              }
              className="overflow-hidden border-x border-b border-border bg-muted"
            >
              <div className="grid grid-cols-1 gap-0 px-6 py-6 lg:grid-cols-2 lg:px-8 lg:py-8">
                <div className="lg:pr-8">
                  {openTab.items.slice(0, mid).map((item) => (
                    <ServiceRow key={item.name} item={item} />
                  ))}
                </div>
                <div className="lg:border-l lg:border-border lg:pl-8">
                  {openTab.items.slice(mid).map((item) => (
                    <ServiceRow key={item.name} item={item} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-10 flex justify-center">
          <Button href="#booking" variant="primary" size="lg">
            Book a Session
          </Button>
        </div>
      </div>
    </section>
  )
}
