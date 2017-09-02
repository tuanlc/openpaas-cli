const docker = require('../../docker');

module.exports = {
  command: 'clean',
  desc: 'remove OpenPaaS containers',
  builder: {
  },
  handler() {
    docker.clean();
  },
};
