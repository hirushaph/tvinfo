const {
  TMDB_MOVIE_SEARCH_URL,
  SEARCH_RESULT_LIMIT,
  TMDB_MOVIE_BASE_URL,
  TMDB_IMAGE_URL,
  TMDB_TV_SEARCH_URL,
  TMDB_TV_BASE_URL,
  CAST_LIMIT,
} = require("../config/config");
const axios = require("../utils/axios");

// Create URL with paramas
const createUrl = function (baseURL, queryParams) {
  const query = new URLSearchParams({ ...queryParams }).toString();

  return `${baseURL}?${query}`;
};

// get Movie Details

const searchMovie = async function ({ query, year }) {
  try {
    let queryParams = {
      query,
      include_adult: false,
      language: "en-US",
      page: 1,
    };

    // add year if defined
    if (year) queryParams.year = year;

    const url = createUrl(TMDB_MOVIE_SEARCH_URL, queryParams);

    const options = {
      method: "GET",
      url,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
    };

    const res = await axios(options);

    const data = res.data;

    if (!data.results || data.results.length === 0)
      throw new Error("No Movies Found");

    const results = generateResults(data);

    return results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTmdbMovie = async function (id) {
  const url = `${TMDB_MOVIE_BASE_URL}/${id}`;
  const options = {
    method: "GET",
    url,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  };

  const res = await axios(options);

  const cast = await getCast(id);

  // add cast to current movie response
  res.data.cast = cast;

  return res.data;
};

// get Tv Series Details

const searchTv = async function ({ query, year }) {
  try {
    let queryParams = {
      query,
      include_adult: false,
      page: 1,
    };

    if (year) queryParams.year = year;

    const url = createUrl(TMDB_TV_SEARCH_URL, queryParams);

    const options = {
      method: "GET",
      url,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
    };

    const res = await axios(options);
    const data = res.data;

    if (!data.results || data.results.length === 0)
      throw new Error("No Tv Series Found");

    const results = generateResults(data);

    return results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTmdbTv = async function (id) {
  try {
    const url = `${TMDB_TV_BASE_URL}${id}`;
    const options = {
      method: "GET",
      url,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
    };

    const res = await axios(options);
    const externalIds = await externalTvIds(id);
    return { tmdbTv: res.data, imdbId: externalIds.imdb_id };
  } catch (error) {
    throw new Error(error.message);
  }
};

const externalTvIds = async function (id) {
  const url = `${TMDB_TV_BASE_URL}${id}/external_ids`;

  try {
    const options = {
      method: "GET",
      url,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
    };
    const res = await axios(options);

    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getImages = async function (id, type) {
  try {
    let url;
    if (type === "movie") url = `${TMDB_MOVIE_BASE_URL}${id}/images`;
    if (type === "tv") url = `${TMDB_TV_BASE_URL}${id}/images`;

    const options = {
      method: "GET",
      url,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      },
    };
    const res = await axios(options);
    return res.data;
  } catch (error) {
    throw new Error("Images Not Found");
  }
};

const getCast = async function (id) {
  const url = `${TMDB_MOVIE_BASE_URL}${id}/credits`;
  const options = {
    method: "GET",
    url,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  };
  const res = await axios(options);
  const limitedCast = res.data?.cast.slice(0, CAST_LIMIT);
  return limitedCast;
};

const getPosterUrl = function (path) {
  if (!path) return undefined;
  return `${TMDB_IMAGE_URL}${path}`;
};

function generateResults(data) {
  let result = {};

  if (data.results.length <= SEARCH_RESULT_LIMIT) {
    result = data.results.map((item) => ({
      id: item.id,
      title: item.title || item.name,
      year: (item.release_date || item.first_air_date || "n/a").substring(0, 4),
      language: item.original_language,
    }));
  } else {
    result = data.results.slice(0, 5).map((item) => ({
      id: item.id,
      title: item.title || item.name,
      year: (item.release_date || item.first_air_date || "n/a").substring(0, 4),
      language: item.original_language,
    }));
  }

  return result;
}

module.exports = {
  searchMovie,
  getTmdbMovie,
  getPosterUrl,
  searchTv,
  getTmdbTv,
  getImages,
  getCast,
};
