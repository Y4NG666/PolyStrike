# Repository Guidelines

## Project Structure & Module Organization
- `backend/`: Node.js/TypeScript API, oracle workers, scrapers, Prisma schema, and seeds (`prisma/`). Entry points under `src/api`, `src/oracle`, and `src/scrapers`.
- `frontend/`: Next.js 14 + Tailwind UI. Pages in `src/app`, shared components in `src/components`, utilities in `src/lib`.
- `contracts/`: Solidity sources (e.g., `UnboxJackpot.sol`).
- `test/`: Jest integration/unit tests for backend plus Solidity Foundry test `UnboxJackpot.t.sol`.
- `add/`: Planning and design docs for the hackathon context.

## Build, Test, and Development Commands
- Backend: from `backend/`
  - `npm install` to install dependencies (Node 20+ recommended).
  - `npm run dev` – start scrapers/ingestion in watch mode.
  - `npm run api` – launch REST/WebSocket server.
  - `npm run oracle`, `npm run unbox:keeper`, `npm run price:keeper` – start respective workers.
  - `npm run build` – typecheck/compile to `dist`.
  - `npm test` or `npm run test:watch` – Jest suite using `ts-jest` ESM config.
  - `npm run prisma:migrate|generate|seed` – manage database schema and seed data.
- Frontend: from `frontend/`
  - `npm install` once; `npm run dev` for local UI; `npm run build` for production; `npm run lint` / `lint:fix` for ESLint.

## Coding Style & Naming Conventions
- TypeScript, ESM modules. Prefer `const`/`let`, camelCase for variables/functions, PascalCase for React components and types.
- Files: kebab-case for components (`price-chart.tsx`), directory-aligned imports.
- Indentation: 2 spaces; keep trailing commas where ESLint enforces. Run `npm run lint` (frontend) and rely on TypeScript/Jest for backend.

## Testing Guidelines
- Jest tests live under `test/` and match `*.test.ts`; setup files `test/setupEnv.ts` and `test/setup.ts` configure environment/mocks.
- Foundry Solidity test: run via `forge test` (ensure Foundry installed).
- Add new tests near related logic (API, processors, scrapers) and cover edge cases for pricing/oracle flows.
- Include sample data in `backend/price_samples.csv` or seed fixtures when relevant.

## Commit & Pull Request Guidelines
- Follow Conventional Commits (seen in history: `feat: ...`, `fix: ...`, `chore: ...`); scope optional but helpful (e.g., `feat(oracle): add price keeper`).
- Keep PRs focused: describe intent, modules touched, and side effects. Link issues/tasks and include screenshots for UI changes.
- Checklist for PRs: tests pass (`npm test`, `forge test`, `npm run lint`), migrations included, env keys documented, and backward compatibility noted for APIs.

## Security & Configuration Tips
- Environment variables: copy/sample `backend/evn.env` to `.env` for local use; never commit secrets. Prisma/Redis endpoints and API keys must be set before running services.
- Validate external data from scrapers; log failures rather than crashing workers. Guard websocket endpoints against unauthenticated access if exposed.
