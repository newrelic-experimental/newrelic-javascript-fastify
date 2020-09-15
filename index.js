'use strict'

/**
 * Allows users to `require('@newrelic/fastify')` directly in their app. If they
 * for some reason choose to explicitly use an older version of our instrumentation
 * then the supportability metrics for custom instrumentation will trigger.
 */
const newrelic = require('newrelic')
newrelic.instrumentWebframework('fastify', require('./lib/fastify-instrumentation'))
