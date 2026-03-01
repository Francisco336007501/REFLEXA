import { useState } from "react";
import { useCanvasCursor } from "../hooks/useCanvasCursor";

export function CanvasCursor() {
  const [hasPointer] = useState(() => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches);
  useCanvasCursor();

  if (!hasPointer) return null;

  return (
    <canvas
      id="canvas"
      aria-hidden
      style={{
        pointerEvents: "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999,
      }}
    />
  );
}
