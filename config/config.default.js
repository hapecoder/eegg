/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  config.security = {
    csrf: {
      enable: false,
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1606288321606_1517';

  // add your middleware config here
  config.middleware = [];
  config.static = {
    prefix: '/',
    dir: [path.join(appInfo.baseDir, 'web/dist/spa'), {
      prefix: '/example',
      dir: path.join(appInfo.baseDir, 'example'),
    }],
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27017',
      options: {
        autoIndex: false,
        useUnifiedTopology: true,
      },
      // mongoose global plugins, expected a function or an array of function and options
      // plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};