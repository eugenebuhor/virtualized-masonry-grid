# Virtualized Masonry Grid

A virtualized masonry grid built with React, TypeScript, and Vite.

Try it at the [DEMO](https://virtualized-masonry-grid.vercel.app/) page.

---

## Getting Started

### Prerequisites
- Node.js (version 16+ recommended)
- `npm` or `yarn` installed

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/virtualized-masonry-grid.git
   cd virtualized-masonry-grid
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
### Environment Variables

To configure the application, create a `.env` file in the root directory by copying the provided `.env.example` file:

```bash
cp .env.example .env
```

Ensure to populate the variables in the `.env` file with the required values. These are necessary for the app to function correctly.

---

## Scripts Overview

### Development Server
Start a local development server:
```bash
npm run dev
```

### Build
Bundle the app for production:
```bash
npm run build
```

### Preview
Serve the production build locally using `vite preview`:
```bash
npm run preview
```

---

## Testing

### Run Tests
Execute the test suite with Jest:
```bash
npm run test
```

### Watch Tests
Run tests in watch mode for rapid development:
```bash
npm run test:watch
```

### Test Coverage
Generate a code coverage report:
```bash
npm run test:coverage
```

---

## Linting
Lint the codebase using ESLint:
```bash
npm run lint
```

---

## Implementation Details

This project was designed with a strong emphasis on code quality, performance, accessibility, and responsiveness. Below are the key considerations and tools used:

---

#### **Code Quality**
- **TypeScript:** Ensures type safety and clear contracts for component APIs and utility functions. Centralized type definitions (`src/types`) reduce duplication and improve maintainability.
- **ESLint & Prettier:** Used for linting and code formatting to enforce a consistent code style.
- **Unit Tests:** Added for components, hooks, and utilities.
- **Lint-staged & Husky:** Automates pre-commit checks, ensuring clean code is committed to the repository.

---

#### **Performance**
- **Virtualized Masonry Grid:** Implements virtualization and infinite scrolling to render only visible items in the viewport, reducing memory usage and improving rendering performance.
   - Includes an optional `throttledScroll` flag for scroll performance tuning.
- **Image Component:** Implements LQIP (Low-Quality Image Placeholder) with attributes like `fetchPriority` and `decoding`, ensuring optimized image loading.
- **React Hooks:** Hooks like useCallback, useEffect, and others, minimize unnecessary re-renders by ensuring stable function references and properly handling dependencies.
- **Vite (with Rollup):** Chosen over CRA (Webpack) for faster builds, optimized output, and a modern development experience.
- **React Query:** Efficiently manages server state with built-in caching, deduplication, and background refetching.

---

#### **Accessibility**
- **Semantic HTML:** Ensures proper use of roles and ARIA attributes, such as `role="list"` and `role="listitem"`, for enhanced accessibility.
- **Keyboard Navigation:** Supports keyboard interaction for key elements like links and buttons.
- **Semantic HTML Tags:** Uses `<main>`, `<section>`, `<nav>`,  and `<header>` to provide a clear structure for screen readers.
---

#### **Responsiveness**
- **CSS-in-JS (styled-components):** Simplifies dynamic styling, such as adjusting grid columns based on screen size, while maintaining clear theme integration.
- **Breakpoints and Columns:** Uses a mobile-first design strategy with inherited column configurations for the masonry grid.
- **Media Queries:** Implemented mobile-first appriach, via the theme and custom hooks (`useMediaQuery`) for consistent responsiveness.

---

#### **Web Vitals**
- **Core Web Vitals:**
   - **Largest Contentful Paint (LCP):** Lazy loading and prioritized resource loading (e.g., `fetchPriority="high"` for key images).
   - **Cumulative Layout Shift (CLS):** Predefined aspect ratios for images to prevent layout shifts during loading.
   - **First Input Delay (FID):** Optimized event handlers with `useCallback` to prevent unnecessary re-renders and `debounce` to throttle high-frequency interactions, ensuring faster response times.
- **Preloading Critical Resources:** Vite’s build optimizations ensure essential chunks are prioritized.

---

#### **Vite Configuration**
- **Plugins:** Uses `@vitejs/plugin-react-swc` for improved build performance with React and TypeScript.
- **Code Splitting:** Rollup manual chunks separate common libraries (e.g., React, React Router, React Router Dom, Styled-Components, React Query, Axios) for better caching and faster page loads.
- **Minification:** Utilizes `esbuild` for faster and smaller builds.

