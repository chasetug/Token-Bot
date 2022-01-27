const fs = require('fs');
const config = require("../config")

module.exports = {
    name: 'guildMemberAdd',
    execute(member, client) {
        let rawData = fs.readFileSync('src/users.json');
        let users = JSON.parse(rawData);
        if(!users.users.includes(member.id)) {
            member.roles.add(config.role);
        }
    },
};