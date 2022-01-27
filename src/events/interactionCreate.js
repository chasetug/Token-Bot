module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
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
				await command.execute(interaction);
			}
			catch (error) {
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
	},
};
