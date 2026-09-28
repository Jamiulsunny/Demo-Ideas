# 5-minute pitch — AresGrid

## 0:00–0:35 — Hook
“Imagine planning a Marswalk with a paper checklist and separate maps for terrain, temperature, radiation, water and science targets. On Mars, those layers are not separate problems. They interact.

AresGrid is our answer: a mission-planning and astronaut-visor system that combines Mars data into one route decision.”

## 0:35–1:15 — The challenge
“The NASA Space Apps challenge asks us to create a layered, integrated view of a location or route on Mars.

Our design has two connected modes.

Planner Mode is the mission-control view. Visor Mode is the astronaut view.

The same route and same mission state flow between them.”

## 1:15–2:05 — Data integration
“We organize the map into operationally meaningful layers.

MOLA and HRSC provide terrain context. CTX and HiRISE add imagery. CRISM contributes mineralogical context. Odyssey GRS and MRO SHARAD inform resource hypotheses. THEMIS and TES contribute thermal context. REMS, MEDA and MAVEN provide environmental observations. MSL RAD informs radiation exposure. Mission landmarks and traverses provide exploration context.

For the hackathon prototype, we keep a bundled demo dataset so the interface remains usable offline, while clearly labeling which values are simulated.”

## 2:05–2:55 — Route planning
“The core is an A* cost-grid planner.

Every grid cell can have a cost derived from slope, roughness, radiation and temperature.

Then the astronaut can change the mission objective.

Safest increases penalties for hazards.
Fastest reduces those penalties and prioritizes travel time.
Science-rich rewards scientifically interesting terrain.
Resource-rich rewards resource-relevant corridors.

The important idea is not one magic route. It is a transparent decision model that lets the crew see how changing priorities changes the route.”

## 2:55–3:40 — Science and resources
“Along the route, AresGrid suggests science stops.

A stop is not just a pin. It has a reason: sediment layers, mineralogical candidates, terrain transitions or possible hydrogen anomalies.

The dashboard then translates the route into mission quantities: distance, walking time, elevation, maximum slope, radiation dose, temperature range, oxygen, power and water.

This creates a bridge from map data to EVA planning.”

## 3:40–4:25 — Visor Mode
“Now the astronaut leaves the planning room.

The same route appears as a visor HUD.

The waypoint arrow updates as the astronaut moves. The compass stays visible. Oxygen and power decrease. Environmental readings update. The system provides a simple GO, CAUTION or NO-GO state and a voice-style alert.

We also show a turn-back threshold — because navigation is not only about reaching the destination. It is about preserving the ability to return.”

## 4:25–4:50 — Hazard reroute
“Suppose a high-cost hazard is detected.

Instead of simply showing a warning, AresGrid can recompute the route around it.

That is the central experience we want judges to remember: data becomes a decision, and a decision becomes an actionable route.”

## 4:50–5:00 — Close
“AresGrid is our vision of Google Maps for Mars: layered, explainable, science-aware and connected from mission control to the astronaut's visor.

The next step is to replace simulated fields with a production data pipeline and validate every mobility and safety model against mission requirements.

We don't just want to draw Mars.

We want to help an explorer make the next decision on Mars.”
