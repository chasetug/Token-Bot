const fs = require('fs');
const { ticketChannel, ticketRole } = require("../config")

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if(message.author.bot) return;
        if(message.channel.id !== ticketChannel) return;
        if(!message.member.roles.cache.find(r => r.id === ticketRole)) return;

        let rawData = fs.readFileSync('src/database.json');
        let database = JSON.parse(rawData);

        database.users.push(message.author.id.toString());

        let newData = JSON.stringify(database);
        fs.writeFileSync('src/database.json', newData);

        message.member.roles.remove(ticketRole);
    },
};