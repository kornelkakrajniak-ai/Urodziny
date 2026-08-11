/* =========================================
   TAJNY KOD
========================================= */

const correctCode = "1012";
let enteredCode = "";

const dots = document.querySelectorAll("#dots span");
const error = document.getElementById("error");


/* =========================================
   KLAWIATURA
========================================= */

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle(
            "filled",
            index < enteredCode.length
        );
    });
}


function press(number) {
    if (enteredCode.length >= 4) return;

    enteredCode += number;
    updateDots();

    error.textContent = "";
}


function erase() {
    enteredCode = enteredCode.slice(0, -1);
    updateDots();

    error.textContent = "";
}


/* =========================================
   SPRAWDZANIE KODU
========================================= */

function checkCode() {

    if (enteredCode === correctCode) {

        error.textContent = "";

        createConfetti();

        const loginScreen =
            document.getElementById("login-screen");

        const giftScreen =
            document.getElementById("gift-screen");

        loginScreen.style.opacity = "0";
        loginScreen.style.transform = "scale(.96)";

        setTimeout(() => {

            loginScreen.classList.remove("active");

            giftScreen.classList.add("active");

            giftScreen.style.opacity = "0";
            giftScreen.style.transform = "scale(1.04)";

            setTimeout(() => {

                giftScreen.style.opacity = "1";
                giftScreen.style.transform = "scale(1)";

            }, 50);

        }, 700);

    } else {

        error.textContent = "Niepoprawny kod ❤️";

        const card =
            document.querySelector(".card");

        card.classList.add("shake");

        setTimeout(() => {
            card.classList.remove("shake");
        }, 450);

        enteredCode = "";
        updateDots();
    }
}


/* =========================================
   PREZENTY
========================================= */

const gifts = {
    1: "Nocleg w Zadarze",
    2: "Bilety do Energylandii",
    3: "Świetne towarzystwo ❤️"
};


function openGift(number) {

    const giftElements =
        document.querySelectorAll(".gift");

    const selectedGift =
        giftElements[number - 1];

    /*
       Animacja otwierania pudełka
    */

    selectedGift.classList.add("opened");

    setTimeout(() => {

        document.getElementById("giftTitle").textContent =
            gifts[number];

        document
            .getElementById("popup")
            .classList.add("show");

        createSmallConfetti();

    }, 650);
}


/* =========================================
   ZAMYKANIE PREZENTU
========================================= */

function closePopup() {

    document
        .getElementById("popup")
        .classList.remove("show");

    document
        .querySelectorAll(".gift")
        .forEach(gift => {
            gift.classList.remove("opened");
        });
}


/* =========================================
   SERDUSZKA W TLE
========================================= */

function createHeart() {

    const heartsContainer =
        document.querySelector(".hearts");

    if (!heartsContainer) return;

    const heart =
        document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML = "♥";

    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        (10 + Math.random() * 20) + "px";

    heart.style.animationDuration =
        (6 + Math.random() * 6) + "s";

    heart.style.opacity =
        .2 + Math.random() * .4;

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 13000);
}


/*
   Tworzymy serduszka regularnie
*/

setInterval(createHeart, 650);


/* =========================================
   KONFETTI
========================================= */

function createConfetti() {

    const symbols = [
        "♥",
        "❤",
        "♡",
        "✦",
        "✧"
    ];

    for (let i = 0; i < 45; i++) {

        const confetti =
            document.createElement("div");

        confetti.innerHTML =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        confetti.style.position = "fixed";
        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.top = "-30px";

        confetti.style.zIndex = "100";

        confetti.style.fontSize =
            (12 + Math.random() * 18) + "px";

        confetti.style.color =
            [
                "#ffffff",
                "#ff8fc4",
                "#ff4f9a",
                "#d8b4fe"
            ][
                Math.floor(Math.random() * 4)
            ];

        confetti.style.pointerEvents = "none";

        const duration =
            2 + Math.random() * 3;

        confetti.style.transition =
            `top ${duration}s linear,
             transform ${duration}s ease-in`;

        document.body.appendChild(confetti);

        requestAnimationFrame(() => {

            confetti.style.top =
                "110vh";

            confetti.style.transform =
                `rotate(${Math.random() * 720 - 360}deg)`;

        });

        setTimeout(() => {
            confetti.remove();
        }, duration * 1000 + 100);
    }
}


/* =========================================
   MAŁE KONFETTI PO OTWARCIU PREZENTU
========================================= */

function createSmallConfetti() {

    for (let i = 0; i < 18; i++) {

        const piece =
            document.createElement("div");

        piece.innerHTML = "♥";

        piece.style.position = "fixed";
        piece.style.left = "50%";
        piece.style.top = "50%";

        piece.style.zIndex = "200";

        piece.style.color =
            [
                "#ff4f9a",
                "#a855f7",
                "#ffffff"
            ][Math.floor(Math.random() * 3)];

        piece.style.fontSize =
            (10 + Math.random() * 12) + "px";

        piece.style.pointerEvents = "none";

        document.body.appendChild(piece);

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            80 + Math.random() * 130;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        piece.animate(
            [
                {
                    transform: "translate(-50%, -50%) scale(0)",
                    opacity: 1
                },
                {
                    transform:
                        `translate(
                            calc(-50% + ${x}px),
                            calc(-50% + ${y}px)
                        ) scale(1)`,
                    opacity: 0
                }
            ],
            {
                duration: 900,
                easing: "cubic-bezier(.2,.8,.2,1)"
            }
        );

        setTimeout(() => {
            piece.remove();
        }, 900);
    }
}
