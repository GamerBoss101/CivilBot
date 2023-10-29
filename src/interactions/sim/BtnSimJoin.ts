import BotAction from "../../types/BotAction";
import BotClient from "../../types/BotClient";

export default class BtnSimJoin extends BotAction {
    constructor() {
        super('sim-join');
    }

    async btnExecute(Discord: any, client: BotClient, interaction: any) {

        let modal = new Discord.ModalBuilder()
        .setCustomId('sim-join')
        .setTitle('Create Citizen')

        let ageInput = new Discord.TextInputBuilder()
        .setCustomId('ageInput')
        .setLabel('What is your age?')
        .setPlaceholder('13-99')
        .setStyle(Discord.TextInputStyle.Short);

        let genderInput = new Discord.TextInputBuilder()
        .setCustomId('genderInput')
        .setLabel('What is your gender?')
        .setStyle(Discord.TextInputStyle.Short);

        let bioInput = new Discord.TextInputBuilder()
        .setCustomId('bioInput')
        .setLabel('Write a short bio about yourself')
        .setPlaceholder('I am a cool person')
        .setStyle(Discord.TextInputStyle.Paragraph);

        modal.addComponents(
            new Discord.ActionRowBuilder().addComponents(ageInput), 
            new Discord.ActionRowBuilder().addComponents(genderInput),
            new Discord.ActionRowBuilder().addComponents(bioInput)
        );

        return await interaction.showModal(modal);
    }

    async modelExecute(Discord: any, client: BotClient, interaction: any) {

        let age = interaction.fields.getTextInputValue('ageInput');
        let gender = interaction.fields.getTextInputValue('genderInput');
        let bio = interaction.fields.getTextInputValue('bioInput');

        let embed = new Discord.EmbedBuilder()
        .setTitle('Citizen Created!')
        .addFields(
            { name: "Age", value: age, inline: true },
            { name: "Gender", value: gender, inline: true },
            { name: "Bio", value: bio }
        );

        await client.storage.citizen.update(interaction.user.id, {
            age: parseInt(age),
            gender,
            bio
        });

        await interaction.reply({ embeds: [embed], ephemeral: true });
    }

    async execute(Discord: any, client: BotClient, interaction: any) {

        if(interaction.isButton()) return await this.btnExecute(Discord, client, interaction);
        if(interaction.isModalSubmit()) return await this.modelExecute(Discord, client, interaction);
    }
}