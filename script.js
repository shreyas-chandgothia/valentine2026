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
    photos: ["img1.jpg","img2.jpg","img3.jpg","img4.jpeg","img5.jpg","img6.jpg","img7.jpg","img8.jpeg"]
  },
  2019: {
    title: "Becoming Us",
    caption: "From hello to something more.",
    photos: ["img1.jpg","img2.jpeg","img3.jpeg","img4.jpg","img5.jpg","img6.jpg","img7.jpeg","img8.jpeg","img9.jpg","img10.jpg"]
  },
  2020: {
    title: "The World Paused",
    caption: "The world shut down. We didn’t.",
    photos: ["img1.jpg","img2.jpg","img3.jpg","img4.jpg","img5.jpg","img6.jpg","img7.jpg","img8.jpg","img9.jpg","img10.jpg"]
  },
  2021: {
    title: "Holding On",
    caption: "Screens, silence, stubborn love.",
    photos: ["img1.jpg","img2.jpg","img3.jpg","img4.jpg","img5.jpg","img6.jpg","img7.jpg","img8.jpeg","img9.jpg","img10.jpg"]
  },
  2022: {
    title: "Two Continents",
    caption: "You chased stars. I stayed back.",
    photos: ["img1.jpg","img2.jpg","img3.jpg","img4.jpg","img5.jpg","img6.jpg","img7.jpg","img8.jpg","img9.jpg","img10.jpg"]
  },
  2023: {
    title: "Becoming Ourselves",
    caption: "Different cities. Same heartbeat.",
    photos: ["img1.jpg","img2.jpg","img3.jpg","img4.jpg","img5.jpg","img6.jpg","img7.jpg","img8.jpg","img9.jpg","img10.jpg"]
  },
  2024: {
    title: "Still Choosing Us",
    caption: "Not perfect. Just persistent.",
    photos: ["img1.jpg","img2.jpg","img3.jpg","img4.jpg","img5.jpg","img6.jpg","img7.png","img8.jpeg","img9.jpg","img10.jpg"]
  },
  2025: {
    title: "Almost There",
    caption: "Planning futures across time zones.",
    photos: ["img1.jpg","img2.jpg","img3.jpg","img4.jpg","img5.jpg","img6.jpg","img7.jpg","img8.jpg","img9.jpg","img10.jpg"]
  },
  2026: {
    title: "The Future",
    caption: "The next chapter isn’t written yet.\nBut I know who it’s with.",
    photos: []
  }
  
};

let openedYears = new Set();
let currentStageYear = null;



// =========================
// AUDIO
// =========================

