const Raspberry = require("./class/Raspberry");

const Reley = [14, 15, 18, 23];
var arg = process.argv[2];

if (arg === "1") {
	const ralay_1 = new Raspberry(14);
	ralay_1.write(1);
}
