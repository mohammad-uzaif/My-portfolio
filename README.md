# Uzaif Portfolio — HTML / CSS / JS

## Folder structure

uzaif-portfolio/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── Uzaif_Resume.pdf
    ├── certification-1.jpg
    ├── certification-2.jpg
    └── certification-3.jpg

## Quick editing

### 1. Resume
Put your real resume at:
assets/Uzaif_Resume.pdf

The button in `index.html` already points there.

### 2. Social links
Open `index.html`, search for `social-grid`, then replace the `href="#"` URLs
with your real LinkedIn, GitHub, Instagram etc.

### 3. Project links
Inside each `.project-card`, replace:
- Live link `href="#"`
- Source code `href="#"`

### 4. Add a certification
Copy one complete `<article class="cert-card">...</article>` from the
certification section in `index.html`.

Then edit:
- image path: `assets/certification-4.jpg`
- `alt`
- certificate number
- category
- title
- provider / year
- credential URL

Example:
<img src="assets/certification-4.jpg" alt="My new certificate" />

### 5. Change the accent color
Open `style.css` and edit:
--accent: #b7ff18;

Some good alternatives:
- Tomato: #ff6347
- Netflix red: #e50914
- Orange: #ff7a00
- Lime: #b7ff18

The current lime is chosen for high contrast, energy and clear action cues
against the monochrome system.

### 6. Change typography
The page uses:
- Space Grotesk for headings
- DM Sans for body text

Fonts are loaded from Google Fonts. To make the site fully offline,
replace the Google Fonts import with local/system fonts.

## Run it
Open `index.html` in a browser.

For a development server, VS Code's Live Server extension is convenient,
but no framework or build step is required.
