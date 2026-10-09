export const frontCopy = {
  "lang": "en",
  "eyebrow": "A clinical-interview practice project",
  "headline": "Ask with purpose. Learn from the conversation.",
  "lead": "Listen to the patient. Choose the next question. Revisit what you missed. CPX Practice Lab is a student-led project for making Korean clinical-interview practice easier to repeat on your own.",
  "byline": "CHOI JUNHO · Student creator · Started February 2026",
  "languageNote": "Originally developed in Korean. English translation for review.",
  "primary": "Explore the demonstration",
  "secondary": "Try the practice workbench",
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
  },
  "sourceLabel": "CPX background · Gachon University College of Medicine",
  "sourceUrl": "https://medicine.gachon.ac.kr/sub01_about/page04_02_t02.php",
  "narrative": {
    "exam": {
      "eyebrow": "First, what is CPX?",
      "title": "A clinical exam built around a patient encounter.",
      "paragraphs": [
        "CPX stands for Clinical Performance Examination. In Korean medical education, it assesses how a student conducts a consultation with a standardized patient: a person portraying the symptoms and circumstances of a defined case.",
        "The student takes a history, performs a physical examination, and provides explanations and patient education. The encounter asks students to put medical knowledge into practice, while listening and communicating with the person in front of them."
      ],
      "scope": "This project focuses on the interview and dialogue review. It does not replace hands-on physical-examination training or official exam assessment."
    },
    "challenge": {
      "eyebrow": "Where practice matters",
      "title": "Choosing the next question from the patient’s answer.",
      "paragraphs": [
        "Knowing to ask about caffeine when discussing sleep is one part of the task. Finding the words is another. A student might ask about the amount and timing step by step, or build an unconfirmed assumption into the question itself.",
        "This short exchange comes from an original fictional case in the project. The student has assumed both an amount and a cause. The patient has to correct the premise first."
      ],
      "exampleLabel": "Original fictional case · Difficulty sleeping",
      "studentLabel": "Student question",
      "patientLabel": "Patient reply",
      "reflection": "The useful review goes beyond whether caffeine was mentioned. What did the student assume before checking? What did the patient actually say? How should that answer change the next question?",
      "retryLabel": "A question to try next time"
    },
    "purpose": {
      "eyebrow": "Why I am building this",
      "title": "A place to make another attempt, on your own.",
      "paragraphs": [
        "Taking turns with a practice partner and reviewing each other’s interviews is valuable. But another attempt should also be possible when a partner or shared time is hard to arrange. The goal is to give solo practice a patient’s response, so the student can work through what happens after the question, too.",
        "The experience I am building continues beyond a single conversation. Start with an authored case, conduct the interview, review the words that were actually exchanged, then return to the same case with something specific to change. A vague intention to ask better questions becomes a concrete next step: ask about the amount and timing separately, without assuming either."
      ]
    },
    "bridge": {
      "eyebrow": "The next step with the Claude API",
      "title": "Responding to the question I express, not just the one I select.",
      "paragraphs": [
        "The current workbench returns authored patient responses for registered question expressions or an explicitly selected question intent. The case, transcript, quotation review and retry workflow is implemented. A model that understands freely worded questions is not connected yet.",
        "That is where I plan to use the Claude API. The patient role should understand natural Korean questions while staying within the case facts, correcting mistaken premises and leaving unknown information unknown. A separate feedback role would cite the actual conversation to explain its observations and suggest a specific change for the next attempt."
      ],
      "transition": "Below is an authored demonstration of a full interview and review, illustrating the experience planned for a live API connection."
    }
  }
};
