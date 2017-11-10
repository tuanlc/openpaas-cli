module.exports = {
  command: 'test <command>',
  desc: 'Test utilities',
  builder(yargs) {
    return yargs.commandDir('test_cmds');
  },
};
