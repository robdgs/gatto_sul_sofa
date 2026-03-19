# 🐱 Gatto Test — Next.js App

A personality quiz built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Features
- **Smooth swipe cards** — drag left/right with spring physics (Framer Motion)
- **Visual feedback** — color stamps and border tints appear while dragging
- **Click buttons** — works on desktop too
- **Animated results** — score breakdown with animated bars
- **Fully typed** — TypeScript throughout

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/
    layout.tsx      # Root layout + metadata
    page.tsx        # Home page
    globals.css     # Tailwind + global styles
  components/
    Quiz.tsx        # Main quiz state manager
    SwipeCard.tsx   # Draggable card with Framer Motion
    ProgressBar.tsx # Animated progress bar
    ResultScreen.tsx# Results with score breakdown
  data/
    questions.ts    # All 37 questions + cat profiles
  hooks/
    useDrag.ts      # Pointer drag hook (utility)
```

## Tech Stack
- [Next.js 14](https://nextjs.org/) — App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) — animations & drag
