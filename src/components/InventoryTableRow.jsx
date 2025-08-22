import { ClipLoader } from "react-spinners";

function InventoryTableRow({ data, onDelete, onEdit, isDeleting, isEditing }) {
  const { id, name, quantity, price } = data || {};
  return (
    <tr>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{price}</td>
      <td>{id}</td>
      <td>
        <button onClick={onEdit} disabled={isEditing || isDeleting}>
          {isEditing ? <ClipLoader color="#000000" size={16} /> : <img src="../../assets/edit.webp" alt="edit" />}
        </button>
        <button onClick={onDelete} disabled={isEditing || isDeleting}>
          {isDeleting ? <ClipLoader color="#000000" size={16} /> : <img src="../../assets/trash.webp" alt="delete" />}
        </button>
      </td>
    </tr>
  );
}

export default InventoryTableRow;
