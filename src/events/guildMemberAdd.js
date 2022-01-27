const fs = require('fs');
const config = require("../config")

module.exports = {
    name: 'guildMemberAdd',
    execute(member, client) {
        let users = JSON.parse(fs.readFileSync('src/users.json'));
        if(!users.users.includes(member.id)) {
            member.roles.add(config.role);
        }
    },
};