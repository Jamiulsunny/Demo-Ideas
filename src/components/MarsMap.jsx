import { useEffect, useMemo } from "react";
import { CircleMarker, MapContainer, Polyline, TileLayer, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import { LANDMARKS } from "../data/demoData";

function Recenter({center}) {
  const map=useMap();
  useEffect(()=>{map.setView(center,map.getZoom(),{animate:true})},[center,map]);
  return null;
}

function ClickCapture({onMapClick}) {
  const map=useMap();
  useEffect(()=>{
    const fn=e=>onMapClick([e.latlng.lat,e.latlng.lng]);
    map.on("click",fn);
    return ()=>map.off("click",fn);
  },[map,onMapClick]);
  return null;
}

export function MarsMap({region,route,active,opacity,onMapClick,onSelectScience}) {
  const landmarks=LANDMARKS.filter(x=>x.region===region.id);
  const science=useMemo(()=>[
    [region.start[0]+0.008,region.start[1]+0.022,"Carbonate candidate"],
    [region.start[0]+0.017,region.start[1]+0.034,"Hydrogen anomaly"],
    [region.end[0]-0.006,region.end[1]-0.008,"Delta sediment layers"]
  ],[region]);

  const tileUrl="https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg";
  return <div className="map-wrap">
    <MapContainer center={region.center} zoom={8} minZoom={2} maxZoom={11} scrollWheelZoom className="mars-map">
      <TileLayer url={tileUrl} opacity={active.base!==false?opacity:0} attribution='NASA Mars Trek • MOLA/HRSC'/>
      <Recenter center={region.center}/>
      <ClickCapture onMapClick={onMapClick}/>
      {active.terrain!==false && <Polyline positions={[[region.center[0]-0.03,region.center[1]-0.05],[region.center[0]+0.04,region.center[1]+0.02],[region.center[0]-0.01,region.center[1]+0.07]]} pathOptions={{color:"#ffb454",weight:22,opacity:0.12}}/>}
      {active.roughness!==false && <Polyline positions={[[region.center[0]-0.04,region.center[1]+0.04],[region.center[0]+0.03,region.center[1]+0.06]]} pathOptions={{color:"#ff7f50",weight:18,opacity:0.10,dashArray:"7 8"}}/>}
      {active.water!==false && <CircleMarker center={[region.center[0]+0.026,region.center[1]+0.045]} radius={38} pathOptions={{color:"#58d9ff",fillColor:"#58d9ff",fillOpacity:0.07,weight:1}}><Tooltip>Water / ice signal • demo field</Tooltip></CircleMarker>}
      {active.radiation!==false && <CircleMarker center={[region.center[0]+0.008,region.center[1]+0.014]} radius={34} pathOptions={{color:"#ff6b8a",fillColor:"#ff6b8a",fillOpacity:0.07,weight:1}}><Tooltip>Radiation dose field • demo</Tooltip></CircleMarker>}
      {active.science!==false && science.map(([lat,lon,name],i)=><CircleMarker key={i} center={[lat,lon]} radius={7} pathOptions={{color:"#62f2a2",fillColor:"#62f2a2",fillOpacity:0.9,weight:1}}><Tooltip>{name}</Tooltip></CircleMarker>)}
      {active.landmarks!==false && landmarks.map(l=><CircleMarker key={l.id} center={[l.lat,l.lon]} radius={8} pathOptions={{color:"#fff",fillColor:"#62f2a2",fillOpacity:1,weight:2}}><Tooltip><b>{l.name}</b><br/>{l.note}</Tooltip></CircleMarker>)}
      {route?.length>1 && <Polyline positions={route} pathOptions={{color:"#65e8ff",weight:5,opacity:0.95}}/>}
      {route?.length>1 && <CircleMarker center={route[0]} radius={9} pathOptions={{color:"#fff",fillColor:"#65e8ff",fillOpacity:1,weight:2}}><Tooltip>START</Tooltip></CircleMarker>}
      {route?.length>1 && <CircleMarker center={route[route.length-1]} radius={10} pathOptions={{color:"#fff",fillColor:"#ffc857",fillOpacity:1,weight:2}}><Tooltip>END / SCIENCE WAYPOINT</Tooltip></CircleMarker>}
    </MapContainer>
    <div className="map-hud"><span>LAT {region.center[0].toFixed(3)}°</span><span>LON {region.center[1].toFixed(3)}°</span><span>ZOOM 8.0×</span><span className="scale">1 km</span></div>
    <div className="map-credit">BASE: NASA MARS TREK / MOLA • REGIONAL DATA: NASA PDS • OFFLINE OVERLAYS: ARESGRID DEMO</div>
  </div>
}