//* Use of Import and Export statements
import { characters } from '/assets/potterCharacters.js'

const cardContainer = document.querySelector('#card-container')
let wantedProps = ['house', "dateOfBirth", "ancestry", "patronus", "actor", "alive"]

//BUTTONS
//* Proper use of variables with proper scope (global variables)
//* Proper use of let and const variables 
const noneButton = document.querySelector("#none-button")
const HouseButton = document.querySelector("#house-button")
const studentsStaffButton = document.querySelector("#students-staff-button")
const bloodStatusButton = document.querySelector("#blood-status-button")
const buttonList = [noneButton, HouseButton, studentsStaffButton, bloodStatusButton]
const createCardButton = document.querySelector('#create-card-button')

//MAIN FUNCTIONS --------------------------------------------------------------
//* Use of Arrow functions (there are 20 in this project)
const removeCards = () => {
    let removeDiv = document.querySelector("#card-container");
    while (removeDiv.firstChild) {
        removeDiv.removeChild(removeDiv.firstChild);
    }
    //* Iteration through an Array using loops and Array methods
    buttonList.forEach(button => button.classList.remove('current-button'))
}

const createCard = (character) => {
    createCardButton.classList.remove('hide')

    //* Proper use of variables with proper scope (local variables)
    let scene = document.createElement('div')
    scene.className = "scene"
    cardContainer.appendChild(scene)

    let card = document.createElement('div')
    card.className = "card"
    scene.appendChild(card)

    //Creates front of card
    let fig = document.createElement('figure')
    fig.classList.add('card-face', 'front')
    card.appendChild(fig)

    let img = document.createElement('img')
    //* Objects with properties and methods accessed using dot notation
    img.src = character.image
    let cap = document.createElement('figcaption')
    cap.textContent = character.name
    fig.appendChild(img)
    fig.appendChild(cap)

    //Creates back of card
    let backDiv = document.createElement('div')
    backDiv.classList.add('card-face', 'back')
    if (character.house !== "") {
        //* Use of Strings using Template Literals
        backDiv.classList.add(`${character.house}`)
    }
    card.appendChild(backDiv)

    let backNameHeading = document.createElement('h2')
    backNameHeading.className = "back-name-heading"
    backNameHeading.textContent = character.name
    backDiv.appendChild(backNameHeading)

    let propList = document.createElement('div')
    propList.className = "prop-list"
    backDiv.appendChild(propList)

    for (let prop in character) {
        if (wantedProps.includes(prop)) {
            let ul = document.createElement('ul')
            propList.appendChild(ul)

            let propKey = document.createElement('li')
            //* Proper use of String manipulation
            propKey.textContent = `${prop.charAt(0).toUpperCase() + prop.slice(1)}:`
            ul.appendChild(propKey)
            let propValue = document.createElement('li')
            propValue.textContent = character[prop]
            ul.appendChild(propValue)
        }
    }

    card.addEventListener( 'click', function() {
        card.classList.toggle('is-flipped');
    });
}

const allCharacters = () => {
    removeCards();
    noneButton.classList.add('current-button')
    characters.forEach(character => {
        createCard(character);
    })
}

allCharacters();
noneButton.addEventListener("click", allCharacters)


//FILTER FUNCTIONS --------------------------------------------------------------

//Sort by House
//* Good use of Arrays
const houses = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"]

const sortByHouse = () => {
    removeCards()
    HouseButton.classList.add('current-button')
    houses.forEach(house => {
        //* Iteration through an Array using loops and Array methods
        let filteredByHouse = characters.filter(character => character.house === house)
        
        let houseName = document.createElement('h2')
        houseName.textContent = house
        houseName.classList.add("house-heading", `${house}`)
        cardContainer.appendChild(houseName)

        filteredByHouse.forEach(character => {
            createCard(character)
        })
    })
    createCardButton.classList.add('hide')
}

HouseButton.addEventListener("click", sortByHouse)

//Sort by Students and Staff 
const sortByStudentStaff = () => {
    removeCards()
    studentsStaffButton.classList.add('current-button')
    let students = characters.filter(character => character.hogwartsStudent === true)

    let studentHeading = document.createElement('h2')
    studentHeading.classList.add('sort-heading')
    studentHeading.textContent = "Students"
    cardContainer.appendChild(studentHeading)

    students.forEach(student => {
        createCard(student)
    })

    let staff = characters.filter(character => character.hogwartsStaff === true)

    let staffHeading = document.createElement('h2')
    staffHeading.classList.add('sort-heading')
    staffHeading.textContent = "Staff"
    cardContainer.appendChild(staffHeading)

    staff.forEach(person => {
        createCard(person)
    })
    createCardButton.classList.add('hide')
}

studentsStaffButton.addEventListener("click", sortByStudentStaff)

//Sort by Blood Status
//* Good use of Arrays
let bloodTypes = []
characters.forEach(character => {
    //* Good use of conditional logic and value comparison
    if (bloodTypes.includes(character.ancestry) === false) {
        if (character.ancestry !== "")
            bloodTypes.push(character.ancestry)
    }
})

const sortbyBloodStatus = () => {
    removeCards()
    bloodStatusButton.classList.add('current-button')
    bloodTypes.forEach(type => {
        let filteredbyBlood = characters.filter(character => character.ancestry === type)
        
        let bloodName = document.createElement('h2')
        bloodName.textContent = type
        bloodName.classList.add("sort-heading")
        cardContainer.appendChild(bloodName)

        filteredbyBlood.forEach(character => {
            createCard(character)
        })
    })
    createCardButton.classList.add('hide')
}

bloodStatusButton.addEventListener("click", sortbyBloodStatus)

//USER CREATES NEW CARDS --------------------------------------------------------------

let count = 0;

//* Objects using Constructors properly
class UserCard {
    constructor(name, species, gender, house, dateOfBirth, yearOfBirth, ancestry, eyeColour, hairColour, hogwartsStudent, hogwartsStaff, actor, alive, image) {
        this.name = name
        this.species = species
        this.gender = gender
        this.house = house
        this.dateOfBirth = dateOfBirth
        this.yearOfBirth = yearOfBirth
        this.ancestry = ancestry
        this.eyeColour = eyeColour
        this.hairColour = hairColour
        this.hogwartsStudent = hogwartsStudent
        this.hogwartsStaff = hogwartsStaff
        this.actor = actor
        this.alive = alive
        this.image = image
    }
}

createCardButton.addEventListener("click", () => {
    //* Good use of conditional logic and value comparison
    if (count === 0) {
        //* Use of custom JavaScript objects
        let userCard = new UserCard("Newt Scamander", "human", "male", "Hufflepuff", "24-02-1897", 1897, "half-blood or pure-blood", "blue", "red brown", false, false, "Eddie Redmayne", true, "https://vignette.wikia.nocookie.net/harrypotter/images/4/43/NewtonScamander-Profile-crop.png/revision/latest?cb=20170112223036")
        
        characters.push(userCard)
        count++;
        return createCard(userCard)
    } else {
        //* Proper declarations of Objects
        let userCard = new UserCard("Random Character", "", "", houses[Math.floor(Math.random()*houses.length)], "", "", "", "", "", "", "", "", "", "https://vignette.wikia.nocookie.net/jspotter/images/1/18/Hogwarts_Crest_1.png/revision/latest?cb=20140720035204")

        characters.push(userCard)
        count++;
        return createCard(userCard)
    }
})
