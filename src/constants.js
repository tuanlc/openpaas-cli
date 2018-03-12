module.exports = {
  CONTAINERS: {
    TEST: {
      MONGODB: {
        image: 'mongo:3.4.13',
        name: 'esn-test-mongo',
        port: ['27017']
      },
      REDIS: {
        image: 'redis',
        name: 'esn-test-redis',
        port: ['6379']
      },
      ELASTICSEARCH: {
        image: 'elasticsearch:2.3.2',
        name: 'esn-test-es',
        port: ['9200']
      },
      RABBITMQ: {
        image: 'rabbitmq:3.6.5-management',
        name: 'esn-test-rabbit',
        port: ['5672']
      }
    }
  },

  DOCKER_HOST: '172.17.0.1',
};
