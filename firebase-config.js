// ── Firebase setup ────────────────────────────────────────────────────────
// This file connects Triloca Mart to a real, shared, free Firebase database
// so that when someone adds a product on the Seller side, every tester
// browsing the site sees it — not just their own browser.
//
// 1. Go to https://console.firebase.google.com → "Add project" (free).
// 2. In the project: Build → Firestore Database → Create database → Start in TEST MODE.
//    (Test mode = open read/write for ~30 days, no login needed. Fine for a
//    short pilot/demo. Do NOT leave test mode on for a real public launch —
//    see the README for how to lock it down later.)
// 3. Project settings (gear icon) → General → "Your apps" → Add app → Web (</>).
// 4. Copy the firebaseConfig object it gives you and paste the values below.
//
// Until you do this, the app runs fine in local-only demo mode — nothing
// breaks, products just won't be shared between testers yet.

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
