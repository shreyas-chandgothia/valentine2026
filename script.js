// =========================
// DOM ELEMENTS
// =========================

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const envelope = document.getElementById("envelope");
const bubble = document.getElementById("bubble");
const romanticMusic = document.getElementById("romanticMusic");
noBtn.classList.add("move-playful");


// =========================
// STATE VARIABLES
// =========================

let musicStarted = false;
let noClickCount = 0;
let lastSide = null;


// =========================
// STAGE DATA
// =========================

const stageData = {
  2018: {
    title: "Where It Began",
    caption: "Two Chandigarh kids. One Bombay campus.",
    photos: ["1.jpg","2.jpg","3.jpg","4.jpg"]
  },
  2019: {
    title: "Becoming Us",
    caption: "From hello to something more.",
    photos: ["1.jpg","2.jpg","3.jpg","4.jpg"]
  },
  2020: {
    title: "The World Paused",
    caption: "The world shut down. We didn’t.",
    photos: ["1.jpg","2.jpg","3.jpg","4.jpg"]
  },
  2021: {
    title: "Holding On",
    caption: "Screens, silence, stubborn love.",
    photos: ["1.jpg","2.jpg","3.jpg","4.jpg"]
  },
  2022: {
    title: "Two Continents",
    caption: "You chased stars. I stayed back.",
    photos: ["1.jpg","2.jpg","3.jpg","4.jpg"]
  },
  2023: {
    title: "Becoming Ourselves",
    caption: "Different cities. Same heartbeat.",
    photos: ["1.jpg","2.jpg","3.jpg","4.jpg"]
  },
  2024: {
    title: "Still Choosing",
    caption: "Not perfect. Just persistent.",
    photos: ["1.jpg","2.jpg","3.jpg","4.jpg"]
  },
  2025: {
    title: "Almost There",
    caption: "Planning futures across time zones.",
    photos: ["1.jpg","2.jpg","3.jpg","4.jpg"]
  },
  2026: {
    title: "The Next Chapter",
    caption: "",
    photos: []
  }
};

let openedYears = new Set();


// =========================
// AUDIO
// =========================

function startMusic() {
  if (musicStarted) return;

  romanticMusic.volume = 0;
  romanticMusic.play();
  musicStarted = true;

  let fade = setInterval(() => {
    if (romanticMusic.volume < 0.2) {
      romanticMusic.volume += 0.01;
    } else {
      clearInterval(fade);
    }
  }, 200);
}

document.addEventListener("click", startMusic);


// =========================
// BUBBLE
// =========================

function showBubble(message) {
  bubble.textContent = message;

  bubble.classList.remove("hidden");
  bubble.classList.remove("show");

  // Force browser to register initial state
  void bubble.offsetWidth;

  bubble.classList.add("show");

  setTimeout(() => {
    bubble.classList.remove("show");

    setTimeout(() => {
      bubble.classList.add("hidden");
    }, 400);

  }, 3000);
}


// =========================
// YES BUTTON
// =========================

