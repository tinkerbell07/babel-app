class Foo {
  constructor (options) {
    let parentOptions = {};
    parentOptions.init = function () {
      this;
    };
    super(parentOptions);
  }
}
