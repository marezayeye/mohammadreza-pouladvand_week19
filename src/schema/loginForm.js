import * as Yup from "yup";

const loginValidationSchema = Yup.object().shape({
  userName: Yup.string()
    .min(5, "نام کاربری بادی حداقل 5 کاراکتر باشد")
    .required("نام کاربری را وارد کنید"),
  password: Yup.string()
    .min(6, "رمز عبور باید حداقل 6 کاراکتر داشته باشد")
    .required("رمز عبور را وارد کنید"),
});

const RegisterValidationSchema = Yup.object().shape({
  userName: Yup.string()
    .min(5, "نام کاربری باید حداقل 5 کاراکتر باشد")
    .required("نام کاربری را وارد کنید"),
  password: Yup.string()
    .min(6, "رمز عبور باید حداقل 6 کاراکتر داشته باشد")
    .required("رمز عبور را وارد کنید")
    .matches(/[a-z]/, "رمز عبور باید شامل حداقل یک حرف کوچک انگلیسی باشد")
    .matches(/[A-Z]/, "رمز عبور باید شامل حداقل یک حرف بزرگ انگلیسی باشد"),
  passwordRepeat: Yup.string()
    .required("رمز عبور را تکرار کنید")
    .oneOf([Yup.ref("password"), null], "رمز های عبور وارد شده یکسان نیستند"),
});

export { loginValidationSchema, RegisterValidationSchema };
