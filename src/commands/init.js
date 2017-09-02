const { execSync } = require('child_process');
const semver = require('semver');
const chalk = require('chalk');
const path = require('path');
const docker = require('../docker');

const REPO_URL = 'https://github.com/linagora/openpaas-esn.git';
const REQUIRED_NODE_VERSION = '>=6';
const ERROR_CODE = {
  REQUIRED_NODE_VERSION: 1,
  DOCKER: 2
};

module.exports = {
  command: 'init',
  desc: 'init OpenPaaS',
  builder: {
  },
  handler() {
    checkNodeVersion();
    checkDocker();

    const projectDir = 'openpaas';
    cloneRepo(projectDir);

    installDependencies(path.join(process.cwd(), projectDir));
    initServices();
    initOpenPaaS(projectDir);
  },
};

function checkNodeVersion() {
  if (!semver.satisfies(process.version, REQUIRED_NODE_VERSION)) {
    console.error(chalk.red(
        'You are currently running Node %s but OpenPaaS requires %s. ' +
        'Please use a supported version of Node.\n'
      ),
      process.version,
      REQUIRED_NODE_VERSION);
    exit(ERROR_CODE.REQUIRED_NODE_VERSION);
  }
}

function checkDocker() {
  try {
    execSync('docker ps');
  } catch (error) {
    exit(ERROR_CODE.DOCKER);
  }
}

function getYarnVersionIfAvailable() {
  try {
    return (execSync('yarn --version 2> /dev/null').toString() || '').trim();
  } catch (error) {
    return null;
  }
}

function cloneRepo(outDir = 'openpaas') {
  return execSync(`git clone --depth=1 ${REPO_URL} ${outDir}`, { stdio: 'inherit' });
}

function installDependencies(projectDir) {
  let command;

  if (getYarnVersionIfAvailable()) {
    command = 'yarn global add grunt-cli bower && yarn';
  } else {
    command = 'npm i -g grunt-cli bower bower-cli && npm i';
  }

  return execSync(command, { stdio: 'inherit', cwd: projectDir });
}

function initServices() {
  docker.start();
}

function initOpenPaaS(projectDir) {
  const execOptions = { stdio: 'inherit', cwd: projectDir };
  execSync('node ./bin/cli db --host localhost --port 27017 --database esn', execOptions);
  execSync('node ./bin/cli elasticsearch --host localhost --port 9200', execOptions);
  execSync('node ./bin/cli populate', execOptions);
  execSync('node ./bin/cli platformadmin init --email admin@open-paas.org', execOptions);
}

function exit(code = 0) {
  if (code) {
    console.error(chalk.red(`exit with error code ${code}`));
  }

  process.exit(code);
}
