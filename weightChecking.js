var universeFacts = [
    { fact: "The Sun accounts for 99.86% of the mass in our solar system.", category: "Solar System" },
    { fact: "A day on Venus is longer than its year.", category: "Planets" },
    { fact: "Jupiter has the shortest day of all the planets (it turns on its axis once every 9 hours and 55 minutes).", category: "Planets" },
    { fact: "The Milky Way galaxy is estimated to contain 100 to 400 billion stars.", category: "Galaxies" },
    { fact: "If you could fold a piece of paper 42 times, it would reach the Moon.", category: "General Space" },
    { fact: "Neutron stars are so dense that a teaspoonful would weigh about 6 billion tons.", category: "Stars" }
];
var gravityMap = {
    Sun: [27.9, 0],
    Mercury: [0.38, 1],
    Venus: [0.91, 2],
    Earth: [1.00, 3],
    Mars: [0.38, 4],
    Jupiter: [2.34, 5],
    Saturn: [1.06, 6],
    Uranus: [0.92, 7],
    Neptune: [1.19, 8],
    Pluto: [0.06, 9],
    Moon: [0.165, 10]
};
function getRandomFact() {
    var randomIndex = Math.floor(Math.random() * universeFacts.length);
    return universeFacts[randomIndex];
}
function displayRandomFact() {
    var randomFact = getRandomFact();
    var factDisplay = document.getElementById("fact-display");
    factDisplay.innerHTML = "\n    <div class=\"fact-block\">\n      <div class=\"fact-header\">\n        <h3 class=\"fact-title\">\uD83C\uDF0C Universe Facts</h3>\n        <button class=\"new-fact-btn\" onclick=\"displayRandomFact()\">New Fact</button>\n      </div>\n      <p>".concat(randomFact.fact, "</p>\n      <small>Category: ").concat(randomFact.category, "</small>\n    </div>\n  ");
}
function setError(inputElement, message) {
    var _a;
    var formControl = inputElement.parentElement;
    var errorDisplay = formControl.querySelector(".error-message");
    if (!errorDisplay) {
        errorDisplay = document.createElement("small");
        errorDisplay.classList.add("error-message");
        (_a = inputElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(errorDisplay, inputElement.nextSibling);
    }
    errorDisplay.textContent = message;
    inputElement.classList.add("input-error");
}
function clearError(inputElement) {
    var formControl = inputElement.parentElement;
    var errorDisplay = formControl.querySelector(".error-message");
    if (errorDisplay)
        errorDisplay.textContent = "";
    inputElement.classList.remove("input-error");
}
document.addEventListener("DOMContentLoaded", function () {
    var form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var weightInput = document.getElementById("weight");
            var heightInput = document.getElementById("height");
            clearError(weightInput);
            clearError(heightInput);
            var weight = parseFloat(weightInput.value);
            var heightCm = parseFloat(heightInput.value);
            var isValid = true;
            if (isNaN(weight) || weight <= 0) {
                setError(weightInput, "Positive number required");
                isValid = false;
            }
            if (isNaN(heightCm) || heightCm <= 0) {
                setError(heightInput, "Positive number required");
                isValid = false;
            }
            var resultEls = document.querySelectorAll(".planet-wt");
            if (!isValid) {
                resultEls.forEach(function (el) {
                    var p = el.querySelector("p");
                    var tooltip = el.querySelector(".tooltip");
                    if (p)
                        p.textContent = "";
                    if (tooltip)
                        tooltip.textContent = "";
                });
                return;
            }
            var heightM = heightCm / 100;
            Object.entries(gravityMap).forEach(function (_a) {
                var planet = _a[0], _b = _a[1], ratio = _b[0], index = _b[1];
                var planetEl = resultEls[index];
                if (!planetEl)
                    return;
                var planetWeight = weight * ratio;
                var bmi = planetWeight / (heightM * heightM);
                var p = planetEl.querySelector("p");
                var tooltip = planetEl.querySelector(".tooltip");
                if (p)
                    p.textContent = "".concat(planet, ": ").concat(planetWeight.toFixed(2), " kg");
                if (tooltip)
                    tooltip.textContent = "Gravity: ".concat(ratio, " \u00D7 Earth\nBMI: ").concat(bmi.toFixed(2));
            });
        });
    }
    if (universeFacts && universeFacts.length > 0) {
        displayRandomFact();
    }
    else {
        var factDisplay = document.getElementById("fact-display");
        factDisplay.innerHTML = "<p>No facts available at the moment.</p>";
    }
});
