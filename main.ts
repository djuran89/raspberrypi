import Raspberry from "./class/Raspberry.ts";
import moment from "moment";

const tempSensor = new Raspberry(17, 11);

const ralay_1 = new Raspberry(18);
const ralay_2 = new Raspberry(15);
const ralay_3 = new Raspberry(14);
const ralay_4 = new Raspberry(23);

const Lamp = ralay_1.createGpio();
const Fan = ralay_2.createGpio();
const Heater = ralay_3.createGpio();
const WaterPump = ralay_4.createGpio();

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
