import { useContext, useState } from "react";
import { useSnackbar } from "notistack";

import TransactionContext from "../../Contexts/TransactionContext";
import categories from "../../../config/config";

import styles from "./AddExpense.module.css";
import CategoricalExpenseContext from "../../Contexts/CategoricalExpenseContext";

const AddExpense = ({handleClose, edit=false, id, title, category, date, price}) => {
    const { enqueueSnackbar } = useSnackbar();

    const [transactions, setTransactions] = useContext(TransactionContext);
    const [categoricalDetailsObject, expenseMapObject] = useContext(CategoricalExpenseContext);
    
    const {categoricalDetails, setCategoricalDetails} = categoricalDetailsObject;
    const {expenseMap, setExpenseMap} = expenseMapObject;

    const [expense, setExpense] = useState({
        id: id ? id : transactions.length,
        title: title ? title : '',
        price: price ? price : 0,
        category: category ? category : '',
        date: date ? date : ''
    });

    // console.log(expense);


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
            localStorage.setItem('transactions', JSON.stringify([expense, ...transactions]));
            handleClose();
        }
    }

    const updateExpense = () => {
        if (expenseIsValid()) {
            setTransactions(prev => {
                prev.map(item => {
                    if (item.id == id) {
                        item.category = expense.category
                        item.title = expense.title;
                        item.date = expense.date;
                        if (item.price != expense.price) {
                            let balance = parseInt(localStorage.getItem('balance'));
                            let transacted = parseInt(localStorage.getItem('expense'));
                            balance += item.price; // restore balance & expense state
                            transacted -= item.price; // restore balance & expense state
                            balance -= expense.price;
                            transacted += expense.price;
                            localStorage.setItem('balance', balance);
                            localStorage.setItem('expense', transacted);
                            setExpenseMap(prev => {
                                prev.set(item.category, prev.get(item.category) - item.price + expense.price);
                                buildArrayFromMap(prev);
                                return prev;
                            });
                            item.price = expense.price;
                        }
                    }
                })
                localStorage.setItem('transactions', JSON.stringify(prev));
                return prev;
            })
            handleClose();
        }
    }


    return <>
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h1>{edit ? "Edit" : "Add"} Expense</h1>
                <br />
                <div className={styles.control}>
                    <input value={expense.title} id="title" onChange={(e) => captureExpense(e.target)} type="text" placeholder="Title"/>
                    <input value={expense.price} id="price" onChange={(e) => captureExpense(e.target)} type="number" placeholder="Price" min={1}/>
                    <select value={expense.category} id="category" onChange={(e) => captureExpense(e.target)} type="text" placeholder="Select Category">
                        <option value="" disabled selected={!edit} hidden>Select Category</option>
                        {categories.map(category => <option key={category.value} value={category.value}>{category.value.charAt(0).toUpperCase() + category.value.slice(1)}</option>)}
                    </select>
                    <input value={expense.date} id="date" onChange={(e) => captureExpense(e.target)} type="date"/>
                    <button className={styles.addExpense} onClick={edit ? updateExpense : addExpense}>{edit ? "Update" : "Add"} Expense</button>
                    <button className={styles.cancel} onClick={handleClose}>Cancel</button>
                </div>
            </div>
        </div>
    </>
}

export default AddExpense;