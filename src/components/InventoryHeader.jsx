import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import styles from "./InventoryHeader.module.css";

function InventoryHeader({ searchQuery, setSearchQuery, setSearchParams }) {
  const currentUser = localStorage.getItem("currentUser");
  const navigate = useNavigate();
  const changeHandler = (event) => {
    setSearchQuery(event.target.value);
    setSearchParams({
      page: 1,
      search: event.target.value,
    });
  };

  const logoutHandler = () => {
    toast("شما با موفقیت از حساب خود خارج شدید.");
    setTimeout(() => {
      localStorage.clear();
      navigate("/login");
    }, 2000);
  };

  return (
    <>
      <div className={styles.header}>
        <div>
          <img src="../../src/assets/search.webp" alt="search-icon" />
          <input
            type="text"
            placeholder="جستجوی کالا"
            onChange={changeHandler}
            value={searchQuery}
          />
        </div>
        <div className={styles.userNameSection}>
          <img
            className={styles.profile}
            src="../../src/assets/profile.webp"
            alt="profile-photo"
          />
          <div>
            <p>{currentUser}</p>
            <p>مدیر</p>
          </div>
          <button onClick={logoutHandler} className={styles.logout}>
            <img src="src\assets\logout.png" alt="logout" />
          </button>
        </div>
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
    </>
  );
}

export default InventoryHeader;
