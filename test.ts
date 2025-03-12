import Raspberry from "./class/Raspberry.ts";

const Reley = [14, 15, 18, 23];
const ralay_3 = new Raspberry(14);
const ralay_2 = new Raspberry(15);
const ralay_1 = new Raspberry(18);
const ralay_4 = new Raspberry(23);
var arg = process.argv[2];

if (arg === "1") {
	ralay_2.createGpio();
	ralay_2.write(1);
}
if (arg === "2") {
	ralay_2.createGpio();
	ralay_2.write(0);
}
