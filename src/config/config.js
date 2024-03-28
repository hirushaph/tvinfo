// Exporting individual variables
module.exports.TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/w780";
module.exports.TMDB_MOVIE_BASE_URL = "https://api.themoviedb.org/3/movie/";
module.exports.TMDB_TV_BASE_URL = "https://api.themoviedb.org/3/tv/";
module.exports.TMDB_MOVIE_SEARCH_URL =
  "https://api.themoviedb.org/3/search/movie";
module.exports.TMDB_TV_SEARCH_URL = "https://api.themoviedb.org/3/search/tv";
module.exports.OMDB_BASE_URL = "http://www.omdbapi.com/";

/**
 * Bot Details
 */

module.exports.BOT_NAME = "Tvinfo";
module.exports.BOT_COVER_IMAGE = "https://i.ibb.co/vJnvHG2/637668-1.jpg";

/**
 * Owner Details
 * All these fields are required
 */

module.exports.OWNER_PHONE = ""; // phone number with country code
module.exports.OWNER_NAME = "";

/**
 * LIMITATIONS
 */
module.exports.SEARCH_RESULT_LIMIT = 5;
// no of posters should send to user if user requested posters
module.exports.POSTER_SENDING_LIMIT = 5;
module.exports.CAST_LIMIT = 3;

// API Settings
/**
 * if this enabled it uses omdb api to get imdb, rottenTomatoes, cast details.
 * 1000 apis calls per day [free]
 * All other details get from tmdb api
 */
module.exports.OMDB = true;
