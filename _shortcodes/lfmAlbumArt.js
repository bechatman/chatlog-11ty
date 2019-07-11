const axios = require('axios')
const lfm = require('../_data/lastfm');

module.exports = async (content, artist, album) => {
  const source = 
    await axios.get(lfm('album.search', { album: album }))
          .then(response => response.data.results.albummatches.album)
          .then(data => data.filter(test => test.artist === artist)[0])
  console.log(source)
  if (source) {
    return `
    <figure>
      <img src="${source.image[source.image.length - 1]['#text']}" alt="" aria-describedby="copyright" />
      <figcaption id="copyright">
        ${content ? `${content}<br />` : ''}${artist}, <a href="${source.url}">"${source.name}"</a>/Last.fm
      </figcaption>
    </figure>
    `;
  }
  return  '';
};