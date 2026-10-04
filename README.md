# Shriram Traders – Shop page (React + Tailwind + GSAP + Lenis)
Run: `npm install && npm run dev`  |  Build: `npm run build`
Animation ownership: Lenis = scroll, GSAP/ScrollTrigger = all choreography, CSS = hover/micro-interactions.
Reduced motion is respected (see RM in src/hooks.js and the media query in index.css).

## Before launch
1. `public/images/` currently holds generated stand-in images (made by `tools/gen_images.py`). Swap them for real photos using the same filenames (about 1200x900 JPG; banners 1920x800):
   cement-ultratech, cement-acc, tmt, steel, sand, msand, gitti, brick, aac, wire (product cards)
   hero-cement, hero-steel, hero-bulk (banner, about 1920x800).
   Missing images show a neutral placeholder.
2. Contact details are in `src/data.js` (phone, WhatsApp, address).
3. Replace the demo timeout (App.jsx, `setLoading`) with your API fetch; replace product list in `data.js`.
4. Hook the modal submit (`ui.jsx`, `submit`) to your enquiry API.

## Routes
/ (Home), /shop, /cement, /steel, /sand-gitti, /product/:id, /about, /contact.
On your host, configure SPA fallback so every path serves index.html (Netlify `_redirects`: `/* /index.html 200`, Nginx `try_files $uri /index.html;`).
