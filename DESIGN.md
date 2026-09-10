# Design System — Game / Archive

## Direction

The interface is a reading edition: a long-form story book with a clear table of contents and restrained back matter. The reader should feel that they have opened a carefully edited volume, not entered a game dashboard. The visual language uses paper, book rules, one warm accent, and typographic hierarchy to give the prose room.

## Surface mode

Read first. The only essential interaction is moving between the reading view, the table of contents, and the appendix. Maps and comparisons are deliberately lightweight reference tools; they should answer a question without becoming a second application.

## Palette (Kami Parchment & Deep Blue System)

- Canvas (Parchment): `#F5F4ED` (warm parchment reading background)
- Surface (Ivory): `#FAF9F5` (elevated cards, tool modals, mobile TOC)
- Text Ink (Near-black): `#141413` (high contrast, crisp deep ink)
- Secondary Ink (Olive): `#504E49` (subtitles, secondary reading notes)
- Tertiary Ink (Stone): `#6B6A64` (metadata, folios, counters)
- Border: `#E8E6DC` (subtle hairline dividers)
- Brand Navy: `#1B365D` (Kami signature seal blue for active states, quotes, kickers)
- Brand Tint: `#E4ECF5` (subtle blue background for tags, badges, buttons)
- Signal Red: `#A45E4F` (moral tension, critical divergence)

## Typography (Kami Print-Grade Chinese Rules)

- **Single-Serif Philosophy**: Headings and body share the single serif font family: `TsangerJinKai02` (仓耳今楷), `Noto Serif SC`, `Source Han Serif SC`, `Songti SC`, `SimSun`, `serif`.
- **Code & Numerals**: `JetBrains Mono`, `ui-monospace`, `Menlo`, `monospace`.
- **Font-Synthesis None**: `font-synthesis: none;` strictly applied to avoid stroke distortion.
- **Maximum Font Weight 500**: Bold elements (`strong`, `b`, headings) never exceed `font-weight: 500` (or 600 for small caps eyebrows).
- **Chinese Body Tracking**: `letter-spacing: 0.35px` on all body paragraphs, creating natural optical breathing room for CJK square characters.
- **Zero Heading Tracking**: Chinese titles have `letter-spacing: 0;` (preventing negative-tracking stroke collisions).
- **Line Heights**: Body reading leading at `1.65` (replacing old loose 2.1), headings tight at `1.15 ~ 1.25`.
- **Tabular Numerals**: `font-variant-numeric: lining-nums tabular-nums;` on all chapter numbers, index folios, dates, counters, and statistics.
- **Eyebrow / Kicker Rules**: `10px`, `font-weight: 600`, `letter-spacing: 1.5px`, uppercase, `color: #1B365D`.
- **Punctuation & Spacing**: Corner brackets `「` `」`, full ellipsis `……`, and half-width space between Chinese and Western alphanumeric characters.

## Layout

- Desktop: a slim sticky table of contents on the left, a 65–75 character reading column in the center, and a quiet contextual rail on the right.
- Tablet: the contextual rail disappears first; the reading column remains the visual priority.
- Mobile: the table of contents becomes an off-canvas menu, the reading column becomes single-column, and no fixed bottom navigation competes with the text.
- Chapter sections use rules, folios, and spacing rather than repeated rounded cards. Cards are reserved for small appendix records where comparison benefits from a boundary.
- The first viewport introduces the book, spoiler scope, reading promise, and first chapter. It does not ask the reader to decode a map before reading.

## Components

- Book header: generic archive identity, current mode, and three simple destinations: 阅读、目录、附录。
- Table of contents: grouped chapter list for main story, side stories, and DLC, with a lightweight work switcher for the current game; selected state is a rule and text treatment.
- Continuous chapter block: region, title, subtitle, summary, factual note, interpretation, hard question, tags, and folio count.
- Reading end: a quiet handoff to the appendix, making the transition from narrative to reference explicit.
- Appendix tabs: 人物关系、选择与结局、DLC 对照、分析方法。
- Relationship mini-map: small SVG diagram paired with a text index so the topology is never the only way to access the information.
- Reader tools: an unobtrusive header control for local reading preferences and downloading either the current work or the complete archive as TXT/EPUB.

## Interaction

- Navigation changes the current reading mode without a page reload and resets the scroll position.
- Clicking a chapter in the table of contents closes the mobile menu and moves to that chapter in the continuous story.
- Appendix tabs switch reference material in place and preserve a clear return to reading.
- Reader preferences are local-only, persist between visits, and change the reading column without changing the source content. EPUB exports intentionally use reader-controlled serif typography instead of embedding the website font.
- Motion is restrained: focus, hover, and menu changes are short and subtle. Reduced-motion users receive the same information without ornamental movement.

## Content grammar

The content model separates `fact`, `reading`, `question`, `tags`, `kind`, and `region`. This is the central reusable seam for future games. Both `巫师 3：狂猎` and `赛博朋克 2077：往日之影` use the same reading and appendix surfaces. New games should be added as data first, then connected to shared reading and appendix surfaces. The reader-facing voice distinguishes `【确定】` from `【很可能】` / `【推断】` so evidence and interpretation never blur together. Official Chinese name normalization happens at the display boundary, keeping source data editable while ensuring the reader never sees accidental English-only names.

## Complexity deliberately removed

- Dark workbench/sidebar as the primary frame.
- Fold-out story map as the first viewport.
- Dashboard-style metric grids and multiple competing section shells.
- Separate route/chronology/decision surfaces that interrupt the story.
- Decorative interactions whose value is lower than the reading rhythm they cost.

## Accessibility

- Use semantic headings and landmarks.
- Every interactive control is a real button with visible focus styling.
- SVG maps include an accessible label and are paired with text notes.
- Keep contrast strong and preserve text meaning when color is unavailable.
- Respect `prefers-reduced-motion` and avoid layout-property animation.