yesBtn.addEventListener("click", () => {

  if (noClickCount === 0) {
    showBubble("Aren’t you curious what happens if you click No? 👀");
    return;
  }

  // Final Yes after chaos
  // Animate envelope slightly
  envelope.style.transition = "all 0.6s ease";
  envelope.style.transform = "scale(1.1)";
  envelope.style.opacity = "0";

  // Confetti burst

  let duration = 2 * 1000;
  let end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      spread: 60,
      origin: { y: 0.6 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();


  // Hide envelope and show final screen
  setTimeout(() => {
    envelope.style.display = "none";

    const finalScreen = document.getElementById("finalScreen");
    finalScreen.classList.remove("hidden");

    // Force reflow
    void finalScreen.offsetWidth;

    finalScreen.classList.add("show");

  }, 700);

  setTimeout(() => {

    // Fade out final content
    const finalScreen = document.getElementById("finalScreen");
    if (finalScreen) {
      finalScreen.classList.add("fade-out");
    }
  
    // Dim background slowly
    const dim = document.getElementById("dimOverlay");
    dim.style.opacity = "0.4";
  
    // After fade completes, start story transition
    setTimeout(() => {
      beginStoryTransition();
    }, 2500);
  
  }, 8000);
  
  
});


// =========================
// NO BUTTON
// =========================

function initializeNoButtonPosition() {
  const rect = noBtn.getBoundingClientRect();

  noBtn.style.position = "fixed";
  noBtn.style.left = rect.left + "px";
  noBtn.style.top = rect.top + "px";
}

noBtn.addEventListener("click", () => {

  if (noClickCount === 0) {
    initializeNoButtonPosition();
  }
  bubble.classList.add("hidden");
  noClickCount++;

  yesBtn.style.display = "block";
  yesBtn.style.margin = "0 auto";

  // Update text first
  if (noClickCount === 1) {
    noBtn.textContent = "Are you sure? 😋";
    noBtn.style.backgroundColor = "white";
    noBtn.style.color = "#ff4d6d";
  } else if (noClickCount === 2) {
    noBtn.textContent = "Think again 😘";
  } else if (noClickCount === 3) {
    noBtn.textContent = "Being naughty, are you? 😏";
  } else if (noClickCount === 4) {
    noBtn.textContent = "You seem determined 🤭";
  } else {
    noBtn.style.display = "none";
    showBubble("System Override Activated ❤️");
    return;
  }

  // Force reflow AFTER text change
  void noBtn.offsetWidth;

  const envelopeRect = envelope.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();
  const gap = 80;

  let side;

  // Pick a different random side than previous
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    // Only allow top or bottom on mobile
    do {
      side = Math.floor(Math.random() * 2) + 2; // 2 or 3 (top/bottom)
    } while (side === lastSide);
  } else {
    // Desktop - allow all 4 sides
    do {
      side = Math.floor(Math.random() * 4);
    } while (side === lastSide);
  }

  lastSide = side;
  let newX, newY;
  if (side === 0) {
    // Left
    newX = envelopeRect.left - btnRect.width - gap;
    newY = envelopeRect.top + Math.random() * (envelopeRect.height - btnRect.height);
  }
  if (side === 1) {
    // Right
    newX = envelopeRect.right + gap;
    newY = envelopeRect.top + Math.random() * (envelopeRect.height - btnRect.height);
  }
  if (side === 2) {
    // Top
    newX = envelopeRect.left + Math.random() * (envelopeRect.width - btnRect.width);
    newY = envelopeRect.top - btnRect.height - gap;
  }
  if (side === 3) {
    // Bottom
    newX = envelopeRect.left + Math.random() * (envelopeRect.width - btnRect.width);
    newY = envelopeRect.bottom + gap;
  }

  newX = Math.max(10, Math.min(newX, window.innerWidth - btnRect.width - 10));
  newY = Math.max(10, Math.min(newY, window.innerHeight - btnRect.height - 10));

  noBtn.style.left = newX + "px";
  noBtn.style.top = newY + "px";
});


function beginStoryTransition() {

  const finalScreen = document.getElementById("finalScreen");
  if (finalScreen) {
    finalScreen.classList.add("hidden");
  }

  const transition = document.getElementById("storyTransition");
  transition.style.display = "flex";

  const line1 = document.getElementById("storyLine1");
  const line2 = document.getElementById("storyLine2");
  const line3 = document.getElementById("storyLine3");

  // Reset opacity (in case of reload)
  line1.style.opacity = "0";
  line2.style.opacity = "0";
  line3.style.opacity = "0";

  // Line 1
  setTimeout(() => {
    line1.style.opacity = "1";
  }, 500);

  // Line 2
  setTimeout(() => {
    line2.style.opacity = "1";
  }, 2500);

  // Line 3 (after pause)
  setTimeout(() => {
    line3.style.opacity = "1";
  }, 5500);

  // Transition to grid
  setTimeout(() => {

    // Fade out story text
    line1.style.opacity = "0";
    line2.style.opacity = "0";
    line3.style.opacity = "0";

    // Slowly restore background brightness
    const dim = document.getElementById("dimOverlay");
    dim.style.opacity = "0";

    setTimeout(() => {
      transition.style.display = "none";
      showGridScreen();
    }, 2000);

  }, 10000);

}


