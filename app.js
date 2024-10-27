const Gpio = require("pigpio").Gpio;
const sensorLib = require("node-dht-sensor");
const server = require("./bin/server");
const moment = require("moment");
const modelSensor = require("./models/sensor");

const minutes = 5;
const interval = 1000 * 60 * minutes;

// // Config
const maxTemperatureForLamp = 24;
const minTemperatureForLamp = 18;

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

			// Check if temperature is in range
			controlTemperature(readout.temperature);

			const soilMeasure = moistureSensor.digitalRead();
			const isSoilWet = soilMeasure === 1 ? "Wet" : "Dry";
			const lampStatus = readRelayState(relay1);
			const isLampOn = lampStatus === 0 ? "ON" : "OFF";
			const room = this.sensors[sensor].name;
			const humidity = readout.humidity.toFixed(1);
			const temperature = readout.temperature.toFixed(1);

			modelSensor.create({
				name: room,
				timestamp: moment().format(),
				interval: minutes,
				temperature: temperature,
				air_humidity: humidity,
				soil_humidity: isSoilWet,
				soil_humidity_status: soilMeasure,
				ralay_1: isLampOn,
				ralay_1_status: lampStatus,
			});

			const message = `[${room}] temperature: ${temperature}°C, humidity: ${humidity}%, soil: ${isSoilWet}, lamp: ${isLampOn}`;
			console.log(message);
		}
	},
	run: () => setInterval(() => app.read(), interval),
};
let startAppInterval;
app.connect()
	.then(() => {
		startAppInterval = setInterval(() => {
			const startApp = moment().startOf("minute").add(1, "minutes") === moment().startOf("minute");

			if (startApp) {
				// Start app and clear interval
				app.run();
				console.log("Application started");
				clearInterval(startAppInterval);
			}
		}, 1000);
	})
	.catch((err) => {
		console.error(`Application stopped: ${err}`);
		startAppInterval && clearInterval(startAppInterval);
	});

function controlTemperature(temperature) {
	const isLampOn = readRelayState(relay1) === 0;
	if (temperature > maxTemperatureForLamp && isLampOn) {
		switchRelay(relay1, 1);
		console.log("Lamp is off");
	}
	if (temperature <= minTemperatureForLamp && !isLampOn) {
		switchRelay(relay1, 0);
		console.log("Lamp is on");
	}
}
