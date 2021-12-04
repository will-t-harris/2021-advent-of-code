import { readFileSync } from "fs";
import { Readable } from "stream";
import { createInterface } from "readline";

// 12-bit
const parsedArray = [];
const string = readFileSync("data.txt", "utf-8");

let stream = new Readable();
stream.push(string);
stream.push(null);

let readlineStream = createInterface({
  input: stream,
  crlfDelay: Infinity,
});

// store each line as a string in array
readlineStream.on("line", (line) => {
  parsedArray.push(line);
});

readlineStream.on("close", () => {
  let gammaRate = "";
  let epsilonRate = "";

  for (let i = 0; i < 12; i++) {
    let zeroCount = 0;
    let oneCount = 0;

    for (let j = 0; j < parsedArray.length; j++) {
      if (parsedArray[j][i] === "0") {
        zeroCount++;
      } else {
        oneCount++;
      }
    }

    if (zeroCount > oneCount) {
      gammaRate = `${gammaRate}0`;
      epsilonRate = `${epsilonRate}1`;
    } else {
      gammaRate = `${gammaRate}1`;
      epsilonRate = `${epsilonRate}0`;
    }
  }

  const finalGamma = parseInt(gammaRate, 2);
  const finalEpsilon = parseInt(epsilonRate, 2);
  const powerConsumption = finalGamma * finalEpsilon;

  console.log(powerConsumption);
});