function startMusic() {
  if (musicStarted) return;

  romanticMusic.volume = 0;
  romanticMusic.play();
  musicStarted = true;

  let fade = setInterval(() => {
    if (romanticMusic.volume < 0.25) {
      romanticMusic.volume += 0.01;
    } else {
      clearInterval(fade);
    }
  }, 120);

  // Show music button
  const musicBtn = document.getElementById("musicToggle");
  musicBtn.classList.remove("hidden");

  // Force reflow
  void musicBtn.offsetWidth;

  musicBtn.classList.add("show");
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

  // Immediately freeze No button to prevent jump glitch
  noBtn.style.transition = "none";
  noBtn.style.pointerEvents = "none";
  noBtn.style.opacity = "0";

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
    noBtn.innerHTML = "<strong>No</strong> (You sure? 😋)";
    noBtn.style.backgroundColor = "white";
    noBtn.style.color = "#ff4d6d";
  } else if (noClickCount === 2) {
    noBtn.innerHTML = "<strong>No</strong> (Think again 😘)";
  } else if (noClickCount === 3) {
    noBtn.innerHTML = "<strong>No</strong> (Being naughty? 😏)";
  } else if (noClickCount === 4) {
    noBtn.innerHTML = "<strong>No</strong> (Determined huh? 🤭)";
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

    // TEMP DEBUG — allow 2026 to open immediately
    if (year === "2026") {
      div.classList.add("locked");
    }

    div.addEventListener("click", () => {
      if (div.classList.contains("locked")) return;
      openStage(year, true);
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


function openStage(year, fromGrid = true) {

  const data = stageData[year];
  currentStageYear = String(year);

  const grid = document.getElementById("gridScreen");
  const stage = document.getElementById("stageScreen");

  const clickedEnvelope = [...document.querySelectorAll(".envelope-item")]
    .find(el => el.querySelector(".env-year").textContent === year);

  clickedEnvelope.classList.add("opening");

  const titleEl = document.getElementById("stageTitle");
  const captionEl = document.getElementById("stageCaption");
  const buttonsEl = document.querySelector(".stage-buttons");
  const photoContainer = document.querySelector(".photo-container");
  
  const stageContent = document.querySelector(".stage-content");

  // Temporarily disable transitions
  stageContent.classList.add("no-transition");
  
  titleEl.classList.remove("stage-visible");
  captionEl.classList.remove("stage-visible");
  buttonsEl.classList.remove("stage-visible");
  photoContainer.innerHTML = "";
  
  // Force reflow to lock state
  void stageContent.offsetHeight;
  
  // Re-enable transitions
  stageContent.classList.remove("no-transition");
  

  if (fromGrid) {

    // Grid → Stage animation
    setTimeout(() => {
      grid.style.transition = "opacity 0.8s ease";
      grid.style.opacity = "0";
    }, 500);
  
    setTimeout(() => {
      grid.classList.remove("show-screen");
      grid.style.opacity = "1";
      stage.classList.add("show-screen");
    }, 1300);
  
  } else {
  
    // Already inside stage (Next Chapter)
    stage.classList.add("show-screen");
  
  }  
  
  document.getElementById("stageTitle").textContent = `${year}: ${data.title}`;
  document.getElementById("stageYear").style.display = "none";

  if (year === "2026") {
    captionEl.innerHTML = `
      <div class="future-line line1">The next chapter isn’t written yet.</div>
      <div class="future-line line2">But I know who it’s with.</div>
    `;
  } else {
    captionEl.textContent = data.caption;
  }
  

  // Different base delay depending on entry type
  const baseDelay = fromGrid ? 2000 : 1000;

  // Title
  setTimeout(() => {
    titleEl.classList.add("stage-visible");
  }, baseDelay);

  if (year === "2026") {

    // First make the caption container visible
    setTimeout(() => {
      captionEl.classList.add("stage-visible");
    }, baseDelay + 1800);
  
    const line1 = captionEl.querySelector(".line1");
    const line2 = captionEl.querySelector(".line2");
  
    setTimeout(() => {
      line1.classList.add("visible");
    }, baseDelay + 2000);
  
    setTimeout(() => {
      line2.classList.add("visible");
    }, baseDelay + 5000);
  
  } else {
  
  
    setTimeout(() => {
      captionEl.classList.add("stage-visible");
    }, baseDelay + 2000);
  
  }
  

  // ----- Dynamic Grid Layout -----

  const photoCount = data.photos.length;
  let columns;

  if (photoCount <= 6) columns = 3;
  else if (photoCount === 7 || photoCount === 8) columns = 4;
  else columns = 5;

  photoContainer.style.gridTemplateColumns = `repeat(${columns}, max-content)`;

  
  // Photos
  data.photos.forEach((photo, index) => {

    const img = document.createElement("img");
    img.src = `photos/${year}/${photo}`;
    img.style.setProperty("--rotate", (Math.random()*10 - 5) + "deg");

    photoContainer.appendChild(img);

    setTimeout(() => {
      img.classList.add("show");
    }, baseDelay + 4000 + index * 1000);

  });


  // Buttons
  if (year === "2026") {

    setTimeout(() => {
      buttonsEl.classList.add("stage-visible");
    }, baseDelay + 8000);
  
  } else {
  
    setTimeout(() => {
      buttonsEl.classList.add("stage-visible");
    }, baseDelay + 4000 + data.photos.length * 1000 + 1000);
  
  }
  
  

  if (year !== "2026") {
    openedYears.add(year);
    markEnvelopeOpened(year);
    checkUnlock2026();
  }

  const nextBtn = document.getElementById("nextStage");

  if (year === "2026") {
    nextBtn.textContent = "Turn the Final Page ➡";
  } else {
    nextBtn.textContent = "Next Chapter ➡";
  }
  

  if (year === "2025" && document.querySelector(".envelope-item.locked")) {
    nextBtn.disabled = true;
    nextBtn.style.opacity = "0.5";
    nextBtn.style.cursor = "not-allowed";
  } else {
    nextBtn.disabled = false;
    nextBtn.style.opacity = "1";
    nextBtn.style.cursor = "pointer";
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

  fadeOutStage(() => {
    document.getElementById("stageScreen").classList.remove("show-screen");
    document.getElementById("gridScreen").classList.add("show-screen");
  });

});


document.getElementById("nextStage").addEventListener("click", () => {

  if (currentStageYear === "2026") {
    fadeOutStage(() => {
      showPrePoemScreen();
    });
    return;
  }
  

  const years = Object.keys(stageData);
  const index = years.indexOf(currentStageYear);

  if (index === -1 || index >= years.length - 1) return;

  const nextYear = years[index + 1];

  const lockedEnvelope = document.querySelector(".envelope-item.locked");

  if (nextYear === "2026" && lockedEnvelope) return;

  fadeOutStage(() => {
    openStage(nextYear, false);
  });

});


document.getElementById("readPoemBtn").addEventListener("click", () => {

  const prePoem = document.getElementById("prePoemScreen");

  // Fade it out first
  prePoem.style.opacity = "0";

  setTimeout(() => {
    prePoem.classList.remove("show-screen");
    prePoem.style.opacity = "1";   // reset for future use
    launchPoem();
  }, 1200);   // match CSS transition duration

});




function fadeOutStage(callback) {

  const stage = document.getElementById("stageScreen");

  stage.style.transition = "opacity 0.8s ease";
  stage.style.opacity = "0";

  setTimeout(() => {

    stage.classList.remove("show-screen");   // ← THIS WAS MISSING
    stage.style.opacity = "1";               // reset for next time

    callback();

  }, 800);
}



// =========================
// MUSIC TOGGLE
// =========================

const musicToggle = document.getElementById("musicToggle");

musicToggle.addEventListener("click", () => {

  if (romanticMusic.paused) {

    // Fade back in from current timestamp
    romanticMusic.volume = 0;
    romanticMusic.play();

    let fade = setInterval(() => {
      if (romanticMusic.volume < 0.25) {
        romanticMusic.volume += 0.01;
      } else {
        clearInterval(fade);
      }
    }, 120);

    musicToggle.textContent = "🔊";

  } else {

    romanticMusic.pause();
    musicToggle.textContent = "🔇";

  }

});


function launchPoem() {

  const stage = document.getElementById("stageScreen");
  const poemScreen = document.getElementById("poemScreen");
  const poemText = document.getElementById("poemText");
  const dim = document.getElementById("dimOverlay");

  stage.classList.remove("show-screen");

  // First: darken background
  dim.style.opacity = "0.6";

  // Lower music smoothly
  let fade = setInterval(() => {
    if (romanticMusic.volume > 0.04) {
      romanticMusic.volume -= 0.01;
    } else {
      clearInterval(fade);
    }
  }, 100);

  // WAIT for dim to finish before showing poem
  setTimeout(() => {

    poemScreen.classList.add("show-screen");

    const poemTitle = poemScreen.querySelector("h2");

    // Hide title initially
    poemTitle.style.opacity = "0";
    poemTitle.style.transform = "translateY(20px)";

    // Fade title in
    setTimeout(() => {
      poemTitle.style.transition = "opacity 1.2s ease, transform 1.2s ease";
      poemTitle.style.opacity = "1";
      poemTitle.style.transform = "translateY(0)";
    }, 300);

  }, 2000);  // matches dimOverlay transition time


  poemText.innerHTML = "";

  // Define stanzas FIRST
  const stanzas = [
  `We met by chance, far from our own,
  Two Chandigarh hearts in Bombay alone.
  A random hello, a lingering glance,
  No clue that fate had already planned our chance.`,
  
  `From crowded mess halls to midnight air,
  From stolen smiles to an unspoken care.
  Somewhere between those college days,
  Love found its quiet, stubborn ways.`,
  
  `Then distance arrived, uninvited, unfair,
  Easy hours together grew suddenly rare.
  Words felt heavier, silences grew,
  Needless fights crept in, and doubts did too.`,
  
  `From hugs and kisses to screens so cold,
  From hands once held to stories told,
  Distance stretched what words could do,
  Yet every road still led to you.`,
  
  `In every crowd and passing scene,
  It’s you who stays my constant theme.
  What I come back to, night after night,
  Has always been you, my steady light.`,
  
  `I know I’ve failed to show it good,
  And made you question where you stood.
  Not lacking in love, just how I expressed,
  But know that, with you, my life is blessed.`,
  
  `You feared the world might take your place,
  I feared love shrinking into a cage.
  But truth is simpler, calmer, sincere,
  We stay by choice, not force, not fear.`,
  
  `You chased the stars, I built my ground,
  Different paths, but same heartbeat sound.
  Once or twice a year, we steal our time,
  A few short weeks, like a perfect chime.`,
  
  `Now roads converge, the wait feels small,
  Soon love won’t live through screens at all.
  No more airport goodbyes, no more flights,
  Just morning coffees and shared goodnights.`,
  
  `So here’s my answer, plain and true,
  Not loud, not grand, I choose you.
  In every place, in all I do,
  It’s always been, and will always be you.`
  ];
  
  // Create two columns
  const leftColumn = document.createElement("div");
  const rightColumn = document.createElement("div");
  
  leftColumn.style.display = "flex";
  leftColumn.style.flexDirection = "column";
  leftColumn.style.gap = "28px";
  
  rightColumn.style.display = "flex";
  rightColumn.style.flexDirection = "column";
  rightColumn.style.gap = "28px";
  
  poemText.appendChild(leftColumn);
  poemText.appendChild(rightColumn);
  
  // Render stanzas
  stanzas.forEach((text, index) => {
  
    const stanzaDiv = document.createElement("div");
    stanzaDiv.classList.add("stanza");
    stanzaDiv.innerText = text;
  
    if (index < 5) {
      leftColumn.appendChild(stanzaDiv);
    } else {
      rightColumn.appendChild(stanzaDiv);
    }
  
    setTimeout(() => {
      stanzaDiv.classList.add("visible");
    }, 4000 + index * 1000);
  
  });

  // Add Continue Button
  setTimeout(() => {

    const continueBtn = document.createElement("button");
    continueBtn.innerText = "Continue ➡ ❤️";
    continueBtn.classList.add("poem-continue-btn");

    const poemScreen = document.getElementById("poemScreen");
    poemScreen.appendChild(continueBtn);

    // Force initial state
    void continueBtn.offsetWidth;
    
    setTimeout(() => {
      continueBtn.classList.add("visible");
    }, 100);
    
    continueBtn.addEventListener("click", endPoem);
    

  }, 4000 + stanzas.length * 1000 + 1000);

}


function showPrePoemScreen() {

  const prePoem = document.getElementById("prePoemScreen");
  const line = prePoem.querySelector(".pre-poem-line");
  const btn = document.getElementById("readPoemBtn");

  prePoem.classList.add("show-screen");

  // Reset initial state
  line.style.opacity = "0";
  line.style.transform = "translateY(20px)";
  btn.style.opacity = "0";
  btn.style.transform = "translateY(20px)";

  // Fade in line first
  setTimeout(() => {
    line.style.transition = "opacity 1.2s ease, transform 1.2s ease";
    line.style.opacity = "1";
    line.style.transform = "translateY(0)";
  }, 1000);

  // Then button
  setTimeout(() => {
    btn.style.transition = "opacity 1.2s ease, transform 1.2s ease";
    btn.style.opacity = "1";
    btn.style.transform = "translateY(0)";
  }, 3000);

}


function endPoem() {

  const poemScreen = document.getElementById("poemScreen");
  const dim = document.getElementById("dimOverlay");

  poemScreen.style.transition = "opacity 1.5s ease";
  poemScreen.style.opacity = "0";

  setTimeout(() => {

    poemScreen.classList.remove("show-screen");
    poemScreen.style.opacity = "1";

    // Remove dim
    dim.style.opacity = "0";

    // Raise music volume
    let fade = setInterval(() => {
      if (romanticMusic.volume < 0.25) {
        romanticMusic.volume += 0.01;
      } else {
        clearInterval(fade);
      }
    }, 120);

    setTimeout(() => {
      showFinalClosing();
    }, 1500);
    

  }, 1500);
}

function showFinalClosing() {

  const closing = document.getElementById("closingScreen");
  closing.classList.add("show-screen");

  const lines = closing.querySelectorAll(".line1, .line2, .line3, .line4");

  lines.forEach((line, index) => {
    setTimeout(() => {
      line.classList.add("closing-visible");
    }, 1000 + index * 2000);
  });

}

