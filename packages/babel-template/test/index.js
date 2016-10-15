let generator = require("../../babel-generator").default;
let template  = require("../lib");
let chai      = require("chai");

let comments = "// Sum two numbers\nconst add = (a, b) => a + b;";

suite("templating", function () {
  test("import statement will cause parser to throw by default", function () {
    chai.expect(function () {
      template("import foo from 'foo'")({});
    }).to.throw();
  });

  test("import statements are allowed with sourceType: module", function () {
    chai.expect(function () {
      template("import foo from 'foo'", {sourceType: "module"})({});
    }).not.to.throw();
  });

  test("should strip comments by default", function () {
    let code = "const add = (a, b) => a + b;";
    let output = template(comments)();
    chai.expect(generator(output).code).to.be.equal(code);
  });

  test("should preserve comments with a flag", function () {
    let output = template(comments, {preserveComments: true})();
    chai.expect(generator(output).code).to.be.equal(comments);
  });
});
