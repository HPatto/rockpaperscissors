/* Source code file for a basic rock, paper, scissors implementation. */

// Computer engine
function getComputerChoice() {
    /*
    Return one of the three possible RPS results as a string.
    The implementation should be taken as random.
    */

    // Initialize an array to hold the responses.
    options = ["ROCK", "PAPER", "SCISSORS"];

    // Number of options to consider
    bottomLimit = 0;
    topLimit = options.length - 1;

    // Get random index within range of options array.
    randIndex = getRandomInt(bottomLimit, topLimit);

    return options[randIndex];
}

// User interaction
function getUserChoice() {
    let options = ["ROCK", "PAPER", "SCISSORS"];

    let userInput;
    let sanitizedInput;
    
    while (true) {
        userInput = prompt("Rock, Paper, or Scissors: ");
        sanitizedInput = userInput.toUpperCase();

        if (options.includes(sanitizedInput)) {
            break;
        }
    }
    return sanitizedInput;
}

// Check for a tie. Used before computing the winner.
function gameIsTied (userString, computerString) {
    return userString === computerString;
}

// Win determinator
function gameResult(userString, computerString) {
    /*
    Determine and return an array with the appropriate result string.
    */

    let userOptions = ["ROCK", "PAPER", "SCISSORS"];
    let compOptions = ["PAPER", "SCISSORS", "ROCK"];

    let userIndex = userOptions.indexOf(userString);
    let computerIndex = compOptions.indexOf(computerString);

    let winString = "You win! ";
    let loseString = "You lose! ";

    if (userIndex === computerIndex) {
        // Computer wins.
        // loseString = loseString + computerString + " beats " + userString;
        return false; //, loseString];
    } else {
        // User wins.
        // winString = winString + userString + " beats " + computerString;
        return true; //, (winString)];
    }
}

function getRandomInt(value1, value2) {
    /*
    Return a random integer between the specified integer values (inclusive).

    1) Get the random float.

    2) Scale the float over the effective range of the function.
    N.B., effective is the difference between the two arguments.

    3) Add the random delta to the bottom value.
    */

    let bottom;
    let top;

    if (value1 < value2) {
        bottom = value1;
        top = value2;
    } else {
        bottom = value2;
        top = value1;
    }

    delta = Math.abs(top - bottom) + 1; // +1 to ensure truncated vals may be the top int.
    randomExcess = Math.floor(Math.random() * delta);

    let randomInt = bottom + randomExcess;
    return randomInt;
}

function playRound(userChoice) {

    let resultFound = false;

    while (!resultFound) {
        // Get the inputs for the round
        let userTurn = userChoice;
        let compTurn = getComputerChoice();

        // If it is a tie, the content is discarded
        if (!gameIsTied(userTurn, compTurn)) {
            // Check if the user won
            let userWin = gameResult(userTurn, compTurn);

            // Get the table row elements with the inputs
            let userRow = createAndPopulateTdElement(userTurn, userWin);
            let compRow = createAndPopulateTdElement(compTurn, !userWin);

            // Get the objects holding the current score
            let userScore = document.querySelector(".user-score");
            let compScore = document.querySelector(".computer-score");

            // Increment the winner's tally
            if (userWin) {
                incrementCount(userScore);
            } else {
                incrementCount(compScore);
            }

            /*
            Will need some code that turns one of the two td
            elements into bold text.
            */

            // New row populated and added to the page.
            let newRow = createAndPopulateTrElement(userRow, compRow); 
            const resultsTable = document.querySelector(".results-list");
            resultsTable.appendChild(newRow);

            // Prevents re-trying the round due to a tie.
            resultFound = true;
        }
    }
    return checkForResult();
}

// Switch statement on the container div.
function handleClick(e) {
    let selectedButton = e.target.id;
    let sanitizedInput = selectedButton.toUpperCase();
    let gameOver;

    switch (sanitizedInput) {
        case 'ROCK':
            gameOver = playRound("ROCK");
            if (gameOver) {
                endOfGame();
            }
            break;

        case 'PAPER':
            gameOver = playRound("PAPER");
            if (gameOver) {
                endOfGame();
            }
            break;
        
        case 'SCISSORS':
            gameOver = playRound("SCISSORS");
            if (gameOver) {
                endOfGame();
            }
            break;
    }
}

// Check if DOM is loaded, then create the event listener.
document.addEventListener('DOMContentLoaded', function () {
    
    // Get the relevant element.
    const containerDiv = document.querySelector(".options");

    if (containerDiv) {
        // Add an event listener to that element.
        containerDiv.addEventListener('click', handleClick);
    }

})

// Create and populate td element
function createAndPopulateTdElement(text, winningElement) {
    // Create the new td element.
    let tdElemenet = document.createElement('td');

    // Populate the element with the text.
    tdElemenet.textContent = text;

    if (winningElement) {
        tdElemenet.classList.add("td-bold");
    }

    return tdElemenet;
}

// Create and populate tr element
function createAndPopulateTrElement(td1, td2) {
    // Create the new tr element.
    let trElemenet = document.createElement('tr');

    // Add the td's to the row element.
    trElemenet.appendChild(td1);
    trElemenet.appendChild(td2);
    
    return trElemenet;
}

// Check if someone has won
function checkForResult() {
    let winningScore = 5;

    let userScore = parseInt(document.querySelector(".user-score").textContent);
    let compScore = parseInt(document.querySelector(".computer-score").textContent);

    if (userScore === winningScore || compScore === winningScore) {
        return true;
    }

    return false;
}

// A function to increment the object's value by 1
function incrementCount(object) {
    let currentScore = parseInt(object.textContent);
    let newScore = currentScore + 1;

    object.textContent = newScore;
}

// A clean-up function to prevent further "hands"
function endOfGame() {
    
    // Remove the listening element.
    const containerDiv = document.querySelector(".options");
    containerDiv.removeEventListener('click', handleClick);

    // Perhaps display some text. "Refresh to play again!"
    setTimeout(function () {
        alert("Refresh to play again!");
    }, 3000);
}