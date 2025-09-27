/**
 * ==== Bot Details ====
 */

export const BOT_NAME = "Tvinfo";
export const BOT_COVER_IMAGE = "src/assets/tvinfo_cover.jpg";

/**
 * ==== Owner Details ====
 * All these fields are required
 */

export const OWNER_PHONE = ""; // phone number with country code
export const OWNER_NAME = "";

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
export const API_CACHE_EXPIRE_TIME = 43200000;

/**
 * ==== LIMITATIONS ====
 */
export const SEARCH_RESULT_LIMIT = 5;
// no of posters should send to user if user requested posters
export const POSTER_SENDING_LIMIT = 5;
export const CAST_LIMIT = 3;
// If this enabled bot users can access bot only in inside groups , inbox disabled
export const INBOX_DISABLED = true;

// ==== API Settings ====
/**
 * if this enabled it uses omdb api to get imdb, rottenTomatoes, cast details.
 * 1000 apis calls per day [free]
 * All other details get from tmdb api
 */
export const OMDB = true;

/**
 * ===== BOT Internal Settins ====
 */

// Server default port
export const EXPRESS_PORT = 3000;

// Api urls
export const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p/original";
export const TMDB_MOVIE_BASE_URL = "https://api.themoviedb.org/3/movie/";
export const TMDB_TV_BASE_URL = "https://api.themoviedb.org/3/tv/";
export const TMDB_MOVIE_SEARCH_URL =
  "https://api.themoviedb.org/3/search/movie";
export const TMDB_TV_SEARCH_URL = "https://api.themoviedb.org/3/search/tv";
export const OMDB_BASE_URL = "http://www.omdbapi.com/";
