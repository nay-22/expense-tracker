import { useContext, useState } from "react";
import { useSnackbar } from "notistack";

import TransactionContext from "../../Contexts/TransactionContext";
import categories from "../../../config/config";

import styles from "./DeleteExpense.module.css";
import CategoricalExpenseContext from "../../Contexts/CategoricalExpenseContext";

const DeleteExpense = ({handleClose, id, title, price, category}) => {
    const { enqueueSnackbar } = useSnackbar();

    const [transactions, setTransactions] = useContext(TransactionContext);
    const [categoricalDetailsObject, expenseMapObject] = useContext(CategoricalExpenseContext);
    
    const {categoricalDetails, setCategoricalDetails} = categoricalDetailsObject;
    const {expenseMap, setExpenseMap} = expenseMapObject;


    const buildArrayFromMap = (map) => {
        const mapData = Array.from(map.entries()).map(([key, value]) => ({ name: key, value }));
        localStorage.setItem('categorical', JSON.stringify(mapData));
        setCategoricalDetails(mapData);
    }

    const deleteExpense = () => {
        setTransactions(prev => {
            let balance = parseInt(localStorage.getItem('balance'));
            let transacted = parseInt(localStorage.getItem('expense'));
            balance += price;
            transacted -= price;
            localStorage.setItem('balance', balance);
            localStorage.setItem('expense', transacted);
            setExpenseMap(prev => {
                prev.set(category, prev.get(category) - price);
                if (transacted == 0) {
                    setCategoricalDetails([]);
                    localStorage.setItem('categorical', JSON.stringify([]));
                    return prev;
                }
                buildArrayFromMap(prev);
                return prev;
            });
            prev = prev.filter(item => item.id != id);
            localStorage.setItem('transactions', JSON.stringify(prev));
            return prev;
        })
        enqueueSnackbar(`Expense titled "${title}" deleted successfully`, {variant: "success"});
        handleClose();
    }

    


    return <>
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2>Delete Expense <span className={styles.name}>({title})</span></h2>
                <br />
                <div className={styles.control}>
                    <button className={styles.deleteExpense} onClick={deleteExpense}>Delete Expense</button>
                    <button className={styles.cancel} onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    </>
}

export default DeleteExpense;