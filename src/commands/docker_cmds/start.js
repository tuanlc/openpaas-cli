const docker = require('../../docker');

module.exports = {
  command: 'start',
  desc: 'start OpenPaaS containers',
  builder: {
  },
  handler() {
    docker.start();
  },
};
