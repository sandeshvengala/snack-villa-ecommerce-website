# Project Guidelines

## Build and Test
- Install dependencies: `npm install`
- Run local development: `npm run dev`
- Build production bundle: `npm run build`
- Lint code: `npm run lint`
- Preview production build: `npm run preview`
- Firebase Admin setup helper: `npm run admin:init`
- There is currently no automated test script in `package.json`.

## Architecture
- This is a React + Vite + TypeScript SPA.
- App shell and routing are defined in `src/App.tsx`.
- Keep page-level UI in `src/pages`, reusable UI in `src/components`, and shared domain types in `src/types`.
- Global state uses Zustand stores in `src/stores/index.ts` (`useCartStore`, `useAuthStore`, `useOrderStore`).
- Firebase client setup lives in `src/lib/firebase.ts`; auth mapping helpers live in `src/utils/auth.ts`.
- Admin-side Firebase scripts are in `server/` and run via Node (`server/firebaseAdmin.cjs`).

## Conventions
- Co-locate styles with pages/components (`*.tsx` + matching `*.css`), and keep app-wide CSS in `src/index.css` and `src/styles/index.css`.
- Prefer existing type-first patterns (explicit interfaces/types, typed props) and avoid introducing untyped app-level state.
- Preserve current routing and protection pattern: protected pages should be wrapped with `src/components/ProtectedRoute.tsx`.
- Keep price/formatting behavior aligned with current INR/en-IN utilities in `src/utils/index.ts`.

## Environment and Pitfalls
- Client Firebase auth requires variables from `.env.example` (`VITE_FIREBASE_*`).
- If Firebase client config is missing, `auth` is `null`; auth features should fail gracefully (see `src/lib/firebase.ts`).
- `npm run admin:init` requires `FIREBASE_SERVICE_ACCOUNT_PATH`.
- Link to existing docs instead of duplicating guidance. For setup basics, see `README.md` and `.env.example`.
