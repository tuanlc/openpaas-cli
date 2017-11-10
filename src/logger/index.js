const chalk = require('chalk');

const DEBUG = chalk.gray('DEBUG:');
const INFO = chalk.blue('INFO:');
const WARN = chalk.yellow('WARN:');
const ERRO = chalk.red('ERRO:');

function debug(...args) {
  console.log(DEBUG, ...args);
}

function info(...args) {
  console.log(INFO, ...args);
}

function warn(...args) {
  console.log(WARN, ...args);
}

function error(...args) {
  console.error(ERRO, ...args);
}

module.exports = {
  debug,
  info,
  warn,
  error,
};
