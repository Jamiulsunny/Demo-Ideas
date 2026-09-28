import { useState } from "react";
import { ArrowRight, Map, Shield, Sparkles } from "lucide-react";

export function Onboarding({onDone}) {
  const [step,setStep]=useState(0);
  const slides=[
    ["PLAN THE MARSWALK","Layer orbital, terrain, environment and science data in one mission-control view.",Map],
    ["OPTIMIZE THE ROUTE","A* searches a cost grid using slope, roughness, radiation and temperature.",Shield],
    ["TAKE IT TO THE VISOR","Switch to first-person HUD mode and simulate the same route in the astronaut's field of view.",Sparkles]
  ];
  const [title,body,Icon]=slides[step];
  return <div className="onboarding"><div className="onboard-card"><div className="onboard-logo">A</div><Icon size={26}/><div className="eyebrow">ARES GRID • NASA SPACE APPS 2026</div><h1>{title}</h1><p>{body}</p><div className="onboard-dots">{slides.map((_,i)=><i className={i===step?"on":""} key={i}/>)}</div><button className="primary-btn" onClick={()=>step<2?setStep(step+1):onDone()}>{step<2?"NEXT":"ENTER MISSION CONTROL"} <ArrowRight size={15}/></button><small>Offline demo data is included so the interface works without a network.</small></div></div>
}