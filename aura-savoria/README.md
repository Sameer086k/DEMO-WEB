# Aura & Savoria — Restaurant Website

A React + TypeScript + Vite website styled with Tailwind CSS v4 and icons from Lucide React.

## Run on your computer

1. Install Node.js (LTS): https://nodejs.org/
2. Extract this ZIP.
3. Open the extracted `aura-savoria` folder in VS Code.
4. Open Terminal in VS Code and run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL printed in the terminal (usually `http://localhost:5173`).

## Check before publishing

```bash
npm run build
```

The production files are generated in `dist/`.

## Upload to GitHub and publish

- Create a new GitHub repository and upload the contents of this folder (not the ZIP itself).
- On Vercel, choose **Add New → Project**, import the repository, and deploy.
- Vercel normally detects Vite automatically. Build command: `npm run build`; output directory: `dist`.

## Important limitation

The cart, order success message, and reservation confirmation are front-end demonstrations. They do not send real orders, take payments, or create actual reservations. Connect a secure backend or booking/payment provider before using this for a real restaurant.
