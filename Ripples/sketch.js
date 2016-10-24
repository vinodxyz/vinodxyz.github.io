/* Ripple Generator - A test program to get started with P5.js */
/* Inspiration - Several DBZ fight-sequences where they fly high in the air and fight. xD */

  var funky;
  var radius; var radiusLimit; var rippleThickness;
  var x; var y; var cWidth = 1440; var cHeight =700;
  var msgCount = 0; var msgDeadline = 15;
  

function setup() {
  
  createCanvas(cWidth, cHeight);
  background(36,103,201);
  
  resetStats();
  
}

function resetStats()
{
  funky = random([0,1,2,3]);
  
  radius = random(0,99);
  radiusLimit = random(100,1000);
  rippleThickness = random(0,5);
  radiusInc = random(20,80);
  
  x = random(0,cWidth);
  y = random(0,cHeight);
  
  msgCount++;
  
}

function rippleGenerator()
{
  if(radius <= radiusLimit)
  {
    if(funky != 1)
    {
      fill(random(0,255),random(0,255),random(0,255), random(0,99));
      noStroke();
    }
    else
    {
      noFill();
      stroke('white');
    }
    
    //console.log(funky);
    strokeWeight(rippleThickness);
    ellipse(x,y,radius);
    
    rippleThickness = rippleThickness - (rippleThickness/(radiusLimit/radius));
    radius = radius + radiusInc;
    
  }
  else
  {
    background(random(0,255),random(0,99),random(0,99));
    resetStats();
    
  }
}

function draw() {
  
  if(msgCount >= msgDeadline)
  {
    textSize(random(30,200));
    fill(random(0,255),random(0,255),random(0,255), random(0,99));
    text("BOOM!", random(0,cWidth), random(0,cHeight));
    
    msgCount = 0;
    msgDeadline = random(0,20);
  }
  
  rippleGenerator();
  
}