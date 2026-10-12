
const openButton = document.getElementById("openLetter");
const buttonText = document.getElementById("buttonText");
const letter = document.getElementById("letterPaper");

let isOpen = false;

// Awalnya surat tertutup, agar Restii bisa membukanya sendiri.
document.body.classList.add("closed");
letter.setAttribute("aria-hidden", "true");
openButton.setAttribute("aria-expanded", "false");

openButton.addEventListener("click", () => {
  isOpen = !isOpen;

  document.body.classList.toggle("closed", !isOpen);

  buttonText.textContent = isOpen
    ? "Close your letter"
    : "Open your letter";

  openButton.setAttribute("aria-expanded", String(isOpen));
  letter.setAttribute("aria-hidden", String(!isOpen));

  if (isOpen) {
    setTimeout(() => {
      document.getElementById("letter").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 100);
  } else {
    document.getElementById("top").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
});

// Pesawat kertas melintas sesekali.
function sendPaperPlane() {
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const plane = document.createElement("div");

  plane.className = "flyby-plane";
  plane.textContent = "✈";
  plane.setAttribute("aria-hidden", "true");

  document.body.appendChild(plane);

  setTimeout(() => plane.remove(), 9000);
}

// Gaya animasi pesawat.
const planeStyle = document.createElement("style");

planeStyle.textContent = `
  .flyby-plane {
    position: fixed;
    z-index: 5;
    left: -50px;
    top: 30%;
    color: rgba(76, 125, 169, 0.8);
    font-size: 24px;
    pointer-events: none;
    animation: fly-across 9s linear forwards;
  }

  @keyframes fly-across {
    0% {
      left: -50px;
      top: 30%;
      opacity: 0;
      transform: rotate(-15deg);
    }

    10% {
      opacity: 0.9;
    }

    50% {
      top: 24%;
    }

    90% {
      opacity: 0.8;
    }

    100% {
      left: calc(100vw + 50px);
      top: 18%;
      opacity: 0;
      transform: rotate(-15deg);
    }
  }
`;

document.head.appendChild(planeStyle);

// Muncul pertama kali setelah 18 detik,
// kemudian setiap 65 detik.
setTimeout(() => {
  sendPaperPlane();
  setInterval(sendPaperPlane, 65000);
}, 18000);
