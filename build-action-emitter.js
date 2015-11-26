var eventEmitter = require('event-emitter');

module.exports = function buildActionEmitter(builder) {
  var ee = eventEmitter();

  var send = function send(action) {
    ee.emit('action', action);
  };

  var listen = function listen(listener) {
    ee.on('action', listener);
  };

  if (builder) {
    builder(send);
  }

  return {
    listen: listen,
    send: send
  };
};
