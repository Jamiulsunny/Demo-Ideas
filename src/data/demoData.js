export const REGIONS = {
  jezero: {
    id: "jezero",
    name: "Jezero Crater",
    center: [18.444, 77.503],
    start: [18.444, 77.503],
    end: [18.468, 77.566],
    description: "Perseverance science corridor • delta-front planning demo"
  },
  gale: {
    id: "gale",
    name: "Gale Crater",
    center: [-5.0, 137.4],
    start: [-5.05, 137.37],
    end: [-5.02, 137.45],
    description: "Curiosity traverse context • Mount Sharp approach demo"
  },
  oxia: {
    id: "oxia",
    name: "Oxia Planum",
    center: [18.275, -24.30],
    start: [18.26, -24.34],
    end: [18.30, -24.25],
    description: "ExoMars/Rosalind landing-region context"
  },
  arcadia: {
    id: "arcadia",
    name: "Arcadia Planitia",
    center: [46.7, 195.0],
    start: [46.68, 194.94],
    end: [46.73, 195.06],
    description: "Mid-latitude ice-resource planning context"
  }
};

export const LAYERS = [
  { id:"base", name:"Base imagery", group:"Base", source:"NASA Mars Trek • MOLA/HRSC", color:"#d3a06a", tile:true, explain:"Global MOLA color hillshade provides elevation-driven context. Mars Trek also hosts HRSC and CTX/HiRISE regional mosaics." },
  { id:"terrain", name:"Terrain / slope", group:"Terrain", source:"NASA MOLA / Mars Trek", color:"#ffb454", explain:"Demo hazard shading is derived from a simulated cost grid. In a production pipeline, MOLA/DTM products would feed slope and roughness rasters." },
  { id:"roughness", name:"Surface roughness", group:"Terrain", source:"NASA MOLA roughness / Mars Trek", color:"#ff7f50", explain:"Roughness is a mobility penalty. The UI visualizes a bundled demo field while keeping the NASA layer credit visible." },
  { id:"geology", name:"Geology + minerals", group:"Science", source:"NASA PDS • CRISM", color:"#c78cff", explain:"CRISM targeted and derived products provide mineralogical information; geologic units can be combined with orbital imagery." },
  { id:"water", name:"Water / ice", group:"Resources", source:"NASA Odyssey GRS + MRO SHARAD", color:"#58d9ff", explain:"GRS/neutron hydrogen and SHARAD radar observations can help constrain subsurface water/ice hypotheses." },
  { id:"thermal", name:"Thermal / inertia", group:"Environment", source:"NASA THEMIS / TES", color:"#ff665f", explain:"THEMIS infrared and TES products provide thermal context useful for surface conditions and material properties." },
  { id:"weather", name:"Weather", group:"Environment", source:"NASA REMS / MEDA / MAVEN", color:"#8ee6ff", explain:"Demo values mimic a route-local weather panel. Production integration would ingest rover environmental observations and MAVEN atmospheric products." },
  { id:"radiation", name:"Radiation", group:"Environment", source:"NASA MSL RAD", color:"#ff6b8a", explain:"MSL RAD measurements characterize radiation exposure. Demo route dose values are simulated for planning UI behavior." },
  { id:"landmarks", name:"Landmarks + traverses", group:"Mission", source:"NASA mission / PDS / Mars Trek", color:"#62f2a2", explain:"Landing sites, rover paths and science targets are represented as bundled demo points so the app remains usable offline." }
];

export const LANDMARKS = [
  { id:"perseverance", name:"Perseverance landing site", region:"jezero", type:"Landing site", lat:18.444, lon:77.503, icon:"P", note:"Mars 2020 landing site • Jezero Crater" },
  { id:"delta", name:"Jezero delta front", region:"jezero", type:"Science target", lat:18.472, lon:77.567, icon:"S", note:"Layered delta terrain • sample-return context" },
  { id:"curiosity", name:"Curiosity / Gale", region:"gale", type:"Rover", lat:-4.5895, lon:137.4417, icon:"C", note:"MSL rover traverse context" },
  { id:"mountsharp", name:"Mount Sharp", region:"gale", type:"Science target", lat:-5.0, lon:137.4, icon:"M", note:"Aeolis Mons stratigraphy" },
  { id:"oxia", name:"Oxia Planum", region:"oxia", type:"Landing region", lat:18.275, lon:-24.30, icon:"O", note:"ExoMars/Rosalind landing-region context" },
  { id:"arcadia", name:"Arcadia ice corridor", region:"arcadia", type:"Resource target", lat:46.70, lon:195.0, icon:"I", note:"Mid-latitude shallow-ice planning context" }
];

export const SCIENCE_STOPS = [
  { id:"s1", title:"Delta sediment layers", lat:18.472, lon:77.567, value:92, why:"Layered delta deposits can preserve a record of ancient aqueous activity.", layer:"Geology + minerals" },
  { id:"s2", title:"Carbonate candidate zone", lat:18.455, lon:77.535, value:78, why:"A mineralogical target can help test hypotheses about past water-rock interaction.", layer:"CRISM" },
  { id:"s3", title:"Roughness transition", lat:18.461, lon:77.548, value:61, why:"A terrain transition is both a mobility constraint and a useful geomorphology observation.", layer:"Terrain" },
  { id:"s4", title:"Hydrogen anomaly corridor", lat:18.482, lon:77.586, value:88, why:"Orbital neutron/hydrogen observations can flag locations for resource-focused investigation.", layer:"GRS / water-ice" }
];

export const SAMPLE_ROUTE = [
  [18.444,77.503],[18.448,77.510],[18.451,77.518],[18.454,77.526],
  [18.458,77.534],[18.461,77.541],[18.464,77.548],[18.468,77.556],
  [18.471,77.563],[18.472,77.567]
];

export const WEATHER_BASE = {
  temp: -43,
  pressure: 7.4,
  wind: 8,
  dust: 0.18,
  radiation: 0.31,
  sunrise: "06:11",
  sunset: "18:49"
};