import Raspberry from "./class/Raspberry.ts";
import moment from "moment";

const tempSensor = new Raspberry(17, 11);

const application = () => {
	try {
		const time = moment().format("HH:mm");

		if (time === "10:00") {
			console.log("It's midnight!");
		}

		const { temperature, humidity } = tempSensor.readSensor();
		console.log(`Temperature: ${temperature}`);
		console.log(`Humidity: ${humidity}`);
	} catch (err) {
		console.error(err);
	}
};

setInterval(application, 5000);
