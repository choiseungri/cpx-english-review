export const demoData = {
  "caseId": "original-sleep-history-001",
  "caseVersion": "1.1.0",
  "scripted": true,
  "liveAPI": false,
  "lang": "en",
  "labels": {
    "title": "Different questions.\nThe same patient facts.",
    "subtitle": "One practice, from interview to scoring and feedback",
    "notice": "Preview of the planned API-powered workflow · Scripted example",
    "caseLabel": "Fictional case · 29-year-old office worker · Difficulty falling asleep",
    "portraitAlt": "Watercolor portrait of a young fictional patient wearing a green cardigan",
    "student": "Student",
    "patient": "SP",
    "facts": "Facts established in dialogue",
    "noFacts": "No new facts established yet.",
    "turn": "Turn",
    "score": "Scoring",
    "feedback": "Feedback",
    "goals": "Next practice",
    "transcript": "Read the full dialogue and feedback",
    "scoreLabel": "Question domains addressed",
    "scoreNote": "Learning items defined for this example. Not an official exam score or actual AI-generated scoring.",
    "addressed": "Addressed",
    "notAsked": "Not asked",
    "source": "View dialogue evidence",
    "unknown": "No observational information",
    "negative": "Patient explicitly denies this",
    "known": "Information known to the patient",
    "change": "The patient corrects the mistaken premise and preserves the authored facts.",
    "unknownNote": "Not knowing does not mean the symptom is absent.",
    "coverageNote": "The coffee question is leading but establishes amount and timing. The observation domain is addressed even though the answer is “I do not know.”",
    "missedNote": "Enjoyment/interest and the help the patient hopes to receive were not asked about. Do not infer those answers.",
    "goalItems": [
      "Ask about amount and timing without assuming the answer.",
      "Before ending, ask what help the patient hopes to receive."
    ],
    "goalIntro": "Practice again with the same case and version.",
    "goodTitle": "What went well",
    "goodQuote": "So, one cup in the morning and one in the afternoon.",
    "goodText": "The student corrected the earlier assumption to reflect the patient's actual response.",
    "feedbackItems": [
      {
        "turn": 8,
        "title": "The amount and cause were assumed.",
        "quote": "You cannot sleep because you drink five cups of coffee a day, right?",
        "text": "This assumes both the amount and the cause.",
        "alternative": "How many cups of coffee do you drink a day, and when do you usually drink them?"
      },
      {
        "turn": 11,
        "title": "The question leads toward a negative answer.",
        "quote": "You do not stop breathing while you sleep, do you?",
        "text": "Distinguish a lack of observational information from an absence of symptoms.",
        "alternative": "Has anyone told you that you snore or stop breathing while you sleep?"
      }
    ],
    "better": "A better question",
    "accuracy": "Record accuracy",
    "accuracyText": "“I sleep alone, so I do not know whether I snore or stop breathing.” → No observational information. Do not turn this into an absence of symptoms or a negative finding."
  },
  "turns": [
    {
      "number": 1,
      "student": "Hello. I am Junho Choi, a student doctor. What brings you in today?",
      "patient": "I came because I have been having trouble falling asleep even after lying down.",
      "questionId": null,
      "facts": []
    },
    {
      "number": 2,
      "student": "When did this start, and has it become worse or better since then?",
      "patient": "It started 3 weeks ago. It has been mostly the same from then until now.",
      "questionId": "original-sleep-history-001.q01",
      "facts": [
        {
          "id": "original-sleep-history-001.f01",
          "topic": "Onset",
          "text": "Difficulty falling asleep began 3 weeks ago.",
          "status": "known"
        },
        {
          "id": "original-sleep-history-001.f02",
          "topic": "Course",
          "text": "The degree of difficulty has remained generally similar since onset.",
          "status": "known"
        }
      ]
    },
    {
      "number": 3,
      "student": "How many days a week does this happen, and how long does it take you to fall asleep?",
      "patient": "About four days a week. On those days, I think it takes about an hour after I lie down.",
      "questionId": "original-sleep-history-001.q02",
      "facts": [
        {
          "id": "original-sleep-history-001.f03",
          "topic": "Frequency",
          "text": "Recently has had difficulty falling asleep about 4 days a week.",
          "status": "known"
        },
        {
          "id": "original-sleep-history-001.f04",
          "topic": "Time to fall asleep",
          "text": "Estimates that on difficult nights, falling asleep takes about 1 hour after lying down.",
          "status": "known"
        }
      ]
    },
    {
      "number": 4,
      "student": "What time do you go to bed and get up on weekdays and weekends?",
      "patient": "On weekdays, I go to bed at midnight and get up at 7 a.m. On weekends, I go to bed at 1 a.m. and get up at 9 a.m.",
      "questionId": "original-sleep-history-001.q03",
      "facts": [
        {
          "id": "original-sleep-history-001.f05",
          "topic": "Weekday schedule",
          "text": "On weekdays, lies down at 00:00 and gets up at 07:00.",
          "status": "known"
        },
        {
          "id": "original-sleep-history-001.f06",
          "topic": "Weekend schedule",
          "text": "On weekends, lies down at 01:00 and gets up at 09:00.",
          "status": "known"
        }
      ]
    },
    {
      "number": 5,
      "student": "Do you wake during the night, or wake too early and have trouble getting back to sleep?",
      "patient": "Sometimes I wake once to use the bathroom, but I fall asleep again quickly. Recently, I have not woken early and been unable to get back to sleep.",
      "questionId": "original-sleep-history-001.q04",
      "facts": [
        {
          "id": "original-sleep-history-001.f07",
          "topic": "Nighttime waking",
          "text": "Sometimes wakes once to use the bathroom, but soon falls asleep again.",
          "status": "known"
        },
        {
          "id": "original-sleep-history-001.f08",
          "topic": "Early waking",
          "text": "During these 3 weeks, has not woken early in the morning and been unable to return to sleep.",
          "status": "explicit_negative"
        }
      ]
    },
    {
      "number": 6,
      "student": "How does this affect your daytime activities? Have you been injured or had a close call because you were sleepy?",
      "patient": "I have trouble concentrating on paperwork in the afternoon. Recently, I have not been injured or had a close call because I was sleepy.",
      "questionId": "original-sleep-history-001.q05",
      "facts": [
        {
          "id": "original-sleep-history-001.f09",
          "topic": "Impact on daily life",
          "text": "Has difficulty concentrating on document work in the afternoon.",
          "status": "known"
        },
        {
          "id": "original-sleep-history-001.f10",
          "topic": "Drowsiness-related incidents",
          "text": "During these 3 weeks, has had no injuries or near misses due to drowsiness.",
          "status": "explicit_negative"
        }
      ]
    },
    {
      "number": 7,
      "student": "What do you usually do after getting into bed?",
      "patient": "I look at work messages or videos on my phone for about 30 minutes.",
      "questionId": "original-sleep-history-001.q06",
      "facts": [
        {
          "id": "original-sleep-history-001.f11",
          "topic": "Activities before sleep",
          "text": "Looks at work messages or videos in bed for about 30 minutes.",
          "status": "known"
        }
      ]
    },
    {
      "number": 8,
      "student": "You cannot sleep because you drink five cups of coffee a day, right?",
      "patient": "It is not five cups. I have one in the morning and one around 4 p.m.",
      "questionId": "original-sleep-history-001.q07",
      "facts": [
        {
          "id": "original-sleep-history-001.f12",
          "topic": "Coffee",
          "text": "Drinks one cup of coffee each morning and another around 16:00 every day.",
          "status": "known"
        }
      ]
    },
    {
      "number": 9,
      "student": "I assumed the amount before asking. So, one cup in the morning and one in the afternoon. Has anything changed in your life recently, or is there anything you worry about when you lie down?",
      "patient": "I took on new work around the time I started having trouble falling asleep. When I lie down, I think about whether I might forget something I need to do tomorrow.",
      "questionId": "original-sleep-history-001.q08",
      "facts": [
        {
          "id": "original-sleep-history-001.f13",
          "topic": "Life changes",
          "text": "Took on new work responsibilities around the time the difficulty falling asleep began.",
          "status": "known"
        },
        {
          "id": "original-sleep-history-001.f14",
          "topic": "Worries",
          "text": "When lying down, thinks about whether there is any work they might overlook the next day.",
          "status": "known"
        }
      ]
    },
    {
      "number": 10,
      "student": "Have you tried any medicines or supplements to help you sleep?",
      "patient": "I have never tried medicines or supplements for sleep.",
      "questionId": "original-sleep-history-001.q10",
      "facts": [
        {
          "id": "original-sleep-history-001.f16",
          "topic": "Sleep aids",
          "text": "Has never used medication or sleep aids for sleep.",
          "status": "explicit_negative"
        }
      ]
    },
    {
      "number": 11,
      "student": "You do not stop breathing while you sleep, do you?",
      "patient": "I sleep alone, so I do not know whether I snore or stop breathing.",
      "questionId": "original-sleep-history-001.q11",
      "facts": [
        {
          "id": "original-sleep-history-001.f17",
          "topic": "Sleep observations",
          "text": "Usually sleeps alone and does not know whether they snore or stop breathing during sleep.",
          "status": "patient_unknown"
        }
      ]
    },
    {
      "number": 12,
      "student": "So you do not know because there is no one to observe you sleeping. Today, I heard that you have had trouble falling asleep about four days a week for the past 3 weeks, and that it also affects your concentration in the afternoon. We will finish today's interview here.",
      "patient": "Yes, thank you.",
      "questionId": null,
      "facts": []
    }
  ],
  "domains": [
    {
      "id": "original-sleep-history-001.q01",
      "label": "Onset and course",
      "addressed": true
    },
    {
      "id": "original-sleep-history-001.q02",
      "label": "Frequency and time to fall asleep",
      "addressed": true
    },
    {
      "id": "original-sleep-history-001.q03",
      "label": "Weekday and weekend schedules",
      "addressed": true
    },
    {
      "id": "original-sleep-history-001.q04",
      "label": "Nighttime waking and early waking",
      "addressed": true
    },
    {
      "id": "original-sleep-history-001.q05",
      "label": "Daytime impact and drowsiness-related experiences",
      "addressed": true
    },
    {
      "id": "original-sleep-history-001.q06",
      "label": "Activities before sleep",
      "addressed": true
    },
    {
      "id": "original-sleep-history-001.q07",
      "label": "Coffee amount and timing",
      "addressed": true
    },
    {
      "id": "original-sleep-history-001.q08",
      "label": "Life changes and worries",
      "addressed": true
    },
    {
      "id": "original-sleep-history-001.q09",
      "label": "Enjoyment of usual activities",
      "addressed": false
    },
    {
      "id": "original-sleep-history-001.q10",
      "label": "Use of sleep aids",
      "addressed": true
    },
    {
      "id": "original-sleep-history-001.q11",
      "label": "Limits of sleep observation",
      "addressed": true
    },
    {
      "id": "original-sleep-history-001.q12",
      "label": "Patient expectations",
      "addressed": false
    }
  ]
};
