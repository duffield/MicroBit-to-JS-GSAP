MicroBit-to-JS-GSAP

Kyle Duffield

http://www.kyleduffield.com



*** Note this requires a Chrome based browser to work and is experimental! ***

SIMPLE EXAMPLES WITH BBC MICRO:BIT SVG AND JS/GSAP3

This is a modification of antefact’s microBit.js example where they connected the micro:bit to the browser using p5.js. See here for further documentation: https://antefact.github.io/microBit.js/ . This version removes anything to do with p5.js and brings it into vanilla JS with examples that use SVG and GSAP3 animations. 

Micro:bit Web Bluetooth Library References
https://www.npmjs.com/package/microbit-web-bluetooth 



GETTING STARTED

Connecting to the Library:

1.	Ensure your micro:bit is plugged in bia USB and in Maintenance Mode. To enter Maintenance Mode ensure you hold the reset button as you plug it into the USB slot of your computer, as specified in the “General Reset and Connection” section of this doc. Ensure that it is capable of transferring data and is not just a charging cable (http://dignited.com/50330/usb-data-cable-vs-usb-charging-cable/  ). 


2. Locate the hex files located in the 00-hex repo named “ble-open-microbit-universal.hex”. This is what facilitates communication between the board and the Javascript library.  

3. Go to ‘./Getting started/hex/      Drag “ble-open-microbit-universal.hex” onto Micro:bit

** Note you will not see the “ble-open-microbit-universal.hex” file on the micro:bit. If it says FAIL.txt then there has been an issue with upload **

4. Run examples in this repo using a local development server (i.e., Live Server).
Troubleshooting:

TROUBLESHOOTING

Pairing Bluetooth not working:
Is your Bluetooth turned on on your OS?
Mac
https://support.apple.com/en-ca/guide/mac-help/blth1008/mac 

Windows: 
https://support.microsoft.com/en-us/windows/turn-bluetooth-on-or-off-in-windows-9e92fddd-4e12-e32b-9132-5e36bdb2f75a 

Is an anti-virus / firewall interfering? 
https://support.microbit.org/support/solutions/articles/19000129890-fail-txt 

Does Entering Pairing Mode show device on your OS?
https://support.microbit.org/support/solutions/articles/19000051025-pairing-and-flashing-code-via-bluetooth 


Is Bluetooth Accessibility enabled for Chrome on your OS?
https://support.google.com/chrome/answer/6362090?hl=en&co=GENIE.Platform%3DDesktop 
Is Bluetooth enabled on your browser? https://winaero.com/enable-or-disable-bluetooth-device-permissions-in-google-chrome/ 




