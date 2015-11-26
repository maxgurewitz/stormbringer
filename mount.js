var mainLoop = require('main-loop');
var diff = require('virtual-dom/vtree/diff');
var patch = require('virtual-dom/vdom/patch');
var create = require('virtual-dom/vdom/create-element');

module.exports = function mount(args) {
  var store = { send: args.actionEmitter.send, model: args.model };

  var loop = mainLoop(store, args.render, {
    diff: diff,
    patch: patch,
    create: create,
    document: args.document
  });

  args.actionEmitter.listen(function(action) {
    args.model = args.update(args.model, action);
    loop.update({ send: args.actionEmitter.send, model: args.model });
  });

  args.el.appendChild(loop.target);
  return args;
}
