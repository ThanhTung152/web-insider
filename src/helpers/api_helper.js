import axios from 'axios';
import { showToast } from './toast';
let isRefreshing = false;
let failedQueue = [];
const api = axios.create({
  baseURL: 'https://103.146.23.183',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.defaults.headers.post['Content-Type'] = 'application/json';
let blackListUrl = ['auth/login', 'auth/refresh'];
// intercepting to capture errors
api.interceptors.request.use(function (req) {
  req.withCredentials = true;
  return req;
});
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (res) => {
    return res.data ? res.data : res;
  },
  (err) => {
    const originalRequest = err.config;
    const isblacklist = originalRequest
      ? blackListUrl.includes(originalRequest.url)
      : true;
    if (!isblacklist && err.response) {
      if (err.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              return api(originalRequest);
            })
            .catch((err) => {
              showToast('error', err.message);
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;
        return new Promise(function (resolve, reject) {
          api
            .get('auth/refresh')
            .then((rs) => {
              originalRequest.headers['Authorization'] = `bearer ${rs}`;
              processQueue(null, rs);
              resolve(api(originalRequest));
            })
            .catch((err) => {
              processQueue(err, null);
              reject(err);
            })
            .then(() => {
              isRefreshing = false;
            });
        });
      }
    }
    showToast('error', err.message);
    return Promise.reject(err);
  }
);

class APIClient {
  get = (url, params) => {
    let response;
    let paramKeys = [];
    if (params) {
      Object.keys(params).map((key) => {
        if (params[key]) {
          paramKeys.push(key + '=' + params[key]);
        }
        return paramKeys;
      });
      const queryString =
        paramKeys && paramKeys.length ? paramKeys.join('&') : '';
      response = api.get(`${url}?${queryString}`, params);
      // console.log('Request url params: ', `${url}?${queryString}`);
    } else {
      response = api.get(`${url}`, params);
    }
    console.log('Request url: ', url, params);
    // console.log(response);
    return response;
  };

  create = (url, data, config) => {
    return api.post(url, data, config);
  };

  delete = (url, id) => {
    return api.delete(url + '/' + id);
  };
}

export { APIClient };
