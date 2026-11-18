# Deployment & Operations

## GitHub Pages CI/CD Pipeline

The repository uses GitHub Actions for continuous integration and automated deployment:
- **Workflow File**: [`.github/workflows/deploy.yml`](../../.github/workflows/deploy.yml)
- **Target URL**: [https://terrykell-byte.github.io/king-edward-hall-website/](https://terrykell-byte.github.io/king-edward-hall-website/)

On every push to `main`, the pipeline executes:
1. `npm ci` — Clean dependency installation
2. `npm test` — Runs the Vitest unit test suite (11 tests covering pricing, Friday evening overlap, capacity warnings, local timezone date helpers, and mailto generation)
3. `npm run build` — Runs `tsc && vite build` to verify strict TypeScript types and bundle production assets into `./dist`
4. Deploys `./dist` to GitHub Pages via `actions/deploy-pages@v4`

---

## ⚙️ Relative Base Configuration

To support deployment on GitHub Pages (hosted under `/king-edward-hall-website/`) without breaking local development or custom root domains, Vite is configured with `base: './'`:

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
})
```

---

## 🧪 Testing & Verification Routine

Before pushing any changes or merging pull requests, run the verification routine:

```bash
# 1. Run unit test suite (11 Vitest tests)
npm test

# 2. Compile TypeScript and generate production bundle
npm run build

# 3. Preview locally
npm run preview
```

---

## 🔒 Security & Environment Boundaries
- The application is purely client-side and requires no environment secrets or database credentials.
- All room hire, event registration, and donation inquiries are dispatched via standard `mailto:` links and clipboard summaries directly from the user's browser, preventing server-side spam vulnerabilities.
