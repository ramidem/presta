import Link from "next/link";
import styles from "./MainNav.module.css";

const MainNav = () => {
  return (
    <nav className={styles.mainnav}>
      <div className={styles.mainnav_faux_bg}></div>
      <div className="container">
        <Link href="/">
          <a className={styles.mainnav_brand}>
            <h1 className={styles.mainnav_brand_h1}>PRESTA</h1>
            <p className={styles.mainnav_brand_p}>car rental</p>
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default MainNav;
