import fs from 'fs';
import path from 'path';
/**
 * Is there a .env file in the current directory?
 *
 * This is the default behavior of `dotenv-webpack-plugin`
 * https://github.com/mrsteele/dotenv-webpack/blob/master/src/index.js#L34
 */

export var hasDotenv = function () {
  return fs.existsSync(path.join('.', '.env'));
};