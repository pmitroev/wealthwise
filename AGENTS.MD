# WealthWise — AGENTS.md

## Stack

React 19, TypeScript, Vite, Tailwind CSS v4, React Router v6, React Hook Form, Zod, Recharts

## Package manager

npm

## Commands

- `npm run dev` — start dev server
- `npm run build` — type-check and build
- `npm run format` — format all files with Prettier

## Git workflow

Always follow the pr-workflow skill for every change.
Never commit directly to main.

## Conventions

- One component per file, export default for components, named exports for hooks and utilities
- Types live in src/types/index.ts
- Custom hooks in src/hooks/
- Context in src/context/
- No `any` types ever
- Use InputField and SelectField from components/ui for all form fields
- Use Field + inputClass from components/ui/Field.tsx

## Project structure

- src/types — data models, unions, action types
- src/context — global state + dispatch
- src/hooks — custom hooks
- src/components/ui — dumb reusable components, props only
- src/components/layout — Navbar, Sidebar, Layout
- src/pages — smart components, talk to context
