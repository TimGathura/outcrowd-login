// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "../vendor/some-package.js"
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html"
// Establish Phoenix Socket and LiveView configuration.
import {Socket} from "phoenix"
import {LiveSocket} from "phoenix_live_view"
import topbar from "../vendor/topbar"

document.addEventListener('mousemove', function (event) {
  const eyeLeft = document.getElementById('eye-left').querySelector('::before');
  const eyeRight = document.getElementById('eye-right').querySelector('::before');
  
  const eyes = [eyeLeft, eyeRight];

  eyes.forEach(eye => {
    const rect = eye.getBoundingClientRect(); // Get the current eye position
    const eyeCenterX = rect.left + rect.width / 2; // Find the center of the eye horizontally
    const eyeCenterY = rect.top + rect.height / 2; // Find the center vertically

    // Calculate the angle of the eye's movement toward the cursor
    const deltaX = event.clientX - eyeCenterX;
    const deltaY = event.clientY - eyeCenterY;
    const angle = Math.atan2(deltaY, deltaX);

    // Move the pupil based on this angle, within the boundaries of the eye
    const moveAmount = 5; // You can tweak this for more or less movement
    const pupilX = Math.cos(angle) * moveAmount;
    const pupilY = Math.sin(angle) * moveAmount;

    eye.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
  });
});


let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let liveSocket = new LiveSocket("/live", Socket, {
  longPollFallbackMs: 2500,
  params: {_csrf_token: csrfToken}
})

// Show progress bar on live navigation and form submits
topbar.config({barColors: {0: "#29d"}, shadowColor: "rgba(0, 0, 0, .3)"})
window.addEventListener("phx:page-loading-start", _info => topbar.show(300))
window.addEventListener("phx:page-loading-stop", _info => topbar.hide())

// connect if there are any LiveViews on the page
liveSocket.connect()

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket



