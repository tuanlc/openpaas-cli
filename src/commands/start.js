const { execSync } = require('child_process');

module.exports = {
  command: 'start',
  desc: 'start OpenPaaS',
  builder: {
  },
  handler() {
    execSync('grunt dev', { stdio: 'inherit' });
  },
};
