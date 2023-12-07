// *** 1.1 Delcare new micro:bit object ***
let microBit = new uBit();

// ! 2.1 Declare a variable to hold the count
let buttonACurrentCount = 0;

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

   
});

// ** 1.5 Only calls function once when Button A is pressed. 
microBit.setButtonACallback(function() {
    console.log("Button A is Pressed!");
    // ! 2.3 Set innerHTML to the return value
    document.getElementById("buttonACount").innerHTML = currentButtonACount();
});

// ** 1.5.2
microBit.setButtonBCallback(function() {
    console.log("Button B is Pressed!");
});

// ! 2.2 Create a function to keep the current count of button presses
function currentButtonACount() {
    buttonACurrentCount++;
    console.log(buttonACurrentCount);

    // ! Start Switch Statments
    // look at a variable, 
    switch(buttonACurrentCount) {
        // if it's 1 then...
        case 1:
        console.log("STATE 1: Do something GSAP...");
        break;

        // if it's 2 then...
        case 2:
        console.log("STATE 2: Do something GSAP...");
        break;

        // etc...
        case 3:
        console.log("STATE 3: Do something GSAP...");
        break;

        // etc...
        case 4:
        console.log("STATE 4: Do something GSAP...");
        // ! Reset variable
        buttonACurrentCount = 0;
        break;

        // *  if it does something we don't expect within these conditions just break so don't get caught in a spacetime continuum disruption
        default:
        break;
    }
    // take all this logic and turn it into a number when we call the function :)
    return buttonACurrentCount;
}

// !!! TEST CAN YOU DO THE SAME FOR BUTTON B?