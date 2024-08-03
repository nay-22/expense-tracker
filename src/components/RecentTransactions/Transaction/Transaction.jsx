import { BiSolidXCircle } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";

import styles from "./Transaction.module.css";
import { useContext } from "react";
import TransactionContext from "../../Contexts/TransactionContext";


const Transaction = ({id, icon, title, date, price}) => {
    const [transactions, setTransactions] = useContext(TransactionContext);
    
    const handleDelete = (id) => {

    }

    const handleUpdate = (id) => {
        
    }

    return <>
        <div className={styles.transaction}>
            <div className="type">{icon}</div>
            <div className={styles.details}>
                <div className={styles.title}>{title}</div>
                <br />
                <div className={styles.date}>{date}</div>
            </div>
            <div className={styles.price}>₹{price}</div>
            <div className={styles.control}>
                <button onClick={() => handleUpdate(id)} className={`${styles.deleteIcon} ${styles.icon}`}><BiSolidXCircle /></button>
                <button onClick={() => handleDelete(id)} className={`${styles.editIcon} ${styles.icon}`}><BiEdit /></button>
            </div>
        </div>
    </>
}

export default Transaction;