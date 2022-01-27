const fs = require('fs');
const config = require("../config")

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if(message.author.bot) return;
        if(message.channel.id === config.channel) {
            if(message.member.roles.cache.find(r => r.id === config.role)) {
                let rawData = fs.readFileSync('src/users.json');
                let users = JSON.parse(rawData);
                users.users.push(message.author.id.toString());
                let newData = JSON.stringify(users);
                console.log(newData);
                fs.writeFileSync('src/users.json', newData);
                message.member.roles.remove(config.role);
            }
        }
    },
};