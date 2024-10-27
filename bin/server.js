const mongoose = require("mongoose");

module.exports = server = async () => {
	return new Promise(async (resolve, reject) => {
		try {
			if (mongoose.connection.readyState !== 1) {
				await mongoose.connect(process.env.MONGODB_URI);
				resolve("Connected to MongoDB");
			}
		} catch (err) {
			reject(err);
		}
	});
};
