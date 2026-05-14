# Universal Project Rules

## Core Architecture

- Build lightweight multi-page service websites with HTML, CSS, and vanilla JavaScript by default.
- Avoid heavy frameworks unless the project specifically requires application-level state or complex rendering.
- Use a shared config file for global business data, legal text, CTA labels, phone/email links, service area, hours, and footer copy.
- Never hardcode repeated business/legal/contact data across pages.
- Organize CSS into a global base file plus page-specific files.
- Keep reusable global behavior in one main JavaScript file.

## Recommended File Structure

- Use separate pages for home, services overview, service detail pages, about, contact, privacy, terms, and cookies.
- Use image folders by intent: home assets, service assets, and shared/common assets.
- Keep legal page styling isolated from marketing page styling.
- Keep service overview styling separate from service detail styling.

## UI/UX Direction

- The site should feel premium, structured, editorial, architectural, and trustworthy.
- Avoid generic contractor templates, cluttered card grids, cheap marketing language, and repetitive filler.
- Use strong typography hierarchy, clean spacing, visual rhythm, and purposeful contrast.
- Use cards only where they clarify repeated content; avoid stacking cards inside cards.
- Prefer practical, scannable sections over decorative blocks with little information.
- Use icons generously when they clarify service categories, process steps, tools, or trust signals.

## Visual Direction

- Use realistic, context-specific imagery.
- Avoid futuristic, artificial, neon, or sci-fi visuals unless explicitly required.
- Images should match the exact section context, not act as generic decoration.
- Add subtle visual framing to images: borders, overlays, accent lines, or architectural crops.
- Use accent colors sparingly for hierarchy, not as a one-note palette.
- Avoid visual noise, excessive tiles, overly rounded UI, and decorative clutter.

## Header

- Header should be fixed/sticky across the site.
- Initial header state may be transparent or glass-like; switch to solid on scroll.
- Header transitions must be smooth and must not cause layout jumps.
- Desktop navigation should support service dropdowns when multiple service groups exist.
- Mobile navigation should be a polished fullscreen overlay, not a basic drawer.
- Mobile menu must support body scroll lock, close button, link close behavior, and Escape close.

## Footer

- Footer must include brand/company info, navigation, legal links, contact info, disclaimer, company/legal details, and copyright.
- Footer structure should be consistent across all pages, including legal pages.
- Long disclaimers should be injected from global config where possible.
- Footer must remain readable on mobile and avoid cramped columns.

## Responsive Logic

- Design mobile-first for reading, tapping, and conversion clarity.
- Use mobile-specific overrides instead of letting desktop layouts collapse accidentally.
- Convert dense multi-card grids into horizontal scroll-snap sliders on mobile.
- In mobile sliders, show part of the next card to communicate swipeability.
- Keep mobile cards equal height when they appear in a horizontal slider.
- Pin buttons to the bottom of equal-height cards when card content varies.
- Reduce hero heights, title sizes, section padding, image heights, and decorative effects on mobile.
- Center mobile hero content when the image/background competes with readability.
- Avoid sticky elements inside parents with `overflow: hidden`; use page-specific overrides if sticky behavior is required.

## Content Structure

- Every service category should explain what it covers, when users need it, what details matter, and how work is typically approached.
- Service detail pages should include hero, overview, detailed services, field context, preparation/materials, methods/tools, standards, and CTA.
- Content should be useful, specific, and realistic.
- Avoid vague claims, keyword stuffing, “best/fastest/#1” language, and empty AI-style filler.
- Use real operational details: access, photos, equipment, symptoms, materials, scheduling, permits, inspections, and verification.
- Group services logically and give each group its own detailed page.

## Aggregator And Legal-Safe Positioning

- Clearly position aggregator sites as coordination/intake services, not direct contractors, unless the business truly performs the work.
- State that independent providers confirm scope, pricing, schedule, warranties, permits, licenses, and insurance.
- Avoid guaranteeing provider work, response time, pricing, licensing, or outcomes.
- Include a clear footer disclaimer across the site.
- Legal pages should be adapted to the industry and aggregator model.
- Urgent-service copy should support urgency without panic or unsafe advice.
- For life-safety risks, direct users to emergency services or utility providers where appropriate.

## Interaction Behavior

- Use smooth reveal animations, but keep them subtle and performance-conscious.
- Add page transitions only if they do not hide fixed overlays or break navigation.
- FAQ accordions should animate smoothly and support accessible expanded states.
- Contact forms should show a confirmation modal after submission in static/demo builds.
- Mobile floating call/quote buttons may appear after scroll, but only on mobile.
- Floating action buttons should not cover content; add safe bottom padding on mobile.
- Hide floating action buttons when mobile menu or modal overlays are open.
- Animate CTA icons subtly when useful, but avoid distracting whole-button motion.

## Accessibility

- Use semantic HTML wherever possible.
- Provide `aria-label` for icon-only buttons.
- Add `aria-expanded` for accordions and menu triggers.
- Ensure keyboard close behavior for menus and modals.
- Preserve focus handling when opening and closing overlays.
- Use descriptive image alt text matching the section context.
- Keep color contrast high, especially in dark sections.
- Do not place dark body text on dark backgrounds; override `.lead`, muted text, and headings in dark sections.

## CSS Organization

- Keep global tokens, typography, buttons, header, footer, mobile menu, and shared utilities in base CSS.
- Put page-specific layout and sections in page CSS files.
- Use local overrides for special pages rather than weakening global rules.
- Avoid broad fixes that unintentionally change unrelated pages.
- Use page-level body classes when a page needs behavior exceptions.
- Use media queries to adjust layout, not to hide structural problems.
- Prefer `scroll-snap` for lightweight mobile sliders when full carousel controls are unnecessary.

## Animation And Motion

- Motion should feel refined, not gimmicky.
- Use short transitions for hover, header state, menus, accordions, modals, and page transitions.
- Avoid aggressive hover effects on mobile.
- For icon attention effects, animate the icon only, not the full button.
- Respect smoothness and performance over complexity.
- Avoid layout-shifting animations.

## Performance

- Prefer optimized WebP images for site assets.
- Resize generated images before shipping them.
- Avoid unnecessary JavaScript libraries for behavior that CSS can handle.
- Use native scroll-snap for simple mobile sliders.
- Keep scripts small and centralized.
- Avoid large visual effects that reduce mobile smoothness.

## Quality Standard

- The final site should feel custom, professional, conversion-focused, and art-directed.
- Every section should have a clear purpose.
- Every image should support the surrounding content.
- Every mobile layout should be intentionally designed, not merely collapsed.
- Legal, contact, service, and footer pages must feel as polished as the homepage.
