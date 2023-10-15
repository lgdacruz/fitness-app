import axios from "axios";

export default function Api() {
  const options = axios.create({
    baseURL: "https://fitness-mobile-api.onrender.com",
    timeout: 40000,
  });
  return options;
}
