/* Source code file for a basic rock, paper, scissors implementation. */

// Computer engine
function getComputerChoice() {
    /*
    Return one of the three possible RPS results as a string.
    The implementation should be taken as random.
    */

    // Initialize an array to hold the responses.
    options = ["Rock", "Paper", "Scissors"];

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
    return userInput;
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