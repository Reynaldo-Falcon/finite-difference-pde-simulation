// ------Constants and Lets------

// Canvas related

    let canvas;
    const canvasWidth = 900;
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
    let UIArray = []; // This will hold all UI elements to clear out later

    // Back to menu button size and positions
    const btmButWidth = 100;
    const btmButHeight = 65;
    const btmButPosX = 30;
    const btmButPosY = canvasHeight - btmButHeight - 30;    // Places button anchored from its bottom

// Heat equation related

    // Numerical method time step n (A) and n+1 (B)
    let tempA = [];     // Actual Temperature
    let tempB = [];     // Next Temperature

    // Analytical solution time step
    let tempC = [];     // Only temperature array needed
    let heatDTCounter = 0;  // Counter to follow along with numerical solution
    let maxN = 30;      // Number of fourier coefficient terms calculated

    // Text Values for both solutions
    let tempValues = [0, 10, 20, 30, 40, 50, 60, 70, 80, 89];   // These are the values of interest
    let tempAnalytic = [];
    let tempNumerical = [];

    // Cylinder locations
    const cylPosX = canvasWidth/2;      // Position X is same for both cylinders
    const cylPosYA = canvasHeight*(1/4) + 10;   // Analytic Solution Cylinder Y position
    const cylPosYN = canvasHeight*(3/5) + 20;   // Numeric Solution Cylinder Y position
    const cylLength = 500;
    const cylRadX = 15;
    const cylRadY = 75;

    // Pixel variables
    const pixSide = 5;  // Pixels are 5x5
    // All pixels start being placed from the left most appropriate point on cylinder
    const pixOffSetX = cylPosX - 225;
    // All pixels start being placed from the bottom most appropriate point on cylinder
    const pixOffSetYA = cylPosYA - 65;
    const pixOffSetYN = cylPosYN - 65;

    // Discretized and equation constants
    const heatK = 1;    // Thermal diffusivity
    const heatDX = 1;   // Space step
    const heatDT = 0.2;   // Time step


// Wave equation related
    
    // Graph details
    let nPoints = 99;  // Number of spatial points
    let stringLength = 1;
    let waveDX =  1;
    let waveDT = 0.1;
    let waveA = 1;  // Wave Speed

    // Altitude Arrays
    let altiP = [];     // Past time step
    let altiC = [];     // Current time step
    let altiF = [];     // Future time step

    // Extra variable
    let time = 0;

// ------Program------

function setup()
{
    MenuSetup();
}

function draw()
{
    // These if statements allow the logic so that ONLY current level to be drawn
    if(currentLevel == "laplace")
    {
        LaplaceDraw();
    }
    else if(currentLevel == "heat")
    {
        HeatDraw();
    }
    else if(currentLevel == "wave")
    {
        WaveDraw();
    }
    // Menu doesn't need a draw function
}

function MenuSetup()
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

    // Prepare UI array for when switching levels
    //UIArray.push(laplaceButton);    // Exclude text(), those go away when canvas changes automatically
    UIArray.push(heatButton);
    UIArray.push(waveButton);


    // Size them accordingly
    //laplaceButton.size(menuButWidth, menuButHeight);
    heatButton.size(menuButWidth, menuButHeight);
    waveButton.size(menuButWidth, menuButHeight);

    // Place simulation buttons spread out in the center of the screen
    //laplaceButton.position(lButPosX, menuButPosY);
    heatButton.position(hButPosX, menuButPosY);
    waveButton.position(lButPosX, menuButPosY);

    // Stylize the buttons using CSS
    //laplaceButton.style('font-size', '20px');   // Increasing font size
    //laplaceButton.style('border-radius', '30px');    // Rounding corners
    heatButton.style('font-size', '20px');
    heatButton.style('border-radius', '30px');
    waveButton.style('font-size', '20px');
    waveButton.style('border-radius', '30px');

    // Add hover effect manually since CSS changes takes out original hover behavior
    // laplaceButton.mouseOver(() =>
    // {
    //     laplaceButton.style('background-color', 'rgb(140, 170, 180)'); // Darker sea blue
    // });

    // laplaceButton.mouseOut(() =>
    // {
    //     laplaceButton.style('background-color', 'rgb(230, 230, 230)'); // Gray-white
    // });

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

    // laplaceButton.mousePressed(() =>
    // {
    //     UIArrayClear()
    //     currentLevel = "laplace";  // Used for draw function for Laplace
    //     LaplaceSetup();
    // });

    heatButton.mousePressed(() =>
    {
        UIArrayClear()
        currentLevel = "heat";  // Used for draw function for Heat
        HeatSetup();
    });

    waveButton.mousePressed(() =>
    {
        UIArrayClear()
        currentLevel = "wave";  // Used for draw function for Wave
        WaveSetup();
    });
}

