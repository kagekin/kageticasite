# Jackpot Focus Web App Implementation Plan

## Goal Description
Refine "Jackpot Focus" UI.

## User Review Required
> [!NOTE]
> No critical user review required.

## Proposed Changes

### Lab Directory
#### [MODIFY] [jackpot_focus.html](file:///d:/github/kageticasite/lab/jackpot_focus.html)
- **UI Improvement**: "Start Now!" Indicator.
    - Define custom `poke` animation (translateX) in Tailwind config.
    - Move indicator to `absolute -right-24 top-1/2 -translate-y-1/2`.
    - Rotate Hand icon `-90deg` (pointing left).
    - Apply `animate-poke`.

## Verification Plan

### Manual Verification
- **UI**: Verify "Start Now!" is on the right, pointing at the timer, and moving left-right ("poking").
