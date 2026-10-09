export const frontCopy = {
  "lang": "en",
  "eyebrow": "A clinical-interview practice project",
  "headline": "Ask with purpose. Learn from the conversation.",
  "lead": "Listen to the patient. Choose the next question. Revisit what you missed. CPX Practice Lab is a student-led project for making Korean clinical-interview practice easier to repeat on your own.",
  "byline": "CHOI JUNHO · Medical student, Hanyang University College of Medicine · Started February 2026",
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
    "stage": "An independent, early-stage project by a medical student at Hanyang University College of Medicine. Not yet incorporated."
  },
  "apiExample": {
    "question": "You cannot sleep because you drink five cups of coffee a day, right?",
    "patient": "It is not five cups. I have one in the morning and one around 4 p.m.",
    "observation": "This assumes both the amount and the cause.",
    "alternative": "How many cups of coffee do you drink a day, and when do you usually drink them?",
    "constraint": "Drinks one cup of coffee each morning and another around 16:00 every day."
  },
  "narrative": {
    "challenge": {
      "eyebrow": "Where practice matters",
      "title": "Choosing the next question from the patient’s answer.",
      "paragraphs": [
        "This short exchange from the project’s fictional sleep case brings the practice goal into focus: a student’s question, the patient’s correction, and a different way to ask next time."
      ],
      "exampleLabel": "Original fictional case · Difficulty sleeping",
      "studentLabel": "Student question",
      "patientLabel": "Patient reply",
      "reflection": "The useful review goes beyond whether caffeine was mentioned. What did the student assume before checking? What did the patient actually say? How should that answer change the next question?",
      "retryLabel": "A question to try next time"
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
  },
  "education": {
    "contextTitle": "Understanding CPX explains the need for this kind of practice.",
    "contextIntro": "This project starts from the idea that a clinical conversation is a skill to perform, examine and practice again. To understand the project, it helps to first understand why CPX exists and what a student is expected to demonstrate.",
    "sections": [
      {
        "id": "why-cpx",
        "eyebrow": "Why CPX exists",
        "title": "Can a student use what they have learned in front of a patient?",
        "paragraphs": [
          "CPX stands for Clinical Performance Examination. A student carries out a consultation with a person trained to portray a patient. This makes it possible to observe how the student gathers information, examines, explains and builds a working relationship. In Korean medical education, CPX is used to teach and assess this performance of a clinical encounter.",
          "Medical knowledge underpins all of these activities. Written examinations have an important role in testing understanding and the interpretation of information. Performance assessment adds an opportunity to see how students use that knowledge when they must obtain the information themselves. Interpreting a clue already included in a written question and eliciting that clue from a patient are related, but they are not the same task.",
          "The Korean licensing examination institute’s 2015 practical-examination objectives describe core competencies for primary care in terms of the process of performing them. From this perspective, an assessment can examine how a student reaches and communicates an answer, as well as whether the answer is known. Preparation therefore involves opportunities to speak, listen and act alongside reading and understanding."
        ],
        "sources": [
          {
            "label": "Seoul National University College of Medicine · CPX overview (2019)",
            "url": "https://webzine.medicine.snu.ac.kr/bbs/board/lists?bo_table=201907&ca_name=%EA%B5%90%EC%9C%A1%EB%8F%99%EC%A0%95"
          },
          {
            "label": "KHPLEI · Practical examination objectives (2015, hosted by SKKU)",
            "url": "https://www.skkumed.ac.kr/dataroom/%EC%9D%98%EC%82%AC%EA%B5%AD%EA%B0%80%EC%8B%9C%ED%97%98%5B%EC%8B%A4%EA%B8%B0%5D%20%ED%8F%89%EA%B0%80%EB%AA%A9%ED%91%9C%EC%A7%91.pdf"
          }
        ]
      },
      {
        "id": "what-cpx-observes",
        "eyebrow": "What is being assessed",
        "title": "How questions, examination, reasoning and explanation become one consultation.",
        "paragraphs": [
          "Think of an encounter rather than a list of isolated skills. History-taking leads into examination and explanation, while communication and the student’s approach to the patient are visible throughout. The institute’s 2019 reform notice describes an integrated assessment encompassing history-taking, physical examination, communication, attitude and basic procedures.",
          "History-taking begins with knowing what to ask, but continues through listening and clarifying meaning. In an educational example, a patient might say, “I am not sleeping well.” Do they mean difficulty falling asleep, waking repeatedly, or waking earlier than intended? Clarifying that account gives the conversation a more precise starting point. Knowing the name of a symptom does not, by itself, carry out this exchange.",
          "Clinical reasoning is involved in gathering that information. The student considers what would help clarify their current understanding and chooses a follow-up. If “When did this begin?” brings the answer “After my work hours changed,” they might explore how the change affected daily life. That does not establish a cause. It illustrates the distinction between what the patient has reported and a possibility the student still needs to investigate.",
          "Physical examination includes obtaining relevant findings with appropriate technique while explaining the process and respecting the patient. Explanation and patient education also require more than an understanding in the student’s own mind. The student must put familiar technical ideas into accessible words, distinguish what is known from what still needs clarification, and invite the patient’s questions. Some of this can be rehearsed through dialogue; other parts require practice with people and equipment.",
          "Communication is present well before a polite closing sentence. It appears in how a concern is acknowledged, whether the student moves on before an answer is complete, and whether several questions are bundled so that the reply becomes ambiguous. Asking “Which part would you like us to talk through further?” and listening to the answer is one small exercise in distinguishing an explanation delivered from questions that remain."
        ],
        "sources": [
          {
            "label": "KHPLEI · Practical exam reform and competency domains (2019)",
            "url": "https://www.kuksiwon.or.kr/news/brd/m_54/view.do?company_cd=&company_nm=&etc1=&itm_seq_1=0&itm_seq_2=0&multi_itm_seq=0&seq=339&srchFr=&srchTo=&srchTp=&srchWord=%EC%9D%98%EC%82%AC"
          },
          {
            "label": "Gachon University College of Medicine · CPX clinical tasks",
            "url": "https://medicine.gachon.ac.kr/sub01_about/page04_02_t02.php"
          }
        ],
        "exampleNote": "Original educational illustrations"
      },
      {
        "id": "why-standardized-patients",
        "eyebrow": "Why a standardized patient",
        "title": "A stable patient story makes the student’s performance easier to examine.",
        "paragraphs": [
          "A standardized patient, or SP, is a person trained to portray a defined patient’s symptoms, background and responses consistently. ASPE emphasizes both realism and repeatability. Keeping the underlying facts stable makes it easier to examine differences in how learners approach the encounter. A consistent case provides a basis for presenting comparable tasks to different students and reviewing more than one attempt by the same student.",
          "Standardization does not mean answering every question with the same sentence. “How much coffee do you drink?” and “When do you usually drink it?” ask for different parts of the same story. The response should fit the question, but a patient who reports two cups should not arbitrarily report five in the next exchange. To examine what the student elicited, the information being elicited needs to remain coherent.",
          "Consistency alone does not make an assessment fair or accurate. Case design, preparation for portrayal and feedback, and the criteria used to observe performance also matter. ASPE’s standards address these as distinct responsibilities. The same caution informs an AI patient: sounding conversational is not sufficient evidence that it is performing a useful educational role."
        ],
        "sources": [
          {
            "label": "ASPE · Standardized patients and repeatable portrayal",
            "url": "https://www.aspeducators.org/about-aspe"
          },
          {
            "label": "ASPE · Standards for cases, portrayal and feedback (2017)",
            "url": "https://link.springer.com/article/10.1186/s41077-017-0043-4"
          }
        ]
      },
      {
        "id": "why-simulation-practice",
        "eyebrow": "Why practice through simulation",
        "title": "Perform the task, examine a missed moment, and try it again.",
        "paragraphs": [
          "Preparing for performance requires a setting in which to perform. Simulation creates a situation around a learning objective, allowing learners to try questions and explanations without placing the demands of that practice on a real patient’s care. AHRQ describes it as a way to connect classroom learning with clinical experience. The aim is not necessarily to reproduce every detail of reality, but to let learners use the particular skills they need to practice.",
          "In an interactive rehearsal, an anticipated question encounters another person’s reply. The student may need to shorten the question, pause, or clarify an unexpected answer. This reveals where something familiar on the page becomes difficult to use in an exchange. Working through that moment exercises the decision about what to do next, rather than simply reciting every prepared question.",
          "Repetition needs specific feedback. “Communicate better” gives a student little guidance for another attempt. “This question assumed five cups before asking about the amount” points to something observable. It can become a goal: ask separately about quantity and timing. After another attempt, the student can examine whether they made that change and what response it elicited. This is an example of the review process the project is designed to support.",
          "Returning to the same case can focus practice on a particular change; encountering different wording and situations can help reveal reliance on a memorized sequence. The important connection is between a goal, an observable performance, feedback and the next attempt. Simulation provides a way to build that connection."
        ],
        "sources": [
          {
            "label": "AHRQ PSNet · Simulation training: purpose and methods",
            "url": "https://psnet.ahrq.gov/primer/simulation-training"
          },
          {
            "label": "AHRQ and SSH · Simulation and a safe learning environment",
            "url": "https://www.ahrq.gov/patient-safety/resources/simulation/terms.html"
          }
        ]
      },
      {
        "id": "where-this-project-begins",
        "eyebrow": "Where this project begins",
        "title": "A small practice space for the interview and the evidence it leaves behind.",
        "paragraphs": [
          "Within that broader clinical encounter, CPX Practice Lab starts with Korean-language interviewing and dialogue review. The goal is to make another attempt possible when a partner or shared time is difficult to arrange. It is intended to complement practice with educators and peers, offering a place to work on a specific question between those sessions.",
          "For this to be useful, the authored case, the actual questions and replies, the evidence discussed in review and the next practice goal need to stay connected. Information that was never asked about needs to remain distinguishable from something the patient does not know. A feedback observation needs a traceable source in the conversation, so the student can decide what to ask differently rather than merely receive a judgment that something was missed.",
          "A conversation on a screen cannot encompass the physical technique of examination, a real patient’s nonverbal responses or the complexity of clinical work. The project does not provide official exam scoring or certification of competence. Today’s workbench provides authored patient responses and a record to review; natural-language patient dialogue and a separate, evidence-grounded feedback role through the Claude API are the next development step. The fictional case below illustrates this deliberately focused practice goal."
        ],
        "sources": []
      }
    ]
  }
};
