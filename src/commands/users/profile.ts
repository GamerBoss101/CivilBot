import BotClient from "../../types/BotClient";
import BotCommand from "../../types/BotCommand";

export default class ProfileCommand extends BotCommand {

    constructor() {
        super("profile", "User Profile Command");

        this.data.addUserOption(option => option.setName('target').setDescription('The user'));
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        let target = interaction.options.getUser('target');
        if(!target) target = interaction.user;

        let citizenData = await client.storage.citizen.get(target.id);

        let obj = {
            name: target.username,
            avatar: target.avatarURL(),
            
        }

    }

}