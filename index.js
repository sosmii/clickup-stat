#!/usr/bin/env node

const sender = require('./clickup-request-sender');
const parser = require('./clickup-response-parser');

const program = require('commander');
program
  .option('-l, --list [clickupListsNumber]', '', lists => lists.split(','))
  .parse(process.argv);

const targetLists = program.list;

(async () => {
  const tasks = await sender(targetLists);
  const str = parser(tasks);
  console.log(str);
})();
