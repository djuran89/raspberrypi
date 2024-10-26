const Gpio = require("pigpio").Gpio;
const sensorLib = require("node-dht-sensor");
const server = require("./bin/server");
const moment = require("moment");
const modelSensor = require("./models/sensor");

const interval = 5000;

// // Config
const maxTemperatureForLamp = 24;
const minTemperatureForLamp = 17;

// // Temperatura i vlažnost vazduha
const temperaturGpio = 17;
const moistureGpio = 21;
const moistureSensor = new Gpio(moistureGpio, { mode: Gpio.INPUT });

// // Definišemo pinove na koje su povezani releji
const relay1 = new Gpio(23, { mode: Gpio.OUTPUT });
// Funkcija za paljenje i gašenje releja
// ON -> 0
// OFF -> 1
const switchRelay = (relay, state) => relay.digitalWrite(state);
const readRelayState = (relay) => relay.digitalRead();

// Automacki ugasiti relej
switchRelay(relay1, 1);

const app = {
	connect: async () => {
		try {
			await server();
		} catch (err) {
			throw new Error(err);
		}
	},
	sensors: [{ name: "Garden", type: 11, pin: temperaturGpio }],
	read: function () {
		for (var sensor in this.sensors) {
			var readout = sensorLib.read(this.sensors[sensor].type, this.sensors[sensor].pin);

			const soilMeasure = moistureSensor.digitalRead();
			const isSoilWet = soilMeasure === 1 ? "Wet" : "Dry";
			const lampStatus = readRelayState(relay4);
			const isLampOn = lampStatus === 0 ? "ON" : "OFF";
			const room = this.sensors[sensor].name;
			const humidity = readout.humidity.toFixed(1);
			const temperature = readout.temperature.toFixed(1);
			// const message = `[${room}] temperature: ${temperature}°C, humidity: ${humidity}%, soil: ${isSoilWet}, lamp: ${isLampOn}`;

			controlTemperature(readout.temperature);

			modelSensor.create({
				name: room,
				timestamp: moment().format(),
				interval: interval / 1000,
				temperature: temperature,
				air_humidity: humidity,
				soil_humidity: isSoilWet,
				soil_humidity_status: soilMeasure,
				ralay_1: isLampOn,
				ralay_1_status: readRelayState(relay1),
			});
			console.log("Write to db");
		}
	},
	run: () => setInterval(() => app.read(), interval),
};
let startAppInterval;
app.connect()
	.then(() => {
		startAppInterval = setInterval(() => {
			const isRoundSecond = moment().second() % (interval / 1000) === 0;
			console.log(moment().second());
			if (isRoundSecond) {
				// Start app and clear interval
				app.run();
				clearInterval(startAppInterval);
			}
		}, 1000);
	})
	.catch((err) => {
		console.error(`Application stopped: ${err}`);
		startAppInterval && clearInterval(startAppInterval);
	});

function controlTemperature(temperature) {
	const isLampOn = readRelayState(relay4) === 0;
	if (temperature > maxTemperatureForLamp && isLampOn) switchRelay(relay4, 1);
	if (temperature < minTemperatureForLamp && !isLampOn) switchRelay(relay4, 0);
}
