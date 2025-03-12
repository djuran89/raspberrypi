import { Gpio } from "pigpio";
import Sensors from "./Sensors.ts";

class Rasberry extends Sensors {
	private raspberryPin: number;
	private gpio: any;
	private isInput: boolean;
	private on: number;
	private off: number;

	constructor(pin: number, type?: number) {
		super(pin, type ?? 0);
		this.raspberryPin = pin;
		this.gpio = null;
		this.isInput = false;
		this.on = 0;
		this.off = 1;
	}

	read() {
		return this.gpio.digitalRead();
	}

	write(value: number) {
		this.gpio.digitalWrite(value);
	}

	switch() {
		const value = this.read() === 1 ? 0 : 1;
		this.write(value);
	}

	turn_on() {
		this.write(this.on);
	}

	turn_off() {
		this.write(this.off);
	}

	readSensor() {
		return this.readSensorData();
	}

	createGpio() {
		this.gpio = new Gpio(this.raspberryPin, { mode: this.isInput ? Gpio.INPUT : Gpio.OUTPUT });
	}

	setInput(input: boolean) {
		this.isInput = input;
	}
}

export default Rasberry;
