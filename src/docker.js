const { execSync } = require('child_process');

const DOCKER_HOST = '172.17.0.1';
const CONTAINER = {
  REDIS: 'openpaas-redis',
  MONGODB: 'openpaas-mongodb',
  ELASTICSEARCH: 'openpaas-elasticsearch',
  RABBITMQ: 'openpaas-rabbitmq',
  SABRE: 'openpaas-sabre'
};

function start() {
  const creators = {
    [CONTAINER.REDIS]: createRedisContainer,
    [CONTAINER.MONGODB]: createMongoDbContainer,
    [CONTAINER.ELASTICSEARCH]: createEsContainer,
    [CONTAINER.RABBITMQ]: createRabbitMqContainer,
    [CONTAINER.SABRE]: createSabreContainer
  };

  Object.keys(CONTAINER).forEach((key) => {
    const container = CONTAINER[key];

    if (isContainerCreated(container)) {
      startContainer(container);
    } else {
      creators[container]();
    }
  });
}

function stop() {
  Object.keys(CONTAINER).forEach((key) => {
    const container = CONTAINER[key];
    stopContainer(container);
  });
}

function clean() {
  Object.keys(CONTAINER).forEach((key) => {
    const container = CONTAINER[key];
    removeContainer(container);
  });
}

function isContainerCreated(name) {
  try {
    execSync(`docker inspect ${name}`, { stdio: 'ignore' });
    return true;
  } catch (err) {
    return false;
  }
}

function isContainerRunning(name) {
  try {
    return (execSync(`docker inspect -f '{{.State.Running}}' ${name}`).toString() || '').trim() === 'true';
  } catch (err) {
    return false;
  }
}

function startContainer(name) {
  if (!isContainerRunning(name)) {
    return execSync(`docker start ${name}`, { stdio: 'ignore' });
  }
}

function stopContainer(name) {
  if (isContainerRunning(name)) {
    try {
      return execSync(`docker stop ${name}`, { stdio: 'ignore' });
    } catch (err) {
      return false;
    }
  }
}

function removeContainer(name) {
  try {
    return execSync(`docker rm -fv ${name}`, { stdio: 'ignore' });
  } catch (err) {
    return false;
  }
}

function createRedisContainer() {
  const name = CONTAINER.REDIS;
  return execSync(`docker run -d --name ${name} -p 6379:6379 redis:latest`, { stdio: 'inherit' });
}

function createEsContainer() {
  const name = CONTAINER.ELASTICSEARCH;
  return execSync(`docker run -d --name ${name} -p 9200:9200 elasticsearch:2.3.2`, { stdio: 'inherit' });
}

function createMongoDbContainer() {
  const name = CONTAINER.MONGODB;
  return execSync(`docker run -d --name ${name} -p 27017:27017 mongo:3.2.0`, { stdio: 'inherit' });
}

function createRabbitMqContainer() {
  const name = CONTAINER.RABBITMQ;
  return execSync(`docker run -d --name ${name} -p 5672:5672 rabbitmq:3.6.5-management`, { stdio: 'inherit' });
}

function createSabreContainer() {
  const name = CONTAINER.SABRE;
  return execSync(`docker run -d --name ${name} -p 8001:80 -e "SABRE_MONGO_HOST=${DOCKER_HOST}" -e "ESN_MONGO_HOST=${DOCKER_HOST}" -e "ESN_HOST=${DOCKER_HOST}" -e "AMQP_HOST=${DOCKER_HOST}"  linagora/esn-sabre`, { stdio: 'inherit' });
}

module.exports = {
  start,
  stop,
  clean,
  isContainerCreated,
  isContainerRunning,
  startContainer,
  stopContainer,
  removeContainer,
};
