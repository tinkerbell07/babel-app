var results = [];

var _privateFieldValue = new WeakMap();

class Foo {
  constructor() {
    _privateFieldValue.set(this, {
      get: _get_privateFieldValue,
      set: void 0
    });

    this.self, results.push(2), babelHelpers.readOnlyError("#privateFieldValue");
  }

  get self() {
    results.push(1);
    return this;
  }

}

function _get_privateFieldValue() {
  return 42;
}
