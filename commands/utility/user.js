const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('User!'),

    async execute(interaction) {
        await interaction.reply(`${interaction.user} who joined on ${interaction}`);
    },
}