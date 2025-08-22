import styles from "./DeleteModal.module.css";
import { ClipLoader } from "react-spinners";

function DeleteModal({ onConfirm, onCancel, isDeleting }) {
  return (
    <div className={styles.bgblur}>
      <div className={styles.modal}>
        <img src="src/assets/deleteModal.webp" alt="delete modal" />
        <p>آیا از حذف این محصول مطمئنید؟</p>
        <div className={styles.btncontainer}>
          <button onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? <ClipLoader color="#ffffff" size={16} /> : "حذف"}
          </button>
          <button onClick={onCancel} disabled={isDeleting}>لغو</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
