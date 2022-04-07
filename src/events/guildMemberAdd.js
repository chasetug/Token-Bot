const fs = require('fs');
const { ticketRole } = require("../config")

module.exports = {
    name: 'guildMemberAdd',
    execute(member, client) {
        let rawData = fs.readFileSync('src/users.json');
        let { users } = JSON.parse(rawData);

        if(!users.includes(member.id)) {
            member.roles.add(ticketRole);
        }
    },
};