const env = process.env.NODE_ENV || 'prod';
const allowedEnvs = ['dev'];

const dev = require('./config/renderer/dev');
const prod = require('./config/renderer/prod');

const configs = {
  dev,
  prod,
};

function getValidEnv() {
  const isValid = env && env.length > 0 && allowedEnvs.indexOf(env) !== -1;
  return isValid ? env : 'prod';
}

function buildConfig() {
  const usedEnv = getValidEnv(env);
  return configs[usedEnv];
}

module.exports = buildConfig();
