const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply("Welcome"));
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

module.exports = sendMessage = async (message) => {
	try {
		await bot.telegram.sendMessage(process.env.CHAT_ID, message);
	} catch (err) {
		console.log(err);
	}
};
