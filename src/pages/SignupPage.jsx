import styles from "./SignupPage.module.css";

function SignUpPage() {
  return (
    <>
      <div className={styles.container}>
        <h1>بوت کمپ بوتواستارت</h1>

        <div className={styles.form}>
          <div className={styles.formLogo}>
            <img src="/logo.webp" alt="logo" />
            <h3>فرم ثبت نام</h3>
          </div>

          <div className={styles.inputs}>
            <input type="text" name="" id="" placeholder="نام کاربری" />
            <input type="text" name="" id="" placeholder="رمز عبور" />
            <input type="text" name="" id="" placeholder="تکرار رمز عبور" />
          </div>

          <button>ثبت نام</button>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            حساب کاربری دارید؟
          </a>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
