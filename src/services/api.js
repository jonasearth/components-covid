import axios from 'axios';

const api = axios.create({
  baseURL: 'https://corona-map-271816.appspot.com/'
  // timeout: 1000 * 10,
});

export default api;
