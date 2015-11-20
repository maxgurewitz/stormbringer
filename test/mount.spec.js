var document = require('min-doc');
var h = require('virtual-dom');
var event = require('synthetic-event');
var helpers = require(__BASE + '/test/helpers');
var mount = require(__BASE + '/src/mount');
var buildStore = require(__BASE + '/src/buildStore');

describe('mount', function() {
  function render(store) {
    return h('div', {
      'ev-click', function() {
        store.send({ type: 'increment' });
      }
    }, store.model.count + ' click');
  }

  var store = buildStore({
    update: function(model, action) {
      switch (action.type) {
        case 'increment':
          model.count++;
          return model;
        default:
          return model;
      }
    },
    model: {
      count: 0
    }
  });

  before(function() {
    var div = document.createElement('div');
    mount({store: store, el: div, render: render, listenTo: ['mouseover']});
    div.dispatchEvent(event({ type: 'click' }));
  });

  it('renders the correct output', function() {
    expect(div.innerHtml).to.equal(h('div', '1 click'));
  });
});
