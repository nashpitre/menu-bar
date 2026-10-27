# nashp menu bar

The complete homepage menu component extracted from nashp.com's Odyssey Blot template. No production files were changed.

## Run

Serve this folder with a static server (for example, `python3 -m http.server 8766`) and open `http://localhost:8766`. No npm packages or build step.

## Files

- `src/menu.html`: actual homepage navigation markup.
- `src/menu.css`: full shared critical menu/popover styles, including entry-page variants and adjacent ticker styling.
- `src/menu.js`: original popup runtime, menus, positioning, outside-click/Escape/resize handling and search handoff.
- `blot/search.html`, `blot/search-data.html`: production search implementation and Blot index template. These need Blot rendering; they are not standalone HTML.
- `index.html`: standalone demo. Its search adapter demonstrates the handoff; the full production search is retained separately, not replaced.

## Integration

Include the CSS in the head, insert the navigation markup, and load the JS before DOMContentLoaded (or use defer). The script expects the host to provide `#nashp-search-trigger`; Blot's included search partial provides it. Use `body.home.blog` for homepage styling or `.site-header-menu` for entry pages. Internal links are relative to nashp.com in production; point the demo's internal destinations at your own routes if embedding elsewhere.

The adjacent Extractor ticker has its own repository. The menu does not require it. Electrolize is loaded by the demo from Google Fonts; system sans-serif is the fallback. No image assets are needed.

No license has been assigned; public visibility alone does not grant a reuse license.
