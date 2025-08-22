import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginValidationSchema } from "../schema/loginForm";

import styles from "./LoginPage.module.css";

function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginValidationSchema) });

  const onSubmit = (data) => console.log(data);

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
    </div>
  );
}

export default LoginPage;
