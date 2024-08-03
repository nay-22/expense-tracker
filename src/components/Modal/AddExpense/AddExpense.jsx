import { useContext, useState } from "react";
import { useSnackbar } from "notistack";

import TransactionContext from "../../Contexts/TransactionContext";
import categories from "../../../config/config";

import styles from "./AddExpense.module.css";
import CategoricalExpenseContext from "../../Contexts/CategoricalExpenseContext";

const AddExpense = ({handleClose, edit=false}) => {
    const { enqueueSnackbar } = useSnackbar();

    const [transactions, setTransactions] = useContext(TransactionContext);
    const [categoricalDetailsObject, expenseMapObject] = useContext(CategoricalExpenseContext);
    
    const {categoricalDetails, setCategoricalDetails} = categoricalDetailsObject;
    const {expenseMap, setExpenseMap} = expenseMapObject;

    const [expense, setExpense] = useState({
        id: transactions.length,
        title: '',
        price: 0,
        category: '',
        date: ''
    });


    const captureExpense = (target) => {
        if (target.id == "title") setExpense(prev => ({...prev, title: target.value}));
        else if (target.id == "price") setExpense(prev => ({...prev, price: parseInt(target.value)}));
        else if (target.id == "category") setExpense(prev => ({...prev, category: target.value}));
        else if (target.id == "date") setExpense(prev => ({...prev, date: target.value}));
    }

    const expenseIsValid = () => {
        if (expense.title == '') {
            enqueueSnackbar('Please add a title to your expense', {variant: 'warning'});
            return false;
        } else if (expense.price == 0) {
            enqueueSnackbar('Please ensure cost of the expense to be more than zero', {variant: 'warning'});
            return false;
        } else if (expense.category == '') {
            enqueueSnackbar('Please select a category for your expense', {variant: 'warning'});
            return false;
        } else if (expense.date == '') {
            enqueueSnackbar('Please select a date for your expense', {variant: 'warning'});
            return false;
        } else if (expense.price > localStorage.getItem('balance')) {
            enqueueSnackbar('You do not have enough balance in your wallet', {variant: 'warning'});
            return false;
        }
        return true;
    }

    const updateBalance = () => {
        const balance = parseInt(localStorage.getItem('balance'));
        const transacted = parseInt(localStorage.getItem('expense'));
        localStorage.setItem('balance', balance - expense.price);
        localStorage.setItem('expense', transacted + expense.price);
    }

    const updateCategoricalData = () => {
        setExpenseMap(prev => {
            prev.set(expense.category, prev.get(expense.category) + expense.price);
            buildArrayFromMap(prev);
            return prev;
        });
    }

    const buildArrayFromMap = (map) => {
        const mapData = Array.from(map.entries()).map(([key, value]) => ({ name: key, value }));
        localStorage.setItem('categorical', JSON.stringify(mapData));
        setCategoricalDetails(mapData);
    }

    const addExpense = () => {
        if (expenseIsValid()) {
            setTransactions(prev => [expense, ...prev]);
            updateBalance();
            updateCategoricalData();
        }
        localStorage.setItem('transactions', JSON.stringify([expense, ...transactions]));
        console.log(expenseMap);
        handleClose();
    }
    return <>
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h1>{edit ? "Edit" : "Add"} Expense</h1>
                <br />
                <div className={styles.control}>
                    <input id="title" onChange={(e) => captureExpense(e.target)} type="text" placeholder="Title"/>
                    <input id="price" onChange={(e) => captureExpense(e.target)} type="number" placeholder="Price" min={1}/>
                    <select id="category" onChange={(e) => captureExpense(e.target)} type="text" placeholder="Select Category">
                        <option value="" disabled selected hidden>Select Category</option>
                        {categories.map(category => <option key={category.value} value={category.value}>{category.value.charAt(0).toUpperCase() + category.value.slice(1)}</option>)}
                    </select>
                    <input id="date" onChange={(e) => captureExpense(e.target)} type="date"/>
                    <button className={styles.addExpense} onClick={addExpense}>Add Expense</button>
                    <button className={styles.cancel} onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    </>
}

export default AddExpense;