type UniverseFact = {
  fact: string;
  category: string;
};

type GravityMap = {
  [planet: string]: [number, number];
};

const universeFacts: UniverseFact[] = [
  { fact: "The Sun accounts for 99.86% of the mass in our solar system.", category: "Solar System" },
  { fact: "A day on Venus is longer than its year.", category: "Planets" },
  { fact: "Jupiter has the shortest day of all the planets (it turns on its axis once every 9 hours and 55 minutes).", category: "Planets" },
  { fact: "The Milky Way galaxy is estimated to contain 100 to 400 billion stars.", category: "Galaxies" },
  { fact: "If you could fold a piece of paper 42 times, it would reach the Moon.", category: "General Space" },
  { fact: "Neutron stars are so dense that a teaspoonful would weigh about 6 billion tons.", category: "Stars" }
];

const gravityMap: GravityMap = {
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

function getRandomFact(): UniverseFact {
  const randomIndex = Math.floor(Math.random() * universeFacts.length);
  return universeFacts[randomIndex];
}

function displayRandomFact(): void {
  const randomFact = getRandomFact();
  const factDisplay = document.getElementById("fact-display") as HTMLElement;
  factDisplay.innerHTML = `
    <div class="fact-block">
      <div class="fact-header">
        <h3 class="fact-title">🌌 Universe Facts</h3>
        <button class="new-fact-btn" onclick="displayRandomFact()">New Fact</button>
      </div>
      <p>${randomFact.fact}</p>
      <small>Category: ${randomFact.category}</small>
    </div>
  `;
}

function setError(inputElement: HTMLInputElement, message: string): void {
  const formControl = inputElement.parentElement as HTMLElement;
  let errorDisplay = formControl.querySelector(".error-message") as HTMLElement | null;

  if (!errorDisplay) {
    errorDisplay = document.createElement("small");
    errorDisplay.classList.add("error-message");
    inputElement.parentNode?.insertBefore(errorDisplay, inputElement.nextSibling);
  }

  errorDisplay.textContent = message;
  inputElement.classList.add("input-error");
}

function clearError(inputElement: HTMLInputElement): void {
  const formControl = inputElement.parentElement as HTMLElement;
  const errorDisplay = formControl.querySelector(".error-message") as HTMLElement | null;
  if (errorDisplay) errorDisplay.textContent = "";
  inputElement.classList.remove("input-error");
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form") as HTMLFormElement | null;

  if (form) {
    form.addEventListener("submit", (e: Event) => {
      e.preventDefault();

      const weightInput = document.getElementById("weight") as HTMLInputElement;
      const heightInput = document.getElementById("height") as HTMLInputElement;

      clearError(weightInput);
      clearError(heightInput);

      const weight = parseFloat(weightInput.value);
      const heightCm = parseFloat(heightInput.value);

      let isValid = true;

      if (isNaN(weight) || weight <= 0) {
        setError(weightInput, "Positive number required");
        isValid = false;
      }
      if (isNaN(heightCm) || heightCm <= 0) {
        setError(heightInput, "Positive number required");
        isValid = false;
      }

      const resultEls = document.querySelectorAll(".planet-wt");

      if (!isValid) {
        resultEls.forEach((el) => {
          const p = el.querySelector("p");
          const tooltip = el.querySelector(".tooltip");
          if (p) p.textContent = "";
          if (tooltip) tooltip.textContent = "";
        });
        return;
      }

      const heightM = heightCm / 100;

      Object.entries(gravityMap).forEach(([planet, [ratio, index]]) => {
        const planetEl = resultEls[index] as HTMLElement;
        if (!planetEl) return;

        const planetWeight = weight * ratio;
        const bmi = planetWeight / (heightM * heightM);

        const p = planetEl.querySelector("p");
        const tooltip = planetEl.querySelector(".tooltip");

        if (p) p.textContent = `${planet}: ${planetWeight.toFixed(2)} kg`;
        if (tooltip) tooltip.textContent = `Gravity: ${ratio} × Earth\nBMI: ${bmi.toFixed(2)}`;
      });
    });
  }

  if (universeFacts && universeFacts.length > 0) {
    displayRandomFact();
  } else {
    const factDisplay = document.getElementById("fact-display") as HTMLElement;
    factDisplay.innerHTML = `<p>No facts available at the moment.</p>`;
  }
});
