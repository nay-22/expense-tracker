import styles from "./Header.module.css";

const Header = () => {
    return <>
        <div className={styles.header}>
            <h1 className={styles.title}>Expense Tracker</h1>
            <button onClick={() => {
                localStorage.clear();
                location.reload();
            }} className={styles.reset}>Reset</button>
        </div>
    </>
}

export default Header;