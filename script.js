"use strict";

const STORAGE_KEY = "virtualDogParkPetV1";
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

const growthLabel = document.querySelector("#growth-label");
const growthMeter = document.querySelector("#growth-meter");
const growthMeterFill = document.querySelector("#growth-meter-fill");

const feedButton = document.querySelector("#feed-button");
const playButton = document.querySelector("#play-button");
const nextDayButton = document.querySelector("#next-day-button");
const startOverButton = document.querySelector("#start-over-button");

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

function stageLevelFor(day) {
  if (day === 1) {
    return 1;
  }
  if (day <= 3) {
    return 2;
  }
  return 3;
}

function loadDog() {
  try {
    const savedText = localStorage.getItem(STORAGE_KEY);
    if (!savedText) {
      return null;
    }

    const saved = JSON.parse(savedText);
    const cleanName =
      saved && typeof saved.name === "string" ? saved.name.trim() : "";

    if (
      !saved ||
      cleanName.length === 0 ||
      cleanName.length > 20 ||
      !validBreeds.has(saved.breed) ||
      !Number.isInteger(saved.day) ||
      saved.day < 1 ||
      !Number.isInteger(saved.happiness) ||
      saved.happiness < 0 ||
      saved.happiness > 100
    ) {
      return null;
    }

    return {
      name: cleanName,
      breed: saved.breed,
      day: saved.day,
      happiness: saved.happiness
    };
  } catch {
    return null;
  }
}

function saveDog() {
  if (!dog) {
    return true;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dog));
    return true;
  } catch {
    return false;
  }
}

function renderDog() {
  if (!dog) {
    return;
  }

  const stage = stageFor(dog.day);
  const stageLevel = stageLevelFor(dog.day);

  petName.textContent = dog.name;
  petBreed.textContent = dog.breed;
  petStage.textContent = stage;
  petDay.textContent = String(dog.day);
  petHappiness.textContent = String(dog.happiness);

  growthLabel.textContent = stage;
  growthMeter.setAttribute("aria-valuenow", String(stageLevel));
  growthMeter.setAttribute("aria-valuetext", stage);
  growthMeter.setAttribute("aria-label", `Growth stage: ${stage}`);
  growthMeterFill.style.width = `${(stageLevel / 3) * 100}%`;
}

function showSaveResult(successMessage, wasSaved) {
  petMessage.textContent = wasSaved
    ? successMessage
    : `${successMessage} Your browser could not save the progress.`;
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

  const wasSaved = saveDog();
  showSaveResult(`${dog.name} was adopted! Day 1 begins at 50/100 happiness.`, wasSaved);
});

function changeHappiness(amount, activityMessage) {
  if (!dog) {
    return;
  }

  dog.happiness = Math.max(0, Math.min(100, dog.happiness + amount));
  const wasSaved = saveDog();
  renderDog();

  showSaveResult(
    `${dog.name} ${activityMessage} Happiness: ${dog.happiness}/100.`,
    wasSaved
  );
}

feedButton.addEventListener("click", () => {
  changeHappiness(10, "enjoyed a snack!");
});

playButton.addEventListener("click", () => {
  changeHappiness(10, "enjoyed play time!");
});

nextDayButton.addEventListener("click", () => {
  if (!dog) {
    return;
  }

  dog.day += 1;
  dog.happiness = Math.max(0, dog.happiness - 5);

  const wasSaved = saveDog();
  renderDog();

  showSaveResult(
    `A new day begins. ${dog.name} is now a ${stageFor(dog.day)} on Day ${dog.day}. Happiness: ${dog.happiness}/100.`,
    wasSaved
  );
});

startOverButton.addEventListener("click", () => {
  if (!dog) {
    return;
  }

  const confirmed = window.confirm(
    `Start over and delete ${dog.name}'s saved progress?`
  );

  if (!confirmed) {
    petMessage.textContent = `${dog.name}'s progress was kept.`;
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    petMessage.textContent = "The saved progress could not be removed. Your dog was kept.";
    return;
  }

  dog = null;
  petSection.hidden = true;
  adoptionSection.hidden = false;
  adoptionForm.reset();
  adoptionMessage.textContent = "Saved progress cleared. You can adopt another dog.";
  dogNameInput.focus();
});

dog = loadDog();

if (dog) {
  adoptionSection.hidden = true;
  petSection.hidden = false;
  renderDog();
  petMessage.textContent = "Saved progress restored from this browser.";
} else {
  adoptionSection.hidden = false;
  petSection.hidden = true;
}