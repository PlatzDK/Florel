---
description: "Add a new facility card to the Facilities section"
mode: "agent"
tools: ["editFiles", "codebase"]
---

# Add a new facility card

Add a new facility to the "Designed for Anglers" section in `index.html`.

## Location

Find the `<section id="features">` element. Inside its `.grid.md\\:grid-cols-3` container, add a new card after the existing ones.

## Card template

Use this pattern, which matches the existing cards exactly:

```html
<div class="group border-t border-white/10 pt-8 hover:border-copper transition duration-500">
    <h3 class="text-2xl font-bold uppercase mb-4 text-sand group-hover:text-copper transition-colors">
        FACILITY_TITLE</h3>
    <p class="text-smoke text-sm leading-relaxed">FACILITY_DESCRIPTION</p>
</div>
```

## Guidelines

- If adding a 4th card, consider changing the grid from `md:grid-cols-3` to `md:grid-cols-2` or keeping 3 columns and letting items wrap naturally.
- Title should be short (2-3 words), in English (matching existing titles: "Cleaning Station", "Deep Freeze", "Gear Drying").
- Description should be 1-2 sentences, matching the concise, professional tone of the existing copy.
- Use the same Tailwind classes as the existing cards — do not introduce new styles.
