const mocha = require("mocha");
const expect = require("chai").expect;

const toNoCase = require("./");

describe("to-no-case", function() {
  describe("space", function() {
    it("shouldnt touch space case", () => {
      expect(toNoCase("this is a string")).to.be.equal("this is a string");
    });
  });

  describe("camel", () => {
    it("should remove camel case", () => {
      expect(toNoCase("thisIsAString")).to.be.equal("thisisastring");
    });
  });

  describe("constant", () => {
    it("should remove constant case", () => {
      expect(toNoCase("THIS_IS_A_STRING")).to.be.equal("this is a string");
    });
  });

  describe("upper", () => {
    it("should not split upper case", function() {
      expect(toNoCase("UPPERCASE")).to.be.equal("uppercase");
    });
  });

  describe("lower", () => {
    it("should not split lower case", () => {
      expect(toNoCase("lowercase")).to.be.equal("lowercase");
    });
  });
  describe("pascal", () => {
    it("should remove pascal case", () => {
      expect(toNoCase("ThisIsAString")).to.be.equal("thisisastring");
    });

    it("should handle single letter first words", () => {
      expect(toNoCase("AStringIsThis")).to.be.equal("astringisthis");
    });

    it("should handle single letter first words with two words", () => {
      expect(toNoCase("AString")).to.be.equal("astring");
    });
  });

  describe("slug", () => {
    it("should remove slug case", () => {
      expect(toNoCase("this-is-a-string")).to.be.equal("this is a string");
    });
  });

  describe("snake", () => {
    it("should remove snake case", function() {
      this.timeout(15000);
      expect(toNoCase("this_is_a_string")).to.be.equal("this is a string");
    });
  });
});
