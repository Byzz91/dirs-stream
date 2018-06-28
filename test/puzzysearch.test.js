const assert = require('assert')
const puzzySearch = require("../src/index.js");

describe('Require', () => {
  it('it should return true when typeof is object (1)', () => {
    assert.equal(typeof puzzySearch, 'object');
  });

  it('it should return truen when type is object (2)', () => {
    assert.equal(typeof puzzySearch.Stream, 'object');
  });
});

describe('Stream Directories', () => {
  it('it should prints directories without errors', () => {
    puzzySearch.Stream.pipe(process.stdout);
    puzzySearch.dirWalk('~/');
  });
});