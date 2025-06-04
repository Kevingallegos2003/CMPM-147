// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;
let seed = 0;
var Canvasx = 0;
const grassColor = "#74740d";
const skyColor = "#69ade4";
const stoneColor = "#858290";
let houseColor = ["white", "green", "blue", "yellow", "black", "magenta", "red"];
let treeColor = "#33330b";
const MountainColor = "#B29995";
const MountainColor1 = "#B9A19F";
const MountainColor2 = "#BEA19B";
const MountainColor3 = "#C4A9A2";
const MountainColor4 = "#98888B";

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }

    myMethod() {
        // code to run when method is called
    }
}

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  // create an instance of the class
  myInstance = new MyClass("VALUE1", "VALUE2");

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
  Canvasx++;
  background(220);    
  // call a method on the instance
  myInstance.myMethod();

  randomSeed(seed);
  
  noStroke();
  fill(skyColor);
  rect(0, 0, width, height / 2);
  fill(grassColor);
  rect(0, height / 2, width, height / 2);
  
  drawMountain(MountainColor4, 90);
  drawMountain(MountainColor, 50);
  drawMountain(MountainColor1, 60);
  drawMountain(MountainColor2, 70);
  drawMountain(MountainColor3, 80);
  for(let i = 0; i< 2*random()+2; i++){
      drawRoad();
  }
  for(let j = height/2-70; j > 0; j-=.25){
  const homesAmount = 2*random()+3;
    const treesAmount =  4*random();
    for (let i = 0; i < treesAmount; i++){
      drawTree(j);
      //drawRoad(j);
    }
    for (let i = 0; i < homesAmount; i++) {
      const c = round(6*random());
      //console.log(c);
      let color = houseColor[c];
      drawHouse(color, j);
    }
    //if(j % 50 == 0){drawRoad(j);}
  }
}
function drawMountain(color, heightM){
  fill(color);
  beginShape();
  vertex(0, height / 2);
  const steps =10;
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y =
      height / 2 - (random() * random() * random() * height) / 2 - height / heightM;
    vertex(x, y);
  }
  vertex(width, height / 2);
  endShape(CLOSE);
}
function drawTree(heightval){
  fill(treeColor);
  const scrub = Canvasx/width;  
  let z = heightval;
  let x = width * ((random() + (scrub/50 + millis() / 500000.0) / z) % 1);
  let s = width / 50 / z;
  let y = height / 2 + height / 20 / z;
  triangle(x, y - s, x - s / 4, y, x + s / 4, y);
}
function drawHouse(houseC,heightval){
  fill(stoneColor);
  const scrub = Canvasx/width;  
  let z = heightval;
  let x = width * ((random() + (scrub/50 + millis() / 500000.0) / z) % 1);
  let s = width / 50 / z;
  let y = height / 2 + height / 20 / z;
  triangle(x, y - s/2, x - s / 4, y, x + s / 4, y);
  //console.log("hello");
  fill(houseC);
  //console.log("Color = "+houseColor[c]);
  square(x+s/4, y+s/2,(x-(x+s/4))*2);
}

function drawRoad(){
  fill(stoneColor);
  const scrub = Canvasx/width;  
  let z = random();
  let x = width * ((random()*1 + (scrub/50 + millis() / 500000.0) / z) % 1);
  let s = width / 50 / z;
  let y = height / 2;
  triangle(x-s/2, y+height/2 , x - s / 4, height/2, x + s / 4, y+height/2);
  rect(x-s, height/2+s/z, 700, 5);
  rect(x-s, height/2+s/z+30, -700, 5);
  //rect(x-s/2,y,s,y);
}