function LaplaceSetup()
{
    // Generate starting Laplace setup canvas
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.position(canvasPosX, canvasPosY);
    canvas.background(30);  // Dark gray color

    // Title Text
    textAlign(CENTER, CENTER);  // Will place text's anchor in center
    textSize(48);
    fill(255);  // White text
    text("FDM Simulation in Laplace Eq.", textAnchorX, textAnchorY);

    BackToMenuButton(); // Generates the button
}

function LaplaceDraw()
{}

function WaveSetup()
{
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.position(canvasPosX, canvasPosY);
    background(30);

    DrawEverythingWave();
    BackToMenuButton();

    waveDX = stringLength / (nPoints - 1);  // Better spacing
    waveDT = 0.9 * waveDX / waveA;  // Courant condition for stability
    time = 0;

    let r = waveA * waveDT / waveDX;
    console.log("Courant number r =", r);   // Check condition

    altiP = [];
    altiC = [];
    altiF = [];

    for (let i = 0; i < nPoints; i++)
    {
        let x = i * waveDX;
        altiP[i] = sin(2*PI*x); // Initial displacement
        altiC[i] = 0;
        altiF[i] = 0;
    }

    for (let i = 1; i < nPoints - 1; i++)
    {
        let lap = altiP[i + 1] - 2 * altiP[i] + altiP[i - 1];
        altiC[i] = altiP[i] + (r**2)*lap/2; // First step in time
    }

    altiP[0] = altiP[nPoints - 1] = 0;
    altiC[0] = altiC[nPoints - 1] = 0;
}


// function WaveSetup()
// {
//     // Generate starting Wave setup canvas
//     canvas = createCanvas(canvasWidth, canvasHeight);
//     canvas.position(canvasPosX, canvasPosY);
//     canvas.background(30);  // Dark gray color

//     DrawEverythingWave();

//     BackToMenuButton(); // Generates the button

//     // Initial Conditions of altitude arrays
//     altiP[0] = 0;
//     altiP[99] = 0;
//     altiC[0] = 0;
//     altiC[99] = 0;
//     altiF[0] = 0;
//     altiF[99] = 0;

//     // Initialize t_0
//     for(let i = 0; i < altiP.length; i++)
//     {
//         altiP[i] = sin(2*PI*i*waveDX);
//     }

//     // Initialize t_1
//     for(let i = 1; i < altiP.length-1; i++)
//     {
//         altiC[i] = altiP[i] + (((waveDT*waveA/waveDX)**2)/2)*(altiP[i+1] - 2*altiP[i] + altiP[i-1]);
//     }

// }

function WaveDraw()
{
    background(30);
    DrawEverythingWave();
  
    const yTop = 100;
    const yBottom = height - 100;
    const r = waveA * waveDT / waveDX;
  
    // Left Side
    push();
    noFill();
  
    // Numerical in blue
    stroke(100, 180, 255);
    beginShape();
    for (let i = 0; i < nPoints; i++)
    {
        let x = map(i, 0, nPoints - 1, 50, width / 2 - 25);
        let y = map(altiC[i], -1, 1, yBottom, yTop);
        vertex(x, y);
    }
    endShape();
  
    // Analytic in red
    stroke(255, 80, 80);
    beginShape();
    for (let i = 0; i < nPoints; i++)
    {
        let xVal = i / (nPoints - 1);
        let uAnalytic = sin(2 * PI * xVal) * cos(2 * PI * waveA * time);
        let x = map(i, 0, nPoints - 1, 50, width / 2 - 25);
        let y = map(uAnalytic, -1, 1, yBottom, yTop);
        vertex(x, y);
    }
    endShape();
    pop();
  
    // Right side error in green
    push();
    stroke(0, 255, 0);
    noFill();
    beginShape();
    for (let i = 0; i < nPoints; i++) {
      let xVal = i / (nPoints - 1);
      let uAnalytic = sin(2 * PI * xVal) * cos(2 * PI * waveA * time);
      let uNumeric = altiC[i]; // Using current step for error
  
      let error = uAnalytic - uNumeric;
      let x = map(i, 0, nPoints - 1, width / 2 + 25, width - 50);
      let y = map(error, -0.5, 0.5, yBottom, yTop); // Looser bounds for error
      vertex(x, y);
    }
    endShape();
    pop();
  
    // Finite Difference Update
    for (let i = 1; i < nPoints - 1; i++)
    {
        altiF[i] = 2*altiC[i] - altiP[i] + (r**2) * (altiC[i + 1] - 2*altiC[i] + altiC[i - 1]);
    }
  
    altiF[0] = altiF[nPoints - 1] = 0;
  
    for (let i = 0; i < nPoints; i++)
    {
        altiP[i] = altiC[i];
        altiC[i] = altiF[i];
    }
  
    time += waveDT; // Go forward in time for analytic solution to follow numerical
  }
  
  
  
  
  

