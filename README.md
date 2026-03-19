# WealthWise 💰

A personal finance and budget tracker built with React and TypeScript.

## Live Demo

https://wealthwise-beryl.vercel.app/

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- React Router v6
- React Hook Form
- Zod
- Recharts
- Zustand

## Features

- Track income and expense transactions
- Set budgets per category and track spending progress
- Manage custom categories with icons and colors
- Filter transactions by type
- Dashboard with spending charts and key stats
- Data persists across sessions via localStorage

## Skills Demonstrated

### TypeScript

- `readonly` — field cannot change after creation, perfect for ids
- `?` — field is optional, TypeScript won't throw if missing
- `Transaction | null` generic — state can only be Transaction or null, starts as null before data exists
- Union type — one of specific string values, use `type` not `interface`
- Single literal vs union of literals — single literal locks to one value, union of literals is powerful and type-safe

### Component Patterns

- Smart — knows about data, has logic, talks to context
- Dumb — knows only about props, never imports from context, reusable anywhere
- Component tree — App → BrowserRouter → Routes → Layout → Pages → Components
- `React.ReactNode` — widest children type, accepts everything React can render
- `styles[variant]` — type-safe lookup, avoids if/else chains

### State Management

- `useReducer` — three parts: state, action, reducer
- Never mutate — React detects changes by reference, mutation keeps same reference so no re-render
- Dispatch flow — dispatch → reducer → new state → re-render
- Context shares state, useReducer manages it
- Zustand — global store without a provider, `create` defines state and actions together
- Selector pattern — `useStore((s) => s.slice)` subscribes only to the slice you need, preventing unnecessary re-renders
- `persist` middleware — wraps the store to sync state to localStorage automatically

### Hooks

- `useLocalStorage` — lazy initializer runs once on mount, `<T>` generic sets the shape
- `useMemo` — caches computed value, `useCallback` — caches function
- Only memoize when passed to `React.memo` child or used as `useEffect` dependency
- `useRef` — persists value without re-render, `useState` — persists value with re-render

### Forms

- `z.infer` — generates TypeScript type from schema, stays in sync automatically
- `z.preprocess` — converts string from HTML input to number before validation
- `register` — returns `{ name, ref, onChange, onBlur }`, no re-render on every keystroke

### Patterns & Principles

- Data first — types before UI
- Single source of truth — derived data updates automatically
- Pure function — same input, same output, no side effects
- Prop drilling — passing data through components that don't need it, context solves it
- Provider + custom hook — hides implementation, protects against use outside provider
- `??` vs `||` — `??` only null/undefined, `||` catches all falsy including `0` and `''`
- Named exports — must match name or use `as`, default exports can be named freely

### Architecture

- `types/` — data models, unions, action types
- `store/` — Zustand store, all global state and actions in one place
- `hooks/` — start with `use`, can call other hooks
- `components/ui/` — dumb, props only, never touch context
- `components/layout/` — shell, `Outlet` renders pages inside
- `pages/` — smart, bridge between context and UI components

## Getting Started

```bash
npm install
npm run dev
```
