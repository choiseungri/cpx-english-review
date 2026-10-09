export const demoData = {
  "caseId": "original-sleep-history-001",
  "caseVersion": "1.1.0",
  "scripted": true,
  "liveAPI": false,
  "lang": "ko",
  "labels": {
    "title": "질문은 달라도,\n환자의 사실은 그대로.",
    "subtitle": "면담에서 채점과 피드백까지, 한 번의 연습",
    "notice": "API 연결 후 흐름 · 작성된 시나리오",
    "caseLabel": "가상 증례 · 29세 직장인 · 잠들기 어려움",
    "portraitAlt": "녹색 카디건을 입은 젊은 가상 환자의 수채화 초상",
    "student": "학생",
    "patient": "SP",
    "facts": "대화에서 확인한 사실",
    "noFacts": "아직 새로운 사실을 확인하지 않았습니다.",
    "turn": "대화",
    "score": "채점",
    "feedback": "피드백",
    "goals": "다음 연습",
    "transcript": "전체 대화와 피드백 읽기",
    "scoreLabel": "질문 영역 확인",
    "scoreNote": "이 예시에서 정한 학습 항목입니다. 공식 시험 점수나 실제 AI 채점 결과가 아닙니다.",
    "addressed": "확인",
    "notAsked": "미질문",
    "source": "대화 근거 보기",
    "unknown": "관찰 정보 없음",
    "negative": "환자가 명시적으로 부정",
    "known": "환자가 알고 있는 사실",
    "change": "잘못된 전제를 받아들이지 않고, 기존 사실로 답합니다.",
    "unknownNote": "모르겠다는 답은 증상이 없다는 뜻이 아닙니다.",
    "coverageNote": "커피 질문은 유도적이지만 양과 시간을 확인했습니다. 수면 관찰은 “모르겠다”는 답이어도 질문 영역을 확인한 것입니다.",
    "missedNote": "즐거움·흥미 유지 여부와 환자가 기대하는 도움은 묻지 않았습니다. 해당 답변을 추정하지 않습니다.",
    "goalItems": [
      "전제 없이 양·시간 질문하기",
      "끝내기 전에 환자가 기대하는 도움 확인하기"
    ],
    "goalIntro": "같은 증례와 버전으로 다시 연습합니다.",
    "goodTitle": "잘한 점",
    "goodQuote": "아침과 오후에 한 잔씩이군요.",
    "goodText": "실제 답변을 반영해 앞선 전제를 수정했습니다.",
    "feedbackItems": [
      {
        "turn": 8,
        "title": "양과 원인을 먼저 단정했어요.",
        "quote": "커피를 하루 다섯 잔씩 마셔서 잠이 안 오는 거죠?",
        "text": "양과 원인을 동시에 단정한 질문입니다.",
        "alternative": "커피는 하루에 몇 잔, 주로 언제 드세요?"
      },
      {
        "turn": 11,
        "title": "부정하는 답을 유도했어요.",
        "quote": "주무실 때 숨이 멎는 일은 없으시죠?",
        "text": "관찰 정보가 없는 것과 증상이 없는 것을 구분해야 합니다.",
        "alternative": "주무실 때 코골이나 숨 멎는 모습을 누가 말씀해준 적 있나요?"
      }
    ],
    "better": "더 나은 질문",
    "accuracy": "기록 정확성",
    "accuracyText": "“혼자 자서 코를 고는지, 숨이 멎는지는 모르겠어요.” → 관찰 정보 없음. 증상 없음으로 바꾸지 않습니다."
  },
  "turns": [
    {
      "number": 1,
      "student": "안녕하세요. 학생의사 최준호입니다. 오늘 어떤 점이 불편해서 오셨나요?",
      "patient": "요즘 누워도 잠들기가 어려워서 왔어요.",
      "questionId": null,
      "facts": []
    },
    {
      "number": 2,
      "student": "언제부터 그랬고, 이후로 더 심해지거나 나아졌나요?",
      "patient": "3주 전부터요. 그때부터 지금까지 대체로 비슷해요.",
      "questionId": "original-sleep-history-001.q01",
      "facts": [
        {
          "id": "original-sleep-history-001.f01",
          "topic": "시작",
          "text": "3주 전부터 잠들기 어려워졌다.",
          "status": "known"
        },
        {
          "id": "original-sleep-history-001.f02",
          "topic": "경과",
          "text": "시작 후 불편한 정도는 대체로 비슷하다.",
          "status": "known"
        }
      ]
    },
    {
      "number": 3,
      "student": "일주일에 며칠 정도이고, 잠드는 데 얼마나 걸리나요?",
      "patient": "일주일에 나흘 정도요. 그런 날은 누워서 한 시간쯤 걸리는 것 같아요.",
      "questionId": "original-sleep-history-001.q02",
      "facts": [
        {
          "id": "original-sleep-history-001.f03",
          "topic": "빈도",
          "text": "최근에는 일주일에 약 4일 잠들기 어렵다.",
          "status": "known"
        },
        {
          "id": "original-sleep-history-001.f04",
          "topic": "잠드는 시간",
          "text": "불편한 날은 누운 뒤 잠들기까지 약 1시간 걸린다고 추정한다.",
          "status": "known"
        }
      ]
    },
    {
      "number": 4,
      "student": "평일과 주말에는 몇 시에 눕고 일어나세요?",
      "patient": "평일엔 밤 12시에 누워 아침 7시에 일어나요. 주말엔 새벽 1시에 누워 9시에 일어나고요.",
      "questionId": "original-sleep-history-001.q03",
      "facts": [
        {
          "id": "original-sleep-history-001.f05",
          "topic": "평일 시간표",
          "text": "평일에는 00:00에 눕고 07:00에 일어난다.",
          "status": "known"
        },
        {
          "id": "original-sleep-history-001.f06",
          "topic": "주말 시간표",
          "text": "주말에는 01:00에 눕고 09:00에 일어난다.",
          "status": "known"
        }
      ]
    },
    {
      "number": 5,
      "student": "자다가 깨거나, 너무 일찍 깨서 다시 못 주무시기도 하나요?",
      "patient": "가끔 화장실 때문에 한 번 깨지만 금방 다시 자요. 요즘 일찍 깨서 다시 못 잔 적은 없어요.",
      "questionId": "original-sleep-history-001.q04",
      "facts": [
        {
          "id": "original-sleep-history-001.f07",
          "topic": "밤중 각성",
          "text": "가끔 화장실 때문에 한 번 깨지만 곧 다시 잠든다.",
          "status": "known"
        },
        {
          "id": "original-sleep-history-001.f08",
          "topic": "이른 각성",
          "text": "이번 3주 동안 이른 새벽에 깨서 다시 못 잔 적은 없다.",
          "status": "explicit_negative"
        }
      ]
    },
    {
      "number": 6,
      "student": "낮 생활에는 어떤 영향이 있나요? 졸려서 다치거나 위험했던 적은요?",
      "patient": "오후에 서류 작업에 집중하기가 어려워요. 요즘 졸려서 다치거나 아찔했던 적은 없어요.",
      "questionId": "original-sleep-history-001.q05",
      "facts": [
        {
          "id": "original-sleep-history-001.f09",
          "topic": "생활 영향",
          "text": "오후에 문서 작업에 집중하기 어렵다.",
          "status": "known"
        },
        {
          "id": "original-sleep-history-001.f10",
          "topic": "졸음 사고",
          "text": "이번 3주 동안 졸음으로 다치거나 아찔했던 경험은 없다.",
          "status": "explicit_negative"
        }
      ]
    },
    {
      "number": 7,
      "student": "침대에 누운 뒤에는 주로 뭘 하세요?",
      "patient": "휴대전화로 업무 메시지나 영상을 30분 정도 봐요.",
      "questionId": "original-sleep-history-001.q06",
      "facts": [
        {
          "id": "original-sleep-history-001.f11",
          "topic": "취침 전 활동",
          "text": "침대에서 업무 메시지나 영상을 약 30분 본다.",
          "status": "known"
        }
      ]
    },
    {
      "number": 8,
      "student": "커피를 하루 다섯 잔씩 마셔서 잠이 안 오는 거죠?",
      "patient": "다섯 잔은 아니고요. 아침에 한 잔, 오후 4시쯤 한 잔 마셔요.",
      "questionId": "original-sleep-history-001.q07",
      "facts": [
        {
          "id": "original-sleep-history-001.f12",
          "topic": "커피",
          "text": "매일 아침과 16:00 무렵에 커피 한 잔씩 마신다.",
          "status": "known"
        }
      ]
    },
    {
      "number": 9,
      "student": "제가 양을 먼저 단정했네요. 아침과 오후에 한 잔씩이군요. 최근 생활에 달라진 점이나, 누울 때 드는 걱정이 있나요?",
      "patient": "잠들기 어려워질 무렵 새 업무를 맡았어요. 누우면 내일 빠뜨릴 일이 없을까 생각해요.",
      "questionId": "original-sleep-history-001.q08",
      "facts": [
        {
          "id": "original-sleep-history-001.f13",
          "topic": "생활 변화",
          "text": "잠들기 어려워지기 시작한 무렵 새 업무를 맡았다.",
          "status": "known"
        },
        {
          "id": "original-sleep-history-001.f14",
          "topic": "걱정",
          "text": "누우면 다음 날 놓칠 업무가 없는지 생각한다.",
          "status": "known"
        }
      ]
    },
    {
      "number": 10,
      "student": "잠을 자려고 약이나 보조제를 써보셨나요?",
      "patient": "잠 때문에 약이나 보조제를 써본 적은 없어요.",
      "questionId": "original-sleep-history-001.q10",
      "facts": [
        {
          "id": "original-sleep-history-001.f16",
          "topic": "수면 보조제",
          "text": "잠 때문에 약이나 수면 보조제를 사용한 적은 없다.",
          "status": "explicit_negative"
        }
      ]
    },
    {
      "number": 11,
      "student": "주무실 때 숨이 멎는 일은 없으시죠?",
      "patient": "혼자 자서 코를 고는지, 숨이 멎는지는 모르겠어요.",
      "questionId": "original-sleep-history-001.q11",
      "facts": [
        {
          "id": "original-sleep-history-001.f17",
          "topic": "수면 관찰",
          "text": "평소 혼자 자며 자신의 코골이나 수면 중 호흡 정지 여부를 모른다.",
          "status": "patient_unknown"
        }
      ]
    },
    {
      "number": 12,
      "student": "관찰해줄 분이 없어 모르시는 거군요. 오늘은 3주 전부터 주 4일 정도 잠들기 어렵고, 오후 집중에도 영향이 있다는 말씀을 들었습니다. 오늘 면담을 여기서 마치겠습니다.",
      "patient": "네, 감사합니다.",
      "questionId": null,
      "facts": []
    }
  ],
  "domains": [
    {
      "id": "original-sleep-history-001.q01",
      "label": "시작과 경과",
      "addressed": true
    },
    {
      "id": "original-sleep-history-001.q02",
      "label": "빈도와 잠드는 시간",
      "addressed": true
    },
    {
      "id": "original-sleep-history-001.q03",
      "label": "평일과 주말 시간표",
      "addressed": true
    },
    {
      "id": "original-sleep-history-001.q04",
      "label": "밤중 각성과 이른 기상",
      "addressed": true
    },
    {
      "id": "original-sleep-history-001.q05",
      "label": "일상 영향과 졸음 경험",
      "addressed": true
    },
    {
      "id": "original-sleep-history-001.q06",
      "label": "취침 전 활동",
      "addressed": true
    },
    {
      "id": "original-sleep-history-001.q07",
      "label": "커피의 양과 시간",
      "addressed": true
    },
    {
      "id": "original-sleep-history-001.q08",
      "label": "생활 변화와 걱정",
      "addressed": true
    },
    {
      "id": "original-sleep-history-001.q09",
      "label": "평소 활동의 즐거움",
      "addressed": false
    },
    {
      "id": "original-sleep-history-001.q10",
      "label": "수면 보조제 사용",
      "addressed": true
    },
    {
      "id": "original-sleep-history-001.q11",
      "label": "수면 관찰의 한계",
      "addressed": true
    },
    {
      "id": "original-sleep-history-001.q12",
      "label": "환자의 기대",
      "addressed": false
    }
  ]
};
