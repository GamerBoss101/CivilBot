import { Client, Collection, EmbedBuilder } from "discord.js";
import BotCommand from "./BotCommand";
import Logger from "../libs/Logger";

import Util from "../libs/Util";
import Formatter from "../libs/Formatter";
import BotAction from "./BotAction";
import Mongo from "../storage/Mongo";

interface botUtil {
    getRoles(arg0: any[], arg1: string, arg2: any): any;
    wait(time: number): any;
    getCount(client: BotClient, target: string, roleName: string): Promise<number>
    parseInteraction(interaction: any): any
    buildEmbed(obj: any): EmbedBuilder
    changeProperty(object: any, ...changes: any): any
    getMemberByTag(client: BotClient, targetServer: string, username: string): Promise<any>
    getIntfromString(string: string): string
}

export default class BotClient extends Client {
    user: any;
    logger: Logger
    storage: Mongo;
    util: botUtil;
    formatter: Formatter;
    action: Collection<string, BotAction>;
    commands: Collection<string, BotCommand>;
    constructor(props: any) {
        super(props);
        this.logger = new Logger();
        this.storage = new Mongo();
        this.util = Util;
        this.formatter = new Formatter();
        this.action = new Collection();
        this.commands = new Collection();
    }
}