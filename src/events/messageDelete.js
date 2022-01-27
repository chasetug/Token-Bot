const fs = require('fs');
const config = require("../config")

module.exports = {
    name: 'messageDelete',
    async execute(message, client) {
        console.log("Deleted message.")
        if(message.author.bot) return;
        if(message.channel.id === config.channel) {
            console.log("got message")
            console.log(config.role)
            let rawData = fs.readFileSync('src/users.json');
            let users = JSON.parse(rawData);
            if(!users.users.includes(message.author)) {
                message.member.roles.add(config.role);
                users.users = users.users.filter((value, index, arr) => {
                    return value === message.author;
                });
                let newData = JSON.stringify(users);
                fs.writeFileSync('src/users.json', newData);
            }
        }
    },
};