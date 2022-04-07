const fs = require('fs');
const { ticketRole, modRole } = require("../config")

module.exports = {
    name: 'reset',
    description: 'Resets the role database & returns the role to everyone.',
    requiredRoles: modRole,
    async execute(interaction) {
        let rawData = fs.readFileSync('src/users.json');
        let users = JSON.parse(rawData);

        users.users = []

        let newData = JSON.stringify(users);
        fs.writeFileSync('src/users.json', newData);

        interaction.guild.members.cache.forEach(member => member.roles.add(ticketRole))

        interaction.reply({ content: `The roles and database have been reset.`, ephemeral: true });
    },
};