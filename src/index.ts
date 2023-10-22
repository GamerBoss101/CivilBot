import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import Discord from "discord.js";
import mongoose from "mongoose";
import BotClient from "./types/BotClient";

dotenv.config();

const client = new BotClient({ 
    partials: [Discord.Partials.Message, Discord.Partials.Channel, Discord.Partials.Reaction],
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.GuildPresences,
        Discord.GatewayIntentBits.MessageContent
    ],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true }
});


(async() => {
    fs.readdirSync(path.join(__dirname, "./handlers")).forEach( async(file: string) => {
        await (await import(path.join(__dirname, `./handlers/${file}`))).default(Discord, client);
    });
})();

mongoose.set('strictQuery', true);
// @ts-ignore
mongoose.connect(process.env.URI).then(() => { client.logger.log("&aConnected to Database!") });
client.login(process.env.Token).then(() => client.logger.log("&aBot Online!")).catch(() => console.log(new Error("Invalid Discord Bot Token Provided!")));

// PROCESS

process.on('uncaughtException', (err) => {
    console.log(err); 
    client.logger.log("&4" + err);
});
process.on('unhandledRejection', (err) => {
    console.log(err); 
    client.logger.log("&4" + err);
});