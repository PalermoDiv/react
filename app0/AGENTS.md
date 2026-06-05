# Agent Guide for app0

## Project Overview
- **Location:** `/Users/palermingoat/Documents/Div/cs/react/app0`
- **Type:** React + Vite + TypeScript + Tailwind CSS v4
- **Build tool:** Vite 8.x
- **CSS framework:** Tailwind CSS 4.x (via `@tailwindcss/vite` plugin)
- **Entry point:** `src/main.tsx` → `src/App.tsx`

## Key Configurations

### Tailwind CSS v4
- No `tailwind.config.js` file. Styles are defined via CSS import.
- `src/index.css` contains: `@import "tailwindcss";`
- **Important for LSP/Neovim:** Import `index.css` in component files (e.g., `import './index.css'`) so the Tailwind language server attaches and provides autocomplete. `main.tsx` imports it, but explicit imports in active editing files ensure LSP detection.
- Do **not** use `import '/src/index.css'` (leading slash) — use relative imports like `import './index.css'`.

### tsconfig
- Project references setup: `tsconfig.json` → `tsconfig.app.json` + `tsconfig.node.json`
- `verbatimModuleSyntax: true` — requires `import type { ... }` for type-only imports
- React 19 + TypeScript ~6.0.2 — no global `JSX` namespace. Do not annotate return types with `: JSX.Element`.

## Project Structure
```
src/
  App.tsx          # Main application component
  main.tsx         # Entry point, renders <App /> into #root
  index.css        # Tailwind CSS import
  App.css          # Unused (Tailwind handles styling)
```

## Coding Conventions

### Component Style
- Prefer **functional components** with explicit prop types
- Use `interface` for object shapes and `type` for unions
- Use `type` for simple prop object types when preferred

### Naming
- Components: `PascalCase` (e.g., `CharacterTable`, `FormER`)
- Types/Interfaces: `PascalCase`
- Variables/functions: `camelCase`

### Imports
- CSS imports: **relative** (`import './index.css'`), not absolute (`import '/src/index.css'`)
- `useState` and other hooks imported from `'react'`

### Styling
- **Tailwind CSS only** — no inline styles, no custom CSS files for components
- Common patterns used:
  - Centering: `flex flex-col items-center` on parent + `max-w-...` on child
  - Cards: `bg-gray-800 border border-gray-600 rounded-xl shadow-lg`
  - Hover states: `hover:bg-... transition-colors`
  - Tables: `w-full`, `divide-y divide-gray-700`, `hover:bg-gray-700`

## State & Logic Patterns Used

### Conditional Rendering
```tsx
{condition && <Component />}
```
Used for showing/hiding elements based on state (e.g., form answer messages).

### Lifting State Up
- Form state stored in parent (`App.tsx`) via `useState`
- Child components receive callbacks via props (e.g., `onAnswer: (answer: string) => void`)

### Lists with `.map()`
```tsx
{items.map((item, index) => (
  <tr key={index}>...</tr>
))}
```
- Always provide a `key` prop
- Array index acceptable for static lists

### Form Handling
```tsx
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const value = formData.get('field-name') as string;
  // ...
}
```

## Features Implemented

1. **Form with conditional message** — "Do you like Elden Ring?" → shows "Welcome, Tarnished" or "You died"
2. **Character table** — Rendered with `.map()`, uses union type `Group` for typed groups, colored by group
3. **Location/Zone table** — Similar pattern with `GamePeriod` union type
4. **Event button** — Alert on click with hover glow effect (`shadow-[...]`)
5. **Image display** — Elden Ring map with rounded corners and shadow

## Common Pitfalls to Avoid

- Do not use `: JSX.Element` as a return type (React 19 + TS 6 removed global JSX namespace)
- Ensure radio buttons share the same `name` to work as a group
- Do not nest `<input>` inside `<input>` — JSX tags must be properly closed
- Use `htmlFor` in JSX if pairing label with input via ID (wrapping input inside label avoids this)

## Build Commands
```bash
npm run dev      # Development server
npm run build    # Type check + production build
npm run lint     # ESLint
```
