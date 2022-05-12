const fs = require('fs');
const { ticketChannel, ticketRole } = require("../config")

module.exports = {
    name: 'messageCreate',
    async execute(message, client, tokens) {
        if(message.author.bot) return;
        if(message.channel.id !== ticketChannel) return;
        if(!message.member.roles.cache.find(r => r.id === ticketRole)) return;

        if(message.partial) {
            message.fetch()
                .then(m => {
                    tokens.set(m.author.id.toString(), m.id.toString());
                    m.member.roles.remove(ticketRole);
                })
        }
        else {
            tokens.set(message.author.id.toString(), message.id.toString());
            message.member.roles.remove(ticketRole);
        }
    },
};