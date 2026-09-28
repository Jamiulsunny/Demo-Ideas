import { Search, Radio, ShieldCheck, Wifi, WifiOff } from "lucide-react";

export function TopBar({mode,setMode,offline,onSearch,search}) {
  return <header className="topbar">
    <div className="brand">
      <div className="brand-mark">A</div>
      <div>
        <div className="brand-title">ARESGRID</div>
        <div className="brand-sub">MARSWALK MISSION PLANNER</div>
      </div>
    </div>
    <div className="top-search">
      <Search size={15}/>
      <input value={search} onChange={e=>onSearch(e.target.value)} placeholder="Search region, landmark or coordinate…" aria-label="Search"/>
    </div>
    <div className="top-status">
      <span className="status-pill"><Radio size={14}/> MARSNET SIM</span>
      <span className="status-pill"><ShieldCheck size={14}/> SAFETY MODEL</span>
      <span className="status-pill">{offline ? <WifiOff size={14}/> : <Wifi size={14}/>} {offline ? "OFFLINE DEMO" : "CONNECTED"}</span>
    </div>
    <div className="mode-switch" role="tablist" aria-label="Application mode">
      <button className={mode==="planner"?"active":""} onClick={()=>setMode("planner")}>PLANNER</button>
      <button className={mode==="visor"?"active":""} onClick={()=>setMode("visor")}>VISOR</button>
    </div>
  </header>
}