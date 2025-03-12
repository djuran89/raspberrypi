import Raspberry from "./class/Raspberry.ts";

const Reley = [14, 15, 18, 23];
var arg = process.argv[2];
console.log(arg);
if (arg === "1") {
	const ralay_1 = new Raspberry(23);
	ralay_1.createGpio();
	ralay_1.write(1);
}
