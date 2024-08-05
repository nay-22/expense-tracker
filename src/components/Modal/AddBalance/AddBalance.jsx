import { useState } from "react";
import styles from "./AddBalance.module.css";
import { useSnackbar } from "notistack";

const AddBalance = ({handleClose}) => {
    const [amount, setAmount] = useState();
    const {enqueueSnackbar} = useSnackbar();

    const updateBalance = () => {
        const balance = parseInt(localStorage.getItem('balance'));
        localStorage.setItem('balance', balance + parseInt(amount));
        enqueueSnackbar(`₹${amount} added to your balance`, {variant: 'success'});
        handleClose();
    }
    return <>
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h1>Add Balance</h1>
                <br />
                <div className={styles.form}>
                    <input onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Income Amount"/>
                    <div className={styles.control}>
                        <button className={styles.cancel} onClick={handleClose}>Cancel</button>
                        <button className={styles.addIncome} onClick={updateBalance}>Add Balance</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AddBalance;