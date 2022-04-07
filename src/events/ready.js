const config = require("../config")

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Logged in and ready!');

        const guild = client.guilds.cache.get(config.guild);
        await guild.members.fetch();
        console.log('Fetched member cache!');
        await guild.channels.cache.get(config.ticketChannel).messages.fetch();
        console.log("Fetched messages!");

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
        await client.guilds.cache.get(config.guild).commands.set(data).catch(console.error);
    },
}