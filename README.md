# Dot Canvas — Interactive Circle Drawing App

A modern, interactive "dot canvas" application built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**. Click anywhere on the canvas to place colorful gradient circles, switch colors, and undo your last placement.

![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

---

## 📑 Table of Contents

- [🔗 Quick Links](#-quick-links)
- [✨ Features](#-features)
- [🚀 Getting Started](#-getting-started)
- [🏗️ Project Structure](#-project-structure)
- [🎯 How It Works](#-how-it-works)
  - [Coordinate Transformation](#-coordinate-transformation)
  - [Data Model & Factory](#-data-model--factory)
  - [State Management](#-state-management)
- [🎨 Design & Aesthetics](#-design--aesthetics)

---

## 🔗 Quick Links

- **Screen Sharing:** [Google Meet](https://meet.google.com/koa-hxha-ink)
- **WhatsApp Groups:**
  - [Full Stack AIT_NTPP-1](#)
  - [Full Stack BDS-1-A](#)
  - [Full Stack BCY-3-B](#)

---

## ✨ Features

- **Dynamic Canvas**: Responsive drawing area that maintains dot positions on resize.
- **Initial Dot Generation**: Automatically populates 23 random dots upon mounting.
- **SVG-Powered Precision**: Uses advanced SVG matrix transformations for pixel-perfect placement.
- **Color Customization**: Choose from 6 vibrant linear-gradient presets.
- **Undo Functionality**: Easily remove the last dot added.
- **Live Counter**: Real-time tracking of the total number of circles on the canvas.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: 18.x or higher
- **Package Manager**: `pnpm` (recommended), `npm`, or `yarn`

### Installation

1.  **Clone/Open the repository**
2.  **Install dependencies**:
    ```bash
    pnpm install
    ```
3.  **Run Development Server**:
    ```bash
    pnpm dev
    ```
4.  **View the App**: Open [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Project Structure

```text
2c/
├── app/
│   ├── page.tsx        # Main UI & Interactive Logic
│   ├── layout.tsx      # Root Layout & Font Configuration (Geist)
│   ├── globals.css     # Tailwind 4 Styles & Variables
│   └── favicon.ico     # App Icon
├── components/
│   └── ui/
│       └── button.tsx  # Shadcn-style Reusable Button
├── lib/
│   └── utils.ts        # CSS Merging Helper (cn)
├── public/             # Static Assets
└── package.json        # Project Manifest & Metadata
```

---

## 🎯 How It Works

### 📐 Coordinate Transformation

The core of the interaction lies in converting screen-space mouse events into canvas-relative percentage coordinates. This ensures that dots stay in their correct relative positions even if the browser is resized.

```tsx
// Using SVG point logic for transformation
const point = svg.createSVGPoint();
point.x = event.clientX;
point.y = event.clientY;

const ctm = svg.getScreenCTM();
if (ctm) {
  const transformedPoint = point.matrixTransform(ctm.inverse());
  const x = (transformedPoint.x / rect.width) * 100;
  const y = (transformedPoint.y / rect.height) * 100;
}
```

**Key APIs used:**

- `getScreenCTM()`: Retrieves the Current Transformation Matrix.
- `matrixTransform()`: Applies matrix math to coordinates.
- `ctm.inverse()`: Reverses the transformation to map screen -> local space.

### 🏗️ Data Model & Factory

The app uses a clean data structure and a factory function to maintain consistency:

```tsx
type Dot = {
  id: string;
  x: number; // 0 - 100
  y: number; // 0 - 100
  color: string; // Tailwind gradient classes
};

function createDot(id: any, x: number, y: number, color: string): Dot {
  return { id: `${id}`, x, y, color };
}
```

### 🧠 State Management

React's `useState` manages the dots array, using immutable updates to trigger re-renders:

- **Add**: `setDots((dots) => [...dots, newDot])`
- **Undo**: `setDots((dots) => dots.slice(0, -1))`
- **Initial**: `useEffect` hook triggers `generateDots(23)` once on mount.

---

## 🎨 Design & Aesthetics

- **Tailwind CSS v4**: Leveraging the latest CSS-in-JS features and modern color palettes.
- **Gradients**: Vibrant `bg-linear-to-b` backgrounds for each dot.
- **Glassmorphism & Soft Shadows**: The UI uses subtle slate backgrounds and white card containers for a premium feel.
- **Responsive Layout**: Utilizing `aspect-4/3` for the canvas to maintain a consistent drawing area across devices.
