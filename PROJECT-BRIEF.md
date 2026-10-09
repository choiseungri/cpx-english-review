# CPX Practice Lab — project brief

**Creator:** CHOI JUNHO · South Korea  
**Started:** February 2026  
**Stage:** Student-built, independent early-stage prototype; not an incorporated company  
**Language:** Originally developed in Korean; English translation prepared for review

## Purpose

Medical students need opportunities to practice asking questions and to examine what their questions actually elicited. CPX Practice Lab connects fictional case authoring, clinical-interview practice, exact dialogue evidence, and goal-based retries in one browser workbench.

## Working prototype

The review demo includes three original fictional cases, with 54 facts, 36 question intents, and 108 registered question expressions. Learners ask questions, inspect patient statements linked to case facts, and select 1–3 goals for another attempt. Unmatched questions are retained, and explicit intent assistance is recorded. Case revisions are preserved in session snapshots. A case editor and JSON export/import support continued work without a backend.

The current response engine is deterministic: it returns authored responses for normalized exact question matches or explicit intent selection. It does not currently call Claude or provide open-ended AI conversation.

## Guided example of the planned experience

The landing page opens with the project purpose and learning loop, then continues into a native-scroll, cumulative scripted workflow: twelve student–patient exchanges, correction of a mistaken question premise, question-domain coverage of 10/12, quote-linked feedback and retry goals. It previews the planned API experience separately from the authored-response practice engine. Student-only scroll-driven transcription illustrates future voice input without accessing a microphone. The demonstration makes no live API calls and does not represent measured model performance.

## Next development step

Integrate Claude to interpret Korean natural-language questions and generate simulated-patient dialogue within authored case facts. Keep the patient and feedback roles separate. Ground formative feedback in exact quotations from the actual practice conversation, and distinguish information not asked about from information the patient does not know or that the case does not define.

Planned evaluation focuses on case consistency, unasked-information leakage, quote accuracy, latency, and cost. Technical guidance and suitable API support would help develop and evaluate this next stage. No program acceptance, credits, or partnership is claimed.

## Evidence and limits

The repository includes a working static demo, original Korean source, English review translation, and reproducible software tests. The current bundle passes 160 software tests (67 Korean, 66 English, 20 guided-demo checks, 7 introduction/navigation checks). Browser visual review of the latest demonstration remains pending. Software checks are not clinical validation. No user, revenue, funding, or educational-effectiveness claims are made.

All included cases are original fictional educational material. This is not a patient-care or clinical decision-support tool. No real patient data, private case collection, account identifiers, or credentials are included.

## Review links

- [English demo](en/index.html)
- [Korean original](site/index.html)
- [Setup and test instructions](README.md)
