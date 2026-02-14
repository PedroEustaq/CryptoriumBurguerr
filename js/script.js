const track = document.getElementById("track");
const imgUrls = [
  "https://i.pinimg.com/736x/1a/3a/5a/1a3a5a4aa505042bcf531eb8b1b204e7.jpg",
  "https://i.pinimg.com/736x/11/6e/98/116e9875f720a25a50c4aac456f50bdd.jpg",
  "https://i.pinimg.com/736x/f1/aa/78/f1aa78fa0a5e63c633915b5bb82fb836.jpg",
  "https://i.pinimg.com/736x/88/53/b0/8853b0d68a2e62c1053ea7a089794600.jpg",
  "https://i.pinimg.com/736x/37/5f/97/375f977b344a6cc3ef7a16e9621e3b4d.jpg",
  "https://i.pinimg.com/1200x/75/1f/4b/751f4b56cc5edcc68119b0ee6af50014.jpg",
  "https://i.pinimg.com/736x/b8/2a/d1/b82ad1c3f653eec4f70bd080ef36d7f0.jpg"
];

let currentIndex = Math.floor(imgUrls.length / 2);
const angleStep = 22; // Distance between cards in degrees

// Initialize Cards
imgUrls.forEach((url, i) => {
  const card = document.createElement("div");
  card.className = "card";
  card.style.backgroundImage = `url(${url})`;
  track.appendChild(card);
});

const cards = document.querySelectorAll(".card");

function updateCards() {
  cards.forEach((card, i) => {
    // Calculate the rotation for THIS card based on the current center index
    const cardRotation = (i - currentIndex) * angleStep;

    card.style.transform = `rotate(${cardRotation}deg)`;

    // Toggle active classes
    if (i === currentIndex) {
      card.classList.add("active");
    } else {
      card.classList.remove("active");
    }
  });
}

function move(dir) {
  const newIndex = currentIndex + dir;
  if (newIndex >= 0 && newIndex < imgUrls.length) {
    currentIndex = newIndex;
    updateCards();
  }
}

// Run on load
updateCards();

// Mouse Wheel
let lastScroll = 0;
window.addEventListener("wheel", (e) => {
  if (Date.now() - lastScroll < 600) return;
  lastScroll = Date.now();
  move(e.deltaY > 0 ? 1 : -1);
});
