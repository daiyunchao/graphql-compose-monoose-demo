require('babel-register')({
  presets: ['env'],
  "plugins": [
    "transform-runtime",
    "transform-object-rest-spread"
  ]
});
require('babel-polyfill')
module.exports = require('./server.js');