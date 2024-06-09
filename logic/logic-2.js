const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function findLongestWord() {
  let maxLength = 0;
  let indexArray = 0;

  rl.question("Please enter a string: ", (input) => {
    rl.close();

    const stringArray = input.split(" ");

    for (let index = 0; index < stringArray.length; index++) {
      if (stringArray[index].length > maxLength) {
        maxLength = stringArray[index].length;
        indexArray = index;
      }
    }

    console.log(`Output: ${stringArray[indexArray]} - ${maxLength} huruf`);
  });
}

findLongestWord();
