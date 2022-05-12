const { ticketRole, modRole } = require("../config")

module.exports = {
    name: 'reset',
    description: 'Resets the role database & returns the role to everyone.',
    requiredRoles: modRole,
    async execute(interaction) {
       tokens.clear();

        await interaction.reply({content: "Currently resetting roles. Please wait...", ephemeral: true});

        interaction.guild.members.cache.filter(m => !m.roles.cache.has(ticketRole)).forEach(m => {
            console.log(m.user.username)
            m.roles.add(ticketRole)
        });

        await interaction.editReply({content: `The roles and database have been reset.`, ephemeral: true });
    },
};