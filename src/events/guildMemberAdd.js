const fs = require('fs');
const { ticketRole } = require("../config")

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client, tokens) {
        if(member.partial) {
            member.fetch()
                .then(m => {
                    if (!tokens.has(m.id)) {
                        m.roles.add(ticketRole);
                    }
                })
        } else {
            if (!tokens.has(member.id)) {
                member.roles.add(ticketRole);
            }
        }
    },
};