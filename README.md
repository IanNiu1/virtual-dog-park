# Virtual Dog Park

A beginner-friendly dog encyclopedia and virtual pet website built with HTML, CSS, and vanilla JavaScript for an AIE1101 programming lab.

## Features

- Encyclopedia cards for Beagle, Golden Retriever, and Poodle
- Three local, project-created SVG illustrations
- Dog adoption with breed selection and name validation
- Feed, Play, Next Day, and Start Over actions
- Three growth stages and saved pet progress
- Responsive layout for phones and laptops

## Preview locally

1. Open this project folder in Visual Studio Code.
2. Install the Live Server extension if it is not installed.
3. In the Explorer, right-click `index.html` and select **Open with Live Server**.
4. Keep using the same browser and local address when testing saved progress.

No package manager or build step is required.

## Growth and happiness rules

- A newly adopted dog starts on Day 1 as a Puppy with 50/100 happiness.
- Feed and Play each add 10 happiness, up to a maximum of 100.
- Next Day adds one day and subtracts 5 happiness, down to a minimum of 0.
- Day 1 is Puppy; Days 2–3 are Young Dog; Day 4 onward is Adult Dog.

## Saved progress

The website saves one dog's name, breed, day, and happiness in the browser's localStorage using the key `virtualDogParkPetV1`. Progress is local to the same browser and device. It is not a GitHub account or online user account and is not uploaded by Git.

## Illustrations

The three SVG files are project-created illustrations, not real dog photographs.

## Manual testing checklist

- [Y] All three encyclopedia entries and local illustrations display.
- [Y] A valid dog name can be adopted; blank or whitespace-only names are rejected.
- [Y] Names are limited to 20 characters and displayed as text.
- [Y] Feed and Play increase happiness without exceeding 100.
- [Y] Next Day updates happiness and the specified growth stages.
- [Y] Refresh restores the latest pet progress in the same browser.
- [Y] Start Over keeps progress on Cancel and clears it on Confirm.
- [Y] The page remains usable on a narrow screen.
