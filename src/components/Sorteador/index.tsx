import React, { useState } from "react";
import { useListaDeParticipantes } from "../../state/hooks/useListaDeParticipantes";
import { useResultadoDoSorteio } from "../../state/hooks/useResultadoDoSorteio";
import styles from "./Sorteador.module.scss";

const Sorteador = () => {
  const participantes = useListaDeParticipantes();

  const [participanteDaVez, setParticipanteDaVez] = useState("");
  const [amigoSecreto, setAmigoSecreto] = useState("");

  const resultadoDoSorteio = useResultadoDoSorteio();

  const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if (resultadoDoSorteio.has(participanteDaVez)) {
      setAmigoSecreto(resultadoDoSorteio.get(participanteDaVez) as string);
      setTimeout(() => setAmigoSecreto(""), 5000);
    }
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.titulo}>Quem vai tirar o papelzinho?</h1>
      <form onSubmit={sortear} className={styles.formulario}>
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
      </form>
      {amigoSecreto && (
        <p role="alert" className={styles.amigo}>
          {amigoSecreto}
        </p>
      )}
      <div className={styles.imagem} />
    </section>
  );
};

export default Sorteador;
