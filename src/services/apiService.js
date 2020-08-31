import superagent from 'superagent';

const API_ROOT = 'https://conduit.productionready.io/api';

const responseBody = (res) => res.body;

let token = null;
const tokenPlugin = (req) => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
};

const requests = {
  del: (url) => superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: (url) => superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) => superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) => superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
};

const Auth = {
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }).catch((err) => {
      return Promise.reject(err.response.body.errors);
    }),
  register: (username, email, password) =>
    requests.post('/users', { user: { username, email, password } }).catch((err) => {
      return Promise.reject(err.response.body.errors);
    }),
  save: (user) => requests.put('/user', { user }),
};

const limit = (count, pp) => `limit=${count}&offset=${pp ? pp * count : 0}`;
const omitSlug = (article) => ({ ...article, slug: undefined });
const Articles = {
  all: (page) => requests.get(`/articles?${limit(10, page)}`),
  del: (slug) => requests.del(`/articles/${slug}`),
  favorite: (slug) => requests.post(`/articles/${slug}/favorite`),
  unfavorite: (slug) => requests.del(`/articles/${slug}/favorite`),
  get: (slug) => requests.get(`/articles/${slug}`),
  update: (article) => requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: (article) =>
    requests.post('/articles', { article }).catch((err) => {
      return Promise.reject(err.response.body.errors);
    }),
};

export default {
  Articles,
  Auth,
  setToken: (_token) => {
    token = _token;
  },
};
