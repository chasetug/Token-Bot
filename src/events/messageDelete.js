const fs = require('fs');
const { ticketRole, ticketChannel } = require("../config")

module.exports = {
    name: 'messageDelete',
    async execute(message, client) {
        if(message.author.bot) return;
        if(message.channel.id !== ticketChannel) return;

        let rawData = fs.readFileSync('src/users.json');
        let users = JSON.parse(rawData);

        if(!message.member.roles.cache.find(r => r.id === ticketRole)) {
            message.member.roles.add(ticketRole);
        }

        if(!users.users.includes(message.author)) return;

        users.users = users.users.filter((value, index, arr) => {
            return value === message.author;
        });

        let newData = JSON.stringify(users);
        fs.writeFileSync('src/users.json', newData);
    },
};