function InventoryTableRow() {
  return (
    <tr>
      <td>{name}</td>
      <td>{quantity}</td>
      <td>{price}</td>
      <td>{id}</td>
      <td>
        <button>
          <img src="../../assets/edit.webp" alt="edit" />
        </button>
        <button>
          <img src="../../assets/trash.webp" alt="delete" />
        </button>
      </td>
    </tr>
  );
}

export default InventoryTableRow;
