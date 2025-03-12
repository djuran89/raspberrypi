import Raspberry from "./class/Raspberry.ts";

const Reley = [14, 15, 18, 23];
const ralay_1 = new Raspberry(18);
const ralay_2 = new Raspberry(15);
const ralay_3 = new Raspberry(14);
const ralay_4 = new Raspberry(23);
var arg = process.argv[2];

if (arg === "1") {
	ralay_1.createGpio();
	const read = ralay_1.read();
	const value = read === 1 ? 0 : 1;
	ralay_1.write(value);
}

if (arg === "2") {
	ralay_2.createGpio();
	const read = ralay_2.read();
	const value = read === 1 ? 0 : 1;
	ralay_2.write(value);
}

if (arg === "3") {
	ralay_3.createGpio();
	const read = ralay_3.read();
	const value = read === 1 ? 0 : 1;
	ralay_3.write(value);
}

if (arg === "4") {
	ralay_4.createGpio();
	const read = ralay_4.read();
	const value = read === 1 ? 0 : 1;
	ralay_4.write(value);
}