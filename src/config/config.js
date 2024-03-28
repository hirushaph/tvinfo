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
module.exports.BOT_COVER_IMAGE = "https://iili.io/JjOVrvf.jpg";

/**
 * Owner Details
 * All these fields are required
 */

module.exports.OWNER_PHONE = ""; // phone number with country code
module.exports.OWNER_NAME = "";

/**
 *  ========= CACHING ===========
 */

/**
 * ===== API CACHE
 * Cache API Requests
 * Default expiration time is 1 hour.
 * Using caching can be helpful when using this bot in large groups because the OMDB API free version only allows 1000 requests per day.
 * For larger groups, consider using an cache expiration time of 1 day or more.
 *
 * Time Conversions:
 * 1 hour = 3600000 milliseconds
 * 12 hours = 43200000 milliseconds
 * 1 day = 86400000 milliseconds
 * 2 days = 172800000 milliseconds
 */

// time in miliseconds
module.exports.API_CACHE_EXPIRE_TIME = 3600000;

/**
 * MEDIA CACHE
 *
 * Enable caching of media uploads to avoid re-uploading files within a defined time frame.
 *
 * Default :
 * - Cache is enabled.
 * - Expiration time is set to 1 day.
 */

module.exports.MEDIA_CACHE = false;
module.exports.MEDIA_CACHE_EXPIRE_TIME = 86400000;

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
