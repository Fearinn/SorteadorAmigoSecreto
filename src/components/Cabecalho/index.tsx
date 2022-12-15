import { Link } from "react-router-dom";
import styles from "./Cabecalho.module.scss";

const Cabecalho = () => {
  return (
    <header className={styles.header}>
      <Link to="/">
        <div className={styles.logo} />
      </Link>
      <div className={styles.image} />
    </header>
  );
};

export default Cabecalho;
