import { planets } from './assets/planetData.js'

let swapiButton = document.querySelector("#swapi-button");
let swapiList = document.querySelector("#swapi-list");

function removePlanet() {
    let removeDiv = document.getElementById("swapi-list");
    while (removeDiv.firstChild) {
        removeDiv.removeChild(removeDiv.firstChild);
    }
}

function showPlanet() {
    let planetArray = Object.entries(planets[Math.floor((Math.random() * planets.length) + 1)]).slice(0, 9);
    planetArray.forEach((attribute) => {
        let makeDiv = document.createElement('div');
        swapiList.appendChild(makeDiv);
        let planetKey = document.createElement('li');
        planetKey.textContent = `${attribute[0].charAt(0).toUpperCase() + attribute[0].slice(1)}:`;
        makeDiv.appendChild(planetKey);
        let planetValue = document.createElement('li');
        planetValue.textContent = attribute[1];
        makeDiv.appendChild(planetValue);
    })
}

swapiButton.addEventListener("click", removePlanet)
swapiButton.addEventListener("click", showPlanet);