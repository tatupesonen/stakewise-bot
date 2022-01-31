import { AxiosInstance } from 'axios';
import { Client } from 'discord.js';
import dotenv from 'dotenv';
import { readdirSync } from 'fs';
import { createBot } from './lib/bot';
import { Container, DITypes } from './lib/container/container';
import { BotInfo } from './lib/interfaces/BotInfo';
import { ICommands } from './lib/interfaces/ICommand';
import { UniswapService } from './lib/service/UniswapService';
dotenv.config();

import { createApiBases } from './lib/util/APIBase';
import { logger } from './lib/util/logger';

const bootstrap = async () => {
  const pjson = await import('../package.json');
  const botName = pjson.name;
  const version = pjson.version;
  const botInfo = { name: botName, version };
  const prefix = process.env.PREFIX ?? 'swise!';

  const container = new Container();
  const commands: ICommands = {};
  // Let's load all the commands.
  const commandFiles = readdirSync(`${__dirname}/lib/commands`);
  commandFiles.forEach(async (item) => {
    const command = await import(`./lib/commands/${item}`);
    commands[command.default.name] = command.default;
    logger.verbose('Imported command ' + command.default.name);
  });

  // Create API base(s)
  const { UniswapAPI } = createApiBases(botInfo);

  // Register commands
  container.set<ICommands>(commands, DITypes.commands);
  container.set<string>(prefix, DITypes.prefix);
  
  // Register API bases
  container.set<AxiosInstance>(UniswapAPI, DITypes.uniswapAPI);

  // Create bot
  const { client: bot } = await createBot(container);

  container.set<Client>(bot, DITypes.client);
  container.set<BotInfo>(botInfo, DITypes.botInfo);

  // Create services
  const uniswapService = new UniswapService(container);
  container.set(uniswapService, DITypes.uniswapService);

  logger.info(`Starting ${botInfo.name} version ${botInfo.version}`);
  bot.login(process.env.DISCORD_TOKEN);
};
bootstrap();
