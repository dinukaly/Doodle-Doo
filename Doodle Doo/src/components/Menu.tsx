type MenuProps = {
    setBrushColor: (color: string) => void,
    setBrushWidth: (width: number) => void,
    setBrushOpacity: (opacity: number) => void,
}
export default function Menu({setBrushColor, setBrushWidth, setBrushOpacity}: MenuProps) {
  return (
    <div className="menu">
        <label htmlFor="brush">Brush Color:</label>
        <input type="color" onChange={(e) => setBrushColor(e.target.value)}/>

        <label htmlFor="brushWidth">Brush Width:</label>
        <input type="range" min="15" max="70" onChange={(e) => setBrushWidth(Number(e.target.value))}/>

        <label htmlFor="brushOpacity">Brush Opacity:</label>
        <input type="range" min="0" max="0.5"  step="0.01"  onChange={(e) => setBrushOpacity(Number(e.target.value))}  />
    </div>
  )
}
