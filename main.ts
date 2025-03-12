import Raspberry from "./class/Raspberry.ts";
import moment from "moment";

const tempSensor = new Raspberry(17, 11);

const Lamp = new Raspberry(18); // Ralay 1
const Fan = new Raspberry(15); // Ralay 2
const Heater = new Raspberry(14); // Ralay 3
const WaterPump = new Raspberry(23); // Ralay 4

Lamp.createGpio();
Fan.createGpio();
Heater.createGpio();
WaterPump.createGpio();

Lamp.turn_off();
Fan.turn_off();
Heater.turn_off();
WaterPump.turn_off();

const application = () => {
	try {
		const time = moment().format("HH:mm");
		const { temperature } = tempSensor.readSensor();

		Lamp.turn_on();

		// Heater
		if (temperature > 28) Heater.turn_off();
		if (temperature < 20) Heater.turn_on();

		// Lamp
		if (time === "09:00") Lamp.turn_on();
		if (time === "19:00") Lamp.turn_off();

		// Fan
		if (time === "12:00") Fan.turn_on();
		if (time === "12:15") Fan.turn_off();

		if (time === "16:00") Fan.turn_on();
		if (time === "16:15") Fan.turn_off();

		// WaterPump
		if (time === "08:00") WaterPump.turn_on();
		if (time === "08:05") WaterPump.turn_off();
	} catch (err) {
		console.error(err);
	}
};

setInterval(application, 60000);
