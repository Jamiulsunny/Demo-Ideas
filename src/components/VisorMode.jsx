import { ArrowUp, BatteryCharging, CircleAlert, Compass, Crosshair, Gauge, Navigation, Radio, Thermometer, Wind } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export function VisorMode({route,summary,onExit}) {
  const [progress,setProgress]=useState(0);
  const [paused,setPaused]=useState(false);
  useEffect(()=>{
    if(paused) return;
    const id=setInterval(()=>setProgress(p=>p>=1?0:p+0.004),80);
    return ()=>clearInterval(id);
  },[paused]);
  const idx=Math.min(route.length-1,Math.floor(progress*(route.length-1)));
  const here=route[idx]||route[0];
  const remain=Math.max(0,summary.distanceM*(1-progress));
  const oxygen=Math.max(0,100-progress*54);
  const power=Math.max(0,100-progress*46);
  const status=progress>0.78?"CAUTION":progress>0.93?"NO-GO":"GO";
  const arrow=useMemo(()=>Math.round((Math.sin(progress*18)*28)),[progress]);
  return <div className="visor">
    <div className="visor-grid"/>
    <div className="visor-top">
      <div className="visor-brand">ARES<span>GRID</span> / EVA-01</div>
      <div className="visor-time"><Radio size={14}/> MARSNET 00:42:18</div>
      <button className="visor-exit" onClick={onExit}>EXIT VISOR</button>
    </div>
    <div className="reticle"><Crosshair size={44}/><span>HEADING LOCK</span></div>
    <div className="compass"><span>W</span><b>N</b><span>E</span></div>
    <div className="waypoint">
      <div className="waypoint-arrow" style={{transform:`rotate(${arrow}deg)`}}><ArrowUp size={72}/></div>
      <strong>{remain<1000?`${Math.round(remain)} m`:`${(remain/1000).toFixed(2)} km`}</strong>
      <span>NEXT SCIENCE WAYPOINT</span>
    </div>
    <div className="visor-left">
      <div className="hud-card"><Navigation size={15}/><div><small>POSITION</small><b>{here[0].toFixed(4)}°, {here[1].toFixed(4)}°</b></div></div>
      <div className="hud-card"><Gauge size={15}/><div><small>ALT / SLOPE</small><b>{Math.round(160+idx*4)} m / {(2+Math.sin(idx)*7).toFixed(1)}°</b></div></div>
    </div>
    <div className="visor-right">
      <div className="resource"><BatteryCharging size={15}/><div><small>POWER</small><b>{power.toFixed(0)}%</b></div><span className="bar"><i style={{width:`${power}%`}}/></span></div>
      <div className="resource"><span className="o2">O₂</span><div><small>OXYGEN</small><b>{oxygen.toFixed(0)}%</b></div><span className="bar"><i style={{width:`${oxygen}%`}}/></span></div>
      <div className="resource"><Thermometer size={15}/><div><small>TEMP</small><b>-41°C</b></div></div>
      <div className="resource"><Wind size={15}/><div><small>WIND</small><b>9 m/s</b></div></div>
    </div>
    <div className={`go-status ${status.toLowerCase()}`}><span/>{status}</div>
    <div className="hazard-alert"><CircleAlert size={17}/><div><b>{status==="GO"?"ROUTE CLEAR":"TERRAIN RISK AHEAD"}</b><span>{status==="GO"?"Continue to waypoint.":status==="CAUTION"?"Slope variance rising — reduce pace.":"Turn-back threshold approaching."}</span></div></div>
    <div className="voice-alert"><span className="voice-dot"/>VOICE / “Proceed to next waypoint. Maintain heading.”</div>
    <div className="visor-bottom">
      <button onClick={()=>setPaused(!paused)}>{paused?"RESUME":"PAUSE"} SIM</button>
      <div className="timeline"><div className="timeline-fill" style={{width:`${progress*100}%`}}/><span style={{left:"78%"}}>TURN-BACK</span></div>
      <div className="visor-coords"><Compass size={15}/> {Math.round((idx/Math.max(1,route.length-1))*360)}°</div>
    </div>
  </div>
}