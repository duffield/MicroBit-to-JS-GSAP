// *** 1.1 Delcare new micro:bit object ***
let microBit = new uBit();

// *** 1.2 Declare a function and search for the Micro:bit ***
function searchDevice(){
    microBit.searchDevice();
}

// *** 1.3 Check if micro:bit successfully connected ***
microBit.onConnect(function() {
    console.log("I am connected to the universe! :D");
});

// ! 1.4 GetButton data that updates with every frame
microBit.onBleNotify(function() {
    // console.log(microbit.getButtonA());
    // ! 1.4.1 Update button data to write to our HTML
    document.getElementById("buttonA").innerHTML = microBit.getButtonA();
    document.getElementById("buttonB").innerHTML = microBit.getButtonB();

   
});

// ! 1.5 Only calls function once when Button A is pressed. 
microBit.setButtonACallback(function() {
    console.log("Button A is Pressed!");
    // * Call our GSAP
    gsap.to("#bx", {
        fill: "yellow",
        translateX: 400,
        duration: 1
    });
});

// ! 1.5.2
microBit.setButtonBCallback(function() {
    console.log("Button B is Pressed!");
    gsap.to("#bx", {
        fill: "purple",
        translateX: 0,
        duration: 1
    });

});