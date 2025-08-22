import { ClipLoader } from "react-spinners";

import styles from "./InventoryTableRow.module.css";

function InventoryTableRow({ data, onDelete, onEdit, isDeleting, isEditing }) {
  const { id, name, quantity, price } = data || {};
  return (
    <tr className={styles.row}>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{price} هزار تومان</td>
      <td>{id}</td>
      <td className={styles.buttonTd}>
        <button onClick={onEdit} disabled={isEditing || isDeleting}>
          {isEditing ? (
            <ClipLoader color="#000000" size={16} />
          ) : (
            <img src="src\assets\edit.webp" alt="edit" />
          )}
        </button>
        <button onClick={onDelete} disabled={isEditing || isDeleting}>
          {isDeleting ? (
            <ClipLoader color="#000000" size={16} />
          ) : (
            <img src="src\assets\trash.webp" alt="delete" />
          )}
        </button>
      </td>
    </tr>
  );
}

export default InventoryTableRow;
