import * as twitch from '../clients/twitch';

export const list = {
  name: 'list',
  description: 'lol',
  execute: (message, args) => {
    let channels = twitch.client.channels.toString().replace(/#/g, '');
    message.reply(channels.replace(/,/g, ', '));
  }
}
