import { useEffect, useState } from "react";
import { useParams } from "react-router";
import sorteioService from "../../services/amigoSecreto";
import styles from "./Sorteador.module.scss";

const Sorteador = () => {
  const [amigoSecreto, setAmigoSecreto] = useState("");
  const [resultado, setResultado] = useState(new Map<string, string>());
  const [idsParticipantes, setIdsParticipantes] = useState(
    new Map<string, string>()
  );
  const [participantes, setParticipantes] = useState<string[]>([]);
  const params = useParams();
  const participanteDaVez = params.nome;
  const idDoParticipanteDaVez = params.idDoParticipante;

  const service = sorteioService(params.identificador as string);

  function pegaResultados() {
    const idSalvoDoParticipante =
      idsParticipantes.get(participanteDaVez as string) || null;
    if (
      resultado.has(participanteDaVez as string) &&
      idSalvoDoParticipante === idDoParticipanteDaVez
    ) {
      setAmigoSecreto(resultado.get(participanteDaVez as string)!);
      setTimeout(() => setAmigoSecreto(""), 5000);
    } else {
      setAmigoSecreto(
        "Ops! Parece que você não participa desse sorteio! Conserte o link ou entre em contato com o criador do sorteio."
      );
    }
  }

  useEffect(() => {
    service.getResultado().then((resposta) => {
      const dataResultado = resposta.data?.at(0)?.resultado;
      const dataIdsDosParticipantes = resposta.data?.at(0)?.idsDosParticipantes;
      const dataParticipantes = resposta.data?.at(0)?.participantes;

      if (dataResultado && dataIdsDosParticipantes && dataParticipantes) {
        setParticipantes(dataParticipantes);

        const mapResultado: Map<string, string> = new Map(
          Object.entries(dataResultado)
        );
        setResultado(mapResultado);

        const mapIdsDosParticipantes: Map<string, string> = new Map(
          Object.entries(dataIdsDosParticipantes)
        );
        setIdsParticipantes(mapIdsDosParticipantes);
      } else {
        setAmigoSecreto(
          "Ops! Parece que esse jogo não existe! Conserte o link ou entre em contato com o criador do sorteio."
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
      <p role="alert" className={styles.mensagem}>
        {amigoSecreto}
      </p>
      <button className={styles.botao} onClick={pegaResultados}>
        Ver amigo secreto
      </button>

      <div className={styles.imagem} />
    </section>
  );
};

export default Sorteador;
