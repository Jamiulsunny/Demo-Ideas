import { useEffect, useMemo, useState } from "react";
import { Download, FileJson, FileText, HelpCircle, Play, Share2 } from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { TopBar } from "./components/TopBar";
import { LayerPanel } from "./components/LayerPanel";
import { RoutePanel } from "./components/RoutePanel";
import { Dashboard } from "./components/Dashboard";
import { LivePanel } from "./components/LivePanel";
import { ScienceStops } from "./components/ScienceStops";
import { MarsMap } from "./components/MarsMap";
import { VisorMode } from "./components/VisorMode";
import { ExplainModal } from "./components/ExplainModal";
import { Onboarding } from "./components/Onboarding";
import { REGIONS, SCIENCE_STOPS, SAMPLE_ROUTE } from "./data/demoData";
import { buildRoute, summarizeRoute } from "./lib/route";

export function App(){
  const [mode,setMode]=useState("planner");
  const [regionId,setRegionId]=useState("jezero");
  const [routeMode,setRouteMode]=useState("safest");
  const [start,setStart]=useState(REGIONS.jezero.start);
  const [end,setEnd]=useState(REGIONS.jezero.end);
  const [route,setRoute]=useState(SAMPLE_ROUTE);
  const [planning,setPlanning]=useState(false);
  const [active,setActive]=useState({base:true,terrain:true,roughness:true,geology:false,water:true,thermal:false,weather:true,radiation:true,landmarks:true});
  const [opacity,setOpacity]=useState(.78);
  const [search,setSearch]=useState("");
  const [tick,setTick]=useState(0);
  const [showOnboard,setShowOnboard]=useState(()=>localStorage.getItem("aresgrid-onboarded")!=="1");
  const region=REGIONS[regionId];
  const summary=useMemo(()=>summarizeRoute(route),[route]);
  const filteredStops=SCIENCE_STOPS.filter(s=>Math.abs(s.lat-region.center[0])<.2 && Math.abs(s.lon-region.center[1])<.2);

  useEffect(()=>{const id=setInterval(()=>setTick(t=>t+1),1000);return()=>clearInterval(id)},[]);
  useEffect(()=>{
    const q=search.trim().toLowerCase();
    if(!q) return;
    const found=Object.values(REGIONS).find(r=>r.name.toLowerCase().includes(q));
    if(found){setRegionId(found.id);setStart(found.start);setEnd(found.end)}
  },[search]);

  function selectRegion(id){const r=REGIONS[id];setRegionId(id);setStart(r.start);setEnd(r.end);setRoute([r.start,r.end]);}
  function onMapClick(p){
    if(!start || (route.length<=2 && start===region.start)) setStart(p);
    else setEnd(p);
  }
  function plan(){
    setPlanning(true);
    setTimeout(()=>{setRoute(buildRoute(start,end,routeMode));setPlanning(false)},500);
  }
  function completeOnboard(){localStorage.setItem("aresgrid-onboarded","1");setShowOnboard(false)}
  function exportJSON(){
    const payload={app:"AresGrid Marswalk",region:region.name,objective:routeMode,start,end,route,summary,generatedAt:new Date().toISOString(),note:"Demo route model; not an operational safety product."};
    const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="aresgrid-marswalk-route.json";a.click();URL.revokeObjectURL(a.href);
  }
  async function exportPDF(){
    const node=document.getElementById("mission-report");
    const canvas=await html2canvas(node,{backgroundColor:"#080b11",scale:1.5});
    const pdf=new jsPDF({orientation:"landscape",unit:"px",format:[canvas.width,canvas.height]});
    pdf.addImage(canvas.toDataURL("image/png"),"PNG",0,0,canvas.width,canvas.height);
    pdf.save("aresgrid-marswalk-summary.pdf");
  }
  async function share(){
    const text=`AresGrid Marswalk — ${region.name} — ${routeMode} — ${(summary.distanceM/1000).toFixed(2)} km`;
    if(navigator.share) await navigator.share({title:"AresGrid Marswalk",text});
    else await navigator.clipboard?.writeText(text);
  }

  if(mode==="visor") return <VisorMode route={route} summary={summary} onExit={()=>setMode("planner")}/>;

  return <div className="app-shell">
    <TopBar mode={mode} setMode={setMode} offline={false} search={search} onSearch={setSearch}/>
    <main className="planner-grid">
      <div className="left-rail">
        <RoutePanel start={start} end={end} setStart={setStart} setEnd={setEnd} routeMode={routeMode} setRouteMode={setRouteMode} onPlan={plan} planning={planning} regionName={region.description}/>
        <LayerPanel active={active} setActive={setActive} opacity={opacity} setOpacity={setOpacity}/>
        <LivePanel tick={tick}/>
      </div>
      <section className="map-stage" id="mission-report">
        <div className="region-bar">
          <div><div className="eyebrow">CURRENT AOI</div><h1>{region.name}</h1></div>
          <div className="region-actions">
            {Object.values(REGIONS).map(r=><button key={r.id} className={r.id===regionId?"active":""} onClick={()=>selectRegion(r.id)}>{r.name}</button>)}
          </div>
        </div>
        <MarsMap region={region} route={route} active={active} opacity={opacity} onMapClick={onMapClick}/>
        <Dashboard summary={summary} routeMode={routeMode}/>
        <div className="bottom-tools">
          <button onClick={()=>setMode("visor")}><Play size={15}/> RUN MARSWALK</button>
          <button onClick={exportJSON}><FileJson size={15}/> JSON</button>
          <button onClick={exportPDF}><FileText size={15}/> PDF</button>
          <button onClick={share}><Share2 size={15}/> SHARE</button>
          <button onClick={()=>setShowOnboard(true)}><HelpCircle size={15}/> TOUR</button>
        </div>
      </section>
      <div className="right-rail">
        <ScienceStops stops={filteredStops.length?filteredStops:SCIENCE_STOPS} onSelect={s=>{setEnd([s.lat,s.lon]);setRoute([start,[s.lat,s.lon]])}}/>
        <div className="panel compare-panel"><div className="panel-title">ROUTE COMPARISON <span>LIVE</span></div><div className="compare-row"><b>SAFEST</b><span>+18%</span><small>risk 31</small></div><div className="compare-row"><b>FASTEST</b><span>-14%</span><small>risk 54</small></div><div className="compare-row"><b>SCIENCE</b><span>+22%</span><small>science 91</small></div><div className="compare-row"><b>RESOURCE</b><span>+9%</span><small>resource 86</small></div></div>
        <div className="panel mission-note"><div className="eyebrow">MISSION NOTE</div><p>Values shown in this hackathon build are a blend of NASA-attributed layer concepts and bundled simulated values. Do not use for real mission operations.</p></div>
      </div>
    </main>
    <ExplainModal/>
    {showOnboard && <Onboarding onDone={completeOnboard}/>}
  </div>
}