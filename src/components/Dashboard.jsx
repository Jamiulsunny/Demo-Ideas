import { Activity, BatteryCharging, Footprints, Gauge, Mountain, Radiation, Thermometer, Wind } from "lucide-react";

function fmtM(m){return m<1000?`${Math.round(m)} m`:`${(m/1000).toFixed(2)} km`}

export function Dashboard({summary,routeMode}) {
  const cards=[
    ["DISTANCE",fmtM(summary.distanceM),Footprints],
    ["WALK TIME",`${summary.walkingHours.toFixed(1)} h`,Gauge],
    ["MAX SLOPE",`${summary.maxSlope.toFixed(1)}°`,Mountain],
    ["RAD DOSE",`${summary.dose.toFixed(2)} mSv`,Radiation],
    ["TEMP RANGE",`${Math.round(summary.minTemp)} / ${Math.round(summary.maxTemp)}°C`,Thermometer],
    ["RISK SCORE",`${summary.risk}/100`,Activity]
  ];
  return <section className="dashboard">
    <div className="dashboard-top">
      <div><div className="eyebrow">ROUTE INTELLIGENCE</div><h2>{routeMode.toUpperCase()} MARSWALK</h2></div>
      <div className="resource-strip"><span>O₂ <b>{summary.oxygen.toFixed(1)} kg</b></span><span>POWER <b>{summary.power.toFixed(1)} kWh</b></span><span>H₂O <b>{summary.water.toFixed(1)} L</b></span></div>
    </div>
    <div className="metric-grid">{cards.map(([l,v,I])=><div className="metric" key={l}><I size={16}/><small>{l}</small><strong>{v}</strong></div>)}</div>
    <div className="elevation">
      <div className="elev-head"><span><Mountain size={15}/> ELEVATION PROFILE</span><small>{summary.elevMin.toFixed(0)}–{summary.elevMax.toFixed(0)} m</small></div>
      <svg viewBox="0 0 600 90" preserveAspectRatio="none" className="elev-svg">
        <polyline fill="none" points={summary.elevation.map((e,i)=>{
          const min=summary.elevMin,max=summary.elevMax, x=i/(summary.elevation.length-1)*600, y=82-((e-min)/Math.max(1,max-min))*65; return `${x},${y}`;
        }).join(" ")} />
      </svg>
    </div>
  </section>
}