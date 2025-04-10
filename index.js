// Flag to check if the video is currently playing
let isVideoPlaying = false;

// Counter to track clicks on the 'a' button
let aButtonClickCount = 0;

// Detect button clicks
document.querySelectorAll(".drum").forEach(button => {
  button.addEventListener("click", function () {
    let buttonInnerHTML = this.innerHTML;
    playSound(buttonInnerHTML);
    animateButton(buttonInnerHTML);

    // Check if the 'a' button is clicked
    if (buttonInnerHTML === "a") {
      aButtonClickCount++;
      if (aButtonClickCount === 3 && !isVideoPlaying) {
        playRickRollVideo();
        aButtonClickCount = 0; // Reset after playing video
      }
    } else {
      // Reset the counter if any other button is clicked
      aButtonClickCount = 0;
    }
  });
});

// Detect key presses
document.addEventListener("keydown", function (event) {
  playSound(event.key);
  animateButton(event.key);

  // Check if the 'a' key is pressed
  if (event.key === "a") {
    aButtonClickCount++;
    if (aButtonClickCount === 3 && !isVideoPlaying) {
      playRickRollVideo();
      aButtonClickCount = 0; // Reset after playing video
    }
  } else {
    // Reset the counter if any other key is pressed
    aButtonClickCount = 0;
  }
});

function playSound(key) {
  switch (key) {
    case "w":
      new Audio("sounds/tom-1.mp3").play();
      break;
    case "a":
      new Audio("sounds/tom-2.mp3").play();
      break;
    case "s":
      new Audio("sounds/tom-3.mp3").play();
      break;
    case "d":
      new Audio("sounds/tom-4.mp3").play();
      break;
    case "j":
      new Audio("sounds/snare.mp3").play();
      break;
    case "k":
      new Audio("sounds/crash.mp3").play();
      break;
    case "l":
      new Audio("sounds/kick-bass.mp3").play();
      break;
    default:
      console.log(key);
  }
}

// Optional: Animate the button when it's pressed
function animateButton(currentKey) {
  let activeButton = document.querySelector("." + currentKey);

  if (activeButton) {
    activeButton.classList.add("pressed");
    setTimeout(() => {
      activeButton.classList.remove("pressed");
    }, 100);
  }
}

// Function to play the Rick Roll video
function playRickRollVideo() {
  isVideoPlaying = true; // Set the flag to true to indicate the video is playing

  const videoWrapper = document.createElement("div");
  videoWrapper.style.position = "fixed";
  videoWrapper.style.top = "50%";
  videoWrapper.style.left = "50%";
  videoWrapper.style.transform = "translate(-50%, -50%)";
  videoWrapper.style.zIndex = "9999"; // Ensure it is on top
  videoWrapper.style.backgroundColor = "rgba(0, 0, 0, 0.8)"; // Add a dark background behind the video for contrast
  videoWrapper.style.padding = "10px"; // Optional padding around the video
  
  const video = document.createElement("video");
  video.src = "Rick Roll.mp4";
  video.autoplay = true;
  video.controls = true;
  video.style.maxWidth = "80%"; // Make sure the video is not too big
  video.style.maxHeight = "80vh"; // Limit the video height to 80% of the viewport height

  // Append the video to the wrapper
  videoWrapper.appendChild(video);
  document.body.appendChild(videoWrapper);

  video.addEventListener('ended', () => {
    isVideoPlaying = false; // Set the flag back to false after the video ends
    videoWrapper.remove(); // Remove the wrapper (and video) after it ends
  });
}
