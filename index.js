/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

console.log(GAMES_JSON)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    games.forEach(game => {
        let div = document.createElement('div')
        div.classList.add('game-card')
        div.innerHTML = `<p>${game.name}<br><br> ${game.description}.</p><img className="game-img" src=${game.img} style="width: 100%; height: auto;">`
        gamesContainer.appendChild(div)  
    });
}

addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let totalContributers = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.backers
}, 0)
let div = document.createElement('div')
div.innerHTML = `<p>Total contributers: ${totalContributers}`
contributionsCard.appendChild(div)


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
let totalContributions = GAMES_JSON.reduce( (acc, game) => {
    return acc + game.pledged
}, 0)
div = document.createElement('div')
div.innerHTML = `<p>Total contributions: ${totalContributions.toLocaleString('en-US')}`
raisedCard.appendChild(div)



// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
div = document.createElement('div')
div.innerHTML = `<p>Total games: ${GAMES_JSON.length}`
gamesCard.appendChild(div)



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
let unfunded = GAMES_JSON.filter( (game) => {
    return game.pledged < game.goal
})
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    addGamesToPage(unfunded)

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    let funded = GAMES_JSON.filter( (game) => {
        return game.pledged > game.goal
    }) 
    addGamesToPage(funded)
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON)
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
unfundedBtn.addEventListener("click", function(){filterUnfundedOnly()}); 
const fundedBtn = document.getElementById("funded-btn");
fundedBtn.addEventListener("click", function(){filterFundedOnly()}); 
const allBtn = document.getElementById("all-btn");
allBtn.addEventListener("click", function(){showAllGames()}); 

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

let msg1 = `A total of $${totalContributions} has been raised for ${GAMES_JSON.length} games. Currently, 1 game remains unfunded. 
We need your help to fund these amazing games!`
let msg2 = `A total of $${totalContributions} has been raised for ${GAMES_JSON.length} games. Currently, ${unfunded.length} games remain unfunded. 
We need your help to fund these amazing games!`

// create a string that explains the number of unfunded games using the ternary operator

div = document.createElement('div')
div.innerHTML = `<p>${unfunded.length == 0 ? msg1 : msg2}</p>`
descriptionContainer.appendChild(div)
// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [first, second, ...rest] = sortedGames

// create a new element to hold the name of the top pledge game, then append it to the correct element
let top = document.createElement('p')
top.innerText = first.name
firstGameContainer.appendChild(top)
// do the same for the runner up item
let next = document.createElement('p')
next.innerText = second.name
secondGameContainer.appendChild(next)
