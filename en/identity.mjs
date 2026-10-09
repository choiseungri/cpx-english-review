// Shared project facts for the interactive introduction and checked static fallback.
export const identity = Object.freeze({
  name: 'CPX Practice Lab',
  creator: 'CHOI JUNHO',
  creatorContext: 'Independent creator in South Korea',
  started: 'Project started February 2026',
  introduction: 'An independent Korean-language clinical-interview practice project by CHOI JUNHO in South Korea. Started in February 2026, it connects case authoring, interview practice and review of quoted dialogue evidence in one workflow.',
  description: 'CPX Practice Lab is an educational workbench for practicing Korean-language clinical interviews with authored fictional cases, reviewing quoted dialogue evidence and practicing again with a specific goal.',
  scope: '3 authored fictional cases · 54 facts · 36 question intents · 108 expressions',
  workflow: 'Author a case → practice an interview → review quoted dialogue evidence → retry with a goal. The case version used for a practice session is preserved. Cases, drafts, conversations and goals can be exported or imported as JSON.',
  planIntro: 'The next development step is to integrate Claude, connecting natural-language questions in Korean with case-grounded dialogue and review.',
  plans: [
    ['From Korean questions to patient responses', 'The plan is to interpret the intent of natural-language questions in Korean and generate patient responses within the facts authored for the selected case.'],
    ['From exact dialogue quotes to feedback', 'The plan is to separate the patient and feedback roles and provide feedback on questions based on exact quotes from the practice conversation.'],
    ['From the same case to another practice session', 'After Claude integration, the plan is to keep each session tied to its case version and distinguish information not yet asked about, information the patient does not know and information not specified in the case, then use those distinctions to set the next practice goal.']
  ],
  english: 'CPX Practice Lab is an independently developed Korean clinical-interview training workbench. It connects authored fictional cases, practice conversations, exact dialogue evidence and goal-based retries. Created by CHOI JUNHO; project started in February 2026. The current prototype uses authored responses; Claude integration is planned and is not live. For education only, not patient care. No clinical validation is claimed.',
  storage: 'Practice records are currently stored in this browser on this device and are not sent to an external server. There is no automatic synchronization. You can export cases, drafts, conversations and practice goals as JSON for safekeeping.'
});
