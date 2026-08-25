# Design System — Game / Archive

## Direction

The interface is a fold-out story archive: a reader starts with a compact map of the whole game, then unfolds chronology, people, decisions, and consequences. The visual language borrows from a working paper sheet rather than a fantasy dashboard: bone paper, charcoal work surface, copper registration marks, and cool blue relationship lines.

## Surface mode

Read first, with light Operate behavior for filters and map exploration. The primary success condition is comprehension: the reader should know where they are, what the current chapter asks, and where a choice leads.

## Palette

- Paper: `#F6F1E8`
- Paper deep: `#E9E2D5`
- Paper darker: `#D9D0C1`
- Charcoal: `#141310`
- Warm gold: `#B98232`
- Bright gold: `#D49A42`
- Cool blue: `#617F91`
- Cool blue soft: `#A2B9BD`
- Signal red: `#A55443`
- Ink: `#171513`
- Muted ink: `#746E63`

Gold marks the current route or an important question. Blue marks distance, agency, and relationship links. Red marks moral pressure, harm, or irreversible cost. Every meaning is also written as text; color is never the only signal.

## Typography

- Display and long-form reading: `Newsreader`, with `Songti SC`, `STSong`, and Georgia fallbacks.
- UI and navigation: `Instrument Sans`, with PingFang SC, Noto Sans CJK SC, and system fallbacks.
- Small metadata uses uppercase tracking and stays subordinate to the reading voice.
- Body text is kept in a narrow measure. Headings use a compact line-height and negative tracking to create the feeling of a folded printed sheet.

## Layout

- Desktop: fixed dark archive rail at 244px, fluid page column, 42px page padding.
- Tablet: rail compresses and metadata reduces.
- Mobile: rail becomes an off-canvas menu; the most-used five sections become a fixed bottom navigation. Content stays single-column and map surfaces can scroll horizontally when their topology requires it.
- Sections use rules, not repeated rounded cards, to establish grouping. Rounded surfaces are reserved for the dark chapter reader, DLC feature, and interactive workbench.
- The first viewport has one thesis: “一张会展开的故事地图”. The foldout map is the signature visual and the primary explanation of the product mechanism.

## Components

- Archive rail: product identity, spoiler status, section navigation, reader note.
- Topbar: current folio and lightweight location context.
- Folded story map: layered sheets, printed metadata, route nodes, and annotations.
- Route line: chronological macro-map with clickable chapters.
- Chapter reader: index list plus dark reading surface; every chapter keeps summary, confirmed fact, interpretation, and hard question together.
- Relationship map: SVG geometry with explicit legends and a text notes list for non-visual reading.
- Decision workbench: indexed decisions on the left, branch tree and consequence note on the right.
- Ending matrix: compact comparison of condition, cost, and interpretation.
- DLC switcher: two expansion lenses with a shared theme comparison below.
- Method sheet: reusable seven-move analysis framework and expandable blank template.

## Interaction

- Navigation changes the current folio without a page reload and resets the scroll position.
- Lists use selected rows rather than modals so the reader preserves context.
- Filters are explicit text buttons and retain keyboard focus rings.
- Relationship map filtering changes visible edges and nodes, while the adjacent notes list preserves semantic access.
- The analysis template opens inline, keeping the method page readable and printable.
- Motion is restrained: hover states use transform, route changes use scroll, and reduced-motion users receive the same information without ornamental movement.

## Content grammar

The content model separates `fact`, `reading`, `question`, `tags`, `kind`, and `region`. This is the central reusable seam for future games. New games should be added as data first, then connected to shared visual surfaces. The reader-facing voice distinguishes `【确定】` from `【推断】` so evidence and interpretation never blur together.

## Accessibility

- Use semantic headings and landmarks.
- Every interactive control is a real button with visible focus styling.
- SVG maps include an accessible label and are paired with text notes.
- Bottom navigation remains reachable and labels do not rely on icons alone.
- Keep contrast strong on charcoal reading surfaces and preserve text meaning when color is unavailable.
- Respect `prefers-reduced-motion` and avoid layout-property animation.
