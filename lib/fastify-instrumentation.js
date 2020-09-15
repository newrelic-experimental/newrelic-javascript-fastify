'use strict'

module.exports = function initialize(shim, fastify) {
  if (!shim || !fastify) {
    shim.logger.debug(
        'Fastify instrumentation called with incorrect arguments, not instrumenting.'
    )
    return
  }

  shim.setFramework('Fastify')
//  shim.setErrorPredicate((err) => err instanceof Error)
  shim.setResponsePredicate(function fastifyResponsePredicate(args, result) {
    return !(result instanceof Error) && (result !== args[1].continue)
  })

  shim.wrapExport(fastify, function wrapFastify(shim, fn) {
    return function wrappedFastify() {
      const build = fn.apply(this, arguments)

      shim.wrapMiddlewareMounter(build, 'use', {
        route: shim.FIRST,
        wrapper: wrapMiddleware
      })

      const methods = ['all', 'delete', 'get', 'head', 'opts', 'post', 'put', 'patch']
      shim.wrapMiddlewareMounter(build, methods, {
        route: shim.FIRST,
        wrapper: wrapRouteHandler
      })

      shim.wrap(build, 'route', function wrapRoute(shim, route, name) {
        return function wrappedRoute() {
          const args = shim.argsToArray.apply(this, arguments)
          const {handler, url} = args[0]

          if (!handler) {
            return route.apply(this, args)
          }

          args[0].handler = wrapRouteHandler(shim, handler, name, url)

          return route.apply(this, args)
        }
      })


      return build
    }
  })
}

function wrapRouteHandler(shim, handler, name, route) {
  return shim.recordMiddleware(handler, {
    route,
    type: shim.MIDDLEWARE,
    next: function wrapNext(shim, fn, name, args, wrap) {
      const reply = args[1]
      if (!reply || !shim.isFunction(reply.send)) {
        return
      }
      wrap(reply, 'send', true)
    },
    req: function getReq(shim, fn, name, args) {
      const req = args[0]
      return req && req.raw
    }
  })
}

function wrapMiddleware(shim, middleware) {
  if (shim.isWrapped(middleware)) {
    return null
  }

  return shim.recordMiddleware(middleware, {
    route: shim.FIRST,
    type: shim.MIDDLEWARE,
    req: shim.FIRST
  })
}
