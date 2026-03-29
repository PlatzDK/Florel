---
description: "Add a new full-screen section to the page"
mode: "agent"
tools: ["editFiles", "codebase"]
---

# Add a new page section

Add a new full-viewport section to `index.html`.

## Placement

Sections are ordered top-to-bottom in the HTML:
1. Hero (no id)
2. `#about` — Stats / About
3. `#gallery` — Image gallery
4. `#features` — Facilities
5. `#booking` — Footer / Booking form

Insert the new section between existing sections as appropriate. If it should appear in the navigation, also add a link to the `<nav>` element.

## Section template

```html
<!-- SECTION_NAME -->
<section id="SECTION_ID" class="scrolly-section relative bg-forest border-t border-white/5">
    <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-xs font-bold tracking-[0.3em] uppercase text-copper mb-16">SECTION_LABEL</h2>

        <!-- Section content here -->

    </div>
</section>
```

## Style guidelines

- Use `scrolly-section` class for full-viewport height.
- Alternate between `bg-forest` and `bg-peat` backgrounds for visual rhythm.
- Section header micro-label: `text-xs font-bold tracking-[0.3em] uppercase text-copper`.
- Large titles: `text-4xl md:text-6xl font-bold uppercase tracking-tight text-sand`.
- Body text: `text-smoke text-sm leading-relaxed`.
- Borders between sections: `border-t border-white/5`.
- Use the custom colour tokens (`forest`, `peat`, `sand`, `copper`, `rust`, `smoke`, `slate`, `teal`).

## Navigation

If the section should be in the top navigation, add a link in the `<nav>` element:

```html
<a href="#SECTION_ID" class="hover:text-sand transition-colors duration-300">LABEL</a>
```

The nav uses `hidden md:flex` so links only show on desktop.
