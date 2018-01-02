const Social = require(`${process.cwd()}/base/Social.js`);

class Pay extends Social {
  constructor(client) {
    super(client, {
      name: "pay",
      description: "Pay another user your activity points.",
      usage: "pay <@mention|userid> <amount>",
      category: "Social",
      cost: 0,
      aliases: ["loan", "donate"],
      botPerms: []
    });
  }

  async run(message, args, level) { // eslint-disable-line no-unused-vars
    if (args.length === 0) return message.response(undefined, "B-baka, you need to mention someone to b-be able to pay them.");
    try {
      const [bot, user] = await this.verifySocialUser(message, args[0]);
      if (bot) return message.response("❗", "Bot's cannot accumulate points or levels.");
      if (isNaN(args[1])) return message.response(undefined, "Not a valid amount");
      if (args[1] < 0) return message.response(undefined, "You cannot pay less than zero, whatcha trying to do? rob em?");
      else if (args[1] < 1) return message.response(undefined, "You paying 'em with air? boi don't make me slap you 👋");
      if (message.author.id === user) return message.response(undefined, "You cannot pay yourself, why did you even try it?");

      await this.usrPay(message, message.author.id, user, parseInt(args[1]));
    } catch (error) {
      this.client.logger.error(error);
    }
  }
}

module.exports = Pay;