const config = require("../config")
const {ticketChannel} = require("../config");

module.exports = {
    name: 'ready',
    once: true,
    async execute(client, client2, tokens) {
        console.log('Logged in and ready!');

        const guild = client.guilds.cache.get(config.guild);
        await guild.members.fetch();
        console.log('Fetched member cache!');

        // Register slash commands
        const data = [
            {
                name: 'ping',
                description: 'Provides API and Bot latency.',
            },
            {
                name: 'reset',
                description: 'Gives everyone the role, resets the database.',
            },
            {
                name: 'refresh',
                description: 'Compares the database with the current messages, fixes roles.',
            },
            {
                name: 'clear',
                description: 'Clears the channel and resets roles.',
            },
            {
                name: 'status',
                description: 'Sets the bot user\'s status',
                options: [
                    {
                        name: 'name',
                        type: 'STRING',
                        description: 'The name of the status',
                        required: true,
                    },
                    {
                        name: 'type',
                        type: 'STRING',
                        description: 'The type of status',
                        required: false,
                        choices: [
                            {
                                name: 'playing',
                                value: 'PLAYING',
                            },
                            {
                                name: 'watching',
                                value: 'WATCHING',
                            },
                            {
                                name: 'competing',
                                value: 'COMPETING',
                            },
                            {
                                name: 'streaming',
                                value: 'STREAMING',
                            },
                            {
                                name: 'listening',
                                value: 'LISTENING',
                            },
                        ],
                    },
                    {
                        name: 'url',
                        type: 'STRING',
                        description: 'The url of the status (if WATCHING or STREAMING)',
                        required: false,
                    },
                ],
            },
        ];

        await guild.commands.set(data).catch(console.error);

        let ticketChan = guild.channels.cache.get(ticketChannel);
        let lastMessage = ticketChan.lastMessageId;
        let size = 1;

        while(size > 0) {
            await ticketChan.messages.fetch({limit: 100, before: lastMessage})
                .then(messages => {
                    messages.forEach(message => {
                        let author = message.author.id.toString();
                        if (!tokens.has(author)) {
                            tokens.set(author, message.id.toString());
                        }
                    })
                    lastMessage = messages.lastKey();
                    size = messages.size;
                })
        }

        console.log("Fetched messages!")

    },
}