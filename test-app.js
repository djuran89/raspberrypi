const Gpio = require("pigpio").Gpio;

const relay1 = new Gpio(23, { mode: Gpio.OUTPUT });

const switchRelay = (relay, state) => relay.digitalWrite(state);

switchRelay(relay1, 1);
