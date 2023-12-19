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
        loseString = loseString + computerString + " beats " + userString;
        return [false, loseString];
    } else {
        // User wins.
        winString = winString + userString + " beats " + computerString;
        return [true, (winString)];
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
    let final;

    while (!resultFound) {
        console.log("Getting info:");
        // let userTurn = getUserChoice();
        let userTurn = userChoice;
        let compTurn = getComputerChoice();

        console.log(userTurn);
        console.log(compTurn);

        if (!gameIsTied(userTurn, compTurn)) {
            final = gameResult(userTurn, compTurn);
            resultFound = true;
        }
    }
    return final;
}

// Switch statement on the container div.
function handleClick(e) {
    let selectedButton = e.target.id;
    let sanitizedInput = selectedButton.toUpperCase();

    switch (sanitizedInput) {
        case 'ROCK':
            console.log("Vibe");
            playRound("ROCK");
            break;

        case 'PAPER':
            playRound("PAPER");
            break;
        
        case 'SCISSORS':
            playRound("SCISSORS");
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

// function game() {
//     /*
//     Play a best-of-x game of RPS!
//     No functionality to terminate the game early if a win / loss is confirmed early.
//     */

//     let numRounds = 5; // Odd numbers required for this!
//     let userWins = 0;
//     let round;

//     for (let i = 0; i < numRounds; i++) {
//         round = playRound()
//         console.log(round[1]);
//         console.log("\n");

//         if (round[0]) {
//             userWins++;
//         }
//     }

//     if (userWins > numRounds / 2) {
//         console.log("You won!");
//     } else {
//         console.log("You lost!");
//     }
// }