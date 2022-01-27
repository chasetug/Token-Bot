const config = require("../config")
const fs = require('fs');

module.exports = {
    name: 'reset',
    description: 'Resets the roles and database for all users.',
    requiredRoles: config.modRole,
    async execute(interaction) {
        let users = JSON.parse(fs.readFileSync('src/users.json'));
        users.users = []
        fs.writeFileSync('src/users.json', JSON.stringify(users));

        interaction.guild.members.cache.forEach(member => member.roles.add(config.role))
        interaction.reply({ content: `The roles and database have been reset.`, ephemeral: true });
    },
};