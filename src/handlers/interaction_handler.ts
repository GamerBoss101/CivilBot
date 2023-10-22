import fs from "fs";
import path from "path";

import ms from "ms";

import BotClient from "../types/BotClient";
import BotAction from "../types/BotAction";

function isAction(file: string): boolean {
    return file.endsWith(".js");
}

function ScanDir(Discord: any, client: BotClient, dir: string) {
    fs.readdirSync(dir).forEach((file: string) => {
        if(isAction(file)) return loadAction(Discord, client, `${dir}/${file}`);
        else return ScanDir(Discord, client, `${dir}/${file}`);
    });
}

async function loadAction(Discord: any, client: BotClient, file: string): Promise<void> {
    const action: BotAction = new (await import(file)).default();
    client.action.set(action.getId(), action);
}

export default async(Discord: any, client: BotClient) => { 
    ScanDir(Discord, client, path.join(__dirname, `../interactions/`));
    await client.util.wait(ms("5s"));
    client.logger.log(`&6${client.action.size} &a- Actions Loaded`);
}