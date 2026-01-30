# Dot Canvas — Interactive Circle Drawing App

A modern, interactive "dot canvas" application built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**. Click anywhere on the canvas to place colorful gradient circles, switch colors, and undo your last placement.

![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)

---

## ✨ Features

- **Initial Dots**: On first render, 23 random dots are created and displayed
- **Click to Add**: Click inside the canvas to add a new dot at that position
- **Color Picker**: Choose from 6 vibrant gradient colors (Blue, Red, Green, Purple, Orange, Pink)
- **Undo**: Remove the most recently added dot with a single click
- **Live Counter**: Shows how many dots are currently rendered
- **Responsive Design**: Dots use percentage-based positioning for responsive scaling

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🏗️ Project Structure

```
2c/
├── app/
│   ├── page.tsx        # Main interactive canvas component
│   ├── layout.tsx      # Root layout with fonts (Geist)
│   ├── globals.css     # Global styles and Tailwind imports
│   └── favicon.ico     # App favicon
├── components/
│   └── ui/
│       └── button.tsx  # Reusable button component (shadcn/ui)
├── lib/
│   └── utils.ts        # Utility functions (cn helper)
├── public/             # Static assets (SVG icons)
└── package.json        # Dependencies and scripts
```

---

## 🎯 How It Works

### Data Model

Each dot is represented by the `Dot` type:

```tsx
type Dot = {
  id: string; // Unique identifier (used as React key)
  x: number; // X position in percent (0–100)
  y: number; // Y position in percent (0–100)
  color: string; // Tailwind gradient classes
};
```

### Color Palette

The app provides 6 preset gradient colors:

| Color  | Gradient Classes                |
| ------ | ------------------------------- |
| Blue   | `from-blue-400 to-blue-600`     |
| Red    | `from-red-400 to-red-600`       |
| Green  | `from-green-400 to-green-600`   |
| Purple | `from-purple-400 to-purple-600` |
| Orange | `from-orange-400 to-orange-600` |
| Pink   | `from-pink-400 to-pink-600`     |

### SVG Coordinate Transformation (Deep Dive)

The app uses the **SVG `createSVGPoint()` and `matrixTransform()` API** for precise coordinate mapping. This converts raw mouse clicks (screen coordinates) into coordinates relative to the canvas, even if the element is resized or transformed.

```tsx
// 1. Get canvas dimensions for normalization
const rect = canvas.getBoundingClientRect();

// 2. Create an SVG point from mouse coordinates
const point = svg.createSVGPoint();
point.x = event.clientX;
point.y = event.clientY;

// 3. Get the Screen CTM (Current Transformation Matrix)
const ctm = svg.getScreenCTM();

if (ctm) {
  // 4. Transform screen coordinates to SVG coordinates using the inverse matrix
  const transformedPoint = point.matrixTransform(ctm.inverse());

  // 5. Convert to percentage coordinates (Responsive)
  const x = (transformedPoint.x / rect.width) * 100;
  const y = (transformedPoint.y / rect.height) * 100;

  // 6. Clamp values to keep dots within "safe zone"
  const clampedX = Math.max(2, Math.min(98, x));
  const clampedY = Math.max(2, Math.min(98, y));
}
```

#### Detailed Breakdown:

- **`canvas.getBoundingClientRect()`**: Returns the size and position of the canvas relative to the viewport. Used to calculate `width` and `height` for final percentage conversion.
- **`svg.createSVGPoint()`**: Creates a utility `SVGPoint` object. SVGs have built-in math capabilities for coordinate systems that regular HTML elements lack.
- **`event.clientX` & `event.clientY`**: The raw pixel coordinates of the mouse click relative to the browser window.
- **`svg.getScreenCTM()`**: Returns a matrix describing how the SVG's internal coordinate system maps to the screen (accounting for CSS transforms, zoom, etc.).
- **`ctm.inverse()`**: Reverses the matrix. Instead of mapping **Local → Screen**, it maps **Screen → Local**.
- **`point.matrixTransform(ctm.inverse())`**: Applies the inverse matrix to the raw mouse coordinates, producing a point relative to the top-left of the SVG.
- **Normalizing & Clamping**:
  - **Normalization**: Converting coordinates to percentages makes the app **responsive**. Dots maintain their relative positions regardless of screen size.
  - **Clamping**: Using `Math.max(2, Math.min(98, x))` ensures dots don't get cut off at the very edges of the container.

#### 💡 What is a CTM?

**CTM** stands for **Current Transformation Matrix**. It is a mathematical tool (specifically a 3x3 matrix) that acts as a **bridge** between two different coordinate systems:

1.  **SVG World (Local Space):** Where shapes are defined (e.g., "x=10, y=10").
2.  **Screen World (Viewport Space):** Where pixels actually live on your monitor.

The CTM accounts for **everything** affecting the element's final position, including:

- Desktop/Mobile window positioning.
- CSS transforms like `rotate()`, `scale()`, or `translate()`.
- Browser zoom levels.
- Scroll offsets of parent containers.

By using `ctm.inverse()`, the app "reverses" the browser's complex math, allowing us to find out exactly where a screen-click landed inside the SVG's local coordinate system.

### State Management

The app uses React's `useState` hook with proper immutability patterns:

```tsx
// Adding a dot (spread operator creates new array)
setDots((current) => [
  ...current,
  { id: `dot-${Date.now()}-${current.length}`, x, y, color: selectedColor },
]);

// Undo (using a negative index with .slice())
// .slice(0, -1) creates a new array containing all elements except the last one.
// The negative index -1 refers to the last element of the array.
setDots((current) => current.slice(0, -1));
```

### Why Percentages?

Using percentage positions makes dots responsive. If the container resizes, the dots maintain their relative positions instead of shifting incorrectly as they would with fixed pixels.

---

## 📝 Key Implementation Details

### Client Component

The file starts with `"use client"`, ensuring it runs in the browser and can use hooks like `useState`, `useEffect`, and `useRef`.

### Initial Dots Generation

```tsx
function generateDots(count: number): Dot[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `dot-${index + 1}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: "from-blue-400 to-blue-600",
  }));
}

// The useEffect hook is used to perform side effects.
// Here, we use it with an empty dependency array ([]) to trigger the
// dot generation only once when the component initially mounts.
useEffect(() => {
  setDots(generateDots(23));
}, []);
```

### Clamping Coordinates

Dots are clamped to stay within the canvas boundaries (2%–98%):

```tsx
x: Math.max(2, Math.min(98, x)),
y: Math.max(2, Math.min(98, y)),
```

---

## 🎨 Quick Flow Summary

1. **Mount** → 23 random dots are created
2. **Click canvas** → Position converted to percentage → New dot added with selected color
3. **Pick color** → Future dots use that gradient
4. **Click Undo** → Last dot removed
