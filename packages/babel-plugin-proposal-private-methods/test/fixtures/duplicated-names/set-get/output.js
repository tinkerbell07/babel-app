var _privateField = new WeakMap();

var _getSet = new WeakMap();

class Cl {
  constructor() {
    _getSet.set(this, {
      get: _get_getSet,
      set: _set_getSet
    });

    _privateField.set(this, {
      writable: true,
      value: 0
    });
  }

}

function _set_getSet(newValue) {
  babelHelpers.classPrivateFieldSet(this, _privateField, newValue);
}

function _get_getSet() {
  return babelHelpers.classPrivateFieldGet(this, _privateField);
}
