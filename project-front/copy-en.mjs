export const frontCopy = {
  "lang": "en",
  "eyebrow": "A clinical-interview practice project",
  "headline": "AI Standardized-Patient Simulation for Medical Students",
  "lead": "Practice CPX interviews, review dialogue-based feedback, and try again.",
  "byline": "CHOI JUNHO · Hanyang University College of Medicine",
  "primary": "Explore the demonstration",
  "secondary": "Try the practice workbench",
  "demoTitle": "Follow one interview from question to feedback.",
  "demoIntro": "A student explores a fictional patient's sleep difficulty. Watch the patient correct an assumption, preserve an unknown answer, and carry the conversation into evidence-linked feedback and two goals for the next attempt.",
  "demoStatus": "Scripted demonstration; no live API connection.",
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
    "stage": "An independent, early-stage project by a medical student at Hanyang University College of Medicine. Not yet incorporated."
  },
  "apiExample": {
    "question": "You cannot sleep because you drink five cups of coffee a day, right?",
    "patient": "It is not five cups. I have one in the morning and one around 4 p.m.",
    "observation": "This assumes both the amount and the cause.",
    "alternative": "How many cups of coffee do you drink a day, and when do you usually drink them?",
    "constraint": "Drinks one cup of coffee each morning and another around 16:00 every day."
  },
  "opening": [
    {
      "title": "What does CPX assess?",
      "paragraphs": [
        "CPX, the Clinical Performance Examination, assesses how a medical student conducts a consultation. The student takes a history, performs an examination and explains their assessment to a standardized patient: a person trained to portray a defined case.",
        "Students must obtain information themselves and choose the next question from the patient’s answer. Listening to concerns and explaining in accessible language are assessed too. Preparation therefore requires practice in conversation alongside medical knowledge."
      ],
      "sources": [
        {
          "label": "KHPLEI · Assessment domains (2019)",
          "url": "https://www.kuksiwon.or.kr/news/brd/m_54/view.do?company_cd=&company_nm=&etc1=&itm_seq_1=0&itm_seq_2=0&multi_itm_seq=0&seq=339&srchFr=&srchTo=&srchTp=&srchWord=%EC%9D%98%EC%82%AC"
        }
      ]
    },
    {
      "title": "A way to practice the conversation on your own.",
      "paragraphs": [
        "An interview requires someone to respond to. But a practice partner is not always available for another attempt. Simulation provides a defined patient story in which students can try a question, revisit what they missed and practice a change.",
        "CPX Practice Lab makes that process repeatable on your own. After an interview, students revisit the words exchanged, choose a question to change and return to the same case. They can compare what they asked and what the answer revealed."
      ],
      "sources": [
        {
          "label": "AHRQ · Simulation training",
          "url": "https://psnet.ahrq.gov/primer/simulation-training"
        }
      ]
    },
    {
      "title": "Why the Claude API matters.",
      "paragraphs": [
        "The current tool uses prewritten patient responses. The next step is to connect the Claude API so the conversation can respond to the student’s own words. The case facts need to remain consistent even when the wording changes.",
        "The patient role should correct mistaken premises and leave unknown information unknown. A separate feedback role would use quotations from the actual conversation to suggest a question to try differently next time."
      ],
      "sources": []
    }
  ]
};
