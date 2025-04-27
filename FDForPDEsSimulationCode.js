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

    const menuButWidth = 200;
    const menuButHeight = 100;

    // Adding this to button position makes the buttons anchor from the center of itself
    const menuButMiddleAnchorX = -menuButWidth/2;
    const menuButMiddleAnchorY = -menuButHeight/2;

    // Definite positions for each button based off of canvas size and position
    const lButPosX = canvasPosX + menuButMiddleAnchorX + canvasWidth*(4/5);    // Third Button
    const hButPosX = canvasPosX + menuButMiddleAnchorX + canvasWidth*(1/5);    // First Button
    const wButPosX = canvasPosX + menuButMiddleAnchorX + canvasWidth*(1/2);    // Second Button

    // They all have the same y coordinate!
    const menuButPosY = canvasPosY + menuButMiddleAnchorY + (canvasHeight*(3/5) + 15);

// Level Changer related

    let currentLevel = "menu"; // Other options are "heat", "laplace", and "wave"

// ------Program------

function setup()
{
    // Generate starting menu canvas
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.position(canvasPosX, canvasPosY);
    canvas.background(0, 100, 160);  // Light Prussian Blue color

    // Title Text
    textAlign(CENTER, CENTER);  // Will place text's anchor in center for both title AND author text
    textSize(48);
    fill(255);  // White text
    text("Finite Difference Method", textAnchorX, textAnchorY);
    text("for", textAnchorX, textAnchorY + 45);
    text("PDE Simulations", textAnchorX, textAnchorY + 90);

    // Author Text
    textSize(24);
    fill(200);  // Slightly gray text
    text("Reynaldo J. Falcón Torres & Edgardo A. Diaz Sandoval ", textAnchorX, textAnchorY + 140);

    // Create simulation buttons
    const laplaceButton = createButton('Laplace Simulation');
    const heatButton = createButton('Heat Simulation');
    const waveButton = createButton('Wave Simulation');

    // Size them accordingly
    laplaceButton.size(menuButWidth, menuButHeight);
    heatButton.size(menuButWidth, menuButHeight);
    waveButton.size(menuButWidth, menuButHeight);

    // Place simulation buttons spread out in the center of the screen
    laplaceButton.position(lButPosX, menuButPosY);
    heatButton.position(hButPosX, menuButPosY);
    waveButton.position(wButPosX, menuButPosY);

    // Stylize the buttons using CSS
    laplaceButton.style('font-size', '20px');   // Increasing font size
    laplaceButton.style('border-radius', '30px');    // Rounding corners
    heatButton.style('font-size', '20px');
    heatButton.style('border-radius', '30px');
    waveButton.style('font-size', '20px');
    waveButton.style('border-radius', '30px');

    // Add hover effect manually since CSS changes takes out original hover behavior
    laplaceButton.mouseOver(() =>
    {
        laplaceButton.style('background-color', 'rgb(140, 170, 180)'); // Darker sea blue
    });

    laplaceButton.mouseOut(() =>
    {
        laplaceButton.style('background-color', 'rgb(230, 230, 230)'); // Gray-white
    });

    heatButton.mouseOver(() =>
    {
        heatButton.style('background-color', 'rgb(140, 170, 180)');
    });

    heatButton.mouseOut(() =>
    {
        heatButton.style('background-color', 'rgb(230, 230, 230)');
    });

    waveButton.mouseOver(() =>
    {
        waveButton.style('background-color', 'rgb(140, 170, 180)');
    });

    waveButton.mouseOut(() =>
    {
        waveButton.style('background-color', 'rgb(230, 230, 230)');
    });

    
    // Level Changer bassed off of buttons

    laplaceButton.mousePressed(() =>
    {
        currentLevel = "laplace";  // Used for draw function for Laplace
        LaplaceSetup();
    });

    heatButton.mousePressed(() =>
    {
        currentLevel = "heat";  // Used for draw function for Heat
        HeatSetup();
    });

    waveButton.mousePressed(() =>
    {
        currentLevel = "wave";  // Used for draw function for Wave
        WaveSetup();
    });
}

function draw()
{

}

function LaplaceSetup()
{}

function LaplaceDraw()
{}

function WaveSetup()
{}

function WaveDraw()
{}

function HeatSetup()
{}

function HeatDraw()
{}