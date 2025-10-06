import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000", // will change for prod
  timeout: 15000,
});

export default API;
