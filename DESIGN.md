# Design System — Game / Archive

## Direction

The interface is a reading edition: a long-form story book with a clear table of contents and restrained back matter. The reader should feel that they have opened a carefully edited volume, not entered a game dashboard. The visual language uses paper, book rules, one warm accent, and typographic hierarchy to give the prose room.

## Surface mode

Read first. The only essential interaction is moving between the reading view, the table of contents, and the appendix. Maps and comparisons are deliberately lightweight reference tools; they should answer a question without becoming a second application.

## Palette

- Paper: `#F4EFE5`
- Paper deep: `#E9E1D4`
- Ink: `#25221E`
- Muted ink: `#766F64`
- Copper accent: `#A66F35`
- Cool blue: `#617F91`
- Signal red: `#A55443`

Copper marks chapter rhythm and active navigation. Blue and red are reserved for appendix semantics such as relationship types or moral pressure. Every meaning is also written as text; color is never the only signal.

## Typography

- Display and long-form reading: `Newsreader`, with `Songti SC`, `STSong`, and Georgia fallbacks.
- UI and navigation: `Instrument Sans`, with PingFang SC, Noto Sans CJK SC, and system fallbacks.
- Reading paragraphs use a narrow measure, generous line-height, and a calm weight. Metadata is small and tracked, but never competes with the body copy.
- Chapter titles are allowed to be large and editorial; labels stay compact so the page still reads like a book.

## Layout

- Desktop: a slim sticky table of contents on the left, a 65–75 character reading column in the center, and a quiet contextual rail on the right.
- Tablet: the contextual rail disappears first; the reading column remains the visual priority.
- Mobile: the table of contents becomes an off-canvas menu, the reading column becomes single-column, and no fixed bottom navigation competes with the text.
- Chapter sections use rules, folios, and spacing rather than repeated rounded cards. Cards are reserved for small appendix records where comparison benefits from a boundary.
- The first viewport introduces the book, spoiler scope, reading promise, and first chapter. It does not ask the reader to decode a map before reading.

## Components

- Book header: generic archive identity, current mode, and three simple destinations: 阅读、目录、附录。
- Table of contents: grouped chapter list for main story, side stories, and DLC; selected state is a rule and text treatment.
- Continuous chapter block: region, title, subtitle, summary, factual note, interpretation, hard question, tags, and folio count.
- Reading end: a quiet handoff to the appendix, making the transition from narrative to reference explicit.
- Appendix tabs: 人物关系、选择与结局、DLC 对照、分析方法。
- Relationship mini-map: small SVG diagram paired with a text index so the topology is never the only way to access the information.

## Interaction

- Navigation changes the current reading mode without a page reload and resets the scroll position.
- Clicking a chapter in the table of contents closes the mobile menu and moves to that chapter in the continuous story.
- Appendix tabs switch reference material in place and preserve a clear return to reading.
- Motion is restrained: focus, hover, and menu changes are short and subtle. Reduced-motion users receive the same information without ornamental movement.

## Content grammar

The content model separates `fact`, `reading`, `question`, `tags`, `kind`, and `region`. This is the central reusable seam for future games. New games should be added as data first, then connected to shared reading and appendix surfaces. The reader-facing voice distinguishes `【确定】` from `【推断】` so evidence and interpretation never blur together.

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
