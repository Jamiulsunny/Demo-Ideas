import { Info, Layers, ChevronDown, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { LAYERS } from "../data/demoData";

export function LayerPanel({active,setActive,opacity,setOpacity}) {
  const [open,setOpen]=useState(true);
  return <aside className="panel layer-panel">
    <div className="panel-head" onClick={()=>setOpen(!open)}>
      <span><Layers size={17}/> DATA LAYERS</span><ChevronDown size={16} className={open?"":"rotate-180"}/>
    </div>
    {open && <div className="layer-list">
      {LAYERS.map(l=>{
        const on=active[l.id]!==false;
        return <div className="layer-row" key={l.id}>
          <button className="eye-btn" onClick={()=>setActive(a=>({...a,[l.id]:!on}))} aria-label={`Toggle ${l.name}`}>{on?<Eye size={15}/>:<EyeOff size={15}/>}</button>
          <div className="layer-swatch" style={{background:l.color}}/>
          <div className="layer-main">
            <div className="layer-name">{l.name}</div>
            <div className="layer-source">{l.source}</div>
          </div>
          <button className="info-btn" title="Explain this layer" onClick={()=>window.dispatchEvent(new CustomEvent("explain-layer",{detail:l}))}><Info size={14}/></button>
        </div>
      })}
      <div className="opacity">
        <div><span>Overlay opacity</span><b>{Math.round(opacity*100)}%</b></div>
        <input type="range" min="0.15" max="1" step="0.05" value={opacity} onChange={e=>setOpacity(Number(e.target.value))}/>
      </div>
      <div className="legend">
        <div className="legend-title">LEGEND</div>
        <div><i className="dot green"/>Science stop</div>
        <div><i className="dot amber"/>Hazard / terrain penalty</div>
        <div><i className="dot cyan"/>Resource / water signal</div>
        <div><i className="dot red"/>Radiation / no-go signal</div>
      </div>
    </div>}
  </aside>
}