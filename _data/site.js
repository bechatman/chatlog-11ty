const date = new Date();
const fs = require('fs');

module.exports = async () => {

  return {
    year: date.getFullYear(),
    env: process.env.PRODUCTION ? true : false,
    lastUpdate: date,
    styleUpdate: Math.floor(fs.statSync('./assets/style.scss').mtimeMs),
    scriptUpdate: Math.floor(fs.statSync('./assets/scripts.js').mtimeMs)

  }
}
