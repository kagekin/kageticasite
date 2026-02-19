# Yomuverse Implementation Plan

## Goal Description
Create "Yomuverse", a browser-based online reading metaverse prototype.

## User Review Required
> [!IMPORTANT]
> This will be implemented as a **Single File Prototype** (`lab/yomuverse.html`) to match the existing lab structure, using CDN libraries for React, Tailwind, PDF.js, and Konva.js. Real-time features (WebRTC/WebSocket) will be **Simulated (Mocked)** for the initial version as no backend credentials are provided.

## Proposed Changes

### Lab Directory
#### [NEW] [yomuverse.html](file:///d:/github/kageticasite/lab/yomuverse.html)
- **Tech Stack**: React 18, Tailwind CSS, PDF.js, Konva.js (all via CDN).
- **Structure**:
    - `LoginScreen`: Simple name input, generated avatar.
    - `YomuverseApp`: Main container.
    - `PDFSpace`: Central area using PDF.js.
    - `AvatarField`: Overlay/Underlay for character movement.
    - `CollabLayer`: Konva.js canvas for drawing/notes over PDF.
    - `HUD`: Header (Clock, Users), Footer (Tools), Audio Controls.

## Verification Plan
- **Manual**: Open `yomuverse.html` in browser.
- **Flow**: Login -> See PDF -> Move Avatar -> Draw Line -> Toggle Audio Mode.
