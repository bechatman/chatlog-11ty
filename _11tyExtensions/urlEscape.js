/**
 * URL Escape Filter
 * 
 * Used to match URL santizing pattern from Spike SSG 
 * 
 * @param {string} data - data from item being filtered
 * @returns {string} - data with characters replaced or removed.
 */

module.exports = (data) => {
  // Replace non-alphanumeric characters with dashes and remove double dashes
  const singleDashes = data
    .replace(/(\.\.\.)/g, '-')  // Remove ellipsis and replace with single slash
    .replace(/\'/g, '')         // Remove apostrophes
    .replace(/[\W]/g, '-')      // Remove non-alphanumeric characters
    .replace(/--/g, '-')        // Remove double dashes caused by replacements
  
  // If the string ends in a dash, remove it
  const slug = /-$/.test(singleDashes) ? singleDashes.slice(0, -1) : singleDashes;
  
  return slug
}