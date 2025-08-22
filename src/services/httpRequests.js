import axios from "axios";

const BASE_URL = "http://localhost:3000";

const registerURL = `${BASE_URL}/auth/register`;
const loginURL = `${BASE_URL}/auth/login`;

const authRequest = (url, data) => axios.post(url, data);

export { authRequest, registerURL, loginURL };
