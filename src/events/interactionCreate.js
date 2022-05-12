const {ticketRole} = require("../config");
module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client, tokens) {
		if (interaction.isCommand()) {
			if(!client.commands.has(interaction.commandName)) return interaction.reply({ content: 'This command does not exist.', ephemeral: true });

			const command = client.commands.get(interaction.commandName);

			let { requiredRoles = [] } = command;

			if (typeof requiredRoles === 'string') {
				requiredRoles = [requiredRoles];
			}

			for (const requiredRole of requiredRoles) {
				const role = interaction.guild.roles.cache.find(r => r.id === requiredRole);
				if(!role) return console.error(`Role ${role} does not exist`);

				if (!interaction.member.roles.cache.has(role.id)) {
					interaction.reply({ content: `You must have the \`${role.name}\` role to use this command.`, ephemeral: true });
					return;
				}
			}

			try {
				await command.execute(interaction, tokens);
			}
			catch (error) {
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
		else if(interaction.isButton()) {
			if(tokens.has(interaction.member.id) && interaction.member.roles.cache.has(ticketRole)) {
				interaction.member.roles.remove(ticketRole);
				interaction.reply({ content: `Your token has been removed. Delete your message in the channel.`, ephemeral: true })
			} else if(!tokens.has(interaction.member.id) && !interaction.member.roles.cache.has(ticketRole)) {
				interaction.member.roles.add(ticketRole)
				interaction.reply({ content: `Your token has been granted.`, ephemeral: true })
			}
			else {
				interaction.reply({ content: `Your token could not be granted. You may already have a token.`, ephemeral: true })
			}
		}
	},
};
