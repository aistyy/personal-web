//https://codepen.io/Kcreation-MTech/pen/JjgqWQg?editors=1010

const confettiAmount = 300;

document.addEventListener("DOMContentLoaded", () => {
  const confettiCanvas = document.getElementById("confetti");
  const ctx = confettiCanvas.getContext("2d");

  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  const confettis = [];
  const colors = ["#FF007A", "#7A00FF", "#00FF7A", "#FFD700", "#00D4FF"];

  function createConfetti() {
    const confetti = {
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: Math.random() * 3 - 1.5,
      speedY: Math.random() * 5,
      rotation: Math.random() * 360,
    };
    confettis.push(confetti);
  }

  for (let i = 0; i < confettiAmount; i++) {
    createConfetti();
  }

  function animateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettis.forEach((confetti, index) => {
      confetti.x += confetti.speedX;
      confetti.y += confetti.speedY;
      confetti.rotation += confetti.speedX;

      ctx.save();
      ctx.translate(confetti.x, confetti.y);
      ctx.rotate((confetti.rotation * Math.PI) / 180);
      ctx.fillStyle = confetti.color;
      ctx.fillRect(
        -confetti.size / 2,
        -confetti.size / 2,
        confetti.size,
        confetti.size
      );
      ctx.restore();

      if (confetti.y > confettiCanvas.height) {
        confettis.splice(index, 1);
      }
    });

    if (confettis.length > 0) {
      requestAnimationFrame(animateConfetti);
    }
  }
  const contactForm = document.getElementById("contact-form");
  contactForm.addEventListener("submit", animateConfetti);
});
