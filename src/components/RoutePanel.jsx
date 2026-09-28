import { Compass, Flag, MapPinned, Route, Zap, FlaskConical, Shield, RotateCcw } from "lucide-react";

const modes=[
  ["safest","Safest",Shield],
  ["fastest","Fastest",Zap],
  ["science","Science-rich",FlaskConical],
  ["resource","Resource-rich",MapPinned]
];

export function RoutePanel({start,end,setStart,setEnd,routeMode,setRouteMode,onPlan,planning,regionName}) {
  return <aside className="panel route-panel">
    <div className="panel-title"><Route size={17}/> ROUTE PLANNER <span>v1.0 DEMO</span></div>
    <div className="route-field">
      <div className="field-icon start"><span/></div>
      <div><small>START</small><b>{start[0].toFixed(3)}°, {start[1].toFixed(3)}°</b></div>
    </div>
    <div className="route-line"/>
    <div className="route-field">
      <div className="field-icon end"><Flag size={13}/></div>
      <div><small>END</small><b>{end[0].toFixed(3)}°, {end[1].toFixed(3)}°</b></div>
    </div>
    <div className="mini-note">{regionName}</div>
    <div className="section-label">OPTIMIZATION OBJECTIVE</div>
    <div className="mode-grid">
      {modes.map(([id,label,Icon])=><button key={id} onClick={()=>setRouteMode(id)} className={routeMode===id?"selected":""}><Icon size={15}/>{label}</button>)}
    </div>
    <button className="primary-btn" onClick={onPlan} disabled={planning}>{planning?<><RotateCcw size={15} className="spin"/> COMPUTING A*</>:<><Compass size={15}/> COMPUTE MARSWALK</>}</button>
    <div className="route-tip">A* cost model: slope + roughness + radiation + temperature, weighted by mission objective.</div>
  </aside>
}