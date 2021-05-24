import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.VITE_APP_API_BASE_URL ||
    "https://economist-scrapper-api.herokuapp.com/api",
  timeout: 1000,
});

instance.interceptors.request.use((config) => {
  let reqToken = config.headers.common.Authorization;

  if (!reqToken) {
    setHeaderAuthorization(config.headers);
  }

  return config;
});

const API = (() => {
  return {
    get: (url, payload) => {
      const reqParams = payload || null;
      return instance.get(url, { params: reqParams }).then((resp) => resp.data);
    },
    post: async (url, payload) => {
      try {
        return await instance.post(url, { ...payload });
      } catch (e) {
        if (e.response) {
          throw new Error(e.response.data.error);
        }
      }
    },
    authenticate: async (url, { email, password }) => {
      try {
        const response = await API.post(url, { email, password });
        const token = `Bearer ${response.data.payload.token}`;
        localStorage.setItem("authToken", token);
      } catch (e) {
        if (e.response) {
          throw new Error(e.response.data.error);
        }
      }
    },
  };
})();

function setHeaderAuthorization(header) {
  const token = localStorage.getItem("authToken");
  if (token) {
    header.common["Authorization"] = token;
  }

  return header;
}

export default API;
