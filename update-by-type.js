function identity(model) {
  return model;
}

module.exports = function updateByType(types) {
  return function update(model, action) {
    var actionHandler = types[action.type] ||
      types.default ||
      identity;

    return actionHandler(model, action.payload);
  };
};
