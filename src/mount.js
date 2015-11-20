var mainLoop = require('main-loop');
var diff = require('virtual-dom/vtree/diff');
var patch = require('virtual-dom/vdom/patch');
var create = require('virtual-dom/vdom/create-element');
var domDelegator = require('dom-delegator');

module.exports = function mount(args) {
  var listenTo = args.listenTo || [];

  var loop = mainLoop(args.model, args.render, {
    diff: diff,
    patch: patch,
    create: create
  });

  var delegator = domDelegator();
  for (i = 0; i < listenTo.length; i++) {
    delegator.listenTo(listenTo[i]);
  }

  args.store.onUpdate(function (model) {
    loop.update(model);
  });

  args.el.appendChild(loop.target);
  return args.store;
};
