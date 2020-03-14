import {
  readdirSync
} from 'fs';
import {
  Client,
  Collection,
  Message,
  PartialMessage
} from 'discord.js';
import {
  config
} from '../lib/config';

export interface CommandInterface {
  name: string;
  description: string;
  execute(message: Message | PartialMessage, arg: Array<string>): void;
}

export const client: Client = new Client();

const commands: Collection<string, CommandInterface> = new Collection();
const commandFiles: Array < string > = readdirSync(`./dist/discordCommands`).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  import(`../discordCommands/${file}`).then((file) => {
    const commandName = Object.keys(file)[0];

    commands.set(commandName, file[commandName]);
  });
}


client.on('message', (message) => {
  if (message.author.id === client.user.id || message.author.bot) return;

  /* command handlng */
  const args = message.content.slice('!'.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (!commands.has(command)) return;

  try {
    commands.get(command).execute(message, args);
  } catch (error) {
    message.reply('there was an error trying to execute that command!');
  }
});

client.login(config.discordToken);
