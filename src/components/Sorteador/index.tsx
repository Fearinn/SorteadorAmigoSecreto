import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { sorteioService } from "../../services/amigoSecreto";
import { useDataResultado } from "../../state/hooks/useDataResultado";
import { useListaDeParticipantes } from "../../state/hooks/useListaDeParticipantes";
import styles from "./Sorteador.module.scss";

const Sorteador = () => {
  const [amigoSecreto, setAmigoSecreto] = useState("");
  const [resultado, setResultado] = useDataResultado();
  const [participantes, setParticipantes] = useListaDeParticipantes();
  const params = useParams();
  const participanteDaVez = params.nome;
  const idDoParticipanteDaVez = params.idDoParticipante;

  const service = sorteioService(
    params.identificador as string,
    idDoParticipanteDaVez as string
  );

  useEffect(() => {
    service.getResultado().then((resposta) => {
      const dataResultado: string =
        resposta.data?.at(0)[idDoParticipanteDaVez as string];
      const dataParticipantes: string[] = resposta.data?.at(0).participantes;
      if (
        (dataResultado && dataParticipantes) ||
        (resultado && participantes.length > 0)
      ) {
        setParticipantes(dataParticipantes || participantes);
        setResultado(dataResultado || resultado);
      } else {
        setAmigoSecreto(
          "Ops! Parece que esse jogo não existe ou você não participa dele! Conserte o link ou entre em contato com o criador do sorteio."
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pegaResultados() {
    setAmigoSecreto(resultado);
    setTimeout(() => setAmigoSecreto(""), 5000);
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.titulo}>
        Olá, <span>{participanteDaVez}</span>. Vamos descobrir seu amigo
        secreto!
      </h1>
      {participantes.length > 0 && (
        <>
          <h2>Esses são todos os participantes do sorteio:</h2>
          <ul>
            {participantes.map((participante) => {
              return <li key={participante}>{participante}</li>;
            })}
          </ul>
        </>
      )}
      {amigoSecreto && (
        <p role="alert" className={styles.mensagem}>
          {amigoSecreto}
        </p>
      )}
      <button
        className={styles.botao}
        onClick={pegaResultados}
        disabled={!resultado}
      >
        Ver amigo secreto
      </button>

      <div className={styles.imagem} />
    </section>
  );
};

export default Sorteador;
