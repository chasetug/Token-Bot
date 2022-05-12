const fs = require('fs');
const { ticketRole, modRole, ticketChannel } = require("../config");

module.exports = {
    name: 'clear',
    description: 'Clears the channel.',
    requiredRoles: modRole,
    async execute(interaction, tokens) {

        await interaction.guild.channels.cache.get(ticketChannel).messages.fetch()
            .then(messages => {
                messages.forEach(message => {
                    if(!message.member.roles.cache.has(modRole)) message.delete();
                })
            });

        tokens.clear();

        interaction.guild.members.cache.forEach(member => member.roles.add(ticketRole));

        interaction.reply({ content: `The channel has been cleared.`, ephemeral: true });
    },
};