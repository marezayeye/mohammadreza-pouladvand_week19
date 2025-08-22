import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

import { useProducts } from "../context/ProductsContext";

import InventoryHeader from "../components/InventoryHeader";
import InventoryTableRow from "../components/InventoryTableRow";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import InventoryPagination from "../components/InventoryPagination";

import styles from "./Inventory.module.css";

function Inventory() {
  const {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    limit,
    searchParams,
    setSearchParams,
  } = useProducts();

  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  let filteredProducts;
  if (!searchQuery) {
    filteredProducts = [...products]; // if searchbox is empty then show all items
  } else {
    filteredProducts = products.filter(
      (
        prod // and if its not, filter items
      ) => prod.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  useEffect(() => {
    if (!!searchQuery.length) {
      filteredProducts = [...products];
    }
    if (searchQuery.length > 2) {
      filteredProducts = products.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  }, [searchQuery]); //on changing searchquery re-run the filter
  const handleRequestDelete = (id) => {
    setProductIdToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (!productIdToDelete) return;
    setIsDeleting(true);
    try {
      await deleteProduct(productIdToDelete);
      setProductIdToDelete(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => setProductIdToDelete(null);

  const handleRequestEdit = (product) => setProductToEdit(product);
  const handleConfirmEdit = async (updated) => {
    if (!productToEdit) return;
    setIsEditing(true);
    try {
      await updateProduct(
        productToEdit.id ?? productToEdit._id ?? productToEdit.sku,
        updated
      );
      setProductToEdit(null);
    } finally {
      setIsEditing(false);
    }
  };
  const handleCancelEdit = () => setProductToEdit(null);

  const handleOpenAdd = () => setIsAddOpen(true);
  const handleConfirmAdd = async (payload) => {
    setIsAdding(true);
    try {
      await addProduct(payload);
      setIsAddOpen(false);
    } finally {
      setIsAdding(false);
    }
  };
  const handleCancelAdd = () => setIsAddOpen(false);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <InventoryHeader
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <div className={styles.secondRow}>
        <div>
          <img src="src\assets\settings.webp" alt="settings" />
          <h3>مدیریت کالا</h3>
        </div>
        <button
          className={styles.addButton}
          onClick={handleOpenAdd}
          disabled={isAdding}
        >
          {isAdding ? <ClipLoader color="#ffffff" size={16} /> : "افزودن محصول"}
        </button>
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
            {filteredProducts.map(
              (
                prod // mapping on filtered products to respect search query
              ) => (
                <InventoryTableRow
                  key={prod.id}
                  data={prod}
                  onDelete={() => handleRequestDelete(prod.id)}
                  onEdit={() => handleRequestEdit(prod)}
                  isDeleting={isDeleting}
                  isEditing={isEditing}
                />
              )
            )}
          </tbody>
        </table>
      </div>
      <InventoryPagination />
      {productIdToDelete && (
        <DeleteModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          isDeleting={isDeleting}
        />
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
          isEditing={isEditing}
        />
      )}
      {isAddOpen && (
        <EditModal
          title="ایجاد محصول جدید"
          initialValues={{ name: "", quantity: 0, price: 0 }}
          onConfirm={handleConfirmAdd}
          onCancel={handleCancelAdd}
          isEditing={isAdding}
        />
      )}
    </div>
  );
}

export default Inventory;
