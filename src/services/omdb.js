import { OMDB_BASE_URL } from "../config/config.js";
import { axios } from "../utils/axios.js";

const createUrl = function (baseURL, queryParams) {
  const query = new URLSearchParams({ ...queryParams }).toString();

  return `${baseURL}?${query}`;
};

export const getOmdbMovie = async function (id) {
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
