import styles from './Header.module.css';


function Header(props) {
  return (
     <header className={styles.header}>
      <h1>{'💊'} Kid's Medicine Tracker</h1>
      <nav>
         <ul>
            <li>Welcome, user </li>
            <li>IMG </li>
            <li className={styles.navLink}>Logout</li>
            <li className={styles.navLink}>Login</li>
        </ul>
      </nav>
  </header>
 );
}

export default Header;
