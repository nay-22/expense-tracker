import { useContext } from "react";
import CustomBar from "../Chart/Bar/CustomBar";
import styles from "./ExpenseTrends.module.css";
import CategoricalExpenseContext from "../Contexts/CategoricalExpenseContext";
import { GoHistory } from "react-icons/go";

const ExpenseTrends = () => {

    const [categoricalDetailsObject] = useContext(CategoricalExpenseContext);
    const { categoricalDetails } = categoricalDetailsObject;

    return <>
        <div className={styles.trends}>
            <h1 className={styles.title}>Expense Trends</h1>
            <section className={styles.chart}>
                {!categoricalDetails || categoricalDetails.length == 0 ?
                    <div className={styles.empty}>
                        <h2 ><GoHistory /> No expenses accounted yet...</h2>
                    </div> : <CustomBar />}
            </section>
        </div>
    </>
}

export default ExpenseTrends