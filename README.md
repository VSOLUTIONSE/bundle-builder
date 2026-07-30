This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

What you're building
A two-column experience.
Left, the builder. A vertical, 4-step accordion that walks the shopper through assembling their system:
Choose your cameras: expanded by default
Choose your plan
Choose your sensors
Add extra protection
Each step has a header showing a "STEP X OF 4" headline, an icon, the step title, and a state indicator on the right: the open step shows a "N selected" count with an up-chevron; collapsed steps show a down-chevron. The expanded step ends with a Next: … button that advances to the following step.
Product cards: Each card can include an optional discount badge (e.g. "Save 22%"), the product image, title, a short description, a "Learn More" link, a color/variant selector, a quantity stepper, and pricing (a struck-through compare-at price plus the active price). A card with quantity greater than zero is shown in its selected state (the highlighted border in the design). Not every product has every element, some have no badge, and some have no variants at all. Reproduce what the design shows per product.
The review panel ("Your security system"): It's a summary that reflects the configured system. It lists selected items grouped under category subheadings (Cameras, Sensors, Accessories, Plan). Each line has a thumbnail, name, its own quantity stepper, and pricing. Below the line items: a shipping row, a satisfaction-guarantee badge, a financing line, the total (with the pre-discount price struck through), a savings callout, a Checkout button, and a Save my system for later link.

The Checkout button has nowhere to go in this prototype a placeholder or a simple confirmation is fine. The builder and the review panel are the focus.

Requirements
Fidelity (desktop)
Match the design precisely layout, spacing, typography, color, corner radii, and the various element states (selected/unselected cards, active/inactive color chips, disabled steppers).
Responsiveness
Desktop must match the Figma; smaller viewports are supposed to be responsive design. We expect the layout to stay usable and visually coherent all the way down to a phone.
Interactions that must work
variant selection: see the dedicated section The variant selector.
Quantity steppers: present on both the product cards and the review-panel lines, and kept in sync (changing one updates the other and the rest of the UI).
Accordion: steps expand and collapse; Step 1 is open on load.
"N selected" counter: reflects the number of distinct products currently chosen in that step.
Requirements
Fidelity (desktop)
Match the design precisely layout, spacing, typography, color, corner radii, and the various element states (selected/unselected cards, active/inactive color chips, disabled steppers).
Responsiveness
Desktop must match the Figma; smaller viewports are supposed to be responsive design. We expect the layout to stay usable and visually coherent all the way down to a phone.
Interactions that must work
variant selection: see the dedicated section The variant selector.
Quantity steppers: present on both the product cards and the review-panel lines, and kept in sync (changing one updates the other and the rest of the UI).
Accordion: steps expand and collapse; Step 1 is open on load.
"N selected" counter: reflects the number of distinct products currently chosen in that step.

Data
The app should be data-driven from a JSON source you define render from data, don't hardcode per-product markup. Seed the initial state so the app loads looking exactly like the design (including the review panel's pre-populated sensors, accessory, and plan, which have no add-control in this particular view). Serving that JSON from a small backend/API is a bonus, not a requirement, a local JSON file is completely fine.

The variant selector
For products that have variant options, show a row of selectable color chips each with a small swatch/thumbnail and a label matching the design. The key thing to get right:
Each variant has its own quantity. Red and blue of the same product are tracked separately, with separate counts.
The card's quantity stepper is bound to whichever variant is currently selected. Selecting a color makes it the active variant, and the stepper shows and edits that variant's count. Example: add 2 of Red, then select Blue the stepper now reads 0 (Blue's count), while the 2 Red you added are untouched.
The review panel reflects every variant with a count above zero, as its own line. In the example above, switching the card to Blue does not remove Red from the summary Red (×2) still shows on the right.
Don't worry about the selected-chip styling / highlighting for now focus on the selection-and-quantity behavior and that it flows through to the review panel.
Products with no color options (e.g. the doorbell) simply have no selector the single quantity stepper just controls that product.

## Persistence "Save my system for later"

The **Save my system for later** link should actually save the shopper's configuration. When a shopper builds a system, clicks it, and comes back later (page reload or a return visit), their system should be **restored exactly as they left it**.
