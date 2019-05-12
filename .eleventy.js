module.exports = (eleventyConfig) => {  
  // Ignore files and pass through
  eleventyConfig.addPassthroughCopy("./admin");
  
  return {
    // Set Layout Directory
    dir: {
      includes: "_includes",
      layouts: "_layouts"
    }
  }
}