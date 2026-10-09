// Shared project facts for the interactive introduction and checked static fallback.
export const identity = Object.freeze({
  name: 'CPX Practice Lab',
  creator: 'CHOI JUNHO',
  creatorContext: 'Independent creator in South Korea',
  started: 'Project started February 2026',
  introduction: '한국에서 CHOI JUNHO가 독립적으로 만드는 한국어 임상면담 연습 프로젝트입니다. 2026년 2월 시작한 프로젝트로, 증례 작성·문진 연습·인용 근거 복습을 하나의 흐름으로 연결합니다.',
  description: 'CPX Practice Lab은 자체 작성한 가상 증례로 한국어 문진을 연습하고, 대화 인용 근거를 복습하며, 목표를 정해 다시 연습하는 교육용 작업 공간입니다.',
  scope: '창작 3증례 · 54개 사실 · 36개 질문 의도 · 108개 표현',
  workflow: '증례 작성 → 문진 연습 → 대화 인용 근거 복습 → 목표 기반 재연습. 연습에 사용한 증례 버전을 유지하고, 증례·초안·대화·목표를 JSON으로 저장하거나 가져올 수 있습니다.',
  planIntro: '다음 개발 단계는 Claude를 연결해 한국어 자연어 질문과 증례에 근거한 대화·복습을 잇는 것입니다.',
  plans: [
    ['한국어 질문에서 환자 답변으로', '한국어 자연어 질문의 의도를 파악하고, 선택한 증례에 작성된 사실의 범위 안에서 환자 답변을 생성할 계획입니다.'],
    ['실제 대화 인용에서 피드백으로', '환자 역할과 피드백 역할을 분리하고, 연습 중 실제로 오간 대화의 정확한 인용을 근거로 질문을 돌아보는 피드백을 제공할 계획입니다.'],
    ['같은 증례에서 다시 연습으로', 'Claude 연동 후에도 연습에 사용한 증례 버전을 고정하고, 아직 묻지 않은 정보·환자가 모르는 정보·증례에 설정되지 않은 정보를 구분해 다음 연습 목표로 연결할 계획입니다.']
  ],
  english: 'CPX Practice Lab is an independently developed Korean clinical-interview training workbench. It connects authored fictional cases, practice conversations, exact dialogue evidence and goal-based retries. Created by CHOI JUNHO; project started in February 2026. Claude integration is the next development step.',
  storage: '현재 연습 기록은 이 브라우저의 이 기기에 저장되며 외부 서버로 전송되지 않습니다. 자동 동기화는 사용하지 않습니다. 증례, 초안, 대화와 연습 목표는 JSON으로 내보내 보관할 수 있습니다.'
});
