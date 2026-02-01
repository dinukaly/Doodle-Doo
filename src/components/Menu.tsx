import "./Menu.css";

type MenuProps = {
  brushWidth: number;
  brushOpacity: number;
  isEraser: boolean;
  setBrushColor: (color: string) => void;
  setBrushWidth: (width: number) => void;
  setBrushOpacity: (opacity: number) => void;
  setIsEraser: (isEraser: boolean) => void;
};

export default function Menu({
  brushWidth,
  brushOpacity,
  isEraser,
  setBrushColor,
  setBrushWidth,
  setBrushOpacity,
  setIsEraser,
}: MenuProps) {
  const handleBrushWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setBrushWidth(value);
    const percentage = ((value - 15) / (70 - 15)) * 100;
    e.target.style.setProperty("--value", `${percentage}%`);
  };

  const handleBrushOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setBrushOpacity(value);
    const percentage = (value / 0.5) * 100;
    e.target.style.setProperty("--value", `${percentage}%`);
  };

  const toggleEraser = () => {
    const newIsEraser = !isEraser;
    setIsEraser(newIsEraser);
  };

  return (
    <div className="menu">
      <div className="control-group">
        <label className="control-label">Tool</label>
        <div className="tool-buttons">
          <button
            className={`tool-btn ${!isEraser ? "active" : ""}`}
            onClick={() => {
              setIsEraser(false);
            }}
          >
            ✏️ Brush
          </button>
          <button
            className={`tool-btn ${isEraser ? "active" : ""}`}
            onClick={toggleEraser}
          >
            🧹 Eraser
          </button>
        </div>
      </div>

      <div className="control-group">
        <label className="control-label">Brush Color</label>
        <div className="color-input-wrapper">
          <input
            type="color"
            onChange={(e) => setBrushColor(e.target.value)}
            disabled={isEraser}
          />
        </div>
      </div>

      <div className="control-group">
        <label className="control-label">Brush Width</label>
        <div className="range-container">
          <input
            type="range"
            min="15"
            max="70"
            value={brushWidth}
            onChange={handleBrushWidthChange}
            style={
              {
                "--value": `${((brushWidth - 15) / (70 - 15)) * 100}%`,
              } as React.CSSProperties
            }
          />
          <span className="range-value">{brushWidth}px</span>
        </div>
      </div>

      <div className="control-group">
        <label className="control-label">Brush Opacity</label>
        <div className="range-container">
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={brushOpacity}
            onChange={handleBrushOpacityChange}
            style={
              {
                "--value": `${(brushOpacity / 0.5) * 100}%`,
              } as React.CSSProperties
            }
          />
          <span className="range-value">{Math.round(brushOpacity * 100)}%</span>
        </div>
      </div>
    </div>
  );
}
