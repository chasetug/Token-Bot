const fs = require('fs');
const config = require("../config")

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if(message.author.bot) return;
        if(message.channel.id === config.channel) {
            if(message.member.roles.cache.find(r => r.id === config.role)) {
                let users = JSON.parse(fs.readFileSync('src/users.json'));
                users.users.push(message.author.id.toString());
                fs.writeFileSync('src/users.json', JSON.stringify(users));

                message.member.roles.remove(config.role);
            }
        }
    },
};