function initializeGrid() {

  const title = document.querySelector(".grid-title");
  title.classList.remove("show");

  setTimeout(() => {
    title.classList.add("show");
  }, 300);

  const gridContainer = document.querySelector(".grid-container");
  gridContainer.innerHTML = "";

  Object.keys(stageData).forEach((year, index) => {

    const div = document.createElement("div");
    div.classList.add("envelope-item");

    div.innerHTML = `
      <div class="env-visual">
        <div class="env-body"></div>
        <div class="env-flap"></div>
        <span class="env-year">${year}</span>
      </div>
    `;


    if (year === "2026") {
      div.classList.add("locked");
    }

    div.addEventListener("click", () => {
      if (div.classList.contains("locked")) return;
      openStage(year);
    });

    div.classList.remove("show");   // ensure hidden state
    gridContainer.appendChild(div);

    // force initial state
    void div.offsetWidth;

    setTimeout(() => {
      div.classList.add("show");
    }, 600 + index * 180);    
      
  });
}


function showGridScreen() {
  const grid = document.getElementById("gridScreen");
  grid.classList.add("show-screen");
  initializeGrid();
}


function openStage(year) {

  const data = stageData[year];
  const grid = document.getElementById("gridScreen");
  const stage = document.getElementById("stageScreen");

  const clickedEnvelope = [...document.querySelectorAll(".envelope-item")]
    .find(el => el.querySelector(".env-year").textContent === year);

  clickedEnvelope.classList.add("opening");

  // Slight delay for flap animation
  setTimeout(() => {
    grid.style.transition = "opacity 0.8s ease";
    grid.style.opacity = "0";
  }, 500);

  setTimeout(() => {
    grid.classList.remove("show-screen");
    grid.style.opacity = "1";
    stage.classList.add("show-screen");
  }, 1300);

  const titleEl = document.getElementById("stageTitle");
  const captionEl = document.getElementById("stageCaption");
  const buttonsEl = document.querySelector(".stage-buttons");

  // Reset visibility
  titleEl.classList.remove("stage-visible");
  captionEl.classList.remove("stage-visible");
  buttonsEl.classList.remove("stage-visible");

  // Title first
  setTimeout(() => {
    titleEl.classList.add("stage-visible");
  }, 200);

  // Caption second
  setTimeout(() => {
    captionEl.classList.add("stage-visible");
  }, 800);

  // Buttons after photos
  setTimeout(() => {
    buttonsEl.classList.add("stage-visible");
  }, 1200 + data.photos.length * 400);

  document.getElementById("stageTitle").textContent = `${year}: ${data.title}`;
  document.getElementById("stageYear").style.display = "none";
  document.getElementById("stageCaption").textContent = data.caption;

  const photoContainer = document.querySelector(".photo-container");
  photoContainer.innerHTML = "";

  data.photos.forEach((photo, index) => {

    const img = document.createElement("img");
    img.src = `assets/photos/${year}/${photo}`;
    img.style.setProperty("--rotate", (Math.random()*10 - 5) + "deg");

    photoContainer.appendChild(img);

    setTimeout(() => {
      img.classList.add("show");
    }, index * 400);

  });

  if (year !== "2026") {
    openedYears.add(year);
    markEnvelopeOpened(year);
    checkUnlock2026();
  }
}


function markEnvelopeOpened(year) {
  const envelopes = document.querySelectorAll(".envelope-item");
  envelopes.forEach(el => {
    if (el.querySelector(".env-year")?.textContent === year) {
      el.classList.add("opened");
    }
  });
}

function checkUnlock2026() {
  if (openedYears.size === 8) {
    const envelopes = document.querySelectorAll(".envelope-item");
    envelopes.forEach(el => {
      if (el.querySelector(".env-year")?.textContent === "2026") {
        el.classList.remove("locked");
      }
    });
  }
}


document.getElementById("backToGrid").addEventListener("click", () => {
  document.getElementById("stageScreen").classList.remove("show-screen");
  document.getElementById("gridScreen").classList.add("show-screen");
});

document.getElementById("nextStage").addEventListener("click", () => {

  const currentYear = document.getElementById("stageYear").textContent;
  const years = Object.keys(stageData);
  const index = years.indexOf(currentYear);

  if (index < years.length - 1) {
    const nextYear = years[index + 1];

    const lockedEnvelope = document.querySelector(
      `.envelope-item.locked`
    );

    if (nextYear === "2026" && lockedEnvelope) return;

    openStage(nextYear);
  }
});
