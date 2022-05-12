const { ticketRole, modRole, ticketChannel } = require("../config");
const config = require("../config");

module.exports = {
    name: 'refresh',
    description: 'Refreshes the database.',
    requiredRoles: modRole,
    async execute(interaction, tokens) {
        tokens.clear();
        await interaction.reply({content: "Refreshing the database and resetting roles. This may take a while..."});
        let ticketChan = interaction.guild.channels.cache.get(ticketChannel);
        let lastMessage = ticketChan.lastMessageId;
        let size = 1;

        while(size > 0) {
            let messages = await ticketChan.messages.fetch({limit: 100, before: lastMessage})
                .then(messages => {
                    messages.forEach(message => {
                        let author = message.author.id.toString();
                        if (!tokens.has(author)) {
                            tokens.set(author, message.id.toString());
                        }
                    })
                    lastMessage = messages.lastKey();
                    size = messages.size;
                })
        }

        await interaction.guild.members.fetch()
            .then(members => {
                members.forEach(member => {
                    if(tokens.has(member.id) && member.roles.cache.has(ticketRole)) {
                        member.roles.remove(ticketRole);
                    } else if(!tokens.has(member.id) && !member.roles.cache.has(ticketRole)) {
                        member.roles.add(ticketRole)
                    }
                })
            });

        await interaction.editReply({ content: `The database has been refreshed.`, ephemeral: true })
    },
};