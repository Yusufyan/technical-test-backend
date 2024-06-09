const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function countMatch() {
  let result = [];

  rl.question("Please enter the input string: ", (input) => {
    rl.question("Please enter the query string: ", (query) => {
      rl.close();

      const inputArray = input.split(" ");
      const queryArray = query.split(" ");

      queryArray.map((query) => {
        let count = 0;
        inputArray.map((input) => {
          if (query === input) {
            count += 1;
          }
        });
        result.push(count);
        count = 0;
      });

      console.log("Input: ", inputArray);
      console.log("Query: ", queryArray);
      console.log("Result: ", result);
    });
  });
}

countMatch();
