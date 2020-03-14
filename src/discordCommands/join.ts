import * as twitch from '../clients/twitch';
import * as db from '../clients/db';

export const join = {
  name: 'join',
  description: 'lol',
  execute: (message, args) => {
    if(args[0]) {
      if (twitch.client.channels.includes(`#${args[0]}`)) {
        message.reply('already joined this channel.');
      } else {
        twitch.client.join(args[0]).then(() => {
          db.client.insert({
            name: args[0]
          }, (error, docs) => {
            if (error) {
              message.reply('joined channel but couldn\'t save it to the DB.');
            } else {
              message.reply('joined and saved channel to the DB.');
            }
          });
        }).catch(() => {
          message.reply('couldn\'t jin the channel. Does it exists?');
        });
      }
    } else {
      message.reply('please specify a channel for me to join.');
    }
  }
}
