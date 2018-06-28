const assert = require('assert')
const puzzySearch = require("../src/index.js");

describe('Require', () => {
  it('it should return true when typeof is object', () => {
    assert.equal(typeof puzzySearch, 'function');
  });
});

// describe('Stream Directories', () => {
//   it('it should prints directories without errors', () => {
//     puzzySearch.Stream.pipe(process.stdout);
//     puzzySearch.dirWalk('~/');
//   });
// });