This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Overview

This is an interactive dot drawing application built with Next.js 14+ and React. Users can click on a canvas to place colorful circular dots, select from multiple colors, and undo their placements one at a time.

### Key Features

- **Interactive Canvas**: Click anywhere on the canvas area to place a new dot
- **Color Selection**: Choose from 6 vibrant colors (Blue, Red, Green, Purple, Orange, Pink) for drawing dots
- **Undo Functionality**: Remove the most recently placed dot with the Undo button
- **Initial Dots**: 23 randomly positioned blue dots are generated on page load
- **Color Memory**: Each dot remembers its color, enabling multi-colored artwork
- **Responsive Design**: Clean, modern UI with Tailwind CSS v4 styling
- **UI Components**: Uses shadcn/ui button component for consistent styling

### Code Explanation

The main application (`app/page.tsx`) is a client-side React component with the following structure:

#### State Management
- `dots`: Array of dot objects, each with a unique `id`, `x`, `y` coordinate (percentage-based positioning), and `color`
- `selectedColor`: Currently selected color for new dots
- `canvasRef`: Reference to the canvas div element for calculating click positions

#### Constants
- `COLORS`: Array of 6 color objects, each containing a name, gradient value, and background color for the color selector buttons

#### Key Functions
- `generateDots(count)`: Creates an array of randomly positioned dots with default blue color
- `handleUndo()`: Removes the last dot from the array by slicing off the final element
- `handleCanvasClick(event)`: Calculates the click position relative to the canvas, converts to percentage coordinates, and adds a new dot with the currently selected color (clamped between 2% and 98% to prevent edge overflow)

#### UI Structure
- A slate gray background with a centered white card container
- Top toolbar with shadcn/ui Button component for undo and circular color selector buttons
- Color selector shows all 6 colors with visual feedback (ring highlight) for the selected color
- A canvas area with dashed borders that responds to click events
- Each dot is rendered as an absolutely positioned span element with gradient styling in its stored color
- A counter displaying the total number of circles drawn

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
