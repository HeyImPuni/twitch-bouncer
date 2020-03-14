import * as dotenv from 'dotenv';

const {
  parsed,
} = dotenv.config();

interface IConfig {
  twitchName: string;
  twitchToken: string;
  discordToken: string;
}

class Config implements IConfig {
  twitchName: string;
  twitchToken: string;
  discordToken: string;

  constructor(parsed: dotenv.DotenvParseOutput) {
    this.twitchName = parsed.TWITCH_NAME;
    this.twitchToken = parsed.TWITCH_TOKEN;
    this.discordToken = parsed.DISCORD_TOKEN;
  }
}

export const config = new Config(parsed);
