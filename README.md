# GitVeda

Gamified Git learning platform built with React + Vite + Firebase.

## Features
- Interactive terminal simulator (`git init/add/commit/branch/checkout/status/log`)
- Repository visualizer (live commit graph)
- Scenario challenge page scaffold
- XP/level game context and dashboard
- Auth flow with protected routes
- Firebase Auth (email/password + Google)
- Firestore service layer for profiles, progress, challenges, leaderboard
- Lazy-loaded routing and modular architecture

## Tech Stack
- React 18, React Router v6
- Context API + `useReducer`
- Vite + Sass
- Firebase (Auth + Firestore)

## Setup
1. `cp .env.example .env`
2. Add Firebase keys in `.env`
3. `npm install`
4. `npm run dev`

## Firebase Collections
- `profiles`
- `challenges`
- `user_progress`

## Notes
Current version is production-grade architecture + working baseline. Extend command engine with `merge/reset/rebase`, add challenge validation engine, Firestore security rules, and analytics charts.
