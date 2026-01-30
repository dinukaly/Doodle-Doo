import { useEffect, useState } from "react";
import Menu from "./Menu";

export default function CanvasPage() {
  const [brushColor, setBrushColor] = useState<string>("#c47979ff");
  const [brushWidth, setBrushWidth] = useState<number>(15);
  const [brushOpacity, setBrushOpacity] = useState<number>(0.5);

  useEffect(() => {
    console.log(brushColor, brushWidth, brushOpacity);
  }, [brushColor, brushWidth, brushOpacity]);
  return (
    <div className="paint-container">
      <Menu
        setBrushColor={(color) => setBrushColor(color)}
        setBrushWidth={(width) => setBrushWidth(width)}
        setBrushOpacity={(opacity) => setBrushOpacity(opacity)}
      />
    </div>
  )
}
