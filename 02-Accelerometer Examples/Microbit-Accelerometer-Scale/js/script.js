// ! 3.0 ADD WINDOW ONLOAD TO ALLOW EMBEDDED SVG TO TARGET PROPERLY

window.onload = function() {

    // *** 1.1 Delcare new micro:bit object ***
    let microBit = new uBit();

    // ! 3.2 GET SVG OBJECT AND LOOK INSIDE ITS CONTENTS
    let obj = document.getElementById("SVGObject").contentDocument;
    let bx = obj.getElementById("bx-01");

    // ! 4.4 GET OUR SVG WIDTH AND HEIGHT
    let svgWidth = obj.getElementById("vb").clientWidth;
    let svgHeight = obj.getElementById('vb').clientHeight;

    // ! **************** 3.1 GET SEARCH BUTTON AND ADD EVENT LISTENER ****************
    let searchBtn = document.getElementById('searchButton');

    // ** 2.1 Declare a variable to hold the count
    let buttonACurrentCount = 0;

    // ! **************** 4.0 Declare Accelerometer values
    let ax;
    let ay;
    let az;

    // ! Declare variables for our HTML UI fields
    let axField = document.getElementById("accX");
    let ayField = document.getElementById("accY");
    let azField = document.getElementById("accZ");

    // ! 5.0 Delcare Temperature variables
    let tempField = document.getElementById("temperature");


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

        // ! 4.1 GET ACCELEROMETER DATA
        ax = microBit.getAccelerometer().x;
        ay = microBit.getAccelerometer().y;
        az = microBit.getAccelerometer().z;

        // ! 4.2 Add our accelerometer values to our HTML fields
        axField.innerHTML = ax;
        ayField.innerHTML = ay;
        azField.innerHTML = az;

        // ! 4.3 Map accelerometer data to our SVG

        gsap.to(bx, {
            duration: 3,
            // x: ax,
            y: az,
            ease: Power3.easeOut
        });


        // ! 5.1 Add our temperature value to our HTML fields
        tempField.innerHTML = microBit.getTemperature();

    });

    // ** 1.5 Only calls function once when Button A is pressed. 
    microBit.setButtonACallback(function() {
        console.log("Button A is Pressed!");
        // ** 2.3 Call our GSAP
        gsap.to(bx, {
            fill: "yellow",
            duration: 1
        });
        // ** 2.3 Call our function with the current count 
        currentButtonACount();
    });

    // ** 1.5.2
    microBit.setButtonBCallback(function() {
        console.log("Button B is Pressed!");
        gsap.to(bx, {
            fill: "purple",
            duration: 1
        });

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
}