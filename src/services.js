import axios from "axios";
const axiosInstace = axios.create({
  baseURL: "http://localhost:3000"
})

export const api = {
  get(url) {
    return axiosInstace.get(url);
  },
  post(url, body) {
    return axiosInstace.post(url, body);
  }
}

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}