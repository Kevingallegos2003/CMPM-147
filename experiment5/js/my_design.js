/* exported getInspirations, initDesign, renderDesign, mutateDesign */


function getInspirations() {
  return [
    {
      name: "Lunch atop a Skyscraper", 
      assetUrl: "Assets/skyscraper.jpg",
      credit: "Lunch atop a Skyscraper, Charles Clyde Ebbets, 1932"
    },
    {
      name: "Train Wreck", 
      assetUrl: "Assets/train-wreck.jpg",
      credit: "Train Wreck At Monteparnasse, Levy & fils, 1895"
    },
    {
      name: "Migrant mother", 
      assetUrl: "Assets/migrant-mother.jpg",
      credit: "Migrant Mother near Nipomo, California, Dorothea Lange, 1936"
    },
    {
      name: "Disaster Girl", 
      assetUrl: "Assets/girl-with-fire.jpg",
      credit: "Four-year-old Zoë Roth, 2005"
    },
    {
      name: "The Kel Car", 
      assetUrl: "Assets/kelcar.jpg",
      credit: "Omori, 2020"
    },
    {
      name: "Sourdough", 
      assetUrl: "Assets/BigSourdough.png",
      credit: "https://beckmannsbakery.com/"
    },
    {
      name: "Plastic death albulm", 
      assetUrl: "Assets/GB-1000.jpg",
      credit: "https://runforcoverrecords.com/products/glass-beach-plastic-death"
    },
  ];
}

function initDesign(inspiration) {
  resizeCanvas(inspiration.image.width/2, inspiration.image.height/2);
  
  let design = {
    bg: 128,
    fg: []
  }
  
  for(let i = 0; i < 100; i++) {
    design.fg.push({x: random(width),
      y: random(height),
      w: random(width/2),
      h: random(height/2),
      fill: random(255)})
  }
  return design;
}

function renderDesign(design, inspiration) {
  background(design.bg);
  noStroke();
  for(let box of design.fg) {
    fill(box.fill, 128);
    rect(box.x, box.y, box.w, box.h);
    rect(box.x, box.y, box.w, box.h);
    ellipse(box.x, box.y, box.w, box.h);
    ellipse(box.x+30, box.y, box.w, box.h);
  }
}

function mutateDesign(design, inspiration, rate) {
  design.bg = mut(design.bg, 0, 255, rate);
  for(let box of design.fg) {
    box.fill = mut(box.fill, 0, 255, rate);
    box.x = mut(box.x, 0, width, rate);
    box.y = mut(box.y, 0, height, rate);
    box.w = mut(box.w, 0, width/2, rate);
    box.h = mut(box.h, 0, height/2, rate);
  }
}
function mut(num, min, max, rate) {
    return constrain(randomGaussian(num, (rate * (max - min)) / 10), min, max);
}