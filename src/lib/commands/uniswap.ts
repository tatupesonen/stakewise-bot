import axios from 'axios';
import { EmbedField, MessageEmbed } from 'discord.js';
import { COMMAND_TYPE } from '../interfaces/ICommand';
import {
  IStakewisePoolData,
  StakewiseUniswapContract,
} from '../interfaces/IStakewisePoolData';
import { createCommand } from '../util/createCommand';
import { logger } from '../util/logger';

const UniswapCommand = createCommand({
  name: 'poolstats',
  type: COMMAND_TYPE.CHANNEL,
  description: 'Shows pool stats from Uniswap',
  async execute(message, container) {
    const poolDataUrl = `https://api.stakewise.io/uniswap-pools/`;
    const { data } = await axios.get<IStakewisePoolData[]>(poolDataUrl);
		message.deferReply();

    // Create embeds
    const embed = new MessageEmbed();
    const fields = data.map((e) => {
      const field: EmbedField = {
        inline: true,
        name: 'Tick',
        value: e.current_tick.toString(),
      };
    });
    embed.title = `Pool Stats`;
    embed.description = JSON.stringify(data);
    embed.setFooter(`Data from https://api.stakewise.io/uniswap-pools/`);
    embed.setTimestamp();

    try {
      message.channel.send({ embeds: [embed] });
    } catch (err) {
      logger.error(err);
    }
  },
});

export default UniswapCommand;
