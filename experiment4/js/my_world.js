"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
}

function p3_drawBefore() {}

function p3_drawTile(i, j) {
  noStroke();
  var tileseed = XXH.h32("tile:" + [i, j], worldSeed) % 30;
  if (tileseed == 0) {
    fill(100, 200);
  }
  else if(tileseed == 1 ){
    fill('red');
  }
  else if(tileseed == 2){
    fill("purple")
  }
  else {
    fill(1, 200);
  }

  push();
  if(tileseed == 1){
    beginShape();
    vertex(-tw, 0);
    vertex(-th+10, 0);
    vertex(0, th);
    vertex(0, -th+15);
    vertex(tw, 0);
    vertex(tw, -th+10);
    vertex(0, -th);
    endShape(CLOSE);
  }
  else if(tileseed == 2){
    ellipse(tw/3, th/2, 150);
  }
  else{
    beginShape();
    vertex(-tw, 0);
    vertex(0, th);
    vertex(tw, 0);
    vertex(0, -th);
    endShape(CLOSE);
  }
  let n = clicks[[i, j]] | 0;//cicle on click
  if (n % 2 == 1) {
    if(tileseed == 0){
      fill(0, 0, 0, 100);
      ellipse(0, 0, 40, 10);
      //translate(0, -10);
      fill(100, 255, 100, 128);
      ellipse(0, 0, 10, 10);
    }
    else if(tileseed == 1){
      fill(0, 0, 0, 255);
      ellipse(0, 0, 40, 10);
      //translate(0, -10);
      fill(100, 15, 200, 255);
      ellipse(0, 0, 10, 10);
    }
    else if(tileseed == 2){
      fill(0, 0, 0, 255);
      ellipse(-10, -30, 40, 10);
      //translate(0, -10);
      fill(100, 200, 200, 255);
      ellipse(-10, -30, 10, 10);
      fill(0, 0, 0, 255);
      ellipse(20, -30, 40, 10);
      //translate(0, -10);
      fill(100, 200, 200, 255);
      ellipse(20, -30, 10, 10);
      fill(100, 200, 100, 255);
      ellipse(0, -5, 20, 30);
    }
    else{
      fill(255, 255, 255, 255);
      ellipse(0, 0, 40, 10);
      //translate(0, -10);
      fill(255, 20, 0, 128);
      ellipse(0, 0, 10, 10);
    }
  }

  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {}
