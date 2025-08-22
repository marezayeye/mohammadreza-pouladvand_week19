import InventoryHeader from "../components/InventoryHeader";
import InventoryTableRow from "../components/InventoryTableRow";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";

import { useAuth } from "../context/UserContext";
import { useProducts } from "../context/ProductsContext";
import { useState } from "react";

import styles from "./Inventory.module.css";

function Inventory() {
  const { userName, logout } = useAuth();
  const {
    products,
    loading,
    error,
    deleteProduct,
    totalPages,
    page,
    setSearchParams,
  } = useProducts();

  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);

  const handleRequestDelete = (id) => {
    setProductIdToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (!productIdToDelete) return;
    await deleteProduct(productIdToDelete);
    setProductIdToDelete(null);
  };

  const handleCancelDelete = () => setProductIdToDelete(null);

  const handleRequestEdit = (product) => setProductToEdit(product);
  const handleConfirmEdit = async (updated) => {
    if (!productToEdit) return;
    await updateProduct(productToEdit.id ?? productToEdit._id ?? productToEdit.sku, updated);
    setProductToEdit(null);
  };
  const handleCancelEdit = () => setProductToEdit(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <InventoryHeader userName={userName} logout={logout} />
      <div className={styles.secondRow}>
        <div>
          <img src="src\assets\settings.webp" alt="settings" />
          <h3>مدیریت کالا</h3>
        </div>
        <button className={styles.addButton} >افزودن محصول</button>
      </div>

      <div className={styles.table}>
        <table>
          <thead>
            <tr className={styles.tableHeader}>
              <th>نام کالا</th>
              <th>موجودی</th>
              <th>قیمت</th>
              <th>شناسه کالا</th>
              <th>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <InventoryTableRow
                key={prod.id ?? prod._id ?? prod.sku}
                data={prod}
                onDelete={() => handleRequestDelete(prod.id ?? prod._id ?? prod.sku)}
                onEdit={() => handleRequestEdit(prod)}
              />
            ))}
          </tbody>
        </table>
      </div>
      {productIdToDelete && (
        <DeleteModal onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
      )}
      {productToEdit && (
        <EditModal
          initialValues={{
            name: productToEdit.name,
            quantity: productToEdit.quantity,
            price: productToEdit.price,
          }}
          onConfirm={handleConfirmEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}

export default Inventory;
