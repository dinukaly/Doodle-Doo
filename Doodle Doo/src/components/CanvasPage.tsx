import { useEffect, useRef, useState } from "react";
import Menu from "./Menu";

export default function CanvasPage() {
  const [brushColor, setBrushColor] = useState<string>("#000000");
  const [brushWidth, setBrushWidth] = useState<number>(15);
  const [brushOpacity, setBrushOpacity] = useState<number>(0.5);
  const [isEraser, setIsEraser] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if(!ctx) return;
    
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
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

  // Change cursor to grabbing when eraser is active
  if (isEraser) {
    canvas.style.cursor = 'grabbing';
  }

  ctx.beginPath();
  ctx.moveTo(x, y);
  setIsDrawing(true);
};

//stop drawing
const stopDrawing = () => {
  setIsDrawing(false);
  const ctx = ctxRef.current;
  const canvas = canvasRef.current;
  
  if (!ctx || !canvas) return;

  // Reset cursor based on tool mode
  if (isEraser) {
    canvas.style.cursor = 'grab';
  }
  
  ctx.closePath();
};

//draw
const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
  if (!isDrawing) return;

  const canvas = canvasRef.current;
  const ctx = ctxRef.current;
  if (!canvas || !ctx) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (isEraser) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.globalAlpha = 1;
  } else {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = brushColor;
    ctx.globalAlpha = brushOpacity;
  }
  
  ctx.lineWidth = brushWidth;
  ctx.lineCap = "round";

  ctx.lineTo(x, y);
  ctx.stroke();
};


return (
    <div className="paint-container">
      <Menu
        setBrushColor={(color) => setBrushColor(color)}
        setBrushWidth={(width) => setBrushWidth(width)}
        setBrushOpacity={(opacity) => setBrushOpacity(opacity)}
        setIsEraser={setIsEraser}
      />
      <div className="canvas-container">
         <canvas 
        className={`canvas ${isEraser ? "eraser-mode" : "brush-mode"}`}
        style={{ cursor: isEraser ? 'grab' : 'crosshair' }}
        width={800}
        height={600}
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={stopDrawing}
        onMouseMove={draw}
        onMouseLeave={stopDrawing}
         />
      </div>
    </div>
  )
}
