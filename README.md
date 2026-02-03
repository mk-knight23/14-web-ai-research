# 14 Web AI Research

A cutting-edge AI-powered blogging platform integrating LangChain logic with a high-performance React frontend. Featuring advanced prompt engineering foundations, sophisticated content processing, and a lightning-fast architectural core.

## Tech Stack

- **Frontend**: React 19, Tailwind CSS v4
- **Build Tool**: Vite 6
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Testing**: Vitest, React Testing Library

## Features

- Professional AI Research & Content Presentation
- Sophisticated content analysis and generation patterns
- Responsive Multi-Resolution Interaction Design
- Engineered with React 19
- High-Speed Pipeline via Vite 6
- Comprehensive test coverage

## Quick Start

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Test

```bash
npm run test
```

## Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [Design System](docs/DESIGN.md)
- [Deployment Guide](docs/DEPLOY.md)

## Live Deployments

Auto-deployed from GitHub main branch:

| Platform | URL | Status |
|----------|-----|--------|
| **Vercel** | https://14-web-ai-research.vercel.app | Active |
| **GitHub Pages** | https://mk-knight23.github.io/14-web-ai-research/ | Active |
| **Render** | https://14-web-ai-research.onrender.com | Pending |
| **Firebase** | https://web-ai-research.web.app | Pending |
| **AWS Amplify** | https://main.web-ai-research.amplifyapp.com | Pending |

## Deployment Configuration

### Render

This repository includes a `render.yaml` blueprint for automated deployment:

1. Visit [dashboard.render.com](https://dashboard.render.com)
2. Click "New +" -> "Blueprint"
3. Connect repository: `mk-knight23/14-web-ai-research`
4. Render will auto-detect and apply the blueprint configuration

### Manual Deployment

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

## Project Structure

```
14-web-ai-research/
├── src/
│   ├── App.tsx           # Main application component
│   ├── App.test.tsx      # Component tests
│   ├── main.tsx          # Entry point
│   ├── ErrorBoundary.tsx # Error handling
│   └── index.css         # Global styles
├── dist/                 # Build output
├── docs/                 # Documentation
├── .github/workflows/    # CI/CD pipelines
├── render.yaml           # Render deployment config
├── firebase.json         # Firebase hosting config
├── amplify.yml           # AWS Amplify config
├── vercel.json           # Vercel config
└── package.json
```

---

*Maintained by [Kazi Musharraf](https://github.com/mk-knight23)*

Last Updated: 2026-02-03
