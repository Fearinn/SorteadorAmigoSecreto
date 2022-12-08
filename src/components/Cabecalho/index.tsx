import styles from "./Cabecalho.module.scss"

const Cabecalho = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}/>
      <div className={styles.image}/>
    </header>
  );
};

export default Cabecalho;
