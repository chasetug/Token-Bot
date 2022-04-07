const fs = require('fs');
const { ticketRole, ticketChannel } = require("../config")

module.exports = {
    name: 'messageDelete',
    async execute(message, client) {
        if(message.author.bot) return;
        if(message.channel.id !== ticketChannel) return;

        let rawData = fs.readFileSync('src/database.json');
        let database = JSON.parse(rawData);

        if(!message.member.roles.cache.find(r => r.id === ticketRole)) {
            message.member.roles.add(ticketRole);
        }

        if(!database.users.includes(message.author)) return;

        database.users = database.users.filter((value, index, arr) => {
            return value === message.author;
        });

        let newData = JSON.stringify(database);
        fs.writeFileSync('src/database.json', newData);
    },
};