"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

/* YOU MAY MODIFY THE LINES BELOW */
let word1 = word.toUpperCase();
let guess1 = guess.toUpperCase();
let count = 0;
 for (let i = 0; i < word1.length; i ++) {
  for (let j = 0; j < guess1.length; j ++) {
      if (word1.charAt(i) === guess1.charAt(j)){
        count++;
        guess1 = guess1.replace(guess1.charAt(j), "");
        break;
      }

 }

 } return count;

}



