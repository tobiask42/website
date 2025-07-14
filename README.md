# Personal Website

This is a bilingual, accessible personal website (German/English) built with [Next.js](https://nextjs.org).  
It is designed for privacy-compliant personal use and includes:

- A contact form powered by [Web3Forms](https://web3forms.com)
- A configurable linktree homepage via environment variables
- Translations via [`next-intl`](https://next-intl.dev)
- Accessible by design (keyboard navigation, skip links, proper structure)
- Legal pages (Impressum & Datenschutz) pre-filled for non-commercial usage

---

## Features

- **Bilingual routing** with dynamic language switching (`next-intl`)
- **Customizable Linktree homepage** via environment variables
- **Accessible contact form** (ARIA, honeypot spam protection) powered by [Web3Forms](https://web3forms.com)
- **Privacy-first**: No analytics or tracking
- **Language preference stored** via cookie (middleware-based)
- **Prefilled Legal Pages** (`Impressum` & `Datenschutzerklärung`) for non-commercial personal use
- Fully **keyboard navigable** and **screen-reader friendly**
- Deployed with [Vercel](https://vercel.com)


---

## Environment Configuration

All dynamic content is controlled via `.env` variables:

```env
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_EMAIL=mail@example.com
NEXT_PUBLIC_WEB3FORMS_KEY=YOUR_ACCESS_KEY_HERE
NEXT_PUBLIC_NAME=Your Name
NEXT_PUBLIC_TITLE=Webpage Title
NEXT_PUBLIC_LINKTREE_NAME=Linktree Heading
NEXT_PUBLIC_LINKTREE_DE=Kontaktformular>Kontaktseite>/contact,Example>Meine Beispielseite>https://example.com,Example2>https://example2.com
NEXT_PUBLIC_LINKTREE_EN=Contact Form>/contact,Example>My example page>https://example.com,Example2>https://example2.com
```
- Use `NEXT_PUBLIC_LINKTREE_DE` and `EN` to define language-specific link lists
- Use `Label>AriaLabel>URL` format, separated by commas
- The use of an AriaLabel is recommended for accessibility, but optional
- One entry must be `/contact` to activate the form route
---
## Translations
The locales can be set in src/i18n/routing.ts.
All static text is stored in src/messages/de.json and en.json.
You can freely adjust or extend the keys as needed.
The structure includes sections like:

- base: navigation elements

- form: all form labels, errors, confirmation

- privacy: full Datenschutzerklärung

- impressum: Impressum page content

- 404: not found fallback page

- thanks: form submission success page
---
## Getting Started
Install dependencies
```bash
npm install
# or yarn / pnpm / bun
```
Run development server:
```
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---
## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

---
Disclaimer: This template includes legal and privacy-related content prefilled for private, non-commercial use under German law. It is not guaranteed to be complete or legally sufficient. Please review and adapt all legal texts as needed.