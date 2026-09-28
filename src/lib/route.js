const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function seededNoise(x, y, seed=17) {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed * 37.719) * 43758.5453;
  return n - Math.floor(n);
}

function metricsAt(lat, lon) {
  const a = seededNoise(lat * 100, lon * 100, 3);
  const b = seededNoise(lat * 170, lon * 80, 9);
  const slope = 2 + 19 * a;
  const rough = 0.12 + 0.75 * b;
  const rad = 0.25 + 0.25 * seededNoise(lat * 80, lon * 160, 21);
  const temp = -58 + 28 * seededNoise(lat * 60, lon * 90, 31);
  const elevation = 120 + 260 * seededNoise(lat * 30, lon * 30, 51);
  return { slope, rough, rad, temp, elevation };
}

function distanceMeters(a,b) {
  const dLat = (b[0]-a[0]) * 111320;
  const dLon = (b[1]-a[1]) * 111320 * Math.cos((a[0]*Math.PI)/180);
  return Math.hypot(dLat,dLon);
}

function stepCost(a,b,mode) {
  const m = metricsAt((a[0]+b[0])/2,(a[1]+b[1])/2);
  const dist = distanceMeters(a,b);
  const slopePenalty = clamp(m.slope/24,0,1);
  const roughPenalty = m.rough;
  const radPenalty = clamp(m.rad/0.6,0,1);
  const tempPenalty = Math.abs(m.temp + 35)/30;
  const scienceBonus = (Math.sin(m.elevation/30)+1)/2;
  const resourceBonus = 1 - m.rough * 0.5;
  let factor = 1;
  if (mode === "safest") factor = 1 + 2.8*slopePenalty + 1.7*roughPenalty + 1.5*radPenalty + 0.7*tempPenalty;
  if (mode === "fastest") factor = 1 + 0.25*slopePenalty + 0.15*roughPenalty;
  if (mode === "science") factor = 1 + 1.1*slopePenalty + 0.7*roughPenalty + 0.5*radPenalty - 0.7*scienceBonus;
  if (mode === "resource") factor = 1 + 1.2*slopePenalty + 0.6*roughPenalty - 0.9*resourceBonus;
  return dist * factor;
}

function nodeKey(r,c) { return `${r}:${c}`; }

export function buildRoute(start, end, mode="safest", rows=24, cols=32) {
  const minLat = Math.min(start[0],end[0]) - 0.035;
  const maxLat = Math.max(start[0],end[0]) + 0.035;
  const minLon = Math.min(start[1],end[1]) - 0.045;
  const maxLon = Math.max(start[1],end[1]) + 0.045;
  const toCoord = (r,c) => [
    minLat + (r/(rows-1))*(maxLat-minLat),
    minLon + (c/(cols-1))*(maxLon-minLon)
  ];
  const toGrid = p => [
    Math.round((p[0]-minLat)/(maxLat-minLat)*(rows-1)),
    Math.round((p[1]-minLon)/(maxLon-minLon)*(cols-1))
  ];

  const s = toGrid(start), g = toGrid(end);
  const open = new Set([nodeKey(s[0],s[1])]);
  const came = new Map();
  const gScore = new Map([[nodeKey(s[0],s[1]),0]]);
  const fScore = new Map([[nodeKey(s[0],s[1]),distanceMeters(start,end)]]);
  const dirs = [[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]];

  const bestOpen = () => {
    let best=null, bestF=Infinity;
    for (const k of open) {
      const f=fScore.get(k) ?? Infinity;
      if (f<bestF) { bestF=f; best=k; }
    }
    return best;
  };

  let guard=0;
  while(open.size && guard++<12000){
    const current = bestOpen();
    const [r,c] = current.split(":").map(Number);
    if (r===g[0] && c===g[1]) break;
    open.delete(current);

    for(const [dr,dc] of dirs){
      const nr=r+dr,nc=c+dc;
      if(nr<0||nr>=rows||nc<0||nc>=cols) continue;
      const nk=nodeKey(nr,nc);
      const curCoord=toCoord(r,c), nextCoord=toCoord(nr,nc);
      const tentative=(gScore.get(current)??Infinity)+stepCost(curCoord,nextCoord,mode);
      if(tentative<(gScore.get(nk)??Infinity)){
        came.set(nk,current);
        gScore.set(nk,tentative);
        fScore.set(nk,tentative+distanceMeters(nextCoord,end));
        open.add(nk);
      }
    }
  }

  const goalKey=nodeKey(g[0],g[1]);
  const path=[];
  let cur=goalKey;
  if(!came.has(cur) && cur!==nodeKey(s[0],s[1])) return [start,end];
  while(cur){
    const [r,c]=cur.split(":").map(Number);
    path.unshift(toCoord(r,c));
    cur=came.get(cur);
  }
  path[0]=start; path[path.length-1]=end;
  return simplify(path, 2);
}

function simplify(points, every=2){
  if(points.length<=4) return points;
  const out=[points[0]];
  for(let i=1;i<points.length-1;i+=every) out.push(points[i]);
  out.push(points[points.length-1]);
  return out;
}

export function summarizeRoute(route){
  let distance=0, maxSlope=0, dose=0, minTemp=999, maxTemp=-999, elevMin=99999, elevMax=-99999;
  const elevation=[];
  route.forEach((p,i)=>{
    const m=metricsAt(p[0],p[1]);
    maxSlope=Math.max(maxSlope,m.slope);
    dose += m.rad * 0.012;
    minTemp=Math.min(minTemp,m.temp); maxTemp=Math.max(maxTemp,m.temp);
    elevMin=Math.min(elevMin,m.elevation); elevMax=Math.max(elevMax,m.elevation);
    elevation.push(Math.round(m.elevation));
    if(i) distance += distanceMeters(route[i-1],p);
  });
  const walkingHours = distance/1000/2.6;
  const risk = clamp(Math.round(18 + maxSlope*1.7 + dose*120 + (maxTemp-minTemp)*0.35), 0, 100);
  return {
    distanceM: distance, walkingHours, maxSlope, dose, minTemp, maxTemp,
    elevation, elevMin, elevMax, risk,
    oxygen: 18 + distance/1000*5.5,
    power: 7 + distance/1000*2.1,
    water: 2.2 + distance/1000*0.45
  };
}