module.exports = {
  command: 'docker <command>',
  desc: 'Manage Docker containers',
  builder(yargs) {
    return yargs.commandDir('docker_cmds');
  },
};
