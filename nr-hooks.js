'use strict'

module.exports = [{
  type: 'web-framework',
  moduleName: 'fastify',
  onRequire: require('./lib/fastify-instrumentation')
}]
