var mainLoop = require('main-loop');
var diff = require('virtual-dom/vtree/diff');
var patch = require('virtual-dom/vdom/patch');
var create = require('virtual-dom/vdom/create-element');
var createModelProperty = require('./create-model-property');

module.exports = function mount(args) {
  var listenTo = args.listenTo || [];

  var loop = mainLoop(args.store, args.render, {
    diff: diff,
    patch: patch,
    create: create,
    document: args.document
  });

  var viewCompatibleStore = createModelProperty({
    send: args.store.send
  }, args.store.model);

  args.store.onUpdate(function () {
    loop.update(viewCompatibleStore);
  });

  args.el.appendChild(loop.target);
  return args.store;
};
