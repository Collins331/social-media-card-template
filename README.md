# pebble

Pebble is a polished, Linktree-style social profile page for bringing your social accounts, portfolio, and personal links together in one shareable place.

The current version is a responsive frontend prototype with a live mobile preview and downloadable social card export.

## Features

- Edit your display name and bio with live preview updates.
- Add links for Instagram, LinkedIn, portfolio sites, Behance, and custom destinations.
- Toggle links on or off from the editor.
- Switch between page themes and button styles.
- Share your profile URL with the Web Share API or clipboard fallback.
- Download a PNG card containing your profile information and active handles.
- Responsive layout for desktop and mobile screens.

## Run Locally

No package installation or build step is required.

```bash
python3 -m http.server 4176
```

Open [http://localhost:4176](http://localhost:4176) in your browser.

## Project Structure

| File | Purpose |
| --- | --- |
| `index.html` | Page structure, editor controls, and live profile preview |
| `styles.css` | Responsive layout, typography, themes, and component styling |
| `script.js` | Link management, live updates, sharing, and PNG card export |

## Notes

This is currently a frontend-only prototype. Account creation, authentication, persistent profiles, custom URLs, and cloud storage would require a backend and database.

Profile imagery is loaded from Unsplash for the demo preview.
