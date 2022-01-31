import { Client, EmbedField, MessageEmbed } from 'discord.js';
import { DITypes } from '../container/container';
import { BotInfo } from '../interfaces/BotInfo';
import { COMMAND_TYPE, ICommands } from '../interfaces/ICommand';
import { createCommand } from '../util/createCommand';
import { logger } from '../util/logger';

const HelpCommand = createCommand({
  name: 'help',
  type: COMMAND_TYPE.LEGACY,
  description: 'Shows a help menu',
  async execute(message, container) {
    const prefix = container.getByKey(DITypes.prefix);
    const client = container.getByKey<Client>(DITypes.client);
    const botInfo = container.getByKey<BotInfo>(DITypes.botInfo);

    const mappedPrefixes = {
      [COMMAND_TYPE.CHANNEL]: '/',
      [COMMAND_TYPE.LEGACY]: `${prefix}`,
      [COMMAND_TYPE.SLASH]: `Right-click message -> `,
    };

    const commands = container.getByKey<ICommands>(DITypes.commands);
    const embed = new MessageEmbed();
    embed.setThumbnail(client.user.avatarURL());

    const getBotOwnerInfo = () => client.users.cache.get(process.env.OWNER);
    const ownerInfo = getBotOwnerInfo();

    const embedContent = Object.values(commands).reduce((acc, cur) => {
      acc = `${acc}\n**${cur.name}**: ${cur.description}
	  usage: \`${mappedPrefixes[cur.type]}${cur.name}\``;
      return acc;
    }, '');
    const embedFields: EmbedField[] = [
      {
        inline: false,
        name: 'Commands',
        value: embedContent,
      },
      {
        inline: false,
        name: 'Websocket ping',
        value: client.ws.ping.toString(),
      },
    ];
    embed.title = `${botInfo.name} ${botInfo.version}`;
    embed.fields = embedFields;
    embed.setFooter(
      `Made with love by ${ownerInfo.username}`,
      ownerInfo.avatarURL()
    );
    embed.setTimestamp();
    // Create a list of commands with their description

    try {
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      logger.error(err);
    }
  },
});

export default HelpCommand;
