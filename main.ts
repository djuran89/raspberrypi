import Raspberry from "./class/Raspberry";
import moment from "moment";

const run = async () => {
	try {
		const tempSensor = new Raspberry(17, 11);
		const { temperature, humidity } = tempSensor.readSensor();
		console.log(`Temperature: ${temperature}`);
		console.log(`Humidity: ${humidity}`);
	} catch (err) {
		console.error(err);
	}
};

run();

// const application = () => {
// 	const time = moment().format("HH:mm");

// 	if (time === "10:00") {
// 		console.log("It's midnight!");
// 	}
// };

// setInterval(application, 1000);
