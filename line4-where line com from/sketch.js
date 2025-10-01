let numlines = 3000
let dotlines = []

let center
let leftPoint

let minl
let maxl

let t = 0;
let totalT = 60;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255); // 캔버스를 흰색으로 지우기

  // line 길이, 위치 설정
//minl = windowWidth * 2 / 3
//maxl = windowWidth * 2.5

  minl = windowWidth * 1 / 3
  maxl = windowWidth * 2
  center = createVector(windowWidth / 2, windowHeight / 2);
  leftPoint = createVector(center.x - windowWidth, center.y);

  for (let i = 0; i < numlines; i++) {
    let angle = map(i, 0, numlines, 0, TWO_PI); // 0부터 2π까지 각도 생성

    dotlines.push(new DotLine(leftPoint, angle, 0))
  }
  let random_list = getRandomNumbers(500)
  for (let i = 0; i < random_list.length; i++) {
    dotlines[random_list[i]].status = 1
  }
  console.log('bye')
}

//let k = 0
let countStatusOne = 0;

function draw() {
  background(255,150)
  for (let i = 0; i < dotlines.length; i++) {

    if (dotlines[i].status === 1) {
      dotlines[i].show_forward()
      dotlines[i].update_forward()
    } else if (dotlines[i].status === 3) {
      dotlines[i].show_backward()
      dotlines[i].update_backward()
    }
    if (dotlines[i].status === 1) {
      countStatusOne++;
    }

  }
  

  console.log("Status 1의 개수:", countStatusOne);
  countStatusOne = 0

  //k++
  //console.log(k)

}

class DotLine {
  constructor(origin, tarang, status) {
    this.wei = random(1, 20)
    this.col = random(1, 255)
    this.origin = origin
    this.tarang = tarang
    this.status = status
    this.vector0 = p5.Vector.fromAngle(this.tarang, random(minl, maxl))
    this.vector1 = p5.Vector.fromAngle(this.tarang, random(minl, maxl))
    this.vector0.add(this.origin);
    this.vector1.add(this.origin);
    this.tt = 0
    this.t = t

    this.regress = 0

    this.random_t = Math.round(random(totalT))
  }

  update_forward() {
    this.t++

    if (this.t === this.random_t) {
      for (let i = 0; i < random(5); i++) {
        let temp = Math.round(random(numlines-1))
        if (dotlines[temp].t === 0) {
          dotlines[temp].status = 1
          console.log('new')
        }
      }
    }
    if (this.t > totalT) {
      this.status = 3
    }
  }

  show_forward() {
    stroke(this.col)
    strokeWeight(this.wei)
    this.tt = norm(this.t, 0, totalT)
    this.x = lerp(this.vector0.x, this.vector1.x, easeInOutExpo(this.tt))
    this.y = lerp(this.vector0.y, this.vector1.y, easeInOutExpo(this.tt))
    line(this.vector0.x, this.vector0.y, this.x, this.y)
  }

  update_backward() {
    this.t -= 1
    if (this.t === this.random_t) {
      for (let i = 0; i < random(5); i++) {
        let temp = Math.round(random(numlines-1))
        if (dotlines[temp].t === 0) {
          dotlines[temp].status = 1
          console.log('new')
        }
      }
    }
    //console.log('backwarding')
    //console.log(this.t)

    if (this.t === 0) {
      this.status = 0
      this.t = 0
      this.vector0 = p5.Vector.fromAngle(this.tarang, random(minl, maxl))
      this.vector1 = p5.Vector.fromAngle(this.tarang, random(minl, maxl))
      this.vector0.add(this.origin);
      this.vector1.add(this.origin);
      
      this.wei = random(1,(this.regress%4)*150+5)
      this.regress += 1
      this.col = random(1, 255)
    }
  }

  show_backward() {

    stroke(this.col)
    strokeWeight(this.wei)
    this.tt = norm(this.t, 0, totalT)
    this.x = lerp(this.vector1.x, this.vector0.x, easeInOutExpo(this.tt))
    this.y = lerp(this.vector1.y, this.vector0.y, easeInOutExpo(this.tt))
    line(this.vector1.x, this.vector1.y, this.x, this.y)

  }





}

function getRandomNumbers(count) {
  return Array.from({ length: numlines }, (_, index) => index).sort(() => Math.random() - 0.5).slice(0, count);
}

function easeInOutExpo(x) {
  return x === 0 ? 0
    : x === 1 ? 1
      : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
        : (2 - Math.pow(2, -20 * x + 10)) / 2;
}