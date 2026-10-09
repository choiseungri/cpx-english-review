# CPX Practice Lab

A student-built clinical-interview training workbench by **CHOI JUNHO**, an independent creator in South Korea. Project started **February 2026**.

**Originally developed in Korean. This English edition is a translation for review.**

- [Open the English review demo](en/index.html)
- [Open the Korean edition](site/index.html)
- [Read the one-page project brief](PROJECT-BRIEF.md)

## What works today

Three original fictional cases connect case authoring, interview practice, exact dialogue evidence, and goal-based retries: **54 fact units, 36 question intents, and 108 registered question expressions per language**. The case editor creates local revisions; existing sessions retain the case version they used. Records, drafts, and goals can be exported and imported as JSON.

The current prototype uses **deterministic authored responses**. A typed question is normalized for Unicode and whitespace and matched to a registered expression. Unmatched questions remain recorded; the learner can explicitly select an intent for assistance. There is no semantic matching, live Claude connection, automatic assessment, or diagnostic advice.

## Review in three minutes

1. Open the English project page. Read the introduction, then scroll into the demonstration. Use the prominent **English / 한국어** control to change the full edition. The **Practice** action opens the working training tool.
2. Start a new practice. Open **Example questions**, select an intent, and send its question.
3. Finish practice and inspect a quoted patient statement alongside its source fact.
4. Select 1–3 goals and retry the same case version.
5. Optionally open **Cases** to edit a draft and publish a new local revision.

## Reviewer-oriented project introduction

English is the default entry. A visible English / 한국어 switch selects the matching introduction, demonstration and practice workbench. It retains known workbench views; in-page demo anchors safely return to the other edition’s project view. Existing language-specific practice records stay in their original stores.

The opening answers three reviewer questions in six short paragraphs: what CPX assesses, why repeatable conversation practice is needed, and why the next stage needs the Claude API. English and Korean copy are each less than one third of the previous rendered opening. Two primary-source links remain; repeated production labels, translation notes and small-print introductions have been removed. The original portrait and restrained editorial styling are retained, with readable mobile text.

The demonstration keeps a concise, explicit status at its entrance: it is scripted and does not use a live API. Embedded mode omits the repeated internal heading and production notices; standalone mode retains its introduction. The later portfolio section retains the planned patient and feedback roles, evaluation plan and support request.

## Guided demonstration

After the project introduction, the landing pages include a **scripted preview of the planned API-powered workflow**, separate from the current practice engine. Twelve student–patient exchanges lead to question-domain coverage derived from recorded question IDs and responses (10 of 12), exact-quote feedback, and two retry goals. A mistaken coffee premise is corrected by the SP; lack of sleep-observation information stays unknown. The two omitted domains remain unasked. No model is called and no practice records are changed.

The experience is controlled by **native page scrolling**, with no autoplay clock, forced scrolling, snap points or wheel/touch interception. Whole student questions, SP replies and adjacent evidence respond to their viewport position. Prior conversation remains fully readable above. Feedback source links return to the exact dialogue pair. Reduced motion, or “Read all without motion,” displays all text without movement. The entrance portrait scrolls out naturally. Student questions now simulate voice transcription: complete grapheme clusters appear with local scroll progress, accompanied by a small input waveform and caret. The full question reserves its final dimensions and remains accessible; SP replies and facts appear only once the question is complete. This is a scripted input example, with no microphone permission, recording, speech service or audio.

Software verification: **169 tests passed** (68 original Korean, 67 English, 20 guided-demo checks, 14 front/language/navigation checks). These checks cover software behavior; they are not live-model or clinical validation.

## Planned Claude integration

The next development step is Korean natural-language simulated-patient dialogue constrained to authored case facts, with a separate feedback role grounded in exact dialogue quotations. Evaluation priorities include case consistency, unasked-information leakage, quote accuracy, latency, and cost. These are plans, not completed capabilities or measured results.

## Run locally

No installation or build is required. From this directory:

    python3 -m http.server 8000 --bind 127.0.0.1

Open `http://127.0.0.1:8000/`. Use HTTP rather than opening the files directly because the app loads its casebank with `fetch`.

## GitHub Pages structure

The root `index.html` opens `en/index.html`. All product links and assets are relative, so the same layout supports a repository subpath. Publish this directory as the repository root and configure Pages to deploy the root of the chosen branch. `.nojekyll` is included. No custom domain, backend, API key, package installation, or build service is required. Publishing is a separate step; this bundle itself does not publish anything.

## Tests

Requires Node.js with the built-in test runner (verified with Node.js v24.19.0):

    node --test software-tests/tests/*.test.mjs english-tests/*.test.mjs guided-tests/*.test.mjs front-tests/*.test.mjs

Tests cover software behavior and translation invariants. They do not establish clinical validity, educational effectiveness, user traction, or live-model performance.

## Data and safety

For clinical education only, not patient care or clinical decision-making. All included cases are fictional and have not undergone independent medical review. Do not enter real patient information. Practice data stays in browser storage unless the user exports it. English and Korean editions use separate browser-storage keys. There is no telemetry or external model request in the app; the hosting provider still receives normal page and asset requests.

## Included materials

`site/` contains the Korean product source and assets. `en/` contains the English review adaptation. `software-tests/` contains the original regression suite; `english-tests/` checks the adaptation; `guided-tests/` checks the demonstration. `guided-demo/` contains the shared scroll demonstration. `project-front/` contains the bilingual project copy, intro renderer, language helpers, styling and locally embedded assets. `front-tests/` verifies the new introduction and navigation. `design/` contains the approved visual references and an accurate production-asset usage note. The font license notice is retained in each edition's `assets/FONT-LICENSE.txt`. No open-source license is assigned to the original project by this review bundle.

The HTML entry, project presentation, bilingual copy and shared renderer use a common release query to prevent stale browser modules from mixing copy schemas. UI regression tests load the actual HTML script entry and visit every workbench view in both languages.
