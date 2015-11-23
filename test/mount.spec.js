var raf = require('raf');
var jsdom = require('jsdom').jsdom;
var helpers = require(__BASE + '/test/helpers');
var mount = require(__BASE + '/mount');
var buildStore = require(__BASE + '/build-store');
var h = require(__BASE + '/h');

var document = jsdom();
var window = document.defaultView;
var expect = helpers.expect;

describe('mount', function() {
  var app;

  before(function() {
    var store = buildStore({
      model: { count: 0 },
      update: function(model, action) {
        if (action.type === 'increment') {
          model.count++;
        }
        return model;
      }
    });

    app = mount({
      document: document,
      el: document.documentElement,
      store: store,
      render: function(store) {
        return h('div', { id: 'app' }, 'count is : ' + store.model.count);
      }
    });
  });

  it('renders the correct text', function(done) {
    var renderedText = document.querySelector('#app').textContent;
    expect(renderedText).to.contain('count is : 0');
    app.send({ type: 'increment' });

    raf(function() {
      renderedText = document.documentElement.textContent;
      expect(renderedText).to.contain('count is : 1');
      done();
    });
  });
});
