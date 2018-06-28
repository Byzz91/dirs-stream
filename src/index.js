/**
 * PuzzySearch with Stream.Readable
 * 
 * @author byzz <eyedroot@gmail.com, byzz@inven.co.kr>
 * @license MIT
 */
(function (factory) {
  global.puzzySearch = (typeof factory === 'function') ? factory : new Error("Cannot find module factory");
})(function (dir) {
  /**
   * Factory
   */
  const fs = require('fs');
  const path = require('path');
  const util = require('util');
  const Stream = require('stream');

  let publicObjects = {};
  let lengthDirs = 1;
  let streamable;

  util.inherits(Streamer, Stream.Readable);

  function Streamer(opt) {
    Stream.Readable.call(this, opt);
    this._index = 0;
  }

  Streamer.prototype._read = () => {
    this._index++;
  }

  streamable = new Streamer();

  /**
   * walkAsync
   * 
   * @param String|Array path 
   * @usage require('puzzySearch').walkAsync('/usr/dev/')
   */
  const walkAsync = (dir) => {
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
            streamable.push(fullpath);
          }
        });
      });
    });
  };

  walkAsync(dir);

  /**
   * Public Objects
   */
  publicObjects.Stream = streamable;
  return publicObjects;
});

/**
 * module.exports
 */
module.exports = global.puzzySearch;