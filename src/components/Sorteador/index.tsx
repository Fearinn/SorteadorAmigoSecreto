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
    console.log("teste");
    if (resultado.has(participanteDaVez as string)) {
      setAmigoSecreto(resultado.get(participanteDaVez as string) as string);
      setTimeout(() => setAmigoSecreto(""), 5000);
    }
  }

  useEffect(() => {
    service.getResultado().then((resposta) => {
      const dataResultado = resposta.data?.at(0).resultado;
      const map: Map<string, string> = new Map(Object.entries(dataResultado));
      setResultado(map);
    });
  }, []);

  return (
    <section className={styles.section}>
      <h1 className={styles.titulo}>{participanteDaVez}</h1>
      {/*  <form className={styles.formulario}>
        <select
          className={styles.input}
          name="participanteDaVez"
          id="participanteDaVez"
          placeholder="Selecione o seu nome"
          value={participanteDaVez}
          onChange={(evento) => setParticipanteDaVez(evento.target.value)}
        >
          <option>Selecione seu nome</option>
          {participantes.map((participante) => {
            return (
              <option key={participante} value={participante}>
                {participante}
              </option>
            );
          })}
        </select>
        <p>Clique em sortear para ver quem é seu amigo secreto!</p>
        <button className={styles.botao}>Sortear</button>
      </form> */}
      {
        <>
          <p role="alert" className={styles.amigo}>
            {amigoSecreto}
          </p>
          <button className={styles.botao} onClick={pegaResultados}>Sortear</button>
        </>
      }
      <div className={styles.imagem} />
    </section>
  );
};

export default Sorteador;
