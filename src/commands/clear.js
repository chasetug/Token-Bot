const fs = require('fs');
const { ticketRole, modRole, ticketChannel } = require("../config");

module.exports = {
    name: 'clear',
    description: 'Clears the channel.',
    requiredRoles: modRole,
    async execute(interaction) {

        await interaction.guild.channels.cache.get(ticketChannel).messages.fetch()
            .then(messages => {
                messages.forEach(message => {
                    if(!message.member.roles.cache.has(modRole)) message.delete();
                })
            });

        let rawData = fs.readFileSync('src/database.json');
        let database = JSON.parse(rawData);

        database.users = [];

        let newData = JSON.stringify(database);
        fs.writeFileSync('src/database.json', newData);

        interaction.guild.members.cache.forEach(member => member.roles.add(ticketRole));

        interaction.reply({ content: `The channel has been cleared.`, ephemeral: true });
    },
};