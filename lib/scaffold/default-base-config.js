'use strict';

var path = require('path');

/**
 * Will return the path and default bitcore-node-mue configuration on environment variables
 * or default locations.
 * @param {Object} options
 * @param {String} options.network - "testnet" or "livenet"
 * @param {String} options.datadir - Absolute path to bitcoin database directory
 */
function getDefaultBaseConfig(options) {
  if (!options) {
    options = {};
  }

  var datadir = options.datadir || path.resolve(process.env.HOME, '.mue');

  return {
    path: process.cwd(),
    config: {
      network: options.network || 'livenet',
      port: 3001,
      services: ['bitcoind', 'web', 'insight-api-mue', 'insight-ui-mue'],
      servicesConfig: {
        bitcoind: {
          spawn: {
            datadir: datadir,
            exec: path.resolve(__dirname, datadir, 'mued')
          }
          "connect": [{
        "rpchost": "127.0.0.1",
        "rpcport": 29947,
        "rpcuser": "mue",
        "rpcpassword": "local321",
        "zmqpubrawtx": "tcp://127.0.0.1:28332"
      }]
        }
      }
    }
  };
}

module.exports = getDefaultBaseConfig;
