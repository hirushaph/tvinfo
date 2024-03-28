const { OMDB } = require("../../../config/config");
const { getOmdbMovie } = require("../../../services/omdb");
const { getTmdbMovie, getTmdbTv } = require("../../../services/tmdb");

async function fetchDetails(itemId, type) {
  let tmdbItem, omdbItem;
  if (type === "movie") {
    tmdbItem = await getTmdbMovie(itemId);
    if (OMDB) {
      omdbItem = await getOmdbMovie(tmdbItem.imdb_id);
    }
  } else if (type === "tv") {
    const { tmdbTv, imdbId } = await getTmdbTv(itemId);
    tmdbItem = tmdbTv;
    if (OMDB) {
      omdbItem = await getOmdbMovie(imdbId);
    }
  }
  return { tmdbItem, omdbItem };
}

module.exports = {
  fetchDetails,
};
