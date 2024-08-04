import { useContext, useEffect, useState } from "react";
import styles from "./ExpenseSummary.module.css";
import { createPortal } from "react-dom";
import AddBalance from "../Modal/AddBalance/AddBalance";
import AddExpense from "../Modal/AddExpense/AddExpense";
import TransactionContext from "../Contexts/TransactionContext";
// import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import CategoricalExpenseContext from "../Contexts/CategoricalExpenseContext";
import { GoHistory } from "react-icons/go";

import Pie from "../Chart/Pie/CustomPie";
import useWindowSize from "../hooks/useWindowSize";
import ReactModal from "react-modal";

const ExpenseSummary = () => {
    const windowSize = useWindowSize();
    const [addBalance, setAddBalance] = useState(false);
    const [addExpense, setAddExpense] = useState(false);

    const [categoricalDetailsObject, expenseMapObject] = useContext(CategoricalExpenseContext);
    const { categoricalDetails, setCatagoricalDetails } = categoricalDetailsObject;

    return <>
        <div className={styles.expenseSummary}>
            <div className={styles.transactionControl}>
                <section className={styles.section}>
                    <div>
                        <p className={styles.sectionMain}>Wallet Bal: <span className={styles.balance}>₹{localStorage.getItem('balance')}</span></p>
                        <br />
                        <div className={styles.sectionButtonWrapper}>
                            <button className={styles.addIncome}
                                onClick={() => setAddBalance(true)}
                            >
                                + Add Income
                            </button>
                        </div>
                        <ReactModal
                            isOpen={addBalance}
                            className={styles.modal}
                        >
                            <AddBalance handleClose={() => setAddBalance(false)} />
                        </ReactModal>
                    </div>
                </section>
                <section className={styles.section}>
                    <div>
                        <p className={styles.sectionMain}>Expenses: <span className={styles.expense}>₹{localStorage.getItem('expense')}</span></p>
                        <br />
                        <div className={styles.sectionButtonWrapper}>
                            <button className={styles.addExpense}
                                onClick={() => setAddExpense(true)}
                            >
                                + Add Expense
                            </button>
                        </div>
                        <ReactModal
                            isOpen={addExpense}
                            className={styles.modal}
                        >
                            <AddExpense handleClose={() => setAddExpense(false)} />
                        </ReactModal>
                    </div>
                </section>
            </div>
            <div className={styles.pieWrapper}>
                {(!categoricalDetails || categoricalDetails.length == 0) ?
                    <section className={windowSize.width > 900 ? styles.section : styles.sectionWoS}>
                        <div className={styles.empty}>
                            <h2 ><GoHistory /> No expenses accounted yet...</h2>
                        </div>
                    </section> :
                    <section className={styles.sectionWoS}>
                        <Pie categoricalDetails={categoricalDetails} />
                    </section>
                }
            </div>
        </div>
    </>
}


export default ExpenseSummary;