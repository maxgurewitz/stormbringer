var mainLoop = require('main-loop');
var diff = require('virtual-dom/vtree/diff');
var patch = require('virtual-dom/vdom/patch');
var create = require('virtual-dom/vdom/create-element');

module.exports = function mount(args) {
  var listenTo = args.listenTo || [];

  var loop = mainLoop(args.store, args.render, {
    diff: diff,
    patch: patch,
    create: create
  });

  var illegalSetMessage = 'Cannot mutate model while in render function.';
  var viewCompatibleStore = Object.create({
      send: args.store.send
    }, {
      model: {
        get: function() { return args.store.model; },
        set: function() { throw new Error(illegalSetMessage); }
      }
    });

  args.store.onUpdate(function () {
    loop.update(viewCompatibleStore);
  });

  args.el.appendChild(loop.target);
  return args.store;
};
