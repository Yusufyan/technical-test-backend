const string = "NEGIE1";

const number = string.substring(string.length - 1, string.length).toString();
const words = string.substring(0, string.length - 1);

let newStrings = "";

for (let i = words.length - 1; i >= 0; i--) {
  newStrings += words[i];
}

console.log("before: ", string);
console.log("after: ", newStrings + number);
