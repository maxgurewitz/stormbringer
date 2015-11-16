var eventEmitter = require('event-emitter');

module.exports = function buildStore(args) {
  var emitter = eventEmitter();

  var onAction = function onAction(listener) {
    emitter.on('action', listener);
  };

  var onUpdate = function onUpdate(listener) {
    emitter.on('update', listener);
  };

  var send = function send(action) {
    emitter.emit('action', action);
  };

  var store = {
    model: args.model,
    onUpdate: onUpdate,
    onAction: onAction,
    send: send
  };

  emitter.on('action', function(action) {
    store.model = args.update(store.model, action);
    emitter.emit('update', store.model);
  });

  return store;
};
