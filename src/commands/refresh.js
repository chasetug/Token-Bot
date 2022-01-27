const fs = require('fs');
const config = require("../config")

module.exports = {
    name: 'refresh',
    description: 'Refreshes the database.',
    requiredRoles: '0', //Moderator Role
    async execute(interaction) {
        let rawData = fs.readFileSync('src/users.json');
        let users = JSON.parse(rawData);
        users.users = []
        let newData = JSON.stringify(users);
        fs.writeFileSync('src/users.json', newData);
        const members = await interaction.guild.members.fetch()
        for(const member of members) {
            if(users.users.includes(member.id) && member.roles.cache.has(config.role)) {

            }
        }
        interaction.reply("Database reset.")
    },
};