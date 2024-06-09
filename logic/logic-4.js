const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function readMatrixNxN() {
  const matrix = [];
  let numRows;

  rl.question("Enter the size of the matrix (N): ", (size) => {
    numRows = parseInt(size);
    const numCols = numRows;

    const readRow = (rowIndex) => {
      if (rowIndex < numRows) {
        rl.question(
          `Enter row ${rowIndex + 1} (space-separated ${numCols} numbers): `,
          (line) => {
            const row = line.trim().split(" ").map(Number);

            if (row.length !== numCols) {
              console.log(`Please enter exactly ${numCols} numbers.`);
              readRow(rowIndex);
            } else {
              matrix.push(row);
              readRow(rowIndex + 1);
            }
          }
        );
      } else {
        rl.close();

        const {
          mainDiagonal,
          secondaryDiagonal,
          sumMain,
          sumSecondary,
          calculation,
        } = getDiagonal(matrix);

        console.log("Matrix: ", matrix);

        console.log(
          `Diagonal pertama: ${mainDiagonal.join(" + ")} = ${sumMain}`
        );
        console.log(
          `Diagonal kedua: ${secondaryDiagonal.join(" + ")} = ${sumSecondary}`
        );
        console.log(
          `Maka hasilnya adalah: ${sumMain} - ${sumSecondary} = ${calculation}`
        );
      }
    };

    readRow(0);
  });
}

function getDiagonal(matrix) {
  const mainDiagonal = [];
  const secondaryDiagonal = [];
  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    // Main diagonal
    mainDiagonal.push(matrix[i][i]);

    // Secondary diagonal
    secondaryDiagonal.push(matrix[i][n - 1 - i]);
  }

  // SUM main diagonal
  const sumMain = mainDiagonal.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  // SUM secondary diagonal
  const sumSecondary = secondaryDiagonal.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  const calculation = sumMain - sumSecondary;

  return {
    mainDiagonal,
    secondaryDiagonal,
    sumMain,
    sumSecondary,
    calculation,
  };
}

readMatrixNxN();
