import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";

import { RegisterValidationSchema } from "../schema/loginForm";
import { registerURL, authRequest } from "../services/httpRequests";
import { registerToastTexts } from "../constants/toastMessages";

import styles from "./SignupPage.module.css";

function SignUpPage() {
  const notify = (text) => toast(text);
  const navigate = useNavigate();
  const { registerSuccess, registerUserExists, registerFailed } =
    registerToastTexts;
  const registerNewUser = async (data) => {
    try {
      const response = await authRequest(registerURL, data);
      if (response.status === 201) {
        notify(registerSuccess);

        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        notify(registerUserExists);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } else {
        notify(registerFailed);
      }
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(RegisterValidationSchema) });

  const onSubmit = (data) => {
    const userCredentials = {
      username: data.userName,
      password: data.password,
    };
    registerNewUser(userCredentials);
  };

  return (
    <>
      <div className={styles.container}>
        <h1>بوت کمپ بوتواستارت</h1>

        <div className={styles.form}>
          <div className={styles.formLogo}>
            <img src="/logo.webp" alt="logo" />
            <h3>فرم ثبت نام</h3>
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

            <input
              className={styles.inputs}
              type="password"
              placeholder="تکرار رمز عبور"
              {...register("passwordRepeat", { required: true })}
            />

            <span className={styles.errorSpan}>
              {!!errors.passwordRepeat && errors.passwordRepeat.message}
            </span>

            <input type="submit" value="ثبت نام" className={styles.submitBtn} />
          </form>

          <Link to="/login"> حساب کاربری دارید؟</Link>
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={true}
          theme="light"
        />
      </div>
    </>
  );
}

export default SignUpPage;
