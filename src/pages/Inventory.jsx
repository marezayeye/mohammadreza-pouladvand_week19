import InventoryHeader from "../components/InventoryHeader";
import { useAuth } from "../context/UserContext";
import styles from "./Inventory.module.css";

function Inventory() {
  const { userName, logout } = useAuth();
  return (
    <div className={styles.container}>
      <InventoryHeader userName={userName} logout={logout} />
      <div className={styles.secondRow}>
        <div>
          <img src="src\assets\settings.webp" alt="settings" />
          <h3>مدیریت کالا</h3>
        </div>
        <button>افزودن محصول</button>
      </div>

      <div className={styles.table}>
        <table>
          <tr className={styles.tableHeader}>
            <th>نام کالا</th>
            <th>موجودی</th>
            <th>قیمت</th>
            <th>شناسه کالا</th>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
