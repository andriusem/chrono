# Archived Modern UI

This folder keeps the Modern UI prototype for optional local use.

## Run Locally

1. In `frontend/src/main.tsx`, switch the import to:
   ```ts
   import App from './archived/modern/App.modern'
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```

Revert the import to `./App.tsx` to return to the Classic UI.
