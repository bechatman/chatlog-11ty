const axios = require('axios')
const lfm = require('./lastfm');
let markdownIt = require('markdown-it')({typographer: true});

/**
 * Last.fm captioned album art shortcode
 * 
 * This short code pulls using the provided artist and album name to search the Last.fm API and return the album art of the first result.
 * 
 * @param {string} content - Content provided in the body of the shortcode between {% album %} and {% endalbum %}.
 * @param {string} artist - Artist name to filter album search results. Be sure to check Last.fm pages to make sure the artist name is typed correctly.
 * @param {string} album - Album name to search.
 * @returns {string} - HTML string with art (if available and caption)
 *
 */
module.exports = async (content, artist, album) => {
  const source = 
    await axios.get(lfm('album.search', { album: album }))
          .then(response => response.data.results.albummatches.album)
          .then(data => data.filter(test => test.artist === artist)[0])
  if (source) {
    return `<div class="album albumArt"><figure><img src="${source.image[source.image.length - 1]['#text']}" alt="" aria-describedby="copyright" /><figcaption id="copyright">${content ? `${markdownIt.render(content).replace(/<\/?p>/g, '')}<br />` : ''}${artist}, <a href="${source.url}">"${source.name}"</a>/Last.fm</figcaption></figure></div>`;
  }
  return  '';
};