import { useEffect, useState } from "react";
import { BookOpen, X } from "lucide-react";

export function ExplainModal() {
  const [layer,setLayer]=useState(null);
  useEffect(()=>{
    const fn=e=>setLayer(e.detail);
    window.addEventListener("explain-layer",fn);
    return ()=>window.removeEventListener("explain-layer",fn);
  },[]);
  if(!layer) return null;
  return <div className="modal-backdrop" onClick={()=>setLayer(null)}>
    <div className="modal" onClick={e=>e.stopPropagation()}>
      <button className="modal-close" onClick={()=>setLayer(null)}><X size={18}/></button>
      <div className="modal-icon"><BookOpen size={20}/></div>
      <div className="eyebrow">STUDENT EXPLAINER</div>
      <h2>{layer.name}</h2>
      <p>{layer.explain}</p>
      <div className="credit-box"><small>DATA / MISSION CREDIT</small><b>{layer.source}</b><span>NASA / JPL-Caltech / mission teams where applicable. Demo visualization is not a safety-certified operational product.</span></div>
    </div>
  </div>
}