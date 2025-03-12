import { Gpio } from "pigpio";
import Sensors from "./Sensors.ts";

class Rasberry extends Sensors {
	private raspberryPin: number;
	private gpio: any;
	private isInput: boolean;

	constructor(pin: number, type?: number) {
		super(pin, type ?? 0);
		this.raspberryPin = pin;
		this.gpio = null;
		this.isInput = false;
	}

	read() {
		return this.gpio.digitalRead();
	}

	readSensor() {
		return this.readSensorData();
	}

	write(value: number) {
		this.gpio.digitalWrite(value);
	}

	createGpio() {
		this.gpio = new Gpio(this.raspberryPin, { mode: this.isInput ? Gpio.INPUT : Gpio.OUTPUT });
	}

	setInput(input: boolean) {
		this.isInput = input;
	}
}

export default Rasberry;
