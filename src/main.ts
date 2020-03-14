import * as discord from './clients/discord';

discord.client.on('ready', () => {
  console.log('Discord is ready.')
});
