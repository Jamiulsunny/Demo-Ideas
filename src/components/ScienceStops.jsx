import { FlaskConical, Star } from "lucide-react";

export function ScienceStops({stops,onSelect}) {
  return <aside className="panel science-panel">
    <div className="panel-title"><FlaskConical size={17}/> SCIENCE STOPS <span>AUTO-SUGGEST</span></div>
    {stops.map((s,i)=><button className="science-stop" key={s.id} onClick={()=>onSelect(s)}>
      <div className="science-index"><Star size={13} fill="currentColor"/>{i+1}</div>
      <div><b>{s.title}</b><p>{s.why}</p><small>{s.layer} • science value {s.value}/100</small></div>
    </button>)}
  </aside>
}