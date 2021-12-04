import { numbers } from "./data.js";

let count = 0;
let previousSum = 0;
let currentSum = 0;

for (let i = 0; i < numbers.length; i++) {
  currentSum = numbers[i] + numbers[i + 1] + numbers[i + 2];
  if (previousSum !== 0 && previousSum < currentSum) {
    count++
  }

  previousSum = currentSum;
}

console.log(count);
