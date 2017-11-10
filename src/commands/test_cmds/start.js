const { execSync } = require('child_process');
const docker = require('../../docker');
const logger = require('../../logger');
const { CONTAINERS, DOCKER_HOST } = require('../../constants');

module.exports = {
  command: 'start',
  desc: 'start testing containers',
  builder: {
  },
  handler() {
    Object.keys(CONTAINERS.TEST).forEach((key) => {
      startContainer(CONTAINERS.TEST[key]);
    });
  },
};

function startContainer(container) {
  if (docker.isContainerRunning(container.name)) {
    return logger.info(`${container.name} is running`);
  }

  if (docker.isContainerCreated(container.name)) {
    logger.info(`Starting ${container.name}`);
    return docker.startContainer(container.name);
  }

  const publishes = container.port.map(port => `-p ${DOCKER_HOST}:${port}:${port}`).join(' ');

  execSync(`docker run --name ${container.name} -d ${publishes} ${container.image}`, { stdio: 'inherit' });
}
