import { useState, useEffect } from "react";

import { ClipLoader } from "react-spinners";

import styles from "./EditModal.module.css";

function EditModal({
  initialValues,
  onConfirm,
  onCancel,
  title = "ویرایش محصول",
  isEditing,
}) {
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
          <p className={styles.inputLable}>نام کالا</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="نام کالا"
            disabled={isEditing}
          />
          <p className={styles.inputLable}>تعداد موجودی</p>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min={0}
            required
            placeholder="تعداد"
            disabled={isEditing}
          />

          <p className={styles.inputLable}>قیمت</p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={0}
            required
            placeholder="قیمت"
            disabled={isEditing}
          />

          <div className={styles.btncontainer}>
            <button type="submit" disabled={isEditing}>
              {isEditing ? <ClipLoader color="#ffffff" size={16} /> : "ایجاد"}
            </button>
            <button type="button" onClick={onCancel} disabled={isEditing}>
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
