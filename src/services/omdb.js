const { OMDB_BASE_URL } = require("../config/config");
const axios = require("../utils/axios");

const createUrl = function (baseURL, queryParams) {
  const query = new URLSearchParams({ ...queryParams }).toString();

  return `${baseURL}?${query}`;
};

const getOmdbMovie = async function (id) {
  const url = createUrl(OMDB_BASE_URL, {
    apikey: process.env.OMDB_KEY,
    i: id,
    plot: "short",
  });

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getOmdbMovie };
