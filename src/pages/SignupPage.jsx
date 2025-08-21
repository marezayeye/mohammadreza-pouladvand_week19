import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { authLogin } from "../services/httpRequests";
import { RegisterValidationSchema } from "../schema/loginForm";

import styles from "./SignupPage.module.css";

function SignUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(RegisterValidationSchema) });

  const onSubmit = (data) => console.log(data);

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
          <a href="http://" target="_blank" rel="noopener noreferrer">
            حساب کاربری دارید؟
          </a>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
