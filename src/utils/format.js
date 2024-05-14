const { default: countryCodeEmoji } = require("country-code-emoji");
const { getPosterUrl } = require("../services/tmdb");
const { getState } = require("./state");

// get full language name form shortcode
const languageNames = new Intl.DisplayNames(["en"], {
  type: "language",
});

const getCountryNames = new Intl.DisplayNames(["en"], {
  type: "region",
});

const formatSingleMovie = function (tmdb, omdb) {
  const formatedMovie = {
    title: tmdb.title,
    posterPath: getPosterUrl(tmdb.poster_path),
    runtime: getRuntime(tmdb.runtime) || "n/a",
    year: tmdb.release_date.substring(0, 4) || "n/a",
    genres: getGenres(tmdb.genres) || "n/a",
    country: getCountry(tmdb.production_countries) || "n/a",
    countryEmoji: getCountryEmoji(tmdb.production_countries) || "n/a",
    language: languageNames.of(tmdb.original_language) || "n/a",
    tagline: tmdb.tagline || "n/a",
    imdb: getRatings(omdb.Ratings, "Internet Movie Database") || "n/a",
    rottenTomatoes: getRatings(omdb.Ratings, "Rotten Tomatoes") || "n/a",
    tmdbRating: `${tmdb.vote_average.toFixed(1)}/10` || "n/a",
    plot: "n/a",
    rated: omdb.Rated || "n/a",
    isAdultRated: isAdultRated(omdb.Rated),
    cast: getCastNames(tmdb.cast) || "n/a",
    plot: getPlot(tmdb.overview, omdb.Plot) || "n/a",
  };

  return formatedMovie;
};

const formatSingleTv = function (tmdb, omdb) {
  const formatedTv = {
    title: tmdb.name,
    posterPath: getPosterUrl(tmdb.poster_path),
    year: tmdb.first_air_date.substring(0, 4) || "n/a",
    genres: getGenres(tmdb.genres) || "n/a",
    country: getCountryNames.of(tmdb.origin_country[0]) || "n/a",
    countryEmoji: getCountryEmoji(tmdb.origin_country, "tv") || "n/a",
    language: languageNames.of(tmdb.original_language) || "n/a",
    tagline: tmdb.tagline || "n/a",
    imdb: getRatings(omdb.Ratings, "Internet Movie Database") || "n/a",
    rottenTomatoes: getRatings(omdb.Ratings, "Rotten Tomatoes") || "n/a",
    tmdbRating: `${tmdb.vote_average.toFixed(1)}/10` || "n/a",
    plot: "n/a",
    rated: omdb.Rated || "n/a",
    isAdultRated: isAdultRated(omdb.Rated),
    status: tmdb.status || "n/a",
    seasons: tmdb.number_of_seasons || "n/a",
    plot: getPlot(tmdb.overview, omdb.Plot) || "n/a",
  };

  return formatedTv;
};

// helper functions for fomatting
const getRuntime = function (m) {
  const hours = Math.floor(m / 60);
  const minutes = m % 60;

  if (hours === 0) {
    return minutes + "m";
  } else if (minutes === 0) {
    return hours + "h";
  } else {
    return hours + "h " + minutes + "m";
  }
};

const getPlot = function (tmdbPlot, omdbPlot) {
  const state = getState();
  const options = state.user.options;
  if (options?.includes("plot")) {
    return omdbPlot || tmdbPlot;
  }
  return;
};

const getCastNames = function (casts) {
  const castNames = casts.map((cast) => cast.name);
  const names = castNames.join(" • ");
  return names;
};

const getGenres = function (genres) {
  const genreNames = genres.map((genre) => genre.name);
  return genreNames.join(" | ");
};

const getCountry = function (countries) {
  // Get country code from tmdb and find country name
  // tmdb provides long country names,but some names are too long for whatsapp message
  // "countryNames" function provides better names.

  if (countries.length === 1) {
    const code = countries[0].iso_3166_1;
    return getCountryNames.of(code);
  }
};

const getCountryEmoji = function (countries, type = undefined) {
  if (type === "tv") {
    return countryCodeEmoji(countries[0]);
  }
  if (countries.length === 1) {
    return countryCodeEmoji(countries[0].iso_3166_1);
  }
};

const getRatings = (ratings, source) => {
  if (!ratings) return;
  const rating = ratings.find((rating) => rating.Source === source);
  return rating ? rating.Value : "";
};

const isAdultRated = function (rate) {
  const adult_ratings = ["R", "NC-17"];

  return adult_ratings.includes(rate);
};

module.exports = { formatSingleMovie, formatSingleTv };
