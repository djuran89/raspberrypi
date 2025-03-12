// import Raspberry from "./class/Raspberry.ts";
import { Gpio } from "pigpio";

const Reley = [14, 15, 18, 23];
var arg = process.argv[2];
console.log(arg);
if (arg === "1") {
	// const ralay_1 = new Raspberry(23);
	// ralay_1.createGpio();
	// ralay_1.write(1);
	const relay1 = new Gpio(23, { mode: Gpio.OUTPUT });
	const value = relay1.digitalRead();
	console.log(value);
}
if (arg === "2") {
	// const ralay_1 = new Raspberry(23);
	// ralay_1.createGpio();
	// ralay_1.write(1);
	const relay1 = new Gpio(23, { mode: Gpio.OUTPUT });
	relay1.digitalWrite(0);
}
