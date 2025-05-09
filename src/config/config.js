/**
 * ==== Bot Details ====
 */

module.exports.BOT_NAME = "Tvinfo";
module.exports.BOT_COVER_IMAGE = "src/assets/tvinfo_cover.jpg";

/**
 * ==== Owner Details ====
 * All these fields are required
 */

module.exports.OWNER_PHONE = ""; // phone number with country code
module.exports.OWNER_NAME = "";

/**
 * ===== API CACHE =====
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
module.exports.API_CACHE_EXPIRE_TIME = 43200000;

/**
 * ==== LIMITATIONS ====
 */
module.exports.SEARCH_RESULT_LIMIT = 5;
// no of posters should send to user if user requested posters
module.exports.POSTER_SENDING_LIMIT = 5;
module.exports.CAST_LIMIT = 3;
// If this enabled bot users can access bot only in inside groups , inbox disabled
module.exports.INBOX_DISABLED = true;

// ==== API Settings ====
/**
 * if this enabled it uses omdb api to get imdb, rottenTomatoes, cast details.
 * 1000 apis calls per day [free]
 * All other details get from tmdb api
 */
module.exports.OMDB = true;

/**
 * ===== BOT Internal Settins ====
 */

// Server default port
module.exports.EXPRESS_PORT = 3000;

// Api urls
module.exports.TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/original";
module.exports.TMDB_MOVIE_BASE_URL = "https://api.themoviedb.org/3/movie/";
module.exports.TMDB_TV_BASE_URL = "https://api.themoviedb.org/3/tv/";
module.exports.TMDB_MOVIE_SEARCH_URL =
  "https://api.themoviedb.org/3/search/movie";
module.exports.TMDB_TV_SEARCH_URL = "https://api.themoviedb.org/3/search/tv";
module.exports.OMDB_BASE_URL = "http://www.omdbapi.com/";
