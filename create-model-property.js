module.exports = function createModelProperty(store, model) {
  var illegalSetMessage = 'Cannot set model on store.';

  return Object.create(store, {
      model: {
        get: function() { return model; },
        set: function() { throw new Error(illegalSetMessage); }
      }
    });
}
