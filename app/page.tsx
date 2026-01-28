"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";

type Dot = {
  id: string;
  x: number;
  y: number;
  color: string;
};

const COLORS = [
  { name: "Blue", value: "from-blue-400 to-blue-600", bg: "bg-blue-500" },
  { name: "Red", value: "from-red-400 to-red-600", bg: "bg-red-500" },
  { name: "Green", value: "from-green-400 to-green-600", bg: "bg-green-500" },
  {
    name: "Purple",
    value: "from-purple-400 to-purple-600",
    bg: "bg-purple-500",
  },
  {
    name: "Orange",
    value: "from-orange-400 to-orange-600",
    bg: "bg-orange-500",
  },
  { name: "Pink", value: "from-pink-400 to-pink-600", bg: "bg-pink-500" },
];

function generateDots(count: number): Dot[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `dot-${index + 1}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: "from-blue-400 to-blue-600",
  }));
}

export default function Home() {
  const [dots, setDots] = useState<Dot[]>([]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { 
    setDots(generateDots(23));
  }, []);

  const handleUndo = () => {
    setDots((current) => current.slice(0, -1));
  };


  const handleCanvasClick = (event: MouseEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setDots((current) => [
      ...current,
      {
        id: `dot-${Date.now()}-${current.length}`,
        x: Math.max(2, Math.min(98, x)),
        y: Math.max(2, Math.min(98, y)),
        color: selectedColor,
      },
    ]);
  }; 

  return (
    <div className="min-h-screen bg-slate-200 px-6 py-16 text-slate-900">
      <main className="mx-auto flex w-full max-w-xl flex-col items-center">
        <div className="w-full rounded-lg bg-white p-10">
          <div className="flex items-center justify-between gap-4">
            <Button
              onClick={handleUndo}
              className="text-white bg-blue-600 cursor-pointer font-bold text-md rounded-xl"
            >
              Undo
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-600">
                Color:
              </span>
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.value)}
                  className={`h-8 w-8 rounded-full ${color.bg} transition-all hover:scale-110 ${
                    selectedColor === color.value
                      ? "ring-2 ring-slate-900 ring-offset-2"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  title={color.name}
                />
              ))}
            </div>
          </div>
          <div
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="relative mt-8 aspect-4/3 w-full cursor-crosshair rounded-3xl border-2 border-dashed border-slate-200 bg-white"
          >
            {dots.map((dot) => (
              <span
                key={dot.id}
                className={`absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-b ${dot.color}`}
                style={{
                  top: `${dot.y}%`,
                  left: `${dot.x}%`,
                }}
              />
            ))}
          </div>

          <p className="mt-8 text-center text-lg font-semibold text-slate-600">
            Circles drawn: {dots.length}
          </p>
        </div>
      </main>
    </div>
  );
}
