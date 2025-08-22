import { Link, Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";

import { useAuth } from "../context/UserContext";

import { loginValidationSchema } from "../schema/loginForm";
import { loginURL, authRequest } from "../services/httpRequests";
import { loginToastTexts } from "../constants/toastMessages";

import styles from "./LoginPage.module.css";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const notify = (text) => toast(text);
  const { loginSuccess, loginFailed } = loginToastTexts;
  const loginHandler = async (data) => {
    try {
      const response = await authRequest(loginURL, data);
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("jwtToken", token);
        notify(loginSuccess);
        const currentUser = data.username;
        localStorage.setItem("currentUser", currentUser);
        setTimeout(() => {
          navigate("/inventory");
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        notify(loginFailed);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginValidationSchema) });

  const onSubmit = (data) => {
    const userName = watch("userName");
    login(userName);
    const userCredentials = {
      username: data.userName,
      password: data.password,
    };
    loginHandler(userCredentials);
  };

  return (
    <div className={styles.container}>
      <h1>بوت کمپ بوتواستارت</h1>

      <div className={styles.form}>
        <div className={styles.formLogo}>
          <img src="/logo.webp" alt="logo" />
          <h3>فرم ورود</h3>
        </div>
        <form className={styles.hookForm} onSubmit={handleSubmit(onSubmit)}>
          <input
            className={styles.inputs}
            placeholder="نام کاربری"
            {...register("userName", { required: true })}
          />

          <span className={styles.errorSpan}>
            {!!errors.userName && errors.userName.message}
          </span>

          <input
            className={styles.inputs}
            type="password"
            placeholder="رمز عبور"
            {...register("password", { required: true })}
          />

          <span className={styles.errorSpan}>
            {!!errors.password && errors.password.message}
          </span>

          <input type="submit" value="ورود" className={styles.submitBtn} />
        </form>
        <Link to="/signup"> ایجاد حساب کاربری!</Link>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={true}
        theme="light"
      />
    </div>
  );
}

export default LoginPage;
