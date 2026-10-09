export const frontCopy = {
  "lang": "en",
  "eyebrow": "A clinical-interview practice project",
  "headline": "Ask with purpose. Learn from the conversation.",
  "lead": "CPX Practice Lab brings authored patient cases, interview practice and dialogue-based review into one place. Built for medical students practicing clinical interviews in Korean.",
  "byline": "CHOI JUNHO · Student creator · Started February 2026",
  "languageNote": "Originally developed in Korean. English translation for review.",
  "primary": "Explore the demonstration",
  "secondary": "Try the practice workbench",
  "storyTitle": "A question is only the beginning.",
  "paragraphs": [
    "A useful practice session leaves more than a conversation transcript. It lets the learner see what a question actually elicited, which information remains unknown, and what to ask differently on the next attempt.",
    "The project connects that loop: a fictional case sets the facts; the interview records what was asked and answered; review brings the learner back to specific words; a focused goal carries into another attempt."
  ],
  "loopTitle": "One case. A traceable learning loop.",
  "loop": [
    "Start from an authored case. Patient facts and unknowns belong to a defined case version, so a practice session keeps the context it started with.",
    "Ask and listen. In the planned AI experience, the patient responds within those case facts, corrects a mistaken premise and does not turn an unknown answer into a reassuring denial.",
    "Return to the evidence. Review connects a patient statement to the question and case fact behind it, then turns the observation into a concrete retry goal.",
    "Try again with a goal. Choose one or two changes from the review and return to the same case. Compare what your next question elicits."
  ],
  "demoTitle": "Follow one interview from question to feedback.",
  "demoIntro": "A student explores a fictional patient's sleep difficulty. Watch the patient correct an assumption, preserve an unknown answer, and carry the conversation into evidence-linked feedback and two goals for the next attempt.",
  "demoStatus": "Scripted demonstration of the planned API experience.",
  "afterTitle": "A working foundation. A focused next step.",
  "working": "The current practice workbench includes three original fictional cases, a case editor, quoted dialogue review, goal-based retries and JSON export/import. Its patient responses are authored.",
  "planned": "Claude integration is the next step: interpret natural Korean questions, keep the patient within the case facts, and support a separate feedback role grounded in the actual dialogue. The evaluation plan covers consistency, information leakage, quote accuracy, latency and cost.",
  "creator": "I am building CPX Practice Lab as a student-led project, beginning with the interview and review workflow I want to make easier to practice. The original material is Korean; this English edition makes the project easier to review.",
  "footerNote": "Fictional educational cases. Not for patient care.",
  "portfolio": {
    "title": "Where Claude fits.",
    "lead": "The case and review workflow already exists. The next step is to make the interview responsive to the student's own words.",
    "roles": [
      {
        "title": "Natural Korean questions → a case-grounded patient.",
        "text": "Students should be able to paraphrase, ask an incomplete question, or make a mistaken assumption without selecting a prewritten question. The planned Claude patient role would interpret the question while staying within the authored facts and unknowns."
      },
      {
        "title": "The conversation → specific, traceable feedback.",
        "text": "A separate planned feedback role would receive the recorded conversation and review criteria, point to exact quotations, and propose one or two useful changes for another attempt. It should distinguish an unasked question from an answer the patient does not know."
      },
      {
        "title": "Repeatable evaluation before wider use.",
        "text": "The initial evaluation plan uses 30 dialogue scenarios across three fictional cases: five question types, each with two wording variants. I will check case consistency, information leakage, quotation accuracy, latency and usage. These are planned checks, not measured model results."
      }
    ],
    "example": "If a student asks, “So five cups of coffee are keeping you awake?”, the patient should correct the premise: the case says two cups. The demonstration above shows the behavior the integration is intended to support.",
    "supportTitle": "What support would enable.",
    "support": "An individual Claude subscription would support sustained planning, development and review. API credits would fund the simulated-patient and feedback integration itself, followed by the evaluation described above. I am seeking 12 months of individual access and a modest API-credit allocation, and would welcome a smaller or shorter arrangement.",
    "stage": "Student-led, independent, early-stage project. Not yet incorporated."
  },
  "apiExample": {
    "question": "You cannot sleep because you drink five cups of coffee a day, right?",
    "patient": "It is not five cups. I have one in the morning and one around 4 p.m.",
    "observation": "This assumes both the amount and the cause.",
    "alternative": "How many cups of coffee do you drink a day, and when do you usually drink them?",
    "constraint": "Drinks one cup of coffee each morning and another around 16:00 every day."
  }
};
