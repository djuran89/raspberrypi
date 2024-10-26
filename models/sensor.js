const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongooseSchema = new Schema(
	{
		name: { type: String, required: true },
		timestamp: { type: Date },
		interval: { type: Number },
		temperature: { type: Number },
		air_humidity: { type: Number },
		soil_humidity: { type: String },
		soil_humidity_status: { type: Number },
		ralay_1: { type: String },
		ralay_1_status: { type: Boolean },
	},
	{ timestamps: false, versionKey: false }
);

module.exports = mongoose.model("Sensors", mongooseSchema);
