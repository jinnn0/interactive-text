import '../styles/style.scss'

function particleText(){

	let canvas = document.querySelector("canvas")
  let canvasContext2d = canvas.getContext("2d") 

  let windowWidth = canvas.width = window.innerWidth
  let windowHeight = canvas.height = window.innerHeight
  let form = document.querySelector('form')
  let text = form.querySelector(".text")
  let textMessage = text.value 
 
    
  let mouse = {x: undefined, y: undefined}

  function Particle(x, y, r, accX, accY){
    this.x = randomIntFromRange(r, windowWidth-r)
    this.y = randomIntFromRange(r, windowHeight-r)
    this.r = r
    this.color = "black"
    this.velocity = {x: randomIntFromRange(-10, 10), y: randomIntFromRange(-10, 10)}
    this.dest = {x : x, y : y}
    // this.accX = 0;
    // this.accY = 0;
    this.accX = accX;
    this.accY = accY;
    // this.friction = Math.random() * 0.05 + 0.94;
    this.friction = randomNumDecimal(0.94, 0.98)
    

    this.draw = function(){
      
      canvasContext2d.beginPath()
      canvasContext2d.arc(this.x, this.y, this.r, 0, Math.PI * 2)
      // c.arc(this.dest.x, this.dest.y, this.r, 0, Math.PI * 2)
      canvasContext2d.fillStyle = this.color
      canvasContext2d.fill()
      canvasContext2d.closePath()

      canvasContext2d.beginPath()
      canvasContext2d.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2)
      canvasContext2d.fill()
      canvasContext2d.closePath()
    }

    this.update = function(){
      this.draw()

      if(this.x + this.r > windowWidth || this.x - this.r < 0){
        this.velocity.x = -this.velocity.x
      }

      if(this.y + this.r > windowHeight || this.y - this.r < 0){
        this.velocity.y = -this.velocity.y
      }
 
      // need a explanation for this line below 
      // why the distances are divide by 500 ??
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
        // this.accX = 0
        // this.accY = 0
        this.velocity.x += this.accX;
        this.velocity.y += this.accY;
      }
    }
}

  let particles;
  function init(){
    particles = []
  
    canvasContext2d.font = `bold ${windowWidth/10}px sans-serif`;
    canvasContext2d.fillStyle = "black"
    canvasContext2d.textAlign = "center"
    canvasContext2d.fillText(textMessage, windowWidth/2, windowHeight/2)

    let imgData = canvasContext2d.getImageData(0, 0, windowWidth, windowHeight)
    let data = imgData.data


    for(let i = 0; i < windowWidth; i += 5){
      for(let j = 0; j < windowHeight; j += 5){
        if(data[((windowWidth * j + i) * 4) + 3]){
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
    canvasContext2d.clearRect(0, 0, windowWidth, windowHeight)

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

    canvasContext2d.clearRect(0, 0, windowWidth, windowHeight)
    init(textMessage)
    animate()
  })

  // console.log(particles[0].accX);
  // console.log(particles[24].accX);
  // console.log(particles[78].accX);



  window.addEventListener('resize', function() {
    windowWidth = canvas.width = window.innerWidth
    windowHeight = canvas.height = window.innerHeight
     
    init()
  }) 

  window.addEventListener('mousemove', function(e){
    mouse.x = e.clientX
    mouse.y = e.clientY
  })

  function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  } 


  function randomNum(min, max) {
    return Math.random() * (max - min + max) + min
  }

  function randomNumDecimal(min, max) {
    return Math.random() * (max - min) + min
  }

  function dist(x1, y1, x2, y2){ 
    let xDist = x1 - x2
    let yDist = y1 - y2

    return Math.sqrt(Math.pow(xDist, 2)+ Math.pow(yDist, 2))
  }

  function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
  }
}

particleText()