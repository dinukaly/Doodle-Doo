import { useEffect, useRef, useState } from "react";
import Menu from "./Menu";

export default function CanvasPage() {
  const [brushColor, setBrushColor] = useState<string>("#c47979ff");
  const [brushWidth, setBrushWidth] = useState<number>(15);
  const [brushOpacity, setBrushOpacity] = useState<number>(0.5);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const ctx = canvas.getContext("2d");
    if(!ctx) return;
    ctxRef.current = ctx;
  }, [brushColor, brushWidth, brushOpacity]);

  //start drawing
const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
  const canvas = canvasRef.current;
  const ctx = ctxRef.current;
  if (!canvas || !ctx) return;

  const rect = canvas.getBoundingClientRect(); // accurate position
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.beginPath();
  ctx.moveTo(x, y);
  setIsDrawing(true);
};

//stop drawing
const stopDrawing = () => {
  setIsDrawing(false);
  const ctx = ctxRef.current;
  if (!ctx) return;

  ctx.closePath();
};

  return (
    <div className="paint-container">
      <Menu
        setBrushColor={(color) => setBrushColor(color)}
        setBrushWidth={(width) => setBrushWidth(width)}
        setBrushOpacity={(opacity) => setBrushOpacity(opacity)}
      />
      <div className="canvas-container">
        <canvas 
        className="canvas" 
        width={800}
        height={600}
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
         />
      </div>
    </div>
  )
}
