import * as tmi from 'tmi.js';
import {
  config
} from '../lib/config';
import * as db from './db';

export const client: tmi.Client = new tmi.Client({
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username: config.twitchName,
    password: config.twitchToken
  },
  channels: [config.twitchName]
});

client.on('connected', () => {
  db.client.find({}, (error, documents) => {
    if (error) {
      console.log(error.message);
      process.exit(1);
    }
  
    documents.forEach((channel, index) => {
      setTimeout(() => {
        client.join(channel.name).then(() => {
          console.log(`joined ${channel.name}`);
        }).catch((error) => {
          console.log(`error joining ${channel.name}`);
        });
      }, index * 250);
    });
  });
})

client.connect();

