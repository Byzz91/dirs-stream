(function (factory) {
  global.puzzySearch = typeof factory === 'function' ? factory() : new Error("Cannot find module factory");
})(function () {
  /**
   * PuzzySearch 
   * 
   * @author eyedroot@gmail.com
   * @license MIT
   * 
   */
  const fs = require('fs');
  const path = require('path');
  const Stream = require('stream');
  let publicObjects = {};
  let Readable = new Stream.Readable();
  let lengthDirs = 1;

  /**
   * walkAsync
   * 
   * @param String|Array path 
   * @usage require('puzzySearch').walkAsync('/usr/dev/')
   */
  function walkAsync(dir) {
    dir = String(dir).trim();

    fs.readdir(dir, (error, files) => {
      lengthDirs--;

      if (error) {
        // throw new Error(`cannot read ${ dir }`);
        return;
      }

      lengthDirs += files.length;

      files.forEach(file => {
        let fullpath = path.join(dir, file);

        fs.stat(fullpath, (error, stats) => {
          lengthDirs--;

          if (error) {
            // throw new Error(`cannot read ${ fullpath }`);
            return;
          }

          if (stats.isDirectory()) {
            lengthDirs++;
            walkAsync( fullpath );
          } else {
            console.log(fullpath);
            Readable.push( fullpath );
          }
        });
      });
    });
  }

  /**
   * Public Objects
   */
  publicObjects.dirWalk = walkAsync;
  publicObjects.Stream = Readable;
  return publicObjects;
});

/**
 * module.exports
 */
// module.exports = global.puzzySearch;

console.log(global.puzzySearch.Stream.pipe);
global.puzzySearch.dirWalk("/Users/byzz/dev/puzzysearch");
global.puzzySearch.Stream.push(null);