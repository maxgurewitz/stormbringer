module.exports = function send(args) {
  return function () { args.store.send({ type: args.type, payload: args.payload || {} }); };
}
