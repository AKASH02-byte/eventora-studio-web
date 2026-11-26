# Eventora

Eventora is a cinematic event-production studio website for showcasing LED walls, photography, video production, live broadcast, and full event management.

It is a single-page experience with anchor navigation, a project portfolio, service information, an LED-screen configurator, and a quote request form.

## Highlights

- Dark cinematic theme and a crisp violet-accented light theme
- Theme-aware animated aurora backgrounds with reduced-motion support
- Responsive production portfolio, service and showcase sections
- Phone-only floating navigation; tablet and desktop use the main header
- Contact panel with a structured project-brief form
- Accessible dialogs, controls, and semantic section navigation

## Stack

- React 19 + TypeScript
- TanStack Start / TanStack Router
- Vite 8
- Tailwind CSS 4
- Radix UI and Lucide icons

## Getting started

Prerequisites: Node.js 20+ and npm.

```sh
git clone https://github.com/AKASH02-byte/eventora-studio-web.git
cd eventora-studio-web
npm install
npm run dev
```

The development server runs at `http://localhost:8081`.

## Commands

```sh
npm run dev       # Start the local development server
npm run build     # Create a production build
npm run lint      # Run ESLint
npm run test      # Run the test suite
npm run format    # Format source files with Prettier
```

## Project structure

```text
src/
├── components/   # Shared UI, including the phone navigation
├── routes/       # Homepage and app route setup
└── styles.css    # Theme tokens, responsive styles, and animation system
```

## Development notes

The site intentionally remains a single homepage rather than separate routes. Use its section anchors (`#services`, `#projects`, `#contact`, and so on) for navigation.

Keep the `main` branch in a working state and use ordinary commits for changes.