// function WaveDraw()
// {
//     //-----Numerical Solution-----

//     background(255);         // Clear screen each frame
//     DrawEverythingWave();

//     push();
//     stroke(0, 0, 255);        // Set line color (blue)
//     noFill();                // Don’t fill under the curve
  
//     beginShape();
//     for (let i = 0; i < nPoints; i++)
//     {
//         let x = map(i, 0, nPoints - 1, 50, width - 50);  // match full domain
//         let y = map(altiP[i], -1, 1, height - 50, 50);
//         vertex(x, y);
//     }
      
//     endShape();
//     pop();
//     console.log('altiP:', altiP);

//     // Calculate next altitude:
//     for(let i = 1; i < (altiC.length-1); i++)
//     {
//         altiF[i] = -2*altiC[i] + altiP[i] + ((waveA*waveDT/waveDX)**2)*(altiC[i+1] - 2*altiC[i] + altiC[i-1]);    // Numerical Sol.
//     }
    
//     // altiP takes the new calculated values for altiC
//     for(let i = 0; i < altiC.length; i++)
//     {
//         altiP[i] = altiC[i];
//     }

//     // altiC takes the new calculated values for altiF
//     for(let i = 0; i < altiC.length; i++)
//     {
//         altiC[i] = altiF[i];
//     }
// }

function HeatSetup()
{
    // Generate starting Heat setup canvas
    canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.position(canvasPosX, canvasPosY);
    canvas.background(30);  // Dark gray color

    BackToMenuButton(); // Generates the button

    // Initial Conditions of temperature arrays of LENGTH 90
    tempA[0] = 0;
    tempA[89] = 0;
    tempB[0] = 0;
    tempB[89] = 0;

    for(let i = 1; i < (tempA.length-1); i++)
    {
        tempA[i] = 255; // Everything else begins at max temperature
    }

    DrawEverythingHeat();
}

function HeatDraw()
{
    canvas.background(30);
    DrawEverythingHeat();

    //-----Analytical Solution-----

    // Calculate next temp:
    for(let i = 0; i < tempA.length; i++)
    {
        tempC[i] = 0;
        for(let n = 0; n < maxN; n++)
        {
            // Analytical Sol.
            tempC[i] += (1020/PI)*(1/(2*n + 1))*((Math.E)**(-heatK*((PI*(2*n + 1))**2)*(heatDTCounter*heatDT)/7921))*sin((2*n + 1)*PI*i/89);    // L changed to 89 in sine for the boundary conditions to truly work!
        }
    }

    // Go forwards in time in the analytical solution alongside numerical solution
    heatDTCounter++;

    // Paint pixels:
    for(let i = 0; i < 26; i++)
    {
        for(let j = 0; j < tempA.length; j++)
        {
            push();
            noStroke();
            fill(tempC[j], 0, (255-tempC[j]));
            rect((pixOffSetX + j*pixSide), (pixOffSetYA + i*pixSide), pixSide, pixSide);
            pop();
        }
    }
    

    // Quick break to save values for texts
    for(let i = 0; i < tempValues.length; i++)
    {
        push();
        textSize(12);
        fill(255);  // White text
        text(tempC[tempValues[i]].toFixed(1), (pixOffSetX + tempValues[i]*pixSide), (pixOffSetYA + cylRadY*2 + 10));  // Rounded to first decimal
        text(tempA[tempValues[i]].toFixed(1), (pixOffSetX + tempValues[i]*pixSide), (pixOffSetYN + cylRadY*2 + 10));  // Rounded to first decimal
        text((tempC[tempValues[i]] - tempA[tempValues[i]]).toFixed(3), (pixOffSetX + tempValues[i]*pixSide), (pixOffSetYN + cylRadY*3));  // Rounded to first decimal
        pop();
    }


    //-----Numerical Solution-----

    // Paint pixels: (starts with initial conditions done)
    for(let i = 0; i < 26; i++)
    {
        for(let j = 0; j < tempA.length; j++)
        {
            push();
            noStroke();
            fill(tempA[j], 0, (255-tempA[j]));
            rect((pixOffSetX + j*pixSide), (pixOffSetYN + i*pixSide), pixSide, pixSide);
            pop();
        }
    }

    // Calculate next temp:
    for(let i = 1; i < (tempA.length-1); i++)
    {
        tempB[i] = tempA[i] + (heatK*heatDT/(heatDX**2))*(tempA[i+1] - 2*tempA[i] + tempA[i-1]);    // Numerical Sol.
    }
    
    // tempA takes the new calculated values for tempB
    for(let i = 0; i < tempA.length; i++)
    {
        tempA[i] = tempB[i];
    }
}

