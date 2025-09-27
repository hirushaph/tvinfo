import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { API_CACHE_EXPIRE_TIME } from "../config/config.js";

const instance = Axios.create();

export const axios = setupCache(instance, { ttl: API_CACHE_EXPIRE_TIME });
