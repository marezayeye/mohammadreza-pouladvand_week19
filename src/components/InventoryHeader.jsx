import { useState } from "react";

import { useAuth } from "../context/UserContext";

import styles from "./InventoryHeader.module.css";

function InventoryHeader({ onSearch }) {
  const [search, setSearch] = useState("");
  const { userName, logout } = useAuth();

  const changeHandler = (e) => {
    setSearch(e.target.value);
    onSearch && onSearch(e.target.value);
  };

  const searchHandler = () => {
    
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
          <img src="../../src/assets/profile.webp" alt="profile-photo" />
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
