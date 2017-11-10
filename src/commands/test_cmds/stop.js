const docker = require('../../docker');
const { CONTAINERS } = require('../../constants');

module.exports = {
  command: 'stop',
  desc: 'stop testing containers',
  builder: {
  },
  handler() {
    Object.keys(CONTAINERS.TEST).forEach((key) => {
      docker.stopContainer(CONTAINERS.TEST[key].name);
    });
  },
};
