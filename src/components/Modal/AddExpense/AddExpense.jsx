import { useContext, useState } from "react";
import { useSnackbar } from "notistack";

import TransactionContext from "../../Contexts/TransactionContext";
import categories from "../../../config/config";

import styles from "./AddExpense.module.css";
import CategoricalExpenseContext from "../../Contexts/CategoricalExpenseContext";

const AddExpense = ({ handleClose, edit = false, id, title, category, date, price }) => {
    const { enqueueSnackbar } = useSnackbar();

    const [transactions, setTransactions] = useContext(TransactionContext);
    const [categoricalDetailsObject, expenseMapObject] = useContext(CategoricalExpenseContext);

    const { categoricalDetails, setCategoricalDetails } = categoricalDetailsObject;
    const { expenseMap, setExpenseMap } = expenseMapObject;

    const [expense, setExpense] = useState({
        id: id ? id : transactions.length,
        title: title ? title : '',
        price: price ? price : 0,
        category: category ? category : '',
        date: date ? date : ''
    });

    const captureExpense = (target) => {
        if (target.id == "title") setExpense(prev => ({ ...prev, title: target.value }));
        else if (target.id == "price") setExpense(prev => ({ ...prev, price: parseInt(target.value) }));
        else if (target.id == "category") setExpense(prev => ({ ...prev, category: target.value }));
        else if (target.id == "date") setExpense(prev => ({ ...prev, date: target.value }));
    }

    const expenseIsValid = () => {
        if (expense.title == '') {
            enqueueSnackbar('Please add a title to your expense', { variant: 'warning' });
            return false;
        }
         if (expense.price <= 0) {
            enqueueSnackbar('Please ensure cost of the expense to be more than zero', { variant: 'warning' });
            return false;
        }
         if (expense.category == '') {
            enqueueSnackbar('Please select a category for your expense', { variant: 'warning' });
            return false;
        }
         if (expense.date == '') {
            enqueueSnackbar('Please select a date for your expense', { variant: 'warning' });
            return false;
        }
         if (date != '') {
            let today = new Date();
            let expenseDate = new Date(expense.date);
            let t1 = expenseDate.getTime();
            let t2 = today.getTime();
            if (t1 > t2) {
                enqueueSnackbar('The date cannot be a future date', { variant: 'warning' });
                return false;
            }
        }
         if (!edit && expense.price > localStorage.getItem('balance')) {
            enqueueSnackbar('You do not have enough balance in your wallet', { variant: 'warning' });
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
            enqueueSnackbar(`Expense titled "${expense.title}" added successfully`, { variant: "success" });
            handleClose();
        }
    }

    const updateExpense = () => {
        let updated = true;
        if (expenseIsValid()) {
            setTransactions(prev => {
                prev.map(item => {
                    if (item.id == id) {
                        item.title = expense.title;
                        item.date = expense.date;
                        if (item.category == expense.category) {
                            setExpenseMap(prev => {
                                prev.set(item.category, prev.get(item.category) - item.price + expense.price);
                                buildArrayFromMap(prev);
                                return prev;
                            });
                        } else {
                            setExpenseMap(prev => {
                                prev.set(item.category, prev.get(item.category) - item.price);
                                prev.set(expense.category, prev.get(expense.category) + item.price);
                                buildArrayFromMap(prev);
                                return prev;
                            });
                        }
                        item.category = expense.category;
                        if (item.price != expense.price) {
                            let balance = parseInt(localStorage.getItem('balance'));
                            let transacted = parseInt(localStorage.getItem('expense'));
                            if (balance + item.price - expense.price < 0) {
                                enqueueSnackbar('You do not have enough balance in your wallet', { variant: 'warning' });
                                updated = false;
                                return prev;
                            }
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
                        } else {
                            setExpenseMap(prev => {
                                prev.set(item.category, prev.get(item.category) - item.price + expense.price);
                                buildArrayFromMap(prev);
                                return prev;
                            });
                        }
                    }
                })
                localStorage.setItem('transactions', JSON.stringify(prev));
                return prev;
            })
            if (updated) {
                enqueueSnackbar(`Expense titled "${expense.title}" updated successfully`, { variant: "success" });
                handleClose();
            }
        }
    }


    return <>
        <div className={styles.modal}>
            <h2>{edit ? "Edit" : "Add"} Expense</h2>
            <br />
            <div className={styles.control}>
                <input value={expense.title} id="title" onChange={(e) => captureExpense(e.target)} type="text" placeholder="Set Title" />
                <input
                    onChange={(e) => captureExpense(e.target)}
                    placeholder="Set Cost"
                    value={expense.price}
                    type='number'
                    id="price"
                    min={1}
                />
                <select value={expense.category} id="category" onChange={(e) => captureExpense(e.target)} type="text" placeholder="Select Category">
                    <option value="" disabled selected={!edit} hidden>Select Category</option>
                    {categories.map(category => <option key={category.value} value={category.value}>{category.value.charAt(0).toUpperCase() + category.value.slice(1)}</option>)}
                </select>
                <input
                    onChange={(e) => captureExpense(e.target)}
                    placeholder="Select Date"
                    value={expense.date}
                    type='date'
                    id="date"
                />
                <button className={styles.cancel} onClick={handleClose}>Cancel</button>
                <button className={styles.addExpense} onClick={edit ? updateExpense : addExpense}>{edit ? "Update" : "Add"} Expense</button>
            </div>
        </div>
    </>
}

export default AddExpense;