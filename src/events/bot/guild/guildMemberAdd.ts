import BotClient from "../../../types/BotClient";

async function createCitizenRole(guild: any) {
    await guild.roles.create({
        name: 'Citizen',
        color: 'BLUE',
        permissions: []
    });
}

export default async(Discord: any, client: BotClient, member: any) => {

    let citizenRole = await member.guild.roles.cache.find((role: any) => role.name === "Citizen");

    if(!citizenRole) citizenRole = await createCitizenRole(member.guild);

    member.roles.add(citizenRole);

    await member.send(`Welcome to the server, ${member.user.username}!\nUse \`/help\` to get started.`);

    await client.storage.citizen.create(member.user.id);

    client.logger.log(`&2Member Joined: &f${member.user.username} - &5${member.guild.name}`);

};