const Letter = require("./letter");

function Word(word) {
   this.word = word;
   this.letters = [];
   
   this.createLetters = function(){
       let wordArr = this.word.split("");
       for(let i =0; i < wordArr.length; i++) {
           let newLetter= new Letter(wordArr[i]);
           this.letters.push(newLetter);
       }
   }

   this.makeGuess = function(guess) {
       this.letters.forEach(letter => {
           letter.checkLetter(guess);
       });
   }

   this.update = function() {
       let printWord = "";
       this.letters.forEach(letter => {
           printWord += letter.getCharacter() + " ";
       });
       return printWord;
   }
}

module.exports = Word;