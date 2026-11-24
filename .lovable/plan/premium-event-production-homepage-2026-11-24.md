# Premium Event Production Homepage

## Scope

- Replace the starter screen with a single responsive homepage for a photography, video, LED rental, and event production company.
- Keep the company name, contact details, and video IDs editable placeholders; do not invent business details or add other pages or backend features.

## Experience

- Create a cinematic dark editorial direction with vivid electric accents, refined glass panels, strong imagery, and lightweight motion.
- Include the requested hero, four service areas, LED size solutions, featured project grid, replaceable playable YouTube embeds, differentiators, and contact call to action.
- Add desktop anchor navigation and a fixed, safe-area-aware mobile bar for Home, Projects, About, and Contact.

## Implementation

- Define the semantic color, typography, surface, and motion tokens in `src/styles.css`.
- Build the homepage in `src/routes/index.tsx` using reusable local section and card patterns, Lucide icons, and responsive Tailwind utilities.
- Add page-specific metadata for `/` and update the shared root metadata to remove template branding.
- Use app-managed visual assets and no additional routes, authentication, databases, or external service integrations.

## Verification

- Check the preview on desktop and mobile for section navigation, embeds, text fit, safe-area spacing, and horizontal overflow.
- Run the existing route test and confirm the preview build has no errors.
