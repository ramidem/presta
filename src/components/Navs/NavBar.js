import MainNav from "./MainNav";
import NavLinks from "./NavLinks";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <NavLinks />
      <MainNav />
    </div>
  );
};

export default NavBar;
