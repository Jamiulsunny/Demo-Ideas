# AresGrid Marswalk

AresGrid is a hackathon-ready React/Vite/Tailwind/Leaflet prototype for the NASA Space Apps Challenge 2026 challenge **Interplanetary Survival Guide: Martian Map**.

## What is included

- Planner Mode with a mission-control dark UI
- NASA Mars Trek MOLA base imagery
- Layer controls with opacity, legend and student "Explain this layer" popups
- Jezero, Gale, Oxia Planum and Arcadia Planitia presets
- A* route planning with four objectives:
  - Safest
  - Fastest
  - Science-rich
  - Resource-rich
- Route dashboard: distance, walking time, slope, radiation, temperature, risk, oxygen, power and water
- Science-stop suggestions
- Simulated live conditions
- Visor Mode with first-person AR/HUD simulation
- Turn-back timeline and voice-style alerts
- JSON and PDF export
- Share action using Web Share API or clipboard
- Offline-friendly bundled sample data for overlays and route modeling
- Responsive/mobile layout and keyboard-focusable controls
- First-run onboarding tour

## Run

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Then open the Vite URL, normally `http://localhost:5173`.

Production build:

```bash
npm run build
npm run preview
```

## Important data note

The application intentionally distinguishes between:

1. **NASA-attributed source layers** used for the base map and documented data-source concepts.
2. **Bundled demo overlays and simulated route/weather/radiation values** used to keep the hackathon prototype functional without a backend.

The route model is not an operational navigation or safety system. It is a demonstration of how multi-source Mars data can be transformed into a mission-planning cost function.

## NASA data sources

### Mars Trek / WMTS
- Mars Trek API documentation: https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=mars
- Global MOLA color hillshade example layer:
  `https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0/default/default028mm/{z}/{y}/{x}.jpg`
- Mars Trek hosts MOLA, HRSC, CTX, HiRISE and other Mars products.

### NASA Planetary Data System
- PDS data search: https://pds.nasa.gov/datasearch/
- PDS data releases: https://pds.nasa.gov/datasearch/subscription-service/SS-Release.shtml
- MRO releases include CTX, HiRISE, MCS, SHARAD and SPICE.
- Mars 2020 releases include MEDA, Mastcam-Z, PIXL, RIMFAX, SHERLOC, SuperCam and SPICE.
- Odyssey releases include GRS and THEMIS.

### MRO / CTX / HiRISE / CRISM / SHARAD
- MRO science instruments: https://science.nasa.gov/mission/mars-reconnaissance-orbiter/science-instruments/
- NASA PDS MRO data releases: https://pds.nasa.gov/datasearch/subscription-service/SS-Release.shtml
- CTX provides broader terrain context around high-resolution HiRISE and mineralogical CRISM observations.
- CRISM products can support mineralogical layers.
- SHARAD products provide radargram data useful for subsurface investigations.

### Odyssey / THEMIS / GRS
- NASA Open Data THEMIS VIS-GEO: https://data.nasa.gov/dataset/odyssey-themis-vis-geo-v2-0
- NASA Open Data THEMIS VIS-ALB: https://data.nasa.gov/dataset/odyssey-themis-vis-alb-v2-0
- NASA PDS Odyssey releases: https://pds.nasa.gov/datasearch/subscription-service/SS-Release.shtml

### MSL / RAD / REMS
- NASA Open Data MSL RAD RDR: https://data.nasa.gov/dataset/msl-mars-radiation-assessment-detector-rdr
- NASA Open Data MSL RAD EDR: https://data.nasa.gov/dataset/msl-mars-radiation-assessment-detector-edr
- NASA Open Data REMS MODRDR: https://data.nasa.gov/dataset/msl-mars-rover-env-monitoring-station-5-modrdr-v1-0-cb197

### MAVEN
- NASA Open Data MAVEN datasets: https://data.nasa.gov/dataset/?tags=mars&tags=maven
- MAVEN MAG calibrated data: https://data.nasa.gov/dataset/maven-mag-calibrated-data-bundle
- MAVEN NGIMS: https://data.nasa.gov/dataset/maven-neutral-gas-and-ion-mass-spectrometer-data

## Data-to-route architecture

```text
NASA/PDS source products
        |
        v
Projection + spatial normalization
        |
        +--> terrain / slope / roughness
        +--> mineral / geology
        +--> water / ice signals
        +--> thermal
        +--> weather
        +--> radiation
        +--> landmarks / traverses
        |
        v
Mission cost grid
        |
        +--> Safest
        +--> Fastest
        +--> Science-rich
        +--> Resource-rich
        |
        v
A* route
        |
        +--> dashboard
        +--> Marswalk simulator
        +--> Visor HUD
```

## Credits

Mars Trek imagery and NASA mission datasets are credited to NASA, JPL-Caltech, the relevant mission teams and the NASA Planetary Data System as applicable. The prototype does not imply NASA endorsement or operational certification.

## Accessibility

- High-contrast mission-control theme
- Visible button states
- Native form controls
- Semantic buttons and tab roles
- Responsive layout
- Keyboard-accessible controls in the browser

## Future production integration

1. Replace demo terrain/weather/radiation fields with a backend tile/data service that ingests PDS products and produces cloud-optimized rasters.
2. Add a DEM-based path planner using true Mars geodesy and rover/astronaut mobility constraints.
3. Add computer vision for science-target detection using labeled Mars imagery, with human-in-the-loop verification.
