// document.addEventListener("DOMContentLoaded", function () {
//   var audio = document.getElementById("explore-car-audio");
//   audio.play();
//     setTimeout(function () {
//       audio.pause();
//     }, 5000); // 5 seconds
// });

window.addEventListener("load", function () {
  this.document
    .getElementById("explore-car-audio-btn")
    .addEventListener("click", function () {
      var audio = document.getElementById("explore-car-audio");
      window.location.href = "#cars-section";
      audio.play();
      // play back speed to 2x
      audio.playbackRate = 2;
    });
});
