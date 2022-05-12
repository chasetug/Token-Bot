module.exports = {
    name: 'rateLimit',
    async execute(data, client) {
        console.log(`Rate limited for ${data.timeout}ms`)
        //client.guilds.cache.get(902117945101123584).cache.get(902117945101123584).send(`Rate limited for ${data.timeout}ms`)
    },
};