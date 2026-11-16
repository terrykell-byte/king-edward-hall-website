# Deployment & Operations

## GitHub Pages CI/CD Pipeline

The repository uses GitHub Actions for continuous integration and automated deployment:
- **Workflow File**: [`.github/workflows/deploy.yml`](file:///home/antigravity/.github/workflows/deploy.yml)
- **Target URL**: [https://terrykell-byte.github.io/king-edward-hall-website/](https://terrykell-byte.github.io/king-edward-hall-website/)

---

## ⚙️ Relative Base Configuration

To support deployment on GitHub Pages (hosted under a sub-path `/king-edward-hall-website/`) without breaking local development or alternative root domains, Vite is configured with `base: './'`:

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
# 1. Run unit test suite
npm test

# 2. Compile TypeScript and generate production bundle
npm run build

# 3. Preview locally
npm run preview
```

---

## 🔒 Security & Environment Boundaries
- The application is purely client-side and requires no environment secrets or database credentials.
- All email inquiries are dispatched via standard `mailto:` links directly from the user's browser, preventing server-side spam vulnerabilities.
