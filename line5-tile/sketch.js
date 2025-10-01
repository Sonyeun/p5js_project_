// 애니메이션용 설정
let t = 0;
let totalT = 30;

// 좌표 설정
let x_interval = 10
let y_interval = 10
let coordinates = []
let vectorlines = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  create_coordinate(x_interval, y_interval)
  for (let i = 0; i < coordinates.length; i++) {
    vectorlines.push(new VectorLine(coordinates[i].x, coordinates[i].y, 0))
  }

  let random_list = getRandomNumbers(300)
  for (let i = 0; i < random_list.length; i++) {
    vectorlines[random_list[i]].status = 1
  }

}

let regress = 1
function draw() {
  for (let i = 0; i < vectorlines.length; i++) {
    if (vectorlines[i].status === 1) {
      vectorlines[i].show()
      vectorlines[i].update()
    }
  }

  if (t > totalT) {
    let random_list = getRandomNumbers(300)
    for (let i = 0; i < random_list.length; i++) {
      vectorlines[random_list[i]].status = 1
      vectorlines[random_list[i]].col = (regress%2 === 1) ? 255: 0
    }

    regress += 1
    t = 0

  }
  t++
  

}

function create_coordinate(x_interval, y_interval) {
  //상단, 하단
  for (let x = 0; x < width; x += x_interval) {
    coordinates.push({ x: x, y: 0 }, { x: x, y: height })
  }

  //좌측
  for (let y = 0; y < height; y += y_interval) {
    coordinates.push({ x: 0, y: y }, { x: width, y: y })
  }
  //우측
}

class VectorLine {
  constructor(x, y, status) {
    this.x = x
    this.y = y
    this.t = t
    this.random_end = coordinates[Math.round(random(coordinates.length - 1))]
    this.startV = createVector(this.x, this.y)
    this.endV = createVector(this.random_end.x, this.random_end.y)

    this.status = status
    this.col = 255
    this.wei = random(30, 55)
  }

  update() {
    this.t++
    if (this.t > totalT) {
      this.status = 0
      this.t = 0
    }

  }

  show() {
    stroke(this.col)
    strokeWeight(this.wei)
    this.tt = norm(this.t, 0, totalT)
    this.x = lerp(this.startV.x, this.endV.x, easeInOutExpo(this.tt))
    this.y = lerp(this.startV.y, this.endV.y, easeInOutExpo(this.tt))
    line(this.startV.x, this.startV.y, this.x, this.y)
  }

}
function getRandomNumbers(count) {
  return Array.from({ length: coordinates.length }, (_, index) => index).sort(() => Math.random() - 0.5).slice(0, count);
}

function easeInOutExpo(x) {
  return x === 0 ? 0
    : x === 1 ? 1
      : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
        : (2 - Math.pow(2, -20 * x + 10)) / 2;
}