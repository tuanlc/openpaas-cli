const yargs = require('yargs');


yargs // eslint-disable-line no-unused-expressions
  .strict()
  .usage('Usage: $0 <command> [options]')
  .commandDir('./commands')
  .demand(1, 'Please supply a valid command')
  .alias('help', 'h')
  .help('help')
  .version()
  .epilogue('for more information, go to https://github.com/heroandtn3/openpaas-cli')
  .example('$0 issue --help', 'show help of the issue command')
  .argv;
