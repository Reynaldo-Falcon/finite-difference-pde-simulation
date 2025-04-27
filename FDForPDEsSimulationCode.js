// ------Constants and Lets------

// Canvas related

    let canvas;
    const canvasWidth = 900;   // Fullscreen in my computer...
    const canvasHeight = 600 ;
    const canvasPosX = 0;
    const canvasPosY = 0;

// Title and Author Text Related

    const textAnchorX = canvasWidth/2;  // Provides anchor for all text horizontally: text spawn from the center
    const textAnchorY = canvasHeight/8; // Provides anchor for all text vertically: text spawns from the top

// Menu buttons related

    const menuButWidth = 150;
    const menuButHeight = 50;

    // Adding this to button position makes the buttons anchor from the center of itself
    const menuButMiddleAnchorX = -menuButWidth/2;
    const menuButMiddleAnchorY = -menuButHeight/2;

    // Definite positions for each button based off of canvas size and position
    const lButPosX = canvasPosX + menuButMiddleAnchorX + canvasWidth*(3/4);    // Third Button
    const hButPosX = canvasPosX + menuButMiddleAnchorX + canvasWidth*(1/4);    // First Button
    const wButPosX = canvasPosX + menuButMiddleAnchorX + canvasWidth*(2/4);    // Second Button

    // They all have the same y coordinate!
    const menuButPosY = canvasPosY + menuButMiddleAnchorY + canvasHeight*(3/5);

// ------Program------

function setup()
{
    // Generate starting menu canvas
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.position(canvasPosX, canvasPosY);
    canvas.background(0, 120, 80);  // Forest Teal color

    // Title Text
    textAlign(CENTER, CENTER);  // Will place text's anchor in center for both title AND author text
    textSize(48);
    fill(255);
    text("Finite Difference Method", textAnchorX, textAnchorY);
    text("for", textAnchorX, textAnchorY + 45);
    text("PDE Simulations", textAnchorX, textAnchorY + 90);

    // Author Text
    textSize(24);
    fill(200);
    text("Reynaldo J. Falcón Torres & Edgardo A. Diaz Sandoval ", textAnchorX, textAnchorY + 140);

    // Create simulation buttons
    const laplaceButton = createButton('Laplace Simulation');
    const HeatButton = createButton('Heat Simulation');
    const WaveButton = createButton('Wave Simulation');

    // Size them nicely
    laplaceButton.size(menuButWidth, menuButHeight);
    HeatButton.size(menuButWidth, menuButHeight);
    WaveButton.size(menuButWidth, menuButHeight);

    // Place simulation buttons spread out in the center of the screen
    laplaceButton.position(lButPosX, menuButPosY);
    HeatButton.position(hButPosX, menuButPosY);
    WaveButton.position(wButPosX, menuButPosY);
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