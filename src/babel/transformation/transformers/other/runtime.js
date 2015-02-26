import includes from "lodash/collection/includes";
import * as util from  "../../../util";
import core from "core-js/library";
import has from "lodash/object/has";
import t from "../../../types";

var isSymboliterator = t.buildMatchMemberExpression("Symbol.iterator");

var coreHas = function (node) {
  return node.name !== "_" && has(core, node.name);
};

var ALIASABLE_CONSTRUCTORS = [
  "Symbol",
  "Promise",
  "Map",
  "WeakMap",
  "Set",
  "WeakSet"
];

var astVisitor = {
  enter(node, parent, scope, file) {
    var prop;

    if (t.isMemberExpression(node) && t.isReferenced(node, parent)) {
      // Array.from -> _core.Array.from
      var obj = node.object;
      prop = node.property;

      if (!t.isReferenced(obj, node)) return;

      if (!node.computed && coreHas(obj) && has(core[obj.name], prop.name) && !scope.getBindingIdentifier(obj.name)) {
        this.skip();
        return t.prependToMemberExpression(node, file.get("coreIdentifier"));
      }
    } else if (t.isReferencedIdentifier(node, parent) && !t.isMemberExpression(parent) && includes(ALIASABLE_CONSTRUCTORS, node.name) && !scope.getBindingIdentifier(node.name)) {
      // Symbol() -> _core.Symbol(); new Promise -> new _core.Promise
      return t.memberExpression(file.get("coreIdentifier"), node);
    } else if (t.isCallExpression(node)) {
      // arr[Symbol.iterator]() -> _core.$for.getIterator(arr)

      var callee = node.callee;
      if (node.arguments.length) return false;

      if (!t.isMemberExpression(callee)) return false;
      if (!callee.computed) return false;

      prop = callee.property;
      if (!isSymboliterator(prop)) return false;

      return util.template("corejs-iterator", {
        CORE_ID: file.get("coreIdentifier"),
        VALUE:   callee.object
      });
    } else if (t.isBinaryExpression(node)) {
      // Symbol.iterator in arr -> core.$for.isIterable(arr)

      if (node.operator !== "in") return;

      var left = node.left;
      if (!isSymboliterator(left)) return;

      return util.template("corejs-is-iterator", {
        CORE_ID: file.get("coreIdentifier"),
        VALUE:   node.right
      });
    }
  }
};

export var optional = true;

export function manipulateOptions(opts) {
  if (opts.whitelist.length) opts.whitelist.push("es6.modules");
}

export function Program(node, parent, scope, file) {
  scope.traverse(node, astVisitor, file);
}

export function pre(file) {
  file.setDynamic("helpersNamespace", function () {
    return file.addImport("babel-runtime/helpers", "babelHelpers");
  });

  file.setDynamic("coreIdentifier", function () {
    return file.addImport("babel-runtime/core-js", "core");
  });

  file.setDynamic("regeneratorIdentifier", function () {
    return file.addImport("babel-runtime/regenerator", "regeneratorRuntime");
  });
}

export function Identifier(node, parent, scope, file) {
  if (t.isReferencedIdentifier(node, parent, { name: "regeneratorRuntime" })) {
    return file.get("regeneratorIdentifier");
  }
}
