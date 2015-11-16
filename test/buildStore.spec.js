var helpers = require(__BASE + '/test/helpers');
var buildStore = require(__BASE + '/src/buildStore');

var expect = helpers.expect;

describe('buildStore', function() {
  var listenerAction, listenerUpdate;

  function update(model, action) {
    switch (action.type) {
      case 'open':
        model.isOpen = true;
        return model;

      default:
        return model;
    }
  }

  var model = {
    isOpen: false
  };

  var store = buildStore({update: update, model: model});

  before(function() {
    store.onAction(function(action) {
      listenerAction = action;
    });

    store.onUpdate(function(update) {
      listenerUpdate = update;
    });

    store.send({ type: 'open' });
  });

  it('onUpdate calls the listener with the updated state', function() {
    expect(listenerUpdate).to.eql({ isOpen: true });
  });

  it('onAction calls the listener with the sent action', function() {
    expect(listenerAction).to.eql({ type: 'open' });
  });

  it('store.model has been updated', function() {
    expect(store.model).to.eql({ isOpen: true });
  });
});
