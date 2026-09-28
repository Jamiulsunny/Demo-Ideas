import { CloudSun, Gauge, Sun, Wind } from "lucide-react";
import { WEATHER_BASE } from "../data/demoData";

export function LivePanel({tick}) {
  const temp=WEATHER_BASE.temp+Math.sin(tick/8)*3;
  const wind=WEATHER_BASE.wind+Math.sin(tick/5)*2;
  const dust=WEATHER_BASE.dust+Math.max(0,Math.sin(tick/9))*0.08;
  return <aside className="panel live-panel">
    <div className="panel-title"><CloudSun size={17}/> LIVE CONDITIONS <span>SIM</span></div>
    <div className="condition-main"><strong>{temp.toFixed(0)}°C</strong><span>surface temp</span></div>
    <div className="condition-grid">
      <div><Gauge size={14}/><small>PRESSURE</small><b>{WEATHER_BASE.pressure.toFixed(1)} hPa</b></div>
      <div><Wind size={14}/><small>WIND</small><b>{wind.toFixed(0)} m/s</b></div>
      <div><CloudSun size={14}/><small>DUST INDEX</small><b>{dust.toFixed(2)}</b></div>
      <div><Sun size={14}/><small>SUN</small><b>06:11 → 18:49</b></div>
    </div>
    <div className="storm"><span className="pulse"/> NO REGIONAL DUST STORM WARNING</div>
  </aside>
}