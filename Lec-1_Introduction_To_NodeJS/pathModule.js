/**

  path module: if you need to work on file path or directory system then path module is going to use and it will help you to resolve and normalised the paths for different OS.

  1. path.join([...paths]);

    const path = require('path');
    path.join('folder','subfolder', 'filename');

  2. path.resolve([...paths]):  resolve the absolute path from the multiple path segments

 */

const path = require('path');
const cssPath = path.join('public','css', 'common', 'style.css');
console.log(cssPath);

