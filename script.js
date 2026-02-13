const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const envelope = document.getElementById("envelope");
const bubble = document.getElementById("bubble");
const romanticMusic = document.getElementById("romanticMusic");

let musicStarted = false;
let noClickCount = 0;
let currentSide = "right";
let lastSide = null;



/* ---- MUSIC FADE IN ---- */

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

document.addEventListener("click", startMusic);

/* ---- YES CLICK ---- */

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

});

/* ---- NO CLICK ---- */

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
  do {
    side = Math.floor(Math.random() * 4);
  } while (side === lastSide);

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

  noBtn.style.left = newX + "px";
  noBtn.style.top = newY + "px";

  noBtn.classList.add("move-playful");

});
