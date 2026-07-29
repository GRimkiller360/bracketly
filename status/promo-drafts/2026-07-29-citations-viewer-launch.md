# A Citation Can Look Correct and Still Be Silently Wrong — So I Built a Debugger for It

Anthropic's Claude API has a Citations feature: turn it on for a document you send in, and Claude's response comes back with each claim traceable to the exact passage that backs it — a `cited_text` string, which document it came from, and a location (character range, page number, or content block index). It's genuinely useful for RAG apps where "trust me" isn't good enough. But building against it surfaced a failure mode I hadn't planned for, so I added a [Citations API Response Viewer](https://bracketly.pages.dev/tools/citations-viewer/) to Bracketly, my free client-side dev tools site.

## The part that surprised me

The first surprise is structural: with citations on, Claude doesn't return one text block with inline footnote markers. It returns *multiple* text blocks, and only the blocks backed by a source carry a `citations` array at all. If your code assumes `response.content` is always a single chunk of prose, that assumption breaks the moment citations are enabled — you have to stitch the blocks back together yourself to get the readable answer.

The second surprise is worse, because it fails quietly. Each citation gives you `start_char_index` / `end_char_index` into *your* document — not Claude's copy of it, yours. If the document you show your user, or use for a fact-check pass, isn't byte-for-byte the exact string you sent in the API request — different line endings, a re-export, a "fixed" typo, even different whitespace — those indices point at the wrong span. The `cited_text` field still reads correctly on its own, so nothing *looks* broken. You only find out when someone clicks a citation and it highlights the wrong sentence.

## What the tool does

Paste a response (the full message, its `content` array, or a single block — it auto-detects), and it:

- Reassembles the answer text with each cited passage highlighted and numbered
- Lists every citation with its source document, location, and quoted text, cross-linked back to the passage
- Lets you paste your actual source document per citation and checks, character-by-character, whether `source.slice(start, end)` really equals `cited_text` — flagging a mismatch with the exact (wrong) span it found instead of just saying "nope"

That last part is the one I actually needed and couldn't find anywhere: a way to verify my own document handling was consistent, not just a pretty renderer for the JSON.

100% client-side, nothing you paste leaves your browser: [bracketly.pages.dev/tools/citations-viewer](https://bracketly.pages.dev/tools/citations-viewer/).
