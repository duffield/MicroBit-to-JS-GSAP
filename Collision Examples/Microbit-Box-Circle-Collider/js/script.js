// ******************  3.0 ADD WINDOW ONLOAD TO ALLOW EMBEDDED SVG TO TARGET PROPERLY

window.onload = function() {

    // *** 1.1 Delcare new micro:bit object ***
    let microBit = new uBit();

    // ** 3.1 GET SEARCH BUTTON AND ADD EVENT LISTENER ****************
    let searchBtn = document.getElementById('searchButton');

    // ** 3.2 GET SVG OBJECT AND LOOK INSIDE ITS CONTENTS
    let obj = document.getElementById("SVGObject").contentDocument;
    let c = obj.getElementById("c-01");

    // ! ** 9.0 GET BOX COLLIDER ELEMENT 
    let cCollider = obj.getElementById("c-collider");

    // ! Set the origin of our boxes to center 
    gsap.set([c, cCollider], {
        transformOrigin: "center center"
    })

    let currentCollide = false; 
    let prevCollide = currentCollide; 

    // *  ****************** 5.0 Setup our Viewbox Dimension Variables
    let svgWidth = 1920;
    let svgHeight = 1080;

    //  ** 5.1 The Dimensions of our rect in our SVG
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

    // * Get Search
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
        gsap.to(c, {
            duration: 3,
            // * unscaled values 
            // x: ax,
            // y: ay,
            // ** 5.3 Map accelerometer range to the width of the SVG
            cx: scale(ax, -1024, 1024, 0, svgWidth-bxWidth),
            cy: scale(ay, -1024, 1024, 0, svgHeight-bxHeight),
            // We can limit and constrain the values by adjusting the output values
            // x: scale(ax, -1024, 1024, 480, 1440-bxWidth),
           
            ease: Power3.easeOut
        });

        // ! 9.1 See whether two boxes collide! 
        // Set current collide to the return of our intersect function
        currentCollide = circlesCollide(c, cCollider);

        // * Are we colliding?
        console.log("Worlds Collide: ", circlesCollide(c, cCollider));

        if(currentCollide === true && prevCollide === false) {
            console.log("COLLISION!");
            gsap.to(cCollider,{
                fill: "blue",
                duration: 1
            });
        } else if (currentCollide === false && prevCollide === true) {
            gsap.to(cCollider,{
                fill: "red",
                duration: 1
            });
        }

        // Update our prevCollide Variable
        prevCollide = currentCollide;

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
    });

    // ** 1.5.2
    microBit.setButtonBCallback(function() {
        console.log("Button B is Pressed!");
    });

      // Circle Collider Resources
    // https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection 

    function circlesCollide(circle1, circle2) {
        // ! MUST USE GET PROPRTY! GetAtrribute only gets the original SVG value vs after the GSAP transformations
        // ! Thanks ChatGPT <3 
        // Get the positions and radii of the circles
        let x1 = gsap.getProperty(circle1, 'cx');
        let y1 =  gsap.getProperty(circle1, 'cy');
        let r1 = gsap.getProperty(circle1, 'r');
        let x2 = gsap.getProperty(circle2, 'cx');
        let y2 =  gsap.getProperty(circle2, 'cy');
        let r2 = gsap.getProperty(circle2, 'r');
      
        // Calculate the distance between the centers of the two circles
        let distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

        // * Uncomment to see it in action! 
        // console.log("C1: ", x1, y1, r1);
        // console.log("C2: ", x2, y2, r2);
        // console.log("Distance: ", distance);

        // Check if the distance is less than the sum of the radii
        return distance < (r1 + r2);
    }
}