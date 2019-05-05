const Word = require("./word");
const inquirer = require("inquirer");

const wordBank = [
    "accio", "quidditch", "snape",
     "harry", "gringotts", "grindelwald", 
     "bellatrix", "sirius", "hogwarts", 
     "voldemort", "pensieve", "sphinx",
      "azkaban", "diadem", "horcrux", 
      "wizengamot", "hagrid", "patronus", 
      "hedwig", "remus", "dementor",
      "regulus", "dobby",  
];

let guesses;
let pickedWords;
let word;
let chosenWord;

function init() {
    pickedWords = [];
    console.log("Welcome to Word Guess Harry Potter Edition!");
    console.log("\n-------------------------------------\n");
    playGame();
}

function playGame() {
    chosenWord = "";
    guesses= 10;
    if(pickedWords.length < wordBank.length) {
        pickedWords = getWord();
    } else {
        //Winning 
        console.log("You know a lot about the wizarding world! Cheers!");
        continuePrompt();
    }
    if(chosenWord) {
        word = new Word (chosenWord);
        word.makeLetters();
        makeGuess();
    }
}

function getWord() {
    let rando = Math.floor(Math.random() * wordBank.length);
    let randomWord = wordBank[rando];
    if(chosenWord.indexOf(randomWord) === -1) {
        chosenWord.push(randomWord);
        return randomWord;
    } else {
        return getWord();
    }
}

function makeGuess() {
    let checker = [];
    inquirer.prompt([
        {
            name: "guessedLetter", 
            message: word.update() + "\nGuess a letter!" + "\nGuesses Left: " + guesses
        }
    ])

    .then(data =>{
        word.letters.forEach(letter => {
            letter.checkLetter(data.guessedLetter);
            checker.push(letter.getCharacter());
        });
        if(guesses > 0 && checker.indexOf("_") !== -1){
            guesses--;
            if(guesses === 0) {
                console.log("Oooops! You ran out of guesses! GAME OVER!");
                continuePrompt();
            } else{
                makeGuess();
            }
        }else {
            console.log ("Congratulations! You guessed the correct word!");
            console.log(word.update());
            playGame();
        }
    });
}

function continuePrompt() {
    
}