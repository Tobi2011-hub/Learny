// Personalize the celebration screen.
const completeProfile = getProfile();
const nameTarget = document.querySelector("#userName");

if (nameTarget) {
  nameTarget.textContent = completeProfile.firstName || "Learner";
}

// Light confetti effect using DOM elements.
const confetti = document.querySelector("#confetti");
if (confetti) {
  const pieces = Array.from({ length: 28 }, (_, index) => {
    const piece = document.createElement("span");
    piece.className = "confetti-piece text-xl";
    piece.textContent = index % 3 === 0 ? "✦" : "•";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDelay = `${Math.random() * 1.8}s`;
    piece.style.animationDuration = `${2.2 + Math.random() * 2}s`;
    return piece;
  });
  confetti.append(...pieces);
}
