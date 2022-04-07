const fs = require('fs');
const { ticketChannel, ticketRole } = require("../config")

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if(message.author.bot) return;
        if(message.channel.id !== ticketChannel) return;
        if(!message.member.roles.cache.find(r => r.id === ticketRole)) return;

        let rawData = fs.readFileSync('src/users.json');
        let users = JSON.parse(rawData);

        users.users.push(message.author.id.toString());

        let newData = JSON.stringify(users);
        fs.writeFileSync('src/users.json', newData);

        message.member.roles.remove(ticketRole);
    },
};