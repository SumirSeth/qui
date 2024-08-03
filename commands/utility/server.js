const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Server!'),

    async execute(interaction) {
        await interaction.reply(interaction.guild.name, "and has " + interaction.guild.memberCount + " members");
    },
}