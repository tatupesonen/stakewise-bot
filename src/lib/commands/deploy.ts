import { ApplicationCommandData, Client } from 'discord.js';
import { DITypes } from '../container/container';

import { COMMAND_TYPE, ICommands } from '../interfaces/ICommand';
import { createCommand } from '../util/createCommand';

const DeployCommand = createCommand({
  name: 'deploy',
  description: "Deploys the bot's slash commands and context menus **(bot owner only)**",
  type: COMMAND_TYPE.LEGACY,
  async execute(interaction, container) {
    const commands = container.getByKey<ICommands>(DITypes.commands);
    // Get dependencies
    const client = container.getByKey<Client>('client');
    if (interaction.author.id !== process.env.OWNER) return;
    const slashCommands: ApplicationCommandData[] = Object.entries(commands)
      .filter(
        ([_, value]) =>
          value.type === COMMAND_TYPE.CHANNEL ||
          value.type === COMMAND_TYPE.SLASH
      )
      .reduce((acc, cur) => {
        acc.push(cur[1]);
        return acc;
      }, []);
    // await client.application.commands.set(slashCommands);
		await client.guilds.cache.get(process.env.GUILD).commands.set(slashCommands);
    interaction.reply(`Registered ${slashCommands.length} commands.`);
  },
});

export default DeployCommand;
