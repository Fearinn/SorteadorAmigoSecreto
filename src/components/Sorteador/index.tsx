import { useEffect, useState } from "react";
import { useParams } from "react-router";
import sorteioService from "../../services/amigoSecreto";
import { useResultadoDoSorteio } from "../../state/hooks/useResultadoDoSorteio";
import styles from "./Sorteador.module.scss";

const Sorteador = () => {
  const [amigoSecreto, setAmigoSecreto] = useState("");
  const [resultado, setResultado] = useResultadoDoSorteio();

  const params = useParams();
  const participanteDaVez = params.nome;

  const service = sorteioService(params.identificador as string);

  function pegaResultados() {
    if (resultado.has(participanteDaVez as string)) {
      setAmigoSecreto(resultado.get(participanteDaVez as string) as string);
      setTimeout(() => setAmigoSecreto(""), 5000);
    } else {
      setAmigoSecreto(
        "Ops! Parece que você não participa desse sorteio! Conserte o link ou entre em contato com o criador."
      );
    }
  }

  useEffect(() => {
    service.getResultado().then((resposta) => {
      const dataResultado = resposta.data?.at(0)?.resultado;
      if (dataResultado) {
        const map: Map<string, string> = new Map(Object.entries(dataResultado));
        setResultado(map);
      } else {
        setAmigoSecreto(
          "Ops! Parece que esse jogo não existe! Conserte o link ou entre em contato com o criador."
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.section}>
      <h1 className={styles.titulo}>
        Olá, <span>{participanteDaVez}</span>. Vamos descobrir seu amigo
        secreto!
      </h1>
      <>
        <p role="alert" className={styles.amigo}>
          {amigoSecreto}
        </p>
        <button className={styles.botao} onClick={pegaResultados}>
          Sortear
        </button>
      </>
      <div className={styles.imagem} />
    </section>
  );
};

export default Sorteador;
