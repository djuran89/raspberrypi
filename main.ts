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
		const time = moment().format("HH:mm:ss");
		const { temperature, humidity } = tempSensor.readSensor();
		console.log(`Time: ${time}`);
		console.log(`Temperature: ${temperature}`);
		console.log(`Humidity: ${humidity}`);

		if (time === "10:00") {
			console.log("It's midnight!");
		}
	} catch (err) {
		console.error(err);
	}
};

setInterval(application, 3000);
