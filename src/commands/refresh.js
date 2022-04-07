const fs = require('fs');
const { ticketRole, modRole, ticketChannel } = require("../config");

module.exports = {
    name: 'refresh',
    description: 'Refreshes the database.',
    requiredRoles: modRole,
    async execute(interaction) {
        let rawData = fs.readFileSync('src/database.json');
        let database = JSON.parse(rawData);

        database.users = [];

        await interaction.guild.channels.cache.get(ticketChannel).messages.fetch()
            .then(messages => {
                messages.forEach(message => {
                    let author = message.author.id.toString();
                    if(!database.users.includes(author)) {
                        database.users.push(author);
                    }
                })
            })

        let newData = JSON.stringify(database);
        fs.writeFileSync('src/database.json', newData);

        await interaction.guild.members.fetch()
            .then(members => {
                members.forEach(member => {
                    if(database.users.includes(member.id) && member.roles.cache.has(ticketRole)) {
                        member.roles.remove(ticketRole);
                    } else if(!database.users.includes(member.id) && !member.roles.cache.has(ticketRole)) {
                        member.roles.add(ticketRole)
                    }
                })
            });

        interaction.reply({ content: `The database has been refreshed.`, ephemeral: true })
    },
};