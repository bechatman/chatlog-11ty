require('dotenv').config();
const lfmAlbumArt = require('./_11tyExtensions/lfmAlbumArt');
const urlEscape = require('./_11tyExtensions/urlEscape');
const contains = require('./_11tyExtensions/contains');


module.exports = (config) => {  
  // Ignore files and pass through
  config.addPassthroughCopy('./admin');
  config.addPassthroughCopy('./assets/')
  
  // Set Liquid Options
  
  config.setLiquidOptions({
    dynamicPartials: true
  });
  
  // Set Markdown Settings
  let markdownIt = require('markdown-it');
  let markdownItAnchor = require('markdown-it-anchor');
  let options = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true
  };
  let opts = {
    permalink: false
  };
  
  let md = markdownIt(options)
    .use(markdownItAnchor, opts)
  
  config.setLibrary('md', md);
  config.addFilter('markdown', value => md.render(value))
  config.addFilter('urlEscape', data => urlEscape(data))
  config.addFilter('contains', (data, arg1, arg2) => contains(data, arg1, arg2))

  // Set Shortcodes

  config.addPairedShortcode('album', lfmAlbumArt);
  
  return {
    // Set Layout Directory
    dir: {
      includes: '_includes',
      layouts: '_layouts'
    }
  }
}