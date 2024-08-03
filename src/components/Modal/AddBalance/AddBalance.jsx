import { useState } from "react";
import styles from "./AddBalance.module.css";

const AddBalance = ({handleClose}) => {
    const [amount, setAmount] = useState();

    const updateBalance = () => {
        const balance = parseInt(localStorage.getItem('balance'));
        localStorage.setItem('balance', balance + parseInt(amount));
        handleClose();
    }
    return <>
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h1>Add Balance</h1>
                <br />
                <div className="control">
                    <input onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Income Amount"/>
                    <button className={styles.addIncome} onClick={updateBalance}>Add Balance</button>
                    <button className={styles.cancel} onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    </>
}

export default AddBalance;