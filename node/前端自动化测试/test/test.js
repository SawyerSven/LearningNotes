"use strict";
const expect = require("chai").expect;
const async = require("../index");

setTimeout(() => {
  describe("My First Test", () => {
    it("Welcome to Tmall", done => {
      async("Tmall", res => {
        expect(res).to.be.equal("Hello Tmall");
        done();
      });
    });
  });
  run();
}, 2000);
