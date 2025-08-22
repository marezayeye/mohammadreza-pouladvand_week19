import InventoryHeader from "../components/InventoryHeader";
import InventoryTableRow from "../components/InventoryTableRow";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import InventoryPagination from "../components/InventoryPagination";

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
    addProduct,
    updateProduct,
    deleteProduct,
    totalPages,
    page,
    limit,
    setSearchParams,
  } = useProducts();

  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

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

  const handleOpenAdd = () => setIsAddOpen(true);
  const handleConfirmAdd = async (payload) => {
    await addProduct(payload);
    setIsAddOpen(false);
  };
  const handleCancelAdd = () => setIsAddOpen(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <InventoryHeader
        userName={userName}
        logout={logout}
        onSearch={(value) => setSearchParams({ page: 1, limit: String(limit || 10), search: value })}
      />
      <div className={styles.secondRow}>
        <div>
          <img src="src\assets\settings.webp" alt="settings" />
          <h3>مدیریت کالا</h3>
        </div>
        <button className={styles.addButton} onClick={handleOpenAdd}>افزودن محصول</button>
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
      <InventoryPagination />
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
      {isAddOpen && (
        <EditModal
          title="افزودن محصول"
          initialValues={{ name: "", quantity: 0, price: 0 }}
          onConfirm={handleConfirmAdd}
          onCancel={handleCancelAdd}
        />
      )}
    </div>
  );
}

export default Inventory;
