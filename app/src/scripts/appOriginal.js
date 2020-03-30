import '../styles/style.scss'

let canvas = document.querySelector("canvas")
let canvasContext2d = canvas.getContext("2d") 
let canvasWidth = canvas.width = window.innerWidth
let canvasHeight = canvas.height = window.innerHeight
let form = document.querySelector('form')
let text = form.querySelector(".text")
let textMessage = text.value 
  
    
let mouse = {x: undefined, y: undefined}

function Particle(x, y, r, accX, accY){
  this.x = randomIntFromRange(r, canvasWidth-r)
  this.y = randomIntFromRange(r, canvasHeight-r)
  this.r = r
  this.color = "black"
  this.velocity = {x: randomIntFromRange(-10, 10), y: randomIntFromRange(-10, 10)}
  this.dest = {x : x, y : y}
  this.accX = 5;
  this.accY = 5;
  this.accX = accX;
  this.accY = accY;
  this.friction = randomNumDecimal(0.94, 0.98)
  

  this.draw = function(){    
    // particles
    canvasContext2d.beginPath()
    canvasContext2d.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    // canvasContext2d.arc(this.dest.x, this.dest.y, this.r, 0, Math.PI * 2)
    canvasContext2d.fillStyle = "rgb(250, 250, 247)"
    canvasContext2d.fill()
    canvasContext2d.closePath() 

    // mouse ball
    canvasContext2d.beginPath()
    canvasContext2d.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2)
    canvasContext2d.fill()
    canvasContext2d.closePath()
  }

  this.update = function(){
    this.draw()

    if(this.x + this.r > canvasWidth || this.x - this.r < 0){
      this.velocity.x = -this.velocity.x
    }

    if(this.y + this.r > canvasHeight || this.y - this.r < 0){
      this.velocity.y = -this.velocity.y
    }
 
    this.accX = (this.dest.x - this.x) / 300;
    this.accY = (this.dest.y - this.y) / 300;

    this.velocity.x += this.accX;
    this.velocity.y += this.accY;

    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if(dist(this.x, this.y, mouse.x, mouse.y) < 70){
      this.accX = (this.x - mouse.x) / 30;
      this.accY = (this.y - mouse.y) / 30;
      this.velocity.x += this.accX;
      this.velocity.y += this.accY;
    }
  }
}

let particles;
function init(){
  particles = []

  canvasContext2d.font = `bold ${canvasWidth/10}px sans-serif`;
  canvasContext2d.textAlign = "center"
  canvasContext2d.fillText(textMessage, canvasWidth/2, canvasHeight/2)

  let imgData = canvasContext2d.getImageData(0, 0, canvasWidth, canvasHeight)
  let data = imgData.data

  for(let i = 0; i < canvasWidth; i += 4){
    for(let j = 0; j < canvasHeight; j += 4){
      if(data[((canvasWidth * j + i) * 4) + 3]){
        let x = i + randomNumDecimal(0, 3)
        let y = j + randomNumDecimal(0, 3)
        let r = randomNumDecimal(1, 1.5)
        let accX = randomNumDecimal(-3, 0.2)
        let accY = randomNumDecimal(-3, 0.2)

        particles.push(new Particle(x, y, r, accX, accY))
      } 
    }
  }
} 


function animate(){
  canvasContext2d.clearRect(0, 0, canvasWidth, canvasHeight)

  for(let i = 0; i < particles.length; i++){
    particles[i].update()
  } 

  requestAnimationFrame(animate)
}

init()
animate()




form.addEventListener('submit', function(e){
  e.preventDefault()
  textMessage = text.value
  canvasContext2d.clearRect(0, 0, canvasWidth, canvasHeight)

  init(textMessage)
  animate()
})


window.addEventListener('resize', function() {
  canvasWidth = canvas.width = window.innerWidth
  canvasHeight = canvas.height = window.innerHeight
    
  init() 
}) 

window.addEventListener('mousemove', function(e){
  mouse.x = e.clientX
  mouse.y = e.clientY
})

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
} 

function randomNumDecimal(min, max) {
  return Math.random() * (max - min) + min
}

function dist(x1, y1, x2, y2){ 
  let xDist = x1 - x2
  let yDist = y1 - y2

  return Math.sqrt(Math.pow(xDist, 2)+ Math.pow(yDist, 2))
}