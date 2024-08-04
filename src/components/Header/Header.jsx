import useWindowSize from "../hooks/useWindowSize";
import styles from "./Header.module.css";

const Header = () => {
    return <>
        <div className={styles.header}>
            <div>
                <h1 className={styles.title}>Expense Tracker</h1>
            </div>
            <div>
                <button onClick={() => {
                    localStorage.clear();
                    location.reload();
                }} className={styles.reset}>Reset</button>
            </div>
        </div>
    </>
}

export default Header;