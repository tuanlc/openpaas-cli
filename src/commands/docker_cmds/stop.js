const docker = require('../../docker');

module.exports = {
  command: 'stop',
  desc: 'stop OpenPaaS containers',
  builder: {
  },
  handler() {
    docker.stop();
  },
};
