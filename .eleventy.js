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
    linkify: true
  };
  let opts = {
    permalink: false
  };
  
  let md = markdownIt(options)
    .use(markdownItAnchor, opts)
  
  config.setLibrary('md', md);
  config.addFilter('markdown', value => md.render(value))
  
  return {
    // Set Layout Directory
    dir: {
      includes: '_includes',
      layouts: '_layouts'
    }
  }
}