# Triloca Mart — Prototype

A click-through prototype covering all four roles: Buyer, Seller, Delivery Partner, and Admin — now with a real, shared product database so anything a seller adds shows up for every tester, not just their own browser.

Plain HTML/CSS/JS, no build step, no framework. The only external pieces are the Firebase SDK (for the shared database) and Google-hosted fonts.

## Run locally in VS Code
1. Open this folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html` → **Open with Live Server**.

Without any setup below, the app runs fine in **local demo mode** — every screen works, "Add Product" just keeps new products on your own device only.

## Turn on the shared database (so testers see each other's products)

This takes about 5 minutes, is free, and needs no server of your own:

1. Go to **[console.firebase.google.com](https://console.firebase.google.com)** → **Add project** → give it any name → finish the wizard (you can skip Google Analytics).
2. In the project: **Build → Firestore Database → Create database** → choose **Start in test mode** → pick any region → Enable.
   - *Test mode = open to anyone for ~30 days, no login needed — perfect for a pilot demo. Don't leave it in test mode for a real public launch (see "Before a real launch" below).*
3. Click the **gear icon → Project settings → General**, scroll to **Your apps**, click the **Web `</>`** icon, register an app (nickname anything), and it will show you a `firebaseConfig` object.
4. Open **`firebase-config.js`** in this folder and paste those six values in, replacing the `YOUR_...` placeholders.
5. Save, redeploy (or refresh Live Server) — the Add Product screen will now show a green "🟢 Connected" note instead of the yellow demo-mode one.

That's it — Firestore is a live, shared, multi-user database. Anyone who adds a product from any device running this site will see it appear in **Search → 🆕 Just Added by Sellers** on everyone else's phone, in real time.

## Deploy to GitHub Pages
1. Create a new GitHub repo (e.g. `triloca-mart`).
2. Push everything in this folder to the repo root:
   ```
   git init
   git add .
   git commit -m "Triloca Mart prototype"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. Repo → **Settings → Pages** → Source: **Deploy from a branch** → `main`, `/ (root)` → Save.
4. Live link: `https://<your-username>.github.io/<repo-name>/`

## Get an installable `.apk` (optional)
1. [pwabuilder.com](https://www.pwabuilder.com) → paste your GitHub Pages URL → **Package for Stores → Android** → download the `.apk`.

## Before a real launch (not needed for testing)
Firestore's **test mode** rules allow anyone to read and write anything — fine for a short pilot with a small group, not fine to leave open indefinitely. When you're past the testing stage, go to **Firestore Database → Rules** and tighten them (e.g. require Firebase Authentication before writes). This prototype has no login system yet, so tightening the rules is a real next step before any public/production rollout — flagging it now so it isn't missed later.

## Files
- `index.html` — page shell; loads the Firebase SDK, then `firebase-config.js`, then `app.js`
- `style.css` — all styling
- `app.js` — every screen, sample data, click logic, and the Firestore product sync
- `firebase-config.js` — **paste your Firebase project keys here** (placeholders by default)
- `manifest.json`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `logo-mark.png` — Triloca Mart branding and PWA install support
- `.nojekyll` — tells GitHub Pages to serve the files as-is

## What's wired to the shared database
- **Seller → Add Product**: writes to a `products` collection in Firestore (also keeps an instant local copy so the seller's own "My Products" list updates immediately even before the network round-trip finishes).
- **Buyer → Search**: listens to that same collection live, and shows a "🆕 Just Added by Sellers" section with a direct Add to Cart button.
- Everything else (cart, checkout, orders, delivery tracking, admin approvals) is unchanged from before — still local, in-memory demo data, exactly as it was.

## Not yet real
No login/authentication, no payments, no maps, no persistence for orders/delivery/admin state (only products are in the shared database). This is a click-through prototype for testing the concept and flow.
