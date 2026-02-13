const envelope = document.getElementById("envelope");

if (envelope) {
    envelope.addEventListener("click", () => {
        envelope.classList.add("open");

        setTimeout(() => {
            window.location.href = "main.html";
        }, 650);
    });
}

function goBack() {
    window.location.href = "index.html";
}
const noBtn = document.getElementById("noBtn");
const popup = document.getElementById("popup");

const messages = [
    "Are you sure? 🥺",
    "WEHHH?? 😭",
    "sure ka na talaga?💔",
    "ansakit huhu 😢",
    "Please say yes ❤️",
    "Last chance 😳"
];

let count = 0;
let scale = 1; // button size
let popupTime = 2000;

/* YES → open letter */
/* YES → hearts + confetti + redirect */
function sayYes() {
    startConfetti();

    setTimeout(() => {
        window.location.href = "main.html";
    }, 800); // wait so they see the celebration
}


/* NO button behavior */
if (noBtn) {
    noBtn.addEventListener("click", () => {

        /* MESSAGE */
        popup.textContent = messages[count % messages.length];
        popup.classList.add("show");

        setTimeout(() => {
            popup.classList.remove("show");
        }, popupTime);

        popupTime += 100;

        /* SHRINK */
        scale -= 0.12;
        if (scale < 0.25) scale = 0.25;

        /* MOVE */
        const x = Math.random() * 160 - 80;
        const y = Math.random() * 100 - 50;

        noBtn.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;

        count++;
    });
}
/* =====================
   HEART CONFETTI
===================== */

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let particles = [];

function startConfetti() {
    particles = [];

    for (let i = 0; i < 120; i++) {
        particles.push({
            x: canvas.width / 2,
            y: canvas.height / 2,
            size: Math.random() * 8 + 6,
            speedX: (Math.random() - 0.5) * 10,
            speedY: (Math.random() - 0.7) * 10,
            gravity: 0.3,
            rotation: Math.random() * 360,
            type: Math.random() > 0.5 ? "heart" : "rect"
        });
    }

    animateConfetti();
}

function drawHeart(x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.bezierCurveTo(x, y - size/2, x - size, y - size/2, x - size, y);
    ctx.bezierCurveTo(x - size, y + size/2, x, y + size, x, y + size);
    ctx.bezierCurveTo(x, y + size, x + size, y + size/2, x + size, y);
    ctx.bezierCurveTo(x + size, y - size/2, x, y - size/2, x, y);
    ctx.fill();
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += p.gravity;
        p.rotation += 5;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);

        ctx.fillStyle = ["#ff4d6d", "#ff8fab", "#ffb3c6", "#ffffff"][i % 4];

        if (p.type === "heart") {
            drawHeart(0, 0, p.size);
        } else {
            ctx.fillRect(0, 0, p.size, p.size);
        }

        ctx.restore();
    });

    requestAnimationFrame(animateConfetti);
}
/* auto play music after first tap (mobile safe) */
const music = document.getElementById("bgMusic");

if (music) {
    document.addEventListener("click", () => {
        music.play();
    }, { once: true });
}
