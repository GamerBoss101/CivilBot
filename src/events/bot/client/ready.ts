import BotClient from "../../../types/BotClient";

import { post } from "../../../handlers/command_handler";

export default async (Discord: any, client: BotClient) => {
    client.user?.setPresence({ activities: [{ name: '/help' }] });
    post(client);
}