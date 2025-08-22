import { useAuth } from "../context/UserContext";

import styles from "./Inventory.module.css";

function Inventory() {
  const { userName, logout } = useAuth();
  console.log(userName);
  return <div>Inventory</div>;
}

export default Inventory;
