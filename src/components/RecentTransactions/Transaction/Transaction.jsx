import { BiSolidXCircle } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";

import styles from "./Transaction.module.css";
import { useContext, useState } from "react";
import TransactionContext from "../../Contexts/TransactionContext";
import { createPortal } from "react-dom";
import AddExpense from "../../Modal/AddExpense/AddExpense";


const Transaction = ({id, icon, category, title, date, price}) => {
    const [transactions, setTransactions] = useContext(TransactionContext);
    const [updating, setUpdating] = useState(false);
    const [deleting, setDeleting] = useState(false);
    
    const handleDelete = (id) => {

    }

    const handleUpdate = (id) => {
        setUpdating(true);
    }

    return <>
        <div className={styles.transaction}>
            <div className="type">{icon}</div>
            <div className={styles.details}>
                <div className={styles.title}>{title}</div>
                <div className={styles.date}>{date}</div>
            </div>
            <div className={styles.price}>₹{price}</div>
            <div className={styles.control}>
                <button onClick={() => handleDelete(id)} className={`${styles.deleteIcon} ${styles.icon}`}><BiSolidXCircle /></button>
                <button onClick={() => handleUpdate(id)} className={`${styles.editIcon} ${styles.icon}`}><BiEdit /></button>
            </div>
            {updating && createPortal(
                <AddExpense 
                    handleClose={() => setUpdating(false)} 
                    category={category} 
                    title={title} 
                    price={price} 
                    date={date} 
                    id={id} 
                    edit 
                />, 
            document.body)}
        </div>
    </>
}

export default Transaction;