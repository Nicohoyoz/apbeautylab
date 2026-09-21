import { TICKER_ITEMS } from "@/data/ticker"

/**
 * Scrolling band of service names between the hero and the services list.
 * Decorative only -- every name here also appears in the services section,
 * so it is hidden from assistive tech rather than read out twice.
 */
export function Ticker() {
  // Duplicated so the -50% keyframe lands on an identical frame.
  const run = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div
      aria-hidden="true"
      data-cursor-invert
      className="ticker-wrap overflow-hidden whitespace-nowrap bg-foreground py-[0.85rem]"
    >
      <div className="ticker-track inline-flex">
        {run.map((item, i) => (
          <span key={`${item}-${i}`} className="flex shrink-0 items-center">
            <span className="type-body-lg px-8 font-serif italic text-primary-foreground/70">
              {item}
            </span>
            <span className="type-body-lg font-serif text-muted-foreground/40">&middot;</span>
          </span>
        ))}
      </div>
    </div>
  )
}
