"use strict";

var _interopRequireWildcard = function (obj) { if (obj && obj.__esModule) { return obj; } else { var hop = Object.prototype.hasOwnProperty; var es_obj = { "default": obj }; if (typeof obj === "object" && obj !== null) { for (var key in obj) { if (key !== "default" && hop.call(obj, key)) { es_obj[key] = obj[key]; } } } return es_obj; } };

var _defaults = function (obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _foo = require("foo");

_defaults(exports, _interopRequireWildcard(_foo));

Object.defineProperty(exports, "foo", {
  enumerable: true,
  get: function get() {
    return _foo.foo;
  }
});
Object.defineProperty(exports, "foo", {
  enumerable: true,
  get: function get() {
    return _foo.foo;
  }
});
Object.defineProperty(exports, "bar", {
  enumerable: true,
  get: function get() {
    return _foo.bar;
  }
});
Object.defineProperty(exports, "bar", {
  enumerable: true,
  get: function get() {
    return _foo.foo;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _foo.foo;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _foo.foo;
  }
});
Object.defineProperty(exports, "bar", {
  enumerable: true,
  get: function get() {
    return _foo.bar;
  }
});
