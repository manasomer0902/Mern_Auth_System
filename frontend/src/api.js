import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-auth-system-uanc.onrender.com/api/auth",
});

export default API;