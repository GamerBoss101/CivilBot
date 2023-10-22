import { EmbedBuilder } from "discord.js";
import BotClient from "../types/BotClient";

import { setTimeout } from "timers/promises";

function getRoles(array: Array<any>, key: string, value: string) {
    let result;
    array.forEach((element) => {
        if(element[key] == value) {
            result = element.roles;
        }
    })
    return result;
}

function changeProperty(object: any, ...changes: any): any {
    changes.forEach((change: any) => {
        object[change.key] = change.value;
    });
    return object;
}

async function getCount(client: BotClient, target: string, roleName: string): Promise<number> {
    let freelancers = [];
    let server = await client.guilds.fetch(target);
    let role: any = await server.roles.fetch();
    role = role.find((role: any) => role.name == roleName);
    let member = await server.members.fetch();
    member.forEach(member => {
        if(member.roles.cache.has(role.id)) freelancers.push(member.user.username);
    });
    return freelancers.length;
}

async function getMemberByTag(client: BotClient, targetServer: string, username: string): Promise<any> {
    let server = await client.guilds.fetch(targetServer);
    let member: any = await server.members.fetch();
    member = member.find((member: any) => member.user.username == username.trim());
    return member;
}

function parseInteraction(interaction: any) {
    return { user: interaction.user, guild: interaction.guild, channel: interaction.channel };
}

function getIntfromString(inputString: string): string {
    let result = "";
    inputString.split("").forEach((char: string) => {
        if(parseInt(char) == 0 || parseInt(char) < 10) result += char;
    });
    return result;
}

function buildEmbed(obj: any): EmbedBuilder {
    let embed = new EmbedBuilder()
    if(obj.title) embed.setTitle(obj.title);
    if(obj.description) embed.setDescription(obj.description);
    if(obj.color) embed.setColor(obj.color);
    if(obj.url) embed.setURL(obj.url);
    if(obj.image) embed.setImage(obj.image);
    if(obj.thumbnail) embed.setThumbnail(obj.thumbnail);
    if(obj.timestamp) embed.setTimestamp();

    if(obj.author) {
        let name = obj.author.name || null;
        let url = obj.author.url || null;
        let iconURL = obj.author.iconURL || null;
        embed.setAuthor({ name: name, url: url, iconURL: iconURL });
    }

    if(obj.footer) {
        let text = obj.footer.text || null;
        let iconURL = obj.footer.iconURL || null; 
        embed.setFooter({ text: text, iconURL: iconURL });
    }

    if(obj.fields) {
        obj.fields.forEach((field: any) => {
            embed.addFields({ name: field.name, value: field.value, inline: field.inline || false });
        });
    }
    return embed;
}

export default {
    getCount,
    parseInteraction,
    buildEmbed,
    wait: setTimeout,
    getRoles,
    changeProperty,
    getMemberByTag,
    getIntfromString
}