const BASE_URL = "http://localhost:3000";

const authRegister = (userName, password) => `${BASE_URL}/auth/register`;

const authLogin = (userName, password) => `${BASE_URL}/auth/register`;

export { authLogin, authRegister };
