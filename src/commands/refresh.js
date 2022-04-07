const fs = require('fs');
const { ticketRole, modRole, ticketChannel } = require("../config");

module.exports = {
    name: 'refresh',
    description: 'Refreshes the database.',
    requiredRoles: modRole,
    async execute(interaction) {
        let rawData = fs.readFileSync('src/users.json');
        let users = JSON.parse(rawData);

        users.users = [];

        await interaction.guild.channels.cache.get(ticketChannel).messages.fetch()
            .then(messages => {
                messages.forEach(message => {
                    let author = message.author.id.toString();
                    if(!users.users.includes(author)) {
                        users.users.push(author);
                    }
                })
            })

        let newData = JSON.stringify(users);
        fs.writeFileSync('src/users.json', newData);

        await interaction.guild.members.fetch()
            .then(members => {
                members.forEach(member => {
                    if(users.users.includes(member.id) && member.roles.cache.has(ticketRole)) {
                        member.roles.remove(ticketRole);
                    } else if(!users.users.includes(member.id) && !member.roles.cache.has(ticketRole)) {
                        member.roles.add(ticketRole)
                    }
                })
            });

        interaction.reply({ content: `The database has been refreshed.`, ephemeral: true })
    },
};