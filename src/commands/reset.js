const fs = require('fs');
const { ticketRole, modRole } = require("../config")

module.exports = {
    name: 'reset',
    description: 'Resets the role database & returns the role to everyone.',
    requiredRoles: modRole,
    async execute(interaction) {
        let rawData = fs.readFileSync('src/database.json');
        let database = JSON.parse(rawData);

        database.users = []

        let newData = JSON.stringify(database);
        fs.writeFileSync('src/database.json', newData);

        interaction.guild.members.cache.forEach(member => member.roles.add(ticketRole))

        interaction.reply({ content: `The roles and database have been reset.`, ephemeral: true });
    },
};