const fs = require('fs');
const { ticketRole, ticketChannel, guild } = require("../config")

module.exports = {
    name: 'messageDelete',
    async execute(message, client, tokens) {
        if(message.partial) {
            console.error(`PARTIAL DELETED MESSAGE DETECTED: ${message.id}`);

            let authorId = getKey(message.id);

            if (authorId === undefined) return;
            if (authorId.bot) return;

            let member = client.guilds.cache.get(guild).members.resolve(authorId);

            if(!member?.roles.cache.find(r => r.id === ticketRole)) {
                member?.roles.add(ticketRole);
            }

            tokens.delete(authorId);
        }
        else {
            if(message.author.bot) return;
            if(message.channel.id !== ticketChannel) return;

            if(!message.member.roles.cache.find(r => r.id === ticketRole)) {
                message.member.roles.add(ticketRole);
            }

            if(!tokens.has(message.author.id.toString())) return;
            tokens.delete(message.author.id.toString());
        }

        function getKey(value) {
            let results = [...tokens].find(([key, val]) => val === value)
            if(results === undefined) {
                console.log(`Cannot find author`)
                return results;
            }
            console.log(`FOUND AUTHOR: ${results[0]}`)
            return results[0];
        }
    },
};