import sensorLib from "node-dht-sensor";

//	sensors: [{ name: "Garden", type: 11, pin: temperaturGpio }],
class Sensors {
	private type: number | undefined;
	private pin: number;
	private sensor: any;
	private name: string | null;

	constructor(pin: number, type?: number) {
		this.name = null;
		this.type = type;
		this.pin = pin;
		this.sensor = null;
	}

	createSensor() {
		this.sensor = sensorLib.initialize(this.type, this.pin);
	}

	readSensorData() {
		const { temperature, humidity } = sensorLib.read(this.type, this.pin);
		return { temperature, humidity };
	}

	setName(name: string) {
		this.name = name;
	}

	setType(type: number) {
		this.type = type;
	}
}

export default Sensors;
