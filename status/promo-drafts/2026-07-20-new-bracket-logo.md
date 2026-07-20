# I Finally Gave Bracketly a Logo That Means Something

Bracketly has had a favicon since day one — a vaguely hood-shaped abstract mark that, looking back, had nothing to do with the name. It just sat there in the browser tab looking like a placeholder nobody replaced. Today I replaced it.

## The new mark

It's just `[ ]` — two brackets, rendered as rounded stroke paths rather than sharp geometric corners, to match the soft-radius design language already used everywhere else on the site (cards, buttons, pills). Literal, obvious in hindsight, and the kind of thing that should've been there from the start for a site called *Bracketly*.

It ships in two forms:

- A monochrome version for the favicon — theme-aware, so it switches between black and white depending on whether your OS is in light or dark mode, same as the rest of the site already does for text and backgrounds.
- A full-color version using the site's existing accent gradient (blue → purple → pink) for the header and anywhere else a full-color mark makes sense.

## How it's built

Nothing fancier than two `<path>` elements with `stroke-linecap="round"` and `stroke-linejoin="round"` — the rounded bracket ends come for free from the stroke rendering, no manual arc math needed. The tricky part wasn't the shape, it was the spacing: my first attempt had the two brackets' arms overlapping in the middle, which at a glance just looked like a solid rounded rectangle instead of two distinct brackets. Rendered a preview at actual favicon size (32×32) before shipping anything, since a mark that reads fine at 512px can easily turn into mush at the size it actually gets used.

All the PNG variants (32×32, 512×512, and a 180×180 Apple touch icon for anyone who adds the site to their home screen) are rasterized directly from that one SVG source rather than hand-exported, so there's exactly one file to ever update if the mark changes again.

Small change, but it's the kind of detail that either quietly signals "someone's paying attention here" or quietly signals the opposite. [Come take a look](https://bracketly.pages.dev/).
