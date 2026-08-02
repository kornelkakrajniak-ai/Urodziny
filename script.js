const correctCode = "1012";

let enteredCode = "";

const dots = document.querySelectorAll("#dots span");

function updateDots() {
    dots.forEach((dot, index) => {
        if (index < enteredCode.length) {
            dot.classList.add("filled");
        } else {
            dot.classList.remove("filled");
        }
    });
}

function press(number) {
    if (enteredCode.length >= 4) return;

    enteredCode += number;
    updateDots();
}

function erase() {
    enteredCode = enteredCode.slice(0, -1);
    updateDots();
}

function checkCode() {

    const error = document.getElementById("error");

    if (enteredCode === correctCode) {

        document
            .getElementById("login-screen")
            .classList.remove("active");

        document
            .getElementById("gift-screen")
            .classList.add("active");

        error.textContent = "";

    } else {

        error.textContent = "Niepoprawny kod";

        enteredCode = "";

        updateDots();
    }

}

const gifts = {
    1: "🌊 Nocleg w Zadarze",
    2: "🎢 Bilety do Energylandii",
    3: "❤️ Świetne towarzystwo"
};

function openGift(number){

    document.getElementById("giftTitle").innerHTML = gifts[number];

    document.getElementById("popup").classList.add("show");

}

function closePopup(){

    document.getElementById("popup").classList.remove("show");

}
