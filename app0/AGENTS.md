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
  App.tsx              # Router setup (BrowserRouter, Routes, Route)
  main.tsx             # Entry point, renders <App /> into #root
  index.css            # Tailwind CSS import
  App.css              # Unused (Tailwind handles styling)
  pages/
    Home.tsx           # Landing page with form, tables, map, counters
    Marketplace.tsx    # Full shop with search, filter, cart
    Market.tsx         # User's own implementation of the shop
  components/
    Navbar.tsx         # Navigation bar with active link highlighting
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
  - Responsive grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
  - Responsive flex: `flex flex-col md:flex-row`

### Dynamic className with Template Literals
```tsx
className={`px-4 py-2 rounded-lg border transition-colors ${
  filter === r
    ? 'bg-yellow-600 border-yellow-500 text-white'
    : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
}`}
```
- Use backticks (`` ` ``) for template literals
- Embed ternary `condition ? 'active' : 'inactive'` with `${}`
- Always wrap in `{}` inside JSX attributes

## State & Logic Patterns Used

### useState
```tsx
const [cart, setCart] = useState<Item[]>([]);
const [filter, setFilter] = useState<FilterValue>('all');
const [searchQuery, setSearchQuery] = useState('');
```
- State can be arrays, unions, or primitives
- Never mutate state directly (e.g., `cart.push(item)`); always create a new array/object

### Derived State (Computed, Not Stored)
```tsx
const filteredItems = marketplaceItems.filter((item) => {
  const matchesFilter = filter === 'all' || item.rarity === filter;
  const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesFilter && matchesSearch;
});
```
- Derive filtered/sorted data from state + props instead of storing in `useState`
- Recomputes on every render, stays in sync automatically

### Conditional Rendering
```tsx
{condition && <Component />}
{filteredItems.length === 0 && <p>No items found</p>}
```
Used for showing/hiding elements based on state.

### Lifting State Up
- Form state stored in parent (`Home.tsx`) via `useState`
- Child components receive callbacks via props (e.g., `onAnswer: (answer: string) => void`)

### Lists with `.map()`
```tsx
{items.map((item) => (
  <tr key={item.id}>...</tr>
))}
```
- Always provide a `key` prop
- Use a stable unique ID (`item.id`) instead of array index for lists that filter/reorder

### Form Handling
```tsx
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const value = formData.get('field-name') as string;
  // ...
}
```

### Event Handlers Passing Arguments
```tsx
// Correct: arrow function wraps the call
<button onClick={() => addToCart(item)}>Add</button>

// Wrong: passes the event object, not the item
<button onClick={addToCart}>Add</button>
```

## Features Implemented

### Pages

1. **Home Page** — Form, character table, zone table, map, death counter, contact button
2. **Marketplace Page** — Full shop with:
   - Search bar (controlled input filtering item names)
   - Rarity filter buttons (all / common / rare / legendary)
   - Shopping cart (add items, track count + total price)
   - Responsive CSS Grid item cards
   - Image fallback on error (`onError` handler)
3. **Market Page** — User's own implementation of the shop (same features as Marketplace)

### Components

4. **Navbar** — Sticky nav with `Link` and active route highlighting via `useLocation`
5. **FormER** — Radio form with `FormData` extraction and conditional result message
6. **CharacterTable** — Data table with color-coded group badges
7. **LocationZone** — Zone/period table
8. **ShowERMap** — Image display with shadow
9. **MyButton** — Styled button
10. **EventsButton** — Alert on click with hover glow (`shadow-[...]`)
11. **DeathCounter** — `useState` click counter with styled button

### Routing

12. **React Router DOM** — `BrowserRouter`, `Routes`, `Route`, `Link`, `useLocation`
    - `/` → Home
    - `/marketplace` → Marketplace

## TypeScript Patterns Used

### Union Types for Restricted Strings
```tsx
type FilterValue = 'all' | 'common' | 'rare' | 'legendary';
type Group = 'demigods' | 'gods' | 'roundtable' | 'npcs' | 'bosses';
type GamePeriod = 'early-game' | 'mid-game' | 'end-game';
```
- Prevents typos — TypeScript rejects invalid values at build time
- Gives autocomplete in editors

### Lookup Types
```tsx
function getRarityColor(rarity: Item['rarity']): string { ... }
```
- `Item['rarity']` means "whatever type the `rarity` property of `Item` has"
- Keeps types in sync if the interface changes

### `as const` for Tuple Literals
```tsx
{(['all', 'common', 'rare', 'legendary'] as const).map((r) => ...)}
```
- Tells TypeScript this is a fixed tuple, not a mutable `string[]`
- Allows `.map()` callback parameter to be inferred as `FilterValue` instead of `string`

### Array State Typing
```tsx
const [cart, setCart] = useState<Item[]>([]);
```
- Generic `<Item[]>` tells TypeScript the array holds `Item` objects

## Common Pitfalls to Avoid

- Do not use `: JSX.Element` as a return type (React 19 + TS 6 removed global JSX namespace)
- Ensure radio buttons share the same `name` to work as a group
- Do not nest `<input>` inside `<input>` — JSX tags must be properly closed
- Use `htmlFor` in JSX if pairing label with input via ID (wrapping input inside label avoids this)
- **Do not mutate state directly** — `cart.push(item)` breaks React; use `setCart([...cart, item])`
- **Always use `{}` around template literals in JSX attributes** — `className={`...`}` not `className=\`...\``
- **Do not leave stray characters in template literals** — backticks inside strings will crash parsing
- **Match closing tags carefully** — mismatched `</div>` order breaks the entire component render

## Build Commands
```bash
npm run dev      # Development server
npm run build    # Type check + production build
npm run lint     # ESLint
```
