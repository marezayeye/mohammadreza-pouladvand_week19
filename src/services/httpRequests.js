import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3000";
const navigate = useNavigate();

const registerNewUser = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/register`, data);
    if (response.status === 201) {
      const token = response.data.token;
      localStorage.setItem("jwtToken", token);
      alert("ثبت نام با موفقیت انجام شد");
      setTimeout(() => {
        navigate("/inventory");
      }, 1000);
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert(`کاربر با مشخصات فوق وجود دارد. لطفاً وارد شوید`);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      alert("خطا در ثبت نام", error.message);
    }
  }
};

const authLogin = () => `${BASE_URL}/auth/login`;

export { authLogin, registerNewUser };
