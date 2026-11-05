"use strict";

const validBreeds = new Set(["Beagle", "Golden Retriever", "Poodle"]);

const adoptionSection = document.querySelector("#adoption-section");
const adoptionForm = document.querySelector("#adoption-form");
const adoptionMessage = document.querySelector("#adoption-message");
const breedChoice = document.querySelector("#breed-choice");
const dogNameInput = document.querySelector("#dog-name");

const petSection = document.querySelector("#pet-section");
const petName = document.querySelector("#pet-name");
const petBreed = document.querySelector("#pet-breed");
const petStage = document.querySelector("#pet-stage");
const petDay = document.querySelector("#pet-day");
const petHappiness = document.querySelector("#pet-happiness");
const petMessage = document.querySelector("#pet-message");

let dog = null;

function stageFor(day) {
  if (day === 1) {
    return "Puppy";
  }
  if (day <= 3) {
    return "Young Dog";
  }
  return "Adult Dog";
}

function renderDog() {
  if (!dog) {
    return;
  }

  petName.textContent = dog.name;
  petBreed.textContent = dog.breed;
  petStage.textContent = stageFor(dog.day);
  petDay.textContent = String(dog.day);
  petHappiness.textContent = String(dog.happiness);
}

adoptionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = dogNameInput.value.trim();

  if (name.length === 0) {
    adoptionMessage.textContent = "Please enter a name before adopting.";
    dogNameInput.focus();
    return;
  }

  if (name.length > 20) {
    adoptionMessage.textContent = "The name must be no longer than 20 characters.";
    dogNameInput.focus();
    return;
  }

  const breed = breedChoice.value;
  if (!validBreeds.has(breed)) {
    adoptionMessage.textContent = "Please choose one of the listed breeds.";
    return;
  }

  dog = {
    name: name,
    breed: breed,
    day: 1,
    happiness: 50
  };

  adoptionSection.hidden = true;
  petSection.hidden = false;
  renderDog();

  adoptionMessage.textContent = "";
  petMessage.textContent = `${dog.name} joined the Virtual Dog Park!`;
});

function changeHappiness(amount, activityMessage) {
  if (!dog) {
    return;
  }

  dog.happiness = Math.max(0, Math.min(100, dog.happiness + amount));
  renderDog();
  petMessage.textContent =
    `${dog.name} ${activityMessage} Happiness: ${dog.happiness}/100.`;
}

document.querySelector("#feed-button").addEventListener("click", () => {
  changeHappiness(10, "enjoyed a snack!");
});

document.querySelector("#play-button").addEventListener("click", () => {
  changeHappiness(10, "enjoyed play time!");
});