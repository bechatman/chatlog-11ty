module.exports = (eleventyConfig) => {  
  // Ignore files and pass through
  eleventyConfig.addPassthroughCopy("./admin");
  eleventyConfig.addPassthroughCopy('./assets/')
  
  return {
    // Set Layout Directory
    dir: {
      includes: "_includes",
      layouts: "_layouts"
    }
  }
}