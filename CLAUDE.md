# VRC Browser Chat

## Project Overview

VRC Browser Chat is an application that enables chat communication between VRChat and a web browser. It uses the OSC (Open Sound Control) protocol to communicate with VRChat and provides a modern web interface.

## Architecture

This project consists of two main components:

### 1. Desktop Server (Tauri) - `/server`

- **Tech Stack**: Rust + Tauri + React + TypeScript  
- **Role**: Handles OSC communication with VRChat and functions as a local server  
- **Frameworks**: Tauri 2.x, React 18, Vite  
- **Build**: Bundles static files from `/web/out/` to generate a desktop app  

### 2. Web Interface (Next.js) - `/web`

- **Tech Stack**: Next.js + React + TypeScript + Tailwind CSS  
- **Role**: Web interface for chatting  
- **Frameworks**: Next.js 15.3, React 19  
- **Output**: Generates static files via Static Site Generation (SSG) in the `/out/` directory  

## Development Environment Setup

### Required Environments

- Node.js (Recommended: latest LTS version)  
- Rust (For Tauri build)  
- pnpm (Package manager)  

### Environment Variable Setup

#### Server App Environment Variables (`/server/.env`)

```bash
# Application version (displayed in the UI)
VITE_APP_VERSION=0.1.0
```

#### Configurable Environment Variables

- `VITE_APP_VERSION`: Application version information  
- `TAURI_DEV_HOST`: Host setting for Tauri in development mode (dev only)  

#### Usage of Environment Variables

- **Version Display**: Displayed in `server/src/components/version-button.tsx`  
- **Dev Environment**: Vite automatically manages the host for Tauri development mode  

### Development Commands

#### Server (Tauri) Development

```bash
cd server
pnpm install
pnpm dev # Launch dev mode
```

#### Web Interface Development

```bash
cd web
pnpm install
pnpm dev # Start dev server
pnpm build # Production build (outputs static files to the out directory)
pnpm lint # Run ESLint check
```

### Production Build

This project is built using the following steps:

1. **Build Web App Statically**

```bash
cd web
pnpm build
```

Next.js app outputs static files into the `out/` directory.

2. **Build Tauri App**

```bash
cd server
pnpm tauri build
```

Tauri bundles the static files from `web/out/` into the desktop app.

## Project Structure

```text
vrc-browser-chat/
├── server/ # Tauri desktop app
│   ├── src-tauri/ # Rust backend
│   │   ├── src/
│   │   │   ├── main.rs # Main entry point
│   │   │   ├── osc.rs # OSC communication logic
│   │   │   └── utils.rs # Utility functions
│   │   └── tauri.conf.json # Tauri configuration
│   └── src/ # React frontend
│       ├── components/ # UI components
│       └── lib/ # Utilities and commands
└── web/ # Next.js web app
    ├── src/
    │   ├── app/ # App Router
    │   ├── components/ # UI components
    │   └── lib/ # Utilities
    ├── public/ # Static assets
    └── out/ # Build output (used by Tauri)
```

## Key Features

- **OSC Communication**: Real-time communication with VRChat  
- **Chat Functionality**: Send and receive chat messages in browser  
- **Server Management**: Monitor connection status and settings  
- **Theme Support**: Dark/Light theme support  

## Development Notes

- Server and Web Interface can be developed independently  
- OSC settings must match VRChat's configuration  
- Building the Tauri app may require system-specific setup  

## Troubleshooting

- If Tauri build errors occur, check your Rust environment  
- If OSC communication doesn’t work, verify port and VRChat settings  
- If ESLint errors appear in Next.js, run `pnpm lint` to check details  
