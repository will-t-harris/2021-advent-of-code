import fs from "fs";
import { Readable } from "stream";
import readline from "readline";

let horizontalPosition = 0;
let depth = 0;
let aim = 0;

try {
  const string = fs.readFileSync("data.txt", "utf8");

  let stream = new Readable();
  stream.push(string);
  stream.push(null); // This indicates the end of the stream.

  let readlineStream = readline.createInterface({
    input: stream,
    crlfDelay: Infinity,
  });

  await readlineStream.on("line", (input) => {
    const [direction, quantity] = input.split(":");

    switch (true) {
      case direction === "forward": {
        horizontalPosition += Number(quantity);

        depth += aim * Number(quantity);

        break;
      }
      case direction === "up": {
        aim -= Number(quantity);
        break;
      }
      case direction === "down": {
        aim += Number(quantity);
      }
      default: {
        break;
      }
    }

    console.log("Final value: ", horizontalPosition * depth);
  });
} catch (error) {
  console.error(error);
}
