import * as twitch from '../clients/twitch';
import * as db from '../clients/db';

export const leave = {
  name: 'leave',
  description: 'lol',
  execute: (message, args) => {
    if (args[0]) {
      twitch.client.leave(args[0]).then(() => {
        db.client.remove({
          name: args[0]
        }, (error) => {
          if (error) {
            message.reply('could not remove the channel from the database.');
          } else {
            message.reply('left channel and removed it from the database.')
          }
        });
      }).catch(() => {
        message.reply(`Error.`);
      });
    } else {
      message.reply('please specify a channel for me to leave.');
    }
  }
}
