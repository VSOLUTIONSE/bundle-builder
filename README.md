# Bundle Builder

A small Next.js app for building security bundle. A 4-step accordion on the left
(Cameras, Plan, Sensors, Accessories) walks you through picking products, and the review
panel on the right updates live as you go.

A few things it does:

- **Variants are tracked separately.** Each color of a camera has its own count. The stepper
  on a card shows the count for whichever color is currently selected, and switching colors
  never messes with the others.
- **The review panel mirrors everything.** Every product (and every color of a variant
  product) with a count above zero shows up as its own line, with its own stepper and price.
- **Step counters show distinct products.** "2 selected" means two products are in that step,
  not two units.
- **Save my system for later actually works.** It saves your whole config to the browser's
  localStorage, and the page restores it exactly when you come back.

All the product data lives in one file: `src/data/products.json`.

## Running it

You'll need Node.js 20+.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build, if you want it:

```bash
npm run build
npm start
```

And to check things:

```bash
npm run lint        # eslint, should be zero warnings
npx tsc --noEmit    # type checking
```

## Rough layout

- `src/app` — the entry point (`page.tsx` puts the two columns together).
- `src/components/builder` — the accordion, step headers, and product cards.
- `src/components/review` — the review panel and its line items.
- `src/components/ui` — small shared bits like the quantity stepper and variant chips.
- `src/context/BuilderContext.tsx` — all the state: quantities, selected colors, open step,
  the running total, and save/load for persistence.
- `src/data/products.json` — the single source of truth for steps, products, prices, plan,
  shipping, and UI text.
- `public` — fonts and images (Gilroy and TT Norms Pro are self-hosted here).

## Notes and decisions

- **No backend.** The brief said a small API was a bonus, not a requirement, so the data is
  just a local JSON file. Fonts and images are served straight from `public`, so nothing
  external is fetched at runtime.
- **Persistence is per-browser** (localStorage), not per-account. It's versioned and
  sanitized on load, so old or corrupt saved configs just fall back to defaults.
- **Cards always have a 2px border** (invisible when unselected). Adding a product used to
  pop the whole card 2-4px when its border appeared; this keeps everything rock solid while
  still highlighting the selected card.
- **Discount badges sit a fixed 11px from the top of the card**, tuned so the gap is the same
  for every card in every state.

## Known gaps

- **Step 2 (Choose your plan) is a placeholder.** The plan isn't selectable — the review
  panel just shows the fixed Cam Unlimited plan.
- **Checkout is a stub.** The button shows a placeholder alert; there's no real checkout.
- **No clear-config button.** To reset a saved system, clear the site's localStorage.
- **`StepHeader.tsx` is dead code** — the step headers are actually rendered by
  `AccordionStep.tsx`. Safe to delete.
- No automated test suite is committed (interactions were verified by hand during
  development).
