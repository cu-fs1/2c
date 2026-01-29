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
# Clone the repository
git clone <repository-url>
cd 2c

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Build for Production

```bash
pnpm build
pnpm start
```

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

### SVG Coordinate Transformation

The app uses the **SVG `createSVGPoint()` and `matrixTransform()` API** for precise coordinate calculations when placing dots:

```tsx
// Create an SVG point from mouse coordinates
const point = svg.createSVGPoint();
point.x = event.clientX;
point.y = event.clientY;

// Transform screen coordinates to SVG coordinates using the inverse CTM
const ctm = svg.getScreenCTM();
if (ctm) {
  const transformedPoint = point.matrixTransform(ctm.inverse());
  // Convert to percentage coordinates
  const x = (transformedPoint.x / rect.width) * 100;
  const y = (transformedPoint.y / rect.height) * 100;
}
```

This approach ensures accurate dot placement regardless of:

- CSS transforms or scaling
- Viewport changes
- Device pixel ratios

### State Management

The app uses React's `useState` hook with proper immutability patterns:

```tsx
// Adding a dot (spread operator creates new array)
setDots((current) => [
  ...current,
  { id: `dot-${Date.now()}-${current.length}`, x, y, color: selectedColor },
]);

// Undo (slice creates new array without last element)
setDots((current) => current.slice(0, -1));
```

### Why Percentages?

Using percentage positions makes dots responsive. If the container resizes, the dots maintain their relative positions instead of shifting incorrectly as they would with fixed pixels.

---

## 🛠️ Tech Stack

| Technology                                    | Version | Purpose                         |
| --------------------------------------------- | ------- | ------------------------------- |
| [Next.js](https://nextjs.org/)                | 16.1.4  | React framework with App Router |
| [React](https://react.dev/)                   | 19.2.3  | UI library                      |
| [TypeScript](https://www.typescriptlang.org/) | 5.x     | Type safety                     |
| [Tailwind CSS](https://tailwindcss.com/)      | 4.x     | Utility-first CSS               |
| [shadcn/ui](https://ui.shadcn.com/)           | -       | Button component                |
| [Geist Font](https://vercel.com/font)         | -       | Typography                      |

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

## 📄 Scripts

| Script       | Description              |
| ------------ | ------------------------ |
| `pnpm dev`   | Start development server |
| `pnpm build` | Build for production     |
| `pnpm start` | Start production server  |
| `pnpm lint`  | Run ESLint               |

---

## 🎨 Quick Flow Summary

1. **Mount** → 23 random dots are created
2. **Click canvas** → Position converted to percentage → New dot added with selected color
3. **Pick color** → Future dots use that gradient
4. **Click Undo** → Last dot removed

---

## 📜 License

This project is private.

---

## 🤝 Contributing

Feel free to extend this project with features like:

- Drag and drop dots
- Save/load canvas state
- Reset canvas button
- Download canvas as image
- Custom dot sizes
