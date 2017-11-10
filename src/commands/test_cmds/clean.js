const docker = require('../../docker');
const { CONTAINERS } = require('../../constants');

module.exports = {
  command: 'clean',
  desc: 'remove testing containers',
  builder: {
  },
  handler() {
    Object.keys(CONTAINERS.TEST).forEach((key) => {
      docker.removeContainer(CONTAINERS.TEST[key].name);
    });
  },
};
