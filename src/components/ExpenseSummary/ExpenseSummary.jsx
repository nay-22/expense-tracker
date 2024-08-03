import { useContext, useEffect, useState } from "react";
import styles from "./ExpenseSummary.module.css";
import { createPortal } from "react-dom";
import AddBalance from "../Modal/AddBalance/AddBalance";
import AddExpense from "../Modal/AddExpense/AddExpense";
import TransactionContext from "../Contexts/TransactionContext";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import CategoricalExpenseContext from "../Contexts/CategoricalExpenseContext";

const ExpenseSummary = () => {
    const [addBalance, setAddBalance] = useState(false);
    const [addExpense, setAddExpense] = useState(false);

    const [transactions, setTransactions] = useContext(TransactionContext);
    const [categoricalDetailsObject, expenseMapObject] = useContext(CategoricalExpenseContext);
    
    const {categoricalDetails, setCatagoricalDetails} = categoricalDetailsObject;
    const {expenseMap, setExpenseMap} = expenseMapObject;

    // const data = [
    //     { name: 'Food', value: 400 },
    //     { name: 'Travel', value: 300 },
    //     { name: 'Enterntainment', value: 300 },
    //     { name: 'Apparel', value: 200 },
    // ];

    const generateKRandomColors = (k) => {
        let colors = [];
        for (let i = 0; i < k; i++) {
            const red = Math.floor((Math.random() * 0.6 + 0.4) * 256);
            const blue = Math.floor((Math.random() * 0.6 + 0.4) * 256);
            const green = Math.floor((Math.random() * 0.6 + 0.4) * 256);
            colors.push(`rgb(${red}, ${green}, ${blue})`)
        }
        return colors;
    }

    const RADIAN = Math.PI / 180;
    const COLORS = generateKRandomColors(categoricalDetails.length);

    const renderCustomizedInnerLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
      }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.2;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
          <text
            x={x}
            y={y}
            fill="black"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            style={{fontWeight: 'bold'}}
          >
            {`${(percent * 100).toFixed(0)}%`}
          </text>
        );
      };
    const renderCustomizedOuterLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        name,
        index,
      }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 2.1;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
      
        return (
          <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
            style={{fontWeight: 'bold'}}
          >
            {`${name.charAt(0).toUpperCase() + name.slice(1)}`}
          </text>
        );
      };

    return <>
        <div className={styles.expenseSummary}>
            <section className={styles.section}>
                <div>
                    <p className={styles.sectionMain}>Wallet Balance: <span className={styles.balance}>₹{localStorage.getItem('balance')}</span></p>
                    <br />
                    <div className={styles.sectionButtonWrapper}>
                        <button className={styles.addIncome}
                            onClick={() => setAddBalance(true)}
                        >
                            + Add Income
                        </button>
                    </div>
                    {addBalance && createPortal(<AddBalance handleClose={() => setAddBalance(false)} />, document.body)}
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
                    {addExpense && createPortal(<AddExpense handleClose={() => setAddExpense(false)} />, document.body)}
                </div>
            </section>
            <section className={styles.sectionWoS}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width='100%' height='100%'>
                        <Pie
                            data={categoricalDetails}
                            dataKey="value"
                            cx='50%'
                            cy='50%'
                            innerRadius={90}
                            outerRadius={120}
                            fill="#82ca9d"
                            label={renderCustomizedOuterLabel}
                        >
                            {categoricalDetails.map((entry, idx) => (
                                <Cell key={idx} fill={COLORS[idx % COLORS.length]}/>
                            ))}
                        </Pie>
                        <Pie
                            data={categoricalDetails}
                            dataKey="value"
                            cx='50%'
                            cy='50%'
                            innerRadius={30}
                            outerRadius={80}
                            fill="#82ca9d"
                            label={renderCustomizedInnerLabel}
                        >
                            {categoricalDetails.map((entry, idx) => (
                                <Cell key={idx} fill={COLORS[idx % COLORS.length]}/>
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </section>
        </div>
    </>
}

export default ExpenseSummary;