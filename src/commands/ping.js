const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Returns the bot's ping status"),

  async execute(interaction, client) {
    const pingembed = new MessageEmbed()

      .setColor("#5865f4")
      .setTitle(":ping_pong:  Pong!")
      .addFields(
        {
          name: "**Client** latency",
          value: `> **${Math.abs(
            Date.now() - interaction.createdTimestamp
          )}**ms`,
          inline: false,
        },
        {
          name: "**Api** latency",
          value: `> **${Math.round(client.ws.ping)}**ms`,
          inline: false,
        }
      )
      const button = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel("Discord latency")
          .setStyle("LINK")
          .setEmoji("💻")
          .setURL(
            'https://discordstatus.com/'
          ),
      );
      
    await interaction.reply({
      embeds: [pingembed],
      components: [button]
    });
    setTimeout(function () {
      button.components[0].setDisabled(true);
      interaction.editReply({embeds: [pingembed], components: [button]})

    }, 120000);
  },
};
