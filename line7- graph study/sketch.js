/******************
Code by Vamoss
Original code link:
https://www.openprocessing.org/sketch/751983

Author links:
http://vamoss.com.br
http://twitter.com/vamoss
http://github.com/vamoss
******************/

//Inspired by Felix Auer
//http://www.felixauer.com/javascript/difeqrk.html

// 파티클들을 저장하는 배열,  파티클 색상을 저장하는 배열
let blobs = [];


//  파티클 움직임의 변화를 제어하는 변수, 그래픽 요소의 크기와 중심을 계산하는 변수들
let xScale, yScale, centerX, centerY;

function setup(){
  createCanvas(windowWidth, windowHeight)

  centerX = width/2
  centerY = height/2

  xScale = width / 30;
  yScale = width / 30;

  for(let x = 0; x < width; x+= random(40,50)){
    for(let y = 0; y < height; y+=random(40,50)){
      var blob = {
        // 캔버스 상에 표시될 위치(하지만 어느 캔버스에서도 동일한 효과일 수 있게 스케일링)
        x: getXPos(x),
        y: getYPos(y),

        size: random(1, 5),
        lastX: x,
        lastY: y,
        color: random(0,255),

        // 파티클의 움직임 방향 설정
        // 0.5 이상인 경우 1, 아닌 경우 -1
        direction: -0.1
      };
      blobs.push(blob);
    }
  }
  console.log(sin(90))
}

function draw(){
  
  var stepsize = deltaTime * 0.005;
  for(let i = 0; i < blobs.length; i++){
    blob = blobs[i]
    var x = sin(blob.x)
    var y = cos(blob.y)

    blob.x += x*blob.direction*0.2
    blob.y += y*blob.direction*0.2

    stroke(blob.color)
    strokeWeight(blob.size)
    x = getXPrint(blob.x)
    y = getYPrint(blob.y)
    line(x, y, blob.lastX, blob.lastY)

    blob.lastX = x
    blob.lastY = y
  }
  background(255,10)
}

// getXPos(x) 함수는 x 좌표를 받아들이고, 이를 캔버스의 중심을 기준으로 스케일링한 값을 반환
// 캔버스의 중심을 (0, 0)으로 생각하고, x와 y 좌표를 이 중심으로부터 얼마나 떨어져 있는지를 계산합니다.
function getXPos(x) {
  return (x - centerX) / xScale;
}
function getYPos(y) {
  return (y - centerY) / yScale;
}


// 이 함수들은 변환된 좌표를 다시 실제 화면의 좌표로 되돌려줍니다.
// 함수는 x 좌표를 받아들이고, 이를 실제 화면에서의 좌표값으로 변환
function getXPrint(x) {
  return xScale * x + centerX;
}
function getYPrint(y) {
  return yScale * y + centerY;
}






