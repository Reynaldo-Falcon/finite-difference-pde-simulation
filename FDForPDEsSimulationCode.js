// Constants and lets

// Canvas related
let canvas;
const canvasWidth = 900;
const canvasHeight = 600;

// Menu buttons related
const menuButWidth = 150;
const menuButHeight = 50;

// Program:
function setup()
{
// Generate starting menu canvas
canvas = createCanvas(canvasWidth,canvasHeight);
canvas.background(0,255,200,100);  // Dark Teal color

// Create simulation buttons
const laplaceButton = createButton('Laplace Simulation');
const HeatButton = createButton('Heat Simulation');
const WaveButton = createButton('Wave Simulation');

// Size them nicely
laplaceButton.size(menuButWidth, menuButHeight);
HeatButton.size(menuButWidth, menuButHeight);
WaveButton.size(menuButWidth, menuButHeight);

// Place simulation buttons spread out in the center of the screen
laplaceButton.position(200,200);
HeatButton.position(0,0);
WaveButton.position(0,0);
laplaceButton.size(150, 50);  

}

function draw()
{


}

function LaplaceSimulation()
{}

function WaveSimulation()
{}

function HeatSimulation()
{}