"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

type Dot = {
  id: string;
  x: number;
  y: number;
};

function generateDots(count: number): Dot[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `dot-${index + 1}`,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));
}

export default function Home() {
  const [dots, setDots] = useState<Dot[]>([]);
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
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f8] px-6 py-16 text-slate-900">
      <main className="mx-auto flex w-full max-w-xl flex-col items-center">
        <div className="w-full rounded-[28px] bg-white p-10 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)]">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 shadow-sm">
              <span className="h-6 w-6 rounded-lg bg-linear-to-b from-blue-400 to-blue-600" />
            </div>
            <button
              type="button"
              onClick={handleUndo}
              className="rounded-xl bg-linear-to-b from-blue-400 to-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-[0_10px_20px_-12px_rgba(37,99,235,0.9)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_24px_-14px_rgba(37,99,235,0.9)]"
            >
              Undo
            </button>
          </div>

          <div
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="relative mt-8 aspect-4/3 w-full cursor-crosshair rounded-3xl border-2 border-dashed border-slate-200 bg-white"
          >
            {dots.map((dot) => (
              <span
                key={dot.id}
                className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-b from-blue-400 to-blue-600"
                style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
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
