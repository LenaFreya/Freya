const red = [
    "Mit dem Bösen im Bund.",
    "Sie bringt Unglück.",
    "Ein Verdacht wird zur Wahrheit.",
    "Sie muss bekennen.",
    "Die Gemeinschaft entscheidet.",
    "Schuld muss gefunden werden.",
    "Sie ist anders.",
    "Die Nachbarn wissen es."
];

const blue = [
    "Sie gehören nicht hierher.",
    "Die Anderen sind schuld.",
    "Wir gegen sie.",
    "Die Gefahr kommt von außen.",
    "Man kann ihnen nicht trauen.",
    "Sie zerstören unsere Ordnung.",
    "Angst wird verbreitet.",
    "Ein Feindbild verbindet."
];

const green = [
    "GLEICHE ANGST?",
    "WER BESTIMMT DIE SCHULD?",
    "ALTE MECHANISMEN",
    "NEUE WORTE",
    "ANGST WIRD MACHT",
    "WER SPRICHT DAS URTEIL?",
    "ARCHIV // AKTIV"
];

const container = document.getElementById("container");

const MAX_TEXTS = 25;
const activeTexts = [];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function createText() {

let color;
    let text;

    const r = Math.random();

    if (r < 0.4) {
        color = "red";
        text = randomItem(red);
    } else if (r < 0.8) {
        color = "blue";
        text = randomItem(blue);
    } else {
        color = "green";
        text = randomItem(green);
    }

    const div = document.createElement("div");

    div.classList.add("text");
    div.classList.add(color);

    if (color === "green") {
        div.classList.add("glitch");
    }

    let size;

 if (color === "green") {
        size = random(46, 82);
    } else {
        size = random(22, 42);
    }

    div.style.fontSize = size + "px";

    div.style.left = random(3, 70) + "%";
    div.style.top = random(3, 88) + "%";

    container.appendChild(div);

    activeTexts.push(div);

    while (activeTexts.length > MAX_TEXTS) {
        const oldest = activeTexts.shift();
        oldest.remove();
    }

    typeWriter(div, text);

    const lifetime = random(7000, 12000);

    setTimeout(() => {


    div.style.transition = "opacity 2s";

        div.style.opacity = "0";

        setTimeout(() => {

            div.remove();

            const i = activeTexts.indexOf(div);

            if (i > -1) activeTexts.splice(i, 1);

        }, 2000);

    }, lifetime);

}

function typeWriter(element, text) {
  let i = 0;

    element.innerHTML = '<span class="cursor">█</span>';

    function write() {

        if (i < text.length) {

            element.innerHTML =
                text.substring(0, i + 1) +
                '<span class="cursor">█</span>';

            i++;

            setTimeout(write, random(25, 70));

        } else {

            element.innerHTML = text;

        }

    }

    write();

}
function flicker() {

    document.body.style.background = "#050505";

    setTimeout(() => {

        document.body.style.background = "#000";

    }, 80);

}

setInterval(createText, 1000);

setInterval(flicker, 9000);

for (let i = 0; i < 5; i++) {

    setTimeout(createText, i * 500);

}


