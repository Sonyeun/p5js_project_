let numlines = 750
let ranAng = Math.PI
let minl = 600
let maxl = 1500


// 애니메이션 설정용 시간
let t3 = 0;
let t1 = 0
let t2 = 20

let totalT = 1000;

//
let center_x = 0
let center_y = 0
let vectors = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255)
  minl = 0
  maxl = width / 2
  for (let i = 0; i < numlines; i++) {
    let vector =p5.Vector.fromAngle(random(-ranAng, ranAng), random(minl, maxl))
    col = map(i, 0, numlines, 255, 50)
    wei = map(i, 0, numlines, 500, 1);
    vectors.push({ x: vector.x, y: vector.y, wei: wei, col: col, t1:t1, t2:t2  })
  }

}

function draw() {
  t3++

  // 애니메이션용 설정


  push()
  translate(width / 2, height / 2)
  background(255,50)

  for (let i = 0; i < numlines; i++) {

    k = random(8,10)
    vectors[i].t1 +=  k
    let t1 = vectors[i].t1

    vectors[i].t2 += random(k,11)
    let t2 = vectors[i].t2

    if (t2>totalT){
      t2 = totalT
    }
    let tt1 = norm(t1, 0, totalT);
    let tt2 = norm(t2, 0, totalT);

    vectors[i].col -= 1
    stroke(vectors[i].col)
    strokeWeight(map(t1, 0, t2, vectors[i].wei, 1));
    let start_x = vectors[i].x
    let start_y = vectors[i].y

    // 이전 루프의 end_x, end_y를 현재 루프의 start_x, start_y로 사용
    //let noiseValX = noise(i * 0.1, t1 * 0.01); // 더 많은 무작위성을 위한 noise
    //let noiseValY = noise(i * 0.1, t1 * 0.01);

    start_x = lerp(start_x, center_x, easeInOutExpo(tt1));
    start_y = lerp(start_y, center_y, easeInOutExpo(tt1));

    let end_x = lerp(start_x, center_x, easeInOutExpo(tt2));
    let end_y = lerp(start_y, center_y, easeInOutExpo(tt2));
    line(start_x, start_y, end_x, end_y);
  }


  pop()

  if (t3 > totalT) {
    noLoop()
    console.log('bye')
  }

}

// easeInOutExpo: 처음과 끝에서 속도가 느리고 중간에서 빠르게 변하는 값을 반환하는 함수
// ? 이면 뒤에 것 반환, 아닌 경우 :로 go
// Math.pow(base, exponent) base는 밑수(base)이고, exponent는 지수(exponent)
function easeInOutExpo(x) {
  return x === 0 ? 0
    : x === 1 ? 1
      : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
        : (2 - Math.pow(2, -20 * x + 10)) / 2;
}