import styles from "./DeleteModal.module.css";

function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className={styles.bgblur}>
      <div className={styles.modal}>
        <img src="src/assets/deleteModal.webp" alt="delete modal" />
        <p>آیا از حذف این محصول مطمئنید؟</p>
        <div className={styles.btncontainer}>
          <button onClick={onConfirm}>حذف</button>
          <button onClick={onCancel}>لغو</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
