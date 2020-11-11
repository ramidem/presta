import Link from "next/link";
import styles from "./NavLinks.module.css";

const Navlinks = () => {
  return (
    <nav className={styles.navlinks}>
      <div className="container">
        <Link href="/addcar">
          <a>Add Car</a>
        </Link>
        <span> / </span>
        <Link href="/reservations">
          <a>Reservations</a>
        </Link>
        <span> / </span>
        <Link href="/logout">
          <a>Logout</a>
        </Link>
        <span> / </span>
        <Link href="/signup">
          <a>Sign Up</a>
        </Link>
        <span> / </span>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </div>
    </nav>
  );
};

export default Navlinks;
