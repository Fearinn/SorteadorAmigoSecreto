import { useNavigate } from "react-router-dom";
import {useListaDeParticipantes} from "../../state/hooks/useListaDeParticipantes";
import { useSorteador } from "../../state/hooks/useSorteador";

import styles from "./Rodape.module.scss";

const Rodape = () => {
  const participantes = useListaDeParticipantes();

  const navegarPara = useNavigate();

  const sortear = useSorteador();

  function iniciar(): void {
    sortear();
    navegarPara("/sorteio");
  }
  return (
    <footer className={styles.rodape}>
      <button
        className={styles.botao}
        onClick={iniciar}
        disabled={participantes?.length < 3}
      >
        Iniciar brincadeira
      </button>
      <div className={styles.imagem} />
    </footer>
  );
};

export default Rodape;
