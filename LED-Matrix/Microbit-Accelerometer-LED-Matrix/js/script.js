// ******************  3.0 ADD WINDOW ONLOAD TO ALLOW EMBEDDED SVG TO TARGET PROPERLY

window.onload = function() {

    // *** 1.1 Delcare new micro:bit object ***
    let microBit = new uBit();

    // ** 3.1 GET SEARCH BUTTON AND ADD EVENT LISTENER ****************
    let searchBtn = document.getElementById('searchButton');

    // ** 3.2 GET SVG OBJECT AND LOOK INSIDE ITS CONTENTS
    let obj = document.getElementById("SVGObject").contentDocument;
    let bx = obj.getElementById("bx-01");

    // !  ****************** 5.0 Setup our Viewbox Dimension Variables
    let svgWidth = 1920;
    let svgHeight = 1080;

    // ! ** 5.1 The Dimensions of our rect in our SVG
    let bxWidth = 200;
    let bxHeight = 200;

    // ** 2.1 Declare a variable to hold the count
    let buttonACurrentCount = 0;

    // **************** 4.0 Declare Accelerometer values
    let ax;
    let ay;
    let az;

    // * Declare variables for our HTML UI fields
    let axField = document.getElementById("accX");
    let ayField = document.getElementById("accY");
    let azField = document.getElementById("accZ");

    // ****************** 6.0 Delcare Temperature variables
    let tempField = document.getElementById("temperature");

    // ! ** 7.1 Make a variable to store text for Matrix
    let myText = "awesome!";
    let myTextField = document.getElementById("myText");

    // ! ** 8.0 Setup our LED Matrix
    let ledMatrix;

    // * Add the click event listener to our button
    searchBtn.addEventListener('click', searchDevice);

    // *** 1.2 Declare a function and search for the Micro:bit ***
    function searchDevice(){
        microBit.searchDevice();
    }

    // *** 1.3 Check if micro:bit successfully connected ***
    microBit.onConnect(function() {
        console.log("I am connected to the universe! :D");
    });

    // ** 1.4 GetButton data that updates with every frame
    microBit.onBleNotify(function() {
        // console.log(microbit.getButtonA());
        // ** 1.4.1 Update button data to write to our HTML
        document.getElementById("buttonA").innerHTML = microBit.getButtonA();
        document.getElementById("buttonB").innerHTML = microBit.getButtonB();

        // ** 4.1 GET ACCELEROMETER DATA
        ax = microBit.getAccelerometer().x;
        ay = microBit.getAccelerometer().y;
        az = microBit.getAccelerometer().z;

        // ** 4.2 Add our accelerometer values to our HTML fields
        axField.innerHTML = ax;
        ayField.innerHTML = ay;
        azField.innerHTML = az;

        // ** 4.3 Map accelerometer data to our SVG
        // console.log("no scale: " + ax)
        // console.log("after scaled: " + scale(ax, -1024, 1024, 0, svgWidth-bxWidth))
        gsap.to(bx, {
            duration: 3,
            // * unscaled values 
            // x: ax,
            // y: ay,
            // ! 5.3 Map accelerometer range to the width of the SVG
            x: scale(ax, -1024, 1024, 0, svgWidth-bxWidth),
            y: scale(ay, -1024, 1024, 0, svgHeight-bxHeight),
            // We can limit and constrain the values by adjusting the output values
            // x: scale(ax, -1024, 1024, 480, 1440-bxWidth),
           
            ease: Power3.easeOut
        });


        // ** 6.1 Add our temperature value to our HTML fields
        tempField.innerHTML = microBit.getTemperature();

    });

    // ! ** 5.2 Create a scaling function takes the input variable, maps the min and max inputs values, to a new range
    // ! This is useful for converting our accelerometer range to the size of our viewBox

    // Parameters: number = variable for incoming data, 
    // inMin = lowest incoming value
    // inMax = highest incoming value
    // outMin = lower value after converting to new range (i.e., our viewBox)
    // outMax = highest value after converting to new range (i.e., our viewBox)

    function scale(number, inMin, inMax, outMin, outMax){
        return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }


    // ** 1.5 Only calls function once when Button A is pressed. 
    microBit.setButtonACallback(function() {
        console.log("Button A is Pressed!");
        // ** 2.3 Call our GSAP
        gsap.to(bx, {
            fill: "yellow",
            duration: 1
        });
        // ** 2.3 Call our function with the current count 
        // currentButtonACount();

        // ! **************** 7.0 Write Text to LED Matrix
        // microBit.writeMatrixText("Hello World!");
        // ! 7.1.2 ** Assign a variable to our LED matrix
        // microBit.writeMatrixText(myText);
        // ! 7.1.3 ** MAKE SURE ITS A STRING THIS DOESN'T WORK!
        // microBit.writeMatrixText(awesome!);
        // ! 7.1.4 ** Set text of Matrix with a function
        // writeText("FUNction");

        // ! 8.1 Fill our LED Matrix with a Pattern
        // ledMatrix = [
        //     ['0', '1', '0', '1', '0'],
        //     ['0', '1', '0', '1', '0'],
        //     ['0', '0', '0', '0', '0'],
        //     ['1', '0', '0', '0', '1'],
        //     ['0', '1', '1', '1', '0']
        //   ]

        // ! 8.2 Write to the 5 X 5 array of LED's on the micro:bit
        // microBit.writeMatrixIcon(ledMatrix);
    });



    // ** 1.5.2
    microBit.setButtonBCallback(function() {
        console.log("Button B is Pressed!");
        gsap.to(bx, {
            fill: "purple",
            duration: 1
        });

          // ! 8.2.1 Fill our LED Matrix with a Pattern
          ledMatrix = [
            ['0', '1', '0', '1', '0'],
            ['0', '1', '0', '1', '0'],
            ['0', '0', '0', '0', '0'],
            ['0', '1', '1', '1', '0'],
            ['1', '0', '0', '0', '1']
          ]

        // ! 8.2.2 Write to the 5 X 5 array of LED's on the micro:bit
        microBit.writeMatrixIcon(ledMatrix);

    });

    // ** 2.2 Create a function to keep the current count of button presses
    function currentButtonACount() {
        buttonACurrentCount++;
        console.log(buttonACurrentCount);

        // ** 2.4 Reset count if it exceeds a maximum
        if(buttonACurrentCount >= 4) {
            console.log("Do something when Max Count Reach...like a GSAP Animation");
            // Reset count
            buttonACurrentCount = 0;
        }
    }

    // ! 7.1.4.1 create our matrix text function
    function writeText(text) {
        microBit.writeMatrixText(text);
        myTextField.innerHTML = text;
    }

    // ! 7.2 Function to write user input as a text matrix
    function updateText() {
       let textInput = document.getElementById("newText").value;
       microBit.writeMatrixText(textInput);
    }

    // Get the button element for text field input
    let textEnterButton = document.getElementById("textUpdater");
    textEnterButton = addEventListener('onClick', updateText);

    // ! 9.3 Empty Checkbox LED Matrix Variable
    let checkBoxMatrix = [
        ['0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0']
      ]


    // ! 9.0 - Target our input checkboxes and write to the Matrix
    let cells = document.querySelectorAll("#matrixContainer>div>input");

    // ! 9.1 - Add Event Listener to each checkbox
    cells.forEach(cell => cell.addEventListener('click', pixelChange)); 

    // ! 9.2 - Create a function that listens to our checkboxes and sets the matrix
    function pixelChange(e) {
        
          // Get position of checkbox in 2-D Array (AKA The Matrix)
          let xPos = e.target.dataset.x;
          let yPos = e.target.dataset.y;

        //   We can see the position of what is checked 
        //   console.log(xPos, yPos);

        // ! 9.3.1 
        // If a box is checked, set the LED in the Matrix to 1 (on)
        if(e.target.checked) {
            checkBoxMatrix[xPos][yPos] = 1;
        } else {
            checkBoxMatrix[xPos][yPos] = 0;
        }

        // Write to LED Matrix
        microBit.writeMatrixIcon(checkBoxMatrix);
    }
}