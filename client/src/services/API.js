import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  timeout: 2000,
});

instance.interceptors.request.use((config) => {
  let reqToken = config.headers.common.Authorization;

  if (!reqToken) {
    setHeaderAuthorization(config.headers);
  }

  return config;
});

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      error = error.response.data.error;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    return Promise.reject(error);
  }
);

const API = (() => {
  return {
    get: (url, payload) => {
      const reqParams = payload || null;
      return instance.get(url, { params: reqParams }).then((resp) => resp.data);
    },
    post: async (url, payload) => {
      return instance.post(url, { ...payload });
    },
    authenticate: async (url, { email, password }) => {
      const response = await API.post(url, { email, password });
      const token = `Bearer ${response.data.payload.token}`;
      localStorage.setItem("authToken", token);
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
