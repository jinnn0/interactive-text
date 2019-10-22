/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/*! exports provided: particleText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "particleText", function() { return particleText; });
function particleText(){

	let canvas = document.querySelector("canvas")
  let c = canvas.getContext("2d")

  let ww = canvas.width = window.innerWidth
  let wh = canvas.height = window.innerHeight
  let form = document.querySelector('form')
  let text = form.querySelector(".text")
  let textMessage = text.value


  let mouse = {x: undefined, y: undefined}

  function Particle(x, y, r, accX, accY){
    this.x = randomIntFromRange(r, ww-r)
    this.y = randomIntFromRange(r, wh-r)
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
      
      c.beginPath()
      c.arc(this.x, this.y, this.r, 0, Math.PI * 2)
      // c.arc(this.dest.x, this.dest.y, this.r, 0, Math.PI * 2)
      c.fillStyle = this.color
      c.fill()
      c.closePath()

      c.beginPath()
      c.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2)
      c.fill()
      c.closePath()
    }

    this.update = function(){
      this.draw()

      if(this.x + this.r > ww || this.x - this.r < 0){
        this.velocity.x = -this.velocity.x
      }

      if(this.y + this.r > wh || this.y - this.r < 0){
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
  
    c.font = `bold ${ww/10}px sans-serif`;
    c.fillStyle = "black"
    c.textAlign = "center"
    c.fillText(textMessage, ww/2, wh/2)

    let imgData = c.getImageData(0, 0, ww, wh)
    let data = imgData.data


    for(let i = 0; i < ww; i += 5){
      for(let j = 0; j < wh; j += 5){
        if(data[((ww * j + i) * 4) + 3]){
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
    c.clearRect(0, 0, ww, wh)

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

    c.clearRect(0, 0, ww, wh)
    init(textMessage)
    animate()
  })

  console.log(particles[0].accX);
  console.log(particles[24].accX);
  console.log(particles[78].accX);



  window.addEventListener('resize', function() {
    ww = canvas.width = window.innerWidth
    wh = canvas.height = window.innerHeight
    
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

 function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
  }

}

particleText()

/***/ })

/******/ });