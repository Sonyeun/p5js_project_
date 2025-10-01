// 손가락 인식 및 그리기 관련 함수들을 모듈로 분리

// 각 손가락 관절의 인덱스를 쉽게 사용하기 위해 상수로 정의
const fingerJoints = {
  thumb: [4, 3],    // 엄지: 끝, 중간 관절
  index: [8, 6],    // 검지: 끝, 중간 관절
  middle: [12, 10], // 중지: 끝, 중간 관절
  ring: [16, 14],   // 약지: 끝, 중간 관절
  pinky: [20, 18],  // 새끼: 끝, 중간 관절
};

// 손가락 인식 및 그리기 함수
function checkFingers(predictions, video) {
  if (predictions.length > 0) {
    const landmarks = predictions[0].landmarks;
    let fingersUp = [0, 0, 0, 0, 0];

    // 1. 각 손가락이 펴졌는지 확인
    if (landmarks[fingerJoints.index[0]][1] < landmarks[fingerJoints.index[1]][1]) fingersUp[1] = 1;
    if (landmarks[fingerJoints.middle[0]][1] < landmarks[fingerJoints.middle[1]][1]) fingersUp[2] = 1;
    if (landmarks[fingerJoints.ring[0]][1] < landmarks[fingerJoints.ring[1]][1]) fingersUp[3] = 1;
    if (landmarks[fingerJoints.pinky[0]][1] < landmarks[fingerJoints.pinky[1]][1]) fingersUp[4] = 1;
    if (landmarks[fingerJoints.thumb[0]][0] > landmarks[fingerJoints.thumb[1]][0]) fingersUp[0] = 1;

    const totalFingers = fingersUp.reduce((total, finger) => total + finger, 0);
    
    // 2. A, B, C 방식에 따라 끝점에 빨간 점 그리기
    if (totalFingers === 1 || totalFingers === 2 || totalFingers === 5) {
      drawRedPoints(fingersUp, landmarks, video);
    }
  }
}

// 펴진 손가락 끝점에 좌표를 변환하여 빨간 점을 그리는 함수
function drawRedPoints(fingers, landmarks, video) {
  // 포인터를 더 선명하게 보이도록 설정
  fill(255, 0, 0);
  stroke(255, 255, 255);
  strokeWeight(2);

  // 변환 비율 계산
  // 캔버스 너비 / 영상 원본 너비
  const scaleX = width / video.width;
  // 캔버스 높이 / 영상 원본 높이
  const scaleY = height / video.height;
  
  // 각 손가락의 원본 좌표에 비율을 곱해 캔버스 위의 실제 위치를 계산
  // 거울 모드 적용: x 좌표를 좌우 반전
  if (fingers[0] === 1) {
    const x = width - (landmarks[fingerJoints.thumb[0]][0] * scaleX);
    const y = landmarks[fingerJoints.thumb[0]][1] * scaleY;
    ellipse(x, y, 20, 20);
  }
  if (fingers[1] === 1) {
    const x = width - (landmarks[fingerJoints.index[0]][0] * scaleX);
    const y = landmarks[fingerJoints.index[0]][1] * scaleY;
    ellipse(x, y, 20, 20);
  }
  if (fingers[2] === 1) {
    const x = width - (landmarks[fingerJoints.middle[0]][0] * scaleX);
    const y = landmarks[fingerJoints.middle[0]][1] * scaleY;
    ellipse(x, y, 20, 20);
  }
  if (fingers[3] === 1) {
    const x = width - (landmarks[fingerJoints.ring[0]][0] * scaleX);
    const y = landmarks[fingerJoints.ring[0]][1] * scaleY;
    ellipse(x, y, 20, 20);
  }
  if (fingers[4] === 1) {
    const x = width - (landmarks[fingerJoints.pinky[0]][0] * scaleX);
    const y = landmarks[fingerJoints.pinky[0]][1] * scaleY;
    ellipse(x, y, 20, 20);
  }
}

// 모듈 내보내기 (ES6 모듈 방식)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { checkFingers, drawRedPoints, fingerJoints };
} 