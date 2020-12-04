'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
  } = app;
  // router.get('/', controller.home.index);
  router.resources('images', '/api/images', controller.home);
  router.resources('tags', '/api/tags', controller.home);
  router.resources('bms', '/api/bms', controller.home);
};