import fs from "fs";
const inputData = fs.readFileSync("data.txt", "utf8");

const binary = inputData.split("\n").map((str) => str.replace("\r", ""));

function findRating(array, criteria) {
	let value = "";
	let index = 0;
	let possibleValues = array;

	while (possibleValues.length > 1) {
		let startsWithOne = [];
		let startsWithZero = [];

		for (let string of possibleValues) {
			string[index] === "1"
				? startsWithOne.push(string)
				: startsWithZero.push(string);
		}

		switch (criteria) {
			case "most": {
				startsWithZero.length > startsWithOne.length
					? (possibleValues = startsWithZero)
					: (possibleValues = startsWithOne);
				break;
			}
			case "least": {
				startsWithZero.length <= startsWithOne.length
					? (possibleValues = startsWithZero)
					: (possibleValues = startsWithOne);
				break;
			}
			default: {
				throw new Error("cannot parse criteria");
			}
		}

		index += 1;
	}

	value = possibleValues[0];
	return parseInt(value, 2);
}
console.log(findRating(binary, "most") * findRating(binary, "least"));
