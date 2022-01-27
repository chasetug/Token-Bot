const fs = require('fs');
const config = require("../config")

module.exports = {
    name: 'messageDelete',
    async execute(message, client) {
        if(message.author.bot) return;
        if(message.channel.id === config.channel) {
            let users = JSON.parse(fs.readFileSync('src/users.json'));
            if(!users.users.includes(message.author)) {
                message.member.roles.add(config.role);
                users.users = users.users.filter((value, index, arr) => {
                    return value === message.author;
                });
                fs.writeFileSync('src/users.json', JSON.stringify(users));
            }
        }
    },
};