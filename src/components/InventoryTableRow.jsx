function InventoryTableRow({ data, onDelete, onEdit }) {
  const { id, name, quantity, price } = data || {};
  return (
    <tr>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{price}</td>
      <td>{id}</td>
      <td>
        <button onClick={onEdit}>
          <img src="../../assets/edit.webp" alt="edit" />
        </button>
        <button onClick={onDelete}>
          <img src="../../assets/trash.webp" alt="delete" />
        </button>
      </td>
    </tr>
  );
}

export default InventoryTableRow;
