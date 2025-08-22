import { useState, useEffect } from "react";
import styles from "./EditModal.module.css";
import { ClipLoader } from "react-spinners";

function EditModal({ initialValues, onConfirm, onCancel, title = "ویرایش محصول", isEditing }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name ?? "");
      setQuantity(Number(initialValues.quantity ?? 0));
      setPrice(Number(initialValues.price ?? 0));
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({ name, quantity: Number(quantity), price: Number(price) });
  };

  return (
    <div className={styles.bgblur}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            نام کالا
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isEditing}
            />
          </label>
          <label>
            موجودی
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min={0}
              required
              disabled={isEditing}
            />
          </label>
          <label>
            قیمت
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min={0}
              required
              disabled={isEditing}
            />
          </label>
          <div className={styles.btncontainer}>
            <button type="submit" disabled={isEditing}>
              {isEditing ? <ClipLoader color="#ffffff" size={16} /> : "ذخیره"}
            </button>
            <button type="button" onClick={onCancel} disabled={isEditing}>انصراف</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
