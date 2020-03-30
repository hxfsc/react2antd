import axios from "axios"

axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded"
axios.defaults.withCredentials = false


axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  const { data } = response
  return data
}, error => {
  return Promise.reject(error)
});

export default axios
