const fs = require('fs');
const config = require("../config")

module.exports = {
    name: 'reset',
    description: 'Resets the role database',
    requiredRoles: config.modRole,
    async execute(interaction) {
        let rawData = fs.readFileSync('src/users.json');
        let users = JSON.parse(rawData);
        users.users = []
        let newData = JSON.stringify(users);
        fs.writeFileSync('src/users.json', newData);
        interaction.guild.members.cache.forEach(member => member.roles.add(config.role))

        interaction.reply({ content: `The roles and database have been reset.`, ephemeral: true });
    },
};