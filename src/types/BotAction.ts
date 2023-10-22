import BotClient from "./BotClient";


export default class BotAction {
    id: string;
    constructor(id: string) {
        this.id = id;
    }

    getId(): string {
        return this.id;
    }

    async execute(Discord: any, client: BotClient, interaction: any) {
        interaction.reply({ content: "This Action is not Implemented Yet!", ephemeral: true });
    }
    
}