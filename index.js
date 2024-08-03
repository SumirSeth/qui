const dotenv = require('dotenv');
dotenv.config();
const token = process.env.DISCORD_TOKEN;


const { Client,Collection, Events, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');


const client = new Client({
    intents: [GatewayIntentBits.Guilds]
})


client.once(Events.ClientReady, readyClient => {
    console.log('Ready!, logged in as', readyClient.user.tag);
})



client.commands = new Collection();

const folderPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(folderPath)

for (const folder of commandFolders) {
    const commandPath = path.join(folderPath, folder);
    const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandPath, file);
        const command = require(filePath);
        if ( 'data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
    } else {
        console.log('Command file does not have a data or execute property:', filePath);
    }
}}

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction);

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error('No command found with name:', interaction.commandName);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.editReply({
                content: 'There was an error while executing this command!',
                ephemeral: true
            });
        }
        else {
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true
            });
        }
    }
    


});





client.login(token);