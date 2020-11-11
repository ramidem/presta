import styles from "./Jumbotron.module.css";

const Jumbotron = () => {
  return (
    <div className={styles.jumbotron}>
      <div className="container">
        <h1 className="display-6 mb-0">Premium Cars</h1>
        <p className="lead text-uppercase">Can't Afford it? Rent it</p>
      </div>
    </div>
  );
};

export default Jumbotron;
