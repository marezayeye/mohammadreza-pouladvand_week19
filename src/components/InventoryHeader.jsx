import { useAuth } from "../context/UserContext";

import styles from "./InventoryHeader.module.css";

function InventoryHeader({ onSearch }) {
  const { userName, logout } = useAuth();
  console.log(userName);
  const changeHandler = (e) => {
    onSearch && onSearch(e.target.value);
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
          />
        </div>
        <div className={styles.userNameSection}>
          <img
            className={styles.profile}
            src="../../src/assets/profile.webp"
            alt="profile-photo"
          />
          <div>
            <p>{userName}</p>
            <p>مدیر</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default InventoryHeader;
