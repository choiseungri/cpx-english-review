# Guided demonstration: visual references and actual assets

The approved scroll design (05) and production-object sheet (04) are included as references. Generated example lettering in these sheets is illustrative only. The working interface uses the authored sleep-history dialogue as native DOM text; no sheet is substituted for the functioning interface.

Actually displayed assets:
- `guided-demo/assets/patient-29-transparent.png`: generated fictional young-adult portrait, shown at the entrance and allowed to leave the viewport naturally.
- `paper-background.svg`: quiet paper field.
- `ochre-disc.svg`: background separation behind the portrait on wide screens.
- Playback, pause and progress-rail assets are not used by the current scroll-controlled experience.
- Existing Notebook/Sans fonts from each language edition's assets; their original license notice is retained.

Adaptively drawn interface elements:
- Student/patient transcript surfaces, source underline and labels are CSS and DOM.
- Inline facts are placed in the same grid row as their actual SP response, connected with a thin CSS rule. On mobile the fact follows directly below that response. No future-fact ledger is shown.
- All dialogue, case evidence and feedback remain readable text. The student voice-input waveform and transcription caret are CSS/DOM, driven only by scroll position. The complete question remains in an accessible, selectable layout-reserving source layer; a separate aria-hidden visual layer shows complete grapheme clusters. No new image or audio asset was added.

Other blank production SVGs are supplied as editable source materials but are not directly displayed by this version. Neither the superseded initial design sheets nor the external artwork reference is included. Browser visual review of this revision remains pending.
