import BotClient from "../../../types/BotClient";

import { post } from "../../../handlers/command_handler";

async function joinMessage(Discord: any, client: BotClient) {

    let guild = client.guilds.cache.get('1165657519587348540');

    let channel: any = guild?.channels.cache.get(guild?.systemChannelId as string);

    let row = new Discord.ActionRowBuilder()
    .addComponents(
        new Discord.ButtonBuilder()
            .setCustomId('sim-join')
            .setLabel('Join')
            .setStyle(Discord.ButtonStyle.Success),
    );

    let embed = new Discord.EmbedBuilder()
    .setTitle('Welcome to the server!')
    .setDescription('This is a test')

    await channel?.send({ embeds: [embed], components: [row] });
}

export default async (Discord: any, client: BotClient) => {
    client.user?.setPresence({ activities: [{ name: '/help' }] });
    post(client);

    // await joinMessage(Discord, client);
}