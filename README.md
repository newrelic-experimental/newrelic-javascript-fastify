[![Experimental Project header](https://github.com/newrelic/opensource-website/raw/master/src/images/categories/Experimental.png)](https://opensource.newrelic.com/oss-category/#experimental)

# newrelic-javascript-fastify - Instrumentation for fastify web framework

Insttrumentation for Fastify web framework to be used with the
[Node agent](https://github.com/newrelic/node-newrelic). This module adds instrumentation for http verbs and routes.

## Installation

This module is dependent on the newrelic nodejs agent, It can be installed and loaded independenly based on spacific versioning needs.

Newrelic agent:
```
npm install newrelic
```

fastify instrumentation module:
```
npm install @newrelic/fastify
```

// for install from github, add the following in  package.json
```
"dependencies": {
  "@newrelic/fastify": "github:newrelic-experimental/newrelic-javascript-fastify"
}
```

## Getting Started

Add this module along with newrelic agent and you will see graphql schema type in the request show up as transacations in the Newrelic UI.
```
// index.js
require('@newrelic/fastify');
```

## Support

New Relic hosts and moderates an online forum where customers can interact with New Relic employees as well as other customers to get help and share best practices. Like all official New Relic open source projects, there's a related Community topic in the New Relic Explorers Hub. You can find this project's topic/threads here:

## Contributing
We encourage your contributions to improve newrelic-javascript-fastify! Keep in mind when you submit your pull request, you'll need to sign the CLA via the click-through using CLA-Assistant. You only have to sign the CLA one time per project.
If you have any questions, or to execute our corporate CLA, required if your contribution is on behalf of a company,  please drop us an email at opensource@newrelic.com.

## License
newrelic-javascript-fastify is licensed under the [Apache 2.0](http://apache.org/licenses/LICENSE-2.0.txt) License
