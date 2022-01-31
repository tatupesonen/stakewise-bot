import { Client, Intents } from 'discord.js';
import { Container, DITypes } from './container/container';
import { ICommands } from './interfaces/ICommand';
import { logger } from './util/logger';

export const createBot = async (container: Container) => {
  // Let's load all the commands.
  const commands = container.getByKey<ICommands>(DITypes.commands);

  const prefix = container.getByKey<string>(DITypes.prefix);

  //? The required intents for "messageCreate" and "messageReactionAdd". Events currently listened to
  const client = new Client({
    intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS],
    allowedMentions: { repliedUser: true },
    partials: ['CHANNEL'],
  });

  client.on('ready', async () => {
    logger.info('Bot ready');
    client.user.setActivity('token price: ', {
      type: 'WATCHING',
    });
  });

  client.on('guildCreate', async (guild) => {
    logger.info(`Joined a new guild! ${guild.name}, ${guild.id}`);
  });

  client.on('guildDelete', async (guild) => {
    logger.warn(`Removed from guild! ${guild.name}, ${guild.id}`);
  });

  client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.content.includes("nnari")) {
      try {
      message.channel.send("nnari oni hapaska");
      } catch (err) {
        logger.warn("Couldn't post in " + message.channel.id)
      }
    }
    if (
      message.mentions.has(client.user, {
        ignoreEveryone: true,
        ignoreRoles: true,
      }) &&
      message.content.trim().length <= client.user.id.length + 4
    ) {
    }
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const [command, ...commandArgs] = args;
    // Find command from args and run execute
    if (commands[command]) {
      return commands[command].execute(message, container, commandArgs);
    }
    logger.warn(
      `${message.author.username}: [${message.author.id}] tried to run nonexistent command ${prefix}${command}`
    );
  });

  client.on('interactionCreate', async (interaction) => {
    if (interaction.isContextMenu() || interaction.isCommand()) {
      try {
        if (commands[interaction.commandName]) {
          commands[interaction.commandName].execute(interaction, container);
          logger.info(
            `${interaction.user.username}: [${interaction.user.id}] ran command ${interaction.commandName}`
          );
        }
      } catch (err) {
        logger.error(
          `Failed to run command ${interaction.commandName} - commandID ${
            interaction.commandId ?? 'no ID'
          }`
        );
      }
    }
  });
  return { client };
};
