const { default: axios } = require("axios");
const { OMDB_BASE_URL } = require("../config/config");

const createUrl = function (baseURL, queryParams) {
  const query = new URLSearchParams({ ...queryParams }).toString();

  return `${baseURL}?${query}`;
};

const getOmdbMovie = async function (id) {
  const url = createUrl(OMDB_BASE_URL, {
    apikey: process.env.OMDB_KEY,
    i: id,
  });

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getOmdbMovie };
