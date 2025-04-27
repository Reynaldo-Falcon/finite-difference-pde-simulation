// ------Constants and Lets------

// Canvas related

    let canvas;
    const canvasWidth = 900;   // Fullscreen in my computer...
    const canvasHeight = 600 ;
    const canvasPosX = 0;
    const canvasPosY = 0;

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
    const menuButPosY = canvasPosY + menuButMiddleAnchorY + canvasHeight/2;

// ------Program------

function setup()
{
    // Generate starting menu canvas
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.position(canvasPosX, canvasPosY);
    canvas.background(0, 120, 80);  // Forest Teal color

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