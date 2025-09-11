# DarkFuturisticSaaSDashboard

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/difys-projects/v0-dark-futuristic-saa-sd-ashboard)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/hzVtzKiE8ao)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/difys-projects/v0-dark-futuristic-saa-sd-ashboard](https://vercel.com/difys-projects/v0-dark-futuristic-saa-sd-ashboard)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/hzVtzKiE8ao](https://v0.app/chat/projects/hzVtzKiE8ao)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Hidden Header & Smooth Scroll

This project includes an additive, hidden-by-default navigation and smooth scrolling system.

- Files live under `components/nav`, `lib/scroll`, and `styles/nav`.
- No existing layout was modified; one provider import wires the feature.

### Configure
Edit `components/nav/config.ts`:
- `overlay.variant`: `"fullscreen" | "drawer"` (fullscreen default)
- `menuButton.position`: `"top-right" | "top-left" | "bottom-right" | "bottom-left"`
- `smoothScroll`: `enabled`, `offset`, `duration`, `easing`
- `links`: array of `{ label, href }`

### Usage
Already wired in `app/layout.tsx` via `NavProvider`. A floating menu button appears; clicking opens a full-screen overlay with large tap targets.

### Accessibility
- `MenuButton` uses `aria-expanded`, `aria-controls`.
- Overlay uses `role="dialog"` and `aria-modal`.
- Focus is trapped while open; ESC, backdrop, or link click closes it.
- Respects `prefers-reduced-motion`.

### Remove
- Delete `components/nav`, `lib/scroll/smooth.ts`, `styles/nav`.
- Remove `NavProvider` import and wrapper from `app/layout.tsx`.
