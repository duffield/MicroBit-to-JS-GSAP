// *****************  3.0 ADD WINDOW ONLOAD TO ALLOW EMBEDDED SVG TO TARGET PROPERLY

window.onload = function() {

    // *** 1.1 Delcare new micro:bit object ***
    let microBit = new uBit();

    // ** 3.2 GET SVG OBJECT AND LOOK INSIDE ITS CONTENTS
    let obj = document.getElementById("SVGObject").contentDocument;
    let bx = obj.getElementById("bx-01");

    //  **************** 3.1 GET SEARCH BUTTON AND ADD EVENT LISTENER ****************
    let searchBtn = document.getElementById('searchButton');

    // ** 2.1 Declare a variable to hold the count
    let buttonACurrentCount = 0;


    // ! 3.0 ADD CURRENT STATE BUTTONS

    let currentAState = false;
    let prevAState = currentAState;

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

        buttonHasChanged();

    });

    // ** 1.5 Only calls function once when Button A is pressed. 
    microBit.setButtonACallback(function() {
        // console.log("Button A is Pressed!");
        // ** 2.3 Call our GSAP
        // gsap.to(bx, {
        //     fill: "yellow",
        //     duration: 1
        // });
        // ** 2.3 Call our function with the current count 
        // currentButtonACount();

        // console.log("HOLDING!");

    });

    // ** 1.5.2
    microBit.setButtonBCallback(function() {
        console.log("Button B is Pressed!");
        // gsap.to(bx, {
        //     fill: "purple",
        //     duration: 1
        // });

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

    // ! ** 3.1 Function to see if the button state has changed

    function buttonHasChanged() {

        // ! ** 3.2 Declare in the function that's always updating, and cast button state to Boolean
        let buttonAState = Boolean(microBit.getButtonA());

        // ! Set current state to whatever the button state is
        currentAState = buttonAState;

        // ! 3.3 IF a BUTTON is not equal to its previous state (i.e., it has changed)
        // if(currentAState != prevAState) {
        //     console.log("Not equal to previous state");
        // }

        if(prevAState === false && currentAState === true) {
            console.log("OFF TO ON! // BUTTON HELD DOWN!");
            // ! 3.5 Delay our function 
            gsap.delayedCall(3, timerFinished);

        } else if(prevAState === true && currentAState === false) {
            console.log("ON TO OFF! // BUTTON RELEASED!");
             gsap.to(bx, {
                fill: "purple",
                duration: 1
            });
            gsap.killTweensOf(timerFinished);
        }

        // ! Set the previous state to the current state so that it updates before we loop through this block again
        prevAState = currentAState;
    }

    // ! 3.4 Function for when timer has finished
    function timerFinished(){
        console.log("TIMER FINISHED");

        // Run GSAP
         gsap.to(bx, {
            fill: "red",
            duration: 1
        });

    }
}