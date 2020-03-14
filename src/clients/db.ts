import * as Nedb from 'nedb';

export const client = new Nedb({
  filename: `./storage/channels.db`,
  autoload: true
});

client.ensureIndex({
  unique: true,
  fieldName: 'name'
});
