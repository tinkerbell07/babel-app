var util = require("util");
var espree = require("espree");
var babelEslint = require("..");


function assertSameAST(a, b, path) {
  if (!path) {
    path = [];
  }

  function error(text) {
    throw new Error("At " + path.join(".") + ": " + text + ":\n" + util.inspect(a) + "\n" + util.inspect(b));
  }

  var typeA = a === null ? "null" : typeof a;
  var typeB = b === null ? "null" : typeof b;
  if (typeA !== typeB) {
    error("have not the same type (" + typeA + " !== " + typeB + ")");
  } else if (typeA === "object") {
    var keysA = Object.keys(a);
    var keysB = Object.keys(b);
    keysA.sort();
    keysB.sort();
    while (true) {
      var keyA = keysA.shift();

      // Exception: ignore "end" and "start" outside "loc" properties
      if ((keyA === "end" || keyA === "start") && path[path.length - 1] !== "loc") continue;
      // Exception: ignore root "comments" property
      if (keyA === "comments" && path.length === 0) continue;

      var keyB = keysB.shift();

      if (keyA === undefined && keyB === undefined) break;
      if (keyA === undefined || keyA > keyB) error("first does not have key \"" + keyB + "\"");
      if (keyB === undefined || keyA < keyB) error("second does not have key \"" + keyA + "\"");
      path.push(keyA);
      assertSameAST(a[keyA], b[keyB], path);
      path.pop();
    }
  } else if (a !== b) {
    error("are different (" + JSON.stringify(a) + " !== " + JSON.stringify(b) + ")");
  }
}

function parseAndAssertSame(code) {
    var esAST = espree.parse(code, {
      ecmaFeatures: {
        classes: true,
        jsx: true
      },
      tokens: true,
      loc: true,
      range: true
    });
    var acornAST = babelEslint.parse(code);
    assertSameAST(acornAST, esAST);
}

describe("acorn-to-esprima", function () {

  it("simple expression", function () {
    parseAndAssertSame("a = 1");
  });

  it("class declaration", function () {
    parseAndAssertSame("class Foo {}");
  });

  it("class expression", function () {
    parseAndAssertSame("var a = class Foo {}");
  });

  it("jsx expression", function () {
    parseAndAssertSame("<App />");
  });

  it("jsx expression with 'this' as identifier", function () {
    parseAndAssertSame("<this />");
  });

  it("jsx expression with a dynamic attribute", function () {
    parseAndAssertSame("<App foo={bar} />");
  });

  it("jsx expression with a member expression as identifier", function () {
    parseAndAssertSame("<foo.bar />");
  });

});
