const Axios = require("axios");
const { setupCache } = require("axios-cache-interceptor");
const { API_CACHE_EXPIRE_TIME } = require("../config/config");

const instance = Axios.create();

const axios = setupCache(instance, { ttl: API_CACHE_EXPIRE_TIME });

module.exports = axios;
