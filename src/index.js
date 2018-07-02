(function (root, factory) {
  /**
   * dirs-stream with Stream.Readable
   * 
   * @author byzz <eyedroot@gmail.com>
   * @license MIT
   */
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory;
  } else {
    root.dirsStream = factory;
  }
})(this, function (dir) {
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
            walkAsync(fullpath);
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