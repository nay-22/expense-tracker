import { BiSolidXCircle } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";

import styles from "./Transaction.module.css";
import { useContext, useState } from "react";
import TransactionContext from "../../Contexts/TransactionContext";
import { createPortal } from "react-dom";
import AddExpense from "../../Modal/AddExpense/AddExpense";
import DeleteExpense from "../../Modal/DeleteExpense/DeleteExpense";
import ReactModal from "react-modal";


const Transaction = ({id, icon, category, title, date, price}) => {
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);
    
    const handleDelete = () => {
        setDeleting(true);
    }

    const handleUpdate = () => {
        setUpdating(true);
    }

    return <>
        <div className={styles.transaction}>
            <div className={styles.iconOuter}>
                <div className={styles.type}>
                    {icon}
                </div>
            </div>
            <div className={styles.details}>
                <div className={styles.title}>{title}</div>
                <div className={styles.date}>{date}</div>
            </div>
            <div className={styles.price}>₹{price}</div>
            <div className={styles.control}>
                <button onClick={() => handleDelete()} className={`${styles.deleteIcon} ${styles.icon}`}><BiSolidXCircle /></button>
                <button onClick={() => handleUpdate()} className={`${styles.editIcon} ${styles.icon}`}><BiEdit /></button>
            </div>
            <ReactModal
                isOpen={updating}
                className={styles.modal}
            >
                <AddExpense 
                    handleClose={() => setUpdating(false)} 
                    category={category} 
                    title={title} 
                    price={price} 
                    date={date} 
                    id={id} 
                    edit 
                />
            </ReactModal>
            <ReactModal
                className={styles.modal}
                isOpen={deleting}
            >
                <DeleteExpense 
                    handleClose={() => setDeleting(false)} 
                    category={category}
                    title={title}
                    price={price} 
                    id={id} 
                />
            </ReactModal>
        </div>
    </>
}

export default Transaction;