function UIArrayClear()
{
    for(let i of UIArray)
    {
        i.remove(); // Removes UI elements when called
    }
    UIArray = [];   // Resets array
}

function BackToMenuButton()
{
    // Function hosts creation of "back-to-menu" button that's important on each simulation canvas

    const btmButton = createButton('Menu');

    UIArray.push(btmButton);    // Include in UI array for deletion later
    
    // Position, size, and style
    btmButton.size(btmButWidth, btmButHeight);
    btmButton.position(btmButPosX, btmButPosY);
    btmButton.style('font-size', '20px');       // Increasing font size
    btmButton.style('border-radius', '30px');   // Rounding corners

    // Mouse hover behavior for button
    btmButton.mouseOver(() =>
        {
            btmButton.style('background-color', 'rgb(100, 95, 85)'); // Dark brown
        });
    
    btmButton.mouseOut(() =>
        {
            btmButton.style('background-color', 'rgb(230, 230, 230)'); // Gray-white
        });
    
    // Behavior when clicked
    btmButton.mousePressed(() =>
        {
            if(currentLevel == "heat")
            {
                heatDTCounter = 0;
            }
            UIArrayClear()          // Clear button
            currentLevel = "menu";  // Used for draw function for menu
            MenuSetup();            // Return to menu
        });
}

function DrawCylinder(cylPosX, cylPosY, cylLength, cylRadiusX, cylRadiusY)
{
    // Function used to generate cylinders for heat 1D heat simulation

    // Commonly used constants
    const cylLenOffsetX = cylLength/2;
    const cylDiaX = cylRadiusX*2;
    const cylDiaY = cylRadiusY*2;

    // Place cylinder centered at cylPosX and cylPosY
    push();

    stroke(255);
    noFill();
    translate(cylPosX, cylPosY);

    // Left ellipse
    ellipse(-cylLenOffsetX, 0, cylDiaX, cylDiaY);  // Generate ellipse

    // Right ellipse
    ellipse(cylLenOffsetX, 0, cylDiaX, cylDiaY);   // Generate ellipse

    // Top Line
    line(-cylLenOffsetX, cylRadiusY, cylLenOffsetX, cylRadiusY);

    // Bottom Line
    line(-cylLenOffsetX, -cylRadiusY, cylLenOffsetX, -cylRadiusY);

    pop();
}

function DrawEverythingHeat()
{
    // This function helps redraw everything in heat simulation for easy value update under the graphs

    // Title Text
    textAlign(CENTER, CENTER);  // Will place text's anchor in center
    textSize(48);
    fill(255);  // White text
    text("FDM Simulation in Heat Eq.", textAnchorX, textAnchorY-30);

    // Draw Cylinders for simulation
    DrawCylinder(cylPosX, cylPosYA, cylLength, cylRadX, cylRadY);
    DrawCylinder(cylPosX, cylPosYN, cylLength, cylRadX, cylRadY);

    // Text indicating solution type next to cylinders
    push();
    textSize(20);
    fill(255);  // White text
    text("Analytic Solution", cylPosX - (cylLength/2) - cylRadX - 90, cylPosYA);
    text("Numeric Solution", cylPosX - (cylLength/2) - cylRadX - 90, cylPosYN);
    text("<< Error (Ana. - Num.)", cylPosX + (cylLength/2) + cylRadX + 75, (pixOffSetYN + cylRadY*3));
    pop();
}

function DrawEverythingWave()
{
    // This function helps redraw everything in wave simulation for easy graph updates

    // Title Text
    textAlign(CENTER, CENTER);  // Will place text's anchor in center
    textSize(48);
    fill(255);  // White text
    text("FDM Simulation in Wave Eq.", textAnchorX, textAnchorY-20);

    // Text indicating solution type next to graphs
    push();
    textSize(20);
    fill(255);  // White text
    text("Analytic Solution", textAnchorX, textAnchorY + 475);
    text("Numeric Solution", textAnchorX, textAnchorY + 475);
    //text("<< Error (Ana. - Num.)", cylPosX + (cylLength/2) + cylRadX + 75, (pixOffSetYN + cylRadY*3));
    pop();
}